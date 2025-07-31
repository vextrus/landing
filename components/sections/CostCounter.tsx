'use client'

import { useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Clock, DollarSign, AlertCircle } from 'lucide-react'

export default function CostCounter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [hours, setHours] = useState(0)
  const [money, setMoney] = useState(0)
  const [defects, setDefects] = useState(0)

  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      setHours(prev => (prev < 8 ? prev + 1 : 8))
      setMoney(prev => (prev < 5000 ? prev + 625 : 5000))
      setDefects(prev => (prev < 5 ? prev + 1 : 5))
    }, 300)

    return () => clearInterval(interval)
  }, [isInView])

  return (
    <div 
      ref={ref}
      className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 shadow-xl"
    >
      <h3 className="text-2xl font-bold text-center mb-8 text-gray-900">
        Every Day Without Proper ERP Costs Your Company:
      </h3>
      
      <div className="grid md:grid-cols-3 gap-6">
        {/* Time Lost */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1 }}
          className="bg-white rounded-lg p-6 text-center"
        >
          <Clock className="w-12 h-12 text-orange-600 mx-auto mb-4" />
          <motion.p className="text-4xl font-bold text-gray-900 mb-2">
            {hours}
            <span className="text-2xl ml-1">hours</span>
          </motion.p>
          <p className="text-gray-600">of productivity lost</p>
        </motion.div>

        {/* Money Lost */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2 }}
          className="bg-white rounded-lg p-6 text-center"
        >
          <DollarSign className="w-12 h-12 text-red-600 mx-auto mb-4" />
          <motion.p className="text-4xl font-bold text-gray-900 mb-2">
            ${money.toLocaleString()}
          </motion.p>
          <p className="text-gray-600">in inefficiencies</p>
        </motion.div>

        {/* Quality Issues */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3 }}
          className="bg-white rounded-lg p-6 text-center"
        >
          <AlertCircle className="w-12 h-12 text-yellow-600 mx-auto mb-4" />
          <motion.p className="text-4xl font-bold text-gray-900 mb-2">
            {defects}-{defects + 2}
          </motion.p>
          <p className="text-gray-600">defects undetected</p>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5 }}
        className="mt-8 text-center"
      >
        <p className="text-lg font-semibold text-gray-700">
          That's <span className="text-red-600">${(money * 365).toLocaleString()}</span> lost annually
        </p>
      </motion.div>
    </div>
  )
}