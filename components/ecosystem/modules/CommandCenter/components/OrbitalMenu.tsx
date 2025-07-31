'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  Map as MapIcon, 
  Calendar, 
  Brain, 
  Settings, 
  BarChart3, 
  Users, 
  AlertTriangle,
  DollarSign,
  Shield,
  Mic
} from 'lucide-react'
import { useState } from 'react'

interface MenuItem {
  id: string
  label: string
  icon: any
  color: string
  gradient: string
  layer?: 'map' | 'timeline' | 'ai' | 'control'
  description: string
}

interface OrbitalMenuProps {
  activeView: string
  onViewChange: (view: string) => void
  onLayerChange: (layer: 'map' | 'timeline' | 'ai' | 'control') => void
}

const menuItems: MenuItem[] = [
  {
    id: 'map',
    label: 'Live Map',
    icon: MapIcon,
    color: '#14B8A6',
    gradient: 'from-teal-400 to-cyan-600',
    layer: 'map',
    description: 'Real-time site monitoring'
  },
  {
    id: 'timeline',
    label: 'Timeline',
    icon: Calendar,
    color: '#22C55E',
    gradient: 'from-green-400 to-emerald-600',
    layer: 'timeline',
    description: 'Project schedules & Gantt'
  },
  {
    id: 'ai',
    label: 'AI Insights',
    icon: Brain,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-violet-600',
    layer: 'ai',
    description: 'Predictions & analytics'
  },
  {
    id: 'resources',
    label: 'Resources',
    icon: Users,
    color: '#F59E0B',
    gradient: 'from-amber-400 to-orange-600',
    description: 'Worker & equipment tracking'
  },
  {
    id: 'finance',
    label: 'Finance',
    icon: DollarSign,
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-blue-600',
    description: 'Cost & budget analysis'
  },
  {
    id: 'risks',
    label: 'Risks',
    icon: AlertTriangle,
    color: '#EF4444',
    gradient: 'from-red-400 to-rose-600',
    description: 'Risk assessment & alerts'
  }
]

export default function OrbitalMenu({ activeView, onViewChange, onLayerChange }: OrbitalMenuProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [expandedMenu, setExpandedMenu] = useState(false)

  const radius = 280
  const centerX = 400
  const centerY = 400

  // Calculate positions for orbital items
  const calculatePosition = (index: number) => {
    const baseAngle = -90 // Start from top
    const angleIncrement = 60 // 60 degrees between items for 6 items
    const angle = (baseAngle + index * angleIncrement) * Math.PI / 180
    
    return {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle)
    }
  }

  const handleItemClick = (item: MenuItem) => {
    if (item.layer) {
      onLayerChange(item.layer)
    }
    onViewChange(item.id)
  }

  return (
    <div className="absolute inset-0 pointer-events-none">
      <svg className="absolute inset-0 w-full h-full">
        {/* Orbital Path */}
        <motion.circle
          cx={centerX}
          cy={centerY}
          r={radius}
          fill="none"
          stroke="rgba(168, 85, 247, 0.2)"
          strokeWidth="2"
          strokeDasharray="5 10"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />

        {/* Connection Lines */}
        {menuItems.map((item, index) => {
          const pos = calculatePosition(index)
          const isActive = activeView === item.id
          const isHovered = hoveredItem === item.id

          return (
            <motion.line
              key={item.id}
              x1={centerX}
              y1={centerY}
              x2={pos.x}
              y2={pos.y}
              stroke={isActive || isHovered ? item.color : 'rgba(255, 255, 255, 0.1)'}
              strokeWidth={isActive ? 3 : isHovered ? 2 : 1}
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ 
                pathLength: isActive || isHovered ? 1 : 0.3, 
                opacity: isActive || isHovered ? 1 : 0.3 
              }}
              transition={{ duration: 0.5 }}
            />
          )
        })}

        {/* Energy Particles */}
        {menuItems.map((item, index) => {
          const pos = calculatePosition(index)
          const isActive = activeView === item.id

          return isActive ? (
            <motion.circle
              key={`particle-${item.id}`}
              r="4"
              fill={item.color}
              initial={{ x: centerX, y: centerY }}
              animate={{
                x: [centerX, pos.x, centerX],
                y: [centerY, pos.y, centerY]
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="3s"
                repeatCount="indefinite"
              />
            </motion.circle>
          ) : null
        })}
      </svg>

      {/* Menu Items */}
      {menuItems.map((item, index) => {
        const pos = calculatePosition(index)
        const Icon = item.icon
        const isActive = activeView === item.id
        const isHovered = hoveredItem === item.id

        return (
          <motion.div
            key={item.id}
            className="absolute pointer-events-auto"
            style={{ left: pos.x - 40, top: pos.y - 40 }}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: index * 0.1 + 0.5 }}
          >
            <motion.button
              className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${item.gradient} p-[2px] shadow-xl`}
              onClick={() => handleItemClick(item)}
              onHoverStart={() => setHoveredItem(item.id)}
              onHoverEnd={() => setHoveredItem(null)}
              whileHover={{ scale: 1.15 }}
              whileTap={{ scale: 0.95 }}
              animate={{
                boxShadow: isActive 
                  ? `0 0 30px ${item.color}` 
                  : isHovered 
                  ? `0 0 20px ${item.color}` 
                  : '0 0 10px rgba(0,0,0,0.5)'
              }}
            >
              <div className="w-full h-full rounded-full bg-white backdrop-blur-xl flex items-center justify-center">
                <Icon className="w-8 h-8 text-gray-900" />
              </div>

              {/* Pulse Effect */}
              {isActive && (
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ backgroundColor: item.color }}
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [0.5, 0, 0]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity
                  }}
                />
              )}

              {/* Tooltip */}
              <AnimatePresence>
                {isHovered && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 whitespace-nowrap z-50"
                  >
                    <div className="bg-white backdrop-blur-xl rounded-lg px-4 py-2 shadow-xl border border-gray-300">
                      <p className="text-gray-900 font-medium text-sm">{item.label}</p>
                      <p className="text-gray-400 text-xs">{item.description}</p>
                    </div>
                    <div className="w-3 h-3 bg-white transform rotate-45 absolute -top-1.5 left-1/2 -translate-x-1/2 border-l border-t border-gray-300" />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.button>

            {/* Connection Glow */}
            {(isActive || isHovered) && (
              <motion.div
                className="absolute inset-0 rounded-full"
                style={{ backgroundColor: item.color }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            )}
          </motion.div>
        )
      })}

      {/* Quick Actions Menu */}
      <motion.div
        className="absolute bottom-6 left-6 pointer-events-auto"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1 }}
      >
        <motion.button
          className="w-14 h-14 rounded-full bg-gradient-to-br from-gray-700 to-gray-900 backdrop-blur-xl shadow-xl flex items-center justify-center"
          onClick={() => setExpandedMenu(!expandedMenu)}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Settings className={`w-6 h-6 text-gray-900 transition-transform ${expandedMenu ? 'rotate-180' : ''}`} />
        </motion.button>

        <AnimatePresence>
          {expandedMenu && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-16 left-0 bg-white backdrop-blur-xl rounded-lg p-4 shadow-xl border border-gray-300 space-y-2"
            >
              <button className="flex items-center gap-3 text-gray-900 hover:text-purple-400 transition-colors">
                <BarChart3 className="w-5 h-5" />
                <span className="text-sm">Analytics</span>
              </button>
              <button className="flex items-center gap-3 text-gray-900 hover:text-purple-400 transition-colors">
                <Shield className="w-5 h-5" />
                <span className="text-sm">Security</span>
              </button>
              <button className="flex items-center gap-3 text-gray-900 hover:text-purple-400 transition-colors">
                <Mic className="w-5 h-5" />
                <span className="text-sm">Voice Control</span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}