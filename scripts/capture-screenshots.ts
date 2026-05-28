import { chromium } from '@playwright/test';
import path from 'path';
import fs from 'fs';

const SCREENSHOTS_DIR = path.join(process.cwd(), 'docs/screenshots');
const BASE_URL = 'http://localhost:3000';

const shots = [
  {
    name: '01-dashboard-overview',
    description: 'Full dashboard on load — dark map, HUD panels visible',
    url: '/',
    fullPage: true,
    viewport: { width: 1920, height: 1080 },
  },
  {
    name: '02-flight-layer-active',
    description: 'Flight tracking layer enabled — global aircraft positions',
    url: '/',
    fullPage: false,
    viewport: { width: 1920, height: 1080 },
    actions: async (page: any) => {
      // Activate flight layer via keyboard shortcut
      await page.keyboard.press('f');
      await page.waitForTimeout(3000);
    },
  },
  {
    name: '03-earthquake-layer-active',
    description: 'Seismic activity layer — global M2.5+ earthquake markers',
    url: '/',
    fullPage: false,
    viewport: { width: 1920, height: 1080 },
    actions: async (page: any) => {
      await page.keyboard.press('e');
      await page.waitForTimeout(3000);
    },
  },
  {
    name: '04-mobile-responsive',
    description: 'Mobile viewport — responsive layout verification',
    url: '/',
    fullPage: true,
    viewport: { width: 390, height: 844 },
  },
  {
    name: '05-hud-panel-detail',
    description: 'HUD panel close-up — layer controls and entity counts',
    url: '/',
    fullPage: false,
    viewport: { width: 1440, height: 900 },
  },
];

async function captureScreenshots() {
  console.log('🚀 Starting ApexOS screenshot capture...');
  fs.mkdirSync(SCREENSHOTS_DIR, { recursive: true });

  const browser = await chromium.launch({ headless: true });

  for (const shot of shots) {
    const context = await browser.newContext({
      viewport: shot.viewport,
    });
    const page = await context.newPage();

    console.log(`📸 Capturing: ${shot.name}`);
    await page.goto(`${BASE_URL}${shot.url}`, {
      waitUntil: 'domcontentloaded',
      timeout: 30000,
    });

    // Wait for map and data to render
    await page.waitForTimeout(5000);

    if (shot.actions) {
      await shot.actions(page);
    }

    const screenshotPath = path.join(SCREENSHOTS_DIR, `${shot.name}.png`);
    await page.screenshot({
      path: screenshotPath,
      fullPage: shot.fullPage,
    });

    console.log(`   ✅ Saved: docs/screenshots/${shot.name}.png`);
    await context.close();
  }

  await browser.close();
  console.log('\n✅ All screenshots captured successfully.');
  console.log(`📁 Location: ${SCREENSHOTS_DIR}`);
}

captureScreenshots().catch(console.error);
