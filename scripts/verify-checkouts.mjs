import { chromium, expect } from '@playwright/test';
import { existsSync } from 'node:fs';

const executablePath = [process.env.BROWSER_EXECUTABLE, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(path => path && existsSync(path));
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
const previewUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const urls = ['https://pay.wiapy.com/IPZb58bM65az', 'https://pay.wiapy.com/oy8QeLCFUlw', 'https://pay.wiapy.com/BYUp6V_B_1fp'];
const errors = [];
page.on('pageerror', error => errors.push(error.message));

try {
  // Confere os destinos configurados interceptando o provedor e o rastreamento.
  // Não realiza pagamentos nem envia eventos de teste para a UTMify.
  await page.route('https://cdn.utmify.com.br/**', route => route.fulfill({ status: 200, contentType: 'application/javascript', body: '' }));
  await page.route('https://pay.wiapy.com/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Destino de teste</title>' }));

  for (const choice of ['decline', 'accept', 'complete']) {
    await page.goto(previewUrl, { waitUntil: 'networkidle' });
    const tracking = page.locator('script[src="https://cdn.utmify.com.br/scripts/utms/latest.js"]');
    await expect(tracking).toHaveCount(1);
    await expect(tracking).toHaveAttribute('data-utmify-prevent-xcod-sck', '');
    await expect(tracking).toHaveAttribute('data-utmify-prevent-subids', '');
    expect(await tracking.evaluate(script => script.async && script.defer)).toBe(true);
    if (choice === 'complete') {
      await page.getByRole('button', { name: 'QUERO O PACOTE COMPLETO', exact: true }).click();
    } else {
      await page.getByRole('button', { name: 'QUERO OS 20 PROJETOS', exact: true }).click();
      await expect(page.getByRole('dialog')).toBeVisible();
      await page.getByRole('button', { name: choice === 'accept' ? /QUERO O COMPLETO POR/ : /Não, continuar com o Essencial por/ }).click();
    }
    const expected = choice === 'accept' ? urls[2] : choice === 'decline' ? urls[0] : urls[1];
    await page.waitForURL(expected);
    expect(page.url()).toBe(expected);
  }
  expect(errors, 'Sem erros JavaScript').toEqual([]);
  console.log('OK: recusar → Essencial 14,90; aceitar → Completo especial 17,90; compra direta → Completo 24,90.');
} finally {
  await browser.close();
}
