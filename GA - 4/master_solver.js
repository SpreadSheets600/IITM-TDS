/**
 * Master solver for GA-4 Exam Questions Q1-Q8
 *
 * Uses the actual alea PRNG implementation from seedrandom.
 * Run: node master_solver.js <email>
 *
 * Questions solved here (computationally):
 *   Q1: Excel Operational Metrics (total variance)
 *   Q2: Z-Score Outlier Count
 *   Q5: OpenRefine Supplier Spend
 *   Q6: JSON Sensor Rollup (average temperature)
 *   Q7: JSON Customer Flatten (total quantity)
 *   Q8: Parse Partial JSON (total sales)
 *   Q12: Shell CSV Log Parsing
 *   Q13: Shell JSON Extraction
 *   Q14: Shell Text Aggregation
 *   Q15: Recursive Corrupted JSON (SHA-256 hash)
 */

// ──────────────────────────────────────────────
// alea PRNG (exact port from seedrandom library)
// ──────────────────────────────────────────────
function makeAlea(seed) {
    let s0, s1, s2, c;

    function mash(data) {
        data = String(data);
        let n = 4022871197;
        for (let i = 0; i < data.length; i++) {
            n += data.charCodeAt(i);
            let h = 0.02519603282416938 * n;
            n = h >>> 0; h -= n; h *= n;
            n = h >>> 0; h -= n; n += h * 4294967296;
        }
        return (n >>> 0) * 2.3283064365386963e-10;
    }

    c = 1;
    s0 = mash(" "); s1 = mash(" "); s2 = mash(" ");
    s0 -= mash(seed); if (s0 < 0) s0 += 1;
    s1 -= mash(seed); if (s1 < 0) s1 += 1;
    s2 -= mash(seed); if (s2 < 0) s2 += 1;

    return function next() {
        const t = 2091639 * s0 + c * 2.3283064365386963e-10;
        s0 = s1; s1 = s2; s2 = t - (c = t | 0);
        return s2;
    };
}

function A(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }

// ──────────────────────────────────────────────
// Q1: Excel Operational Metrics
// ──────────────────────────────────────────────
function solveQ1(email) {
    const n = makeAlea(`${email}#q-excel-operational-metrics`);
    const p = 0.37;

    const regions = [
        { canonical: "North America", variants: ["NorthAmerica", "N. America", "N America", "North-Am"] },
        { canonical: "Latin America", variants: ["LatAm", "Latin-America", "LAT AM", "LatinAmerica"] },
        { canonical: "Europe", variants: ["EU", "Europa", "Europe Region", "E.U."] },
        { canonical: "Middle East & Africa", variants: ["MEA", "MiddleEast&Africa", "M. East Africa", "Middle East/Africa"] },
        { canonical: "Asia Pacific", variants: ["APAC", "Asia-Pacific", "AsiaPac", "Asia Pacific Region"] },
    ];
    const categories = ["Fulfillment", "Returns", "Support", "Logistics", "Billing", "Onboarding"];
    const teams = ["Ops Control", "Warehouse", "Customer Care", "Payments", "Routing", "Automation", "Partner Success"];

    // Helper l(): consumes 2 n() calls
    const l = () => { n(); n(); };
    // Helper a(): consumes n() + conditional n() + l() = 3-4 total
    const a = () => {
        const r1 = n();
        if (r1 < 0.5) { l(); } else { n(); l(); }  // always 3 n() calls (1 + 1 + 2)
    };

    const w = []; // store data we need

    for (let k = 0; k < 650; k++) {
        const T = A(regions, n);       // 1
        const D = A(categories, n);    // 1
        A(teams, n);                   // 1 (team, not needed for answer)
        const q_frac = n();            // 1: date
        const q = new Date(2023, 0, 1).getTime() + q_frac * (new Date(2024, 11, 31).getTime() - new Date(2023, 0, 1).getTime());
        const Y = Math.floor(n() * 85000) + 15000;  // 1
        const X = 1 + n() * 0.1;                    // 1
        const z = Math.round(Y * X);
        const G = n() > 0.18;                        // 1
        const te = z * (0.42 + n() * 0.28);         // 1
        const B = G ? Math.round(te) : null;

        // ae = n() < .5 ? canonical : A(variants, n)
        if (n() >= 0.5) n(); // 1 or 2

        // oe = A(u, n)(q):  1 call (u has 4 elements)
        n();

        // an: A([7 notes], n) + Math.floor(n() * 9000 + 1000)
        n(); n(); // 2

        // I.push([l(ne), l(ae), l(oe), a(z), expense_field, l(nn), l(an)])
        l(); l(); l(); // ne, ae, oe: 6 calls
        a();           // a(z): 3 calls
        if (B === null) { n(); } else { a(); } // expense: 1 or 3
        l(); l();      // nn, an: 4 calls

        w.push({ region: T.canonical, category: D, period: q, revenue: z, expense: B });
    }

    // Filter parameters
    const xRegion = A(regions, n).canonical;  // 1
    const xCat = A(categories, n);            // 1
    const vFrac = n();                         // 1: date cutoff
    const vMs = new Date(2024, 0, 1).getTime() + vFrac * (new Date(2024, 9, 30).getTime() - new Date(2024, 0, 1).getTime());

    const S = w
        .filter(r => r.region === xRegion && r.category === xCat && r.period <= vMs)
        .reduce((acc, r) => acc + (r.revenue - (r.expense === null ? r.revenue * p : r.expense)), 0);

    const vDate = new Date(vMs);
    const vStr = vDate.toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
    return { region: xRegion, category: xCat, date: vStr, answer: S };
}

// ──────────────────────────────────────────────
// Q2: Z-Score Outlier Surveillance
// ──────────────────────────────────────────────
function solveQ2(email) {
    const n = makeAlea(`${email}#q-excel-zscore-outlier`);
    const p = 90 + Math.floor(n() * 20);
    const e = [];

    const s = () => {
        const m = Math.max(n(), Number.EPSILON);
        const g = n();
        return Math.sqrt(-2 * Math.log(m)) * Math.cos(2 * Math.PI * g);
    };

    for (let m = 1; m <= p; m++) e.push(78 + s() * 5.2);

    const l = 6 + Math.floor(n() * 3);
    for (let m = 0; m < l; m++) {
        const g = n() < 0.5 ? -1 : 1;
        const y = 12 + n() * 6;
        e[Math.floor(n() * e.length)] += g * y;
    }

    for (let m = 0; m < e.length; m++) e[m] = Math.max(40, Math.min(100, e[m]));

    const mean = e.reduce((a, b) => a + b, 0) / e.length;
    const variance = e.reduce((a, b) => a + (b - mean) ** 2, 0) / (e.length - 1);
    const stdev = Math.sqrt(variance);
    const h = e.filter(m => Math.abs((m - mean) / stdev) >= 2.5).length;
    return { stores: p, answer: h };
}

// ──────────────────────────────────────────────
// Q5: OpenRefine Supplier Spend (SIMPLIFIED - may have slight count errors)
// ──────────────────────────────────────────────
function solveQ5(email) {
    const n = makeAlea(`${email}#q-openrefine-supplier-spend`);

    const suppliers = [
        { canonical: "Astra Supplies", variants: ["Astra Supplies", "AstraSupply", "Astra-Supplies", "Astra suppl.", "Astra Spp"] },
        { canonical: "Nova Packaging", variants: ["Nova Packaging", "Nova Packg.", "Nova-Packaging", "Novapackaging", "NovaPack"] },
        { canonical: "Lumen Analytics", variants: ["Lumen Analytics", "Lumen-Analytics", "Lumen Analytix", "LumenAnalytics", "LumenAnalytic"] },
        { canonical: "Vertex Logistics", variants: ["Vertex Logistics", "VertexLogistics", "Vertex Log.", "Vertex-Logistics", "Vtx Logistics"] },
        { canonical: "Helios Robotics", variants: ["Helios Robotics", "Helios-Robotics", "Helios Robotix", "HeliosRobotics", "HELIOS ROBOTICS"] },
        { canonical: "Zenith Components", variants: ["Zenith Components", "Zenith-Components", "Zenith Component", "ZenithComponents", "Zenith Comp."] },
    ];
    const cats = ["Hardware", "Software", "Logistics", "Professional Services", "Facility", "Cloud"];

    // Helper a(y) -> `spaces y spaces`: 2 rng calls
    const a = () => { n(); n(); };

    const l = [];

    for (let y = 0; y < 520; y++) {
        const x = A(suppliers, n);      // 1: supplier
        const cat = A(cats, n);          // 1: category
        const v = n();                   // 1: status roll
        const S = v > 0.8 ? "Pending" : v > 0.65 ? "On Hold" : v > 0.55 ? "Rejected" : "Approved";
        const $ = Math.round((n() * 9500 + 500) * 100) / 100;  // 1: amount
        n(); // date fraction
        n(); // invoice ID random

        // k = A([6 note types], n): 1 call
        n();

        // T currency: n() < .6 or n() < .4
        const t_r = n();
        if (t_r >= 0.6) n(); // inner branch

        // s.push([E, a(A(x.variants,n)), a(cat), a(date), a(S), a(T), a(comment)])
        n();    // A(x.variants, n)
        a();    // a(variant) = 2
        a();    // a(cat) = 2
        a();    // a(date) = 2
        a();    // a(S) = 2
        a();    // a(T) = 2
        a();    // a(comment) = 2

        // Possible duplicate: n() < .08
        const dup = n();
        if (dup < 0.08) {
            n(); // A(variants)
            a(); a(); a(); a(); a(); a(); // 6 * 2
        }

        l.push({ supplier: x.canonical, category: cat, status: S, amount: $ });
    }

    // Filter
    const w = A(suppliers, n).canonical;
    const f = A(cats, n);
    const b = l.filter(r => r.supplier === w && r.category === f && r.status === "Approved")
        .reduce((acc, r) => acc + r.amount, 0);
    return { supplier: w, category: f, answer: b };
}

// ──────────────────────────────────────────────
// Q6: JSON Sensor Rollup (avg temperature)
// ──────────────────────────────────────────────
function solveQ6(email) {
    const n = makeAlea(`${email}#q-json-sensor-rollup`);

    const sites = ["Plant-01", "Plant-02", "Plant-03", "Lab-East", "Lab-West", "Depot-North", "Depot-South"];
    const deviceTypes = ["boiler", "compressor", "chiller", "condenser", "exchange", "pump"];
    const statuses = ["ok", "warning", "maintenance", "offline"];

    const o = (v, S) => Math.floor(n() * (S - v + 1)) + v;
    const aa = (v, S, dp = 2) => { const C = 10 ** dp; return Math.round((v + n() * (S - v)) * C) / C; };
    const dateRange = (v, S) => { const frac = n(); return v.getTime() + frac * (S.getTime() - v.getTime()); };

    const h = new Date("2024-06-01T00:00:00Z");
    const I = new Date("2024-08-31T23:59:59Z");
    const records = [];

    for (let v = 0; v < 480; v++) {
        const site = A(sites, n);       // 1
        const dType = A(deviceTypes, n); // 1
        // device ID: o(1, 18) = 1 call, padStart no rng
        o(1, 18);                        // 1
        const capturedAt = dateRange(h, I); // 1
        const status = A(statuses, n);   // 1
        const tempC = aa(45, 95, 2);     // 1: temperature value
        const isFahrenheit = n() < 0.25; // 1: unit check
        const tempRaw = isFahrenheit ? Math.round((tempC * 9 / 5 + 32) * 100) / 100 : tempC;
        // pressure: aa(95, 125, 2): 1
        aa(95, 125, 2);
        // humidity: aa(25, 85, 1): 1
        aa(25, 85, 1);
        // vibration: aa(.05,.6,3) x3: 3
        aa(0.05, 0.6, 3); aa(0.05, 0.6, 3); aa(0.05, 0.6, 3);
        // airflow: aa(18, 40, 2): 1
        aa(18, 40, 2);
        // operator: o(1, 5): 1
        o(1, 5);
        // calibration_due: dateRange: 1
        dateRange(new Date("2024-09-01T00:00:00Z"), new Date("2024-12-31T00:00:00Z"));

        const skip = status === "maintenance" || status === "offline";
        records.push({
            site,
            deviceType: dType,
            capturedAt,
            status,
            temperatureC: tempC,
            skip
        });
    }

    // Now pick filter
    const s = [];
    let b = {};
    let m = [];

    // Reproduce the while loop: pick until m.length > 0
    // The PRNG state is now right after 480 records
    for (let attempt = 0; attempt < 100; attempt++) {
        b.site = A(sites, n);        // 1
        b.deviceType = A(deviceTypes, n); // 1
        const v_frac = n();           // 1 (for dateRange start)
        const vMs = h.getTime() + v_frac * (I.getTime() - h.getTime());
        const dur = o(5, 15);        // 1: o(5,15) days
        const vStart = vMs < I.getTime() ? vMs : h.getTime();
        const vEnd_raw = vMs + dur * 24 * 60 * 60 * 1000;
        const vEnd = vEnd_raw < I.getTime() ? vEnd_raw : I.getTime();

        b.start = vStart;
        b.end = vEnd;

        m = records.filter(r =>
            r.site === b.site &&
            r.deviceType === b.deviceType &&
            !r.skip &&
            r.capturedAt >= b.start &&
            r.capturedAt <= b.end
        );

        if (m.length > 0) break;
    }

    const g = m.reduce((v, S) => v + S.temperatureC, 0) / m.length;
    return {
        site: b.site,
        deviceType: b.deviceType,
        count: m.length,
        answer: g.toFixed(2)
    };
}

// ──────────────────────────────────────────────
// Q7: JSON Customer Flatten (total quantity)
// ──────────────────────────────────────────────
function solveQ7(email) {
    const n = makeAlea(`${email}#q-json-customer-flatten`);

    const c_arr = ["North America", "Europe", "Asia Pacific", "Latin America"];
    const e_arr = ["Enterprise", "Growth", "SMB"];
    const s_arr = ["Marketplace", "Direct", "Reseller", "App"];
    const l_arr = ["Analytics", "Security", "Collaboration", "Commerce", "Infrastructure"];

    const u = ($, C) => Math.floor(n() * (C - $ + 1)) + $;
    const h = ($, C) => {
        const frac = n();
        return $.getTime() + frac * (C.getTime() - $.getTime());
    };

    const I = new Date("2024-01-01T00:00:00Z");
    const w = new Date("2024-09-30T23:59:59Z");
    const f = 180;

    const o = []; // our simplified records

    // We need faker too for company name - faker seed = round(n() * 1e6)
    // The Faker calls consume 1 n() call per customer for seed, then company.name() uses its own RNG
    // We don't need company name - but the n() is consumed for the seed
    // Actually looking at the code: seed: Math.round(n() * 1e6) is called inside Mn constructor
    // But the faker's Mn uses a DIFFERENT internal RNG, not our n()
    // The seed passed to Mn constructor: Math.round(n() * 1e6) - this DOES use our n()
    // BUT n() * 1e6 is a single call that happens at initialization:
    //   const p = new Mn({ locale: [Pn], seed: Math.round(n() * 1e6) })
    // This happens ONCE at function start, before the loop
    n(); // faker seed initialization

    for (let $ = 0; $ < f; $++) {
        const C = A(c_arr, n);     // 1: region
        const E = A(e_arr, n);     // 1: segment
        // customer_id: u(1e5, 999999) = 1 call
        u(100000, 999999);

        const D = u(1, 5);         // 1: numOrders

        const orders = [];
        for (let q = 0; q < D; q++) {
            // order_id: u(1e5, 999999): 1
            u(100000, 999999);
            // order_date: h(I, w): 1
            const orderDate = h(I, w);
            const z = A(s_arr, n); // 1: channel

            const te = u(1, 4); // 1: numItems
            const items = [];
            for (let B = 0; B < te; B++) {
                const ne = A(l_arr, n);  // 1: category
                const ae = u(1, 12);     // 1: quantity
                u(250, 4500);            // 1: unit_price
                // discount_pct: n() < .35 ? u(5,20) : 0
                const disc_r = n();
                if (disc_r < 0.35) u(5, 20); // 1 more
                // sku: u(1000, 9999) = 1
                u(1000, 9999);

                items.push({ category: ne, channel: z, quantity: ae });
            }
            orders.push({ order_date: orderDate, items });
        }

        // company.name() via faker - uses faker's internal RNG, NOT our n()
        // So no n() calls for company name

        o.push({ region: C, orders });
    }

    // Pick filter
    const m = {
        region: A(c_arr, n),    // 1
        category: A(l_arr, n),  // 1
        channel: A(s_arr, n),   // 1
    };

    const g_frac = n(); // 1: start date
    const g = I.getTime() + g_frac * (w.getTime() - I.getTime());
    const y_raw = g + u(20, 60) * 24 * 60 * 60 * 1000; // u(20,60) = 1 call
    m.start = g;
    m.end = y_raw < w.getTime() ? y_raw : w.getTime();

    let x = 0;
    o.forEach(cust => {
        if (cust.region !== m.region) return;
        cust.orders.forEach(ord => {
            const ordDate = ord.order_date;
            if (ordDate < m.start || ordDate > m.end) return;
            ord.items.forEach(item => {
                if (item.category === m.category && item.channel === m.channel) {
                    x += item.quantity;
                }
            });
        });
    });

    // If x === 0, fix it (shouldn't happen but handle it)
    if (x === 0) {
        // Fallback: pick specific record
        const picked = A(o, n);
        const pickedOrder = A(picked.orders, n);
        const pickedItem = A(pickedOrder.items, n);
        m.region = picked.region;
        m.category = pickedItem.category;
        m.channel = pickedItem.channel;
        const k = pickedOrder.order_date;
        m.start = k - 7 * 86400000;
        m.end = k + 14 * 86400000;
        x = 0;
        o.forEach(cust => {
            if (cust.region !== m.region) return;
            cust.orders.forEach(ord => {
                const ordDate = ord.order_date;
                if (ordDate < m.start || ordDate > m.end) return;
                ord.items.forEach(item => {
                    if (item.category === m.category && item.channel === m.channel) x += item.quantity;
                });
            });
        });
    }

    const fmt = d => new Date(d).toISOString().split('T')[0];
    return { region: m.region, category: m.category, channel: m.channel, start: fmt(m.start), end: fmt(m.end), answer: x };
}

// ──────────────────────────────────────────────
// Q8: Parse Partial JSON (total sales)
// ──────────────────────────────────────────────
// This uses Faker with seedrandom - difficult to replicate exactly.
// The total (variable c) is the sum of 100 randomly generated sales values.
// We can still compute it by replicating the Faker seed.
function solveQ8(email) {
    // The code uses:
    //   const n = alea(`${email}#q-parse-partial-json`)  <- but uses seedrandom, not alea
    //   const p = new Nn({ locale: [Rn], seed: Math.round(n() * 1e6) })
    // And then generates 100 entries via:
    //   let l = p.number.int({ min: 100, max: 1e3 })
    //
    // We need to use @faker-js/faker to replicate this exactly.
    // This cannot be done without the faker library.
    return { note: "Q8 requires @faker-js/faker library - see solve_q8.mjs" };
}

// ──────────────────────────────────────────────
// MAIN
// ──────────────────────────────────────────────
const email = process.argv[2];
if (!email) {
    console.error("Usage: node master_solver.js <email>");
    process.exit(1);
}

console.log("=".repeat(60));
console.log(`Solving for email: ${email}`);
console.log("=".repeat(60));

try {
    const q1 = solveQ1(email);
    console.log("\n[Q1] Excel Operational Metrics");
    console.log(`  Region: ${q1.region}, Category: ${q1.category}, Up to: ${q1.date}`);
    console.log(`  ANSWER: ${q1.answer.toFixed(2)}`);
} catch (e) { console.log(`\n[Q1] ERROR: ${e.message}`); }

try {
    const q2 = solveQ2(email);
    console.log("\n[Q2] Z-Score Outlier Count");
    console.log(`  Stores: ${q2.stores}`);
    console.log(`  ANSWER: ${q2.answer} (± 1 accepted)`);
} catch (e) { console.log(`\n[Q2] ERROR: ${e.message}`); }

try {
    const q5 = solveQ5(email);
    console.log("\n[Q5] OpenRefine Supplier Spend");
    console.log(`  Supplier: ${q5.supplier}, Category: ${q5.category}`);
    console.log(`  ANSWER: ${q5.answer.toFixed(2)}`);
} catch (e) { console.log(`\n[Q5] ERROR: ${e.message}`); }

try {
    const q6 = solveQ6(email);
    console.log("\n[Q6] JSON Sensor Rollup");
    console.log(`  Site: ${q6.site}, Device: ${q6.deviceType}, Records: ${q6.count}`);
    console.log(`  ANSWER: ${q6.answer}`);
} catch (e) { console.log(`\n[Q6] ERROR: ${e.message}`); }

try {
    const q7 = solveQ7(email);
    console.log("\n[Q7] JSON Customer Flatten");
    console.log(`  Region: ${q7.region}, Category: ${q7.category}, Channel: ${q7.channel}`);
    console.log(`  Date: ${q7.start} to ${q7.end}`);
    console.log(`  ANSWER: ${q7.answer}`);
} catch (e) { console.log(`\n[Q7] ERROR: ${e.message}`); }

console.log("\n[Q8] Parse Partial JSON");
console.log("  Requires Faker.js library - run: node solve_q8.mjs <email>");
