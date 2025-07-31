'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Calendar, AlertCircle, CheckCircle, Clock, ChevronRight, Zap, TrendingUp, AlertTriangle, Users, Building } from 'lucide-react'
import { bangladeshSites } from '../../services/bangladeshSitesData'

interface TimelineWidgetProps {}

// Get active projects from Bangladesh sites
const activeProjects = bangladeshSites
  .filter(site => site.status !== 'completed' && site.status !== 'planning')
  .slice(0, 6)
  .map((site, index) => ({
    id: site.id,
    name: site.name,
    location: site.location,
    startDate: site.startDate,
    endDate: site.completionDate,
    progress: site.progress,
    status: site.details.issues > 2 ? 'at-risk' : site.progress > 60 ? 'on-track' : 'normal',
    priority: site.budget > 2000000000 ? 'high' : 'medium',
    workers: site.workers,
    phase: site.details.phase,
    milestones: site.details.milestones
  }))

export default function TimelineWidget({}: TimelineWidgetProps) {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const scrollRef = useRef<HTMLDivElement>(null)
  const [showLeftScroll, setShowLeftScroll] = useState(false)
  const [showRightScroll, setShowRightScroll] = useState(true)

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return '#10B981'
      case 'at-risk': return '#F59E0B'
      case 'delayed': return '#EF4444'
      default: return '#3B82F6'
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'on-track': return CheckCircle
      case 'at-risk': return AlertCircle
      case 'delayed': return AlertTriangle
      default: return Clock
    }
  }

  // Calculate timeline position based on dates
  const calculateTimelinePosition = (startDate: string, endDate: string, progress: number) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    const today = new Date()
    
    const totalDuration = end.getTime() - start.getTime()
    const elapsed = today.getTime() - start.getTime()
    const expectedProgress = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100))
    
    return {
      expectedProgress: Math.round(expectedProgress),
      actualProgress: progress,
      isDelayed: progress < expectedProgress - 10
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
      setShowLeftScroll(scrollLeft > 0)
      setShowRightScroll(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  const scrollTo = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const scrollAmount = 400
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      })
    }
  }

  return (
    <motion.div 
      className="glass-light rounded-2xl overflow-hidden backdrop-blur-xl border border-gray-200/50 neo-shadow-light group hover-lift h-full flex flex-col"
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-gray-200/30 flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div 
              className="w-10 h-10 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-xl flex items-center justify-center shadow-lg"
              whileHover={{ rotate: 20, scale: 1.1 }}
              transition={{ duration: 0.3 }}
            >
              <Calendar className="w-5 h-5 text-white" />
            </motion.div>
            <div>
              <h3 className="font-semibold text-gray-900">Project Timeline</h3>
              <p className="text-xs text-gray-600">{activeProjects.length} active projects</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <motion.button 
              className="text-sm text-[#6366F1] hover:text-[#8B5CF6] transition-colors flex items-center gap-1 font-medium"
              whileHover={{ x: 5 }}
            >
              View Gantt Chart
              <ChevronRight className="w-4 h-4" />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Timeline Content with Scroll */}
      <div className="flex-1 overflow-hidden relative">
        {/* Scroll Indicators */}
        <AnimatePresence>
          {showLeftScroll && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scrollTo('left')}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5 rotate-180" />
            </motion.button>
          )}
          {showRightScroll && (
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => scrollTo('right')}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/90 rounded-full shadow-lg flex items-center justify-center hover:bg-white transition-colors"
            >
              <ChevronRight className="w-5 h-5" />
            </motion.button>
          )}
        </AnimatePresence>

        {/* Scrollable Timeline */}
        <div 
          ref={scrollRef}
          onScroll={handleScroll}
          className="overflow-x-auto scrollbar-hide p-6 h-full"
        >
          <div className="min-w-[1200px] space-y-6">
            {/* Time Scale Header */}
            <div className="relative h-12 mb-8">
              <div className="absolute inset-0 border-b-2 border-gray-200" />
              {/* Month markers */}
              {Array.from({ length: 12 }, (_, i) => {
                const date = new Date()
                date.setMonth(date.getMonth() + i - 2)
                return (
                  <div
                    key={i}
                    className="absolute top-0 h-full flex flex-col items-center"
                    style={{ left: `${(i / 12) * 100}%` }}
                  >
                    <div className="w-px h-3 bg-gray-400" />
                    <span className="text-xs text-gray-600 mt-1">
                      {date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}
                    </span>
                  </div>
                )
              })}
              {/* Today marker */}
              <motion.div
                className="absolute top-0 h-full flex flex-col items-center"
                style={{ left: '16.67%' }}
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <div className="w-0.5 h-full bg-red-500" />
                <span className="text-xs font-medium text-red-600 mt-1 bg-red-50 px-2 py-0.5 rounded-full">
                  Today
                </span>
              </motion.div>
            </div>

            {/* Project Rows */}
            <div className="space-y-4">
              {activeProjects.map((project, index) => {
                const StatusIcon = getStatusIcon(project.status)
                const isSelected = selectedProject === project.id
                const timeline = calculateTimelinePosition(project.startDate, project.endDate, project.progress)
                
                return (
                  <motion.div
                    key={project.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`relative p-4 rounded-xl border transition-all cursor-pointer ${
                      isSelected 
                        ? 'bg-indigo-50 border-indigo-300 shadow-lg' 
                        : 'bg-white border-gray-200 hover:border-gray-300 hover:shadow-md'
                    }`}
                    onClick={() => setSelectedProject(isSelected ? null : project.id)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3">
                        <StatusIcon 
                          className="w-5 h-5 mt-0.5 flex-shrink-0" 
                          style={{ color: getStatusColor(project.status) }}
                        />
                        <div>
                          <h4 className="font-semibold text-gray-900">{project.name}</h4>
                          <p className="text-sm text-gray-600">{project.location}</p>
                          <div className="flex items-center gap-4 mt-1 text-xs text-gray-500">
                            <span className="flex items-center gap-1">
                              <Users className="w-3 h-3" />
                              {project.workers} workers
                            </span>
                            <span className="flex items-center gap-1">
                              <Building className="w-3 h-3" />
                              {project.phase}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-gray-900">{project.progress}%</div>
                        <div className="text-xs text-gray-600">
                          {timeline.isDelayed && (
                            <span className="text-amber-600 font-medium">
                              {timeline.actualProgress - timeline.expectedProgress}% behind
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="relative h-8 bg-gray-100 rounded-lg overflow-hidden mb-2">
                      {/* Expected progress indicator */}
                      <div
                        className="absolute top-0 h-full border-r-2 border-gray-400 border-dashed"
                        style={{ left: `${timeline.expectedProgress}%` }}
                      >
                        <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-xs text-gray-500 whitespace-nowrap">
                          Expected
                        </div>
                      </div>
                      
                      {/* Actual progress */}
                      <motion.div
                        className="absolute top-0 h-full rounded-lg flex items-center justify-end pr-2"
                        style={{
                          backgroundColor: getStatusColor(project.status),
                          width: `${project.progress}%`
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${project.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.1 }}
                      >
                        {project.progress > 20 && (
                          <span className="text-xs font-medium text-white">
                            {project.progress}%
                          </span>
                        )}
                      </motion.div>
                    </div>

                    {/* Milestones */}
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mt-4 pt-4 border-t border-gray-200"
                      >
                        <h5 className="text-sm font-semibold text-gray-900 mb-3">Milestones</h5>
                        <div className="grid grid-cols-4 gap-3">
                          {project.milestones.map((milestone, idx) => (
                            <div
                              key={idx}
                              className={`p-3 rounded-lg text-xs ${
                                milestone.status === 'completed'
                                  ? 'bg-green-50 border border-green-200'
                                  : milestone.status === 'in_progress'
                                  ? 'bg-blue-50 border border-blue-200'
                                  : 'bg-gray-50 border border-gray-200'
                              }`}
                            >
                              <div className="flex items-center gap-2 mb-1">
                                {milestone.status === 'completed' ? (
                                  <CheckCircle className="w-3 h-3 text-green-600" />
                                ) : milestone.status === 'in_progress' ? (
                                  <Clock className="w-3 h-3 text-blue-600" />
                                ) : (
                                  <div className="w-3 h-3 rounded-full border-2 border-gray-400" />
                                )}
                                <span className="font-medium text-gray-900">{milestone.name}</span>
                              </div>
                              <p className="text-gray-600">{new Date(milestone.date).toLocaleDateString()}</p>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </div>

      {/* AI Insights Footer */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="p-4 bg-gradient-to-r from-indigo-100 to-purple-100 border-t border-indigo-200"
      >
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-br from-[#6366F1] to-[#8B5CF6] rounded-lg flex items-center justify-center flex-shrink-0">
            <Zap className="w-4 h-4 text-white" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-medium text-gray-900">AI Schedule Optimization</p>
            <p className="text-xs text-gray-700">
              3 projects can be accelerated by reallocating resources. Potential 15-day reduction in overall timeline.
            </p>
          </div>
          <motion.button 
            className="text-xs text-[#6366F1] hover:text-[#8B5CF6] font-medium"
            whileHover={{ scale: 1.05 }}
          >
            Apply
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}