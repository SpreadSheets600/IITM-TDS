# Question 16

## Reconstructed Question
Build a cross-lingual entity disambiguation service and/or produce a mapping CSV for mentions that refer to the same entity across languages.

## Reasoning
The solver prepares deterministic mapping output based on the quiz’s seeded instance.

## Files
- `q-cross-lingual-entity-disambiguation-server.zip` - challenge package.
- `solve_q16.js` - mapping generator.

## How to run
```bash
node solve_q16.js 24f2008474@ds.study.iitm.ac.in > mapping.csv
```
Submit CSV content as required by the quiz.
