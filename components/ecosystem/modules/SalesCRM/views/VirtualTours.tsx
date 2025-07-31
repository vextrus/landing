'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Eye,
  Camera,
  Play,
  Pause,
  RotateCw,
  Maximize2,
  Volume2,
  VolumeX,
  MapPin,
  Home,
  Bed,
  Bath,
  Square,
  Compass,
  Sun,
  Navigation,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Video,
  Image as ImageIcon,
  DollarSign,
  Calendar,
  MessageSquare,
  Mic
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface Tour {
  id: string
  property: string
  type: string
  location: string
  price: number
  size: number
  bedrooms: number
  bathrooms: number
  views: number
  duration: string
  rooms: string[]
  thumbnail: string
  featured: boolean
}

interface HotSpot {
  id: string
  x: number
  y: number
  label: string
  description: string
}

export default function VirtualTours() {
  const [selectedTour, setSelectedTour] = useState<string | null>(null)
  const [currentRoom, setCurrentRoom] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [viewMode, setViewMode] = useState<'360' | 'gallery' | 'floorplan'>('360')

  const tours: Tour[] = [
    {
      id: '1',
      property: 'Gulshan Heights Premium - Type A',
      type: '3 BHK Apartment',
      location: 'Gulshan 2, Dhaka',
      price: 85000000,
      size: 2200,
      bedrooms: 3,
      bathrooms: 3,
      views: 1234,
      duration: '5:30',
      rooms: ['Living Room', 'Master Bedroom', 'Kitchen', 'Balcony', 'Guest Room'],
      thumbnail: '🏢',
      featured: true
    },
    {
      id: '2',
      property: 'Dhanmondi Lake View - Penthouse',
      type: 'Penthouse',
      location: 'Dhanmondi, Dhaka',
      price: 180000000,
      size: 4500,
      bedrooms: 5,
      bathrooms: 5,
      views: 892,
      duration: '8:45',
      rooms: ['Grand Living', 'Master Suite', 'Kitchen', 'Terrace', 'Study', 'Guest Suite'],
      thumbnail: '🌆',
      featured: true
    },
    {
      id: '3',
      property: 'Bashundhara R/A - Villa',
      type: 'Independent Villa',
      location: 'Bashundhara R/A, Dhaka',
      price: 250000000,
      size: 5500,
      bedrooms: 6,
      bathrooms: 7,
      views: 567,
      duration: '10:20',
      rooms: ['Entrance', 'Living Area', 'Dining', 'Kitchen', 'Garden', 'Pool Area'],
      thumbnail: '🏡',
      featured: false
    }
  ]

  const hotspots: HotSpot[] = [
    { id: '1', x: 30, y: 40, label: 'Italian Marble', description: 'Premium imported marble flooring' },
    { id: '2', x: 60, y: 30, label: 'Smart Lighting', description: 'Voice-controlled LED system' },
    { id: '3', x: 45, y: 60, label: 'City View', description: 'Panoramic view of Gulshan Lake' },
    { id: '4', x: 75, y: 50, label: 'Premium Fixtures', description: 'European bathroom fittings' }
  ]

  const selectedTourData = tours.find(t => t.id === selectedTour)

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Virtual Property Tours</h2>
          <p className="text-gray-400">360° immersive walkthroughs with AI-guided narration</p>
        </div>
        
        <div className="flex items-center gap-2">
          <AnimatedButton variant="ghost" size="sm">
            <Video className="w-4 h-4" />
            <span>Upload Tour</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Sparkles className="w-4 h-4" />
            <span>AI Narration</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Featured Tours */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Featured Virtual Tours</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {tours.map((tour) => (
            <motion.div
              key={tour.id}
              whileHover={{ y: -5 }}
              onClick={() => setSelectedTour(tour.id)}
            >
              <GlassCard className="p-6 cursor-pointer group" variant="accent" hover>
                <div className="relative mb-4">
                  {/* Thumbnail */}
                  <div className="aspect-video rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center text-6xl">
                    {tour.thumbnail}
                  </div>
                  
                  {/* Play button overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="p-4 rounded-full bg-white/20 backdrop-blur-md">
                      <Play className="w-8 h-8 text-white" fill="white" />
                    </div>
                  </div>
                  
                  {/* Duration */}
                  <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-xs text-white">
                    {tour.duration}
                  </div>
                  
                  {/* Featured badge */}
                  {tour.featured && (
                    <div className="absolute top-2 left-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-xs font-medium text-white">
                      Featured
                    </div>
                  )}
                </div>

                <h4 className="font-semibold text-white mb-2">{tour.property}</h4>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <MapPin className="w-4 h-4" />
                    <span>{tour.location}</span>
                  </div>
                  
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <Bed className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{tour.bedrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Bath className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{tour.bathrooms}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Square className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-300">{tour.size} sqft</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between pt-2">
                    <p className="text-xl font-bold text-white">{formatBDT(tour.price)}</p>
                    <div className="flex items-center gap-1 text-gray-400">
                      <Eye className="w-4 h-4" />
                      <span className="text-xs">{tour.views} views</span>
                    </div>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Virtual Tour Player */}
      <AnimatePresence>
        {selectedTour && selectedTourData && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <GlassCard className="p-6" variant="accent">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* 360° Viewer */}
                <div className="lg:col-span-2">
                  <div className="relative aspect-video rounded-lg bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    {/* Mock 360 view */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center">
                        <Camera className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                        <p className="text-gray-400">360° View Loading...</p>
                        <p className="text-sm text-gray-500 mt-2">Drag to look around</p>
                      </div>
                    </div>
                    
                    {/* Hotspots */}
                    {viewMode === '360' && hotspots.map((hotspot) => (
                      <motion.div
                        key={hotspot.id}
                        className="absolute group"
                        style={{ left: `${hotspot.x}%`, top: `${hotspot.y}%` }}
                        whileHover={{ scale: 1.2 }}
                      >
                        <div className="relative">
                          <div className="w-3 h-3 bg-white rounded-full animate-pulse" />
                          <div className="absolute w-8 h-8 -inset-2.5 border-2 border-white rounded-full animate-ping" />
                          
                          {/* Tooltip */}
                          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                            <div className="bg-black/90 text-white text-xs rounded-lg px-3 py-2 whitespace-nowrap">
                              <p className="font-medium">{hotspot.label}</p>
                              <p className="text-gray-300">{hotspot.description}</p>
                            </div>
                            <div className="w-2 h-2 bg-black/90 rotate-45 absolute -bottom-1 left-1/2 -translate-x-1/2" />
                          </div>
                        </div>
                      </motion.div>
                    ))}
                    
                    {/* Controls */}
                    <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <AnimatedButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="bg-black/70 backdrop-blur-md text-white"
                        >
                          {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                        </AnimatedButton>
                        <AnimatedButton
                          variant="ghost"
                          size="sm"
                          onClick={() => setIsMuted(!isMuted)}
                          className="bg-black/70 backdrop-blur-md text-white"
                        >
                          {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                        </AnimatedButton>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <AnimatedButton
                          variant="ghost"
                          size="sm"
                          className="bg-black/70 backdrop-blur-md text-white"
                        >
                          <RotateCw className="w-4 h-4" />
                        </AnimatedButton>
                        <AnimatedButton
                          variant="ghost"
                          size="sm"
                          className="bg-black/70 backdrop-blur-md text-white"
                        >
                          <Maximize2 className="w-4 h-4" />
                        </AnimatedButton>
                      </div>
                    </div>
                    
                    {/* Navigation arrows */}
                    <button className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-black/80 transition-colors">
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/70 backdrop-blur-md text-white hover:bg-black/80 transition-colors">
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </div>
                  
                  {/* Room Navigation */}
                  <div className="mt-4 flex items-center gap-2 overflow-x-auto">
                    {selectedTourData.rooms.map((room, index) => (
                      <AnimatedButton
                        key={room}
                        variant={currentRoom === index ? 'primary' : 'ghost'}
                        size="sm"
                        onClick={() => setCurrentRoom(index)}
                        className={currentRoom === index ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25' : 'hover:bg-white/5'}
                      >
                        {room}
                      </AnimatedButton>
                    ))}
                  </div>
                </div>

                {/* Tour Info */}
                <div className="space-y-6">
                  {/* Property Details */}
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-4">{selectedTourData.property}</h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <Home className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-300">Type</span>
                        </div>
                        <span className="text-white font-medium">{selectedTourData.type}</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <Square className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-300">Size</span>
                        </div>
                        <span className="text-white font-medium">{selectedTourData.size} sqft</span>
                      </div>
                      
                      <div className="flex items-center justify-between p-3 rounded-lg bg-white/5 backdrop-blur-md">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-5 h-5 text-gray-400" />
                          <span className="text-gray-300">Price</span>
                        </div>
                        <span className="text-white font-medium">{formatBDT(selectedTourData.price)}</span>
                      </div>
                    </div>
                  </div>

                  {/* View Mode Switcher */}
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-3">View Mode</h4>
                    <div className="space-y-2">
                      {[
                        { id: '360', label: '360° Tour', icon: Camera },
                        { id: 'gallery', label: 'Photo Gallery', icon: ImageIcon },
                        { id: 'floorplan', label: 'Floor Plan', icon: Square }
                      ].map((mode) => (
                        <button
                          key={mode.id}
                          onClick={() => setViewMode(mode.id as any)}
                          className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
                            viewMode === mode.id 
                              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25 text-white' 
                              : 'bg-white/5 text-gray-300 hover:bg-white/10'
                          }`}
                        >
                          <mode.icon className="w-5 h-5" />
                          <span>{mode.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="space-y-3">
                    <AnimatedButton
                      variant="primary"
                      className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 shadow-lg shadow-purple-500/25"
                    >
                      <Calendar className="w-4 h-4" />
                      Schedule Physical Visit
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" className="w-full hover:bg-white/5">
                      <MessageSquare className="w-4 h-4" />
                      Chat with Agent
                    </AnimatedButton>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      {/* AI Tour Guide */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Tour Guide</h3>
            <p className="text-gray-300 mb-4">
              Experience properties with our AI-powered virtual guide. Get instant answers about amenities, 
              pricing, and availability in Bengali or English. Voice commands supported!
            </p>
            <div className="flex items-center gap-4">
              <AnimatedButton variant="ghost" size="sm">
                <Mic className="w-4 h-4" />
                <span>Start Voice Tour</span>
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="sm">
                <Navigation className="w-4 h-4" />
                <span>AR Navigation</span>
              </AnimatedButton>
            </div>
          </div>
        </div>
      </GlassCard>
    </div>
  )
}