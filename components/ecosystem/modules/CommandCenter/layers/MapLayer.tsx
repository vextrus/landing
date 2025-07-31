'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import maplibregl from 'maplibre-gl'
import 'maplibre-gl/dist/maplibre-gl.css'
import { 
  MapPin, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  Truck,
  Users,
  Construction,
  Cloud,
  ThermometerSun,
  Navigation,
  Building,
  DollarSign,
  Calendar,
  Zap,
  Activity
} from 'lucide-react'
import { bangladeshSites, getSiteStatistics } from '../services/bangladeshSitesData'
import { formatBDT } from '../../../utils/bdCurrency'

interface MapLayerProps {
  selectedSite: string | null
  onSiteSelect: (siteId: string) => void
}

export default function MapLayer({ selectedSite, onSiteSelect }: MapLayerProps) {
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<maplibregl.Map | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)
  const [hoveredSite, setHoveredSite] = useState<string | null>(null)
  const [showStats, setShowStats] = useState(true)
  
  const apiKey = process.env.NEXT_PUBLIC_STADIA_MAPS_API_KEY

  // Get site statistics
  const stats = getSiteStatistics()

  // Convert status to color
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'planning': return '#6B7280' // gray
      case 'foundation': return '#F59E0B' // amber
      case 'structure': return '#3B82F6' // blue
      case 'finishing': return '#10B981' // green
      case 'completed': return '#059669' // dark green
      default: return '#3B82F6'
    }
  }

  useEffect(() => {
    if (!mapContainerRef.current || !apiKey) return

    // Initialize map
    mapRef.current = new maplibregl.Map({
      container: mapContainerRef.current,
      style: `https://tiles.stadiamaps.com/styles/alidade_smooth.json?api_key=${apiKey}`,
      center: [90.4750, 23.8200], // Center of all construction sites
      zoom: 11,
      attributionControl: false,
      minZoom: 10,
      maxZoom: 18
    })

    const map = mapRef.current

    // Add attribution
    map.addControl(new maplibregl.AttributionControl({
      compact: true
    }), 'bottom-right')

    // Add navigation controls
    map.addControl(new maplibregl.NavigationControl({
      visualizePitch: true
    }), 'top-right')

    // Map loaded
    map.on('load', () => {
      setMapLoaded(true)

      // Add markers for all Bangladesh sites
      bangladeshSites.forEach(site => {
        // Create custom marker element
        const el = document.createElement('div')
        el.className = 'custom-marker'
        el.id = `marker-${site.id}`
        
        // Style the marker
        el.innerHTML = `
          <div style="
            position: relative;
            width: ${site.type === 'commercial' ? '64px' : '48px'};
            height: ${site.type === 'commercial' ? '64px' : '48px'};
            cursor: pointer;
            transition: all 0.3s ease;
          ">
            <!-- Background circle -->
            <div style="
              position: absolute;
              inset: 0;
              background: ${getStatusColor(site.status)};
              border-radius: 50%;
              opacity: 0.2;
              animation: pulse 2s infinite;
            "></div>
            
            <!-- Main marker -->
            <div style="
              position: absolute;
              inset: 8px;
              background: ${getStatusColor(site.status)};
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 4px 12px rgba(0,0,0,0.15);
              border: 3px solid white;
            ">
              <svg width="${site.type === 'commercial' ? '24' : '20'}" height="${site.type === 'commercial' ? '24' : '20'}" viewBox="0 0 24 24" fill="white">
                <path d="M17 2v2h3v2h-2v12h2v2h-3v2h-2v-2H9v2H7v-2H4v-2h2V6H4V4h3V2h2v2h6V2h2zM8 6v12h8V6H8zm2 2h4v8h-4V8z"/>
              </svg>
            </div>
            
            <!-- Progress ring -->
            <svg style="position: absolute; inset: -2px; width: ${site.type === 'commercial' ? '68px' : '52px'}; height: ${site.type === 'commercial' ? '68px' : '52px'}; transform: rotate(-90deg);">
              <circle 
                cx="${site.type === 'commercial' ? '34' : '26'}" 
                cy="${site.type === 'commercial' ? '34' : '26'}" 
                r="${site.type === 'commercial' ? '30' : '22'}" 
                fill="none" 
                stroke="rgba(255,255,255,0.3)" 
                stroke-width="3"
              />
              <circle 
                cx="${site.type === 'commercial' ? '34' : '26'}" 
                cy="${site.type === 'commercial' ? '34' : '26'}" 
                r="${site.type === 'commercial' ? '30' : '22'}" 
                fill="none" 
                stroke="${getStatusColor(site.status)}" 
                stroke-width="3"
                stroke-dasharray="${(site.progress / 100) * 2 * Math.PI * (site.type === 'commercial' ? 30 : 22)} ${2 * Math.PI * (site.type === 'commercial' ? 30 : 22)}"
                style="filter: drop-shadow(0 0 6px ${getStatusColor(site.status)})"
              />
            </svg>
            
            <!-- Alert indicator -->
            ${site.details.issues > 0 ? `
              <div style="
                position: absolute;
                top: -4px;
                right: -4px;
                width: 20px;
                height: 20px;
                background-color: #EF4444;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 11px;
                font-weight: bold;
                border: 2px solid white;
                box-shadow: 0 2px 4px rgba(0,0,0,0.2);
              ">
                ${site.details.issues}
              </div>
            ` : ''}
          </div>
        `

        // Add hover effect
        el.addEventListener('mouseenter', () => {
          el.style.transform = 'scale(1.15)'
          setHoveredSite(site.id)
        })

        el.addEventListener('mouseleave', () => {
          el.style.transform = 'scale(1)'
          setHoveredSite(null)
        })

        // Create marker
        const marker = new maplibregl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat([site.lng, site.lat])
          .addTo(map)

        // Create popup
        const popup = new maplibregl.Popup({
          offset: 35,
          closeButton: false,
          className: 'site-popup'
        }).setHTML(`
          <div style="padding: 16px; min-width: 320px;">
            <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
              <div>
                <h3 style="font-weight: 600; font-size: 18px; margin: 0;">${site.name}</h3>
                <p style="color: #6B7280; font-size: 14px; margin: 4px 0;">${site.location}</p>
                <p style="color: #6B7280; font-size: 12px; margin: 4px 0;">${site.type.charAt(0).toUpperCase() + site.type.slice(1)} • ${site.floors} floors • ${site.units} units</p>
              </div>
              <span style="
                padding: 4px 12px;
                background-color: ${getStatusColor(site.status)}20;
                color: ${getStatusColor(site.status)};
                border-radius: 9999px;
                font-size: 12px;
                font-weight: 500;
              ">
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
                <p style="font-weight: 600; font-size: 20px; margin: 0;">${site.workers.toLocaleString()}</p>
              </div>
              
              <div style="background: #F3F4F6; padding: 12px; border-radius: 8px;">
                <div style="display: flex; align-items: center; gap: 6px; margin-bottom: 4px;">
                  <svg width="14" height="14" fill="none" stroke="#6B7280" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                  </svg>
                  <span style="color: #6B7280; font-size: 12px;">Progress</span>
                </div>
                <p style="font-weight: 600; font-size: 20px; margin: 0;">${site.progress}%</p>
              </div>
            </div>
            
            <div style="border-top: 1px solid #E5E7EB; padding-top: 12px;">
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6B7280; font-size: 13px;">Current Phase:</span>
                <span style="font-weight: 500; font-size: 13px;">${site.details.phase}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6B7280; font-size: 13px;">Budget:</span>
                <span style="font-weight: 500; font-size: 13px;">${formatBDT(site.budget)}</span>
              </div>
              <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
                <span style="color: #6B7280; font-size: 13px;">Spent:</span>
                <span style="font-weight: 500; font-size: 13px;">${formatBDT(site.spent)}</span>
              </div>
              <div style="display: flex; justify-content: space-between;">
                <span style="color: #6B7280; font-size: 13px;">Safety Score:</span>
                <span style="font-weight: 500; font-size: 13px; color: ${site.details.safety >= 95 ? '#10B981' : site.details.safety >= 90 ? '#F59E0B' : '#EF4444'}">
                  ${site.details.safety}%
                </span>
              </div>
            </div>
            
            ${site.details.milestones && site.details.milestones.length > 0 ? `
              <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid #E5E7EB;">
                <p style="font-weight: 500; font-size: 14px; margin-bottom: 8px;">Next Milestone:</p>
                <div style="display: flex; align-items: center; gap: 8px;">
                  <svg width="16" height="16" fill="${site.details.milestones[0].status === 'completed' ? '#10B981' : site.details.milestones[0].status === 'in_progress' ? '#3B82F6' : '#6B7280'}" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span style="font-size: 13px;">${site.details.milestones[0].name}</span>
                </div>
              </div>
            ` : ''}
          </div>
        `)

        marker.setPopup(popup)

        // Click handler
        el.addEventListener('click', () => {
          onSiteSelect(site.id)
        })
      })

      // Add vehicle markers for equipment
      const vehiclePositions = [
        { lat: 23.8150, lng: 90.4290, type: 'truck' },
        { lat: 23.8680, lng: 90.3880, type: 'excavator' },
        { lat: 23.8115, lng: 90.4240, type: 'truck' },
        { lat: 23.8640, lng: 90.3850, type: 'crane' }
      ]

      vehiclePositions.forEach((vehicle, index) => {
        const el = document.createElement('div')
        el.className = 'vehicle-marker'
        
        el.innerHTML = `
          <div style="
            position: relative;
            width: 32px;
            height: 32px;
            cursor: pointer;
            animation: moveVehicle${index} 20s infinite linear;
          ">
            <div style="
              position: absolute;
              inset: 0;
              background: #F59E0B;
              border-radius: 50%;
              opacity: 0.3;
              animation: pulse 1.5s infinite;
            "></div>
            <div style="
              position: absolute;
              inset: 4px;
              background: white;
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              box-shadow: 0 2px 8px rgba(0,0,0,0.2);
              border: 2px solid #F59E0B;
            ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="#F59E0B">
                ${vehicle.type === 'truck' ? 
                  '<path d="M18 18.5a1.5 1.5 0 01-1.5-1.5 1.5 1.5 0 011.5-1.5 1.5 1.5 0 011.5 1.5 1.5 1.5 0 01-1.5 1.5m1.5-9l1.96 2.5H17V9.5m-11 9A1.5 1.5 0 014.5 17 1.5 1.5 0 016 15.5 1.5 1.5 0 017.5 17 1.5 1.5 0 016 18.5m13.5-9.5h-5V6H5c-1.11 0-2 .89-2 2v11h2a3 3 0 003 3 3 3 0 003-3h6a3 3 0 003 3 3 3 0 003-3h2v-5.5l-2.5-4z"/>' :
                  vehicle.type === 'excavator' ? 
                  '<path d="M19 11.5V19h1c.55 0 1 .45 1 1s-.45 1-1 1H4c-.55 0-1-.45-1-1s.45-1 1-1h1v-7.5h.33L1.5 2.92c-.05-.1-.08-.22-.08-.34 0-.26.21-.5.5-.5l.17.03L10 5.5V4c0-.55.45-1 1-1h5c.55 0 1 .45 1 1v4h2V7c0-.55.45-1 1-1s1 .45 1 1v3.5c0 .55-.45 1-1 1H19m-2 .5v7h2v-7h-2m-3 0H7v7h7v-7m-9 0H5v7h2v-7z"/>' :
                  '<path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>'
                }
              </svg>
            </div>
          </div>
        `

        new maplibregl.Marker({
          element: el,
          anchor: 'center'
        })
          .setLngLat([vehicle.lng, vehicle.lat])
          .addTo(map)
      })
    })

    // Handle map errors
    map.on('error', (e) => {
      console.error('Map error:', e)
    })

    // Cleanup
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [apiKey, onSiteSelect])

  return (
    <div className="relative w-full h-full min-h-[1100px] bg-gray-50 rounded-xl overflow-hidden">
      {/* Map Container */}
      <div ref={mapContainerRef} className="absolute inset-0" style={{ minHeight: '1100px' }} />

      {/* Loading State */}
      {!mapLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm">
          <div className="text-center">
            <div className="w-16 h-16 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">Loading construction sites...</p>
          </div>
        </div>
      )}

      {/* Top Stats Bar */}
      <AnimatePresence>
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-4 right-4 glass-popup rounded-xl p-4 shadow-xl max-w-6xl mx-auto"
          >
            <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Sites</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalSites}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Workers</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalWorkers.toLocaleString()}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">{formatBDT(stats.totalBudget)}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-gray-900">{stats.avgProgress}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Avg Safety</p>
                <p className="text-2xl font-bold text-green-600">{stats.avgSafety}%</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-600">Active Projects</p>
                <p className="text-2xl font-bold text-blue-600">
                  {stats.byStatus.foundation + stats.byStatus.structure + stats.byStatus.finishing}
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Legend */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute bottom-4 left-4 glass-popup rounded-xl p-4 shadow-xl"
      >
        <h4 className="text-sm font-semibold text-gray-900 mb-3">Project Status</h4>
        <div className="space-y-2">
          {Object.entries({
            planning: { color: '#6B7280', label: 'Planning' },
            foundation: { color: '#F59E0B', label: 'Foundation' },
            structure: { color: '#3B82F6', label: 'Structure' },
            finishing: { color: '#10B981', label: 'Finishing' },
            completed: { color: '#059669', label: 'Completed' }
          }).map(([key, value]) => (
            <div key={key} className="flex items-center gap-2">
              <div 
                className="w-4 h-4 rounded-full" 
                style={{ backgroundColor: value.color }}
              />
              <span className="text-xs text-gray-700">
                {value.label} ({stats.byStatus[key as keyof typeof stats.byStatus]})
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Hovered Site Info */}
      <AnimatePresence>
        {hoveredSite && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="absolute bottom-4 right-4 glass-popup rounded-xl p-4 shadow-xl max-w-sm"
          >
            {(() => {
              const site = bangladeshSites.find(s => s.id === hoveredSite)
              if (!site) return null
              
              return (
                <>
                  <h4 className="text-lg font-semibold text-gray-900 mb-2">{site.name}</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-gray-600">Developer</p>
                      <p className="font-medium">{site.developer}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Contractor</p>
                      <p className="font-medium">{site.contractor}</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Area</p>
                      <p className="font-medium">{site.area.toLocaleString()} sqft</p>
                    </div>
                    <div>
                      <p className="text-gray-600">Completion</p>
                      <p className="font-medium">{new Date(site.completionDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                </>
              )
            })()}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Controls */}
      <div className="absolute top-24 right-4 flex flex-col gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setShowStats(!showStats)}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Activity className="w-5 h-5 text-gray-700" />
        </motion.button>
        
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            if (mapRef.current) {
              mapRef.current.flyTo({
                center: [90.4750, 23.8200],
                zoom: 11,
                duration: 1500
              })
            }
          }}
          className="w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center hover:bg-gray-50 transition-colors"
        >
          <Navigation className="w-5 h-5 text-gray-700" />
        </motion.button>
      </div>

      {/* Styles for animations */}
      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(1);
            opacity: 0.3;
          }
          50% {
            transform: scale(1.2);
            opacity: 0.1;
          }
          100% {
            transform: scale(1);
            opacity: 0.3;
          }
        }
        
        @keyframes moveVehicle0 {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(20px) translateY(-10px); }
          50% { transform: translateX(40px) translateY(0); }
          75% { transform: translateX(20px) translateY(10px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        @keyframes moveVehicle1 {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-15px) translateY(5px); }
          50% { transform: translateX(-30px) translateY(0); }
          75% { transform: translateX(-15px) translateY(-5px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        @keyframes moveVehicle2 {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(10px) translateY(15px); }
          50% { transform: translateX(0) translateY(30px); }
          75% { transform: translateX(-10px) translateY(15px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        @keyframes moveVehicle3 {
          0% { transform: translateX(0) translateY(0); }
          25% { transform: translateX(-20px) translateY(-20px); }
          50% { transform: translateX(-40px) translateY(0); }
          75% { transform: translateX(-20px) translateY(20px); }
          100% { transform: translateX(0) translateY(0); }
        }
        
        .glass-popup {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(229, 231, 235, 0.5);
        }
        
        .site-popup .maplibregl-popup-content {
          padding: 0;
          border-radius: 12px;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
        }
        
        .site-popup .maplibregl-popup-tip {
          border-top-color: white;
        }
      `}</style>
    </div>
  )
}