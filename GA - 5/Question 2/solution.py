# /// script
# requires-python = ">=3.11"
# dependencies = ["sentence-transformers", "Pillow", "numpy"]
# ///

from pathlib import Path
from zipfile import ZipFile

import numpy as np
from PIL import Image
from sentence_transformers import SentenceTransformer


TEXT_QUERY = "a white lighthouse standing above deep blue ocean waves"


def cosine_similarity(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))


def main() -> None:
    base_dir = Path(__file__).parent
    zip_path = base_dir / "q-multimodal-image-search.zip"

    with ZipFile(zip_path) as zf:
        zf.extractall(base_dir)

    image_paths = sorted(base_dir.glob("img_*.jpg"))
    images = [Image.open(path).convert("RGB") for path in image_paths]

    model = SentenceTransformer("clip-ViT-B-32")
    text_embedding = model.encode([TEXT_QUERY], convert_to_numpy=True)[0]
    image_embeddings = model.encode(images, convert_to_numpy=True)

    scores = [
        cosine_similarity(text_embedding, image_embedding)
        for image_embedding in image_embeddings
    ]
    best_index = int(np.argmax(scores))
    print(image_paths[best_index].name)


if __name__ == "__main__":
    main()
