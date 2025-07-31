import { FullConfig } from '@playwright/test'
import fs from 'fs/promises'
import path from 'path'

/**
 * Global teardown for Vextrus ERP testing
 * Runs once after all tests complete
 */
async function globalTeardown(config: FullConfig) {
  console.log('\n🏁 Vextrus ERP Testing Framework - Global Teardown')
  console.log('==============================================')
  
  try {
    // Read test metadata
    const metadata = JSON.parse(
      await fs.readFile('test-results/metadata.json', 'utf-8')
    )
    
    // Calculate test duration
    const endTime = new Date()
    const startTime = new Date(metadata.startTime)
    const duration = endTime.getTime() - startTime.getTime()
    
    // Aggregate all test results
    const testResults = {
      metadata: {
        ...metadata,
        endTime: endTime.toISOString(),
        duration: duration,
        durationFormatted: formatDuration(duration)
      },
      summary: {
        totalTests: 0,
        passed: 0,
        failed: 0,
        skipped: 0,
        flaky: 0
      },
      modules: {} as Record<string, any>,
      insights: [] as Array<{
        type: string
        category: string
        message: string
        recommendation?: string
      }>
    }
    
    // Read individual test results if they exist
    const resultFiles = [
      'test-results/accessibility-report.json',
      'test-results/performance-report.json',
      'test-results/visual-report.json'
    ]
    
    for (const file of resultFiles) {
      try {
        const content = await fs.readFile(file, 'utf-8')
        const data = JSON.parse(content)
        
        // Aggregate summary
        if (data.summary) {
          testResults.summary.totalTests += data.summary.totalTests || 0
          testResults.summary.passed += data.summary.passed || 0
          testResults.summary.failed += data.summary.failed || 0
          testResults.summary.skipped += data.summary.skipped || 0
        }
        
        // Store module-specific data
        const testType = path.basename(file, '-report.json')
        testResults.modules[testType] = data
      } catch (error) {
        // File might not exist if test didn't run
        console.log(`   ℹ️  No results found for ${path.basename(file)}`)
      }
    }
    
    // Generate insights based on results
    testResults.insights = generateInsights(testResults)
    
    // Write aggregated results
    await fs.writeFile(
      'test-results/final-report.json',
      JSON.stringify(testResults, null, 2)
    )
    
    // Print summary
    console.log('\n📊 Test Summary:')
    console.log(`   Total Tests: ${testResults.summary.totalTests}`)
    console.log(`   ✅ Passed: ${testResults.summary.passed}`)
    console.log(`   ❌ Failed: ${testResults.summary.failed}`)
    console.log(`   ⏭️  Skipped: ${testResults.summary.skipped}`)
    console.log(`   ⏱️  Duration: ${testResults.metadata.durationFormatted}`)
    
    if (testResults.insights.length > 0) {
      console.log('\n💡 Key Insights:')
      testResults.insights.slice(0, 3).forEach(insight => {
        console.log(`   • ${insight.message}`)
      })
    }
    
    // Cleanup temporary files if not in CI
    if (!process.env.CI) {
      console.log('\n🧹 Cleaning up temporary files...')
      // Add cleanup logic here if needed
    }
    
    console.log('\n✨ Testing completed successfully!')
    console.log('==============================================')
    
    // Exit with appropriate code
    if (testResults.summary.failed > 0) {
      process.exit(1)
    }
  } catch (error) {
    console.error('❌ Error in global teardown:', error)
    process.exit(1)
  }
}

function formatDuration(ms: number): string {
  const seconds = Math.floor(ms / 1000)
  const minutes = Math.floor(seconds / 60)
  const hours = Math.floor(minutes / 60)
  
  if (hours > 0) {
    return `${hours}h ${minutes % 60}m ${seconds % 60}s`
  } else if (minutes > 0) {
    return `${minutes}m ${seconds % 60}s`
  } else {
    return `${seconds}s`
  }
}

function generateInsights(results: any): any[] {
  const insights = []
  
  // Performance insights
  if (results.modules.performance) {
    const avgLoadTime = results.modules.performance.summary?.avgLoadTime
    if (avgLoadTime && avgLoadTime > 2000) {
      insights.push({
        type: 'warning',
        category: 'performance',
        message: `Average load time (${(avgLoadTime / 1000).toFixed(1)}s) exceeds 2s target`,
        recommendation: 'Consider code splitting and lazy loading'
      })
    }
  }
  
  // Accessibility insights
  if (results.modules.accessibility) {
    const violations = results.modules.accessibility.summary?.totalViolations
    if (violations && violations > 0) {
      insights.push({
        type: 'critical',
        category: 'accessibility',
        message: `${violations} WCAG violations detected`,
        recommendation: 'Fix color contrast and ARIA labels'
      })
    }
  }
  
  // Visual regression insights
  if (results.modules.visual) {
    const failures = results.modules.visual.summary?.failures
    if (failures && failures > 0) {
      insights.push({
        type: 'warning',
        category: 'visual',
        message: `${failures} visual regression failures`,
        recommendation: 'Review UI changes and update baselines if intentional'
      })
    }
  }
  
  // Success insights
  if (results.summary.failed === 0) {
    insights.push({
      type: 'success',
      category: 'overall',
      message: 'All tests passed successfully! 🎉',
      recommendation: 'Continue maintaining high quality standards'
    })
  }
  
  return insights
}

export default globalTeardown