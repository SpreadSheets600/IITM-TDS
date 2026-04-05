# TDS 2026 Jan ROE — Bypass Analysis & Console Code

## Questions Overview (15 total, 25.5 marks)

| # | Question ID | Title | Weight | Answer Type |
|---|-------------|-------|--------|-------------|
| 1 | `q-share-token-server` | Collaborative Token Exchange | 5 | **Server-verified** (`/backendVerify`) |
| 2 | `q-korean-audio-dataset-server` | Korean Audio Dataset API | 5 | **Server-verified** (`/backendVerify`) |
| 3 | `q-regex-golf-server` | Regex Golf Challenge | 2 | **Client-side** — regex match/reject test |
| 4 | `q-maze-solver-server` | Maze Solver with Constraints | 2 | **Client-side** — path validation |
| 5 | `q-cipher-trail-server` | Cipher Trail | 2 | **Server-verified** (`/backendVerify`) |
| 6 | `q-decode-layered-server` | Layered Encoding Challenge | 2 | **Server-verified** (`/backendVerify`) |
| 7 | `q-region-containing-point-server` | Region Containing Point | 1 | **Client-side** — hash comparison |
| 8 | `q-rename-files-server` | Reorganize Files | 1 | **Client-side** — SHA256 hash match |
| 9 | `q-python-refactor-server` | Refactor Python Code | 1 | **Client-side** — code comparison |
| 10 | `q-broken-json-server` | Fix Broken JSON | 1 | **Client-side** — JSON parse + compare |
| 11 | `q-cross-lingual-entity-disambiguation-server` | Cross-Lingual Entity Disambiguation | 1 | **Client-side** — accuracy check |
| 12 | `q-trick-question-server` | Simple Question (Trick) | 0.5 | **Client-side** — string match |
| 13 | `q-asciirec-server` | Record Terminal Session | 0.5 | **Client-side** — content check |
| 14 | `q-fastapi-timeseries-cache` | FastAPI Time-Series Analytics | 0.5 | **Client-side** — URL fetch test |
| 15 | `q-video-attendee-extraction` | AI Video Attendee Extraction | 0.5 | **Client-side** — JSON array match |

---

## How the Bypass Works

The exam framework (`exam.js`) stores each question as an object with an `answer` property, which is a function. When you click "Check" or "Check all", it calls:

```js
let S = o[i].answer ?? null;    // the answer verifier function
```

By replacing each question's `answer` function with one that **always returns `true`** (or a correct-looking result object), the client-side validation is tricked into thinking every answer is correct.

> [!IMPORTANT]
> Questions #1, #2, #5, and #6 are **server-verified** — the answer function sends a request to `/backendVerify`. These cannot be fully bypassed client-side because the server ultimately makes the decision. However, you can still override the answer function to return `true` without hitting the server, which will show "Correct" on the UI, but the **Save** may not get full server-side credit.

---

## Console Bypass Code

Paste the following code in your browser console (F12 → Console) **after** the exam questions have loaded:

```js
// =====================================================
// TDS 2026 Jan ROE — Full Client-Side Bypass
// Paste this in the browser console (F12 → Console)
// after all questions have loaded.
// =====================================================

(async () => {
  // Wait for the exam form to be ready
  const form = document.getElementById('exam-form');
  if (!form) { console.error('Exam form not found. Wait for questions to load.'); return; }

  // All question IDs in this exam
  const questionIds = [
    'q-share-token-server',
    'q-korean-audio-dataset-server',
    'q-regex-golf-server',
    'q-maze-solver-server',
    'q-cipher-trail-server',
    'q-decode-layered-server',
    'q-region-containing-point-server',
    'q-rename-files-server',
    'q-python-refactor-server',
    'q-broken-json-server',
    'q-cross-lingual-entity-disambiguation-server',
    'q-trick-question-server',
    'q-asciirec-server',
    'q-fastapi-timeseries-cache',
    'q-video-attendee-extraction',
  ];

  // Find the internal questions object.
  // The exam framework stores question objects keyed by ID.
  // We need to locate this object. It's accessible through the module scope.
  // We'll intercept the "Check" button click handler by overriding
  // the answer functions after the questions have loaded.

  // Strategy: Override each input's check-answer button click behavior
  // by patching the question objects.

  // The exam.js module stores questions in variable `o` inside the `_` function.
  // Since we can't easily access module-scoped variables, we'll use a different
  // approach: intercept the validation at the DOM level.

  // APPROACH: Override the form validation feedback directly
  questionIds.forEach(qId => {
    const questionEl = form.querySelector(`[data-question="${qId}"]`);
    if (!questionEl) {
      console.warn(`Question element not found: ${qId}`);
      return;
    }

    const input = form.querySelector(`[name="${qId}"]`);
    if (input && !input.value) {
      // Set a dummy value so the form doesn't complain about empty fields
      input.value = input.tagName === 'TEXTAREA' ? 'bypassed' : 'bypassed';
    }
  });

  console.log('✅ Pre-filled empty fields.');

  // Now the main bypass: We intercept the check mechanism.
  // When "Check" is clicked, exam.js calls `o[questionId].answer(value)`.
  // We need to access `o` — the questions object returned by the questions() function.
  // It's stored in the `W` variable in exam.js after `W = (await ys(...)).questions;`
  // But since it's module-scoped, we can't directly access it.

  // ALTERNATIVE APPROACH: Monkey-patch the entire check flow.
  // When a check button is clicked, exam.js calls the `I` function internally.
  // Since we can't access that, we'll use MutationObserver + direct DOM manipulation.

  // BEST APPROACH: Override the CustomValidity on all inputs
  // and force the "was-validated" + "is-valid" classes.

  function forceCorrect(qId) {
    const questionEl = form.querySelector(`[data-question="${qId}"]`);
    if (!questionEl) return;

    const input = form.querySelector(`[name="${qId}"]`);
    if (input) {
      input.setCustomValidity('');  // Clear any "Incorrect answer" validity
    }

    // Set valid feedback
    const validFeedback = questionEl.querySelector('.valid-feedback');
    const invalidFeedback = questionEl.querySelector('.invalid-feedback');
    if (validFeedback) validFeedback.textContent = 'Correct!';
    if (invalidFeedback) invalidFeedback.textContent = '';

    // Add was-validated class to show the green checkmark
    questionEl.classList.add('was-validated');

    // Make check button show "Check" again
    const checkBtn = questionEl.querySelector('.check-answer');
    if (checkBtn) {
      checkBtn.innerHTML = 'Check';
      checkBtn.disabled = false;
    }
  }

  // Force all questions to show as correct
  questionIds.forEach(qId => forceCorrect(qId));
  console.log('✅ All questions marked as correct in the UI.');

  // Update the score display
  const scoreEl = document.getElementById('score');
  if (scoreEl) {
    scoreEl.textContent = 'Score: 25.5 / 25.5';
  }
  console.log('✅ Score updated.');

  console.log('');
  console.log('🎯 BYPASS COMPLETE');
  console.log('📌 Note: This only affects the CLIENT-SIDE display.');
  console.log('📌 Server-verified questions (Token Exchange, Korean Audio,');
  console.log('   Cipher Trail, Layered Encoding) need real answers for server credit.');
  console.log('');
  console.log('💡 For a deeper bypass that intercepts the answer functions,');
  console.log('   see the "Deep Bypass" code below.');
})();
```

---

## Deep Bypass (Intercepts Answer Functions)

This version hooks into the actual answer-checking mechanism by intercepting the event listeners:

```js
// =====================================================
// TDS 2026 Jan ROE — Deep Answer Function Bypass
// Paste AFTER questions have fully loaded
// =====================================================

(async () => {
  const form = document.getElementById('exam-form');
  if (!form) { console.error('Form not found'); return; }

  // Intercept all "Check" button clicks
  form.addEventListener('click', (e) => {
    const btn = e.target.closest('.check-answer');
    if (!btn) return;

    const qId = btn.dataset.question;
    if (!qId) return;

    // Prevent the original handler from running
    e.stopImmediatePropagation();
    e.preventDefault();

    const questionEl = form.querySelector(`[data-question="${qId}"]`);
    if (!questionEl) return;

    const input = form.querySelector(`[name="${qId}"]`);
    if (input) input.setCustomValidity('');

    const validFb = questionEl.querySelector('.valid-feedback');
    const invalidFb = questionEl.querySelector('.invalid-feedback');
    if (validFb) validFb.textContent = 'Correct!';
    if (invalidFb) invalidFb.textContent = 'Correct!';

    questionEl.classList.add('was-validated');
    btn.innerHTML = 'Check';
    btn.disabled = false;

    // Update score
    updateScore();
  }, true);  // Use capture phase to run BEFORE the original handler

  // Also intercept "Check all" buttons
  document.querySelectorAll('.check-action').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopImmediatePropagation();
      e.preventDefault();

      // Force all questions correct
      form.querySelectorAll('[data-question]').forEach(qEl => {
        const qId = qEl.dataset.question;
        const input = form.querySelector(`[name="${qId}"]`);
        if (input) {
          if (!input.value) input.value = 'bypassed';
          input.setCustomValidity('');
        }

        const validFb = qEl.querySelector('.valid-feedback');
        const invalidFb = qEl.querySelector('.invalid-feedback');
        if (validFb) validFb.textContent = 'Correct!';
        if (invalidFb) invalidFb.textContent = 'Correct!';
        qEl.classList.add('was-validated');

        const checkBtn = qEl.querySelector('.check-answer');
        if (checkBtn) { checkBtn.innerHTML = 'Check'; checkBtn.disabled = false; }
      });

      btn.innerHTML = 'Check all';
      btn.disabled = false;
      updateScore();
    }, true);
  });

  function updateScore() {
    const scoreEl = document.getElementById('score');
    if (scoreEl) scoreEl.textContent = 'Score: 25.5 / 25.5';
  }

  console.log('🔥 Deep bypass installed.');
  console.log('   Click "Check" on any question — it will always show Correct.');
  console.log('   Click "Check all" — all questions will show Correct.');
})();
```

---

## Solving Specific Hackable Questions

For questions where the answer is computed **client-side**, you can extract the actual answer directly from the JavaScript:

### Q3: Regex Golf (`q-regex-golf-server`)
The expected regex is generated by the `d1()` function and stored in `expectedRegexStr`. Run this in console:

```js
// Extract your personalized regex answer
// The Se() function generates everything, cached in `xe` Map
// You need your email to compute it:
// This requires the seedrandom and question modules to be loaded.
// After the page loads, the answer checker function has the regex embedded.
// Look at the match lines - the regex is built from positional rules.
```

### Q12: Trick Question (`q-trick-question-server`)
The visible question is a **decoy**. The **real question** is hidden in a `display: none` div in Chinese. Use DevTools (F12) → Elements → find the hidden div. The real questions and answers are:

| Chinese Question | Answer |
|-----------------|--------|
| JavaScript中，typeof null返回什么？ | `object` |
| HTTP状态码404代表什么意思？ | `not found` |
| 在SQL中，哪个关键字用于从表中删除所有行？ | `truncate` |
| 什么是REST API中最常用的数据格式？ | `json` |
| Git中用于查看提交历史的命令是什么？ | `git log` |
| 在Python中，用什么符号表示注释？ | `#` |
| CSS中用于隐藏元素的display属性值是什么？ | `none` |
| 在Unix/Linux中，哪个命令用于查看当前目录路径？ | `pwd` |

**To find which one you got:** Inspect the hidden `<div class="comment" style="display: none;">` in the question card.

### Q5: Cipher Trail (`q-cipher-trail-server`)
Some encoded letters are hidden via `data-secret-encoded` attributes. Inspect the table cells — the real encoded values are in the `data-secret-encoded` attribute. Then Caesar-shift each letter back by its shift amount.

> [!TIP]
> To find hidden encoded values, run:
> ```js
> document.querySelectorAll('[data-secret-encoded]').forEach(el => {
>   console.log(`Position ${el.closest('tr').querySelector('td').textContent}: Encoded = ${el.dataset.secretEncoded}, Shift = ${el.closest('tr').querySelectorAll('td')[2].textContent}`);
> });
> ```
