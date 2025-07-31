'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Mic, 
  MicOff, 
  Send, 
  Bot, 
  User, 
  Volume2, 
  X,
  Sparkles,
  Loader2,
  Command
} from 'lucide-react'
import GlassCard from './ui/GlassCard'
import AnimatedButton from './ui/AnimatedButton'

interface Message {
  id: string
  type: 'user' | 'assistant'
  content: string
  timestamp: Date
  confidence?: number
  suggestions?: string[]
}

interface ConversationalInterfaceProps {
  onCommand?: (command: string) => void
  isOpen?: boolean
  onClose?: () => void
}

export default function ConversationalInterface({ 
  onCommand, 
  isOpen = true,
  onClose 
}: ConversationalInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: 'Hello! I\'m your AI assistant. You can ask me anything about your projects, or use voice commands. Try saying "Show me project delays" or "What\'s the budget status?"',
      timestamp: new Date(),
      suggestions: [
        'Show project timeline',
        'What\'s the budget status?',
        'Any safety alerts today?',
        'Show worker productivity'
      ]
    }
  ])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const recognitionRef = useRef<any>(null)

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && 'webkitSpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition
      recognitionRef.current = new SpeechRecognition()
      recognitionRef.current.continuous = true
      recognitionRef.current.interimResults = true
      recognitionRef.current.lang = 'en-US'

      recognitionRef.current.onresult = (event: any) => {
        const transcript = Array.from(event.results)
          .map((result: any) => result[0])
          .map((result: any) => result.transcript)
          .join('')

        setInput(transcript)
      }

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error)
        setIsListening(false)
      }

      recognitionRef.current.onend = () => {
        setIsListening(false)
      }
    }
  }, [])

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const toggleListening = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in your browser. Please use Chrome.')
      return
    }

    if (isListening) {
      recognitionRef.current.stop()
    } else {
      recognitionRef.current.start()
      setIsListening(true)
    }
  }

  const processCommand = async (command: string) => {
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: command,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsProcessing(true)

    // Simulate AI processing
    setTimeout(() => {
      const responses: { [key: string]: { content: string; suggestions: string[] } } = {
        'project timeline': {
          content: 'I\'ve analyzed your project timeline. You have 3 projects on track, 2 with minor delays, and 1 at risk. The Bashundhara Heights project is 72% complete and ahead of schedule by 3 days.',
          suggestions: ['Show delayed projects', 'View critical path', 'Update timeline']
        },
        'budget status': {
          content: 'Current budget utilization is at 67.8% (৳458.3 Cr of ৳675 Cr allocated). You\'re tracking 5% under budget with potential savings of ৳33.75 Cr if current trends continue.',
          suggestions: ['View cost breakdown', 'Show overruns', 'Forecast next quarter']
        },
        'safety alerts': {
          content: 'Good news! No critical safety alerts today. Minor incident at Jolshiri site - worker slip, no injuries. Safety score: 98.2% (above target of 95%).',
          suggestions: ['View safety history', 'Schedule inspection', 'Training status']
        },
        'worker productivity': {
          content: 'Average worker productivity is 87.5% today, up 3.2% from last week. Morning shift showing exceptional performance at 92%. Weather conditions optimal for outdoor work.',
          suggestions: ['Show by site', 'Compare teams', 'View trends']
        },
        'show map': {
          content: 'Switching to Sites view to display the construction map with all active locations.',
          suggestions: ['Filter by status', 'Show weather overlay', 'View site details']
        }
      }

      // Find best matching response
      const lowerCommand = command.toLowerCase()
      let response: { content: string; suggestions: string[] } = {
        content: `I understand you want to know about "${command}". Let me analyze that for you...`,
        suggestions: ['Tell me more', 'Show dashboard', 'View reports']
      }

      for (const [key, value] of Object.entries(responses)) {
        if (lowerCommand.includes(key)) {
          response = value
          break
        }
      }

      const assistantMessage: Message = {
        id: Date.now().toString(),
        type: 'assistant',
        content: response.content,
        timestamp: new Date(),
        confidence: 92,
        suggestions: response.suggestions
      }

      setMessages(prev => [...prev, assistantMessage])
      setIsProcessing(false)

      // Trigger command if handler provided
      if (onCommand && lowerCommand.includes('show map')) {
        onCommand('sites')
      }

      // Text-to-speech
      if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(response.content)
        utterance.rate = 1.1
        utterance.pitch = 1
        setIsSpeaking(true)
        utterance.onend = () => setIsSpeaking(false)
        speechSynthesis.speak(utterance)
      }
    }, 1500)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      processCommand(input.trim())
    }
  }

  const handleSuggestionClick = (suggestion: string) => {
    processCommand(suggestion)
  }

  if (!isOpen) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="fixed bottom-4 right-4 z-50 w-96 max-h-[600px] flex flex-col"
    >
      <GlassCard className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              {(isListening || isSpeaking) && (
                <motion.div
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="absolute -inset-1 bg-indigo-500/20 rounded-xl"
                />
              )}
            </div>
            <div>
              <h3 className="font-semibold text-gray-900">AI Assistant</h3>
              <p className="text-xs text-gray-500">
                {isListening ? 'Listening...' : 'Voice & text enabled'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <AnimatePresence mode="popLayout">
            {messages.map(message => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className={`flex gap-3 ${
                  message.type === 'user' ? 'flex-row-reverse' : ''
                }`}
              >
                {/* Avatar */}
                <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                  message.type === 'user' 
                    ? 'bg-indigo-100' 
                    : 'bg-gradient-to-br from-indigo-500 to-purple-600'
                }`}>
                  {message.type === 'user' ? (
                    <User className="w-4 h-4 text-indigo-600" />
                  ) : (
                    <Bot className="w-4 h-4 text-white" />
                  )}
                </div>

                {/* Message */}
                <div className={`flex-1 ${message.type === 'user' ? 'text-right' : ''}`}>
                  <div className={`inline-block p-3 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-100 text-gray-900'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                    {message.confidence && (
                      <p className="text-xs mt-1 opacity-70">
                        Confidence: {message.confidence}%
                      </p>
                    )}
                  </div>
                  
                  {/* Suggestions */}
                  {message.suggestions && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="mt-2 flex flex-wrap gap-2"
                    >
                      {message.suggestions.map((suggestion, i) => (
                        <button
                          key={i}
                          onClick={() => handleSuggestionClick(suggestion)}
                          className="px-3 py-1 text-xs bg-white border border-gray-200 rounded-full hover:bg-gray-50 transition-colors flex items-center gap-1"
                        >
                          <Command className="w-3 h-3" />
                          {suggestion}
                        </button>
                      ))}
                    </motion.div>
                  )}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Processing indicator */}
          {isProcessing && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex gap-3"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="bg-gray-100 rounded-2xl p-3">
                <div className="flex items-center gap-2">
                  <Loader2 className="w-4 h-4 animate-spin text-gray-600" />
                  <span className="text-sm text-gray-600">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={handleSubmit} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <AnimatedButton
              variant={isListening ? 'primary' : 'secondary'}
              size="sm"
              onClick={toggleListening}
              className="!p-2"
            >
              {isListening ? (
                <MicOff className="w-5 h-5" />
              ) : (
                <Mic className="w-5 h-5" />
              )}
            </AnimatedButton>
            
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            />
            
            <AnimatedButton
              variant="primary"
              size="sm"
              className="!p-2"
              onClick={() => {
                if (input.trim() && !isProcessing) {
                  handleSubmit(new Event('submit') as any)
                }
              }}
            >
              <Send className="w-5 h-5" />
            </AnimatedButton>
          </div>

          {/* Voice indicator */}
          {isListening && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex items-center justify-center gap-2"
            >
              <div className="flex gap-1">
                {[...Array(4)].map((_, i) => (
                  <motion.div
                    key={i}
                    animate={{
                      height: [8, 20, 8],
                    }}
                    transition={{
                      duration: 0.8,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    className="w-1 bg-indigo-500 rounded-full"
                  />
                ))}
              </div>
              <span className="text-xs text-gray-600">Listening...</span>
            </motion.div>
          )}
        </form>
      </GlassCard>
    </motion.div>
  )
}