'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import OrbitalBackground from '@/components/shared/orbital/OrbitalBackground'
import GlassCard from '@/components/shared/orbital/GlassCard'
import BeamConnection from '@/components/shared/orbital/BeamConnection'
import { 
  Brain, 
  Zap, 
  Eye,
  Activity,
  Sparkles,
  Target,
  Cpu,
  BarChart3,
  Shield,
  Clock
} from 'lucide-react'

export default function OrbitalAIShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeFeature, setActiveFeature] = useState(0)
  const [neuralActivity, setNeuralActivity] = useState(0)
  const [dataFlow, setDataFlow] = useState(0)
  
  const aiFeatures = [
    {
      id: 'predictive',
      icon: Brain,
      title: 'Predictive Intelligence',
      description: 'AI analyzes patterns to predict project delays, cost overruns, and resource needs with 98% accuracy',
      color: '#8b5cf6',
      gradient: 'from-purple-500 to-indigo-600',
      stats: { label: 'Predictions/Day', value: '156' },
      capabilities: [
        'Cost overrun prediction 30 days ahead',
        'Weather impact on construction timeline',
        'Resource shortage forecasting',
        'Quality defect probability analysis'
      ]
    },
    {
      id: 'automated',
      icon: Zap,
      title: 'Automated Decision Making',
      description: 'Real-time decisions on resource allocation, vendor selection, and quality approvals',
      color: '#f59e0b',
      gradient: 'from-yellow-500 to-orange-600',
      stats: { label: 'Decisions/Day', value: '1,247' },
      capabilities: [
        'Auto-approve routine purchase orders',
        'Smart vendor selection based on history',
        'Dynamic resource reallocation',
        'Intelligent task prioritization'
      ]
    },
    {
      id: 'vision',
      icon: Eye,
      title: 'Computer Vision QC',
      description: 'AI-powered photo analysis detects construction defects instantly with 99.2% accuracy',
      color: '#06b6d4',
      gradient: 'from-cyan-500 to-blue-600',
      stats: { label: 'Accuracy Rate', value: '99.2%' },
      capabilities: [
        'Defect detection from site photos',
        'Progress tracking through imagery',
        'Safety compliance monitoring',
        'Material quality assessment'
      ]
    },
    {
      id: 'optimization',
      icon: Activity,
      title: 'Real-time Optimization',
      description: 'Continuous optimization of schedules, budgets, and workforce allocation',
      color: '#22c55e',
      gradient: 'from-green-500 to-emerald-600',
      stats: { label: 'Time Saved', value: '45%' },
      capabilities: [
        'Dynamic schedule optimization',
        'Budget reallocation suggestions',
        'Workforce productivity analysis',
        'Equipment utilization optimization'
      ]
    }
  ]

  // Simulate neural network activity
  useEffect(() => {
    if (!isInView) return
    
    const interval = setInterval(() => {
      setNeuralActivity(prev => (prev + 1) % 100)
      setDataFlow(prev => (prev + 2) % 100)
    }, 50)
    
    return () => clearInterval(interval)
  }, [isInView])

  return (
    <section ref={ref} className="py-24 relative overflow-hidden">
      {/* Neural Background */}
      <OrbitalBackground variant="neural" intensity={0.4} />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            className="text-center"
          >
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Cpu className="w-4 h-4" />
              AI-First Architecture
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The AI Brain Behind
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-cyan-600 bg-clip-text text-transparent"> Every Decision</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proprietary AI engine learns from every project, getting smarter with each decision 
              to deliver unprecedented accuracy and automation
            </p>
          </motion.div>

          {/* AI Visualization Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            {/* Left: Neural Network Visualization */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              <GlassCard
                variant="premium"
                blur="lg"
                glow
                className="p-8 h-[600px] relative overflow-hidden"
              >
                {/* Neural Core */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div
                    animate={{ 
                      rotate: 360,
                      scale: [1, 1.1, 1]
                    }}
                    transition={{ 
                      rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                      scale: { duration: 2, repeat: Infinity }
                    }}
                    className="relative"
                  >
                    <div className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-600/20 to-indigo-600/20 blur-2xl" />
                    <div className="absolute inset-0 w-40 h-40 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                      <Brain className="w-20 h-20 text-white" />
                    </div>
                  </motion.div>
                  
                  {/* Activity indicator */}
                  <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2">
                    <div className="flex items-center gap-2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full">
                      <Activity className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-semibold">{neuralActivity}% Active</span>
                    </div>
                  </div>
                </div>

                {/* Orbiting features */}
                {aiFeatures.map((feature, index) => {
                  const angle = (index * 90) * Math.PI / 180
                  const radius = 180
                  const x = Math.cos(angle) * radius
                  const y = Math.sin(angle) * radius
                  
                  return (
                    <motion.div
                      key={feature.id}
                      className="absolute top-1/2 left-1/2"
                      style={{
                        transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`
                      }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                    >
                      <motion.div
                        className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${feature.gradient} flex items-center justify-center cursor-pointer shadow-lg`}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setActiveFeature(index)}
                        animate={activeFeature === index ? {
                          boxShadow: [
                            '0 0 20px rgba(139, 92, 246, 0.5)',
                            '0 0 40px rgba(139, 92, 246, 0.8)',
                            '0 0 20px rgba(139, 92, 246, 0.5)'
                          ]
                        } : {}}
                        transition={{ duration: 2, repeat: activeFeature === index ? Infinity : 0 }}
                      >
                        <feature.icon className="w-8 h-8 text-white" />
                      </motion.div>
                      
                      {/* Connection beam */}
                      <BeamConnection
                        from={{ x: 300, y: 300 }}
                        to={{ x: 300 + x, y: 300 + y }}
                        active={activeFeature === index}
                        color={feature.color}
                        thickness={2}
                      />
                    </motion.div>
                  )
                })}

                {/* Stats overlay */}
                <div className="absolute top-4 left-4 right-4">
                  <div className="grid grid-cols-2 gap-4">
                    <GlassCard variant="default" blur="sm" className="p-3">
                      <div className="flex items-center gap-2">
                        <Target className="w-4 h-4 text-purple-600" />
                        <div>
                          <div className="text-xs text-gray-600">Accuracy</div>
                          <div className="text-sm font-bold">98.5%</div>
                        </div>
                      </div>
                    </GlassCard>
                    <GlassCard variant="default" blur="sm" className="p-3">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-cyan-600" />
                        <div>
                          <div className="text-xs text-gray-600">Response</div>
                          <div className="text-sm font-bold">&lt;100ms</div>
                        </div>
                      </div>
                    </GlassCard>
                  </div>
                </div>

                {/* Data flow visualization */}
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-purple-600 to-cyan-600"
                      style={{ width: `${dataFlow}%` }}
                      animate={{ x: ['0%', '100%', '0%'] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                    />
                  </div>
                  <div className="text-xs text-gray-600 mt-1">Data Processing: {dataFlow}%</div>
                </div>
              </GlassCard>
            </motion.div>

            {/* Right: Feature Details */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="space-y-4"
            >
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ 
                    opacity: activeFeature === index ? 1 : 0.6,
                    y: 0,
                    scale: activeFeature === index ? 1 : 0.98
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <GlassCard
                    variant={activeFeature === index ? "colored" : "default"}
                    blur="md"
                    hover
                    className={`p-6 cursor-pointer transition-all ${
                      activeFeature === index ? 'border-2 border-purple-400' : ''
                    }`}
                    onClick={() => setActiveFeature(index)}
                  >
                    <div className="flex items-start gap-4">
                      <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.gradient} flex-shrink-0`}>
                        <feature.icon className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                        
                        {/* Expandable capabilities */}
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: activeFeature === index ? 'auto' : 0 }}
                          className="overflow-hidden"
                        >
                          <div className="pt-3 border-t border-gray-200">
                            <div className="space-y-2">
                              {feature.capabilities.map((capability, i) => (
                                <motion.div
                                  key={i}
                                  initial={{ opacity: 0, x: -10 }}
                                  animate={{ opacity: 1, x: 0 }}
                                  transition={{ delay: i * 0.05 }}
                                  className="flex items-center gap-2 text-sm"
                                >
                                  <Shield className="w-3 h-3 text-green-500 flex-shrink-0" />
                                  <span className="text-gray-700">{capability}</span>
                                </motion.div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                        
                        <div className="flex items-center gap-4 mt-3">
                          <div className="bg-gray-100 rounded-lg px-3 py-1">
                            <span className="text-xs text-gray-600">{feature.stats.label}: </span>
                            <span className="text-sm font-bold text-gray-900">{feature.stats.value}</span>
                          </div>
                          {activeFeature === index && (
                            <motion.div
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              className="flex items-center gap-1 text-xs text-green-600"
                            >
                              <Sparkles className="w-3 h-3" />
                              <span>Active</span>
                            </motion.div>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlassCard>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Bottom Stats */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6 }}
            className="grid md:grid-cols-4 gap-6"
          >
            {[
              { icon: Target, label: 'Prediction Accuracy', value: '98.5%', trend: '+2.3%' },
              { icon: Clock, label: 'Time Saved Daily', value: '6.5 hrs', trend: '+45%' },
              { icon: Shield, label: 'Errors Prevented', value: '1,247', trend: '+128' },
              { icon: BarChart3, label: 'Cost Optimization', value: '৳4.5 Cr', trend: '+35%' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                whileHover={{ y: -5 }}
              >
                <GlassCard variant="default" blur="md" hover className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <stat.icon className="w-8 h-8 text-purple-600" />
                    <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                  </div>
                  <p className="text-3xl font-bold mb-1">{stat.value}</p>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                </GlassCard>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}