# ApexOS — External API Integration Map

| Layer | API Provider | Endpoint Base | Auth Method | Key Required | TTL / Poll |
|---|---|---|---|---|---|
| Flights | OpenSky Network | `https://opensky-network.org/api` | OAuth2 (since Mar 2025) | Optional | 15 min |
| Earthquakes | USGS FDSN | `https://earthquake.usgs.gov/fdsnws/event/1/query` | None | No | 5 min |
| Active Fires | NASA FIRMS | `https://firms.modaps.eosdis.nasa.gov/api/area/csv` | API Key | Optional | 30 min |
| Weather Events | NASA EONET | `https://eonet.gsfc.nasa.gov/api/v3/events` | None | No | 30 min |
| Space Weather | NOAA SWPC | `https://services.swpc.noaa.gov` | None | No | 30 min |
| Satellites | N2YO | `https://api.n2yo.com/rest/v1/satellite` | API Key | Optional | 30 min |
| CVE / Cyber | NVD NIST | `https://services.nvd.nist.gov/rest/json/cves/2.0` | None | No | 60 min |
| Maritime | AISStream | `wss://stream.aisstream.io/v0/stream` | API Key | Optional | Live |
| CCTV | TfL / WSDOT / Caltrans | Various public endpoints | None | No | Static |
| News | RSS / YouTube Live | Various broadcaster feeds | None | No | Static |
| RECON Scanner | Self-hosted backend | `SCANNER_URL` env var | Shared secret | Required for RECON | On-demand |

> All layers except RECON function without any API keys. Keys unlock higher
> rate limits and additional data points.
