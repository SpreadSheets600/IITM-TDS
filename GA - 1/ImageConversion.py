import os
from PIL import Image

input_path = "./original.png"
output_path_webp = "compressed_lossless.png"

img = Image.open(input_path)
img.save(output_path_webp, format="WEBP", lossless=True, quality=100, method=6)

os.path.getsize(output_path_webp)
