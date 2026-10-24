import { chromium, expect } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';

const executablePath = [process.env.BROWSER_EXECUTABLE, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(path => path && existsSync(path));
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 }, reducedMotion: 'reduce' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
page.on('response', response => { if (response.status() >= 400 && new URL(response.url()).hostname === '127.0.0.1') errors.push(`${response.status()}: ${response.url()}`); });

try {
  const response = await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  expect(response.status()).toBe(200);
  await expect(page.locator('h1')).toHaveCount(1);
  await expect(page.locator('.project-card')).toHaveCount(6);
  await page.getByRole('button', { name: 'VER TODOS OS 20 PROJETOS' }).click();
  await expect(page.locator('.project-card')).toHaveCount(20);
  await page.getByRole('button', { name: 'Pequenos Comerciantes', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(5);
  await expect(page.locator('.project-card').first()).toContainText('Mercadinho Infantil');
  await page.getByRole('button', { name: 'Pequenos Sonhadores', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(4);
  await page.getByRole('button', { name: 'Todos os temas', exact: true }).click();
  await expect(page.locator('.project-card')).toHaveCount(20);
  await page.getByRole('button', { name: 'MOSTRAR MENOS PROJETOS' }).click();
  await expect(page.locator('.project-card')).toHaveCount(6);

  await page.getByText('Os projetos são feitos com madeira ou papelão?', { exact: true }).click();
  await expect(page.locator('details[open]')).toHaveCount(1);
  await expect(page.locator('details[open]')).toContainText('papelão ondulado reforçado');
  await page.getByText('Preciso imprimir o PDF?', { exact: true }).click();
  await expect(page.locator('details[open]')).toHaveCount(1);
  await expect(page.locator('details[open]')).toContainText('A impressão é opcional');

  const buy = page.getByRole('button', { name: 'QUERO OS 20 PROJETOS', exact: true });
  await buy.click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog')).toContainText('As vendas ainda não estão abertas');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);
  await expect(buy).toBeFocused();
  await page.getByRole('button', { name: 'QUERO O PACOTE COMPLETO' }).click();
  await expect(page.getByRole('dialog')).toContainText('Pacote Completo em preparação');
  await page.getByRole('button', { name: 'ENTENDI' }).click();
  await expect(page.getByRole('dialog')).toHaveCount(0);

  await page.getByRole('button', { name: 'Política de Privacidade', exact: true }).click();
  await expect(page.getByRole('dialog')).toContainText('Este documento será disponibilizado');
  await page.keyboard.press('Escape');

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
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.getByRole('button', { name: 'Abrir menu', exact: true }).click();
  await expect(page.locator('#main-nav')).toBeVisible();
  await page.getByRole('link', { name: 'Os projetos', exact: true }).click();
  await expect(page.locator('#main-nav')).not.toBeVisible();
  expect(new URL(page.url()).hash).toBe('#projetos');
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({ path: '.qa/mobile.png', fullPage: true });
  expect(errors, 'Sem erros JavaScript ou recursos locais quebrados').toEqual([]);
  console.log('OK: 20 projetos, filtros, FAQ, checkouts pendentes, modais, foco, menu mobile e responsividade em seis larguras.');
} finally {
  await browser.close();
}
