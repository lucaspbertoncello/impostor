import { mkdir } from 'node:fs/promises';
import { isAbsolute, resolve } from 'node:path';

import type { Page } from 'playwright';

import {
  CAPTURE_TARGETS,
  CAPTURE_VIEWPORTS,
  DEFAULT_BASE_URL,
  type CaptureTarget,
} from '#scripts/captures/capture-targets.constant.ts';
import { launchBrowser } from '#scripts/captures/launch-browser.util.ts';

// `pnpm captures <folder>`: photographs every screen and the gallery, at 375 and 1280 px, against a
// server that is ALREADY running (it starts none). The base URL comes from CAPTURE_BASE_URL.

const SETTLE_MS = 600;
const TOTAL = CAPTURE_TARGETS.length * CAPTURE_VIEWPORTS.length;

async function main(): Promise<void> {
  const folderArgument = process.argv[2];
  if (!folderArgument) throw new Error('Usage: pnpm captures <folder>');
  const folder = isAbsolute(folderArgument)
    ? folderArgument
    : resolve(process.env['INIT_CWD'] ?? process.cwd(), folderArgument);
  const baseUrl = (process.env['CAPTURE_BASE_URL'] ?? DEFAULT_BASE_URL).replace(/\/$/, '');
  await mkdir(folder, { recursive: true });

  const browser = await launchBrowser();
  let count = 0;
  try {
    for (const viewport of CAPTURE_VIEWPORTS) {
      const context = await browser.newContext({
        viewport: { width: viewport.width, height: viewport.height },
        locale: 'pt-BR',
        reducedMotion: 'reduce',
      });
      const page = await context.newPage();
      for (const target of CAPTURE_TARGETS) {
        const file = `${target.name} ${viewport.name}.png`;
        await capture(page, baseUrl, target, resolve(folder, file));
        count += 1;
        console.log(`${count}/${TOTAL} ${file}`);
      }
      await context.close();
    }
  } finally {
    await browser.close();
  }
  console.log(`Done: ${count} captures in ${folder}`);
}

async function capture(
  page: Page,
  baseUrl: string,
  target: CaptureTarget,
  file: string,
): Promise<void> {
  await page.goto(`${baseUrl}${target.path}`, { waitUntil: 'load' });
  await page.waitForLoadState('networkidle');
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(SETTLE_MS);
  await page.screenshot({ path: file, fullPage: true, animations: 'disabled' });
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
