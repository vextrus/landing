'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, AlertTriangle, CheckCircle, Clock, ChevronDown, ChevronUp } from 'lucide-react'

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
  dependencies: string[]
}

interface Task {
  id: string
  name: string
  startDate: Date
  endDate: Date
  progress: number
  assignedTo: string
  critical: boolean
}

const sampleProjects: Project[] = [
  {
    id: 'p1',
    name: 'Gulshan Heights Tower A',
    location: 'Gulshan-2, Dhaka',
    startDate: new Date('2024-01-15'),
    endDate: new Date('2025-06-30'),
    progress: 65,
    status: 'on-track',
    tasks: [
      {
        id: 't1',
        name: 'Foundation Work',
        startDate: new Date('2024-01-15'),
        endDate: new Date('2024-03-30'),
        progress: 100,
        assignedTo: 'Team Alpha',
        critical: true
      },
      {
        id: 't2',
        name: 'Structural Framework',
        startDate: new Date('2024-04-01'),
        endDate: new Date('2024-09-30'),
        progress: 85,
        assignedTo: 'Team Beta',
        critical: true
      },
      {
        id: 't3',
        name: 'MEP Installation',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2025-02-28'),
        progress: 40,
        assignedTo: 'Team Gamma',
        critical: false
      }
    ],
    dependencies: []
  },
  {
    id: 'p2',
    name: 'Dhanmondi Square Complex',
    location: 'Dhanmondi-27, Dhaka',
    startDate: new Date('2024-03-01'),
    endDate: new Date('2025-08-31'),
    progress: 45,
    status: 'delayed',
    tasks: [
      {
        id: 't4',
        name: 'Land Preparation',
        startDate: new Date('2024-03-01'),
        endDate: new Date('2024-04-15'),
        progress: 100,
        assignedTo: 'Team Delta',
        critical: true
      },
      {
        id: 't5',
        name: 'Foundation Work',
        startDate: new Date('2024-04-16'),
        endDate: new Date('2024-06-30'),
        progress: 90,
        assignedTo: 'Team Alpha',
        critical: true
      },
      {
        id: 't6',
        name: 'Structural Work',
        startDate: new Date('2024-07-01'),
        endDate: new Date('2025-01-31'),
        progress: 25,
        assignedTo: 'Team Beta',
        critical: true
      }
    ],
    dependencies: ['p1']
  },
  {
    id: 'p3',
    name: 'Uttara Business Park',
    location: 'Uttara Sector-9, Dhaka',
    startDate: new Date('2024-06-01'),
    endDate: new Date('2025-12-31'),
    progress: 30,
    status: 'at-risk',
    tasks: [
      {
        id: 't7',
        name: 'RAJUK Approval',
        startDate: new Date('2024-06-01'),
        endDate: new Date('2024-07-31'),
        progress: 100,
        assignedTo: 'Legal Team',
        critical: true
      },
      {
        id: 't8',
        name: 'Site Development',
        startDate: new Date('2024-08-01'),
        endDate: new Date('2024-10-31'),
        progress: 60,
        assignedTo: 'Team Epsilon',
        critical: false
      }
    ],
    dependencies: []
  }
]

export default function ProjectTimeline() {
  const [projects, setProjects] = useState(sampleProjects)
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [expandedProjects, setExpandedProjects] = useState<string[]>(['p1'])
  const [draggedProject, setDraggedProject] = useState<string | null>(null)
  const [showAIAlert, setShowAIAlert] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Calculate timeline range
  const allDates = projects.flatMap(p => [p.startDate, p.endDate])
  const minDate = new Date(Math.min(...allDates.map(d => d.getTime())))
  const maxDate = new Date(Math.max(...allDates.map(d => d.getTime())))
  
  // Add padding
  minDate.setMonth(minDate.getMonth() - 1)
  maxDate.setMonth(maxDate.getMonth() + 1)

  const months = []
  const current = new Date(minDate)
  while (current <= maxDate) {
    months.push(new Date(current))
    current.setMonth(current.getMonth() + 1)
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

  const handleDragStart = (projectId: string) => {
    setDraggedProject(projectId)
  }

  const handleDragEnd = () => {
    setDraggedProject(null)
    // Simulate AI prediction after drag
    setTimeout(() => {
      setShowAIAlert(true)
      setTimeout(() => setShowAIAlert(false), 5000)
    }, 500)
  }

  const getStatusColor = (status: Project['status']) => {
    switch (status) {
      case 'on-track': return 'bg-green-500'
      case 'delayed': return 'bg-red-500'
      case 'at-risk': return 'bg-yellow-500'
      case 'completed': return 'bg-blue-500'
    }
  }

  const getStatusBgColor = (status: Project['status']) => {
    switch (status) {
      case 'on-track': return 'bg-green-100'
      case 'delayed': return 'bg-red-100'
      case 'at-risk': return 'bg-yellow-100'
      case 'completed': return 'bg-blue-100'
    }
  }

  return (
    <div className="w-full">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-lg font-semibold flex items-center gap-2">
          <Calendar className="w-5 h-5 text-primary" />
          Multi-Project Timeline
        </h4>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>On Track</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full" />
            <span>At Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-red-500 rounded-full" />
            <span>Delayed</span>
          </div>
        </div>
      </div>

      {/* AI Alert */}
      <AnimatePresence>
        {showAIAlert && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-4 p-4 bg-gradient-to-r from-purple-100 to-indigo-100 rounded-lg border border-purple-300"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-white text-xs font-bold">AI</span>
              </div>
              <div className="flex-1">
                <p className="font-semibold text-purple-900">AI Prediction Alert</p>
                <p className="text-sm text-purple-700 mt-1">
                  Moving resources from Gulshan Heights to Dhanmondi Square will reduce overall project delays by 15 days. 
                  This optimization can save ৳45 Lakh in penalty costs.
                </p>
                <div className="flex gap-2 mt-2">
                  <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm hover:bg-purple-700">
                    Apply Suggestion
                  </button>
                  <button className="px-3 py-1 bg-white text-purple-600 border border-purple-300 rounded text-sm hover:bg-purple-50">
                    View Details
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Timeline Container */}
      <div 
        ref={scrollRef}
        className="bg-white rounded-lg shadow-lg overflow-x-auto"
      >
        <div className="min-w-[1200px] p-6">
          {/* Month Headers */}
          <div className="flex border-b border-gray-200 pb-2 mb-4">
            <div className="w-48 flex-shrink-0" />
            <div className="flex-1 relative">
              <div className="flex">
                {months.map((month, i) => (
                  <div 
                    key={i}
                    className="flex-1 text-center text-sm font-medium text-gray-600"
                  >
                    {month.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
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
              className="mb-4"
            >
              {/* Project Row */}
              <div className="flex items-center group">
                <div className="w-48 flex-shrink-0 pr-4">
                  <button
                    onClick={() => toggleProjectExpansion(project.id)}
                    className="w-full text-left flex items-center gap-2 hover:bg-gray-50 p-2 rounded"
                  >
                    {expandedProjects.includes(project.id) ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                    <div className="flex-1">
                      <p className="font-medium text-sm">{project.name}</p>
                      <p className="text-xs text-gray-500">{project.location}</p>
                    </div>
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(project.status)}`} />
                  </button>
                </div>

                <div className="flex-1 relative h-12">
                  {/* Project Bar */}
                  <motion.div
                    className={`absolute h-full rounded-lg cursor-move ${getStatusBgColor(project.status)} border-2 border-transparent hover:border-gray-400 transition-all`}
                    style={{
                      left: `${getPositionForDate(project.startDate)}%`,
                      width: `${getWidthForDuration(project.startDate, project.endDate)}%`
                    }}
                    draggable
                    onDragStart={() => handleDragStart(project.id)}
                    onDragEnd={handleDragEnd}
                    whileDrag={{ scale: 1.05, zIndex: 10 }}
                  >
                    <div 
                      className={`h-full ${getStatusColor(project.status)} rounded-lg transition-all`}
                      style={{ width: `${project.progress}%` }}
                    />
                    <div className="absolute inset-0 flex items-center px-2">
                      <span className="text-xs font-medium text-gray-700 truncate">
                        {project.progress}%
                      </span>
                    </div>
                  </motion.div>

                  {/* Dependencies */}
                  {project.dependencies.map(depId => {
                    const depProject = projects.find(p => p.id === depId)
                    if (!depProject) return null
                    return (
                      <svg
                        key={depId}
                        className="absolute top-1/2 transform -translate-y-1/2 pointer-events-none"
                        style={{
                          left: `${getPositionForDate(depProject.endDate)}%`,
                          width: `${getPositionForDate(project.startDate) - getPositionForDate(depProject.endDate)}%`
                        }}
                        height="2"
                      >
                        <line
                          x1="0"
                          y1="1"
                          x2="100%"
                          y2="1"
                          stroke="#9CA3AF"
                          strokeDasharray="4 4"
                        />
                      </svg>
                    )
                  })}
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
                        <div className="w-48 flex-shrink-0 pr-4 pl-8">
                          <p className="text-xs text-gray-600">{task.name}</p>
                          <p className="text-xs text-gray-400">{task.assignedTo}</p>
                        </div>
                        <div className="flex-1 relative h-8">
                          <div
                            className={`absolute h-full rounded ${task.critical ? 'bg-red-100' : 'bg-blue-100'}`}
                            style={{
                              left: `${getPositionForDate(task.startDate)}%`,
                              width: `${getWidthForDuration(task.startDate, task.endDate)}%`
                            }}
                          >
                            <div 
                              className={`h-full ${task.critical ? 'bg-red-400' : 'bg-blue-400'} rounded`}
                              style={{ width: `${task.progress}%` }}
                            />
                            <div className="absolute inset-0 flex items-center px-1">
                              <span className="text-xs font-medium text-gray-700">
                                {task.progress}%
                              </span>
                            </div>
                          </div>
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
            className="absolute top-0 bottom-0 w-0.5 bg-red-500 z-20 pointer-events-none"
            style={{ left: `${getPositionForDate(new Date())}%` }}
          >
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 bg-red-500 text-white text-xs px-2 py-1 rounded">
              Today
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}