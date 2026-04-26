import asyncio, re, json
from pathlib import Path
from urllib.parse import urljoin,urlparse
from decimal import Decimal, ROUND_HALF_UP
from bs4 import BeautifulSoup
from playwright.async_api import async_playwright
BASE='http://tds26vu3ptapxx6igo6n26kuwfpn2l5omkmagc4hc7g7yn2o3xb25syd.onion'
CACHE=Path('.cache3'); CACHE.mkdir(exist_ok=True)
def cname(url):
 p=urlparse(url); return (p.path.strip('/') or 'root').replace('/','__')+'.html'
async def fetch(ctx,url):
 f=CACHE/cname(url)
 if f.exists() and f.stat().st_size>500: return f.read_text()
 page=await ctx.new_page()
 try:
  await page.goto(url, wait_until='domcontentloaded', timeout=90000)
  await page.wait_for_timeout(300)
  html=await page.content(); f.write_text(html); print('GET',url,len(html), flush=True); return html
 finally:
  await page.close()
def soup(h): return BeautifulSoup(h,'lxml')
def text(x): return ' '.join(x.get_text(' ',strip=True).split()) if x else ''
def num(s):
 m=re.search(r'-?\d[\d,]*',str(s)); return int(m.group(0).replace(',','')) if m else 0
def dec(s):
 m=re.search(r'\d[\d,]*(?:\.\d+)?',str(s)); return Decimal(m.group(0).replace(',','')) if m else None
def price(el):
 if not el: return None
 return dec(el.get('data-raw-price') or el.get('data-price') or text(el))
def absu(base,href): return urljoin(base, href.split('#')[0])
def normalize_product_url(sku): return f'{BASE}/49/p/{sku}.html'
def get_sku_from_card(card):
 t=text(card); m=re.search(r'SM-[A-Z]+-\d+',t); return m.group(0) if m else None
async def crawl_list_pages(ctx,start,kind):
 # kind: ecommerce/news/social/forum. Only follow pagination/list/category, not item detail links.
 seen=[]; todo=[start]
 while todo:
  u=todo.pop(0)
  if u in seen: continue
  h=await fetch(ctx,u); s=soup(h); seen.append(u)
  for a in s.select('a[href]'):
   href=a['href']; v=absu(u,href); path=urlparse(v).path
   ok=False
   if kind=='ecom':
    ok=path.startswith('/49/') and '/p/' not in path
   elif kind=='news-tech': ok=path.startswith('/69/c/tech')
   elif kind=='news-business': ok=path.startswith('/69/c/business')
   elif kind=='news-author': ok=path.startswith('/69/author/author_21')
   elif kind=='social': ok=path.startswith('/82/') and not any(x in path for x in ['/u/','/user/','/post/'])
   elif kind=='forum-users': ok=path.startswith('/6/users')
   elif kind=='opsec': ok=path.startswith('/6/b/opsec')
   if ok and v not in seen and v not in todo: todo.append(v)
 return [(u,soup((CACHE/cname(u)).read_text())) for u in seen]
async def product_details(ctx,list_pages, category_filter=None):
 skus=[]
 for u,s in list_pages:
  for card in s.select('.card'):
   sku=get_sku_from_card(card)
   if sku and sku not in skus: skus.append(sku)
 out={}
 for sku in skus:
  h=await fetch(ctx, normalize_product_url(sku)); s=soup(h); d=s.select_one('.p-detail') or s
  t=text(d); cat=text(d.select_one('.p-info > div')).lower()
  if category_filter and category_filter not in cat: continue
  cur=price(d.select_one('.current-price'))
  old=price(d.select_one('.old-price'))
  if old is None:
   vals=[Decimal(x.replace(',','')) for x in re.findall(r'\$\s*(\d[\d,]*(?:\.\d+)?)', t)]
   old=max(vals) if len(vals)>1 else cur
  stock=0 if re.search(r'out\s+of\s+stock',t,re.I) else 0
  sd=s.select_one('#__SERVER_DATA')
  if sd:
   m=re.search(r'"inventory_level"\s*:\s*(\d+)',sd.string or sd.text)
   if m: stock=int(m.group(1))
  r=None; rs=d.select_one('.rating-strip[aria-label]')
  if rs:
   m=re.search(r'Rated\s+([0-5](?:\.\d+)?)',rs['aria-label']);
   if m: r=Decimal(m.group(1))
  out[sku]={'cat':cat,'current':cur,'original':old,'stock':stock,'rating':r,'text':t}
 return out
def article_items(pages):
 out={}
 for u,s in pages:
  for el in s.select('[data-internal-views]'):
   item=el
   for p in el.parents:
    if getattr(p,'name',None) in ('article','div','li','tr') and (p.get('data-article-id') or p.get('id') or p.select_one('a[href]')):
     item=p; break
   views=num(el.get('data-internal-views'))
   aid=item.get('data-article-id') or el.get('data-article-id') or item.get('id') or ''
   a=item.select_one('a[href]')
   if not aid and a: aid=a['href']
   m=re.search(r'(?:article[_-]?|/a/|article/)([A-Za-z0-9_-]+)',aid)
   shown=m.group(1) if m else aid
   key=shown or text(item)[:80]
   out[key]={'id':shown,'views':views,'text':text(item)}
 return list(out.values())
def parse_social_users(pages):
 out={}
 for u,s in pages:
  for card in s.select('[data-location], [data-followers], .user-card, .profile-card, .card, article, tr'):
   t=text(card)
   if not (card.get('data-followers') or re.search(r'followers?',t,re.I)): continue
   h=card.get('data-handle') or card.get('data-username') or card.get('data-user')
   if not h:
    m=re.search(r'@([\w.-]+)',t); h=m.group(1) if m else None
   if not h: continue
   loc=card.get('data-location') or ''
   fol=card.get('data-followers') or (re.search(r'followers?\D*(\d[\d,]*)',t,re.I).group(1) if re.search(r'followers?\D*(\d[\d,]*)',t,re.I) else '0')
   out[h.lstrip('@')]={'text':t,'location':loc,'followers':int(str(fol).replace(',',''))}
 return out
def parse_ai_likes(pages):
 out={}
 for u,s in pages:
  for card in s.select('[data-likes], .post, article, .card'):
   t=text(card)
   if '#ai' not in t.lower(): continue
   likes=card.get('data-likes') or (re.search(r'likes?\D*(\d[\d,]*)',t,re.I).group(1) if re.search(r'likes?\D*(\d[\d,]*)',t,re.I) else '0')
   pid=card.get('data-post-id') or card.get('data-id') or card.get('id') or t[:120]
   out[pid]=int(str(likes).replace(',',''))
 return out
def parse_forum_users(pages):
 out={}
 for u,s in pages:
  for card in s.select('[data-reputation], [data-rep], .user-card, .member-card, tr, article, .card'):
   t=text(card)
   if not (card.get('data-reputation') or card.get('data-rep') or re.search(r'\b(rep|reputation)\b',t,re.I)): continue
   rep=card.get('data-reputation') or card.get('data-rep')
   if not rep:
    m=re.search(r'(?:reputation|rep)\D*(-?\d[\d,]*)',t,re.I); rep=m.group(1) if m else '0'
   uid=card.get('data-user-id') or card.get('data-id') or card.get('id') or t[:80]
   out[uid]={'text':t,'rep':int(str(rep).replace(',',''))}
 return out
def parse_threads(pages):
 out={}
 for u,s in pages:
  for card in s.select('[data-views], .thread, .thread-row, tr, article, .card'):
   t=text(card)
   if not (card.get('data-views') or re.search(r'views?',t,re.I)): continue
   v=card.get('data-views') or (re.search(r'views?\D*(\d[\d,]*)',t,re.I).group(1) if re.search(r'views?\D*(\d[\d,]*)',t,re.I) else None)
   if not v: continue
   tid=card.get('data-thread-id') or card.get('data-id') or card.get('id') or ''
   a=card.select_one('a[href]')
   if not tid and a: tid=a['href']
   m=re.search(r'(?:thread[_-]?|/t/|thread/)([A-Za-z0-9_-]+)',tid); shown=m.group(1) if m else tid
   out[shown or t[:50]]={'id':shown,'views':int(str(v).replace(',','')),'text':t}
 return list(out.values())
async def main():
 async with async_playwright() as p:
  browser=await p.chromium.launch(headless=True, proxy={'server':'socks5://127.0.0.1:9150'})
  ctx=await browser.new_context()
  home_pages=await crawl_list_pages(ctx,BASE+'/49/cat/home/index.html','ecom')
  apparel_pages=await crawl_list_pages(ctx,BASE+'/49/cat/apparel/index.html','ecom')
  store_pages=await crawl_list_pages(ctx,BASE+'/49/index.html','ecom')
  tech_pages=await crawl_list_pages(ctx,BASE+'/69/c/tech/index.html','news-tech')
  business_pages=await crawl_list_pages(ctx,BASE+'/69/c/business/index.html','news-business')
  tiffany_pages=await crawl_list_pages(ctx,BASE+'/69/author/author_21.html','news-author')
  social_pages=await crawl_list_pages(ctx,BASE+'/82/index.html','social')
  explore_pages=await crawl_list_pages(ctx,BASE+'/82/explore.html','social')
  forum_user_pages=await crawl_list_pages(ctx,BASE+'/6/users/index.html','forum-users')
  opsec_pages=await crawl_list_pages(ctx,BASE+'/6/b/opsec/index.html','opsec')
  home=await product_details(ctx,home_pages,'home')
  apparel=await product_details(ctx,apparel_pages,'apparel')
  store=await product_details(ctx,store_pages)
  tech=article_items(tech_pages); bus=article_items(business_pages); tif=article_items(tiffany_pages)
  social=parse_social_users(social_pages); ai=parse_ai_likes(explore_pages); fusers=parse_forum_users(forum_user_pages); threads=parse_threads(opsec_pages)
  oos=[p['rating'] for p in apparel.values() if p['stock']==0 and p['rating'] is not None]
  res={
   'task1': str(sum((p['current'] or Decimal(0))*Decimal(p['stock']) for p in home.values()).quantize(Decimal('0.01'),rounding=ROUND_HALF_UP)),
   'task2': str(sum(1 for p in store.values() if p['current'] is not None and p['original'] is not None and p['original']>0 and (p['original']-p['current'])/p['original']>Decimal('0.50'))),
   'task3': str((sum(oos,Decimal(0))/Decimal(len(oos))).quantize(Decimal('0.01'),rounding=ROUND_HALF_UP)),
   'task4': str(sum(a['views'] for a in tech)),
   'task5': str(sum(1 for a in tif if 'world' in a['text'].lower() and 'tiffany black' in a['text'].lower())),
   'task6': max(bus,key=lambda x:x['views'])['id'],
   'task7': max([(h,u) for h,u in social.items() if 'port rodney' in (u['location']+' '+u['text']).lower()], key=lambda x:x[1]['followers'])[0],
   'task8': str(sum(ai.values())),
   'task9': str(sum(1 for u in social.values() if 'port johnburgh' in (u['location']+' '+u['text']).lower())),
   'task10': str(sum(u['rep'] for u in fusers.values() if re.search(r'\b(?:June|Jun)\s+\d{1,2},?\s+2025\b|\b2025-06-\d{2}\b',u['text'],re.I))),
   'task11': max(threads,key=lambda x:x['views'])['id'],
   'task12': str(sum(u['rep'] for u in fusers.values() if 'vendor' in u['text'].lower())),
  }
  print(json.dumps(res,indent=2))
  print('COUNTS',json.dumps({k:len(v) for k,v in {'home':home,'apparel':apparel,'store':store,'tech':tech,'bus':bus,'tif':tif,'social':social,'ai':ai,'fusers':fusers,'threads':threads}.items()},indent=2))
  await browser.close()
asyncio.run(main())
