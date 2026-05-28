# ApexOS — Security Model

## Threat Surface

| Surface | Risk Level | Mitigation |
|---|---|---|
| RECON port scanner endpoint | HIGH | Rate limiting + SCANNER_KEY shared secret |
| External API proxying | MEDIUM | Server-side only — keys never exposed to client |
| CCTV iframe embeds | LOW | CSP headers restrict frame sources |
| User input (RECON targets) | HIGH | Input validation + sanitization before forwarding |
| Docker container | LOW | Non-root UID 1001, read-only filesystem where possible |
| Environment secrets | LOW | .env gitignored, template committed only |

## Security Headers (next.config.ts)

| Header | Value |
|---|---|
| `X-Frame-Options` | `DENY` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |

## RECON Toolkit Security Notes

The port scanner and vulnerability scanner endpoints expose sensitive
network reconnaissance capability. Before any public deployment:
- Enforce IP-based rate limiting on `/api/scanner`
- Require SCANNER_KEY validation on every request
- Log all RECON requests with IP, timestamp, and target
- Consider authentication layer if deploying publicly
