# Self-Hosting ApexOS with Docker

ApexOS ships as a self-contained Next.js standalone build. This guide covers running it with Docker / Docker Compose and configuring the optional API keys.

> **TL;DR:** ApexOS runs fully **without any API keys**. All core feeds (aviation, satellites, fires, earthquakes, weather, news, CVEs) use public keyless sources. Keys only matter for the optional RECON scanner backend and for raising rate limits on a few feeds.

---

## 1. Docker Compose (recommended)

```bash
git clone https://github.com/{{YOUR_GITHUB_USERNAME}}/apexos.git
cd apexos

# optional: configure keys / scanner backend
cp .env.template .env        # then edit .env

docker compose up -d
```

Open <http://localhost:3000>.

What the compose file does:

- **`image:` + `build:`** — `image:` points at the registry image; the `build:` block is a fallback. `docker compose up -d` uses the registry image if it's available locally or pullable, otherwise builds from the local `Dockerfile`. Run `docker compose pull` to fetch the latest published image.
- **`env_file: .env`** — if a `.env` file exists its values are injected into the container; if it's missing, ApexOS still starts with the keyless feeds.
- **`ports: ${PORT:-3000}:3000`** — the web UI. The container always listens on 3000; the published **host** port is `PORT` (default `3000`). Set `PORT` in `.env` to remap it, e.g. `PORT=3005` when 3000 is already in use — no need to edit the compose file.
- **`restart: unless-stopped`** — survives reboots.

Common commands:

```bash
docker compose pull             # fetch latest published image
docker compose logs -f          # follow logs
docker compose up -d --build    # rebuild locally after pulling new code
docker compose down             # stop & remove
```

### Pull the prebuilt image

```bash
docker pull {{YOUR_REGISTRY}}/apexos:latest
docker run -d --name apexos \
  -p 3005:3000 --env-file .env --restart unless-stopped \
  {{YOUR_REGISTRY}}/apexos:latest
```

### Plain `docker run`

```bash
docker build -t apexos:latest .
docker run -d --name apexos -p 3000:3000 --env-file .env --restart unless-stopped apexos:latest
```

### Image details

Multi-stage build on `node:22-alpine`, runs as a non-root user (`nextjs`, uid 1001), serves Next.js standalone via `node server.js` on port 3000. Final image is ~220 MB. Build excludes `node_modules`, `.next`, and `.git` via `.dockerignore`.

---

## 2. API keys & data sources

Copy `.env.template` to `.env` and fill in only what you need.

### What the code actually reads today

| Variable | Purpose | Required for |
|----------|---------|--------------|
| `SCANNER_URL` | RECON scanner backend base URL (e.g. `http://scanner:7700`) | RECON toolkit (quick/ssl/headers/rdns/subdomains/tech/whois/geoloc/vuln) |
| `SCANNER_KEY` | Shared secret; **must equal the backend's key** | RECON toolkit |

Without `SCANNER_URL`/`SCANNER_KEY` the RECON endpoints return `503` and the rest of ApexOS works normally. Generate a key with `openssl rand -hex 32`.

### Optional keys (reserved / for higher rate limits)

These are documented for completeness and forward-compatibility. The current data routes use **keyless** public feeds, so these are not consumed yet — set them only if you extend the relevant route or hit rate limits.

| Variable | Service | How to get it (all free) |
|----------|---------|--------------------------|
| `FIRMS_API_KEY` | NASA FIRMS active fires | Enter an email at <https://firms.modaps.eosdis.nasa.gov/api/map_key/> — the `MAP_KEY` is emailed instantly. Limit 5000 req / 10 min. |
| `OPENSKY_CLIENT_ID` / `OPENSKY_CLIENT_SECRET` | OpenSky aviation | Create an account at <https://opensky-network.org/>, open **Account → API client**, create a client and copy id/secret. **OAuth2 only since March 2025** (username/password auth removed). |
| `N2YO_API_KEY` | N2YO satellites | Register at <https://www.n2yo.com/login/register/>, then **Profile → generate API key**. Limit 1000 req / hour; key can't be regenerated. |
| `AIS_API_KEY` | aisstream.io maritime | Sign up at <https://aisstream.io/>, create a key on the **API Keys** page. Used over `wss://stream.aisstream.io/v0/stream`. |

> Keep `.env` out of version control — it is already in `.gitignore`. Only `.env.template` (no secrets) is committed.

### Keyless sources (no configuration needed)

Aviation → `adsb.lol` · Satellites → `celestrak.org` (TLE) · Fires → NASA FIRMS open-data CSV · Earthquakes → USGS · Weather → NASA EONET · Space weather → NOAA SWPC · CVEs → NVD · News → public RSS / HLS streams · CCTV → public traffic-authority feeds.
