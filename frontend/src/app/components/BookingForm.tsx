'use client'

import React, { useState } from 'react'
import emailjs from '@emailjs/browser'
import SuccessModal from './SuccessModal'

type Props = {
  className?: string
}

// Character limits
const MAX_NAME_LENGTH = 80
const MAX_PHONE_LENGTH = 20
const MAX_MESSAGE_LENGTH = 500

export default function BookingForm({ className = '' }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [showSuccessModal, setShowSuccessModal] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<{
    name?: string
    email?: string
    phone?: string
  }>({})

  // Email validation
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: typeof errors = {}

    // Name validation
    if (!name.trim()) {
      newErrors.name = 'Name is required'
    } else if (name.length > MAX_NAME_LENGTH) {
      newErrors.name = `Name must be less than ${MAX_NAME_LENGTH} characters`
    }

    // Email validation (required)
    if (!email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!isValidEmail(email)) {
      newErrors.email = 'Please enter a valid email address'
    }

    // Phone validation (optional, but with length limit)
    if (phone.trim().length > MAX_PHONE_LENGTH) {
      newErrors.phone = `Phone must be less than ${MAX_PHONE_LENGTH} characters`
    }

    // Message length validation (optional field)
    if (message.length > MAX_MESSAGE_LENGTH) {
      newErrors.name = `Message must be less than ${MAX_MESSAGE_LENGTH} characters`
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // EmailJS configuration from environment variables
      const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!
      const adminTemplateId = process.env.NEXT_PUBLIC_EMAILJS_ADMIN_TEMPLATE_ID!
      const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY!

      // Initialize EmailJS
      emailjs.init(publicKey)

      // Prepare template parameters - must match EmailJS template variables exactly
      const templateParams = {
        name: name,                              // {{name}} in template
        email: email,                            // {{email}} in template
        phone: phone || 'Not provided',          // {{phone}} in template
        date: date || 'Not specified',           // {{date}} in template
        message: message || 'No additional message', // {{message}} in template
      }

      // Send admin notification email
      // Note: Auto-reply to customer is handled by EmailJS template's Auto-Reply feature
      const response = await emailjs.send(serviceId, adminTemplateId, templateParams)

      console.log('Email sent successfully:', response)

      // Show success modal
      setShowSuccessModal(true)

      // Reset form
      setName('')
      setEmail('')
      setPhone('')
      setDate('')
      setMessage('')
      setErrors({})
    } catch (error) {
      console.error('Error sending emails:', error)
      alert('Đã có lỗi xảy ra khi gửi form. Vui lòng thử lại sau.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <div className={`bg-black/60 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl ${className}`}>
        <h3 className="text-xl font-bold mb-5 text-white">CONTACT</h3>

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-white/90">
              Name <span className="text-red-400">*</span> <span className="text-white/50 text-[10px]">(Required)</span>
            </label>
            <input
              value={name}
              onChange={(e) => {
                setName(e.target.value)
                if (errors.name) setErrors({ ...errors, name: undefined })
              }}
              className={`w-full px-3 py-2 rounded-md border ${errors.name ? 'border-red-400' : 'border-white/20'
                } bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition`}
              placeholder="John Doe"
              maxLength={MAX_NAME_LENGTH}
            />
            {errors.name && (
              <p className="text-red-400 text-xs mt-1">{errors.name}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-white/90">
              Email <span className="text-red-400">*</span> <span className="text-white/50 text-[10px]">(Required)</span>
            </label>
            <input
              value={email}
              onChange={(e) => {
                setEmail(e.target.value)
                if (errors.email) setErrors({ ...errors, email: undefined })
              }}
              type="email"
              className={`w-full px-3 py-2 rounded-md border ${errors.email ? 'border-red-400' : 'border-white/20'
                } bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition`}
              placeholder="email@gmail.com"
            />
            {errors.email && (
              <p className="text-red-400 text-xs mt-1">{errors.email}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-white/90">
              Phone <span className="text-white/50 text-[10px]">(Optional)</span>
            </label>
            <input
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value)
                if (errors.phone) setErrors({ ...errors, phone: undefined })
              }}
              type="tel"
              className={`w-full px-3 py-2 rounded-md border ${errors.phone ? 'border-red-400' : 'border-white/20'
                } bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition`}
              placeholder="+84 912 345 678"
              maxLength={MAX_PHONE_LENGTH}
            />
            {errors.phone && (
              <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
            )}
          </div>

          {/* Preferred Date */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-white/90">
              Preferred Date <span className="text-white/50 text-[10px]">(Optional)</span>
            </label>
            <input
              value={date}
              onChange={(e) => setDate(e.target.value)}
              type="date"
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition"
              placeholder="Select a date"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block text-xs font-semibold mb-1.5 text-white/90">
              Message (Optional)
            </label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition h-20 resize-none"
              placeholder="Do you have any questions for us?"
              maxLength={MAX_MESSAGE_LENGTH}
            />
            <p className="text-white/40 text-xs mt-1">
              {message.length}/{MAX_MESSAGE_LENGTH}
            </p>
          </div>

          {/* Submit Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full py-2.5 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Sending...' : 'Register Now'}
            </button>
          </div>
        </form>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={() => setShowSuccessModal(false)}
        autoCloseDuration={5000}
      />
    </>
  )
}
