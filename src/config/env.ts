/**
 * ApexOS — TYPED ENVIRONMENT VARIABLES
 * --------------------------------------
 * All process.env access goes through this file.
 * Never call process.env directly in component or route files.
 * This ensures type safety and a single validation surface.
 */

function optionalEnv(key: string, fallback = ''): string {
  return process.env[key] ?? fallback;
}

export const ENV = {
  port:                  optionalEnv('PORT', '3000'),

  // RECON scanner — optional, 503 returned if absent
  scannerUrl:            optionalEnv('SCANNER_URL'),
  scannerKey:            optionalEnv('SCANNER_KEY'),

  // Optional data source keys
  firmsApiKey:           optionalEnv('FIRMS_API_KEY'),
  openskyClientId:       optionalEnv('OPENSKY_CLIENT_ID'),
  openskyClientSecret:   optionalEnv('OPENSKY_CLIENT_SECRET'),
  n2yoApiKey:            optionalEnv('N2YO_API_KEY'),
  aisApiKey:             optionalEnv('AIS_API_KEY'),

  // Platform integrations and webhooks
  umamiWebsiteId:        optionalEnv('UMAMI_WEBSITE_ID', 'cd8f216c-fc3f-45f5-ba1a-e10309a61d18'),
  ipcamliveApiSecret:    optionalEnv('IPCAMLIVE_API_SECRET'),
  githubWebhookSecret:   optionalEnv('GITHUB_WEBHOOK_SECRET'),
} as const;
