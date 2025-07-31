// Enhanced Mock Data Service for Vextrus AI Command Center
// Provides ultra-realistic, time-aware data simulations across all ERP modules

import { bangladeshSites, getSiteStatistics, ConstructionSite } from './bangladeshSitesData'

// ===== TYPE DEFINITIONS =====

export interface WeatherCondition {
  type: 'clear' | 'cloudy' | 'rain' | 'storm' | 'fog'
  temperature: number // Celsius
  humidity: number // percentage
  windSpeed: number // km/h
  visibility: number // km
  impact: {
    productivity: number // -50 to 0
    safety: number // -30 to 0
    concrete: boolean // can pour concrete
    highAltitude: boolean // can work at height
  }
}

export interface SupplyChainEvent {
  id: string
  timestamp: Date
  type: 'order_placed' | 'shipment_delayed' | 'delivery_arrived' | 'quality_issue' | 'price_change'
  supplier: string
  material: string
  quantity: number
  unit: string
  impact: 'critical' | 'high' | 'medium' | 'low'
  estimatedDelay?: number // hours
  priceChange?: number // percentage
}

export interface FinancialTransaction {
  id: string
  timestamp: Date
  type: 'income' | 'expense' | 'transfer'
  category: string
  amount: number // BDT
  description: string
  projectId?: string
  status: 'pending' | 'approved' | 'completed' | 'rejected'
  approvedBy?: string
  paymentMethod?: 'bank' | 'bKash' | 'nagad' | 'cash' | 'check'
}

export interface WorkforceEvent {
  id: string
  timestamp: Date
  type: 'check_in' | 'check_out' | 'overtime' | 'accident' | 'training' | 'leave'
  workerId: string
  workerName: string
  siteId: string
  details: string
  severity?: 'minor' | 'moderate' | 'severe'
  hoursWorked?: number
}

export interface EquipmentTelemetry {
  id: string
  equipmentId: string
  equipmentType: string
  timestamp: Date
  status: 'active' | 'idle' | 'maintenance' | 'fault'
  location: { lat: number; lng: number }
  metrics: {
    fuelLevel: number // percentage
    engineHours: number
    temperature: number // Celsius
    vibration: number // Hz
    hydraulicPressure?: number // PSI
    loadWeight?: number // tons
  }
  alerts: string[]
}

export interface QualityControlIncident {
  id: string
  timestamp: Date
  siteId: string
  type: 'defect' | 'non_compliance' | 'safety_violation' | 'material_rejection'
  severity: 'critical' | 'major' | 'minor'
  description: string
  detectedBy: string
  images?: string[]
  correctionRequired: boolean
  estimatedImpact: {
    time: number // days delay
    cost: number // BDT
  }
}

export interface AIInsight {
  id: string
  timestamp: Date
  module: string
  type: 'prediction' | 'anomaly' | 'optimization' | 'warning'
  title: string
  description: string
  confidence: number // 0-100
  impact: string
  recommendations: string[]
  relatedData?: any
}

// ===== CONSTANTS & CONFIGURATIONS =====

const BANGLADESH_TIMEZONE = 'Asia/Dhaka'
const WORKING_HOURS = { start: 8, end: 18 } // 8 AM to 6 PM
const PRAYER_TIMES = [
  { name: 'Fajr', hour: 5, duration: 20 },
  { name: 'Zuhr', hour: 13, duration: 30 },
  { name: 'Asr', hour: 16, duration: 20 },
  { name: 'Maghrib', hour: 18, duration: 20 },
  { name: 'Isha', hour: 20, duration: 20 }
]

const MONSOON_MONTHS = [5, 6, 7, 8, 9] // May to September
const WINTER_MONTHS = [11, 12, 1, 2] // November to February

// Material suppliers in Bangladesh
const SUPPLIERS = [
  { name: 'BSRM Steel', materials: ['steel', 'rod'], reliability: 0.92 },
  { name: 'Shah Cement', materials: ['cement'], reliability: 0.88 },
  { name: 'Akij Cement', materials: ['cement'], reliability: 0.85 },
  { name: 'Mir Concrete', materials: ['concrete'], reliability: 0.90 },
  { name: 'Navana Building Materials', materials: ['bricks', 'sand'], reliability: 0.87 },
  { name: 'Concord Steel', materials: ['steel', 'fabrication'], reliability: 0.89 },
  { name: 'Fresh Cement', materials: ['cement'], reliability: 0.86 },
  { name: 'Anwar Cement', materials: ['cement'], reliability: 0.84 }
]

// Equipment types and their characteristics
const EQUIPMENT_TYPES = {
  crane: { 
    fuelConsumption: 15, // liters/hour
    maintenanceInterval: 200, // hours
    criticalTemp: 95, // Celsius
    normalVibration: 50 // Hz
  },
  excavator: {
    fuelConsumption: 12,
    maintenanceInterval: 250,
    criticalTemp: 90,
    normalVibration: 40
  },
  concrete_mixer: {
    fuelConsumption: 8,
    maintenanceInterval: 150,
    criticalTemp: 85,
    normalVibration: 60
  },
  truck: {
    fuelConsumption: 10,
    maintenanceInterval: 300,
    criticalTemp: 88,
    normalVibration: 30
  }
}

// ===== UTILITY FUNCTIONS =====

function getCurrentBangladeshTime(): Date {
  return new Date()
}

function getTimeOfDay(date: Date): 'morning' | 'midday' | 'afternoon' | 'evening' | 'night' {
  const hour = date.getHours()
  if (hour >= 5 && hour < 10) return 'morning'
  if (hour >= 10 && hour < 14) return 'midday'
  if (hour >= 14 && hour < 17) return 'afternoon'
  if (hour >= 17 && hour < 20) return 'evening'
  return 'night'
}

function isWorkingHours(date: Date): boolean {
  const hour = date.getHours()
  const day = date.getDay()
  // Friday is weekend in Bangladesh
  if (day === 5) return false
  return hour >= WORKING_HOURS.start && hour < WORKING_HOURS.end
}

function isPrayerTime(date: Date): { isPrayer: boolean; prayerName?: string } {
  const hour = date.getHours()
  const minute = date.getMinutes()
  
  for (const prayer of PRAYER_TIMES) {
    const prayerStart = prayer.hour * 60
    const prayerEnd = prayerStart + prayer.duration
    const currentMinutes = hour * 60 + minute
    
    if (currentMinutes >= prayerStart && currentMinutes < prayerEnd) {
      return { isPrayer: true, prayerName: prayer.name }
    }
  }
  
  return { isPrayer: false }
}

function isMonsoonSeason(date: Date): boolean {
  const month = date.getMonth() + 1
  return MONSOON_MONTHS.includes(month)
}

function isWinterSeason(date: Date): boolean {
  const month = date.getMonth() + 1
  return WINTER_MONTHS.includes(month)
}

// ===== WEATHER SIMULATION =====

export function getCurrentWeather(): WeatherCondition {
  const now = getCurrentBangladeshTime()
  const hour = now.getHours()
  const isMonsoon = isMonsoonSeason(now)
  const isWinter = isWinterSeason(now)
  
  let baseTemp = 28
  let baseHumidity = 70
  
  if (isMonsoon) {
    baseTemp = 30
    baseHumidity = 85
  } else if (isWinter) {
    baseTemp = 20
    baseHumidity = 60
  }
  
  // Temperature variation by time of day
  const tempVariation = Math.sin((hour - 6) * Math.PI / 12) * 5
  const temperature = baseTemp + tempVariation + (Math.random() - 0.5) * 2
  
  // Weather type probability
  let weatherType: WeatherCondition['type'] = 'clear'
  const rand = Math.random()
  
  if (isMonsoon) {
    if (rand < 0.3) weatherType = 'rain'
    else if (rand < 0.1) weatherType = 'storm'
    else if (rand < 0.6) weatherType = 'cloudy'
  } else if (hour < 7 && rand < 0.3) {
    weatherType = 'fog'
  } else if (rand < 0.2) {
    weatherType = 'cloudy'
  }
  
  const weather: WeatherCondition = {
    type: weatherType,
    temperature: Math.round(temperature),
    humidity: baseHumidity + (Math.random() - 0.5) * 10,
    windSpeed: weatherType === 'storm' ? 40 + Math.random() * 20 : Math.random() * 15,
    visibility: weatherType === 'fog' ? 0.5 : weatherType === 'storm' ? 2 : 10,
    impact: {
      productivity: 0,
      safety: 0,
      concrete: true,
      highAltitude: true
    }
  }
  
  // Calculate impact
  switch (weatherType) {
    case 'rain':
      weather.impact.productivity = -20
      weather.impact.safety = -15
      weather.impact.concrete = false
      weather.impact.highAltitude = false
      break
    case 'storm':
      weather.impact.productivity = -50
      weather.impact.safety = -30
      weather.impact.concrete = false
      weather.impact.highAltitude = false
      break
    case 'fog':
      weather.impact.productivity = -10
      weather.impact.safety = -20
      weather.impact.highAltitude = false
      break
    case 'cloudy':
      weather.impact.productivity = -5
      break
  }
  
  // Extreme temperature impact
  if (temperature > 38) {
    weather.impact.productivity -= 15
    weather.impact.safety -= 10
  } else if (temperature < 15) {
    weather.impact.productivity -= 10
  }
  
  return weather
}

// ===== ENHANCED DATA GENERATORS =====

export function getEnhancedRealtimeData() {
  const now = getCurrentBangladeshTime()
  const timeOfDay = getTimeOfDay(now)
  const isWorking = isWorkingHours(now)
  const prayer = isPrayerTime(now)
  const weather = getCurrentWeather()
  const stats = getSiteStatistics()
  
  // Calculate workforce adjustments
  let workforceMultiplier = 1.0
  
  if (!isWorking) {
    workforceMultiplier = 0.1 // Night shift only
  } else if (prayer.isPrayer) {
    workforceMultiplier = 0.3 // Reduced during prayer
  } else if (timeOfDay === 'morning') {
    workforceMultiplier = 0.8 // Ramping up
  } else if (timeOfDay === 'midday') {
    workforceMultiplier = 0.7 // Lunch break impact
  }
  
  // Weather impact
  workforceMultiplier *= (100 + weather.impact.productivity) / 100
  
  // Calculate real-time metrics
  const bashundharaSites = bangladeshSites.filter(s => s.id.startsWith('bash-'))
  const jolshiriSites = bangladeshSites.filter(s => s.id.startsWith('jolshiri-'))
  
  const bashWorkers = Math.round(
    bashundharaSites.reduce((sum, site) => sum + site.workers, 0) * workforceMultiplier
  )
  const jolshiriWorkers = Math.round(
    jolshiriSites.reduce((sum, site) => sum + site.workers, 0) * workforceMultiplier
  )
  
  const baseProductivity = stats.avgProductivity
  const productivityAdjustment = weather.impact.productivity + (prayer.isPrayer ? -20 : 0)
  
  return {
    timestamp: now,
    timeOfDay,
    weather,
    prayer: prayer.prayerName || null,
    sites: {
      bashundhara: {
        workers: bashWorkers,
        productivity: Math.max(0, baseProductivity + productivityAdjustment + 5),
        safety: Math.max(70, stats.avgSafety + weather.impact.safety),
        activeSites: bashundharaSites.filter(s => s.status !== 'planning').length,
        totalSites: bashundharaSites.length
      },
      jolshiri: {
        workers: jolshiriWorkers,
        productivity: Math.max(0, baseProductivity + productivityAdjustment),
        safety: Math.max(70, stats.avgSafety + weather.impact.safety - 2),
        activeSites: jolshiriSites.filter(s => s.status !== 'planning').length,
        totalSites: jolshiriSites.length
      }
    },
    equipment: generateEquipmentData(isWorking, weather),
    finance: generateFinancialMetrics(now),
    supplyChain: generateSupplyChainMetrics(),
    quality: generateQualityMetrics(weather),
    hr: generateHRMetrics(workforceMultiplier, now)
  }
}

function generateEquipmentData(isWorking: boolean, weather: WeatherCondition) {
  const baseData = {
    cranes: { total: 75, maintenance: 5 },
    excavators: { total: 45, maintenance: 3 },
    concrete_mixers: { total: 52, maintenance: 4 },
    trucks: { total: 124, maintenance: 8 }
  }
  
  const utilizationRate = isWorking ? 0.85 : 0.1
  const weatherImpact = weather.type === 'storm' ? 0 : weather.type === 'rain' ? 0.3 : 1
  
  return {
    cranes: {
      active: Math.round((baseData.cranes.total - baseData.cranes.maintenance) * utilizationRate * weatherImpact),
      total: baseData.cranes.total,
      maintenance: baseData.cranes.maintenance,
      utilization: Math.round(utilizationRate * weatherImpact * 100)
    },
    excavators: {
      active: Math.round((baseData.excavators.total - baseData.excavators.maintenance) * utilizationRate),
      total: baseData.excavators.total,
      maintenance: baseData.excavators.maintenance,
      utilization: Math.round(utilizationRate * 100)
    },
    concrete_mixers: {
      active: weather.impact.concrete ? 
        Math.round((baseData.concrete_mixers.total - baseData.concrete_mixers.maintenance) * utilizationRate) : 0,
      total: baseData.concrete_mixers.total,
      maintenance: baseData.concrete_mixers.maintenance,
      utilization: weather.impact.concrete ? Math.round(utilizationRate * 100) : 0
    },
    trucks: {
      active: Math.round(baseData.trucks.total * 0.7 * utilizationRate),
      inTransit: Math.round(baseData.trucks.total * 0.2),
      total: baseData.trucks.total,
      maintenance: baseData.trucks.maintenance
    }
  }
}

function generateFinancialMetrics(now: Date) {
  const dayOfMonth = now.getDate()
  const isPayrollDay = dayOfMonth === 1 || dayOfMonth === 15
  const isSupplierPaymentDay = dayOfMonth === 5 || dayOfMonth === 20
  
  const baseRevenue = 2328000000 // 232.8 Crore BDT
  const monthlyRevenue = baseRevenue / 12
  const dailyRevenue = monthlyRevenue / 30
  
  return {
    revenue: {
      today: dailyRevenue * (0.8 + Math.random() * 0.4),
      thisMonth: monthlyRevenue * (dayOfMonth / 30),
      ytd: baseRevenue * 0.75,
      projected: baseRevenue * 1.15
    },
    expenses: {
      today: isPayrollDay ? dailyRevenue * 0.6 : isSupplierPaymentDay ? dailyRevenue * 0.4 : dailyRevenue * 0.2,
      thisMonth: monthlyRevenue * 0.7 * (dayOfMonth / 30),
      categories: {
        labor: isPayrollDay ? monthlyRevenue * 0.35 : 0,
        materials: isSupplierPaymentDay ? monthlyRevenue * 0.25 : dailyRevenue * 0.1,
        equipment: dailyRevenue * 0.05,
        utilities: dailyRevenue * 0.02,
        other: dailyRevenue * 0.03
      }
    },
    cashflow: {
      current: 458000000, // 45.8 Crore BDT
      projected7Days: 512000000,
      projected30Days: 623000000
    },
    transactions: {
      pending: isPayrollDay ? 2847 : 45,
      processing: 12,
      completed: 3254,
      failed: 2
    }
  }
}

function generateSupplyChainMetrics() {
  const activeOrders = 342
  const pendingDeliveries = 67
  const delayedShipments = Math.floor(Math.random() * 10) + 5
  
  return {
    orders: {
      active: activeOrders,
      pending: 45,
      completed: 2156,
      cancelled: 12
    },
    deliveries: {
      today: Math.floor(Math.random() * 15) + 10,
      pending: pendingDeliveries,
      delayed: delayedShipments,
      onTime: pendingDeliveries - delayedShipments
    },
    inventory: {
      cement: { current: 125000, required: 150000, unit: 'bags' },
      steel: { current: 8500, required: 10000, unit: 'tons' },
      bricks: { current: 2500000, required: 3000000, unit: 'pieces' },
      sand: { current: 5600, required: 6000, unit: 'cubic meters' }
    },
    suppliers: {
      active: 89,
      verified: 82,
      blacklisted: 3,
      performance: {
        onTime: 78,
        quality: 92,
        pricing: 85
      }
    }
  }
}

function generateQualityMetrics(weather: WeatherCondition) {
  const baseDefectRate = 1.2
  const weatherImpact = weather.type === 'rain' ? 0.5 : weather.type === 'storm' ? 1.0 : 0
  
  return {
    inspections: {
      today: Math.floor(Math.random() * 20) + 15,
      passed: Math.floor(Math.random() * 18) + 13,
      failed: Math.floor(Math.random() * 3) + weatherImpact,
      pending: 8
    },
    defects: {
      rate: baseDefectRate + weatherImpact,
      critical: Math.floor(Math.random() * 2),
      major: Math.floor(Math.random() * 5) + 2,
      minor: Math.floor(Math.random() * 10) + 5
    },
    compliance: {
      safety: 98.2 - weather.impact.safety / 10,
      environmental: 96.5,
      quality: 97.8,
      regulatory: 99.1
    },
    certifications: {
      iso9001: { status: 'active', expiry: '2025-12-31' },
      iso14001: { status: 'active', expiry: '2025-10-15' },
      ohsas18001: { status: 'renewal', expiry: '2025-02-28' }
    }
  }
}

function generateHRMetrics(workforceMultiplier: number, now: Date) {
  const totalWorkers = 8456
  const presentWorkers = Math.round(totalWorkers * workforceMultiplier)
  const hour = now.getHours()
  
  return {
    workforce: {
      total: totalWorkers,
      present: presentWorkers,
      onLeave: 234,
      overtime: hour > 18 ? Math.floor(presentWorkers * 0.1) : 0
    },
    attendance: {
      rate: Math.round((presentWorkers / totalWorkers) * 100),
      lateArrivals: hour === 8 ? Math.floor(Math.random() * 50) + 20 : 0,
      earlyDepartures: hour === 17 ? Math.floor(Math.random() * 30) + 10 : 0
    },
    safety: {
      incidents: {
        today: Math.floor(Math.random() * 3),
        thisMonth: 12,
        severity: {
          minor: 10,
          moderate: 2,
          severe: 0
        }
      },
      trainings: {
        scheduled: 5,
        completed: 42,
        compliance: 94.5
      }
    },
    skills: {
      certified: {
        welders: 234,
        electricians: 156,
        plumbers: 89,
        masons: 412,
        crane_operators: 45
      },
      training: {
        ongoing: 67,
        completed: 523,
        scheduled: 145
      }
    }
  }
}

// ===== EVENT GENERATORS =====

export function generateSupplyChainEvents(count: number = 5): SupplyChainEvent[] {
  const events: SupplyChainEvent[] = []
  const materials = ['cement', 'steel', 'bricks', 'sand', 'concrete', 'tiles', 'paint', 'electrical']
  
  for (let i = 0; i < count; i++) {
    const supplier = SUPPLIERS[Math.floor(Math.random() * SUPPLIERS.length)]
    const material = materials[Math.floor(Math.random() * materials.length)]
    const eventTypes: SupplyChainEvent['type'][] = ['order_placed', 'shipment_delayed', 'delivery_arrived', 'quality_issue', 'price_change']
    const type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    
    events.push({
      id: `sce-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000 * 24), // Last 24 hours
      type,
      supplier: supplier.name,
      material,
      quantity: Math.floor(Math.random() * 1000) + 100,
      unit: material === 'steel' ? 'tons' : material === 'cement' ? 'bags' : 'units',
      impact: Math.random() > 0.8 ? 'critical' : Math.random() > 0.6 ? 'high' : Math.random() > 0.3 ? 'medium' : 'low',
      estimatedDelay: type === 'shipment_delayed' ? Math.floor(Math.random() * 72) + 12 : undefined,
      priceChange: type === 'price_change' ? (Math.random() - 0.5) * 20 : undefined
    })
  }
  
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export function generateFinancialTransactions(count: number = 10): FinancialTransaction[] {
  const transactions: FinancialTransaction[] = []
  const categories = {
    income: ['project_payment', 'advance_payment', 'milestone_completion', 'rental_income'],
    expense: ['material_purchase', 'salary_payment', 'equipment_rental', 'utility_bills', 'maintenance']
  }
  
  for (let i = 0; i < count; i++) {
    const type: 'income' | 'expense' = Math.random() > 0.3 ? 'expense' : 'income'
    const categoryList = categories[type]
    const category = categoryList[Math.floor(Math.random() * categoryList.length)]
    
    transactions.push({
      id: `ft-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000 * 48), // Last 48 hours
      type,
      category,
      amount: type === 'income' 
        ? Math.floor(Math.random() * 50000000) + 10000000 // 1-5 Crore
        : Math.floor(Math.random() * 10000000) + 100000, // 1 Lakh - 1 Crore
      description: `${category.replace('_', ' ').toUpperCase()} - ${Math.random() > 0.5 ? 'Bashundhara' : 'Jolshiri'}`,
      projectId: bangladeshSites[Math.floor(Math.random() * bangladeshSites.length)].id,
      status: Math.random() > 0.2 ? 'completed' : Math.random() > 0.5 ? 'approved' : 'pending',
      approvedBy: Math.random() > 0.5 ? 'CFO' : 'Finance Manager',
      paymentMethod: ['bank', 'bKash', 'nagad', 'cash', 'check'][Math.floor(Math.random() * 5)] as any
    })
  }
  
  return transactions.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export function generateWorkforceEvents(count: number = 20): WorkforceEvent[] {
  const events: WorkforceEvent[] = []
  const workerNames = [
    'Md. Rahman', 'Abdul Karim', 'Shahidul Islam', 'Nasir Ahmed', 'Rafiqul Hasan',
    'Mizanur Rahman', 'Alamgir Hossain', 'Jahangir Alam', 'Shafiqul Islam', 'Kamrul Hassan'
  ]
  
  const now = getCurrentBangladeshTime()
  const hour = now.getHours()
  
  for (let i = 0; i < count; i++) {
    const eventTypes: WorkforceEvent['type'][] = ['check_in', 'check_out', 'overtime', 'accident', 'training', 'leave']
    let type = eventTypes[Math.floor(Math.random() * eventTypes.length)]
    
    // Time-aware event generation
    if (hour >= 7 && hour <= 9) {
      type = Math.random() > 0.2 ? 'check_in' : type
    } else if (hour >= 17 && hour <= 19) {
      type = Math.random() > 0.3 ? 'check_out' : Math.random() > 0.5 ? 'overtime' : type
    }
    
    const site = bangladeshSites[Math.floor(Math.random() * bangladeshSites.length)]
    
    events.push({
      id: `we-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000 * 8), // Last 8 hours
      type,
      workerId: `W${Math.floor(Math.random() * 9000) + 1000}`,
      workerName: workerNames[Math.floor(Math.random() * workerNames.length)],
      siteId: site.id,
      details: generateEventDetails(type, site.name),
      severity: type === 'accident' ? 
        (Math.random() > 0.8 ? 'severe' : Math.random() > 0.5 ? 'moderate' : 'minor') : undefined,
      hoursWorked: type === 'overtime' ? Math.floor(Math.random() * 4) + 1 : undefined
    })
  }
  
  return events.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

function generateEventDetails(type: WorkforceEvent['type'], siteName: string): string {
  switch (type) {
    case 'check_in':
      return `Checked in at ${siteName} main gate`
    case 'check_out':
      return `Checked out after completing shift at ${siteName}`
    case 'overtime':
      return `Approved for overtime work at ${siteName}`
    case 'accident':
      return `Incident reported at ${siteName} - Medical team notified`
    case 'training':
      return `Completed safety training module at ${siteName}`
    case 'leave':
      return `Leave request submitted for personal reasons`
    default:
      return `Event recorded at ${siteName}`
  }
}

export function generateEquipmentTelemetry(count: number = 15): EquipmentTelemetry[] {
  const telemetry: EquipmentTelemetry[] = []
  const equipmentList = [
    { id: 'CR-001', type: 'crane', site: 'bash-tower-a' },
    { id: 'CR-002', type: 'crane', site: 'bash-plaza' },
    { id: 'EX-001', type: 'excavator', site: 'bash-heritage' },
    { id: 'EX-002', type: 'excavator', site: 'jolshiri-plaza' },
    { id: 'CM-001', type: 'concrete_mixer', site: 'bash-galleria' },
    { id: 'CM-002', type: 'concrete_mixer', site: 'jolshiri-tower-1' },
    { id: 'TR-001', type: 'truck', site: 'various' },
    { id: 'TR-002', type: 'truck', site: 'various' }
  ]
  
  for (let i = 0; i < count; i++) {
    const equipment = equipmentList[Math.floor(Math.random() * equipmentList.length)]
    const site = bangladeshSites.find(s => s.id === equipment.site) || bangladeshSites[0]
    const equipmentSpecs = EQUIPMENT_TYPES[equipment.type as keyof typeof EQUIPMENT_TYPES]
    const isActive = Math.random() > 0.2
    
    const alerts: string[] = []
    const temp = equipmentSpecs.criticalTemp - 10 + Math.random() * 20
    const vibration = equipmentSpecs.normalVibration * (0.8 + Math.random() * 0.6)
    
    if (temp > equipmentSpecs.criticalTemp) {
      alerts.push('High temperature warning')
    }
    if (vibration > equipmentSpecs.normalVibration * 1.3) {
      alerts.push('Abnormal vibration detected')
    }
    if (Math.random() > 0.9) {
      alerts.push('Maintenance due soon')
    }
    
    telemetry.push({
      id: `et-${Date.now()}-${i}`,
      equipmentId: equipment.id,
      equipmentType: equipment.type,
      timestamp: new Date(Date.now() - Math.random() * 3600000 * 2), // Last 2 hours
      status: !isActive ? 'idle' : alerts.length > 0 ? 'maintenance' : 'active',
      location: {
        lat: site.lat + (Math.random() - 0.5) * 0.001,
        lng: site.lng + (Math.random() - 0.5) * 0.001
      },
      metrics: {
        fuelLevel: Math.round(Math.random() * 100),
        engineHours: Math.floor(Math.random() * 5000) + 1000,
        temperature: Math.round(temp),
        vibration: Math.round(vibration),
        hydraulicPressure: equipment.type === 'crane' || equipment.type === 'excavator' ? 
          Math.round(2000 + Math.random() * 500) : undefined,
        loadWeight: equipment.type === 'crane' ? Math.round(Math.random() * 50) : undefined
      },
      alerts
    })
  }
  
  return telemetry.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

export function generateQualityControlIncidents(count: number = 5): QualityControlIncident[] {
  const incidents: QualityControlIncident[] = []
  const incidentTypes: QualityControlIncident['type'][] = ['defect', 'non_compliance', 'safety_violation', 'material_rejection']
  const inspectors = ['QC Manager', 'Senior Inspector', 'Safety Officer', 'Quality Engineer']
  
  for (let i = 0; i < count; i++) {
    const type = incidentTypes[Math.floor(Math.random() * incidentTypes.length)]
    const site = bangladeshSites[Math.floor(Math.random() * bangladeshSites.length)]
    const severity: QualityControlIncident['severity'] = 
      Math.random() > 0.8 ? 'critical' : Math.random() > 0.5 ? 'major' : 'minor'
    
    incidents.push({
      id: `qci-${Date.now()}-${i}`,
      timestamp: new Date(Date.now() - Math.random() * 3600000 * 72), // Last 72 hours
      siteId: site.id,
      type,
      severity,
      description: generateIncidentDescription(type, site.name),
      detectedBy: inspectors[Math.floor(Math.random() * inspectors.length)],
      images: Math.random() > 0.5 ? [`/images/qc/${type}-${i}.jpg`] : undefined,
      correctionRequired: severity !== 'minor',
      estimatedImpact: {
        time: severity === 'critical' ? 5 : severity === 'major' ? 2 : 0,
        cost: severity === 'critical' ? 5000000 : severity === 'major' ? 1000000 : 100000
      }
    })
  }
  
  return incidents.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
}

function generateIncidentDescription(type: QualityControlIncident['type'], siteName: string): string {
  const descriptions = {
    defect: [
      `Concrete honeycomb detected in column B-12 at ${siteName}`,
      `Rebar spacing non-conformance in slab section at ${siteName}`,
      `Surface cracks observed in beam junction at ${siteName}`
    ],
    non_compliance: [
      `Deviation from approved structural drawings at ${siteName}`,
      `Material specification mismatch at ${siteName}`,
      `Construction sequence violation at ${siteName}`
    ],
    safety_violation: [
      `Workers without safety harness at height in ${siteName}`,
      `Improper scaffolding installation at ${siteName}`,
      `Missing safety barriers near excavation at ${siteName}`
    ],
    material_rejection: [
      `Cement batch failed quality test at ${siteName}`,
      `Steel reinforcement below specified grade at ${siteName}`,
      `Brick consignment rejected due to poor quality at ${siteName}`
    ]
  }
  
  const options = descriptions[type]
  return options[Math.floor(Math.random() * options.length)]
}

// ===== AI INSIGHTS GENERATOR =====

export function generateAIInsights(data: any): AIInsight[] {
  const insights: AIInsight[] = []
  const now = getCurrentBangladeshTime()
  const weather = getCurrentWeather()
  
  // Weather-based insights
  if (weather.type === 'storm' || weather.type === 'rain') {
    insights.push({
      id: `ai-${Date.now()}-1`,
      timestamp: now,
      module: 'Operations',
      type: 'warning',
      title: 'Weather Impact Alert',
      description: `${weather.type === 'storm' ? 'Severe storm' : 'Heavy rain'} detected. Construction activities at height should be suspended.`,
      confidence: 98,
      impact: 'High - Potential 30-50% productivity loss',
      recommendations: [
        'Suspend all crane operations immediately',
        'Move workers to covered areas',
        'Secure loose materials and equipment',
        'Prepare for potential flooding in excavation areas'
      ],
      relatedData: { weather }
    })
  }
  
  // Supply chain insights
  const supplyChain = generateSupplyChainMetrics()
  if (supplyChain.inventory.cement.current < supplyChain.inventory.cement.required * 0.9) {
    insights.push({
      id: `ai-${Date.now()}-2`,
      timestamp: now,
      module: 'Supply Chain',
      type: 'prediction',
      title: 'Cement Shortage Predicted',
      description: 'ML model predicts cement shortage within 5 days based on consumption patterns',
      confidence: 87,
      impact: 'Critical - May delay concrete pouring schedule',
      recommendations: [
        'Place urgent order with primary cement supplier',
        'Contact alternate suppliers for backup',
        'Adjust project schedule to optimize cement usage',
        'Consider bulk purchase for 15% discount'
      ],
      relatedData: { inventory: supplyChain.inventory }
    })
  }
  
  // Workforce optimization
  const hrMetrics = generateHRMetrics(1, now)
  if (hrMetrics.workforce.overtime > 50) {
    insights.push({
      id: `ai-${Date.now()}-3`,
      timestamp: now,
      module: 'HR & Workforce',
      type: 'optimization',
      title: 'Workforce Reallocation Opportunity',
      description: 'AI detected imbalanced workforce distribution leading to excessive overtime',
      confidence: 92,
      impact: 'Medium - Save ৳12 Lakh/month in overtime costs',
      recommendations: [
        'Transfer 20 workers from Jolshiri to Bashundhara sites',
        'Implement flexible shift timing',
        'Hire 15 additional skilled workers',
        'Introduce productivity incentives'
      ],
      relatedData: { workforce: hrMetrics.workforce }
    })
  }
  
  // Equipment maintenance
  const equipment = generateEquipmentTelemetry(10)
  const criticalEquipment = equipment.filter(e => e.alerts.length > 0)
  if (criticalEquipment.length > 2) {
    insights.push({
      id: `ai-${Date.now()}-4`,
      timestamp: now,
      module: 'Equipment Management',
      type: 'anomaly',
      title: 'Multiple Equipment Anomalies Detected',
      description: `${criticalEquipment.length} equipment units showing abnormal telemetry patterns`,
      confidence: 94,
      impact: 'High - Potential equipment failure risk',
      recommendations: [
        'Schedule immediate maintenance for critical units',
        'Prepare backup equipment',
        'Review maintenance schedules',
        'Consider predictive maintenance upgrade'
      ],
      relatedData: { criticalEquipment }
    })
  }
  
  // Financial insights
  const finance = generateFinancialMetrics(now)
  if (finance.revenue.today > finance.revenue.projected / 30 * 1.2) {
    insights.push({
      id: `ai-${Date.now()}-5`,
      timestamp: now,
      module: 'Finance',
      type: 'optimization',
      title: 'Revenue Acceleration Detected',
      description: 'Daily revenue exceeding projections by 20%',
      confidence: 90,
      impact: 'Positive - Potential ৳45 Cr additional revenue this quarter',
      recommendations: [
        'Accelerate material procurement for cost advantages',
        'Consider early project phase completion bonuses',
        'Negotiate better payment terms with clients',
        'Invest surplus in high-return equipment'
      ],
      relatedData: { revenue: finance.revenue }
    })
  }
  
  return insights
}

// ===== CROSS-MODULE CORRELATIONS =====

export function getCrossModuleCorrelations() {
  const weather = getCurrentWeather()
  const supplyChain = generateSupplyChainMetrics()
  const equipment = generateEquipmentData(true, weather)
  const quality = generateQualityMetrics(weather)
  
  return {
    weatherImpact: {
      productivity: weather.impact.productivity,
      safety: weather.impact.safety,
      affectedActivities: {
        concretePouring: !weather.impact.concrete,
        highAltitudeWork: !weather.impact.highAltitude,
        materialDelivery: weather.type === 'storm'
      }
    },
    resourceConstraints: {
      cement: supplyChain.inventory.cement.current < supplyChain.inventory.cement.required,
      cranes: equipment.cranes.utilization > 90,
      workers: false // Calculated based on actual vs required
    },
    riskFactors: {
      overall: calculateOverallRisk(weather, supplyChain, quality),
      weather: weather.type === 'storm' ? 'high' : weather.type === 'rain' ? 'medium' : 'low',
      supply: supplyChain.deliveries.delayed > 10 ? 'high' : supplyChain.deliveries.delayed > 5 ? 'medium' : 'low',
      quality: quality.defects.critical > 0 ? 'high' : quality.defects.major > 3 ? 'medium' : 'low'
    },
    opportunities: {
      costSaving: identifyCostSavingOpportunities(supplyChain, equipment),
      scheduling: identifySchedulingOpportunities(weather, equipment),
      efficiency: identifyEfficiencyOpportunities(quality, equipment)
    }
  }
}

function calculateOverallRisk(weather: WeatherCondition, supplyChain: any, quality: any): 'low' | 'medium' | 'high' | 'critical' {
  let riskScore = 0
  
  if (weather.type === 'storm') riskScore += 3
  else if (weather.type === 'rain') riskScore += 2
  
  if (supplyChain.deliveries.delayed > 10) riskScore += 3
  else if (supplyChain.deliveries.delayed > 5) riskScore += 2
  
  if (quality.defects.critical > 0) riskScore += 3
  else if (quality.defects.major > 3) riskScore += 2
  
  if (riskScore >= 7) return 'critical'
  if (riskScore >= 5) return 'high'
  if (riskScore >= 3) return 'medium'
  return 'low'
}

function identifyCostSavingOpportunities(supplyChain: any, equipment: any): string[] {
  const opportunities: string[] = []
  
  if (supplyChain.suppliers.performance.pricing < 85) {
    opportunities.push('Negotiate better rates with suppliers - potential 8% savings')
  }
  
  if (equipment.cranes.utilization < 60) {
    opportunities.push('Optimize crane scheduling - reduce rental costs by ৳25 Lakh/month')
  }
  
  if (supplyChain.inventory.cement.current > supplyChain.inventory.cement.required * 1.5) {
    opportunities.push('Reduce cement inventory - free up ৳1.2 Cr working capital')
  }
  
  return opportunities
}

function identifySchedulingOpportunities(weather: WeatherCondition, equipment: any): string[] {
  const opportunities: string[] = []
  
  if (weather.type === 'clear' && equipment.concrete_mixers.utilization < 70) {
    opportunities.push('Schedule concrete pouring for next 48 hours - ideal weather')
  }
  
  if (equipment.cranes.utilization < 50) {
    opportunities.push('Consolidate lifting operations - improve efficiency by 20%')
  }
  
  return opportunities
}

function identifyEfficiencyOpportunities(quality: any, equipment: any): string[] {
  const opportunities: string[] = []
  
  if (quality.defects.rate > 1.5) {
    opportunities.push('Implement additional quality checkpoints - reduce rework by 30%')
  }
  
  if (equipment.excavators.utilization > 85) {
    opportunities.push('Add night shift for excavation - accelerate foundation work by 2 weeks')
  }
  
  return opportunities
}

// ===== EXPORT ALL ENHANCED FUNCTIONS =====

export default {
  getEnhancedRealtimeData,
  getCurrentWeather,
  generateSupplyChainEvents,
  generateFinancialTransactions,
  generateWorkforceEvents,
  generateEquipmentTelemetry,
  generateQualityControlIncidents,
  generateAIInsights,
  getCrossModuleCorrelations
}