/**
 * Q2 Solver: Excel Z-Score Outlier Surveillance
 * Question ID: q-excel-zscore-outlier
 *
 * Algorithm:
 * - Generates 90-110 clinic scores using Box-Muller transform
 * - Injects 6-8 outliers (±12-18 added to a random score)
 * - Counts clinics where |z-score| >= 2.5 (using sample stdev)
 * - Tolerance: answer ± 1 is accepted
 *
 * Usage: node solve.js <email>
 */

function alea(seed) {
    let s0, s1, s2, c;
    function mash(data) {
        data = String(data);
        let n = 4022871197;
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0; h -= n; h *= n; n = h >>> 0; h -= n; n += h * 4294967296;
        }
        return (n >>> 0) * 2.3283064365386963e-10;
    }
    c = 1;
    s0 = mash(" "); s1 = mash(" "); s2 = mash(" ");
    s0 -= mash(seed); if (s0 < 0) s0 += 1;
    s1 -= mash(seed); if (s1 < 0) s1 += 1;
    s2 -= mash(seed); if (s2 < 0) s2 += 1;
    return function () {
        let t = 2091639 * s0 + c * 2.3283064365386963e-10;
        s0 = s1; s1 = s2; s2 = t - (c = t | 0);
        return s2;
    };
}

function solve(email) {
    const t = "q-excel-zscore-outlier";
    const n = alea(`${email}#${t}`);

    const p = 90 + Math.floor(n() * 20);  // number of stores 90-109
    const e = [];

    // Box-Muller to get normal scores
    const s = () => {
        const m = Math.max(n(), Number.EPSILON);
        const g = n();
        return Math.sqrt(-2 * Math.log(m)) * Math.cos(2 * Math.PI * g);
    };

    for (let m = 1; m <= p; m++) {
        const g = 78 + s() * 5.2;
        e.push(g);
    }

    // Inject outliers
    const l = 6 + Math.floor(n() * 3);  // 6-8 outliers
    for (let m = 0; m < l; m++) {
        const g = n() < 0.5 ? -1 : 1;
        const y = 12 + n() * 6;
        e[Math.floor(n() * e.length)] += g * y;
    }

    // Clamp to [40, 100]
    for (let m = 0; m < e.length; m++) {
        e[m] = Math.max(40, Math.min(100, e[m]));
    }

    // Compute mean and sample stdev
    const mean = e.reduce((a, b) => a + b, 0) / e.length;
    const variance = e.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / (e.length - 1);
    const stdev = Math.sqrt(variance);

    // Count outliers
    const h = e.filter(m => Math.abs((m - mean) / stdev) >= 2.5).length;

    console.log(`Number of stores: ${p}`);
    console.log(`Outliers injected: ${l}`);
    console.log(`Mean: ${mean.toFixed(4)}, Stdev: ${stdev.toFixed(4)}`);
    console.log(`Clinics with |z-score| >= 2.5: ${h}`);
    console.log(`(Answer accepted within ±1, so ${h - 1}, ${h}, or ${h + 1} are all valid)`);
    return h;
}

const email = process.argv[2];
if (!email) {
    console.error("Usage: node solve.js <email>");
    process.exit(1);
}
solve(email);
