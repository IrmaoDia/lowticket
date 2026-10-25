import { chromium, expect } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';

const executablePath = [process.env.BROWSER_EXECUTABLE, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(path => path && existsSync(path));
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400 && new URL(response.url()).hostname === '127.0.0.1') errors.push(`${response.status()}: ${response.url()}`); });

try {
  await page.route('https://cdn.utmify.com.br/**', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  const response = await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  expect(response.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('#projetos .project-card, #projetos .theme-filters, #projetos button')).toHaveCount(0);
  await expect(page.locator('#projetos .story-group:not(.story-copy) img')).toHaveCount(5);

  await page.getByText('Os projetos são feitos com madeira ou papelão?', { exact: true }).click();
  await expect(page.locator('details[open]')).toHaveCount(1);
  await expect(page.locator('details[open]')).toContainText('papelão ondulado reforçado');
  await page.getByText('Preciso imprimir o PDF?', { exact: true }).click();
  await expect(page.locator('details[open]')).toHaveCount(1);
  await expect(page.locator('details[open]')).toContainText('A impressão é opcional');

  const buy = page.getByRole('button', { name: 'QUERO OS 20 PROJETOS', exact: true });
  await expect(page.locator('.plan-card:not(.plan-complete) .price')).toHaveText(/R\$\s*14,90/);
  await expect(page.locator('.plan-complete .price')).toHaveText(/R\$\s*24,90/);
  await buy.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.locator('.upgrade-modal .upgrade-price>strong')).toHaveText(/R\$\s*17,90/);
  await expect(page.locator('.upgrade-modal .upgrade-bonuses li')).toHaveCount(4);
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(buy).toBeFocused();

  await buy.click();
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(buy).toBeFocused();

  mkdirSync('.qa', { recursive: true });
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: '.qa/desktop.png', fullPage: true });
  for (const width of [320, 375, 640, 768, 1024, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    await page.evaluate(() => window.scrollTo(0, 0));
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth > window.innerWidth);
    expect(overflow, `Sem overflow horizontal em ${width}px`).toBe(false);
  }
  await page.setViewportSize({ width: 375, height: 812 });
  await buy.click();
  await expect(page.locator('.upgrade-modal')).toBeVisible();
  const popupFits = await page.locator('.upgrade-modal').evaluate(element => element.scrollWidth <= element.clientWidth && element.getBoundingClientRect().width <= innerWidth);
  expect(popupFits, 'Popup sem overflow no celular').toBe(true);
  await page.screenshot({ path: '.qa/upgrade-mobile.png' });
  await page.getByRole('button', { name: 'Fechar', exact: true }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('link', { name: 'QUERO ACESSAR OS 20 PROJETOS', exact: true }).click();
  expect(new URL(page.url()).hash).toBe('#ofertas');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: '.qa/mobile.png', fullPage: true });
  expect(errors, 'Sem erros JavaScript ou recursos locais quebrados').toEqual([]);
  console.log('OK: preços 14,90/24,90, oferta de 17,90, fechar, foco, FAQ, CTA e responsividade em seis larguras. Destinos verificados por verify-checkouts.mjs.');
} finally {
  await browser.close();
}
