'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Import modules directly with their wrapper components
const FinancialSuite = dynamic(() => import('@/components/ecosystem/modules/FinancialSuite'), { ssr: false })
const QualityControl = dynamic(() => import('@/components/ecosystem/modules/QualityControl'), { ssr: false })
const AnalyticsBI = dynamic(() => import('@/components/ecosystem/modules/AnalyticsBI'), { ssr: false })

export default function TestSingleClickPage() {
  const [clickCount, setClickCount] = useState<Record<string, number>>({
    financial: 0,
    quality: 0,
    analytics: 0
  })

  const handleClick = (module: string) => {
    setClickCount(prev => ({
      ...prev,
      [module]: prev[module] + 1
    }))
  }

  return (
    <div className="min-h-screen bg-gray-950 p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-4">Single-Click Navigation Test</h1>
        <p className="text-gray-400 mb-8">
          Click on any module card below. With directAccess=true, it should open immediately in a full-screen modal.
        </p>

        <div className="mb-8 p-4 bg-gray-900 rounded-lg">
          <h2 className="text-xl font-semibold text-white mb-2">Click Counter:</h2>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <span className="text-gray-400">Financial Suite:</span>
              <span className="text-white ml-2">{clickCount.financial} clicks</span>
            </div>
            <div>
              <span className="text-gray-400">Quality Control:</span>
              <span className="text-white ml-2">{clickCount.quality} clicks</span>
            </div>
            <div>
              <span className="text-gray-400">Analytics BI:</span>
              <span className="text-white ml-2">{clickCount.analytics} clicks</span>
            </div>
          </div>
        </div>

        {/* Module Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div onClick={() => handleClick('financial')}>
            <FinancialSuite />
          </div>
          <div onClick={() => handleClick('quality')}>
            <QualityControl />
          </div>
          <div onClick={() => handleClick('analytics')}>
            <AnalyticsBI />
          </div>
        </div>

        <div className="mt-8 p-4 bg-blue-900/20 border border-blue-500/50 rounded-lg">
          <h3 className="text-lg font-semibold text-blue-400 mb-2">Expected Behavior:</h3>
          <ul className="list-disc list-inside text-gray-300 space-y-1">
            <li>Single click on module card should open full-screen dashboard</li>
            <li>Escape or Backspace key should close the dashboard</li>
            <li>No preview modal should appear (direct access)</li>
            <li>Loading animation should appear briefly before dashboard</li>
          </ul>
        </div>
      </div>
    </div>
  )
}