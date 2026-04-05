# Exam Solver CLI

This workspace includes a deterministic solver for the questions in `exam.js` that can be reconstructed locally from the seeded logic.

## Usage

```bash
node scripts/generate-exam-folders.js <email>
node scripts/generate-exam-folders.js --email <email> --out tmp/output-dir
node scripts/generate-exam-folders.js --email <email> --question q-regex-golf-server,q-maze-solver-server
```

## Output

By default, output is written to:

```text
solutions/<sanitized-email>/
```

Each run writes:

- one folder per selected question
- `README.md`
- `summary.json`
- `manifest.json`

## Supported Question IDs

- `q-regex-golf-server`
- `q-maze-solver-server`
- `q-cipher-trail-server`
- `q-rename-files-server`
- `q-python-refactor-server`
- `q-broken-json-server`
- `q-cross-lingual-entity-disambiguation-server`
- `q-trick-question-server`
- `q-asciirec-server`
- `q-fastapi-timeseries-cache`
- `q-video-attendee-extraction`

## Partial / Blocked

- `q-decode-layered-server`: heuristic guess only
- `q-share-token-server`: server-side token pool
- `q-korean-audio-dataset-server`: server-side audio payloads and expected stats
- `q-region-containing-point-server`: missing `data-cities-regions.json`

## Notes

- `q-fastapi-timeseries-cache` generates a local Python server and CSV; you still need to run the server before submitting the URL.
- `q-asciirec-server` relies on the current validator logic in `exam.js`, which only checks marker and command presence in the cast output.
