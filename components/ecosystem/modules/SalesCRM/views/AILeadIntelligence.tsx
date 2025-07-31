'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain,
  Zap,
  TrendingUp,
  MessageSquare,
  Phone,
  Mail,
  User,
  Clock,
  Target,
  BarChart3,
  Sparkles,
  Activity,
  AlertTriangle,
  CheckCircle,
  Filter,
  Search,
  Mic,
  Globe,
  Star,
  ChevronRight,
  Calendar,
  Home
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'
import { formatBDT, formatPercentage } from '../../../utils/bdCurrency'

interface LeadInsight {
  id: string
  leadName: string
  score: number
  intent: 'high' | 'medium' | 'low'
  predictedValue: number
  conversionProbability: number
  nextBestAction: string
  keyInsights: string[]
  communicationSummary: {
    calls: number
    messages: number
    emails: number
    lastContact: string
  }
  behaviorPatterns: {
    preferredChannel: string
    bestCallTime: string
    responseRate: number
    interests: string[]
  }
  nlpAnalysis: {
    sentiment: 'positive' | 'neutral' | 'negative'
    urgency: number
    budgetMentioned: boolean
    decisionTimeframe: string
  }
}

export default function AILeadIntelligence() {
  const [selectedLead, setSelectedLead] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const aiMetrics = {
    totalLeadsAnalyzed: 3421,
    conversionImprovement: 45,
    avgResponseTime: 2.3,
    accuracyRate: 94
  }

  const leadInsights: LeadInsight[] = [
    {
      id: '1',
      leadName: 'Rashid Ahmed',
      score: 92,
      intent: 'high',
      predictedValue: 90000000,
      conversionProbability: 85,
      nextBestAction: 'Schedule immediate site visit - mentioned wife is pregnant',
      keyInsights: [
        'Expecting child in 3 months - urgent need',
        'Previously owned property in Mirpur',
        'Prefers south-facing units',
        'Budget flexible for right property'
      ],
      communicationSummary: {
        calls: 5,
        messages: 23,
        emails: 8,
        lastContact: '2 hours ago'
      },
      behaviorPatterns: {
        preferredChannel: 'WhatsApp',
        bestCallTime: '7-9 PM',
        responseRate: 95,
        interests: ['3 BHK', 'Gulshan', 'Ready to move']
      },
      nlpAnalysis: {
        sentiment: 'positive',
        urgency: 9,
        budgetMentioned: true,
        decisionTimeframe: '2 weeks'
      }
    },
    {
      id: '2',
      leadName: 'Fatima Begum',
      score: 78,
      intent: 'medium',
      predictedValue: 75000000,
      conversionProbability: 65,
      nextBestAction: 'Send personalized property recommendations',
      keyInsights: [
        'First-time buyer, needs guidance',
        'Concerned about loan process',
        'Looking for good schools nearby',
        'Comparing multiple projects'
      ],
      communicationSummary: {
        calls: 3,
        messages: 15,
        emails: 5,
        lastContact: '1 day ago'
      },
      behaviorPatterns: {
        preferredChannel: 'Phone',
        bestCallTime: '11 AM - 1 PM',
        responseRate: 75,
        interests: ['2 BHK', 'Dhanmondi', 'Good schools']
      },
      nlpAnalysis: {
        sentiment: 'neutral',
        urgency: 6,
        budgetMentioned: true,
        decisionTimeframe: '1-2 months'
      }
    },
    {
      id: '3',
      leadName: 'Karim Chowdhury',
      score: 95,
      intent: 'high',
      predictedValue: 120000000,
      conversionProbability: 92,
      nextBestAction: 'Prepare contract - ready to close',
      keyInsights: [
        'Cash buyer, no loan needed',
        'Buying for investment purpose',
        'Has purchased 3 properties before',
        'Decision maker confirmed'
      ],
      communicationSummary: {
        calls: 8,
        messages: 31,
        emails: 12,
        lastContact: '5 mins ago'
      },
      behaviorPatterns: {
        preferredChannel: 'Direct Call',
        bestCallTime: 'Any time',
        responseRate: 100,
        interests: ['Premium', 'Top floor', 'Investment']
      },
      nlpAnalysis: {
        sentiment: 'positive',
        urgency: 10,
        budgetMentioned: true,
        decisionTimeframe: 'This week'
      }
    }
  ]

  const getIntentColor = (intent: string) => {
    switch (intent) {
      case 'high': return 'from-green-400 to-emerald-600'
      case 'medium': return 'from-amber-400 to-orange-600'
      case 'low': return 'from-red-400 to-rose-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const filteredLeads = leadInsights.filter(lead => 
    (filter === 'all' || lead.intent === filter) &&
    (searchQuery === '' || lead.leadName.toLowerCase().includes(searchQuery.toLowerCase()))
  )

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Lead Intelligence</h2>
          <p className="text-gray-400">NLP-powered lead scoring and behavioral analysis</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <Mic className="w-4 h-4" />
            <span>Voice Search</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Brain className="w-4 h-4" />
            <span>Train Model</span>
          </AnimatedButton>
        </div>
      </div>

      {/* AI Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Brain,
            label: 'Leads Analyzed',
            value: aiMetrics.totalLeadsAnalyzed,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          },
          {
            icon: TrendingUp,
            label: 'Conversion Boost',
            value: `+${aiMetrics.conversionImprovement}%`,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: Clock,
            label: 'Avg Response Time',
            value: `${aiMetrics.avgResponseTime}h`,
            color: 'from-blue-400 to-cyan-600',
            bgColor: 'from-blue-500/20 to-cyan-500/20'
          },
          {
            icon: Target,
            label: 'AI Accuracy',
            value: `${aiMetrics.accuracyRate}%`,
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {typeof metric.value === 'number' ? <AnimatedCounter value={metric.value} /> : metric.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* AI Analysis Summary */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Executive Summary</h3>
            <p className="text-gray-300">
              Based on NLP analysis of <span className="font-semibold text-white">12,847 conversations</span>, 
              the AI has identified <span className="font-semibold text-green-400">23 high-intent leads</span> requiring 
              immediate attention. Sentiment analysis shows <span className="font-semibold text-blue-400">78% positive</span> buyer 
              sentiment this week. Recommended focus: <span className="font-semibold text-amber-400">Schedule 8 site visits</span> for 
              leads with urgency score above 8.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Filter and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(['all', 'high', 'medium', 'low'] as const).map((intent) => (
            <AnimatedButton
              key={intent}
              variant={filter === intent ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(intent)}
              className={filter === intent ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25' : 'hover:bg-white/5'}
            >
              {intent === 'all' ? 'All Leads' : `${intent.charAt(0).toUpperCase() + intent.slice(1)} Intent`}
            </AnimatedButton>
          ))}
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search leads..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Lead Intelligence Cards */}
      <div className="space-y-6">
        {filteredLeads.map((lead, index) => (
          <motion.div
            key={lead.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6" 
              variant="accent" 
              hover
              onClick={() => setSelectedLead(lead.id === selectedLead ? null : lead.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* Lead Score */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getIntentColor(lead.intent)} p-1`}>
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{lead.score}</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      {lead.intent === 'high' && <Zap className="w-5 h-5 text-yellow-400" />}
                      {lead.intent === 'medium' && <Activity className="w-5 h-5 text-blue-400" />}
                      {lead.intent === 'low' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                    </div>
                  </div>

                  {/* Lead Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-semibold text-white">{lead.leadName}</h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        lead.intent === 'high' ? 'bg-green-500/20 text-green-400' :
                        lead.intent === 'medium' ? 'bg-amber-500/20 text-amber-400' :
                        'bg-red-500/20 text-red-400'
                      }`}>
                        {lead.intent.toUpperCase()} INTENT
                      </span>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-400">Predicted Value</p>
                        <p className="font-semibold text-white">{formatBDT(lead.predictedValue)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Conversion Prob.</p>
                        <p className="font-semibold text-green-400">{lead.conversionProbability}%</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Sentiment</p>
                        <p className="font-semibold capitalize text-white">{lead.nlpAnalysis.sentiment}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Urgency Score</p>
                        <p className="font-semibold text-amber-400">{lead.nlpAnalysis.urgency}/10</p>
                      </div>
                    </div>

                    {/* Next Best Action */}
                    <div className="p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-indigo-500/10 backdrop-blur-md border border-purple-500/20">
                      <div className="flex items-center gap-2 mb-1">
                        <Target className="w-4 h-4 text-purple-400" />
                        <span className="text-sm font-medium text-purple-400">Recommended Action</span>
                      </div>
                      <p className="text-sm text-gray-300">{lead.nextBestAction}</p>
                    </div>
                  </div>
                </div>

                {/* Communication Summary */}
                <div className="text-right">
                  <p className="text-xs text-gray-400 mb-2">Last Contact</p>
                  <p className="font-medium text-white mb-3">{lead.communicationSummary.lastContact}</p>
                  
                  <div className="flex items-center gap-3 justify-end">
                    <div className="text-center">
                      <Phone className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-300">{lead.communicationSummary.calls}</p>
                    </div>
                    <div className="text-center">
                      <MessageSquare className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-300">{lead.communicationSummary.messages}</p>
                    </div>
                    <div className="text-center">
                      <Mail className="w-4 h-4 text-gray-400 mx-auto mb-1" />
                      <p className="text-xs text-gray-300">{lead.communicationSummary.emails}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedLead === lead.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {/* Key Insights */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                      <Brain className="w-4 h-4 text-purple-400" />
                      AI Key Insights
                    </h5>
                    <ul className="space-y-2">
                      {lead.keyInsights.map((insight, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <CheckCircle className="w-4 h-4 text-green-400 mt-0.5" />
                          <span className="text-sm text-gray-300">{insight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Behavior Patterns */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                      <BarChart3 className="w-4 h-4 text-blue-400" />
                      Behavior Patterns
                    </h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Preferred Channel</span>
                        <span className="text-sm text-white font-medium">{lead.behaviorPatterns.preferredChannel}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Best Call Time</span>
                        <span className="text-sm text-white font-medium">{lead.behaviorPatterns.bestCallTime}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Response Rate</span>
                        <span className="text-sm text-white font-medium">{lead.behaviorPatterns.responseRate}%</span>
                      </div>
                    </div>
                  </div>

                  {/* NLP Analysis */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                      <MessageSquare className="w-4 h-4 text-amber-400" />
                      Conversation Analysis
                    </h5>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Decision Timeline</span>
                        <span className="text-sm text-white font-medium">{lead.nlpAnalysis.decisionTimeframe}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-400">Budget Discussed</span>
                        <span className="text-sm text-white font-medium">{lead.nlpAnalysis.budgetMentioned ? 'Yes' : 'No'}</span>
                      </div>
                      <div className="mt-3">
                        <p className="text-xs text-gray-400 mb-1">Interests</p>
                        <div className="flex flex-wrap gap-1">
                          {lead.behaviorPatterns.interests.map((interest) => (
                            <span key={interest} className="px-2 py-1 rounded-full bg-white/10 text-xs text-gray-300">
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              {selectedLead === lead.id && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="mt-4 flex items-center gap-3"
                >
                  <AnimatedButton
                    variant="primary"
                    size="sm"
                    className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </AnimatedButton>
                  <AnimatedButton variant="ghost" size="sm" className="hover:bg-white/5">
                    <MessageSquare className="w-4 h-4" />
                    WhatsApp
                  </AnimatedButton>
                  <AnimatedButton variant="ghost" size="sm" className="hover:bg-white/5">
                    <Calendar className="w-4 h-4" />
                    Schedule Visit
                  </AnimatedButton>
                  <AnimatedButton variant="ghost" size="sm" className="hover:bg-white/5">
                    <Home className="w-4 h-4" />
                    Show Properties
                  </AnimatedButton>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* AI Model Performance */}
      <GlassCard className="p-6" variant="accent">
        <h3 className="text-lg font-semibold text-white mb-4">AI Model Performance</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">Lead Scoring Accuracy</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '94%' }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-purple-400 to-pink-600"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">94% accurate over 30 days</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2">Sentiment Analysis</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '89%' }}
                transition={{ duration: 1, delay: 0.7 }}
                className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">89% precision rate</p>
          </div>
          <div>
            <p className="text-sm text-gray-400 mb-2">Conversion Prediction</p>
            <div className="h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: '91%' }}
                transition={{ duration: 1, delay: 0.9 }}
                className="h-full bg-gradient-to-r from-blue-400 to-cyan-600"
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">91% forecast accuracy</p>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}