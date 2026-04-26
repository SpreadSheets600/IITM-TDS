import json
import os
import re
import sys
from typing import Any

try:
    from jsonschema import Draft202012Validator
except Exception:
    Draft202012Validator = None

try:
    from openai import OpenAI
except Exception:
    OpenAI = None

SCHEMA: dict[str, Any] = {
    "type": "object",
    "properties": {
        "rating": {"type": "number", "minimum": 0, "maximum": 5},
        "product": {"type": "string", "minLength": 1},
        "pros": {
            "type": "array",
            "items": {"type": "string", "minLength": 1},
            "minItems": 1,
        },
        "cons": {
            "type": "array",
            "items": {"type": "string", "minLength": 1},
        },
        "recommendation": {"type": "string", "minLength": 1},
    },
    "required": ["rating", "product", "pros"],
    "additionalProperties": False,
}

SYSTEM_PROMPT = (
    "You extract structured review data. Return JSON only. "
    "Rules: rating must be a number from 0 to 5, product must be string, "
    "pros/cons must be arrays of strings, recommendation must be string if present."
)


def parse_rating(raw: str) -> float | None:
    m = re.search(r"(\d+(?:\.\d+)?)\s*/\s*5", raw)
    if m:
        return float(m.group(1))
    m = re.search(r"\b(\d(?:\.\d+)?)\b", raw)
    if m:
        return float(m.group(1))
    return None


def fallback_extract(text: str) -> dict[str, Any]:
    fields: dict[str, Any] = {}

    rating_match = re.search(r"rating\s*:\s*([^\.]+)", text, flags=re.I)
    if rating_match:
        rating = parse_rating(rating_match.group(1))
        if rating is not None:
            fields["rating"] = rating

    product_match = re.search(r"product\s*:\s*([^\.]+)", text, flags=re.I)
    if product_match:
        fields["product"] = product_match.group(1).strip()

    pros_match = re.search(r"pros\s*:\s*([^\.]+)", text, flags=re.I)
    if pros_match:
        fields["pros"] = [
            x.strip() for x in pros_match.group(1).split(",") if x.strip()
        ]

    cons_match = re.search(r"cons\s*:\s*([^\.]+)", text, flags=re.I)
    if cons_match:
        items = [x.strip() for x in cons_match.group(1).split(",") if x.strip()]
        if items:
            fields["cons"] = items

    rec_match = re.search(
        r"recommendation\s*:\s*([^\.]+(?:\.[^\.]+)*)", text, flags=re.I
    )
    if rec_match:
        fields["recommendation"] = rec_match.group(1).strip()

    return fields


def validate_extraction(obj: dict[str, Any]) -> list[str]:
    errors: list[str] = []
    if Draft202012Validator is not None:
        validator = Draft202012Validator(SCHEMA)
        for err in validator.iter_errors(obj):
            loc = ".".join(str(x) for x in err.path) if err.path else "root"
            errors.append(f"{loc}: {err.message}")
    else:
        # Minimal fallback validation if jsonschema package is unavailable.
        for required in SCHEMA["required"]:
            if required not in obj:
                errors.append(f"{required}: is required")

        if "rating" in obj and not isinstance(obj["rating"], (int, float)):
            errors.append("rating: must be a number")
        if "product" in obj and not isinstance(obj["product"], str):
            errors.append("product: must be a string")
        if "pros" in obj and not isinstance(obj["pros"], list):
            errors.append("pros: must be an array")
        if "cons" in obj and not isinstance(obj["cons"], list):
            errors.append("cons: must be an array")
        if "recommendation" in obj and not isinstance(obj["recommendation"], str):
            errors.append("recommendation: must be a string")

    # extra quality checks
    if isinstance(obj.get("product"), str) and not obj["product"].strip():
        errors.append("product: must be non-empty")

    if isinstance(obj.get("pros"), list) and any(
        not str(x).strip() for x in obj["pros"]
    ):
        errors.append("pros: all entries must be non-empty")

    return errors


def llm_extract(text: str, model: str) -> dict[str, Any]:
    if OpenAI is None:
        raise RuntimeError("openai package is not installed")
    token = os.getenv("NVIDIA_API_KEY") or os.getenv("AIPIPE_TOKEN")
    if not token:
        raise RuntimeError("Set NVIDIA_API_KEY or AIPIPE_TOKEN")

    client = OpenAI(base_url="https://integrate.api.nvidia.com/v1", api_key=token)

    user_prompt = (
        "Extract review info from the text and return JSON only with keys: "
        "rating(number 0..5), product(string), pros(array[string]), optional cons(array[string]), "
        "optional recommendation(string).\n"
        f"Text: {text}"
    )

    resp = client.chat.completions.create(
        model=model,
        messages=[
            {"role": "system", "content": SYSTEM_PROMPT},
            {"role": "user", "content": user_prompt},
        ],
        response_format={"type": "json_object"},
        temperature=0,
    )

    content = resp.choices[0].message.content or "{}"
    return json.loads(content)


def confidence_score(errors: list[str], extracted: dict[str, Any]) -> float:
    if errors:
        return max(0.3, 0.9 - 0.2 * len(errors))
    present_optional = int("cons" in extracted) + int("recommendation" in extracted)
    return min(0.99, 0.9 + 0.04 * present_optional)


def run(text: str, model: str = "meta/llama-3.1-70b-instruct") -> dict[str, Any]:
    retries = 2
    all_errors: list[str] = []
    extracted: dict[str, Any] = {}

    for attempt in range(retries + 1):
        try:
            extracted = llm_extract(text, model=model)
        except Exception as ex:
            extracted = fallback_extract(text)
            all_errors.append(f"llm_call_failed: {ex}")

        errors = validate_extraction(extracted)
        if not errors:
            return {
                "schema": SCHEMA,
                "extracted": extracted,
                "validated": True,
                "confidence": round(confidence_score([], extracted), 2),
                "errors": all_errors,
                "retryCount": attempt,
                "model": model,
            }

        all_errors.extend(errors)

    return {
        "schema": SCHEMA,
        "extracted": extracted,
        "validated": False,
        "confidence": round(confidence_score(all_errors, extracted), 2),
        "errors": all_errors,
        "retryCount": retries,
        "model": model,
    }


if __name__ == "__main__":
    sample = (
        "Rating: 4/5. Product: Laptop X. Pros: Fast, lightweight. "
        "Cons: Battery life. Recommendation: Yes, great for travel"
    )
    text = sys.argv[1] if len(sys.argv) > 1 else sample
    result = run(text)
    print(json.dumps(result, ensure_ascii=False, indent=2))
