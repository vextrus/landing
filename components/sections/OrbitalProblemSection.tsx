'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { 
  MessageSquare, 
  FileSpreadsheet, 
  FileText, 
  Clock,
  AlertTriangle,
  TrendingDown,
  ArrowRight,
  X,
  CheckCircle
} from 'lucide-react'

const businessProblems = [
  {
    id: 'communication',
    icon: MessageSquare,
    title: 'Communication Chaos',
    problems: [
      'WhatsApp groups overflow with 1000+ daily messages',
      'Critical decisions lost in chat history',
      'No accountability tracking',
      'Important files scattered across chats'
    ],
    impact: '3-4 hours daily wasted searching for information',
    cost: '₹25L+ annually in project delays'
  },
  {
    id: 'financial',
    icon: FileSpreadsheet,
    title: 'Financial Nightmare',
    problems: [
      '50+ Excel files with conflicting data',
      'Manual calculations with 35% error rate',
      'No real-time cash flow visibility',
      'Version control chaos'
    ],
    impact: 'Financial decisions based on 2-week old data',
    cost: '₹15L+ in calculation errors'
  },
  {
    id: 'documentation',
    icon: FileText,
    title: 'Document Disaster',
    problems: [
      'Contracts lost in email chains',
      '2-3 week approval delays',
      'Physical signatures bottleneck',
      'No audit trail'
    ],
    impact: 'Projects start 30 days late on average',
    cost: '₹10L+ in opportunity costs'
  },
  {
    id: 'operations',
    icon: Clock,
    title: 'Operational Inefficiency',
    problems: [
      '240+ hours monthly on manual tasks',
      'No visibility on site progress',
      'Resource allocation guesswork',
      'Quality control failures'
    ],
    impact: '45% of work is repetitive manual entry',
    cost: '₹30L+ in labor inefficiency'
  }
]

const vextrusSolutions = [
  { problem: 'WhatsApp chaos', solution: 'Centralized communication hub', icon: CheckCircle },
  { problem: 'Excel errors', solution: 'Automated financial tracking', icon: CheckCircle },
  { problem: 'Lost documents', solution: 'Digital document management', icon: CheckCircle },
  { problem: 'Manual processes', solution: '95% process automation', icon: CheckCircle }
]

export default function OrbitalProblemSection() {
  return (
    <section id="problem" className="relative py-24 bg-gradient-to-b from-slate-950 to-slate-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-5" />
        <div className="absolute top-1/2 left-0 w-[600px] h-[600px] bg-red-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-orange-500/5 rounded-full blur-3xl" />
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
            className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-red-500/10 backdrop-blur-sm border border-red-500/20 mb-8"
          >
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="text-sm font-medium text-red-300">The Hidden Cost of Manual Management</span>
          </motion.div>
          
          <h2 className="text-4xl lg:text-6xl font-bold mb-6">
            <span className="text-white">Is Your Business</span>
            <br />
            <span className="bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent">
              Bleeding ₹50L+ Annually?
            </span>
          </h2>
          
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Traditional construction management creates invisible costs through inefficiency, 
            errors, and lost opportunities. Here's what's really happening:
          </p>
        </motion.div>

        {/* Problems Grid */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {businessProblems.map((problem, index) => (
            <motion.div
              key={problem.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative group"
            >
              <div className="p-8 rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/10 hover:border-red-500/30 transition-all duration-300">
                {/* Problem Header */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20">
                    <problem.icon className="w-8 h-8 text-red-400" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-white mb-2">{problem.title}</h3>
                    <div className="text-sm font-medium text-red-400">{problem.cost}</div>
                  </div>
                </div>

                {/* Problem List */}
                <ul className="space-y-3 mb-6">
                  {problem.problems.map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <X className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
                      <span className="text-slate-300 text-sm leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>

                {/* Impact Box */}
                <div className="p-4 rounded-xl bg-red-500/5 border border-red-500/10">
                  <div className="flex items-start gap-3">
                    <TrendingDown className="w-5 h-5 text-orange-400 flex-shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-orange-400 mb-1">Business Impact</div>
                      <div className="text-sm text-slate-300">{problem.impact}</div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Total Cost Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="p-8 rounded-3xl bg-gradient-to-r from-red-900/20 to-orange-900/20 backdrop-blur-xl border border-red-500/20">
            <div className="text-center">
              <h3 className="text-3xl font-bold text-white mb-4">Total Annual Loss</h3>
              <div className="text-6xl font-bold bg-gradient-to-r from-red-400 to-orange-400 bg-clip-text text-transparent mb-4">
                ₹50L - ₹80L
              </div>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                Every year of delay in modernizing your operations costs you millions. 
                The competition using modern ERP systems is already 45% more efficient.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Solution Bridge */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h3 className="text-2xl font-bold text-white mb-8">The Vextrus Solution</h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {vextrusSolutions.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="p-4 rounded-xl bg-slate-900/40 backdrop-blur-sm border border-white/10"
              >
                <div className="flex flex-col items-center text-center">
                  <item.icon className="w-6 h-6 text-green-400 mb-3" />
                  <div className="text-sm text-slate-400 mb-1">{item.problem}</div>
                  <ArrowRight className="w-4 h-4 text-slate-500 my-2" />
                  <div className="text-sm font-medium text-white">{item.solution}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="inline-flex items-center gap-3 px-8 py-4 rounded-2xl bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-sm border border-green-500/20"
          >
            <span className="text-lg font-semibold text-white">
              Transform your business with AI-powered efficiency
            </span>
            <ArrowRight className="w-5 h-5 text-green-400" />
          </motion.div>
        </motion.div>
      </Container>
    </section>
  )
}