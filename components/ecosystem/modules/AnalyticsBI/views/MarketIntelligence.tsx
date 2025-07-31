'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe,
  TrendingUp,
  Building2,
  Users,
  MapPin,
  BarChart3,
  Activity,
  AlertCircle,
  Target,
  Search,
  Filter,
  Brain,
  Eye,
  Briefcase,
  Award,
  ChevronRight,
  Star,
  Shield,
  Zap,
  CheckCircle
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter, AnimatedChart } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface Competitor {
  name: string
  marketShare: number
  revenue: number
  projects: number
  growthRate: number
  strengths: string[]
  weaknesses: string[]
  threat: 'high' | 'medium' | 'low'
}

interface MarketTrend {
  trend: string
  impact: 'positive' | 'negative' | 'neutral'
  relevance: number
  timeline: string
  description: string
}

interface MarketOpportunity {
  title: string
  location: string
  value: number
  probability: number
  competition: 'high' | 'medium' | 'low'
  requirements: string[]
  deadline: string
}

interface IndustryMetric {
  metric: string
  value: number
  change: number
  benchmark: number
  position: 'above' | 'below' | 'at'
}

export default function MarketIntelligence() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null)
  const [filterLocation, setFilterLocation] = useState<string>('all')

  const marketStats = {
    totalMarketSize: 450000000000,
    marketGrowth: 12.5,
    ourMarketShare: 5.2,
    competitorCount: 127
  }

  const competitors: Competitor[] = [
    {
      name: 'BuildMax Ltd',
      marketShare: 8.5,
      revenue: 3825000000,
      projects: 72,
      growthRate: 15.3,
      strengths: ['Government contracts', 'Large workforce', 'Equipment fleet'],
      weaknesses: ['Quality issues', 'Delayed projects', 'High turnover'],
      threat: 'high'
    },
    {
      name: 'Dhaka Builders',
      marketShare: 6.3,
      revenue: 2835000000,
      projects: 58,
      growthRate: 8.7,
      strengths: ['Brand reputation', 'Premium projects', 'Financial backing'],
      weaknesses: ['High costs', 'Limited capacity', 'Slow decisions'],
      threat: 'medium'
    },
    {
      name: 'Metro Construction',
      marketShare: 4.8,
      revenue: 2160000000,
      projects: 43,
      growthRate: 22.1,
      strengths: ['Innovation', 'Young team', 'Tech adoption'],
      weaknesses: ['Limited experience', 'Cash flow', 'Small scale'],
      threat: 'high'
    },
    {
      name: 'Eastern Developers',
      marketShare: 3.9,
      revenue: 1755000000,
      projects: 35,
      growthRate: 5.2,
      strengths: ['Regional presence', 'Local connections', 'Cost efficiency'],
      weaknesses: ['Old methods', 'Limited growth', 'Quality variance'],
      threat: 'low'
    }
  ]

  const marketTrends: MarketTrend[] = [
    {
      trend: 'Smart Building Adoption',
      impact: 'positive',
      relevance: 92,
      timeline: '6-12 months',
      description: 'Growing demand for IoT-enabled buildings in Gulshan and Banani'
    },
    {
      trend: 'Green Construction Mandate',
      impact: 'positive',
      relevance: 87,
      timeline: '3-6 months',
      description: 'New regulations require LEED certification for commercial projects'
    },
    {
      trend: 'Labor Cost Inflation',
      impact: 'negative',
      relevance: 78,
      timeline: '0-3 months',
      description: 'Construction worker wages increasing 15-20% annually'
    },
    {
      trend: 'Infrastructure Megaprojects',
      impact: 'positive',
      relevance: 95,
      timeline: '12-24 months',
      description: 'Government launching ৳10,000 Cr development projects'
    }
  ]

  const opportunities: MarketOpportunity[] = [
    {
      title: 'Purbachal Smart City Phase 2',
      location: 'Purbachal',
      value: 23000000000,
      probability: 72,
      competition: 'high',
      requirements: ['Smart tech expertise', 'Financial capacity', 'Green certification'],
      deadline: '45 days'
    },
    {
      title: 'Dhaka Metro Station Complex',
      location: 'Mirpur',
      value: 8500000000,
      probability: 65,
      competition: 'medium',
      requirements: ['Transit experience', 'Safety compliance', 'Fast execution'],
      deadline: '30 days'
    },
    {
      title: 'IT Park Development',
      location: 'Kaliakoir',
      value: 12000000000,
      probability: 83,
      competition: 'low',
      requirements: ['Tech infrastructure', 'Sustainability', 'International standards'],
      deadline: '60 days'
    }
  ]

  const industryMetrics: IndustryMetric[] = [
    { metric: 'Project Completion Rate', value: 87.3, change: 2.1, benchmark: 82.5, position: 'above' },
    { metric: 'Safety Score', value: 94.2, change: 3.5, benchmark: 88.7, position: 'above' },
    { metric: 'Cost Efficiency', value: 78.5, change: -1.2, benchmark: 81.3, position: 'below' },
    { metric: 'Client Retention', value: 92.7, change: 4.8, benchmark: 85.2, position: 'above' }
  ]

  const marketShareData = [
    { name: 'Vextrus', share: 5.2 },
    { name: 'BuildMax', share: 8.5 },
    { name: 'Dhaka Builders', share: 6.3 },
    { name: 'Metro', share: 4.8 },
    { name: 'Eastern', share: 3.9 },
    { name: 'Others', share: 71.3 }
  ]

  const getThreatColor = (threat: string) => {
    switch (threat) {
      case 'high': return 'from-red-400 to-rose-600'
      case 'medium': return 'from-amber-400 to-orange-600'
      case 'low': return 'from-green-400 to-emerald-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getImpactIcon = (impact: string) => {
    switch (impact) {
      case 'positive': return TrendingUp
      case 'negative': return TrendingUp
      case 'neutral': return Activity
      default: return Activity
    }
  }

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive': return 'text-green-400'
      case 'negative': return 'text-red-400'
      case 'neutral': return 'text-gray-400'
      default: return 'text-gray-400'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Market Intelligence</h2>
          <p className="text-gray-400">Competitive analysis and industry insights</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <Search className="w-4 h-4" />
            <span>Research</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-indigo-600 to-purple-600">
            <Brain className="w-4 h-4" />
            <span>AI Analysis</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Market Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Globe,
            label: 'Market Size',
            value: formatBDT(marketStats.totalMarketSize),
            format: 'string',
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: TrendingUp,
            label: 'Market Growth',
            value: `${marketStats.marketGrowth}%`,
            format: 'string',
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: Target,
            label: 'Our Market Share',
            value: `${marketStats.ourMarketShare}%`,
            format: 'string',
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          },
          {
            icon: Building2,
            label: 'Competitors',
            value: marketStats.competitorCount,
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

      {/* Competitor Analysis */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Competitor Analysis</h3>
          <div className="flex items-center gap-2">
            <AnimatedButton variant="ghost" size="sm">
              <Eye className="w-4 h-4" />
              <span>Monitor All</span>
            </AnimatedButton>
          </div>
        </div>

        <div className="space-y-4">
          {competitors.map((competitor, index) => (
            <motion.div
              key={competitor.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
              onClick={() => setSelectedCompetitor(competitor.name === selectedCompetitor ? null : competitor.name)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{competitor.name}</h4>
                    <span className={`px-2 py-1 rounded text-xs font-medium bg-gradient-to-r ${getThreatColor(competitor.threat)} bg-opacity-20`}>
                      {competitor.threat.toUpperCase()} THREAT
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Market Share</p>
                      <p className="text-white font-medium">{competitor.marketShare}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Revenue</p>
                      <p className="text-white font-medium">{formatBDT(competitor.revenue)}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Projects</p>
                      <p className="text-white font-medium">{competitor.projects}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Growth Rate</p>
                      <p className={`font-medium ${
                        competitor.growthRate > 15 ? 'text-red-400' :
                        competitor.growthRate > 10 ? 'text-amber-400' :
                        'text-green-400'
                      }`}>
                        +{competitor.growthRate}%
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-400">vs Vextrus</p>
                      <p className="text-white font-medium">
                        {((competitor.marketShare / marketStats.ourMarketShare) * 100).toFixed(0)}%
                      </p>
                    </div>
                  </div>
                </div>

                <ChevronRight className={`w-5 h-5 text-gray-400 transition-transform ${
                  selectedCompetitor === competitor.name ? 'rotate-90' : ''
                }`} />
              </div>

              {selectedCompetitor === competitor.name && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-4 pt-4 border-t border-white/10"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h5 className="text-sm font-medium text-green-400 mb-2">Strengths</h5>
                      <ul className="space-y-1">
                        {competitor.strengths.map((strength) => (
                          <li key={strength} className="text-sm text-gray-300 flex items-center gap-2">
                            <CheckCircle className="w-3 h-3 text-green-400" />
                            {strength}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <h5 className="text-sm font-medium text-red-400 mb-2">Weaknesses</h5>
                      <ul className="space-y-1">
                        {competitor.weaknesses.map((weakness) => (
                          <li key={weakness} className="text-sm text-gray-300 flex items-center gap-2">
                            <AlertCircle className="w-3 h-3 text-red-400" />
                            {weakness}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Trends */}
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Industry Trends</h3>
          <div className="space-y-3">
            {marketTrends.map((trend, index) => {
              const Icon = getImpactIcon(trend.impact)
              return (
                <motion.div
                  key={trend.trend}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-white/5"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-start gap-2">
                      <Icon className={`w-5 h-5 mt-0.5 ${
                        trend.impact === 'positive' ? '' :
                        trend.impact === 'negative' ? 'rotate-180' :
                        ''
                      } ${getImpactColor(trend.impact)}`} />
                      <div>
                        <h4 className="font-medium text-white">{trend.trend}</h4>
                        <p className="text-xs text-gray-400 mt-1">{trend.timeline}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Relevance</p>
                      <p className="text-sm font-medium text-white">{trend.relevance}%</p>
                    </div>
                  </div>
                  <p className="text-sm text-gray-300">{trend.description}</p>
                </motion.div>
              )
            })}
          </div>
        </GlassCard>

        {/* Market Share Chart */}
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Market Share Distribution</h3>
          <AnimatedChart
            data={marketShareData}
            dataKey="share"
            type="area"
            height={280}
            color="#6366F1"
            gradient={false}
          />
          <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-indigo-500/10 to-purple-500/10 backdrop-blur-md border border-indigo-500/20">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-indigo-400">Growth Opportunity:</span> AI analysis 
              shows potential to capture additional 2.3% market share by targeting government projects.
            </p>
          </div>
        </GlassCard>
      </div>

      {/* Opportunities */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Market Opportunities</h3>
          <div className="flex items-center gap-3">
            <select
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
              className="px-3 py-1.5 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white text-sm focus:outline-none focus:border-white/20"
            >
              <option value="all">All Locations</option>
              <option value="dhaka">Dhaka</option>
              <option value="chittagong">Chittagong</option>
              <option value="sylhet">Sylhet</option>
            </select>
            <AnimatedButton variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </AnimatedButton>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {opportunities.map((opp, index) => (
            <motion.div
              key={opp.title}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h4 className="font-medium text-white mb-1">{opp.title}</h4>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <MapPin className="w-3 h-3" />
                    <span>{opp.location}</span>
                  </div>
                </div>
                <Briefcase className="w-5 h-5 text-indigo-400" />
              </div>

              <div className="space-y-2 mb-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Value</span>
                  <span className="text-lg font-bold text-white">{formatBDT(opp.value)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Win Probability</span>
                  <div className="flex items-center gap-2">
                    <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${opp.probability}%` }}
                        className="h-full bg-gradient-to-r from-indigo-400 to-purple-600"
                      />
                    </div>
                    <span className="text-sm text-white">{opp.probability}%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-400">Competition</span>
                  <span className={`text-sm font-medium ${
                    opp.competition === 'high' ? 'text-red-400' :
                    opp.competition === 'medium' ? 'text-amber-400' :
                    'text-green-400'
                  }`}>
                    {opp.competition.toUpperCase()}
                  </span>
                </div>
              </div>

              <div className="pt-3 border-t border-white/10">
                <p className="text-xs text-gray-500 mb-2">Requirements:</p>
                <div className="flex flex-wrap gap-1 mb-3">
                  {opp.requirements.map((req) => (
                    <span key={req} className="px-2 py-0.5 rounded text-xs bg-white/10 text-gray-300">
                      {req}
                    </span>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-red-400">Deadline: {opp.deadline}</span>
                  <AnimatedButton variant="ghost" size="sm">
                    Pursue
                    <ChevronRight className="w-3 h-3" />
                  </AnimatedButton>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Industry Benchmarks */}
      <GlassCard className="p-6" variant="accent">
        <h3 className="text-lg font-semibold text-white mb-4">Industry Benchmarks</h3>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          {industryMetrics.map((metric) => (
            <div key={metric.metric} className="p-4 rounded-lg bg-white/5">
              <h4 className="text-sm font-medium text-gray-400 mb-2">{metric.metric}</h4>
              <div className="flex items-end justify-between mb-2">
                <p className="text-2xl font-bold text-white">{metric.value}%</p>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.change > 0 ? 'text-green-400' : 'text-red-400'
                }`}>
                  <TrendingUp className={`w-3 h-3 ${metric.change < 0 ? 'rotate-180' : ''}`} />
                  {Math.abs(metric.change)}%
                </div>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">Benchmark: {metric.benchmark}%</span>
                <span className={`font-medium ${
                  metric.position === 'above' ? 'text-green-400' :
                  metric.position === 'below' ? 'text-red-400' :
                  'text-gray-400'
                }`}>
                  {metric.position.toUpperCase()}
                </span>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  )
}