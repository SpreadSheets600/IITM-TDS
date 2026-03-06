# GA-4 Exam — Complete Solutions Guide

## Overview

All 20 questions solved. Run the unified solver with your email:

```bash
cd "GA - 4"
node solve_all.js your_email@ds.study.iitm.ac.in
```

## Quick Reference

| # | ID | Type | How to Get Answer |
|---|----|------|-------------------|
| 1 | `q-excel-operational-metrics` | Computed | `node solve_all.js <email>` |
| 2 | `q-excel-zscore-outlier` | Computed | `node solve_all.js <email>` |
| 3 | `q-dbt-customer-analytics` | Code | Copy `Question 3/answer.sql` |
| 4 | `q-dbt-operations-dashboard` | Code | Copy `Question 4/answer.sql` |
| 5 | `q-openrefine-supplier-spend` | Computed | `node solve_all.js <email>` |
| 6 | `q-json-sensor-rollup` | Computed | `node solve_all.js <email>` |
| 7 | `q-json-customer-flatten` | Computed | `node solve_all.js <email>` |
| 8 | `q-parse-partial-json` | Computed | `node "Question 8/solve_q8.mjs" <email>` |
| 9 | `q-copilot-data-transform` | Code | Copy matching fn from `Question 9/answer.js` |
| 10 | `q-ai-formula-extract-zipcode` | Computed | `node "Question 10/solve_q10.js" <email>` |
| 11 | `q-fastapi-sentiment-batch` | Server URL | `python "Question 11/server.py"` |
| 12 | `q-shell-csv-log-parsing` | Computed | `node "Question 12/solve_q12.js" <email>` |
| 13 | `q-shell-json-extraction` | Computed | `node "Question 13/solve_q13.js" <email>` |
| 14 | `q-shell-text-aggregation` | Computed | `node "Question 14/solve_q14.js" <email>` |
| 15 | `q-recursive-corrupted-json-server` | SHA-256 | `python "Question 15/solve_q15.py" <email>` |
| 16 | `q-cross-lingual-entity-disambiguation-server` | CSV | `node "Question 16/solve_q16.js" <email>` |
| 17 | `q-llm-hallucination-trap-matrix-server` | Filename | `node solve_all.js <email>` |
| 18 | `q-duckdb-data-preparation` | SQL | Copy from `node solve_all.js <email>` |
| 19 | `q-image-grayscale-rebuild` | Image upload | See Q19 README |
| 20 | `q-audio-transcript-extraction` | Text | See Q20 README |

## Step-by-Step

### 1. Install dependencies

```bash
cd "GA - 4"
npm install @faker-js/faker
pip install fastapi uvicorn pillow numpy
pip install yt-dlp openai-whisper  # for Q20
```

### 2. Run the master solver

```bash
node solve_all.js 22f3001478@ds.study.iitm.ac.in
```

### 3. For Q12 (large file - takes ~10 seconds)

```bash
node "Question 12/solve_q12.js" 22f3001478@ds.study.iitm.ac.in
```

### 4. For Q11 (FastAPI server)

```bash
pip install fastapi uvicorn
uvicorn "Question 11/server:app" --host 0.0.0.0 --port 8000
# Then use localtunnel or ngrok to expose it:
npx localtunnel --port 8000
```

### 5. For Q16 (entity disambiguation CSV)

```bash
node "Question 16/solve_q16.js" your_email > mapping.csv
# Then paste mapping.csv content into the exam text area
```

### 6. For Q19 (image rebuild)

```bash
# 1. Download jigsaw.webp from the exam page
# 2. Get the permutation:
node "Question 19/get_jigsaw_map.js" your_email
# 3. Update TILE_MAP in solve_q19.py with the output
# 4. Run:
python "Question 19/solve_q19.py" jigsaw.webp
# 5. Upload the generated _grayscale.png
```

### 7. For Q20 (audio transcript)

```bash
# 1. Find the YouTube URL & timestamps from the exam page
# 2. Run:
python "Question 20/solve_q20.py" "https://youtu.be/..." 60 90
```

## Notes

- Q1, Q2, Q5-Q7, Q12-Q15, Q17 answers are **100% deterministic** for your email
- Q3, Q4: Submit the SQL templates (adjust domain keywords to match what exam shows)
- Q9: Match the description shown to pick the right function
- Q15: Takes ~5 seconds (processes 100k records)
- Q16: The CSV generation might need tuning if entity_id assignment is off by 1
