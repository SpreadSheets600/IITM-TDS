const { chromium } = require("playwright");

const seeds = [64, 65, 66, 67, 78, 69, 70, 71, 72, 73];

// Update this template if your assignment uses a different URL shape.
const baseUrlTemplate = process.env.SEED_URL_TEMPLATE || "https://sanand0.github.io/tdsdata/js_table/?seed={seed}";

function buildSeedUrl(seed) {
	return baseUrlTemplate.replace("{seed}", String(seed));
}

function parseNumbers(text) {
	const matches = String(text).match(/[-+]?\d*\.?\d+/g);
	if (!matches) return [];
	return matches.map((value) => Number(value.replace(/,/g, ""))).filter((num) => Number.isFinite(num));
}

async function sumTablesFromPage(page, url) {
	await page.goto(url, { waitUntil: "domcontentloaded", timeout: 90000 });
	await page.waitForSelector("table", { timeout: 15000 });

	const tableTexts = await page.$$eval("table", (tables) => tables.map((table) => table.innerText || ""));

	let pageTotal = 0;
	for (const tableText of tableTexts) {
		for (const value of parseNumbers(tableText)) {
			pageTotal += value;
		}
	}

	return pageTotal;
}

async function main() {
	const browser = await chromium.launch({ headless: true });
	const page = await browser.newPage();

	let grandTotal = 0;

	for (const seed of seeds) {
		const url = buildSeedUrl(seed);
		const pageTotal = await sumTablesFromPage(page, url);
		grandTotal += pageTotal;
		console.log(`Seed ${seed} total: ${pageTotal}`);
	}

	// Keep this exact marker so evaluators can grep it from workflow logs.
	console.log(`FINAL_TOTAL=${grandTotal}`);

	await browser.close();
}

main().catch((error) => {
	console.error("Playwright sum job failed.");
	console.error(error);
	process.exit(1);
});
