'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, MessageCircle } from 'lucide-react'

export function OrderForm() {
  const [formData, setFormData] = useState({
    customerName: '',
    email: '',
    phone: '',
    company: '',
    product: '',
    quantity: '',
    deliveryAddress: '',
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
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          quantity: parseInt(formData.quantity),
        }),
      })

      if (response.ok) {
        setSubmitted(true)
        setFormData({
          customerName: '',
          email: '',
          phone: '',
          company: '',
          product: '',
          quantity: '',
          deliveryAddress: '',
        })
      } else {
        setError('Failed to place order. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
      console.error('Error submitting order:', err)
    } finally {
      setLoading(false)
    }
  }

  const handleWhatsApp = () => {
    const message = `Hello, I've placed an order for ${formData.product} (Qty: ${formData.quantity}). Customer: ${formData.customerName}, Phone: ${formData.phone}`
    const encodedMessage = encodeURIComponent(message)
    window.open(`https://wa.me/919843114920?text=${encodedMessage}`, '_blank')
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
        <h3 className="text-2xl font-bold text-foreground mb-2">Order Placed!</h3>
        <p className="text-muted-foreground mb-6">
          Thank you for your order. We'll process it and contact you with shipping details.
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
        {/* Customer Name */}
        <div>
          <label htmlFor="customerName" className="block text-sm font-medium text-foreground mb-2">
            Full Name
          </label>
          <input
            type="text"
            id="customerName"
            name="customerName"
            value={formData.customerName}
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

      {/* Product */}
      <div>
        <label htmlFor="product" className="block text-sm font-medium text-foreground mb-2">
          Product
        </label>
        <select
          id="product"
          name="product"
          value={formData.product}
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

      {/* Quantity */}
      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-foreground mb-2">
          Quantity
        </label>
        <input
          type="number"
          id="quantity"
          name="quantity"
          value={formData.quantity}
          onChange={handleChange}
          required
          min="1"
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all"
          placeholder="Enter quantity"
        />
      </div>

      {/* Delivery Address */}
      <div>
        <label htmlFor="deliveryAddress" className="block text-sm font-medium text-foreground mb-2">
          Delivery Address
        </label>
        <textarea
          id="deliveryAddress"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          required
          rows={4}
          className="w-full px-4 py-3 bg-secondary border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent transition-all resize-none"
          placeholder="Enter your delivery address..."
        />
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-accent text-accent-foreground font-semibold py-3 rounded-lg hover:bg-accent/90 disabled:opacity-50 transition-colors"
      >
        {loading ? 'Processing...' : 'Place Order'}
      </button>
    </form>
  )
}
