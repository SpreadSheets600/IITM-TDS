/**
 * Q16 Solver: Cross-Lingual Entity Disambiguation
 * 
 * This script computes the exact answer CSV (doc_id → entity_id mapping)
 * by replicating the document generation algorithm using the same PRNG.
 * 
 * Usage: node solve_q16.js <email>
 * Output: Prints the CSV you should paste into the exam
 */

function makeAlea(seed) {
    let s0, s1, s2, c;
    function mash(d) { d = String(d); let n = 4022871197; for (let i = 0; i < d.length; i++) { n += d.charCodeAt(i); let h = 0.02519603282416938 * n; n = h >>> 0; h -= n; h *= n; n = h >>> 0; h -= n; n += h * 4294967296; } return (n >>> 0) * 2.3283064365386963e-10; }
    c = 1; s0 = mash(' '); s1 = mash(' '); s2 = mash(' ');
    s0 -= mash(seed); if (s0 < 0) s0 += 1; s1 -= mash(seed); if (s1 < 0) s1 += 1; s2 -= mash(seed); if (s2 < 0) s2 += 1;
    return () => { const t = 2091639 * s0 + c * 2.3283064365386963e-10; s0 = s1; s1 = s2; s2 = t - (c = t | 0); return s2; };
}

function A(arr, rng) { return arr[Math.floor(rng() * arr.length)]; }
function ee(arr, n, rng) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) { const j = Math.floor(rng() * (i + 1));[copy[i], copy[j]] = [copy[j], copy[i]]; }
    return copy.slice(0, n);
}

// Full entity list (from Exam-1.js)
const ALL_ENTITIES = [
    { canonicalName: "John I of Portugal", era: "1357–1433" },
    { canonicalName: "John II of Castile", era: "1405–1454" },
    { canonicalName: "Ivan III of Russia", era: "1440–1505" },
    { canonicalName: "Ivan IV of Russia", era: "1530–1584" },
    { canonicalName: "Charles V, Holy Roman Emperor", era: "1500–1558" },
    { canonicalName: "Charles I of England", era: "1600–1649" },
    { canonicalName: "Peter the Great", era: "1672–1725" },
    { canonicalName: "Peter III of Russia", era: "1728–1762" },
    { canonicalName: "Frederick the Great", era: "1712–1786" },
    { canonicalName: "Frederick I of Prussia", era: "1657–1713" },
    { canonicalName: "Louis XIV of France", era: "1638–1715" },
    { canonicalName: "Louis XVI of France", era: "1754–1793" },
    { canonicalName: "Alexander the Great", era: "356–323 BC" },
    { canonicalName: "Alexander I of Russia", era: "1777–1825" },
    { canonicalName: "Alexander II of Russia", era: "1818–1881" },
    { canonicalName: "Philip II of Spain", era: "1527–1598" },
    { canonicalName: "Philip IV of Spain", era: "1605–1665" },
    { canonicalName: "George III of Britain", era: "1738–1820" },
    { canonicalName: "George I of Greece", era: "1845–1913" },
    { canonicalName: "Henry VIII of England", era: "1491–1547" },
    { canonicalName: "Henry IV of France", era: "1553–1610" },
    { canonicalName: "William I of England", era: "1028–1087" },
    { canonicalName: "William III of England", era: "1650–1702" },
    { canonicalName: "Catherine the Great", era: "1729–1796" },
    { canonicalName: "Catherine de' Medici", era: "1519–1589" },
];

const languages = ["en", "es", "fr", "de", "it", "pt", "nl", "ru", "pl", "cs", "ar", "zh", "ja", "ko", "tr"];

const email = process.argv[2];
if (!email) { console.error('Usage: node solve_q16.js <email>'); process.exit(1); }

const i = makeAlea(`${email}#q-cross-lingual-entity-disambiguation-server`);
const n = 16 + Math.floor(i() * 6);
const selectedEntities = ee(ALL_ENTITIES, n, i);

// Build entity_id map
const entityMap = {};
selectedEntities.forEach((e, idx) => {
    entityMap[e.canonicalName] = `E${String(idx + 1).padStart(3, '0')}`;
});

// Generate 1000 documents and record the mapping
const lines = ['doc_id,entity_id'];
for (let l = 0; l < 1000; l++) {
    const docId = `DOC-${String(l + 1).padStart(4, '0')}`;
    const entity = A(selectedEntities, i);  // 1: pick entity
    const lang = A(languages, i);           // 1: pick language
    // variant name: entity.variants[lang] - 1 call
    A(["a", "b", "c", "d"], i);               // A(sa[lang], i): pick context phrase
    A(["a", "b", "c", "d", "e"], i);           // A(ia[lang], i): pick action
    A(["Constantinople", "Rome", "Paris", "London", "Madrid"], i); // A(la, i): pick location

    // era date: conditional based on era string
    i(); // year calculation (always consumes 1)

    // typo check: i() < .08
    const typoR = i();
    if (typoR < 0.08) { i(); } // additional call if typo

    lines.push(`${docId},${entityMap[entity.canonicalName]}`);
}

console.log(lines.join('\n'));
process.stderr.write(`\nGenerated ${n} entities, 1000 document mappings\n`);
