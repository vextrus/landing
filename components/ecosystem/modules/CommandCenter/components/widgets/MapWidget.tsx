'use client'

import { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Map as MapIcon, 
  MapPin,
  Navigation, 
  Activity, 
  AlertTriangle, 
  Users, 
  Truck, 
  Construction,
  Shield,
  TrendingUp,
  Layers
} from 'lucide-react'
import { bangladeshSites, getSiteStatistics } from '../../services/bangladeshSitesData'
import { formatBDT } from '../../../../utils/bdCurrency'
import EnhancedMapMarker from './EnhancedMapMarker'
import 'maplibre-gl/dist/maplibre-gl.css'

interface MapWidgetProps {
  realtimeData: any
}

interface MarkerData {
  id: string
  marker: any
  container: HTMLDivElement
  site: any
}

export default function MapWidget({ realtimeData }: MapWidgetProps) {
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [hoveredSiteId, setHoveredSiteId] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [showLiveUpdates, setShowLiveUpdates] = useState(true)
  const [mapError, setMapError] = useState<string | null>(null)
  const [markers, setMarkers] = useState<MarkerData[]>([])
  
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  
  // Get Stadia Maps API key from environment
  const apiKey = process.env.NEXT_PUBLIC_STADIA_MAPS_API_KEY || 'eb887465-72f0-4e02-9d92-6e68a62c5719'

  // Get site statistics
  const stats = getSiteStatistics()

  // Convert status to color
  const getStatusColor = useCallback((status: string) => {
    switch(status) {
      case 'planning': return '#6B7280' // gray
      case 'foundation': return '#F59E0B' // amber
      case 'structure': return '#3B82F6' // blue
      case 'finishing': return '#10B981' // green
      case 'completed': return '#059669' // dark green
      default: return '#3B82F6'
    }
  }, [])

  // Memoized site statistics with filtering
  const siteStats = useMemo(() => {
    const filtered = filterStatus === 'all' 
      ? bangladeshSites 
      : bangladeshSites.filter(site => site.status === filterStatus)
    
    return {
      total: filtered.length,
      workers: filtered.reduce((sum, site) => sum + site.workers, 0),
      avgProductivity: filtered.length > 0 ? 
        Math.round(filtered.reduce((sum, site) => sum + site.details.productivity, 0) / filtered.length) : 0,
      equipment: filtered.reduce((sum, site) => sum + site.details.equipment.cranes + site.details.equipment.excavators, 0),
      totalIssues: filtered.reduce((sum, site) => sum + site.details.issues, 0)
    }
  }, [filterStatus])

  // Stable event handlers using useCallback
  const handleSiteHover = useCallback((siteId: string | null) => {
    setHoveredSiteId(siteId)
  }, [])

  const handleSiteClick = useCallback((siteId: string) => {
    setSelectedSite(siteId)
    
    // Open popup for clicked site
    const markerData = markers.find(m => m.id === siteId)
    if (markerData && mapRef.current) {
      const site = markerData.site
      
      // Create enhanced popup content
      const popupContent = `
        <div style="padding: 16px; min-width: 320px; font-family: Inter, sans-serif;">
          <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
            <div>
              <h3 style="font-weight: 600; font-size: 18px; margin: 0; color: #111827;">${site.name}</h3>
              <p style="color: #6B7280; font-size: 14px; margin: 4px 0;">${site.location}</p>
              <p style="color: #6B7280; font-size: 12px; margin: 4px 0;">${site.type.charAt(0).toUpperCase() + site.type.slice(1)} • ${site.floors} floors • ${site.units} units</p>
            </div>
            <span style="padding: 4px 12px; background-color: ${getStatusColor(site.status)}20; color: ${getStatusColor(site.status)}; border-radius: 9999px; font-size: 12px; font-weight: 500;">
              ${site.status.charAt(0).toUpperCase() + site.status.slice(1)}
            </span>
          </div>
          
          <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; margin-bottom: 12px;">
            <div style="background: #F3F4F6; padding: 12px; border-radius: 8px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                <svg width="14" height="14" fill="none" stroke="#6B7280" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
                </svg>
                <span style="color: #6B7280; font-size: 12px;">Workers</span>
              </div>
              <p style="font-weight: 600; font-size: 20px; margin: 0; color: #111827;">${site.workers.toLocaleString()}</p>
            </div>
            
            <div style="background: #F3F4F6; padding: 12px; border-radius: 8px;">
              <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                <svg width="14" height="14" fill="none" stroke="#6B7280" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <span style="color: #6B7280; font-size: 12px;">Progress</span>
              </div>
              <p style="font-weight: 600; font-size: 20px; margin: 0; color: #111827;">${site.progress}%</p>
            </div>
          </div>
          
          <div style="border-top: 1px solid #E5E7EB; padding-top: 12px;">
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #6B7280; font-size: 13px;">Budget:</span>
              <span style="font-weight: 500; font-size: 13px; color: #111827;">${formatBDT(site.budget)}</span>
            </div>
            <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
              <span style="color: #6B7280; font-size: 13px;">Spent:</span>
              <span style="font-weight: 500; font-size: 13px; color: #111827;">${formatBDT(site.spent)}</span>
            </div>
            <div style="display: flex; justify-content: space-between;">
              <span style="color: #6B7280; font-size: 13px;">Safety Score:</span>
              <span style="font-weight: 500; font-size: 13px; color: ${site.details.safety >= 95 ? '#10B981' : site.details.safety >= 90 ? '#F59E0B' : '#EF4444'}">
                ${site.details.safety}%
              </span>
            </div>
          </div>
        </div>
      `

      // Create popup
      import('maplibre-gl').then((maplibregl) => {
        const popup = new maplibregl.Popup({
          offset: 35,
          closeButton: true,
          className: 'site-popup'
        })
          .setLngLat([site.lng, site.lat])
          .setHTML(popupContent)
          .addTo(mapRef.current)
      })
    }
  }, [markers, getStatusColor])

  // Initialize map and create markers with React Portals
  useEffect(() => {
    if (!mapContainer.current || !apiKey) {
      console.log('MapWidget: Missing container or API key')
      if (!apiKey) {
        setMapError('Map API key not configured. Please set NEXT_PUBLIC_STADIA_MAPS_API_KEY.')
      }
      return
    }

    console.log('MapWidget: Initializing map with React Portals...')

    // Dynamic import of maplibre-gl
    import('maplibre-gl').then((maplibregl) => {
      // Initialize map
      mapRef.current = new maplibregl.Map({
        container: mapContainer.current!,
        style: `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${apiKey}`,
        center: [90.4125, 23.8103], // Center of Dhaka
        zoom: 11.2,
        attributionControl: false,
        minZoom: 10,
        maxZoom: 18
      })

      const map = mapRef.current

      // Add controls
      map.addControl(new maplibregl.AttributionControl({
        compact: true
      }), 'bottom-right')

      map.addControl(new maplibregl.NavigationControl({
        visualizePitch: true
      }), 'top-right')

      // Map loaded event
      map.on('load', () => {
        console.log('MapWidget: Map loaded, creating React Portal markers...')
        setMapLoaded(true)
        setMapError(null)

        // Get filtered sites
        const sitesToShow = filterStatus === 'all' 
          ? bangladeshSites 
          : bangladeshSites.filter(site => site.status === filterStatus)

        // Create markers with React Portals
        const newMarkers: MarkerData[] = sitesToShow.map(site => {
          // Create container div for React Portal
          const container = document.createElement('div')
          container.className = 'map-marker-portal-container'
          container.style.width = '56px'
          container.style.height = '56px'
          container.style.position = 'relative'

          // Create MapLibre GL marker
          const marker = new maplibregl.Marker({
            element: container,
            anchor: 'center'
          })
            .setLngLat([site.lng, site.lat])
            .addTo(map)

          return {
            id: site.id,
            marker,
            container,
            site
          }
        })

        setMarkers(newMarkers)
      })

      // Handle map errors
      map.on('error', (e: any) => {
        console.error('MapWidget: Map error:', e)
        if (!apiKey) {
          setMapError('Map API key missing. Please set NEXT_PUBLIC_STADIA_MAPS_API_KEY in .env.local')
        } else {
          setMapError('Failed to load map tiles. Check network connection.')
        }
      })

    }).catch((error) => {
      console.error('MapWidget: Failed to load MapLibre GL:', error)
      setMapError('Failed to load map library')
    })

    // Cleanup function
    return () => {
      // Clean up React Portals first
      markers.forEach(({ container }) => {
        // React will automatically clean up portals when component unmounts
        if (container.parentNode) {
          container.parentNode.removeChild(container)
        }
      })
      
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
      setMarkers([])
    }
  }, [apiKey, filterStatus]) // Re-run when filter changes

  // Get selected site details
  const selectedSiteDetails = useMemo(() => {
    return selectedSite ? bangladeshSites.find(s => s.id === selectedSite) : null
  }, [selectedSite])

  return (
    <motion.div 
      className="rounded-2xl overflow-hidden backdrop-blur-xl group hover-lift"
      style={{
        background: 'rgba(255, 255, 255, 0.06)',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 12px 48px rgba(31, 38, 135, 0.25)',
      }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Enhanced Header */}
      <div className="px-4 sm:px-6 py-3 sm:py-4" style={{
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
        background: 'linear-gradient(to right, rgba(0, 255, 136, 0.05), rgba(0, 217, 255, 0.05))',
      }}>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div 
              className="w-8 sm:w-10 h-8 sm:h-10 bg-gradient-to-br from-[#10B981] to-emerald-600 rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: -15, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <MapIcon className="w-4 sm:w-5 h-4 sm:h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="text-sm sm:text-base font-semibold text-white">Live Construction Map</h3>
              <p className="text-xs text-white/60 hidden sm:block">12 active sites across Dhaka</p>
            </div>
          </div>
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Status indicators */}
            <div className="hidden lg:flex items-center gap-4 text-sm">
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-[#10B981] rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-[#10B981] rounded-full animate-ping" />
                </div>
                <span className="text-white/60">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative">
                  <div className="w-2 h-2 bg-[#F59E0B] rounded-full" />
                  <div className="absolute inset-0 w-2 h-2 bg-[#F59E0B] rounded-full animate-pulse" />
                </div>
                <span className="text-white/60">Issues ({siteStats.totalIssues})</span>
              </div>
            </div>
            
            {/* View toggle */}
            <button
              onClick={() => setShowLiveUpdates(!showLiveUpdates)}
              className="p-2 rounded-lg transition-all backdrop-blur-sm"
              style={{
                background: showLiveUpdates ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                border: `1px solid ${showLiveUpdates ? 'rgba(0, 255, 136, 0.3)' : 'rgba(255, 255, 255, 0.08)'}`,
                color: showLiveUpdates ? '#00FF88' : 'rgba(255, 255, 255, 0.6)',
              }}
            >
              <Activity className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Map Container with optimized height */}
      <div className="relative h-[800px]">
        {/* MapLibre GL Container */}
        <div 
          ref={mapContainer} 
          className="absolute inset-0 rounded-b-2xl"
          style={{ minHeight: '800px' }}
        />
        
        {/* Render React Portal markers */}
        {mapLoaded && markers.map(({ id, container, site }) => (
          createPortal(
            <EnhancedMapMarker
              key={id}
              site={site}
              getStatusColor={getStatusColor}
              onHover={handleSiteHover}
              onClick={handleSiteClick}
              selected={selectedSite === id}
            />,
            container
          )
        ))}
        
        {/* Error State */}
        {mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-red-50 to-red-100 rounded-b-2xl">
            <div className="text-center p-6">
              <AlertTriangle className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <p className="text-sm text-red-600 font-medium mb-2">Map Loading Error</p>
              <p className="text-xs text-red-500">{mapError}</p>
            </div>
          </div>
        )}
        
        {/* Loading State */}
        {!mapLoaded && !mapError && (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#0A0B1E] to-[#141B3A] rounded-b-2xl">
            <div className="text-center">
              <div className="relative">
                <div className="w-16 h-16 border-4 border-[#00D9FF]/20 border-t-[#00D9FF] rounded-full animate-spin mx-auto mb-4" />
                <div className="absolute inset-0 w-16 h-16 border-4 border-[#FF00EA]/20 border-b-[#FF00EA] rounded-full animate-spin mx-auto" style={{ animationDirection: 'reverse' }} />
              </div>
              <p className="text-sm text-white/60 mt-4">Loading interactive map...</p>
            </div>
          </div>
        )}

        {/* Enhanced Map Controls */}
        <div className="absolute top-4 left-4 z-10 space-y-2">
          {/* Filter Dropdown */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-popup rounded-xl shadow-lg overflow-hidden"
          >
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-4 py-2 pr-8 bg-transparent text-sm font-medium text-white focus:outline-none cursor-pointer appearance-none"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3E%3Cpath stroke='%236B7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3E%3C/svg%3E")`,
                backgroundPosition: 'right 0.5rem center',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '1.5em 1.5em',
                paddingRight: '2.5rem'
              }}
            >
              <option value="all">All Sites ({bangladeshSites.length})</option>
              <option value="planning">Planning ({bangladeshSites.filter((s: any) => s.status === 'planning').length})</option>
              <option value="foundation">Foundation ({bangladeshSites.filter((s: any) => s.status === 'foundation').length})</option>
              <option value="structure">Structure ({bangladeshSites.filter((s: any) => s.status === 'structure').length})</option>
              <option value="finishing">Finishing ({bangladeshSites.filter((s: any) => s.status === 'finishing').length})</option>
              <option value="completed">Completed ({bangladeshSites.filter((s: any) => s.status === 'completed').length})</option>
            </select>
          </motion.div>
          
          {/* Control Buttons */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-2"
          >
            <button
              onClick={() => {
                if (mapRef.current) {
                  mapRef.current.flyTo({
                    center: [90.4125, 23.8103],
                    zoom: 11.2,
                    duration: 1500
                  })
                }
              }}
              className="rounded-xl p-3 shadow-lg hover:shadow-xl transition-all flex items-center gap-2 backdrop-blur-xl"
              style={{
                background: 'rgba(255, 255, 255, 0.06)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 8px 32px rgba(31, 38, 135, 0.15)',
              }}
            >
              <Navigation className="w-4 h-4 text-white/80" />
              <span className="hidden sm:inline text-sm font-medium text-white/80">Reset View</span>
            </button>
          </motion.div>
        </div>

        {/* Live Activity Panel */}
        <AnimatePresence>
          {showLiveUpdates && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ delay: 0.5 }}
              className="absolute top-4 right-4 glass-popup rounded-xl p-3 sm:p-4 border border-gray-200/50 shadow-xl z-10 max-w-[200px] sm:max-w-[280px]"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="relative">
                  <Activity className="w-4 h-4 text-[#10B981]" />
                  <div className="absolute inset-0 w-4 h-4 bg-[#10B981] rounded-full animate-ping opacity-30" />
                </div>
                <span className="text-sm font-medium text-white">Live Activity</span>
              </div>
              <div className="space-y-2">
                <div className="grid grid-cols-2 gap-2">
                  <div className="p-2 rounded-lg" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}>
                    <div className="flex items-center gap-1 text-white/60 mb-1">
                      <MapPin className="w-3 h-3" />
                      <span className="text-xs">Sites</span>
                    </div>
                    <motion.div 
                      className="text-lg font-bold text-white"
                      key={siteStats.total}
                      initial={{ scale: 1.2, color: '#00FF88' }}
                      animate={{ scale: 1, color: '#FFFFFF' }}
                    >
                      {siteStats.total}
                    </motion.div>
                  </div>
                  
                  <div className="p-2 rounded-lg" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}>
                    <div className="flex items-center gap-1 text-white/60 mb-1">
                      <Users className="w-3 h-3" />
                      <span className="text-xs">Workers</span>
                    </div>
                    <motion.div 
                      className="text-lg font-bold text-white"
                      key={siteStats.workers}
                      initial={{ scale: 1.2, color: '#00FF88' }}
                      animate={{ scale: 1, color: '#FFFFFF' }}
                    >
                      {siteStats.workers.toLocaleString()}
                    </motion.div>
                  </div>
                  
                  <div className="p-2 rounded-lg" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}>
                    <div className="flex items-center gap-1 text-white/60 mb-1">
                      <Truck className="w-3 h-3" />
                      <span className="text-xs">Equipment</span>
                    </div>
                    <motion.div 
                      className="text-lg font-bold text-white"
                      key={siteStats.equipment}
                      initial={{ scale: 1.2, color: '#00D9FF' }}
                      animate={{ scale: 1, color: '#FFFFFF' }}
                    >
                      {siteStats.equipment}
                    </motion.div>
                  </div>
                  
                  <div className="p-2 rounded-lg" style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                  }}>
                    <div className="flex items-center gap-1 text-white/60 mb-1">
                      <TrendingUp className="w-3 h-3" />
                      <span className="text-xs">Productivity</span>
                    </div>
                    <motion.div 
                      className="text-lg font-bold text-[#00FF88]"
                      key={siteStats.avgProductivity}
                      initial={{ scale: 1.2 }}
                      animate={{ scale: 1 }}
                    >
                      {siteStats.avgProductivity}%
                    </motion.div>
                  </div>
                </div>
                
                {siteStats.totalIssues > 0 && (
                  <div className="p-2 rounded-lg" style={{
                    background: 'rgba(255, 184, 0, 0.1)',
                    border: '1px solid rgba(255, 184, 0, 0.3)',
                  }}>
                    <div className="flex items-center gap-2 text-[#FFB800]">
                      <AlertTriangle className="w-4 h-4" />
                      <span className="text-xs font-medium">{siteStats.totalIssues} Active Issues</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Hovered Site Info */}
        <AnimatePresence>
          {hoveredSiteId && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="absolute bottom-4 right-4 glass-popup rounded-xl p-4 shadow-xl max-w-sm z-20"
            >
              {(() => {
                const site = bangladeshSites.find((s: any) => s.id === hoveredSiteId)
                if (!site) return null
                
                return (
                  <>
                    <h4 className="text-lg font-semibold text-white mb-2">{site.name}</h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div>
                        <p className="text-white/60">Workers</p>
                        <p className="font-medium text-white">{site.workers.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-white/60">Progress</p>
                        <p className="font-medium text-white">{site.progress}%</p>
                      </div>
                    </div>
                  </>
                )
              })()}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Enhanced Styles */}
      <style jsx global>{`
        .site-popup .maplibregl-popup-content {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
          font-family: Inter, -apple-system, BlinkMacSystemFont, sans-serif;
          max-width: 340px !important;
        }
        
        .site-popup .maplibregl-popup-close-button {
          top: 8px;
          right: 8px;
          width: 20px;
          height: 20px;
          color: #6B7280;
          font-size: 18px;
        }
        
        .site-popup .maplibregl-popup-tip {
          border-top-color: white;
        }
        
        .glass-popup {
          background: rgba(10, 11, 30, 0.95);
          backdrop-filter: blur(20px);
          -webkit-backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .map-marker-portal-container {
          pointer-events: auto;
          position: absolute;
          transform: translate(-50%, -50%);
        }
        
        .map-marker-react {
          pointer-events: auto;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 10;
        }
      `}</style>
    </motion.div>
  )
}