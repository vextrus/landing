'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  DollarSign,
  TrendingUp,
  Calendar,
  FileText,
  Users,
  PieChart,
  Calculator,
  Building2,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Download,
  Upload,
  Zap,
  Brain,
  Shield,
  Clock,
  BarChart3,
  ChevronRight,
  Target,
  Banknote
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter, AnimatedChart } from '../../../shared/ui'
import { formatBDT } from '../../../utils/bdCurrency'

interface PayrollSummary {
  month: string
  totalPayout: number
  employees: number
  taxDeducted: number
  netPayout: number
  bonuses: number
  deductions: number
  pfContribution: number
}

interface DepartmentPayroll {
  department: string
  employees: number
  avgSalary: number
  totalCost: number
  variance: number
  trend: 'up' | 'down' | 'stable'
}

interface PaymentMethod {
  method: string
  bank: string
  employees: number
  amount: number
  icon: string
  color: string
}

interface ComplianceItem {
  item: string
  status: 'compliant' | 'pending' | 'warning'
  dueDate: string
  description: string
}

export default function PayrollOptimization() {
  const [selectedMonth, setSelectedMonth] = useState('December 2024')
  const [viewMode, setViewMode] = useState<'overview' | 'analytics' | 'compliance'>('overview')

  const payrollStats = {
    totalMonthlyPayout: 45678900,
    employeesCovered: 2847,
    avgProcessingTime: 1.2,
    accuracyRate: 99.8,
    costSavings: 2340000
  }

  const currentPayroll: PayrollSummary = {
    month: 'December 2024',
    totalPayout: 45678900,
    employees: 2847,
    taxDeducted: 4567890,
    netPayout: 41111010,
    bonuses: 8901234,
    deductions: 2345678,
    pfContribution: 2740734
  }

  const departmentPayroll: DepartmentPayroll[] = [
    {
      department: 'Engineering',
      employees: 234,
      avgSalary: 85000,
      totalCost: 19890000,
      variance: +5.2,
      trend: 'up'
    },
    {
      department: 'Operations',
      employees: 1523,
      avgSalary: 35000,
      totalCost: 53305000,
      variance: -2.1,
      trend: 'down'
    },
    {
      department: 'MEP',
      employees: 456,
      avgSalary: 45000,
      totalCost: 20520000,
      variance: +1.8,
      trend: 'up'
    },
    {
      department: 'Administration',
      employees: 123,
      avgSalary: 55000,
      totalCost: 6765000,
      variance: 0,
      trend: 'stable'
    }
  ]

  const paymentMethods: PaymentMethod[] = [
    {
      method: 'Bank Transfer',
      bank: 'BRAC Bank',
      employees: 1234,
      amount: 23456789,
      icon: '🏦',
      color: 'from-blue-400 to-indigo-600'
    },
    {
      method: 'Mobile Banking',
      bank: 'bKash',
      employees: 892,
      amount: 12345678,
      icon: '📱',
      color: 'from-pink-400 to-rose-600'
    },
    {
      method: 'Bank Transfer',
      bank: 'Dutch-Bangla Bank',
      employees: 567,
      amount: 8901234,
      icon: '🏦',
      color: 'from-green-400 to-emerald-600'
    },
    {
      method: 'Cash',
      bank: 'Office Payout',
      employees: 154,
      amount: 975399,
      icon: '💵',
      color: 'from-amber-400 to-orange-600'
    }
  ]

  const complianceItems: ComplianceItem[] = [
    {
      item: 'Tax Deduction at Source (TDS)',
      status: 'compliant',
      dueDate: '15th of next month',
      description: 'Monthly TDS submission to NBR'
    },
    {
      item: 'Provident Fund Submission',
      status: 'compliant',
      dueDate: '10th of next month',
      description: 'Employee PF contribution deposit'
    },
    {
      item: 'Gratuity Fund Update',
      status: 'pending',
      dueDate: '31st December',
      description: 'Annual gratuity provision update'
    },
    {
      item: 'Minimum Wage Compliance',
      status: 'compliant',
      dueDate: 'Ongoing',
      description: 'As per Bangladesh Labour Act 2006'
    },
    {
      item: 'Festival Bonus (Eid)',
      status: 'warning',
      dueDate: '30 days before Eid',
      description: 'Mandatory festival bonus calculation'
    }
  ]

  const monthlyTrend = [
    { name: 'Jul', payout: 42.5, employees: 2650 },
    { name: 'Aug', payout: 43.2, employees: 2690 },
    { name: 'Sep', payout: 44.1, employees: 2750 },
    { name: 'Oct', payout: 44.8, employees: 2800 },
    { name: 'Nov', payout: 45.2, employees: 2830 },
    { name: 'Dec', payout: 45.7, employees: 2847 }
  ]

  const getComplianceColor = (status: string) => {
    switch (status) {
      case 'compliant': return 'from-green-400 to-emerald-600'
      case 'pending': return 'from-amber-400 to-orange-600'
      case 'warning': return 'from-red-400 to-rose-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getComplianceIcon = (status: string) => {
    switch (status) {
      case 'compliant': return CheckCircle
      case 'pending': return Clock
      case 'warning': return AlertTriangle
      default: return Shield
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Payroll Optimization Center</h2>
          <p className="text-gray-400">AI-powered payroll processing with Bangladesh compliance</p>
        </div>
        
        <div className="flex items-center gap-4">
          <select
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white focus:outline-none focus:border-white/20"
          >
            <option value="December 2024">December 2024</option>
            <option value="November 2024">November 2024</option>
            <option value="October 2024">October 2024</option>
          </select>
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
            <Calculator className="w-4 h-4" />
            <span>Run Payroll</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Payroll Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          {
            icon: DollarSign,
            label: 'Monthly Payout',
            value: formatBDT(payrollStats.totalMonthlyPayout),
            format: 'string',
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: Users,
            label: 'Employees',
            value: payrollStats.employeesCovered,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: Clock,
            label: 'Processing Time',
            value: `${payrollStats.avgProcessingTime}h`,
            format: 'string',
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          },
          {
            icon: Shield,
            label: 'Accuracy',
            value: `${payrollStats.accuracyRate}%`,
            format: 'string',
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          },
          {
            icon: TrendingUp,
            label: 'Cost Savings',
            value: formatBDT(payrollStats.costSavings),
            format: 'string',
            color: 'from-teal-400 to-cyan-600',
            bgColor: 'from-teal-500/20 to-cyan-500/20'
          }
        ].map((metric) => (
          <GlassCard key={metric.label} className="p-6" variant="accent" hover>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-400 mb-1">{metric.label}</p>
                <p className={`text-2xl font-bold bg-gradient-to-r ${metric.color} bg-clip-text text-transparent`}>
                  {metric.format === 'string' ? metric.value : <AnimatedCounter value={metric.value as number} />}
                </p>
              </div>
              <div className={`p-3 rounded-xl bg-gradient-to-br ${metric.bgColor}`}>
                <metric.icon className="w-6 h-6 text-white" />
              </div>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* AI Insights */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20">
            <Brain className="w-6 h-6 text-purple-400" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-white mb-2">AI Payroll Intelligence</h3>
            <p className="text-gray-300">
              Payroll optimization analysis shows <span className="font-semibold text-green-400">৳23.4 Lakh</span> potential 
              savings through automated processing. <span className="font-semibold text-amber-400">127 employees</span> are 
              due for performance-based increments. Eid bonus provision of <span className="font-semibold text-blue-400">
              ৳89 Lakh</span> recommended based on last year's pattern. Tax optimization can save 
              <span className="font-semibold text-purple-400">৳12.5 Lakh</span> through proper deduction management.
            </p>
          </div>
        </div>
      </GlassCard>

      {/* View Tabs */}
      <div className="flex items-center gap-2">
        {(['overview', 'analytics', 'compliance'] as const).map((mode) => (
          <AnimatedButton
            key={mode}
            variant={viewMode === mode ? 'primary' : 'ghost'}
            size="sm"
            onClick={() => setViewMode(mode)}
            className={viewMode === mode ? 'bg-gradient-to-r from-green-600 to-emerald-600' : ''}
          >
            {mode === 'overview' && <FileText className="w-4 h-4" />}
            {mode === 'analytics' && <BarChart3 className="w-4 h-4" />}
            {mode === 'compliance' && <Shield className="w-4 h-4" />}
            <span className="capitalize">{mode}</span>
          </AnimatedButton>
        ))}
      </div>

      {viewMode === 'overview' && (
        <div className="space-y-6">
          {/* Current Month Summary */}
          <GlassCard className="p-6" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">{currentPayroll.month} Payroll Summary</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-400 mb-1">Gross Payout</p>
                <p className="text-xl font-bold text-white">{formatBDT(currentPayroll.totalPayout)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Tax Deducted</p>
                <p className="text-xl font-bold text-red-400">{formatBDT(currentPayroll.taxDeducted)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">Net Payout</p>
                <p className="text-xl font-bold text-green-400">{formatBDT(currentPayroll.netPayout)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400 mb-1">PF Contribution</p>
                <p className="text-xl font-bold text-blue-400">{formatBDT(currentPayroll.pfContribution)}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-gray-300">Festival Bonuses</span>
                <span className="text-white font-medium">{formatBDT(currentPayroll.bonuses)}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-gray-300">Other Deductions</span>
                <span className="text-red-400 font-medium">-{formatBDT(currentPayroll.deductions)}</span>
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg bg-white/5">
                <span className="text-gray-300">Total Employees</span>
                <span className="text-white font-medium">{currentPayroll.employees}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-3">
              <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-green-600 to-emerald-600">
                <Download className="w-4 h-4" />
                Export Payslips
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="sm">
                <Upload className="w-4 h-4" />
                Upload Attendance
              </AnimatedButton>
              <AnimatedButton variant="ghost" size="sm">
                <CreditCard className="w-4 h-4" />
                Process Payments
              </AnimatedButton>
            </div>
          </GlassCard>

          {/* Department Breakdown */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <GlassCard className="p-6" variant="accent">
              <h3 className="text-lg font-semibold text-white mb-4">Department Payroll</h3>
              <div className="space-y-3">
                {departmentPayroll.map((dept) => (
                  <div key={dept.department} className="p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-white">{dept.department}</h4>
                      <div className="flex items-center gap-2">
                        <span className={`text-sm ${
                          dept.variance > 0 ? 'text-red-400' : 
                          dept.variance < 0 ? 'text-green-400' : 
                          'text-gray-400'
                        }`}>
                          {dept.variance > 0 ? '+' : ''}{dept.variance}%
                        </span>
                        {dept.trend === 'up' && <TrendingUp className="w-3 h-3 text-red-400" />}
                        {dept.trend === 'down' && <TrendingUp className="w-3 h-3 text-green-400 rotate-180" />}
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div>
                        <p className="text-gray-400">Employees</p>
                        <p className="text-gray-300">{dept.employees}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Avg Salary</p>
                        <p className="text-gray-300">{formatBDT(dept.avgSalary)}</p>
                      </div>
                      <div>
                        <p className="text-gray-400">Total Cost</p>
                        <p className="text-gray-300">{formatBDT(dept.totalCost)}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6" variant="accent">
              <h3 className="text-lg font-semibold text-white mb-4">Payment Methods</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div key={`${method.method}-${method.bank}`} className="p-3 rounded-lg bg-white/5">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{method.icon}</span>
                        <div>
                          <p className="font-medium text-white">{method.bank}</p>
                          <p className="text-xs text-gray-400">{method.method}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">{formatBDT(method.amount)}</p>
                        <p className="text-xs text-gray-400">{method.employees} employees</p>
                      </div>
                    </div>
                    
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(method.amount / currentPayroll.netPayout) * 100}%` }}
                        className={`h-full bg-gradient-to-r ${method.color}`}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-indigo-500/10 backdrop-blur-md border border-blue-500/20">
                <div className="flex items-center gap-2 mb-1">
                  <Zap className="w-4 h-4 text-blue-400" />
                  <span className="text-sm font-medium text-blue-400">Smart Disbursement</span>
                </div>
                <p className="text-xs text-gray-300">
                  AI recommends processing bKash payments first (11:00 AM) followed by bank 
                  transfers (2:00 PM) for optimal success rate.
                </p>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {viewMode === 'analytics' && (
        <div className="space-y-6">
          <GlassCard className="p-6" variant="accent">
            <h3 className="text-lg font-semibold text-white mb-4">Payroll Trend Analysis</h3>
            <AnimatedChart
              data={monthlyTrend}
              dataKey="payout"
              type="area"
              height={250}
              color="#10B981"
              gradient={true}
            />
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <GlassCard className="p-6" variant="accent">
              <h3 className="text-lg font-semibold text-white mb-4">Cost Breakdown</h3>
              <div className="space-y-3">
                {[
                  { category: 'Base Salary', amount: 35234567, percentage: 77 },
                  { category: 'Allowances', amount: 6789012, percentage: 15 },
                  { category: 'Bonuses', amount: 2345678, percentage: 5 },
                  { category: 'Overtime', amount: 1309555, percentage: 3 }
                ].map((item) => (
                  <div key={item.category}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300">{item.category}</span>
                      <span className="text-sm text-white">{item.percentage}%</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${item.percentage}%` }}
                        className="h-full bg-gradient-to-r from-green-400 to-emerald-600"
                      />
                    </div>
                    <p className="text-xs text-gray-400 mt-1">{formatBDT(item.amount)}</p>
                  </div>
                ))}
              </div>
            </GlassCard>

            <GlassCard className="p-6" variant="accent">
              <h3 className="text-lg font-semibold text-white mb-4">Salary Distribution</h3>
              <div className="space-y-3">
                {[
                  { range: '< ৳25K', employees: 892, percentage: 31 },
                  { range: '৳25K - ৳50K', employees: 1234, percentage: 43 },
                  { range: '৳50K - ৳100K', employees: 567, percentage: 20 },
                  { range: '> ৳100K', employees: 154, percentage: 6 }
                ].map((range) => (
                  <div key={range.range}>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm text-gray-300">{range.range}</span>
                      <span className="text-sm text-white">{range.employees} ({range.percentage}%)</span>
                    </div>
                    <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${range.percentage}%` }}
                        className="h-full bg-gradient-to-r from-blue-400 to-indigo-600"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-4 text-center pt-4 border-t border-white/10">
                <p className="text-xs text-gray-400">Median Salary</p>
                <p className="text-lg font-bold text-white">৳42,500</p>
              </div>
            </GlassCard>

            <GlassCard className="p-6" variant="accent">
              <h3 className="text-lg font-semibold text-white mb-4">Optimization Metrics</h3>
              <div className="space-y-4">
                <div className="text-center py-2">
                  <Target className="w-8 h-8 text-green-400 mx-auto mb-2" />
                  <p className="text-2xl font-bold text-white mb-1">18%</p>
                  <p className="text-sm text-gray-400">Cost Reduction</p>
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <span className="text-xs text-gray-300">Auto Processing</span>
                    <span className="text-xs text-green-400">95%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <span className="text-xs text-gray-300">Error Rate</span>
                    <span className="text-xs text-green-400">0.2%</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <span className="text-xs text-gray-300">Time Saved</span>
                    <span className="text-xs text-green-400">72 hrs/mo</span>
                  </div>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}

      {viewMode === 'compliance' && (
        <div className="space-y-6">
          <GlassCard className="p-6" variant="accent">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-white">Bangladesh Labour Law Compliance</h3>
              <AnimatedButton variant="ghost" size="sm">
                <FileText className="w-4 h-4" />
                <span>Compliance Report</span>
              </AnimatedButton>
            </div>
            
            <div className="space-y-3">
              {complianceItems.map((item) => {
                const StatusIcon = getComplianceIcon(item.status)
                return (
                  <div
                    key={item.item}
                    className="p-4 rounded-lg bg-white/5 backdrop-blur-md border border-white/10"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg bg-gradient-to-br ${getComplianceColor(item.status)} bg-opacity-20`}>
                          <StatusIcon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h4 className="font-medium text-white mb-1">{item.item}</h4>
                          <p className="text-sm text-gray-400">{item.description}</p>
                          <p className="text-xs text-gray-500 mt-1">Due: {item.dueDate}</p>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium bg-gradient-to-r ${getComplianceColor(item.status)} bg-opacity-20`}>
                        {item.status.toUpperCase()}
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </GlassCard>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GlassCard className="p-6" variant="accent">
              <h3 className="text-lg font-semibold text-white mb-4">Tax Optimization</h3>
              <div className="space-y-4">
                <div className="p-4 rounded-lg bg-gradient-to-r from-green-500/10 to-emerald-500/10 backdrop-blur-md border border-green-500/20">
                  <div className="flex items-center gap-2 mb-2">
                    <Banknote className="w-5 h-5 text-green-400" />
                    <span className="font-medium text-green-400">Tax Savings Identified</span>
                  </div>
                  <p className="text-2xl font-bold text-white mb-1">{formatBDT(1250000)}</p>
                  <p className="text-sm text-gray-300">Through proper investment declarations</p>
                </div>

                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-300 mb-2">Optimization Areas:</p>
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <span className="text-xs text-gray-400">House Rent Allowance</span>
                    <span className="text-xs text-green-400">{formatBDT(450000)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <span className="text-xs text-gray-400">Medical Allowance</span>
                    <span className="text-xs text-green-400">{formatBDT(320000)}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 rounded bg-white/5">
                    <span className="text-xs text-gray-400">Investment Rebates</span>
                    <span className="text-xs text-green-400">{formatBDT(480000)}</span>
                  </div>
                </div>
              </div>
            </GlassCard>

            <GlassCard className="p-6" variant="accent">
              <h3 className="text-lg font-semibold text-white mb-4">Upcoming Obligations</h3>
              <div className="space-y-3">
                <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-amber-400">Eid-ul-Fitr Bonus</span>
                    <span className="text-sm text-amber-400">In 45 days</span>
                  </div>
                  <p className="text-sm text-gray-300">Estimated amount: {formatBDT(8900000)}</p>
                  <p className="text-xs text-gray-400 mt-1">For 2,847 eligible employees</p>
                </div>

                <div className="p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-blue-400">Annual Increment</span>
                    <span className="text-sm text-blue-400">January 2025</span>
                  </div>
                  <p className="text-sm text-gray-300">Projected increase: {formatBDT(3200000)}</p>
                  <p className="text-xs text-gray-400 mt-1">Based on performance ratings</p>
                </div>

                <div className="p-3 rounded-lg bg-purple-500/10 border border-purple-500/20">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-medium text-purple-400">Gratuity Provision</span>
                    <span className="text-sm text-purple-400">Year-end</span>
                  </div>
                  <p className="text-sm text-gray-300">Required provision: {formatBDT(12500000)}</p>
                  <p className="text-xs text-gray-400 mt-1">Current provision: {formatBDT(9800000)}</p>
                </div>
              </div>
            </GlassCard>
          </div>
        </div>
      )}
    </div>
  )
}