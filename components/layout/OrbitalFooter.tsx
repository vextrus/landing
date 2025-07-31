'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import GlassCard from '@/components/shared/orbital/GlassCard'
import OrbitalBackground from '@/components/shared/orbital/OrbitalBackground'
import { 
  Brain, 
  MapPin, 
  Phone, 
  Mail, 
  Facebook, 
  Twitter, 
  Linkedin,
  Instagram,
  Sparkles,
  ArrowUpRight
} from 'lucide-react'

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'Modules', href: '#modules' },
    { label: 'AI Technology', href: '#ai' },
    { label: 'Pricing', href: '#pricing' },
  ],
  company: [
    { label: 'About Us', href: '#about' },
    { label: 'Careers', href: '#careers' },
    { label: 'Partners', href: '#partners' },
    { label: 'Contact', href: '#contact' },
  ],
  resources: [
    { label: 'Documentation', href: '#docs' },
    { label: 'API Reference', href: '#api' },
    { label: 'Support', href: '#support' },
    { label: 'Blog', href: '#blog' },
  ],
  legal: [
    { label: 'Privacy Policy', href: '#privacy' },
    { label: 'Terms of Service', href: '#terms' },
    { label: 'Security', href: '#security' },
    { label: 'Compliance', href: '#compliance' },
  ],
}

const socialLinks = [
  { icon: Facebook, href: '#', label: 'Facebook', color: 'from-blue-600 to-blue-700' },
  { icon: Twitter, href: '#', label: 'Twitter', color: 'from-sky-500 to-sky-600' },
  { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'from-blue-700 to-blue-800' },
  { icon: Instagram, href: '#', label: 'Instagram', color: 'from-pink-600 to-purple-600' },
]

export default function OrbitalFooter() {
  return (
    <footer className="relative pt-20 pb-10 overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
      {/* Orbital Background */}
      <OrbitalBackground variant="neural" intensity={0.3} className="opacity-30" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <GlassCard variant="premium" blur="xl" className="p-12 rounded-3xl mb-8 bg-slate-900/60 backdrop-blur-2xl border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
            {/* Company Info */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <motion.div
                  className="relative"
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-slate-700 via-purple-600 to-cyan-600 flex items-center justify-center shadow-lg">
                    <Brain className="w-8 h-8 text-white" />
                  </div>
                  <motion.div
                    className="absolute inset-0 rounded-xl bg-gradient-to-br from-purple-600 to-cyan-600 blur-lg opacity-30"
                    animate={{
                      scale: [1, 1.3, 1],
                      opacity: [0.3, 0.1, 0.3]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                </motion.div>
                <div>
                  <span className="text-2xl font-bold bg-gradient-to-r from-white via-purple-300 to-cyan-300 bg-clip-text text-transparent">
                    Vextrus
                  </span>
                  <span className="block text-xs text-slate-300">AI-Powered ERP</span>
                </div>
              </div>
              
              <p className="text-sm text-slate-300 mb-6">
                Bangladesh's first AI-powered ERP system transforming the construction industry 
                with intelligent automation and predictive insights.
              </p>
              
              <div className="space-y-3">
                <motion.div 
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-purple-600 to-pink-600 flex items-center justify-center">
                    <MapPin className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    11 Paltan Line, Purana Paltan, Dhaka
                  </span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center">
                    <Phone className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    +8801711-005961
                  </span>
                </motion.div>
                
                <motion.div 
                  className="flex items-center gap-3 group"
                  whileHover={{ x: 5 }}
                >
                  <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 flex items-center justify-center">
                    <Mail className="w-4 h-4 text-white" />
                  </div>
                  <span className="text-sm text-slate-300 group-hover:text-white transition-colors">
                    ceo@vextrus.com
                  </span>
                </motion.div>
              </div>
            </div>

            {/* Links */}
            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                Product
                <Sparkles className="w-3 h-3 text-purple-600" />
              </h3>
              <ul className="space-y-2">
                {footerLinks.product.map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 3 }}>
                    <Link 
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-purple-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                Company
                <Sparkles className="w-3 h-3 text-cyan-600" />
              </h3>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 3 }}>
                    <Link 
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-cyan-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                Resources
                <Sparkles className="w-3 h-3 text-green-600" />
              </h3>
              <ul className="space-y-2">
                {footerLinks.resources.map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 3 }}>
                    <Link 
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-green-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-white font-semibold mb-4 flex items-center gap-2">
                Legal
                <Sparkles className="w-3 h-3 text-amber-600" />
              </h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <motion.li key={link.label} whileHover={{ x: 3 }}>
                    <Link 
                      href={link.href}
                      className="text-sm text-slate-300 hover:text-amber-400 transition-colors flex items-center gap-1 group"
                    >
                      {link.label}
                      <ArrowUpRight className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </div>
          </div>
        </GlassCard>

        {/* Bottom section */}
        <GlassCard variant="default" blur="md" className="px-8 py-6 rounded-2xl bg-slate-800/40 backdrop-blur-xl border-white/10">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <p className="text-sm text-slate-300">
              © 2025 Vextrus. All rights reserved. Built with 🇧🇩 in Bangladesh.
            </p>
            
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <motion.a
                  key={social.label}
                  href={social.href}
                  whileHover={{ y: -3 }}
                  whileTap={{ scale: 0.95 }}
                  className="group"
                  aria-label={social.label}
                >
                  <GlassCard
                    variant="default"
                    blur="sm"
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all group-hover:border-purple-400`}
                  >
                    <div className={`w-full h-full rounded-xl bg-gradient-to-r ${social.color} flex items-center justify-center`}>
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                  </GlassCard>
                </motion.a>
              ))}
            </div>
          </div>
        </GlassCard>
      </div>
    </footer>
  )
}