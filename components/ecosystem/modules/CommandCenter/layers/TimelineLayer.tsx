'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar, 
  AlertTriangle, 
  CheckCircle, 
  Clock, 
  ChevronDown, 
  ChevronUp,
  Zap,
  TrendingUp,
  CloudRain,
  Users,
  Cpu,
  DollarSign
} from 'lucide-react'
import { formatBDT } from '@/components/ecosystem/utils/bdCurrency'

interface Task {
  id: string
  name: string
  startDate: Date
  endDate: Date
  progress: number
  assignedTo: string
  dependencies: string[]
  critical: boolean
  resources: number
  cost: number
  aiPredictedDelay?: number
}

interface Project {
  id: string
  name: string
  location: string
  startDate: Date
  endDate: Date
  actualEndDate?: Date
  progress: number
  status: 'on-track' | 'delayed' | 'at-risk' | 'completed'
  tasks: Task[]
  budget: number
  spent: number
  aiConfidence: number
  weatherImpact?: {
    type: 'rain' | 'heat' | 'normal'
    delayDays: number
  }
}

interface TimelineLayerProps {
  predictions: any[]
}

const projects: Project[] = [
  {
    id: 'p1',
    name: 'Bashundhara Heights Tower A',
    location: 'Bashundhara R/A, Dhaka',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2025-06-30'),
    progress: 72,
    status: 'on-track',
    budget: 850000000, // 85 Cr
    spent: 612000000, // 61.2 Cr
    aiConfidence: 92,
    tasks: [
      {
        id: 't1',
        name: 'Foundation & Piling',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-03-30'),
        progress: 100,
        assignedTo: 'Team Alpha',
        dependencies: [],
        critical: true,
        resources: 45,
        cost: 120000000
      },
      {
        id: 't2',
        name: 'Structural Framework',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-09-30'),
        progress: 85,
        assignedTo: 'Team Beta',
        dependencies: ['t1'],
        critical: true,
        resources: 80,
        cost: 280000000
      },
      {
        id: 't3',
        name: 'MEP Installation',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2025-02-28'),
        progress: 45,
        assignedTo: 'Team Gamma',
        dependencies: ['t2'],
        critical: false,
        resources: 60,
        cost: 180000000,
        aiPredictedDelay: 15
      }
    ],
    weatherImpact: {
      type: 'rain',
      delayDays: 12
    }
  },
  {
    id: 'p2',
    name: 'Jolshiri Twin Towers',
    location: 'Jolshiri Abashon, Dhaka',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2025-08-31'),
    progress: 38,
    status: 'at-risk',
    budget: 1200000000, // 120 Cr
    spent: 456000000, // 45.6 Cr
    aiConfidence: 78,
    tasks: [
      {
        id: 't4',
        name: 'Site Preparation',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-15'),
        progress: 100,
        assignedTo: 'Team Delta',
        dependencies: [],
        critical: true,
        resources: 35,
        cost: 80000000
      },
      {
        id: 't5',
        name: 'Foundation Work',
        startDate: new Date('2024-04-16'),
        endDate: new Date('2024-06-30'),
        progress: 90,
        assignedTo: 'Team Alpha',
        dependencies: ['t4'],
        critical: true,
        resources: 55,
        cost: 150000000,
        aiPredictedDelay: 8
      },
      {
        id: 't6',
        name: 'Tower Construction',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2025-03-31'),
        progress: 25,
        assignedTo: 'Team Beta & Epsilon',
        dependencies: ['t5'],
        critical: true,
        resources: 120,
        cost: 650000000,
        aiPredictedDelay: 25
      }
    ],
    weatherImpact: {
      type: 'rain',
      delayDays: 18
    }
  }
]

export default function TimelineLayer({ predictions }: TimelineLayerProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [expandedProjects, setExpandedProjects] = useState<string[]>(['p1'])
  const [draggedTask, setDraggedTask] = useState<string | null>(null)
  const [showAIPredictions, setShowAIPredictions] = useState(true)
  const [viewMode, setViewMode] = useState<'month' | 'quarter' | 'year'>('month')
  const scrollRef = useRef<HTMLDivElement>(null)

  // Calculate timeline range
  const allDates = projects.flatMap(p => [
    p.startDate, 
    p.endDate,
    ...p.tasks.flatMap(t => [t.startDate, t.endDate])
  ])
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))
  
  // Add padding
  minDate.setMonth(minDate.getMonth() - 1)
  maxDate.setMonth(maxDate.getMonth() + 2)

  const getTimeUnits = () => {
    const units = []
    const current = new Date(minDate)
    
    while (current <= maxDate) {
      units.push(new Date(current))
      if (viewMode === 'month') {
        current.setMonth(current.getMonth() + 1)
      } else if (viewMode === 'quarter') {
        current.setMonth(current.getMonth() + 3)
      } else {
        current.setFullYear(current.getFullYear() + 1)
      }
    }
    
    return units
  }

  const getPositionForDate = (date: Date) => {
    const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    const daysPassed = (date.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    return (daysPassed / totalDays) * 100
  }

  const getWidthForDuration = (start: Date, end: Date) => {
    const totalDays = (maxDate.getTime() - minDate.getTime()) / (1000 * 60 * 60 * 24)
    const duration = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    return (duration / totalDays) * 100
  }

  const toggleProjectExpansion = (projectId: string) => {
    setExpandedProjects(prev => 
      prev.includes(projectId) 
        ? prev.filter(id => id !== projectId)
        : [...prev, projectId]
    )
  }

  const timeUnits = getTimeUnits()

  return (
    <div className="w-full h-full flex flex-col bg-white rounded-xl">
      {/* Header Controls */}
      <div className="p-4 border-b border-gray-300">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            AI-Enhanced Project Timeline
          </h3>
          
          <div className="flex items-center gap-4">
            {/* View Mode Selector */}
            <div className="flex gap-1 bg-gray-800 rounded-lg p-1">
              {(['month', 'quarter', 'year'] as const).map(mode => (
                <button
                  key={mode}
                  onClick={() => setViewMode(mode)}
                  className={`px-3 py-1 rounded text-sm font-medium transition-all ${
                    viewMode === mode
                      ? 'bg-purple-600 text-gray-900'
                      : 'text-gray-400 hover:text-gray-900'
                  }`}
                >
                  {mode.charAt(0).toUpperCase() + mode.slice(1)}
                </button>
              ))}
            </div>

            {/* AI Toggle */}
            <button
              onClick={() => setShowAIPredictions(!showAIPredictions)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-all ${
                showAIPredictions
                  ? 'bg-purple-600 text-gray-900'
                  : 'bg-gray-800 text-gray-400'
              }`}
            >
              <Cpu className="w-4 h-4" />
              AI Predictions
            </button>
          </div>
        </div>

        {/* Timeline Stats */}
        <div className="grid grid-cols-4 gap-4">
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Total Projects</p>
            <p className="text-2xl font-bold text-gray-900">{projects.length}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">Total Budget</p>
            <p className="text-2xl font-bold text-gray-900">{formatBDT(projects.reduce((sum, p) => sum + p.budget, 0))}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">At Risk</p>
            <p className="text-2xl font-bold text-yellow-500">{projects.filter(p => p.status === 'at-risk').length}</p>
          </div>
          <div className="bg-gray-100 rounded-lg p-3">
            <p className="text-xs text-gray-400 mb-1">AI Accuracy</p>
            <p className="text-2xl font-bold text-purple-500">
              {Math.round(projects.reduce((sum, p) => sum + p.aiConfidence, 0) / projects.length)}%
            </p>
          </div>
        </div>
      </div>

      {/* Timeline Container */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-x-auto overflow-y-auto"
      >
        <div className="min-w-[1400px] p-6">
          {/* Time Headers */}
          <div className="flex border-b border-gray-300 pb-2 mb-6">
            <div className="w-64 flex-shrink-0" />
            <div className="flex-1 relative">
              <div className="flex">
                {timeUnits.map((unit, i) => (
                  <div 
                    key={i}
                    className="flex-1 text-center text-sm font-medium text-gray-400"
                  >
                    {unit.toLocaleDateString('en-US', { 
                      month: viewMode === 'year' ? undefined : 'short', 
                      year: viewMode === 'month' ? undefined : 'numeric'
                    })}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Projects */}
          {projects.map((project, projectIndex) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: projectIndex * 0.1 }}
              className="mb-6"
            >
              {/* Project Header */}
              <div className="flex items-center group mb-2">
                <div className="w-64 flex-shrink-0 pr-4">
                  <button
                    onClick={() => toggleProjectExpansion(project.id)}
                    className="w-full text-left flex items-center gap-2 hover:bg-gray-100 p-3 rounded-lg transition-all"
                  >
                    {expandedProjects.includes(project.id) ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-gray-900">{project.name}</p>
                      <p className="text-xs text-gray-400">{project.location}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <div className={`w-2 h-2 rounded-full ${
                          project.status === 'on-track' ? 'bg-green-500' :
                          project.status === 'at-risk' ? 'bg-yellow-500' :
                          project.status === 'delayed' ? 'bg-red-500' :
                          'bg-blue-500'
                        }`} />
                        <span className="text-xs text-gray-500">{formatBDT(project.spent)} / {formatBDT(project.budget)}</span>
                      </div>
                    </div>
                  </button>
                </div>

                <div className="flex-1 relative h-16">
                  {/* Project Bar */}
                  <motion.div
                    className="absolute h-12 rounded-lg bg-gray-100 border border-gray-300 overflow-hidden"
                    style={{
                      left: `${getPositionForDate(project.startDate)}%`,
                      width: `${getWidthForDuration(project.startDate, project.endDate)}%`
                    }}
                  >
                    {/* Progress Fill */}
                    <motion.div 
                      className={`h-full ${
                        project.status === 'on-track' ? 'bg-green-500/50' :
                        project.status === 'at-risk' ? 'bg-yellow-500/50' :
                        project.status === 'delayed' ? 'bg-red-500/50' :
                        'bg-blue-500/50'
                      }`}
                      initial={{ width: 0 }}
                      animate={{ width: `${project.progress}%` }}
                      transition={{ duration: 1, delay: 0.5 }}
                    />
                    
                    {/* Progress Text */}
                    <div className="absolute inset-0 flex items-center px-3">
                      <span className="text-xs font-medium text-gray-900">
                        {project.progress}%
                      </span>
                    </div>

                    {/* AI Prediction Overlay */}
                    {showAIPredictions && project.weatherImpact && (
                      <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-2">
                        <CloudRain className="w-4 h-4 text-blue-400" />
                        <span className="text-xs text-gray-300">+{project.weatherImpact.delayDays}d</span>
                      </div>
                    )}
                  </motion.div>

                  {/* Critical Path Indicator */}
                  {project.tasks.some(t => t.critical) && (
                    <div className="absolute -top-2 left-0 right-0 h-1 opacity-50">
                      <motion.div
                        className="h-full bg-red-500"
                        style={{
                          marginLeft: `${getPositionForDate(project.startDate)}%`,
                          width: `${getWidthForDuration(project.startDate, project.endDate)}%`
                        }}
                        animate={{
                          opacity: [0.3, 0.8, 0.3]
                        }}
                        transition={{
                          duration: 2,
                          repeat: Infinity
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* Expanded Tasks */}
              <AnimatePresence>
                {expandedProjects.includes(project.id) && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden"
                  >
                    {project.tasks.map((task, taskIndex) => (
                      <div key={task.id} className="flex items-center mt-2">
                        <div className="w-64 flex-shrink-0 pr-4 pl-12">
                          <div className="text-sm">
                            <p className="text-gray-300">{task.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                              <Users className="w-3 h-3" />
                              <span>{task.assignedTo}</span>
                              <span>•</span>
                              <span>{task.resources} people</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex-1 relative h-10">
                          <motion.div
                            className={`absolute h-8 rounded ${
                              task.critical 
                                ? 'bg-red-900/30 border border-red-500/50' 
                                : 'bg-blue-900/30 border border-blue-500/50'
                            }`}
                            style={{
                              left: `${getPositionForDate(task.startDate)}%`,
                              width: `${getWidthForDuration(task.startDate, task.endDate)}%`
                            }}
                            draggable
                            whileDrag={{ scale: 1.05, zIndex: 10 }}
                            onDragStart={() => setDraggedTask(task.id)}
                            onDragEnd={() => setDraggedTask(null)}
                          >
                            {/* Task Progress */}
                            <div 
                              className={`h-full ${
                                task.critical ? 'bg-red-500/50' : 'bg-blue-500/50'
                              } rounded`}
                              style={{ width: `${task.progress}%` }}
                            />
                            
                            {/* Task Info */}
                            <div className="absolute inset-0 flex items-center justify-between px-2">
                              <span className="text-xs font-medium text-gray-900">
                                {task.progress}%
                              </span>
                              
                              {/* AI Delay Prediction */}
                              {showAIPredictions && task.aiPredictedDelay && (
                                <div className="flex items-center gap-1 bg-yellow-900/50 rounded px-1">
                                  <Zap className="w-3 h-3 text-yellow-400" />
                                  <span className="text-xs text-yellow-300">
                                    +{task.aiPredictedDelay}d
                                  </span>
                                </div>
                              )}
                            </div>
                          </motion.div>

                          {/* Dependencies */}
                          {task.dependencies.map(depId => {
                            const depTask = project.tasks.find(t => t.id === depId)
                            if (!depTask) return null
                            
                            return (
                              <svg
                                key={depId}
                                className="absolute top-4 pointer-events-none"
                                style={{
                                  left: `${getPositionForDate(depTask.endDate)}%`,
                                  width: `${getPositionForDate(task.startDate) - getPositionForDate(depTask.endDate)}%`
                                }}
                                height="2"
                              >
                                <line
                                  x1="0"
                                  y1="1"
                                  x2="100%"
                                  y2="1"
                                  stroke="#9CA3AF"
                                  strokeDasharray="2 2"
                                />
                              </svg>
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}

          {/* Today Line */}
          <div 
            className="absolute top-0 bottom-0 w-0.5 bg-purple-500 z-20 pointer-events-none"
            style={{ left: `${getPositionForDate(new Date())}%` }}
          >
            <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-purple-600 text-gray-900 text-xs px-2 py-1 rounded whitespace-nowrap">
              Today
            </div>
          </div>

          {/* Grid Lines */}
          <div className="absolute inset-0 pointer-events-none">
            {timeUnits.map((unit, i) => (
              <div
                key={i}
                className="absolute top-0 bottom-0 w-px bg-gray-800"
                style={{ left: `${getPositionForDate(unit)}%` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* AI Insights Panel */}
      {showAIPredictions && predictions.length > 0 && (
        <div className="p-4 border-t border-gray-300 bg-gray-100">
          <h4 className="text-sm font-semibold text-gray-900 mb-2 flex items-center gap-2">
            <TrendingUp className="w-4 h-4 text-purple-400" />
            AI Timeline Insights
          </h4>
          <div className="grid grid-cols-3 gap-3">
            {predictions.slice(0, 3).map((prediction, index) => (
              <div key={index} className="bg-white rounded-lg p-3">
                <p className="text-xs text-gray-400">{prediction.type}</p>
                <p className="text-sm text-gray-900 mt-1">{prediction.message}</p>
                <p className="text-xs text-purple-400 mt-1">Impact: {prediction.impact}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}