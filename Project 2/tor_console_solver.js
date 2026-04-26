/*
Paste this whole file into Tor Browser DevTools Console while you are on any page of:
http://tds26vu3ptapxx6igo6n26kuwfpn2l5omkmagc4hc7g7yn2o3xb25syd.onion

It prints the final JSON answer.
*/

(async function onionAssignmentSolver() {
  const ORIGIN = location.origin;
  const parser = new DOMParser();
  const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  let fetchCount = 0;

  async function fetchDoc(path) {
    const url = path.startsWith("http") ? path : ORIGIN + path;
    fetchCount += 1;
    console.log("[fetch " + fetchCount + "] GET " + path);
    const started = Date.now();
    const response = await fetch(url);
    if (!response.ok) {
      console.error("[fetch " + fetchCount + "] FAILED " + response.status + " " + path);
      throw new Error("Fetch failed " + response.status + " for " + url);
    }
    const html = await response.text();
    console.log("[fetch " + fetchCount + "] OK " + path + " (" + html.length + " chars, " + (Date.now() - started) + "ms)");
    return parser.parseFromString(html, "text/html");
  }

  function clean(value) {
    return String(value || "").replace(/\s+/g, " ").trim();
  }

  function firstInt(value) {
    const match = String(value || "").match(/-?\d[\d,]*/);
    return match ? Number(match[0].replace(/,/g, "")) : 0;
  }

  function firstFloat(value) {
    const match = String(value || "").match(/\d[\d,]*(?:\.\d+)?/);
    return match ? Number(match[0].replace(/,/g, "")) : null;
  }

  function moneyFrom(element) {
    if (!element) return null;
    const raw = element.getAttribute("data-raw-price") || element.getAttribute("data-price") || clean(element.textContent);
    return firstFloat(raw);
  }

  function ratingFrom(root) {
    const ratingElement = root.querySelector(".rating-strip[aria-label]");
    if (!ratingElement) return null;
    const label = ratingElement.getAttribute("aria-label") || "";
    const match = label.match(/Rated\s+([0-5](?:\.\d+)?)/i);
    return match ? Number(match[1]) : null;
  }

  function normalizePath(href, basePath, section) {
    href = String(href || "").split("#")[0];
    if (!href) return "";
    if (href.startsWith("http")) return new URL(href).pathname;
    if (href.startsWith("/")) return href;

    if (section === "49") {
      if (href.startsWith("cat/") || href.startsWith("p/") || href.startsWith("offset-")) return "/49/" + href;
      return new URL(href, ORIGIN + basePath).pathname;
    }

    if (section === "69") {
      if (href.startsWith("c/") || href.startsWith("article/") || href.startsWith("author/")) return "/69/" + href;
      return new URL(href, ORIGIN + basePath).pathname;
    }

    if (section === "82") {
      return new URL(href, ORIGIN + basePath).pathname;
    }

    if (section === "6") {
      if (href.startsWith("users/") || href.startsWith("u/") || href.startsWith("b/") || href.startsWith("t/")) return "/6/" + href;
      return new URL(href, ORIGIN + basePath).pathname;
    }

    return new URL(href, ORIGIN + basePath).pathname;
  }

  async function crawlPages(startPath, section, pageLinkSelector, acceptPath) {
    const seen = new Set();
    const queue = [startPath];
    const pages = [];

    while (queue.length > 0) {
      const path = queue.shift();
      if (!path || seen.has(path)) continue;
      seen.add(path);

      console.log("[crawl] visiting " + path + " | queue=" + queue.length + " | seen=" + seen.size);
      const doc = await fetchDoc(path);
      pages.push({ path, doc });

      let added = 0;
      for (const link of doc.querySelectorAll(pageLinkSelector)) {
        const next = normalizePath(link.getAttribute("href"), path, section);
        if (next && acceptPath(next) && !seen.has(next) && !queue.includes(next)) {
          queue.push(next);
          added += 1;
        }
      }
      console.log("[crawl] done " + path + " | added=" + added + " | totalPages=" + pages.length);
      await delay(80);
    }
    return pages;
  }

  async function getProduct(sku) {
    console.log("[product] loading " + sku);
    const doc = await fetchDoc("/49/p/" + sku + ".html");
    const root = doc.querySelector(".p-detail") || doc;
    const allText = clean(root.textContent);

    const category = clean(root.querySelector(".p-info > div")?.textContent).toLowerCase();
    const current = moneyFrom(root.querySelector(".current-price"));
    let original = moneyFrom(root.querySelector(".old-price"));
    if (original === null) original = current;

    let stock = /out\s+of\s+stock/i.test(allText) ? 0 : 0;
    const serverData = doc.querySelector("#__SERVER_DATA");
    if (serverData) {
      const stockMatch = serverData.textContent.match(/"inventory_level"\s*:\s*(\d+)/);
      if (stockMatch) stock = Number(stockMatch[1]);
    }

    const product = {
      sku,
      category,
      current,
      original,
      stock,
      rating: ratingFrom(root),
      text: allText
    };
    console.log("[product] parsed", { sku: product.sku, category: product.category, current: product.current, original: product.original, stock: product.stock, rating: product.rating });
    return product;
  }

  async function getProductsFromPages(pages, categoryFilter) {
    const skus = new Set();
    for (const page of pages) {
      for (const card of page.doc.querySelectorAll(".card")) {
        const match = clean(card.textContent).match(/SM-[A-Z]+-\d+/);
        if (match) skus.add(match[0]);
      }
    }

    console.log("[products] found " + skus.size + " product SKUs" + (categoryFilter ? " for category " + categoryFilter : ""));
    const products = [];
    let index = 0;
    for (const sku of skus) {
      index += 1;
      console.log("[products] " + index + "/" + skus.size + " " + sku);
      const product = await getProduct(sku);
      if (!categoryFilter || product.category.includes(categoryFilter)) {
        products.push(product);
      }
      await delay(80);
    }
    console.log("[products] kept " + products.length + " products" + (categoryFilter ? " for " + categoryFilter : ""));
    return products;
  }

  async function solveEcommerce() {
    console.log("========== TASKS 1-3: E-COMMERCE START ==========");
    const homePages = await crawlPages(
      "/49/cat/home/index.html",
      "49",
      ".pager a",
      (path) => path.startsWith("/49/cat/home")
    );

    const apparelPages = await crawlPages(
      "/49/cat/apparel/index.html",
      "49",
      ".pager a",
      (path) => path.startsWith("/49/cat/apparel")
    );

    const storePages = await crawlPages(
      "/49/index.html",
      "49",
      ".pager a, .cat-nav a",
      (path) => path.startsWith("/49/") && !path.includes("/p/")
    );

    const homeProducts = await getProductsFromPages(homePages, "home");
    const apparelProducts = await getProductsFromPages(apparelPages, "apparel");
    const storeProducts = await getProductsFromPages(storePages, null);

    const task1 = homeProducts.reduce((sum, product) => sum + product.current * product.stock, 0).toFixed(2);

    const task2 = String(storeProducts.filter((product) => {
      if (product.current === null || product.original === null || product.original <= 0) return false;
      return ((product.original - product.current) / product.original) > 0.5;
    }).length);

    const ratings = apparelProducts
      .filter((product) => product.stock === 0 && product.rating !== null)
      .map((product) => product.rating);

    const task3 = (ratings.reduce((a, b) => a + b, 0) / ratings.length).toFixed(2);
    console.log("[ecommerce] counts", { homeProducts: homeProducts.length, apparelProducts: apparelProducts.length, storeProducts: storeProducts.length, outOfStockRatings: ratings.length });
    console.log("========== TASKS 1-3 DONE ==========" , { task1, task2, task3 });
    return { task1, task2, task3 };
  }

  async function getArticleDetails(category) {
    const categoryPages = await crawlPages(
      "/69/c/" + category + "/index.html",
      "69",
      ".pager a",
      (path) => path.startsWith("/69/c/" + category)
    );

    const articlePaths = new Set();
    for (const page of categoryPages) {
      for (const link of page.doc.querySelectorAll(".article-title a[href]")) {
        articlePaths.add(normalizePath(link.getAttribute("href"), page.path, "69"));
      }
    }

    console.log("[news] " + category + " article links found: " + articlePaths.size);
    const articles = [];
    let articleIndex = 0;
    for (const path of articlePaths) {
      articleIndex += 1;
      console.log("[news] " + category + " article " + articleIndex + "/" + articlePaths.size + " " + path);
      const doc = await fetchDoc(path);
      const fullText = clean(doc.textContent);
      const internalViewsElement = doc.querySelector("[data-internal-views]");
      const views = internalViewsElement ? firstInt(internalViewsElement.getAttribute("data-internal-views")) : 0;
      const idMatch = path.match(/202604-\d+/);
      const id = idMatch ? idMatch[0] : path.split("/").pop().replace(".html", "");
      articles.push({ id, path, views, text: fullText });
      console.log("[news] parsed", { category, id, views });
      await delay(80);
    }
    return articles;
  }

  async function solveNews() {
    console.log("========== TASKS 4-6: NEWS START ==========");
    const techArticles = await getArticleDetails("tech");
    const businessArticles = await getArticleDetails("business");

    const task4 = String(techArticles.reduce((sum, article) => sum + article.views, 0));
    const bestBusiness = businessArticles.reduce((best, article) => {
      if (!best || article.views > best.views) return article;
      return best;
    }, null);
    const task6 = bestBusiness.id;

    const authorDoc = await fetchDoc("/69/author/author_21.html");
    const paths = new Set();
    for (const link of authorDoc.querySelectorAll(".article-title a[href], article a[href]")) {
      const href = link.getAttribute("href");
      if (href && href.includes("article/")) paths.add(normalizePath(href, "/69/author/author_21.html", "69"));
    }

    let count = 0;
    for (const path of paths) {
      const doc = await fetchDoc(path);
      const fullText = clean(doc.textContent).toLowerCase();
      if (fullText.includes("tiffany black") && fullText.includes("world")) count += 1;
      await delay(80);
    }

    console.log("[news] counts", { techArticles: techArticles.length, businessArticles: businessArticles.length, tiffanyArticles: paths.size });
    console.log("========== TASKS 4-6 DONE ==========" , { task4, task5: String(count), task6 });
    return { task4, task5: String(count), task6 };
  }

  function visibleLikes(post) {
    const action = Array.from(post.querySelectorAll(".action-stat")).find((el) => {
      return /likes/i.test(el.getAttribute("aria-label") || clean(el.textContent));
    });
    return action ? firstInt(action.textContent) : 0;
  }

  async function getSocialTimelinePages() {
    const pages = await crawlPages(
      "/82/index.html",
      "82",
      ".pager a",
      (path) => path.startsWith("/82/") && !path.includes("/u/")
    );
    pages.push({ path: "/82/explore.html", doc: await fetchDoc("/82/explore.html") });
    return pages;
  }

  async function getSocialUsers(pages) {
    const profilePaths = new Set();
    for (const page of pages) {
      for (const link of page.doc.querySelectorAll("a.handle[href], a.display-name[href]")) {
        const href = link.getAttribute("href");
        if (href && href.includes("u/")) profilePaths.add(normalizePath(href, page.path, "82"));
      }
    }

    console.log("[social] profile links found: " + profilePaths.size);
    const users = [];
    let profileIndex = 0;
    for (const path of profilePaths) {
      profileIndex += 1;
      console.log("[social] profile " + profileIndex + "/" + profilePaths.size + " " + path);
      const doc = await fetchDoc(path);
      const fullText = clean(doc.textContent);
      const handleMatch = fullText.match(/@([A-Za-z0-9_.-]+)/);
      const handle = handleMatch ? handleMatch[1] : path.split("/").filter(Boolean).slice(-2)[0];

      const locationMatch = fullText.match(/Location\s*:?\s*([A-Za-z ]+?)(?:\s+(?:Joined|Followers|Following|Posts)|$)/i);
      const location = locationMatch ? clean(locationMatch[1]) : fullText;

      let followers = 0;
      const possibleStats = Array.from(doc.querySelectorAll(".profile-stats *, .stat-val"));
      for (const element of possibleStats) {
        const block = clean(element.parentElement ? element.parentElement.textContent : element.textContent);
        if (/followers/i.test(block)) {
          followers = firstInt(block);
          break;
        }
      }
      if (!followers) {
        const followerMatch = fullText.match(/Followers\s*:?\s*([\d,]+)/i);
        if (followerMatch) followers = firstInt(followerMatch[1]);
      }

      users.push({ handle, location, followers, text: fullText });
      console.log("[social] parsed user", { handle, location, followers });
      await delay(80);
    }
    return users;
  }

  async function solveSocial() {
    console.log("========== TASKS 7-9: SOCIAL START ==========");
    const pages = await getSocialTimelinePages();
    const users = await getSocialUsers(pages);

    const portRodney = users.filter((user) => (user.location + " " + user.text).toLowerCase().includes("port rodney"));
    const top = portRodney.reduce((best, user) => {
      if (!best || user.followers > best.followers) return user;
      return best;
    }, null);

    const aiLikesByPost = new Map();
    for (const page of pages) {
      for (const post of page.doc.querySelectorAll(".post-card[data-post-id]")) {
        if (clean(post.textContent).toLowerCase().includes("#ai")) {
          aiLikesByPost.set(post.getAttribute("data-post-id"), visibleLikes(post));
        }
      }
    }

    const task7 = top ? top.handle.replace(/^@/, "") : "";
    const task8 = String(Array.from(aiLikesByPost.values()).reduce((a, b) => a + b, 0));
    const task9 = String(users.filter((user) => (user.location + " " + user.text).toLowerCase().includes("port johnburgh")).length);

    console.log("[social] counts", { pages: pages.length, users: users.length, portRodney: portRodney.length, aiPosts: aiLikesByPost.size });
    console.log("========== TASKS 7-9 DONE ==========" , { task7, task8, task9 });
    return { task7, task8, task9 };
  }

  async function getForumUsers() {
    const usersDoc = await fetchDoc("/6/users/index.html");
    const rows = Array.from(usersDoc.querySelectorAll(".board-list tbody tr"));
    console.log("[forum] member rows found: " + rows.length);
    const users = [];
    let userIndex = 0;

    for (const row of rows) {
      const link = row.querySelector("a[href]");
      const cells = row.querySelectorAll("td");
      if (!link || cells.length < 2) continue;

      userIndex += 1;
      const username = clean(link.textContent);
      console.log("[forum] user " + userIndex + "/" + rows.length + " " + username);
      const reputation = firstInt(cells[1].textContent);
      const profilePath = normalizePath(link.getAttribute("href"), "/6/users/index.html", "6");
      const profileDoc = await fetchDoc(profilePath);
      const fullText = clean(profileDoc.textContent);

      users.push({ username, reputation, text: fullText });
      console.log("[forum] parsed user", { username, reputation, vendor: /\bVendor\b/i.test(fullText), june2025: /\b(?:June|Jun)\s+\d{1,2},?\s+2025\b|\b2025-06-\d{2}\b/i.test(fullText) });
      await delay(80);
    }
    return users;
  }

  async function solveForum() {
    console.log("========== TASKS 10-12: FORUM START ==========");
    const users = await getForumUsers();

    const task10 = String(users
      .filter((user) => /\b(?:June|Jun)\s+\d{1,2},?\s+2025\b|\b2025-06-\d{2}\b/i.test(user.text))
      .reduce((sum, user) => sum + user.reputation, 0));

    const task12 = String(users
      .filter((user) => /\bVendor\b/i.test(user.text))
      .reduce((sum, user) => sum + user.reputation, 0));

    const opsecPages = await crawlPages(
      "/6/b/opsec/index.html",
      "6",
      ".pagination a",
      (path) => path.startsWith("/6/b/opsec")
    );

    let bestThread = null;
    for (const page of opsecPages) {
      for (const row of page.doc.querySelectorAll(".thread-list tbody tr")) {
        const link = row.querySelector("td:first-child a[href]");
        const viewsElement = row.querySelector("[data-views]");
        if (!link || !viewsElement) continue;

        const views = firstInt(viewsElement.getAttribute("data-views"));
        const href = link.getAttribute("href") || "";
        const idMatch = href.match(/(\d+)\.html/);
        const id = idMatch ? idMatch[1] : href;

        if (!bestThread || views > bestThread.views) {
          bestThread = { id, views };
        }
      }
    }

    const task11 = bestThread ? bestThread.id : "";
    console.log("[forum] counts", { users: users.length, opsecPages: opsecPages.length, bestThread });
    console.log("========== TASKS 10-12 DONE ==========" , { task10, task11, task12 });
    return { task10, task11, task12 };
  }

  console.log("Starting solver. Tor may take a few minutes...");

  const ecommerce = await solveEcommerce();
  console.log("E-commerce complete", ecommerce);

  const news = await solveNews();
  console.log("News complete", news);

  const social = await solveSocial();
  console.log("Social complete", social);

  const forum = await solveForum();
  console.log("Forum complete", forum);

  const result = {
    task1: ecommerce.task1,
    task2: ecommerce.task2,
    task3: ecommerce.task3,
    task4: news.task4,
    task5: news.task5,
    task6: news.task6,
    task7: social.task7,
    task8: social.task8,
    task9: social.task9,
    task10: forum.task10,
    task11: forum.task11,
    task12: forum.task12
  };

  console.log("FINAL ANSWER JSON:");
  console.log(JSON.stringify(result, null, 2));
  return result;
})();
