# q-share-token-server

Status: blocked

The actual token comes from `questionData` on the exam server and the score depends on collecting many other students' valid tokens.
Local repo evidence only shows the verifier contract and accepted input formats.

Submit format options:
- one token per line
- comma-separated tokens
- JSON array like `["abc123def4","p9q8r7s6t5"]`
- object form like `{"tokens":["abc123def4"]}`

Blocker: your personal token and the hidden token pool are server-side only.
