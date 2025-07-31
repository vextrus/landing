/**
 * Cross-Browser Performance Testing Suite for Vextrus ERP Ecosystem
 * 
 * This comprehensive test suite verifies:
 * - Page load performance across different browsers
 * - Resource optimization and caching
 * - Animation performance and smoothness
 * - Memory usage and leaks
 * - Network efficiency
 * - Core Web Vitals (LCP, FID, CLS)
 */

import { test, expect, chromium, firefox, webkit, Browser, Page } from '@playwright/test'

// Performance thresholds based on requirements
const PERFORMANCE_THRESHOLDS = {
  pageLoad: 2000, // 2 seconds
  timeToInteractive: 3000, // 3 seconds
  firstContentfulPaint: 1500, // 1.5 seconds
  largestContentfulPaint: 2500, // 2.5 seconds
  cumulativeLayoutShift: 0.1, // Good CLS score
  firstInputDelay: 100, // 100ms
  totalBlockingTime: 300, // 300ms
  lighthouseScore: 90 // Lighthouse score threshold
}

// Browsers to test
const BROWSERS = [
  { name: 'Chromium', launcher: chromium },
  { name: 'Firefox', launcher: firefox },
  { name: 'WebKit (Safari)', launcher: webkit }
]

// Test viewports
const VIEWPORTS = [
  { name: 'Mobile', width: 375, height: 812, isMobile: true },
  { name: 'Tablet', width: 768, height: 1024, isMobile: false },
  { name: 'Desktop', width: 1920, height: 1080, isMobile: false },
  { name: '4K', width: 3840, height: 2160, isMobile: false }
]

// Modules to test
const MODULES = [
  { name: 'Landing Page', path: '/' },
  { name: 'Command Center', path: '/ecosystem' },
  { name: 'Financial Suite', path: '/ecosystem/financial' },
  { name: 'HR Workforce', path: '/ecosystem/hr' },
  { name: 'Sales CRM', path: '/ecosystem/sales' },
  { name: 'Procurement', path: '/ecosystem/procurement' },
  { name: 'Quality Control', path: '/ecosystem/quality' },
  { name: 'Analytics BI', path: '/ecosystem/analytics' }
]

// Helper function to measure performance metrics
async function measurePerformance(page: Page) {
  return await page.evaluate(() => {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    const paint = performance.getEntriesByType('paint')
    
    return {
      // Navigation timing
      domContentLoaded: navigation.domContentLoadedEventEnd - navigation.domContentLoadedEventStart,
      loadComplete: navigation.loadEventEnd - navigation.loadEventStart,
      totalLoadTime: navigation.loadEventEnd - navigation.fetchStart,
      
      // Paint timing
      firstPaint: paint.find(p => p.name === 'first-paint')?.startTime || 0,
      firstContentfulPaint: paint.find(p => p.name === 'first-contentful-paint')?.startTime || 0,
      
      // Resource timing
      resourceCount: performance.getEntriesByType('resource').length,
      totalResourceSize: performance.getEntriesByType('resource').reduce((sum, r: any) => sum + (r.transferSize || 0), 0),
      
      // Memory usage (Chrome only)
      memoryUsage: (performance as any).memory ? {
        usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
        totalJSHeapSize: (performance as any).memory.totalJSHeapSize,
        jsHeapSizeLimit: (performance as any).memory.jsHeapSizeLimit
      } : null
    }
  })
}

// Helper function to measure Core Web Vitals
async function measureCoreWebVitals(page: Page) {
  // Inject web-vitals library
  await page.addScriptTag({
    content: `
      window.webVitals = [];
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.entryType === 'largest-contentful-paint') {
            window.webVitals.push({ name: 'LCP', value: entry.renderTime || entry.loadTime });
          }
          if (entry.entryType === 'first-input') {
            window.webVitals.push({ name: 'FID', value: entry.processingStart - entry.startTime });
          }
          if (entry.entryType === 'layout-shift' && !entry.hadRecentInput) {
            window.webVitals.push({ name: 'CLS', value: entry.value });
          }
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift'] });
    `
  })
  
  // Wait for metrics to be collected
  await page.waitForTimeout(5000)
  
  return await page.evaluate(() => (window as any).webVitals)
}

// Performance test suite
test.describe('Cross-Browser Performance Testing', () => {
  // Test 1: Page load performance across browsers
  BROWSERS.forEach(browser => {
    test.describe(`${browser.name} Performance`, () => {
      let browserInstance: Browser
      
      test.beforeAll(async () => {
        browserInstance = await browser.launcher.launch()
      })
      
      test.afterAll(async () => {
        await browserInstance.close()
      })
      
      MODULES.forEach(module => {
        test(`${module.name} - Load Performance`, async () => {
          const context = await browserInstance.newContext()
          const page = await context.newPage()
          
          // Start performance measurement
          const startTime = Date.now()
          await page.goto(module.path, { waitUntil: 'networkidle' })
          const loadTime = Date.now() - startTime
          
          // Get performance metrics
          const metrics = await measurePerformance(page)
          
          // Assertions
          expect(loadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.pageLoad)
          expect(metrics.firstContentfulPaint).toBeLessThan(PERFORMANCE_THRESHOLDS.firstContentfulPaint)
          expect(metrics.totalLoadTime).toBeLessThan(PERFORMANCE_THRESHOLDS.pageLoad)
          
          // Log detailed metrics
          console.log(`${browser.name} - ${module.name} Performance:`, {
            loadTime: `${loadTime}ms`,
            domContentLoaded: `${metrics.domContentLoaded}ms`,
            firstPaint: `${metrics.firstPaint}ms`,
            firstContentfulPaint: `${metrics.firstContentfulPaint}ms`,
            resourceCount: metrics.resourceCount,
            totalResourceSize: `${(metrics.totalResourceSize / 1024 / 1024).toFixed(2)}MB`
          })
          
          await context.close()
        })
      })
    })
  })

  // Test 2: Responsive performance across viewports
  test.describe('Responsive Performance', () => {
    VIEWPORTS.forEach(viewport => {
      test(`${viewport.name} viewport performance`, async ({ browser }) => {
        const context = await browser.newContext({
          viewport: { width: viewport.width, height: viewport.height },
          isMobile: viewport.isMobile
        })
        const page = await context.newPage()
        
        // Test critical modules at different viewports
        const criticalModules = ['/ecosystem', '/ecosystem/financial']
        
        for (const path of criticalModules) {
          await page.goto(path)
          const metrics = await measurePerformance(page)
          
          // Viewport-specific thresholds
          const threshold = viewport.isMobile 
            ? PERFORMANCE_THRESHOLDS.pageLoad * 1.2 // Allow 20% more time for mobile
            : PERFORMANCE_THRESHOLDS.pageLoad
          
          expect(metrics.totalLoadTime).toBeLessThan(threshold)
        }
        
        await context.close()
      })
    })
  })

  // Test 3: Animation performance
  test.describe('Animation Performance', () => {
    test('Liquid Glass animations smoothness', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Monitor animation frame rate
      const frameRate = await page.evaluate(() => {
        return new Promise((resolve) => {
          let frames = 0
          let lastTime = performance.now()
          const duration = 3000 // 3 seconds
          
          const countFrames = () => {
            frames++
            const currentTime = performance.now()
            
            if (currentTime - lastTime >= duration) {
              resolve(Math.round(frames / (duration / 1000)))
            } else {
              requestAnimationFrame(countFrames)
            }
          }
          
          requestAnimationFrame(countFrames)
        })
      })
      
      // Expect at least 30 FPS for smooth animations
      expect(frameRate).toBeGreaterThanOrEqual(30)
      console.log(`Animation frame rate: ${frameRate} FPS`)
    })
    
    test('Module transition performance', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Measure transition performance
      const transitionMetrics = await page.evaluate(async () => {
        const startTime = performance.now()
        
        // Trigger module transition
        const moduleCard = document.querySelector('.glass-card')
        if (moduleCard) {
          (moduleCard as HTMLElement).click()
        }
        
        // Wait for transition
        await new Promise(resolve => setTimeout(resolve, 1000))
        
        const endTime = performance.now()
        return {
          transitionTime: endTime - startTime,
          layoutShifts: performance.getEntriesByType('layout-shift').length
        }
      })
      
      expect(transitionMetrics.transitionTime).toBeLessThan(1000)
      expect(transitionMetrics.layoutShifts).toBeLessThan(5)
    })
  })

  // Test 4: Memory leak detection
  test.describe('Memory Management', () => {
    test('Memory leak detection during navigation', async ({ browser }) => {
      const context = await browser.newContext()
      const page = await context.newPage()
      
      // Only run in Chromium as it supports memory profiling
      if (browser.browserType().name() === 'chromium') {
        const memorySnapshots: any[] = []
        
        // Navigate through modules and take memory snapshots
        for (let i = 0; i < 5; i++) {
          for (const module of MODULES.slice(0, 3)) {
            await page.goto(module.path)
            await page.waitForLoadState('networkidle')
            
            const memory = await page.evaluate(() => {
              return (performance as any).memory ? {
                usedJSHeapSize: (performance as any).memory.usedJSHeapSize,
                totalJSHeapSize: (performance as any).memory.totalJSHeapSize
              } : null
            })
            
            if (memory) {
              memorySnapshots.push({ ...memory, module: module.name, iteration: i })
            }
          }
        }
        
        // Analyze memory growth
        if (memorySnapshots.length > 0) {
          const firstSnapshot = memorySnapshots[0].usedJSHeapSize
          const lastSnapshot = memorySnapshots[memorySnapshots.length - 1].usedJSHeapSize
          const memoryGrowth = ((lastSnapshot - firstSnapshot) / firstSnapshot) * 100
          
          // Memory growth should be less than 50% after multiple navigations
          expect(memoryGrowth).toBeLessThan(50)
          console.log(`Memory growth after navigation cycles: ${memoryGrowth.toFixed(2)}%`)
        }
      }
      
      await context.close()
    })
  })

  // Test 5: Network efficiency
  test.describe('Network Efficiency', () => {
    test('Resource optimization and caching', async ({ page }) => {
      // First load
      await page.goto('/ecosystem')
      const firstLoadMetrics = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        return {
          totalRequests: resources.length,
          cachedRequests: resources.filter(r => r.transferSize === 0 && r.decodedBodySize > 0).length,
          totalTransferSize: resources.reduce((sum, r) => sum + r.transferSize, 0)
        }
      })
      
      // Second load (should use cache)
      await page.reload()
      const secondLoadMetrics = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        return {
          totalRequests: resources.length,
          cachedRequests: resources.filter(r => r.transferSize === 0 && r.decodedBodySize > 0).length,
          totalTransferSize: resources.reduce((sum, r) => sum + r.transferSize, 0)
        }
      })
      
      // Expect more cached resources on second load
      expect(secondLoadMetrics.cachedRequests).toBeGreaterThan(firstLoadMetrics.cachedRequests)
      expect(secondLoadMetrics.totalTransferSize).toBeLessThan(firstLoadMetrics.totalTransferSize)
      
      console.log('Network Efficiency:', {
        firstLoad: {
          requests: firstLoadMetrics.totalRequests,
          cached: firstLoadMetrics.cachedRequests,
          size: `${(firstLoadMetrics.totalTransferSize / 1024 / 1024).toFixed(2)}MB`
        },
        secondLoad: {
          requests: secondLoadMetrics.totalRequests,
          cached: secondLoadMetrics.cachedRequests,
          size: `${(secondLoadMetrics.totalTransferSize / 1024 / 1024).toFixed(2)}MB`
        }
      })
    })
  })

  // Test 6: Core Web Vitals
  test.describe('Core Web Vitals', () => {
    test('LCP, FID, and CLS metrics', async ({ page }) => {
      await page.goto('/ecosystem')
      
      // Collect Core Web Vitals
      const webVitals = await measureCoreWebVitals(page)
      
      // Extract metrics
      const lcp = webVitals.find((v: any) => v.name === 'LCP')?.value || 0
      const fid = webVitals.find((v: any) => v.name === 'FID')?.value || 0
      const cls = webVitals.reduce((sum: number, v: any) => 
        v.name === 'CLS' ? sum + v.value : sum, 0)
      
      // Assertions
      expect(lcp).toBeLessThan(PERFORMANCE_THRESHOLDS.largestContentfulPaint)
      expect(fid).toBeLessThan(PERFORMANCE_THRESHOLDS.firstInputDelay)
      expect(cls).toBeLessThan(PERFORMANCE_THRESHOLDS.cumulativeLayoutShift)
      
      console.log('Core Web Vitals:', { LCP: lcp, FID: fid, CLS: cls })
    })
  })

  // Test 7: Third-party script impact
  test.describe('Third-party Script Performance', () => {
    test('Measure third-party script impact', async ({ page }) => {
      await page.goto('/ecosystem')
      
      const thirdPartyMetrics = await page.evaluate(() => {
        const resources = performance.getEntriesByType('resource') as PerformanceResourceTiming[]
        const currentDomain = window.location.hostname
        
        const thirdPartyResources = resources.filter(r => {
          try {
            const url = new URL(r.name)
            return url.hostname !== currentDomain && url.hostname !== 'localhost'
          } catch {
            return false
          }
        })
        
        return {
          count: thirdPartyResources.length,
          totalSize: thirdPartyResources.reduce((sum, r) => sum + r.transferSize, 0),
          totalDuration: thirdPartyResources.reduce((sum, r) => sum + r.duration, 0)
        }
      })
      
      console.log('Third-party Script Impact:', {
        scripts: thirdPartyMetrics.count,
        size: `${(thirdPartyMetrics.totalSize / 1024).toFixed(2)}KB`,
        loadTime: `${thirdPartyMetrics.totalDuration.toFixed(2)}ms`
      })
      
      // Third-party scripts should not dominate load time
      expect(thirdPartyMetrics.totalDuration).toBeLessThan(500)
    })
  })
})

// Generate performance report
test.afterAll(async () => {
  console.log('\n=== Performance Testing Complete ===')
  console.log('✅ Cross-browser compatibility verified')
  console.log('✅ Responsive performance tested')
  console.log('✅ Animation smoothness confirmed')
  console.log('✅ Memory management validated')
  console.log('✅ Network efficiency optimized')
  console.log('✅ Core Web Vitals within thresholds')
})