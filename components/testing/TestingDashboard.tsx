'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Shield, 
  Zap, 
  Eye, 
  Check, 
  X, 
  AlertCircle,
  Activity,
  BarChart3,
  Globe,
  Monitor,
  Smartphone,
  Tablet,
  Clock,
  TrendingUp,
  TrendingDown,
  RefreshCw,
  Download,
  Brain,
  Sparkles
} from 'lucide-react'
import { GlassCard, AnimatedButton } from '../ecosystem/shared/ui'

// Test result interfaces
interface AccessibilityResult {
  module: string
  score: number
  violations: number
  passes: number
  warnings: number
  contrastRatio: number
  keyboardNav: boolean
  ariaCompliance: boolean
}

interface PerformanceResult {
  module: string
  browser: string
  loadTime: number
  fcp: number // First Contentful Paint
  lcp: number // Largest Contentful Paint
  fid: number // First Input Delay
  cls: number // Cumulative Layout Shift
  tbt: number // Total Blocking Time
  memoryUsage: number
  fps: number
}

interface VisualRegressionResult {
  module: string
  device: string
  match: boolean
  difference: number
  screenshotPath: string
  diffPath?: string
}

// Mock real-time data generator
const generateMockData = () => {
  const modules = ['Command Center', 'Financial Suite', 'HR Workforce', 'Sales CRM', 'Procurement', 'Quality Control']
  const browsers = ['Chrome', 'Firefox', 'Safari', 'Edge']
  const devices = ['Desktop', 'Tablet', 'Mobile']
  
  const accessibility: AccessibilityResult[] = modules.map(module => ({
    module,
    score: Math.floor(Math.random() * 10 + 90),
    violations: Math.floor(Math.random() * 3),
    passes: Math.floor(Math.random() * 50 + 150),
    warnings: Math.floor(Math.random() * 5),
    contrastRatio: parseFloat((Math.random() * 2 + 4.5).toFixed(1)),
    keyboardNav: Math.random() > 0.1,
    ariaCompliance: Math.random() > 0.05
  }))
  
  const performance: PerformanceResult[] = []
  modules.forEach(module => {
    browsers.forEach(browser => {
      performance.push({
        module,
        browser,
        loadTime: Math.floor(Math.random() * 1000 + 800),
        fcp: Math.floor(Math.random() * 800 + 400),
        lcp: Math.floor(Math.random() * 1500 + 1000),
        fid: Math.floor(Math.random() * 50 + 20),
        cls: parseFloat((Math.random() * 0.05).toFixed(3)),
        tbt: Math.floor(Math.random() * 200 + 100),
        memoryUsage: Math.floor(Math.random() * 50 + 30),
        fps: Math.floor(Math.random() * 15 + 45)
      })
    })
  })
  
  const visualRegression: VisualRegressionResult[] = []
  modules.forEach(module => {
    devices.forEach(device => {
      const hasMatch = Math.random() > 0.2
      visualRegression.push({
        module,
        device,
        match: hasMatch,
        difference: hasMatch ? 0 : parseFloat((Math.random() * 0.1).toFixed(3)),
        screenshotPath: `/screenshots/${module.toLowerCase().replace(' ', '-')}-${device.toLowerCase()}.png`,
        diffPath: hasMatch ? undefined : `/screenshots/diff/${module.toLowerCase().replace(' ', '-')}-${device.toLowerCase()}.png`
      })
    })
  })
  
  return { accessibility, performance, visualRegression }
}

export default function TestingDashboard() {
  const [activeView, setActiveView] = useState<'overview' | 'accessibility' | 'performance' | 'visual'>('overview')
  const [testData, setTestData] = useState(generateMockData())
  const [isRunning, setIsRunning] = useState(false)
  const [lastUpdate, setLastUpdate] = useState(new Date())
  
  // Simulate real-time updates
  useEffect(() => {
    if (isRunning) {
      const interval = setInterval(() => {
        setTestData(generateMockData())
        setLastUpdate(new Date())
      }, 5000)
      
      return () => clearInterval(interval)
    }
  }, [isRunning])
  
  // Calculate aggregate metrics
  const aggregateMetrics = {
    accessibilityScore: Math.round(testData.accessibility.reduce((acc, r) => acc + r.score, 0) / testData.accessibility.length),
    totalViolations: testData.accessibility.reduce((acc, r) => acc + r.violations, 0),
    avgLoadTime: Math.round(testData.performance.reduce((acc, r) => acc + r.loadTime, 0) / testData.performance.length),
    visualMatches: testData.visualRegression.filter(r => r.match).length,
    totalTests: testData.visualRegression.length
  }
  
  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-400'
    if (score >= 80) return 'text-yellow-400'
    return 'text-red-400'
  }
  
  const getPerformanceGrade = (value: number, metric: string) => {
    const thresholds: Record<string, { good: number, needs: number }> = {
      loadTime: { good: 1500, needs: 3000 },
      fcp: { good: 1000, needs: 2000 },
      lcp: { good: 2500, needs: 4000 },
      fid: { good: 100, needs: 300 },
      cls: { good: 0.1, needs: 0.25 },
      tbt: { good: 300, needs: 600 }
    }
    
    const threshold = thresholds[metric]
    if (!threshold) return 'text-gray-400'
    
    if (value <= threshold.good) return 'text-green-400'
    if (value <= threshold.needs) return 'text-yellow-400'
    return 'text-red-400'
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div
              className="p-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-400/30"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Brain className="w-8 h-8 text-purple-400" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                Vextrus Testing Dashboard
              </h1>
              <p className="text-sm text-gray-400">Real-time monitoring of WCAG AA compliance & performance</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-xs text-gray-500">Last Updated</p>
              <p className="text-sm font-mono">{lastUpdate.toLocaleTimeString()}</p>
            </div>
            
            <AnimatedButton
              onClick={() => setIsRunning(!isRunning)}
              variant={isRunning ? 'success' : 'primary'}
              size="md"
              pulse={isRunning}
            >
              {isRunning ? (
                <>
                  <Activity className="w-4 h-4 animate-pulse" />
                  Running
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Start Tests
                </>
              )}
            </AnimatedButton>
            
            <AnimatedButton
              onClick={() => {}}
              variant="ghost"
              size="md"
            >
              <Download className="w-4 h-4" />
              Export Report
            </AnimatedButton>
          </div>
        </div>
      </motion.div>
      
      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="flex gap-3 mb-8"
      >
        {[
          { id: 'overview', label: 'Overview', icon: BarChart3 },
          { id: 'accessibility', label: 'Accessibility', icon: Shield },
          { id: 'performance', label: 'Performance', icon: Zap },
          { id: 'visual', label: 'Visual Regression', icon: Eye }
        ].map((view) => (
          <AnimatedButton
            key={view.id}
            onClick={() => setActiveView(view.id as any)}
            variant={activeView === view.id ? 'liquid' : 'ghost'}
            size="sm"
            className={activeView === view.id ? 'bg-gradient-to-r from-purple-500/90 to-pink-600/90' : ''}
          >
            <view.icon className="w-4 h-4" />
            {view.label}
          </AnimatedButton>
        ))}
      </motion.div>
      
      {/* Content */}
      <AnimatePresence mode="wait">
        {activeView === 'overview' && (
          <motion.div
            key="overview"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {/* Metric Cards */}
            <GlassCard variant="liquid" intensity="strong" glow className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Shield className="w-8 h-8 text-purple-400" />
                <motion.div
                  className={`text-3xl font-bold ${getScoreColor(aggregateMetrics.accessibilityScore)}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  {aggregateMetrics.accessibilityScore}%
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold mb-1">WCAG AA Score</h3>
              <p className="text-sm text-gray-400">
                {aggregateMetrics.totalViolations} violations found
              </p>
              <div className="mt-4 h-2 bg-gray-800 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
                  initial={{ width: 0 }}
                  animate={{ width: `${aggregateMetrics.accessibilityScore}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            </GlassCard>
            
            <GlassCard variant="liquid" intensity="strong" glow className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Zap className="w-8 h-8 text-cyan-400" />
                <motion.div
                  className={`text-3xl font-bold ${getPerformanceGrade(aggregateMetrics.avgLoadTime, 'loadTime')}`}
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                >
                  {(aggregateMetrics.avgLoadTime / 1000).toFixed(1)}s
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Avg Load Time</h3>
              <p className="text-sm text-gray-400">
                Across all modules & browsers
              </p>
              <div className="mt-4 flex items-center gap-2">
                {aggregateMetrics.avgLoadTime < 2000 ? (
                  <TrendingDown className="w-4 h-4 text-green-400" />
                ) : (
                  <TrendingUp className="w-4 h-4 text-red-400" />
                )}
                <span className="text-xs text-gray-500">Target: &lt;2s</span>
              </div>
            </GlassCard>
            
            <GlassCard variant="liquid" intensity="strong" glow className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Eye className="w-8 h-8 text-green-400" />
                <motion.div
                  className="text-3xl font-bold text-green-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                >
                  {aggregateMetrics.visualMatches}/{aggregateMetrics.totalTests}
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Visual Matches</h3>
              <p className="text-sm text-gray-400">
                {((aggregateMetrics.visualMatches / aggregateMetrics.totalTests) * 100).toFixed(0)}% consistency
              </p>
              <div className="mt-4 grid grid-cols-3 gap-2">
                {['Desktop', 'Tablet', 'Mobile'].map((device, i) => (
                  <div key={device} className="flex items-center gap-1">
                    {i === 0 && <Monitor className="w-3 h-3 text-gray-500" />}
                    {i === 1 && <Tablet className="w-3 h-3 text-gray-500" />}
                    {i === 2 && <Smartphone className="w-3 h-3 text-gray-500" />}
                    <span className="text-xs">{device[0]}</span>
                  </div>
                ))}
              </div>
            </GlassCard>
            
            <GlassCard variant="liquid" intensity="strong" glow className="p-6">
              <div className="flex items-start justify-between mb-4">
                <Globe className="w-8 h-8 text-amber-400" />
                <motion.div
                  className="text-3xl font-bold text-amber-400"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
                >
                  4
                </motion.div>
              </div>
              <h3 className="text-lg font-semibold mb-1">Browsers Tested</h3>
              <p className="text-sm text-gray-400">
                Chrome, Firefox, Safari, Edge
              </p>
              <div className="mt-4 flex gap-2">
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <div className="w-2 h-2 bg-green-400 rounded-full" />
                <div className="w-2 h-2 bg-yellow-400 rounded-full" />
              </div>
            </GlassCard>
            
            {/* Recent Test Results */}
            <GlassCard variant="liquid" intensity="medium" className="col-span-full p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-400" />
                Recent Test Activity
              </h3>
              <div className="space-y-3">
                {testData.accessibility.slice(0, 5).map((result, i) => (
                  <motion.div
                    key={result.module}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-center gap-3">
                      {result.violations === 0 ? (
                        <Check className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-yellow-400" />
                      )}
                      <div>
                        <p className="font-medium">{result.module}</p>
                        <p className="text-xs text-gray-400">
                          Score: {result.score}% • Violations: {result.violations}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {result.keyboardNav && (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-400/30">
                          Keyboard
                        </span>
                      )}
                      {result.ariaCompliance && (
                        <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 border border-purple-400/30">
                          ARIA
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
          </motion.div>
        )}
        
        {activeView === 'accessibility' && (
          <motion.div
            key="accessibility"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* WCAG Compliance Details */}
            <GlassCard variant="liquid" intensity="medium" className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-400" />
                WCAG AA Compliance by Module
              </h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {testData.accessibility.map((result) => (
                  <motion.div
                    key={result.module}
                    whileHover={{ scale: 1.02 }}
                    className="p-4 rounded-xl bg-white/5 border border-white/10"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-semibold">{result.module}</h4>
                      <span className={`text-2xl font-bold ${getScoreColor(result.score)}`}>
                        {result.score}%
                      </span>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Contrast Ratio</span>
                        <span className={result.contrastRatio >= 4.5 ? 'text-green-400' : 'text-red-400'}>
                          {result.contrastRatio}:1
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Violations</span>
                        <span className={result.violations === 0 ? 'text-green-400' : 'text-yellow-400'}>
                          {result.violations}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Passes</span>
                        <span className="text-green-400">{result.passes}</span>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-400">Warnings</span>
                        <span className="text-yellow-400">{result.warnings}</span>
                      </div>
                    </div>
                    
                    <div className="mt-3 pt-3 border-t border-white/10 flex gap-2">
                      {result.keyboardNav ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-400/30">
                          ✓ Keyboard Nav
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-400/30">
                          ✗ Keyboard Nav
                        </span>
                      )}
                      {result.ariaCompliance ? (
                        <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 border border-green-400/30">
                          ✓ ARIA
                        </span>
                      ) : (
                        <span className="px-2 py-1 text-xs rounded-full bg-red-500/20 text-red-400 border border-red-400/30">
                          ✗ ARIA
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
            
            {/* Accessibility Insights */}
            <GlassCard variant="liquid" intensity="medium" className="p-6">
              <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-400" />
                AI-Powered Insights
              </h3>
              <div className="space-y-3">
                <div className="p-4 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-400/30">
                  <h4 className="font-medium mb-2">Color Contrast Optimization</h4>
                  <p className="text-sm text-gray-400">
                    3 modules have text elements with contrast ratios below 4.5:1. Consider increasing 
                    the opacity of glass-text-muted elements or using darker backgrounds.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-400/30">
                  <h4 className="font-medium mb-2">Focus Management</h4>
                  <p className="text-sm text-gray-400">
                    All interactive elements have visible focus indicators. Consider adding skip links 
                    for keyboard users to navigate directly to main content.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 border border-green-400/30">
                  <h4 className="font-medium mb-2">Screen Reader Support</h4>
                  <p className="text-sm text-gray-400">
                    Excellent ARIA label coverage at 98%. Add aria-live regions for dynamic content 
                    updates in the Financial Suite module.
                  </p>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
        
        {activeView === 'performance' && (
          <motion.div
            key="performance"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Core Web Vitals */}
            <GlassCard variant="liquid" intensity="medium" className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Zap className="w-5 h-5 text-cyan-400" />
                Core Web Vitals by Browser
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-white/10">
                      <th className="text-left py-3 px-4">Module</th>
                      <th className="text-center py-3 px-4">Browser</th>
                      <th className="text-center py-3 px-4">LCP</th>
                      <th className="text-center py-3 px-4">FID</th>
                      <th className="text-center py-3 px-4">CLS</th>
                      <th className="text-center py-3 px-4">Load Time</th>
                      <th className="text-center py-3 px-4">FPS</th>
                    </tr>
                  </thead>
                  <tbody>
                    {testData.performance.slice(0, 12).map((result, i) => (
                      <motion.tr
                        key={`${result.module}-${result.browser}`}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        className="border-b border-white/5 hover:bg-white/5"
                      >
                        <td className="py-3 px-4 text-sm">{result.module}</td>
                        <td className="py-3 px-4 text-sm text-center">{result.browser}</td>
                        <td className={`py-3 px-4 text-sm text-center font-mono ${getPerformanceGrade(result.lcp, 'lcp')}`}>
                          {result.lcp}ms
                        </td>
                        <td className={`py-3 px-4 text-sm text-center font-mono ${getPerformanceGrade(result.fid, 'fid')}`}>
                          {result.fid}ms
                        </td>
                        <td className={`py-3 px-4 text-sm text-center font-mono ${getPerformanceGrade(result.cls, 'cls')}`}>
                          {result.cls}
                        </td>
                        <td className={`py-3 px-4 text-sm text-center font-mono ${getPerformanceGrade(result.loadTime, 'loadTime')}`}>
                          {(result.loadTime / 1000).toFixed(2)}s
                        </td>
                        <td className={`py-3 px-4 text-sm text-center font-mono ${result.fps >= 30 ? 'text-green-400' : 'text-red-400'}`}>
                          {result.fps}
                        </td>
                      </motion.tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </GlassCard>
            
            {/* Performance Trends */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <GlassCard variant="liquid" intensity="strong" className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-purple-400" />
                  Load Time Distribution
                </h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">&lt; 1s</span>
                    <div className="flex-1 mx-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-green-400 w-3/4" />
                    </div>
                    <span className="text-sm font-mono">75%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">1-2s</span>
                    <div className="flex-1 mx-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-yellow-400 w-1/5" />
                    </div>
                    <span className="text-sm font-mono">20%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">&gt; 2s</span>
                    <div className="flex-1 mx-3 h-2 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full bg-red-400 w-1/20" />
                    </div>
                    <span className="text-sm font-mono">5%</span>
                  </div>
                </div>
              </GlassCard>
              
              <GlassCard variant="liquid" intensity="strong" className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Activity className="w-4 h-4 text-cyan-400" />
                  Memory Usage
                </h4>
                <div className="space-y-3">
                  {['Chrome', 'Firefox', 'Safari'].map((browser, i) => (
                    <div key={browser} className="flex items-center justify-between">
                      <span className="text-sm">{browser}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-24 h-2 bg-gray-800 rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-gradient-to-r from-cyan-500 to-blue-500"
                            initial={{ width: 0 }}
                            animate={{ width: `${65 - i * 10}%` }}
                            transition={{ duration: 1, delay: i * 0.2 }}
                          />
                        </div>
                        <span className="text-xs font-mono">{45 - i * 5}MB</span>
                      </div>
                    </div>
                  ))}
                </div>
              </GlassCard>
              
              <GlassCard variant="liquid" intensity="strong" className="p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <BarChart3 className="w-4 h-4 text-green-400" />
                  Animation Performance
                </h4>
                <div className="text-center">
                  <div className="text-4xl font-bold text-green-400 mb-2">
                    {Math.round(testData.performance.reduce((acc, r) => acc + r.fps, 0) / testData.performance.length)} FPS
                  </div>
                  <p className="text-sm text-gray-400">Average across all tests</p>
                  <div className="mt-4 flex justify-center gap-1">
                    {[...Array(60)].map((_, i) => (
                      <div
                        key={i}
                        className={`w-1 h-8 rounded-full ${
                          i < 45 ? 'bg-green-400' : i < 55 ? 'bg-yellow-400' : 'bg-gray-700'
                        }`}
                        style={{ height: `${Math.random() * 32 + 8}px` }}
                      />
                    ))}
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}
        
        {activeView === 'visual' && (
          <motion.div
            key="visual"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            {/* Visual Regression Results */}
            <GlassCard variant="liquid" intensity="medium" className="p-6">
              <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
                <Eye className="w-5 h-5 text-green-400" />
                Visual Regression Test Results
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {testData.visualRegression.map((result, i) => (
                  <motion.div
                    key={`${result.module}-${result.device}`}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: i * 0.05 }}
                    whileHover={{ scale: 1.05 }}
                    className="relative rounded-xl overflow-hidden bg-white/5 border border-white/10"
                  >
                    <div className="aspect-video bg-gradient-to-br from-gray-800 to-gray-900 relative">
                      {/* Simulated screenshot */}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="text-xs text-gray-500">
                          {result.module} - {result.device}
                        </span>
                      </div>
                      {!result.match && (
                        <div className="absolute top-2 right-2 px-2 py-1 rounded-full bg-red-500/20 border border-red-400/30">
                          <span className="text-xs text-red-400">{(result.difference * 100).toFixed(1)}% diff</span>
                        </div>
                      )}
                    </div>
                    <div className="p-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {result.match ? (
                            <Check className="w-4 h-4 text-green-400" />
                          ) : (
                            <X className="w-4 h-4 text-red-400" />
                          )}
                          <span className="text-sm font-medium">
                            {result.match ? 'Match' : 'Difference'}
                          </span>
                        </div>
                        {result.device === 'Desktop' && <Monitor className="w-4 h-4 text-gray-500" />}
                        {result.device === 'Tablet' && <Tablet className="w-4 h-4 text-gray-500" />}
                        {result.device === 'Mobile' && <Smartphone className="w-4 h-4 text-gray-500" />}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </GlassCard>
            
            {/* Visual Testing Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <GlassCard variant="liquid" intensity="strong" className="p-6">
                <h4 className="font-semibold mb-4">Device Coverage</h4>
                <div className="space-y-3">
                  {['Desktop', 'Tablet', 'Mobile'].map((device) => {
                    const deviceResults = testData.visualRegression.filter(r => r.device === device)
                    const matches = deviceResults.filter(r => r.match).length
                    const percentage = (matches / deviceResults.length) * 100
                    
                    return (
                      <div key={device} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {device === 'Desktop' && <Monitor className="w-4 h-4 text-gray-500" />}
                          {device === 'Tablet' && <Tablet className="w-4 h-4 text-gray-500" />}
                          {device === 'Mobile' && <Smartphone className="w-4 h-4 text-gray-500" />}
                          <span className="text-sm">{device}</span>
                        </div>
                        <div className="flex items-center gap-3">
                          <div className="w-32 h-2 bg-gray-800 rounded-full overflow-hidden">
                            <motion.div
                              className={`h-full ${percentage >= 90 ? 'bg-green-400' : percentage >= 70 ? 'bg-yellow-400' : 'bg-red-400'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                          <span className="text-sm font-mono">{percentage.toFixed(0)}%</span>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </GlassCard>
              
              <GlassCard variant="liquid" intensity="strong" className="p-6">
                <h4 className="font-semibold mb-4">Common Issues</h4>
                <div className="space-y-2">
                  <div className="p-3 rounded-lg bg-yellow-500/10 border border-yellow-400/30">
                    <p className="text-sm text-yellow-400 font-medium mb-1">Font Rendering</p>
                    <p className="text-xs text-gray-400">
                      Slight differences in Safari due to sub-pixel antialiasing
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-400/30">
                    <p className="text-sm text-purple-400 font-medium mb-1">Animation Timing</p>
                    <p className="text-xs text-gray-400">
                      Frame capture variations in hover state transitions
                    </p>
                  </div>
                  <div className="p-3 rounded-lg bg-cyan-500/10 border border-cyan-400/30">
                    <p className="text-sm text-cyan-400 font-medium mb-1">Gradient Rendering</p>
                    <p className="text-xs text-gray-400">
                      Minor color banding differences across browsers
                    </p>
                  </div>
                </div>
              </GlassCard>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Floating Status Indicator */}
      <motion.div
        className="fixed bottom-8 right-8"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <GlassCard variant="liquid" intensity="ultra" glow className="p-4">
          <div className="flex items-center gap-3">
            {isRunning ? (
              <>
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                <span className="text-sm font-medium">Tests Running</span>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                >
                  <RefreshCw className="w-4 h-4 text-green-400" />
                </motion.div>
              </>
            ) : (
              <>
                <div className="w-3 h-3 bg-gray-400 rounded-full" />
                <span className="text-sm font-medium">Tests Idle</span>
              </>
            )}
          </div>
        </GlassCard>
      </motion.div>
    </div>
  )
}