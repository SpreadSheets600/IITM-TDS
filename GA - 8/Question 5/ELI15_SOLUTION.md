# Question 5 — ELI15 Step-by-step Solution

## Final answer

```text
0.9825,ff70e0588d4c,129.0
```

## What are we doing?

We are using Docker like a small clean computer.

Inside that Docker image, Python trains a machine-learning model, writes two results, and then the final Docker image only keeps the result file.

That is why this is called a **multi-stage build**:

1. **Builder stage**: install scikit-learn and train the model.
2. **Runtime stage**: keep only `output.txt`, so the final image is smaller.

---

## Step 1: Create `compute.py`

```python
import hashlib
from sklearn.datasets import load_breast_cancer
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.model_selection import train_test_split

# Your unique parameters
n_estimators = 70
random_state = 41
test_size = 0.2

# Load dataset and train
data = load_breast_cancer()
X_train, X_test, y_train, y_test = train_test_split(
    data.data, data.target,
    test_size=test_size,
    random_state=random_state,
)

clf = GradientBoostingClassifier(
    n_estimators=n_estimators,
    random_state=random_state,
)
clf.fit(X_train, y_train)

acc = clf.score(X_test, y_test)
print(f"Accuracy: {acc:.4f}")

# Compute verification hash
verify_input = f"n{n_estimators}:r{random_state}:acc{acc:.6f}"
verify = hashlib.sha256(verify_input.encode()).hexdigest()[:12]
print(f"Verify: {verify}")
```

---

## Step 2: Create `Dockerfile`

```dockerfile
# Stage 1: Build stage
FROM python:3.11-slim AS builder
WORKDIR /app
RUN pip install --no-cache-dir scikit-learn
COPY compute.py .
RUN python compute.py > output.txt

# Stage 2: Minimal runtime
FROM python:3.11-slim
WORKDIR /app
COPY --from=builder /app/output.txt .
CMD ["cat", "output.txt"]
```

---

## Step 3: Build the Docker image

```bash
docker build -t mlops-verify .
```

This trains the model during the build and saves the output to `output.txt`.

---

## Step 4: Run the Docker image

```bash
docker run --rm mlops-verify
```

Expected output:

```text
Accuracy: 0.9825
Verify: ff70e0588d4c
```

---

## Step 5: Check image size

```bash
docker images mlops-verify --format "{{.Size}}"
```

Expected size is about:

```text
129MB
```

---

## What to submit

The assignment wants:

```text
accuracy_4dp,verify_12char,image_size_mb
```

So submit:

```text
0.9825,ff70e0588d4c,129.0
```
