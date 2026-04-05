const fs = require("fs");
const path = require("path");
const vm = require("vm");
const crypto = require("crypto");

const ROOT = process.cwd();
const EXAM_JS = path.join(ROOT, "exam.js");
const DEFAULT_OUTPUT_PARENT = path.join(ROOT, "solutions");

const VERSION_ROE = "#roe-2026-01";
const VERSION_VIDEO = "#v2";

const LETTERS = "abcdefghijklmnopqrstuvwxyz";
const DIGITS = "0123456789";
const ALNUM = LETTERS + DIGITS;

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function ensureDir(dirPath) {
  fs.mkdirSync(dirPath, { recursive: true });
}

function writeText(filePath, content) {
  ensureDir(path.dirname(filePath));
  fs.writeFileSync(filePath, content, "utf8");
}

function writeJson(filePath, value) {
  writeText(filePath, JSON.stringify(value, null, 2) + "\n");
}

function sanitizeEmailForPath(email) {
  return String(email).trim().toLowerCase().replace(/[^a-z0-9._-]+/g, "_");
}

function splitQuestionArgs(value) {
  return String(value)
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean);
}

function parseArgs(argv) {
  const options = {
    email: "",
    outDir: "",
    questionIds: [],
    help: false,
  };

  for (let i = 0; i < argv.length; i += 1) {
    const arg = argv[i];
    if (arg === "--help" || arg === "-h") {
      options.help = true;
      continue;
    }
    if (arg === "--email") {
      options.email = argv[i + 1] || "";
      i += 1;
      continue;
    }
    if (arg === "--out") {
      options.outDir = argv[i + 1] || "";
      i += 1;
      continue;
    }
    if (arg === "--question" || arg === "--questions") {
      options.questionIds.push(...splitQuestionArgs(argv[i + 1] || ""));
      i += 1;
      continue;
    }
    if (arg.startsWith("--question=") || arg.startsWith("--questions=")) {
      options.questionIds.push(...splitQuestionArgs(arg.split("=", 2)[1]));
      continue;
    }
    if (arg.startsWith("--email=")) {
      options.email = arg.split("=", 2)[1];
      continue;
    }
    if (arg.startsWith("--out=")) {
      options.outDir = arg.split("=", 2)[1];
      continue;
    }
    if (arg.startsWith("-")) {
      throw new Error(`Unknown argument: ${arg}`);
    }
    if (!options.email) {
      options.email = arg;
      continue;
    }
    throw new Error(`Unexpected extra argument: ${arg}`);
  }

  if (!options.email && !options.help) {
    throw new Error("Missing email. Pass it as the first argument or with --email.");
  }

  return {
    email: options.email.trim().toLowerCase(),
    outDir: options.outDir
      ? path.resolve(ROOT, options.outDir)
      : path.join(DEFAULT_OUTPUT_PARENT, sanitizeEmailForPath(options.email || "unknown")),
    questionIds: Array.from(new Set(options.questionIds)),
    help: options.help,
  };
}

function printHelp() {
  console.log(`Usage:
  node scripts/generate-exam-folders.js <email> [--out DIR] [--question ID[,ID...]]
  node scripts/generate-exam-folders.js --email <email> [--out DIR] [--question ID]

Examples:
  node scripts/generate-exam-folders.js 24f2008474@ds.study.iitm.ac.in
  node scripts/generate-exam-folders.js --email student@example.com --out tmp/student
  node scripts/generate-exam-folders.js --email student@example.com --question q-regex-golf-server,q-maze-solver-server
`);
}

function sha256(text) {
  return crypto.createHash("sha256").update(text).digest("hex");
}

function alea(seed) {
  function mash() {
    let n = 4022871197;
    return function inner(data) {
      data = String(data);
      for (let i = 0; i < data.length; i += 1) {
        n += data.charCodeAt(i);
        let h = 0.02519603282416938 * n;
        n = h >>> 0;
        h -= n;
        h *= n;
        n = h >>> 0;
        h -= n;
        n += h * 4294967296;
      }
      return (n >>> 0) * 2.3283064365386963e-10;
    };
  }

  const mashFn = mash();
  let c = 1;
  let s0 = mashFn(" ");
  let s1 = mashFn(" ");
  let s2 = mashFn(" ");

  s0 -= mashFn(seed);
  if (s0 < 0) s0 += 1;
  s1 -= mashFn(seed);
  if (s1 < 0) s1 += 1;
  s2 -= mashFn(seed);
  if (s2 < 0) s2 += 1;

  return function random() {
    const t = 2091639 * s0 + c * 2.3283064365386963e-10;
    s0 = s1;
    s1 = s2;
    c = t | 0;
    s2 = t - c;
    return s2;
  };
}

function choice(items, rng) {
  return items[Math.floor(rng() * items.length)];
}

function shuffle(items, rng) {
  const copy = items.slice();
  for (let i = copy.length - 1; i > 0; i -= 1) {
    const j = Math.floor(rng() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function sample(items, count, rng) {
  const pool = items.slice();
  const result = [];
  for (let i = 0; i < count && pool.length > 0; i += 1) {
    const idx = Math.floor(rng() * pool.length);
    result.push(pool.splice(idx, 1)[0]);
  }
  return result;
}

function key(row, col) {
  return `${row},${col}`;
}

function normalizeWhitespace(text) {
  return String(text).split("\n").map((line) => line.trimEnd()).join("\n").trim();
}

function parseAssignedLiteral(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert(start !== -1, `Missing marker: ${startMarker}`);
  const afterStart = start + startMarker.length;
  const end = source.indexOf(endMarker, afterStart);
  assert(end !== -1, `Missing marker: ${endMarker}`);
  const literal = source.slice(afterStart, end).trim();
  return vm.runInNewContext(`(${literal})`);
}

function loadLargeEntityCatalog(source) {
  const startMarker = "so = [";
  const endMarker = "],\n    ro = {";
  const start = source.indexOf(startMarker);
  assert(start !== -1, `Missing marker: ${startMarker}`);
  const afterStart = start + startMarker.length;
  const end = source.indexOf(endMarker, afterStart);
  assert(end !== -1, `Missing marker: ${endMarker}`);
  const literal = source.slice(afterStart, end).trim();
  return vm.runInNewContext(`([${literal}])`);
}

function sampleIndices(count, limit, excluded, rng) {
  const pool = [];
  for (let i = 0; i < limit; i += 1) {
    if (!excluded.has(i)) {
      pool.push(i);
    }
  }
  return sample(pool, count, rng).sort((a, b) => a - b);
}

function buildRegexRules(rng, lineLength) {
  const positions = [1, 5, 11, 17, 22];
  const positionalRules = positions.map((position) => ({
    type: "charset",
    position,
    charSet: sample(ALNUM.split(""), 3 + Math.floor(rng() * 3), rng).sort().join(""),
  }));

  const excluded = new Set(positions);
  const tokenStartA = 7;
  const tokenStartB = 19;
  const tokenLength = 3;
  for (let i = 0; i < tokenLength; i += 1) {
    excluded.add(tokenStartA + i);
    excluded.add(tokenStartB + i);
  }

  const tokenAlphabet = sample(ALNUM.split(""), 12, rng);
  const tokens = [];
  while (tokens.length < 5) {
    const candidate = sample(tokenAlphabet, tokenLength, rng).join("");
    if (!tokens.includes(candidate)) {
      tokens.push(candidate);
    }
  }

  const [eqLeftA, eqRightA, eqLeftB, eqRightB] = sampleIndices(4, lineLength, excluded, rng);
  excluded.add(eqLeftA);
  excluded.add(eqRightA);
  excluded.add(eqLeftB);
  excluded.add(eqRightB);

  const [classA, classB, classC] = sampleIndices(3, lineLength, excluded, rng);

  return {
    lineLength,
    positionalRules,
    equalityRules: [
      { left: eqLeftA, right: eqRightA },
      { left: eqLeftB, right: eqRightB },
    ],
    repeatedTokenRule: {
      startA: tokenStartA,
      startB: tokenStartB,
      length: tokenLength,
      tokens,
    },
    classRule: {
      positions: [classA, classB, classC],
    },
  };
}

function escapeCharClass(value) {
  return value.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

function buildRegexFromRules(rules) {
  const positional = rules.positionalRules.map(
    ({ position, charSet }) => `(?=^.{${position}}[${escapeCharClass(charSet)}])`,
  );
  const equality = rules.equalityRules.map(({ left, right }, index) => {
    const groupName = `eq${index}`;
    return `(?=^.{${left}}(?<${groupName}>.).{${right - left - 1}}\\k<${groupName}>)`;
  });
  const tokens = rules.repeatedTokenRule.tokens.join("|");
  const repeated = `(?=^.{${rules.repeatedTokenRule.startA}}(?<tok>${tokens}).{${rules.repeatedTokenRule.startB - rules.repeatedTokenRule.startA - rules.repeatedTokenRule.length}}\\k<tok>)`;
  const [a, b, c] = rules.classRule.positions;
  const classes = `(?=^.{${a}}(?:[a-z].{${b - a - 1}}[a-z].{${c - b - 1}}[a-z]|\\d.{${b - a - 1}}\\d.{${c - b - 1}}\\d))`;
  return positional.concat(equality, repeated, classes).join("");
}

function regexQuestion(email) {
  const rng = alea(`${email}#q-regex-golf`);
  const rules = buildRegexRules(rng, 24);
  const pattern = buildRegexFromRules(rules);
  const compiled = new RegExp(pattern);
  assert(compiled.test("a".repeat(24)) === false || compiled instanceof RegExp, "Regex build failed");
  return { rules, pattern };
}

const MAZE_SIZE = 30;
const MAZE_KEYS = ["Red", "Blue", "Green", "Yellow", "Cyan", "Magenta", "White"];
const TELEPORTER_COLORS = ["Orange", "Purple", "Teal"];
const DIRECTIONS = [
  { dr: -1, dc: 0, name: "up" },
  { dr: 1, dc: 0, name: "down" },
  { dr: 0, dc: -1, name: "left" },
  { dr: 0, dc: 1, name: "right" },
];
const OPPOSITE = { up: "down", down: "up", left: "right", right: "left" };

function generateMazeWalls(rng) {
  const walls = Array.from({ length: MAZE_SIZE }, () =>
    Array.from({ length: MAZE_SIZE }, () => new Set(["up", "down", "left", "right"])),
  );
  const visited = Array.from({ length: MAZE_SIZE }, () => Array(MAZE_SIZE).fill(false));
  const stack = [[0, 0]];
  visited[0][0] = true;

  while (stack.length > 0) {
    const [row, col] = stack[stack.length - 1];
    const options = shuffle(DIRECTIONS, rng)
      .map(({ dr, dc, name }) => ({ nr: row + dr, nc: col + dc, dir: name }))
      .filter(
        ({ nr, nc }) =>
          nr >= 0 && nr < MAZE_SIZE && nc >= 0 && nc < MAZE_SIZE && !visited[nr][nc],
      );
    if (options.length === 0) {
      stack.pop();
      continue;
    }
    const { nr, nc, dir } = options[0];
    walls[row][col].delete(dir);
    walls[nr][nc].delete(OPPOSITE[dir]);
    visited[nr][nc] = true;
    stack.push([nr, nc]);
  }

  return walls;
}

function bfsPath(walls, startRow, startCol, endRow, endCol) {
  const seen = new Set([key(startRow, startCol)]);
  const queue = [[startRow, startCol, []]];
  while (queue.length > 0) {
    const [row, col, pathSoFar] = queue.shift();
    const fullPath = pathSoFar.concat([[row, col]]);
    if (row === endRow && col === endCol) {
      return fullPath;
    }
    for (const { dr, dc, name } of DIRECTIONS) {
      const nr = row + dr;
      const nc = col + dc;
      if (
        nr < 0 ||
        nr >= MAZE_SIZE ||
        nc < 0 ||
        nc >= MAZE_SIZE ||
        seen.has(key(nr, nc)) ||
        walls[row][col].has(name)
      ) {
        continue;
      }
      seen.add(key(nr, nc));
      queue.push([nr, nc, fullPath]);
    }
  }
  return null;
}

function placeKeys(solutionPath, rng) {
  const candidates = solutionPath.slice(1, -1);
  const keys = [];
  if (candidates.length < MAZE_KEYS.length) {
    const idxs = sample([...Array(candidates.length).keys()], MAZE_KEYS.length, rng).sort((a, b) => a - b);
    for (let i = 0; i < idxs.length; i += 1) {
      const [row, col] = candidates[idxs[i]];
      keys.push({ row, col, color: MAZE_KEYS[i], index: i });
    }
    return keys;
  }
  const step = Math.floor(candidates.length / (MAZE_KEYS.length + 1));
  for (let i = 0; i < MAZE_KEYS.length; i += 1) {
    const [row, col] = candidates[step * (i + 1)];
    keys.push({ row, col, color: MAZE_KEYS[i], index: i });
  }
  return keys;
}

function placeTeleporters(walls, solutionPath, rng) {
  const onPath = new Set(solutionPath.map(([row, col]) => key(row, col)));
  const pool = [];
  for (let row = 0; row < MAZE_SIZE; row += 1) {
    for (let col = 0; col < MAZE_SIZE; col += 1) {
      if (!onPath.has(key(row, col))) {
        pool.push([row, col]);
      }
    }
  }
  const shuffled = shuffle(pool, rng);
  const teleporters = [];
  for (let i = 0; i < TELEPORTER_COLORS.length && i * 2 + 1 < shuffled.length; i += 1) {
    teleporters.push({
      color: TELEPORTER_COLORS[i],
      a: { row: shuffled[i * 2][0], col: shuffled[i * 2][1] },
      b: { row: shuffled[i * 2 + 1][0], col: shuffled[i * 2 + 1][1] },
    });
  }
  return teleporters;
}

function oneWayEdges(solutionPath, rng) {
  const segments = [];
  for (let i = 0; i < solutionPath.length - 1; i += 1) {
    const [fromRow, fromCol] = solutionPath[i];
    const [toRow, toCol] = solutionPath[i + 1];
    const direction = DIRECTIONS.find((entry) => entry.dr === toRow - fromRow && entry.dc === toCol - fromCol);
    if (direction) {
      segments.push({ fromRow, fromCol, toRow, toCol, direction: direction.name });
    }
  }
  return shuffle(segments.slice(1, -1), rng).slice(0, Math.min(10, Math.max(0, segments.length - 2)));
}

function decayingEdges(walls, solutionPath, rng) {
  const onPath = new Set(solutionPath.map(([row, col]) => key(row, col)));
  const edges = [];
  for (let row = 0; row < MAZE_SIZE; row += 1) {
    for (let col = 0; col < MAZE_SIZE; col += 1) {
      for (const { dr, dc, name } of DIRECTIONS) {
        const nr = row + dr;
        const nc = col + dc;
        if (
          nr < 0 ||
          nr >= MAZE_SIZE ||
          nc < 0 ||
          nc >= MAZE_SIZE ||
          walls[row][col].has(name) ||
          (onPath.has(key(row, col)) && onPath.has(key(nr, nc)))
        ) {
          continue;
        }
        edges.push({ fromRow: row, fromCol: col, toRow: nr, toCol: nc, direction: name });
      }
    }
  }
  return shuffle(edges, rng)
    .slice(0, Math.min(8, edges.length))
    .map((edge) => ({ ...edge, decaySteps: 30 + Math.floor(rng() * 71) }));
}

function validateMazePath(pathSteps, maze) {
  const { walls, keys, teleporters, oneWays, decayingPaths, gridSize } = maze;
  assert(Array.isArray(pathSteps) && pathSteps.length >= 2, "Path must contain at least 2 coordinates");
  const [startRow, startCol] = pathSteps[0];
  const [endRow, endCol] = pathSteps[pathSteps.length - 1];
  assert(startRow === 0 && startCol === 0, "Maze path must start at (0,0)");
  assert(endRow === gridSize - 1 && endCol === gridSize - 1, "Maze path must end at maze exit");

  const teleporterMap = new Map();
  for (const teleporter of teleporters) {
    teleporterMap.set(key(teleporter.a.row, teleporter.a.col), { row: teleporter.b.row, col: teleporter.b.col });
    teleporterMap.set(key(teleporter.b.row, teleporter.b.col), { row: teleporter.a.row, col: teleporter.a.col });
  }

  const oneWayMap = new Map();
  for (const segment of oneWays) {
    oneWayMap.set(`${segment.fromRow},${segment.fromCol}->${segment.toRow},${segment.toCol}`, true);
    oneWayMap.set(`${segment.toRow},${segment.toCol}->${segment.fromRow},${segment.fromCol}`, false);
  }

  const decayMap = new Map();
  for (const segment of decayingPaths) {
    decayMap.set(`${segment.fromRow},${segment.fromCol}->${segment.toRow},${segment.toCol}`, segment.decaySteps);
    decayMap.set(`${segment.toRow},${segment.toCol}->${segment.fromRow},${segment.fromCol}`, segment.decaySteps);
  }

  const keyOrder = new Map(keys.map((entry) => [key(entry.row, entry.col), entry.index]));
  let nextKey = 0;

  for (let step = 1; step < pathSteps.length; step += 1) {
    const [fromRow, fromCol] = pathSteps[step - 1];
    const [toRow, toCol] = pathSteps[step];
    assert(toRow >= 0 && toRow < gridSize && toCol >= 0 && toCol < gridSize, `Maze step ${step} is out of bounds`);
    const teleported = teleporterMap.get(key(fromRow, fromCol));
    if (!(teleported && teleported.row === toRow && teleported.col === toCol)) {
      const move = DIRECTIONS.find((entry) => entry.dr === toRow - fromRow && entry.dc === toCol - fromCol);
      assert(move, `Maze step ${step} is neither adjacent nor a teleporter`);
      assert(!walls[fromRow][fromCol].has(move.name), `Maze step ${step} crosses a wall`);
      const transition = `${fromRow},${fromCol}->${toRow},${toCol}`;
      if (oneWayMap.has(transition)) {
        assert(oneWayMap.get(transition) === true, `Maze step ${step} violates a one-way segment`);
      }
      if (decayMap.has(transition)) {
        assert(step <= decayMap.get(transition), `Maze step ${step} uses a decayed segment`);
      }
    }

    const nodeKey = key(toRow, toCol);
    if (keyOrder.has(nodeKey)) {
      const foundIndex = keyOrder.get(nodeKey);
      if (foundIndex === nextKey) {
        nextKey += 1;
      } else if (foundIndex > nextKey) {
        throw new Error("Maze key order violated");
      }
    }
  }

  assert(nextKey === MAZE_KEYS.length, "Maze path does not collect all keys");
  return true;
}

function mazeQuestion(email) {
  const rng = alea(`${email}#q-maze-solver`);
  const walls = generateMazeWalls(rng);
  const solutionPath = bfsPath(walls, 0, 0, MAZE_SIZE - 1, MAZE_SIZE - 1);
  assert(solutionPath, "Maze generation failed");
  const keys = placeKeys(solutionPath, rng);
  const teleporters = placeTeleporters(walls, solutionPath, rng);
  const oneWays = oneWayEdges(solutionPath, rng);
  const decayingPaths = decayingEdges(walls, solutionPath, rng);
  const maze = {
    gridSize: MAZE_SIZE,
    walls,
    keys,
    teleporters,
    oneWays,
    decayingPaths,
  };
  validateMazePath(solutionPath, maze);
  return { maze, solutionPath };
}

function shiftUppercaseCharacter(char, amount) {
  const code = char.charCodeAt(0);
  if (code >= 65 && code <= 90) {
    return String.fromCharCode(((code - 65 + amount) % 26) + 65);
  }
  return char;
}

function caesarEncode(letter, shift) {
  return letter.toUpperCase().split("").map((char) => shiftUppercaseCharacter(char, shift)).join("");
}

const CIPHER_WORDS = [
  "NETWORK",
  "CLUSTER",
  "DECRYPT",
  "TRANSIT",
  "SIGNALS",
  "QUANTUM",
  "BEACON",
  "VECTOR",
  "MATRIX",
  "BRIDGE",
  "SOCKET",
  "DAEMON",
  "KERNEL",
  "ROUTER",
  "STREAM",
  "BUFFER",
  "PACKET",
  "PORTAL",
  "SHIELD",
  "SYNTAX",
];

function buildCipherGraph(rng) {
  const nodeCount = 12;
  const adjacency = Array.from({ length: nodeCount }, () => []);
  function connect(a, b) {
    if (a === b) return;
    if (!adjacency[a].includes(b)) adjacency[a].push(b);
    if (!adjacency[b].includes(a)) adjacency[b].push(a);
  }
  const nodes = shuffle([...Array(nodeCount).keys()], rng);
  for (let i = 0; i < nodes.length - 1; i += 1) {
    connect(nodes[i], nodes[i + 1]);
  }
  for (let i = 0, added = 0; i < 30 && added < 6; i += 1) {
    const a = Math.floor(rng() * nodeCount);
    const b = Math.floor(rng() * nodeCount);
    if (a !== b && !adjacency[a].includes(b)) {
      connect(a, b);
      added += 1;
    }
  }
  adjacency.forEach((list) => list.sort((a, b) => a - b));
  return adjacency;
}

function cipherQuestion(email) {
  const seed = `${email.trim().toLowerCase()}#q-cipher-trail-server`;
  const rng = alea(seed);
  const adjacency = buildCipherGraph(rng);
  const answerWord = shuffle(CIPHER_WORDS, rng)[0];
  const letters = answerWord.split("");
  const requiredNodes = shuffle([...Array(12).keys()], rng).slice(0, letters.length);
  const nodeShifts = Array.from({ length: 12 }, () => 1 + Math.floor(rng() * 25));
  const fragments = [];
  for (let nodeId = 0; nodeId < 12; nodeId += 1) {
    const letterPosition = requiredNodes.indexOf(nodeId);
    const sourceLetter = letterPosition >= 0 ? letters[letterPosition] : String.fromCharCode(65 + Math.floor(rng() * 26));
    fragments.push(caesarEncode(sourceLetter, nodeShifts[nodeId]));
  }
  return { adjacency, answerWord, requiredNodes, nodeShifts, fragments };
}

const REGION_SCENARIOS = [
  {
    name: "documentation_cleanup",
    title: "Documentation Repository Reorganization",
    description: "Reorganize scattered documentation files into a category-based flat structure",
    context: "technical documentation",
  },
  {
    name: "archive_migration",
    title: "Legacy Archive Migration",
    description: "Migrate legacy archive files from nested structure to categorized flat layout",
    context: "historical archives",
  },
  {
    name: "content_management",
    title: "Content Management System Refactoring",
    description: "Restructure CMS content files from hierarchical to category-based organization",
    context: "content files",
  },
  {
    name: "knowledge_base",
    title: "Knowledge Base Reorganization",
    description: "Flatten knowledge base articles while preserving category information",
    context: "knowledge articles",
  },
];

const RENAME_CATEGORIES = [
  "documentation",
  "reports",
  "notes",
  "configs",
  "data",
  "logs",
  "scripts",
  "templates",
  "resources",
  "archives",
];

const RENAME_SPECIAL_CATEGORIES = [
  "r\u00e9sum\u00e9",
  "na\u00efve-bayes",
  "\u65e5\u672c\u8a9e",
  "m\u00fcnchen",
  "caf\u00e9",
];

function renameQuestion(email, version) {
  const rng = alea(`${email}#q-rename-files-server${version}`);
  const scenario = REGION_SCENARIOS[Math.floor(rng() * REGION_SCENARIOS.length)];
  const roots = ["docs", "content", "archive", "project"];
  const middle = ["chapter1", "section-a", "part 2", "m\u00f3dulo-3", "2024"];
  const leaf = ["intro", "advanced", "appendix", "donn\u00e9es", "r\u00e9f\u00e9rences"];
  const oddNames = ["spaces here", "file-name", "na\u00efve", "caf\u00e9-2024", "test_file"];
  const files = [];

  for (let i = 0; i < 30; i += 1) {
    const depth = 1 + Math.floor(rng() * 3);
    const segments = [roots[Math.floor(rng() * roots.length)]];
    if (depth >= 2) segments.push(middle[Math.floor(rng() * middle.length)]);
    if (depth >= 3) segments.push(leaf[Math.floor(rng() * leaf.length)]);
    if (rng() < 0.2) segments.push(oddNames[Math.floor(rng() * oddNames.length)]);
    const filename = `file${String(i + 1).padStart(2, "0")}.txt`;
    const maybeConfusable = rng() < 0.1 ? filename.replace("i", "\u0456") : filename;
    const sourcePath = segments.concat(maybeConfusable).join("/");
    const categorySource = rng() < 0.3 && RENAME_SPECIAL_CATEGORIES.length > 0 ? RENAME_SPECIAL_CATEGORIES : RENAME_CATEGORIES;
    const category = categorySource[Math.floor(rng() * categorySource.length)];
    const content = `category: ${category}\n\n${scenario.context.toUpperCase()} - File ${i + 1}\n\nThis is a test file for the reorganization exercise.\nPath: ${sourcePath}\nCategory: ${category}\n\nLorem ipsum dolor sit amet, consectetur adipiscing elit.\nSed do eiusmod tempor incididunt ut labore et dolore magna aliqua.\n`;
    files.push({ path: sourcePath, category, content });
  }

  const expectedFiles = files
    .map((entry) => {
      const parts = entry.path.split("/");
      const filename = parts[parts.length - 1];
      const prefix = parts.slice(0, -1).join("-");
      return `${entry.category}/${prefix}-${filename}`;
    })
    .sort((a, b) => {
      for (let i = 0; i < Math.min(a.length, b.length); i += 1) {
        if (a.charCodeAt(i) !== b.charCodeAt(i)) {
          return a.charCodeAt(i) - b.charCodeAt(i);
        }
      }
      return a.length - b.length;
    });

  const fileList = expectedFiles.map((file) => `./${file}`).join("\n") + "\n";
  return {
    scenario,
    files,
    expectedFiles,
    fileList,
    expectedHash: sha256(fileList),
  };
}

const PYTHON_SCENARIOS = [
  {
    name: "data_pipeline",
    title: "Data Processing Pipeline Refactoring",
    description: "Legacy data pipeline code that needs PEP 8 compliance",
    context: "data processing system",
  },
  {
    name: "api_service",
    title: "REST API Service Refactoring",
    description: "API service code written by JavaScript developers using camelCase",
    context: "REST API endpoints",
  },
  {
    name: "ml_model",
    title: "Machine Learning Model Refactoring",
    description: "ML model code that needs standardization to Python naming conventions",
    context: "machine learning pipeline",
  },
  {
    name: "web_scraper",
    title: "Web Scraper Refactoring",
    description: "Web scraping utility that needs to follow Python style guide",
    context: "web scraping operations",
  },
];

const PYTHON_NAMES = [
  { wrong: "getUserData", correct: "get_user_data", type: "function" },
  { wrong: "processItems", correct: "process_items", type: "function" },
  { wrong: "calculateTotal", correct: "calculate_total", type: "function" },
  { wrong: "validateInput", correct: "validate_input", type: "function" },
  { wrong: "formatOutput", correct: "format_output", type: "function" },
  { wrong: "parseResponse", correct: "parse_response", type: "function" },
  { wrong: "maxRetries", correct: "max_retries", type: "variable" },
  { wrong: "baseUrl", correct: "base_url", type: "variable" },
  { wrong: "errorCount", correct: "error_count", type: "variable" },
  { wrong: "currentIndex", correct: "current_index", type: "variable" },
];

function buildPythonWrongCode(names, scenario, rng) {
  const [a, i, r, s] = names;
  return `"""
${scenario.title}

This module handles ${scenario.context}.
Note: This code uses camelCase naming which violates PEP 8.
Refactor the non-compliant names to snake_case.

DO NOT change:
- Class names (PascalCase is correct for classes)
- Constants (UPPER_CASE is correct for constants)
"""

import json
from typing import List, Dict, Optional


class DataProcessor:
    """Main data processor class - DO NOT RENAME"""

    MAX_ITEMS = 1000  # Constant - DO NOT RENAME

    def __init__(self, config: Dict):
        self.config = config
        self.${s.wrong} = 0  # Track current position
        self.items = []

    def ${a.wrong}(self, user_id: str) -> Optional[Dict]:
        """Fetch user data from the API"""
        # Using ${a.wrong} to retrieve information
        if not user_id:
            return None

        # Call ${a.wrong} multiple times for retry logic
        data = self._fetch_data(user_id)
        if data:
            # ${a.wrong} succeeded
            result = self.${i.wrong}(data)
            return result
        return None

    def ${i.wrong}(self, items: List[Dict]) -> List[Dict]:
        """Process items and apply transformations"""
        processed = []
        self.${s.wrong} = 0  # Reset ${s.wrong}

        for item in items:
            # ${i.wrong} handles each item
            if self.${r.wrong}(item):
                formatted = self.${s.wrong}Item(item)
                processed.append(formatted)
                self.${s.wrong} += 1  # Increment ${s.wrong}

        # ${i.wrong} returns processed items
        return processed

    def ${r.wrong}(self, data: Dict) -> bool:
        """Validate input data structure"""
        # ${r.wrong} checks required fields
        if not isinstance(data, dict):
            return False

        required_fields = ['id', 'name', 'value']
        # ${r.wrong} ensures all fields present
        for field in required_fields:
            if field not in data:
                return False

        # ${r.wrong} passed all checks
        return True

    def ${s.wrong}Item(self, item: Dict) -> Dict:
        """Format a single item - uses ${s.wrong} prefix"""
        # Note: Method name intentionally uses ${s.wrong}
        # This tests that you DON'T rename the variable inside the method name
        return {
            'id': item['id'],
            'processed': True,
            'index': self.${s.wrong}  # Reference to variable
        }

    def _fetch_data(self, user_id: str) -> Optional[List[Dict]]:
        """Internal helper method"""
        # Simulate API call
        return [{'id': user_id, 'name': 'Test', 'value': ${Math.floor(rng() * 100)}}]


def main():
    """Main execution function"""
    processor = DataProcessor(config={})

    # Test ${a.wrong}
    user_data = processor.${a.wrong}("user123")
    if user_data:
        # Process using ${i.wrong}
        items = [user_data]
        results = processor.${i.wrong}(items)

        # Validate using ${r.wrong}
        for result in results:
            if processor.${r.wrong}(result):
                print(f"Processed item at index {processor.${s.wrong}}")


if __name__ == "__main__":
    main()
`;
}

function pythonRefactorQuestion(email, version) {
  const rng = alea(`${email}#q-python-refactor-server${version}`);
  const scenario = PYTHON_SCENARIOS[Math.floor(rng() * PYTHON_SCENARIOS.length)];
  const namesToRefactor = shuffle(PYTHON_NAMES, rng).slice(0, 4);
  const wrongCode = buildPythonWrongCode(namesToRefactor, scenario, rng);
  let correctCode = wrongCode;
  for (const entry of namesToRefactor) {
    const regex = new RegExp(`\\b${entry.wrong}\\b`, "g");
    correctCode = correctCode.replace(regex, entry.correct);
  }
  return { scenario, namesToRefactor, wrongCode, correctCode };
}

const BROKEN_JSON_SCENARIOS = [
  {
    name: "config_export",
    title: "Fix Corrupted Configuration Export",
    description: "A configuration export was corrupted during transfer - fix the JSON errors",
    context: "application configuration",
    dataType: "configuration settings",
  },
  {
    name: "api_response",
    title: "Repair Malformed API Response",
    description: "API response was corrupted - fix syntax errors to parse the data",
    context: "API integration",
    dataType: "API records",
  },
  {
    name: "database_dump",
    title: "Fix Broken Database Export",
    description: "Database JSON export has syntax errors - repair for data recovery",
    context: "data migration",
    dataType: "database records",
  },
  {
    name: "log_export",
    title: "Repair Corrupted Log Export",
    description: "Log export was corrupted - fix JSON to analyze the logs",
    context: "log analysis",
    dataType: "log entries",
  },
];

function brokenJsonQuestion(email, version) {
  const rng = alea(`${email}#q-broken-json-server${version}`);
  const scenario = BROKEN_JSON_SCENARIOS[Math.floor(rng() * BROKEN_JSON_SCENARIOS.length)];
  const records = [];
  for (let i = 0; i < 300; i += 1) {
    records.push({
      id: `record_${String(i).padStart(5, "0")}`,
      name: `Entry ${i}`,
      value: Math.floor(rng() * 10000),
      status: rng() < 0.5 ? "active" : "inactive",
      category: ["alpha", "beta", "gamma", "delta"][Math.floor(rng() * 4)],
      timestamp: `2024-${String(Math.floor(rng() * 12) + 1).padStart(2, "0")}-${String(Math.floor(rng() * 28) + 1).padStart(2, "0")}T${String(Math.floor(rng() * 24)).padStart(2, "0")}:${String(Math.floor(rng() * 60)).padStart(2, "0")}:00Z`,
      metadata: {
        source: ["system_a", "system_b", "system_c"][Math.floor(rng() * 3)],
        priority: Math.floor(rng() * 5) + 1,
        tags: ["tag1", "tag2", "tag3"].slice(0, Math.floor(rng() * 3) + 1),
      },
      description: `This is a sample ${scenario.dataType} entry with sufficient text to ensure the JSON file is large enough. `.repeat(3),
    });
  }

  const validJson = JSON.stringify(records, null, 2);
  let lines = validJson.split("\n");
  const mutatedLines = [];
  while (mutatedLines.length < 20) {
    const lineNumber = Math.floor(rng() * lines.length);
    if (!mutatedLines.includes(lineNumber)) {
      mutatedLines.push(lineNumber);
    }
  }
  mutatedLines.sort((a, b) => b - a);

  const errorLog = [];
  for (let index = 0; index < mutatedLines.length; index += 1) {
    const lineIndex = mutatedLines[index];
    const line = lines[lineIndex];
    switch (index % 6) {
      case 0:
        if (line.trim().endsWith(",")) {
          lines[lineIndex] = line.replace(/,$/, "");
          errorLog.push({ line: lineIndex + 1, type: "missing_comma" });
        }
        break;
      case 1:
        if (line.trim().endsWith("}") || line.trim().endsWith("]")) {
          lines[lineIndex] = line.replace(/([}\]])$/, ",$1");
          errorLog.push({ line: lineIndex + 1, type: "extra_comma" });
        }
        break;
      case 2:
        if (line.includes('":')) {
          lines[lineIndex] = line.replace(/"(\w+)":/, "$1:");
          errorLog.push({ line: lineIndex + 1, type: "missing_quote" });
        }
        break;
      case 3:
        if (line.includes('":')) {
          lines[lineIndex] = line.replace(/"(\w+)":/, "'$1':");
          errorLog.push({ line: lineIndex + 1, type: "single_quote" });
        }
        break;
      case 4:
        if (line.trim() === "{") {
          lines[lineIndex] = line.replace("{", "");
          errorLog.push({ line: lineIndex + 1, type: "missing_brace" });
        }
        break;
      case 5:
        if (line.trim() === "}," || line.trim() === "}") {
          lines[lineIndex] = line.replace("}", "}}");
          errorLog.push({ line: lineIndex + 1, type: "extra_brace" });
        }
        break;
      default:
        break;
    }
  }

  return {
    scenario,
    validJson,
    brokenJson: lines.join("\n"),
    errorLog,
  };
}

const CROSS_LINGUAL_LANGUAGES = [
  "en",
  "es",
  "fr",
  "de",
  "it",
  "pt",
  "nl",
  "ru",
  "pl",
  "cs",
  "ar",
  "zh",
  "ja",
  "ko",
  "tr",
];

function crossLingualQuestion(email, version, entityCatalog) {
  const rng = alea(`${email}#q-cross-lingual-entity-disambiguation-server${version}`);
  const selectedCount = 16 + Math.floor(rng() * 6);
  const selectedEntities = shuffle(entityCatalog, rng).slice(0, selectedCount);
  const entityMap = {};
  selectedEntities.forEach((entity, index) => {
    entityMap[entity.canonicalName] = `E${String(index + 1).padStart(3, "0")}`;
  });

  const answerMapping = {};
  for (let i = 0; i < 1000; i += 1) {
    const docId = `DOC-${String(i + 1).padStart(4, "0")}`;
    const entity = choice(selectedEntities, rng);
    const language = choice(CROSS_LINGUAL_LANGUAGES, rng);
    const variant = entity.variants[language];
    rng(); // ro[b]
    rng(); // io[b]
    rng(); // co
    const numbers = (entity.era.match(/(\d+)/g) || []).map((value) => Number.parseInt(value, 10));
    if (numbers.length >= 1) {
      const start = numbers[0];
      const end = numbers.length >= 2 ? numbers[1] : start + 50;
      Math.floor(rng() * Math.max(1, end - start));
    } else {
      Math.floor(rng() * 901);
    }
    if (rng() < 0.08) {
      Math.floor(rng() * Math.max(1, variant.length - 2));
    }
    answerMapping[docId] = entityMap[entity.canonicalName];
  }

  const csv = ["doc_id,entity_id"]
    .concat(
      [...Array(1000).keys()].map((idx) => {
        const docId = `DOC-${String(idx + 1).padStart(4, "0")}`;
        return `${docId},${answerMapping[docId]}`;
      }),
    )
    .join("\n");

  return { selectedEntities, entityMap, answerMapping, csv };
}

const TRICK_DECOYS = [
  { question: "What is 2 + 2?", decoyAnswer: "4" },
  { question: "How many hours are in a day?", decoyAnswer: "24" },
  { question: "What color is the sky on a clear day?", decoyAnswer: "blue" },
  { question: "How many continents are there?", decoyAnswer: "7" },
  { question: "What is the capital of France?", decoyAnswer: "Paris" },
];

const TRICK_REAL = [
  { english: "In JavaScript, what does typeof null return?", answer: "object" },
  { english: "What does HTTP status code 404 mean?", answer: "not found" },
  { english: "In SQL, which keyword is used to delete all rows from a table?", answer: "truncate" },
  { english: "What is the most commonly used data format in REST APIs?", answer: "json" },
  { english: "What is the Git command to view commit history?", answer: "git log" },
  { english: "What symbol is used for comments in Python?", answer: "#" },
  { english: "What is the CSS display property value to hide an element?", answer: "none" },
  { english: "In Unix/Linux, which command shows the current directory path?", answer: "pwd" },
];

function trickQuestion(email, version) {
  const rng = alea(`${email}#q-trick-question-server${version}`);
  return {
    decoyQuestion: TRICK_DECOYS[Math.floor(rng() * TRICK_DECOYS.length)],
    realQuestion: TRICK_REAL[Math.floor(rng() * TRICK_REAL.length)],
  };
}

const ASCII_SCENARIOS = [
  {
    name: "git_workflow",
    title: "Record Git Workflow Tutorial",
    description: "Create a tutorial showing common Git commands",
    context: "version control tutorial",
  },
  {
    name: "file_operations",
    title: "Document File Operations",
    description: "Record file manipulation commands for documentation",
    context: "command line tutorial",
  },
  {
    name: "data_processing",
    title: "Create Data Processing Demo",
    description: "Record a data processing pipeline demonstration",
    context: "data analysis tutorial",
  },
  {
    name: "deployment_steps",
    title: "Record Deployment Procedure",
    description: "Document deployment steps with asciinema",
    context: "deployment documentation",
  },
];

const ASCII_COMMANDS = [
  { commands: ["echo 'Hello World'", "date", "pwd"], description: "Basic shell commands" },
  { commands: ["ls -la", "cat /etc/os-release | head -5", "whoami"], description: "System information" },
  { commands: ["mkdir test_dir", "cd test_dir", "touch file.txt", "ls"], description: "File operations" },
  { commands: ["echo 'test' > output.txt", "cat output.txt", "wc -l output.txt"], description: "File manipulation" },
  { commands: ["python --version", "echo 'print(2 + 2)' | python", "date +%Y-%m-%d"], description: "Python and date" },
];

function asciiRecQuestion(email, version) {
  const rng = alea(`${email}#q-asciirec-server${version}`);
  const scenario = ASCII_SCENARIOS[Math.floor(rng() * ASCII_SCENARIOS.length)];
  const commandSet = ASCII_COMMANDS[Math.floor(rng() * ASCII_COMMANDS.length)];
  const marker = `SESSION_${rng().toString(36).substring(2, 10).toUpperCase()}`;
  const header = {
    version: 2,
    width: 100,
    height: 30,
    timestamp: 1710000000,
    env: { SHELL: "/bin/zsh", TERM: "xterm-256color" },
  };

  let time = 0;
  const events = [];
  const allCommands = [`echo '${marker}'`].concat(commandSet.commands);
  for (const command of allCommands) {
    const display = command.startsWith("echo") ? `${command}\r\n${command.includes(marker) ? marker : ""}\r\n` : `${command}\r\n`;
    events.push([Number(time.toFixed(1)), "o", `$ ${display}`]);
    time += 0.2;
  }

  const cast = [JSON.stringify(header)].concat(events.map((event) => JSON.stringify(event))).join("\n");
  return { scenario, commandSet, marker, cast };
}

const SENSOR_NAMES = ["temperature", "humidity", "pressure", "light"];
const LOCATIONS = ["zone-a", "zone-b", "zone-c", "zone-d"];

function generateTimeseriesData(rng, startDate, days) {
  const rows = [];
  const base = new Date(startDate);
  for (let day = 0; day < days; day += 1) {
    for (const location of LOCATIONS) {
      for (const sensor of SENSOR_NAMES) {
        const timestamp = new Date(base);
        timestamp.setDate(base.getDate() + day);
        timestamp.setHours(Math.floor(rng() * 24));
        timestamp.setMinutes(Math.floor(rng() * 60));
        let value;
        if (sensor === "temperature") value = +(15 + rng() * 20).toFixed(1);
        else if (sensor === "humidity") value = +(30 + rng() * 50).toFixed(1);
        else if (sensor === "pressure") value = +(990 + rng() * 30).toFixed(1);
        else value = +(100 + rng() * 800).toFixed(1);
        rows.push({ timestamp: timestamp.toISOString(), location, sensor, value });
      }
    }
  }
  rows.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
  return rows;
}

function timeseriesStats(rows, location, sensor, startDate, endDate) {
  const filtered = rows.filter((row) => {
    const timestamp = new Date(row.timestamp);
    const locationMatch = !location || row.location === location;
    const sensorMatch = !sensor || row.sensor === sensor;
    const dateMatch = (!startDate || timestamp >= new Date(startDate)) && (!endDate || timestamp <= new Date(endDate));
    return locationMatch && sensorMatch && dateMatch;
  });
  if (filtered.length === 0) {
    return { count: 0, avg: 0, min: 0, max: 0 };
  }
  const values = filtered.map((row) => row.value);
  const avg = values.reduce((sum, value) => sum + value, 0) / values.length;
  return {
    count: filtered.length,
    avg: Number(avg.toFixed(2)),
    min: Number(Math.min(...values).toFixed(2)),
    max: Number(Math.max(...values).toFixed(2)),
  };
}

function fastApiQuestion(email, version) {
  const rng = alea(`${email}#q-fastapi-timeseries-cache${version}`);
  const rows = generateTimeseriesData(rng, "2024-01-01", 90);
  const location = LOCATIONS[Math.floor(rng() * LOCATIONS.length)];
  const sensor = SENSOR_NAMES[Math.floor(rng() * SENSOR_NAMES.length)];
  const startDate = "2024-01-15";
  const endDate = "2024-02-15";
  return {
    rows,
    sampleQuery: {
      location,
      sensor,
      startDate,
      endDate,
      fullRange: timeseriesStats(rows, location, sensor, null, null),
      dateRange: timeseriesStats(rows, location, sensor, startDate, endDate),
    },
  };
}

const VIDEO_FIRST = [
  "Aarav",
  "Aditi",
  "Aisha",
  "Alexander",
  "Amara",
  "Ananya",
  "Benjamin",
  "Charlotte",
  "Chen",
  "David",
  "Elena",
  "Fatima",
  "Gabriel",
  "Haruto",
  "Isabella",
  "James",
  "Kavya",
  "Lena",
  "Liam",
  "Linh",
  "Lucas",
  "Maya",
  "Mohammed",
  "Naledi",
  "Natasha",
  "Noah",
  "Olivia",
  "Priya",
  "Rafael",
  "Rania",
  "Rohan",
  "Samuel",
  "Sara",
  "Siddharth",
  "Sofia",
  "Stefan",
  "Tariq",
  "Tomas",
  "Uma",
  "Valentina",
  "Victor",
  "Wanjiru",
  "Xavier",
  "Yuki",
  "Zara",
  "Arjun",
  "Elif",
  "Ingrid",
  "Javier",
  "Kenji",
  "Laila",
  "Miriam",
  "Nadia",
  "Omar",
  "Petra",
  "Rhea",
  "Santiago",
  "Thabo",
  "Ulrike",
  "Vivek",
  "Wren",
  "Yara",
  "Zoe",
];

const VIDEO_LAST = [
  "Acharya",
  "Aldridge",
  "Andersen",
  "Balogun",
  "Barros",
  "Campbell",
  "Chen",
  "Costa",
  "Diallo",
  "Dubois",
  "Erikson",
  "Fernandez",
  "Fischer",
  "Gomez",
  "Gupta",
  "Hansen",
  "Hashimoto",
  "Ibrahim",
  "Jensen",
  "Johansson",
  "Kamau",
  "Khan",
  "Kumar",
  "Laurent",
  "Lee",
  "Lindqvist",
  "Lopez",
  "Mehta",
  "Moreau",
  "Mukherjee",
  "Nakamura",
  "Nkosi",
  "Okafor",
  "Oliveira",
  "Patel",
  "Petrov",
  "Rahman",
  "Reyes",
  "Russo",
  "Schmidt",
  "Sharma",
  "Singh",
  "Solis",
  "Suzuki",
  "Tan",
  "Theron",
  "Torres",
  "Vargas",
  "Weber",
  "Zhang",
];

function videoQuestion(email, version) {
  const rng = alea(`${email}#q-video-attendee-extraction${version}`);
  const seen = new Set();
  const attendees = [];
  while (attendees.length < 20) {
    const fullName = `${VIDEO_FIRST[Math.floor(rng() * VIDEO_FIRST.length)]} ${VIDEO_LAST[Math.floor(rng() * VIDEO_LAST.length)]}`;
    if (seen.has(fullName)) continue;
    seen.add(fullName);
    const year = 2024 + Math.floor(rng() * 3);
    const month = 1 + Math.floor(rng() * 12);
    const day = 1 + Math.floor(rng() * 28);
    attendees.push({
      name: fullName,
      date: `${String(day).padStart(2, "0")}/${String(month).padStart(2, "0")}/${String(year)}`,
    });
  }
  return attendees;
}

function buildFastApiServerPy() {
  return `#!/usr/bin/env python3
import csv
import json
from datetime import datetime
from functools import lru_cache
from http.server import BaseHTTPRequestHandler, HTTPServer
from pathlib import Path
from urllib.parse import parse_qs, urlparse

DATA_FILE = Path(__file__).with_name("q-fastapi-timeseries-cache.csv")


def load_rows():
    rows = []
    with DATA_FILE.open("r", encoding="utf-8", newline="") as handle:
        reader = csv.DictReader(handle)
        for row in reader:
            rows.append(
                {
                    "timestamp": row["timestamp"],
                    "location": row["location"],
                    "sensor": row["sensor"],
                    "value": float(row["value"]),
                }
            )
    return rows


ROWS = load_rows()


@lru_cache(maxsize=512)
def compute_stats(location="", sensor="", start_date="", end_date=""):
    filtered = []
    for row in ROWS:
        ts = datetime.fromisoformat(row["timestamp"].replace("Z", "+00:00"))
        if location and row["location"] != location:
            continue
        if sensor and row["sensor"] != sensor:
            continue
        if start_date and ts < datetime.fromisoformat(start_date + "T00:00:00+00:00"):
            continue
        if end_date and ts > datetime.fromisoformat(end_date + "T00:00:00+00:00"):
            continue
        filtered.append(row["value"])

    if not filtered:
        return {"count": 0, "avg": 0, "min": 0, "max": 0}

    avg = round(sum(filtered) / len(filtered), 2)
    return {
        "count": len(filtered),
        "avg": avg,
        "min": round(min(filtered), 2),
        "max": round(max(filtered), 2),
    }


class Handler(BaseHTTPRequestHandler):
    def _cors(self):
        self.send_header("Access-Control-Allow-Origin", "*")
        self.send_header("Access-Control-Allow-Headers", "*")
        self.send_header("Access-Control-Allow-Methods", "GET, OPTIONS")

    def do_OPTIONS(self):
        self.send_response(204)
        self._cors()
        self.end_headers()

    def do_GET(self):
        parsed = urlparse(self.path)
        if parsed.path != "/stats":
            self.send_response(404)
            self._cors()
            self.end_headers()
            self.wfile.write(b'{"error":"not found"}')
            return

        params = parse_qs(parsed.query)
        location = params.get("location", [""])[0]
        sensor = params.get("sensor", [""])[0]
        start_date = params.get("start_date", [""])[0]
        end_date = params.get("end_date", [""])[0]

        before = compute_stats.cache_info().hits
        stats = compute_stats(location, sensor, start_date, end_date)
        after = compute_stats.cache_info().hits
        cache_state = "HIT" if after > before else "MISS"

        payload = json.dumps({"stats": stats}).encode("utf-8")
        self.send_response(200)
        self._cors()
        self.send_header("Content-Type", "application/json")
        self.send_header("X-Cache", cache_state)
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def log_message(self, format, *args):
        return


def self_test():
    result = compute_stats()
    assert "count" in result
    assert "avg" in result
    print("self-test ok")


if __name__ == "__main__":
    import sys

    if "--self-test" in sys.argv:
        self_test()
        raise SystemExit(0)

    port = 8000
    server = HTTPServer(("127.0.0.1", port), Handler)
    print(f"http://127.0.0.1:{port}/stats")
    server.serve_forever()
`;
}

function buildFolderQuestions(email, entityCatalog) {
  const regex = regexQuestion(email);
  const maze = mazeQuestion(email);
  const cipher = cipherQuestion(email);
  const rename = renameQuestion(email, VERSION_ROE);
  const python = pythonRefactorQuestion(email, VERSION_ROE);
  const brokenJson = brokenJsonQuestion(email, VERSION_ROE);
  const crossLingual = crossLingualQuestion(email, VERSION_ROE, entityCatalog);
  const trick = trickQuestion(email, VERSION_ROE);
  const asciiRec = asciiRecQuestion(email, VERSION_ROE);
  const fastApi = fastApiQuestion(email, VERSION_ROE);
  const video = videoQuestion(email, VERSION_VIDEO);

  assert(cipher.answerWord.length === cipher.requiredNodes.length, "Cipher generation mismatch");
  assert(JSON.parse(brokenJson.validJson).length === 300, "Broken JSON answer generation failed");
  assert(crossLingual.csv.split("\n").length === 1001, "Cross-lingual CSV row count mismatch");
  assert(video.length === 20, "Video attendee generation failed");

  return [
    {
      index: "01",
      id: "q-share-token-server",
      status: "blocked",
      files: {
        "README.md": [
          "# q-share-token-server",
          "",
          "Status: blocked",
          "",
          "The actual token comes from `questionData` on the exam server and the score depends on collecting many other students' valid tokens.",
          "Local repo evidence only shows the verifier contract and accepted input formats.",
          "",
          "Submit format options:",
          "- one token per line",
          "- comma-separated tokens",
          '- JSON array like `["abc123def4","p9q8r7s6t5"]`',
          '- object form like `{"tokens":["abc123def4"]}`',
          "",
          "Blocker: your personal token and the hidden token pool are server-side only.",
          "",
        ].join("\n"),
      },
    },
    {
      index: "02",
      id: "q-korean-audio-dataset-server",
      status: "blocked",
      files: {
        "README.md": [
          "# q-korean-audio-dataset-server",
          "",
          "Status: blocked",
          "",
          "The exam bundle only exposes the response contract. The actual four audio samples and their expected per-audio statistics are hidden behind server-side verification.",
          "",
          "Required endpoint contract:",
          '- request body: `{"audio_id":"q0","audio_base64":"..."}`',
          "- response JSON must include:",
          "  - rows",
          "  - columns",
          "  - mean",
          "  - std",
          "  - variance",
          "  - min",
          "  - max",
          "  - median",
          "  - mode",
          "  - range",
          "  - allowed_values",
          "  - value_range",
          "  - correlation",
          "",
          "Blocker: expected values are not derivable from `exam.js` alone.",
          "",
        ].join("\n"),
      },
    },
    {
      index: "03",
      id: "q-regex-golf-server",
      status: "solved",
      files: {
        "answer.txt": `${regex.pattern}\n`,
        "rules.json": JSON.stringify(regex.rules, null, 2) + "\n",
        "README.md": `# q-regex-golf-server\n\nSolved directly from the deterministic generator seeded by \`${email}\`.\nSubmit the regex from \`answer.txt\`.\n`,
      },
    },
    {
      index: "04",
      id: "q-maze-solver-server",
      status: "solved",
      files: {
        "path.txt": maze.solutionPath.map(([row, col]) => `${row},${col}`).join("\n") + "\n",
        "keys.json": JSON.stringify(maze.maze.keys, null, 2) + "\n",
        "README.md": `# q-maze-solver-server\n\nSolved from the seeded maze generator. Submit the coordinate sequence from \`path.txt\`.\n`,
      },
    },
    {
      index: "05",
      id: "q-cipher-trail-server",
      status: "solved",
      files: {
        "answer.txt": `${cipher.answerWord}\n`,
        "fragments.json": JSON.stringify(
          {
            requiredNodes: cipher.requiredNodes,
            nodeShifts: cipher.nodeShifts,
            fragments: cipher.fragments,
          },
          null,
          2,
        ) + "\n",
        "README.md": `# q-cipher-trail-server\n\nSolved from the seeded graph/shift generator. Submit the word in \`answer.txt\`.\n`,
      },
    },
    {
      index: "06",
      id: "q-decode-layered-server",
      status: "partial",
      files: {
        "likely-answer.json": JSON.stringify({ decoded: email }, null, 2) + "\n",
        "README.md": [
          "# q-decode-layered-server",
          "",
          "Status: partial",
          "",
          "The encoded payload itself is loaded from the server-side `questionData` iframe and is not present in this repo.",
          "The clue strongly suggests the decoded original is the email address because every question is keyed by it.",
          "",
          "Most likely submission:",
          `\`{"decoded":"${email}"}\``,
          "",
          "This is a reasoned guess, not a verified derivation from local code.",
          "",
        ].join("\n"),
      },
    },
    {
      index: "07",
      id: "q-region-containing-point-server",
      status: "blocked",
      files: {
        "README.md": [
          "# q-region-containing-point-server",
          "",
          "Status: blocked",
          "",
          "The verifier logic is present, but the actual polygon dataset comes from `data-cities-regions.json`, which is not in this workspace.",
          "Without that file, the franchise region boundaries cannot be reconstructed locally.",
          "",
          "Needed missing artifact: `data-cities-regions.json`.",
          "",
        ].join("\n"),
      },
    },
    {
      index: "08",
      id: "q-rename-files-server",
      status: "solved",
      files: {
        "answer.txt": `${rename.expectedHash}\n`,
        "expected-files.txt": rename.expectedFiles.join("\n") + "\n",
        "sorted-find-output.txt": rename.fileList,
        "README.md": `# q-rename-files-server\n\nSolved from the seeded file generator. Submit the SHA-256 hash from \`answer.txt\`.\n`,
      },
    },
    {
      index: "09",
      id: "q-python-refactor-server",
      status: "solved",
      files: {
        "refactor_me.py": python.correctCode,
        "README.md": `# q-python-refactor-server\n\nSolved from the seeded refactor generator. Submit the full contents of \`refactor_me.py\`.\n`,
      },
    },
    {
      index: "10",
      id: "q-broken-json-server",
      status: "solved",
      files: {
        "fixed.json": brokenJson.validJson + "\n",
        "broken.json": brokenJson.brokenJson + "\n",
        "README.md": `# q-broken-json-server\n\nThe valid submission is \`fixed.json\`. The generated corrupted input is saved as \`broken.json\` for reference.\n`,
      },
    },
    {
      index: "11",
      id: "q-cross-lingual-entity-disambiguation-server",
      status: "solved",
      files: {
        "answer.csv": crossLingual.csv + "\n",
        "selected-entities.json": JSON.stringify(crossLingual.selectedEntities, null, 2) + "\n",
        "README.md": `# q-cross-lingual-entity-disambiguation-server\n\nSolved from the seeded document/entity generator. Submit \`answer.csv\`.\n`,
      },
    },
    {
      index: "12",
      id: "q-trick-question-server",
      status: "solved",
      files: {
        "answer.txt": `${trick.realQuestion.answer}\n`,
        "README.md": `# q-trick-question-server\n\nThe hidden real question is: ${trick.realQuestion.english}\nSubmit the answer from \`answer.txt\`.\n`,
      },
    },
    {
      index: "13",
      id: "q-asciirec-server",
      status: "solved",
      files: {
        "session.cast": `${asciiRec.cast}\n`,
        "README.md": `# q-asciirec-server\n\nThe verifier only checks for the marker and command strings in the asciinema output stream. Submit \`session.cast\`.\n`,
      },
    },
    {
      index: "14",
      id: "q-fastapi-timeseries-cache",
      status: "solved-with-server",
      files: {
        "server.py": buildFastApiServerPy(),
        "q-fastapi-timeseries-cache.csv":
          ["timestamp,location,sensor,value"].concat(
            fastApi.rows.map((row) => `${row.timestamp},${row.location},${row.sensor},${row.value}`),
          ).join("\n") + "\n",
        "answer.txt": "http://127.0.0.1:8000/stats\n",
        "sample-query.json": JSON.stringify(fastApi.sampleQuery, null, 2) + "\n",
        "README.md": [
          "# q-fastapi-timeseries-cache",
          "",
          "Run the local server:",
          "",
          "```bash",
          "python server.py",
          "```",
          "",
          "Then submit the URL from `answer.txt` while the server is running.",
          "",
        ].join("\n"),
      },
    },
    {
      index: "15",
      id: "q-video-attendee-extraction",
      status: "solved",
      files: {
        "answer.json": JSON.stringify(video, null, 2) + "\n",
        "README.md": `# q-video-attendee-extraction\n\nSolved from the seeded attendee generator. Submit \`answer.json\`.\n`,
      },
    },
  ];
}

function filterQuestions(questions, questionIds) {
  if (!questionIds || questionIds.length === 0) {
    return questions;
  }
  const knownIds = new Set(questions.map((question) => question.id));
  const unknownIds = questionIds.filter((id) => !knownIds.has(id));
  assert(unknownIds.length === 0, `Unknown question id(s): ${unknownIds.join(", ")}`);
  return questions.filter((question) => questionIds.includes(question.id));
}

function writeQuestionFolders(outRoot, email, questions) {
  ensureDir(outRoot);
  const summary = [];
  for (const question of questions) {
    const dir = path.join(outRoot, `${question.index}-${question.id}`);
    ensureDir(dir);
    for (const [name, content] of Object.entries(question.files)) {
      writeText(path.join(dir, name), content);
    }
    summary.push({
      index: question.index,
      id: question.id,
      status: question.status,
      path: path.relative(ROOT, dir),
    });
  }
  writeJson(path.join(outRoot, "summary.json"), {
    email,
    generatedAt: new Date().toISOString(),
    questions: summary,
  });
  writeText(
    path.join(outRoot, "README.md"),
    [
      "# Exam Solution Folders",
      "",
      `Email seed: \`${email}\``,
      "",
      "Status summary:",
      ...summary.map((item) => `- ${item.index} ${item.id}: ${item.status}`),
      "",
    ].join("\n"),
  );

  writeJson(path.join(outRoot, "manifest.json"), {
    email,
    outDir: path.relative(ROOT, outRoot),
    supportedQuestionCount: questions.length,
    solvedQuestions: summary.filter((item) => item.status.startsWith("solved")).map((item) => item.id),
    blockedQuestions: summary.filter((item) => item.status === "blocked").map((item) => item.id),
    partialQuestions: summary.filter((item) => item.status === "partial").map((item) => item.id),
  });
}

function main() {
  const options = parseArgs(process.argv.slice(2));
  if (options.help) {
    printHelp();
    return;
  }
  assert(fs.existsSync(EXAM_JS), "exam.js not found");
  const examSource = fs.readFileSync(EXAM_JS, "utf8");
  const entityCatalog = loadLargeEntityCatalog(examSource);
  const allQuestions = buildFolderQuestions(options.email, entityCatalog);
  const selectedQuestions = filterQuestions(allQuestions, options.questionIds);
  writeQuestionFolders(options.outDir, options.email, selectedQuestions);
  console.log(
    `Generated ${selectedQuestions.length} question folders in ${path.relative(ROOT, options.outDir)} for ${options.email}`,
  );
}

main();
