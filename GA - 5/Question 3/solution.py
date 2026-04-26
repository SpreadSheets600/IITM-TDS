# /// script
# requires-python = ">=3.11"
# dependencies = ["openai", "pandas"]
# ///

import json
from collections import Counter

import pandas as pd
from openai import OpenAI


VALID_LABELS = ["Politics", "Sports", "Technology", "Business", "Entertainment"]
BATCH_SIZE = 10

client = OpenAI(
    api_key="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",
    base_url="https://integrate.api.nvidia.com/v1",
)


def classify_batch(headlines: list[str]) -> list[str]:
    prompt_lines = [f"{i + 1}. {headline}" for i, headline in enumerate(headlines)]
    prompt = (
        "Classify each news headline into exactly one of these labels only: "
        "Politics, Sports, Technology, Business, Entertainment.\n"
        "Return ONLY a JSON array of labels in the same order as the headlines.\n"
        "No explanation.\n\n"
        "Rules:\n"
        "- Politics: government, legislation, elections, diplomacy\n"
        "- Sports: games, tournaments, athletes, records\n"
        "- Technology: software, hardware, AI, cybersecurity, research\n"
        "- Business: earnings, markets, corporate news, economics\n"
        "- Entertainment: movies, music, TV, celebrity, awards\n\n"
        "Tie-breakers:\n"
        "- If a headline is about funding, IPOs, revenue, profit, losses, layoffs, acquisitions, orders, settlements, contracts, prices, valuations, or market/economic trends, label it Business even if the company is in tech.\n"
        "- If a headline is about a product launch, model release, software feature, hardware capability, AI system, cybersecurity incident, scientific computing result, chip architecture, protocol, standard, browser/database/runtime feature, or technical research breakthrough, label it Technology.\n"
        "- Government regulation, hearings, sanctions, election rules, and official strategies are Politics even when they mention AI or cybersecurity.\n"
        "- Streaming prices, box office, music labels, tours, TV ratings, celebrities, and awards are Entertainment unless the headline is clearly about corporate finance rather than content/media.\n\n"
        "Headlines:\n" + "\n".join(prompt_lines)
    )

    resp = client.chat.completions.create(
        model="meta/llama-3.1-70b-instruct",
        temperature=0,
        messages=[{"role": "user", "content": prompt}],
    )
    content = resp.choices[0].message.content.strip()
    labels = json.loads(content)

    if len(labels) != len(headlines):
        raise ValueError(f"Expected {len(headlines)} labels, got {len(labels)}")
    if any(label not in VALID_LABELS for label in labels):
        raise ValueError(f"Invalid labels returned: {labels}")

    return labels


def main() -> None:
    df = pd.read_csv("q-topic-modeling-llm.csv")
    topics: list[str] = []

    for start in range(0, len(df), BATCH_SIZE):
        batch = df["headline"].iloc[start : start + BATCH_SIZE].tolist()
        topics.extend(classify_batch(batch))

    df["topic"] = topics
    counts = Counter(df["topic"])
    print(counts["Technology"])


if __name__ == "__main__":
    main()
