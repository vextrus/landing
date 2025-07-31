import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { 
  MapPin,
  Building,
  Activity,
  AlertTriangle,
  Users,
  CheckCircle
} from 'lucide-react'
import { bangladeshSites } from '../../services/bangladeshSitesData'
import { GlassCard } from '../../../../shared/ui'
import 'maplibre-gl/dist/maplibre-gl.css'

interface SimpleMapWidgetProps {
  realtimeData?: any
}

export default function SimpleMapWidget({ realtimeData }: SimpleMapWidgetProps) {
  const [mapLoaded, setMapLoaded] = useState(false)
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)
  const [hoveredSite, setHoveredSite] = useState<any>(null)
  const [hoverPosition, setHoverPosition] = useState<{x: number, y: number} | null>(null)
  
  const mapContainer = useRef<HTMLDivElement>(null)
  const mapRef = useRef<any>(null)
  
  // Get API key
  const apiKey = process.env.NEXT_PUBLIC_STADIA_MAPS_API_KEY || 'eb887465-72f0-4e02-9d92-6e68a62c5719'

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

  const getStatusIcon = (status: string) => {
    switch(status) {
      case 'planning': return AlertTriangle
      case 'foundation': return Building
      case 'structure': return Activity
      case 'finishing': return Users
      case 'completed': return CheckCircle
      default: return MapPin
    }
  }

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || !apiKey || mapRef.current) {
      if (!apiKey) {
        setMapError('API key not found')
      }
      return
    }

    console.log('SimpleMapWidget: Initializing map...')

    import('maplibre-gl').then((maplibregl) => {
      try {
        mapRef.current = new maplibregl.Map({
          container: mapContainer.current!,
          style: `https://tiles.stadiamaps.com/styles/alidade_smooth_dark.json?api_key=${apiKey}`,
          center: [90.4125, 23.8103], // Center of Dhaka
          zoom: 12.5, // Increased zoom for better visibility
          attributionControl: false,
          minZoom: 10,
          maxZoom: 18
        })

        const map = mapRef.current

        // Add simple HTML markers
        map.on('load', () => {
          console.log('SimpleMapWidget: Map loaded, adding HTML markers...')
          setMapLoaded(true)
          setMapError(null)

          // Add markers for first 10 sites
          bangladeshSites.slice(0, 10).forEach(site => {
            const StatusIcon = getStatusIcon(site.status)
            const color = getStatusColor(site.status)

            // Create marker element with enhanced styling
            const markerEl = document.createElement('div')
            markerEl.className = 'simple-map-marker'
            
            // Get site health status
            const getHealthStatus = () => {
              if (site.details.issues > 3) return 'critical'
              if (site.details.issues > 1) return 'warning'
              if (site.details.safety < 85) return 'warning'
              return 'healthy'
            }
            
            const healthStatus = getHealthStatus()
            const healthColors = {
              healthy: '#22C55E',
              warning: '#F59E0B', 
              critical: '#EF4444'
            }
            const healthColor = healthColors[healthStatus]
            
            markerEl.innerHTML = `
              <div class="marker-container" style="
                position: relative;
                width: 48px;
                height: 48px;
                cursor: pointer;
                transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
              ">
                <!-- Pulse Ring for Active Sites -->
                ${site.status === 'structure' || site.details.issues > 0 ? `
                  <div style="
                    position: absolute;
                    inset: -8px;
                    border: 2px solid ${healthColor}40;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                  "></div>
                ` : ''}
                
                <!-- Main Marker -->
                <div class="marker-main" style="
                  width: 48px;
                  height: 48px;
                  background: linear-gradient(135deg, ${color}15, ${color}30);
                  border: 3px solid ${color};
                  border-radius: 50%;
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  box-shadow: 0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset;
                  backdrop-filter: blur(10px);
                  position: relative;
                  overflow: hidden;
                  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
                ">
                  <!-- Status Icon -->
                  <div style="color: ${color}; font-size: 20px; font-weight: bold; z-index: 2;">●</div>
                  
                  <!-- Progress Ring -->
                  <svg style="
                    position: absolute;
                    inset: 0;
                    width: 100%;
                    height: 100%;
                    transform: rotate(-90deg);
                    z-index: 1;
                  ">
                    <circle cx="24" cy="24" r="18" 
                      fill="none" 
                      stroke="rgba(255,255,255,0.1)" 
                      stroke-width="2"
                    />
                    <circle cx="24" cy="24" r="18" 
                      fill="none" 
                      stroke="${color}" 
                      stroke-width="2"
                      stroke-dasharray="${2 * Math.PI * 18}"
                      stroke-dashoffset="${2 * Math.PI * 18 * (1 - site.progress / 100)}"
                      opacity="0.8"
                    />
                  </svg>
                  
                  <!-- Shimmer Effect -->
                  <div style="
                    position: absolute;
                    inset: 0;
                    background: linear-gradient(105deg, transparent 40%, ${color}30 50%, transparent 60%);
                    border-radius: 50%;
                    animation: shimmer 3s infinite;
                  "></div>
                </div>
                
                <!-- Health Status Indicator -->
                <div style="
                  position: absolute;
                  top: -2px;
                  right: -2px;
                  width: 16px;
                  height: 16px;
                  background: ${healthColor};
                  border: 2px solid rgba(10, 11, 30, 0.9);
                  border-radius: 50%;
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                ">
                  <div style="
                    width: 6px;
                    height: 6px;
                    background: rgba(255,255,255,0.9);
                    border-radius: 50%;
                  "></div>
                </div>
                
                <!-- Progress Badge -->
                <div style="
                  position: absolute;
                  bottom: -8px;
                  left: 50%;
                  transform: translateX(-50%);
                  background: rgba(10, 11, 30, 0.9);
                  border: 1px solid ${color}40;
                  border-radius: 12px;
                  padding: 2px 6px;
                  font-size: 10px;
                  font-weight: 600;
                  color: ${color};
                  backdrop-filter: blur(10px);
                  box-shadow: 0 2px 8px rgba(0,0,0,0.3);
                ">
                  ${site.progress}%
                </div>
              </div>
            `
            
            // Enhanced hover effects with proper event handling
            markerEl.addEventListener('mouseenter', (e) => {
              // Get marker position for tooltip
              const rect = markerEl.getBoundingClientRect()
              setHoverPosition({ 
                x: rect.left + rect.width / 2, 
                y: rect.top 
              })
              setHoveredSite(site)
              
              // Add CSS-only hover effects without transform manipulation
              const mainMarker = markerEl.querySelector('.marker-main') as HTMLElement
              if (mainMarker) {
                mainMarker.style.boxShadow = `0 8px 32px rgba(0,0,0,0.6), 0 0 0 2px ${color}40`
              }
            })
            
            markerEl.addEventListener('mouseleave', () => {
              setHoveredSite(null)
              setHoverPosition(null)
              
              // Reset CSS-only hover effects
              const mainMarker = markerEl.querySelector('.marker-main') as HTMLElement
              if (mainMarker) {
                mainMarker.style.boxShadow = '0 4px 16px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1) inset'
              }
            })

            // Add click event
            markerEl.addEventListener('click', () => {
              setSelectedSite(site.id)
              
              // Create popup HTML
              const popupEl = document.createElement('div')
              popupEl.innerHTML = `
                <div style="
                  background: rgba(10, 11, 30, 0.95);
                  backdrop-filter: blur(20px);
                  border: 1px solid rgba(255, 255, 255, 0.1);
                  border-radius: 12px;
                  padding: 20px;
                  min-width: 320px;
                  color: white;
                  font-family: Inter, sans-serif;
                ">
                  <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 16px;">
                    <div style="
                      width: 40px;
                      height: 40px;
                      background: linear-gradient(135deg, ${color}20, ${color}40);
                      border: 2px solid ${color};
                      border-radius: 50%;
                      display: flex;
                      align-items: center;
                      justify-content: center;
                    ">
                      <div style="color: ${color}; font-size: 18px; font-weight: bold;">●</div>
                    </div>
                    <div>
                      <h3 style="margin: 0; font-size: 18px; font-weight: 600;">${site.name}</h3>
                      <p style="margin: 2px 0 0 0; font-size: 14px; color: rgba(255,255,255,0.7);">${site.location}</p>
                    </div>
                  </div>
                  
                  <div style="margin-bottom: 16px;">
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
                      <span style="font-size: 14px; color: rgba(255,255,255,0.8);">Progress</span>
                      <span style="font-size: 14px; font-weight: 600; color: ${color};">${site.progress}%</span>
                    </div>
                    <div style="
                      width: 100%;
                      height: 6px;
                      background: rgba(255,255,255,0.1);
                      border-radius: 3px;
                      overflow: hidden;
                    ">
                      <div style="
                        width: ${site.progress}%;
                        height: 100%;
                        background: linear-gradient(90deg, ${color}, ${color}aa);
                        border-radius: 3px;
                      "></div>
                    </div>
                  </div>
                  
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 12px; margin-bottom: 16px;">
                    <div style="text-align: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                      <div style="font-size: 20px; font-weight: bold; color: #3B82F6;">${site.workers}</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.6);">Workers</div>
                    </div>
                    <div style="text-align: center; padding: 12px; background: rgba(255,255,255,0.05); border-radius: 8px;">
                      <div style="font-size: 20px; font-weight: bold; color: #10B981;">${site.floors}</div>
                      <div style="font-size: 12px; color: rgba(255,255,255,0.6);">Floors</div>
                    </div>
                  </div>
                  
                  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 8px; font-size: 12px;">
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: rgba(255,255,255,0.6);">Status:</span>
                      <span style="color: ${color}; text-transform: capitalize; font-weight: 500;">${site.status}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: rgba(255,255,255,0.6);">Type:</span>
                      <span style="color: rgba(255,255,255,0.8); text-transform: capitalize;">${site.type}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: rgba(255,255,255,0.6);">Safety:</span>
                      <span style="color: #22C55E; font-weight: 500;">${site.details.safety}%</span>
                    </div>
                    <div style="display: flex; justify-content: space-between;">
                      <span style="color: rgba(255,255,255,0.6);">Issues:</span>
                      <span style="color: ${site.details.issues > 0 ? '#EF4444' : '#22C55E'}; font-weight: 500;">${site.details.issues}</span>
                    </div>
                  </div>
                  
                  <div style="margin-top: 16px; padding-top: 16px; border-top: 1px solid rgba(255,255,255,0.1);">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                      <span style="font-size: 12px; color: rgba(255,255,255,0.6);">Budget:</span>
                      <span style="font-size: 14px; font-weight: 600; color: #F59E0B;">৳${(site.budget / 10000000).toFixed(1)}Cr</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; align-items: center; margin-top: 4px;">
                      <span style="font-size: 12px; color: rgba(255,255,255,0.6);">Contractor:</span>
                      <span style="font-size: 12px; color: rgba(255,255,255,0.8);">${site.contractor}</span>
                    </div>
                  </div>
                </div>
              `

              const popup = new maplibregl.Popup({
                offset: 35,
                closeButton: true,
                className: 'simple-popup'
              })
                .setDOMContent(popupEl)
                .setLngLat([site.lng, site.lat])
                .addTo(map)
            })

            // Add marker to map
            new maplibregl.Marker({
              element: markerEl,
              anchor: 'center'
            })
              .setLngLat([site.lng, site.lat])
              .addTo(map)
          })
        })

        // Error handling
        map.on('error', (e: any) => {
          console.error('SimpleMapWidget: Map error:', e)
          setMapError('Failed to load map')
        })

      } catch (error) {
        console.error('SimpleMapWidget: Failed to initialize:', error)
        setMapError('Failed to initialize map')
      }
    }).catch(error => {
      console.error('SimpleMapWidget: Failed to load MapLibre:', error)
      setMapError('Failed to load map library')
    })

    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [apiKey])

  return (
    <div className="h-full relative">
      {/* Map Container */}
      <div 
        ref={mapContainer}
        className="w-full h-full rounded-2xl overflow-hidden"
        style={{ minHeight: '600px' }}
      />
      
      {/* Loading State */}
      {!mapLoaded && !mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin" />
            <p className="text-slate-300 text-sm">Loading map...</p>
          </div>
        </div>
      )}
      
      {/* Error State */}
      {mapError && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-900/50 backdrop-blur-sm rounded-2xl">
          <div className="flex flex-col items-center gap-4 text-center">
            <MapPin className="w-12 h-12 text-red-400" />
            <div>
              <p className="text-red-400 font-medium">Map Error</p>
              <p className="text-slate-400 text-sm">{mapError}</p>
            </div>
          </div>
        </div>
      )}

      {/* Hover Tooltip */}
      {hoveredSite && hoverPosition && (
        <div 
          className="fixed z-[9999] pointer-events-none"
          style={{
            left: hoverPosition.x,
            top: hoverPosition.y - 120,
            transform: 'translateX(-50%)'
          }}
        >
          <div className="bg-slate-900/95 backdrop-blur-xl border border-white/10 rounded-xl p-4 shadow-2xl min-w-[280px]">
            <div className="flex items-center gap-3 mb-3">
              <div 
                className="w-10 h-10 rounded-full flex items-center justify-center border-2"
                style={{
                  backgroundColor: `${getStatusColor(hoveredSite.status)}15`,
                  borderColor: getStatusColor(hoveredSite.status)
                }}
              >
                <div 
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: getStatusColor(hoveredSite.status) }}
                />
              </div>
              <div>
                <h3 className="text-white font-semibold text-sm">{hoveredSite.name}</h3>
                <p className="text-slate-400 text-xs">{hoveredSite.location}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Progress:</span>
                <span className="text-white font-medium">{hoveredSite.progress}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Workers:</span>
                <span className="text-cyan-400 font-medium">{hoveredSite.workers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span 
                  className="font-medium capitalize"
                  style={{ color: getStatusColor(hoveredSite.status) }}
                >
                  {hoveredSite.status}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Safety:</span>
                <span className="text-green-400 font-medium">{hoveredSite.details.safety}%</span>
              </div>
            </div>
            
            <div className="mt-3 pt-3 border-t border-white/10">
              <div className="text-xs text-slate-400">Click for detailed information</div>
            </div>
          </div>
          
          {/* Tooltip Arrow */}
          <div 
            className="absolute top-full left-1/2 transform -translate-x-1/2"
            style={{
              width: 0,
              height: 0,
              borderLeft: '8px solid transparent',
              borderRight: '8px solid transparent',
              borderTop: '8px solid rgba(15, 23, 42, 0.95)'
            }}
          />
        </div>
      )}

      {/* Map Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-slate-300">
          Sites: {bangladeshSites.slice(0, 10).length}
        </div>
        
        {mapLoaded && (
          <div className="bg-slate-900/80 backdrop-blur-sm rounded-lg px-3 py-2 text-xs text-green-400">
            ● Live
          </div>
        )}
      </div>

      {/* Global CSS Styles */}
      <style jsx global>{`
        .simple-popup .maplibregl-popup-content {
          background: transparent !important;
          padding: 0 !important;
          border-radius: 12px !important;
          box-shadow: none !important;
          max-width: 380px !important;
        }
        
        .simple-popup .maplibregl-popup-close-button {
          color: white !important;
          font-size: 20px !important;
          top: 12px !important;
          right: 12px !important;
          width: 24px !important;
          height: 24px !important;
          background: rgba(255,255,255,0.1) !important;
          border-radius: 50% !important;
          border: 1px solid rgba(255,255,255,0.2) !important;
        }
        
        .simple-popup .maplibregl-popup-close-button:hover {
          background: rgba(255,255,255,0.2) !important;
        }
        
        .simple-popup .maplibregl-popup-tip {
          border-top-color: rgba(10, 11, 30, 0.95) !important;
        }
        
        .simple-map-marker {
          cursor: pointer;
          filter: drop-shadow(0 4px 12px rgba(0,0,0,0.3));
        }
        
        @keyframes pulse {
          0%, 100% { 
            transform: scale(1); 
            opacity: 0.6; 
          }
          50% { 
            transform: scale(1.1); 
            opacity: 0.3; 
          }
        }
        
        @keyframes shimmer {
          0% { 
            transform: translateX(-100%); 
          }
          100% { 
            transform: translateX(100%); 
          }
        }
        
        .marker-container:hover .marker-main {
          transform: scale(1.15) !important;
          box-shadow: 0 8px 32px rgba(0,0,0,0.6), 0 0 0 2px rgba(59, 130, 246, 0.4) !important;
        }
      `}</style>
    </div>
  )
}