'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Brain,
  Award,
  TrendingUp,
  Target,
  BookOpen,
  User,
  Star,
  ChevronRight,
  Filter,
  Search,
  Zap,
  BarChart3,
  CheckCircle,
  Clock,
  Trophy,
  Sparkles,
  GraduationCap,
  AlertTriangle
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'

interface Worker {
  id: string
  name: string
  role: string
  department: string
  overallScore: number
  skillGap: number
  potential: 'high' | 'medium' | 'low'
  skills: {
    name: string
    current: number
    required: number
    trend: 'improving' | 'stable' | 'declining'
  }[]
  certifications: string[]
  trainingRecommendations: string[]
  lastAssessment: string
}

interface SkillCategory {
  category: string
  avgScore: number
  workersCount: number
  criticalGaps: number
  topPerformers: number
}

interface TrainingProgram {
  id: string
  name: string
  category: string
  duration: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
  enrolledWorkers: number
  completionRate: number
  impact: number
  nextSession: string
}

export default function SkillsMatrix() {
  const [selectedWorker, setSelectedWorker] = useState<string | null>(null)
  const [filterDepartment, setFilterDepartment] = useState<string>('all')
  const [searchQuery, setSearchQuery] = useState('')

  const skillsStats = {
    totalAssessed: 2341,
    avgSkillScore: 72.5,
    criticalGaps: 156,
    trainingHours: 4567
  }

  const workers: Worker[] = [
    {
      id: '1',
      name: 'Eng. Rahman Ali',
      role: 'Senior Site Engineer',
      department: 'Engineering',
      overallScore: 85,
      skillGap: 15,
      potential: 'high',
      skills: [
        { name: 'Structural Design', current: 90, required: 95, trend: 'improving' },
        { name: 'AutoCAD', current: 85, required: 85, trend: 'stable' },
        { name: 'Project Management', current: 75, required: 90, trend: 'improving' },
        { name: 'Safety Compliance', current: 95, required: 90, trend: 'stable' }
      ],
      certifications: ['PMP', 'LEED AP', 'Safety Officer'],
      trainingRecommendations: ['Advanced BIM', 'Leadership Excellence'],
      lastAssessment: '2 weeks ago'
    },
    {
      id: '2',
      name: 'Foreman Karim Sheikh',
      role: 'Construction Foreman',
      department: 'Operations',
      overallScore: 78,
      skillGap: 22,
      potential: 'medium',
      skills: [
        { name: 'Team Leadership', current: 80, required: 85, trend: 'improving' },
        { name: 'Quality Control', current: 75, required: 80, trend: 'stable' },
        { name: 'Safety Protocols', current: 85, required: 90, trend: 'improving' },
        { name: 'Technical Drawing', current: 60, required: 75, trend: 'declining' }
      ],
      certifications: ['OSHA 30', 'First Aid'],
      trainingRecommendations: ['Blueprint Reading', 'Digital Tools'],
      lastAssessment: '1 month ago'
    },
    {
      id: '3',
      name: 'Electrician Nasir Uddin',
      role: 'Master Electrician',
      department: 'MEP',
      overallScore: 82,
      skillGap: 18,
      potential: 'high',
      skills: [
        { name: 'Electrical Systems', current: 95, required: 95, trend: 'stable' },
        { name: 'Code Compliance', current: 88, required: 90, trend: 'improving' },
        { name: 'Troubleshooting', current: 92, required: 90, trend: 'stable' },
        { name: 'Smart Systems', current: 65, required: 80, trend: 'improving' }
      ],
      certifications: ['Master Electrician License', 'Solar Installation'],
      trainingRecommendations: ['IoT Systems', 'Energy Management'],
      lastAssessment: '3 weeks ago'
    }
  ]

  const skillCategories: SkillCategory[] = [
    { category: 'Technical Skills', avgScore: 75, workersCount: 1523, criticalGaps: 45, topPerformers: 234 },
    { category: 'Safety & Compliance', avgScore: 82, workersCount: 2341, criticalGaps: 23, topPerformers: 567 },
    { category: 'Leadership', avgScore: 68, workersCount: 234, criticalGaps: 67, topPerformers: 45 },
    { category: 'Digital Tools', avgScore: 62, workersCount: 892, criticalGaps: 89, topPerformers: 123 }
  ]

  const trainingPrograms: TrainingProgram[] = [
    {
      id: '1',
      name: 'Construction Safety Certification',
      category: 'Safety',
      duration: '3 days',
      difficulty: 'intermediate',
      enrolledWorkers: 234,
      completionRate: 87,
      impact: 92,
      nextSession: 'Next Monday'
    },
    {
      id: '2',
      name: 'Digital Blueprint Reading',
      category: 'Technical',
      duration: '2 weeks',
      difficulty: 'beginner',
      enrolledWorkers: 156,
      completionRate: 78,
      impact: 85,
      nextSession: 'In 3 days'
    },
    {
      id: '3',
      name: 'Leadership for Foremen',
      category: 'Leadership',
      duration: '1 month',
      difficulty: 'advanced',
      enrolledWorkers: 45,
      completionRate: 92,
      impact: 95,
      nextSession: 'Next month'
    }
  ]

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-400'
    if (score >= 60) return 'text-amber-400'
    return 'text-red-400'
  }

  const getPotentialColor = (potential: string) => {
    switch (potential) {
      case 'high': return 'from-green-400 to-emerald-600'
      case 'medium': return 'from-amber-400 to-orange-600'
      case 'low': return 'from-red-400 to-rose-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const filteredWorkers = workers.filter(worker => {
    const departmentMatch = filterDepartment === 'all' || worker.department === filterDepartment
    const searchMatch = searchQuery === '' || 
      worker.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      worker.role.toLowerCase().includes(searchQuery.toLowerCase())
    
    return departmentMatch && searchMatch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">AI Skills Assessment Matrix</h2>
          <p className="text-gray-400">Competency tracking and personalized training recommendations</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <GraduationCap className="w-4 h-4" />
            <span>Training Portal</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600">
            <Brain className="w-4 h-4" />
            <span>Run Assessment</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Skills Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: User,
            label: 'Workers Assessed',
            value: skillsStats.totalAssessed,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: Target,
            label: 'Avg Skill Score',
            value: `${skillsStats.avgSkillScore}%`,
            format: 'string',
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: AlertTriangle,
            label: 'Critical Gaps',
            value: skillsStats.criticalGaps,
            color: 'from-red-400 to-rose-600',
            bgColor: 'from-red-500/20 to-rose-500/20'
          },
          {
            icon: BookOpen,
            label: 'Training Hours',
            value: skillsStats.trainingHours,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.format === 'string' ? metric.value : <AnimatedCounter value={metric.value as number} />}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* AI Insights */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Sparkles className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Training Recommendations</h3>
            <p className="text-gray-300">
              Critical skill gap identified: <span className="font-semibold text-red-400">62% of workers lack digital tool 
              proficiency</span>. Implementing targeted training can increase productivity by <span className="font-semibold text-green-400">
              18%</span>. <span className="font-semibold text-amber-400">45 high-potential workers</span> identified for 
              leadership development. AI recommends prioritizing <span className="font-semibold text-blue-400">safety 
              re-certification</span> for 234 workers expiring next month.
            </p>
          </div>
        </div>
      </GlassCard>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Skill Categories */}
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Skill Categories</h3>
          <div className="space-y-4">
            {skillCategories.map((category) => (
              <div key={category.category}>
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{category.category}</h4>
                  <span className={`text-sm font-medium ${getScoreColor(category.avgScore)}`}>
                    {category.avgScore}%
                  </span>
                </div>
                
                <div className="h-2 bg-white/10 rounded-full overflow-hidden mb-2">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${category.avgScore}%` }}
                    className={`h-full bg-gradient-to-r ${
                      category.avgScore >= 80 ? 'from-green-400 to-emerald-600' :
                      category.avgScore >= 60 ? 'from-amber-400 to-orange-600' :
                      'from-red-400 to-rose-600'
                    }`}
                  />
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div>
                    <p className="text-gray-400">Workers</p>
                    <p className="text-gray-300">{category.workersCount}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Gaps</p>
                    <p className="text-red-400">{category.criticalGaps}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Top</p>
                    <p className="text-green-400">{category.topPerformers}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Training Programs */}
        <div className="lg:col-span-2">
          <GlassCard className="p-6 h-full" variant="accent">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-white">Active Training Programs</h3>
              <AnimatedButton variant="ghost" size="sm">
                <Trophy className="w-4 h-4" />
                <span>Leaderboard</span>
              </AnimatedButton>
            </div>
            
            <div className="space-y-3">
              {trainingPrograms.map((program) => (
                <div
                  key={program.id}
                  className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 transition-all"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-medium text-white">{program.name}</h4>
                      <div className="flex items-center gap-3 mt-1 text-sm text-gray-400">
                        <span>{program.category}</span>
                        <span>•</span>
                        <span>{program.duration}</span>
                        <span>•</span>
                        <span className="capitalize">{program.difficulty}</span>
                      </div>
                    </div>
                    <AnimatedButton variant="ghost" size="sm">
                      Enroll
                      <ChevronRight className="w-4 h-4" />
                    </AnimatedButton>
                  </div>
                  
                  <div className="grid grid-cols-3 gap-4 text-sm">
                    <div>
                      <p className="text-gray-400">Enrolled</p>
                      <p className="text-white font-medium">{program.enrolledWorkers} workers</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Completion</p>
                      <p className="text-green-400 font-medium">{program.completionRate}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Impact</p>
                      <p className="text-purple-400 font-medium">+{program.impact}%</p>
                    </div>
                  </div>
                  
                  <p className="text-xs text-gray-500 mt-2">Next session: {program.nextSession}</p>
                </div>
              ))}
            </div>
          </GlassCard>
        </div>
      </div>

      {/* Filter and Search */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <select
            value={filterDepartment}
            onChange={(e) => setFilterDepartment(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white focus:outline-none focus:border-white/20"
          >
            <option value="all">All Departments</option>
            <option value="Engineering">Engineering</option>
            <option value="Operations">Operations</option>
            <option value="MEP">MEP</option>
          </select>
        </div>
        
        <div className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10">
          <Search className="w-4 h-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search workers..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-transparent text-white placeholder-gray-400 outline-none"
          />
        </div>
      </div>

      {/* Worker Skills Matrix */}
      <div className="space-y-4">
        {filteredWorkers.map((worker, index) => (
          <motion.div
            key={worker.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6" 
              variant="accent" 
              hover
              onClick={() => setSelectedWorker(worker.id === selectedWorker ? null : worker.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h4 className="text-lg font-semibold text-white">{worker.name}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getPotentialColor(worker.potential)} bg-opacity-20`}>
                      {worker.potential.toUpperCase()} POTENTIAL
                    </span>
                    {worker.certifications.map((cert) => (
                      <span key={cert} className="px-2 py-1 rounded bg-white/10 text-xs text-gray-300">
                        {cert}
                      </span>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm mb-4">
                    <div>
                      <p className="text-gray-400">Role</p>
                      <p className="text-white">{worker.role}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Department</p>
                      <p className="text-white">{worker.department}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Skill Gap</p>
                      <p className="text-amber-400">{worker.skillGap}%</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Last Assessment</p>
                      <p className="text-white">{worker.lastAssessment}</p>
                    </div>
                  </div>

                  {/* Skill Bars */}
                  <div className="grid grid-cols-2 gap-3">
                    {worker.skills.map((skill) => (
                      <div key={skill.name}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-xs text-gray-400">{skill.name}</span>
                          <div className="flex items-center gap-2">
                            <span className={`text-xs ${getScoreColor(skill.current)}`}>
                              {skill.current}%
                            </span>
                            {skill.trend === 'improving' && <TrendingUp className="w-3 h-3 text-green-400" />}
                            {skill.trend === 'declining' && <TrendingUp className="w-3 h-3 text-red-400 rotate-180" />}
                          </div>
                        </div>
                        <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                          <div className="relative h-full">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${skill.current}%` }}
                              className={`h-full bg-gradient-to-r ${
                                skill.current >= skill.required ? 'from-green-400 to-emerald-600' :
                                'from-amber-400 to-orange-600'
                              }`}
                            />
                            <div
                              className="absolute top-0 bottom-0 w-0.5 bg-white/50"
                              style={{ left: `${skill.required}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Overall Score */}
                <div className="text-center ml-6">
                  <div className="relative">
                    <svg className="w-20 h-20 transform -rotate-90">
                      <circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke="rgba(255,255,255,0.1)"
                        strokeWidth="8"
                        fill="none"
                      />
                      <motion.circle
                        cx="40"
                        cy="40"
                        r="32"
                        stroke={worker.overallScore >= 80 ? '#10B981' : worker.overallScore >= 60 ? '#F59E0B' : '#EF4444'}
                        strokeWidth="8"
                        fill="none"
                        strokeLinecap="round"
                        initial={{ strokeDasharray: "0 201" }}
                        animate={{ strokeDasharray: `${(worker.overallScore / 100) * 201} 201` }}
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className={`text-2xl font-bold ${getScoreColor(worker.overallScore)}`}>
                        {worker.overallScore}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-gray-400 mt-2">Overall Score</p>
                </div>
              </div>

              {/* Expanded Details */}
              {selectedWorker === worker.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <div className="mb-4">
                    <h5 className="text-sm font-medium text-white mb-3 flex items-center gap-2">
                      <Zap className="w-4 h-4 text-purple-400" />
                      AI Training Recommendations
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {worker.trainingRecommendations.map((training) => (
                        <span key={training} className="px-3 py-1 rounded-full bg-purple-500/20 text-sm text-purple-400">
                          {training}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-indigo-600"
                    >
                      <BookOpen className="w-4 h-4" />
                      Create Training Plan
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <Award className="w-4 h-4" />
                      View Certificates
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <BarChart3 className="w-4 h-4" />
                      Progress Report
                    </AnimatedButton>
                  </div>
                </motion.div>
              )}
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  )
}