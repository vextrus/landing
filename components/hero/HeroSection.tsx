'use client'

import { motion } from 'framer-motion'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { ArrowRight, Play, TrendingUp, Clock, Target, Shield } from 'lucide-react'
import SplitScreen from './SplitScreen'

const valueProps = [
  { icon: TrendingUp, text: '45% Faster Project Delivery', delay: 0.1 },
  { icon: Clock, text: '20% Increase in Profit Margins', delay: 0.2 },
  { icon: Target, text: '95% On-Time Completion Rate', delay: 0.3 },
  { icon: Shield, text: '100% Financial Transparency', delay: 0.4 },
]

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      {/* Animated background shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ 
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Infinity }}
          className="absolute -top-1/4 -right-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            scale: [1.2, 1, 1.2],
            rotate: [90, 0, 90],
          }}
          transition={{ duration: 25, repeat: Infinity }}
          className="absolute -bottom-1/4 -left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
      </div>

      <Container className="relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              The Future of{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
                Real Estate Construction
              </span>{' '}
              Management in Bangladesh
            </motion.h1>
            
            <motion.p 
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              Vextrus ERP combines artificial intelligence, real-time analytics, and 
              automated workflows to give real estate developers unprecedented control 
              over their projects, costs, and timelines.
            </motion.p>

            {/* Value propositions */}
            <motion.div 
              className="grid grid-cols-2 gap-4 mb-10"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              {valueProps.map((prop, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: prop.delay + 0.6 }}
                  className="flex items-center gap-3 bg-white/50 dark:bg-white/10 backdrop-blur-sm rounded-lg p-3"
                >
                  <prop.icon className="w-5 h-5 text-accent" />
                  <span className="text-sm font-medium">{prop.text}</span>
                </motion.div>
              ))}
            </motion.div>

            {/* CTAs */}
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
            >
              <Button size="lg" className="group">
                <Play className="w-5 h-5 mr-2" />
                Watch 5-Minute Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button size="lg" variant="secondary" onClick={() => window.location.href = '/roi-calculator'}>
                Calculate Your ROI
              </Button>
            </motion.div>

            {/* Trust indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="mt-10 flex flex-wrap gap-6 text-sm text-muted-foreground justify-center lg:justify-start"
            >
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                SOC 2 Certified
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                Bank-Grade Security
              </span>
              <span className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-success" />
                Enterprise-Ready
              </span>
            </motion.div>
          </motion.div>

          {/* Right visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
            className="relative lg:h-[600px]"
          >
            <SplitScreen />
          </motion.div>
        </div>
      </Container>

      {/* Scroll indicator */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary/50 rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  )
}