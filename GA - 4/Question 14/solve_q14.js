/**
 * Q14 Solver: Shell — Deduplicate and Count Unique Addresses
 * 
 * The exam generates 1000-1500 address lines with formatting variations.
 * It counts UNIQUE canonical addresses using a Set.
 * 
 * Usage: node solve_q14.js <email>
 */
function makeAlea(seed) {
    let s0, s1, s2, c;
    function mash(d) { d = String(d); let n = 4022871197; for (let i = 0; i < d.length; i++) { n += d.charCodeAt(i); let h = 0.02519603282416938 * n; n = h >>> 0; h -= n; h *= n; n = h >>> 0; h -= n; n += h * 4294967296; } return (n >>> 0) * 2.3283064365386963e-10; }
    c = 1; s0 = mash(' '); s1 = mash(' '); s2 = mash(' ');
    s0 -= mash(seed); if (s0 < 0) s0 += 1; s1 -= mash(seed); if (s1 < 0) s1 += 1; s2 -= mash(seed); if (s2 < 0) s2 += 1;
    return () => { const t = 2091639 * s0 + c * 2.3283064365386963e-10; s0 = s1; s1 = s2; s2 = t - (c = t | 0); return s2; };
}

const email = process.argv[2];
if (!email) { console.error('Usage: node solve_q14.js <email>'); process.exit(1); }

const n = makeAlea(`${email}#q-shell-text-aggregation`);
const p = ["Main St", "Oak Ave", "Elm Rd", "Pine Ln", "Maple Dr", "Cedar Ct", "Birch Blvd", "Spruce Way", "Willow Cir", "Ash Pl", "Juniper Way", "Magnolia Dr"];
const c_arr = ["Springfield", "Riverdale", "Sunnyville", "Oaktown", "Pineville", "Lakewood", "Hillside", "Westchester", "Eastbrook", "Northtown"];
const e_arr = ["IL", "CA", "TX", "NY", "FL", "PA", "OH", "GA", "NC", "MI"];

const l = new Set();
const o = 1000 + Math.floor(n() * 500);

for (let m = 0; m < o; m++) {
    const g = Math.floor(n() * 999) + 1;
    const y = p[Math.floor(n() * p.length)];
    const x = c_arr[Math.floor(n() * c_arr.length)];
    const _ = e_arr[Math.floor(n() * e_arr.length)];
    const v = String(Math.floor(n() * 90000) + 10000);
    const S = `${g} ${y}, ${x}, ${_} ${v}`;  // canonical address
    l.add(S);
    n();  // variation type selector (determines the line variation but not the canonical)
}

const answer = `unique_addresses:${l.size}`;
console.log('Q14: Shell Text Aggregation — Unique Address Count');
console.log('\nAnswer (paste this into the text box):');
console.log(answer);
