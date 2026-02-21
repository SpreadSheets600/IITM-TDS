import json
import hashlib

EMAIL = "24f2008474@ds.study.iitm.ac.in"

products = [
    # PASTE The Products Catalog Array HERE
]


def generate_catalog():
    if not products:
        print("Error: You forgot to paste your products array inside the script!")
        return

    version_str = f"{EMAIL}:gh-json-api"
    version_hash = hashlib.sha256(version_str.encode("utf-8")).hexdigest()[:8]

    categories = ["electronics", "clothing", "books", "home", "sports"]
    aggregations = {}

    for c in categories:
        cat_items = [p for p in products if p["category"] == c]
        count = len(cat_items)

        inv_value = round(sum(p["price"] * p["stock"] for p in cat_items), 2)

        aggregations[c] = {"count": count, "inventoryValue": inv_value}

    catalog = {
        "metadata": {"email": EMAIL, "version": version_hash},
        "products": products,
        "aggregations": aggregations,
    }

    with open("catalog.json", "w") as f:
        json.dump(catalog, f, indent=2)

    print(f"Success! `catalog.json` created.\nVersion Hash generated: {version_hash}")
    print("You can now upload catalog.json to your GitHub Pages repository!")


if __name__ == "__main__":
    generate_catalog()
