'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import OrbitalBackground from '@/components/shared/orbital/OrbitalBackground'
import GlassCard from '@/components/shared/orbital/GlassCard'
import BeamConnection from '@/components/shared/orbital/BeamConnection'
import { ArrowRight, Calendar, Download, MessageSquare, Play, Sparkles, Zap } from 'lucide-react'
import { useState } from 'react'

const ctaOptions = [
  {
    id: 'demo',
    icon: Play,
    title: 'See It In Action',
    description: 'Watch 15-Minute Personalized Demo',
    action: 'Book Demo',
    color: '#8b5cf6',
    gradient: 'from-purple-500 to-indigo-600',
    position: { angle: 45, radius: 200 }
  },
  {
    id: 'trial',
    icon: Calendar,
    title: 'Try It Yourself',
    description: 'Access Interactive Sandbox',
    action: 'Start Free Trial',
    color: '#14b8a6',
    gradient: 'from-teal-500 to-cyan-600',
    position: { angle: 135, radius: 200 }
  },
  {
    id: 'consultation',
    icon: MessageSquare,
    title: 'Talk to Us',
    description: 'Discuss Your Specific Needs',
    action: 'Schedule Call',
    color: '#22c55e',
    gradient: 'from-green-500 to-emerald-600',
    position: { angle: 225, radius: 200 }
  },
  {
    id: 'resources',
    icon: Download,
    title: 'Learn More',
    description: 'Download Detailed Resources',
    action: 'Access Resources',
    color: '#f59e0b',
    gradient: 'from-amber-500 to-orange-600',
    position: { angle: 315, radius: 200 }
  }
]

export default function OrbitalCTASection() {
  const [hoveredOption, setHoveredOption] = useState<string | null>(null)
  const [centerActive, setCenterActive] = useState(false)

  const calculatePosition = (angle: number, radius: number, centerX: number, centerY: number) => {
    const angleRad = (angle * Math.PI) / 180
    return {
      x: centerX + radius * Math.cos(angleRad),
      y: centerY + radius * Math.sin(angleRad)
    }
  }

  return (
    <Section id="cta" padding="lg" className="relative overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Orbital Background */}
      <OrbitalBackground variant="neural" intensity={0.3} className="opacity-40" />
      
      <Container className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-purple-600/20 to-cyan-600/20 backdrop-blur-sm border border-white/10 text-purple-300 text-sm font-medium mb-6"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Sparkles className="w-4 h-4" />
            Get Started Today
          </motion.div>
          
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-cyan-400">
              Construction Business?
            </span>
          </h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto">
            Join Bangladesh's leading real estate developers who are already using Vextrus 
            to deliver projects faster, reduce costs, and increase profitability.
          </p>
        </motion.div>

        {/* Orbital CTA Options */}
        <div className="relative h-[500px] mb-12">
          {/* Central Action Hub */}
          <motion.div
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, type: "spring" }}
            onMouseEnter={() => setCenterActive(true)}
            onMouseLeave={() => setCenterActive(false)}
          >
            <GlassCard
              variant="premium"
              blur="xl"
              glow
              className="w-48 h-48 rounded-full flex flex-col items-center justify-center cursor-pointer bg-slate-900/60 backdrop-blur-2xl border-white/20"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                animate={{ 
                  rotate: centerActive ? 360 : 0
                }}
                transition={{ 
                  duration: 10,
                  repeat: centerActive ? Infinity : 0,
                  ease: "linear"
                }}
              >
                <Zap className="w-16 h-16 text-purple-600 mb-2" />
              </motion.div>
              <div className="text-base font-bold text-white">Choose Your Path</div>
              <div className="text-sm text-slate-300">4 Ways to Start</div>
            </GlassCard>
            
            {/* Pulse effect */}
            {centerActive && (
              <motion.div
                className="absolute inset-0 rounded-full border-2 border-purple-400"
                animate={{
                  scale: [1, 1.5, 1.5],
                  opacity: [0.5, 0, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity
                }}
              />
            )}
          </motion.div>

          {/* CTA Options */}
          {ctaOptions.map((option, index) => {
            const pos = calculatePosition(
              option.position.angle,
              option.position.radius,
              250,
              250
            )
            const Icon = option.icon

            return (
              <motion.div
                key={option.id}
                className="absolute"
                style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 + index * 0.1, type: "spring" }}
              >
                {/* Connection beam */}
                <BeamConnection
                  from={{ x: 250, y: 250 }}
                  to={pos}
                  active={hoveredOption === option.id || centerActive}
                  color={option.color}
                />

                <motion.div
                  onMouseEnter={() => setHoveredOption(option.id)}
                  onMouseLeave={() => setHoveredOption(null)}
                  whileHover={{ scale: 1.05 }}
                >
                  <GlassCard
                    variant={hoveredOption === option.id ? "colored" : "default"}
                    blur="md"
                    hover
                    glow={hoveredOption === option.id}
                    className="w-52 p-5 text-center cursor-pointer"
                  >
                    <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${option.gradient} mb-3`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-white">{option.title}</h3>
                    <p className="text-sm text-slate-300 mb-4">{option.description}</p>
                    
                    <motion.button
                      className={`w-full px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
                        hoveredOption === option.id
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                          : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/60'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      {option.action}
                      <ArrowRight className="w-4 h-4 inline-block ml-1" />
                    </motion.button>
                  </GlassCard>
                </motion.div>
              </motion.div>
            )
          })}

          {/* Orbital paths */}
          <svg className="absolute inset-0 pointer-events-none" width="500" height="500">
            <motion.circle
              cx="250"
              cy="250"
              r="200"
              fill="none"
              stroke="rgba(139, 92, 246, 0.1)"
              strokeWidth="1"
              strokeDasharray="5 10"
              initial={{ pathLength: 0 }}
              animate={{ 
                pathLength: 1,
                rotate: 360
              }}
              transition={{ 
                pathLength: { duration: 2 },
                rotate: { duration: 60, repeat: Infinity, ease: "linear" }
              }}
              style={{ transformOrigin: "250px 250px" }}
            />
          </svg>
        </div>

        {/* Contact Information */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
          className="text-center"
        >
          <GlassCard variant="default" blur="md" className="inline-block p-6 rounded-2xl bg-slate-800/40 backdrop-blur-xl border-white/10">
            <div className="flex flex-wrap gap-8 justify-center text-sm">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                  <span className="text-white text-xs">📞</span>
                </div>
                <span className="text-slate-300">+880-1700-000000</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                  <span className="text-white text-xs">✉️</span>
                </div>
                <span className="text-slate-300">hello@vextrus.ai</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                  <span className="text-white text-xs">📍</span>
                </div>
                <span className="text-slate-300">Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-amber-600 to-orange-600 flex items-center justify-center">
                  <span className="text-white text-xs">🕐</span>
                </div>
                <span className="text-slate-300">9 AM - 6 PM BST</span>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </Container>
    </Section>
  )
}