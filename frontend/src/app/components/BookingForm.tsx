'use client'

import React, { useState } from 'react'

type Props = {
  className?: string
}

export default function BookingForm({ className = '' }: Props) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [date, setDate] = useState('')
  const [message, setMessage] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Lightweight local handling for demo purposes
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 2500)
    setName('')
    setEmail('')
    setPhone('')
    setDate('')
    setMessage('')
    alert('Cảm ơn bạn! Chúng tôi sẽ liên hệ sớm.')
  }

  return (
    <div className={`bg-black/60 backdrop-blur-md border border-white/20 rounded-xl p-6 shadow-2xl ${className}`}>
      <h3 className="text-xl font-bold mb-5 text-white">Booking</h3>

      <form onSubmit={handleSubmit} className="space-y-3.5">
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-white/90">Full Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition"
            placeholder="e.g., John Doe"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5 text-white/90">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition"
            placeholder="e.g., email@example.com"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5 text-white/90">Phone</label>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="tel"
            className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition"
            placeholder="e.g., +84 912 345 678"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5 text-white/90">Preferred Date</label>
          <input
            value={date}
            onChange={(e) => setDate(e.target.value)}
            type="date"
            className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition"
            placeholder="Select a date"
            required
          />
        </div>

        <div>
          <label className="block text-xs font-semibold mb-1.5 text-white/90">Message (Optional)</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 rounded-md border border-white/20 bg-white/10 text-white text-sm placeholder-white/50 focus:ring-1 focus:ring-white/50 outline-none transition h-20 resize-none"
            placeholder="Do you have any questions for us?"
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={submitted}
            className="w-full py-2.5 border-2 border-white text-white font-semibold rounded-md hover:bg-white hover:text-black transition disabled:opacity-60"
          >
            {submitted ? 'Sent' : 'Register Now'}
          </button>
        </div>
      </form>
    </div>
  )
}
