import { chromium, expect } from '@playwright/test';
import { existsSync, mkdirSync } from 'node:fs';

const executablePath = [process.env.BROWSER_EXECUTABLE, 'C:/Program Files/Google/Chrome/Application/chrome.exe', 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(path => path && existsSync(path));
const browser = await chromium.launch({ executablePath, headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1100 }, reducedMotion: 'no-preference' });
const errors = [];
page.on('pageerror', error => errors.push(error.message));
try {
  await page.goto(process.env.PREVIEW_URL || 'http://127.0.0.1:4173', { waitUntil: 'networkidle' });
  const gallery = page.locator('.page-carousel');
  await gallery.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  const originalImages = gallery.locator('.page-slide:not(.page-slide-copy) img');
  await expect(originalImages).toHaveCount(5);
  await expect(page.locator('.page-carousel-controls, .page-carousel-dots, .autoplay-toggle')).toHaveCount(0);
  await expect(gallery.locator('h3, p, .step-number, .preview-copy')).toHaveCount(0);
  await expect.poll(() => originalImages.evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  await expect.poll(() => gallery.evaluate(element => element.scrollLeft), { timeout: 4000 }).toBeGreaterThan(50);
  await gallery.hover();
  await page.waitForTimeout(100);
  const pausedPosition = await gallery.evaluate(element => element.scrollLeft);
  await page.waitForTimeout(500);
  expect(await gallery.evaluate(element => element.scrollLeft)).toBe(pausedPosition);
  await gallery.evaluate(element => { element.scrollLeft = (element.firstElementChild.getBoundingClientRect().width + 20) * 5 - 8; });
  await page.mouse.move(0, 0);
  await expect.poll(() => gallery.evaluate(element => element.scrollLeft), { timeout: 2500 }).toBeLessThan(60);

  await gallery.locator('button').nth(2).click();
  await expect(page.getByRole('dialog')).toBeVisible();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', '/assets/03_cozinha_passo_a_passo_3d.webp');
  await page.getByRole('button', { name: 'Próxima', exact: true }).click();
  await expect(page.getByRole('dialog').locator('img')).toHaveAttribute('src', '/assets/04_mercadinho_resultado_3d.webp');
  await page.keyboard.press('Escape');
  await expect(page.getByRole('dialog')).toHaveCount(0);

  const scenes = page.locator('.story-carousel');
  await scenes.scrollIntoViewIfNeeded();
  await page.mouse.move(0, 0);
  await expect(scenes.locator('.story-group:not(.story-copy) img')).toHaveCount(5);
  await expect(page.locator('#projetos .project-card, #projetos button, #projetos .theme-filters')).toHaveCount(0);
  await expect.poll(() => scenes.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    const visibleImages = [...element.querySelectorAll('img')].filter(image => {
      const rect = image.getBoundingClientRect();
      return rect.right > bounds.left && rect.left < bounds.right;
    });
    return visibleImages.length > 0 && visibleImages.every(image => image.complete && image.naturalWidth > 0);
  })).toBe(true);
  const initialX = await scenes.locator('img').first().evaluate(image => image.getBoundingClientRect().x);
  await page.waitForTimeout(500);
  expect(await scenes.locator('img').first().evaluate(image => image.getBoundingClientRect().x)).toBeGreaterThan(initialX);
  await scenes.locator('.story-track').evaluate(track => {
    const animation = track.getAnimations()[0];
    animation.currentTime = Number(animation.effect.getTiming().duration) - 150;
  });
  const centerImage = () => scenes.evaluate(element => {
    const bounds = element.getBoundingClientRect();
    const centerX = bounds.left + bounds.width / 2;
    return [...element.querySelectorAll('img')].find(image => {
      const rect = image.getBoundingClientRect();
      return rect.left <= centerX && rect.right >= centerX;
    })?.getAttribute('src');
  });
  const beforeLoop = await centerImage();
  await page.waitForTimeout(350);
  expect(await centerImage()).toBe(beforeLoop);
  await scenes.hover();
  await page.locator('#projetos').screenshot({ path: '.qa/project-scenes-desktop.png' });

  await page.locator('.bonuses-section').scrollIntoViewIfNeeded();
  await expect(page.locator('.bonus-image>img')).toHaveCount(4);
  await expect.poll(() => page.locator('.bonus-image>img').evaluateAll(images => images.every(image => image.complete && image.naturalWidth > 0))).toBe(true);
  await expect(page.locator('.bonus-image .bonus-cover')).toHaveCount(0);
  mkdirSync('.qa', { recursive: true });
  await page.locator('.bonuses-section').screenshot({ path: '.qa/bonus-images-desktop.png' });
  await page.locator('#por-dentro').screenshot({ path: '.qa/carousel-desktop.png' });

  await page.emulateMedia({ reducedMotion: 'reduce' });
  await expect(page.locator('.autoplay-toggle')).toHaveCount(0);
  for (const width of [320, 375, 768, 1440]) {
    await page.setViewportSize({ width, height: 1100 });
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `Sem overflow em ${width}px`).toBe(true);
  }
  await page.setViewportSize({ width: 375, height: 1100 });
  await page.locator('#por-dentro').screenshot({ path: '.qa/carousel-mobile.png' });
  await page.locator('.bonuses-section').screenshot({ path: '.qa/bonus-images-mobile.png' });
  await page.locator('.catalog-mockup').scrollIntoViewIfNeeded();
  await expect(page.locator('.catalog-mockup>img')).toHaveAttribute('src', '/assets/Mini Mundos de Brincar_ Livro Criativo.webp');
  await page.locator('#ofertas').scrollIntoViewIfNeeded();
  await expect(page.locator('.offer-mockup>img')).toHaveAttribute('src', await page.locator('.hero-art>img').getAttribute('src'));
  await expect(page.locator('.plan-seal')).toHaveText('Maisescolhido');
  await expect(page.locator('.plan-badge')).toHaveCount(0);
  const offerOrder = await page.locator('#ofertas .section-heading').evaluate(element => {
    const title = element.querySelector('h2').getBoundingClientRect();
    const mockup = element.querySelector('.offer-mockup').getBoundingClientRect();
    const description = element.querySelector('p').getBoundingClientRect();
    return mockup.top >= title.bottom && mockup.bottom <= description.top;
  });
  expect(offerOrder).toBe(true);
  expect(await page.locator('h1').evaluate(element => getComputedStyle(element).fontFamily)).toContain('Montserrat');
  expect(await page.locator('.plan-features').first().evaluate(element => getComputedStyle(element).fontFamily)).toContain('Montserrat');
  await page.locator('.product-grid').screenshot({ path: '.qa/catalog-mobile.png' });
  await page.locator('.plans-grid').screenshot({ path: '.qa/plans-mobile.png' });
  await page.locator('#projetos').screenshot({ path: '.qa/project-scenes-mobile.png' });
  expect(errors).toEqual([]);
  console.log('OK: carrossel das cinco cenas da esquerda para a direita, loop sem salto, galeria de páginas, zoom, mockups, selo, Montserrat e responsividade.');
} finally {
  await browser.close();
}
