'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
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
  SlidersHorizontal,
  Brain,
  Sparkles,
  BarChart3,
  Shield,
  Bell,
  Wallet,
  Eye,
  Target,
  X
} from 'lucide-react'
import { 
  GlassCard, 
  AnimatedButton, 
  FloatingInput, 
  AnimatedChart,
  AnimatedCounter,
  LoadingSkeleton,
  SpringModal
} from '../../shared/ui'
import { formatBDT } from '../../utils/bdCurrency'
import { financialData } from '../../../../lib/mockDatabase'

// Import views
import DashboardView from './views/DashboardView'
import CashFlowPredictor from './views/CashFlowPredictor'
import LivePayments from './views/LivePayments'  
import AIInsights from './views/AIInsights'

interface FinancialSuiteDashboardProps {
  onClose?: () => void
}

export default function FinancialSuiteDashboard({ onClose }: FinancialSuiteDashboardProps) {
  const [activeView, setActiveView] = useState<'dashboard' | 'predictor' | 'payments' | 'insights'>('dashboard')
  const [realtimeMetrics, setRealtimeMetrics] = useState(financialData.overview)

  // Simulate real-time financial updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeMetrics(prev => ({
        ...prev,
        monthlyRevenue: prev.monthlyRevenue + (Math.random() - 0.5) * 1000000000,
        netProfit: prev.netProfit + (Math.random() - 0.5) * 500000000,
        profitMargin: prev.profitMargin + (Math.random() - 0.5) * 0.1
      }))
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const navigationItems = [
    { 
      id: 'dashboard', 
      label: 'Executive Overview', 
      icon: PieChart,
      description: 'Key financial metrics & KPIs',
      color: '#10B981'
    },
    { 
      id: 'predictor', 
      label: 'Cash Flow AI', 
      icon: TrendingUp,
      description: 'ML-powered forecasting',
      color: '#6366F1' 
    },
    { 
      id: 'payments', 
      label: 'Live Payments', 
      icon: Smartphone,
      description: 'Real-time transaction monitoring',
      color: '#EC4899'
    },
    { 
      id: 'insights', 
      label: 'AI Intelligence', 
      icon: Brain,
      description: 'Automated insights & recommendations',
      color: '#8B5CF6'
    }
  ]

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Enhanced Header Navigation with Liquid Glass */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-20 px-8 flex items-center justify-between relative"
      >
        {/* Liquid Glass Background */}
        <div className="absolute inset-0 liquid-glass-medium border-b border-white/10" />

        <div className="flex items-center gap-8 relative z-10">
          {/* Module Identity */}
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 rounded-2xl bg-gradient-to-br from-emerald-500/20 to-green-500/20 border border-emerald-400/30"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <DollarSign className="w-7 h-7 text-emerald-400" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold glass-text-primary">Financial Intelligence</h1>
              <p className="text-sm glass-text-muted">Real-time financial command & control</p>
            </div>
          </div>

          {/* Enhanced Navigation Pills */}
          <div className="flex items-center gap-3 ml-8">
            {navigationItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedButton
                  onClick={() => setActiveView(item.id as any)}
                  variant={activeView === item.id ? 'liquid' : 'ghost'}
                  size="md"
                  className={
                    activeView === item.id 
                      ? 'bg-gradient-to-r from-emerald-500/90 to-green-600/90 border-emerald-400/30' 
                      : 'hover:bg-white/10 border-white/10'
                  }
                  style={
                    activeView === item.id 
                      ? { backgroundColor: `${item.color}20`, borderColor: `${item.color}30` }
                      : {}
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="hidden md:inline">{item.label}</span>
                </AnimatedButton>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Enhanced Action Controls */}
        <div className="flex items-center gap-4 relative z-10">
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl liquid-glass-light border border-white/10"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
            <span className="text-xs glass-text-muted">Live Data</span>
          </motion.div>

          <AnimatedButton variant="ghost" size="sm" className="p-3">
            <Bell className="w-5 h-5" />
          </AnimatedButton>
          
          <AnimatedButton variant="ghost" size="sm" className="p-3">
            <Settings className="w-5 h-5" />
          </AnimatedButton>

          {onClose && (
            <AnimatedButton
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="p-3 hover:bg-red-500/20 hover:text-red-400 transition-colors"
            >
              <X className="w-5 h-5" />
            </AnimatedButton>
          )}
        </div>
      </motion.div>

      {/* Enhanced Main Content Area with Better Transitions */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        <AnimatePresence mode="wait">
          {activeView === 'dashboard' && (
            <motion.div
              key="dashboard"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <DashboardView />
            </motion.div>
          )}

          {activeView === 'predictor' && (
            <motion.div
              key="predictor"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                type: "spring", 
                stiffness: 300,
                damping: 25
              }}
            >
              <CashFlowPredictor />
            </motion.div>
          )}

          {activeView === 'payments' && (
            <motion.div
              key="payments"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <LivePayments />
            </motion.div>
          )}

          {activeView === 'insights' && (
            <motion.div
              key="insights"
              initial={{ opacity: 0, x: 30, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -30, scale: 0.95 }}
              transition={{ 
                duration: 0.4,
                type: "spring",
                stiffness: 300,
                damping: 25
              }}
            >
              <AIInsights />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Enhanced Floating Quick Actions */}
      <motion.div
        className="absolute bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="p-4 rounded-2xl liquid-glass-strong border border-white/20"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-emerald-400">
                {realtimeMetrics.profitMargin.toFixed(1)}%
              </div>
              <div className="text-xs glass-text-muted">Profit Margin</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-blue-400">
                ৳{(realtimeMetrics.monthlyRevenue / 1000000000).toFixed(1)}Cr
              </div>
              <div className="text-xs glass-text-muted">Monthly Rev</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Liquid Glass Ambient Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-500/10 via-green-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, 20, 0],
            y: [0, -10, 0],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-blue-500/10 via-cyan-500/5 to-transparent rounded-full blur-3xl"
          animate={{
            x: [0, -15, 0],
            y: [0, 15, 0],
            opacity: [0.2, 0.5, 0.2]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
      </div>
    </div>
  )
}