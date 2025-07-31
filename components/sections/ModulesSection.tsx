'use client'

import dynamic from 'next/dynamic'

// Dynamically import VextrusEcosystem2D with SSR disabled
const VextrusEcosystem2D = dynamic(
  () => import('@/components/ecosystem/VextrusEcosystem2D'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center min-h-[700px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Vextrus Ecosystem...</p>
        </div>
      </div>
    )
  }
)

export default function ModulesSection() {
  return (
    <section id="modules" className="relative">
      <VextrusEcosystem2D />
    </section>
  )
}