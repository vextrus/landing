'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  LineChart, 
  PieChart, 
  BarChart3, 
  TrendingUp,
  Brain,
  Zap,
  FileText,
  Download,
  Bell,
  Target,
  Activity,
  Layers,
  Plus,
  Settings,
  Grid3x3,
  Eye,
  EyeOff,
  Move,
  Save,
  Share2,
  Calendar,
  DollarSign,
  Users,
  Building
} from 'lucide-react'
import { formatBDT, formatPercentage } from '../../utils/bdCurrency'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface Widget {
  id: string
  type: 'line' | 'bar' | 'pie' | 'metric' | 'table' | 'map'
  title: string
  size: 'small' | 'medium' | 'large'
  position: { x: number; y: number }
  data?: any
}

interface Dashboard {
  id: string
  name: string
  widgets: Widget[]
}

export default function AnalyticsBI() {
  const [activeView, setActiveView] = useState<'insights' | 'builder' | 'reports' | 'predictions'>('insights')
  const [widgets, setWidgets] = useState<Widget[]>([
    { id: '1', type: 'metric', title: 'Total Revenue', size: 'small', position: { x: 0, y: 0 }, data: { value: 8540000000, trend: '+23%' } },
    { id: '2', type: 'line', title: 'Revenue Trend', size: 'medium', position: { x: 1, y: 0 } },
    { id: '3', type: 'pie', title: 'Project Distribution', size: 'small', position: { x: 3, y: 0 } },
    { id: '4', type: 'bar', title: 'Site Performance', size: 'large', position: { x: 0, y: 1 } },
  ])
  const [selectedWidget, setSelectedWidget] = useState<string | null>(null)
  const [isEditMode, setIsEditMode] = useState(false)
  const [parent] = useAutoAnimate()
  const widgetIdCounter = useRef(5) // Start at 5 since we have widgets 1-4
  const canvasRef = useRef<HTMLCanvasElement>(null)
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const features = [
    {
      icon: Brain,
      title: 'Predictive Analytics',
      description: 'AI-powered forecasting for costs, delays, and resource needs'
    },
    {
      icon: Zap,
      title: 'Real-time Dashboards',
      description: 'Live KPI tracking with customizable executive views'
    },
    {
      icon: FileText,
      title: 'Automated Reports',
      description: 'Daily, weekly, and monthly reports in Bengali/English'
    },
    {
      icon: Bell,
      title: 'Smart Alerts',
      description: 'Proactive notifications for anomalies and milestones'
    }
  ]

  const metrics = [
    { label: 'Reports/Day', value: '524', trend: '+45' },
    { label: 'Prediction Accuracy', value: '98%', trend: '+3%' },
    { label: 'Data Points', value: '2.3M', trend: '+125K' },
    { label: 'Insights Generated', value: '1,247', trend: '+89' }
  ]

  const insights = [
    {
      type: 'Cost Overrun Risk',
      project: 'Mirpur Tower B',
      prediction: '+12% budget',
      confidence: '87%',
      impact: 'High',
      recommendation: 'Review material procurement contracts'
    },
    {
      type: 'Schedule Optimization',
      project: 'Dhanmondi Complex',
      prediction: '-15 days',
      confidence: '92%',
      impact: 'Medium',
      recommendation: 'Parallel foundation work possible'
    },
    {
      type: 'Quality Alert',
      project: 'Uttara Phase 3',
      prediction: 'Concrete issue',
      confidence: '95%',
      impact: 'Critical',
      recommendation: 'Immediate inspection required'
    },
    {
      type: 'Resource Efficiency',
      project: 'Gulshan Heights',
      prediction: '20% idle time',
      confidence: '89%',
      impact: 'Medium',
      recommendation: 'Reallocate 5 workers to Site B'
    }
  ]

  // Widget templates
  const widgetTemplates = [
    { type: 'metric', icon: DollarSign, label: 'KPI Metric' },
    { type: 'line', icon: LineChart, label: 'Line Chart' },
    { type: 'bar', icon: BarChart3, label: 'Bar Chart' },
    { type: 'pie', icon: PieChart, label: 'Pie Chart' },
    { type: 'table', icon: Grid3x3, label: 'Data Table' },
    { type: 'map', icon: Target, label: 'Heat Map' },
  ]

  // Draw chart visualizations
  useEffect(() => {
    if (activeView === 'predictions' && canvasRef.current) {
      const canvas = canvasRef.current
      const ctx = canvas.getContext('2d')
      if (!ctx) return

      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight

      const drawPredictionChart = () => {
        ctx.clearRect(0, 0, canvas.width, canvas.height)
        
        // Draw axes
        ctx.strokeStyle = '#e5e7eb'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(40, canvas.height - 40)
        ctx.lineTo(canvas.width - 20, canvas.height - 40)
        ctx.moveTo(40, 20)
        ctx.lineTo(40, canvas.height - 40)
        ctx.stroke()
        
        // Draw prediction lines
        const months = 12
        const dataPoints = [
          { actual: [65, 72, 68, 78, 82, 85, 88, 92, 95, 98, 102, 105] },
          { predicted: [105, 108, 112, 115, 118, 122, 125, 128, 132, 135, 138, 142] }
        ]
        
        // Actual data
        ctx.strokeStyle = '#06B6D4'
        ctx.lineWidth = 2
        ctx.beginPath()
        dataPoints[0]?.actual?.forEach((value, index) => {
          const x = 40 + (index / (months - 1)) * (canvas.width - 60)
          const y = canvas.height - 40 - (value / 150) * (canvas.height - 60)
          if (index === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        })
        ctx.stroke()
        
        // Prediction line
        ctx.strokeStyle = '#F59E0B'
        ctx.setLineDash([5, 5])
        ctx.beginPath()
        ctx.moveTo(40 + (11 / (months - 1)) * (canvas.width - 60), canvas.height - 40 - (105 / 150) * (canvas.height - 60))
        dataPoints[1]?.predicted?.forEach((value, index) => {
          const x = 40 + ((index + 12) / (months * 2 - 1)) * (canvas.width - 60)
          const y = canvas.height - 40 - (value / 150) * (canvas.height - 60)
          ctx.lineTo(x, y)
        })
        ctx.stroke()
        ctx.setLineDash([])
        
        // Labels
        ctx.fillStyle = '#6b7280'
        ctx.font = '12px Inter'
        ctx.textAlign = 'center'
        ctx.fillText('Past 12 Months', canvas.width / 4, canvas.height - 10)
        ctx.fillText('Next 12 Months (Predicted)', (canvas.width * 3) / 4, canvas.height - 10)
      }

      drawPredictionChart()
    }
  }, [activeView])

  return (
    <div className="space-y-8" ref={parent}>
      {/* Header with View Switcher */}
      <motion.div {...fadeInUp} className="text-center">
        <h2 className="text-3xl font-bold mb-4">Analytics & BI Module</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          Transform data into actionable insights with AI-powered analytics 
          designed for construction intelligence
        </p>
        
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'insights', label: 'AI Insights', icon: Brain },
            { id: 'builder', label: 'Dashboard Builder', icon: Layers },
            { id: 'reports', label: 'Reports', icon: FileText },
            { id: 'predictions', label: 'Predictions', icon: TrendingUp }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id as any)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeView === view.id
                  ? 'bg-cyan-600 text-white shadow-lg'
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
            <p className="text-2xl font-bold text-cyan-600 mt-1">{metric.value}</p>
            <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
          </div>
        ))}
      </motion.div>

      {/* AI Insights Dashboard */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4 flex items-center">
          <Brain className="w-6 h-6 mr-2 text-cyan-600" />
          AI-Generated Insights (Last 24 Hours)
        </h3>
        <div className="space-y-4">
          {insights.map((insight, index) => (
            <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-semibold flex items-center gap-2">
                    {insight.type}
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      insight.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                      insight.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {insight.impact}
                    </span>
                  </h4>
                  <p className="text-sm text-gray-600 mt-1">{insight.project}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-cyan-600">{insight.prediction}</p>
                  <p className="text-xs text-gray-500">Confidence: {insight.confidence}</p>
                </div>
              </div>
              <div className="bg-cyan-50 rounded p-2 mt-2">
                <p className="text-sm">
                  <strong>Recommendation:</strong> {insight.recommendation}
                </p>
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
            <feature.icon className="w-10 h-10 text-cyan-600 mb-4" />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Performance Metrics Visualization */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.4 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <BarChart3 className="w-5 h-5 mr-2" />
            Project Performance Overview
          </h3>
          <div className="space-y-3">
            {[
              { metric: 'On-Time Completion', value: 78, target: 85 },
              { metric: 'Budget Adherence', value: 82, target: 90 },
              { metric: 'Quality Score', value: 94, target: 95 },
              { metric: 'Safety Compliance', value: 98, target: 100 },
              { metric: 'Client Satisfaction', value: 88, target: 90 }
            ].map((item) => (
              <div key={item.metric}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm">{item.metric}</span>
                  <span className="text-sm font-medium">{item.value}%</span>
                </div>
                <div className="relative">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        item.value >= item.target ? 'bg-green-500' : 'bg-yellow-500'
                      }`}
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                  <div 
                    className="absolute top-0 h-2 w-0.5 bg-gray-600"
                    style={{ left: `${item.target}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2" />
            Financial Performance
          </h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Total Revenue (YTD)</p>
                <p className="text-xl font-bold">{formatBDT(8540000000)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-green-600">+23%</p>
                <p className="text-xs text-gray-500">vs last year</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Project Pipeline</p>
                <p className="text-xl font-bold">{formatBDT(12300000000)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-blue-600">152</p>
                <p className="text-xs text-gray-500">active projects</p>
              </div>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <div>
                <p className="text-sm text-gray-600">Cost Savings</p>
                <p className="text-xl font-bold">{formatBDT(456000000)}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-purple-600">5.3%</p>
                <p className="text-xs text-gray-500">of revenue</p>
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Custom Reports */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.5 }}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">Popular Reports & Dashboards</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {[
            { name: 'Executive Summary', frequency: 'Daily', users: 47, format: 'PDF' },
            { name: 'Project Status Report', frequency: 'Weekly', users: 156, format: 'Excel' },
            { name: 'Financial Dashboard', frequency: 'Real-time', users: 89, format: 'Web' },
            { name: 'Safety Compliance', frequency: 'Monthly', users: 234, format: 'PDF' },
            { name: 'Resource Utilization', frequency: 'Daily', users: 178, format: 'Web' },
            { name: 'Vendor Performance', frequency: 'Monthly', users: 92, format: 'Excel' }
          ].map((report) => (
            <div key={report.name} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-2">
                <div>
                  <h4 className="font-medium">{report.name}</h4>
                  <p className="text-sm text-gray-600">{report.frequency}</p>
                </div>
                <Download className="w-4 h-4 text-gray-400 cursor-pointer hover:text-cyan-600" />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">{report.users} users</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-xs">{report.format}</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      <AnimatePresence mode="wait">
        {activeView === 'insights' && (
          <motion.div
            key="insights"
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
                  <p className="text-2xl font-bold text-cyan-600 mt-1">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
                </div>
              ))}
            </div>

            {/* AI Insights Dashboard */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4 flex items-center">
                <Brain className="w-6 h-6 mr-2 text-cyan-600" />
                AI-Generated Insights (Last 24 Hours)
              </h3>
              <div className="space-y-4">
                {insights.map((insight, index) => (
                  <div key={index} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-semibold flex items-center gap-2">
                          {insight.type}
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            insight.impact === 'Critical' ? 'bg-red-100 text-red-800' :
                            insight.impact === 'High' ? 'bg-orange-100 text-orange-800' :
                            'bg-yellow-100 text-yellow-800'
                          }`}>
                            {insight.impact}
                          </span>
                        </h4>
                        <p className="text-sm text-gray-600 mt-1">{insight.project}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-bold text-cyan-600">{insight.prediction}</p>
                        <p className="text-xs text-gray-500">Confidence: {insight.confidence}</p>
                      </div>
                    </div>
                    <div className="bg-cyan-50 rounded p-2 mt-2">
                      <p className="text-sm">
                        <strong>Recommendation:</strong> {insight.recommendation}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Performance Metrics Visualization */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2" />
                  Project Performance Overview
                </h3>
                <div className="space-y-3">
                  {[
                    { metric: 'On-Time Completion', value: 78, target: 85 },
                    { metric: 'Budget Adherence', value: 82, target: 90 },
                    { metric: 'Quality Score', value: 94, target: 95 },
                    { metric: 'Safety Compliance', value: 98, target: 100 },
                    { metric: 'Client Satisfaction', value: 88, target: 90 }
                  ].map((item) => (
                    <div key={item.metric}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{item.metric}</span>
                        <span className="text-sm font-medium">{item.value}%</span>
                      </div>
                      <div className="relative">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              item.value >= item.target ? 'bg-green-500' : 'bg-yellow-500'
                            }`}
                            style={{ width: `${item.value}%` }}
                          ></div>
                        </div>
                        <div 
                          className="absolute top-0 h-2 w-0.5 bg-gray-600"
                          style={{ left: `${item.target}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg p-6">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2" />
                  Financial Performance
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Total Revenue (YTD)</p>
                      <p className="text-xl font-bold">{formatBDT(8540000000)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-green-600">+23%</p>
                      <p className="text-xs text-gray-500">vs last year</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Project Pipeline</p>
                      <p className="text-xl font-bold">{formatBDT(12300000000)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-blue-600">152</p>
                      <p className="text-xs text-gray-500">active projects</p>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-white rounded-lg">
                    <div>
                      <p className="text-sm text-gray-600">Cost Savings</p>
                      <p className="text-xl font-bold">{formatBDT(456000000)}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-purple-600">5.3%</p>
                      <p className="text-xs text-gray-500">of revenue</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'builder' && (
          <motion.div
            key="builder"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Layers className="w-5 h-5 text-cyan-600" />
                  Custom Dashboard Builder
                </h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                      isEditMode ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-700'
                    }`}
                  >
                    {isEditMode ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    <span>{isEditMode ? 'Preview' : 'Edit'}</span>
                  </button>
                  <button className="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 transition-colors flex items-center gap-2">
                    <Save className="w-4 h-4" />
                    <span>Save Dashboard</span>
                  </button>
                  <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center gap-2">
                    <Share2 className="w-4 h-4" />
                    <span>Share</span>
                  </button>
                </div>
              </div>
              
              {isEditMode && (
                <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm font-medium mb-3">Add Widget</p>
                  <div className="flex gap-2 flex-wrap">
                    {widgetTemplates.map((template) => (
                      <button
                        key={template.type}
                        onClick={() => {
                          const newWidget: Widget = {
                            id: (widgetIdCounter.current++).toString(),
                            type: template.type as any,
                            title: `New ${template.label}`,
                            size: 'medium',
                            position: { x: 0, y: widgets.length }
                          }
                          setWidgets([...widgets, newWidget])
                        }}
                        className="px-3 py-2 bg-white border rounded-lg hover:border-cyan-400 transition-colors flex items-center gap-2"
                      >
                        <template.icon className="w-4 h-4" />
                        <span className="text-sm">{template.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}
              
              <div className="grid grid-cols-4 gap-4 min-h-[400px] bg-gray-50 rounded-lg p-4">
                {widgets.map((widget) => (
                  <motion.div
                    key={widget.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className={`bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow ${
                      widget.size === 'small' ? 'col-span-1' :
                      widget.size === 'medium' ? 'col-span-2' :
                      'col-span-4'
                    } ${
                      selectedWidget === widget.id ? 'ring-2 ring-cyan-400' : ''
                    }`}
                    onClick={() => setSelectedWidget(widget.id)}
                  >
                    {isEditMode && (
                      <div className="flex items-center justify-between mb-2">
                        <Move className="w-4 h-4 text-gray-400 cursor-move" />
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setWidgets(widgets.filter(w => w.id !== widget.id))
                          }}
                          className="text-red-500 hover:text-red-700"
                        >
                          ×
                        </button>
                      </div>
                    )}
                    
                    <h4 className="font-semibold mb-3">{widget.title}</h4>
                    
                    {/* Widget Content */}
                    {widget.type === 'metric' && widget.data && (
                      <div>
                        <p className="text-3xl font-bold text-cyan-600">{formatBDT(widget.data.value)}</p>
                        <p className="text-sm text-green-600 mt-1">{widget.data.trend}</p>
                      </div>
                    )}
                    
                    {widget.type === 'line' && (
                      <div className="h-32 bg-gradient-to-r from-cyan-50 to-blue-50 rounded flex items-center justify-center">
                        <LineChart className="w-12 h-12 text-cyan-400" />
                      </div>
                    )}
                    
                    {widget.type === 'bar' && (
                      <div className="h-32 bg-gradient-to-r from-green-50 to-emerald-50 rounded flex items-center justify-center">
                        <BarChart3 className="w-12 h-12 text-green-400" />
                      </div>
                    )}
                    
                    {widget.type === 'pie' && (
                      <div className="h-32 bg-gradient-to-r from-purple-50 to-pink-50 rounded flex items-center justify-center">
                        <PieChart className="w-12 h-12 text-purple-400" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'reports' && (
          <motion.div
            key="reports"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-6">Popular Reports & Dashboards</h3>
              <div className="grid md:grid-cols-3 gap-4">
                {[
                  { name: 'Executive Summary', frequency: 'Daily', users: 47, format: 'PDF', lastRun: '2 hours ago' },
                  { name: 'Project Status Report', frequency: 'Weekly', users: 156, format: 'Excel', lastRun: '1 day ago' },
                  { name: 'Financial Dashboard', frequency: 'Real-time', users: 89, format: 'Web', lastRun: 'Live' },
                  { name: 'Safety Compliance', frequency: 'Monthly', users: 234, format: 'PDF', lastRun: '3 days ago' },
                  { name: 'Resource Utilization', frequency: 'Daily', users: 178, format: 'Web', lastRun: '4 hours ago' },
                  { name: 'Vendor Performance', frequency: 'Monthly', users: 92, format: 'Excel', lastRun: '1 week ago' }
                ].map((report) => (
                  <motion.div
                    key={report.name}
                    whileHover={{ scale: 1.02 }}
                    className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="font-medium">{report.name}</h4>
                        <p className="text-sm text-gray-600">{report.frequency}</p>
                      </div>
                      <Download className="w-4 h-4 text-gray-400 cursor-pointer hover:text-cyan-600" />
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-500">{report.users} users</span>
                      <span className="px-2 py-1 bg-gray-100 rounded text-xs">{report.format}</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Last run: {report.lastRun}</p>
                  </motion.div>
                ))}
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-cyan-50 to-blue-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-cyan-600" />
                  Scheduled Reports
                </h4>
                <div className="space-y-3">
                  {[
                    { time: '08:00 AM', report: 'Daily Executive Summary', recipients: 12 },
                    { time: '10:00 AM', report: 'Site Progress Update', recipients: 45 },
                    { time: '02:00 PM', report: 'Financial Snapshot', recipients: 8 },
                    { time: '05:00 PM', report: 'End of Day Report', recipients: 67 }
                  ].map((schedule, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded">
                      <div>
                        <p className="font-medium text-sm">{schedule.report}</p>
                        <p className="text-xs text-gray-600">{schedule.time} daily</p>
                      </div>
                      <span className="text-sm text-gray-500">{schedule.recipients} recipients</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-lg p-6">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Bell className="w-5 h-5 text-purple-600" />
                  Alert Configuration
                </h4>
                <div className="space-y-3">
                  {[
                    { alert: 'Budget Overrun > 10%', active: true, triggered: 3 },
                    { alert: 'Schedule Delay > 7 days', active: true, triggered: 5 },
                    { alert: 'Safety Incident', active: true, triggered: 0 },
                    { alert: 'Quality Score < 90%', active: false, triggered: 1 }
                  ].map((alert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-white rounded">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          alert.active ? 'bg-green-500' : 'bg-gray-300'
                        }`} />
                        <p className="text-sm">{alert.alert}</p>
                      </div>
                      <span className="text-xs text-gray-500">Triggered {alert.triggered}x this week</span>
                    </div>
                  ))}
                </div>
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
                <Brain className="w-5 h-5 text-cyan-600" />
                AI-Powered Predictions
              </h3>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-4">Revenue Forecast</h4>
                  <canvas
                    ref={canvasRef}
                    className="w-full h-64 rounded-lg"
                    style={{ backgroundColor: '#f9fafb' }}
                  />
                  <div className="mt-4 flex items-center justify-center gap-4">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-cyan-500" />
                      <span className="text-sm">Actual</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-0.5 bg-yellow-500" style={{ borderTop: '2px dashed' }} />
                      <span className="text-sm">Predicted</span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-4">
                    <h5 className="font-semibold mb-3">Key Predictions</h5>
                    <div className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Q1 2025 Revenue</p>
                        <p className="text-2xl font-bold text-green-600">{formatBDT(3200000000)}</p>
                        <p className="text-xs text-gray-600">95% confidence interval</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Project Completion Rate</p>
                        <p className="text-2xl font-bold text-blue-600">87%</p>
                        <p className="text-xs text-gray-600">+9% improvement expected</p>
                      </div>
                      
                      <div>
                        <p className="text-sm font-medium">Cost Efficiency Gain</p>
                        <p className="text-2xl font-bold text-purple-600">{formatBDT(125000000)}</p>
                        <p className="text-xs text-gray-600">Through AI optimization</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <h5 className="font-semibold mb-2 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-yellow-600" />
                      Recommended Actions
                    </h5>
                    <ul className="space-y-2 text-sm">
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        <span>Increase Mirpur site workforce by 15% for Q1</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        <span>Lock material prices before predicted 8% increase</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-yellow-600">•</span>
                        <span>Fast-track Gulshan project to capture market opportunity</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Building className="w-5 h-5 text-cyan-600" />
                  Project Success Probability
                </h4>
                <div className="space-y-3">
                  {[
                    { project: 'Gulshan Tower A', probability: 94 },
                    { project: 'Dhanmondi Complex', probability: 88 },
                    { project: 'Mirpur Plaza', probability: 91 },
                    { project: 'Uttara Heights', probability: 85 }
                  ].map((project) => (
                    <div key={project.project}>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm">{project.project}</span>
                        <span className="text-sm font-medium">{project.probability}%</span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${
                            project.probability >= 90 ? 'bg-green-500' :
                            project.probability >= 85 ? 'bg-yellow-500' :
                            'bg-red-500'
                          }`}
                          style={{ width: `${project.probability}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <Users className="w-5 h-5 text-purple-600" />
                  Workforce Demand Forecast
                </h4>
                <div className="space-y-3">
                  {[
                    { skill: 'Masons', current: 3421, needed: 3850 },
                    { skill: 'Electricians', current: 892, needed: 945 },
                    { skill: 'Engineers', current: 234, needed: 256 },
                    { skill: 'Helpers', current: 7490, needed: 7200 }
                  ].map((skill) => (
                    <div key={skill.skill} className="flex items-center justify-between">
                      <span className="text-sm">{skill.skill}</span>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${
                          skill.needed > skill.current ? 'text-red-600' :
                          skill.needed < skill.current ? 'text-green-600' :
                          'text-gray-600'
                        }`}>
                          {skill.needed > skill.current ? '+' : ''}
                          {skill.needed - skill.current}
                        </span>
                        <p className="text-xs text-gray-500">by Q2</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  Market Opportunity Score
                </h4>
                <div className="space-y-3">
                  {[
                    { area: 'Gulshan', score: 92, trend: 'up' },
                    { area: 'Dhanmondi', score: 85, trend: 'stable' },
                    { area: 'Uttara', score: 88, trend: 'up' },
                    { area: 'Bashundhara', score: 95, trend: 'up' }
                  ].map((area) => (
                    <div key={area.area} className="flex items-center justify-between">
                      <span className="text-sm">{area.area}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-medium">{area.score}</span>
                        {area.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-500" />}
                        {area.trend === 'stable' && <Activity className="w-4 h-4 text-gray-500" />}
                      </div>
                    </div>
                  ))}
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
            <feature.icon className="w-10 h-10 text-cyan-600 mb-4" />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Bangladesh-Specific Analytics */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.6 }}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">Bangladesh Market Intelligence</h3>
        <div className="grid md:grid-cols-3 gap-4">
          <div className="border-l-4 border-cyan-600 pl-4">
            <h4 className="font-semibold">RAJUK Compliance Tracking</h4>
            <p className="text-sm text-gray-600">Automated approval timeline predictions</p>
          </div>
          <div className="border-l-4 border-blue-600 pl-4">
            <h4 className="font-semibold">Market Price Trends</h4>
            <p className="text-sm text-gray-600">Real-time material cost analysis for Dhaka</p>
          </div>
          <div className="border-l-4 border-purple-600 pl-4">
            <h4 className="font-semibold">Seasonal Insights</h4>
            <p className="text-sm text-gray-600">Monsoon impact predictions on schedules</p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}