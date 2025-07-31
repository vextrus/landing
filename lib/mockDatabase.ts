/**
 * Authentic Bangladesh Construction Company Mock Database
 * 
 * This file contains realistic data for a construction company operating in Bangladesh,
 * specifically tailored for the Vextrus ERP ecosystem demonstration.
 * 
 * All data reflects authentic Bangladesh context:
 * - BDT currency with proper Crore/Lakh formatting
 * - Real Dhaka locations and coordinates
 * - Authentic Bangladeshi names and terminology
 * - Local regulations (RAJUK, BNBC, NBR)
 * - Cultural considerations (Eid bonuses, prayer times)
 * - Seasonal factors (monsoon impact)
 */

// ===== COMPANY PROFILE =====
export const companyProfile = {
  name: 'Vextrus Construction Ltd.',
  establishedYear: 2018,
  registrationNumber: 'C-184521/2018',
  tradeLicense: 'DSCC-456789-2024',
  taxIdentification: 'TIN-12-3456789-0001',
  
  headquarters: {
    address: 'House 45, Road 11, Block C, Bashundhara R/A, Dhaka-1229',
    coordinates: { lat: 23.8223, lng: 90.4253 },
    phone: '+880-2-55028374',
    email: 'info@vextrus.com.bd'
  },
  
  totalProjects: 47,
  totalEmployees: 2847,
  establishedSites: 4,
  annualRevenue: 232800000000, // ৳2,328 Cr
  
  licenses: [
    'RAJUK Building Construction License - Class A',
    'DoE Environmental Clearance Certificate',
    'Fire Service NOC - Commercial Buildings', 
    'BSTI Material Testing Certificate',
    'PWD Contractor Registration - Grade A'
  ]
}

// ===== PROJECT PORTFOLIO =====
export const projects = [
  {
    id: 'PRJ-2024-001',
    name: 'Gulshan Heights Residential Complex',
    type: 'Residential',
    status: 'In Progress',
    location: {
      address: 'Plot 45, Road 11, Gulshan-2, Dhaka-1212',
      coordinates: { lat: 23.7956, lng: 90.4143 },
      area: 'Gulshan'
    },
    timeline: {
      startDate: '2023-03-15',
      expectedCompletion: '2025-11-30',
      currentProgress: 67,
      totalDuration: 32 // months
    },
    financial: {
      totalBudget: 18500000000, // ৳185 Cr
      spentAmount: 12395000000, // ৳123.95 Cr
      remainingBudget: 6105000000, // ৳61.05 Cr
      profitMargin: 24.5
    },
    specifications: {
      floors: 22,
      apartments: 88,
      parking: 176,
      totalArea: 125000, // sq ft
      buildingHeight: 264 // feet
    },
    team: {
      siteEngineer: 'Eng. Mohammad Rahman',
      projectManager: 'Eng. Fatema Khatun',
      supervisor: 'Foreman Abdul Karim',
      totalWorkers: 892
    },
    permits: {
      rajukApproval: 'RAJUK/BP/GUL/2023/145',
      environmentalClearance: 'DoE/ECC/DHK/2023/089',
      fireServiceNOC: 'FSCD/NOC/DHK/2023/234'
    }
  },
  
  {
    id: 'PRJ-2024-002', 
    name: 'Dhanmondi Commercial Plaza',
    type: 'Commercial',
    status: 'In Progress',
    location: {
      address: 'House 32, Road 5, Dhanmondi R/A, Dhaka-1205',
      coordinates: { lat: 23.7461, lng: 90.3742 },
      area: 'Dhanmondi'
    },
    timeline: {
      startDate: '2023-08-20',
      expectedCompletion: '2025-06-15',
      currentProgress: 52,
      totalDuration: 22 // months
    },
    financial: {
      totalBudget: 12750000000, // ৳127.5 Cr
      spentAmount: 6637500000, // ৳66.375 Cr
      remainingBudget: 6112500000, // ৳61.125 Cr
      profitMargin: 21.8
    },
    specifications: {
      floors: 15,
      shops: 120,
      offices: 45,
      parking: 180,
      totalArea: 95000, // sq ft
      buildingHeight: 180 // feet
    },
    team: {
      siteEngineer: 'Eng. Nasir Ahmed',
      projectManager: 'Eng. Rashida Begum',
      supervisor: 'Foreman Mizanur Rahman', 
      totalWorkers: 654
    },
    permits: {
      rajukApproval: 'RAJUK/BP/DHN/2023/278',
      environmentalClearance: 'DoE/ECC/DHK/2023/156',
      fireServiceNOC: 'FSCD/NOC/DHK/2023/289'
    }
  },

  {
    id: 'PRJ-2024-003',
    name: 'Bashundhara Twin Towers',
    type: 'Mixed-Use',
    status: 'In Progress',
    location: {
      address: 'Block J, Bashundhara R/A, Dhaka-1229',
      coordinates: { lat: 23.8197, lng: 90.4267 },
      area: 'Bashundhara'
    },
    timeline: {
      startDate: '2023-01-10',
      expectedCompletion: '2026-03-20',
      currentProgress: 78,
      totalDuration: 38 // months
    },
    financial: {
      totalBudget: 24500000000, // ৳245 Cr
      spentAmount: 19110000000, // ৳191.1 Cr
      remainingBudget: 5390000000, // ৳53.9 Cr
      profitMargin: 26.2
    },
    specifications: {
      floors: 28,
      apartments: 112,
      offices: 84,
      shops: 56,
      parking: 336,
      totalArea: 185000, // sq ft
      buildingHeight: 336 // feet
    },
    team: {
      siteEngineer: 'Eng. Shahidul Islam',
      projectManager: 'Eng. Salma Khatun',
      supervisor: 'Foreman Rafiqul Islam',
      totalWorkers: 765
    },
    permits: {
      rajukApproval: 'RAJUK/BP/BSH/2022/445',
      environmentalClearance: 'DoE/ECC/DHK/2022/334',
      fireServiceNOC: 'FSCD/NOC/DHK/2023/112'
    }
  },

  {
    id: 'PRJ-2024-004',
    name: 'Mirpur Housing Project',
    type: 'Affordable Housing',
    status: 'Planning',
    location: {
      address: 'Section 11, Mirpur, Dhaka-1216',
      coordinates: { lat: 23.8223, lng: 90.3654 },
      area: 'Mirpur'
    },
    timeline: {
      startDate: '2024-04-01',
      expectedCompletion: '2026-08-30',
      currentProgress: 15,
      totalDuration: 29 // months
    },
    financial: {
      totalBudget: 8950000000, // ৳89.5 Cr
      spentAmount: 1342500000, // ৳13.425 Cr
      remainingBudget: 7607500000, // ৳76.075 Cr
      profitMargin: 18.5
    },
    specifications: {
      floors: 10,
      apartments: 200,
      parking: 100,
      totalArea: 78000, // sq ft
      buildingHeight: 120 // feet
    },
    team: {
      siteEngineer: 'Eng. Aminul Haque',
      projectManager: 'Eng. Ruma Akter',
      supervisor: 'Foreman Shamsul Alam',
      totalWorkers: 536
    },
    permits: {
      rajukApproval: 'RAJUK/BP/MIR/2024/067',
      environmentalClearance: 'DoE/ECC/DHK/2024/021',
      fireServiceNOC: 'FSCD/NOC/DHK/2024/045'
    }
  }
]

// ===== WORKFORCE DATA =====
export const workforce = {
  totalEmployees: 2847,
  byDepartment: {
    engineering: 234,
    operations: 1523,
    mep: 456, // Mechanical, Electrical, Plumbing
    administration: 123,
    quality: 189,
    safety: 145,
    procurement: 87,
    hr: 45,
    finance: 34,
    it: 11
  },
  
  keyPersonnel: [
    {
      id: 'EMP-001',
      name: 'Eng. Mohammad Rahman Ali',
      designation: 'Senior Site Engineer',
      department: 'Engineering',
      experience: 12,
      education: 'B.Sc in Civil Engineering, BUET',
      currentProject: 'Gulshan Heights',
      salary: 125000, // BDT monthly
      joiningDate: '2019-03-15',
      skills: ['Structural Design', 'AutoCAD', 'Project Management', 'BNBC Compliance']
    },
    {
      id: 'EMP-002',
      name: 'Foreman Abdul Karim Sheikh',
      designation: 'Construction Foreman',
      department: 'Operations',
      experience: 18,
      education: 'Diploma in Civil Construction',
      currentProject: 'Gulshan Heights',
      salary: 45000, // BDT monthly
      joiningDate: '2018-06-20',
      skills: ['Team Leadership', 'Quality Control', 'Safety Protocols', 'Material Management']
    },
    {
      id: 'EMP-003',
      name: 'Electrician Nasir Uddin',
      designation: 'Master Electrician',
      department: 'MEP',
      experience: 15,
      education: 'Trade Certificate in Electrical Works',
      currentProject: 'Dhanmondi Plaza',
      salary: 55000, // BDT monthly
      joiningDate: '2020-01-10',
      skills: ['Electrical Systems', 'Code Compliance', 'Troubleshooting', 'Load Calculation']
    },
    {
      id: 'EMP-004',
      name: 'Fatema Khatun',
      designation: 'Project Manager',
      department: 'Engineering',
      experience: 10,
      education: 'B.Sc in Architecture, BUET',
      currentProject: 'Gulshan Heights',
      salary: 95000, // BDT monthly
      joiningDate: '2020-09-01',
      skills: ['Project Planning', 'Budget Management', 'Client Relations', 'Team Coordination']
    }
  ],

  attendance: {
    today: {
      present: 2693,
      absent: 154,
      late: 67,
      onLeave: 87
    },
    thisWeek: {
      monday: { present: 2621, attendance: 92.1 },
      tuesday: { present: 2674, attendance: 93.9 },
      wednesday: { present: 2648, attendance: 93.0 },
      thursday: { present: 2703, attendance: 95.0 },
      friday: { present: 2678, attendance: 94.1 },
      saturday: { present: 2592, attendance: 91.0 }
    }
  }
}

// ===== FINANCIAL DATA =====
export const financialData = {
  overview: {
    totalRevenue: 232800000000, // ৳2,328 Cr
    totalExpenses: 178032000000, // ৳1,780.32 Cr  
    netProfit: 54768000000, // ৳547.68 Cr
    profitMargin: 23.5,
    
    monthlyRevenue: 456789123000, // ৳4,567.89 Cr (current month)
    monthlyExpenses: 345678900000, // ৳3,456.78 Cr
    monthlyProfit: 111110223000, // ৳1,111.10 Cr
  },
  
  cashFlow: {
    currentBalance: 12500000000, // ৳125 Cr
    monthlyInflow: 456789123000, // ৳4,567.89 Cr
    monthlyOutflow: 398765400000, // ৳3,987.65 Cr
    netCashFlow: 58023723000, // ৳580.23 Cr
    
    projectedCashFlow: [
      { month: 'Jan 2025', inflow: 456789123, outflow: 398765400, net: 58023723 },
      { month: 'Feb 2025', inflow: 523456789, outflow: 445678900, net: 77777889 },
      { month: 'Mar 2025', inflow: 489012345, outflow: 412345678, net: 76666667 },
      { month: 'Apr 2025', inflow: 534567890, outflow: 456789012, net: 77778878 },
      { month: 'May 2025', inflow: 498765432, outflow: 434567890, net: 64197542 },
      { month: 'Jun 2025', inflow: 445678901, outflow: 389012345, net: 56666556 }
    ]
  },

  banking: {
    accounts: [
      {
        bank: 'BRAC Bank Limited',
        accountNumber: '1234567890123456',
        accountType: 'Current Account',
        balance: 4567890000, // ৳45.67 Cr
        branch: 'Gulshan Corporate Branch'
      },
      {
        bank: 'Dutch-Bangla Bank Limited',
        accountNumber: '2345678901234567',
        accountType: 'Salary Account', 
        balance: 2345670000, // ৳23.45 Cr
        branch: 'Dhanmondi Branch'
      },
      {
        bank: 'Eastern Bank Limited',
        accountNumber: '3456789012345678',
        accountType: 'Fixed Deposit',
        balance: 5678900000, // ৳56.78 Cr
        branch: 'Bashundhara Branch'
      }
    ],
    
    mobilePayments: {
      bkash: {
        number: '+8801712345678',
        balance: 234567000, // ৳23.45 Lakh
        monthlyTransactions: 1567
      },
      nagad: {
        number: '+8801823456789',
        balance: 123456000, // ৳12.34 Lakh
        monthlyTransactions: 892
      }
    }
  },

  taxes: {
    vatRate: 15, // percent
    tdRate: 3, // percent
    incomeTaxRate: 25, // percent
    
    currentYear: {
      vatPaid: 3456789000, // ৳34.56 Cr
      tdsPaid: 1234567000, // ৳12.34 Cr
      incomeTaxPaid: 8901234000, // ৳89.01 Cr
      totalTaxBurden: 13592590000 // ৳135.92 Cr
    },
    
    upcomingPayments: [
      { type: 'Monthly VAT', amount: 290000000, dueDate: '2024-12-15' }, // ৳2.9 Cr
      { type: 'Quarterly TDS', amount: 450000000, dueDate: '2024-12-31' }, // ৳4.5 Cr
      { type: 'Annual Income Tax', amount: 2100000000, dueDate: '2025-06-30' } // ৳21 Cr
    ]
  }
}

// ===== SUPPLIER & PROCUREMENT DATA =====
export const suppliers = [
  {
    id: 'SUP-001',
    name: 'Akij Cement Company Ltd.',
    type: 'Cement Supplier',
    location: 'Keraniganj, Dhaka',
    contact: '+880-2-7790086',
    rating: 4.8,
    products: ['OPC Cement', 'PPC Cement', 'White Cement'],
    currentPrice: 560, // BDT per bag (50kg)
    monthlySupply: 12500, // bags
    paymentTerms: '30 days credit',
    established: 1968
  },
  {
    id: 'SUP-002',
    name: 'BSRM Steels Limited',
    type: 'Steel Supplier',
    location: 'Chittagong',
    contact: '+880-31-2510069',
    rating: 4.9,
    products: ['TMT Bars', 'MS Rods', 'Structural Steel'],
    currentPrice: 78000, // BDT per metric ton
    monthlySupply: 450, // metric tons
    paymentTerms: '45 days credit',
    established: 1952
  },
  {
    id: 'SUP-003',
    name: 'Confidence Cement Ltd.',
    type: 'Cement & Aggregate',
    location: 'Munshiganj',
    contact: '+880-2-7692870',
    rating: 4.6,
    products: ['OPC Cement', 'Stone Chips', 'Sand'],
    currentPrice: 545, // BDT per bag (50kg cement)
    monthlySupply: 8900, // bags
    paymentTerms: '21 days credit',
    established: 2000
  },
  {
    id: 'SUP-004',
    name: 'Fresh Cement Industries Ltd.',
    type: 'Cement Supplier',
    location: 'Mongla, Bagerhat',
    contact: '+880-468-75206',
    rating: 4.4,
    products: ['OPC Cement', 'PPC Cement'],
    currentPrice: 535, // BDT per bag (50kg)
    monthlySupply: 6700, // bags
    paymentTerms: '30 days credit',
    established: 2008
  },
  {
    id: 'SUP-005',
    name: 'Navana Real Estate Group',
    type: 'Equipment Rental',
    location: 'Tejgaon, Dhaka',
    contact: '+880-2-8870416',
    rating: 4.7,
    products: ['Tower Cranes', 'Concrete Mixers', 'Excavators'],
    currentPrice: 125000, // BDT per day (crane rental)
    monthlyService: 45, // rental days
    paymentTerms: '7 days advance',
    established: 1981
  }
]

// ===== QUALITY & SAFETY DATA =====
export const qualityMetrics = {
  overallScore: 94.2,
  defectRate: 0.08, // percent
  reworkRate: 1.2, // percent
  customerSatisfaction: 92.5, // percent
  
  inspections: {
    scheduled: 245,
    completed: 238,
    passed: 225,
    failed: 13,
    pending: 7
  },
  
  safety: {
    recordableDays: 127, // days without incidents
    totalIncidents: 3,
    minorIncidents: 2,
    majorIncidents: 1,
    fatalIncidents: 0,
    safetyTrainingHours: 4567,
    safetyScore: 96.8
  },
  
  materials: {
    testedBatches: 1456,
    passedTests: 1432,
    failedTests: 24,
    passRate: 98.35
  }
}

// ===== REGULATORY COMPLIANCE =====
export const regulations = {
  bnbc: {
    version: 'BNBC 2020',
    complianceRate: 98.5,
    lastAudit: '2024-09-15',
    nextAudit: '2025-03-15',
    violations: 2,
    status: 'Compliant'
  },
  
  rajuk: {
    approvedPlans: 47,
    pendingApprovals: 3,
    rejectedPlans: 1,
    averageApprovalTime: 45, // days
    fees: {
      planApproval: 156000, // BDT per application
      buildingPermit: 234000, // BDT per permit
      occupancyPermit: 89000 // BDT per permit
    }
  },
  
  environment: {
    eiaApproved: 4, // Environmental Impact Assessments
    eccObtained: 4, // Environmental Clearance Certificates
    wasteManagement: 'Compliant',
    airQualityMonitoring: 'Active',
    noiseControl: 'Within Limits'
  },
  
  labor: {
    minimumWage: 25000, // BDT monthly (as per Bangladesh Labour Act)
    overtimeRate: 2.0, // multiplier
    weeklyHolidays: 1,
    annualLeave: 21, // days
    casualLeave: 10, // days
    sickLeave: 14, // days
    maternityLeave: 112, // days
    paternityLeave: 7 // days
  }
}

// ===== SEASONAL & CULTURAL FACTORS =====
export const seasonalFactors = {
  monsoon: {
    period: 'June - September',
    impact: {
      workingDays: -15, // percent reduction
      materialDelivery: -25, // percent delay
      productivity: -20, // percent reduction
      safetyRisk: 35 // percent increase
    },
    mitigation: {
      waterproofing: 'Enhanced',
      drainage: 'Improved',
      workSchedule: 'Adjusted',
      materialStorage: 'Covered'
    }
  },
  
  festivals: {
    eid: {
      duration: 7, // days holiday
      bonusAmount: 8900000000, // ৳89 Cr total
      productivityImpact: -30, // percent (preparation period)
      schedulingBuffer: 14 // days
    },
    durga_puja: {
      duration: 5, // days holiday
      productivityImpact: -15, // percent
      schedulingBuffer: 7 // days
    },
    bijoya_dashami: {
      duration: 3, // days holiday
      productivityImpact: -10, // percent
      schedulingBuffer: 5 // days
    }
  },
  
  workingHours: {
    ramadan: {
      standardHours: 7, // reduced from 8
      breakTime: 60, // minutes
      productivityFactor: 0.85
    },
    summer: {
      standardHours: 9,
      breakTime: 90, // minutes (heat precaution)
      productivityFactor: 0.90
    },
    winter: {
      standardHours: 8,
      breakTime: 30, // minutes
      productivityFactor: 1.0
    }
  }
}

// ===== UTILITY FUNCTIONS =====
export const formatBDT = (amount: number): string => {
  if (amount >= 10000000000) { // 1000 Cr and above
    return `৳${(amount / 10000000000).toFixed(2)} Thousand Cr`
  } else if (amount >= 1000000000) { // 100 Cr and above
    return `৳${(amount / 1000000000).toFixed(1)} Cr`
  } else if (amount >= 100000000) { // 10 Cr and above
    return `৳${(amount / 1000000000).toFixed(2)} Cr`
  } else if (amount >= 10000000) { // 1 Cr and above
    return `৳${(amount / 10000000).toFixed(1)} Cr`
  } else if (amount >= 100000) { // 1 Lakh and above
    return `৳${(amount / 100000).toFixed(1)} Lakh`
  } else if (amount >= 1000) { // 1000 and above
    return `৳${(amount / 1000).toFixed(1)}K`
  } else {
    return `৳${amount.toLocaleString()}`
  }
}

export const getBanglaNumber = (number: number): string => {
  const banglaDigits = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯']
  return number.toString().split('').map(digit => banglaDigits[parseInt(digit)] || digit).join('')
}

export const getCurrentMonsoonStatus = (): { active: boolean; severity: string; impact: number } => {
  const now = new Date()
  const month = now.getMonth() + 1 // 1-based month
  
  if (month >= 6 && month <= 9) {
    return {
      active: true,
      severity: month === 7 || month === 8 ? 'High' : 'Medium',
      impact: month === 7 || month === 8 ? 25 : 15
    }
  }
  
  return { active: false, severity: 'None', impact: 0 }
}

export const getUpcomingFestivals = (): Array<{ name: string; date: string; impact: string }> => {
  // Simplified - in real app, would calculate based on lunar calendar
  return [
    { name: 'Eid-ul-Fitr', date: '2025-03-30', impact: 'High' },
    { name: 'Eid-ul-Adha', date: '2025-06-06', impact: 'High' },
    { name: 'Durga Puja', date: '2025-10-02', impact: 'Medium' },
    { name: 'Bijoya Dashami', date: '2025-10-06', impact: 'Low' }
  ]
}

// Real-time data simulation functions
export const generateRealtimeMetrics = () => {
  const baseValues = {
    productivity: 87.5,
    safety: 96.8,
    quality: 94.2,
    efficiency: 89.3
  }
  
  // Simulate small variations
  return Object.entries(baseValues).reduce((acc, [key, value]) => {
    const variation = (Math.random() - 0.5) * 2 // ±1% variation
    acc[key] = Math.max(80, Math.min(100, value + variation))
    return acc
  }, {} as Record<string, number>)
}

export default {
  companyProfile,
  projects,
  workforce,
  financialData,
  suppliers,
  qualityMetrics,
  regulations,
  seasonalFactors,
  formatBDT,
  getBanglaNumber,
  getCurrentMonsoonStatus,
  getUpcomingFestivals,
  generateRealtimeMetrics
}