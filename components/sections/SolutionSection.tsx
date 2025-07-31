'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Brain, Eye, Zap } from 'lucide-react'

const pillars = [
  {
    icon: Brain,
    title: 'AI-Powered Intelligence',
    description: 'Predictive analytics that forecast delays, cost overruns, and quality issues before they impact your project',
    features: [
      'Machine learning algorithms trained on Bangladesh construction data',
      '30-day advance warning for potential issues',
      'Intelligent resource optimization',
      'Automated decision support',
    ],
    color: 'from-purple-500 to-indigo-500',
  },
  {
    icon: Eye,
    title: 'Real-Time Visibility',
    description: 'Complete project visibility from land acquisition to handover, accessible from anywhere',
    features: [
      'Live project dashboards',
      'Mobile-first design for site access',
      'Instant notifications and alerts',
      'Comprehensive audit trails',
    ],
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Zap,
    title: 'Automated Workflows',
    description: 'Eliminate manual processes with intelligent automation that reduces errors by 95%',
    features: [
      'Automated document generation',
      'Smart approval workflows',
      'Integrated payment processing',
      'Seamless third-party integrations',
    ],
    color: 'from-teal-500 to-green-500',
  },
]

export default function SolutionSection() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  return (
    <Section id="solution" padding="lg">
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
              Intelligent ERP Built for 
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Bangladesh's Real Estate Leaders
              </span>
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              Vextrus transforms how you manage construction projects with three 
              revolutionary pillars of innovation
            </p>
          </motion.div>

          {/* Three Pillars */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {pillars.map((pillar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                className="relative"
              >
                {/* Pillar Card */}
                <motion.div
                  whileHover={{ y: -10, scale: 1.02 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                  className="bg-white rounded-2xl shadow-xl p-8 h-full flex flex-col relative overflow-hidden"
                >
                  {/* Background Gradient */}
                  <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${pillar.color} opacity-10 rounded-full blur-3xl`} />
                  
                  {/* Icon */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : {}}
                    transition={{ delay: 0.3 + index * 0.1, type: 'spring' }}
                    className={`w-16 h-16 rounded-xl bg-gradient-to-br ${pillar.color} flex items-center justify-center mb-6`}
                  >
                    <pillar.icon className="w-8 h-8 text-white" />
                  </motion.div>

                  {/* Content */}
                  <h3 className="text-2xl font-bold mb-4">{pillar.title}</h3>
                  <p className="text-gray-600 mb-6">{pillar.description}</p>

                  {/* Features */}
                  <ul className="space-y-3 flex-grow">
                    {pillar.features.map((feature, featureIndex) => (
                      <motion.li
                        key={featureIndex}
                        initial={{ opacity: 0, x: -20 }}
                        animate={isInView ? { opacity: 1, x: 0 } : {}}
                        transition={{ delay: 0.4 + index * 0.1 + featureIndex * 0.05 }}
                        className="flex items-start gap-2"
                      >
                        <div className={`w-1.5 h-1.5 rounded-full bg-gradient-to-r ${pillar.color} mt-2 flex-shrink-0`} />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </motion.li>
                    ))}
                  </ul>
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Platform Architecture Preview */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="relative bg-gradient-to-br from-primary/5 to-accent/5 rounded-3xl p-12 text-center"
          >
            <h3 className="text-2xl font-bold mb-4">See How It All Works Together</h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              Our integrated platform connects every aspect of your construction business 
              in real-time, creating a seamless flow of information and intelligence
            </p>
            
            {/* Placeholder for interactive diagram */}
            <div className="bg-white rounded-xl shadow-lg p-8 min-h-[400px] flex items-center justify-center">
              <p className="text-gray-500">Interactive System Architecture Coming Soon</p>
            </div>
          </motion.div>
        </div>
      </Container>
    </Section>
  )
}