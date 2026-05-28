/**
 * ApexOS — EXTERNAL API ENDPOINTS
 * --------------------------------
 * All third-party API URLs are defined here.
 * Never hardcode external URLs in component or route files.
 * Import from this file instead.
 */

export const API_ENDPOINTS = {
  opensky:    'https://opensky-network.org/api',
  usgs:       'https://earthquake.usgs.gov/fdsnws/event/1/query',
  usgsFeed:   'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary',
  nasaFirms:  'https://firms.modaps.eosdis.nasa.gov/api/area/csv',
  nasaEonet:  'https://eonet.gsfc.nasa.gov/api/v3/events',
  noaaSwpc:   'https://services.swpc.noaa.gov',
  nvdCve:     'https://services.nvd.nist.gov/rest/json/cves/2.0',
  n2yo:       'https://api.n2yo.com/rest/v1/satellite',
  aisStream:  'wss://stream.aisstream.io/v0/stream',
  satnogs:    'https://db.satnogs.org/api/tle/?format=json',
  adsbLol:    'https://api.adsb.lol/v2',
} as const;
