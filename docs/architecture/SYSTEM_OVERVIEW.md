# ApexOS System Architecture Overview

This document provides a detailed technical overview of the system architecture, request flows, lifecycle state machines, and deployment strategies of ApexOS. ApexOS is a high-performance open-source intelligence (OSINT) platform engineered to aggregate, process, and render complex real-time global datasets.

## 1. High-Level System Architecture

The high-level architecture of ApexOS is designed for extreme efficiency and low-latency geospatial rendering. The frontend runs in the client browser, utilizing MapLibre GL for WebGL-accelerated GPU map rendering, which allows smooth visualization of thousands of concurrent entities (flights, satellites, weather events) without blocking the main DOM thread. A HUD panel controls the individual layer states and orchestrates active OSINT sweeps via the RECON toolkit, while Framer Motion coordinates UI transitions. The application backend is built on Next.js 16 (using the App Router and Turbopack), which acts as a secure, typed proxy for external services. It exposes dedicated API routes for each data layer, protecting API credentials and sanitizing client payloads. At the infrastructure level, the system can run as an Edge-rendered serverless deployment on Vercel or packaged into a hardened, minimal Docker container utilizing node:20-alpine to ensure zero host-level dependency leaks.

```mermaid
graph TB
    subgraph CLIENT["CLIENT — Browser (WebGL)"]
        ML[MapLibre GL<br/>WebGL Renderer]
        HUD[HUD Panels<br/>Layer Controls]
        RECON[RECON Toolkit<br/>Port · DNS · WHOIS · SSL]
        FM[Framer Motion<br/>Animation Layer]
    end

    subgraph NEXTJS["NEXT.JS 16 — App Router (Vercel Edge / Docker)"]
        direction TB
        API_F["/api/flights"]
        API_E["/api/earthquakes"]
        API_C["/api/cctv"]
        API_FI["/api/fires"]
        API_S["/api/satellites"]
        API_W["/api/weather"]
        API_N["/api/news"]
        API_M["/api/maritime"]
        API_CY["/api/cyber"]
        API_SC["/api/scanner"]
        CFG["src/config/<br/>branding · env · features · endpoints"]
    end

    subgraph EXTERNAL["EXTERNAL DATA SOURCES"]
        OS[OpenSky Network<br/>Flight Tracking]
        USGS[USGS FDSN<br/>Earthquake Feed]
        NASA[NASA FIRMS<br/>Fire Hotspots]
        EONET[NASA EONET<br/>Weather Events]
        NOAA[NOAA SWPC<br/>Space Weather]
        N2YO[N2YO API<br/>Satellites]
        NVD[NVD / NIST<br/>CVE Database]
        AIS[AISStream<br/>Maritime Vessels]
        TFL[TfL · WSDOT · Caltrans<br/>CCTV Networks]
        RSS[25+ RSS Streams<br/>Global News]
    end

    subgraph INFRA["INFRASTRUCTURE"]
        VE[Vercel Edge Network]
        DC[Docker Container<br/>node:20-alpine · 279MB]
    end

    CLIENT <-->|fetch / WebSocket| NEXTJS
    NEXTJS --> EXTERNAL
    NEXTJS --> INFRA
```

## 2. Data Flow: External API → Client Layer

The data lifecycle of ApexOS follows a strict server-side proxy pattern to avoid exposing private third-party credentials (like API keys for OpenSky, NASA, or N2YO) to the client's web browser. When a user activates an intelligence layer, the client browser dispatches a GET request to the corresponding Next.js API route. The server-side route handler intercepts the request and inspects a secure, in-memory or Edge-cached store to determine if a recent cache entry is valid based on pre-configured TTL values (e.g., 5 to 30 minutes, depending on the update frequency of the source). If a cache hit occurs, the cached payload is returned instantly, minimizing remote network latency and protecting API rate limits. If a cache miss occurs, the backend sends a server-side HTTP request to the respective external API provider, normalizes the raw responses into a consistent GeoJSON or JSON structure, writes the sanitized results back to the cache store, and finally transmits the clean payload back to the MapLibre GL layer for hardware-accelerated rendering.

```mermaid
sequenceDiagram
    participant B as Browser (MapLibre)
    participant N as Next.js API Route
    participant C as Cache (in-memory / edge)
    participant E as External API

    B->>N: GET /api/flights (on layer activate)
    N->>C: Check cache (TTL: 15-30 min)
    alt Cache HIT
        C-->>N: Cached payload
    else Cache MISS
        N->>E: Fetch OpenSky / USGS / FIRMS...
        E-->>N: Raw response
        N->>C: Store with TTL
    end
    N-->>B: GeoJSON / Normalised JSON
    B->>B: Render WebGL layer via MapLibre
```

## 3. RECON Toolkit Request Flow

The RECON Toolkit provides an interactive suite for active network reconnaissance and threat intelligence scanning directly within the ApexOS cockpit. When a user requests a scan (such as a port sweep, WHOIS lookup, DNS query, or SSL inspect) against a specific target host or IP, the frontend dispatches a POST request containing the validated target details and the selected scan type to the `/api/scanner` route. The API route handler validates the inputs, applies rate limits, and verifies the request authentication against the environment's configured `SCANNER_KEY`. If the backend scanner configuration is valid, the request is forwarded to the self-hosted scanner service via secure HTTP. The scanner backend performs the active scan against the target and returns a structured JSON payload of results. The Next.js API route formats the results, appends metadata, and relays the payload to the frontend RECON dashboard where results are displayed to the operator. If the environment variables are not correctly configured, a 503 Service Unavailable response is returned.

```mermaid
sequenceDiagram
    participant U as User (RECON Panel)
    participant F as Frontend Component
    participant A as /api/scanner
    participant S as Scanner Backend

    U->>F: Enter target (IP / domain / URL)
    F->>A: POST { target, scanType }
    A->>A: Validate input + rate limit check
    A->>S: Forward request (SCANNER_URL + SCANNER_KEY)
    S-->>A: Scan results JSON
    A-->>F: Structured response { data, meta }
    F-->>U: Render results in RECON panel

    note over A: Returns HTTP 503 if<br/>SCANNER_URL / SCANNER_KEY not set
```

## 4. Docker Deployment Architecture

To support reliable self-hosting and scaling in containerized environments (such as Kubernetes or docker-compose), ApexOS is packaged using a multi-stage Docker build. Stage 1 (`deps`) installs complete developer packages and runs `npm ci` to establish dependencies. Stage 2 (`builder`) copies files and runs `npm run build` to generate Next.js standalone outputs, minimizing production footprints by exporting only the critical modules. Stage 3 (`runner`) copies only the compiled `.next/standalone` folder, the public directory, and the static `.next/static` assets into a lightweight, stripped-down `node:20-alpine` environment. The runtime runs under a dedicated, non-root user UID 1001 (`nextjs`) on port 3000 to maximize security posture. Local environment variables are read from a `.env` file at start time, and port configurations are exposed via standard environment remappings, keeping the final container image size well within the 280MB limit.

```mermaid
graph LR
    subgraph BUILD["Multi-Stage Docker Build"]
        S1[Stage 1<br/>deps<br/>npm ci]
        S2[Stage 2<br/>builder<br/>npm run build]
        S3[Stage 3<br/>runner<br/>node:20-alpine<br/>UID 1001 non-root]
        S1-->S2-->S3
    end

    subgraph RUNTIME["Container Runtime"]
        P3000[Port 3000<br/>internal]
        ENV[.env file<br/>injected at runtime]
        NEXT[Next.js standalone<br/>server.js]
    end

    subgraph HOST["Host Machine"]
        PHOST[PORT env var<br/>default: 3000]
        DC[docker-compose.yml]
    end

    S3 --> RUNTIME
    DC -->|port mapping HOST:CONTAINER| P3000
    ENV --> NEXT
    PHOST --> DC
```

## 5. Feature Layer State Machine

The active state of intelligence layers within the ApexOS client dashboard is managed via a strict state machine that governs UI visibility, data freshness, and rendering routines. At initial application startup, all layers reside in the `Inactive` state. When an operator toggles a layer control switch, the system moves to a `Loading` state and initiates a fetch request to the server-side API proxy. If the network call completes successfully, the layer state transitions to `Active`, rendering the fresh GeoJSON data points directly to the map viewport via MapLibre WebGL. If the network call fails or meets a rate limit block, the state enters `Error` and triggers a background retry routine with exponential backoff. An `Active` layer continuously renders entities on screen at up to 60fps; once the configured TTL (Time-To-Live) cache threshold expires, the layer moves to a `Stale` state, which quietly triggers a background fetch to keep details updated without interrupting the active display. Finally, when the user toggles a layer off, all resources are unmounted and the state returns to `Inactive`.

```mermaid
stateDiagram-v2
    [*] --> Inactive : App load (all layers off)
    Inactive --> Loading : User toggles layer ON
    Loading --> Active : Data fetch success
    Loading --> Error : Fetch failed / rate limited
    Error --> Loading : Retry (exponential backoff)
    Active --> Rendering : MapLibre WebGL draw call
    Rendering --> Active : Frame complete (60fps target)
    Active --> Inactive : User toggles layer OFF
    Active --> Stale : TTL expired (15-30 min)
    Stale --> Loading : Background refresh triggered
```
