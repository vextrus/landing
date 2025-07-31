'use client'

import { motion } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Section } from '@/components/ui/Section'
import { Button } from '@/components/ui/Button'
import { ArrowRight, Calendar, Download, MessageSquare, Play } from 'lucide-react'

export default function CTASection() {
  return (
    <Section id="cta" background="gradient" padding="lg">
      <Container>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            Ready to Transform Your Construction Business?
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12">
            Join Bangladesh's leading real estate developers who are already using Vextrus 
            to deliver projects faster, reduce costs, and increase profitability.
          </p>

          {/* CTA Options */}
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {/* Option 1: Demo */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <Play className="w-12 h-12 text-primary mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">See It In Action</h3>
              <p className="text-gray-600 mb-4">Watch 15-Minute Personalized Demo</p>
              <Button variant="primary" className="w-full group">
                Book Demo
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </motion.div>

            {/* Option 2: Trial */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <Calendar className="w-12 h-12 text-accent mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Try It Yourself</h3>
              <p className="text-gray-600 mb-4">Access Interactive Sandbox</p>
              <Button variant="secondary" className="w-full">
                Start Free Trial
              </Button>
            </motion.div>

            {/* Option 3: Consultation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <MessageSquare className="w-12 h-12 text-success mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Talk to Us</h3>
              <p className="text-gray-600 mb-4">Discuss Your Specific Needs</p>
              <Button variant="outline" className="w-full">
                Schedule Call
              </Button>
            </motion.div>

            {/* Option 4: Resources */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="bg-white rounded-xl shadow-lg p-6 text-center"
            >
              <Download className="w-12 h-12 text-warning mx-auto mb-4" />
              <h3 className="text-xl font-bold mb-2">Learn More</h3>
              <p className="text-gray-600 mb-4">Download Detailed Resources</p>
              <Button variant="ghost" className="w-full">
                Access Resources
              </Button>
            </motion.div>
          </div>

          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex flex-wrap gap-8 justify-center text-sm text-gray-600"
          >
            <span>📞 +880-XXX-XXXX</span>
            <span>✉️ hello@vextrus.ai</span>
            <span>📍 Dhaka, Bangladesh</span>
            <span>🕐 9 AM - 6 PM BST</span>
          </motion.div>
        </motion.div>
      </Container>
    </Section>
  )
}