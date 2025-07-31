'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  UserCheck, 
  Users, 
  Award, 
  Clock,
  Calendar,
  DollarSign,
  TrendingUp,
  Shield,
  Smartphone,
  FileText,
  Activity,
  BarChart3,
  Map as MapIcon,
  Thermometer,
  Heart,
  AlertTriangle,
  CheckCircle,
  Brain,
  Zap,
  UserPlus,
  MessageSquare,
  HardHat
} from 'lucide-react'
import { formatBDT } from '../../utils/bdCurrency'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface SiteData {
  id: string
  name: string
  location: string
  workers: number
  productivity: number
  safety: number
  position: { x: number; y: number }
}

interface WorkerAlert {
  id: string
  type: 'health' | 'safety' | 'attendance' | 'performance'
  worker: string
  site: string
  message: string
  severity: 'low' | 'medium' | 'high'
  time: string
}

export default function HRWorkforce() {
  const [activeView, setActiveView] = useState<'dashboard' | 'heatmap' | 'alerts' | 'analytics'>('dashboard')
  const [selectedSite, setSelectedSite] = useState<string | null>(null)
  const [parent] = useAutoAnimate()
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const alertIdCounter = useRef(1)
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const features = [
    {
      icon: Smartphone,
      title: 'Mobile Workforce App',
      description: 'Bengali/English app for field workers with offline support'
    },
    {
      icon: Clock,
      title: 'Biometric Attendance',
      description: 'Site-based attendance with geo-fencing and face recognition'
    },
    {
      icon: Award,
      title: 'Skills Management',
      description: 'Digital skill cards and certification tracking'
    },
    {
      icon: Shield,
      title: 'Safety Compliance',
      description: 'Real-time safety monitoring and incident reporting'
    }
  ]

  const metrics = [
    { label: 'Active Workers', value: '12,847', trend: '+523' },
    { label: 'Productivity', value: '+30%', trend: 'Improved' },
    { label: 'Safety Score', value: '98.5%', trend: '+2.3%' },
    { label: 'Retention Rate', value: '85%', trend: '+12%' }
  ]

  const workforce = [
    { category: 'Engineers', count: 234, avgSalary: 85000, certified: '100%' },
    { category: 'Site Supervisors', count: 156, avgSalary: 45000, certified: '95%' },
    { category: 'Mason Workers', count: 3421, avgSalary: 18000, certified: '78%' },
    { category: 'Electricians', count: 892, avgSalary: 22000, certified: '82%' },
    { category: 'Plumbers', count: 654, avgSalary: 20000, certified: '80%' },
    { category: 'Helpers', count: 7490, avgSalary: 12000, certified: '45%' }
  ]

  // Site data for heat map
  const sites: SiteData[] = [
    { id: '1', name: 'Gulshan Tower', location: 'Gulshan-2', workers: 156, productivity: 92, safety: 98, position: { x: 60, y: 30 } },
    { id: '2', name: 'Dhanmondi Plaza', location: 'Dhanmondi-27', workers: 234, productivity: 88, safety: 95, position: { x: 40, y: 50 } },
    { id: '3', name: 'Mirpur Complex', location: 'Mirpur-10', workers: 312, productivity: 85, safety: 93, position: { x: 30, y: 25 } },
    { id: '4', name: 'Uttara Heights', location: 'Uttara-7', workers: 189, productivity: 90, safety: 97, position: { x: 50, y: 15 } },
    { id: '5', name: 'Banani Square', location: 'Banani-11', workers: 267, productivity: 87, safety: 96, position: { x: 55, y: 35 } },
    { id: '6', name: 'Bashundhara City', location: 'Panthapath', workers: 423, productivity: 93, safety: 94, position: { x: 45, y: 45 } },
  ]

  // Worker alerts
  const [alerts, setAlerts] = useState<WorkerAlert[]>([
    { id: '1', type: 'health', worker: 'Md. Rahim', site: 'Gulshan Tower', message: 'High temperature detected (38.2°C)', severity: 'high', time: '5 mins ago' },
    { id: '2', type: 'safety', worker: 'Abdul Karim', site: 'Mirpur Complex', message: 'Not wearing safety helmet', severity: 'medium', time: '12 mins ago' },
    { id: '3', type: 'attendance', worker: 'Nasir Ahmed', site: 'Dhanmondi Plaza', message: 'Late check-in (9:45 AM)', severity: 'low', time: '2 hours ago' },
    { id: '4', type: 'performance', worker: 'Team B', site: 'Uttara Heights', message: 'Exceeded daily target by 20%', severity: 'low', time: '1 hour ago' },
  ])

  // Workforce heat map visualization
  useEffect(() => {
    if (activeView === 'heatmap' && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const drawHeatMap = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw Dhaka map outline
        ctx.strokeStyle = '#e5e7eb'
        ctx.lineWidth = 2
        ctx.beginPath()
        ctx.roundRect(20, 20, canvas.width - 40, canvas.height - 40, 10)
        ctx.stroke()
        
        // Draw sites
        sites.forEach(site => {
          const x = (site.position.x / 100) * (canvas.width - 80) + 40
          const y = (site.position.y / 100) * (canvas.height - 80) + 40
          
          // Heat intensity based on worker count
          const intensity = Math.min(site.workers / 500, 1)
          const radius = 20 + (site.workers / 20)
          
          // Create gradient
          const gradient = ctx.createRadialGradient(x, y, 0, x, y, radius)
          const hue = site.productivity > 90 ? 120 : site.productivity > 85 ? 60 : 0
          gradient.addColorStop(0, `hsla(${hue}, 70%, 50%, ${intensity})`)
          gradient.addColorStop(1, `hsla(${hue}, 70%, 50%, 0)`)
          
          ctx.fillStyle = gradient
          ctx.beginPath()
          ctx.arc(x, y, radius, 0, Math.PI * 2)
          ctx.fill()
          
          // Site marker
          ctx.fillStyle = '#1f2937'
          ctx.beginPath()
          ctx.arc(x, y, 5, 0, Math.PI * 2)
          ctx.fill()
          
          // Site name
          ctx.fillStyle = '#374151'
          ctx.font = '12px Inter'
          ctx.textAlign = 'center'
          ctx.fillText(site.name, x, y - radius - 5)
        })
        
        // Draw legend
        ctx.fillStyle = '#6b7280'
        ctx.font = '11px Inter'
        ctx.textAlign = 'left'
        ctx.fillText('Worker Density & Productivity Heat Map', 20, canvas.height - 10)
      }

      drawHeatMap()
    }
  }, [activeView, sites])

  // Simulate real-time alerts
  useEffect(() => {
    if (activeView === 'alerts') {
      const interval = setInterval(() => {
        const types: WorkerAlert['type'][] = ['health', 'safety', 'attendance', 'performance']
        const severities: WorkerAlert['severity'][] = ['low', 'medium', 'high']
        const workers = ['Shahid Islam', 'Rafiq Mia', 'Jamal Uddin', 'Sohel Rana', 'Team A', 'Team C']
        const messages = [
          'Temperature alert: Feeling unwell',
          'PPE compliance issue detected',
          'Outstanding performance recorded',
          'Break time exceeded',
          'Safety protocol followed excellently'
        ]
        
        const newAlert: WorkerAlert = {
          id: `alert-${alertIdCounter.current++}`,
          type: types[Math.floor(Math.random() * types.length)],
          worker: workers[Math.floor(Math.random() * workers.length)],
          site: sites[Math.floor(Math.random() * sites.length)].name,
          message: messages[Math.floor(Math.random() * messages.length)],
          severity: severities[Math.floor(Math.random() * severities.length)],
          time: 'just now'
        }
        
        setAlerts(prev => [newAlert, ...prev.slice(0, 9)])
      }, 10000)
      
      return () => clearInterval(interval)
    }
  }, [activeView])

  return (
    <div className="space-y-8" ref={parent}>
      {/* Header with View Switcher */}
      <motion.div {...fadeInUp} className="text-center">
        <h2 className="text-3xl font-bold mb-4">HR & Workforce Module</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Empower 12,000+ construction workers with digital tools, 
          training, and fair wage management
        </p>
        
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'heatmap', label: 'Workforce Heat Map', icon: MapIcon },
            { id: 'alerts', label: 'Live Alerts', icon: AlertTriangle },
            { id: 'analytics', label: 'AI Analytics', icon: Brain }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id as any)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeView === view.id
                  ? 'bg-red-600 text-white shadow-lg'
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
            <p className="text-2xl font-bold text-red-600 mt-1">{metric.value}</p>
            <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
          </div>
        ))}
      </motion.div>

      {/* Workforce Distribution */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">Workforce Distribution & Compensation</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Category</th>
                <th className="text-center py-2">Count</th>
                <th className="text-right py-2">Avg. Monthly Salary</th>
                <th className="text-center py-2">Certified</th>
                <th className="text-right py-2">Total Payroll</th>
              </tr>
            </thead>
            <tbody>
              {workforce.map((category) => (
                <tr key={category.category} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{category.category}</td>
                  <td className="text-center">{category.count.toLocaleString()}</td>
                  <td className="text-right">{formatBDT(category.avgSalary)}</td>
                  <td className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {category.certified}
                    </span>
                  </td>
                  <td className="text-right font-semibold">
                    {formatBDT(category.count * category.avgSalary)}
                  </td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="font-bold">
                <td className="py-3">Total</td>
                <td className="text-center">{workforce.reduce((sum, c) => sum + c.count, 0).toLocaleString()}</td>
                <td></td>
                <td></td>
                <td className="text-right text-red-600">
                  {formatBDT(workforce.reduce((sum, c) => sum + (c.count * c.avgSalary), 0))}
                </td>
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
            <feature.icon className="w-10 h-10 text-red-600 mb-4" />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Daily Operations Dashboard */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold mb-4">Today's Workforce Status</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">8,234</p>
            <p className="text-sm text-gray-600">Present Today</p>
            <p className="text-xs text-green-600 mt-1">92% Attendance</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
            <p className="text-2xl font-bold">6.2 hrs</p>
            <p className="text-sm text-gray-600">Avg. Work Time</p>
            <p className="text-xs text-gray-500 mt-1">As of 2:30 PM</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-purple-500" />
            <p className="text-2xl font-bold">142</p>
            <p className="text-sm text-gray-600">Active Sites</p>
            <p className="text-xs text-purple-600 mt-1">All Staffed</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">0</p>
            <p className="text-sm text-gray-600">Safety Incidents</p>
            <p className="text-xs text-green-600 mt-1">23 Days Streak</p>
          </div>
        </div>
      </motion.div>

      {/* Skills & Training */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <Award className="w-5 h-5 mr-2 text-yellow-500" />
            Skills Development Program
          </h3>
          <div className="space-y-3">
            {[
              { skill: 'Safety Certification', enrolled: 3420, completed: 2890 },
              { skill: 'Mason Grade-A', enrolled: 1560, completed: 1245 },
              { skill: 'Electrical Safety', enrolled: 892, completed: 756 },
              { skill: 'Plumbing Advanced', enrolled: 654, completed: 523 },
              { skill: 'Supervisor Training', enrolled: 234, completed: 198 }
            ].map((program) => (
              <div key={program.skill}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{program.skill}</span>
                  <span className="text-sm font-medium">
                    {program.completed}/{program.enrolled}
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-500 h-2 rounded-full" 
                    style={{ width: `${(program.completed / program.enrolled) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Performance Insights
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
              <div>
                <p className="font-medium">Top Performer</p>
                <p className="text-sm text-gray-600">Md. Karim (Mason)</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-green-600">+45%</p>
                <p className="text-xs text-gray-600">Above Average</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
              <div>
                <p className="font-medium">Best Team</p>
                <p className="text-sm text-gray-600">Mirpur Site B</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-blue-600">98.5%</p>
                <p className="text-xs text-gray-600">Efficiency</p>
              </div>
            </div>
            <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
              <div>
                <p className="font-medium">Safety Champion</p>
                <p className="text-sm text-gray-600">Dhanmondi Zone</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-bold text-purple-600">365</p>
                <p className="text-xs text-gray-600">Days No Incident</p>
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
                  <p className="text-2xl font-bold text-red-600 mt-1">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
                </div>
              ))}
            </div>

            {/* Workforce Distribution */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">Workforce Distribution & Compensation</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Category</th>
                      <th className="text-center py-2">Count</th>
                      <th className="text-right py-2">Avg. Monthly Salary</th>
                      <th className="text-center py-2">Certified</th>
                      <th className="text-right py-2">Total Payroll</th>
                    </tr>
                  </thead>
                  <tbody>
                    {workforce.map((category) => (
                      <tr key={category.category} className="border-b hover:bg-gray-50">
                        <td className="py-3 font-medium">{category.category}</td>
                        <td className="text-center">{category.count.toLocaleString()}</td>
                        <td className="text-right">{formatBDT(category.avgSalary)}</td>
                        <td className="text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {category.certified}
                          </span>
                        </td>
                        <td className="text-right font-semibold">
                          {formatBDT(category.count * category.avgSalary)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                  <tfoot>
                    <tr className="font-bold">
                      <td className="py-3">Total</td>
                      <td className="text-center">{workforce.reduce((sum, c) => sum + c.count, 0).toLocaleString()}</td>
                      <td></td>
                      <td></td>
                      <td className="text-right text-red-600">
                        {formatBDT(workforce.reduce((sum, c) => sum + (c.count * c.avgSalary), 0))}
                      </td>
                    </tr>
                  </tfoot>
                </table>
              </div>
            </div>

            {/* Daily Operations Dashboard */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-4">Today's Workforce Status</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="bg-white rounded-lg p-4 text-center">
                  <Users className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">8,234</p>
                  <p className="text-sm text-gray-600">Present Today</p>
                  <p className="text-xs text-green-600 mt-1">92% Attendance</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <Clock className="w-8 h-8 mx-auto mb-2 text-blue-500" />
                  <p className="text-2xl font-bold">6.2 hrs</p>
                  <p className="text-sm text-gray-600">Avg. Work Time</p>
                  <p className="text-xs text-gray-500 mt-1">As of 2:30 PM</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <Activity className="w-8 h-8 mx-auto mb-2 text-purple-500" />
                  <p className="text-2xl font-bold">142</p>
                  <p className="text-sm text-gray-600">Active Sites</p>
                  <p className="text-xs text-purple-600 mt-1">All Staffed</p>
                </div>
                <div className="bg-white rounded-lg p-4 text-center">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">0</p>
                  <p className="text-sm text-gray-600">Safety Incidents</p>
                  <p className="text-xs text-green-600 mt-1">23 Days Streak</p>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'heatmap' && (
          <motion.div
            key="heatmap"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <MapIcon className="w-5 h-5 text-red-600" />
                Live Workforce Distribution - Dhaka Metropolitan
              </h3>
              
              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2">
                  <canvas
                    ref={canvasRef}
                    className="w-full h-96 rounded-lg cursor-pointer"
                    style={{ backgroundColor: '#f9fafb' }}
                    onClick={(e) => {
                      const rect = canvasRef.current?.getBoundingClientRect()
                      if (rect) {
                        const x = ((e.clientX - rect.left) / rect.width) * 100
                        const y = ((e.clientY - rect.top) / rect.height) * 100
                        
                        // Find closest site
                        const closestSite = sites.reduce((prev, curr) => {
                          const prevDist = Math.sqrt(Math.pow(prev.position.x - x, 2) + Math.pow(prev.position.y - y, 2))
                          const currDist = Math.sqrt(Math.pow(curr.position.x - x, 2) + Math.pow(curr.position.y - y, 2))
                          return currDist < prevDist ? curr : prev
                        })
                        
                        setSelectedSite(closestSite.id)
                      }
                    }}
                  />
                  
                  <div className="mt-4 flex items-center justify-center gap-6">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-green-500 to-green-300" />
                      <span className="text-sm">High Productivity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-300" />
                      <span className="text-sm">Medium Productivity</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-gradient-to-r from-red-500 to-red-300" />
                      <span className="text-sm">Needs Attention</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  {selectedSite ? (
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="space-y-4"
                    >
                      {sites.find(s => s.id === selectedSite) && (
                        <div>
                          <h4 className="text-lg font-bold mb-3">{sites.find(s => s.id === selectedSite)!.name}</h4>
                          
                          <div className="space-y-3">
                            <div className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-sm text-gray-600">Workers Present</p>
                              <p className="text-xl font-bold">{sites.find(s => s.id === selectedSite)!.workers}</p>
                            </div>
                            
                            <div className="p-3 bg-green-50 rounded-lg">
                              <p className="text-sm text-gray-600">Productivity Score</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-green-500 rounded-full"
                                    style={{ width: `${sites.find(s => s.id === selectedSite)!.productivity}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{sites.find(s => s.id === selectedSite)!.productivity}%</span>
                              </div>
                            </div>
                            
                            <div className="p-3 bg-blue-50 rounded-lg">
                              <p className="text-sm text-gray-600">Safety Score</p>
                              <div className="flex items-center gap-2">
                                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                                  <div 
                                    className="h-full bg-blue-500 rounded-full"
                                    style={{ width: `${sites.find(s => s.id === selectedSite)!.safety}%` }}
                                  />
                                </div>
                                <span className="text-sm font-medium">{sites.find(s => s.id === selectedSite)!.safety}%</span>
                              </div>
                            </div>
                            
                            <button className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors">
                              View Site Details
                            </button>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <MapIcon className="w-16 h-16 mx-auto mb-4" />
                        <p>Click on a site to view details</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'alerts' && (
          <motion.div
            key="alerts"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-yellow-500" />
                  Real-Time Worker Alerts
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <Activity className="w-4 h-4 animate-pulse" />
                  <span>Live monitoring active</span>
                </div>
              </div>
              
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {alerts.map((alert, index) => (
                  <motion.div
                    key={alert.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className={`flex items-start gap-4 p-4 rounded-lg border ${
                      alert.severity === 'high' ? 'border-red-200 bg-red-50' :
                      alert.severity === 'medium' ? 'border-yellow-200 bg-yellow-50' :
                      'border-gray-200 bg-gray-50'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      alert.type === 'health' ? 'bg-red-100' :
                      alert.type === 'safety' ? 'bg-yellow-100' :
                      alert.type === 'attendance' ? 'bg-blue-100' :
                      'bg-green-100'
                    }`}>
                      {alert.type === 'health' && <Heart className="w-5 h-5 text-red-600" />}
                      {alert.type === 'safety' && <HardHat className="w-5 h-5 text-yellow-600" />}
                      {alert.type === 'attendance' && <Clock className="w-5 h-5 text-blue-600" />}
                      {alert.type === 'performance' && <TrendingUp className="w-5 h-5 text-green-600" />}
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <h4 className="font-semibold">{alert.worker}</h4>
                        <span className="text-xs text-gray-500">{alert.time}</span>
                      </div>
                      <p className="text-sm text-gray-600">{alert.message}</p>
                      <p className="text-xs text-gray-500 mt-1">{alert.site}</p>
                    </div>
                    
                    <div className="flex gap-2">
                      <button className="p-1 hover:bg-white rounded transition-colors">
                        <CheckCircle className="w-5 h-5 text-green-600" />
                      </button>
                      <button className="p-1 hover:bg-white rounded transition-colors">
                        <MessageSquare className="w-5 h-5 text-blue-600" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-red-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Thermometer className="w-5 h-5 text-red-600" />
                  Health Monitoring
                </h4>
                <p className="text-2xl font-bold text-red-600 mb-1">3 Alerts</p>
                <p className="text-sm text-gray-600">Temperature monitoring active</p>
              </div>
              
              <div className="bg-yellow-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-yellow-600" />
                  Safety Compliance
                </h4>
                <p className="text-2xl font-bold text-yellow-600 mb-1">98.5%</p>
                <p className="text-sm text-gray-600">PPE compliance rate today</p>
              </div>
              
              <div className="bg-green-50 rounded-lg p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <UserCheck className="w-5 h-5 text-green-600" />
                  Attendance
                </h4>
                <p className="text-2xl font-bold text-green-600 mb-1">92%</p>
                <p className="text-sm text-gray-600">On-time check-ins</p>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'analytics' && (
          <motion.div
            key="analytics"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Brain className="w-5 h-5 text-purple-600" />
                AI-Powered Workforce Analytics
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg p-6">
                  <h4 className="font-semibold mb-4 flex items-center gap-2">
                    <Zap className="w-5 h-5 text-purple-600" />
                    Predictive Insights
                  </h4>
                  <div className="space-y-3">
                    <div className="bg-white/70 rounded-lg p-4">
                      <p className="font-medium">Skill Gap Analysis</p>
                      <p className="text-sm text-gray-600 mt-1">245 workers need electrical safety training</p>
                      <div className="mt-2 flex items-center gap-2">
                        <UserPlus className="w-4 h-4 text-purple-600" />
                        <span className="text-xs text-purple-600">Schedule training by next week</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-4">
                      <p className="font-medium">Attrition Risk</p>
                      <p className="text-sm text-gray-600 mt-1">12 high-performers showing early signs</p>
                      <div className="mt-2 flex items-center gap-2">
                        <AlertTriangle className="w-4 h-4 text-yellow-600" />
                        <span className="text-xs text-yellow-600">Retention plan recommended</span>
                      </div>
                    </div>
                    
                    <div className="bg-white/70 rounded-lg p-4">
                      <p className="font-medium">Productivity Forecast</p>
                      <p className="text-sm text-gray-600 mt-1">15% increase possible with optimal scheduling</p>
                      <div className="mt-2 flex items-center gap-2">
                        <TrendingUp className="w-4 h-4 text-green-600" />
                        <span className="text-xs text-green-600">AI scheduling available</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-green-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-3">Performance Leaders</h4>
                    <div className="space-y-2">
                      {[
                        { name: 'Mirpur Site B', metric: 'Productivity', value: '112%' },
                        { name: 'Gulshan Tower Team', metric: 'Safety Record', value: '365 days' },
                        { name: 'Dhanmondi Crew A', metric: 'Quality Score', value: '98.5%' }
                      ].map((leader, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-white rounded">
                          <div>
                            <p className="font-medium text-sm">{leader.name}</p>
                            <p className="text-xs text-gray-600">{leader.metric}</p>
                          </div>
                          <span className="font-bold text-green-600">{leader.value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-blue-50 rounded-lg p-6">
                    <h4 className="font-semibold mb-3">AI Recommendations</h4>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        <p>Rotate Team C to morning shift for 8% productivity gain</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        <p>Schedule equipment training for 156 workers this week</p>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-blue-600 mt-0.5" />
                        <p>Implement buddy system at Uttara site for safety</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Skills & Training */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <Award className="w-5 h-5 mr-2 text-yellow-500" />
                  Skills Development Program
                </h3>
                <div className="space-y-3">
                  {[
                    { skill: 'Safety Certification', enrolled: 3420, completed: 2890 },
                    { skill: 'Mason Grade-A', enrolled: 1560, completed: 1245 },
                    { skill: 'Electrical Safety', enrolled: 892, completed: 756 },
                    { skill: 'Plumbing Advanced', enrolled: 654, completed: 523 },
                    { skill: 'Supervisor Training', enrolled: 234, completed: 198 }
                  ].map((program) => (
                    <div key={program.skill}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{program.skill}</span>
                        <span className="text-sm font-medium">
                          {program.completed}/{program.enrolled}
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-yellow-500 h-2 rounded-full" 
                          style={{ width: `${(program.completed / program.enrolled) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Performance Insights
                </h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium">Top Performer</p>
                      <p className="text-sm text-gray-600">Md. Karim (Mason)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-green-600">+45%</p>
                      <p className="text-xs text-gray-600">Above Average</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                    <div>
                      <p className="font-medium">Best Team</p>
                      <p className="text-sm text-gray-600">Mirpur Site B</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-blue-600">98.5%</p>
                      <p className="text-xs text-gray-600">Efficiency</p>
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                    <div>
                      <p className="font-medium">Safety Champion</p>
                      <p className="text-sm text-gray-600">Dhanmondi Zone</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-purple-600">365</p>
                      <p className="text-xs text-gray-600">Days No Incident</p>
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
            <feature.icon className="w-10 h-10 text-red-600 mb-4" />
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
        <h3 className="text-xl font-bold mb-4">Worker Welfare Features</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border-l-4 border-red-600 pl-4">
            <h4 className="font-semibold">bKash Salary Disbursement</h4>
            <p className="text-sm text-gray-600">Instant wage payment to mobile wallets</p>
          </div>
          <div className="border-l-4 border-orange-600 pl-4">
            <h4 className="font-semibold">Festival Bonus Management</h4>
            <p className="text-sm text-gray-600">Automated Eid bonus calculation & payment</p>
          </div>
          <div className="border-l-4 border-yellow-600 pl-4">
            <h4 className="font-semibold">Health Insurance</h4>
            <p className="text-sm text-gray-600">Group insurance with local hospitals</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}