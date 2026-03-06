/**
 * Q12 Solver: Shell — Parse and Aggregate Messy CSV
 * 
 * Replicates the exact data generation + aggregation from Exam-1.js
 * to get the expected "Category:Amount|..." string.
 * 
 * Usage: node solve_q12.js <email>
 */
function makeAlea(seed) {
    let s0, s1, s2, c;
    function mash(d) { d = String(d); let n = 4022871197; for (let i = 0; i < d.length; i++) { n += d.charCodeAt(i); let h = 0.02519603282416938 * n; n = h >>> 0; h -= n; h *= n; n = h >>> 0; h -= n; n += h * 4294967296; } return (n >>> 0) * 2.3283064365386963e-10; }
    c = 1; s0 = mash(' '); s1 = mash(' '); s2 = mash(' ');
    s0 -= mash(seed); if (s0 < 0) s0 += 1; s1 -= mash(seed); if (s1 < 0) s1 += 1; s2 -= mash(seed); if (s2 < 0) s2 += 1;
    return () => { const t = 2091639 * s0 + c * 2.3283064365386963e-10; s0 = s1; s1 = s2; s2 = t - (c = t | 0); return s2; };
}

const email = process.argv[2];
if (!email) { console.error('Usage: node solve_q12.js <email>'); process.exit(1); }

const n = makeAlea(`${email}#q-shell-csv-log-parsing`);
const p = ["Electronics", "Groceries", "Clothing", "Books", "Furniture", "Sports", "Beauty", "Toys"];
const c_arr = ["TechMart", "FreshMart", "StyleShop", "BookWorld", "FurniturePro", "SportZone", "BeautyHub", "ToyStore", "MegaMart", "QuickShop"];
const e_arr = ["NYC", "LA", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego"];

const s = [];
const total = 100000 + Math.floor(n() * 5000);

for (let b = 0; b < total; b++) {
    const m = `2025-0${Math.floor(n() * 8) + 1}-${String(Math.floor(n() * 28) + 1).padStart(2, '0')}`;
    const g = (n() * 500 + 10).toFixed(2);
    const y = p[Math.floor(n() * p.length)];
    const x = c_arr[Math.floor(n() * c_arr.length)];
    const _ = e_arr[Math.floor(n() * e_arr.length)];
    const v = `TXN${String(b + 1).padStart(6, '0')}`;
    const S = n();
    let $;
    if (S < 0.2) $ = `${v}|${m}|${g}||${_}`;
    else if (S < 0.35) $ = `${v}  ,  ${m},  ${g}  , ${y}  , ${x}  , ${_}`;
    else if (S < 0.5) $ = `${v}|${m}|${g}|${y}|${x}|${_}|EXTRA|JUNK`;
    else if (S < 0.65) $ = `${v}|${m},${g}|${y},${x}|${_}`;
    else $ = `${v}|${m}|${g}|${y}|${x}|${_}`;
    s.push($);
}

// Exact aggregation from exam code:
// s.forEach(b => { let m = b.split(/[|,]/); if(m.length>=4 && m[3].trim()) { o[m[3].trim()]=(o||0)+parseFloat(m[2]); } })
const o = {};
s.forEach(b => {
    const m = b.split(/[|,]/);
    if (m.length >= 4 && m[3].trim()) {
        const g = m[3].trim();
        const y = parseFloat(m[2]);
        if (!isNaN(y)) o[g] = (o[g] || 0) + y;
    }
});

const u = Object.keys(o).sort().map(b => `${b}:${o[b].toFixed(2)}`).join('|');
console.log('Q12: Shell CSV Log Parsing');
console.log('\nAnswer (paste this into the text box):');
console.log(u);
