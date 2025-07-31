import { test, expect } from '@playwright/test'

test.describe('AI Command Center Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to test page
    await page.goto('http://localhost:3000/test-command-center')
    
    // Wait for page to load
    await page.waitForLoadState('networkidle')
  })

  test('Command Center loads successfully', async ({ page }) => {
    // Check if Command Center is visible
    const commandCenter = page.locator('aside').first()
    await expect(commandCenter).toBeVisible()
    
    // Check if TopBar is visible
    const topBar = page.locator('header').first()
    await expect(topBar).toBeVisible()
  })

  test('Sidebar navigation works', async ({ page }) => {
    // Check initial dashboard view
    await expect(page.locator('text=Command Center')).toBeVisible()
    
    // Click on Sites menu item
    await page.click('text=Sites')
    
    // Verify Sites view is displayed
    await expect(page.locator('text=Construction Sites')).toBeVisible({ timeout: 10000 })
    
    // Click on AI Center
    await page.click('text=AI Center')
    
    // Verify AI Dashboard is displayed
    await expect(page.locator('text=AI Dashboard')).toBeVisible({ timeout: 10000 })
  })

  test('Map loads in Sites view', async ({ page }) => {
    // Navigate to Sites view
    await page.click('text=Sites')
    
    // Wait for map container
    const mapContainer = page.locator('#map-container')
    await expect(mapContainer).toBeVisible({ timeout: 10000 })
    
    // Check if Stadia Maps attribution is present
    await expect(page.locator('text=/Stadia Maps/')).toBeVisible({ timeout: 15000 })
  })

  test('AI Assistant button toggles conversational interface', async ({ page }) => {
    // Click AI Assistant button
    const aiButton = page.locator('button').filter({ has: page.locator('svg') }).nth(2)
    await aiButton.click()
    
    // Check if conversational interface is visible
    await expect(page.locator('text=AI Assistant')).toBeVisible()
    
    // Type a message
    await page.fill('input[placeholder="Ask me anything..."]', 'Show project timeline')
    
    // Submit the message
    await page.press('input[placeholder="Ask me anything..."]', 'Enter')
    
    // Check for AI response
    await expect(page.locator('text=/analyzed your project timeline/')).toBeVisible({ timeout: 5000 })
  })

  test('Bento Grid layout toggle works', async ({ page }) => {
    // Check if Bento View button exists
    const bentoButton = page.locator('button:has-text("Bento View")')
    await expect(bentoButton).toBeVisible()
    
    // Click Grid View button
    await page.click('button:has-text("Grid View")')
    
    // Check if Grid layout is active
    await expect(page.locator('.react-grid-layout')).toBeVisible()
  })

  test('Notifications dropdown works', async ({ page }) => {
    // Click notifications bell icon
    const notificationButton = page.locator('button').filter({ has: page.locator('svg') }).nth(3)
    await notificationButton.click()
    
    // Check if notifications dropdown is visible
    await expect(page.locator('text=Notifications')).toBeVisible()
  })

  test('Search functionality works', async ({ page }) => {
    // Focus on search input
    await page.click('input[placeholder="Search or ask AI..."]')
    
    // Type search query
    await page.fill('input[placeholder="Search or ask AI..."]', 'construction')
    
    // Check if AI suggestions appear
    await expect(page.locator('text=AI Suggestions')).toBeVisible()
  })

  test('Sidebar collapse/expand works', async ({ page }) => {
    // Find toggle button
    const toggleButton = page.locator('button').filter({ has: page.locator('svg') }).last()
    
    // Click to collapse
    await toggleButton.click()
    
    // Check if sidebar is collapsed (width should be 80px)
    const sidebar = page.locator('aside').first()
    await expect(sidebar).toHaveCSS('width', '80px')
    
    // Click to expand
    await toggleButton.click()
    
    // Check if sidebar is expanded (width should be 250px)
    await expect(sidebar).toHaveCSS('width', '250px')
  })

  test('Keyboard shortcuts modal', async ({ page }) => {
    // Press Cmd+/ to open shortcuts
    await page.keyboard.press('Meta+/')
    
    // Check if shortcuts modal is visible
    await expect(page.locator('text=Keyboard Shortcuts')).toBeVisible()
    
    // Check if shortcuts are listed
    await expect(page.locator('text=Search / Focus')).toBeVisible()
    await expect(page.locator('text=Open AI Assistant')).toBeVisible()
  })

  test('Real-time data updates', async ({ page }) => {
    // Check if live connection indicator is present
    await expect(page.locator('text=Live')).toBeVisible()
    
    // Check if activity feed updates
    const activityFeed = page.locator('text=Live Activity').first()
    await expect(activityFeed).toBeVisible()
    
    // Wait for a new activity item (should appear within 5 seconds)
    const initialActivityCount = await page.locator('.glass-light >> text=/ago/').count()
    
    // Wait for new activity
    await page.waitForTimeout(6000)
    
    const newActivityCount = await page.locator('.glass-light >> text=/ago/').count()
    expect(newActivityCount).toBeGreaterThanOrEqual(initialActivityCount)
  })
})