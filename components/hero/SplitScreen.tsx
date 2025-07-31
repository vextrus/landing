'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText, 
  AlertCircle, 
  Users, 
  Clock,
  BarChart3,
  CheckCircle2,
  Building2,
  TrendingUp
} from 'lucide-react'

const traditionalIcons = [
  { Icon: FileText, label: 'Paper Documents', color: 'text-red-500' },
  { Icon: AlertCircle, label: 'Delays & Issues', color: 'text-orange-500' },
  { Icon: Users, label: 'Manual Coordination', color: 'text-yellow-500' },
  { Icon: Clock, label: 'Time Consuming', color: 'text-gray-500' },
]

const vextrusIcons = [
  { Icon: BarChart3, label: 'Real-time Analytics', color: 'text-green-500' },
  { Icon: CheckCircle2, label: 'AI Predictions', color: 'text-blue-500' },
  { Icon: Building2, label: 'Smart Automation', color: 'text-purple-500' },
  { Icon: TrendingUp, label: 'Profit Growth', color: 'text-teal-500' },
]

export default function SplitScreen() {
  const [isTransformed, setIsTransformed] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      setIsTransformed(prev => !prev)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  return (
    <div className="relative w-full h-full bg-white/80 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden">
      {/* Split screen container */}
      <div className="relative h-full flex">
        {/* Traditional side */}
        <motion.div
          animate={{ width: isTransformed ? '20%' : '50%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="relative bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence>
            {!isTransformed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center p-6"
              >
                <h3 className="text-xl font-bold mb-4 text-gray-800">Traditional Way</h3>
                <div className="grid grid-cols-2 gap-4">
                  {traditionalIcons.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <item.Icon className={`w-12 h-12 ${item.color} mb-2`} />
                      <span className="text-xs text-gray-600">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Center divider with animation */}
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20">
          <motion.div
            animate={{ rotate: isTransformed ? 180 : 0 }}
            transition={{ duration: 1 }}
            className="w-16 h-16 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center shadow-lg"
          >
            <motion.div
              animate={{ rotate: isTransformed ? -180 : 0 }}
              transition={{ duration: 1 }}
              className="text-white font-bold"
            >
              VS
            </motion.div>
          </motion.div>
        </div>

        {/* Vextrus side */}
        <motion.div
          animate={{ width: isTransformed ? '80%' : '50%' }}
          transition={{ duration: 1, ease: 'easeInOut' }}
          className="relative bg-gradient-to-br from-teal-50 to-blue-50 flex items-center justify-center overflow-hidden"
        >
          <AnimatePresence>
            {isTransformed && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="text-center p-6 w-full"
              >
                <h3 className="text-2xl font-bold mb-6 text-primary">Vextrus Way</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {vextrusIcons.map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex flex-col items-center"
                    >
                      <div className="w-16 h-16 bg-white rounded-xl shadow-md flex items-center justify-center mb-3">
                        <item.Icon className={`w-10 h-10 ${item.color}`} />
                      </div>
                      <span className="text-sm font-medium text-gray-700">{item.label}</span>
                    </motion.div>
                  ))}
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-6 p-4 bg-white/80 rounded-lg shadow-sm"
                >
                  <p className="text-sm text-gray-600">
                    Transform your construction business with AI-powered intelligence
                  </p>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-2xl" />
        <div className="absolute bottom-0 left-0 w-40 h-40 bg-primary/10 rounded-full blur-2xl" />
      </div>
    </div>
  )
}