'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Brain, 
  MapPin, 
  Activity, 
  Shield, 
  Calendar,
  Settings,
  BarChart3,
  LayoutDashboard,
  Bell,
  Search,
  Command
} from 'lucide-react'
import { AnimatedButton } from '../../shared/ui'
import dynamic from 'next/dynamic'
import { PageTransition } from './components/ui/Skeleton'
import { ErrorBoundary } from './components/ErrorBoundary'

// Loading component for dynamic imports
const LoadingView = () => (
  <div className="flex items-center justify-center h-full">
    <div className="text-center">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
        <div className="absolute inset-0 w-16 h-16 border-4 border-purple-400/30 border-b-purple-400 rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse' }} />
      </div>
      <p className="text-sm text-white/60 mt-4">Loading view...</p>
    </div>
  </div>
)

// Lazy load views with enhanced versions
const DashboardView = dynamic(() => import('./views/EnhancedDashboardView'), { 
  ssr: false,
  loading: () => <LoadingView />
})
const SitesView = dynamic(() => import('./views/EnhancedSitesView'), { 
  ssr: false,
  loading: () => <LoadingView />
})
const TimelineView = dynamic(() => import('./views/ImprovedTimelineView'), { 
  ssr: false,
  loading: () => <LoadingView />
})
const AIInsightsView = dynamic(() => import('./views/EnhancedAIInsightsView'), { 
  ssr: false,
  loading: () => <LoadingView />
})
const AnalyticsView = dynamic(() => import('./views/EnhancedAnalyticsView'), { 
  ssr: false,
  loading: () => <LoadingView />
})
const SettingsView = dynamic(() => import('./views/EnhancedSettingsView'), { 
  ssr: false,
  loading: () => <LoadingView />
})

// Import hooks
import { useRealtimeData } from './hooks/useRealtimeData'
import { useAIPredictions } from './hooks/useAIPredictions'

// Types
export interface CommandCenterState {
  activeView: 'dashboard' | 'sites' | 'timeline' | 'ai' | 'analytics' | 'settings'
  isSearchOpen: boolean
  notifications: Notification[]
}

export interface Notification {
  id: string
  type: 'alert' | 'info' | 'success' | 'warning'
  message: string
  timestamp: Date
  read: boolean
}

const navigationItems = [
  { 
    id: 'dashboard', 
    label: 'Command Overview', 
    icon: LayoutDashboard,
    description: 'Executive command center',
    color: '#00D9FF'
  },
  { 
    id: 'sites', 
    label: 'Site Control', 
    icon: MapPin,
    description: 'Multi-site management',
    color: '#10B981' 
  },
  { 
    id: 'timeline', 
    label: 'Project Timeline', 
    icon: Calendar,
    description: 'Project lifecycle tracking',
    color: '#F59E0B'
  },
  { 
    id: 'ai', 
    label: 'AI Intelligence', 
    icon: Brain,
    description: 'Construction AI insights',
    color: '#FF00EA'
  },
  { 
    id: 'analytics', 
    label: 'Deep Analytics', 
    icon: BarChart3,
    description: 'Performance insights',
    color: '#6366F1'
  },
  { 
    id: 'settings', 
    label: 'Control Panel', 
    icon: Settings,
    description: 'System configuration',
    color: '#8B5CF6'
  }
]

export default function CommandCenterDashboard() {
  const [state, setState] = useState<CommandCenterState>({
    activeView: 'dashboard',
    isSearchOpen: false,
    notifications: []
  })

  // Real-time data connection
  const { data: realtimeData, isConnected } = useRealtimeData()
  const { predictions, isProcessing } = useAIPredictions(realtimeData)

  // Handle navigation
  useEffect(() => {
    const handleNavigation = (event: CustomEvent) => {
      const view = event.detail as CommandCenterState['activeView']
      handleViewChange(view)
    }

    window.addEventListener('navigate-to-view', handleNavigation as any)
    return () => {
      window.removeEventListener('navigate-to-view', handleNavigation as any)
    }
  }, [])

  // Handle view switching
  const handleViewChange = (view: CommandCenterState['activeView']) => {
    setState(prev => ({ ...prev, activeView: view }))
  }

  // Toggle search
  const toggleSearch = () => {
    setState(prev => ({ ...prev, isSearchOpen: !prev.isSearchOpen }))
  }

  return (
    <div className="h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden">
      {/* Enhanced Header Navigation */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="h-20 px-8 flex items-center justify-between relative"
      >
        {/* Subtle Glass Background */}
        <div className="absolute inset-0 bg-white/5 backdrop-blur-xl border-b border-white/10" />

        <div className="flex items-center gap-8 relative z-10">
          {/* Module Identity */}
          <div className="flex items-center gap-4">
            <motion.div
              className="p-3 rounded-2xl bg-gradient-to-br from-cyan-500/20 to-blue-500/20 border border-cyan-400/30"
              whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
              transition={{ duration: 0.6 }}
            >
              <Command className="w-7 h-7 text-cyan-400" />
            </motion.div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                Command Center
              </h1>
              <p className="text-sm text-white/60">Real-time construction intelligence</p>
            </div>
          </div>

          {/* Navigation Pills */}
          <div className="flex items-center gap-3 ml-8">
            {navigationItems.map((item) => (
              <motion.div
                key={item.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <AnimatedButton
                  onClick={() => handleViewChange(item.id as any)}
                  variant={state.activeView === item.id ? 'liquid' : 'ghost'}
                  size="md"
                  className={
                    state.activeView === item.id 
                      ? 'bg-gradient-to-r from-cyan-500/90 to-blue-600/90 border-cyan-400/30' 
                      : 'hover:bg-white/10 border-white/10'
                  }
                  style={
                    state.activeView === item.id 
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

        {/* Action Controls */}
        <div className="flex items-center gap-4 relative z-10">
          <motion.div
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/10 backdrop-blur-sm border border-white/20"
            whileHover={{ scale: 1.05 }}
          >
            <div className={`w-2 h-2 rounded-full ${isConnected ? 'bg-green-400' : 'bg-red-400'} animate-pulse`} />
            <span className="text-xs text-white/60">{isConnected ? 'Live Data' : 'Reconnecting'}</span>
          </motion.div>

          <AnimatedButton
            variant="ghost"
            size="sm"
            onClick={toggleSearch}
            className="p-3"
          >
            <Search className="w-5 h-5" />
          </AnimatedButton>

          <AnimatedButton variant="ghost" size="sm" className="p-3 relative">
            <Bell className="w-5 h-5" />
            {state.notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
            )}
          </AnimatedButton>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="h-[calc(100vh-5rem)] overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/20">
        <ErrorBoundary>
          <AnimatePresence mode="wait">
            {state.activeView === 'dashboard' && (
              <PageTransition key="dashboard">
                <DashboardView />
              </PageTransition>
            )}

            {state.activeView === 'sites' && (
              <PageTransition key="sites">
                <SitesView />
              </PageTransition>
            )}

            {state.activeView === 'timeline' && (
              <PageTransition key="timeline">
                <TimelineView />
              </PageTransition>
            )}

            {state.activeView === 'ai' && (
              <PageTransition key="ai">
                <AIInsightsView />
              </PageTransition>
            )}

            {state.activeView === 'analytics' && (
              <PageTransition key="analytics">
                <AnalyticsView />
              </PageTransition>
            )}

            {state.activeView === 'settings' && (
              <PageTransition key="settings">
                <SettingsView />
              </PageTransition>
            )}
          </AnimatePresence>
        </ErrorBoundary>
      </div>

      {/* Floating Status Indicators */}
      <motion.div
        className="absolute bottom-8 right-8 z-50"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1 }}
      >
        <motion.div
          className="p-4 rounded-2xl bg-black/80 backdrop-blur-xl border border-white/20"
          whileHover={{ scale: 1.05 }}
        >
          <div className="flex items-center gap-3">
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-cyan-400">47</div>
              <div className="text-xs text-white/60">Active Sites</div>
            </div>
            <div className="w-px h-8 bg-white/20" />
            <div className="flex flex-col items-center">
              <div className="text-lg font-bold text-green-400">98.5%</div>
              <div className="text-xs text-white/60">Safety Score</div>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* AI Processing Indicator */}
      {isProcessing && (
        <motion.div
          className="absolute top-24 left-1/2 transform -translate-x-1/2 z-50"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
        >
          <div className="px-6 py-3 rounded-full bg-purple-500/20 backdrop-blur-xl border border-purple-400/30 flex items-center gap-3">
            <Brain className="w-5 h-5 text-purple-400 animate-pulse" />
            <span className="text-sm text-purple-300">AI Processing {predictions.length} insights...</span>
          </div>
        </motion.div>
      )}
    </div>
  )
}