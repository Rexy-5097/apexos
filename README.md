<div align="center">

# ⬡ ApexOS

### Real-Time Global Intelligence & OSINT Platform

[![CI](https://github.com/Rexy-5097/apexos/actions/workflows/ci.yml/badge.svg)](https://github.com/Rexy-5097/apexos/actions/workflows/ci.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://github.com/Rexy-5097/apexos/blob/main/LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://typescriptlang.org)
[![Docker](https://img.shields.io/badge/Docker-279MB-2496ED?logo=docker&logoColor=white)](https://github.com/Rexy-5097/apexos/blob/main/Dockerfile)
[![MapLibre GL](https://img.shields.io/badge/MapLibre_GL-GPU_Rendered-396CB2)](https://maplibre.org)

A real-time global intelligence dashboard that aggregates live flight tracking,
seismic activity, CCTV feeds, conflict zones, cyber threats, and 24/7 news
streams into a single GPU-accelerated OSINT interface.

[Live Demo]({{YOUR_DOMAIN}}) · [Report Bug](https://github.com/Rexy-5097/apexos/issues) · [Request Feature](https://github.com/Rexy-5097/apexos/issues)

</div>

---

## Screenshots

| Dashboard Overview | Flight Tracking Layer |
|---|---|
| ![Dashboard](docs/screenshots/01-dashboard-overview.png) | ![Flights](docs/screenshots/02-flight-layer-active.png) |

| Seismic Monitor | Mobile Responsive |
|---|---|
| ![Earthquakes](docs/screenshots/03-earthquake-layer-active.png) | ![Mobile](docs/screenshots/04-mobile-responsive.png) |

---

## Architecture

```mermaid
graph TB
    subgraph CLIENT["CLIENT — Browser (WebGL)"]
        ML[MapLibre GL / WebGL]
        HUD[HUD Layer Controls]
        RECON[RECON Toolkit]
    end
    subgraph SERVER["NEXT.JS 16 — API Routes"]
        ROUTES["/api/flights · /api/earthquakes · /api/cctv · /api/fires · /api/satellites<br/>/api/weather · /api/news · /api/scanner"]
        CONFIG["src/config/<br/>branding · env · features · endpoints"]
    end
    subgraph SOURCES["EXTERNAL DATA SOURCES"]
        OS["OpenSky · USGS · NASA<br/>NOAA · N2YO · NVD · AIS"]
    end
    CLIENT <-->|fetch / WebSocket| SERVER
    SERVER --> SOURCES
```

---

## Intelligence Layers

| Domain | Data Points | Source | Key Required |
|---|---|---|---|
| ✈️ Aviation | Commercial, private, military | OpenSky Network | Optional |
| 🌊 Maritime | 39 ports, 10 chokepoints | AISStream | Optional |
| 📹 CCTV | 2,000+ cameras | TfL, WSDOT, Caltrans, NYC DOT | No |
| 🌋 Seismic | Real-time M2.5+ global | USGS FDSN | No |
| 🔥 Fires | Active hotspots worldwide | NASA FIRMS | Optional |
| 📡 Satellites | Live orbital positions | N2YO | Optional |
| 🌩️ Weather | Severe global events | NASA EONET | No |
| ☀️ Space | Solar weather, CME alerts | NOAA SWPC | No |
| 🔓 Cyber | CVE threats, NVD feed | NIST NVD | No |
| ⚔️ Conflict | 13 active zones | Static OSINT | No |
| 📰 News | 25+ 24/7 live streams | Global broadcasters | No |

---

## RECON Toolkit

ApexOS includes a built-in active reconnaissance suite:

- **Port Scanner** — TCP connect scan with service fingerprinting
- **DNS Lookup** — Full record resolution (A, AAAA, MX, NS, TXT, CNAME)
- **WHOIS** — Domain and IP registration intelligence
- **SSL/TLS Inspector** — Certificate chain and expiry analysis
- **IP Intelligence** — Geolocation, ASN, and threat reputation
- **Vulnerability Scanner** — CVE correlation against NVD database

> The RECON toolkit requires a self-hosted scanner backend.
> Set `SCANNER_URL` and `SCANNER_KEY` in `.env` to activate.

---

## Quick Start

```bash
git clone https://github.com/Rexy-5097/apexos.git
cd apexos
cp .env.template .env
npm install
npm run dev
```

Open http://localhost:3000

---

## Docker

```bash
git clone https://github.com/Rexy-5097/apexos.git
cd apexos
cp .env.template .env
docker compose up -d
```

Open http://localhost:3000

Image: `node:20-alpine` multi-stage build · 279 MB · non-root UID 1001

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `PORT` | No | Host port mapping (default: 3000) |
| `SCANNER_URL` | RECON only | Scanner backend URL |
| `SCANNER_KEY` | RECON only | Shared secret (`openssl rand -hex 32`) |
| `OPENSKY_CLIENT_ID` | Optional | Higher flight data rate limits |
| `OPENSKY_CLIENT_SECRET` | Optional | Higher flight data rate limits |
| `FIRMS_API_KEY` | Optional | NASA fire hotspot data |
| `N2YO_API_KEY` | Optional | Live satellite tracking |
| `AIS_API_KEY` | Optional | Live maritime vessel tracking |

All layers except RECON function without any keys.

---

## Keyboard Shortcuts

| Key | Action |
|---|---|
| `F` | Toggle flight layer |
| `E` | Toggle earthquake layer |
| `S` | Toggle satellite layer |
| `D` | Toggle day/night cycle |
| `Esc` | Close active panel |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript 5 |
| Map Engine | MapLibre GL JS (WebGL / GPU) |
| Animations | Framer Motion |
| Styling | Custom CSS Design System |
| Container | Docker (node:20-alpine, 279 MB) |
| CI | GitHub Actions |
| Deployment | Vercel Edge / Docker |

---

## Project Structure

```
apexos/
├── src/
│   ├── app/                  # Next.js App Router pages & API routes
│   │   └── api/              # Server-side data proxy routes
│   ├── components/           # React UI components
│   ├── config/               # Centralised configuration
│   │   ├── branding.ts       # Project identity constants
│   │   ├── api-endpoints.ts  # All external API URLs
│   │   ├── env.ts            # Typed environment variables
│   │   └── feature-flags.ts  # Layer and feature toggles
│   └── lib/                  # Shared utilities
├── public/                   # Static assets
├── docs/
│   ├── architecture/         # System design documents & diagrams
│   └── screenshots/          # Automated UI proof screenshots
├── .github/
│   ├── workflows/ci.yml      # GitHub Actions CI pipeline
│   └── ISSUE_TEMPLATE/       # Bug report & feature request templates
├── Dockerfile                # Multi-stage production build
├── docker-compose.yml        # Local orchestration
└── .env.template             # Environment variable reference
```

---

## Security

ApexOS proxies all external API requests server-side — no API keys are
ever exposed to the browser. The RECON toolkit endpoints are protected by
a shared secret and should be rate-limited before public deployment.

See [docs/architecture/SECURITY_MODEL.md](docs/architecture/SECURITY_MODEL.md)
for the full security model.

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/your-feature`
3. Commit using conventional commits: `git commit -m "feat: add X layer"`
4. Open a Pull Request against `main`

See [.github/PULL_REQUEST_TEMPLATE.md](.github/PULL_REQUEST_TEMPLATE.md)
for the PR checklist.

---

## License

MIT — see [LICENSE](LICENSE) for details.

This project is a derivative work. See [NOTICE.md](NOTICE.md) for full
attribution.

---

<div align="center">
Built by <a href="https://github.com/Rexy-5097">Soumyadeb Tripathy</a>
</div>
