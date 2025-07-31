import { defineConfig, devices } from '@playwright/test'

/**
 * Vextrus ERP Ecosystem - Playwright Configuration
 * 
 * Comprehensive testing configuration for:
 * - WCAG AA accessibility compliance
 * - Cross-browser performance testing
 * - Visual regression testing
 */

export default defineConfig({
  testDir: './tests',
  
  // Test execution settings
  timeout: 30 * 1000,
  expect: {
    timeout: 5000
  },
  
  // Fail the build on CI if you accidentally left test.only in the source code
  forbidOnly: !!process.env.CI,
  
  // Retry failed tests
  retries: process.env.CI ? 2 : 0,
  
  // Parallel execution
  workers: process.env.CI ? 1 : undefined,
  fullyParallel: true,
  
  // Reporter configuration
  reporter: [
    ['html', { outputFolder: 'playwright-report' }],
    ['json', { outputFile: 'test-results/playwright-results.json' }],
    ['junit', { outputFile: 'test-results/junit.xml' }],
    ['list'],
    ...(process.env.CI ? [['github'] as const] : [])
  ],
  
  // Shared settings for all projects
  use: {
    // Base URL for testing
    baseURL: process.env.BASE_URL || 'http://localhost:3000',
    
    // Collect trace when retrying the failed test
    trace: 'on-first-retry',
    
    // Screenshot on failure
    screenshot: 'only-on-failure',
    
    // Video on failure
    video: 'retain-on-failure',
    
    // Viewport size
    viewport: { width: 1920, height: 1080 },
    
    // Ignore HTTPS errors
    ignoreHTTPSErrors: true,
    
    // Locale and timezone
    locale: 'en-US',
    timezoneId: 'Asia/Dhaka',
    
    // Color scheme
    colorScheme: 'dark',
    
    // Permissions
    permissions: ['geolocation', 'notifications'],
    
    // Extra HTTP headers
    extraHTTPHeaders: {
      'Accept-Language': 'en-US,en;q=0.9,bn;q=0.8'
    }
  },
  
  // Configure projects for different browsers and devices
  projects: [
    // Desktop browsers
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'edge',
      use: { ...devices['Desktop Edge'] },
    },
    
    // Mobile devices
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 7'] },
    },
    {
      name: 'Mobile Safari',
      use: { ...devices['iPhone 14 Pro'] },
    },
    
    // Tablets
    {
      name: 'iPad',
      use: { ...devices['iPad Pro'] },
    },
    {
      name: 'iPad Mini',
      use: { ...devices['iPad Mini'] },
    },
    
    // Accessibility testing with screen reader simulation
    {
      name: 'accessibility',
      use: {
        ...devices['Desktop Chrome'],
        // Simulate screen reader
        hasTouch: false,
        isMobile: false,
        javaScriptEnabled: true,
        // Force high contrast mode
        colorScheme: 'dark'
      },
    },
    
    // Performance testing configuration
    {
      name: 'performance',
      use: {
        ...devices['Desktop Chrome'],
        // Simulate slow network
        offline: false,
        // Performance specific settings
        launchOptions: {
          args: [
            '--enable-precise-memory-info',
            '--disable-web-security',
            '--disable-features=IsolateOrigins,site-per-process'
          ]
        }
      },
    },
    
    // Visual regression specific
    {
      name: 'visual',
      use: {
        ...devices['Desktop Chrome'],
        // Disable animations for consistent screenshots
        launchOptions: {
          args: ['--force-prefers-reduced-motion']
        },
        // Screenshot settings
        screenshot: {
          mode: 'only-on-failure',
          fullPage: true
        }
      },
    }
  ],
  
  // Web server configuration
  webServer: {
    command: 'npm run dev',
    port: 3000,
    timeout: 120 * 1000,
    reuseExistingServer: !process.env.CI,
  },
  
  // Output folder for test artifacts
  outputDir: 'test-results/',
  
  // Global setup and teardown
  globalSetup: require.resolve('./tests/global-setup.ts'),
  globalTeardown: require.resolve('./tests/global-teardown.ts'),
})