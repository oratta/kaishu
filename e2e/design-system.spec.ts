import { test, expect } from '@playwright/test';

test.describe('Design System Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/design-system');
  });

  test('should display design system page', async ({ page }) => {
    await expect(page).toHaveTitle(/デザインシステム/);
    await expect(page.locator('h1').first()).toContainText('KAISHU デザインシステム');
  });

  test('should display color swatches', async ({ page }) => {
    // プライマリカラー
    await expect(page.locator('[data-testid="color-primary"]')).toBeVisible();
    await expect(page.locator('[data-testid="color-primary-default"]')).toHaveCSS(
      'background-color',
      'rgb(15, 118, 110)',
    );

    // セカンダリカラー
    await expect(page.locator('[data-testid="color-secondary"]')).toBeVisible();
    await expect(page.locator('[data-testid="color-secondary-default"]')).toHaveCSS(
      'background-color',
      'rgb(245, 230, 211)',
    );

    // アクセントカラー
    await expect(page.locator('[data-testid="color-accent"]')).toBeVisible();
    await expect(page.locator('[data-testid="color-accent-default"]')).toHaveCSS(
      'background-color',
      'rgb(255, 107, 107)',
    );
  });

  test('should display typography samples', async ({ page }) => {
    const typographySection = page.locator('[data-testid="typography-section"]');
    await expect(typographySection).toBeVisible();

    // フォントサイズの確認
    await expect(page.locator('.text-5xl')).toBeVisible();
    await expect(page.locator('.text-4xl')).toBeVisible();
    await expect(page.locator('.text-3xl')).toBeVisible();
    await expect(page.locator('.text-2xl')).toBeVisible();
    await expect(page.locator('.text-xl')).toBeVisible();
  });

  test('should display button variants', async ({ page }) => {
    // プライマリボタン
    const primaryButton = page.locator('.btn-primary').first();
    await expect(primaryButton).toBeVisible();
    await expect(primaryButton).toHaveCSS('background-color', 'rgb(15, 118, 110)');

    // セカンダリボタン
    const secondaryButton = page.locator('.btn-secondary').first();
    await expect(secondaryButton).toBeVisible();
    await expect(secondaryButton).toHaveCSS('background-color', 'rgb(245, 230, 211)');

    // アクセントボタン
    const accentButton = page.locator('.btn-accent').first();
    await expect(accentButton).toBeVisible();
    await expect(accentButton).toHaveCSS('background-color', 'rgb(255, 107, 107)');
  });

  test('should display form elements', async ({ page }) => {
    const formSection = page.locator('[data-testid="form-section"]');
    await expect(formSection).toBeVisible();

    // 入力フィールド
    const inputField = page.locator('.input').first();
    await expect(inputField).toBeVisible();
    await expect(inputField).toHaveCSS('border-radius', '8px');

    // フォーカス時のスタイル確認
    await inputField.focus();
    // フォーカス時はリングが表示される
    await expect(inputField).toBeFocused();
  });

  test('should display spacing examples', async ({ page }) => {
    const spacingSection = page.locator('[data-testid="spacing-section"]');
    await expect(spacingSection).toBeVisible();

    // スペーシングの確認
    await expect(page.locator('.space-y-4').first()).toBeVisible();
    await expect(page.locator('.gap-4').first()).toBeVisible();
  });

  test('should display shadow examples', async ({ page }) => {
    const shadowSection = page.locator('[data-testid="shadow-section"]');
    await expect(shadowSection).toBeVisible();

    // シャドウの確認
    await expect(page.locator('.shadow-sm').first()).toBeVisible();
    await expect(page.locator('.shadow-md').first()).toBeVisible();
    await expect(page.locator('.shadow-lg').first()).toBeVisible();
  });

  test('should be responsive', async ({ page, viewport }) => {
    // モバイル表示の確認
    if (viewport && viewport.width < 768) {
      await expect(page.locator('.container')).toHaveCSS('padding-left', '16px');
      await expect(page.locator('.container')).toHaveCSS('padding-right', '16px');
    }
    // デスクトップ表示の確認
    else if (viewport && viewport.width >= 1024) {
      await expect(page.locator('.container')).toHaveCSS('padding-left', '32px');
      await expect(page.locator('.container')).toHaveCSS('padding-right', '32px');
    }
  });
});
