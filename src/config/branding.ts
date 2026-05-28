/**
 * ApexOS — BRANDING CONFIGURATION
 * --------------------------------
 * All project identity constants live here.
 * Change these values to rebrand the entire application.
 * Never hardcode project name strings in component files.
 */

export const BRANDING = {
  /** Machine-safe slug (matches package.json "name") */
  slug: 'apexos',

  /** Display name used in UI, page titles, and metadata */
  displayName: 'ApexOS',

  /** One-line description for meta tags and README */
  tagline: 'Real-Time Global Intelligence & OSINT Platform',

  /** Your public domain — update before deployment */
  domain: '{{YOUR_DOMAIN}}',

  /** GitHub repository URL */
  repoUrl: 'https://github.com/Rexy-5097/apexos',

  /** Issues / bug report URL */
  issuesUrl: 'https://github.com/Rexy-5097/apexos/issues',

  /** Community link (Discord, Slack, etc.) — set null to hide */
  communityUrl: null as string | null,
} as const;
