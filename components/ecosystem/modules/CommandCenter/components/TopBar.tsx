'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Search, 
  Bell, 
  User, 
  Command,
  X,
  Wifi,
  WifiOff,
  Settings,
  LogOut,
  HelpCircle,
  Bot,
  Sparkles,
  Zap
} from 'lucide-react'
import { Notification } from '../index'
import dynamic from 'next/dynamic'
import AnimatedButton from './ui/AnimatedButton'
import SpringModal from './ui/SpringModal'

const ConversationalInterface = dynamic(() => import('./ConversationalInterface'), { ssr: false })

interface TopBarProps {
  isSearchOpen: boolean
  onSearchToggle: () => void
  isConnected: boolean
  notifications: Notification[]
}

export default function TopBar({ isSearchOpen, onSearchToggle, isConnected, notifications }: TopBarProps) {
  const [showNotifications, setShowNotifications] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [showConversational, setShowConversational] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const [showShortcuts, setShowShortcuts] = useState(false)

  const unreadCount = notifications.filter(n => !n.read).length

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyboard = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        document.querySelector<HTMLInputElement>('input[type="text"]')?.focus()
      }
      if ((e.metaKey || e.ctrlKey) && e.key === '/') {
        e.preventDefault()
        setShowShortcuts(true)
      }
    }

    window.addEventListener('keydown', handleKeyboard)
    return () => window.removeEventListener('keydown', handleKeyboard)
  }, [])

  return (
    <header className="relative px-4 sm:px-6 py-3 sm:py-4 backdrop-blur-xl" style={{
      background: 'rgba(255, 255, 255, 0.03)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
      boxShadow: '0 4px 20px rgba(0, 217, 255, 0.05)',
    }}>
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        {/* Search Bar - Mobile Responsive */}
        <div className="flex-1 max-w-xl lg:max-w-2xl">
          <motion.div
            className="relative"
            animate={{ width: isSearchOpen ? '100%' : '100%' }}
          >
            <div className="relative group">
              <motion.div
                className="absolute left-3 top-1/2 -translate-y-1/2"
                animate={{ scale: isListening ? [1, 1.2, 1] : 1 }}
                transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
              >
                <Search className="w-5 h-5 text-white/60" />
              </motion.div>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={onSearchToggle}
                placeholder="Search or ask AI..."
                className="w-full pl-10 pr-20 py-2.5 rounded-lg text-white placeholder-white/40 focus:outline-none transition-all backdrop-blur-md"
                style={{
                  background: 'rgba(255, 255, 255, 0.05)',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  boxShadow: searchQuery ? '0 0 20px rgba(0, 217, 255, 0.2)' : 'none',
                }}
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsListening(!isListening)}
                  className={`p-1 rounded ${isListening ? 'text-[#00D9FF]' : 'text-white/40'}`}
                >
                  <Sparkles className="w-4 h-4" />
                </motion.button>
                <div className="hidden sm:flex items-center gap-1">
                  <kbd className="px-2 py-0.5 text-xs text-white/60 border border-white/20 rounded backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>⌘</kbd>
                  <kbd className="px-2 py-0.5 text-xs text-white/60 border border-white/20 rounded backdrop-blur-sm" style={{ background: 'rgba(255, 255, 255, 0.05)' }}>K</kbd>
                </div>
              </div>
            </div>

            {/* AI Suggestions */}
            <AnimatePresence>
              {isSearchOpen && searchQuery && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="absolute top-full mt-2 w-full rounded-lg shadow-xl overflow-hidden z-50 backdrop-blur-xl"
                  style={{
                    background: 'rgba(10, 11, 30, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <div className="p-2">
                    <p className="px-3 py-1 text-xs text-white/50 uppercase tracking-wider">AI Suggestions</p>
                    {['Show construction delays', 'Weather impact analysis', 'Worker productivity'].map((suggestion) => (
                      <button
                        key={suggestion}
                        className="w-full px-3 py-2 text-left text-sm text-white/80 hover:text-white rounded-md transition-all hover:bg-white/10"
                      >
                        <Command className="inline-block w-3 h-3 mr-2 text-[#00D9FF]" />
                        {suggestion}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 ml-4">
          {/* Connection Status */}
          <div className="flex items-center gap-2">
            {isConnected ? (
              <>
                <Wifi className="w-4 h-4 text-[#10B981]" />
                <span className="text-xs text-white/60 hidden sm:inline">Live</span>
              </>
            ) : (
              <>
                <WifiOff className="w-4 h-4 text-[#EF4444]" />
                <span className="text-xs text-white/60 hidden sm:inline">Offline</span>
              </>
            )}
          </div>

          {/* AI Assistant Button */}
          <motion.button
            onClick={() => setShowConversational(!showConversational)}
            className={`relative p-2 rounded-lg transition-all backdrop-blur-sm ${
              showConversational ? 'text-[#00D9FF]' : 'text-white/60 hover:text-white'
            }`}
            style={{
              background: showConversational ? 'rgba(0, 217, 255, 0.1)' : 'rgba(255, 255, 255, 0.05)',
              border: `1px solid ${showConversational ? 'rgba(0, 217, 255, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bot className="w-5 h-5" />
            {showConversational && (
              <span className="absolute -top-1 -right-1 w-2 h-2 bg-[#00D9FF] rounded-full animate-pulse" />
            )}
          </motion.button>


          {/* Notifications */}
          <div className="relative">
            <AnimatedButton
              onClick={() => setShowNotifications(!showNotifications)}
              variant={showNotifications ? "primary" : "ghost"}
              size="sm"
              className="relative"
            >
              <Bell className="w-5 h-5" />
              {unreadCount > 0 && (
                <motion.span 
                  className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-red-500 to-rose-600 text-white text-xs rounded-full flex items-center justify-center shadow-sm"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500 }}
                >
                  {unreadCount}
                </motion.span>
              )}
            </AnimatedButton>

            {/* Notifications Dropdown */}
            <AnimatePresence>
              {showNotifications && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-80 rounded-lg shadow-xl z-50 backdrop-blur-xl"
                  style={{
                    background: 'rgba(10, 11, 30, 0.95)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  <div className="p-4" style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
                    <h3 className="font-semibold text-white">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-auto">
                    {notifications.length > 0 ? (
                      notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className="p-4 transition-all hover:bg-white/5"
                          style={{
                            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                            background: !notification.read ? 'rgba(0, 217, 255, 0.05)' : 'transparent',
                          }}
                        >
                          <p className="text-sm text-white/90">{notification.message}</p>
                          <p className="text-xs text-white/50 mt-1">
                            {new Date(notification.timestamp).toLocaleTimeString()}
                          </p>
                        </div>
                      ))
                    ) : (
                      <div className="p-8 text-center text-white/50">
                        <Bell className="w-8 h-8 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">No notifications</p>
                      </div>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* User Menu */}
          <div className="relative">
            <motion.button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center gap-2 p-2 rounded-lg transition-all backdrop-blur-sm"
              style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
              }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div 
                className="w-8 h-8 rounded-full flex items-center justify-center shadow-lg"
                style={{
                  background: 'linear-gradient(135deg, #00D9FF 0%, #FF00EA 100%)',
                  boxShadow: '0 0 20px rgba(0, 217, 255, 0.3)',
                }}
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              >
                <User className="w-4 h-4 text-white" />
              </motion.div>
            </motion.button>

            {/* User Dropdown */}
            <AnimatePresence>
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50"
                >
                  <div className="p-4 border-b border-gray-200">
                    <p className="font-semibold text-gray-900">Admin User</p>
                    <p className="text-sm text-gray-500">admin@vextrus.com</p>
                  </div>
                  <div className="p-2">
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2">
                      <Settings className="w-4 h-4" />
                      Settings
                    </button>
                    <button className="w-full px-3 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2">
                      <HelpCircle className="w-4 h-4" />
                      Help & Support
                    </button>
                    <hr className="my-2 border-gray-200" />
                    <button className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 rounded-md transition-colors flex items-center gap-2 text-red-600">
                      <LogOut className="w-4 h-4" />
                      Sign Out
                    </button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Conversational Interface */}
      {showConversational && (
        <ConversationalInterface
          isOpen={showConversational}
          onClose={() => setShowConversational(false)}
          onCommand={(command) => {
            // Handle navigation commands
            if (command.toLowerCase().includes('sites')) {
              window.dispatchEvent(new CustomEvent('navigate-to-view', { detail: 'sites' }))
            } else if (command.toLowerCase().includes('dashboard')) {
              window.dispatchEvent(new CustomEvent('navigate-to-view', { detail: 'dashboard' }))
            } else if (command.toLowerCase().includes('timeline')) {
              window.dispatchEvent(new CustomEvent('navigate-to-view', { detail: 'timeline' }))
            } else if (command.toLowerCase().includes('analytics')) {
              window.dispatchEvent(new CustomEvent('navigate-to-view', { detail: 'analytics' }))
            }
          }}
        />
      )}

      {/* Keyboard Shortcuts Modal */}
      <SpringModal
        isOpen={showShortcuts}
        onClose={() => setShowShortcuts(false)}
        title="Keyboard Shortcuts"
        size="sm"
      >
        <div className="space-y-4">
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Zap className="w-4 h-4 text-indigo-600" />
              Navigation
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Search / Focus</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">⌘</kbd>
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">K</kbd>
                </div>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Open AI Assistant</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">⌘</kbd>
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">Space</kbd>
                </div>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Show Shortcuts</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">⌘</kbd>
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">/</kbd>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-2">
            <h4 className="font-medium text-gray-900 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-purple-600" />
              Quick Actions
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Dashboard</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">G</kbd>
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">D</kbd>
                </div>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">Sites</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">G</kbd>
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">S</kbd>
                </div>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="text-gray-600">AI Center</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">G</kbd>
                  <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">A</kbd>
                </div>
              </div>
            </div>
          </div>
        </div>
      </SpringModal>
    </header>
  )
}