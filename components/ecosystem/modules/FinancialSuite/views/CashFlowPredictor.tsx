'use client'

'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Brain, 
  SlidersHorizontal,
  Zap,
  ChevronRight,
  Activity,
  AlertTriangle,
  CheckCircle,
  Calendar,
  DollarSign,
  Target,
  Sparkles,
  CloudRain,
  Sun,
  Sunset,
  Users,
  Building2,
  TrendingDown
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedChart, AnimatedCounter } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'
import { financialData, seasonalFactors, getCurrentMonsoonStatus, projects } from '../../../../../lib/mockDatabase'

export default function CashFlowPredictor() {
  const [revenueGrowth, setRevenueGrowth] = useState(12)
  const [expenseReduction, setExpenseReduction] = useState(5)
  const [collectionRate, setCollectionRate] = useState(85)
  const [predictedCashFlow, setPredictedCashFlow] = useState(0)
  const [confidence, setConfidence] = useState(0)
  const [isCalculating, setIsCalculating] = useState(false)
  const [monsoonImpact, setMonsoonImpact] = useState(getCurrentMonsoonStatus())

  const baseCashFlow = financialData.cashFlow.netCashFlow

  useEffect(() => {
    setIsCalculating(true)
    const timer = setTimeout(() => {
      // Enhanced AI prediction with Bangladesh-specific factors
      const revenueImpact = baseCashFlow * (revenueGrowth / 100)
      const expenseImpact = baseCashFlow * 0.7 * (expenseReduction / 100)
      const collectionImpact = baseCashFlow * 0.3 * ((collectionRate - 70) / 100)
      
      // Monsoon season impact (June-September in Bangladesh)
      const monsoonReduction = monsoonImpact.active ? 
        baseCashFlow * (monsoonImpact.impact / 100) : 0
        
      // Eid bonus provision impact
      const eidBonusImpact = -financialData.overview.monthlyRevenue * 0.08 // 8% for Eid bonus
      
      const predicted = baseCashFlow + revenueImpact + expenseImpact + 
        collectionImpact - monsoonReduction + (eidBonusImpact / 12)
      
      setPredictedCashFlow(predicted)
      setConfidence(Math.min(95, 80 + (collectionRate / 10) - (monsoonImpact.active ? 5 : 0)))
      setIsCalculating(false)
    }, 1200)
    
    return () => clearTimeout(timer)
  }, [revenueGrowth, expenseReduction, collectionRate])

  const predictionFactors = [
    { 
      label: 'Historical Patterns', 
      weight: 35, 
      accuracy: 98,
      description: '5 years of Bangladesh construction data',
      icon: Activity
    },
    { 
      label: 'Market Intelligence', 
      weight: 25, 
      accuracy: 92,
      description: 'Dhaka real estate trends & RAJUK approvals',
      icon: Building2
    },
    { 
      label: 'Project Pipeline', 
      weight: 20, 
      accuracy: 95,
      description: `${projects.length} active projects analysis`,
      icon: Target
    },
    { 
      label: 'Payment Behavior', 
      weight: 20, 
      accuracy: 89,
      description: 'Client payment patterns & seasonality',
      icon: Users
    }
  ]

  const scenarios = [
    { 
      name: 'Conservative', 
      cashFlow: predictedCashFlow * 0.82, 
      probability: 85,
      color: 'from-amber-400 to-orange-600',
      description: 'Accounts for monsoon delays & material shortages'
    },
    { 
      name: 'Most Likely', 
      cashFlow: predictedCashFlow, 
      probability: 65,
      color: 'from-emerald-400 to-green-600',
      description: 'Expected scenario with normal operations'
    },
    { 
      name: 'Optimistic', 
      cashFlow: predictedCashFlow * 1.18, 
      probability: 35,
      color: 'from-blue-400 to-cyan-600',
      description: 'Early project completions & bonus payments'
    }
  ]

  const bangladeshFactors = [
    {
      title: 'Monsoon Season Impact',
      description: monsoonImpact.active 
        ? `Currently in monsoon season - ${monsoonImpact.impact}% productivity reduction expected`
        : 'Outside monsoon season - normal productivity levels',
      impact: monsoonImpact.active ? `-${formatBDT(baseCashFlow * monsoonImpact.impact / 100)}` : 'No Impact',
      priority: monsoonImpact.active ? 'high' : 'low',
      icon: monsoonImpact.active ? CloudRain : Sun
    },
    {
      title: 'Eid Bonus Provision',
      description: 'Annual festival bonus for 2,847 employees as per Bangladesh Labour Act',
      impact: formatBDT(8900000000), // 89 Cr
      priority: 'medium',
      icon: Sparkles
    },
    {
      title: 'RAJUK Approval Delays',
      description: 'Average 45-day approval time affecting project timelines',
      impact: `${projects.filter(p => p.status === 'Planning').length} projects affected`,
      priority: 'medium',
      icon: Building2
    },
    {
      title: 'Currency Fluctuation',
      description: 'BDT stability vs USD for imported materials',
      impact: '+2.3% material costs',
      priority: 'low',
      icon: TrendingUp
    }
  ]

  const recommendations = [
    {
      title: 'Accelerate Collections from Top Clients',
      description: 'Focus on Gulshan Heights & Bashundhara Tower receivables',
      impact: `+${formatBDT(2500000000)}`, // +25 Cr
      priority: 'high',
      timeline: '15 days',
      confidence: 92
    },
    {
      title: 'Early Payment Incentives',
      description: 'Offer 2% discount for 15-day payment terms to premium clients',
      impact: `+${formatBDT(1800000000)}`, // +18 Cr
      priority: 'medium',
      timeline: '30 days',
      confidence: 78
    },
    {
      title: 'Bulk Material Procurement',
      description: 'Order cement & steel in bulk before monsoon season',
      impact: `+${formatBDT(1200000000)}`, // +12 Cr savings
      priority: 'high',
      timeline: '7 days',
      confidence: 95
    },
    {
      title: 'bKash/Nagad Payment Integration',
      description: 'Faster collections through mobile banking for smaller payments',
      impact: `+${formatBDT(800000000)}`, // +8 Cr
      priority: 'medium',
      timeline: '45 days',
      confidence: 85
    }
  ]

  const cashFlowTrend = financialData.cashFlow.projectedCashFlow.map(item => ({
    name: item.month,
    cashFlow: item.net / 1000000, // Convert to Cr for chart
    inflow: item.inflow / 1000000,
    outflow: item.outflow / 1000000
  }))

  return (
    <div className="p-8 space-y-8">
      {/* Enhanced Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold glass-text-primary mb-2">AI Cash Flow Predictor</h2>
          <p className="glass-text-muted">
            ML-powered 6-month forecasting with Bangladesh market intelligence
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <motion.div
            className="flex items-center gap-2 px-4 py-2 rounded-xl liquid-glass-light"
            whileHover={{ scale: 1.05 }}
          >
            <Brain className="w-5 h-5 text-purple-400" />
            <div className="text-sm">
              <div className="font-semibold text-white">AI Confidence</div>
              <div className="text-purple-400">{confidence}% Accurate</div>
            </div>
          </motion.div>
          
          <AnimatedButton
            variant="liquid"
            size="md"
            className="bg-gradient-to-r from-emerald-500 to-green-600"
          >
            <Zap className="w-4 h-4" />
            <span>Update Forecast</span>
          </AnimatedButton>
        </div>
      </div>

      {/* AI Prediction Results */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <GlassCard variant="liquid" intensity="medium" className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold glass-text-primary">Scenario Analysis</h3>
              {isCalculating && (
                <div className="flex items-center gap-2 text-sm glass-text-muted">
                  <div className="w-4 h-4 border-2 border-emerald-400 border-t-transparent rounded-full animate-spin" />
                  Calculating with AI models...
                </div>
              )}
            </div>
            
            <div className="space-y-4">
              {scenarios.map((scenario, index) => (
                <motion.div
                  key={scenario.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-xl liquid-glass-light hover:liquid-glass-medium transition-all duration-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full bg-gradient-to-r ${scenario.color}`} />
                      <h4 className="font-semibold glass-text-primary">{scenario.name}</h4>
                      <span className="text-xs px-2 py-1 rounded-full bg-white/10 glass-text-muted">
                        {scenario.probability}% Probability
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold" style={{ color: scenario.color.split(' ')[1].split('-')[0] === 'emerald' ? '#10B981' : scenario.color.split(' ')[1].split('-')[0] === 'amber' ? '#F59E0B' : '#06B6D4' }}>
                        {formatBDT(scenario.cashFlow)}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm glass-text-muted">{scenario.description}</p>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>

        <GlassCard variant="liquid" intensity="medium" className="p-6">
          <h3 className="text-xl font-semibold glass-text-primary mb-6">Prediction Accuracy</h3>
          <div className="space-y-4">
            {predictionFactors.map((factor, index) => (
              <motion.div
                key={factor.label}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <div className="flex items-start gap-3 mb-2">
                  <div className="p-2 rounded-lg bg-white/10">
                    <factor.icon className="w-4 h-4 text-white/80" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium glass-text-primary text-sm">{factor.label}</h4>
                      <span className="text-sm font-semibold text-emerald-400">{factor.accuracy}%</span>
                    </div>
                    <p className="text-xs glass-text-muted mt-1">{factor.description}</p>
                  </div>
                </div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${factor.accuracy}%` }}
                    transition={{ duration: 1, delay: index * 0.2 }}
                    className="h-full bg-gradient-to-r from-emerald-400 to-green-600"
                  />
                </div>
                <div className="text-xs glass-text-muted mt-1">Weight: {factor.weight}%</div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Bangladesh-Specific Factors */}
      <GlassCard variant="premium" intensity="strong" className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-cyan-500/20">
            <CloudRain className="w-6 h-6 text-cyan-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold glass-text-primary">Bangladesh Market Factors</h3>
            <p className="glass-text-muted">Local market intelligence and seasonal adjustments</p>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {bangladeshFactors.map((factor, index) => (
            <motion.div
              key={factor.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-xl border transition-all duration-300 ${
                factor.priority === 'high' ? 'liquid-glass-strong border-red-500/30 bg-red-500/5' :
                factor.priority === 'medium' ? 'liquid-glass-medium border-amber-500/30 bg-amber-500/5' :
                'liquid-glass-light border-green-500/30 bg-green-500/5'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`p-2 rounded-lg ${
                  factor.priority === 'high' ? 'bg-red-500/20' :
                  factor.priority === 'medium' ? 'bg-amber-500/20' :
                  'bg-green-500/20'
                }`}>
                  <factor.icon className={`w-5 h-5 ${
                    factor.priority === 'high' ? 'text-red-400' :
                    factor.priority === 'medium' ? 'text-amber-400' :
                    'text-green-400'
                  }`} />
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold glass-text-primary mb-1">{factor.title}</h4>
                  <p className="text-sm glass-text-muted mb-2">{factor.description}</p>
                  <div className={`text-sm font-medium ${
                    factor.priority === 'high' ? 'text-red-400' :
                    factor.priority === 'medium' ? 'text-amber-400' :
                    'text-green-400'
                  }`}>
                    Impact: {factor.impact}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* AI Recommendations */}
      <GlassCard variant="premium" intensity="strong" className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div>
            <h3 className="text-xl font-semibold glass-text-primary">AI Recommendations</h3>
            <p className="glass-text-muted">Actionable insights to optimize cash flow</p>
          </div>
        </div>
        
        <div className="space-y-4">
          {recommendations.map((rec, index) => (
            <motion.div
              key={rec.title}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="p-4 rounded-xl liquid-glass-medium hover:liquid-glass-strong transition-all duration-300 group cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-3 h-3 rounded-full ${
                      rec.priority === 'high' ? 'bg-red-400' :
                      rec.priority === 'medium' ? 'bg-amber-400' :
                      'bg-green-400'
                    }`} />
                    <h4 className="font-semibold glass-text-primary">{rec.title}</h4>
                    <span className="text-xs px-2 py-1 rounded-full bg-white/10 glass-text-muted">
                      {rec.timeline}
                    </span>
                  </div>
                  <p className="text-sm glass-text-muted mb-2">{rec.description}</p>
                  <div className="flex items-center gap-4 text-xs">
                    <span className="glass-text-muted">Confidence: {rec.confidence}%</span>
                    <span className="text-emerald-400 font-medium">Impact: {rec.impact}</span>
                  </div>
                </div>
                <AnimatedButton
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <ChevronRight className="w-4 h-4" />
                </AnimatedButton>
              </div>
            </motion.div>
          ))}
        </div>
      </GlassCard>

      {/* Cash Flow Trend Chart */}
      <GlassCard variant="liquid" intensity="medium" className="p-6">
        <h3 className="text-xl font-semibold glass-text-primary mb-6">6-Month Cash Flow Projection</h3>
        <div className="h-80">
          <AnimatedChart
            data={cashFlowTrend}
            dataKey="cashFlow"
            type="area"
            height={320}
            color="#10B981"
            gradient={true}
            title="Net Cash Flow (৳ Crores)"
          />
        </div>
      </GlassCard>
    </div>
  )
}