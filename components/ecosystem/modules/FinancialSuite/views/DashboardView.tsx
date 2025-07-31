'use client'

import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight, 
  DollarSign,
  Activity,
  CreditCard,
  AlertCircle,
  CheckCircle,
  Clock,
  Zap,
  BarChart3,
  PieChart
} from 'lucide-react'
import { GlassCard, AnimatedChart, AnimatedCounter } from '../../../shared/ui'
import { formatBDT, formatPercentage } from '../../../utils/bdCurrency'

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

export default function DashboardView() {
  const metrics = [
    {
      title: 'Total Revenue',
      value: 523000000,
      change: 12.5,
      trend: 'up',
      icon: DollarSign,
      color: 'from-green-400 to-emerald-600',
      bgColor: 'from-green-500/20 to-emerald-500/20'
    },
    {
      title: 'Net Cash Flow',
      value: 85000000,
      change: 8.3,
      trend: 'up',
      icon: Activity,
      color: 'from-blue-400 to-cyan-600',
      bgColor: 'from-blue-500/20 to-cyan-500/20'
    },
    {
      title: 'Profit Margin',
      value: 22.5,
      change: 3.2,
      trend: 'up',
      icon: BarChart3,
      color: 'from-purple-400 to-pink-600',
      bgColor: 'from-purple-500/20 to-pink-500/20',
      isPercentage: true
    },
    {
      title: 'Pending Invoices',
      value: 3421,
      change: -15.2,
      trend: 'down',
      icon: Clock,
      color: 'from-amber-400 to-orange-600',
      bgColor: 'from-amber-500/20 to-orange-500/20',
      isCount: true
    }
  ]

  const cashFlowData = [
    { month: 'Jan', inflow: 45, outflow: 38 },
    { month: 'Feb', inflow: 52, outflow: 41 },
    { month: 'Mar', inflow: 48, outflow: 39 },
    { month: 'Apr', inflow: 58, outflow: 42 },
    { month: 'May', inflow: 65, outflow: 45 },
    { month: 'Jun', inflow: 72, outflow: 48 }
  ]

  const recentTransactions = [
    { id: 1, party: 'ABC Developers', amount: 15200000, type: 'in', status: 'completed', time: '2 mins ago' },
    { id: 2, party: 'Steel Supplier BD', amount: 8500000, type: 'out', status: 'completed', time: '5 mins ago' },
    { id: 3, party: 'XYZ Construction', amount: 52000000, type: 'in', status: 'pending', time: '12 mins ago' },
    { id: 4, party: 'Labor Contractor', amount: 3200000, type: 'out', status: 'completed', time: '18 mins ago' },
  ]

  const aiAlerts = [
    { id: 1, type: 'warning', message: 'Unusual spending pattern detected in Materials category', confidence: 92 },
    { id: 2, type: 'success', message: 'Cash flow optimization saved ৳2.3 Lakh this week', confidence: 98 },
    { id: 3, type: 'info', message: 'Payment from Gulshan Heights expected in 2 days', confidence: 87 },
  ]

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="p-6 space-y-6"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => (
          <motion.div key={metric.title} variants={fadeInUp}>
            <GlassCard className="p-6 h-full" variant="accent" hover glow>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                  <metric.icon className="w-6 h-6 text-white" />
                </div>
                <div className={`flex items-center gap-1 text-sm ${
                  metric.trend === 'up' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {metric.trend === 'up' ? (
                    <ArrowUpRight className="w-4 h-4" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4" />
                  )}
                  <span>{Math.abs(metric.change)}%</span>
                </div>
              </div>
              
              <h3 className="text-sm text-gray-400 mb-1">{metric.title}</h3>
              <div className="text-2xl font-bold text-white">
                {metric.isPercentage ? (
                  <AnimatedCounter value={metric.value} format={(v) => `${Math.floor(v)}%`} />
                ) : metric.isCount ? (
                  <AnimatedCounter value={metric.value} />
                ) : (
                  formatBDT(metric.value)
                )}
              </div>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Cash Flow Chart */}
        <motion.div variants={fadeInUp}>
          <GlassCard className="p-6" variant="accent">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Cash Flow Trend</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-400 rounded" />
                  <span className="text-sm text-gray-400">Inflow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-400 rounded" />
                  <span className="text-sm text-gray-400">Outflow</span>
                </div>
              </div>
            </div>
            <AnimatedChart
              data={cashFlowData}
              type="area"
              dataKey="inflow"
              color="#10B981"
              gradient
              height={300}
            />
          </GlassCard>
        </motion.div>

        {/* AI Alerts */}
        <motion.div variants={fadeInUp}>
          <GlassCard className="p-6" variant="accent">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">AI Financial Insights</h3>
              <Zap className="w-5 h-5 text-yellow-400" />
            </div>
            <div className="space-y-4">
              {aiAlerts.map((alert, index) => (
                <motion.div
                  key={alert.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10"
                >
                  <div className="flex items-start gap-3">
                    {alert.type === 'warning' && (
                      <AlertCircle className="w-5 h-5 text-amber-400 mt-0.5" />
                    )}
                    {alert.type === 'success' && (
                      <CheckCircle className="w-5 h-5 text-green-400 mt-0.5" />
                    )}
                    {alert.type === 'info' && (
                      <Activity className="w-5 h-5 text-blue-400 mt-0.5" />
                    )}
                    <div className="flex-1">
                      <p className="text-sm text-gray-300">{alert.message}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <div className="h-1.5 flex-1 bg-white/10 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${alert.confidence}%` }}
                            transition={{ duration: 1, delay: 0.5 + index * 0.1 }}
                            className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                          />
                        </div>
                        <span className="text-xs text-gray-500">{alert.confidence}%</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </motion.div>
      </div>

      {/* Recent Transactions */}
      <motion.div variants={fadeInUp}>
        <GlassCard className="p-6" variant="accent">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span>Live</span>
            </div>
          </div>
          
          <div className="space-y-3">
            {recentTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="flex items-center justify-between p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${
                    transaction.type === 'in' 
                      ? 'bg-green-500/20 text-green-400' 
                      : 'bg-red-500/20 text-red-400'
                  }`}>
                    {transaction.type === 'in' ? (
                      <ArrowUpRight className="w-5 h-5" />
                    ) : (
                      <ArrowDownRight className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium text-white">{transaction.party}</p>
                    <p className="text-sm text-gray-400">{transaction.time}</p>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'in' ? 'text-green-400' : 'text-red-400'
                  }`}>
                    {transaction.type === 'in' ? '+' : '-'}{formatBDT(transaction.amount)}
                  </p>
                  <p className="text-xs text-gray-500">{transaction.status}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </GlassCard>
      </motion.div>
    </motion.div>
  )
}