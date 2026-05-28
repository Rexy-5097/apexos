/**
 * ApexOS — FEATURE FLAGS
 * ----------------------
 * Toggle data layers and toolkit features without code changes.
 * Set to false to disable a feature at build time.
 * Prefix with NEXT_PUBLIC_ env vars for runtime control.
 */

export const FEATURES = {
  // Map data layers
  flights:          true,
  maritime:         true,
  earthquakes:      true,
  fires:            true,
  cctv:             true,
  weather:          true,
  satellites:       true,
  space:            true,
  cyber:            true,
  conflictZones:    true,
  news:             true,

  // RECON toolkit
  portScanner:      true,
  dnsLookup:        true,
  whois:            true,
  sslInspector:     true,
  ipIntelligence:   true,
  vulnScanner:      true,

  // UI features
  dayNightCycle:    true,
  keyboardShortcuts: true,
} as const;
