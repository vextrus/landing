'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Users, 
  Fingerprint,
  Brain,
  DollarSign,
  UserCheck,
  TrendingUp,
  Award,
  Calendar,
  BarChart3,
  Bell,
  Search,
  Settings,
  Activity,
  Shield,
  Target,
  Zap
} from 'lucide-react'
import ModuleWrapper from '../../shared/ModuleWrapper'
import { 
  GlassCard, 
  AnimatedButton, 
  LoadingSkeleton
} from '../../shared/ui'
import { formatBDT } from '../../utils/bdCurrency'
import { workforce, financialData } from '../../../../lib/mockDatabase'

// Import views
import WorkforceAnalytics from './views/WorkforceAnalytics'
import BiometricAttendance from './views/BiometricAttendance'
import SkillsMatrix from './views/SkillsMatrix'
import PayrollOptimization from './views/PayrollOptimization'
export default function HRWorkforce() {
  const [activeView, setActiveView] = useState<'analytics' | 'biometric' | 'skills' | 'payroll'>('analytics')
  const [realtimeAttendance, setRealtimeAttendance] = useState(workforce.attendance.today)

  // Simulate real-time attendance updates
  useEffect(() => {
    const interval = setInterval(() => {
      setRealtimeAttendance(prev => ({
        ...prev,
        present: prev.present + Math.floor((Math.random() - 0.5) * 20),
        late: prev.late + Math.floor((Math.random() - 0.5) * 5)
      }))
    }, 8000)
    
    return () => clearInterval(interval)
  }, [])

  const features = [
    {
      icon: Fingerprint,
      title: 'Biometric Attendance',
      description: 'Fingerprint & face recognition across 4 construction sites'
    },
    {
      icon: Brain,
      title: 'AI Skill Assessment',
      description: 'Competency tracking for 2,847 workers with training recommendations'
    },
    {
      icon: Activity,
      title: 'Live Analytics',
      description: 'Real-time productivity insights and performance monitoring'
    },
    {
      icon: DollarSign,
      title: 'Bangladesh Payroll',
      description: 'Automated TDS, PF & Eid bonus compliance processing'
    }
  ]

  const attendanceRate = ((realtimeAttendance.present / workforce.totalEmployees) * 100).toFixed(1)
  const payrollAmount = financialData.overview.monthlyExpenses * 0.35 // ~35% is payroll

  const metrics = [
    { 
      label: 'Total Workforce', 
      value: workforce.totalEmployees.toLocaleString(), 
      trend: `+127 this month` 
    },
    { 
      label: 'Attendance Today', 
      value: `${attendanceRate}%`, 
      trend: `${realtimeAttendance.present} present` 
    },
    { 
      label: 'Skill Compliance', 
      value: '87.3%', 
      trend: '+5.2% improved' 
    },
    { 
      label: 'Monthly Payroll', 
      value: formatBDT(payrollAmount), 
      trend: '99.8% accuracy' 
    }
  ]

  const navigationItems = [
    { 
      id: 'analytics', 
      label: 'Workforce Analytics', 
      icon: BarChart3,
      description: 'Performance insights & productivity tracking',
      color: '#8B5CF6'
    },
    { 
      id: 'biometric', 
      label: 'Biometric Systems', 
      icon: Fingerprint,
      description: 'Attendance & security management',
      color: '#06B6D4' 
    },
    { 
      id: 'skills', 
      label: 'Skills Matrix', 
      icon: Brain,
      description: 'AI-powered competency assessments',
      color: '#10B981'
    },
    { 
      id: 'payroll', 
      label: 'Smart Payroll', 
      icon: DollarSign,
      description: 'Automated payroll with BD compliance',
      color: '#F59E0B'
    }
  ]

  return (
    <ModuleWrapper
      moduleName="AI Workforce Management"
      moduleIcon={Users}
      moduleDescription="Biometric-enabled HR system with AI skill optimization and Bangladesh labor law compliance"
      features={features}
      metrics={metrics}
      accentColor="#8B5CF6"
      directAccess={true}
    >
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
                className="p-3 rounded-2xl bg-gradient-to-br from-purple-500/20 to-indigo-500/20 border border-purple-400/30"
                whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
                transition={{ duration: 0.6 }}
              >
                <Users className="w-7 h-7 text-purple-400" />
              </motion.div>
              <div>
                <h1 className="text-2xl font-bold glass-text-primary">Workforce Intelligence</h1>
                <p className="text-sm glass-text-muted">AI-powered human capital management</p>
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
                        ? 'bg-gradient-to-r from-purple-500/90 to-indigo-600/90 border-purple-400/30' 
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
              <div className="w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
              <span className="text-xs glass-text-muted">
                {realtimeAttendance.present} Active
              </span>
            </motion.div>

            <AnimatedButton variant="ghost" size="sm" className="p-3 relative">
              <Bell className="w-5 h-5" />
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-400 rounded-full animate-pulse" />
            </AnimatedButton>
            
            <AnimatedButton variant="ghost" size="sm" className="p-3">
              <Search className="w-5 h-5" />
            </AnimatedButton>

            <AnimatedButton variant="ghost" size="sm" className="p-3">
              <Settings className="w-5 h-5" />
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Enhanced Main Content Area with Better Transitions */}
        <div className="h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
          <AnimatePresence mode="wait">
            {activeView === 'analytics' && (
              <motion.div
                key="analytics"
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
                <WorkforceAnalytics />
              </motion.div>
            )}

            {activeView === 'biometric' && (
              <motion.div
                key="biometric"
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
                <BiometricAttendance />
              </motion.div>
            )}

            {activeView === 'skills' && (
              <motion.div
                key="skills"
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
                <SkillsMatrix />
              </motion.div>
            )}

            {activeView === 'payroll' && (
              <motion.div
                key="payroll"
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
                <PayrollOptimization />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Enhanced Floating HR Metrics */}
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
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className="text-lg font-bold text-purple-400">
                  {attendanceRate}%
                </div>
                <div className="text-xs glass-text-muted">Attendance</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <div className="text-lg font-bold text-cyan-400">
                  {(workforce.totalEmployees / 1000).toFixed(1)}K
                </div>
                <div className="text-xs glass-text-muted">Workers</div>
              </div>
              <div className="w-px h-8 bg-white/20" />
              <div className="flex flex-col items-center">
                <div className="text-lg font-bold text-green-400">
                  87%
                </div>
                <div className="text-xs glass-text-muted">Skills</div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Liquid Glass Ambient Effects */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <motion.div
            className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-500/10 via-indigo-500/5 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, 20, 0],
              y: [0, -10, 0],
              opacity: [0.3, 0.6, 0.3]
            }}
            transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-cyan-500/10 via-blue-500/5 to-transparent rounded-full blur-3xl"
            animate={{
              x: [0, -15, 0],
              y: [0, 15, 0],
              opacity: [0.2, 0.5, 0.2]
            }}
            transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          />
        </div>
      </div>
    </ModuleWrapper>
  )
}