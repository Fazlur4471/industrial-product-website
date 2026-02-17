'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'
import Link from 'next/link'

export function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    productInterest: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await fetch('/api/enquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          productInterest: '',
          message: '',
        })
      } else {
        setError('Failed to send enquiry. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Error submitting enquiry:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in ${formData.productInterest || 'your products'}. Name: ${formData.name}, Company: ${formData.company}, Phone: ${formData.phone}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank')
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-card border border-border rounded-xl p-8 text-center"
      >
        <div className="w-16 h-16 bg-accent/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <Check className="w-8 h-8 text-accent" />
        </div>
        <h3 className="text-2xl font-bold text-foreground mb-2">Thank You!</h3>
        <p className="text-muted-foreground mb-6">
          We've received your enquiry. Our team will contact you shortly.
        </p>
        <button
          onClick={handleWhatsApp}
          className="inline-flex items-center gap-2 bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
        >
          <MessageCircle size={20} />
          Continue on WhatsApp
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="John Anderson"
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
            Email Address
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="john@example.com"
          />
        </div>

        {/* Phone */}
        <div>
          <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-2">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="+1-555-0000"
          />
        </div>

        {/* Company */}
        <div>
          <label htmlFor="company" className="block text-sm font-medium text-foreground mb-2">
            Company Name
          </label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
            placeholder="Your Company"
          />
        </div>
      </div>

      {/* Product Interest */}
      <div>
        <label htmlFor="productInterest" className="block text-sm font-medium text-foreground mb-2">
          Product of Interest
        </label>
        <select
          id="productInterest"
          name="productInterest"
          value={formData.productInterest}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
        >
          <option value="">Select a product...</option>
          <option value="Industrial Steel Plate">Industrial Steel Plate</option>
          <option value="Industrial Pipe Systems">Industrial Pipe Systems</option>
          <option value="Aluminum Ingots">Aluminum Ingots</option>
          <option value="Copper Rods">Copper Rods</option>
          <option value="CNC Turning Services">CNC Turning Services</option>
          <option value="Welding & Fabrication">Welding & Fabrication</option>
          <option value="Metal Stamping">Metal Stamping</option>
          <option value="Heat Treatment Services">Heat Treatment Services</option>
        </select>
      </div>

      {/* Message */}
      <div>
        <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={5}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
          placeholder="Tell us about your requirements..."
        />
      </div>

      {error && (
        <div className="bg-red-500/20 border border-red-500 text-red-300 px-4 py-3 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-accent-foreground font-semibold py-3 rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Sending...' : 'Send Enquiry'}
      </button>
    </form>
  )
}
