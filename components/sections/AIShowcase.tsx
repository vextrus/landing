'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState, useEffect } from 'react'
import { 
  Brain, 
  Zap, 
  TrendingUp, 
  Shield, 
  Clock, 
  BarChart3,
  Activity,
  Sparkles,
  Eye,
  Target,
  Cpu,
  Network
} from 'lucide-react'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const staggerContainer = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

export default function AIShowcase() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  const [activeFeature, setActiveFeature] = useState(0)
  const [aiStats, setAiStats] = useState({
    predictions: 156,
    accuracy: 98.5,
    timeSaved: 45,
    decisions: 1247
  })

  // Animate stats when in view
  useEffect(() => {
    if (isInView) {
      const interval = setInterval(() => {
        setAiStats(prev => ({
          predictions: Math.min(prev.predictions + 1, 200),
          accuracy: Math.min(prev.accuracy + 0.1, 99.2),
          timeSaved: Math.min(prev.timeSaved + 1, 65),
          decisions: Math.min(prev.decisions + 5, 1500)
        }))
      }, 50)

      return () => clearInterval(interval)
    }
  }, [isInView])

  const aiFeatures = [
    {
      icon: Brain,
      title: 'Predictive Intelligence',
      description: 'AI analyzes patterns to predict project delays, cost overruns, and resource needs with 98% accuracy',
      color: 'from-purple-500 to-indigo-600',
      stats: { label: 'Predictions/Day', value: aiStats.predictions }
    },
    {
      icon: Zap,
      title: 'Automated Decision Making',
      description: 'Real-time decisions on resource allocation, vendor selection, and quality approvals',
      color: 'from-yellow-500 to-orange-600',
      stats: { label: 'Decisions/Day', value: aiStats.decisions }
    },
    {
      icon: Eye,
      title: 'Computer Vision QC',
      description: 'AI-powered photo analysis detects construction defects instantly with 99.2% accuracy',
      color: 'from-cyan-500 to-blue-600',
      stats: { label: 'Accuracy Rate', value: `${aiStats.accuracy.toFixed(1)}%` }
    },
    {
      icon: Activity,
      title: 'Real-time Optimization',
      description: 'Continuous optimization of schedules, budgets, and workforce allocation',
      color: 'from-green-500 to-emerald-600',
      stats: { label: 'Time Saved', value: `${aiStats.timeSaved}%` }
    }
  ]

  return (
    <section ref={ref} className="py-24 bg-gradient-to-b from-gray-50 to-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="space-y-16"
        >
          {/* Header */}
          <motion.div variants={fadeInUp} className="text-center">
            <motion.div 
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-100 to-indigo-100 text-purple-700 text-sm font-medium mb-4"
              whileHover={{ scale: 1.05 }}
            >
              <Cpu className="w-4 h-4" />
              AI-First Architecture
            </motion.div>
            <h2 className="text-4xl md:text-5xl font-bold mb-4">
              The AI Brain Behind
              <span className="bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent"> Every Decision</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our proprietary AI engine learns from every project, getting smarter with each decision 
              to deliver unprecedented accuracy and automation
            </p>
          </motion.div>

          {/* Interactive Feature Display */}
          <motion.div variants={fadeInUp} className="grid lg:grid-cols-2 gap-12 items-center">
            {/* AI Visualization */}
            <div className="relative">
              <div className="relative w-full h-[500px] rounded-2xl bg-gradient-to-br from-gray-900 to-gray-800 overflow-hidden">
                {/* Animated background grid */}
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute inset-0" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />
                </div>

                {/* Central AI Core */}
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
                    <div className="w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 blur-2xl opacity-50" />
                    <div className="absolute inset-0 w-32 h-32 rounded-full bg-gradient-to-br from-purple-600 to-indigo-600 flex items-center justify-center">
                      <Brain className="w-16 h-16 text-white" />
                    </div>
                  </motion.div>

                  {/* Orbiting elements */}
                  {aiFeatures.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="absolute"
                      animate={{
                        rotate: -360
                      }}
                      transition={{
                        duration: 20,
                        repeat: Infinity,
                        ease: "linear",
                        delay: index * 5
                      }}
                      style={{
                        width: '300px',
                        height: '300px',
                        top: '50%',
                        left: '50%',
                        marginTop: '-150px',
                        marginLeft: '-150px'
                      }}
                    >
                      <motion.div
                        className={`absolute w-12 h-12 rounded-full flex items-center justify-center cursor-pointer
                          ${activeFeature === index ? 'bg-white shadow-xl' : 'bg-gray-700'}`}
                        style={{
                          top: 0,
                          left: '50%',
                          marginLeft: '-24px'
                        }}
                        whileHover={{ scale: 1.2 }}
                        onClick={() => setActiveFeature(index)}
                      >
                        <feature.icon className={`w-6 h-6 ${
                          activeFeature === index ? 'text-purple-600' : 'text-gray-400'
                        }`} />
                      </motion.div>
                    </motion.div>
                  ))}
                </div>

                {/* Connection lines */}
                <svg className="absolute inset-0 w-full h-full">
                  {[...Array(8)].map((_, i) => (
                    <motion.line
                      key={i}
                      x1="50%"
                      y1="50%"
                      x2={`${50 + 40 * Math.cos((i * Math.PI) / 4)}%`}
                      y2={`${50 + 40 * Math.sin((i * Math.PI) / 4)}%`}
                      stroke="url(#pulse-gradient)"
                      strokeWidth="1"
                      strokeDasharray="5,5"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        repeatType: "reverse",
                        delay: i * 0.2
                      }}
                    />
                  ))}
                  <defs>
                    <linearGradient id="pulse-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
                      <stop offset="50%" stopColor="#8B5CF6" stopOpacity="1" />
                      <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
                    </linearGradient>
                  </defs>
                </svg>

                {/* Live stats overlay */}
                <div className="absolute bottom-4 left-4 right-4 bg-black/50 backdrop-blur-sm rounded-lg p-4">
                  <div className="grid grid-cols-4 gap-4 text-center">
                    {Object.entries({
                      'Accuracy': '98.5%',
                      'Response': '<100ms',
                      'Uptime': '99.99%',
                      'Models': '15 ML'
                    }).map(([label, value]) => (
                      <div key={label}>
                        <p className="text-xs text-gray-400">{label}</p>
                        <p className="text-sm font-mono font-semibold text-white">{value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Feature Details */}
            <div className="space-y-6">
              {aiFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ 
                    opacity: activeFeature === index ? 1 : 0.5,
                    x: activeFeature === index ? 0 : 20,
                    scale: activeFeature === index ? 1 : 0.95
                  }}
                  transition={{ duration: 0.3 }}
                  className={`p-6 rounded-xl border-2 cursor-pointer transition-all
                    ${activeFeature === index 
                      ? 'bg-white shadow-xl border-purple-200' 
                      : 'bg-gray-50 border-gray-200 hover:border-gray-300'}`}
                  onClick={() => setActiveFeature(index)}
                >
                  <div className="flex items-start gap-4">
                    <div className={`p-3 rounded-lg bg-gradient-to-r ${feature.color}`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                      <p className="text-gray-600 text-sm mb-3">{feature.description}</p>
                      <div className="flex items-center gap-4">
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
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Bottom Stats */}
          <motion.div variants={fadeInUp} className="grid md:grid-cols-4 gap-6">
            {[
              { icon: Target, label: 'Prediction Accuracy', value: '98.5%', trend: '+2.3%' },
              { icon: Clock, label: 'Time Saved Daily', value: '6.5 hrs', trend: '+45%' },
              { icon: Shield, label: 'Errors Prevented', value: '1,247', trend: '+128' },
              { icon: BarChart3, label: 'Cost Optimization', value: '৳4.5 Cr', trend: '+35%' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="bg-white rounded-xl p-6 shadow-lg border border-gray-100"
                whileHover={{ y: -5, boxShadow: '0 20px 40px -10px rgba(0,0,0,0.1)' }}
              >
                <div className="flex items-center justify-between mb-4">
                  <stat.icon className="w-8 h-8 text-purple-600" />
                  <span className="text-xs text-green-600 font-medium">{stat.trend}</span>
                </div>
                <p className="text-3xl font-bold mb-1">{stat.value}</p>
                <p className="text-sm text-gray-600">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}