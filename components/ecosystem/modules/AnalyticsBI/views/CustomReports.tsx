'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  FileText,
  Search,
  Download,
  Share2,
  Calendar,
  Filter,
  BarChart3,
  PieChart,
  LineChart,
  Table,
  MessageSquare,
  Sparkles,
  Clock,
  Star,
  ChevronRight,
  Plus,
  Brain,
  Eye,
  Send,
  Layers,
  DollarSign,
  Shield,
  Activity,
  Zap
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface SavedReport {
  id: string
  name: string
  type: 'financial' | 'operational' | 'project' | 'custom'
  createdBy: string
  createdAt: string
  lastRun: string
  frequency: 'daily' | 'weekly' | 'monthly' | 'on-demand'
  starred: boolean
}

interface QueryExample {
  query: string
  category: string
  icon: any
}

interface ReportTemplate {
  id: string
  name: string
  description: string
  icon: any
  fields: string[]
  popular: boolean
}

interface AIResponse {
  summary: string
  data: any[]
  visualizationType: 'bar' | 'line' | 'pie' | 'table'
  insights: string[]
}

export default function CustomReports() {
  const [queryMode, setQueryMode] = useState<'natural' | 'builder'>('natural')
  const [naturalQuery, setNaturalQuery] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showResults, setShowResults] = useState(false)

  const reportStats = {
    totalReports: 234,
    scheduledReports: 45,
    lastGenerated: '2 hours ago',
    avgGenerationTime: 1.8
  }

  const savedReports: SavedReport[] = [
    {
      id: '1',
      name: 'Monthly Revenue Analysis',
      type: 'financial',
      createdBy: 'CFO Dashboard',
      createdAt: '2024-01-15',
      lastRun: '2 hours ago',
      frequency: 'monthly',
      starred: true
    },
    {
      id: '2',
      name: 'Project Status Summary',
      type: 'project',
      createdBy: 'PMO Team',
      createdAt: '2024-02-20',
      lastRun: '1 day ago',
      frequency: 'weekly',
      starred: true
    },
    {
      id: '3',
      name: 'Worker Productivity Report',
      type: 'operational',
      createdBy: 'HR Analytics',
      createdAt: '2024-03-10',
      lastRun: '3 days ago',
      frequency: 'daily',
      starred: false
    },
    {
      id: '4',
      name: 'Material Cost Trends',
      type: 'financial',
      createdBy: 'Procurement',
      createdAt: '2024-03-25',
      lastRun: '1 week ago',
      frequency: 'on-demand',
      starred: false
    }
  ]

  const queryExamples: QueryExample[] = [
    {
      query: 'Show me revenue by project for last quarter',
      category: 'Financial',
      icon: DollarSign
    },
    {
      query: 'Which sites have the highest safety incidents?',
      category: 'Safety',
      icon: Shield
    },
    {
      query: 'Compare productivity across all departments',
      category: 'Operations',
      icon: Activity
    },
    {
      query: 'What are the top 5 delayed projects and why?',
      category: 'Projects',
      icon: Clock
    }
  ]

  const reportTemplates: ReportTemplate[] = [
    {
      id: '1',
      name: 'Executive Summary',
      description: 'High-level KPIs and performance metrics',
      icon: BarChart3,
      fields: ['Revenue', 'Projects', 'Efficiency', 'Safety'],
      popular: true
    },
    {
      id: '2',
      name: 'Financial Analysis',
      description: 'Detailed financial performance breakdown',
      icon: PieChart,
      fields: ['Revenue', 'Costs', 'Profit', 'Cash Flow'],
      popular: true
    },
    {
      id: '3',
      name: 'Project Dashboard',
      description: 'Project status and milestone tracking',
      icon: LineChart,
      fields: ['Status', 'Timeline', 'Budget', 'Resources'],
      popular: false
    },
    {
      id: '4',
      name: 'Custom Query',
      description: 'Build your own report from scratch',
      icon: Plus,
      fields: [],
      popular: false
    }
  ]

  const mockAIResponse: AIResponse = {
    summary: 'Revenue analysis for Q2 2024 shows strong growth across residential projects with Gulshan Heights leading at ৳124 Cr.',
    data: [
      { project: 'Gulshan Heights', revenue: 124, status: 'On Track' },
      { project: 'Dhanmondi Complex', revenue: 98, status: 'On Track' },
      { project: 'Bashundhara Tower', revenue: 87, status: 'At Risk' },
      { project: 'Mirpur Project', revenue: 65, status: 'On Track' }
    ],
    visualizationType: 'bar',
    insights: [
      'Gulshan Heights exceeded target by 15%',
      'Bashundhara Tower needs attention - 8% below target',
      'Overall Q2 revenue up 23% YoY'
    ]
  }

  const handleNaturalQuery = () => {
    if (!naturalQuery.trim()) return
    
    setIsProcessing(true)
    // Simulate AI processing
    setTimeout(() => {
      setIsProcessing(false)
      setShowResults(true)
    }, 2000)
  }

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'financial': return 'from-green-400 to-emerald-600'
      case 'operational': return 'from-blue-400 to-indigo-600'
      case 'project': return 'from-purple-400 to-pink-600'
      case 'custom': return 'from-amber-400 to-orange-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getFrequencyColor = (frequency: string) => {
    switch (frequency) {
      case 'daily': return 'text-green-400'
      case 'weekly': return 'text-blue-400'
      case 'monthly': return 'text-purple-400'
      case 'on-demand': return 'text-amber-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Custom Reports</h2>
          <p className="text-gray-400">Create and analyze reports with natural language</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <Calendar className="w-4 h-4" />
            <span>Schedule</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <Plus className="w-4 h-4" />
            <span>New Report</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Report Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: FileText,
            label: 'Total Reports',
            value: reportStats.totalReports,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: Clock,
            label: 'Scheduled',
            value: reportStats.scheduledReports,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          },
          {
            icon: Sparkles,
            label: 'Last Generated',
            value: reportStats.lastGenerated,
            format: 'string',
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: Zap,
            label: 'Avg Time',
            value: `${reportStats.avgGenerationTime}s`,
            format: 'string',
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.format === 'string' ? metric.value : <AnimatedCounter value={metric.value as number} />}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Query Interface */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
              <Brain className="w-6 h-6 text-indigo-400" />
            </div>
            <h3 className="text-lg font-semibold text-white">AI Report Builder</h3>
          </div>
          <div className="flex items-center gap-2">
            <AnimatedButton
              variant={queryMode === 'natural' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setQueryMode('natural')}
              className={queryMode === 'natural' ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
            >
              <MessageSquare className="w-4 h-4" />
              Natural Language
            </AnimatedButton>
            <AnimatedButton
              variant={queryMode === 'builder' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setQueryMode('builder')}
              className={queryMode === 'builder' ? 'bg-gradient-to-r from-indigo-600 to-purple-600' : ''}
            >
              <Layers className="w-4 h-4" />
              Query Builder
            </AnimatedButton>
          </div>
        </div>

        {queryMode === 'natural' ? (
          <div className="space-y-4">
            <div className="relative">
              <textarea
                value={naturalQuery}
                onChange={(e) => setNaturalQuery(e.target.value)}
                placeholder="Ask me anything about your data... e.g., 'Show me revenue by project for last quarter'"
                className="w-full h-32 px-4 py-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white placeholder-gray-400 resize-none focus:outline-none focus:border-white/20"
              />
              <AnimatedButton
                variant="primary"
                size="sm"
                className={`absolute bottom-3 right-3 bg-gradient-to-r from-indigo-600 to-purple-600 ${
                  !naturalQuery.trim() || isProcessing ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                onClick={!naturalQuery.trim() || isProcessing ? undefined : handleNaturalQuery}
              >
                {isProcessing ? (
                  <>
                    <Sparkles className="w-4 h-4 animate-pulse" />
                    <span>Analyzing...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Generate</span>
                  </>
                )}
              </AnimatedButton>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-3">Popular queries:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {queryExamples.map((example) => (
                  <button
                    key={example.query}
                    onClick={() => setNaturalQuery(example.query)}
                    className="p-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all text-left"
                  >
                    <div className="flex items-center gap-2 mb-1">
                      <example.icon className="w-4 h-4 text-indigo-400" />
                      <span className="text-xs text-indigo-400">{example.category}</span>
                    </div>
                    <p className="text-sm text-gray-300">{example.query}</p>
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {reportTemplates.map((template) => (
              <div
                key={template.id}
                className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-indigo-500/20 to-purple-500/20">
                      <template.icon className="w-5 h-5 text-indigo-400" />
                    </div>
                    <div>
                      <h4 className="font-medium text-white">{template.name}</h4>
                      {template.popular && (
                        <span className="text-xs text-amber-400">Popular</span>
                      )}
                    </div>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400" />
                </div>
                <p className="text-sm text-gray-400 mb-2">{template.description}</p>
                {template.fields.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {template.fields.map((field) => (
                      <span key={field} className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-300">
                        {field}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </GlassCard>

      {/* AI Results */}
      <AnimatePresence>
        {showResults && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassCard className="p-6" variant="accent">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-white">Analysis Results</h3>
                <div className="flex items-center gap-2">
                  <AnimatedButton variant="ghost" size="sm">
                    <Download className="w-4 h-4" />
                    Export
                  </AnimatedButton>
                  <AnimatedButton variant="ghost" size="sm">
                    <Share2 className="w-4 h-4" />
                    Share
                  </AnimatedButton>
                </div>
              </div>

              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-md border border-indigo-500/20">
                  <p className="text-sm text-gray-300">{mockAIResponse.summary}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                  {mockAIResponse.data.map((item) => (
                    <div key={item.project} className="p-3 rounded-lg bg-white/5">
                      <h4 className="text-sm font-medium text-white mb-1">{item.project}</h4>
                      <p className="text-2xl font-bold text-indigo-400">৳{item.revenue} Cr</p>
                      <p className={`text-xs ${
                        item.status === 'On Track' ? 'text-green-400' : 'text-amber-400'
                      }`}>
                        {item.status}
                      </p>
                    </div>
                  ))}
                </div>

                <div>
                  <h4 className="text-sm font-medium text-white mb-2">Key Insights</h4>
                  <ul className="space-y-1">
                    {mockAIResponse.insights.map((insight, index) => (
                      <li key={index} className="flex items-center gap-2 text-sm text-gray-300">
                        <Sparkles className="w-3 h-3 text-indigo-400" />
                        {insight}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Saved Reports */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Saved Reports</h3>
          <AnimatedButton variant="ghost" size="sm">
            <Eye className="w-4 h-4" />
            <span>View All</span>
          </AnimatedButton>
        </div>

        <div className="space-y-3">
          {savedReports.map((report) => (
            <div
              key={report.id}
              className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {report.starred && <Star className="w-4 h-4 text-amber-400 fill-amber-400" />}
                  <div>
                    <h4 className="font-medium text-white">{report.name}</h4>
                    <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                      <span className={`px-2 py-0.5 rounded text-xs bg-gradient-to-r ${getTypeColor(report.type)} bg-opacity-20`}>
                        {report.type}
                      </span>
                      <span>•</span>
                      <span>{report.createdBy}</span>
                      <span>•</span>
                      <span className={getFrequencyColor(report.frequency)}>{report.frequency}</span>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500">Last run</p>
                  <p className="text-sm text-gray-300">{report.lastRun}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}