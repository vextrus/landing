'use client'

// Import the enhanced version with Liquid Glass Dark Theme
import EnhancedSitesView from './EnhancedSitesView'

// Export the enhanced version as the default
export default EnhancedSitesView

// Keep the original imports for backwards compatibility
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
  RefreshCw
} from 'lucide-react'
import dynamic from 'next/dynamic'
import { bangladeshSites, getSiteStatistics } from '../services/bangladeshSitesData'
import { formatBDT } from '../../../utils/bdCurrency'

// Dynamically import MapLayer for better performance
const MapLayer = dynamic(() => import('../layers/MapLayer'), { 
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading map...</p>
      </div>
    </div>
  )
})

// Enhanced Map Widget specifically for Sites view
const EnhancedMapWidget = dynamic(() => import('../components/widgets/MapWidget'), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-gray-500">Loading enhanced map...</p>
      </div>
    </div>
  )
})

// Site status colors
const getStatusColor = (status: string) => {
  switch(status) {
    case 'planning': return '#6B7280'
    case 'foundation': return '#F59E0B'
    case 'structure': return '#3B82F6'
    case 'finishing': return '#10B981'
    case 'completed': return '#059669'
    default: return '#3B82F6'
  }
}

// Site Card Component
function SiteCard({ site, isSelected, onClick }: { site: any, isSelected: boolean, onClick: () => void }) {
  return (
    <motion.div
      className={`p-4 rounded-xl border cursor-pointer transition-all ${
        isSelected 
          ? 'border-indigo-300 bg-indigo-50 shadow-lg' 
          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={onClick}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">{site.name}</h4>
          <p className="text-sm text-gray-600">{site.location}</p>
          <p className="text-xs text-gray-500 mt-1">{site.type} • {site.floors} floors</p>
        </div>
        <div 
          className="w-12 h-12 rounded-lg flex items-center justify-center"
          style={{ backgroundColor: `${getStatusColor(site.status)}20` }}
        >
          <Construction className="w-6 h-6" style={{ color: getStatusColor(site.status) }} />
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-3 mb-3">
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{site.workers}</div>
          <div className="text-xs text-gray-500">Workers</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-gray-900">{site.progress}%</div>
          <div className="text-xs text-gray-500">Progress</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold" style={{ color: getStatusColor(site.status) }}>
            {site.details.safety}%
          </div>
          <div className="text-xs text-gray-500">Safety</div>
        </div>
      </div>
      
      <div className="flex items-center justify-between">
        <span 
          className="px-2 py-1 text-xs font-medium rounded-full"
          style={{
            backgroundColor: `${getStatusColor(site.status)}20`,
            color: getStatusColor(site.status)
          }}
        >
          {site.status.charAt(0).toUpperCase() + site.status.slice(1)}
        </span>
        {site.details.issues > 0 && (
          <div className="flex items-center gap-1 text-amber-600">
            <AlertTriangle className="w-4 h-4" />
            <span className="text-xs font-medium">{site.details.issues} issues</span>
          </div>
        )}
      </div>
    </motion.div>
  )
}

// Original SitesView - kept for reference but not exported
// export default function SitesView() {
function OriginalSitesView() {
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'map' | 'grid' | 'list'>('map')
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showEnhancedMap, setShowEnhancedMap] = useState(true)

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
    <div className="h-full flex flex-col space-y-6">
      {/* Enhanced Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex-shrink-0"
      >
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg">
              <MapPin className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Construction Sites</h1>
              <p className="text-gray-500 mt-1">Monitor all active construction sites in real-time across Dhaka</p>
            </div>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowEnhancedMap(!showEnhancedMap)}
              className={`px-4 py-2 rounded-lg transition-colors flex items-center gap-2 ${
                showEnhancedMap ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-600'
              }`}
            >
              <Zap className="w-4 h-4" />
              Enhanced Map
            </button>
            <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg transition-colors flex items-center gap-2">
              <Building className="w-4 h-4" />
              Add New Site
            </button>
          </div>
        </div>

        {/* Enhanced Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {[
            { 
              label: 'Total Sites', 
              value: stats.totalSites.toString(), 
              icon: MapPin, 
              color: 'text-indigo-600', 
              bg: 'from-indigo-50 to-indigo-100',
              change: '+3 this month'
            },
            { 
              label: 'Active Workers', 
              value: stats.totalWorkers.toLocaleString(), 
              icon: Users, 
              color: 'text-green-600', 
              bg: 'from-green-50 to-green-100',
              change: '+12% this week'
            },
            { 
              label: 'Total Budget', 
              value: formatBDT(stats.totalBudget), 
              icon: DollarSign, 
              color: 'text-purple-600', 
              bg: 'from-purple-50 to-purple-100',
              change: '৳2.3Cr remaining'
            },
            { 
              label: 'Avg Progress', 
              value: `${stats.avgProgress}%`, 
              icon: TrendingUp, 
              color: 'text-amber-600', 
              bg: 'from-amber-50 to-amber-100',
              change: 'On schedule'
            }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              className={`bg-gradient-to-br ${stat.bg} rounded-xl p-6 border border-gray-200/50 shadow-sm hover:shadow-lg transition-all hover:-translate-y-1`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`w-12 h-12 ${stat.bg} rounded-xl flex items-center justify-center shadow-sm`}>
                  <stat.icon className={`w-6 h-6 ${stat.color}`} />
                </div>
                <Activity className="w-5 h-5 text-gray-400" />
              </div>
              <div className="space-y-1">
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-sm font-medium text-gray-700">{stat.label}</p>
                <p className="text-xs text-gray-500">{stat.change}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Enhanced Controls */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search sites..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              />
            </div>
            
            {/* Status Filter */}
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="px-4 py-2 bg-white border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
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
          <div className="flex items-center bg-gray-100 rounded-lg p-1">
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
                    ? 'bg-white text-gray-900 shadow-sm'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden sm:inline">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Main Content Area */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {viewMode === 'map' && (
            <motion.div
              key="map"
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              transition={{ duration: 0.2 }}
              className="h-full bg-white border border-gray-200 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="h-full">
                {showEnhancedMap ? (
                  <EnhancedMapWidget realtimeData={{}} />
                ) : (
                  <MapLayer 
                    selectedSite={selectedSite}
                    onSiteSelect={setSelectedSite}
                  />
                )}
              </div>
            </motion.div>
          )}

          {viewMode === 'grid' && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
              className="h-full overflow-y-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredSites.map((site, index) => (
                  <motion.div
                    key={site.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <SiteCard
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
              className="h-full overflow-y-auto bg-white border border-gray-200 rounded-xl"
            >
              <div className="divide-y divide-gray-200">
                {filteredSites.map((site, index) => (
                  <motion.div
                    key={site.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.03 }}
                    className={`p-6 cursor-pointer hover:bg-gray-50 transition-colors ${
                      selectedSite === site.id ? 'bg-indigo-50 border-l-4 border-indigo-500' : ''
                    }`}
                    onClick={() => setSelectedSite(selectedSite === site.id ? null : site.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div 
                          className="w-12 h-12 rounded-lg flex items-center justify-center"
                          style={{ backgroundColor: `${getStatusColor(site.status)}20` }}
                        >
                          <Building className="w-6 h-6" style={{ color: getStatusColor(site.status) }} />
                        </div>
                        <div>
                          <h4 className="font-semibold text-gray-900">{site.name}</h4>
                          <p className="text-sm text-gray-600">{site.location}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <span className="text-xs text-gray-500">
                              {site.workers} workers • {site.progress}% complete
                            </span>
                            <span 
                              className="px-2 py-0.5 text-xs font-medium rounded-full"
                              style={{
                                backgroundColor: `${getStatusColor(site.status)}20`,
                                color: getStatusColor(site.status)
                              }}
                            >
                              {site.status}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">{formatBDT(site.spent)}</div>
                          <div className="text-xs text-gray-500">Budget used</div>
                        </div>
                        {site.details.issues > 0 && (
                          <div className="flex items-center gap-1 text-amber-600">
                            <AlertTriangle className="w-4 h-4" />
                            <span className="text-sm font-medium">{site.details.issues}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Selected Site Details Panel */}
      <AnimatePresence>
        {selectedSiteDetails && viewMode !== 'map' && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="flex-shrink-0 bg-white border border-gray-200 rounded-xl p-6 shadow-lg"
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold text-gray-900">{selectedSiteDetails.name}</h3>
                <p className="text-gray-600">{selectedSiteDetails.location}</p>
              </div>
              <button
                onClick={() => setSelectedSite(null)}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <p className="text-sm text-gray-600 mb-1">Developer</p>
                <p className="font-semibold text-gray-900">{selectedSiteDetails.developer}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Contractor</p>
                <p className="font-semibold text-gray-900">{selectedSiteDetails.contractor}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Total Area</p>
                <p className="font-semibold text-gray-900">{selectedSiteDetails.area.toLocaleString()} sqft</p>
              </div>
              <div>
                <p className="text-sm text-gray-600 mb-1">Completion Date</p>
                <p className="font-semibold text-gray-900">
                  {new Date(selectedSiteDetails.completionDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}