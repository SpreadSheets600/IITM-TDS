# Question 19

## Reconstructed Question
Rebuild a scrambled image grid using a provided permutation, then convert result to grayscale via ITU-R BT.601 luminance formula and upload output image.

## Reasoning
`get_jigsaw_map.js` resolves the tile permutation, and `solve_q19.py` reassembles and grayscale-converts the image.

## Files
- `jigsaw.webp` - scrambled image.
- `get_jigsaw_map.js` - permutation fetcher.
- `solve_q19.py` - reconstruction + grayscale.

## How to run
```bash
node get_jigsaw_map.js 24f2008474@ds.study.iitm.ac.in
python solve_q19.py jigsaw.webp
```
Upload the generated grayscale image file.
