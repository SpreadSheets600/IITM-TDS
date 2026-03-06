/**
 * Q13 Solver: Shell — Extract and Flatten Nested JSON from ZIP
 * 
 * Usage: node solve_q13.js <email>
 */
function makeAlea(seed) {
    let s0, s1, s2, c;
    function mash(d) { d = String(d); let n = 4022871197; for (let i = 0; i < d.length; i++) { n += d.charCodeAt(i); let h = 0.02519603282416938 * n; n = h >>> 0; h -= n; h *= n; n = h >>> 0; h -= n; n += h * 4294967296; } return (n >>> 0) * 2.3283064365386963e-10; }
    c = 1; s0 = mash(' '); s1 = mash(' '); s2 = mash(' ');
    s0 -= mash(seed); if (s0 < 0) s0 += 1; s1 -= mash(seed); if (s1 < 0) s1 += 1; s2 -= mash(seed); if (s2 < 0) s2 += 1;
    return () => { const t = 2091639 * s0 + c * 2.3283064365386963e-10; s0 = s1; s1 = s2; s2 = t - (c = t | 0); return s2; };
}

const email = process.argv[2];
if (!email) { console.error('Usage: node solve_q13.js <email>'); process.exit(1); }

const n = makeAlea(`${email}#q-shell-json-extraction`);
const e = 50 + Math.floor(n() * 30);  // number of files

const s = {};  // level -> count

for (let w = 0; w < e; w++) {
    const b = 5 + Math.floor(n() * 8);  // records per file
    for (let m = 0; m < b; m++) {
        n(); // id USR prefix
        n(); // username User prefix  
        n(); // email from username
        n(); // phone
        n(); // score
        const level = Math.floor(n() * 10) + 1;
        s[level] = (s[level] || 0) + 1;
    }
}

const o = Object.keys(s).sort((a, b) => parseInt(a) - parseInt(b)).map(w => `level${w}:${s[w]}`).join('|');
console.log('Q13: Shell JSON Extraction');
console.log('\nAnswer (paste this into the text box):');
console.log(o);
