'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Mic, MicOff, Volume2, Loader2 } from 'lucide-react'

interface VoiceCommandProps {
  onCommand?: (command: string, result: any) => void
}

const sampleCommands = [
  { command: "Show me all delayed projects", response: "Found 3 delayed projects: Dhanmondi Square, Uttara Business Park, and Mirpur Heights" },
  { command: "What's the budget status for Gulshan Heights?", response: "Gulshan Heights is currently 8% under budget with ৳2.3 Cr remaining" },
  { command: "Show worker attendance today", response: "8,234 workers checked in today across 142 sites. Attendance rate: 92%" },
  { command: "Any critical alerts?", response: "3 critical alerts: Material shortage at Tower B, Weather warning for next week, and unusual cement consumption at Block A" },
  { command: "গুলশান প্রজেক্টের স্ট্যাটাস কি?", response: "গুলশান হাইটস টাওয়ার এ - ৬৫% সম্পন্ন, সময়মতো চলছে। কোন সমস্যা নেই।" }
]

export default function VoiceCommand({ onCommand }: VoiceCommandProps) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [response, setResponse] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const [showCommands, setShowCommands] = useState(false)
  const recognitionRef = useRef<any>(null)
  const synthRef = useRef<any>(null)

  useEffect(() => {
    // Check if browser supports speech recognition
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = false
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US' // Can switch to 'bn-BD' for Bengali

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex
        const transcript = event.results[current][0].transcript
        setTranscript(transcript)
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

    // Initialize speech synthesis
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop()
      }
    }
  }, [transcript])

  const toggleListening = () => {
    if (isListening) {
      recognitionRef.current?.stop()
      setIsListening(false)
    } else {
      setTranscript('')
      setResponse('')
      recognitionRef.current?.start()
      setIsListening(true)
    }
  }

  const processCommand = async (command: string) => {
    setIsProcessing(true)
    
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1500))
    
    // Find matching command or generate response
    const matchedCommand = sampleCommands.find(cmd => 
      command.toLowerCase().includes(cmd.command.toLowerCase().split(' ').slice(0, 3).join(' '))
    )
    
    const aiResponse = matchedCommand?.response || `Processing "${command}". Here's what I found: Project status normal across all sites.`
    
    setResponse(aiResponse)
    setIsProcessing(false)
    
    // Speak the response
    if (synthRef.current) {
      const utterance = new SpeechSynthesisUtterance(aiResponse)
      utterance.rate = 0.9
      utterance.pitch = 1
      synthRef.current.speak(utterance)
    }
    
    // Callback
    if (onCommand) {
      onCommand(command, { response: aiResponse, data: {} })
    }
  }

  const simulateCommand = (command: string) => {
    setTranscript(command)
    processCommand(command)
  }

  return (
    <div className="relative">
      {/* Main Voice Interface */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h4 className="text-lg font-semibold">Voice Command Interface</h4>
          <button
            onClick={() => setShowCommands(!showCommands)}
            className="text-sm text-purple-600 hover:text-purple-700"
          >
            {showCommands ? 'Hide' : 'Show'} Commands
          </button>
        </div>

        {/* Microphone Button */}
        <div className="flex flex-col items-center">
          <motion.button
            onClick={toggleListening}
            className={`relative w-24 h-24 rounded-full flex items-center justify-center transition-all ${
              isListening 
                ? 'bg-red-500 hover:bg-red-600' 
                : 'bg-purple-600 hover:bg-purple-700'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isListening ? (
              <>
                <MicOff className="w-10 h-10 text-white" />
                <motion.div
                  className="absolute inset-0 rounded-full border-4 border-white"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </>
            ) : (
              <Mic className="w-10 h-10 text-white" />
            )}
          </motion.button>
          
          <p className="mt-3 text-sm text-gray-600">
            {isListening ? 'Listening...' : 'Click to speak'}
          </p>
        </div>

        {/* Transcript */}
        <AnimatePresence>
          {transcript && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4"
            >
              <p className="text-sm text-gray-500 mb-1">You said:</p>
              <p className="text-lg font-medium text-gray-800">{transcript}</p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Processing Indicator */}
        <AnimatePresence>
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="mt-4 flex items-center justify-center gap-2"
            >
              <Loader2 className="w-5 h-5 animate-spin text-purple-600" />
              <span className="text-sm text-gray-600">Processing your request...</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Response */}
        <AnimatePresence>
          {response && !isProcessing && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="mt-4 p-4 bg-purple-50 rounded-lg"
            >
              <div className="flex items-start gap-3">
                <Volume2 className="w-5 h-5 text-purple-600 mt-0.5" />
                <div>
                  <p className="text-sm text-purple-600 mb-1">AI Response:</p>
                  <p className="text-gray-800">{response}</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sample Commands */}
      <AnimatePresence>
        {showCommands && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-gray-50 rounded-lg p-4 overflow-hidden"
          >
            <h5 className="font-medium text-gray-700 mb-3">Try these commands:</h5>
            <div className="space-y-2">
              {sampleCommands.map((cmd, index) => (
                <button
                  key={index}
                  onClick={() => simulateCommand(cmd.command)}
                  className="w-full text-left p-3 bg-white rounded hover:bg-purple-50 transition-colors"
                >
                  <p className="text-sm font-medium text-gray-800">"{cmd.command}"</p>
                  <p className="text-xs text-gray-500 mt-1">→ {cmd.response.substring(0, 60)}...</p>
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Language Toggle */}
      <div className="mt-4 flex items-center justify-center gap-4">
        <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm font-medium">
          English
        </button>
        <button className="px-3 py-1 bg-gray-100 text-gray-600 rounded text-sm font-medium hover:bg-gray-200">
          বাংলা
        </button>
      </div>
    </div>
  )
}