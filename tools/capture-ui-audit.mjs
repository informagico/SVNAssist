// Usage: node tools/capture-ui-audit.mjs [--playwright <absolute package directory>]
// Uses an installed Playwright and Edge; does not install dependencies or browsers.
import { createRequire } from 'node:module';
import { mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath, pathToFileURL } from 'node:url';
import path from 'node:path';
import assert from 'node:assert/strict';
import { scenarios } from './ui-audit/scenarios.mjs';
const require = createRequire(import.meta.url);
const i = process.argv.indexOf('--playwright');
const { chromium } = require(i >= 0 ? path.resolve(process.argv[i + 1]) : 'playwright');
const root = new URL('../', import.meta.url), out = new URL('docs/audit/ui-ux/', root);
mkdirSync(new URL('screenshots/', out), { recursive: true });
const browser = await chromium.launch({ channel: 'msedge', headless: true });
const report = { capturedAt: new Date().toISOString(), browser: browser.version(), source: 'Production web UI, synthetic data; Visual Studio host not verified', results: [] };
try {
  const page = await browser.newPage({ viewport: { width: 1600, height: 1160 }, locale: 'en-US', timezoneId: 'Europe/Rome', reducedMotion: 'reduce' });
  const variants = new Set(['changes', 'changes-long', 'conflicts', 'wizard-1', 'wizard-4', 'switch-normal', 'cleanup-danger', 'incoming-done', 'log', 'log-merge-normal', 'settings-openai']);
  for (const scenario of scenarios) {
    const profiles = [{ theme: 'dark', lang: 'en', width: ['log', 'diff', 'settings'].includes(scenario.view) ? 1200 : 480, height: 900 }];
    if (variants.has(scenario.id)) profiles.push({ theme: 'light', lang: 'en', width: 360, height: 600 }, { theme: 'blue', lang: 'en', width: 800, height: 900 });
    for (const profile of profiles) {
      const name = `${scenario.id}-${profile.theme}-${profile.lang}-${profile.width}x${profile.height}`;
      const errors = [];
      const onError = error => errors.push(String(error));
      page.on('pageerror', onError);
      await page.goto('about:blank');
      await page.goto(pathToFileURL(fileURLToPath(new URL('index.html', out))).href + '#' + new URLSearchParams({ scene: scenario.id, ...profile }));
      try { await page.waitForFunction(() => document.querySelector('#stage iframe')?.contentWindow.__auditReady, null, { timeout: 5000 }); } catch { errors.push('Scenarioso not ready within 5 seconds'); }
      const frame = await (await page.locator('#stage iframe').elementHandle()).contentFrame();
      const diagnostics = await frame.evaluate(() => {
        const visible = e => !!(e.getClientRects().length && getComputedStyle(e).visibility !== 'hidden');
        const accessibleName = e => e.getAttribute('aria-label') || e.getAttribute('aria-labelledby') || e.title || e.innerText?.trim() || (e.labels && [...e.labels].map(l => l.textContent).join('').trim());
        const modal = document.querySelector('[role="dialog"][aria-modal="true"]'), b = modal?.getBoundingClientRect();
        return { ready: !!window.__auditReady, errors: window.__auditErrors, commands: window.__auditCommands.map(c => c.name), language: document.documentElement.lang,
          bodyOverflow: document.documentElement.scrollWidth > innerWidth + 1,
          modalOutsideViewport: b ? b.left < -1 || b.top < -1 || b.right > innerWidth + 1 || b.bottom > innerHeight + 1 : false,
          modalBackgroundInert: modal ? !!document.querySelector('.app')?.inert : null,
          focusInsideModal: modal ? modal.contains(document.activeElement) : null,
          unnamedControls: [...document.querySelectorAll('button,input:not([type="hidden"]),select,textarea')].filter(visible).filter(e => !accessibleName(e)).map(e => ({ tag: e.tagName, id: e.id, class: e.className })).slice(0, 20),
          textLength: document.body.innerText.trim().length };
      });
      // Capture the actual view only, without the gallery navigation.
      await page.locator('#stage iframe').screenshot({ path: fileURLToPath(new URL(`screenshots/${name}.png`, out)), animations: 'disabled' });
      const behaviorChecks = [];
      if (scenario.id === 'shelve') {
        try {
          assert.equal(diagnostics.modalBackgroundInert, true);
          assert.equal(diagnostics.focusInsideModal, true);
          await frame.locator('#sh-name').fill('Audit changes');
          await frame.evaluate(() => window.__mockBridge.fn({ type: 'state', view: 'changes', state: window.__auditConfig.scenario.state }));
          assert.equal(await frame.locator('#sh-name').inputValue(), 'Audit changes');
          assert.equal(await frame.evaluate(() => document.activeElement.id), 'sh-name');
          await frame.locator('#sh-name').press('Escape');
          assert.equal(await frame.evaluate(() => document.querySelector('.app').inert), false);
          assert.equal(await frame.evaluate(() => document.activeElement.dataset.menu), 'more');
          assert.equal(await frame.locator('[aria-modal="true"]').count(), 0);
          await frame.evaluate(() => SVNUI.ops.shelveShow([]));
          await frame.locator('#sh-name').fill('Audit patch');
          await frame.locator('#sh-keep').check();
          await frame.locator('[data-sh-ok]').click();
          const command = await frame.evaluate(() => window.__auditCommands.find(c => c.name === 'shelve'));
          assert.equal(command.args.name, 'Audit patch');
          assert.equal(command.args.keep, true);
          assert.equal(await frame.evaluate(() => document.querySelector('.app').inert), false);
          assert.equal(await frame.locator('[aria-modal="true"]').count(), 0);
          behaviorChecks.push('Shelve: inert, focus, snapshot while typing, Escape, focus restoration, command payload and closing');
        } catch (error) { errors.push('Shelve regression: ' + error.message); }
      }
      if (scenario.id === 'branch' || scenario.id === 'tag') {
        try {
          await frame.locator('#bt-src-rev').check();
          assert.equal(await frame.locator('#bt-rev').isEnabled(), true);
          assert.equal(await frame.locator('#bt-rev').getAttribute('aria-label'), 'Revision');
          behaviorChecks.push('Revision field enabled and named after selecting revision source');
        } catch (error) { errors.push('Revision regression: ' + error.message); }
      }
      report.results.push({ scenario: scenario.id, ...profile, screenshot: `screenshots/${name}.png`, ...diagnostics, behaviorChecks, errors: [...errors, ...(diagnostics.errors || [])] });
      page.off('pageerror', onError);
    }
    console.log(`${scenario.id}: captured`);
  }
} finally {
  await browser.close();
  writeFileSync(new URL('capture-report.json', out), JSON.stringify(report, null, 2) + '\n');
}
const failed = report.results.filter(r => !r.ready || r.errors.length || !r.textLength);
console.log(`${report.results.length} captures, ${failed.length} rendering failures`);
if (failed.length) { console.error(failed.map(r => ({ scenario: r.scenario, errors: r.errors }))); process.exitCode = 1; }
