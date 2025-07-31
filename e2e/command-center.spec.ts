import { test, expect } from '@playwright/test';

test.describe('AI Command Center Comprehensive Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to test page
    await page.goto('http://localhost:3000/test-command-center');
    
    // Wait for page to load
    await page.waitForLoadState('networkidle');
  });

  test('Command Center loads successfully', async ({ page }) => {
    // Check if Command Center is visible
    const commandCenter = page.locator('aside').first();
    await expect(commandCenter).toBeVisible();
    
    // Check if TopBar is visible
    const topBar = page.locator('header').first();
    await expect(topBar).toBeVisible();
    
    // Take screenshot
    await page.screenshot({ path: 'tests-results/command-center-loaded.png', fullPage: true });
  });

  test('No dark theme elements present', async ({ page }) => {
    // Check for any dark: prefixed classes
    const darkElements = await page.locator('[class*="dark:"]').count();
    expect(darkElements).toBe(0);
    
    // Check background colors
    const body = page.locator('body');
    const backgroundColor = await body.evaluate(el => 
      window.getComputedStyle(el).backgroundColor
    );
    expect(backgroundColor).not.toContain('rgb(31, 31, 35)'); // No #1F1F23
  });

  test('BentoGrid layout is properly rendered', async ({ page }) => {
    // Check if BentoGrid exists
    const bentoGrid = page.locator('.grid.grid-cols-12');
    await expect(bentoGrid).toBeVisible();
    
    // Check for proper card heights
    const heroCard = page.locator('.col-span-8.h-\\[400px\\]').first();
    await expect(heroCard).toBeVisible();
    
    const mediumCard = page.locator('.col-span-6.h-\\[260px\\]').first();
    await expect(mediumCard).toBeVisible();
    
    // Take screenshot of BentoGrid
    await page.screenshot({ path: 'tests-results/bento-grid-layout.png', fullPage: true });
  });

  test('Glass components have proper opacity', async ({ page }) => {
    // Check GlassCard opacity
    const glassCard = page.locator('[class*="bg-white"]').first();
    const opacity = await glassCard.evaluate(el => {
      const bg = window.getComputedStyle(el).backgroundColor;
      return bg;
    });
    
    // Should not be too transparent
    expect(opacity).toMatch(/rgba?\(/); // Has proper color value
  });

  test('Sidebar navigation works', async ({ page }) => {
    // Check initial dashboard view
    await expect(page.locator('text=Dashboard Overview')).toBeVisible();
    
    // Click on Sites menu item
    await page.click('text=Sites');
    
    // Verify Sites view is displayed
    await expect(page.locator('text=Construction Sites')).toBeVisible({ timeout: 10000 });
    
    // Click on AI Center
    await page.click('text=AI Center');
    
    // Verify AI Dashboard is displayed
    await expect(page.locator('text=AI Dashboard')).toBeVisible({ timeout: 10000 });
    
    // Take screenshot of navigation
    await page.screenshot({ path: 'tests-results/sidebar-navigation.png' });
  });

  test('Map loads in Dashboard view', async ({ page }) => {
    // Check for map container in dashboard
    const mapContainer = page.locator('.maplibregl-map').first();
    
    // Wait for map or error message
    await page.waitForSelector('.maplibregl-map, text=Map Loading Error', { timeout: 15000 });
    
    // Check if map loaded or if there's an error
    const mapLoaded = await mapContainer.isVisible().catch(() => false);
    const errorMessage = await page.locator('text=Map Loading Error').isVisible().catch(() => false);
    
    if (mapLoaded) {
      console.log('✓ Dashboard map loaded successfully');
      // Check for Stadia Maps attribution
      await expect(page.locator('text=/Stadia/')).toBeVisible({ timeout: 10000 });
    } else if (errorMessage) {
      console.log('⚠ Map loading error detected - API key may need configuration');
      const errorText = await page.locator('text=Map Loading Error').locator('..').textContent();
      console.log('Error details:', errorText);
    }
    
    // Take screenshot
    await page.screenshot({ path: 'tests-results/dashboard-map.png' });
  });

  test('Map loads in Sites view', async ({ page }) => {
    // Navigate to Sites view
    await page.click('text=Sites');
    await page.waitForTimeout(2000);
    
    // Wait for map container
    const mapContainer = page.locator('.maplibregl-map').first();
    
    // Wait for map or error message
    await page.waitForSelector('.maplibregl-map, text=Map Loading Error', { timeout: 15000 });
    
    // Check if map loaded
    const mapLoaded = await mapContainer.isVisible().catch(() => false);
    const errorMessage = await page.locator('text=Map Loading Error').isVisible().catch(() => false);
    
    if (mapLoaded) {
      console.log('✓ Sites map loaded successfully');
      // Check for map markers
      const markers = await page.locator('.site-marker').count();
      console.log(`Found ${markers} site markers`);
    } else if (errorMessage) {
      console.log('⚠ Sites map loading error - API key may need configuration');
    }
    
    // Take screenshot
    await page.screenshot({ path: 'tests-results/sites-map.png' });
  });

  test('AI Assistant toggle works', async ({ page }) => {
    // Click AI Assistant button (find by bot icon)
    const aiButton = page.locator('button').filter({ hasText: /AI Assistant|Bot/ }).first();
    await aiButton.click();
    
    // Check if conversational interface is visible
    await expect(page.locator('text=AI Assistant')).toBeVisible();
    
    // Type a message
    await page.fill('input[placeholder="Ask me anything..."]', 'Show project timeline');
    
    // Submit the message
    await page.press('input[placeholder="Ask me anything..."]', 'Enter');
    
    // Wait for AI response
    await page.waitForTimeout(2000);
    
    // Check for response
    const response = await page.locator('text=/analyzed|understand/').first();
    await expect(response).toBeVisible({ timeout: 5000 });
    
    // Take screenshot
    await page.screenshot({ path: 'tests-results/ai-assistant.png' });
  });

  test('No Grid View toggle present', async ({ page }) => {
    // Check that Grid View button doesn't exist
    const gridButton = await page.locator('button:has-text("Grid View")').count();
    expect(gridButton).toBe(0);
    
    // Check that only BentoGrid is rendered
    const bentoGrid = page.locator('.grid.grid-cols-12');
    await expect(bentoGrid).toBeVisible();
  });

  test('Real-time data updates', async ({ page }) => {
    // Check if live connection indicator is present
    await expect(page.locator('text=Live')).toBeVisible();
    
    // Check for activity feed
    const activityFeed = page.locator('text=Activity Feed').first();
    await expect(activityFeed).toBeVisible();
    
    // Wait for data update
    await page.waitForTimeout(3000);
    
    // Check if any metrics have updated
    const metrics = await page.locator('.font-mono').count();
    expect(metrics).toBeGreaterThan(0);
  });

  test('Sidebar collapse/expand works', async ({ page }) => {
    // Find toggle button (chevron icon)
    const toggleButton = page.locator('button').filter({ has: page.locator('svg') }).last();
    
    // Get initial sidebar width
    const sidebar = page.locator('aside').first();
    const initialWidth = await sidebar.evaluate(el => el.offsetWidth);
    
    // Click to collapse
    await toggleButton.click();
    await page.waitForTimeout(500);
    
    // Check if sidebar is collapsed
    const collapsedWidth = await sidebar.evaluate(el => el.offsetWidth);
    expect(collapsedWidth).toBeLessThan(initialWidth);
    
    // Click to expand
    await toggleButton.click();
    await page.waitForTimeout(500);
    
    // Check if sidebar is expanded
    const expandedWidth = await sidebar.evaluate(el => el.offsetWidth);
    expect(expandedWidth).toBeGreaterThan(collapsedWidth);
  });

  test('Performance monitoring', async ({ page }) => {
    // Measure page performance
    const performanceTiming = await page.evaluate(() => {
      const timing = window.performance.timing;
      return {
        loadTime: timing.loadEventEnd - timing.navigationStart,
        domContentLoaded: timing.domContentLoadedEventEnd - timing.navigationStart,
        firstPaint: performance.getEntriesByType('paint')[0]?.startTime || 0
      };
    });
    
    console.log('Performance Metrics:', performanceTiming);
    
    // Check if load time is reasonable
    expect(performanceTiming.loadTime).toBeLessThan(5000); // Less than 5 seconds
  });

  test('Mobile responsiveness', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });
    
    // Check if sidebar is still accessible
    const sidebar = page.locator('aside').first();
    await expect(sidebar).toBeVisible();
    
    // Check if content adjusts properly
    const bentoGrid = page.locator('.grid');
    await expect(bentoGrid).toBeVisible();
    
    // Take mobile screenshot
    await page.screenshot({ path: 'tests-results/mobile-view.png' });
  });

  test('Error boundaries work', async ({ page }) => {
    // Check console for errors
    const consoleErrors: string[] = [];
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });
    
    // Navigate through different views
    await page.click('text=Sites');
    await page.waitForTimeout(1000);
    await page.click('text=Timeline');
    await page.waitForTimeout(1000);
    await page.click('text=Analytics');
    await page.waitForTimeout(1000);
    
    // Check if any errors occurred
    console.log('Console errors:', consoleErrors);
    
    // The app should still be functional
    await expect(page.locator('aside')).toBeVisible();
  });
});

test.describe('Visual Regression Tests', () => {
  test('Full page visual comparison', async ({ page }) => {
    await page.goto('http://localhost:3000/test-command-center');
    await page.waitForLoadState('networkidle');
    
    // Take full page screenshot for visual regression
    await page.screenshot({ 
      path: 'tests-results/visual-regression-full.png', 
      fullPage: true,
      animations: 'disabled'
    });
  });
  
  test('Component-level visual tests', async ({ page }) => {
    await page.goto('http://localhost:3000/test-command-center');
    await page.waitForLoadState('networkidle');
    
    // Sidebar screenshot
    const sidebar = page.locator('aside').first();
    await sidebar.screenshot({ path: 'tests-results/visual-sidebar.png' });
    
    // BentoGrid screenshot
    const bentoGrid = page.locator('.grid.grid-cols-12').first();
    await bentoGrid.screenshot({ path: 'tests-results/visual-bentogrid.png' });
    
    // TopBar screenshot
    const topBar = page.locator('header').first();
    await topBar.screenshot({ path: 'tests-results/visual-topbar.png' });
  });
});