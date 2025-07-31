'use client'

import { useState, useMemo } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Building,
  Users,
  TrendingUp,
  Filter,
  Download,
  Grid3x3,
  List,
  BarChart3
} from 'lucide-react'
import { bangladeshSites } from '../services/bangladeshSitesData'
import { formatBDT } from '../../../utils/bdCurrency'
import { GlassCard, AnimatedButton } from '../../../shared/ui'

// Project timeline data
const timelineProjects = bangladeshSites.slice(0, 12).map((site, index) => {
  const currentDate = new Date()
  const startDate = new Date(currentDate.getFullYear(), index, 1)
  const endDate = new Date(currentDate.getFullYear(), index + 6, 30)
  
  return {
    id: site.id,
    name: site.name,
    location: site.location,
    status: site.status,
    progress: site.progress,
    startDate,
    endDate,
    workers: site.workers,
    budget: site.budget,
    phase: site.details.phase,
    contractor: site.contractor
  }
})

// Generate 12-month timeline
const generate12MonthTimeline = () => {
  const months = []
  const currentDate = new Date()
  const startOfYear = new Date(currentDate.getFullYear(), 0, 1)
  
  for (let i = 0; i < 12; i++) {
    const monthDate = new Date(startOfYear.getFullYear(), i, 1)
    months.push({
      index: i,
      date: monthDate,
      shortName: monthDate.toLocaleDateString('en-US', { month: 'short' }),
      fullName: monthDate.toLocaleDateString('en-US', { month: 'long' }),
      year: monthDate.getFullYear()
    })
  }
  
  return months
}

interface TimelineBarProps {
  project: typeof timelineProjects[0]
  months: ReturnType<typeof generate12MonthTimeline>
  onSelect: (id: string) => void
  isSelected: boolean
}

function TimelineBar({ project, months, onSelect, isSelected }: TimelineBarProps) {
  const startMonth = project.startDate.getMonth()
  const endMonth = project.endDate.getMonth()
  const duration = endMonth - startMonth + 1
  
  const getStatusColor = (status: string) => {
    switch(status) {
      case 'planning': return '#6B7280'
      case 'foundation': return '#F59E0B'
      case 'structure': return '#3B82F6'
      case 'finishing': return '#10B981'
      case 'completed': return '#059669'
      default: return '#3B82F6'
    }
  }

  const statusColor = getStatusColor(project.status)

  return (
    <motion.div
      className="timeline-row"
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      whileHover={{ scale: 1.02 }}
      onClick={() => onSelect(project.id)}
    >
      <GlassCard 
        className={`p-4 cursor-pointer transition-all ${
          isSelected ? 'ring-2 ring-cyan-400/50' : ''
        }`}
      >
        <div className="grid grid-cols-12 gap-2 items-center">
          {/* Project Info */}
          <div className="col-span-3">
            <h4 className="font-semibold text-white text-sm truncate">{project.name}</h4>
            <p className="text-xs text-white/60 truncate">{project.location}</p>
            <div className="flex items-center gap-2 mt-1">
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: statusColor }}
              />
              <span className="text-xs text-white/70 capitalize">{project.status}</span>
            </div>
          </div>

          {/* Timeline Grid */}
          <div className="col-span-9 relative">
            <div className="grid grid-cols-12 gap-1 h-12 items-center">
              {months.map((month, index) => {
                const isActive = index >= startMonth && index <= endMonth
                const isStart = index === startMonth
                const isEnd = index === endMonth
                const currentProgress = index <= startMonth + (duration * project.progress / 100)

                return (
                  <div
                    key={month.index}
                    className={`h-6 rounded relative flex items-center justify-center ${
                      isActive 
                        ? currentProgress 
                          ? 'bg-gradient-to-r from-green-500/30 to-green-400/30 border border-green-400/40'
                          : 'bg-gradient-to-r from-blue-500/20 to-blue-400/20 border border-blue-400/30'
                        : 'bg-white/5 border border-white/10'
                    }`}
                  >
                    {isStart && (
                      <div 
                        className="absolute left-0 top-0 w-1 h-full rounded-l"
                        style={{ backgroundColor: statusColor }}
                      />
                    )}
                    {isEnd && (
                      <div 
                        className="absolute right-0 top-0 w-1 h-full rounded-r"
                        style={{ backgroundColor: statusColor }}
                      />
                    )}
                    
                    {/* Progress indicator */}
                    {isActive && (
                      <div 
                        className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full"
                        style={{ 
                          width: index === endMonth 
                            ? `${project.progress}%` 
                            : index < startMonth + (duration * project.progress / 100) 
                              ? '100%' 
                              : '0%'
                        }}
                      />
                    )}
                  </div>
                )
              })}
            </div>

            {/* Progress percentage */}
            <div className="absolute -right-16 top-1/2 transform -translate-y-1/2">
              <span className="text-xs font-medium text-white">{project.progress}%</span>
            </div>
          </div>
        </div>
      </GlassCard>
    </motion.div>
  )
}

export default function ImprovedTimelineView() {
  const [selectedProject, setSelectedProject] = useState<string | null>(null)
  const [filterStatus, setFilterStatus] = useState<string>('all')
  const [viewMode, setViewMode] = useState<'timeline' | 'list'>('timeline')

  const months = useMemo(() => generate12MonthTimeline(), [])

  const filteredProjects = useMemo(() => {
    if (filterStatus === 'all') return timelineProjects
    return timelineProjects.filter(project => project.status === filterStatus)
  }, [filterStatus])

  const selectedProjectDetails = useMemo(() => {
    return selectedProject ? timelineProjects.find(p => p.id === selectedProject) : null
  }, [selectedProject])

  const stats = useMemo(() => {
    const total = filteredProjects.length
    const inProgress = filteredProjects.filter(p => p.status === 'structure' || p.status === 'foundation').length
    const completed = filteredProjects.filter(p => p.status === 'completed').length
    const avgProgress = Math.round(filteredProjects.reduce((sum, p) => sum + p.progress, 0) / total)
    
    return { total, inProgress, completed, avgProgress }
  }, [filteredProjects])

  return (
    <div className="p-6 space-y-6 h-full overflow-y-auto">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between"
      >
        <div className="flex items-center gap-4">
          <motion.div
            className="p-3 rounded-2xl bg-gradient-to-br from-amber-500/20 to-orange-500/20 border border-amber-400/30"
            whileHover={{ rotate: [0, -10, 10, 0], scale: 1.1 }}
            transition={{ duration: 0.6 }}
          >
            <Calendar className="w-8 h-8 text-amber-400" />
          </motion.div>
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">
              Project Timeline
            </h1>
            <p className="text-white/60 mt-1">
              12-month construction project roadmap
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <AnimatedButton variant="ghost" size="sm" className="flex items-center gap-2">
            <Download className="w-4 h-4" />
            Export
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="flex items-center gap-2">
            <BarChart3 className="w-4 h-4" />
            Analytics
          </AnimatedButton>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Total Projects</p>
              <p className="text-2xl font-bold text-white">{stats.total}</p>
            </div>
            <Building className="w-8 h-8 text-blue-400" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">In Progress</p>
              <p className="text-2xl font-bold text-amber-400">{stats.inProgress}</p>
            </div>
            <Clock className="w-8 h-8 text-amber-400" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Completed</p>
              <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-400" />
          </div>
        </GlassCard>
        <GlassCard className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/60">Avg Progress</p>
              <p className="text-2xl font-bold text-cyan-400">{stats.avgProgress}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-cyan-400" />
          </div>
        </GlassCard>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white"
          >
            <option value="all">All Status</option>
            <option value="planning">Planning</option>
            <option value="foundation">Foundation</option>
            <option value="structure">Structure</option>
            <option value="finishing">Finishing</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2">
          <AnimatedButton
            variant={viewMode === 'timeline' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('timeline')}
            className="flex items-center gap-2"
          >
            <Grid3x3 className="w-4 h-4" />
            Timeline
          </AnimatedButton>
          <AnimatedButton
            variant={viewMode === 'list' ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="flex items-center gap-2"
          >
            <List className="w-4 h-4" />
            List
          </AnimatedButton>
        </div>
      </div>

      {/* 12-Month Header */}
      <GlassCard className="p-4">
        <div className="grid grid-cols-12 gap-2">
          <div className="col-span-3">
            <h3 className="font-semibold text-white/80">Projects</h3>
          </div>
          <div className="col-span-9">
            <div className="grid grid-cols-12 gap-1">
              {months.map((month) => (
                <div key={month.index} className="text-center">
                  <div className="text-xs font-medium text-white/80">{month.shortName}</div>
                  <div className="text-xs text-white/50">{month.year}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </GlassCard>

      {/* Timeline View */}
      <div className="space-y-3 min-h-96">
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ delay: index * 0.05 }}
            >
              <TimelineBar
                project={project}
                months={months}
                onSelect={setSelectedProject}
                isSelected={selectedProject === project.id}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Selected Project Details */}
      <AnimatePresence>
        {selectedProjectDetails && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <GlassCard className="p-6">
              <h3 className="text-xl font-bold text-white mb-4">{selectedProjectDetails.name}</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-sm font-medium text-white/80 mb-2">Project Details</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Location:</span>
                      <span className="text-white">{selectedProjectDetails.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Phase:</span>
                      <span className="text-white">{selectedProjectDetails.phase}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Contractor:</span>
                      <span className="text-white">{selectedProjectDetails.contractor}</span>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/80 mb-2">Progress</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-white/60">Completion:</span>
                      <span className="text-white">{selectedProjectDetails.progress}%</span>
                    </div>
                    <div className="w-full bg-white/10 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full"
                        style={{ width: `${selectedProjectDetails.progress}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-white/80 mb-2">Resources</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-white/60">Workers:</span>
                      <span className="text-white">{selectedProjectDetails.workers}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-white/60">Budget:</span>
                      <span className="text-white">{formatBDT(selectedProjectDetails.budget)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}