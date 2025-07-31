'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Fingerprint,
  ScanFace,
  Clock,
  UserCheck,
  UserX,
  MapPin,
  Activity,
  AlertTriangle,
  CheckCircle,
  Calendar,
  TrendingUp,
  Shield,
  Smartphone,
  Wifi,
  WifiOff,
  Timer,
  Camera,
  Battery
} from 'lucide-react'
import { GlassCard, AnimatedButton, AnimatedCounter } from '../../../shared/ui'

interface AttendanceEntry {
  id: string
  workerName: string
  workerId: string
  checkIn: string
  checkOut?: string
  location: string
  method: 'fingerprint' | 'face' | 'mobile'
  status: 'on-time' | 'late' | 'early'
  photo?: string
  temperature?: number
  geoLocation: { lat: number; lng: number }
  deviceId: string
}

interface BiometricDevice {
  id: string
  name: string
  type: 'fingerprint' | 'face' | 'hybrid'
  location: string
  status: 'online' | 'offline' | 'maintenance'
  lastSync: string
  entriestoday: number
  battery?: number
}

interface AttendanceStats {
  site: string
  totalWorkers: number
  checkedIn: number
  checkedOut: number
  late: number
  absent: number
  overtime: number
}

export default function BiometricAttendance() {
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0])
  const [selectedSite, setSelectedSite] = useState('all')
  const [liveEntries, setLiveEntries] = useState<AttendanceEntry[]>([])
  
  // Simulate live attendance updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate new entry
      const names = ['Abdul Rahman', 'Fatima Khatun', 'Karim Sheikh', 'Nasrin Begum']
      const newEntry: AttendanceEntry = {
        id: Date.now().toString(),
        workerName: names[Math.floor(Math.random() * names.length)],
        workerId: `EMP${Math.floor(1000 + Math.random() * 9000)}`,
        checkIn: new Date().toLocaleTimeString(),
        location: 'Main Gate - Gulshan',
        method: Math.random() > 0.5 ? 'fingerprint' : 'face',
        status: Math.random() > 0.8 ? 'late' : 'on-time',
        photo: '👷',
        temperature: 36 + Math.random() * 1.5,
        geoLocation: { lat: 23.7925, lng: 90.4078 },
        deviceId: 'BIO-001'
      }
      
      setLiveEntries(prev => [newEntry, ...prev.slice(0, 4)])
    }, 5000)
    
    return () => clearInterval(interval)
  }, [])

  const biometricStats = {
    totalDevices: 24,
    activeDevices: 22,
    todayScans: 5432,
    avgScanTime: 1.2,
    accuracy: 99.7
  }

  const devices: BiometricDevice[] = [
    {
      id: 'BIO-001',
      name: 'Main Gate Scanner',
      type: 'hybrid',
      location: 'Gulshan Heights - Gate A',
      status: 'online',
      lastSync: '2 mins ago',
      entriestoday: 1234,
      battery: 85
    },
    {
      id: 'BIO-002',
      name: 'Site Office Terminal',
      type: 'fingerprint',
      location: 'Dhanmondi Complex - Office',
      status: 'online',
      lastSync: '5 mins ago',
      entriestoday: 567
    },
    {
      id: 'BIO-003',
      name: 'Mobile Unit 1',
      type: 'face',
      location: 'Bashundhara Tower - Floor 12',
      status: 'online',
      lastSync: '1 min ago',
      entriestoday: 234,
      battery: 72
    },
    {
      id: 'BIO-004',
      name: 'Emergency Scanner',
      type: 'fingerprint',
      location: 'Mirpur Project - Gate B',
      status: 'offline',
      lastSync: '2 hours ago',
      entriestoday: 89
    }
  ]

  const attendanceStats: AttendanceStats[] = [
    {
      site: 'Gulshan Heights',
      totalWorkers: 892,
      checkedIn: 823,
      checkedOut: 245,
      late: 47,
      absent: 69,
      overtime: 123
    },
    {
      site: 'Dhanmondi Complex',
      totalWorkers: 654,
      checkedIn: 598,
      checkedOut: 187,
      late: 32,
      absent: 56,
      overtime: 89
    },
    {
      site: 'Bashundhara Tower',
      totalWorkers: 765,
      checkedIn: 712,
      checkedOut: 234,
      late: 28,
      absent: 53,
      overtime: 156
    }
  ]

  const recentEntries: AttendanceEntry[] = [
    {
      id: '1',
      workerName: 'Md. Rahim Mia',
      workerId: 'EMP2341',
      checkIn: '08:02 AM',
      checkOut: '06:15 PM',
      location: 'Gulshan Heights',
      method: 'fingerprint',
      status: 'on-time',
      photo: '👷‍♂️',
      temperature: 36.5,
      geoLocation: { lat: 23.7925, lng: 90.4078 },
      deviceId: 'BIO-001'
    },
    {
      id: '2',
      workerName: 'Salma Begum',
      workerId: 'EMP1892',
      checkIn: '08:45 AM',
      location: 'Dhanmondi Complex',
      method: 'face',
      status: 'late',
      photo: '👷‍♀️',
      temperature: 36.8,
      geoLocation: { lat: 23.7465, lng: 90.3765 },
      deviceId: 'BIO-002'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-time': return 'from-green-400 to-emerald-600'
      case 'late': return 'from-amber-400 to-orange-600'
      case 'early': return 'from-blue-400 to-indigo-600'
      default: return 'from-gray-400 to-gray-600'
    }
  }

  const getDeviceStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-400'
      case 'offline': return 'bg-red-400'
      case 'maintenance': return 'bg-amber-400'
      default: return 'bg-gray-400'
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Biometric Attendance System</h2>
          <p className="text-gray-400">Real-time fingerprint & face recognition tracking</p>
        </div>
        
        <div className="flex items-center gap-4">
          <input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="px-4 py-2 rounded-lg bg-white/5 backdrop-blur-md border border-white/10 text-white focus:outline-none focus:border-white/20"
          />
          <AnimatedButton variant="primary" size="sm" className="bg-gradient-to-r from-purple-600 to-indigo-600">
            <Smartphone className="w-4 h-4" />
            <span>Mobile App</span>
          </AnimatedButton>
        </div>
      </div>

      {/* Biometric Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        {[
          {
            icon: Fingerprint,
            label: 'Total Devices',
            value: biometricStats.totalDevices,
            color: 'from-blue-400 to-indigo-600',
            bgColor: 'from-blue-500/20 to-indigo-500/20'
          },
          {
            icon: Activity,
            label: 'Active Devices',
            value: biometricStats.activeDevices,
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
          },
          {
            icon: UserCheck,
            label: 'Today\'s Scans',
            value: biometricStats.todayScans,
            color: 'from-purple-400 to-pink-600',
            bgColor: 'from-purple-500/20 to-pink-500/20'
          },
          {
            icon: Timer,
            label: 'Avg Scan Time',
            value: `${biometricStats.avgScanTime}s`,
            format: 'string',
            color: 'from-amber-400 to-orange-600',
            bgColor: 'from-amber-500/20 to-orange-500/20'
          },
          {
            icon: Shield,
            label: 'Accuracy',
            value: `${biometricStats.accuracy}%`,
            format: 'string',
            color: 'from-green-400 to-emerald-600',
            bgColor: 'from-green-500/20 to-emerald-500/20'
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Live Attendance Feed */}
        <GlassCard className="p-6" variant="accent">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-white">Live Attendance</h3>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-xs text-gray-400">Real-time</span>
            </div>
          </div>
          
          <div className="space-y-3">
            <AnimatePresence>
              {liveEntries.map((entry, index) => (
                <motion.div
                  key={entry.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="text-2xl">{entry.photo}</div>
                      <div>
                        <p className="text-sm font-medium text-white">{entry.workerName}</p>
                        <p className="text-xs text-gray-400">{entry.workerId} • {entry.checkIn}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {entry.method === 'fingerprint' ? 
                        <Fingerprint className="w-4 h-4 text-blue-400" /> :
                        <ScanFace className="w-4 h-4 text-purple-400" />
                      }
                      <span className={`text-xs px-2 py-1 rounded-full ${
                        entry.status === 'on-time' ? 'bg-green-500/20 text-green-400' :
                        'bg-amber-500/20 text-amber-400'
                      }`}>
                        {entry.status}
                      </span>
                    </div>
                  </div>
                  {entry.temperature && (
                    <p className="text-xs text-gray-500 mt-1">
                      Temp: {entry.temperature.toFixed(1)}°C • {entry.location}
                    </p>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </GlassCard>

        {/* Device Status */}
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Device Status</h3>
          <div className="space-y-3">
            {devices.map((device) => (
              <div
                key={device.id}
                className="p-3 rounded-lg bg-white/5 backdrop-blur-md border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getDeviceStatusColor(device.status)}`} />
                    <span className="text-sm font-medium text-white">{device.name}</span>
                  </div>
                  {device.battery && (
                    <div className="flex items-center gap-1">
                      <Battery className="w-4 h-4 text-gray-400" />
                      <span className="text-xs text-gray-400">{device.battery}%</span>
                    </div>
                  )}
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <p className="text-gray-400">Location</p>
                    <p className="text-gray-300">{device.location}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Today's Entries</p>
                    <p className="text-gray-300">{device.entriestoday}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-500">Last sync: {device.lastSync}</span>
                  {device.status === 'online' ? 
                    <Wifi className="w-3 h-3 text-green-400" /> :
                    <WifiOff className="w-3 h-3 text-red-400" />
                  }
                </div>
              </div>
            ))}
          </div>
        </GlassCard>

        {/* Site Attendance Summary */}
        <GlassCard className="p-6" variant="accent">
          <h3 className="text-lg font-semibold text-white mb-4">Site Summary</h3>
          <div className="space-y-4">
            {attendanceStats.map((site) => (
              <div key={site.site} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-white">{site.site}</h4>
                  <span className="text-xs text-gray-400">
                    {((site.checkedIn / site.totalWorkers) * 100).toFixed(1)}% present
                  </span>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <div className="text-center p-2 rounded bg-green-500/10">
                    <UserCheck className="w-4 h-4 text-green-400 mx-auto mb-1" />
                    <p className="text-green-400 font-medium">{site.checkedIn}</p>
                    <p className="text-gray-500">Present</p>
                  </div>
                  <div className="text-center p-2 rounded bg-amber-500/10">
                    <Clock className="w-4 h-4 text-amber-400 mx-auto mb-1" />
                    <p className="text-amber-400 font-medium">{site.late}</p>
                    <p className="text-gray-500">Late</p>
                  </div>
                  <div className="text-center p-2 rounded bg-red-500/10">
                    <UserX className="w-4 h-4 text-red-400 mx-auto mb-1" />
                    <p className="text-red-400 font-medium">{site.absent}</p>
                    <p className="text-gray-500">Absent</p>
                  </div>
                </div>
                
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <div className="h-full flex">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(site.checkedIn / site.totalWorkers) * 100}%` }}
                      className="bg-green-500"
                    />
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${(site.late / site.totalWorkers) * 100}%` }}
                      className="bg-amber-500"
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>

      {/* Detailed Attendance Table */}
      <GlassCard className="p-6" variant="accent">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-white">Today's Attendance Records</h3>
          <div className="flex items-center gap-3">
            <AnimatedButton variant="ghost" size="sm">
              <Camera className="w-4 h-4" />
              <span>Face Gallery</span>
            </AnimatedButton>
            <AnimatedButton variant="ghost" size="sm">
              <Fingerprint className="w-4 h-4" />
              <span>Enroll New</span>
            </AnimatedButton>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-white/10">
                <th className="pb-3">Worker</th>
                <th className="pb-3">Check In</th>
                <th className="pb-3">Check Out</th>
                <th className="pb-3">Location</th>
                <th className="pb-3">Method</th>
                <th className="pb-3">Status</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {recentEntries.map((entry) => (
                <tr key={entry.id} className="border-b border-white/5">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{entry.photo}</span>
                      <div>
                        <p className="text-white font-medium">{entry.workerName}</p>
                        <p className="text-xs text-gray-400">{entry.workerId}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 text-gray-300">{entry.checkIn}</td>
                  <td className="py-3 text-gray-300">{entry.checkOut || '-'}</td>
                  <td className="py-3 text-gray-300">{entry.location}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-1">
                      {entry.method === 'fingerprint' ? 
                        <Fingerprint className="w-4 h-4 text-blue-400" /> :
                        <ScanFace className="w-4 h-4 text-purple-400" />
                      }
                      <span className="text-gray-300 capitalize">{entry.method}</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <span className={`px-2 py-1 rounded-full text-xs bg-gradient-to-r ${getStatusColor(entry.status)} bg-opacity-20`}>
                      {entry.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <AnimatedButton variant="ghost" size="sm">
                      <MapPin className="w-3 h-3" />
                      View
                    </AnimatedButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  )
}