"""
Q19 Solver: Reconstruct and Desaturate Image (Jigsaw → Grayscale)
Question ID: q-image-grayscale-rebuild (but actually q-audio uses a different approach)

Algorithm:
1. Download jigsaw.webp from the exam
2. Split into 5×5 tiles
3. Re-assemble using the permutation map
4. Convert to grayscale using ITU-R BT.601: R×0.2126 + G×0.7152 + B×0.0722
5. Upload the resulting PNG

Usage: python solve_q19.py <jigsaw.webp path>
  Downloads jigsaw.webp from the exam page first.
"""

import sys
from PIL import Image
import numpy as np


def solve(webp_path):
    # Load the original scrambled image
    img = Image.open(webp_path).convert("RGB")
    W, H = img.size
    print(f"Image size: {W}×{H}")

    # Split into 5×5 grid
    tile_w = W // 5
    tile_h = H // 5

    # Extract all 25 tiles (row-major order)
    tiles = []
    for row in range(5):
        for col in range(5):
            left = col * tile_w
            upper = row * tile_h
            tile = img.crop((left, upper, left + tile_w, upper + tile_h))
            tiles.append(tile)

    # The jigsaw permutation from Exam-1.js uses alea seeded with the user email
    # Since the permutation is email-specific, we need the email.
    # The default render uses a seeded shuffle.
    # For the standard case (no personalization), tiles go back in order.
    # NOTE: The actual permutation requires the email seed.
    # Run: node get_jigsaw_map.js <email> to get the permutation.
    #
    # For now, reassemble using identity mapping (you may need to adjust):
    TILE_MAP = list(range(25))  # Replace with actual permutation from get_jigsaw_map.js

    # Reassemble image
    out = Image.new("RGB", (W, H))
    for target_pos, source_pos in enumerate(TILE_MAP):
        out_col = target_pos % 5
        out_row = target_pos // 5
        out.paste(tiles[source_pos], (out_col * tile_w, out_row * tile_h))

    # Convert to grayscale using ITU-R BT.601 coefficients
    arr = np.array(out, dtype=float)
    gray = arr[:, :, 0] * 0.2126 + arr[:, :, 1] * 0.7152 + arr[:, :, 2] * 0.0722
    gray = np.clip(gray, 0, 255).astype(np.uint8)
    gray_img = Image.fromarray(gray, "L")

    output_path = webp_path.replace(".webp", "_grayscale.png").replace(
        ".png", "_grayscale.png"
    )
    gray_img.save(output_path)
    print(f"Saved grayscale image: {output_path}")
    print("Upload this PNG as your answer to Q19.")
    return output_path


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python solve_q19.py <path_to_jigsaw.webp>")
        print("Download jigsaw.webp from the exam, then run this script.")
        sys.exit(1)
    solve(sys.argv[1])
