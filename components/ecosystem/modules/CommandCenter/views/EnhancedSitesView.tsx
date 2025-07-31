'use client'

import { useState, useEffect, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  MapPin, 
  Navigation, 
  AlertTriangle, 
  Users, 
  Truck, 
  Activity,
  Building,
  TrendingUp,
  Clock,
  DollarSign,
  Filter,
  Search,
  LayoutGrid,
  List,
  Calendar,
  Shield,
  Construction,
  Zap,
  Target,
  RefreshCw,
  Sparkles,
  Brain,
  Eye,
  Layers,
  BarChart3
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { bangladeshSites, getSiteStatistics } from '../services/bangladeshSitesData'
import { formatBDT } from '../../../utils/bdCurrency'
import { useLiquidGlassDark } from '../theme/liquidGlassDark'
import { GlassCard, GlassButton, GlowText, GradientText, GlassInput } from '../components/ui/GlassMorphism'
import { MetricCard, DataCard, StatusIndicator, ActivityItem, ProgressBar } from '../components/ui/GlassWidgets'

import { AIPredictions } from '../components/ai/AIIntelligenceLayer'
import { LiveDataStream, RealtimeMetricsDashboard } from '../components/realtime/RealtimeDataLayer'

// Dynamically import SimpleMapWidget for better performance
const SimpleMapWidget = dynamic(() => import('../components/widgets/SimpleMapWidget'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full bg-slate-900">
      <div className="text-center">
        <div className="w-12 h-12 border-4 border-cyan-400/30 border-t-cyan-400 rounded-full animate-spin mx-auto mb-4" />
        <p className="text-sm text-white/60">Loading construction sites...</p>
      </div>
    </div>
  )
})

// Enhanced Site Card Component with Glass Morphism
function EnhancedSiteCard({ site, isSelected, onClick }: { site: any, isSelected: boolean, onClick: () => void }) {
  const theme = useLiquidGlassDark()
  const [isHovered, setIsHovered] = useState(false)
  
  // Site status colors for dark theme
  const statusColorMap: Record<string, string> = {
    planning: '#6B7280',
    foundation: '#FFB800',
    structure: '#00D9FF',
    finishing: '#00FF88',
    completed: '#00FF88'
  }
  
  const statusColor = statusColorMap[site.status] || '#00D9FF'
  
  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
    >
      <GlassCard 
        intensity={isSelected ? 'strong' : 'medium'} 
        className="p-5 cursor-pointer transition-all relative overflow-hidden"
        hover
        shimmer={isHovered}
        glow={isSelected}
      >
        {/* Animated background gradient */}
        <motion.div
          className="absolute inset-0 opacity-10"
          style={{
            background: `radial-gradient(circle at ${isHovered ? '50%' : '0%'} ${isHovered ? '50%' : '100%'}, ${statusColor} 0%, transparent 70%)`,
          }}
          animate={{ 
            scale: isHovered ? 1.5 : 1,
            opacity: isHovered ? 0.15 : 0.05
          }}
          transition={{ duration: 0.5 }}
        />
        
        <div className="relative z-10">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <h4 className="font-semibold text-white text-lg mb-1">
                <GradientText gradient="aurora">{site.name}</GradientText>
              </h4>
              <p className="text-sm text-white/60">{site.location}</p>
              <p className="text-xs text-white/40 mt-1">{site.type} • {site.floors} floors</p>
            </div>
            <motion.div 
              className="w-12 h-12 rounded-lg flex items-center justify-center relative"
              style={{ 
                background: `${statusColor}20`,
                border: `1px solid ${statusColor}40`
              }}
              animate={{
                boxShadow: isHovered ? `0 0 20px ${statusColor}50` : 'none'
              }}
            >
              <Construction className="w-6 h-6" style={{ color: statusColor }} />
              {site.details.issues > 0 && (
                <motion.div
                  className="absolute -top-1 -right-1 w-5 h-5 bg-[#FF3366] rounded-full flex items-center justify-center"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 400 }}
                >
                  <span className="text-[10px] font-bold text-white">{site.details.issues}</span>
                </motion.div>
              )}
            </motion.div>
          </div>
          
          {/* Metrics Grid */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="text-center p-2 rounded-lg" style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div className="text-lg font-bold">
                <GlowText color="cyan">{site.workers}</GlowText>
              </div>
              <div className="text-xs text-white/50">Workers</div>
            </div>
            <div className="text-center p-2 rounded-lg" style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div className="text-lg font-bold">
                <GlowText color="magenta">{site.progress}%</GlowText>
              </div>
              <div className="text-xs text-white/50">Progress</div>
            </div>
            <div className="text-center p-2 rounded-lg" style={{
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.06)'
            }}>
              <div className="text-lg font-bold">
                <GlowText color={site.details.safety >= 95 ? 'cyan' : 'gold'}>
                  {site.details.safety}%
                </GlowText>
              </div>
              <div className="text-xs text-white/50">Safety</div>
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="mb-3">
            <ProgressBar 
              value={site.progress} 
              max={100} 
              color={statusColor === '#00FF88' ? 'cyan' : statusColor === '#00D9FF' ? 'cyan' : 'gold'}
              animated
            />
          </div>
          
          {/* Status and Budget */}
          <div className="flex items-center justify-between">
            <StatusIndicator 
              status={site.status === 'completed' ? 'online' : site.status === 'structure' ? 'processing' : 'warning'}
              label={site.status.charAt(0).toUpperCase() + site.status.slice(1)}
            />
            <div className="text-right">
              <p className="text-xs text-white/50">Budget Used</p>
              <p className="text-sm font-semibold text-white">
                {formatBDT(site.spent)}
              </p>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

// AI Site Insights Component
function AISiteInsights({ sites }: { sites: any[] }) {
  const insights = [
    {
      type: 'performance',
      title: 'Top Performing Site',
      description: 'Bashundhara A1 is 15% ahead of schedule',
      metric: '+15%',
      color: '#00FF88'
    },
    {
      type: 'risk',
      title: 'Attention Required',
      description: '3 sites have safety scores below 90%',
      metric: '3 sites',
      color: '#FF3366'
    },
    {
      type: 'opportunity',
      title: 'Cost Savings Detected',
      description: 'Bulk material purchase can save ৳45 Lakh',
      metric: '৳45L',
      color: '#FFB800'
    }
  ]
  
  return (
    <DataCard
      title="AI Site Insights"
      subtitle="Real-time analysis powered by machine learning"
    >
      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <ActivityItem
              icon={
                insight.type === 'performance' ? <TrendingUp className="w-4 h-4" /> :
                insight.type === 'risk' ? <AlertTriangle className="w-4 h-4" /> :
                <Target className="w-4 h-4" />
              }
              title={insight.title}
              description={insight.description}
              time={insight.metric}
              color={
                insight.type === 'performance' ? 'cyan' :
                insight.type === 'risk' ? 'magenta' :
                'gold'
              }
            />
          </motion.div>
        ))}
      </div>
    </DataCard>
  )
}

export default function EnhancedSitesView() {
  const theme = useLiquidGlassDark()
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'map' | 'grid' | 'list'>('map')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showAIInsights, setShowAIInsights] = useState(true)

  // Get site statistics
  const stats = useMemo(() => getSiteStatistics(), [])
  
  // Filter sites based on search and status
  const filteredSites = useMemo(() => {
    return bangladeshSites.filter(site => {
      const matchesSearch = site.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           site.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || site.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  // Get selected site details
  const selectedSiteDetails = useMemo(() => {
    return selectedSite ? bangladeshSites.find(s => s.id === selectedSite) : null
  }, [selectedSite])

  return (
    <div className="h-full flex flex-col space-y-6 relative">
      
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0 relative z-10"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <motion.div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-2xl relative"
              style={{
                background: `linear-gradient(135deg, ${theme.colors.accent.tertiary} 0%, ${theme.colors.accent.primary} 100%)`,
                boxShadow: `0 10px 30px ${theme.colors.accent.tertiary}40`
              }}
              whileHover={{ scale: 1.1, rotate: -10 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <MapPin className="w-7 h-7 text-white" />
              <motion.div
                className="absolute inset-0 rounded-2xl"
                style={{
                  background: `linear-gradient(135deg, transparent 0%, ${theme.colors.accent.tertiary}40 100%)`,
                }}
                animate={{
                  opacity: [0.5, 1, 0.5],
                  scale: [1, 1.1, 1],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold">
                <GradientText gradient="aurora">Construction Sites</GradientText>
              </h1>
              <p className="text-white/60 mt-1">
                Monitor all active construction sites with AI-powered insights
              </p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <GlassButton
              variant="secondary"
              size="md"
              onClick={() => setShowAIInsights(!showAIInsights)}
              className="flex items-center gap-2"
            >
              <Brain className="w-4 h-4" />
              AI Insights
            </GlassButton>
            <GlassButton
              variant="primary"
              size="md"
              className="flex items-center gap-2"
            >
              <Building className="w-4 h-4" />
              Add New Site
            </GlassButton>
          </div>
        </div>

        {/* Real-time Metrics Dashboard */}
        <RealtimeMetricsDashboard />

        {/* Enhanced Controls */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-4">
            {/* Search */}
            <GlassInput
              type="text"
              placeholder="Search sites..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              icon={<Search className="w-4 h-4" />}
              className="w-64"
            />
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 rounded-lg text-white backdrop-blur-md transition-all"
              style={{
                background: theme.colors.glass.light.background,
                border: `1px solid ${theme.colors.glass.light.border}`,
              }}
            >
              <option value="all">All Status</option>
              <option value="planning">Planning</option>
              <option value="foundation">Foundation</option>
              <option value="structure">Structure</option>
              <option value="finishing">Finishing</option>
              <option value="completed">Completed</option>
            </select>
          </div>

          {/* View Mode Toggle */}
          <div className="flex items-center rounded-lg p-1" style={{
            background: theme.colors.glass.light.background,
            border: `1px solid ${theme.colors.glass.light.border}`,
          }}>
            {[
              { mode: 'map', icon: MapPin, label: 'Map' },
              { mode: 'grid', icon: LayoutGrid, label: 'Grid' },
              { mode: 'list', icon: List, label: 'List' }
            ].map(({ mode, icon: Icon, label }) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode as any)}
                className={`flex items-center gap-2 px-4 py-2 rounded-md text-sm font-medium transition-all ${
                  viewMode === mode
                    ? 'text-white shadow-sm'
                    : 'text-white/60 hover:text-white'
                }`}
                style={{
                  background: viewMode === mode ? theme.colors.glass.medium.background : 'transparent',
                }}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 flex gap-6 overflow-hidden relative z-10">
        {/* Left Panel - Map/Grid/List View */}
        <div className="flex-1">
          <AnimatePresence mode="wait">
            {viewMode === 'map' && (
              <motion.div
                key="map"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="h-full rounded-2xl overflow-hidden"
              >
                <SimpleMapWidget realtimeData={{}} />
              </motion.div>
            )}

            {viewMode === 'grid' && (
              <motion.div
                key="grid"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full overflow-y-auto pr-2 custom-scrollbar"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredSites.map((site, index) => (
                    <motion.div
                      key={site.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <EnhancedSiteCard
                        site={site}
                        isSelected={selectedSite === site.id}
                        onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {viewMode === 'list' && (
              <motion.div
                key="list"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
                className="h-full overflow-y-auto"
              >
                <GlassCard intensity="medium" className="divide-y divide-white/10">
                  {filteredSites.map((site, index) => (
                    <motion.div
                      key={site.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.03 }}
                      className={`p-6 cursor-pointer transition-all ${
                        selectedSite === site.id ? 'bg-white/5 border-l-4 border-[#00D9FF]' : 'hover:bg-white/5'
                      }`}
                      onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div 
                            className="w-12 h-12 rounded-lg flex items-center justify-center"
                            style={{ 
                              backgroundColor: `${theme.colors.accent.primary}20`,
                              border: `1px solid ${theme.colors.accent.primary}40`
                            }}
                          >
                            <Building className="w-6 h-6 text-[#00D9FF]" />
                          </div>
                          <div>
                            <h4 className="font-semibold text-white">{site.name}</h4>
                            <p className="text-sm text-white/60">{site.location}</p>
                            <div className="flex items-center gap-4 mt-1">
                              <span className="text-xs text-white/50">
                                {site.workers} workers • {site.progress}% complete
                              </span>
                              <StatusIndicator 
                                status={site.status === 'completed' ? 'online' : 'processing'}
                                label={site.status}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-lg font-bold text-white">{formatBDT(site.spent)}</div>
                            <div className="text-xs text-white/50">Budget used</div>
                          </div>
                          {site.details.issues > 0 && (
                            <div className="flex items-center gap-1 text-[#FFB800]">
                              <AlertTriangle className="w-4 h-4" />
                              <span className="text-sm font-medium">{site.details.issues}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </GlassCard>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Right Panel - AI Insights & Live Data */}
        {showAIInsights && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className="w-96 space-y-4 overflow-y-auto pr-2 custom-scrollbar"
          >
            {/* Live Data Stream */}
            <LiveDataStream />
            
            {/* AI Site Insights */}
            <AISiteInsights sites={filteredSites} />
            
            {/* AI Predictions */}
            <AIPredictions />
          </motion.div>
        )}
      </div>

      {/* Selected Site Details Panel */}
      <AnimatePresence>
        {selectedSiteDetails && viewMode !== 'map' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-shrink-0 relative z-10"
          >
            <GlassCard intensity="strong" className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-xl font-bold">
                    <GradientText gradient="aurora">{selectedSiteDetails.name}</GradientText>
                  </h3>
                  <p className="text-white/60">{selectedSiteDetails.location}</p>
                </div>
                <button
                  onClick={() => setSelectedSite(null)}
                  className="text-white/40 hover:text-white/60 transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard
                  title="Developer"
                  value={selectedSiteDetails.developer}
                  icon={<Building className="w-5 h-5" />}
                  color="cyan"
                />
                <MetricCard
                  title="Contractor"
                  value={selectedSiteDetails.contractor}
                  icon={<Construction className="w-5 h-5" />}
                  color="magenta"
                />
                <MetricCard
                  title="Total Area"
                  value={`${selectedSiteDetails.area.toLocaleString()} sqft`}
                  icon={<Layers className="w-5 h-5" />}
                  color="gold"
                />
                <MetricCard
                  title="Completion"
                  value={new Date(selectedSiteDetails.completionDate).toLocaleDateString()}
                  icon={<Calendar className="w-5 h-5" />}
                  color="cyan"
                />
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
      
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