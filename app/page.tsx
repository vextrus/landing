'use client'

import dynamic from 'next/dynamic'
import OrbitalHeroSection from '@/components/hero/OrbitalHeroSection'
import OrbitalProblemSection from '@/components/sections/OrbitalProblemSection'
import OrbitalSolutionSection from '@/components/sections/OrbitalSolutionSection'

const VextrusEcosystem2D = dynamic(
  () => import('@/components/ecosystem/VextrusEcosystem2D'),
  { ssr: false }
)

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <OrbitalHeroSection />
      <OrbitalProblemSection />
      <OrbitalSolutionSection />
      <div id="ecosystem">
        <VextrusEcosystem2D />
      </div>
      <div id="roi-calculator" className="py-24 bg-gradient-to-b from-slate-900 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">ROI Calculator</h2>
          <p className="text-xl text-slate-300 mb-8">Calculate your potential savings with Vextrus</p>
          <a 
            href="/roi-calculator" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all"
          >
            Open ROI Calculator
          </a>
        </div>
      </div>
      <div id="contact" className="py-24 bg-gradient-to-b from-slate-950 to-slate-900">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">Get Started with Vextrus</h2>
          <p className="text-xl text-slate-300 mb-8">
            Transform your construction business with AI-powered ERP
          </p>
          <div className="space-y-4">
            <p className="text-lg text-slate-300">
              📍 11 Paltan Line, Purana Paltan, Dhaka
            </p>
            <p className="text-lg text-slate-300">
              📞 +8801711-005961
            </p>
            <p className="text-lg text-slate-300">
              ✉️ ceo@vextrus.com
            </p>
          </div>
          <button className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-2xl shadow-2xl hover:shadow-purple-500/25 transition-all">
            Schedule a Demo
          </button>
        </div>
      </div>
    </main>
  )
}