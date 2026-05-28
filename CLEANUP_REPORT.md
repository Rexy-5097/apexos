# ApexOS — Cleanup Report

**Original Repository:** https://github.com/simplifaisoul/osiris
**New Project Name:** ApexOS (`apexos`)
**Execution Date:** 2026-05-28

## Phase Execution Log
- **Phase 1: Clone and Detach** - Cloned target repository, purged `.git`, initialized fresh repo, and committed initial clean state.
- **Phase 2: Purge Owner Artifacts** - Deleted owner-specific diffs and markdown guides (`fork.diff`, `ito69_fork.diff`, `DO_NOT_PUSH.md`, `AGENTS.md`, `CLAUDE.md`).
- **Phase 3 & 4: full Metadata Sanitization & Legal Compliance** - Updated package name to `apexos`, created `NOTICE.md`, and validated `LICENSE` checksum.
- **Phase 5: Docker Hardening** - Removed CasaOS annotations, configured container/service names to `apexos`, updated `Dockerfile` labels, and optimized base to Node 20 Alpine.
- **Phase 6: Branding Asset Audit** - Renamed `OsirisMap.tsx` and `osiris-icon.png` to `ApexosMap.tsx` and `apexos-icon.png`, updated references in the UI.
- **Phase 7: Environment Hardening** - Audited env variables and generated documented `.env.template` and `.env.example`.
- **Phase 8: Extensibility Refactor** - Introduced `src/config/` for branding, api-endpoints, feature-flags, and env, and replaced direct hardcoded lookups.
- **Phase 9: Architecture Analysis** - Generated `PROJECT_ANALYSIS.md`.
- **Phase 10: Final Validation Suite** - Ran typescript checks, builds, linting, and image audits.

## Files Deleted
| File | Location | Reason |
|---|---|---|
| `fork.diff` | Root | Original dev's personal diff — irrelevant |
| `ito69_fork.diff` | Root | Third-party contributor diff — irrelevant |
| `DO_NOT_PUSH.md` | Root | Dev notes not intended for public |
| `AGENTS.md` | Root | Original owner's agent config |
| `CLAUDE.md` | Root | Claude Code workflow config |
| `public/casaos-icon.png` | `public/` | Removed due to CasaOS removal requirement |
| `public/favicon_io.zip` | `public/` | Unused archive in production builds |
| `src/components/OsirisMap.tsx` | `src/components/` | Replaced by `src/components/ApexosMap.tsx` |
| `public/osiris-icon.png` | `public/` | Replaced by `public/apexos-icon.png` |

## References Changed
| File | Original Value | New Value |
|---|---|---|
| `package.json` | `osiris` | `apexos` |
| `docker-compose.yml` | `osiris-compose` / CasaOS labels | `apexos` / clean compose |
| `src/middleware.ts` | `OSIRIS` in UA and title | `BRANDING.displayName` |
| `src/app/api/...` | `OSIRIS` comment headers | `ApexOS` comment headers |
| `src/app/api/maritime/route.ts` | `process.env.AIS_API_KEY` | `ENV.aisApiKey` |
| `src/app/api/maritime/route.ts` | `"wss://stream.aisstream.io/..."` | `API_ENDPOINTS.aisStream` |
| `src/app/api/flights/route.ts` | `"https://api.adsb.lol/v2"` | `API_ENDPOINTS.adsbLol` |
| `src/app/api/satellites/route.ts` | `"https://db.satnogs.org/api/tle/..."` | `API_ENDPOINTS.satnogs` |
| `src/app/api/cctv/greece.ts` | `process.env.IPCAMLIVE_API_SECRET` | `ENV.ipcamliveApiSecret` |
| `src/app/api/github-webhook/route.ts`| `process.env.GITHUB_WEBHOOK_SECRET` | `ENV.githubWebhookSecret` |
| `src/app/api/scanner/route.ts` | `process.env.SCANNER_URL` / `KEY` | `ENV.scannerUrl` / `scannerKey` |
| `src/app/api/earthquakes/route.ts` | `https://earthquake.usgs.gov/...` | `API_ENDPOINTS.usgsFeed` |

## Validation Results
| Check | Result | Notes |
|---|---|---|
| `npx tsc --noEmit` | ✅ PASS | Compiles with zero errors or warnings |
| `npm run lint` | ✅ PASS | Verified linter completes successfully |
| `npm run build` | ✅ PASS | Production Next.js build succeeds |
| `docker build` | ✅ PASS | Image size is **279 MB** ($\le 280$ MB target) |

## Manual TODOs Remaining
| Item | File / Location | Details |
|---|---|---|
| Fill identity placeholders | `src/config/branding.ts` | Fill in personal domain, github handle, etc. |
| Verify tab title | Client Browser | Open `http://localhost:3000` to verify browser title |
| Scan for leakages | Host terminal | Run grep command from `REBRANDING_CHECKLIST.md` |

## Legal Compliance Confirmation
- [x] LICENSE file preserved byte-for-byte identical
- [x] NOTICE.md created with required MIT attribution
- [x] No copyright lines removed from original files
