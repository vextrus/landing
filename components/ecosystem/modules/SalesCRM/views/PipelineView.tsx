'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import { 
  Phone,
  Mail,
  Calendar,
  DollarSign,
  ChevronRight,
  MessageSquare,
  MapPin,
  Clock,
  TrendingUp,
  User,
  Star,
  AlertCircle,
  CheckCircle,
  Home,
  Zap
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface Lead {
  id: string
  name: string
  phone: string
  email: string
  source: string
  interested: string[]
  budget: number
  score: number
  lastContact: string
  nextAction: string
  stage: 'inquiry' | 'qualified' | 'visit' | 'negotiation' | 'closing'
  aiInsight?: string
  priority: 'hot' | 'warm' | 'cold'
}

const staggerContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
}

export default function PipelineView() {
  const [selectedLead, setSelectedLead] = useState<string | null>(null)

  const stages = [
    { 
      id: 'inquiry', 
      name: 'Inquiry', 
      count: 847, 
      value: 254100000000,
      color: 'from-blue-400 to-cyan-600',
      bgColor: 'from-blue-500/20 to-cyan-500/20'
    },
    { 
      id: 'qualified', 
      name: 'Qualified', 
      count: 423, 
      value: 169200000000,
      color: 'from-purple-400 to-indigo-600',
      bgColor: 'from-purple-500/20 to-indigo-500/20'
    },
    { 
      id: 'visit', 
      name: 'Site Visit', 
      count: 312, 
      value: 124800000000,
      color: 'from-green-400 to-emerald-600',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    },
    { 
      id: 'negotiation', 
      name: 'Negotiation', 
      count: 156, 
      value: 62400000000,
      color: 'from-amber-400 to-orange-600',
      bgColor: 'from-amber-500/20 to-orange-500/20'
    },
    { 
      id: 'closing', 
      name: 'Closing', 
      count: 89, 
      value: 35600000000,
      color: 'from-red-400 to-rose-600',
      bgColor: 'from-red-500/20 to-rose-500/20'
    }
  ]

  const leads: Lead[] = [
    {
      id: '1',
      name: 'Rashid Ahmed',
      phone: '+8801712345678',
      email: 'rashid@example.com',
      source: 'Facebook',
      interested: ['3 BHK', 'South Facing', 'Gulshan'],
      budget: 90000000,
      score: 92,
      lastContact: '2 hours ago',
      nextAction: 'Schedule site visit',
      stage: 'qualified',
      aiInsight: 'High purchase intent detected. Mentioned immediate family need.',
      priority: 'hot'
    },
    {
      id: '2',
      name: 'Fatima Begum',
      phone: '+8801823456789',
      email: 'fatima@example.com',
      source: 'WhatsApp',
      interested: ['2 BHK', 'Corner Unit'],
      budget: 75000000,
      score: 78,
      lastContact: '1 day ago',
      nextAction: 'Send floor plans',
      stage: 'inquiry',
      aiInsight: 'Budget-conscious buyer. Emphasize payment plans.',
      priority: 'warm'
    },
    {
      id: '3',
      name: 'Karim Chowdhury',
      phone: '+8801934567890',
      email: 'karim@example.com',
      source: 'Direct Call',
      interested: ['4 BHK', 'Top Floor', 'Dhanmondi'],
      budget: 120000000,
      score: 95,
      lastContact: '5 mins ago',
      nextAction: 'Prepare contract',
      stage: 'negotiation',
      aiInsight: 'Ready to close. Decision maker confirmed.',
      priority: 'hot'
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'from-green-400 to-emerald-600'
    if (score >= 60) return 'from-amber-400 to-orange-600'
    return 'from-red-400 to-rose-600'
  }

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case 'hot': return '🔥'
      case 'warm': return '☀️'
      case 'cold': return '❄️'
    }
  }

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="p-6 space-y-6"
    >
      {/* Pipeline Overview */}
      <motion.div variants={fadeInUp}>
        <h2 className="text-2xl font-bold text-white mb-6">Sales Pipeline</h2>
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          {stages.map((stage, index) => (
            <motion.div
              key={stage.id}
              variants={fadeInUp}
              custom={index}
            >
              <GlassCard className="p-6 h-full relative overflow-hidden" variant="accent" hover>
                {/* Background gradient */}
                <div className={`absolute inset-0 bg-gradient-to-br ${stage.bgColor} opacity-50`} />
                
                <div className="relative z-10">
                  <h3 className="font-semibold text-white mb-4">{stage.name}</h3>
                  
                  <div className="space-y-3">
                    <div>
                      <p className="text-3xl font-bold text-white">
                        <AnimatedCounter value={stage.count} />
                      </p>
                      <p className="text-sm text-gray-400">leads</p>
                    </div>
                    
                    <div>
                      <p className={`text-xl font-bold bg-gradient-to-r ${stage.color} bg-clip-text text-transparent`}>
                        {formatBDT(stage.value)}
                      </p>
                      <p className="text-sm text-gray-400">potential</p>
                    </div>
                  </div>
                  
                  {/* Animated progress bar */}
                  <div className="mt-4 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(stage.count / stages[0].count) * 100}%` }}
                      transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                      className={`h-full bg-gradient-to-r ${stage.color}`}
                    />
                  </div>
                </div>

                {/* Connector arrow */}
                {index < stages.length - 1 && (
                  <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20">
                    <ChevronRight className="w-6 h-6 text-gray-600" />
                  </div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* AI Insights Summary */}
      <motion.div variants={fadeInUp}>
        <GlassCard className="p-6" variant="accent">
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
              <Zap className="w-6 h-6 text-purple-400" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-white mb-2">AI Pipeline Analysis</h3>
              <p className="text-gray-300">
                <span className="font-semibold text-green-400">3 hot leads</span> require immediate attention. 
                Conversion probability increased by <span className="font-semibold text-blue-400">23%</span> this week. 
                Recommended focus: <span className="font-semibold text-amber-400">Schedule 5 site visits</span> for qualified leads 
                to maintain momentum.
              </p>
            </div>
          </div>
        </GlassCard>
      </motion.div>

      {/* Hot Leads */}
      <motion.div variants={fadeInUp}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-white">Hot Leads</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span>AI-Prioritized</span>
          </div>
        </div>

        <div className="space-y-4">
          {leads.map((lead, index) => (
            <motion.div
              key={lead.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GlassCard 
                className="p-6 cursor-pointer group" 
                variant="accent" 
                hover
                onClick={() => setSelectedLead(lead.id === selectedLead ? null : lead.id)}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-4">
                    {/* Avatar with score */}
                    <div className="relative">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-600 to-gray-700 flex items-center justify-center text-white font-semibold">
                        {lead.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-gradient-to-r ${getScoreColor(lead.score)} flex items-center justify-center text-xs font-bold text-white`}>
                        {lead.score}
                      </div>
                    </div>

                    {/* Lead Info */}
                    <div>
                      <div className="flex items-center gap-3">
                        <h4 className="font-semibold text-white text-lg">{lead.name}</h4>
                        <span className="text-lg">{getPriorityIcon(lead.priority)}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          lead.stage === 'negotiation' ? 'bg-amber-500/20 text-amber-400' :
                          lead.stage === 'qualified' ? 'bg-green-500/20 text-green-400' :
                          'bg-blue-500/20 text-blue-400'
                        }`}>
                          {stages.find(s => s.id === lead.stage)?.name}
                        </span>
                      </div>
                      
                      <div className="flex items-center gap-4 mt-2 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Phone className="w-4 h-4" />
                          <span>{lead.phone}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Mail className="w-4 h-4" />
                          <span>{lead.email}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{lead.lastContact}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2 mt-3">
                        {lead.interested.map((interest) => (
                          <span key={interest} className="px-2 py-1 rounded-lg bg-white/10 text-xs text-gray-300">
                            {interest}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Budget and Action */}
                  <div className="text-right">
                    <p className="text-2xl font-bold text-white">{formatBDT(lead.budget)}</p>
                    <p className="text-sm text-gray-400">Budget</p>
                    
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      className="mt-3 bg-gradient-to-r from-blue-600 to-indigo-600"
                    >
                      {lead.nextAction}
                    </AnimatedButton>
                  </div>
                </div>

                {/* AI Insight - Expandable */}
                {selectedLead === lead.id && lead.aiInsight && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    className="mt-4 pt-4 border-t border-white/10"
                  >
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                        <Zap className="w-4 h-4 text-purple-400" />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-white mb-1">AI Insight</p>
                        <p className="text-sm text-gray-300">{lead.aiInsight}</p>
                        
                        <div className="flex items-center gap-2 mt-3">
                          <AnimatedButton variant="ghost" size="sm">
                            <MessageSquare className="w-4 h-4" />
                            WhatsApp
                          </AnimatedButton>
                          <AnimatedButton variant="ghost" size="sm">
                            <Calendar className="w-4 h-4" />
                            Schedule
                          </AnimatedButton>
                          <AnimatedButton variant="ghost" size="sm">
                            <Home className="w-4 h-4" />
                            Show Properties
                          </AnimatedButton>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Quick Stats */}
      <motion.div variants={fadeInUp} className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { icon: TrendingUp, label: 'Weekly Growth', value: '+23%', color: 'from-green-400 to-emerald-600' },
          { icon: Calendar, label: 'Visits Today', value: '12', color: 'from-blue-400 to-indigo-600' },
          { icon: MessageSquare, label: 'WhatsApp Leads', value: '89', color: 'from-purple-400 to-pink-600' },
          { icon: Star, label: 'Avg Lead Score', value: '82', color: 'from-amber-400 to-orange-600' }
        ].map((stat) => (
          <GlassCard key={stat.label} className="p-6" variant="accent" hover>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-400">{stat.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${stat.color} bg-clip-text text-transparent`}>
                  {stat.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${stat.color.replace('from-', 'from-').replace('to-', 'to-').replace('400', '500/20').replace('600', '500/20')}`}>
                <stat.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </motion.div>
    </motion.div>
  )
}