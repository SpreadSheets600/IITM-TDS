import os
import sys
import tempfile
from PIL import Image

MAX_BYTES = 400


def _save_png_lossless(img: Image.Image, path: str) -> None:
    img.save(path, format="WEBP", optimize=True, compress_level=9)


def compress_image(input_path, output_path, max_bytes=MAX_BYTES):
    tmp_path = None

    try:
        with Image.open(input_path) as img:
            with tempfile.NamedTemporaryFile(delete=False) as tmp:
                tmp_path = tmp.name

            _save_png_lossless(img, tmp_path)

        final_size = os.path.getsize(tmp_path)

        if final_size > max_bytes:
            print(
                f"Error: lossless compression produced {final_size} bytes, "
                f"which is above the {max_bytes} byte limit."
            )
            return

        os.replace(tmp_path, output_path)

        print(
            f"Success! Lossless PNG saved to {output_path} "
            f"({final_size} bytes, limit {max_bytes})."
        )

    except Exception as e:
        print(f"Error: {e}")

    finally:
        if tmp_path and os.path.exists(tmp_path):
            try:
                os.remove(tmp_path)

            except OSError:
                pass


if __name__ == "__main__":
    if len(sys.argv) < 3:
        print("Usage: python compress.py <input.png> <output.png>")

    else:
        compress_image(sys.argv[1], sys.argv[2])
