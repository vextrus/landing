'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { X, CheckCircle } from 'lucide-react'
import { Button } from '@/components/ui/Button'
import { LucideIcon } from 'lucide-react'

interface ModuleDetailsProps {
  module: {
    id: string
    title: string
    tagline: string
    icon: LucideIcon
    color: string
    features: string[]
    impact: string
    description?: string
    benefits?: string[]
  } | null
  isOpen: boolean
  onClose: () => void
}

export default function ModuleDetails({ module, isOpen, onClose }: ModuleDetailsProps) {
  if (!module) return null

  const Icon = module.icon

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="fixed inset-x-4 top-[10%] bottom-[10%] md:inset-x-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden z-50"
          >
            <div 
              className="relative h-48 flex items-center justify-center"
              style={{ backgroundColor: module.color }}
            >
              <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors"
              >
                <X className="w-6 h-6" />
              </button>
              
              <div className="text-center text-white">
                <Icon className="w-20 h-20 mx-auto mb-4" />
                <h2 className="text-3xl font-bold">{module.title}</h2>
                <p className="text-xl mt-2 opacity-90">{module.tagline}</p>
              </div>
            </div>
            
            <div className="p-8 max-h-[calc(100%-12rem)] overflow-y-auto">
              {module.description && (
                <div className="mb-8">
                  <p className="text-lg text-gray-700 leading-relaxed">
                    {module.description}
                  </p>
                </div>
              )}
              
              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-6 text-gray-900">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {module.features.map((feature, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{feature}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
              
              {module.benefits && (
                <div className="mb-8">
                  <h3 className="text-2xl font-bold mb-6 text-gray-900">Business Benefits</h3>
                  <div className="space-y-4">
                    {module.benefits.map((benefit, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 + index * 0.05 }}
                        className="bg-gray-50 rounded-lg p-4 border border-gray-200"
                      >
                        <p className="text-gray-700">{benefit}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 }}
                className="bg-gradient-to-r from-primary to-accent rounded-xl p-6 text-white"
              >
                <h4 className="text-xl font-bold mb-2">Business Impact</h4>
                <p className="text-lg">{module.impact}</p>
              </motion.div>
              
              <div className="mt-8 flex gap-4">
                <Button variant="primary" className="flex-1">
                  See Live Demo
                </Button>
                <Button variant="outline" className="flex-1">
                  Learn More
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}