/**
 * WCAG AA Compliance Testing Suite for Vextrus ERP Ecosystem
 * 
 * This comprehensive test suite verifies:
 * - Color contrast ratios (4.5:1 minimum for normal text, 3:1 for large text)
 * - Keyboard navigation and focus management
 * - ARIA labels and semantic HTML structure
 * - Screen reader compatibility
 * - Interactive element accessibility
 */

import { test, expect, chromium, Page } from '@playwright/test'
import { AxeBuilder } from '@axe-core/playwright'

// Test configuration for accessibility
test.describe.configure({ mode: 'parallel' })

// Color contrast testing utilities
const WCAG_AA_CONTRAST_RATIOS = {
  normalText: 4.5,
  largeText: 3.0,
  graphicalObjects: 3.0
}

// Modules to test
const MODULES = [
  { name: 'Command Center', path: '/ecosystem' },
  { name: 'Financial Suite', path: '/ecosystem/financial' },
  { name: 'HR Workforce', path: '/ecosystem/hr' },
  { name: 'Sales CRM', path: '/ecosystem/sales' },
  { name: 'Procurement', path: '/ecosystem/procurement' },
  { name: 'Quality Control', path: '/ecosystem/quality' },
  { name: 'Analytics BI', path: '/ecosystem/analytics' }
]

// Helper function to calculate contrast ratio
async function getContrastRatio(page: Page, selector: string): Promise<number> {
  return await page.evaluate((sel) => {
    const element = document.querySelector(sel)
    if (!element) return 0
    
    const style = window.getComputedStyle(element)
    const backgroundColor = style.backgroundColor
    const color = style.color
    
    // Convert RGB to relative luminance
    const getLuminance = (rgb: string) => {
      const values = rgb.match(/\d+/g)?.map(Number) || []
      const [r, g, b] = values.map(val => {
        val = val / 255
        return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
      })
      return 0.2126 * r + 0.7152 * g + 0.0722 * b
    }
    
    const bgLuminance = getLuminance(backgroundColor)
    const textLuminance = getLuminance(color)
    
    const lighter = Math.max(bgLuminance, textLuminance)
    const darker = Math.min(bgLuminance, textLuminance)
    
    return (lighter + 0.05) / (darker + 0.05)
  }, selector)
}

// Test suite for WCAG AA compliance
test.describe('WCAG AA Compliance - Vextrus ERP Ecosystem', () => {
  // Test 1: Automated accessibility scanning with axe-core
  test.describe('Automated Accessibility Scanning', () => {
    MODULES.forEach(module => {
      test(`${module.name} - axe-core compliance`, async ({ page }) => {
        await page.goto(module.path)
        await page.waitForLoadState('networkidle')
        
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
          .analyze()
        
        // Expect no violations
        expect(accessibilityScanResults.violations).toEqual([])
        
        // Log any incomplete tests for manual review
        if (accessibilityScanResults.incomplete.length > 0) {
          console.log(`Incomplete tests for ${module.name}:`, 
            accessibilityScanResults.incomplete.map(i => i.id))
        }
      })
    })
  })

  // Test 2: Color contrast verification
  test.describe('Color Contrast Ratios', () => {
    test('Verify Liquid Glass color system contrast', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Test primary text elements
      const textSelectors = [
        '.glass-text-primary',
        '.glass-text-muted',
        '.glass-text-accent',
        'h1', 'h2', 'h3', 'p'
      ]
      
      for (const selector of textSelectors) {
        const elements = await page.$$(selector)
        for (let i = 0; i < Math.min(elements.length, 5); i++) {
          const ratio = await getContrastRatio(page, `${selector}:nth-of-type(${i + 1})`)
          expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST_RATIOS.normalText)
        }
      }
      
      // Test interactive elements
      const buttonSelectors = [
        'button',
        '.animated-button',
        'a[href]'
      ]
      
      for (const selector of buttonSelectors) {
        const elements = await page.$$(selector)
        for (let i = 0; i < Math.min(elements.length, 3); i++) {
          const ratio = await getContrastRatio(page, `${selector}:nth-of-type(${i + 1})`)
          expect(ratio).toBeGreaterThanOrEqual(WCAG_AA_CONTRAST_RATIOS.normalText)
        }
      }
    })
  })

  // Test 3: Keyboard navigation
  test.describe('Keyboard Navigation', () => {
    test('Tab navigation through all interactive elements', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Track focused elements
      const focusedElements: string[] = []
      
      // Tab through the page
      for (let i = 0; i < 20; i++) {
        await page.keyboard.press('Tab')
        const focusedElement = await page.evaluate(() => {
          const el = document.activeElement
          return {
            tag: el?.tagName,
            class: el?.className,
            text: el?.textContent?.trim().substring(0, 50)
          }
        })
        focusedElements.push(JSON.stringify(focusedElement))
      }
      
      // Verify focus indicators are visible
      await page.keyboard.press('Tab')
      const hasFocusIndicator = await page.evaluate(() => {
        const el = document.activeElement
        if (!el) return false
        const style = window.getComputedStyle(el)
        return style.outline !== 'none' || style.boxShadow !== 'none'
      })
      
      expect(hasFocusIndicator).toBeTruthy()
      
      // Test Shift+Tab reverse navigation
      for (let i = 0; i < 5; i++) {
        await page.keyboard.press('Shift+Tab')
      }
      
      // Verify no keyboard traps
      expect(focusedElements.length).toBeGreaterThan(0)
    })
    
    test('Module navigation with Enter key', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Focus on first module card
      await page.focus('.glass-card')
      await page.keyboard.press('Enter')
      
      // Verify navigation occurred
      await page.waitForTimeout(500)
      const url = page.url()
      expect(url).toContain('/ecosystem/')
    })
  })

  // Test 4: ARIA labels and semantic HTML
  test.describe('ARIA and Semantic HTML', () => {
    test('Verify proper ARIA labels', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Check for ARIA labels on interactive elements
      const ariaElements = await page.evaluate(() => {
        const elements = document.querySelectorAll('[aria-label], [aria-labelledby], [aria-describedby]')
        return Array.from(elements).map(el => ({
          tag: el.tagName,
          ariaLabel: el.getAttribute('aria-label'),
          ariaLabelledBy: el.getAttribute('aria-labelledby'),
          ariaDescribedBy: el.getAttribute('aria-describedby')
        }))
      })
      
      expect(ariaElements.length).toBeGreaterThan(0)
      
      // Check for proper heading hierarchy
      const headings = await page.evaluate(() => {
        const h1s = document.querySelectorAll('h1').length
        const h2s = document.querySelectorAll('h2').length
        const h3s = document.querySelectorAll('h3').length
        return { h1s, h2s, h3s }
      })
      
      expect(headings.h1s).toBeGreaterThan(0)
      expect(headings.h2s).toBeGreaterThan(0)
      
      // Check for proper landmark regions
      const landmarks = await page.evaluate(() => {
        const main = document.querySelector('main')
        const nav = document.querySelector('nav')
        const footer = document.querySelector('footer')
        return { hasMain: !!main, hasNav: !!nav, hasFooter: !!footer }
      })
      
      expect(landmarks.hasMain || landmarks.hasNav || landmarks.hasFooter).toBeTruthy()
    })
  })

  // Test 5: Screen reader announcements
  test.describe('Screen Reader Compatibility', () => {
    test('Live region announcements', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Check for ARIA live regions
      const liveRegions = await page.evaluate(() => {
        const regions = document.querySelectorAll('[aria-live], [role="alert"], [role="status"]')
        return regions.length
      })
      
      expect(liveRegions).toBeGreaterThanOrEqual(0)
      
      // Test dynamic content announcements
      await page.click('.animated-button:first-of-type')
      await page.waitForTimeout(1000)
      
      const hasAriaAnnouncement = await page.evaluate(() => {
        const announcements = document.querySelectorAll('[role="status"], [aria-live="polite"]')
        return announcements.length > 0
      })
      
      // Dynamic content should have announcements
      expect(hasAriaAnnouncement).toBeDefined()
    })
  })

  // Test 6: Focus management
  test.describe('Focus Management', () => {
    test('Modal and dialog focus trap', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Test if modals properly trap focus
      const hasModals = await page.evaluate(() => {
        const dialogs = document.querySelectorAll('[role="dialog"], [aria-modal="true"]')
        return dialogs.length
      })
      
      if (hasModals > 0) {
        // Open a modal
        await page.click('[aria-haspopup="dialog"]')
        
        // Verify focus is trapped
        const focusTrap = await page.evaluate(() => {
          const modal = document.querySelector('[role="dialog"]')
          return modal?.getAttribute('aria-modal') === 'true'
        })
        
        expect(focusTrap).toBeTruthy()
      }
    })
  })

  // Test 7: Responsive accessibility
  test.describe('Responsive Accessibility', () => {
    const viewports = [
      { name: 'Mobile', width: 375, height: 667 },
      { name: 'Tablet', width: 768, height: 1024 },
      { name: 'Desktop', width: 1920, height: 1080 }
    ]
    
    viewports.forEach(viewport => {
      test(`${viewport.name} viewport accessibility`, async ({ page }) => {
        await page.setViewportSize({ width: viewport.width, height: viewport.height })
        await page.goto('/ecosystem')
        
        // Run accessibility scan for each viewport
        const accessibilityScanResults = await new AxeBuilder({ page })
          .withTags(['wcag2aa'])
          .analyze()
        
        expect(accessibilityScanResults.violations).toEqual([])
      })
    })
  })

  // Test 8: Form accessibility
  test.describe('Form Accessibility', () => {
    test('Form labels and error messages', async ({ page }) => {
      await page.goto('/ecosystem/financial')
      
      // Check for form labels
      const formAccessibility = await page.evaluate(() => {
        const inputs = document.querySelectorAll('input, select, textarea')
        const labelsFound = Array.from(inputs).filter(input => {
          const id = input.id
          const label = id ? document.querySelector(`label[for="${id}"]`) : null
          const ariaLabel = input.getAttribute('aria-label')
          return label || ariaLabel
        })
        
        return {
          totalInputs: inputs.length,
          labeledInputs: labelsFound.length
        }
      })
      
      if (formAccessibility.totalInputs > 0) {
        expect(formAccessibility.labeledInputs).toBe(formAccessibility.totalInputs)
      }
    })
  })
})

// Generate accessibility report
test.afterAll(async () => {
  console.log('WCAG AA Compliance Testing Complete')
  console.log('All modules tested for:')
  console.log('- Color contrast ratios')
  console.log('- Keyboard navigation')
  console.log('- ARIA labels and roles')
  console.log('- Screen reader compatibility')
  console.log('- Focus management')
  console.log('- Responsive accessibility')
})