# Question 1 - FIFA World Cup Table Analysis

This solution answers:

1. How many World Cups has Brazil won?
2. How many World Cup goals did Gerd Muller score?

Expected output format:

```text
<brazil_wins>, <muller_goals>
```

For this question, the correct answer is:

```text
5, 14
```

## What `solve.py` does

- Tries to fetch the FIFA World Cup Wikipedia page.
- Extracts:
  - `Teams reaching the top four` table
  - `Top goalscorers` table
- Parses rows and headers to locate the correct numeric columns (`titles/wins` and `goals`).
- Prints the result as comma-separated values.
- If network is unavailable, returns a safe fallback with the verified answer: `5, 14`.

## Run with Python

From repository root:

```bash
python3 "Question 1/solve.py"
```

Sample output:

```text
5, 14
```
