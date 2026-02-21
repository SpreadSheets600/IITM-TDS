# Question 5: Host a JSON Data API on GitHub Pages

## Problem
You need to convert a product array given in the exam into a structured JSON API (`catalog.json`) that computes aggregate counts and values for each category. It also requires a metadata object with your exam email and a specific SHA-256 derived hex string as the version.

## Solution

1. Open `generate_catalog.py` in your code editor.
2. In the exam portal, find the `<details>` collapsible section and click **"Click to expand product data"**.
3. Copy the entire `[ { ... } ]` array into your clipboard.
4. Paste it right into `generate_catalog.py` at line 8 where it says `# PASTE HERE!`.
5. Run the python script:
   ```bash
   python generate_catalog.py
   ```
6. A `catalog.json` file will be instantly generated for you with all the correctly calculated values!

## Hosting on GitHub Pages
1. Create a new GitHub repository (e.g. `json-api`).
2. Upload the `catalog.json` file directly to the root of the repository.
3. Enable GitHub Pages on the `main` branch.
4. Once deployed, submit the URL to your file in the exam:
   `https://YOUR_USERNAME.github.io/json-api/catalog.json`
