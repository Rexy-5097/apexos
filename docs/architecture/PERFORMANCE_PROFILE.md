# ApexOS — Performance Profile

## WebGL Rendering

| Metric | Value | Notes |
|---|---|---|
| Target frame rate | 60 fps | GPU-rendered via MapLibre GL WebGL |
| Concurrent entities | 1,000+ | Flights, quakes, CCTV markers simultaneously |
| Render path | WebGL (GPU) | Zero DOM manipulation for map elements |
| Layer loading strategy | On-demand | Only fetches data when layer is activated |
| Viewport-aware loading | Yes | Only loads data visible in current viewport |

## API Polling Strategy

| Layer | Poll Interval | Rationale |
|---|---|---|
| Flights | 15 min | OpenSky rate limits; positions interpolated client-side |
| Earthquakes | 5 min | USGS allows frequent polling |
| Fires | 30 min | NASA FIRMS updates hourly |
| Space weather | 30 min | NOAA data refreshes every 15-30 min |
| Satellites | 30 min | Orbital positions are highly predictable |
| News | Static | Embedded stream URLs — no polling required |
| Maritime | Live | WebSocket stream when AIS key is configured |

## Known Bottlenecks

1. **All layers active simultaneously** — WebGL memory pressure increases
   significantly. Consider progressive layer unloading at 8+ active layers.
2. **OpenSky unauthenticated** — anonymous tier limits refresh frequency.
   Providing OAuth2 credentials improves data freshness dramatically.
3. **CCTV iframes** — 2,000+ camera markers are DOM-heavy when panel is
   opened. Virtual rendering should be implemented for the camera list.
4. **RECON scanner** — synchronous TCP connect scans block the API worker.
   Move to a queue-based async architecture for production deployments.
