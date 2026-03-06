/**
 * Q5 Solver: OpenRefine - Supplier Spend Consolidation  
 * Question ID: q-openrefine-supplier-spend
 * 
 * Generates 520 invoice records and computes total approved spend
 * for a specific supplier + category combination.
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

function A(arr, rng) {
    return arr[Math.floor(rng() * arr.length)];
}

function solve(email) {
    const t = "q-openrefine-supplier-spend";
    const n = alea(`${email}#${t}`);

    const p = [
        { canonical: "Astra Supplies", variants: ["Astra Supplies", "AstraSupply", "Astra-Supplies", "Astra suppl.", "Astra Spp"] },
        { canonical: "Nova Packaging", variants: ["Nova Packaging", "Nova Packg.", "Nova-Packaging", "Novapackaging", "NovaPack"] },
        { canonical: "Lumen Analytics", variants: ["Lumen Analytics", "Lumen-Analytics", "Lumen Analytix", "LumenAnalytics", "LumenAnalytic"] },
        { canonical: "Vertex Logistics", variants: ["Vertex Logistics", "VertexLogistics", "Vertex Log.", "Vertex-Logistics", "Vtx Logistics"] },
        { canonical: "Helios Robotics", variants: ["Helios Robotics", "Helios-Robotics", "Helios Robotix", "HeliosRobotics", "HELIOS ROBOTICS"] },
        { canonical: "Zenith Components", variants: ["Zenith Components", "Zenith-Components", "Zenith Component", "ZenithComponents", "Zenith Comp."] },
    ];
    const c_arr = ["Hardware", "Software", "Logistics", "Professional Services", "Facility", "Cloud"];

    // a = (y) => `${" ".repeat(floor(n()*2))}${y}${" ".repeat(floor(n()*2))}`
    const a = (y) => { n(); n(); return y; };  // 2 rng calls

    const l = [];
    const u = 520;

    for (let y = 0; y < u; y++) {
        const x = A(p, n);      // 1 call: supplier
        const _ = A(c_arr, n);  // 1 call: category
        const v = n();          // 1 call: status roll
        const S = v > 0.8 ? "Pending" : v > 0.65 ? "On Hold" : v > 0.55 ? "Rejected" : "Approved";
        const $ = Math.round((n() * 9500 + 500) * 100) / 100;   // 1 call: amount
        // date: 1 call
        n(); // date fraction (o = random date)
        // E = `INV-${...}` : n() for invoice ID
        n(); // invoice id random

        // k = A([6 notes], n)
        n(); // notes

        // T = n() < .6 ? `$${...}` : `USD ${...}` with n() < .4 inside
        const t_r = n(); // currency format  
        if (t_r >= 0.6) {
            n(); // inner comma replacement check
        }

        // s.push([E, a(A(x.variants, n)), a(_), a(date), a(S), a(T), a(comment)])
        // A(x.variants, n): 1 call
        n(); // A(x.variants, n)
        a("variant");   // 2 calls
        a(_);           // 2 calls
        a("date");      // 2 calls
        a(S);           // 2 calls
        a("T");         // 2 calls
        a("comment");   // 2 calls

        // Bonus row if n() < .08
        const dup_r = n(); // 1 call
        if (dup_r < 0.08) {
            // duplicate push: A(x.variants, n) + a(...) * 6 = 1 + 12 calls
            n(); // A(x.variants)
            a("v"); a("c"); a("date2"); a(S); a("T2"); a("dup comment");
        }

        l.push({
            invoiceId: `INV-${y}`,
            supplier: x.canonical,
            category: _,
            status: S,
            amount: $,
        });
    }

    // Filter: supplier=w, category=f, status=Approved
    const w = A(p, n).canonical;  // 1 call
    const f_cat = A(c_arr, n);    // 1 call

    const b = l
        .filter(({ supplier, category, status }) => supplier === w && category === f_cat && status === "Approved")
        .reduce((acc, x) => acc + x.amount, 0);

    console.log(`Filter: supplier="${w}", category="${f_cat}", status="Approved"`);
    console.log(`Total Approved Spend: ${b.toFixed(2)}`);
    return b;
}

const email = process.argv[2];
if (!email) {
    console.error("Usage: node solve.js <email>");
    process.exit(1);
}
solve(email);
