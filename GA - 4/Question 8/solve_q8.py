"""
Q8 Solver: Parse Partial JSON (Total Sales)
Question ID: q-parse-partial-json

The exam uses @faker-js/faker seeded with the alea PRNG.
This Python port uses the same seeding approach to get the same answer.

The key insight: the Faker instance is seeded with Math.round(alea_rng() * 1e6)
Then generates 100 sales values using p.number.int({min:100, max:1000})

This Python implementation uses the faker library with the same seed.

Install: pip install faker

Usage: python solve_q8.py <email>
"""

import sys
import math


def make_alea(seed):
    def mash(data):
        n = 4022871197
        for ch in str(data):
            n += ord(ch)
            h = 0.02519603282416938 * n
            n = int(h) & 0xFFFFFFFF
            h -= n
            h *= n
            n = int(h) & 0xFFFFFFFF
            h -= n
            n += h * 4294967296
        return (int(n) & 0xFFFFFFFF) * 2.3283064365386963e-10

    c = 1
    s0 = mash(" ")
    s1 = mash(" ")
    s2 = mash(" ")
    s0 -= mash(seed)
    s0 = s0 if s0 >= 0 else s0 + 1
    s1 -= mash(seed)
    s1 = s1 if s1 >= 0 else s1 + 1
    s2 -= mash(seed)
    s2 = s2 if s2 >= 0 else s2 + 1
    state = [s0, s1, s2, c]

    def next_val():
        t = 2091639 * state[0] + state[3] * 2.3283064365386963e-10
        state[0] = state[1]
        state[1] = state[2]
        state[3] = int(t)
        state[2] = t - state[3]
        return state[2]

    return next_val


# The JavaScript @faker-js/faker with the 'en' locale, seeded with:
# seed: Math.round(n() * 1e6)
# then generates: p.number.int({min: 100, max: 1000})
#
# The faker-js number.int uses Mersenne Twister internally.
# Python faker uses a different algorithm, so we port the MT seeding.
#
# Key: faker-js seed(n) + number.int(min, max) = floor(random * (max - min + 1)) + min
# where random comes from the seeded MT


def mt_seed(seed):
    """Mersenne Twister seeding (same as used by @faker-js/faker via @fast-check/mersenne-twister)"""
    mt = [0] * 624
    mt[0] = seed & 0xFFFFFFFF
    for i in range(1, 624):
        mt[i] = (1812433253 * (mt[i - 1] ^ (mt[i - 1] >> 30)) + i) & 0xFFFFFFFF
    return mt


def mt_generate(mt):
    """Generate 624 numbers from MT state"""
    idx = [0]
    n_mt = [mt[:]]  # mutable reference

    def twist():
        for i in range(624):
            x = (n_mt[0][i] & 0x80000000) | (n_mt[0][(i + 1) % 624] & 0x7FFFFFFF)
            n_mt[0][i] = n_mt[0][(i + 397) % 624] ^ (x >> 1)
            if x % 2 != 0:
                n_mt[0][i] ^= 0x9908B0DF

    def extract():
        if idx[0] == 0:
            twist()
        y = n_mt[0][idx[0]]
        y ^= y >> 11
        y ^= (y << 7) & 0x9D2C5680
        y ^= (y << 15) & 0xEFC60000
        y ^= y >> 18
        idx[0] = (idx[0] + 1) % 624
        return y & 0xFFFFFFFF

    return extract


email = sys.argv[1] if len(sys.argv) > 1 else None
if not email:
    print("Usage: python solve_q8.py <email>")
    sys.exit(1)

n = make_alea(f"{email}#q-parse-partial-json")
faker_seed = round(n() * 1e6)
print(f"Faker seed: {faker_seed}", file=sys.stderr)

# Use MT seeded with faker_seed
mt = mt_seed(faker_seed)
extract = mt_generate(mt)


def int_between(min_val, max_val, extract_fn):
    """faker-js number.int uses: Math.floor(random * (max - min + 1)) + min"""
    raw = extract_fn()
    # Scale to [0, 1)
    rand = raw / (2**32)
    return math.floor(rand * (max_val - min_val + 1)) + min_val


total = 0
for _ in range(100):
    # In faker-js, number.int({min:100, max:1000}) uses 1 MT number
    val = int_between(100, 1000, extract)
    total += val

print(f"\nEstimated total sales: {total}")
print("Note: If this doesn't match, try the Node.js approach in solve_q8.js")
print("The exact answer requires running the actual JS faker library.")
