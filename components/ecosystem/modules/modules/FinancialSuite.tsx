'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  PieChart, 
  CreditCard,
  FileText,
  Calculator,
  ArrowUpRight,
  ArrowDownRight,
  AlertTriangle,
  Smartphone,
  Activity,
  Zap,
  RefreshCw,
  ChevronRight,
  Settings,
  SlidersHorizontal
} from 'lucide-react'
import { formatBDT, formatPercentage } from '../../utils/bdCurrency'
import { fadeInUp, staggerContainer } from '../../utils/animations'
import Image from 'next/image'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface PaymentTransaction {
  id: string
  amount: number
  method: 'bkash' | 'nagad' | 'bank'
  type: 'in' | 'out'
  party: string
  time: string
  status: 'completed' | 'pending' | 'failed'
}

interface CostCategory {
  name: string
  budget: number
  actual: number
  variance: number
}

export default function FinancialSuite() {
  const [activeView, setActiveView] = useState<'dashboard' | 'predictor' | 'payments' | 'heatmap'>('dashboard')
  const [revenueGrowth, setRevenueGrowth] = useState(12)
  const [expenseReduction, setExpenseReduction] = useState(5)
  const [collectionRate, setCollectionRate] = useState(85)
  const [predictedCashFlow, setPredictedCashFlow] = useState(0)
  const [parent] = useAutoAnimate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const transactionIdCounter = useRef(1)
  
  const financialMetrics = {
    monthlyRevenue: 523000000, // 52.3 Crore
    cashFlow: 85000000, // 8.5 Crore
    profitMargin: 22.5,
    dso: 32, // Days Sales Outstanding
    costReduction: 15,
    invoicesProcessed: 3421
  }

  const cashFlowData = [
    { month: 'Jan', inflow: 45, outflow: 38 },
    { month: 'Feb', inflow: 52, outflow: 41 },
    { month: 'Mar', inflow: 48, outflow: 39 },
    { month: 'Apr', inflow: 58, outflow: 42 },
    { month: 'May', inflow: 65, outflow: 45 },
    { month: 'Jun', inflow: 72, outflow: 48 }
  ]

  // Live payment transactions
  const [transactions, setTransactions] = useState<PaymentTransaction[]>([
    { id: '1', amount: 1520000, method: 'bkash', type: 'in', party: 'ABC Developers', time: '2 mins ago', status: 'completed' },
    { id: '2', amount: 850000, method: 'nagad', type: 'out', party: 'Steel Supplier BD', time: '5 mins ago', status: 'completed' },
    { id: '3', amount: 5200000, method: 'bank', type: 'in', party: 'XYZ Construction', time: '12 mins ago', status: 'pending' },
    { id: '4', amount: 320000, method: 'bkash', type: 'out', party: 'Labor Contractor', time: '18 mins ago', status: 'completed' },
  ])

  // Cost categories for heat map
  const costCategories: CostCategory[] = [
    { name: 'Materials', budget: 45000000, actual: 52000000, variance: 15.6 },
    { name: 'Labor', budget: 28000000, actual: 26500000, variance: -5.4 },
    { name: 'Equipment', budget: 15000000, actual: 18200000, variance: 21.3 },
    { name: 'Subcontractors', budget: 22000000, actual: 23100000, variance: 5.0 },
    { name: 'Site Expenses', budget: 8000000, actual: 7200000, variance: -10.0 },
    { name: 'Admin Costs', budget: 5000000, actual: 5800000, variance: 16.0 },
  ]

  // Update predicted cash flow when sliders change
  useEffect(() => {
    const baseFlow = 85000000
    const revenueImpact = baseFlow * (revenueGrowth / 100)
    const expenseImpact = baseFlow * 0.7 * (expenseReduction / 100)
    const collectionImpact = baseFlow * 0.3 * ((collectionRate - 70) / 100)
    setPredictedCashFlow(baseFlow + revenueImpact + expenseImpact + collectionImpact)
  }, [revenueGrowth, expenseReduction, collectionRate])

  // Simulate live transactions
  useEffect(() => {
    const interval = setInterval(() => {
      const methods: ('bkash' | 'nagad' | 'bank')[] = ['bkash', 'nagad', 'bank']
      const parties = ['Dream Housing Ltd', 'Concrete Suppliers BD', 'Metro Construction', 'Gulshan Developers', 'Dhanmondi Builders']
      const newTransaction: PaymentTransaction = {
        id: `transaction-${transactionIdCounter.current++}`,
        amount: Math.floor(Math.random() * 5000000) + 100000,
        method: methods[Math.floor(Math.random() * methods.length)],
        type: Math.random() > 0.4 ? 'in' : 'out',
        party: parties[Math.floor(Math.random() * parties.length)],
        time: 'just now',
        status: Math.random() > 0.1 ? 'completed' : 'pending'
      }
      setTransactions(prev => [newTransaction, ...prev.slice(0, 9)])
    }, 8000)
    return () => clearInterval(interval)
  }, [])

  // Heat map visualization
  useEffect(() => {
    if (activeView === 'heatmap' && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const drawHeatmap = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        const cellWidth = canvas.width / 3
        const cellHeight = canvas.height / 2
        
        costCategories.forEach((category, index) => {
          const x = (index % 3) * cellWidth
          const y = Math.floor(index / 3) * cellHeight
          
          // Color based on variance
          const hue = category.variance > 0 ? 0 : 120 // Red for overrun, green for under
          const saturation = Math.min(Math.abs(category.variance) * 4, 100)
          ctx.fillStyle = `hsl(${hue}, ${saturation}%, ${50 - Math.abs(category.variance)}%)`
          
          ctx.fillRect(x + 5, y + 5, cellWidth - 10, cellHeight - 10)
          
          // Add text
          ctx.fillStyle = 'white'
          ctx.font = 'bold 16px Inter'
          ctx.textAlign = 'center'
          ctx.fillText(category.name, x + cellWidth / 2, y + cellHeight / 2 - 10)
          ctx.font = '14px Inter'
          ctx.fillText(`${category.variance > 0 ? '+' : ''}${category.variance.toFixed(1)}%`, x + cellWidth / 2, y + cellHeight / 2 + 10)
        })
      }

      drawHeatmap()
    }
  }, [activeView, costCategories])

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      animate="show"
      className="space-y-6"
      ref={parent}
    >
      {/* Header with View Switcher */}
      <motion.div variants={fadeInUp} className="text-center">
        <h3 className="text-3xl font-bold mb-2">Financial Intelligence Suite</h3>
        <p className="text-gray-600 mb-4">Complete Financial Control with Zero Surprises</p>
        
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: PieChart },
            { id: 'predictor', label: 'Cash Flow Predictor', icon: TrendingUp },
            { id: 'payments', label: 'Live Payments', icon: Smartphone },
            { id: 'heatmap', label: 'Cost Heat Map', icon: AlertTriangle }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id as any)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeView === view.id
                  ? 'bg-primary text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <view.icon className="w-4 h-4" />
              <span>{view.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Financial Overview */}
      <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          <PieChart className="w-5 h-5 text-accent" />
          Real-Time Financial Dashboard
        </h4>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
            <p className="text-2xl font-bold text-green-600">{formatBDT(financialMetrics.monthlyRevenue)}</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowUpRight className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600">12% from last month</span>
            </div>
          </div>
          
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Cash Flow</p>
            <p className="text-2xl font-bold text-blue-600">{formatBDT(financialMetrics.cashFlow)}</p>
            <p className="text-xs text-gray-500 mt-1">Positive for 8 months</p>
          </div>
          
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
            <p className="text-2xl font-bold text-purple-600">{formatPercentage(financialMetrics.profitMargin)}</p>
            <p className="text-xs text-gray-500 mt-1">Industry avg: 15%</p>
          </div>
          
          <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">DSO</p>
            <p className="text-2xl font-bold text-yellow-600">{financialMetrics.dso} days</p>
            <div className="flex items-center gap-1 mt-1">
              <ArrowDownRight className="w-4 h-4 text-green-600" />
              <span className="text-xs text-green-600">Improved from 45</span>
            </div>
          </div>
          
          <div className="bg-teal-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Cost Reduction</p>
            <p className="text-2xl font-bold text-teal-600">{formatPercentage(financialMetrics.costReduction)}</p>
            <p className="text-xs text-gray-500 mt-1">Through AI optimization</p>
          </div>
          
          <div className="bg-indigo-50 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Invoices/Month</p>
            <p className="text-2xl font-bold text-indigo-600">{financialMetrics.invoicesProcessed}</p>
            <p className="text-xs text-gray-500 mt-1">95% automated</p>
          </div>
        </div>
      </motion.div>

      {/* Cash Flow Visualization */}
      <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-primary" />
          Cash Flow Trend (In Crores)
        </h4>
        
        <div className="relative h-64">
          <div className="absolute inset-0 flex items-end justify-between gap-2">
            {cashFlowData.map((data, index) => (
              <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                <div className="w-full flex flex-col gap-1">
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.inflow * 3}px` }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="bg-green-500 rounded-t"
                  />
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: `${data.outflow * 3}px` }}
                    transition={{ delay: index * 0.1 + 0.05, duration: 0.5 }}
                    className="bg-red-500 rounded-b"
                  />
                </div>
                <span className="text-xs text-gray-600">{data.month}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded" />
            <span className="text-sm text-gray-600">Inflow</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded" />
            <span className="text-sm text-gray-600">Outflow</span>
          </div>
        </div>
      </motion.div>

      {/* Payment Integration */}
      <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
        <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
          <CreditCard className="w-5 h-5 text-success" />
          Bangladesh Payment Integration
        </h4>
        
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto mb-2 bg-pink-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-pink-600">bKash</span>
            </div>
            <p className="text-sm font-semibold">bKash</p>
            <p className="text-xs text-gray-500">70M users</p>
          </div>
          
          <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto mb-2 bg-orange-100 rounded-lg flex items-center justify-center">
              <span className="text-2xl font-bold text-orange-600">Nagad</span>
            </div>
            <p className="text-sm font-semibold">Nagad</p>
            <p className="text-xs text-gray-500">74M users</p>
          </div>
          
          <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
            <div className="w-16 h-16 mx-auto mb-2 bg-blue-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-sm font-semibold">Bank Transfer</p>
            <p className="text-xs text-gray-500">All banks</p>
          </div>
        </div>
        
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600">
            <span className="font-semibold">Latest Transaction:</span> ৳15.2L received from ABC Developers via bKash (2 mins ago)
          </p>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeView === 'dashboard' && (
          <motion.div
            key="dashboard"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Financial Overview */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <PieChart className="w-5 h-5 text-accent" />
                Real-Time Financial Dashboard
              </h4>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Monthly Revenue</p>
                  <p className="text-2xl font-bold text-green-600">{formatBDT(financialMetrics.monthlyRevenue)}</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowUpRight className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600">12% from last month</span>
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Cash Flow</p>
                  <p className="text-2xl font-bold text-blue-600">{formatBDT(financialMetrics.cashFlow)}</p>
                  <p className="text-xs text-gray-500 mt-1">Positive for 8 months</p>
                </div>
                
                <div className="bg-purple-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Profit Margin</p>
                  <p className="text-2xl font-bold text-purple-600">{formatPercentage(financialMetrics.profitMargin)}</p>
                  <p className="text-xs text-gray-500 mt-1">Industry avg: 15%</p>
                </div>
                
                <div className="bg-yellow-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">DSO</p>
                  <p className="text-2xl font-bold text-yellow-600">{financialMetrics.dso} days</p>
                  <div className="flex items-center gap-1 mt-1">
                    <ArrowDownRight className="w-4 h-4 text-green-600" />
                    <span className="text-xs text-green-600">Improved from 45</span>
                  </div>
                </div>
                
                <div className="bg-teal-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Cost Reduction</p>
                  <p className="text-2xl font-bold text-teal-600">{formatPercentage(financialMetrics.costReduction)}</p>
                  <p className="text-xs text-gray-500 mt-1">Through AI optimization</p>
                </div>
                
                <div className="bg-indigo-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600 mb-1">Invoices/Month</p>
                  <p className="text-2xl font-bold text-indigo-600">{financialMetrics.invoicesProcessed}</p>
                  <p className="text-xs text-gray-500 mt-1">95% automated</p>
                </div>
              </div>
            </motion.div>

            {/* Cash Flow Visualization */}
            <motion.div variants={fadeInUp} className="bg-white rounded-xl shadow-lg p-6">
              <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                Cash Flow Trend (In Crores)
              </h4>
              
              <div className="relative h-64">
                <div className="absolute inset-0 flex items-end justify-between gap-2">
                  {cashFlowData.map((data, index) => (
                    <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full flex flex-col gap-1">
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${data.inflow * 3}px` }}
                          transition={{ delay: index * 0.1, duration: 0.5 }}
                          className="bg-green-500 rounded-t"
                        />
                        <motion.div
                          initial={{ height: 0 }}
                          animate={{ height: `${data.outflow * 3}px` }}
                          transition={{ delay: index * 0.1 + 0.05, duration: 0.5 }}
                          className="bg-red-500 rounded-b"
                        />
                      </div>
                      <span className="text-xs text-gray-600">{data.month}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex items-center justify-center gap-6 mt-4">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-green-500 rounded" />
                  <span className="text-sm text-gray-600">Inflow</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 bg-red-500 rounded" />
                  <span className="text-sm text-gray-600">Outflow</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}

        {activeView === 'predictor' && (
          <motion.div
            key="predictor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <SlidersHorizontal className="w-5 h-5 text-primary" />
              90-Day Cash Flow Predictor
            </h4>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Revenue Growth Rate</label>
                    <span className="text-sm font-bold text-primary">{revenueGrowth}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="30"
                    value={revenueGrowth}
                    onChange={(e) => setRevenueGrowth(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #14B8A6 0%, #14B8A6 ${revenueGrowth * 3.33}%, #e5e7eb ${revenueGrowth * 3.33}%, #e5e7eb 100%)`
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">Based on market trends and project pipeline</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Expense Reduction</label>
                    <span className="text-sm font-bold text-accent">{expenseReduction}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={expenseReduction}
                    onChange={(e) => setExpenseReduction(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #22C55E 0%, #22C55E ${expenseReduction * 5}%, #e5e7eb ${expenseReduction * 5}%, #e5e7eb 100%)`
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">Through AI optimization and automation</p>
                </div>
                
                <div>
                  <div className="flex justify-between mb-2">
                    <label className="text-sm font-medium">Collection Rate</label>
                    <span className="text-sm font-bold text-success">{collectionRate}%</span>
                  </div>
                  <input
                    type="range"
                    min="60"
                    max="100"
                    value={collectionRate}
                    onChange={(e) => setCollectionRate(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #F59E0B 0%, #F59E0B ${(collectionRate - 60) * 2.5}%, #e5e7eb ${(collectionRate - 60) * 2.5}%, #e5e7eb 100%)`
                    }}
                  />
                  <p className="text-xs text-gray-500 mt-1">Improved with automated reminders</p>
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-6">
                <h5 className="text-lg font-bold mb-4">AI Prediction</h5>
                
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Cash Flow</p>
                    <p className="text-2xl font-bold text-gray-800">{formatBDT(85000000)}</p>
                  </div>
                  
                  <div className="flex items-center gap-2">
                    <ChevronRight className="w-5 h-5 text-green-600" />
                    <Zap className="w-5 h-5 text-yellow-500 animate-pulse" />
                  </div>
                  
                  <div>
                    <p className="text-sm text-gray-600">90-Day Predicted Cash Flow</p>
                    <motion.p
                      key={predictedCashFlow}
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      className="text-3xl font-bold text-green-600"
                    >
                      {formatBDT(predictedCashFlow)}
                    </motion.p>
                  </div>
                  
                  <div className="bg-white/50 rounded-lg p-4">
                    <p className="text-sm">
                      <span className="font-semibold">AI Insight:</span> With these parameters,
                      cash flow will {predictedCashFlow > 85000000 ? 'increase' : 'decrease'} by{' '}
                      <span className="font-bold text-primary">
                        {formatPercentage(Math.abs((predictedCashFlow - 85000000) / 85000000 * 100))}
                      </span>
                    </p>
                    
                    {predictedCashFlow > 100000000 && (
                      <p className="text-sm text-green-600 mt-2">
                        <Activity className="w-4 h-4 inline mr-1" />
                        Excellent! Consider expanding operations or early loan repayment.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'payments' && (
          <motion.div
            key="payments"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold flex items-center gap-2">
                <Smartphone className="w-5 h-5 text-primary" />
                Live Payment Dashboard
              </h4>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <RefreshCw className="w-4 h-4 animate-spin" />
                <span>Live updates</span>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-pink-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-pink-600 mb-1">
                  {formatBDT(transactions.filter(t => t.method === 'bkash' && t.type === 'in').reduce((sum, t) => sum + t.amount, 0))}
                </div>
                <p className="text-sm text-gray-600">bKash Received</p>
              </div>
              
              <div className="bg-orange-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-orange-600 mb-1">
                  {formatBDT(transactions.filter(t => t.method === 'nagad' && t.type === 'in').reduce((sum, t) => sum + t.amount, 0))}
                </div>
                <p className="text-sm text-gray-600">Nagad Received</p>
              </div>
              
              <div className="bg-blue-50 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {formatBDT(transactions.filter(t => t.method === 'bank').reduce((sum, t) => sum + (t.type === 'in' ? t.amount : -t.amount), 0))}
                </div>
                <p className="text-sm text-gray-600">Bank Balance</p>
              </div>
            </div>
            
            <div className="space-y-3 max-h-96 overflow-y-auto">
              {transactions.map((transaction, index) => (
                <motion.div
                  key={transaction.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className={`flex items-center gap-4 p-4 rounded-lg border ${
                    transaction.status === 'pending' ? 'border-yellow-200 bg-yellow-50' : 'border-gray-200'
                  }`}
                >
                  <div className={`w-12 h-12 rounded-lg flex items-center justify-center text-xs font-bold ${
                    transaction.method === 'bkash' ? 'bg-pink-100 text-pink-600' :
                    transaction.method === 'nagad' ? 'bg-orange-100 text-orange-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {transaction.method === 'bkash' ? 'bK' :
                     transaction.method === 'nagad' ? 'NG' : 'BNK'}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-semibold">{transaction.party}</span>
                      {transaction.status === 'pending' && (
                        <span className="text-xs bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">Pending</span>
                      )}
                    </div>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                  </div>
                  
                  <div className={`text-xl font-bold ${
                    transaction.type === 'in' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'in' ? '+' : '-'}{formatBDT(transaction.amount)}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {activeView === 'heatmap' && (
          <motion.div
            key="heatmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h4 className="text-xl font-bold mb-6 flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-warning" />
              Cost Overrun Heat Map
            </h4>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <canvas
                  ref={canvasRef}
                  className="w-full h-64 rounded-lg"
                  style={{ backgroundColor: '#f9fafb' }}
                />
                
                <div className="mt-4 flex items-center justify-center gap-6">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span className="text-sm">Over Budget</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    <span className="text-sm">Under Budget</span>
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <h5 className="font-semibold mb-2">AI Recommendations</h5>
                
                {costCategories
                  .filter(cat => cat.variance > 10)
                  .map((category, index) => (
                    <motion.div
                      key={category.name}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-red-50 border border-red-200 rounded-lg p-4"
                    >
                      <div className="flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-600 mt-0.5" />
                        <div className="flex-1">
                          <h6 className="font-semibold text-red-900">{category.name}</h6>
                          <p className="text-sm text-red-700 mt-1">
                            {formatPercentage(category.variance)} over budget ({formatBDT(category.actual - category.budget)} excess)
                          </p>
                          <p className="text-sm text-gray-600 mt-2">
                            <span className="font-semibold">AI Suggestion:</span>
                            {category.name === 'Materials' && ' Negotiate bulk discounts with suppliers or consider alternative materials.'}
                            {category.name === 'Equipment' && ' Optimize equipment usage schedule to reduce rental costs.'}
                            {category.name === 'Admin Costs' && ' Automate administrative processes to reduce overhead.'}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                  <div className="flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-600" />
                    <span className="font-semibold text-green-900">Overall Health Score: 78/100</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Project financials are generally healthy with specific areas needing attention.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Features Summary */}
      <motion.div variants={fadeInUp} className="bg-gradient-to-br from-gray-50 to-blue-50 rounded-xl p-6">
        <h4 className="text-lg font-bold mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5 text-primary" />
          AI-Powered Financial Intelligence
        </h4>
        
        <div className="grid md:grid-cols-3 gap-4">
          <div className="bg-white/70 rounded-lg p-4">
            <Calculator className="w-8 h-8 text-primary mb-2" />
            <h5 className="font-semibold mb-1">Smart Forecasting</h5>
            <p className="text-sm text-gray-600">95% accurate cash flow predictions</p>
          </div>
          
          <div className="bg-white/70 rounded-lg p-4">
            <FileText className="w-8 h-8 text-accent mb-2" />
            <h5 className="font-semibold mb-1">Invoice Automation</h5>
            <p className="text-sm text-gray-600">Process 3,000+ invoices monthly</p>
          </div>
          
          <div className="bg-white/70 rounded-lg p-4">
            <Zap className="w-8 h-8 text-success mb-2" />
            <h5 className="font-semibold mb-1">Real-time Insights</h5>
            <p className="text-sm text-gray-600">Instant alerts on anomalies</p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}