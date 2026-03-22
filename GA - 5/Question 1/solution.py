# /// script
# requires-python = ">=3.11"
# dependencies = [
#   "openai",
#   "numpy",
#   "scikit-learn",
# ]
# ///

from collections import Counter
import os
from pathlib import Path

import numpy as np
from openai import OpenAI
from sklearn.cluster import KMeans


def main() -> None:
    input_path = Path(__file__).with_name("q-embeddings-clustering.txt")
    descriptions = [
        line.strip()
        for line in input_path.read_text(encoding="utf-8").splitlines()
        if line.strip()
    ]

    print(f"Loaded {len(descriptions)} descriptions")

    api_key = os.environ.get("OPENAI_API_KEY") or os.environ.get("NVIDIA_API_KEY")
    if not api_key:
        raise RuntimeError("Set OPENAI_API_KEY or NVIDIA_API_KEY before running this script.")

    client = OpenAI(
        api_key="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",
        base_url="https://integrate.api.nvidia.com/v1"
    )

    response = client.embeddings.create(
        input=descriptions,
        model="nvidia/llama-nemotron-embed-1b-v2",
        encoding_format="float",
        extra_body={"input_type": "passage", "truncate": "NONE"},
    )

    embeddings = np.array([item.embedding for item in response.data])
    print(f"Embedding matrix shape: {embeddings.shape}")

    kmeans = KMeans(n_clusters=5, random_state=42, n_init=10)
    labels = kmeans.fit_predict(embeddings)

    counts = Counter(labels)
    best_label, best_count = counts.most_common(1)[0]

    print(f"Cluster counts: {dict(sorted(counts.items()))}")
    print(f"{best_label}, {best_count}")


if __name__ == "__main__":
    main()
