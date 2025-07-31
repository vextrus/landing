'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Smartphone,
  RefreshCw,
  DollarSign,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  CheckCircle,
  AlertCircle,
  QrCode,
  Wallet,
  CreditCard,
  Activity,
  TrendingUp,
  Filter
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface Transaction {
  id: string
  amount: number
  method: 'bkash' | 'nagad' | 'bank' | 'rocket'
  type: 'in' | 'out'
  party: string
  phone?: string
  time: string
  status: 'completed' | 'pending' | 'failed'
  reference: string
}

export default function LivePayments() {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [filter, setFilter] = useState<'all' | 'bkash' | 'nagad' | 'bank'>('all')
  const [isLive, setIsLive] = useState(true)
  const transactionIdCounter = useRef(1)

  // Initialize with some transactions
  useEffect(() => {
    setTransactions([
      {
        id: '1',
        amount: 1520000,
        method: 'bkash',
        type: 'in',
        party: 'ABC Developers',
        phone: '+8801712345678',
        time: '2 mins ago',
        status: 'completed',
        reference: 'BK2024123456'
      },
      {
        id: '2',
        amount: 850000,
        method: 'nagad',
        type: 'out',
        party: 'Steel Supplier BD',
        phone: '+8801823456789',
        time: '5 mins ago',
        status: 'completed',
        reference: 'NG2024654321'
      },
      {
        id: '3',
        amount: 5200000,
        method: 'bank',
        type: 'in',
        party: 'XYZ Construction',
        time: '12 mins ago',
        status: 'pending',
        reference: 'DBBL2024789'
      }
    ])
  }, [])

  // Simulate live transactions
  useEffect(() => {
    if (!isLive) return

    const interval = setInterval(() => {
      const methods: ('bkash' | 'nagad' | 'bank' | 'rocket')[] = ['bkash', 'nagad', 'bank', 'rocket']
      const parties = [
        'Dream Housing Ltd',
        'Concrete Suppliers BD',
        'Metro Construction',
        'Gulshan Developers',
        'Dhanmondi Builders',
        'Bashundhara Group',
        'Rupayan Housing',
        'Building Materials Co'
      ]
      
      const newTransaction: Transaction = {
        id: `transaction-${transactionIdCounter.current++}`,
        amount: Math.floor(Math.random() * 5000000) + 100000,
        method: methods[Math.floor(Math.random() * methods.length)],
        type: Math.random() > 0.4 ? 'in' : 'out',
        party: parties[Math.floor(Math.random() * parties.length)],
        phone: `+88017${Math.floor(Math.random() * 100000000)}`,
        time: 'just now',
        status: Math.random() > 0.1 ? 'completed' : 'pending',
        reference: `${Math.random() > 0.5 ? 'BK' : 'NG'}${Date.now().toString().slice(-8)}`
      }
      
      setTransactions(prev => [newTransaction, ...prev.slice(0, 19)])
    }, 5000)

    return () => clearInterval(interval)
  }, [isLive])

  const filteredTransactions = transactions.filter(t => 
    filter === 'all' || t.method === filter
  )

  const stats = {
    bkash: {
      total: transactions.filter(t => t.method === 'bkash' && t.type === 'in').reduce((sum, t) => sum + t.amount, 0),
      count: transactions.filter(t => t.method === 'bkash').length,
      color: 'from-pink-400 to-rose-600',
      bgColor: 'from-pink-500/20 to-rose-500/20'
    },
    nagad: {
      total: transactions.filter(t => t.method === 'nagad' && t.type === 'in').reduce((sum, t) => sum + t.amount, 0),
      count: transactions.filter(t => t.method === 'nagad').length,
      color: 'from-orange-400 to-red-600',
      bgColor: 'from-orange-500/20 to-red-500/20'
    },
    bank: {
      total: transactions.filter(t => t.method === 'bank').reduce((sum, t) => sum + (t.type === 'in' ? t.amount : -t.amount), 0),
      count: transactions.filter(t => t.method === 'bank').length,
      color: 'from-blue-400 to-indigo-600',
      bgColor: 'from-blue-500/20 to-indigo-500/20'
    }
  }

  const getMethodLogo = (method: string) => {
    switch (method) {
      case 'bkash':
        return <span className="text-xl font-bold text-pink-500">bKash</span>
      case 'nagad':
        return <span className="text-xl font-bold text-orange-500">Nagad</span>
      case 'rocket':
        return <span className="text-xl font-bold text-purple-500">Rocket</span>
      default:
        return <CreditCard className="w-5 h-5 text-blue-500" />
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Live Payment Dashboard</h2>
          <p className="text-gray-400">Real-time payment tracking across all channels</p>
        </div>
        <div className="flex items-center gap-4">
          <AnimatedButton
            variant={isLive ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setIsLive(!isLive)}
            className={isLive ? 'bg-gradient-to-r from-green-600 to-emerald-600' : ''}
          >
            <div className={`w-2 h-2 rounded-full ${isLive ? 'bg-white animate-pulse' : 'bg-gray-400'}`} />
            <span>{isLive ? 'Live' : 'Paused'}</span>
          </AnimatedButton>
          
          <AnimatedButton variant="ghost" size="sm">
            <QrCode className="w-4 h-4" />
            <span>QR Receive</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Payment Method Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {Object.entries(stats).map(([method, data]) => (
          <motion.div
            key={method}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <GlassCard className="p-6" variant="accent" hover>
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br ${data.bgColor}`}>
                  {getMethodLogo(method)}
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">{data.count} transactions</p>
                  <TrendingUp className="w-4 h-4 text-green-400 ml-auto" />
                </div>
              </div>
              
              <h3 className="text-sm text-gray-400 mb-1 capitalize">{method} Total</h3>
              <p className={`text-2xl font-bold bg-gradient-to-r ${data.color} bg-clip-text text-transparent`}>
                {formatBDT(Math.abs(data.total))}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2">
        {(['all', 'bkash', 'nagad', 'bank'] as const).map((method) => (
          <AnimatedButton
            key={method}
            variant={filter === method ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setFilter(method)}
            className={filter === method ? 'bg-gradient-to-r from-purple-600 to-pink-600' : ''}
          >
            <Filter className="w-4 h-4" />
            <span className="capitalize">{method === 'all' ? 'All Payments' : method}</span>
          </AnimatedButton>
        ))}
      </div>

      {/* Transactions List */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Transaction Stream</h3>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <RefreshCw className={`w-4 h-4 ${isLive ? 'animate-spin' : ''}`} />
            <span>Auto-updating</span>
          </div>
        </div>

        <div className="space-y-3 max-h-[600px] overflow-y-auto">
          <AnimatePresence mode="popLayout">
            {filteredTransactions.map((transaction, index) => (
              <motion.div
                key={transaction.id}
                layout
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`flex items-center gap-4 p-4 rounded-lg backdrop-blur-md border transition-all ${
                  transaction.status === 'pending' 
                    ? 'bg-amber-500/10 border-amber-500/30' 
                    : 'bg-white/5 border-white/10'
                } hover:bg-white/10 cursor-pointer group`}
              >
                {/* Method Logo */}
                <div className="flex-shrink-0">
                  <div className={`p-3 rounded-lg ${
                    transaction.method === 'bkash' ? 'bg-pink-500/20' :
                    transaction.method === 'nagad' ? 'bg-orange-500/20' :
                    transaction.method === 'rocket' ? 'bg-purple-500/20' :
                    'bg-blue-500/20'
                  }`}>
                    {getMethodLogo(transaction.method)}
                  </div>
                </div>

                {/* Transaction Details */}
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-medium text-white">{transaction.party}</h4>
                    {transaction.status === 'pending' && (
                      <span className="text-xs px-2 py-1 rounded-full bg-amber-500/20 text-amber-400">
                        Pending
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-4 mt-1">
                    {transaction.phone && (
                      <p className="text-sm text-gray-400">{transaction.phone}</p>
                    )}
                    <p className="text-sm text-gray-500">Ref: {transaction.reference}</p>
                    <p className="text-sm text-gray-500">{transaction.time}</p>
                  </div>
                </div>

                {/* Amount and Status */}
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <div className={`p-1 rounded ${
                      transaction.type === 'in' 
                        ? 'bg-green-500/20 text-green-400' 
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {transaction.type === 'in' ? (
                        <ArrowUpRight className="w-4 h-4" />
                      ) : (
                        <ArrowDownRight className="w-4 h-4" />
                      )}
                    </div>
                    <p className={`text-xl font-bold ${
                      transaction.type === 'in' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {transaction.type === 'in' ? '+' : '-'}{formatBDT(transaction.amount)}
                    </p>
                  </div>
                  
                  <div className="flex items-center gap-1 mt-1 justify-end">
                    {transaction.status === 'completed' ? (
                      <>
                        <CheckCircle className="w-4 h-4 text-green-400" />
                        <span className="text-xs text-green-400">Completed</span>
                      </>
                    ) : transaction.status === 'pending' ? (
                      <>
                        <Clock className="w-4 h-4 text-amber-400" />
                        <span className="text-xs text-amber-400">Processing</span>
                      </>
                    ) : (
                      <>
                        <AlertCircle className="w-4 h-4 text-red-400" />
                        <span className="text-xs text-red-400">Failed</span>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </GlassCard>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <GlassCard className="p-6 cursor-pointer group" hover>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-pink-500/20 to-rose-500/20">
              <QrCode className="w-6 h-6 text-pink-400" />
            </div>
            <div>
              <h4 className="font-medium text-white">Generate QR Code</h4>
              <p className="text-sm text-gray-400">Instant payment collection</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 cursor-pointer group" hover>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-green-500/20 to-emerald-500/20">
              <Wallet className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <h4 className="font-medium text-white">Bulk Payments</h4>
              <p className="text-sm text-gray-400">Pay multiple vendors</p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6 cursor-pointer group" hover>
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-indigo-500/20">
              <Activity className="w-6 h-6 text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-white">Payment Analytics</h4>
              <p className="text-sm text-gray-400">Detailed insights</p>
            </div>
          </div>
        </GlassCard>
      </div>
    </div>
  )
}