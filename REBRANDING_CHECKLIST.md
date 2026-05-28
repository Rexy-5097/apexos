# ApexOS Rebranding & Sanitization Checklist

This checklist tracks the implementation status of all rebranding, sanitization, hardening, and legal compliance tasks required to launch **ApexOS**.

---

## 1. Automated Verification & Code Quality
- [x] **TypeScript Type Check:** Run `npx tsc --noEmit` to ensure zero compilation errors.
- [x] **Next.js Production Build:** Run `npm run build` to verify page prerendering and route bundles.
- [x] **Linter Execution:** Run `npm run lint` to verify coding standards.
- [x] **Docker Image Build:** Verify local container build (`docker build -t apexos .`) compiles a standalone Alpine image.
- [x] **Docker Size Budget:** Enforce final image size limit of $\le 280$ MB (Current: **279 MB**).

---

## 2. Metadata & Identity Sanitization
- [x] Rename npm package to `apexos` in `package.json`.
- [x] Rename references to `osiris` in metadata files (`package.json`, `package-lock.json`, `.dockerignore`, `vercel.json`, `next.config.ts`, `tsconfig.json`).
- [x] Sanitize website configuration metadata (`public/manifest.json`, `public/robots.txt`, `public/sitemap.xml`).
- [x] Purge contributor/development artifacts (`fork.diff`, `ito69_fork.diff`, `DO_NOT_PUSH.md`, `AGENTS.md`, `CLAUDE.md`, `.github/`).

---

## 3. Extensibility Refactoring (Phase 8)
- [x] Create centralized configuration files in `src/config/`:
  - `branding.ts` (Application naming and domain metadata)
  - `api-endpoints.ts` (External third-party API routes)
  - `env.ts` (Strongly-typed environment variables)
  - `feature-flags.ts` (Feature toggle parameters)
- [x] Replace all direct `process.env` lookups with `ENV` imports.
- [x] Replace all hardcoded API endpoint URLs with `API_ENDPOINTS` imports.
- [x] Rebrand UI titles and console logs to import `BRANDING` values.

---

## 4. Legal Compliance
- [x] Verify `LICENSE` remains byte-for-byte identical to the original Osiris MIT license.
- [x] Create `NOTICE.md` in the project root with correct MIT attribution and repository references.

---

## 5. Required Manual Post-Execution Tasks
Before deploying the application to production, you **MUST** perform the following manual configuration steps:

### Task A: Configure Identity Placeholders
Open `src/config/branding.ts` and fill in the four placeholders:
1. `domain` - Replace `{{YOUR_DOMAIN}}` with your production domain (e.g., `apexos.io`).
2. `repoUrl` - Replace `{{YOUR_GITHUB_USERNAME}}` in the repository path.
3. `issuesUrl` - Replace `{{YOUR_GITHUB_USERNAME}}` in the bug report path.

Open `package.json` and fill in:
1. `description` - Replace `{{YOUR_DESCRIPTION}}` with a custom platform summary.
2. `author` - Replace `{{YOUR_NAME}}` and `{{YOUR_EMAIL}}`.
3. `repository.url` - Replace `{{YOUR_GITHUB_USERNAME}}`.

Open `NOTICE.md` and fill in:
1. Replace `{{YOUR_NAME}}` in the attribution line.
2. Replace `{{YOUR_GITHUB_USERNAME}}` in the fork URL.

### Task B: Run the Owner Grep Validation
Run the owner scan one more time to verify that zero reference leakage occurred:
```bash
grep -ri "osiris" . --exclude-dir=node_modules --exclude-dir=.next --exclude="LICENSE" --exclude="NOTICE.md" --exclude="PROJECT_ANALYSIS.md" --exclude="REBRANDING_CHECKLIST.md"
```
Verify that the output is empty.

### Task C: Check the Browser Title
Start the development server:
```bash
npm run dev
```
Open `http://localhost:3000` in the browser and verify the tab title reads **"ApexOS"** rather than the old project name.
