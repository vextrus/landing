import { useState, useEffect, useRef } from 'react'
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
  Sparkles,
  Brain,
  Zap
} from 'lucide-react'
import AuroraNeuralGrid from './AuroraNeuralGrid'
import BeamConnectionFlow from './BeamConnectionFlow'

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
  position?: { x: number; y: number }
}

const modules: Module[] = [
  {
    id: 'financial',
    name: 'Financial Suite',
    icon: DollarSign,
    color: '#14B8A6',
    gradient: 'from-teal-400 to-cyan-600',
    metrics: [
      { label: 'Cash Flow', value: '৳5.2 Cr' },
      { label: 'Savings', value: '35%' }
    ],
    description: 'Complete financial control',
    connections: ['command', 'procurement', 'sales']
  },
  {
    id: 'sales',
    name: 'Sales CRM',
    icon: Users,
    color: '#22C55E',
    gradient: 'from-green-400 to-emerald-600',
    metrics: [
      { label: 'Pipeline', value: '৳12.8 Cr' },
      { label: 'Conversion', value: '68%' }
    ],
    description: 'Smart sales automation',
    connections: ['command', 'financial', 'hr']
  },
  {
    id: 'procurement',
    name: 'Procurement',
    icon: ShoppingCart,
    color: '#F59E0B',
    gradient: 'from-amber-400 to-orange-500',
    metrics: [
      { label: 'Orders', value: '1,247' },
      { label: 'Efficiency', value: '91%' }
    ],
    description: 'Intelligent sourcing',
    connections: ['command', 'financial', 'quality']
  },
  {
    id: 'quality',
    name: 'Quality Control',
    icon: Shield,
    color: '#8B5CF6',
    gradient: 'from-purple-400 to-violet-600',
    metrics: [
      { label: 'Pass Rate', value: '99.2%' },
      { label: 'Defects', value: '0.8%' }
    ],
    description: 'Zero-defect guarantee',
    connections: ['command', 'procurement', 'analytics']
  },
  {
    id: 'hr',
    name: 'Human Resources',
    icon: UserCheck,
    color: '#EF4444',
    gradient: 'from-red-400 to-rose-600',
    metrics: [
      { label: 'Team Size', value: '2,847' },
      { label: 'Retention', value: '94%' }
    ],
    description: 'People-first approach',
    connections: ['command', 'sales', 'analytics']
  },
  {
    id: 'analytics',
    name: 'Business Analytics',
    icon: LineChart,
    color: '#06B6D4',
    gradient: 'from-cyan-400 to-blue-500',
    metrics: [
      { label: 'Insights', value: '1,247' },
      { label: 'Accuracy', value: '97%' }
    ],
    description: 'Data-driven decisions',
    connections: ['command', 'quality', 'hr']
  }
]

interface OrbitalGridProps {
  onModuleClick: (moduleId: string) => void
  activeConnections?: string[]
  onModuleHover?: (moduleId: string | null) => void
}

export default function OrbitalGrid({ onModuleClick, activeConnections = [], onModuleHover }: OrbitalGridProps) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const [hoveredModule, setHoveredModule] = useState<string | null>(null)
  const [selectedModule, setSelectedModule] = useState<string | null>(null)
  const [centerHovered, setCenterHovered] = useState(false)
  const containerRef = useRef<HTMLDivElement>(null)

  // Calculate positions for modules in a safe orbital pattern
  const calculateModulePositions = () => {
    if (dimensions.width === 0 || dimensions.height === 0) return []
    
    const centerX = dimensions.width / 2
    const centerY = dimensions.height / 2
    const radius = Math.min(dimensions.width, dimensions.height) * 0.34
    
    // Safe angle offset to avoid cardinal directions that cause SVG gradient issues
    const baseAngleOffset = -75 * Math.PI / 180 // Start at -75 degrees
    const angleIncrement = (2 * Math.PI) / modules.length
    
    return modules.map((module, index) => {
      const angle = baseAngleOffset + (index * angleIncrement)
      return {
        ...module,
        position: {
          x: centerX + radius * Math.cos(angle),
          y: centerY + radius * Math.sin(angle)
        }
      }
    })
  }

  const modulesWithPositions = calculateModulePositions()

  // Handle container resize
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect()
        setDimensions({ width, height })
      }
    }

    updateDimensions()
    window.addEventListener('resize', updateDimensions)
    return () => window.removeEventListener('resize', updateDimensions)
  }, [])

  const handleHover = (moduleId: string | null) => {
    setHoveredModule(moduleId)
    onModuleHover?.(moduleId)
  }

  const handleModuleClick = (moduleId: string) => {
    setSelectedModule(moduleId)
    onModuleClick(moduleId)
  }

  const isModuleConnected = (moduleId: string) => {
    return activeConnections.includes(moduleId) || 
           (hoveredModule && modules.find(m => m.id === hoveredModule)?.connections.includes(moduleId)) || false
  }

  return (
    <div ref={containerRef} className="relative w-full h-[950px] overflow-hidden">
      {/* Refined Aurora Neural Grid Background */}
      <AuroraNeuralGrid intensity={0.2} colorScheme="purple" />

      {/* Base SVG connections for guaranteed visibility */}
      <svg className="absolute inset-0 pointer-events-none" style={{ zIndex: 2 }}>
        <defs>
          <linearGradient id="base-connection" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#8b5cf6" stopOpacity="0.2" />
            <stop offset="50%" stopColor="#a855f7" stopOpacity="0.3" />
            <stop offset="100%" stopColor="#c084fc" stopOpacity="0.2" />
          </linearGradient>
          
          {/* Subtle glow filter */}
          <filter id="base-glow">
            <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        {dimensions.width > 0 && modulesWithPositions.map(module => {
          if (!module.position) return null
          const centerX = dimensions.width / 2
          const centerY = dimensions.height / 2
          
          return (
            <g key={`base-${module.id}`}>
              {/* Subtle glow layer */}
              <line
                x1={centerX}
                y1={centerY}
                x2={module.position.x}
                y2={module.position.y}
                stroke="url(#base-connection)"
                strokeWidth="3"
                opacity="0.4"
                filter="url(#base-glow)"
              />
              {/* Main line */}
              <line
                x1={centerX}
                y1={centerY}
                x2={module.position.x}
                y2={module.position.y}
                stroke="url(#base-connection)"
                strokeWidth="1"
                strokeDasharray={hoveredModule === module.id ? "none" : "3 6"}
                opacity={hoveredModule === module.id ? "0.7" : "0.5"}
              />
            </g>
          )
        })}
      </svg>

      {/* Refined Beam Connection Flow System */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 4 }}>
        <BeamConnectionFlow 
          connections={modulesWithPositions.map(module => {
            if (!module.position) return null
            const centerX = dimensions.width / 2
            const centerY = dimensions.height / 2
            return {
              from: { x: centerX, y: centerY, id: 'brain' },
              to: { x: module.position.x, y: module.position.y, id: module.id },
              active: hoveredModule === module.id || selectedModule === module.id,
              color: module.color
            }
          }).filter(Boolean) as any[]}
          hoveredModule={hoveredModule}
        />
      </div>

      {/* Refined Central Command Hub */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" style={{ zIndex: 15 }}>
        <motion.div
          className="relative cursor-pointer"
          animate={{
            scale: centerHovered ? 1.03 : hoveredModule ? 0.98 : 1,
          }}
          transition={{ type: "spring", stiffness: 200, damping: 25 }}
          onMouseEnter={() => setCenterHovered(true)}
          onMouseLeave={() => setCenterHovered(false)}
          onClick={() => {
            console.log('🎯 Center clicked - opening Command Center')
            handleModuleClick('command')
          }}
        >
          {/* Subtle ambient glow */}
          <motion.div
            className="absolute -inset-8 rounded-full opacity-40"
            animate={{
              background: [
                'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
                'radial-gradient(circle, rgba(99,102,241,0.2) 0%, transparent 70%)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: 'blur(20px)' }}
          />
          
          {/* Elegant Dark Glass Command Center */}
          <div className={`relative w-48 h-48 rounded-full bg-slate-900/90 backdrop-blur-xl border border-white/20 flex items-center justify-center overflow-hidden transition-all duration-300 ${
            centerHovered ? 'bg-slate-800/95 border-white/30 shadow-2xl shadow-indigo-500/20' : 'shadow-xl shadow-slate-900/30'
          }`}>
            {/* Subtle rotating accent border */}
            <motion.div
              className="absolute inset-0 rounded-full opacity-30"
              style={{
                background: 'conic-gradient(from 0deg, rgba(99,102,241,0.5), transparent, rgba(168,85,247,0.3), transparent, rgba(99,102,241,0.5))',
                padding: '1px'
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            >
              <div className="w-full h-full rounded-full bg-transparent" />
            </motion.div>
            
            {/* Refined AI Brain + Command Center */}
            <div className="relative z-10 flex flex-col items-center">
              <div className="flex items-center gap-3 mb-2">
                <motion.div
                  animate={centerHovered ? { 
                    scale: 1.1
                  } : {
                    scale: 1
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <Brain className="w-12 h-12 text-indigo-400" />
                </motion.div>
                <div className="h-8 w-px bg-gradient-to-b from-transparent via-indigo-400/50 to-transparent" />
                <motion.div
                  animate={centerHovered ? { 
                    scale: 1.1
                  } : {
                    scale: 1
                  }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                >
                  <Building2 className="w-12 h-12 text-slate-300" />
                </motion.div>
              </div>
              
              <motion.div className="flex flex-col items-center">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">AI Command Center</span>
                </div>
                <span className="text-xs text-slate-400">Neural Control Hub</span>
              </motion.div>
            </div>
            
            {/* Single refined pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-indigo-400/20"
              animate={{
                scale: [1, 1.2, 1.2],
                opacity: [0.3, 0, 0]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity,
                ease: "easeOut"
              }}
            />
            
            {/* Elegant status indicator */}
            <motion.div
              className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-500/80 backdrop-blur-sm border border-emerald-400/50"
              animate={{
                opacity: [0.8, 1, 0.8]
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </div>
          
          {/* Refined stats display */}
          <motion.div
            className="absolute -bottom-12 left-1/2 transform -translate-x-1/2 bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              <div className="flex flex-col items-start">
                <span className="text-xs font-semibold text-white">1,247 decisions/hour</span>
                <span className="text-xs text-slate-400">152 active projects</span>
              </div>
            </div>
          </motion.div>
          
          {/* Elegant hover tooltip */}
          <AnimatePresence>
            {centerHovered && (
              <motion.div
                className="absolute -top-20 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-sm font-medium flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-indigo-400" />
                  Explore Command Center
                </div>
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-full">
                  <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[6px] border-t-slate-900/95" />
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Refined Module Cards */}
      <AnimatePresence>
        {modulesWithPositions.map((module, index) => (
          module.position && (
            <motion.div
              key={module.id}
              className="absolute"
              style={{
                left: module.position.x,
                top: module.position.y,
                x: '-50%',
                y: '-50%',
                zIndex: hoveredModule === module.id ? 10 : 5
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ 
                scale: 1, 
                opacity: 1,
              }}
              transition={{ 
                delay: index * 0.1,
                type: "spring",
                stiffness: 200
              }}
            >
              <ModuleCard
                module={module}
                isHovered={hoveredModule === module.id}
                isConnected={isModuleConnected(module.id)}
                isSelected={!!selectedModule && selectedModule === module.id}
                onHover={() => handleHover(module.id)}
                onLeave={() => handleHover(null)}
                onClick={() => handleModuleClick(module.id)}
              />
            </motion.div>
          )
        ))}
      </AnimatePresence>
    </div>
  )
}

interface ModuleCardProps {
  module: Module
  isHovered: boolean
  isConnected: boolean
  isSelected: boolean
  onHover: () => void
  onLeave: () => void
  onClick: () => void
}

function ModuleCard({ module, isHovered, isConnected, isSelected, onHover, onLeave, onClick }: ModuleCardProps) {
  const Icon = module.icon
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })

  // Refined spring animation - more subtle
  const springProps = useSpring({
    scale: isHovered ? 1.05 : isConnected ? 1.02 : 1,
    rotateX: isHovered ? mousePos.y * 0.08 : 0,
    rotateY: isHovered ? -mousePos.x * 0.08 : 0,
    x: isHovered ? -mousePos.x * 1 : 0,
    y: isHovered ? -mousePos.y * 1 : 0,
    config: { tension: 200, friction: 25 }
  })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2
    setMousePos({ x, y })
  }

  return (
    <animated.div
      style={{
        transform: springProps.scale.to((s) => {
          const rx = springProps.rotateX.get()
          const ry = springProps.rotateY.get()
          const x = springProps.x.get()
          const y = springProps.y.get()
          return `perspective(1000px) translateX(${x}px) translateY(${y}px) scale(${s}) rotateX(${rx}deg) rotateY(${ry}deg)`
        }),
      }}
      className="relative cursor-pointer"
      onMouseEnter={onHover}
      onMouseLeave={() => {
        onLeave()
        setMousePos({ x: 0, y: 0 })
      }}
      onMouseMove={handleMouseMove}
      onClick={onClick}
    >
      <motion.div
        className="relative group"
        animate={isHovered ? {
          filter: 'drop-shadow(0 8px 32px rgba(15, 23, 42, 0.3))'
        } : {
          filter: 'drop-shadow(0 4px 16px rgba(15, 23, 42, 0.2))'
        }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {/* Elegant Dark Glass Module Card */}
        <div className={`
          relative w-44 h-44 rounded-3xl overflow-visible
          bg-slate-900/80 backdrop-blur-xl
          border border-white/10
          transition-all duration-300 ease-out
          ${isHovered ? 'bg-slate-800/90 border-white/20' : ''}
        `}>
          {/* Subtle gradient overlay - only on hover */}
          {isHovered && (
            <motion.div
              className="absolute inset-0 opacity-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.2 }}
              exit={{ opacity: 0 }}
              style={{
                background: `linear-gradient(135deg, ${module.color}30 0%, transparent 60%)`
              }}
            />
          )}
          
          {/* Content */}
          <div className="relative z-10 p-5 h-full flex flex-col items-center justify-center text-center">
            {/* Icon with subtle animation */}
            <motion.div
              className={`inline-flex p-4 rounded-2xl bg-gradient-to-r ${module.gradient} mb-3 shadow-lg`}
              animate={isHovered ? { 
                scale: 1.1
              } : { 
                scale: 1 
              }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
            
            {/* Title */}
            <h3 className="font-bold text-base text-white mb-1">{module.name}</h3>
            
            {/* Metrics - subtle fade on hover */}
            <motion.div
              animate={{ opacity: isHovered ? 0.7 : 1 }}
              transition={{ duration: 0.2 }}
              className="space-y-1"
            >
              {module.metrics.slice(0, 1).map((metric) => (
                <div key={metric.label} className="text-xs">
                  <span className="text-slate-400">{metric.label}: </span>
                  <span className="font-semibold text-slate-200">{metric.value}</span>
                </div>
              ))}
            </motion.div>
          </div>
          
          {/* Refined hover overlay */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="absolute inset-0 pointer-events-none"
              >
                {/* Elegant tooltip like Command Center */}
                <motion.div
                  className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-slate-900/95 backdrop-blur-xl border border-white/20 text-white px-4 py-2 rounded-xl shadow-2xl whitespace-nowrap"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-sm font-medium flex items-center gap-2">
                    <svg className="w-4 h-4" style={{ color: module.color }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                        d="M9 5l7 7-7 7" />
                    </svg>
                    Enter Module
                  </div>
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2">
                    <div className="w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-b-[6px] border-b-slate-900/95" />
                  </div>
                </motion.div>
                
                {/* Subtle accent glow */}
                <motion.div
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 0.3 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <div 
                    className="w-20 h-20 rounded-full blur-xl"
                    style={{ background: `${module.color}40` }}
                  />
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Single elegant border ring on hover */}
        {isHovered && (
          <motion.div
            className="absolute inset-0 rounded-3xl pointer-events-none"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
          >
            <div 
              className="absolute inset-[-2px] rounded-3xl"
              style={{
                background: `linear-gradient(135deg, ${module.color}40, transparent, ${module.color}20)`,
                padding: '2px'
              }}
            >
              <div className="w-full h-full rounded-3xl bg-transparent" />
            </div>
          </motion.div>
        )}
      </motion.div>
    </animated.div>
  )
}