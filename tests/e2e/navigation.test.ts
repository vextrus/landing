import { test, expect } from '@playwright/test'

test.describe('Vextrus Module Navigation', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/test-single-click')
  })

  test('modules should open with single click', async ({ page }) => {
    // Click on Financial Suite module
    const financialModule = page.getByText('AI Financial Intelligence').first()
    await financialModule.click()

    // Verify modal opened immediately
    await expect(page.locator('.fixed.inset-0.z-\\[9999\\]')).toBeVisible({ timeout: 2000 })
    
    // Verify loading state appears
    await expect(page.getByText('Initializing AI Financial Intelligence')).toBeVisible()
    
    // Wait for dashboard to load
    await expect(page.getByText('Financial Command Center')).toBeVisible({ timeout: 5000 })
  })

  test('escape key should close module', async ({ page }) => {
    // Open Quality Control module
    const qualityModule = page.getByText('AI Quality Control Suite').first()
    await qualityModule.click()

    // Wait for modal to open
    await expect(page.locator('.fixed.inset-0.z-\\[9999\\]')).toBeVisible({ timeout: 2000 })
    
    // Wait for content to load
    await expect(page.getByText('Quality Intelligence')).toBeVisible({ timeout: 5000 })

    // Press Escape key
    await page.keyboard.press('Escape')

    // Verify modal is closed
    await expect(page.locator('.fixed.inset-0.z-\\[9999\\]')).not.toBeVisible({ timeout: 1000 })
  })

  test('backspace key should close module when body is focused', async ({ page }) => {
    // Open Analytics BI module
    const analyticsModule = page.getByText('AI Business Intelligence').first()
    await analyticsModule.click()

    // Wait for modal to open
    await expect(page.locator('.fixed.inset-0.z-\\[9999\\]')).toBeVisible({ timeout: 2000 })
    
    // Wait for content to load
    await expect(page.getByText('Business Intelligence Hub')).toBeVisible({ timeout: 5000 })

    // Focus on body element
    await page.evaluate(() => document.body.focus())

    // Press Backspace key
    await page.keyboard.press('Backspace')

    // Verify modal is closed
    await expect(page.locator('.fixed.inset-0.z-\\[9999\\]')).not.toBeVisible({ timeout: 1000 })
  })

  test('backspace should not close module when input is focused', async ({ page }) => {
    // Open Financial Suite module
    const financialModule = page.getByText('AI Financial Intelligence').first()
    await financialModule.click()

    // Wait for dashboard to load
    await expect(page.getByText('Financial Command Center')).toBeVisible({ timeout: 5000 })

    // Find and focus on an input field (search box)
    const searchInput = page.locator('input').first()
    await searchInput.focus()

    // Press Backspace key
    await page.keyboard.press('Backspace')

    // Verify modal is still open
    await expect(page.locator('.fixed.inset-0.z-\\[9999\\]')).toBeVisible()
  })

  test('no preview modal should appear with directAccess', async ({ page }) => {
    // Click on any module
    const module = page.getByText('AI Quality Control Suite').first()
    await module.click()

    // Verify no preview modal appears (should go straight to loading)
    await expect(page.getByText('Preview')).not.toBeVisible({ timeout: 1000 })
    
    // Verify loading state appears instead
    await expect(page.getByText('Initializing')).toBeVisible({ timeout: 2000 })
  })

  test('click counter should track module clicks', async ({ page }) => {
    // Initial state
    await expect(page.getByText('Financial Suite: 0 clicks')).toBeVisible()
    
    // Click Financial Suite
    const financialModule = page.getByText('AI Financial Intelligence').first()
    await financialModule.click()
    
    // Close modal
    await page.keyboard.press('Escape')
    
    // Verify counter incremented
    await expect(page.getByText('Financial Suite: 1 clicks')).toBeVisible()
  })
})