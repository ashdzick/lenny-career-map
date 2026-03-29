# Security

## Reporting a vulnerability

If you believe you have found a security vulnerability, please **do not** open a public issue.

Use **GitHub’s [Security advisories](https://docs.github.com/en/code-security/security-advisories)** for this repository (Security → Report a vulnerability), if enabled, or contact the maintainers privately.

Include enough detail to reproduce or understand the impact (steps, affected versions, and severity if you can).

## Scope notes

- **Secrets:** Never commit real API keys, tokens, or `.env` files. Example placeholders in documentation are fine.
- **Generated data:** Large generated corpora (e.g. `data/corpus.json`) are gitignored by design; do not commit full transcript dumps if they are not meant to be public.
