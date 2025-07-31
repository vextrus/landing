'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, Loader2, ChevronUp } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'

interface VoiceInterfaceProps {
  isActive: boolean
  onToggle: () => void
  onCommand: (command: string, result: any) => void
}

const quickCommands = [
  "Show construction delays",
  "Weather impact analysis",
  "Worker attendance today",
  "Critical alerts",
  "Budget status",
  "Equipment locations"
]

export default function VoiceInterface({ isActive, onToggle, onCommand }: VoiceInterfaceProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showQuickCommands, setShowQuickCommands] = useState(false)
  const [language, setLanguage] = useState<'en' | 'bn'>('en')
  const [voiceWaveform, setVoiceWaveform] = useState<number[]>(Array(20).fill(0))
  
  const recognitionRef = useRef<any>(null)
  const animationRef = useRef<number | null>(null)

  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = language === 'en' ? 'en-US' : 'bn-BD'

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)
        
        // Simulate waveform
        setVoiceWaveform(prev => 
          prev.map(() => Math.random() * 100)
        )
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
        if (transcript) {
          processCommand(transcript)
        }
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [language, transcript])

  // Animate waveform when listening
  useEffect(() => {
    if (isListening) {
      const animate = () => {
        setVoiceWaveform(prev => 
          prev.map((val, i) => {
            const target = Math.random() * 100
            return val + (target - val) * 0.1
          })
        )
        animationRef.current = requestAnimationFrame(animate)
      }
      animate()
    } else {
      setVoiceWaveform(Array(20).fill(0))
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isListening])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      setTranscript('')
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const processCommand = async (command: string) => {
    setIsProcessing(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Process command and get result
    const result = {
      type: 'success',
      message: `Processing: "${command}"`,
      data: {}
    }
    
    onCommand(command, result)
    setIsProcessing(false)
    setTranscript('')
  }

  const executeQuickCommand = (command: string) => {
    setTranscript(command)
    processCommand(command)
  }

  if (!isActive) {
    return (
      <motion.button
        className="w-14 h-14 rounded-full bg-gradient-to-br from-purple-600 to-purple-800 shadow-xl flex items-center justify-center"
        onClick={onToggle}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
      >
        <Mic className="w-6 h-6 text-gray-900" />
      </motion.button>
    )
  }

  return (
    <motion.div
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0, opacity: 0 }}
      className="relative"
    >
      {/* Main Voice Interface Card */}
      <motion.div 
        className="bg-white backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/30 p-6 w-80"
        layoutId="voice-interface"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-900 font-semibold flex items-center gap-2">
            <Volume2 className="w-5 h-5 text-purple-400" />
            Voice Assistant
          </h3>
          <button
            onClick={onToggle}
            className="text-gray-400 hover:text-gray-900 transition-colors"
          >
            <ChevronUp className="w-5 h-5" />
          </button>
        </div>

        {/* Language Toggle */}
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setLanguage('en')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              language === 'en'
                ? 'bg-purple-600 text-gray-900'
                : 'bg-gray-800 text-gray-400 hover:text-gray-900'
            }`}
          >
            English
          </button>
          <button
            onClick={() => setLanguage('bn')}
            className={`flex-1 py-2 rounded-lg text-sm font-medium transition-all ${
              language === 'bn'
                ? 'bg-purple-600 text-gray-900'
                : 'bg-gray-800 text-gray-400 hover:text-gray-900'
            }`}
          >
            বাংলা
          </button>
        </div>

        {/* Voice Visualization */}
        <div className="relative h-32 mb-4 bg-gray-100 rounded-xl overflow-hidden">
          {/* Waveform */}
          <div className="absolute inset-0 flex items-center justify-center gap-1">
            {voiceWaveform.map((height, index) => (
              <motion.div
                key={index}
                className="w-1 bg-gradient-to-t from-purple-600 to-purple-400 rounded-full"
                animate={{
                  height: isListening ? `${height}%` : '10%'
                }}
                transition={{
                  duration: 0.1,
                  ease: "easeOut"
                }}
              />
            ))}
          </div>

          {/* Center Button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.button
              onClick={toggleListening}
              className={`relative w-20 h-20 rounded-full flex items-center justify-center transition-all ${
                isListening 
                  ? 'bg-red-500 hover:bg-red-600' 
                  : 'bg-purple-600 hover:bg-purple-700'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {isListening ? (
                <MicOff className="w-8 h-8 text-gray-900" />
              ) : (
                <Mic className="w-8 h-8 text-gray-900" />
              )}
              
              {/* Pulse effect when listening */}
              {isListening && (
                <motion.div
                  className="absolute inset-0 rounded-full border-2 border-red-500"
                  animate={{
                    scale: [1, 1.5, 1.5],
                    opacity: [1, 0, 0]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity
                  }}
                />
              )}
            </motion.button>
          </div>

          {/* Status Text */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <p className="text-xs text-gray-400">
              {isListening ? 'Listening...' : 'Click to speak'}
            </p>
          </div>
        </div>

        {/* Transcript Display */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4"
            >
              <div className="bg-gray-100 rounded-lg p-3">
                <p className="text-xs text-gray-400 mb-1">You said:</p>
                <p className="text-gray-900 text-sm">{transcript}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing Indicator */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mb-4"
            >
              <div className="bg-purple-900/30 rounded-lg p-3 flex items-center gap-3">
                <Loader2 className="w-5 h-5 animate-spin text-purple-400" />
                <span className="text-sm text-gray-900">Processing your request...</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Quick Commands */}
        <button
          onClick={() => setShowQuickCommands(!showQuickCommands)}
          className="w-full text-center text-xs text-gray-400 hover:text-gray-900 transition-colors mb-2"
        >
          {showQuickCommands ? 'Hide' : 'Show'} quick commands
        </button>

        <AnimatePresence>
          {showQuickCommands && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              {quickCommands.map((command, index) => (
                <motion.button
                  key={command}
                  onClick={() => executeQuickCommand(command)}
                  className="w-full text-left px-3 py-2 bg-gray-100 hover:bg-gray-700/50 rounded-lg text-sm text-gray-300 hover:text-gray-900 transition-all"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.98 }}
                >
                  "{command}"
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Floating particles effect */}
      <div className="absolute inset-0 pointer-events-none">
        {Array.from({ length: 5 }).map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-purple-400 rounded-full"
            animate={{
              x: [0, Math.random() * 100 - 50],
              y: [0, -100],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              delay: i * 0.5,
              repeat: Infinity
            }}
          />
        ))}
      </div>
    </motion.div>
  )
}