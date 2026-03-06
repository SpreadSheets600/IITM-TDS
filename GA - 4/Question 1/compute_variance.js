import xlsx from 'xlsx';

const workbook = xlsx.readFile('q-excel-operational-metrics.xlsx');
const sheet = workbook.Sheets['Operational Close'];
const data = xlsx.utils.sheet_to_json(sheet, { defval: null });

let totalVariance = 0;
let matchedRows = 0;

for (const row of data) {
    let region = String(row['Region'] || '').trim();
    if (region.match(/N\.?\s*America/i) || region === 'NA') region = 'North America';

    let closingPeriod = String(row['Closing Period'] || '').trim();
    let dateObj = null;

    if (closingPeriod.match(/^20\d{2}\s*Q[1-4]$/i)) {
        const year = parseInt(closingPeriod.substring(0, 4));
        const q = parseInt(closingPeriod.slice(-1));
        if (q === 1) dateObj = new Date(`${year}-03-31T00:00:00Z`);
        if (q === 2) dateObj = new Date(`${year}-06-30T00:00:00Z`);
        if (q === 3) dateObj = new Date(`${year}-09-30T00:00:00Z`);
        if (q === 4) dateObj = new Date(`${year}-12-31T00:00:00Z`);
    } else if (closingPeriod.match(/^(\d{2})\/(\d{2})\/(\d{4})$/)) {
        const [, d, m, y] = closingPeriod.match(/^(\d{2})\/(\d{2})\/(\d{4})$/);
        dateObj = new Date(`${y}-${m}-${d}T00:00:00Z`);
    } else {
        if (!isNaN(closingPeriod) && typeof row['Closing Period'] === 'number') {
            dateObj = new Date((row['Closing Period'] - (25569)) * 86400 * 1000);
            dateObj = new Date(dateObj.toISOString().split('T')[0] + 'T00:00:00Z');
        } else {
            let parsed = new Date(closingPeriod + 'T00:00:00Z');
            if (isNaN(parsed.getTime())) {
                parsed = new Date(closingPeriod);
            }
            dateObj = parsed;
        }
    }

    const revStr = String(row['Revenue (reported)'] || '').trim();
    const cleanRev = revStr.replace(/[^0-9.-]/g, '');
    const revenue = parseFloat(cleanRev) || 0;

    let expense = 0;
    const expStr = String(row['Expense (reported)'] || '').trim();
    if (!expStr || expStr.includes('USD TBD') || expStr === 'null') {
        expense = 0.37 * revenue;
    } else {
        const cleanExp = expStr.replace(/[^0-9.-]/g, '');
        expense = parseFloat(cleanExp) || 0;
    }

    const opsNotes = String(row['Ops Notes'] || '');
    const category = (opsNotes.split('|')[0] || '').trim();

    const filterDate = new Date('2024-07-21T23:59:59Z');

    if (region === 'North America' && category === 'Returns') {
        let isBefore = dateObj && dateObj <= filterDate;
        console.log(`[${isBefore ? 'MATCH' : 'SKIP'}] Date: ${closingPeriod} => ${dateObj ? dateObj.toISOString().split('T')[0] : 'Invalid'} | Rev: ${revenue} | Exp: ${expense} | Var: ${revenue - expense}`);
        if (isBefore) {
            matchedRows++;
            totalVariance += (revenue - expense);
        }
    }
}

console.log('Matched rows:', matchedRows);
console.log('Total Variance:', totalVariance);
