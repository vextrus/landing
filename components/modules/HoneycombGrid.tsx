'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  BarChart3, 
  DollarSign, 
  Users, 
  ShoppingCart, 
  Shield, 
  UserCheck,
  Brain,
  Building2,
  ClipboardCheck,
  Package,
  TrendingUp,
  Settings,
  LineChart
} from 'lucide-react'
import ModuleHexagon from './ModuleHexagon'
import ModuleDetails from './ModuleDetails'
import { useInView } from 'react-intersection-observer'

const modules = [
  {
    id: 'project-command',
    title: 'Project Command',
    tagline: 'Multi-project oversight',
    icon: Building2,
    color: '#0F172A',
    features: [
      'Multi-project dashboard with real-time status',
      'AI-powered delay predictions',
      'Integrated timeline management',
      'Document management system',
      'Stakeholder communication hub'
    ],
    impact: 'Manage 10x more projects with the same team',
    description: 'Your real estate portfolio at a glance. Get complete visibility across all your construction projects with AI-powered insights and predictive analytics.',
    benefits: [
      'Reduce project delays by 45% with early warning systems',
      'Increase team productivity by eliminating status meetings',
      'Make data-driven decisions with real-time insights'
    ]
  },
  {
    id: 'financial-intelligence',
    title: 'Financial Suite',
    tagline: 'Complete cost control',
    icon: DollarSign,
    color: '#14B8A6',
    features: [
      'Real-time cost tracking by project/phase/unit',
      'Automated invoice processing with OCR',
      'Cash flow forecasting (90-day ahead)',
      'Integrated payment gateway',
      'Customer booking and payment tracking'
    ],
    impact: 'Improve cash flow by 35% with intelligent payment scheduling',
    description: 'Complete financial control with zero surprises. Track every transaction, forecast cash flows, and optimize payment schedules automatically.',
    benefits: [
      'Eliminate revenue leakage with automated tracking',
      'Reduce payment processing time by 80%',
      'Get accurate financial forecasts for better planning'
    ]
  },
  {
    id: 'sales-crm',
    title: 'Sales & CRM',
    tagline: 'Lead to handover',
    icon: Users,
    color: '#22C55E',
    features: [
      'Lead management with AI scoring',
      'Inventory management (units, floors, buildings)',
      'Booking and allocation system',
      'Customer portal for buyers',
      'Post-sales service management'
    ],
    impact: 'Increase sales velocity by 40% with intelligent lead management',
    description: 'From lead to handover - seamlessly managed. Convert more leads, manage bookings efficiently, and deliver exceptional customer experiences.',
    benefits: [
      'Convert 3x more leads with AI-powered scoring',
      'Reduce booking errors by 95%',
      'Improve customer satisfaction with self-service portal'
    ]
  },
  {
    id: 'procurement',
    title: 'Procurement',
    tagline: 'Smart purchasing',
    icon: ShoppingCart,
    color: '#F59E0B',
    features: [
      'AI-powered demand forecasting',
      'Multi-vendor price comparison',
      'Automated PO generation',
      'Material tracking with IoT',
      'Vendor performance analytics'
    ],
    impact: 'Reduce material costs by 15% through intelligent procurement',
    description: 'Smart purchasing for maximum savings. Optimize procurement with AI-driven insights and automated vendor management.',
    benefits: [
      'Save 15% on material costs with smart negotiations',
      'Reduce stockouts and overstocking by 90%',
      'Improve vendor relationships with performance tracking'
    ]
  },
  {
    id: 'quality-compliance',
    title: 'Quality Control',
    tagline: 'Build right first time',
    icon: Shield,
    color: '#8B5CF6',
    features: [
      'Digital quality checklists',
      'Photo-based inspection with AI analysis',
      'Compliance tracking (RAJUK, environment)',
      'Defect management workflow',
      'Automated reporting'
    ],
    impact: 'Reduce rework by 85% with proactive quality management',
    description: 'Build right the first time. Ensure quality and compliance with AI-powered inspections and automated workflows.',
    benefits: [
      'Catch defects 30 days earlier with AI detection',
      'Ensure 100% regulatory compliance',
      'Save millions in rework costs'
    ]
  },
  {
    id: 'hr-workforce',
    title: 'HR & Workforce',
    tagline: 'Optimize your team',
    icon: UserCheck,
    color: '#EF4444',
    features: [
      'Biometric attendance with geo-fencing',
      'Skill-based resource allocation',
      'Payroll automation',
      'Safety compliance tracking',
      'Performance analytics'
    ],
    impact: 'Increase workforce productivity by 30%',
    description: 'Optimize your most valuable asset. Manage workforce efficiently with smart allocation and automated HR processes.',
    benefits: [
      'Reduce labor costs by 20% with optimal allocation',
      'Eliminate payroll errors and delays',
      'Improve safety compliance by 95%'
    ]
  },
  {
    id: 'analytics',
    title: 'Analytics & BI',
    tagline: 'Data-driven decisions',
    icon: LineChart,
    color: '#06B6D4',
    features: [
      'Executive dashboards',
      'Predictive analytics',
      'Custom report builder',
      'Real-time alerts',
      'Mobile analytics app'
    ],
    impact: 'Make decisions 10x faster with AI-powered insights',
    description: 'Data-driven decisions, every time. Get actionable insights with AI-powered analytics and predictive modeling.',
    benefits: [
      'Predict problems 30 days in advance',
      'Get instant answers to business questions',
      'Track KPIs in real-time across all projects'
    ]
  }
]

export default function HoneycombGrid() {
  const [selectedModule, setSelectedModule] = useState<typeof modules[0] | null>(null)
  const [activeModuleId, setActiveModuleId] = useState<string | null>(null)
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  })

  const handleModuleClick = (module: typeof modules[0]) => {
    setActiveModuleId(module.id)
    setSelectedModule(module)
  }

  return (
    <div ref={ref} className="relative">
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="hexagon-grid-container"
      >
        <div className="hexagon-grid">
          {modules.map((module, index) => (
            <ModuleHexagon
              key={module.id}
              module={module}
              index={index}
              isActive={activeModuleId === module.id}
              onClick={() => handleModuleClick(module)}
            />
          ))}
        </div>
        
        {inView && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute inset-0 pointer-events-none"
          >
            <svg className="absolute inset-0 w-full h-full">
              <defs>
                <linearGradient id="connectionGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#14B8A6" stopOpacity="0.3" />
                  <stop offset="100%" stopColor="#0F172A" stopOpacity="0.3" />
                </linearGradient>
              </defs>
              
              {/* Animated connection lines between modules */}
              <motion.path
                d="M 200 200 Q 400 150 600 200"
                stroke="url(#connectionGradient)"
                strokeWidth="2"
                fill="none"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 2, delay: 1.5 }}
              />
            </svg>
          </motion.div>
        )}
      </motion.div>
      
      <ModuleDetails
        module={selectedModule}
        isOpen={!!selectedModule}
        onClose={() => {
          setSelectedModule(null)
          setActiveModuleId(null)
        }}
      />
    </div>
  )
}