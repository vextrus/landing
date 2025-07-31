'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  Users, 
  Target, 
  TrendingUp, 
  Building2,
  Phone,
  Calendar,
  DollarSign,
  ChartBar,
  MessageSquare,
  Mail,
  Clock,
  CheckCircle2,
  Smartphone,
  Home,
  Layers,
  Eye,
  Map as MapIcon,
  Video,
  Star,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  X,
  Camera
} from 'lucide-react'
import { formatBDT } from '../../utils/bdCurrency'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Floor {
  id: string
  floor: number
  units: number
  available: number
  priceRange: { min: number; max: number }
  status: 'available' | 'limited' | 'sold'
}

interface Lead {
  id: string
  name: string
  phone: string
  interested: string[]
  budget: number
  status: 'hot' | 'warm' | 'cold'
  lastContact: string
  source: string
}

export default function SalesCRM() {
  const [activeView, setActiveView] = useState<'pipeline' | 'building' | 'tour' | 'whatsapp'>('pipeline')
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null)
  const [tourStep, setTourStep] = useState(0)
  const [buildingRotation, setBuildingRotation] = useState(0)
  const [parent] = useAutoAnimate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const features = [
    {
      icon: Users,
      title: 'Lead Intelligence',
      description: 'AI-powered lead scoring and qualification'
    },
    {
      icon: Building2,
      title: 'Property Matching',
      description: 'Smart buyer-property recommendation engine'
    },
    {
      icon: Phone,
      title: 'Automated Outreach',
      description: 'Multi-channel communication automation'
    },
    {
      icon: Calendar,
      title: 'Site Visit Scheduler',
      description: 'Intelligent appointment management'
    }
  ]

  const metrics = [
    { label: 'Active Leads', value: '3,421', trend: '+23%' },
    { label: 'Conversion Rate', value: '68%', trend: '+15%' },
    { label: 'Avg Deal Size', value: formatBDT(85000000), trend: '+12%' },
    { label: 'Sales Cycle', value: '45 days', trend: '-20%' }
  ]

  const pipeline = [
    { stage: 'Inquiry', count: 847, value: formatBDT(2541000000) },
    { stage: 'Qualified', count: 423, value: formatBDT(1692000000) },
    { stage: 'Site Visit', count: 312, value: formatBDT(1248000000) },
    { stage: 'Negotiation', count: 156, value: formatBDT(624000000) },
    { stage: 'Booking', count: 89, value: formatBDT(356000000) }
  ]

  // Building floors data
  const floors: Floor[] = [
    { id: '1', floor: 20, units: 4, available: 1, priceRange: { min: 85000000, max: 120000000 }, status: 'limited' },
    { id: '2', floor: 19, units: 4, available: 0, priceRange: { min: 80000000, max: 115000000 }, status: 'sold' },
    { id: '3', floor: 18, units: 4, available: 2, priceRange: { min: 80000000, max: 115000000 }, status: 'available' },
    { id: '4', floor: 17, units: 4, available: 3, priceRange: { min: 75000000, max: 110000000 }, status: 'available' },
    { id: '5', floor: 16, units: 4, available: 0, priceRange: { min: 75000000, max: 110000000 }, status: 'sold' },
    { id: '6', floor: 15, units: 4, available: 1, priceRange: { min: 70000000, max: 105000000 }, status: 'limited' },
  ]

  // Hot leads
  const hotLeads: Lead[] = [
    { id: '1', name: 'Rashid Ahmed', phone: '+8801712345678', interested: ['3 BHK', 'South Facing'], budget: 90000000, status: 'hot', lastContact: '2 hours ago', source: 'Facebook' },
    { id: '2', name: 'Fatima Begum', phone: '+8801823456789', interested: ['2 BHK', 'Corner Unit'], budget: 75000000, status: 'warm', lastContact: '1 day ago', source: 'WhatsApp' },
    { id: '3', name: 'Karim Chowdhury', phone: '+8801934567890', interested: ['4 BHK', 'Top Floor'], budget: 120000000, status: 'hot', lastContact: '5 mins ago', source: 'Direct Call' },
  ]

  // Virtual tour steps
  const tourSteps = [
    { title: 'Grand Entrance', description: 'Luxurious double-height lobby with Italian marble', image: '🏛️' },
    { title: 'Living Space', description: 'Spacious living with panoramic city views', image: '🛋️' },
    { title: 'Master Bedroom', description: 'En-suite master bedroom with walk-in closet', image: '🛏️' },
    { title: 'Kitchen', description: 'Modular kitchen with European appliances', image: '🍳' },
    { title: 'Balcony View', description: 'Premium view of Gulshan Lake and skyline', image: '🌆' },
  ]

  // 3D Building visualization
  useEffect(() => {
    if (activeView === 'building' && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const draw3DBuilding = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        const centerX = canvas.width / 2
        const centerY = canvas.height - 50
        const buildingWidth = 200
        const floorHeight = 25
        const perspective = 0.3
        
        // Draw building
        floors.forEach((floor, index) => {
          const y = centerY - (floors.length - index) * floorHeight
          const offset = (floors.length - index) * perspective * Math.sin(buildingRotation * Math.PI / 180)
          
          // Floor color based on availability
          ctx.fillStyle = floor.status === 'sold' ? '#ef4444' : 
                         floor.status === 'limited' ? '#f59e0b' : '#22c55e'
          
          // Main floor rectangle
          ctx.fillRect(
            centerX - buildingWidth/2 + offset, 
            y, 
            buildingWidth, 
            floorHeight - 2
          )
          
          // 3D effect - side
          ctx.fillStyle = floor.status === 'sold' ? '#dc2626' : 
                         floor.status === 'limited' ? '#d97706' : '#16a34a'
          ctx.beginPath()
          ctx.moveTo(centerX + buildingWidth/2 + offset, y)
          ctx.lineTo(centerX + buildingWidth/2 + offset + 20, y - 10)
          ctx.lineTo(centerX + buildingWidth/2 + offset + 20, y + floorHeight - 12)
          ctx.lineTo(centerX + buildingWidth/2 + offset, y + floorHeight - 2)
          ctx.fill()
          
          // Floor number
          ctx.fillStyle = 'white'
          ctx.font = 'bold 12px Inter'
          ctx.textAlign = 'center'
          ctx.fillText(`${floor.floor}F`, centerX + offset, y + floorHeight/2 + 4)
          
          // Highlight selected floor
          if (selectedFloor === floor.floor) {
            ctx.strokeStyle = '#0F172A'
            ctx.lineWidth = 3
            ctx.strokeRect(
              centerX - buildingWidth/2 + offset - 2, 
              y - 2, 
              buildingWidth + 4, 
              floorHeight + 2
            )
          }
        })
        
        // Building name
        ctx.fillStyle = '#0F172A'
        ctx.font = 'bold 20px Inter'
        ctx.textAlign = 'center'
        ctx.fillText('Vextrus Tower', centerX, centerY + 30)
      }

      const animationFrame = requestAnimationFrame(function animate() {
        draw3DBuilding()
        setBuildingRotation(prev => (prev + 0.5) % 360)
        requestAnimationFrame(animate)
      })

      return () => cancelAnimationFrame(animationFrame)
    }
  }, [activeView, selectedFloor, buildingRotation])

  return (
    <div className="space-y-8" ref={parent}>
      {/* Header with View Switcher */}
      <motion.div {...fadeInUp} className="text-center">
        <h2 className="text-3xl font-bold mb-4">Sales & CRM Module</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Transform your sales process with AI-driven customer relationship management 
          designed for Bangladesh's real estate market
        </p>
        
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'pipeline', label: 'Sales Pipeline', icon: TrendingUp },
            { id: 'building', label: '3D Building View', icon: Building2 },
            { id: 'tour', label: 'Virtual Tour', icon: Camera },
            { id: 'whatsapp', label: 'WhatsApp CRM', icon: MessageCircle }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id as any)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeView === view.id
                  ? 'bg-success text-white shadow-lg'
                  : 'bg-white text-gray-600 hover:bg-gray-50'
              }`}
            >
              <view.icon className="w-4 h-4" />
              <span>{view.label}</span>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Key Metrics */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.1 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {metrics.map((metric) => (
          <div key={metric.label} className="bg-white rounded-lg p-4 shadow-md">
            <p className="text-sm text-gray-600">{metric.label}</p>
            <p className="text-2xl font-bold text-success mt-1">{metric.value}</p>
            <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
          </div>
        ))}
      </motion.div>

      {/* Sales Pipeline Visualization */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">Live Sales Pipeline</h3>
        <div className="space-y-4">
          {pipeline.map((stage, index) => (
            <div key={stage.stage} className="relative">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{stage.stage}</span>
                <div className="text-right">
                  <span className="text-sm text-gray-600">{stage.count} leads</span>
                  <span className="ml-3 font-semibold">{stage.value}</span>
                </div>
              </div>
              <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-success to-accent rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(stage.count / pipeline[0].count) * 100}%` }}
                  transition={{ duration: 1, delay: index * 0.1 }}
                />
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Features Grid */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {features.map((feature) => (
          <div key={feature.title} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <feature.icon className="w-10 h-10 text-success mb-4" />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Customer Journey Map */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-success/10 to-accent/10 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold mb-4">AI-Powered Customer Journey</h3>
        <div className="grid md:grid-cols-5 gap-4">
          {[
            { icon: MessageSquare, label: 'First Contact', time: '< 1 min' },
            { icon: Target, label: 'Qualification', time: '5 mins' },
            { icon: Calendar, label: 'Site Visit', time: '2 days' },
            { icon: DollarSign, label: 'Negotiation', time: '7 days' },
            { icon: CheckCircle2, label: 'Booking', time: '14 days' }
          ].map((step, index) => (
            <div key={step.label} className="text-center">
              <div className="bg-white rounded-full p-4 w-16 h-16 mx-auto mb-2 shadow-md">
                <step.icon className="w-8 h-8 text-success" />
              </div>
              <p className="font-medium text-sm">{step.label}</p>
              <p className="text-xs text-gray-600">{step.time}</p>
              {index < 4 && (
                <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-success to-accent" />
              )}
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeView === 'pipeline' && (
          <motion.div
            key="pipeline"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {metrics.map((metric) => (
                <div key={metric.label} className="bg-white rounded-lg p-4 shadow-md">
                  <p className="text-sm text-gray-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-success mt-1">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
                </div>
              ))}
            </div>

            {/* Sales Pipeline Visualization */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Live Sales Pipeline</h3>
              <div className="space-y-4">
                {pipeline.map((stage, index) => (
                  <div key={stage.stage} className="relative">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{stage.stage}</span>
                      <div className="text-right">
                        <span className="text-sm text-gray-600">{stage.count} leads</span>
                        <span className="ml-3 font-semibold">{stage.value}</span>
                      </div>
                    </div>
                    <div className="h-8 bg-gray-200 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-success to-accent rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${(stage.count / pipeline[0].count) * 100}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Hot Leads */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                <Users className="w-5 h-5 text-red-500" />
                Hot Leads Requiring Attention
              </h3>
              <div className="space-y-3">
                {hotLeads.map((lead) => (
                  <div key={lead.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="font-semibold">{lead.name}</h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${
                          lead.status === 'hot' ? 'bg-red-100 text-red-600' :
                          lead.status === 'warm' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          {lead.status.toUpperCase()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600">{lead.phone} • {lead.source}</p>
                      <p className="text-sm text-gray-500">Looking for: {lead.interested.join(', ')}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">{formatBDT(lead.budget)}</p>
                      <p className="text-xs text-gray-500">{lead.lastContact}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'building' && (
          <motion.div
            key="building"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-success" />
              Interactive 3D Building Model - Vextrus Tower, Gulshan
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <canvas
                  ref={canvasRef}
                  className="w-full h-96 rounded-lg"
                  style={{ backgroundColor: '#f3f4f6' }}
                  onClick={(e) => {
                    const rect = canvasRef.current?.getBoundingClientRect()
                    if (rect) {
                      const y = e.clientY - rect.top
                      const floorIndex = Math.floor((rect.height - 50 - y) / 25)
                      if (floorIndex >= 0 && floorIndex < floors.length) {
                        setSelectedFloor(floors[floors.length - 1 - floorIndex].floor)
                      }
                    }
                  }}
                />
                
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-500 rounded" />
                    <span className="text-sm">Available</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-yellow-500 rounded" />
                    <span className="text-sm">Limited</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-500 rounded" />
                    <span className="text-sm">Sold Out</span>
                  </div>
                </div>
              </div>
              
              <div>
                {selectedFloor ? (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="space-y-4"
                  >
                    <h4 className="text-lg font-bold">Floor {selectedFloor} Details</h4>
                    
                    {floors.find(f => f.floor === selectedFloor) && (
                      <div className="space-y-3">
                        <div className="p-4 bg-gray-50 rounded-lg">
                          <p className="text-sm text-gray-600">Total Units</p>
                          <p className="text-xl font-bold">{floors.find(f => f.floor === selectedFloor)!.units}</p>
                        </div>
                        
                        <div className="p-4 bg-green-50 rounded-lg">
                          <p className="text-sm text-gray-600">Available Units</p>
                          <p className="text-xl font-bold text-green-600">
                            {floors.find(f => f.floor === selectedFloor)!.available}
                          </p>
                        </div>
                        
                        <div className="p-4 bg-blue-50 rounded-lg">
                          <p className="text-sm text-gray-600">Price Range</p>
                          <p className="text-lg font-bold text-blue-600">
                            {formatBDT(floors.find(f => f.floor === selectedFloor)!.priceRange.min)} - 
                            {formatBDT(floors.find(f => f.floor === selectedFloor)!.priceRange.max)}
                          </p>
                        </div>
                        
                        <button className="w-full bg-success text-white py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                          <Calendar className="w-5 h-5" />
                          Schedule Site Visit
                        </button>
                      </div>
                    )}
                  </motion.div>
                ) : (
                  <div className="h-full flex items-center justify-center text-gray-400">
                    <div className="text-center">
                      <Layers className="w-16 h-16 mx-auto mb-4" />
                      <p>Click on a floor to see details</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'tour' && (
          <motion.div
            key="tour"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-primary" />
              360° Virtual Site Tour
            </h3>
            
            <div className="relative bg-gray-100 rounded-xl overflow-hidden" style={{ height: '400px' }}>
              <div className="absolute inset-0 flex items-center justify-center text-6xl">
                {tourSteps[tourStep].image}
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                <h4 className="text-white text-2xl font-bold mb-2">{tourSteps[tourStep].title}</h4>
                <p className="text-white/90">{tourSteps[tourStep].description}</p>
              </div>
              
              <button
                onClick={() => setTourStep(prev => Math.max(0, prev - 1))}
                className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                disabled={tourStep === 0}
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              
              <button
                onClick={() => setTourStep(prev => Math.min(tourSteps.length - 1, prev + 1))}
                className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white p-2 rounded-full shadow-lg transition-colors"
                disabled={tourStep === tourSteps.length - 1}
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>
            
            <div className="mt-6 flex justify-center gap-2">
              {tourSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setTourStep(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === tourStep ? 'w-8 bg-primary' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
            
            <div className="mt-6 grid md:grid-cols-2 gap-4">
              <button className="bg-success text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2">
                <Video className="w-5 h-5" />
                Live Video Call Tour
              </button>
              <button className="bg-primary text-white py-3 px-6 rounded-lg hover:bg-blue-900 transition-colors flex items-center justify-center gap-2">
                <MapIcon className="w-5 h-5" />
                View on Map
              </button>
            </div>
          </motion.div>
        )}

        {activeView === 'whatsapp' && (
          <motion.div
            key="whatsapp"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <MessageCircle className="w-5 h-5 text-green-600" />
              WhatsApp Business Integration
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="bg-green-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Automated Responses</h4>
                  <div className="space-y-2">
                    {[
                      'Price inquiry → Instant price list',
                      'Location query → Google Maps link',
                      'Brochure request → PDF auto-send',
                      'Site visit → Calendar booking link'
                    ].map((item) => (
                      <div key={item} className="flex items-center gap-2 text-sm">
                        <Check className="w-4 h-4 text-green-600" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="bg-blue-50 rounded-lg p-4">
                  <h4 className="font-semibold mb-3">Smart Lead Qualification</h4>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Budget Analysis</span>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">AI Powered</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Interest Level Detection</span>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">AI Powered</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm">Follow-up Scheduling</span>
                      <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded-full">Automated</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h4 className="font-semibold mb-3">Recent WhatsApp Conversations</h4>
                <div className="space-y-3 max-h-64 overflow-y-auto">
                  {[
                    { name: 'Tanvir Rahman', message: 'What is the price for 3 BHK?', time: '2 mins ago', status: 'replied' },
                    { name: 'Nusrat Jahan', message: 'Can I visit this weekend?', time: '5 mins ago', status: 'pending' },
                    { name: 'Imran Hossain', message: 'Please send floor plan', time: '12 mins ago', status: 'replied' },
                    { name: 'Sabrina Akter', message: 'Is EMI available?', time: '18 mins ago', status: 'replied' },
                  ].map((chat) => (
                    <div key={chat.name} className="flex items-center justify-between p-3 bg-white rounded-lg">
                      <div>
                        <p className="font-medium text-sm">{chat.name}</p>
                        <p className="text-xs text-gray-600">{chat.message}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-gray-500">{chat.time}</p>
                        <p className={`text-xs ${
                          chat.status === 'replied' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {chat.status}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="mt-6 bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h5 className="font-semibold">WhatsApp Business Performance</h5>
                  <p className="text-sm text-gray-600">Last 30 days</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-green-600">3,847</p>
                  <p className="text-sm text-gray-600">Messages handled</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Features Grid */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.3 }}
        className="grid md:grid-cols-2 gap-6"
      >
        {features.map((feature) => (
          <div key={feature.title} className="bg-gradient-to-br from-gray-50 to-white rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
            <feature.icon className="w-10 h-10 text-success mb-4" />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Bangladesh-Specific Features */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">Built for Bangladesh</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border-l-4 border-success pl-4">
            <h4 className="font-semibold">Multi-Language Support</h4>
            <p className="text-sm text-gray-600">Bengali and English interface for wider accessibility</p>
          </div>
          <div className="border-l-4 border-accent pl-4">
            <h4 className="font-semibold">Local Payment Plans</h4>
            <p className="text-sm text-gray-600">EMI calculators with local bank integrations</p>
          </div>
          <div className="border-l-4 border-warning pl-4">
            <h4 className="font-semibold">Document Templates</h4>
            <p className="text-sm text-gray-600">Pre-built contracts compliant with Bangladesh law</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}