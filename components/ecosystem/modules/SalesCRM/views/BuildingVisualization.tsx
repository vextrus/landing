'use client'

import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { 
  Building2,
  Maximize2,
  RotateCw,
  ZoomIn,
  ZoomOut,
  Info,
  Home,
  Bed,
  Bath,
  Car,
  Trees,
  MapPin,
  Sun,
  Eye,
  Layers,
  ChevronUp,
  ChevronDown
} from 'lucide-react'
import { GlassCard, AnimatedButton } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface Floor {
  id: string
  floor: number
  units: number
  available: number
  sold: number
  priceRange: { min: number; max: number }
  status: 'available' | 'limited' | 'sold'
  amenities: string[]
}

interface UnitType {
  type: string
  size: number
  bedrooms: number
  bathrooms: number
  balconies: number
  price: number
  facing: string
  availability: number
}

export default function BuildingVisualization() {
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
  const [rotation, setRotation] = useState(0)
  const [zoom, setZoom] = useState(1)
  const [viewMode, setViewMode] = useState<'exterior' | 'floorplan' | 'units'>('exterior')
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const buildingData = {
    name: 'Gulshan Heights Premium',
    totalFloors: 20,
    totalUnits: 80,
    availableUnits: 23,
    location: 'Gulshan 2, Dhaka',
    completion: 'December 2025'
  }

  const floors: Floor[] = Array.from({ length: 20 }, (_, i) => {
    const floor = 20 - i
    const available = floor > 15 ? Math.floor(Math.random() * 2) : Math.floor(Math.random() * 4)
    return {
      id: `floor-${floor}`,
      floor,
      units: 4,
      available,
      sold: 4 - available,
      priceRange: {
        min: 70000000 + (floor - 1) * 5000000,
        max: 85000000 + (floor - 1) * 5000000
      },
      status: available === 0 ? 'sold' : available === 1 ? 'limited' : 'available',
      amenities: floor === 20 ? ['Rooftop Garden', 'BBQ Area', 'Sky Lounge'] : []
    }
  })

  const unitTypes: UnitType[] = [
    {
      type: 'Type A',
      size: 2200,
      bedrooms: 3,
      bathrooms: 3,
      balconies: 2,
      price: 85000000,
      facing: 'South',
      availability: 5
    },
    {
      type: 'Type B',
      size: 2500,
      bedrooms: 4,
      bathrooms: 4,
      balconies: 3,
      price: 95000000,
      facing: 'South-East',
      availability: 3
    },
    {
      type: 'Type C',
      size: 1800,
      bedrooms: 2,
      bathrooms: 2,
      balconies: 1,
      price: 70000000,
      facing: 'East',
      availability: 8
    },
    {
      type: 'Penthouse',
      size: 4500,
      bedrooms: 5,
      bathrooms: 5,
      balconies: 4,
      price: 180000000,
      facing: 'Panoramic',
      availability: 1
    }
  ]

  // 3D Building Visualization
  useEffect(() => {
    if (viewMode === 'exterior' && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const draw3DBuilding = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        const centerX = canvas.width / 2
        const centerY = canvas.height - 50
        const buildingWidth = 200 * zoom
        const floorHeight = 20 * zoom
        const perspective = 0.3
        
        // Draw building floors
        floors.forEach((floor, index) => {
          const y = centerY - (floors.length - index) * floorHeight
          const offset = (floors.length - index) * perspective * Math.sin(rotation * Math.PI / 180) * zoom
          
          // Shadow
          ctx.fillStyle = 'rgba(0,0,0,0.1)'
          ctx.fillRect(
            centerX - buildingWidth/2 + offset + 10, 
            y + 5, 
            buildingWidth, 
            floorHeight - 2
          )
          
          // Main floor
          const gradient = ctx.createLinearGradient(
            centerX - buildingWidth/2 + offset,
            y,
            centerX + buildingWidth/2 + offset,
            y
          )
          
          if (floor.status === 'sold') {
            gradient.addColorStop(0, '#dc2626')
            gradient.addColorStop(1, '#ef4444')
          } else if (floor.status === 'limited') {
            gradient.addColorStop(0, '#d97706')
            gradient.addColorStop(1, '#f59e0b')
          } else {
            gradient.addColorStop(0, '#16a34a')
            gradient.addColorStop(1, '#22c55e')
          }
          
          ctx.fillStyle = gradient
          ctx.fillRect(
            centerX - buildingWidth/2 + offset, 
            y, 
            buildingWidth, 
            floorHeight - 2
          )
          
          // 3D effect - side
          const sideGradient = ctx.createLinearGradient(
            centerX + buildingWidth/2 + offset,
            y,
            centerX + buildingWidth/2 + offset + 20 * zoom,
            y
          )
          sideGradient.addColorStop(0, 'rgba(0,0,0,0.2)')
          sideGradient.addColorStop(1, 'rgba(0,0,0,0.4)')
          
          ctx.fillStyle = sideGradient
          ctx.beginPath()
          ctx.moveTo(centerX + buildingWidth/2 + offset, y)
          ctx.lineTo(centerX + buildingWidth/2 + offset + 20 * zoom, y - 10 * zoom)
          ctx.lineTo(centerX + buildingWidth/2 + offset + 20 * zoom, y + floorHeight - 12 * zoom)
          ctx.lineTo(centerX + buildingWidth/2 + offset, y + floorHeight - 2)
          ctx.fill()
          
          // Floor number
          if (selectedFloor === floor.floor) {
            ctx.strokeStyle = '#8B5CF6'
            ctx.lineWidth = 3
            ctx.strokeRect(
              centerX - buildingWidth/2 + offset - 2, 
              y - 2, 
              buildingWidth + 4, 
              floorHeight + 2
            )
          }
          
          // Windows
          const windowsPerFloor = 8
          for (let w = 0; w < windowsPerFloor; w++) {
            const wx = centerX - buildingWidth/2 + offset + 10 + (w * (buildingWidth - 20) / windowsPerFloor)
            ctx.fillStyle = floor.available > 0 ? 'rgba(255,255,255,0.8)' : 'rgba(255,255,255,0.3)'
            ctx.fillRect(wx, y + 4, (buildingWidth - 20) / windowsPerFloor - 4, floorHeight - 10)
          }
        })
        
        // Building name
        ctx.fillStyle = '#0F172A'
        ctx.font = `bold ${16 * zoom}px Inter`
        ctx.textAlign = 'center'
        ctx.fillText(buildingData.name, centerX, centerY + 30)
      }

      draw3DBuilding()
      
      // Auto-rotate
      const rotateInterval = setInterval(() => {
        setRotation(prev => (prev + 1) % 360)
      }, 50)
      
      return () => clearInterval(rotateInterval)
    }
  }, [viewMode, selectedFloor, rotation, zoom, floors])

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">3D Property Visualization</h2>
          <p className="text-gray-400">Interactive building model with real-time availability</p>
        </div>
        
        {/* View Mode Switcher */}
        <div className="flex items-center gap-2">
          {[
            { id: 'exterior', label: 'Exterior', icon: Building2 },
            { id: 'floorplan', label: 'Floor Plans', icon: Layers },
            { id: 'units', label: 'Unit Types', icon: Home }
          ].map((view) => (
            <AnimatedButton
              key={view.id}
              variant={viewMode === view.id ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode(view.id as any)}
              className={viewMode === view.id ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25' : 'hover:bg-white/5'}
            >
              <view.icon className="w-4 h-4" />
              <span>{view.label}</span>
            </AnimatedButton>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 3D Visualization */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full" variant="accent">
            {viewMode === 'exterior' ? (
              <div className="relative">
                <canvas
                  ref={canvasRef}
                  className="w-full h-[600px] rounded-lg bg-gradient-to-b from-sky-100 to-sky-50"
                />
                
                {/* Controls */}
                <div className="absolute bottom-4 right-4 flex items-center gap-2">
                  <AnimatedButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoom(prev => Math.min(prev + 0.1, 2))}
                    className="bg-white/90 backdrop-blur-md"
                  >
                    <ZoomIn className="w-4 h-4" />
                  </AnimatedButton>
                  <AnimatedButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setZoom(prev => Math.max(prev - 0.1, 0.5))}
                    className="bg-white/90 backdrop-blur-md"
                  >
                    <ZoomOut className="w-4 h-4" />
                  </AnimatedButton>
                  <AnimatedButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setRotation(0)}
                    className="bg-white/90 backdrop-blur-md"
                  >
                    <RotateCw className="w-4 h-4" />
                  </AnimatedButton>
                </div>

                {/* Legend */}
                <div className="absolute top-4 left-4 space-y-2">
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 backdrop-blur-md">
                    <div className="w-3 h-3 bg-green-500 rounded" />
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 backdrop-blur-md">
                    <div className="w-3 h-3 bg-amber-500 rounded" />
                    <span className="text-sm">Limited</span>
                  </div>
                  <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/90 backdrop-blur-md">
                    <div className="w-3 h-3 bg-red-500 rounded" />
                    <span className="text-sm">Sold Out</span>
                  </div>
                </div>
              </div>
            ) : viewMode === 'floorplan' ? (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Interactive Floor Plans</h3>
                <div className="grid grid-cols-2 gap-4">
                  {['2 BHK', '3 BHK', '4 BHK', 'Penthouse'].map((type) => (
                    <div
                      key={type}
                      className="aspect-square rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 p-4 flex items-center justify-center cursor-pointer hover:from-blue-900 hover:to-indigo-900 transition-all group"
                    >
                      <div className="text-center">
                        <Home className="w-12 h-12 text-gray-400 group-hover:text-white mx-auto mb-2" />
                        <p className="text-white font-semibold">{type}</p>
                        <p className="text-sm text-gray-400">Click to view</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-white">Available Unit Types</h3>
                <div className="space-y-3">
                  {unitTypes.map((unit) => (
                    <div
                      key={unit.type}
                      className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all cursor-pointer"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold text-white">{unit.type}</h4>
                        <span className="text-green-400 text-sm">{unit.availability} units available</span>
                      </div>
                      
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-sm">
                        <div>
                          <p className="text-gray-400">Size</p>
                          <p className="text-white font-medium">{unit.size} sqft</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Bedrooms</p>
                          <p className="text-white font-medium">{unit.bedrooms}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Facing</p>
                          <p className="text-white font-medium">{unit.facing}</p>
                        </div>
                        <div>
                          <p className="text-gray-400">Price</p>
                          <p className="text-white font-medium">{formatBDT(unit.price)}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </GlassCard>
        </div>

        {/* Building Info & Floor Selection */}
        <div className="space-y-6">
          {/* Building Info */}
          <GlassCard className="p-6" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">{buildingData.name}</h3>
            
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <MapPin className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{buildingData.location}</span>
              </div>
              <div className="flex items-center gap-3">
                <Building2 className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{buildingData.totalFloors} Floors, {buildingData.totalUnits} Units</span>
              </div>
              <div className="flex items-center gap-3">
                <Home className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">{buildingData.availableUnits} Units Available</span>
              </div>
              <div className="flex items-center gap-3">
                <Trees className="w-5 h-5 text-gray-400" />
                <span className="text-gray-300">Completion: {buildingData.completion}</span>
              </div>
            </div>

            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-medium text-gray-400">Key Features</h4>
              <div className="flex flex-wrap gap-2">
                {['Swimming Pool', 'Gym', 'Garden', 'Security 24/7', 'Power Backup', 'Parking'].map((feature) => (
                  <span key={feature} className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300">
                    {feature}
                  </span>
                ))}
              </div>
            </div>
          </GlassCard>

          {/* Floor Selection */}
          <GlassCard className="p-6" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">Select Floor</h3>
            
            <div className="h-[400px] overflow-y-auto space-y-2">
              {floors.map((floor) => (
                <motion.div
                  key={floor.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => setSelectedFloor(floor.floor)}
                  className={`p-3 rounded-lg cursor-pointer transition-all ${
                    selectedFloor === floor.floor 
                      ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25' 
                      : 'bg-white/5 hover:bg-white/10'
                  } border border-white/10`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-white">Floor {floor.floor}</p>
                      <p className="text-sm text-gray-400">
                        {floor.available} of {floor.units} available
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-400">From</p>
                      <p className="font-semibold text-white">
                        {formatBDT(floor.priceRange.min)}
                      </p>
                    </div>
                  </div>
                  
                  {/* Availability bar */}
                  <div className="mt-2 h-1 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(floor.available / floor.units) * 100}%` }}
                      className={`h-full ${
                        floor.status === 'available' ? 'bg-green-500' :
                        floor.status === 'limited' ? 'bg-amber-500' :
                        'bg-red-500'
                      }`}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-4">
        <AnimatedButton
          variant="primary"
          size="lg"
          className="bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25"
        >
          <Eye className="w-5 h-5" />
          Schedule Site Visit
        </AnimatedButton>
        <AnimatedButton variant="ghost" size="lg" className="hover:bg-white/5">
          <Maximize2 className="w-5 h-5" />
          View in AR
        </AnimatedButton>
      </div>
    </div>
  )
}