'use client'

import { useState } from 'react'
import dynamic from 'next/dynamic'
import FullScreenModal from './CommandCenter/components/FullScreenModal'
import { motion } from 'framer-motion'
import { Brain, Command, Sparkles, Zap } from 'lucide-react'

// Dynamically import the actual CommandCenter
const CommandCenter = dynamic(() => import('./CommandCenter'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-screen">
      <div className="animate-pulse text-gray-500">Loading Command Center...</div>
    </div>
  )
})

export default function CommandCenterWrapper() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openCommandCenter = () => {
    setIsModalOpen(true)
  }

  const closeCommandCenter = () => {
    setIsModalOpen(false)
  }

  return (
    <>
      {/* Launch Card - What shows in the ecosystem */}
      <div className="w-full h-full flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-2xl mx-auto"
        >
          {/* Icon */}
          <motion.div
            className="inline-flex p-6 rounded-3xl bg-gradient-to-br from-indigo-500/20 to-purple-600/20 backdrop-blur-xl mb-6"
            whileHover={{ scale: 1.05, rotate: [0, -5, 5, 0] }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <div className="relative">
              <Brain className="w-16 h-16 text-indigo-600" />
              <Command className="w-8 h-8 text-purple-600 absolute -bottom-1 -right-1" />
            </div>
          </motion.div>

          {/* Title */}
          <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-gray-900 to-gray-700 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
            AI Command Center
          </h2>

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 mb-8 leading-relaxed">
            Experience the future of construction management with our AI-powered command center. 
            Real-time insights, predictive analytics, and intelligent automation at your fingertips.
          </p>

          {/* Features */}
          <div className="grid grid-cols-2 gap-4 mb-8">
            {[
              { icon: Zap, label: 'Real-time Monitoring' },
              { icon: Brain, label: 'AI Predictions' },
              { icon: Command, label: 'Voice Commands' },
              { icon: Sparkles, label: 'Smart Analytics' }
            ].map((feature, index) => (
              <motion.div
                key={feature.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * index }}
                className="flex items-center gap-3 p-3 rounded-xl bg-gray-100 dark:bg-gray-800/50"
              >
                <feature.icon className="w-5 h-5 text-indigo-600" />
                <span className="text-sm font-medium">{feature.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Launch Button */}
          <motion.button
            onClick={openCommandCenter}
            className="group relative inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-2xl shadow-xl overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {/* Button glow effect */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-purple-400 opacity-0 group-hover:opacity-50 blur-xl transition-opacity duration-500"
            />
            
            {/* Button content */}
            <span className="relative">Enter Command Center</span>
            <Command className="w-5 h-5 relative group-hover:rotate-12 transition-transform" />
          </motion.button>

          {/* Additional info */}
          <p className="mt-4 text-xs text-gray-500 dark:text-gray-600">
            Full-screen immersive experience • Powered by AI
          </p>
        </motion.div>
      </div>

      {/* Full Screen Modal with Command Center */}
      <FullScreenModal isOpen={isModalOpen} onClose={closeCommandCenter}>
        <CommandCenter />
      </FullScreenModal>
    </>
  )
}