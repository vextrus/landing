'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { ArrowRight, Building2, AlertTriangle, ChevronRight, Zap, Shield, BarChart, Users } from 'lucide-react'
import { useState } from 'react'

const transformationMetrics = [
  { icon: Zap, label: 'Project Speed', before: '180 days', after: '99 days', improvement: '45% Faster' },
  { icon: Shield, label: 'Error Rate', before: '35%', after: '1.5%', improvement: '95% Reduction' },
  { icon: BarChart, label: 'Cash Flow', before: 'Unpredictable', after: 'Real-time', improvement: '₹5.2Cr Control' },
  { icon: Users, label: 'Team Efficiency', before: '240 hrs/month', after: '12 hrs/month', improvement: '95% Automated' }
]

export default function OrbitalHeroSection() {
  const [activeMetric, setActiveMetric] = useState(0)

  const scrollToEcosystem = () => {
    const ecosystemSection = document.getElementById('ecosystem')
    if (ecosystemSection) {
      ecosystemSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Subtle Grid Background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-10" />
      
      {/* Gradient Overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      <Container className="relative z-10 py-24">
        {/* Main Content Grid */}
        <div className="max-w-7xl mx-auto">
          
          {/* Top Alert Bar */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center justify-center mb-12"
          >
            <div className="flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/10 backdrop-blur-sm border border-red-500/20">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </div>
              <span className="text-sm font-medium text-red-300">
                Manual construction management costs Bangladesh ₹50L+ annually per company
              </span>
            </div>
          </motion.div>

          {/* Main Headline */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Transform Your</span>
              <br />
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                Construction Business
              </span>
              <br />
              <span className="text-white">With AI-Powered ERP</span>
            </h1>
            
            <p className="text-xl lg:text-2xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
              Bangladesh's first AI-native ERP that eliminates manual chaos, 
              automates operations, and delivers real-time intelligence for 
              <span className="text-white font-semibold"> modern construction companies</span>.
            </p>
          </motion.div>

          {/* Transformation Grid */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="mb-16"
          >
            <div className="text-center mb-8">
              <h2 className="text-2xl font-semibold text-white mb-2">Real Transformation. Real Results.</h2>
              <p className="text-slate-400">See how Vextrus transforms your operations</p>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {transformationMetrics.map((metric, index) => (
                <motion.div
                  key={metric.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 + index * 0.1 }}
                  onMouseEnter={() => setActiveMetric(index)}
                  className={`relative p-6 rounded-2xl backdrop-blur-xl border transition-all duration-300 cursor-pointer ${
                    activeMetric === index 
                      ? 'bg-slate-800/60 border-purple-500/50 shadow-2xl shadow-purple-500/20' 
                      : 'bg-slate-900/40 border-white/10 hover:bg-slate-800/40'
                  }`}
                >
                  <metric.icon className={`w-8 h-8 mb-4 ${
                    activeMetric === index ? 'text-purple-400' : 'text-slate-400'
                  }`} />
                  
                  <h3 className="text-lg font-semibold text-white mb-3">{metric.label}</h3>
                  
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">Before:</span>
                      <span className="text-red-400 font-medium">{metric.before}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-500">After:</span>
                      <span className="text-green-400 font-medium">{metric.after}</span>
                    </div>
                  </div>
                  
                  <div className="mt-4 pt-4 border-t border-white/10">
                    <div className="text-center">
                      <div className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                        {metric.improvement}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* CTA Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="text-center"
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={scrollToEcosystem}
              className="group relative inline-flex items-center gap-3 px-12 py-6 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-bold text-lg rounded-2xl shadow-2xl shadow-purple-500/25 transition-all duration-300 hover:shadow-purple-500/40"
            >
              <Building2 className="w-6 h-6" />
              Explore Vextrus Ecosystem
              <ChevronRight className="w-6 h-6 transition-transform duration-300 group-hover:translate-x-1" />
              
              {/* Animated border */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-600 to-cyan-600 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300" />
            </motion.button>
            
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="mt-6 text-sm text-slate-400"
            >
              Join 50+ construction companies already transforming with Vextrus
            </motion.p>
          </motion.div>
        </div>
      </Container>

      {/* Bottom Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" className="w-full h-auto">
          <path
            fill="url(#wave-gradient)"
            fillOpacity="0.1"
            d="M0,64 C360,96 720,32 1440,64 L1440,120 L0,120 Z"
          />
          <defs>
            <linearGradient id="wave-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
        </svg>
      </div>
    </section>
  )
}