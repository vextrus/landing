'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useSpring, animated } from '@react-spring/web'
import { 
  Building2, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Shield, 
  UserCheck, 
  LineChart,
  Activity,
  Sparkles
} from 'lucide-react'

interface Module {
  id: string
  name: string
  icon: any
  color: string
  gradient: string
  metrics: {
    label: string
    value: string
  }[]
  description: string
  connections: string[]
}

const modules: Module[] = [
  {
    id: 'command',
    name: 'Command Center',
    icon: Building2,
    color: '#0F172A',
    gradient: 'from-slate-800 to-slate-900',
    metrics: [
      { label: 'Active Projects', value: '152' },
      { label: 'Decisions/Day', value: '1,247' }
    ],
    description: 'AI-powered construction war room',
    connections: ['financial', 'sales', 'procurement', 'quality', 'hr', 'analytics']
  },
  {
    id: 'financial',
    name: 'Financial Suite',
    icon: DollarSign,
    color: '#14B8A6',
    gradient: 'from-teal-500 to-cyan-600',
    metrics: [
      { label: 'Cash Flow', value: '৳5.2 Cr' },
      { label: 'Savings', value: '35%' }
    ],
    description: 'Complete financial control',
    connections: ['command', 'procurement', 'sales']
  },
  {
    id: 'sales',
    name: 'Sales & CRM',
    icon: Users,
    color: '#22C55E',
    gradient: 'from-green-500 to-emerald-600',
    metrics: [
      { label: 'Leads', value: '3,421' },
      { label: 'Conversion', value: '68%' }
    ],
    description: 'Lead to handover management',
    connections: ['command', 'financial', 'analytics']
  },
  {
    id: 'procurement',
    name: 'Procurement',
    icon: ShoppingCart,
    color: '#F59E0B',
    gradient: 'from-amber-500 to-orange-600',
    metrics: [
      { label: 'Vendors', value: '847' },
      { label: 'Cost Saved', value: '15%' }
    ],
    description: 'Smart purchasing system',
    connections: ['command', 'financial', 'quality']
  },
  {
    id: 'quality',
    name: 'Quality Control',
    icon: Shield,
    color: '#8B5CF6',
    gradient: 'from-purple-500 to-violet-600',
    metrics: [
      { label: 'Defects Caught', value: '99.2%' },
      { label: 'Compliance', value: '100%' }
    ],
    description: 'AI-powered quality assurance',
    connections: ['command', 'procurement', 'hr']
  },
  {
    id: 'hr',
    name: 'HR & Workforce',
    icon: UserCheck,
    color: '#EF4444',
    gradient: 'from-red-500 to-rose-600',
    metrics: [
      { label: 'Workers', value: '12,847' },
      { label: 'Productivity', value: '+30%' }
    ],
    description: 'Workforce optimization',
    connections: ['command', 'quality', 'analytics']
  },
  {
    id: 'analytics',
    name: 'Analytics & BI',
    icon: LineChart,
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-600',
    metrics: [
      { label: 'Reports/Day', value: '524' },
      { label: 'Accuracy', value: '98%' }
    ],
    description: 'Data-driven insights',
    connections: ['command', 'sales', 'hr']
  }
]

interface HoneycombGridProps {
  onModuleClick: (moduleId: string) => void
  activeConnections?: string[]
  onModuleHover?: (moduleId: string | null) => void
}

export default function HoneycombGrid({ onModuleClick, activeConnections = [], onModuleHover }: HoneycombGridProps) {
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  
  const handleHover = (moduleId: string | null) => {
    setHoveredModule(moduleId)
    onModuleHover?.(moduleId)
  }

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId)
    onModuleClick(moduleId)
  }

  const isModuleConnected = (moduleId: string) => {
    if (!hoveredModule) return false
    const hoveredModuleData = modules.find(m => m.id === hoveredModule)
    return hoveredModuleData?.connections.includes(moduleId) || false
  }

  return (
    <div className="relative w-full max-w-6xl mx-auto">
      {/* Central AI Brain */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
        <motion.div
          className="relative"
          animate={{
            scale: hoveredModule ? 0.9 : 1,
          }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-20 blur-xl absolute -inset-4" />
          <div className="w-24 h-24 rounded-full bg-white shadow-2xl flex items-center justify-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 opacity-10" />
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              className="absolute inset-2"
            >
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <defs>
                  <linearGradient id="brain-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#6366f1" />
                    <stop offset="50%" stopColor="#a855f7" />
                    <stop offset="100%" stopColor="#ec4899" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke="url(#brain-gradient)"
                  strokeWidth="0.5"
                  strokeDasharray="2 3"
                  opacity="0.6"
                />
              </svg>
            </motion.div>
            <div className="relative z-10">
              <Sparkles className="w-10 h-10 text-purple-600" />
              <motion.div
                className="absolute -inset-1"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Sparkles className="w-12 h-12 text-purple-400 opacity-50" />
              </motion.div>
            </div>
          </div>
          <motion.p
            className="text-center mt-3 text-sm font-medium text-gray-700"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            AI Brain
          </motion.p>
        </motion.div>
      </div>

      {/* Honeycomb Grid */}
      <div className="grid grid-cols-3 gap-4 pt-8 pb-8">
        {/* First Row - 2 modules */}
        <div className="col-start-2 flex justify-center">
          <ModuleHexagon
            module={modules[0]}
            isHovered={hoveredModule === modules[0].id}
            isConnected={isModuleConnected(modules[0].id)}
            isSelected={selectedModule === modules[0].id}
            onHover={() => handleHover(modules[0].id)}
            onLeave={() => handleHover(null)}
            onClick={() => handleModuleClick(modules[0].id)}
          />
        </div>

        {/* Second Row - 3 modules */}
        <div className="flex justify-center">
          <ModuleHexagon
            module={modules[1]}
            isHovered={hoveredModule === modules[1].id}
            isConnected={isModuleConnected(modules[1].id)}
            isSelected={selectedModule === modules[1].id}
            onHover={() => handleHover(modules[1].id)}
            onLeave={() => handleHover(null)}
            onClick={() => handleModuleClick(modules[1].id)}
          />
        </div>
        <div className="flex justify-center">
          {/* Space for AI Brain */}
        </div>
        <div className="flex justify-center">
          <ModuleHexagon
            module={modules[2]}
            isHovered={hoveredModule === modules[2].id}
            isConnected={isModuleConnected(modules[2].id)}
            isSelected={selectedModule === modules[2].id}
            onHover={() => handleHover(modules[2].id)}
            onLeave={() => handleHover(null)}
            onClick={() => handleModuleClick(modules[2].id)}
          />
        </div>

        {/* Third Row - 2 modules */}
        <div className="flex justify-center">
          <ModuleHexagon
            module={modules[3]}
            isHovered={hoveredModule === modules[3].id}
            isConnected={isModuleConnected(modules[3].id)}
            isSelected={selectedModule === modules[3].id}
            onHover={() => handleHover(modules[3].id)}
            onLeave={() => handleHover(null)}
            onClick={() => handleModuleClick(modules[3].id)}
          />
        </div>
        <div className="flex justify-center">
          {/* Space for AI Brain */}
        </div>
        <div className="flex justify-center">
          <ModuleHexagon
            module={modules[4]}
            isHovered={hoveredModule === modules[4].id}
            isConnected={isModuleConnected(modules[4].id)}
            isSelected={selectedModule === modules[4].id}
            onHover={() => handleHover(modules[4].id)}
            onLeave={() => handleHover(null)}
            onClick={() => handleModuleClick(modules[4].id)}
          />
        </div>

        {/* Fourth Row - 2 modules */}
        <div className="col-start-1 flex justify-end pr-8">
          <ModuleHexagon
            module={modules[5]}
            isHovered={hoveredModule === modules[5].id}
            isConnected={isModuleConnected(modules[5].id)}
            isSelected={selectedModule === modules[5].id}
            onHover={() => handleHover(modules[5].id)}
            onLeave={() => handleHover(null)}
            onClick={() => handleModuleClick(modules[5].id)}
          />
        </div>
        <div className="col-start-3 flex justify-start pl-8">
          <ModuleHexagon
            module={modules[6]}
            isHovered={hoveredModule === modules[6].id}
            isConnected={isModuleConnected(modules[6].id)}
            isSelected={selectedModule === modules[6].id}
            onHover={() => handleHover(modules[6].id)}
            onLeave={() => handleHover(null)}
            onClick={() => handleModuleClick(modules[6].id)}
          />
        </div>
      </div>
    </div>
  )
}

interface ModuleHexagonProps {
  module: Module
  isHovered: boolean
  isConnected: boolean
  isSelected: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}

function ModuleHexagon({ module, isHovered, isConnected, isSelected, onHover, onLeave, onClick }: ModuleHexagonProps) {
  const Icon = module.icon

  const springProps = useSpring({
    scale: isHovered ? 1.05 : 1,
    opacity: isConnected && !isHovered ? 1 : isHovered ? 1 : 0.8,
    config: { tension: 300, friction: 20 }
  })

  return (
    <animated.div
      style={springProps}
      className="relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={onLeave}
      onClick={onClick}
    >
      <motion.div
        className="relative w-40 h-44 group"
        whileHover={{ y: -5 }}
        transition={{ type: "spring", stiffness: 400 }}
      >
        {/* Hexagon Shape */}
        <div className="absolute inset-0">
          <svg viewBox="0 0 173.2 200" className="w-full h-full">
            <defs>
              <linearGradient id={`gradient-${module.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor={module.color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={module.color} stopOpacity="0.6" />
              </linearGradient>
              <filter id={`glow-${module.id}`}>
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            <path
              d="M86.6,0 L173.2,50 L173.2,150 L86.6,200 L0,150 L0,50 Z"
              fill={`url(#gradient-${module.id})`}
              stroke={module.color}
              strokeWidth={isHovered ? "3" : "1"}
              filter={isHovered ? `url(#glow-${module.id})` : undefined}
              className="transition-all duration-300"
            />
          </svg>
        </div>

        {/* Content */}
        <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
          <motion.div
            animate={{ 
              y: isHovered ? -5 : 0,
              scale: isHovered ? 1.1 : 1
            }}
            transition={{ type: "spring", stiffness: 400 }}
          >
            <Icon className="w-10 h-10 text-white mb-2" />
          </motion.div>
          <h3 className="text-white font-semibold text-sm text-center mb-1">{module.name}</h3>
          
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute top-full mt-2 bg-white rounded-lg shadow-xl p-3 z-30 w-48"
              >
                <p className="text-xs text-gray-600 mb-2">{module.description}</p>
                <div className="space-y-1">
                  {module.metrics.map((metric) => (
                    <div key={metric.label} className="flex justify-between text-xs">
                      <span className="text-gray-500">{metric.label}:</span>
                      <span className="font-semibold" style={{ color: module.color }}>{metric.value}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Connection Indicator */}
        <AnimatePresence>
          {isConnected && !isHovered && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0 }}
              className="absolute -top-2 -right-2 w-4 h-4 rounded-full bg-green-500 shadow-lg"
            />
          )}
        </AnimatePresence>
      </motion.div>
    </animated.div>
  )
}