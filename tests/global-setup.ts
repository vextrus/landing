import { FullConfig } from '@playwright/test'
import fs from 'fs/promises'
import path from 'path'

/**
 * Global setup for Vextrus ERP testing
 * Runs once before all tests
 */
async function globalSetup(config: FullConfig) {
  console.log('🚀 Vextrus ERP Testing Framework - Global Setup')
  console.log('============================================')
  
  // Create necessary directories
  const directories = [
    'test-results',
    'test-results/accessibility',
    'test-results/performance',
    'test-results/visual',
    'tests/visual/screenshots/baseline',
    'tests/visual/screenshots/current',
    'tests/visual/screenshots/diff'
  ]
  
  for (const dir of directories) {
    await fs.mkdir(dir, { recursive: true })
    console.log(`✅ Created directory: ${dir}`)
  }
  
  // Initialize test metadata
  const metadata = {
    startTime: new Date().toISOString(),
    environment: {
      node: process.version,
      platform: process.platform,
      ci: !!process.env.CI,
      branch: process.env.GITHUB_REF || 'local',
      commit: process.env.GITHUB_SHA || 'local'
    },
    config: {
      baseURL: config.projects[0].use?.baseURL || 'http://localhost:3000',
      workers: config.workers,
      projects: config.projects.length
    }
  }
  
  await fs.writeFile(
    'test-results/metadata.json',
    JSON.stringify(metadata, null, 2)
  )
  
  console.log('\n📋 Test Configuration:')
  console.log(`   Base URL: ${metadata.config.baseURL}`)
  console.log(`   Workers: ${metadata.config.workers || 'auto'}`)
  console.log(`   Projects: ${metadata.config.projects}`)
  console.log(`   Environment: ${metadata.environment.ci ? 'CI' : 'Local'}`)
  
  // Check for required environment variables
  const requiredEnvVars = ['BASE_URL']
  const missingEnvVars = requiredEnvVars.filter(v => !process.env[v])
  
  if (missingEnvVars.length > 0 && !process.env.CI) {
    console.log('\n⚠️  Missing environment variables:')
    missingEnvVars.forEach(v => console.log(`   - ${v}`))
    console.log('\n   Using defaults for local development')
  }
  
  // Initialize performance baseline
  const performanceBaseline = {
    modules: {
      'Command Center': { loadTime: 1500, lcp: 2000, fid: 100, cls: 0.1 },
      'Financial Suite': { loadTime: 1800, lcp: 2200, fid: 120, cls: 0.08 },
      'HR Workforce': { loadTime: 1700, lcp: 2100, fid: 110, cls: 0.09 },
      'Sales CRM': { loadTime: 1600, lcp: 2000, fid: 100, cls: 0.07 },
      'Procurement': { loadTime: 1900, lcp: 2300, fid: 130, cls: 0.11 },
      'Quality Control': { loadTime: 1750, lcp: 2150, fid: 115, cls: 0.095 }
    }
  }
  
  await fs.writeFile(
    'test-results/performance-baseline.json',
    JSON.stringify(performanceBaseline, null, 2)
  )
  
  console.log('\n✨ Global setup completed successfully!')
  console.log('============================================\n')
}

export default globalSetup