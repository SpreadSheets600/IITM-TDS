# q-korean-audio-dataset-server

Status: blocked

The exam bundle only exposes the response contract. The actual four audio samples and their expected per-audio statistics are hidden behind server-side verification.

Required endpoint contract:
- request body: `{"audio_id":"q0","audio_base64":"..."}`
- response JSON must include:
  - rows
  - columns
  - mean
  - std
  - variance
  - min
  - max
  - median
  - mode
  - range
  - allowed_values
  - value_range
  - correlation

Blocker: expected values are not derivable from `exam.js` alone.
