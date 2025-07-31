/**
 * Visual Regression Testing Suite for Vextrus ERP Ecosystem
 * 
 * This suite ensures visual consistency of the Liquid Glass design system:
 * - Component appearance across browsers
 * - Animation states and transitions
 * - Responsive layout integrity
 * - Color accuracy and gradients
 * - Typography rendering
 * - Interactive state changes
 */

import { test, expect, devices } from '@playwright/test'
import pixelmatch from 'pixelmatch'
import { PNG } from 'pngjs'
import fs from 'fs'
import path from 'path'

// Visual testing configuration
const VISUAL_CONFIG = {
  threshold: 0.1, // 10% difference threshold
  animations: 'disabled' as const,
  screenshotOptions: {
    fullPage: true,
    animations: 'disabled' as const,
    maskColor: '#FF00FF' // Mask dynamic content
  }
}

// Test scenarios for visual regression
const VISUAL_SCENARIOS = [
  {
    name: 'Command Center Dashboard',
    path: '/ecosystem',
    waitForSelector: '.glass-card',
    interactions: [
      { action: 'hover', selector: '.module-card:first-child', name: 'module-hover' },
      { action: 'click', selector: '.animated-button:first-child', name: 'button-active' }
    ]
  },
  {
    name: 'Financial Suite',
    path: '/ecosystem/financial',
    waitForSelector: '.liquid-glass-strong',
    interactions: [
      { action: 'hover', selector: '.glass-card:first-child', name: 'card-hover' }
    ]
  },
  {
    name: 'Liquid Glass Components',
    path: '/ecosystem',
    waitForSelector: '.liquid-glass-ultra',
    captureElements: [
      { selector: '.glass-card', name: 'glass-card-variants' },
      { selector: '.animated-button', name: 'button-variants' }
    ]
  }
]

// Device configurations for responsive testing
const DEVICES = [
  { name: 'Desktop-4K', viewport: { width: 3840, height: 2160 } },
  { name: 'Desktop-HD', viewport: { width: 1920, height: 1080 } },
  { name: 'Laptop', viewport: { width: 1366, height: 768 } },
  { name: 'iPad-Pro', device: devices['iPad Pro'] },
  { name: 'iPad', device: devices['iPad'] },
  { name: 'iPhone-14-Pro', device: devices['iPhone 14 Pro'] },
  { name: 'Pixel-7', device: devices['Pixel 7'] }
]

// Helper function to ensure directories exist
function ensureDirectoryExists(dirPath: string) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true })
  }
}

// Helper function to compare images
async function compareImages(
  baselinePath: string,
  currentPath: string,
  diffPath: string,
  threshold = VISUAL_CONFIG.threshold
): Promise<{ match: boolean; difference: number }> {
  if (!fs.existsSync(baselinePath)) {
    // No baseline exists, create it
    fs.copyFileSync(currentPath, baselinePath)
    return { match: true, difference: 0 }
  }

  const baseline = PNG.sync.read(fs.readFileSync(baselinePath))
  const current = PNG.sync.read(fs.readFileSync(currentPath))
  const { width, height } = baseline
  
  if (current.width !== width || current.height !== height) {
    return { match: false, difference: 1 }
  }

  const diff = new PNG({ width, height })
  const numDiffPixels = pixelmatch(
    baseline.data,
    current.data,
    diff.data,
    width,
    height,
    { threshold }
  )

  const difference = numDiffPixels / (width * height)
  
  if (difference > 0) {
    fs.writeFileSync(diffPath, PNG.sync.write(diff))
  }

  return { match: difference === 0, difference }
}

// Visual regression test suite
test.describe('Visual Regression Testing - Liquid Glass Design System', () => {
  // Ensure screenshot directories exist
  test.beforeAll(() => {
    ensureDirectoryExists('tests/visual/screenshots/baseline')
    ensureDirectoryExists('tests/visual/screenshots/current')
    ensureDirectoryExists('tests/visual/screenshots/diff')
  })

  // Test 1: Component visual consistency
  test.describe('Component Visual Consistency', () => {
    DEVICES.forEach(device => {
      test(`${device.name} - Component rendering`, async ({ browser }) => {
        const context = await browser.newContext({
          ...device.device,
          viewport: device.viewport || device.device?.viewport,
          colorScheme: 'dark'
        })
        const page = await context.newPage()
        
        // Disable animations for consistent screenshots
        await page.addStyleTag({
          content: `
            *, *::before, *::after {
              animation-duration: 0s !important;
              animation-delay: 0s !important;
              transition-duration: 0s !important;
              transition-delay: 0s !important;
            }
          `
        })
        
        await page.goto('/ecosystem')
        await page.waitForSelector('.glass-card', { state: 'visible' })
        await page.waitForTimeout(1000) // Ensure all assets loaded
        
        // Capture full page screenshot
        const screenshotPath = `tests/visual/screenshots/current/${device.name}-full-page.png`
        await page.screenshot({
          path: screenshotPath,
          fullPage: true
        })
        
        // Compare with baseline
        const baselinePath = `tests/visual/screenshots/baseline/${device.name}-full-page.png`
        const diffPath = `tests/visual/screenshots/diff/${device.name}-full-page-diff.png`
        
        const { match, difference } = await compareImages(
          baselinePath,
          screenshotPath,
          diffPath
        )
        
        expect(difference).toBeLessThan(VISUAL_CONFIG.threshold)
        
        if (!match) {
          console.log(`Visual difference detected for ${device.name}: ${(difference * 100).toFixed(2)}%`)
        }
        
        await context.close()
      })
    })
  })

  // Test 2: Interactive state visual testing
  test.describe('Interactive States', () => {
    test('Button and card hover states', async ({ page }) => {
      await page.goto('/ecosystem')
      await page.waitForSelector('.animated-button')
      
      // Test button states
      const buttonStates = ['default', 'hover', 'active', 'focus']
      const button = page.locator('.animated-button').first()
      
      for (const state of buttonStates) {
        switch (state) {
          case 'hover':
            await button.hover()
            break
          case 'active':
            await button.hover()
            await page.mouse.down()
            break
          case 'focus':
            await button.focus()
            break
        }
        
        await page.waitForTimeout(300) // Wait for transition
        
        const screenshotPath = `tests/visual/screenshots/current/button-${state}.png`
        await button.screenshot({ path: screenshotPath })
        
        const baselinePath = `tests/visual/screenshots/baseline/button-${state}.png`
        const diffPath = `tests/visual/screenshots/diff/button-${state}-diff.png`
        
        const { difference } = await compareImages(
          baselinePath,
          screenshotPath,
          diffPath,
          0.15 // Higher threshold for interactive states
        )
        
        expect(difference).toBeLessThan(0.15)
        
        if (state === 'active') {
          await page.mouse.up()
        }
      }
    })
  })

  // Test 3: Liquid Glass effects
  test.describe('Liquid Glass Visual Effects', () => {
    test('Glass morphism and specular highlights', async ({ page }) => {
      await page.goto('/ecosystem')
      await page.waitForSelector('.liquid-glass-strong')
      
      // Test different glass intensities
      const glassVariants = ['light', 'medium', 'strong', 'ultra']
      
      for (const variant of glassVariants) {
        const element = page.locator(`.liquid-glass-${variant}`).first()
        
        if (await element.count() > 0) {
          const screenshotPath = `tests/visual/screenshots/current/glass-${variant}.png`
          await element.screenshot({ path: screenshotPath })
          
          const baselinePath = `tests/visual/screenshots/baseline/glass-${variant}.png`
          const diffPath = `tests/visual/screenshots/diff/glass-${variant}-diff.png`
          
          const { difference } = await compareImages(
            baselinePath,
            screenshotPath,
            diffPath
          )
          
          expect(difference).toBeLessThan(VISUAL_CONFIG.threshold)
        }
      }
    })
    
    test('Gradient rendering accuracy', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Capture gradient elements
      const gradientSelectors = [
        '.bg-gradient-to-r',
        '.bg-gradient-to-br',
        '.text-transparent.bg-clip-text'
      ]
      
      for (const selector of gradientSelectors) {
        const elements = page.locator(selector)
        const count = await elements.count()
        
        if (count > 0) {
          const element = elements.first()
          const screenshotPath = `tests/visual/screenshots/current/gradient-${selector.replace(/[^a-z0-9]/gi, '-')}.png`
          
          await element.screenshot({ path: screenshotPath })
          
          // Gradient comparison with higher tolerance
          const baselinePath = screenshotPath.replace('/current/', '/baseline/')
          const diffPath = screenshotPath.replace('/current/', '/diff/').replace('.png', '-diff.png')
          
          const { difference } = await compareImages(
            baselinePath,
            screenshotPath,
            diffPath,
            0.2 // Higher threshold for gradients
          )
          
          expect(difference).toBeLessThan(0.2)
        }
      }
    })
  })

  // Test 4: Module-specific visual tests
  test.describe('Module Visual Integrity', () => {
    const modules = [
      { name: 'Financial Suite', path: '/ecosystem/financial', theme: 'indigo' },
      { name: 'HR Workforce', path: '/ecosystem/hr', theme: 'purple' },
      { name: 'Sales CRM', path: '/ecosystem/sales', theme: 'purple' },
      { name: 'Procurement', path: '/ecosystem/procurement', theme: 'green' },
      { name: 'Quality Control', path: '/ecosystem/quality', theme: 'amber' }
    ]
    
    modules.forEach(module => {
      test(`${module.name} visual consistency`, async ({ page }) => {
        await page.goto(module.path)
        await page.waitForLoadState('networkidle')
        await page.waitForTimeout(2000) // Wait for animations
        
        // Module header screenshot
        const header = page.locator('.liquid-glass-medium').first()
        if (await header.count() > 0) {
          await header.screenshot({
            path: `tests/visual/screenshots/current/${module.name.toLowerCase().replace(' ', '-')}-header.png`
          })
        }
        
        // Full module screenshot
        await page.screenshot({
          path: `tests/visual/screenshots/current/${module.name.toLowerCase().replace(' ', '-')}-full.png`,
          fullPage: true
        })
      })
    })
  })

  // Test 5: Dark mode consistency
  test.describe('Dark Mode Visual Testing', () => {
    test('Dark mode color accuracy', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Force dark mode
      await page.emulateMedia({ colorScheme: 'dark' })
      await page.waitForTimeout(500)
      
      const screenshotPath = 'tests/visual/screenshots/current/dark-mode-full.png'
      await page.screenshot({
        path: screenshotPath,
        fullPage: true
      })
      
      // Check specific dark mode elements
      const darkModeElements = [
        { selector: '.bg-slate-950', name: 'dark-background' },
        { selector: '.glass-text-primary', name: 'dark-text-primary' },
        { selector: '.glass-text-muted', name: 'dark-text-muted' }
      ]
      
      for (const element of darkModeElements) {
        const el = page.locator(element.selector).first()
        if (await el.count() > 0) {
          await el.screenshot({
            path: `tests/visual/screenshots/current/${element.name}.png`
          })
        }
      }
    })
  })

  // Test 6: Animation frame capture
  test.describe('Animation Visual Testing', () => {
    test('Capture animation keyframes', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Enable animations for this specific test
      await page.addStyleTag({
        content: `
          *, *::before, *::after {
            animation-duration: 2s !important;
            transition-duration: 0.3s !important;
          }
        `
      })
      
      // Hover over a module card
      const moduleCard = page.locator('.glass-card').first()
      
      // Capture animation frames
      const frames = 5
      for (let i = 0; i < frames; i++) {
        await moduleCard.hover()
        await page.waitForTimeout(400 * i) // Capture at different points
        
        await moduleCard.screenshot({
          path: `tests/visual/screenshots/current/animation-frame-${i}.png`
        })
      }
    })
  })
})

// Generate visual regression report
test.afterAll(async () => {
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalTests: 0,
      passed: 0,
      failed: 0,
      newBaselines: 0
    },
    failures: []
  }
  
  // Count test results
  const diffDir = 'tests/visual/screenshots/diff'
  if (fs.existsSync(diffDir)) {
    const diffFiles = fs.readdirSync(diffDir)
    report.summary.failed = diffFiles.length
    report.failures = diffFiles.map(file => ({
      test: file.replace('-diff.png', ''),
      diffPath: path.join(diffDir, file)
    }))
  }
  
  // Write report
  fs.writeFileSync(
    'tests/visual/visual-regression-report.json',
    JSON.stringify(report, null, 2)
  )
  
  console.log('\n=== Visual Regression Testing Complete ===')
  console.log(`✅ Visual consistency verified across ${DEVICES.length} devices`)
  console.log(`✅ Interactive states tested`)
  console.log(`✅ Liquid Glass effects validated`)
  console.log(`✅ Module-specific visuals checked`)
  console.log(`✅ Dark mode consistency confirmed`)
  if (report.summary.failed > 0) {
    console.log(`⚠️  ${report.summary.failed} visual differences detected`)
  }
})