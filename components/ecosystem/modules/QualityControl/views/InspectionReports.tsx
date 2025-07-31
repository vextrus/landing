'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  FileCheck,
  Camera,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Eye,
  Calendar,
  User,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Filter,
  Search,
  Upload,
  Brain,
  Sparkles,
  Shield,
  Activity
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface InspectionReport {
  id: string
  title: string
  inspector: string
  site: string
  element: string
  date: string
  status: 'passed' | 'failed' | 'conditional'
  score: number
  photos: number
  issues: number
  criticalIssues: number
  estimatedCost?: number
  aiAnalysis: string
  categories: {
    structural: number
    finishing: number
    mep: number
    safety: number
  }
}

interface InspectionCategory {
  name: string
  passRate: number
  totalInspections: number
  trend: 'up' | 'down' | 'stable'
  icon: any
}

export default function InspectionReports() {
  const [selectedReport, setSelectedReport] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<'all' | 'passed' | 'failed' | 'conditional'>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const inspectionStats = {
    totalInspections: 487,
    passRate: 82.5,
    avgScore: 87.3,
    photosAnalyzed: 12847
  }

  const reports: InspectionReport[] = [
    {
      id: '1',
      title: '12th Floor Slab Inspection',
      inspector: 'Eng. Rahman Ali',
      site: 'Gulshan Heights',
      element: 'Floor Slab 12-A',
      date: '2 hours ago',
      status: 'passed',
      score: 92,
      photos: 24,
      issues: 2,
      criticalIssues: 0,
      aiAnalysis: 'Surface finish excellent. Minor honeycombing detected in 2 locations.',
      categories: {
        structural: 95,
        finishing: 88,
        mep: 92,
        safety: 96
      }
    },
    {
      id: '2',
      title: 'Column Reinforcement Check',
      inspector: 'Eng. Fatima Khan',
      site: 'Dhanmondi Complex',
      element: 'Columns C1-C8',
      date: '5 hours ago',
      status: 'conditional',
      score: 78,
      photos: 18,
      issues: 5,
      criticalIssues: 1,
      estimatedCost: 250000,
      aiAnalysis: 'Rebar spacing issue in column C4. Requires immediate correction before concrete pour.',
      categories: {
        structural: 72,
        finishing: 85,
        mep: 90,
        safety: 75
      }
    },
    {
      id: '3',
      title: 'MEP Installation Review',
      inspector: 'Eng. Karim Ahmed',
      site: 'Bashundhara Tower',
      element: '8th Floor MEP',
      date: '1 day ago',
      status: 'passed',
      score: 88,
      photos: 32,
      issues: 3,
      criticalIssues: 0,
      aiAnalysis: 'All electrical and plumbing installations meet specifications. Minor alignment adjustments recommended.',
      categories: {
        structural: 92,
        finishing: 86,
        mep: 85,
        safety: 90
      }
    },
    {
      id: '4',
      title: 'Foundation Waterproofing',
      inspector: 'Eng. Nasir Uddin',
      site: 'Gulshan Heights',
      element: 'Basement Level B2',
      date: '2 days ago',
      status: 'failed',
      score: 65,
      photos: 28,
      issues: 8,
      criticalIssues: 3,
      estimatedCost: 450000,
      aiAnalysis: 'Multiple waterproofing membrane defects detected. Complete reapplication required in sections A3-A5.',
      categories: {
        structural: 68,
        finishing: 62,
        mep: 78,
        safety: 60
      }
    }
  ]

  const categories: InspectionCategory[] = [
    { name: 'Structural', passRate: 85, totalInspections: 142, trend: 'up', icon: Shield },
    { name: 'Finishing', passRate: 78, totalInspections: 98, trend: 'stable', icon: FileCheck },
    { name: 'MEP Systems', passRate: 88, totalInspections: 87, trend: 'up', icon: Activity },
    { name: 'Safety Compliance', passRate: 92, totalInspections: 160, trend: 'up', icon: AlertTriangle }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'passed': return 'from-green-400 to-emerald-600'
      case 'failed': return 'from-red-400 to-rose-600'
      case 'conditional': return 'from-amber-400 to-orange-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-400'
    if (score >= 70) return 'text-amber-400'
    return 'text-red-400'
  }

  const filteredReports = reports.filter(report => {
    const statusMatch = filterStatus === 'all' || report.status === filterStatus
    const searchMatch = searchQuery === '' || 
      report.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.site.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.inspector.toLowerCase().includes(searchQuery.toLowerCase())
    
    return statusMatch && searchMatch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Inspection Reports</h2>
          <p className="text-gray-400">AI-powered photo analysis and automated reporting</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <Upload className="w-4 h-4" />
            <span>Upload Photos</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-amber-600 to-orange-600">
            <FileCheck className="w-4 h-4" />
            <span>New Inspection</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Inspection Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: FileCheck,
            label: 'Total Inspections',
            value: inspectionStats.totalInspections,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: CheckCircle,
            label: 'Pass Rate',
            value: `${inspectionStats.passRate}%`,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: Star,
            label: 'Avg Score',
            value: inspectionStats.avgScore,
            format: 'decimal',
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          },
          {
            icon: Camera,
            label: 'Photos Analyzed',
            value: inspectionStats.photosAnalyzed,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.format === 'decimal' ? metric.value : 
                   typeof metric.value === 'number' ? <AnimatedCounter value={metric.value} /> : metric.value}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Category Performance */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {categories.map((category) => (
          <GlassCard key={category.name} className="p-6" variant="accent" hover>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <category.icon className="w-5 h-5 text-gray-400" />
                <h4 className="font-medium text-white">{category.name}</h4>
              </div>
              {category.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-400" />}
              {category.trend === 'down' && <TrendingUp className="w-4 h-4 text-red-400 rotate-180" />}
            </div>
            
            <div className="space-y-2">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs text-gray-400">Pass Rate</span>
                  <span className={`text-sm font-medium ${getScoreColor(category.passRate)}`}>
                    {category.passRate}%
                  </span>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.passRate}%` }}
                    className={`h-full bg-gradient-to-r ${
                      category.passRate >= 85 ? 'from-green-400 to-emerald-600' :
                      category.passRate >= 70 ? 'from-amber-400 to-orange-600' :
                      'from-red-400 to-rose-600'
                    }`}
                  />
                </div>
              </div>
              <p className="text-xs text-gray-500">{category.totalInspections} inspections</p>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* AI Analysis Summary */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Inspection Analysis</h3>
            <p className="text-gray-300">
              Computer vision detected <span className="font-semibold text-red-400">15% increase in surface defects</span> this 
              week, primarily in finishing work. Most common issue: <span className="font-semibold text-amber-400">improper curing 
              in high-temperature conditions</span>. AI recommends <span className="font-semibold text-blue-400">additional training 
              for finishing crews</span> and increased curing compound application.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Filter and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(['all', 'passed', 'failed', 'conditional'] as const).map((status) => (
            <AnimatedButton
              key={status}
              variant={filterStatus === status ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilterStatus(status)}
              className={filterStatus === status ? 'bg-gradient-to-r from-amber-600 to-orange-600' : ''}
            >
              {status === 'all' ? 'All Reports' : status.charAt(0).toUpperCase() + status.slice(1)}
            </AnimatedButton>
          ))}
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search reports..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Inspection Reports List */}
      <div className="space-y-4">
        {filteredReports.map((report, index) => (
          <motion.div
            key={report.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6" 
              variant="accent" 
              hover
              onClick={() => setSelectedReport(report.id === selectedReport ? null : report.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{report.title}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(report.status)} bg-opacity-20`}>
                      {report.status.toUpperCase()}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                    <div className="flex items-center gap-2 text-gray-400">
                      <User className="w-4 h-4" />
                      <span>{report.inspector}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <MapPin className="w-4 h-4" />
                      <span>{report.site}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock className="w-4 h-4" />
                      <span>{report.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Camera className="w-4 h-4" />
                      <span>{report.photos} photos</span>
                    </div>
                  </div>

                  {/* Category Scores */}
                  <div className="mt-3 grid grid-cols-4 gap-2">
                    {Object.entries(report.categories).map(([category, score]) => (
                      <div key={category} className="text-center">
                        <p className="text-xs text-gray-400 capitalize mb-1">{category}</p>
                        <p className={`text-sm font-medium ${getScoreColor(score)}`}>{score}%</p>
                      </div>
                    ))}
                  </div>

                  {/* AI Analysis */}
                  <div className="mt-3 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-500/20">
                    <div className="flex items-center gap-2 mb-1">
                      <Sparkles className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-purple-400">AI Analysis</span>
                    </div>
                    <p className="text-sm text-gray-300">{report.aiAnalysis}</p>
                  </div>
                </div>

                {/* Score and Issues */}
                <div className="text-center ml-6">
                  <div className="relative">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke={report.score >= 80 ? '#10B981' : report.score >= 60 ? '#F59E0B' : '#EF4444'}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 201" }}
                        animate={{ strokeDasharray: `${(report.score / 100) * 201} 201` }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-2xl font-bold ${getScoreColor(report.score)}`}>{report.score}</span>
                    </div>
                  </div>
                  
                  <div className="mt-3 space-y-1">
                    <p className="text-xs text-gray-400">{report.issues} issues</p>
                    {report.criticalIssues > 0 && (
                      <p className="text-xs text-red-400 font-medium">{report.criticalIssues} critical</p>
                    )}
                    {report.estimatedCost && (
                      <p className="text-xs text-gray-400">৳{(report.estimatedCost / 1000).toFixed(0)}k cost</p>
                    )}
                  </div>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedReport === report.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Element Details</p>
                      <p className="text-white">{report.element}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400 mb-2">Issues Found</p>
                      <div className="flex items-center gap-2">
                        {report.criticalIssues > 0 && (
                          <span className="flex items-center gap-1 text-red-400">
                            <XCircle className="w-4 h-4" />
                            {report.criticalIssues} Critical
                          </span>
                        )}
                        <span className="flex items-center gap-1 text-amber-400">
                          <AlertTriangle className="w-4 h-4" />
                          {report.issues - report.criticalIssues} Minor
                        </span>
                      </div>
                    </div>
                    {report.estimatedCost && (
                      <div>
                        <p className="text-sm text-gray-400 mb-2">Remediation Cost</p>
                        <p className="text-white font-medium">{formatBDT(report.estimatedCost)}</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-3">
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      className="bg-gradient-to-r from-amber-600 to-orange-600"
                    >
                      <Eye className="w-4 h-4" />
                      View Full Report
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <Camera className="w-4 h-4" />
                      View Photos
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <Download className="w-4 h-4" />
                      Download PDF
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}