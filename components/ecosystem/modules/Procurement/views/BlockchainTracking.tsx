'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Link,
  Shield,
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  AlertTriangle,
  QrCode,
  FileText,
  Hash,
  Calendar,
  User,
  Building2,
  Activity,
  Lock,
  Unlock,
  ChevronRight,
  Eye,
  BarChart3
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface BlockchainShipment {
  id: string
  trackingId: string
  material: string
  quantity: string
  value: number
  supplier: string
  status: 'initiated' | 'in-transit' | 'customs' | 'delivered' | 'verified'
  currentLocation: string
  destination: string
  blocks: BlockchainBlock[]
  verificationStatus: 'pending' | 'partial' | 'complete'
  smartContractId: string
  eta: string
}

interface BlockchainBlock {
  id: string
  hash: string
  timestamp: string
  type: 'order' | 'shipment' | 'transit' | 'customs' | 'delivery' | 'verification'
  location: string
  verifiedBy: string
  data: any
  gasUsed?: number
}

export default function BlockchainTracking() {
  const [selectedShipment, setSelectedShipment] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<'active' | 'completed' | 'all'>('active')

  const blockchainStats = {
    activeShipments: 23,
    verifiedTransactions: 1847,
    smartContracts: 156,
    fraudPrevented: 12
  }

  const shipments: BlockchainShipment[] = [
    {
      id: '1',
      trackingId: 'BXTRS-2024-0342',
      material: 'MS Rod 60 Grade - 500 Tons',
      quantity: '500 Tons',
      value: 47500000,
      supplier: 'BSRM Steel',
      status: 'in-transit',
      currentLocation: 'Chittagong Port',
      destination: 'Gulshan Heights Site',
      verificationStatus: 'partial',
      smartContractId: '0x742d35Cc6634C0532925a3b844Bc9e7595f89590',
      eta: '2 days',
      blocks: [
        {
          id: '1',
          hash: '0x3d2f8a9b...e7c4d5a2',
          timestamp: '2024-03-15 09:30:00',
          type: 'order',
          location: 'BSRM Factory, Chittagong',
          verifiedBy: 'Supplier Node',
          data: { orderId: 'PO-2024-0342', quantity: 500, unit: 'tons' }
        },
        {
          id: '2',
          hash: '0x8f7e3c2a...b5d9f1e8',
          timestamp: '2024-03-16 14:45:00',
          type: 'shipment',
          location: 'BSRM Warehouse',
          verifiedBy: 'Logistics Partner',
          data: { trucks: 25, loadedQuantity: 500 }
        },
        {
          id: '3',
          hash: '0x5a9c7d3e...f2b8e4a1',
          timestamp: '2024-03-17 11:20:00',
          type: 'transit',
          location: 'Chittagong Port',
          verifiedBy: 'Port Authority',
          data: { clearanceDoc: 'CLR-2024-8934', status: 'cleared' }
        }
      ]
    },
    {
      id: '2',
      trackingId: 'BXTRS-2024-0341',
      material: 'Portland Cement - 2000 Bags',
      quantity: '2000 Bags',
      value: 960000,
      supplier: 'Shah Cement',
      status: 'delivered',
      currentLocation: 'Dhanmondi Site',
      destination: 'Dhanmondi Site',
      verificationStatus: 'complete',
      smartContractId: '0x892f4b8c...d3e7a5f9',
      eta: 'Delivered',
      blocks: [
        {
          id: '1',
          hash: '0x1a2b3c4d...5e6f7a8b',
          timestamp: '2024-03-10 08:00:00',
          type: 'order',
          location: 'Shah Cement Plant',
          verifiedBy: 'Supplier Node',
          data: { orderId: 'PO-2024-0341' },
          gasUsed: 21000
        },
        {
          id: '2',
          hash: '0x9c8d7e6f...5a4b3c2d',
          timestamp: '2024-03-11 10:30:00',
          type: 'shipment',
          location: 'Shah Cement Warehouse',
          verifiedBy: 'Quality Inspector',
          data: { qualityCert: 'QC-2024-7823' },
          gasUsed: 23000
        },
        {
          id: '3',
          hash: '0x7f6e5d4c...3b2a1908',
          timestamp: '2024-03-12 15:00:00',
          type: 'delivery',
          location: 'Dhanmondi Site',
          verifiedBy: 'Site Manager',
          data: { receivedBy: 'Karim Ahmed', condition: 'Good' },
          gasUsed: 25000
        },
        {
          id: '4',
          hash: '0x4d3c2b1a...0918f7e6',
          timestamp: '2024-03-12 16:30:00',
          type: 'verification',
          location: 'Dhanmondi Site',
          verifiedBy: 'Smart Contract',
          data: { paymentReleased: true, amount: 960000 },
          gasUsed: 45000
        }
      ]
    },
    {
      id: '3',
      trackingId: 'BXTRS-2024-0340',
      material: 'Electrical Cables - 50 Coils',
      quantity: '50 Coils',
      value: 210000,
      supplier: 'Bengal Electric',
      status: 'customs',
      currentLocation: 'Dhaka Customs',
      destination: 'Bashundhara Site',
      verificationStatus: 'pending',
      smartContractId: '0x234f9b7a...c5d8e2f1',
      eta: '5 days',
      blocks: [
        {
          id: '1',
          hash: '0x6e5d4c3b...2a190807',
          timestamp: '2024-03-14 13:00:00',
          type: 'order',
          location: 'Bengal Electric Factory',
          verifiedBy: 'Supplier Node',
          data: { orderId: 'PO-2024-0340' }
        },
        {
          id: '2',
          hash: '0x3b2a1908...07f6e5d4',
          timestamp: '2024-03-15 09:15:00',
          type: 'customs',
          location: 'Dhaka Customs',
          verifiedBy: 'Customs Authority',
          data: { status: 'Under Review', estimatedClearance: '3 days' }
        }
      ]
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'from-green-400 to-emerald-600'
      case 'verified': return 'from-blue-400 to-indigo-600'
      case 'in-transit': return 'from-amber-400 to-orange-600'
      case 'customs': return 'from-purple-400 to-pink-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getBlockIcon = (type: string) => {
    switch (type) {
      case 'order': return Package
      case 'shipment': return Truck
      case 'transit': return Activity
      case 'customs': return Building2
      case 'delivery': return CheckCircle
      case 'verification': return Shield
      default: return Hash
    }
  }

  const filteredShipments = shipments.filter(shipment => {
    if (viewMode === 'active') return shipment.status !== 'delivered'
    if (viewMode === 'completed') return shipment.status === 'delivered'
    return true
  })

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Blockchain Supply Chain</h2>
          <p className="text-gray-400">Immutable tracking with smart contract verification</p>
        </div>
        
        <div className="flex items-center gap-4">
          <AnimatedButton variant="ghost" size="sm">
            <QrCode className="w-4 h-4" />
            <span>Scan QR</span>
          </AnimatedButton>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-pink-600">
            <Link className="w-4 h-4" />
            <span>New Contract</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Blockchain Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          {
            icon: Truck,
            label: 'Active Shipments',
            value: blockchainStats.activeShipments,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: Shield,
            label: 'Verified Blocks',
            value: blockchainStats.verifiedTransactions,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: FileText,
            label: 'Smart Contracts',
            value: blockchainStats.smartContracts,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          },
          {
            icon: AlertTriangle,
            label: 'Fraud Prevented',
            value: blockchainStats.fraudPrevented,
            color: 'from-red-400 to-rose-600',
            bgColor: 'from-red-500/20 to-rose-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  <AnimatedCounter value={metric.value} />
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Network Activity */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">Blockchain Network Activity</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
            <span className="text-sm text-gray-400">Live</span>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">247</p>
            <p className="text-sm text-gray-400">Blocks Today</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">0.0023</p>
            <p className="text-sm text-gray-400">Avg Gas (BNB)</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white mb-1">99.9%</p>
            <p className="text-sm text-gray-400">Network Uptime</p>
          </div>
        </div>
      </GlassCard>

      {/* View Mode Selector */}
      <div className="flex items-center gap-2">
        {(['active', 'completed', 'all'] as const).map((mode) => (
          <AnimatedButton
            key={mode}
            variant={viewMode === mode ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode(mode)}
            className={viewMode === mode ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            {mode === 'active' && 'Active Shipments'}
            {mode === 'completed' && 'Completed'}
            {mode === 'all' && 'All Shipments'}
          </AnimatedButton>
        ))}
      </div>

      {/* Shipment List */}
      <div className="space-y-6">
        {filteredShipments.map((shipment, index) => (
          <motion.div
            key={shipment.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <GlassCard 
              className="p-6" 
              variant="accent" 
              hover
              onClick={() => setSelectedShipment(shipment.id === selectedShipment ? null : shipment.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="text-lg font-semibold text-white">{shipment.material}</h4>
                    <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getStatusColor(shipment.status)} bg-opacity-20`}>
                      {shipment.status.toUpperCase()}
                    </span>
                    {shipment.verificationStatus === 'complete' && (
                      <span className="flex items-center gap-1 px-3 py-1 rounded-full bg-green-500/20 text-xs text-green-400">
                        <Shield className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-gray-400">
                    <div className="flex items-center gap-1">
                      <Hash className="w-4 h-4" />
                      <span>{shipment.trackingId}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      <span>{shipment.currentLocation}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>ETA: {shipment.eta}</span>
                    </div>
                  </div>

                  {/* Smart Contract Info */}
                  <div className="mt-3 flex items-center gap-2 text-xs text-gray-500">
                    <Lock className="w-3 h-3" />
                    <span>Smart Contract: {shipment.smartContractId.slice(0, 10)}...{shipment.smartContractId.slice(-8)}</span>
                  </div>
                </div>

                <div className="text-right">
                  <p className="text-sm text-gray-400">Value</p>
                  <p className="text-xl font-bold text-white">{formatBDT(shipment.value)}</p>
                  
                  <AnimatedButton
                    variant="ghost"
                    size="sm"
                    className="mt-2"
                  >
                    <Eye className="w-4 h-4" />
                    Track
                  </AnimatedButton>
                </div>
              </div>

              {/* Blockchain Timeline */}
              <div className="flex items-center gap-2 overflow-x-auto pb-2">
                {shipment.blocks.map((block, idx) => {
                  const Icon = getBlockIcon(block.type)
                  return (
                    <div key={block.id} className="flex items-center">
                      <div className="flex flex-col items-center">
                        <div className={`p-3 rounded-xl bg-gradient-to-br ${
                          idx === shipment.blocks.length - 1 
                            ? 'from-blue-500/20 to-indigo-500/20' 
                            : 'from-green-500/20 to-emerald-500/20'
                        }`}>
                          <Icon className={`w-5 h-5 ${
                            idx === shipment.blocks.length - 1 
                              ? 'text-blue-400' 
                              : 'text-green-400'
                          }`} />
                        </div>
                        <p className="text-xs text-gray-500 mt-1">{block.type}</p>
                      </div>
                      {idx < shipment.blocks.length - 1 && (
                        <div className="w-16 h-0.5 bg-gradient-to-r from-green-400/50 to-green-400/20 mx-2" />
                      )}
                    </div>
                  )
                })}
              </div>

              {/* Expanded Blockchain Details */}
              {selectedShipment === shipment.id && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-6 pt-6 border-t border-white/10"
                >
                  <h5 className="text-sm font-medium text-white mb-4">Blockchain Transaction History</h5>
                  
                  <div className="space-y-3">
                    {shipment.blocks.map((block) => {
                      const Icon = getBlockIcon(block.type)
                      return (
                        <div key={block.id} className="p-4 rounded-lg bg-white/5 backdrop-blur-md">
                          <div className="flex items-start justify-between mb-3">
                            <div className="flex items-start gap-3">
                              <div className="p-2 rounded-lg bg-gradient-to-br from-purple-500/20 to-pink-500/20">
                                <Icon className="w-4 h-4 text-purple-400" />
                              </div>
                              <div>
                                <p className="font-medium text-white capitalize">{block.type}</p>
                                <p className="text-xs text-gray-400">{block.timestamp}</p>
                              </div>
                            </div>
                            {block.gasUsed && (
                              <p className="text-xs text-gray-500">Gas: {block.gasUsed}</p>
                            )}
                          </div>
                          
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <p className="text-gray-400">Block Hash</p>
                              <p className="text-white font-mono text-xs">{block.hash}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Verified By</p>
                              <p className="text-white">{block.verifiedBy}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Location</p>
                              <p className="text-white">{block.location}</p>
                            </div>
                            <div>
                              <p className="text-gray-400">Data</p>
                              <p className="text-white text-xs">{JSON.stringify(block.data).slice(0, 50)}...</p>
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-3 mt-6">
                    <AnimatedButton
                      variant="primary"
                      size="sm"
                      className="bg-gradient-to-r from-purple-600 to-pink-600"
                    >
                      <QrCode className="w-4 h-4" />
                      Generate QR
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <BarChart3 className="w-4 h-4" />
                      View Analytics
                    </AnimatedButton>
                    <AnimatedButton variant="ghost" size="sm">
                      <FileText className="w-4 h-4" />
                      Export Report
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