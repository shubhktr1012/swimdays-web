import { chromium } from 'playwright';

const args = process.argv.slice(2);
const headed = args.includes('--headed');
const screenshotArg = args.find((arg) => arg.startsWith('--screenshot='));
const screenshotPath = screenshotArg ? screenshotArg.split('=')[1] : null;
const urlArg = args.find((arg) => !arg.startsWith('--'));
const url = urlArg || 'https://wearadhd.com/';

const browser = await chromium.launch({ headless: !headed });
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

try {
  await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(1500);

  const summary = {
    title: await page.title(),
    url: page.url(),
    searchButtons: await page
      .locator('button, a')
      .filter({ hasText: /search/i })
      .count(),
  };

  if (screenshotPath) {
    await page.screenshot({ path: screenshotPath, fullPage: true });
    summary.screenshot = screenshotPath;
  }

  console.log(JSON.stringify(summary, null, 2));
} finally {
  await browser.close();
}
