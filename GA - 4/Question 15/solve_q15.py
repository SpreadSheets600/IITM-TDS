"""
Q15 Solver: Recursive Corrupted JSON Fixer
Question ID: q-recursive-corrupted-json-server

Replicates the exact PRNG behavior to compute:
1. The target field name (metric_XXXX)
2. The total sum of valid metric values
3. The SHA-256 hash of the integer sum

Usage: python solve_q15.py <email>
"""
import sys
import math
import hashlib
import struct

def make_alea(seed):
    """Port of alea PRNG from seedrandom library."""
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
    s0 = mash(' '); s1 = mash(' '); s2 = mash(' ')
    s0 -= mash(seed); s0 = s0 if s0 >= 0 else s0 + 1
    s1 -= mash(seed); s1 = s1 if s1 >= 0 else s1 + 1
    s2 -= mash(seed); s2 = s2 if s2 >= 0 else s2 + 1
    
    state = [s0, s1, s2, c]
    
    def next_val():
        t = 2091639 * state[0] + state[3] * 2.3283064365386963e-10
        state[0] = state[1]
        state[1] = state[2]
        state[3] = int(t)
        state[2] = t - state[3]
        return state[2]
    
    return next_val

def solve(email):
    seed = f"{email}#q-recursive-corrupted-json-server"
    n = make_alea(seed)
    
    # Determine target field
    target_field = f"metric_{math.floor(n() * 10000)}"
    print(f"Target field: {target_field}", file=sys.stderr)
    
    # Process 100,000 lines
    total = 0
    n_lines = 100000
    
    for i in range(n_lines):
        is_corrupt = n() < 0.2    # 1 call
        is_exception = n() < 0.1  # 1 call
        h = math.floor(n() * 1000)  # 1 call: metric value
        n()  # 1 call: line number (for exception text)
        
        if is_exception:
            continue
        if not is_corrupt:
            total += h
        else:
            n()  # corruption type (1 more call for corrupt lines)
    
    # SHA-256 of the integer sum (no newlines)
    hash_input = str(total).encode('utf-8')
    sha256_hash = hashlib.sha256(hash_input).hexdigest()
    
    print(f"Target field: {target_field}")
    print(f"Total sum: {total}")
    print(f"\nANSWER (SHA-256 hash to submit):")
    print(sha256_hash)
    
    return sha256_hash

if __name__ == '__main__':
    if len(sys.argv) < 2:
        print("Usage: python solve_q15.py <email>")
        sys.exit(1)
    solve(sys.argv[1])
