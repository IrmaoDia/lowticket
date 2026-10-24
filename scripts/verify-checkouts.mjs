import { chromium, expect } from '@playwright/test';
import { existsSync } from 'node:fs';

const executablePath = [process.env.BROWSER_EXECUTABLE, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(path => path && existsSync(path));
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 375, height: 812 }, reducedMotion: 'reduce' });
const previewUrl = process.env.PREVIEW_URL || 'http://127.0.0.1:4173';
const urls = ['https://checkout.example.test/essencial-1490', 'https://checkout.example.test/completo-2490', 'https://checkout.example.test/completo-especial-1790'];

try {
  // Configuração fictícia apenas no navegador de teste. Não altera arquivos,
  // não acessa provedores reais e não simula uma compra aprovada.
  await page.route('**/src/config.ts*', async route => {
    const response = await route.fetch();
    let index = 0;
    const body = (await response.text())
      .replace(/\bcheckoutUrl:\s*(["'])\1/g, () => `checkoutUrl: ${JSON.stringify(urls[index++])}`)
      .replace(/\bbonusesReady:\s*false/, 'bonusesReady: true');
    if (index !== 3) throw new Error('Não foi possível preparar os três destinos de teste.');
    await route.fulfill({ response, body });
  });
  await page.route('https://checkout.example.test/**', route => route.fulfill({ status: 200, contentType: 'text/html', body: '<title>Destino de teste</title>' }));

  for (const choice of ['decline', 'accept', 'complete']) {
    await page.goto(previewUrl, { waitUntil: 'networkidle' });
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
  console.log('OK: recusar → Essencial 14,90; aceitar → Completo especial 17,90; compra direta → Completo 24,90.');
} finally {
  await browser.close();
}
