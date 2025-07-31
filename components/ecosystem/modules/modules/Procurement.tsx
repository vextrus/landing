'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  ShoppingCart, 
  Package, 
  TrendingDown, 
  Users,
  FileCheck,
  Truck,
  AlertCircle,
  BarChart3,
  Shield,
  Clock,
  DollarSign,
  CheckSquare,
  Zap,
  Brain,
  TrendingUp,
  Calendar,
  Sparkles,
  Award,
  Star,
  ChevronUp,
  ChevronDown,
  Activity,
  AlertTriangle
} from 'lucide-react'
import { formatBDT, formatPercentage } from '../../utils/bdCurrency'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Supplier {
  id: string
  name: string
  rating: number
  deliveryRate: number
  qualityScore: number
  priceCompetitiveness: number
  location: string
  specialization: string[]
}

interface PricePrediction {
  material: string
  currentPrice: number
  predictedPrice: number
  change: number
  confidence: number
  recommendation: 'buy_now' | 'wait' | 'buy_partial'
}

export default function Procurement() {
  const [activeView, setActiveView] = useState<'dashboard' | 'suppliers' | 'predictions' | 'ai-insights'>('dashboard')
  const [selectedMaterial, setSelectedMaterial] = useState('cement')
  const [priceTimeframe, setPriceTimeframe] = useState(30)
  const [parent] = useAutoAnimate()
  const chartRef = useRef<HTMLCanvasElement>(null)
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const features = [
    {
      icon: Package,
      title: 'Smart Inventory',
      description: 'AI-powered demand forecasting and stock optimization'
    },
    {
      icon: Users,
      title: 'Vendor Management',
      description: 'Automated vendor scoring and relationship tracking'
    },
    {
      icon: FileCheck,
      title: 'Digital Approvals',
      description: 'Multi-level approval workflows with mobile support'
    },
    {
      icon: Truck,
      title: 'Delivery Tracking',
      description: 'Real-time material tracking from vendor to site'
    }
  ]

  const metrics = [
    { label: 'Active Vendors', value: '847', trend: '+45' },
    { label: 'Cost Savings', value: '15%', trend: '+3%' },
    { label: 'On-time Delivery', value: '92%', trend: '+8%' },
    { label: 'Stock Accuracy', value: '99.2%', trend: '+2%' }
  ]

  const materials = [
    { name: 'Cement (50kg bags)', monthly: 12000, unit: 'bags', price: 550, supplier: 'Shah Cement' },
    { name: 'Steel Rods (60 Grade)', monthly: 850, unit: 'tons', price: 95000, supplier: 'BSRM' },
    { name: 'Bricks (1st Class)', monthly: 450000, unit: 'pcs', price: 12, supplier: 'Mirpur Bricks' },
    { name: 'Sand (Sylhet)', monthly: 2800, unit: 'cft', price: 65, supplier: 'Local Suppliers' },
    { name: 'Stone Chips', monthly: 3200, unit: 'cft', price: 120, supplier: 'Jaflong Stones' }
  ]

  // Top suppliers data
  const suppliers: Supplier[] = [
    { id: '1', name: 'Shah Cement Ltd', rating: 4.8, deliveryRate: 96, qualityScore: 98, priceCompetitiveness: 85, location: 'Chittagong', specialization: ['Cement', 'Concrete'] },
    { id: '2', name: 'BSRM Steels', rating: 4.9, deliveryRate: 94, qualityScore: 99, priceCompetitiveness: 82, location: 'Dhaka', specialization: ['Steel', 'Rods'] },
    { id: '3', name: 'Akij Ceramics', rating: 4.6, deliveryRate: 92, qualityScore: 95, priceCompetitiveness: 90, location: 'Gazipur', specialization: ['Tiles', 'Sanitary'] },
    { id: '4', name: 'Mirpur Bricks', rating: 4.5, deliveryRate: 98, qualityScore: 94, priceCompetitiveness: 95, location: 'Mirpur', specialization: ['Bricks', 'Blocks'] },
  ]

  // AI price predictions
  const pricePredictions: PricePrediction[] = [
    { material: 'Cement (50kg)', currentPrice: 550, predictedPrice: 580, change: 5.5, confidence: 92, recommendation: 'buy_now' },
    { material: 'Steel Rods (60G)', currentPrice: 95000, predictedPrice: 92000, change: -3.2, confidence: 88, recommendation: 'wait' },
    { material: 'Bricks (1st)', currentPrice: 12, predictedPrice: 13, change: 8.3, confidence: 95, recommendation: 'buy_now' },
    { material: 'Sand (Sylhet)', currentPrice: 65, predictedPrice: 68, change: 4.6, confidence: 85, recommendation: 'buy_partial' },
  ]

  // Price trend visualization
  useEffect(() => {
    if (activeView === 'predictions' && chartRef.current) {
      const canvas = chartRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const drawPriceChart = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Generate sample price data
        const dataPoints = 30
        const basePrice = selectedMaterial === 'cement' ? 550 : selectedMaterial === 'steel' ? 95000 : 12
        const volatility = selectedMaterial === 'cement' ? 5 : selectedMaterial === 'steel' ? 1000 : 0.5
        
        ctx.strokeStyle = '#14B8A6'
        ctx.lineWidth = 2
        ctx.beginPath()
        
        for (let i = 0; i < dataPoints; i++) {
          const x = (i / (dataPoints - 1)) * canvas.width
          const randomChange = (Math.random() - 0.5) * volatility * 2
          const price = basePrice + Math.sin(i / 5) * volatility + randomChange
          const y = canvas.height - ((price - basePrice + volatility * 2) / (volatility * 4)) * canvas.height
          
          if (i === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        }
        
        ctx.stroke()
        
        // Add prediction line
        ctx.strokeStyle = '#F59E0B'
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(canvas.width * 0.8, canvas.height / 2)
        ctx.lineTo(canvas.width, canvas.height * 0.3)
        ctx.stroke()
        ctx.setLineDash([])
        
        // Add labels
        ctx.fillStyle = '#6B7280'
        ctx.font = '12px Inter'
        ctx.textAlign = 'left'
        ctx.fillText('Historical', 10, 20)
        ctx.fillStyle = '#F59E0B'
        ctx.fillText('AI Prediction', canvas.width - 80, 20)
      }

      drawPriceChart()
    }
  }, [activeView, selectedMaterial])

  return (
    <div className="space-y-8" ref={parent}>
      {/* Header with View Switcher */}
      <motion.div {...fadeInUp} className="text-center">
        <h2 className="text-3xl font-bold mb-4">Procurement Module</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Streamline material procurement with AI-driven vendor management and 
          cost optimization for construction projects
        </p>
        
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: ShoppingCart },
            { id: 'suppliers', label: 'Supplier Analysis', icon: Users },
            { id: 'predictions', label: 'Price Predictions', icon: TrendingUp },
            { id: 'ai-insights', label: 'AI Insights', icon: Brain }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id as any)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeView === view.id
                  ? 'bg-warning text-white shadow-lg'
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
            <p className="text-2xl font-bold text-warning mt-1">{metric.value}</p>
            <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
          </div>
        ))}
      </motion.div>

      {/* Material Requirements Dashboard */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">Top Materials & Suppliers</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Material</th>
                <th className="text-right py-2">Monthly Usage</th>
                <th className="text-right py-2">Unit Price</th>
                <th className="text-right py-2">Monthly Cost</th>
                <th className="text-left py-2 pl-4">Preferred Supplier</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.name} className="border-b hover:bg-gray-50">
                  <td className="py-3">{material.name}</td>
                  <td className="text-right">{material.monthly.toLocaleString()} {material.unit}</td>
                  <td className="text-right">{formatBDT(material.price)}</td>
                  <td className="text-right font-semibold">
                    {formatBDT(material.monthly * material.price)}
                  </td>
                  <td className="pl-4 text-sm text-gray-600">{material.supplier}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td colSpan={3} className="py-3">Total Monthly Procurement</td>
                <td className="text-right text-warning">
                  {formatBDT(materials.reduce((sum, m) => sum + (m.monthly * m.price), 0))}
                </td>
                <td></td>
              </tr>
            </tfoot>
          </table>
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
            <feature.icon className="w-10 h-10 text-warning mb-4" />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Procurement Workflow */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-warning/10 to-accent/10 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold mb-4">Automated Procurement Workflow</h3>
        <div className="grid md:grid-cols-6 gap-4">
          {[
            { icon: AlertCircle, label: 'Requisition', time: 'Instant' },
            { icon: BarChart3, label: 'Price Analysis', time: '< 30 min' },
            { icon: CheckSquare, label: 'Approval', time: '< 2 hrs' },
            { icon: ShoppingCart, label: 'PO Generation', time: 'Automated' },
            { icon: Truck, label: 'Delivery', time: 'Tracked' },
            { icon: FileCheck, label: 'Quality Check', time: 'On-site' }
          ].map((step, index) => (
            <div key={step.label} className="text-center">
              <div className="bg-white rounded-full p-3 w-14 h-14 mx-auto mb-2 shadow-md">
                <step.icon className="w-8 h-8 text-warning" />
              </div>
              <p className="font-medium text-sm">{step.label}</p>
              <p className="text-xs text-gray-600">{step.time}</p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Cost Optimization Dashboard */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <TrendingDown className="w-5 h-5 mr-2 text-success" />
            Cost Reduction Insights
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm">Bulk Purchase Savings</span>
              <span className="font-semibold text-success">{formatBDT(4250000)}/month</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Vendor Negotiation</span>
              <span className="font-semibold text-success">{formatBDT(2180000)}/month</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Wastage Reduction</span>
              <span className="font-semibold text-success">{formatBDT(1560000)}/month</span>
            </div>
            <div className="border-t pt-3 flex justify-between items-center">
              <span className="font-semibold">Total Savings</span>
              <span className="font-bold text-lg text-success">{formatBDT(7990000)}/month</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Shield className="w-5 h-5 mr-2 text-accent" />
            Compliance & Quality
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm">ISO Certified Vendors</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-accent h-2 rounded-full" style={{ width: '78%' }}></div>
                </div>
                <span className="text-sm font-medium">78%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Quality Test Pass Rate</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '94%' }}></div>
                </div>
                <span className="text-sm font-medium">94%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Audit Compliance</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '100%' }}></div>
                </div>
                <span className="text-sm font-medium">100%</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeView === 'dashboard' && (
          <motion.div
            key="dashboard"
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
                  <p className="text-2xl font-bold text-warning mt-1">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
                </div>
              ))}
            </div>

            {/* Material Requirements Dashboard */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Top Materials & Suppliers</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Material</th>
                      <th className="text-right py-2">Monthly Usage</th>
                      <th className="text-right py-2">Unit Price</th>
                      <th className="text-right py-2">Monthly Cost</th>
                      <th className="text-left py-2 pl-4">Preferred Supplier</th>
                    </tr>
                  </thead>
                  <tbody>
                    {materials.map((material) => (
                      <tr key={material.name} className="border-b hover:bg-gray-50">
                        <td className="py-3">{material.name}</td>
                        <td className="text-right">{material.monthly.toLocaleString()} {material.unit}</td>
                        <td className="text-right">{formatBDT(material.price)}</td>
                        <td className="text-right font-semibold">
                          {formatBDT(material.monthly * material.price)}
                        </td>
                        <td className="pl-4 text-sm text-gray-600">{material.supplier}</td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold">
                      <td colSpan={3} className="py-3">Total Monthly Procurement</td>
                      <td className="text-right text-warning">
                        {formatBDT(materials.reduce((sum, m) => sum + (m.monthly * m.price), 0))}
                      </td>
                      <td></td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Procurement Workflow */}
            <div className="bg-gradient-to-r from-warning/10 to-accent/10 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Automated Procurement Workflow</h3>
              <div className="grid md:grid-cols-6 gap-4">
                {[
                  { icon: AlertCircle, label: 'Requisition', time: 'Instant' },
                  { icon: BarChart3, label: 'Price Analysis', time: '< 30 min' },
                  { icon: CheckSquare, label: 'Approval', time: '< 2 hrs' },
                  { icon: ShoppingCart, label: 'PO Generation', time: 'Automated' },
                  { icon: Truck, label: 'Delivery', time: 'Tracked' },
                  { icon: FileCheck, label: 'Quality Check', time: 'On-site' }
                ].map((step, index) => (
                  <div key={step.label} className="text-center">
                    <div className="bg-white rounded-full p-3 w-14 h-14 mx-auto mb-2 shadow-md">
                      <step.icon className="w-8 h-8 text-warning" />
                    </div>
                    <p className="font-medium text-sm">{step.label}</p>
                    <p className="text-xs text-gray-600">{step.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'suppliers' && (
          <motion.div
            key="suppliers"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Award className="w-5 h-5 text-warning" />
                AI-Powered Supplier Comparison
              </h3>
              
              <div className="space-y-4">
                {suppliers.map((supplier, index) => (
                  <motion.div
                    key={supplier.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-lg">{supplier.name}</h4>
                        <p className="text-sm text-gray-600">{supplier.location} • {supplier.specialization.join(', ')}</p>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                        <span className="font-bold">{supplier.rating}</span>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-600">Delivery Rate</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-green-500 rounded-full"
                              style={{ width: `${supplier.deliveryRate}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{supplier.deliveryRate}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-600">Quality Score</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width: `${supplier.qualityScore}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{supplier.qualityScore}%</span>
                        </div>
                      </div>
                      
                      <div>
                        <p className="text-xs text-gray-600">Price Competitiveness</p>
                        <div className="flex items-center gap-2">
                          <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-yellow-500 rounded-full"
                              style={{ width: `${supplier.priceCompetitiveness}%` }}
                            />
                          </div>
                          <span className="text-sm font-medium">{supplier.priceCompetitiveness}%</span>
                        </div>
                      </div>
                    </div>
                    
                    {supplier.rating >= 4.8 && (
                      <div className="mt-3 flex items-center gap-2 text-sm text-green-600">
                        <Sparkles className="w-4 h-4" />
                        <span>AI Recommended Supplier</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-lg p-6">
              <h4 className="font-semibold mb-3">AI Supplier Insights</h4>
              <div className="space-y-2 text-sm">
                <p>• BSRM Steels has the highest quality score but 18% higher prices</p>
                <p>• Mirpur Bricks offers best value with 98% delivery rate</p>
                <p>• Consider multi-vendor strategy for risk mitigation</p>
                <p>• Negotiate volume discounts with Shah Cement for 5-8% savings</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'predictions' && (
          <motion.div
            key="predictions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary" />
                AI Price Predictions - Next 30 Days
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="mb-4">
                    <label className="text-sm font-medium">Select Material</label>
                    <select
                      value={selectedMaterial}
                      onChange={(e) => setSelectedMaterial(e.target.value)}
                      className="mt-1 w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    >
                      <option value="cement">Cement (50kg bags)</option>
                      <option value="steel">Steel Rods (60 Grade)</option>
                      <option value="bricks">Bricks (1st Class)</option>
                    </select>
                  </div>
                  
                  <canvas
                    ref={chartRef}
                    className="w-full h-64 rounded-lg"
                    style={{ backgroundColor: '#f9fafb' }}
                  />
                </div>
                
                <div className="space-y-3">
                  {pricePredictions.map((prediction, index) => (
                    <motion.div
                      key={prediction.material}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border rounded-lg p-4"
                    >
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-semibold">{prediction.material}</h4>
                        <span className={`text-sm px-2 py-1 rounded-full ${
                          prediction.recommendation === 'buy_now' ? 'bg-green-100 text-green-700' :
                          prediction.recommendation === 'wait' ? 'bg-yellow-100 text-yellow-700' :
                          'bg-blue-100 text-blue-700'
                        }`}>
                          {prediction.recommendation === 'buy_now' ? 'Buy Now' :
                           prediction.recommendation === 'wait' ? 'Wait' : 'Buy Partial'}
                        </span>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-gray-600">Current Price</p>
                          <p className="font-semibold">{formatBDT(prediction.currentPrice)}</p>
                        </div>
                        <div>
                          <p className="text-gray-600">Predicted Price</p>
                          <p className="font-semibold">{formatBDT(prediction.predictedPrice)}</p>
                        </div>
                      </div>
                      
                      <div className="mt-2 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          {prediction.change > 0 ? (
                            <ChevronUp className="w-4 h-4 text-red-500" />
                          ) : (
                            <ChevronDown className="w-4 h-4 text-green-500" />
                          )}
                          <span className={`text-sm font-medium ${
                            prediction.change > 0 ? 'text-red-600' : 'text-green-600'
                          }`}>
                            {Math.abs(prediction.change)}%
                          </span>
                        </div>
                        <div className="text-sm text-gray-500">
                          {prediction.confidence}% confidence
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'ai-insights' && (
          <motion.div
            key="ai-insights"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-accent" />
                AI Procurement Intelligence
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-blue-600" />
                    Immediate Actions
                  </h4>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <Activity className="w-5 h-5 text-blue-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Stock Cement Now</p>
                        <p className="text-sm text-gray-600">Prices expected to rise 5.5% due to Ramadan demand</p>
                        <p className="text-sm text-blue-600 mt-1">Potential savings: {formatBDT(1650000)}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-3">
                      <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                      <div>
                        <p className="font-medium">Switch Steel Supplier</p>
                        <p className="text-sm text-gray-600">KSRM offering 8% discount for bulk orders this week</p>
                        <p className="text-sm text-blue-600 mt-1">Potential savings: {formatBDT(2280000)}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Calendar className="w-5 h-5 text-green-600" />
                    30-Day Forecast
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <p className="font-medium">Material Shortage Risk</p>
                      <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-yellow-500 rounded-full" style={{ width: '25%' }} />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Low risk - All materials readily available</p>
                    </div>
                    
                    <div>
                      <p className="font-medium">Price Volatility Index</p>
                      <div className="mt-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-green-500 to-red-500 rounded-full" style={{ width: '65%' }} />
                      </div>
                      <p className="text-sm text-gray-600 mt-1">Medium - Monitor cement and steel prices closely</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 bg-gray-50 rounded-lg p-6">
                <h4 className="font-semibold mb-3">Strategic Recommendations</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Implement Just-in-Time Ordering</p>
                      <p className="text-xs text-gray-600">Reduce storage costs by 12% with AI-scheduled deliveries</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Diversify Supplier Base</p>
                      <p className="text-xs text-gray-600">Add 2-3 backup suppliers to mitigate supply chain risks</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Negotiate Annual Contracts</p>
                      <p className="text-xs text-gray-600">Lock in prices for stable materials to save 8-10%</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-2">
                    <CheckSquare className="w-5 h-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Quality-First Sourcing</p>
                      <p className="text-xs text-gray-600">Prioritize ISO-certified vendors to reduce rework by 15%</p>
                    </div>
                  </div>
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
            <feature.icon className="w-10 h-10 text-warning mb-4" />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Bangladesh-Specific Features */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">Bangladesh Market Integration</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border-l-4 border-warning pl-4">
            <h4 className="font-semibold">Local Vendor Network</h4>
            <p className="text-sm text-gray-600">Pre-verified suppliers from all 64 districts</p>
          </div>
          <div className="border-l-4 border-accent pl-4">
            <h4 className="font-semibold">VAT & Tax Automation</h4>
            <p className="text-sm text-gray-600">NBR compliant invoicing and challan generation</p>
          </div>
          <div className="border-l-4 border-success pl-4">
            <h4 className="font-semibold">Market Price Tracking</h4>
            <p className="text-sm text-gray-600">Real-time material rates from major markets</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}