'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { 
  Brain,
  Zap,
  Shield,
  Users,
  BarChart,
  Settings,
  ArrowRight,
  CheckCircle,
  DollarSign,
  Clock,
  TrendingUp,
  Sparkles
} from 'lucide-react'

const solutionModules = [
  {
    id: 'command',
    icon: Brain,
    title: 'AI Command Center',
    description: 'Central intelligence orchestrating all operations',
    features: [
      'Real-time decision making',
      'Predictive analytics',
      'Automated workflows',
      'Cross-module coordination'
    ],
    metrics: { value: '99.8%', label: 'Accuracy' },
    color: 'from-purple-500 to-indigo-600'
  },
  {
    id: 'financial',
    icon: DollarSign,
    title: 'Financial Suite',
    description: 'Real-time financial intelligence and automation',
    features: [
      'Automated invoicing',
      'Cash flow visibility',
      'Expense tracking',
      'Financial forecasting'
    ],
    metrics: { value: '₹5.2Cr', label: 'Cash Control' },
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'operations',
    icon: Settings,
    title: 'Operations Hub',
    description: 'End-to-end project management automation',
    features: [
      'Resource optimization',
      'Schedule management',
      'Quality control',
      'Progress tracking'
    ],
    metrics: { value: '45%', label: 'Faster Delivery' },
    color: 'from-blue-500 to-cyan-600'
  },
  {
    id: 'workforce',
    icon: Users,
    title: 'Workforce Management',
    description: 'Digital-first team coordination and HR',
    features: [
      'Digital attendance',
      'Payroll automation',
      'Performance tracking',
      'Team communication'
    ],
    metrics: { value: '2,847', label: 'Active Users' },
    color: 'from-orange-500 to-amber-600'
  },
  {
    id: 'analytics',
    icon: BarChart,
    title: 'Business Intelligence',
    description: 'Data-driven insights and reporting',
    features: [
      'Real-time dashboards',
      'Custom reports',
      'Predictive models',
      'ROI tracking'
    ],
    metrics: { value: '1,200+', label: 'Daily Insights' },
    color: 'from-pink-500 to-rose-600'
  },
  {
    id: 'compliance',
    icon: Shield,
    title: 'Compliance & Quality',
    description: 'Automated compliance and quality assurance',
    features: [
      'BNBC 2020 compliance',
      'Quality checklists',
      'Audit trails',
      'Digital approvals'
    ],
    metrics: { value: '100%', label: 'Compliance' },
    color: 'from-violet-500 to-purple-600'
  }
]

const transformationResults = [
  { icon: Clock, value: '45%', label: 'Faster Project Completion', description: 'From 180 to 99 days' },
  { icon: DollarSign, value: '₹50L+', label: 'Annual Savings', description: 'Per project efficiency' },
  { icon: Zap, value: '95%', label: 'Process Automation', description: 'Manual work eliminated' },
  { icon: TrendingUp, value: '99.8%', label: 'Data Accuracy', description: 'Error-free operations' }
]

export default function OrbitalSolutionSection() {
  return (
    <section id="solution" className="relative py-24 bg-gradient-to-b from-slate-900 to-slate-950 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-cyan-500/10 rounded-full blur-3xl" />
      </div>
      
      <Container className="relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-purple-500/20 mb-8"
          >
            <Sparkles className="w-5 h-5 text-purple-400" />
            <span className="text-sm font-medium text-purple-300">The Vextrus Solution</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">From Chaos to</span>
            <br />
            <span className="bg-gradient-to-r from-purple-400 via-cyan-400 to-pink-400 bg-clip-text text-transparent">
              AI Excellence
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Six intelligent modules working in perfect harmony, powered by a central AI brain 
            that transforms your construction business into a digital powerhouse
          </p>
        </motion.div>

        {/* Solution Modules Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          {solutionModules.map((module, index) => (
            <motion.div
              key={module.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="h-full p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-purple-500/30 transition-all duration-300">
                {/* Module Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className={`p-3 rounded-xl bg-gradient-to-r ${module.color} shadow-lg`}>
                    <module.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-white mb-2">{module.title}</h3>
                    <p className="text-sm text-slate-400">{module.description}</p>
                  </div>
                </div>

                {/* Features List */}
                <ul className="space-y-3 mb-6">
                  {module.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Module Metric */}
                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-2xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
                        {module.metrics.value}
                      </div>
                      <div className="text-sm text-slate-400">{module.metrics.label}</div>
                    </div>
                    <ArrowRight className="w-5 h-5 text-purple-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Transformation Results */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-5xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-white text-center mb-12">
            The Vextrus Impact: Measurable Results
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {transformationResults.map((result, index) => (
              <motion.div
                key={result.label}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-6 rounded-2xl bg-gradient-to-br from-slate-900/80 to-slate-800/80 backdrop-blur-xl border border-white/10 text-center group hover:border-purple-500/30 transition-all duration-300"
              >
                <result.icon className="w-10 h-10 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                <div className="text-3xl font-bold bg-gradient-to-r from-white to-purple-300 bg-clip-text text-transparent mb-2">
                  {result.value}
                </div>
                <div className="text-sm font-medium text-white mb-1">{result.label}</div>
                <div className="text-xs text-slate-400">{result.description}</div>
              </motion.div>
            ))}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-purple-500/10 to-cyan-500/10 backdrop-blur-sm border border-purple-500/20"
            >
              <Brain className="w-6 h-6 text-purple-400" />
              <span className="text-lg font-semibold text-white">
                One AI Brain. Six Powerful Modules. Infinite Possibilities.
              </span>
            </motion.div>
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}