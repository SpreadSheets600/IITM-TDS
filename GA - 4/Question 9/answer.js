/**
 * Q9: GitHub Copilot Data Transformation
 *
 * The exam randomly picks ONE of these 10 transformation tasks.
 * The answer is a JavaScript function that performs the task.
 *
 * Check which task you're assigned, then use the corresponding function below.
 * The validation accepts any function that produces the correct output for the test data.
 */

// ── Task 1: group-sum ──────────────────────────────────────────────────────────
// Description: groups array of objects by 'category' field and sums their 'amount' values
// Test data: [{category:"food",amount:50},{category:"travel",amount:100},{category:"food",amount:30},{category:"travel",amount:75}]
// Expected: {food:80, travel:175}

function groupAndSum(data) {
    return data.reduce((acc, item) => {
        acc[item.category] = (acc[item.category] || 0) + item.amount;
        return acc;
    }, {});
}

// ── Task 2: flatten-nested ─────────────────────────────────────────────────────
// Description: flattens a nested array structure into a single-level array
// Test data: [1,[2,3],[4,[5,6]],7]
// Expected: [1,2,3,4,5,6,7]

function flattenNested(data) {
    return data.flat(Infinity);
}

// ── Task 3: filter-unique ──────────────────────────────────────────────────────
// Description: removes duplicate values from an array while preserving order
// Test data: [1,2,3,2,4,1,5,3]
// Expected: [1,2,3,4,5]

function filterUnique(data) {
    return [...new Set(data)];
}

// ── Task 4: pivot-data ─────────────────────────────────────────────────────────
// Description: converts array of {name, value} objects into an object with name as keys
// Test data: [{name:"a",value:10},{name:"b",value:20},{name:"c",value:30}]
// Expected: {a:10,b:20,c:30}

function pivotData(data) {
    return data.reduce((acc, item) => { acc[item.name] = item.value; return acc; }, {});
}

// ── Task 5: count-frequency ─────────────────────────────────────────────────────
// Description: counts frequency of each item in an array
// Test data: ["apple","banana","apple","orange","banana","apple"]
// Expected: {apple:3,banana:2,orange:1}

function countFrequency(data) {
    return data.reduce((acc, item) => { acc[item] = (acc[item] || 0) + 1; return acc; }, {});
}

// ── Task 6: merge-objects ──────────────────────────────────────────────────────
// Description: deeply merges two objects, with second object values taking precedence
// Test data: [{a:1,b:{c:2,d:3}},{b:{c:4,e:5},f:6}]
// Expected: {a:1,b:{c:4,d:3,e:5},f:6}

function deepMerge(data) {
    const [obj1, obj2] = data;
    function merge(a, b) {
        const result = { ...a };
        for (const key in b) {
            if (b[key] && typeof b[key] === 'object' && !Array.isArray(b[key]) && a[key]) {
                result[key] = merge(a[key], b[key]);
            } else {
                result[key] = b[key];
            }
        }
        return result;
    }
    return merge(obj1, obj2);
}

// ── Task 7: extract-nested ─────────────────────────────────────────────────────
// Description: extracts all 'id' fields from deeply nested object structure
// Test data: {id:1,children:[{id:2,children:[{id:3}]},{id:4}]}
// Expected: [1,2,3,4]

function extractIds(data) {
    const ids = [];
    function traverse(obj) {
        if (obj && typeof obj === 'object') {
            if ('id' in obj) ids.push(obj.id);
            if (obj.children) obj.children.forEach(traverse);
    }
    traverse(data);
    return ids;
}

// ── Task 8: chunk-array ────────────────────────────────────────────────────────
// Description: splits array into chunks of specified size (size=3)
// Test data: [1,2,3,4,5,6,7,8]
// Expected: [[1,2,3],[4,5,6],[7,8]]

function chunkArray(data) {
    const result = [];
    for (let i = 0; i < data.length; i += 3) {
        result.push(data.slice(i, i + 3));
    }
    return result;
}

// ── Task 9: transpose-matrix ───────────────────────────────────────────────────
// Description: transposes a 2D array (matrix)
// Test data: [[1,2,3],[4,5,6]]
// Expected: [[1,4],[2,5],[3,6]]

function transposeMatrix(data) {
    return data[0].map((_, colIdx) => data.map(row => row[colIdx]));
}

// ── Task 10: sort-objects ──────────────────────────────────────────────────────
// Description: sorts array of objects by 'priority' field (descending) then by 'name' field (ascending)
// Test data: [{name:"task3",priority:2},{name:"task1",priority:3},{name:"task2",priority:3},{name:"task4",priority:1}]
// Expected: [{name:"task1",priority:3},{name:"task2",priority:3},{name:"task3",priority:2},{name:"task4",priority:1}]

function sortObjects(data) {
    return [...data].sort((a, b) => {
        if (b.priority !== a.priority) return b.priority - a.priority;
        return a.name.localeCompare(b.name);
    });
}}
