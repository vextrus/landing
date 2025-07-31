'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import ProblemCard from './ProblemCard'
import CostCounter from './CostCounter'
import { 
  Calendar, 
  TrendingDown, 
  AlertTriangle, 
  Users,
  DollarSign,
  Clock,
  BarChart3,
  Shuffle
} from 'lucide-react'

const problems = [
  {
    icon: Calendar,
    title: 'Project Delays',
    stats: [
      { label: 'Average delay', value: '6-8 months', color: 'text-red-600' },
      { label: 'Cost impact', value: '15-20% overrun', color: 'text-orange-600' },
    ],
    description: 'Construction projects consistently miss deadlines due to poor coordination and lack of real-time visibility.',
  },
  {
    icon: TrendingDown,
    title: 'Cash Flow Chaos',
    stats: [
      { label: 'Payment cycles', value: '45-60 days', color: 'text-yellow-600' },
      { label: 'Revenue leakage', value: '8-12%', color: 'text-red-600' },
    ],
    description: 'Manual tracking systems lead to payment delays, disputed invoices, and significant revenue losses.',
  },
  {
    icon: AlertTriangle,
    title: 'Quality Control Issues',
    stats: [
      { label: 'Rework rate', value: '30%', color: 'text-orange-600' },
      { label: 'Defects undetected', value: '40%', color: 'text-red-600' },
    ],
    description: 'Lack of systematic quality checks results in expensive rework and customer dissatisfaction.',
  },
  {
    icon: Shuffle,
    title: 'Resource Mismanagement',
    stats: [
      { label: 'Equipment idle time', value: '40%', color: 'text-yellow-600' },
      { label: 'Workforce productivity', value: '<60%', color: 'text-orange-600' },
    ],
    description: 'Poor resource allocation leads to waste, delays, and increased operational costs.',
  },
]

export default function ProblemSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <Section id="problems" background="muted" padding="lg">
      <Container>
        <div ref={ref}>
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              Why <span className="text-red-600">87%</span> of Construction Projects 
              <br />in Bangladesh Face Delays
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Traditional construction management methods are failing Bangladesh's 
              growing real estate sector. Here's what's holding you back:
            </p>
          </motion.div>

          {/* Problem Cards Grid */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            {problems.map((problem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <ProblemCard {...problem} />
              </motion.div>
            ))}
          </div>

          {/* Cost Counter */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <CostCounter />
          </motion.div>

          {/* Transition to solution */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-center mt-16"
          >
            <p className="text-2xl md:text-3xl font-semibold text-primary mb-4">
              What if you could predict problems 
              <br />
              <span className="text-accent">30 days before they happen?</span>
            </p>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-block"
            >
              <div className="w-12 h-12 border-2 border-accent rounded-full flex items-center justify-center mx-auto">
                <BarChart3 className="w-6 h-6 text-accent" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}