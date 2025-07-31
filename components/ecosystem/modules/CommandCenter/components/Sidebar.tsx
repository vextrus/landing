'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  MapPin, 
  Calendar, 
  Brain, 
  BarChart3, 
  Settings,
  ChevronLeft,
  ChevronRight,
  Zap,
  Sparkles,
  Activity
} from 'lucide-react'
import { CommandCenterState } from '../index'
import { useState, useEffect } from 'react'
import MagneticButton from './ui/MagneticButton'

interface SidebarProps {
  activeView: CommandCenterState['activeView']
  isCollapsed: boolean
  onViewChange: (view: CommandCenterState['activeView']) => void
  onToggle: () => void
}

const menuItems = [
  { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard', color: '#6366F1' },
  { id: 'sites' as const, icon: MapPin, label: 'Sites', color: '#10B981' },
  { id: 'timeline' as const, icon: Calendar, label: 'Timeline', color: '#F59E0B' },
  { id: 'ai' as const, icon: Brain, label: 'AI Insights', color: '#8B5CF6' },
  { id: 'analytics' as const, icon: BarChart3, label: 'Analytics', color: '#06B6D4' },
  { id: 'settings' as const, icon: Settings, label: 'Settings', color: '#6B7280' }
]

export default function Sidebar({ activeView, isCollapsed, onViewChange, onToggle }: SidebarProps) {
  const [hoveredItem, setHoveredItem] = useState<string | null>(null)
  const [notificationCounts, setNotificationCounts] = useState<Record<string, number>>({
    sites: 3,
    ai: 2,
    analytics: 1
  })

  // Simulate real-time notification updates
  useEffect(() => {
    const interval = setInterval(() => {
      const views = ['sites', 'ai', 'analytics']
      const randomView = views[Math.floor(Math.random() * views.length)]
      setNotificationCounts(prev => ({
        ...prev,
        [randomView]: Math.min(prev[randomView] + 1, 9)
      }))
    }, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.aside
      initial={false}
      animate={{ 
        width: isCollapsed ? 80 : 250,
        x: typeof window !== 'undefined' && window.innerWidth < 1024 && isCollapsed ? -250 : 0
      }}
      transition={{ duration: 0.2, ease: 'easeInOut' }}
      className={`fixed lg:relative z-50 flex flex-col h-full overflow-hidden backdrop-blur-xl`}
      style={{
        background: 'rgba(255, 255, 255, 0.03)',
        borderRight: '1px solid rgba(255, 255, 255, 0.08)',
        boxShadow: '0 0 30px rgba(0, 217, 255, 0.1)',
      }}
    >
      {/* Logo Section */}
      <div className="p-6" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
        <motion.div 
          className="flex items-center gap-3"
          animate={{ justifyContent: isCollapsed ? 'center' : 'flex-start' }}
        >
          <motion.div 
            className="relative"
            whileHover={{ rotate: [0, -10, 10, -10, 0] }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center shadow-lg" style={{
              background: 'linear-gradient(135deg, rgba(0, 217, 255, 0.2) 0%, rgba(255, 0, 234, 0.2) 100%)',
              border: '1px solid rgba(0, 217, 255, 0.4)',
              boxShadow: '0 0 20px rgba(0, 217, 255, 0.4)',
            }}>
              <Zap className="w-6 h-6 text-white" />
            </div>
            <motion.div 
              className="absolute -bottom-1 -right-1 w-3 h-3 bg-[#10B981] rounded-full border-2 border-white"
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>
          {!isCollapsed && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
            >
              <h1 className="text-xl font-bold text-white">Vextrus</h1>
              <p className="text-xs text-white/60">Command Center</p>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 px-3 py-4">
        <ul className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon
            const isActive = activeView === item.id
            
            return (
              <li key={item.id}>
                <motion.button
                  onClick={() => {
                    console.log('Sidebar: Clicked on', item.id);
                    onViewChange(item.id);
                    // Clear notification on click
                    if (notificationCounts[item.id]) {
                      setNotificationCounts(prev => ({ ...prev, [item.id]: 0 }))
                    }
                  }}
                  onMouseEnter={() => setHoveredItem(item.id)}
                  onMouseLeave={() => setHoveredItem(null)}
                  className={`
                    relative w-full flex items-center gap-3 px-3 py-2.5 rounded-lg
                    transition-all duration-200 group backdrop-blur-sm
                    ${isActive 
                      ? 'text-white shadow-sm' 
                      : 'text-white/60 hover:text-white'
                    }
                  `}
                  style={{
                    background: isActive 
                      ? 'linear-gradient(135deg, rgba(0, 217, 255, 0.1) 0%, rgba(255, 0, 234, 0.05) 100%)'
                      : hoveredItem === item.id 
                        ? 'rgba(255, 255, 255, 0.05)' 
                        : 'transparent',
                    border: isActive 
                      ? '1px solid rgba(0, 217, 255, 0.2)' 
                      : hoveredItem === item.id
                        ? '1px solid rgba(255, 255, 255, 0.1)'
                        : '1px solid transparent',
                  }}
                  whileHover={{ x: 2 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {/* Active Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="activeIndicator"
                      className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-gradient-to-b from-[#00D9FF] to-[#FF00EA] rounded-r-full"
                    />
                  )}

                  {/* Icon with dynamic color */}
                  <div className={`relative ${isCollapsed ? 'mx-auto' : ''}`}>
                    <motion.div
                      animate={{ 
                        scale: hoveredItem === item.id ? 1.1 : 1,
                        rotate: isActive ? [0, -5, 5, 0] : 0
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      <Icon 
                        className="w-5 h-5 relative z-10" 
                        style={{ color: isActive || hoveredItem === item.id ? item.color : 'currentColor' }}
                      />
                    </motion.div>
                    {(isActive || hoveredItem === item.id) && (
                      <motion.div 
                        className="absolute inset-0 blur-lg"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        style={{ backgroundColor: item.color }}
                      />
                    )}
                    
                    {/* Notification Badge */}
                    {notificationCounts[item.id] > 0 && !isCollapsed && (
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium shadow-sm"
                      >
                        {notificationCounts[item.id]}
                      </motion.div>
                    )}
                  </div>

                  {/* Label */}
                  {!isCollapsed && (
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="font-medium"
                    >
                      {item.label}
                    </motion.span>
                  )}

                  {/* Hover Effect */}
                  {!isActive && (
                    <motion.div
                      className="absolute inset-0 rounded-lg bg-gradient-to-r opacity-0 group-hover:opacity-10"
                      style={{ 
                        backgroundImage: `linear-gradient(to right, ${item.color}20, ${item.color}10)`
                      }}
                    />
                  )}
                </motion.button>
              </li>
            )
          })}
        </ul>
      </nav>

      {/* Bottom Section */}
      <div style={{ borderTop: '1px solid rgba(255, 255, 255, 0.08)' }}>
        {/* Activity Indicator */}
        {!isCollapsed && (
          <div className="p-4">
            <div className="flex items-center gap-2 text-sm text-white/60">
              <Activity className="w-4 h-4" />
              <span>3 active processes</span>
              <motion.div
                className="ml-auto w-2 h-2 bg-green-500 rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            </div>
          </div>
        )}
        
        {/* Toggle Button */}
        <div className="p-3">
          <div 
            className="rounded-lg backdrop-blur-md"
            style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <MagneticButton
              onClick={onToggle}
              className="w-full flex items-center justify-center p-2 rounded-lg transition-all"
              magneticStrength={0.2}
            >
              <motion.div
                animate={{ rotate: isCollapsed ? 0 : 180 }}
                transition={{ duration: 0.3 }}
              >
                <ChevronRight className="w-5 h-5 text-white/60" />
              </motion.div>
            </MagneticButton>
          </div>
        </div>
      </div>
    </motion.aside>
  )
}