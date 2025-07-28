import { test, expect } from '@playwright/test'

test.describe('ホームページ', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/')
  })

  test('タイトルが正しく表示される', async ({ page }) => {
    await expect(page).toHaveTitle(/ライフオーケストレーション/)
  })

  test('メインタイトルが表示される', async ({ page }) => {
    const heading = page.getByRole('heading', { 
      name: 'ライフオーケストレーション',
      level: 1 
    })
    await expect(heading).toBeVisible()
  })

  test('ヘッダーロゴが表示される', async ({ page }) => {
    const logo = page.getByRole('heading', { 
      name: 'KAISHU',
      level: 1 
    })
    await expect(logo).toBeVisible()
  })

  test('ナビゲーションリンクが表示される', async ({ page }) => {
    const nav = page.locator('nav')
    await expect(nav).toBeVisible()
  })

  test('フッターが表示される', async ({ page }) => {
    const footer = page.getByRole('contentinfo')
    await expect(footer).toBeVisible()
    await expect(footer).toContainText('© 2025 KAISHU. All rights reserved.')
  })

  test('レスポンシブデザインが機能する', async ({ page, viewport }) => {
    // モバイルビューポートでナビゲーションが非表示
    if (viewport && viewport.width < 768) {
      const nav = page.locator('nav').first()
      await expect(nav).toHaveCSS('display', 'none')
    }
    
    // デスクトップビューポートでナビゲーションが表示
    if (viewport && viewport.width >= 768) {
      const nav = page.locator('nav').first()
      await expect(nav).toBeVisible()
    }
  })
})