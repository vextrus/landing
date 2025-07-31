'use client'

import { motion } from 'framer-motion'
import { LucideIcon } from 'lucide-react'

interface ProblemCardProps {
  icon: LucideIcon
  title: string
  stats: Array<{
    label: string
    value: string
    color: string
  }>
  description: string
}

export default function ProblemCard({ icon: Icon, title, stats, description }: ProblemCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
      className="bg-white rounded-xl shadow-lg p-6 h-full flex flex-col"
    >
      {/* Icon and Title */}
      <div className="flex items-start gap-4 mb-4">
        <div className="w-14 h-14 bg-red-100 rounded-lg flex items-center justify-center flex-shrink-0">
          <Icon className="w-8 h-8 text-red-600" />
        </div>
        <h3 className="text-xl font-bold text-gray-900">{title}</h3>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        {stats.map((stat, index) => (
          <motion.div
            key={index}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2 + index * 0.1, type: 'spring' }}
            className="text-center p-3 bg-gray-50 rounded-lg"
          >
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-sm text-gray-600">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* Description */}
      <p className="text-gray-600 flex-grow">{description}</p>

      {/* Visual indicator */}
      <div className="mt-4 h-2 bg-gray-100 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: '75%' }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.5 }}
          className="h-full bg-gradient-to-r from-red-500 to-orange-500"
        />
      </div>
    </motion.div>
  )
}