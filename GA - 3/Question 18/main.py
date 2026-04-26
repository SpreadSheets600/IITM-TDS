import csv
import json
import re
import sys
import zipfile
from collections import Counter
from datetime import datetime
from pathlib import Path
import xml.etree.ElementTree as ET

NS = {
    "m": "http://schemas.openxmlformats.org/spreadsheetml/2006/main",
    "r": "http://schemas.openxmlformats.org/officeDocument/2006/relationships",
}

COUNTRY_MAP = {
    "US": "USA",
    "U.S.": "USA",
    "U.S.A": "USA",
    "U.S.A.": "USA",
    "USA": "USA",
    "UNITED STATES": "USA",
    "UK": "United Kingdom",
    "U.K": "United Kingdom",
    "U.K.": "United Kingdom",
    "UNITED KINGDOM": "United Kingdom",
    "AE": "United Arab Emirates",
    "UAE": "United Arab Emirates",
    "U.A.E": "United Arab Emirates",
    "UNITED ARAB EMIRATES": "United Arab Emirates",
    "FR": "France",
    "FRA": "France",
    "FRANCE": "France",
    "BRA": "Brazil",
    "BR": "Brazil",
    "BRAZIL": "Brazil",
    "IND": "India",
    "IN": "India",
    "INDIA": "India",
}

DATE_FORMATS = [
    "%Y-%m-%d",
    "%Y/%m/%d",
    "%m-%d-%Y",
    "%m/%d/%Y",
    "%d-%m-%Y",
    "%d/%m/%Y",
]


def _shared_strings(zf: zipfile.ZipFile) -> list[str]:
    if "xl/sharedStrings.xml" not in zf.namelist():
        return []
    root = ET.fromstring(zf.read("xl/sharedStrings.xml"))
    out = []
    for si in root.findall("m:si", NS):
        text = "".join((t.text or "") for t in si.findall(".//m:t", NS))
        out.append(text)
    return out


def _worksheet_path(zf: zipfile.ZipFile, sheet_name: str) -> str:
    wb = ET.fromstring(zf.read("xl/workbook.xml"))
    rels = ET.fromstring(zf.read("xl/_rels/workbook.xml.rels"))
    rel_map = {rel.attrib["Id"]: rel.attrib["Target"] for rel in rels}

    for sh in wb.findall("m:sheets/m:sheet", NS):
        if sh.attrib.get("name") == sheet_name:
            rid = sh.attrib[
                "{http://schemas.openxmlformats.org/officeDocument/2006/relationships}id"
            ]
            target = rel_map[rid]
            if not target.startswith("worksheets/"):
                return f"xl/{target}"
            return f"xl/{target}"
    raise ValueError(f"Sheet not found: {sheet_name}")


def read_raw_rows(xlsx_path: Path, sheet_name: str = "RawData") -> list[dict[str, str]]:
    with zipfile.ZipFile(xlsx_path) as zf:
        sst = _shared_strings(zf)
        ws_path = _worksheet_path(zf, sheet_name)
        ws = ET.fromstring(zf.read(ws_path))

        rows = ws.findall("m:sheetData/m:row", NS)
        if not rows:
            return []

        parsed_rows: list[list[str]] = []
        max_cols = 0

        for row in rows:
            cells = []
            for c in row.findall("m:c", NS):
                cell_type = c.attrib.get("t", "")
                v = c.find("m:v", NS)
                val = (v.text or "") if v is not None else ""
                if cell_type == "s" and val.isdigit():
                    idx = int(val)
                    if 0 <= idx < len(sst):
                        val = sst[idx]
                elif cell_type == "inlineStr":
                    t = c.find("m:is/m:t", NS)
                    val = (t.text or "") if t is not None else ""
                cells.append(val)
            max_cols = max(max_cols, len(cells))
            parsed_rows.append(cells)

        normalized = [r + [""] * (max_cols - len(r)) for r in parsed_rows]
        header = [h.strip() for h in normalized[0]]

        out = []
        for r in normalized[1:]:
            obj = {header[i]: (r[i] if i < len(r) else "") for i in range(len(header))}
            out.append(obj)
        return out


def parse_money(value: str) -> float | None:
    if value is None:
        return None
    s = str(value).strip()
    if not s:
        return None
    m = re.search(r"-?\d+(?:\.\d+)?", s.replace(",", ""))
    if not m:
        return None
    return float(m.group(0))


def normalize_country(country: str) -> str:
    s = (country or "").strip()
    key = re.sub(r"\s+", " ", s).upper()
    return COUNTRY_MAP.get(key, s.strip())


def normalize_date(date_str: str) -> str | None:
    raw = (date_str or "").strip()
    if not raw:
        return None
    for fmt in DATE_FORMATS:
        try:
            dt = datetime.strptime(raw, fmt)
            return dt.strftime("%Y-%m-%d")
        except ValueError:
            continue
    return None


def split_product_code(value: str) -> tuple[str | None, str | None]:
    s = (value or "").strip()
    if not s:
        return None, None
    if "/" not in s:
        return s, None
    p, c = s.split("/", 1)
    p = p.strip() or None
    c = c.strip() or None
    return p, c


def clean_rows(rows: list[dict[str, str]]) -> list[dict[str, object]]:
    out: list[dict[str, object]] = []
    for r in rows:
        tx = str(r.get("TransactionID", "")).strip()
        customer = re.sub(r"\s+", " ", str(r.get("Customer Name", "")).strip())
        country = normalize_country(str(r.get("Country", "")))
        date_iso = normalize_date(str(r.get("Date", "")))
        product, code = split_product_code(str(r.get("Product/Code", "")))
        sales = parse_money(str(r.get("Sales", "")))
        cost = parse_money(str(r.get("Cost", "")))
        profit = (sales - cost) if (sales is not None and cost is not None) else None

        out.append(
            {
                "transactionId": tx,
                "customer": customer,
                "country": country,
                "date": date_iso,
                "product": product,
                "code": code,
                "sales": sales,
                "cost": cost,
                "profit": profit,
            }
        )
    return out


def summarize(cleaned: list[dict[str, object]]) -> dict[str, object]:
    total_rows = len(cleaned)
    valid_rows = sum(
        1
        for r in cleaned
        if r["transactionId"]
        and r["customer"]
        and r["country"]
        and r["date"]
        and r["product"] is not None
        and r["sales"] is not None
    )

    sales_sum = sum(float(r["sales"]) for r in cleaned if r["sales"] is not None)
    cost_sum = sum(float(r["cost"]) for r in cleaned if r["cost"] is not None)
    profit_sum = sum(float(r["profit"]) for r in cleaned if r["profit"] is not None)

    missing_cost = sum(1 for r in cleaned if r["cost"] is None)
    missing_date = sum(1 for r in cleaned if r["date"] is None)

    by_country = Counter(r["country"] for r in cleaned if r["country"])
    by_product = Counter(r["product"] for r in cleaned if r["product"])

    return {
        "totalRows": total_rows,
        "validRows": valid_rows,
        "missingCostRows": missing_cost,
        "missingDateRows": missing_date,
        "totalSales": round(sales_sum, 2),
        "totalCost": round(cost_sum, 2),
        "totalProfit": round(profit_sum, 2),
        "topCountries": by_country.most_common(10),
        "topProducts": by_product.most_common(10),
    }


def write_csv(path: Path, cleaned: list[dict[str, object]]) -> None:
    fieldnames = [
        "transactionId",
        "customer",
        "country",
        "date",
        "product",
        "code",
        "sales",
        "cost",
        "profit",
    ]
    with path.open("w", newline="", encoding="utf-8") as f:
        w = csv.DictWriter(f, fieldnames=fieldnames)
        w.writeheader()
        w.writerows(cleaned)


def main() -> None:
    in_path = (
        Path(sys.argv[1])
        if len(sys.argv) > 1
        else Path("q-clean-up-excel-sales-data.xlsx")
    )
    if not in_path.exists():
        raise SystemExit(f"Input file not found: {in_path}")

    rows = read_raw_rows(in_path)
    cleaned = clean_rows(rows)
    summary = summarize(cleaned)

    out_csv = in_path.with_name("cleaned_sales_data.csv")
    out_json = in_path.with_name("summary.json")
    write_csv(out_csv, cleaned)
    out_json.write_text(json.dumps(summary, indent=2), encoding="utf-8")

    print(json.dumps(summary, indent=2))
    print(f"\nWrote: {out_csv}")
    print(f"Wrote: {out_json}")


if __name__ == "__main__":
    main()
