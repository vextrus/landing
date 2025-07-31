'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'

// Import all modules with SSR disabled
const CommandCenter = dynamic(() => import('@/components/ecosystem/modules/CommandCenter'), { ssr: false })
const FinancialSuite = dynamic(() => import('@/components/ecosystem/modules/modules/FinancialSuite'), { ssr: false })
const SalesCRM = dynamic(() => import('@/components/ecosystem/modules/modules/SalesCRM'), { ssr: false })
const Procurement = dynamic(() => import('@/components/ecosystem/modules/modules/Procurement'), { ssr: false })
const QualityControl = dynamic(() => import('@/components/ecosystem/modules/modules/QualityControl'), { ssr: false })
const HRWorkforce = dynamic(() => import('@/components/ecosystem/modules/modules/HRWorkforce'), { ssr: false })
const AnalyticsBI = dynamic(() => import('@/components/ecosystem/modules/modules/AnalyticsBI'), { ssr: false })

const modules = [
  { id: 'command', name: 'Command Center', Component: CommandCenter },
  { id: 'financial', name: 'Financial Suite', Component: FinancialSuite },
  { id: 'sales', name: 'Sales CRM', Component: SalesCRM },
  { id: 'procurement', name: 'Procurement', Component: Procurement },
  { id: 'quality', name: 'Quality Control', Component: QualityControl },
  { id: 'hr', name: 'HR Workforce', Component: HRWorkforce },
  { id: 'analytics', name: 'Analytics BI', Component: AnalyticsBI },
]

export default function TestModulesPage() {
  const [selectedModule, setSelectedModule] = useState('command')
  
  const CurrentModule = modules.find(m => m.id === selectedModule)?.Component || CommandCenter

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <h1 className="text-3xl font-bold mb-8">Module Test Page</h1>
      
      {/* Module selector */}
      <div className="flex gap-4 mb-8">
        {modules.map(module => (
          <button
            key={module.id}
            onClick={() => setSelectedModule(module.id)}
            className={`px-4 py-2 rounded-lg transition-all ${
              selectedModule === module.id 
                ? 'bg-purple-600 text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-100'
            }`}
          >
            {module.name}
          </button>
        ))}
      </div>
      
      {/* Module content */}
      <div className="bg-white rounded-xl shadow-lg p-8">
        <CurrentModule />
      </div>
    </div>
  )
}