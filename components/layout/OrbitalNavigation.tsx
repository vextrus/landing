'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, ChevronRight, Sparkles, Brain } from 'lucide-react'
import GlassCard from '@/components/shared/orbital/GlassCard'

const navLinks = [
  { href: '#problem', label: 'Problem' },
  { href: '#solution', label: 'Solution' },
  { href: '#ecosystem', label: 'Ecosystem' },
  { href: '#roi-calculator', label: 'ROI Calculator' },
  { href: '#contact', label: 'Contact' },
]

export default function OrbitalNavigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeLink, setActiveLink] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
      
      // Update active link based on scroll position
      const sections = navLinks.map(link => link.href.substring(1))
      const scrollPosition = window.scrollY + 100
      
      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveLink(`#${section}`)
            break
          }
        }
      }
    }
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        <GlassCard
          variant={isScrolled ? "default" : "premium"}
          blur={isScrolled ? "xl" : "lg"}
          className={`m-4 rounded-2xl transition-all duration-300 bg-slate-900/80 backdrop-blur-2xl border-white/10 ${
            isScrolled ? 'shadow-2xl shadow-purple-500/20' : ''
          }`}
        >
          <div className="px-6 py-4">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <Link href="/" className="flex items-center gap-3 group">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-slate-700 via-purple-600 to-cyan-600 flex items-center justify-center shadow-lg group-hover:shadow-purple-500/50 transition-shadow">
                    <Brain className="w-7 h-7 text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 blur-lg opacity-30"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                    Vextrus
                  </span>
                  <span className="block text-xs text-slate-300">AI-Powered ERP</span>
                </div>
              </Link>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center gap-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setActiveLink(link.href)}
                    className="relative px-4 py-2 text-sm font-medium text-slate-300 transition-colors hover:text-white"
                  >
                    {activeLink === link.href && (
                      <motion.div
                        layoutId="activeNav"
                        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-lg backdrop-blur-sm border border-white/10"
                        transition={{ type: "spring", bounce: 0.25 }}
                      />
                    )}
                    <span className="relative z-10">{link.label}</span>
                  </Link>
                ))}
                
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="ml-4 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold text-sm shadow-lg hover:shadow-purple-500/50 transition-all flex items-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  Get Demo
                </motion.button>
              </div>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors text-slate-300"
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </GlassCard>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25 }}
              className="absolute right-0 top-0 bottom-0 w-3/4 max-w-sm"
            >
              <GlassCard
                variant="premium"
                blur="xl"
                className="h-full rounded-l-3xl"
              >
                <div className="pt-24 px-6">
                  <div className="space-y-2">
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => {
                          setIsMobileMenuOpen(false)
                          setActiveLink(link.href)
                        }}
                        className="block"
                      >
                        <GlassCard
                          variant={activeLink === link.href ? "colored" : "default"}
                          blur="sm"
                          className="px-4 py-3 flex items-center justify-between group hover:scale-[1.02] transition-transform"
                        >
                          <span className="text-lg font-medium">{link.label}</span>
                          <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-purple-600 transition-colors" />
                        </GlassCard>
                      </Link>
                    ))}
                  </div>
                  <div className="mt-8">
                    <button className="w-full py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white rounded-xl font-semibold shadow-lg flex items-center justify-center gap-2">
                      <Sparkles className="w-5 h-5" />
                      Get Demo
                    </button>
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}