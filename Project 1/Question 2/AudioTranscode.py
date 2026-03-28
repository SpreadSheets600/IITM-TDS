import json
import re

raw = """Six, nine, one, seven, two, nine, zero, six, nine, eight, five, nine, three, four, six, one, three, four, eight, eight, seven, nine, five, eight, one, eight, eight, three, one, four, three, five, zero, three, five, three, zero, eight, seven, zero, eight, three, zero, four, eight, three, four, eight, zero, two, seven, five, eight, six, six, eight, six, seven, six, three, five, three, six, zero, seven, one, four, six, five, nine, two, four, two, zero, four, four, six, eight, two, three, eight, five, six, eight, one, zero, one, eight, three, two, seven, four, four, six, six, eight, eight, seven, three, five, five, three, zero, one, two, four, four, five, eight, five, four, zero, nine, eight, two, eight, seven, four, zero, four, nine, zero, one, seven, two, six, one, nine, two, six, zero, nine, nine, zero, zero, zero, eight, three, six, five, zero, zero, nine, three, four, three, seven, nine, one, eight, zero, four, zero, two, five, eight, five, six, five, eight, zero, seven, five, three,four, zero, six, three, nine, four, three, three, five, eight, one, six, four, five, eight, eight, one, two, four, zero, three, eight, zero, two, seven, nine, nine, nine, nine, zero, three, five, zero, three, four, one, six, nine, eight, six, eight, three, four, nine, eight, five, six, seven, one, five, five, three, seven, five, zero, three, seven, five, two, four, zero, zero, eight, eight, nine, three, nine, one, nine, three, two, two, eight, eight, seven, one, eight, nine, two, six, two, one, one, five, six, three, zero, five, five, two, seven, nine, three, two, seven, zero, seven, eight, six, three, four, zero, zero, seven, four, seven, six, one, four, one, four, eight, five, zero, six, nine, three, eight, four, four, zero, eight, six, two, zero, eight, five, six, six, five, four, eight, eight, five, five, four. """


HASH = "your_hash_code"  # ← paste your hash

WORD_MAP = {
    "zero": "0",
    "one": "1",
    "two": "2",
    "three": "3",
    "four": "4",
    "five": "5",
    "six": "6",
    "seven": "7",
    "eight": "8",
    "nine": "9",
    "oh": "0",
}


def convert(text):
    text = text.lower()
    for word, digit in WORD_MAP.items():
        text = re.sub(rf"\b{word}\b", digit, text)
    return re.sub(r"[^0-9]", "", text)  # strips spaces, dots, newlines, everything


digits = convert(raw)

print(f"Digits ({len(digits)}):\n{digits}")

if len(digits) == 300:
    submission = json.dumps({"number": digits, "hash": HASH}, separators=(",", ":"))
    print("\nSubmission JSON:")
    print(submission)
    with open("Submission.json", "w") as f:
        f.write(submission)
    print("Saved TO Submission.json")
else:
    print(f"\nGot {len(digits)} digits, need 300. Check your raw text.")
