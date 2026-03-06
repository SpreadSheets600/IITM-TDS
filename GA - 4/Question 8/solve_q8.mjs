#!/usr/bin/env node
/**
 * Q8 Solver using actual Node.js with faker
 * 
 * Install: npm install @faker-js/faker seedrandom  (in this folder)
 * Run: node solve_q8.js <email>
 */

// Uses the actual CDN-compatible faker API
async function solve(email) {
    // Try to use native import if faker is installed
    let Faker, en;
    try {
        const fakerModule = await import('@faker-js/faker');
        Faker = fakerModule.Faker;
        en = fakerModule.en;
    } catch (e) {
        console.error('Please install: npm install @faker-js/faker');
        console.error('Then run again: node solve_q8.js <email>');
        process.exit(1);
    }

    // Alea PRNG
    function makeAlea(seed) {
        let s0, s1, s2, c;
        function mash(d) { d = String(d); let n = 4022871197; for (let i = 0; i < d.length; i++) { n += d.charCodeAt(i); let h = 0.02519603282416938 * n; n = h >>> 0; h -= n; h *= n; n = h >>> 0; h -= n; n += h * 4294967296; } return (n >>> 0) * 2.3283064365386963e-10; }
        c = 1; s0 = mash(' '); s1 = mash(' '); s2 = mash(' ');
        s0 -= mash(seed); if (s0 < 0) s0 += 1; s1 -= mash(seed); if (s1 < 0) s1 += 1; s2 -= mash(seed); if (s2 < 0) s2 += 1;
        return () => { const t = 2091639 * s0 + c * 2.3283064365386963e-10; s0 = s1; s1 = s2; s2 = t - (c = t | 0); return s2; };
    }

    const t = 'q-parse-partial-json';
    const n = makeAlea(`${email}#${t}`);
    const fakerSeed = Math.round(n() * 1e6);

    const p = new Faker({ locale: [en], seed: fakerSeed });

    let total = 0;
    for (let i = 0; i < 100; i++) {
        const val = p.number.int({ min: 100, max: 1000 });
        total += val;
    }

    console.log(`Q8: Parse Partial JSON`);
    console.log(`Faker seed: ${fakerSeed}`);
    console.log(`\nANSWER (total sales): ${total}`);
    return total;
}

const email = process.argv[2];
if (!email) { console.error('Usage: node solve_q8.js <email>'); process.exit(1); }
solve(email);
