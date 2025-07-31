'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect, useRef } from 'react'
import { 
  Shield, 
  CheckCircle, 
  AlertTriangle, 
  Camera,
  FileSearch,
  Activity,
  Award,
  Zap,
  BarChart,
  XCircle,
  Clock,
  TrendingUp,
  Upload,
  Eye,
  Brain,
  Target,
  Scan,
  AlertCircle,
  ThermometerSun,
  Droplets,
  Gauge,
  Building
} from 'lucide-react'
import { useAutoAnimate } from '@formkit/auto-animate/react'

interface DefectDetection {
  id: string
  type: string
  severity: 'low' | 'medium' | 'high' | 'critical'
  confidence: number
  location: { x: number; y: number }
  recommendation: string
}

export default function QualityControl() {
  const [activeView, setActiveView] = useState<'dashboard' | 'ai-inspection' | 'live-monitor' | 'compliance'>('dashboard')
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [detectedDefects, setDetectedDefects] = useState<DefectDetection[]>([])
  const [parent] = useAutoAnimate()
  const imageRef = useRef<HTMLDivElement>(null)
  
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  }

  const features = [
    {
      icon: Camera,
      title: 'AI Visual Inspection',
      description: 'Computer vision for defect detection and quality assessment'
    },
    {
      icon: FileSearch,
      title: 'Compliance Tracking',
      description: 'BNBC 2020 and international standards monitoring'
    },
    {
      icon: Activity,
      title: 'Real-time Monitoring',
      description: 'IoT sensors for structural health and safety metrics'
    },
    {
      icon: Award,
      title: 'Quality Certification',
      description: 'Automated certification and documentation management'
    }
  ]

  const metrics = [
    { label: 'Defects Caught', value: '99.2%', trend: '+2.1%' },
    { label: 'Compliance Rate', value: '100%', trend: 'Maintained' },
    { label: 'Inspection Time', value: '-65%', trend: 'Reduced' },
    { label: 'Quality Score', value: '9.4/10', trend: '+0.3' }
  ]

  const inspectionTypes = [
    { type: 'Foundation', total: 124, passed: 121, failed: 3, aiDetected: 3 },
    { type: 'Structural', total: 356, passed: 348, failed: 8, aiDetected: 7 },
    { type: 'Electrical', total: 289, passed: 282, failed: 7, aiDetected: 6 },
    { type: 'Plumbing', total: 234, passed: 229, failed: 5, aiDetected: 5 },
    { type: 'Finishing', total: 412, passed: 401, failed: 11, aiDetected: 10 }
  ]

  // Simulate AI analysis
  const analyzeImage = () => {
    setIsAnalyzing(true)
    setDetectedDefects([])
    
    setTimeout(() => {
      const mockDefects: DefectDetection[] = [
        {
          id: '1',
          type: 'Surface Crack',
          severity: 'medium',
          confidence: 92,
          location: { x: 30, y: 40 },
          recommendation: 'Apply sealant within 48 hours'
        },
        {
          id: '2',
          type: 'Water Damage',
          severity: 'high',
          confidence: 88,
          location: { x: 65, y: 25 },
          recommendation: 'Immediate waterproofing required'
        },
        {
          id: '3',
          type: 'Alignment Issue',
          severity: 'low',
          confidence: 95,
          location: { x: 45, y: 70 },
          recommendation: 'Monitor in next inspection'
        }
      ]
      setDetectedDefects(mockDefects)
      setIsAnalyzing(false)
    }, 3000)
  }

  // Real-time monitoring data
  const [monitoringData, setMonitoringData] = useState({
    temperature: 28,
    humidity: 72,
    vibration: 0.8,
    strength: 35
  })

  useEffect(() => {
    if (activeView === 'live-monitor') {
      const interval = setInterval(() => {
        setMonitoringData(prev => ({
          temperature: prev.temperature + (Math.random() - 0.5) * 0.5,
          humidity: Math.max(60, Math.min(85, prev.humidity + (Math.random() - 0.5) * 2)),
          vibration: Math.max(0.5, Math.min(1.5, prev.vibration + (Math.random() - 0.5) * 0.1)),
          strength: prev.strength + (Math.random() - 0.4) * 0.2
        }))
      }, 2000)
      return () => clearInterval(interval)
    }
  }, [activeView])

  return (
    <div className="space-y-8" ref={parent}>
      {/* Header with View Switcher */}
      <motion.div {...fadeInUp} className="text-center">
        <h2 className="text-3xl font-bold mb-4">Quality Control Module</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-6">
          AI-powered quality assurance ensuring 100% compliance with BNBC 2020 
          and international construction standards
        </p>
        
        <div className="flex justify-center gap-2 flex-wrap">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart },
            { id: 'ai-inspection', label: 'AI Photo Analysis', icon: Camera },
            { id: 'live-monitor', label: 'Live Monitoring', icon: Activity },
            { id: 'compliance', label: 'Compliance', icon: Shield }
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id as any)}
              className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-all ${
                activeView === view.id
                  ? 'bg-purple-600 text-white shadow-lg'
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
            <p className="text-2xl font-bold text-purple-600 mt-1">{metric.value}</p>
            <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
          </div>
        ))}
      </motion.div>

      {/* AI Inspection Dashboard */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-lg p-6 shadow-md"
      >
        <h3 className="text-xl font-bold mb-4">AI-Powered Inspection Results</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2">Inspection Type</th>
                <th className="text-center py-2">Total</th>
                <th className="text-center py-2">
                  <CheckCircle className="w-4 h-4 inline mr-1 text-success" />
                  Passed
                </th>
                <th className="text-center py-2">
                  <XCircle className="w-4 h-4 inline mr-1 text-red-500" />
                  Failed
                </th>
                <th className="text-center py-2">
                  <Zap className="w-4 h-4 inline mr-1 text-purple-600" />
                  AI Detected
                </th>
                <th className="text-center py-2">Success Rate</th>
              </tr>
            </thead>
            <tbody>
              {inspectionTypes.map((inspection) => (
                <tr key={inspection.type} className="border-b hover:bg-gray-50">
                  <td className="py-3 font-medium">{inspection.type}</td>
                  <td className="text-center">{inspection.total}</td>
                  <td className="text-center text-success">{inspection.passed}</td>
                  <td className="text-center text-red-500">{inspection.failed}</td>
                  <td className="text-center text-purple-600 font-semibold">
                    {inspection.aiDetected}/{inspection.failed}
                  </td>
                  <td className="text-center">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                      {((inspection.passed / inspection.total) * 100).toFixed(1)}%
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
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
            <feature.icon className="w-10 h-10 text-purple-600 mb-4" />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>

      {/* Real-time Quality Monitoring */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.4 }}
        className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6"
      >
        <h3 className="text-xl font-bold mb-4">Live Quality Monitoring</h3>
        <div className="grid md:grid-cols-4 gap-4">
          <div className="bg-white rounded-lg p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">28°C</p>
            <p className="text-sm text-gray-600">Concrete Temperature</p>
            <p className="text-xs text-green-600 mt-1">Optimal Range</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-yellow-500" />
            <p className="text-2xl font-bold">72%</p>
            <p className="text-sm text-gray-600">Humidity Level</p>
            <p className="text-xs text-yellow-600 mt-1">Slightly High</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">0.8mm</p>
            <p className="text-sm text-gray-600">Vibration Level</p>
            <p className="text-xs text-green-600 mt-1">Within Limits</p>
          </div>
          <div className="bg-white rounded-lg p-4 text-center">
            <Activity className="w-8 h-8 mx-auto mb-2 text-green-500" />
            <p className="text-2xl font-bold">35 MPa</p>
            <p className="text-sm text-gray-600">Concrete Strength</p>
            <p className="text-xs text-green-600 mt-1">Above Target</p>
          </div>
        </div>
      </motion.div>

      {/* Defect Analysis */}
      <motion.div 
        {...fadeInUp}
        transition={{ delay: 0.5 }}
        className="grid md:grid-cols-2 gap-6"
      >
        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
            Common Defects Detected
          </h3>
          <div className="space-y-3">
            {[
              { defect: 'Surface Cracks', count: 23, severity: 'Low' },
              { defect: 'Alignment Issues', count: 12, severity: 'Medium' },
              { defect: 'Water Seepage', count: 8, severity: 'High' },
              { defect: 'Reinforcement Errors', count: 5, severity: 'Critical' },
              { defect: 'Dimension Variance', count: 15, severity: 'Low' }
            ].map((item) => (
              <div key={item.defect} className="flex items-center justify-between">
                <span className="text-sm">{item.defect}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{item.count}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    item.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                    item.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                    item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-green-100 text-green-800'
                  }`}>
                    {item.severity}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg p-6 shadow-md">
          <h3 className="text-lg font-bold mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
            Quality Improvements
          </h3>
          <div className="space-y-3">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Defect Reduction</span>
                <span className="text-sm font-medium">-45%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">First-Time Pass Rate</span>
                <span className="text-sm font-medium">+28%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
              </div>
            </div>
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm">Inspection Efficiency</span>
                <span className="text-sm font-medium">+65%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
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
                  <p className="text-2xl font-bold text-purple-600 mt-1">{metric.value}</p>
                  <p className="text-sm text-green-600 mt-1">{metric.trend}</p>
                </div>
              ))}
            </div>

            {/* AI Inspection Dashboard */}
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-4">AI-Powered Inspection Results</h3>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Inspection Type</th>
                      <th className="text-center py-2">Total</th>
                      <th className="text-center py-2">
                        <CheckCircle className="w-4 h-4 inline mr-1 text-success" />
                        Passed
                      </th>
                      <th className="text-center py-2">
                        <XCircle className="w-4 h-4 inline mr-1 text-red-500" />
                        Failed
                      </th>
                      <th className="text-center py-2">
                        <Zap className="w-4 h-4 inline mr-1 text-purple-600" />
                        AI Detected
                      </th>
                      <th className="text-center py-2">Success Rate</th>
                    </tr>
                  </thead>
                  <tbody>
                    {inspectionTypes.map((inspection) => (
                      <tr key={inspection.type} className="border-b hover:bg-gray-50">
                        <td className="py-3 font-medium">{inspection.type}</td>
                        <td className="text-center">{inspection.total}</td>
                        <td className="text-center text-success">{inspection.passed}</td>
                        <td className="text-center text-red-500">{inspection.failed}</td>
                        <td className="text-center text-purple-600 font-semibold">
                          {inspection.aiDetected}/{inspection.failed}
                        </td>
                        <td className="text-center">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {((inspection.passed / inspection.total) * 100).toFixed(1)}%
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Defect Analysis */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <AlertTriangle className="w-5 h-5 mr-2 text-yellow-500" />
                  Common Defects Detected
                </h3>
                <div className="space-y-3">
                  {[
                    { defect: 'Surface Cracks', count: 23, severity: 'Low' },
                    { defect: 'Alignment Issues', count: 12, severity: 'Medium' },
                    { defect: 'Water Seepage', count: 8, severity: 'High' },
                    { defect: 'Reinforcement Errors', count: 5, severity: 'Critical' },
                    { defect: 'Dimension Variance', count: 15, severity: 'Low' }
                  ].map((item) => (
                    <div key={item.defect} className="flex items-center justify-between">
                      <span className="text-sm">{item.defect}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{item.count}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          item.severity === 'Critical' ? 'bg-red-100 text-red-800' :
                          item.severity === 'High' ? 'bg-orange-100 text-orange-800' :
                          item.severity === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-green-100 text-green-800'
                        }`}>
                          {item.severity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white rounded-lg p-6 shadow-md">
                <h3 className="text-lg font-bold mb-4 flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-500" />
                  Quality Improvements
                </h3>
                <div className="space-y-3">
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Defect Reduction</span>
                      <span className="text-sm font-medium">-45%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">First-Time Pass Rate</span>
                      <span className="text-sm font-medium">+28%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-500 h-2 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm">Inspection Efficiency</span>
                      <span className="text-sm font-medium">+65%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-500 h-2 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'ai-inspection' && (
          <motion.div
            key="ai-inspection"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="bg-white rounded-xl shadow-lg p-6"
          >
            <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-purple-600" />
              AI-Powered Photo Analysis
            </h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                {!uploadedImage ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-purple-400 transition-colors cursor-pointer"
                       onClick={() => setUploadedImage('/sample-construction.jpg')}
                  >
                    <Upload className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                    <p className="text-lg font-medium mb-2">Upload Construction Photo</p>
                    <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                    <p className="text-xs text-gray-400 mt-2">Supports: JPG, PNG, HEIC (max 10MB)</p>
                  </div>
                ) : (
                  <div className="relative rounded-lg overflow-hidden bg-gray-100" ref={imageRef}>
                    <div className="aspect-w-16 aspect-h-12 bg-gradient-to-br from-gray-200 to-gray-300 flex items-center justify-center">
                      <Building className="w-24 h-24 text-gray-400" />
                    </div>
                    
                    {/* Defect markers */}
                    {detectedDefects.map((defect) => (
                      <motion.div
                        key={defect.id}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className={`absolute w-8 h-8 rounded-full border-2 cursor-pointer ${
                          defect.severity === 'critical' ? 'border-red-500 bg-red-100' :
                          defect.severity === 'high' ? 'border-orange-500 bg-orange-100' :
                          defect.severity === 'medium' ? 'border-yellow-500 bg-yellow-100' :
                          'border-green-500 bg-green-100'
                        }`}
                        style={{ left: `${defect.location.x}%`, top: `${defect.location.y}%`, transform: 'translate(-50%, -50%)' }}
                      >
                        <Target className="w-full h-full p-1" />
                      </motion.div>
                    ))}
                    
                    {isAnalyzing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="bg-white rounded-lg p-6 text-center">
                          <Scan className="w-12 h-12 mx-auto mb-3 text-purple-600 animate-pulse" />
                          <p className="font-semibold">Analyzing Image...</p>
                          <p className="text-sm text-gray-600">AI is detecting defects</p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
                
                {uploadedImage && (
                  <div className="mt-4 flex gap-2">
                    <button
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      className="flex-1 bg-purple-600 text-white py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                    >
                      <Brain className="w-5 h-5" />
                      {isAnalyzing ? 'Analyzing...' : 'Analyze with AI'}
                    </button>
                    <button
                      onClick={() => {
                        setUploadedImage(null)
                        setDetectedDefects([])
                      }}
                      className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Reset
                    </button>
                  </div>
                )}
              </div>
              
              <div>
                <h4 className="font-semibold mb-4">Analysis Results</h4>
                
                {detectedDefects.length === 0 ? (
                  <div className="bg-gray-50 rounded-lg p-8 text-center">
                    <Eye className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                    <p className="text-gray-600">No analysis yet</p>
                    <p className="text-sm text-gray-500 mt-1">Upload and analyze a photo to see results</p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {detectedDefects.map((defect) => (
                      <motion.div
                        key={defect.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="border rounded-lg p-4"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h5 className="font-semibold">{defect.type}</h5>
                          <span className={`text-xs px-2 py-1 rounded-full ${
                            defect.severity === 'critical' ? 'bg-red-100 text-red-700' :
                            defect.severity === 'high' ? 'bg-orange-100 text-orange-700' :
                            defect.severity === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                            'bg-green-100 text-green-700'
                          }`}>
                            {defect.severity.toUpperCase()}
                          </span>
                        </div>
                        
                        <div className="text-sm text-gray-600 mb-2">
                          <span className="font-medium">Confidence:</span> {defect.confidence}%
                        </div>
                        
                        <div className="bg-blue-50 rounded p-3">
                          <p className="text-sm">
                            <span className="font-medium">AI Recommendation:</span> {defect.recommendation}
                          </p>
                        </div>
                      </motion.div>
                    ))}
                    
                    <div className="mt-4 p-4 bg-gradient-to-br from-purple-50 to-indigo-50 rounded-lg">
                      <h5 className="font-semibold mb-2">Overall Assessment</h5>
                      <p className="text-sm text-gray-700">Structure shows minor to moderate issues. Immediate attention required for water damage. Schedule comprehensive repair within 7 days.</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'live-monitor' && (
          <motion.div
            key="live-monitor"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-6">
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <Activity className="w-5 h-5 text-purple-600" />
                Live Quality Monitoring - Gulshan Site
              </h3>
              
              <div className="grid md:grid-cols-4 gap-4">
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2 }}
                  className="bg-white rounded-lg p-4 text-center"
                >
                  <ThermometerSun className={`w-8 h-8 mx-auto mb-2 ${
                    monitoringData.temperature >= 26 && monitoringData.temperature <= 30 ? 'text-green-500' : 'text-yellow-500'
                  }`} />
                  <p className="text-2xl font-bold">{monitoringData.temperature.toFixed(1)}°C</p>
                  <p className="text-sm text-gray-600">Concrete Temperature</p>
                  <p className={`text-xs mt-1 ${
                    monitoringData.temperature >= 26 && monitoringData.temperature <= 30 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {monitoringData.temperature >= 26 && monitoringData.temperature <= 30 ? 'Optimal Range' : 'Slightly High'}
                  </p>
                </motion.div>
                
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 0.5 }}
                  className="bg-white rounded-lg p-4 text-center"
                >
                  <Droplets className={`w-8 h-8 mx-auto mb-2 ${
                    monitoringData.humidity <= 75 ? 'text-green-500' : 'text-yellow-500'
                  }`} />
                  <p className="text-2xl font-bold">{monitoringData.humidity.toFixed(0)}%</p>
                  <p className="text-sm text-gray-600">Humidity Level</p>
                  <p className={`text-xs mt-1 ${
                    monitoringData.humidity <= 75 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {monitoringData.humidity <= 75 ? 'Acceptable' : 'Slightly High'}
                  </p>
                </motion.div>
                
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1 }}
                  className="bg-white rounded-lg p-4 text-center"
                >
                  <Activity className={`w-8 h-8 mx-auto mb-2 ${
                    monitoringData.vibration <= 1.0 ? 'text-green-500' : 'text-yellow-500'
                  }`} />
                  <p className="text-2xl font-bold">{monitoringData.vibration.toFixed(1)}mm</p>
                  <p className="text-sm text-gray-600">Vibration Level</p>
                  <p className={`text-xs mt-1 ${
                    monitoringData.vibration <= 1.0 ? 'text-green-600' : 'text-yellow-600'
                  }`}>
                    {monitoringData.vibration <= 1.0 ? 'Within Limits' : 'Monitor Closely'}
                  </p>
                </motion.div>
                
                <motion.div
                  animate={{ scale: [1, 1.02, 1] }}
                  transition={{ repeat: Infinity, duration: 2, delay: 1.5 }}
                  className="bg-white rounded-lg p-4 text-center"
                >
                  <Gauge className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="text-2xl font-bold">{monitoringData.strength.toFixed(1)} MPa</p>
                  <p className="text-sm text-gray-600">Concrete Strength</p>
                  <p className="text-xs text-green-600 mt-1">Above Target</p>
                </motion.div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-yellow-500" />
                  Active Alerts
                </h4>
                <div className="space-y-3">
                  <div className="flex items-start gap-3 p-3 bg-yellow-50 rounded-lg">
                    <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">High Humidity Alert</p>
                      <p className="text-xs text-gray-600">Floor 15 - Consider dehumidification</p>
                      <p className="text-xs text-gray-500 mt-1">Triggered 5 mins ago</p>
                    </div>
                  </div>
                  
                  <div className="flex items-start gap-3 p-3 bg-blue-50 rounded-lg">
                    <Clock className="w-5 h-5 text-blue-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-sm">Curing Time Reminder</p>
                      <p className="text-xs text-gray-600">Slab B4 - 24 hours remaining</p>
                      <p className="text-xs text-gray-500 mt-1">Scheduled alert</p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg p-6 shadow-md">
                <h4 className="font-semibold mb-4 flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  Recent Quality Checks
                </h4>
                <div className="space-y-3">
                  {[
                    { time: '10:30 AM', area: 'Floor 12 - Column C3', result: 'Passed', score: 98 },
                    { time: '09:45 AM', area: 'Floor 11 - Slab A2', result: 'Passed', score: 95 },
                    { time: '09:15 AM', area: 'Floor 10 - Beam B1', result: 'Minor Issue', score: 88 },
                    { time: '08:30 AM', area: 'Floor 9 - Wall W4', result: 'Passed', score: 96 }
                  ].map((check, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded">
                      <div>
                        <p className="text-sm font-medium">{check.area}</p>
                        <p className="text-xs text-gray-500">{check.time}</p>
                      </div>
                      <div className="text-right">
                        <span className={`text-sm font-medium ${
                          check.result === 'Passed' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {check.result}
                        </span>
                        <p className="text-xs text-gray-500">Score: {check.score}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {activeView === 'compliance' && (
          <motion.div
            key="compliance"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-lg p-6 shadow-md">
              <h3 className="text-xl font-bold mb-6">BNBC 2020 Compliance Dashboard</h3>
              <div className="grid md:grid-cols-4 gap-4">
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="font-semibold">Structural Safety</p>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                  <p className="text-xs text-gray-500 mt-1">Last audit: 2 days ago</p>
                </div>
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="font-semibold">Fire Safety</p>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                  <p className="text-xs text-gray-500 mt-1">Last audit: 5 days ago</p>
                </div>
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="font-semibold">Environmental</p>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                  <p className="text-xs text-gray-500 mt-1">Last audit: 1 week ago</p>
                </div>
                <div className="text-center p-4 border rounded-lg hover:shadow-md transition-shadow">
                  <Shield className="w-8 h-8 mx-auto mb-2 text-green-500" />
                  <p className="font-semibold">Accessibility</p>
                  <p className="text-2xl font-bold text-green-600">100%</p>
                  <p className="text-xs text-gray-500 mt-1">Last audit: 3 days ago</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-lg p-6">
              <h4 className="font-semibold mb-4">Compliance Certificates</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">RAJUK Approval</h5>
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Building Plan Approval Certificate</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Valid Until: Dec 2025</span>
                    <button className="text-purple-600 hover:underline">View PDF</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">Fire Service License</h5>
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Fire Safety Clearance Certificate</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Valid Until: Mar 2026</span>
                    <button className="text-purple-600 hover:underline">View PDF</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">Environmental Clearance</h5>
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">DoE Environmental Certificate</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Valid Until: Jun 2025</span>
                    <button className="text-purple-600 hover:underline">View PDF</button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h5 className="font-medium">Structural Certificate</h5>
                    <Award className="w-5 h-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-2">Structural Stability Certificate</p>
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>Valid Until: Sep 2025</span>
                    <button className="text-purple-600 hover:underline">View PDF</button>
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
            <feature.icon className="w-10 h-10 text-purple-600 mb-4" />
            <h4 className="text-lg font-bold mb-2">{feature.title}</h4>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </motion.div>
    </div>
  )
}