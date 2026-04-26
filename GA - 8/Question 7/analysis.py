import math


def analyze_number(value: float) -> dict[str, float]:
    square_root = math.sqrt(value)
    doubled = value * 2
    return {"square_root": square_root, "doubled": doubled}
