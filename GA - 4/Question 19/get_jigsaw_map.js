/**
 * Q19 Helper: Get Jigsaw Tile Permutation
 * 
 * The jigsaw puzzle uses email-seeded PRNG to shuffle 25 tiles.
 * This script computes the exact permutation.
 * 
 * Usage: node get_jigsaw_map.js <email>
 */
function makeAlea(seed) {
    let s0, s1, s2, c;
    function mash(d) { d = String(d); let n = 4022871197; for (let i = 0; i < d.length; i++) { n += d.charCodeAt(i); let h = 0.02519603282416938 * n; n = h >>> 0; h -= n; h *= n; n = h >>> 0; h -= n; n += h * 4294967296; } return (n >>> 0) * 2.3283064365386963e-10; }
    c = 1; s0 = mash(' '); s1 = mash(' '); s2 = mash(' ');
    s0 -= mash(seed); if (s0 < 0) s0 += 1; s1 -= mash(seed); if (s1 < 0) s1 += 1; s2 -= mash(seed); if (s2 < 0) s2 += 1;
    return () => { const t = 2091639 * s0 + c * 2.3283064365386963e-10; s0 = s1; s1 = s2; s2 = t - (c = t | 0); return s2; };
}

// From the image-jigsaw question in Exam-2.js or image-grayscale
// The q-image-jigsaw question seeds a shuffle of 25 tiles
const email = process.argv[2];
if (!email) { console.error('Usage: node get_jigsaw_map.js <email>'); process.exit(1); }

// Seed: email#q-image-jigsaw (from Exam-2.js)
const n = makeAlea(`${email}#q-image-jigsaw`);

// Shuffle [0..24] using Fisher-Yates with alea
const tiles = Array.from({ length: 25 }, (_, i) => i);
for (let i = tiles.length - 1; i > 0; i--) {
    const j = Math.floor(n() * (i + 1));
    [tiles[i], tiles[j]] = [tiles[j], tiles[i]];
}

console.log('Jigsaw tile permutation (scrambled[i] = original tile index):');
console.log(JSON.stringify(tiles));
console.log('\nCopy this into solve_q19.py as TILE_MAP');
console.log('\nSo to reassemble: target position i should be filled with tile tiles[i]');
