'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Globe,
  Star,
  TrendingUp,
  Clock,
  Truck,
  Shield,
  AlertTriangle,
  CheckCircle,
  MapPin,
  Phone,
  Mail,
  Factory,
  Award,
  Package,
  BarChart3,
  Brain,
  Zap,
  Filter,
  Search,
  ChevronRight
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'
import { formatBDT, formatPercentage } from '../../../utils/bdCurrency'

interface Supplier {
  id: string
  name: string
  category: string
  location: string
  rating: number
  reliability: number
  deliveryRate: number
  priceCompetitiveness: number
  qualityScore: number
  contracts: number
  totalVolume: number
  certifications: string[]
  aiScore: number
  riskLevel: 'low' | 'medium' | 'high'
  recommendation: string
  specialties: string[]
  contact: {
    phone: string
    email: string
    person: string
  }
}

export default function SupplierNetwork() {
  const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'recommended' | 'new' | 'risk'>('all')
  const [category, setCategory] = useState<'all' | 'cement' | 'steel' | 'tiles' | 'electrical'>('all')

  const networkStats = {
    totalSuppliers: 342,
    verifiedSuppliers: 298,
    avgRating: 4.6,
    activeBids: 47
  }

  const suppliers: Supplier[] = [
    {
      id: '1',
      name: 'Shah Cement Industries',
      category: 'cement',
      location: 'Chittagong',
      rating: 4.8,
      reliability: 96,
      deliveryRate: 98,
      priceCompetitiveness: 85,
      qualityScore: 94,
      contracts: 127,
      totalVolume: 450000000,
      certifications: ['ISO 9001', 'BDS 26:2021', 'BSTI'],
      aiScore: 92,
      riskLevel: 'low',
      recommendation: 'Best price-quality ratio for bulk orders. Excellent track record.',
      specialties: ['Portland Cement', 'Quick Setting', 'Sulfate Resistant'],
      contact: {
        phone: '+8801712345678',
        email: 'procurement@shahcement.bd',
        person: 'Karim Rahman'
      }
    },
    {
      id: '2',
      name: 'BSRM Steel',
      category: 'steel',
      location: 'Dhaka',
      rating: 4.9,
      reliability: 98,
      deliveryRate: 96,
      priceCompetitiveness: 78,
      qualityScore: 97,
      contracts: 234,
      totalVolume: 780000000,
      certifications: ['ISO 9001', 'BDS ISO 6935-2', 'BSTI', 'SGS'],
      aiScore: 95,
      riskLevel: 'low',
      recommendation: 'Premium quality for critical structures. AI predicts 5% price drop next month.',
      specialties: ['500W Grade', '60 Grade', 'Seismic Resistant'],
      contact: {
        phone: '+8801823456789',
        email: 'sales@bsrm.com',
        person: 'Fatima Ahmed'
      }
    },
    {
      id: '3',
      name: 'RAK Ceramics Bangladesh',
      category: 'tiles',
      location: 'Gazipur',
      rating: 4.5,
      reliability: 92,
      deliveryRate: 94,
      priceCompetitiveness: 82,
      qualityScore: 90,
      contracts: 89,
      totalVolume: 320000000,
      certifications: ['ISO 9001', 'ISO 14001', 'Green Building'],
      aiScore: 86,
      riskLevel: 'low',
      recommendation: 'Good for premium projects. New eco-friendly line available.',
      specialties: ['Porcelain', 'Vitrified', 'Anti-slip', 'Designer'],
      contact: {
        phone: '+8801934567890',
        email: 'bd@rakceramics.com',
        person: 'Rashid Khan'
      }
    },
    {
      id: '4',
      name: 'New Supplier - Bengal Electric',
      category: 'electrical',
      location: 'Dhaka',
      rating: 4.2,
      reliability: 85,
      deliveryRate: 88,
      priceCompetitiveness: 90,
      qualityScore: 86,
      contracts: 12,
      totalVolume: 45000000,
      certifications: ['ISO 9001', 'BSTI'],
      aiScore: 78,
      riskLevel: 'medium',
      recommendation: 'New entrant with competitive pricing. Start with small orders.',
      specialties: ['Cables', 'Switches', 'LED Lighting'],
      contact: {
        phone: '+8801545678901',
        email: 'info@bengalelectric.bd',
        person: 'Nasir Uddin'
      }
    }
  ]

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case 'low': return 'from-green-400 to-emerald-600'
      case 'medium': return 'from-amber-400 to-orange-600'
      case 'high': return 'from-red-400 to-rose-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const filteredSuppliers = suppliers.filter(supplier => {
    const categoryMatch = category === 'all' || supplier.category === category
    const filterMatch = 
      filter === 'all' ||
      (filter === 'recommended' && supplier.aiScore >= 85) ||
      (filter === 'new' && supplier.contracts < 20) ||
      (filter === 'risk' && supplier.riskLevel !== 'low')
    
    return categoryMatch && filterMatch
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Supplier Network Intelligence</h2>
          <p className="text-gray-400">AI-powered vendor management with predictive scoring</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <Globe className="w-4 h-4" />
            <span>Map View</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
            <Package className="w-4 h-4" />
            <span>New RFQ</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Network Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Factory,
            label: 'Total Suppliers',
            value: networkStats.totalSuppliers,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: Shield,
            label: 'Verified',
            value: networkStats.verifiedSuppliers,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: Star,
            label: 'Avg Rating',
            value: networkStats.avgRating,
            format: 'decimal',
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          },
          {
            icon: BarChart3,
            label: 'Active Bids',
            value: networkStats.activeBids,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.format === 'decimal' ? metric.value : <AnimatedCounter value={metric.value} />}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* AI Recommendations */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Procurement Insights</h3>
            <p className="text-gray-300">
              <span className="font-semibold text-green-400">Steel prices expected to drop 8%</span> in next 30 days. 
              Consider delaying non-urgent orders. <span className="font-semibold text-blue-400">3 new suppliers</span> match 
              your quality requirements with 15% better pricing. <span className="font-semibold text-amber-400">Contract renewal 
              needed</span> for 5 suppliers by month-end.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {(['all', 'recommended', 'new', 'risk'] as const).map((f) => (
            <AnimatedButton
              key={f}
              variant={filter === f ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setFilter(f)}
              className={filter === f ? 'bg-gradient-to-r from-green-600 to-emerald-600' : ''}
            >
              {f === 'all' && 'All Suppliers'}
              {f === 'recommended' && (
                <>
                  <Zap className="w-4 h-4" />
                  AI Recommended
                </>
              )}
              {f === 'new' && 'New Suppliers'}
              {f === 'risk' && (
                <>
                  <AlertTriangle className="w-4 h-4" />
                  Risk Alert
                </>
              )}
            </AnimatedButton>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value as any)}
            className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white focus:outline-none focus:border-white/20"
          >
            <option value="all">All Categories</option>
            <option value="cement">Cement</option>
            <option value="steel">Steel</option>
            <option value="tiles">Tiles</option>
            <option value="electrical">Electrical</option>
          </select>
        </div>
      </div>

      {/* Supplier List */}
      <div className="space-y-4">
        {filteredSuppliers.map((supplier, index) => (
          <motion.div
            key={supplier.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6" 
              variant="accent" 
              hover
              onClick={() => setSelectedSupplier(supplier.id === selectedSupplier ? null : supplier.id)}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-4">
                  {/* AI Score */}
                  <div className="relative">
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${getRiskColor(supplier.riskLevel)} p-1`}>
                      <div className="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
                        <span className="text-xl font-bold text-white">{supplier.aiScore}</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-1 -right-1">
                      {supplier.riskLevel === 'low' && <CheckCircle className="w-5 h-5 text-green-400" />}
                      {supplier.riskLevel === 'medium' && <AlertTriangle className="w-5 h-5 text-amber-400" />}
                      {supplier.riskLevel === 'high' && <AlertTriangle className="w-5 h-5 text-red-400" />}
                    </div>
                  </div>

                  {/* Supplier Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="text-xl font-semibold text-white">{supplier.name}</h4>
                      <span className="px-3 py-1 rounded-full bg-white/10 text-xs text-gray-300 capitalize">
                        {supplier.category}
                      </span>
                      {supplier.contracts < 20 && (
                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-xs text-blue-400">
                          New
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{supplier.location}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-amber-400" />
                        <span className="text-white">{supplier.rating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Award className="w-4 h-4" />
                        <span>{supplier.contracts} contracts</span>
                      </div>
                    </div>

                    {/* Metrics Grid */}
                    <div className="grid grid-cols-4 gap-4">
                      <div>
                        <p className="text-xs text-gray-400">Reliability</p>
                        <div className="flex items-center gap-1">
                          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${supplier.reliability}%` }}
                              className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                            />
                          </div>
                          <span className="text-xs text-white">{supplier.reliability}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Delivery</p>
                        <div className="flex items-center gap-1">
                          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${supplier.deliveryRate}%` }}
                              className="h-full bg-gradient-to-r from-blue-400 to-indigo-600"
                            />
                          </div>
                          <span className="text-xs text-white">{supplier.deliveryRate}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Pricing</p>
                        <div className="flex items-center gap-1">
                          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${supplier.priceCompetitiveness}%` }}
                              className="h-full bg-gradient-to-r from-amber-400 to-orange-600"
                            />
                          </div>
                          <span className="text-xs text-white">{supplier.priceCompetitiveness}%</span>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-400">Quality</p>
                        <div className="flex items-center gap-1">
                          <div className="flex-1 h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${supplier.qualityScore}%` }}
                              className="h-full bg-gradient-to-r from-purple-400 to-pink-600"
                            />
                          </div>
                          <span className="text-xs text-white">{supplier.qualityScore}%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Total Volume */}
                <div className="text-right">
                  <p className="text-sm text-gray-400">Total Volume</p>
                  <p className="text-xl font-bold text-white">{formatBDT(supplier.totalVolume)}</p>
                  
                  <AnimatedButton
                    variant="primary"
                    size="sm"
                    className="mt-3 bg-gradient-to-r from-green-600 to-emerald-600"
                  >
                    Request Quote
                    <ChevronRight className="w-4 h-4" />
                  </AnimatedButton>
                </div>
              </div>

              {/* AI Recommendation */}
              <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-md border border-purple-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Brain className="w-4 h-4 text-purple-400" />
                  <span className="text-sm font-medium text-purple-400">AI Recommendation</span>
                </div>
                <p className="text-sm text-gray-300">{supplier.recommendation}</p>
              </div>

              {/* Expanded Details */}
              {selectedSupplier === supplier.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-white/10 grid grid-cols-1 md:grid-cols-3 gap-6"
                >
                  {/* Certifications */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3">Certifications</h5>
                    <div className="flex flex-wrap gap-2">
                      {supplier.certifications.map((cert) => (
                        <span key={cert} className="px-3 py-1 rounded-full bg-green-500/20 text-xs text-green-400">
                          {cert}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Specialties */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3">Specialties</h5>
                    <div className="flex flex-wrap gap-2">
                      {supplier.specialties.map((specialty) => (
                        <span key={specialty} className="px-3 py-1 rounded-full bg-blue-500/20 text-xs text-blue-400">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Contact */}
                  <div>
                    <h5 className="text-sm font-medium text-white mb-3">Contact Person</h5>
                    <div className="space-y-2">
                      <p className="text-sm text-gray-300">{supplier.contact.person}</p>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Phone className="w-4 h-4" />
                        <span>{supplier.contact.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-400">
                        <Mail className="w-4 h-4" />
                        <span>{supplier.contact.email}</span>
                      </div>
                    </div>
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