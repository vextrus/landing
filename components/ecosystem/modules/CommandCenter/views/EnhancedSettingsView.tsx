'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Key, 
  Database,
  Monitor,
  Moon,
  Sun,
  Check,
  Lock,
  Mail,
  Phone,
  Building,
  CreditCard,
  Smartphone,
  Languages,
  Calendar,
  DollarSign,
  Wifi,
  Server,
  Upload,
  Download,
  Save,
  AlertTriangle,
  Fingerprint,
  ShieldCheck,
  Eye,
  EyeOff,
  RefreshCw,
  ChevronRight,
  Sliders,
  BarChart3,
  Grid3x3,
  Layers,
  Zap,
  Cpu,
  HardDrive,
  Activity,
  Camera,
  Image,
  Info,
  CheckCircle,
  XCircle,
  Link2,
  Sparkles,
  TrendingUp,
  Clock,
  MapPin,
  MessageSquare,
  UserCheck,
  Package,
  Bot,
  Wand2,
  Trash2,
  Award,
  Star,
  FileText,
  History,
  Gauge,
  BrainCircuit,
  Brush,
  Droplet,
  Wind,
  Binary,
  CircuitBoard,
  Volume2,
  VolumeX
} from 'lucide-react'
import { useLiquidGlassDark } from '../theme/liquidGlassDark'
import { GlassCard, GlassButton, GlowText, GradientText, GlassInput } from '../components/ui/GlassMorphism'
import { MetricCard, DataCard, StatusIndicator, ActivityItem, ProgressBar } from '../components/ui/GlassWidgets'

interface SettingsSection {
  id: string
  title: string
  icon: any
  description: string
  badge?: string
}

// Theme Color Preset Component
function ThemeColorPreset({ 
  name, 
  colors, 
  selected, 
  onSelect 
}: { 
  name: string
  colors: string[]
  selected: boolean
  onSelect: () => void 
}) {
  const theme = useLiquidGlassDark()
  
  return (
    <motion.button
      className="relative p-4 rounded-xl cursor-pointer overflow-hidden"
      style={{
        background: selected ? theme.colors.glass.strong.background : theme.colors.glass.light.background,
        border: `2px solid ${selected ? colors[0] : theme.colors.glass.light.border}`,
      }}
      onClick={onSelect}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Animated gradient background */}
      <motion.div
        className="absolute inset-0 opacity-20"
        style={{
          background: `linear-gradient(135deg, ${colors.join(', ')})`,
        }}
        animate={{
          opacity: selected ? 0.3 : 0.1,
        }}
      />
      
      {/* Color swatches */}
      <div className="relative flex justify-center gap-2 mb-3">
        {colors.map((color, index) => (
          <motion.div
            key={index}
            className="w-8 h-8 rounded-full shadow-lg"
            style={{
              background: color,
              border: '2px solid rgba(255, 255, 255, 0.2)',
            }}
            animate={{
              scale: selected ? 1.1 : 1,
              y: selected ? -2 : 0,
            }}
            transition={{ delay: index * 0.05 }}
          />
        ))}
      </div>
      
      <p className="relative text-sm font-medium text-white text-center">{name}</p>
      
      {selected && (
        <motion.div
          className="absolute top-2 right-2"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 400 }}
        >
          <CheckCircle className="w-5 h-5 text-[#00FF88]" />
        </motion.div>
      )}
    </motion.button>
  )
}

// Glass Intensity Control Component
function GlassIntensityControl({ 
  value, 
  onChange 
}: { 
  value: number
  onChange: (value: number) => void 
}) {
  const theme = useLiquidGlassDark()
  const intensityLevels = [
    { level: 1, name: 'Light', blur: '8px' },
    { level: 2, name: 'Medium', blur: '16px' },
    { level: 3, name: 'Strong', blur: '24px' },
    { level: 4, name: 'Ultra', blur: '32px' }
  ]
  
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-white/60">Glass Intensity</span>
        <span className="text-sm font-medium text-white">
          {intensityLevels[value - 1].name}
        </span>
      </div>
      
      {/* Visual preview */}
      <div className="grid grid-cols-4 gap-3">
        {intensityLevels.map((level) => (
          <motion.button
            key={level.level}
            className="relative h-20 rounded-lg overflow-hidden"
            style={{
              background: theme.colors.glass[level.name.toLowerCase() as keyof typeof theme.colors.glass].background,
              backdropFilter: `blur(${level.blur})`,
              WebkitBackdropFilter: `blur(${level.blur})`,
              border: `1px solid ${value === level.level ? '#00D9FF' : theme.colors.glass.light.border}`,
            }}
            onClick={() => onChange(level.level)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xs font-medium text-white">{level.name}</span>
            </div>
            {value === level.level && (
              <motion.div
                className="absolute inset-0 border-2 border-[#00D9FF] rounded-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              />
            )}
          </motion.button>
        ))}
      </div>
      
      {/* Slider control */}
      <div className="relative">
        <input
          type="range"
          min="1"
          max="4"
          value={value}
          onChange={(e) => onChange(parseInt(e.target.value))}
          className="w-full h-2 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #00D9FF 0%, #00D9FF ${(value - 1) * 33.33}%, rgba(255, 255, 255, 0.1) ${(value - 1) * 33.33}%, rgba(255, 255, 255, 0.1) 100%)`,
          }}
        />
        <style jsx>{`
          input[type="range"]::-webkit-slider-thumb {
            appearance: none;
            width: 20px;
            height: 20px;
            background: #00D9FF;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
          }
          input[type="range"]::-moz-range-thumb {
            width: 20px;
            height: 20px;
            background: #00D9FF;
            border-radius: 50%;
            cursor: pointer;
            box-shadow: 0 0 10px rgba(0, 217, 255, 0.5);
            border: none;
          }
        `}</style>
      </div>
    </div>
  )
}

// AI Configuration Panel
function AIConfigurationPanel() {
  const theme = useLiquidGlassDark()
  const [aiSettings, setAISettings] = useState({
    modelAccuracy: 'balanced',
    predictionConfidence: 85,
    updateInterval: 5,
    autoSuggestions: true,
    learningMode: true,
    dataPrivacy: 'strict'
  })
  
  return (
    <div className="space-y-6">
      {/* Model Performance */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Cpu className="w-4 h-4 text-[#00D9FF]" />
          Model Performance
        </h4>
        <div className="grid grid-cols-3 gap-3">
          {['efficiency', 'balanced', 'accuracy'].map((mode) => (
            <motion.button
              key={mode}
              className="p-3 rounded-lg text-center"
              style={{
                background: aiSettings.modelAccuracy === mode ? theme.colors.glass.medium.background : theme.colors.glass.light.background,
                border: `1px solid ${aiSettings.modelAccuracy === mode ? '#00D9FF' : theme.colors.glass.light.border}`,
              }}
              onClick={() => setAISettings({ ...aiSettings, modelAccuracy: mode })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className={`text-2xl mb-1 ${
                mode === 'efficiency' ? 'text-[#00FF88]' :
                mode === 'balanced' ? 'text-[#FFB800]' :
                'text-[#FF00EA]'
              }`}>
                {mode === 'efficiency' ? <Zap className="w-6 h-6 mx-auto" /> :
                 mode === 'balanced' ? <Activity className="w-6 h-6 mx-auto" /> :
                 <BrainCircuit className="w-6 h-6 mx-auto" />}
              </div>
              <p className="text-xs font-medium text-white capitalize">{mode}</p>
              <p className="text-xs text-white/50 mt-1">
                {mode === 'efficiency' ? 'Fast' :
                 mode === 'balanced' ? 'Optimal' :
                 'Precise'}
              </p>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Prediction Confidence */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/60">Prediction Confidence Threshold</span>
          <span className="text-sm font-medium">
            <GlowText color="cyan">{aiSettings.predictionConfidence}%</GlowText>
          </span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="50"
            max="99"
            value={aiSettings.predictionConfidence}
            onChange={(e) => setAISettings({ ...aiSettings, predictionConfidence: parseInt(e.target.value) })}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #00D9FF 0%, #00D9FF ${(aiSettings.predictionConfidence - 50) * 2.04}%, rgba(255, 255, 255, 0.1) ${(aiSettings.predictionConfidence - 50) * 2.04}%, rgba(255, 255, 255, 0.1) 100%)`,
            }}
          />
        </div>
      </div>
      
      {/* Update Interval */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/60">Real-time Update Interval</span>
          <span className="text-sm font-medium text-white">{aiSettings.updateInterval}s</span>
        </div>
        <div className="flex gap-2">
          {[1, 5, 10, 30, 60].map((interval) => (
            <motion.button
              key={interval}
              className="flex-1 py-2 rounded-lg text-xs font-medium"
              style={{
                background: aiSettings.updateInterval === interval ? theme.colors.glass.medium.background : theme.colors.glass.light.background,
                border: `1px solid ${aiSettings.updateInterval === interval ? '#00D9FF' : theme.colors.glass.light.border}`,
                color: 'white',
              }}
              onClick={() => setAISettings({ ...aiSettings, updateInterval: interval })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {interval}s
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Toggle Settings */}
      <div className="space-y-3">
        <motion.div
          className="flex items-center justify-between p-3 rounded-lg"
          style={{
            background: theme.colors.glass.light.background,
            border: `1px solid ${theme.colors.glass.light.border}`,
          }}
        >
          <div className="flex items-center gap-3">
            <Sparkles className="w-5 h-5 text-[#FFB800]" />
            <div>
              <p className="text-sm font-medium text-white">Auto Suggestions</p>
              <p className="text-xs text-white/50">AI provides proactive recommendations</p>
            </div>
          </div>
          <motion.button
            className={`relative w-12 h-6 rounded-full transition-colors ${
              aiSettings.autoSuggestions ? 'bg-[#00D9FF]' : 'bg-white/20'
            }`}
            onClick={() => setAISettings({ ...aiSettings, autoSuggestions: !aiSettings.autoSuggestions })}
          >
            <motion.div
              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg"
              animate={{ x: aiSettings.autoSuggestions ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.button>
        </motion.div>
        
        <motion.div
          className="flex items-center justify-between p-3 rounded-lg"
          style={{
            background: theme.colors.glass.light.background,
            border: `1px solid ${theme.colors.glass.light.border}`,
          }}
        >
          <div className="flex items-center gap-3">
            <BrainCircuit className="w-5 h-5 text-[#FF00EA]" />
            <div>
              <p className="text-sm font-medium text-white">Continuous Learning</p>
              <p className="text-xs text-white/50">AI improves from your usage patterns</p>
            </div>
          </div>
          <motion.button
            className={`relative w-12 h-6 rounded-full transition-colors ${
              aiSettings.learningMode ? 'bg-[#00D9FF]' : 'bg-white/20'
            }`}
            onClick={() => setAISettings({ ...aiSettings, learningMode: !aiSettings.learningMode })}
          >
            <motion.div
              className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg"
              animate={{ x: aiSettings.learningMode ? 24 : 0 }}
              transition={{ type: "spring", stiffness: 300 }}
            />
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

// Performance Settings Panel
function PerformanceSettingsPanel() {
  const theme = useLiquidGlassDark()
  const [performanceSettings, setPerformanceSettings] = useState({
    gpuAcceleration: true,
    particleDensity: 'medium',
    animationSpeed: 1,
    cacheSize: 256,
    preloadData: true,
    reducedMotion: false
  })
  
  return (
    <div className="space-y-6">
      {/* GPU Acceleration */}
      <motion.div
        className="flex items-center justify-between p-4 rounded-lg"
        style={{
          background: theme.colors.glass.light.background,
          border: `1px solid ${theme.colors.glass.light.border}`,
        }}
      >
        <div className="flex items-center gap-3">
          <Gauge className="w-5 h-5 text-[#00FF88]" />
          <div>
            <p className="text-sm font-medium text-white">GPU Acceleration</p>
            <p className="text-xs text-white/50">Hardware acceleration for smooth animations</p>
          </div>
        </div>
        <motion.button
          className={`relative w-12 h-6 rounded-full transition-colors ${
            performanceSettings.gpuAcceleration ? 'bg-[#00D9FF]' : 'bg-white/20'
          }`}
          onClick={() => setPerformanceSettings({ ...performanceSettings, gpuAcceleration: !performanceSettings.gpuAcceleration })}
        >
          <motion.div
            className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg"
            animate={{ x: performanceSettings.gpuAcceleration ? 24 : 0 }}
            transition={{ type: "spring", stiffness: 300 }}
          />
        </motion.button>
      </motion.div>
      
      {/* Particle Density */}
      <div>
        <h4 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
          <Wind className="w-4 h-4 text-[#00D9FF]" />
          Particle Effects Density
        </h4>
        <div className="grid grid-cols-4 gap-3">
          {['off', 'low', 'medium', 'high'].map((density) => (
            <motion.button
              key={density}
              className="p-3 rounded-lg text-center"
              style={{
                background: performanceSettings.particleDensity === density ? theme.colors.glass.medium.background : theme.colors.glass.light.background,
                border: `1px solid ${performanceSettings.particleDensity === density ? '#00D9FF' : theme.colors.glass.light.border}`,
              }}
              onClick={() => setPerformanceSettings({ ...performanceSettings, particleDensity: density })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex justify-center mb-2">
                {density === 'off' && <VolumeX className="w-5 h-5 text-white/60" />}
                {density === 'low' && (
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white/60 rounded-full" />
                  </div>
                )}
                {density === 'medium' && (
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white/60 rounded-full" />
                    <div className="w-1 h-1 bg-white/60 rounded-full" />
                  </div>
                )}
                {density === 'high' && (
                  <div className="flex gap-1">
                    <div className="w-1 h-1 bg-white/60 rounded-full" />
                    <div className="w-1 h-1 bg-white/60 rounded-full" />
                    <div className="w-1 h-1 bg-white/60 rounded-full" />
                  </div>
                )}
              </div>
              <p className="text-xs font-medium text-white capitalize">{density}</p>
            </motion.button>
          ))}
        </div>
      </div>
      
      {/* Animation Speed */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/60">Animation Speed</span>
          <span className="text-sm font-medium text-white">{performanceSettings.animationSpeed}x</span>
        </div>
        <div className="relative">
          <input
            type="range"
            min="0.5"
            max="2"
            step="0.1"
            value={performanceSettings.animationSpeed}
            onChange={(e) => setPerformanceSettings({ ...performanceSettings, animationSpeed: parseFloat(e.target.value) })}
            className="w-full h-2 rounded-lg appearance-none cursor-pointer"
            style={{
              background: `linear-gradient(to right, #00D9FF 0%, #00D9FF ${(performanceSettings.animationSpeed - 0.5) * 66.67}%, rgba(255, 255, 255, 0.1) ${(performanceSettings.animationSpeed - 0.5) * 66.67}%, rgba(255, 255, 255, 0.1) 100%)`,
            }}
          />
        </div>
        <div className="flex justify-between text-xs text-white/40 mt-2">
          <span>Slower</span>
          <span>Normal</span>
          <span>Faster</span>
        </div>
      </div>
      
      {/* Cache Settings */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm text-white/60">Cache Size</span>
          <span className="text-sm font-medium">
            <GlowText color="gold">{performanceSettings.cacheSize} MB</GlowText>
          </span>
        </div>
        <div className="flex gap-2">
          {[128, 256, 512, 1024].map((size) => (
            <motion.button
              key={size}
              className="flex-1 py-2 rounded-lg text-xs font-medium"
              style={{
                background: performanceSettings.cacheSize === size ? theme.colors.glass.medium.background : theme.colors.glass.light.background,
                border: `1px solid ${performanceSettings.cacheSize === size ? '#00D9FF' : theme.colors.glass.light.border}`,
                color: 'white',
              }}
              onClick={() => setPerformanceSettings({ ...performanceSettings, cacheSize: size })}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {size < 1024 ? `${size}MB` : '1GB'}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function EnhancedSettingsView() {
  const theme = useLiquidGlassDark()
  const [activeSection, setActiveSection] = useState('appearance')
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  
  const sections: SettingsSection[] = [
    { id: 'appearance', title: 'Appearance', icon: Palette, description: 'Theme and visual settings' },
    { id: 'ai', title: 'AI Configuration', icon: BrainCircuit, description: 'Machine learning settings', badge: 'Beta' },
    { id: 'performance', title: 'Performance', icon: Gauge, description: 'Optimization settings' },
    { id: 'security', title: 'Security', icon: Shield, description: 'Authentication & privacy' },
    { id: 'notifications', title: 'Notifications', icon: Bell, description: 'Alert preferences' },
    { id: 'integrations', title: 'Integrations', icon: Link2, description: 'Third-party connections' },
  ]
  
  const themePresets = [
    { name: 'Aurora', colors: ['#00D9FF', '#FF00EA', '#00FF88'] },
    { name: 'Nebula', colors: ['#FF00EA', '#FFB800', '#00D9FF'] },
    { name: 'Cosmic', colors: ['#00FF88', '#00D9FF', '#FF3366'] },
    { name: 'Solar', colors: ['#FFB800', '#FF3366', '#FF00EA'] },
    { name: 'Ocean', colors: ['#00D9FF', '#00FF88', '#6B7280'] },
    { name: 'Void', colors: ['#6B7280', '#FF3366', '#FFB800'] }
  ]
  
  const [selectedTheme, setSelectedTheme] = useState('Aurora')
  const [glassIntensity, setGlassIntensity] = useState(2)
  
  const handleSave = async () => {
    setSaving(true)
    await new Promise(resolve => setTimeout(resolve, 1500))
    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }
  
  return (
    <div className="h-full flex flex-col relative">
      
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 relative z-10 mb-6"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl relative"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent.primary} 0%, ${theme.colors.accent.secondary} 100%)`,
                boxShadow: `0 10px 30px ${theme.colors.accent.primary}40`
              }}
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Settings className="w-7 h-7 text-white" />
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${theme.colors.accent.primary}40 100%)`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  rotate: [0, 360],
                }}
                transition={{
                  opacity: { duration: 2, repeat: Infinity, ease: "easeInOut" },
                  rotate: { duration: 20, repeat: Infinity, ease: "linear" }
                }}
              />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold">
                <GradientText gradient="aurora">Settings & Configuration</GradientText>
              </h1>
              <p className="text-white/60 mt-1">
                Customize your Command Center experience
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <AnimatePresence>
              {saved && (
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg"
                  style={{
                    background: theme.colors.glass.light.background,
                    border: `1px solid ${theme.colors.accent.success}40`,
                  }}
                >
                  <CheckCircle className="w-4 h-4 text-[#00FF88]" />
                  <span className="text-sm text-white">Settings saved</span>
                </motion.div>
              )}
            </AnimatePresence>
            
            <GlassButton
              variant="primary"
              size="md"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Saving...' : 'Save Changes'}
            </GlassButton>
          </div>
        </div>
      </motion.div>
      
      {/* Main Content */}
      <div className="flex-1 flex gap-6 overflow-hidden relative z-10">
        {/* Sidebar Navigation */}
        <div className="w-80 flex-shrink-0">
          <GlassCard intensity="medium" className="h-full p-6">
            <div className="space-y-2">
              {sections.map((section) => {
                const Icon = section.icon
                const isActive = activeSection === section.id
                
                return (
                  <motion.button
                    key={section.id}
                    className="w-full text-left p-4 rounded-xl transition-all relative overflow-hidden"
                    style={{
                      background: isActive ? theme.colors.glass.strong.background : theme.colors.glass.light.background,
                      border: `1px solid ${isActive ? '#00D9FF' : theme.colors.glass.light.border}`,
                    }}
                    onClick={() => setActiveSection(section.id)}
                    whileHover={{ x: 4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isActive && (
                      <motion.div
                        className="absolute inset-0 opacity-10"
                        style={{
                          background: `linear-gradient(90deg, #00D9FF 0%, transparent 100%)`,
                        }}
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        transition={{ duration: 0.3 }}
                      />
                    )}
                    
                    <div className="relative flex items-center gap-3">
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background: isActive ? '#00D9FF20' : 'rgba(255, 255, 255, 0.05)',
                          border: `1px solid ${isActive ? '#00D9FF40' : 'rgba(255, 255, 255, 0.08)'}`,
                        }}
                      >
                        <Icon className="w-5 h-5" style={{ color: isActive ? '#00D9FF' : 'white' }} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-medium text-white">{section.title}</p>
                          {section.badge && (
                            <span className="text-xs px-2 py-0.5 rounded-full" style={{
                              background: '#FF00EA20',
                              color: '#FF00EA',
                              border: '1px solid #FF00EA40',
                            }}>
                              {section.badge}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-white/50">{section.description}</p>
                      </div>
                      <ChevronRight className={`w-4 h-4 text-white/40 transition-transform ${
                        isActive ? 'rotate-90' : ''
                      }`} />
                    </div>
                  </motion.button>
                )
              })}
            </div>
            
            {/* Storage Usage */}
            <div className="mt-6 pt-6 border-t border-white/10">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <HardDrive className="w-4 h-4 text-white/60" />
                  <span className="text-sm text-white/60">Storage Usage</span>
                </div>
                <span className="text-sm font-medium text-white">2.4 GB / 5 GB</span>
              </div>
              <ProgressBar value={48} max={100} color="cyan" animated />
            </div>
          </GlassCard>
        </div>
        
        {/* Settings Content */}
        <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
          <AnimatePresence mode="wait">
            {/* Appearance Settings */}
            {activeSection === 'appearance' && (
              <motion.div
                key="appearance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Theme Selection */}
                <GlassCard intensity="medium" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    <GradientText gradient="aurora">Color Theme</GradientText>
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    {themePresets.map((preset) => (
                      <ThemeColorPreset
                        key={preset.name}
                        name={preset.name}
                        colors={preset.colors}
                        selected={selectedTheme === preset.name}
                        onSelect={() => setSelectedTheme(preset.name)}
                      />
                    ))}
                  </div>
                </GlassCard>
                
                {/* Glass Intensity */}
                <GlassCard intensity="medium" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    <GradientText gradient="aurora">Visual Effects</GradientText>
                  </h3>
                  <GlassIntensityControl value={glassIntensity} onChange={setGlassIntensity} />
                </GlassCard>
                
                {/* Additional Visual Settings */}
                <GlassCard intensity="medium" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    <GradientText gradient="aurora">Advanced Appearance</GradientText>
                  </h3>
                  <div className="space-y-4">
                    <motion.div
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{
                        background: theme.colors.glass.light.background,
                        border: `1px solid ${theme.colors.glass.light.border}`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <Sparkles className="w-5 h-5 text-[#FFB800]" />
                        <div>
                          <p className="text-sm font-medium text-white">Aurora Background</p>
                          <p className="text-xs text-white/50">Animated gradient effects</p>
                        </div>
                      </div>
                      <motion.button className="relative w-12 h-6 rounded-full bg-[#00D9FF]">
                        <motion.div
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg"
                          animate={{ x: 24 }}
                        />
                      </motion.button>
                    </motion.div>
                    
                    <motion.div
                      className="flex items-center justify-between p-3 rounded-lg"
                      style={{
                        background: theme.colors.glass.light.background,
                        border: `1px solid ${theme.colors.glass.light.border}`,
                      }}
                    >
                      <div className="flex items-center gap-3">
                        <CircuitBoard className="w-5 h-5 text-[#00FF88]" />
                        <div>
                          <p className="text-sm font-medium text-white">Neural Grid</p>
                          <p className="text-xs text-white/50">Background neural network pattern</p>
                        </div>
                      </div>
                      <motion.button className="relative w-12 h-6 rounded-full bg-[#00D9FF]">
                        <motion.div
                          className="absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow-lg"
                          animate={{ x: 24 }}
                        />
                      </motion.button>
                    </motion.div>
                  </div>
                </GlassCard>
              </motion.div>
            )}
            
            {/* AI Configuration */}
            {activeSection === 'ai' && (
              <motion.div
                key="ai"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard intensity="medium" className="p-6">
                  <h3 className="text-lg font-semibold mb-6">
                    <GradientText gradient="aurora">AI & Machine Learning Settings</GradientText>
                  </h3>
                  <AIConfigurationPanel />
                </GlassCard>
              </motion.div>
            )}
            
            {/* Performance Settings */}
            {activeSection === 'performance' && (
              <motion.div
                key="performance"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <GlassCard intensity="medium" className="p-6">
                  <h3 className="text-lg font-semibold mb-6">
                    <GradientText gradient="aurora">Performance Optimization</GradientText>
                  </h3>
                  <PerformanceSettingsPanel />
                </GlassCard>
              </motion.div>
            )}
            
            {/* Security Settings */}
            {activeSection === 'security' && (
              <motion.div
                key="security"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <GlassCard intensity="medium" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    <GradientText gradient="aurora">Security & Privacy</GradientText>
                  </h3>
                  <div className="text-center py-8 text-white/60">
                    Security settings panel - Two-factor authentication, biometrics, etc.
                  </div>
                </GlassCard>
              </motion.div>
            )}
            
            {/* Notifications Settings */}
            {activeSection === 'notifications' && (
              <motion.div
                key="notifications"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <GlassCard intensity="medium" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    <GradientText gradient="aurora">Notification Preferences</GradientText>
                  </h3>
                  <div className="text-center py-8 text-white/60">
                    Notification settings - Email, push, in-app alerts
                  </div>
                </GlassCard>
              </motion.div>
            )}
            
            {/* Integrations Settings */}
            {activeSection === 'integrations' && (
              <motion.div
                key="integrations"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                <GlassCard intensity="medium" className="p-6">
                  <h3 className="text-lg font-semibold mb-4">
                    <GradientText gradient="aurora">Third-Party Integrations</GradientText>
                  </h3>
                  <div className="text-center py-8 text-white/60">
                    Integration settings - API connections, webhooks, etc.
                  </div>
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
      
      {/* Custom Scrollbar Styles */}
      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 6px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(0, 217, 255, 0.3);
          border-radius: 3px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(0, 217, 255, 0.5);
        }
      `}</style>
    </div>
  )
}