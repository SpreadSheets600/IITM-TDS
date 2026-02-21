# Question 1: Dynamic Image Compression

## Problem
The task assigns an image of 500x500 pixels dynamically generated with 3 squares. You need to download it and compress it **losslessly** to under 400 bytes.

## Solution

The script uses Python's `Pillow` library to convert the image to an **indexed color palette**. Because the image actually only consists of a handful of distinct colors (from the squares overlapping with white), storing a color palette with 8-bit pixels allows the PNG `deflate` compressor to pack the 500x500 pixels into just a couple hundred bytes without any loss in quality.

## How to use

1. Install dependencies:
   ```bash
   pip install Pillow
   ```
2. Download your question image and save it as `input.png` in this folder.
3. Run the script:
   ```bash
   python compress.py input.png output.png
   ```
4. Upload `output.png` to the exam portal. You can verify its size is under 400 bytes (`ls -lh output.png`).
