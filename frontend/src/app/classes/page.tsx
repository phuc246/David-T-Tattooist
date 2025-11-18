'use client'

import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'

export default function ClassesPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Form submitted:', formData)
    // TODO: Send to backend API
    alert('Thank you! We will contact you soon.')
    setFormData({ name: '', email: '', phone: '', message: '' })
  }

  useEffect(() => {
    // Footer animation observer
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    })

    const footer = document.getElementById('main-footer')
    if (footer) {
      footerObserver.observe(footer)
    }

    return () => {
      footerObserver.disconnect()
    }
  }, [])

  const courses = [
    {
      title: 'Beginner Class',
      duration: '4 weeks',
      description: 'Learn the basics of tattooing including equipment, safety, and design fundamentals.',
      features: ['Equipment basics', 'Safety protocols', 'Design fundamentals', 'Hands-on practice'],
      image: '/img/class.mp4',
      level: 'Beginner'
    },
    {
      title: 'Intermediate Class',
      duration: '8 weeks',
      description: 'Master advanced techniques, color theory, and specialized tattoo styles.',
      features: ['Advanced techniques', 'Color theory', 'Style specialization', 'Portfolio building'],
      image: '/img/all1.jpg',
      level: 'Intermediate'
    },
    {
      title: 'Professional Certification',
      duration: '12 weeks',
      description: 'Become a certified tattoo artist with complete training and real-world experience.',
      features: ['Complete certification', 'Real-world experience', 'Business skills', 'Mentorship program'],
      image: '/img/all2.jpg',
      level: 'Advanced'
    }
  ]

  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />

      {/* Hero Section with Video */}
      <section className="relative pt-24 pb-12 px-4 h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/img/classArt.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/70"></div>

        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">Tattoo Classes & Training</h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8">
            Master the art of tattooing from professional artists with years of experience
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
              <span className="font-semibold">✓ Professional Instructors</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
              <span className="font-semibold">✓ Hands-on Training</span>
            </div>
            <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
              <span className="font-semibold">✓ Certification Program</span>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-20 px-4 bg-white text-black">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">Why Choose Our Classes?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🎨',
                title: 'Expert Instructors',
                description: 'Learn from professional tattoo artists with years of industry experience and award-winning portfolios.'
              },
              {
                icon: '🔧',
                title: 'Modern Equipment',
                description: 'Train with the latest tattoo machines and tools used in professional studios worldwide.'
              },
              {
                icon: '📜',
                title: 'Certification',
                description: 'Receive recognized certification upon completion, helping you start your professional career.'
              }
            ].map((item, idx) => (
              <div key={idx} className="text-center p-8 bg-gray-50 rounded-lg border border-gray-200 hover:shadow-xl transition">
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Courses Section */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center">Our Courses</h2>
          <div className="space-y-12">
            {courses.map((course, idx) => (
              <div 
                key={idx} 
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
              >
                <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                  {course.image.endsWith('.mp4') ? (
                    <div className="relative rounded-lg overflow-hidden aspect-video border border-white/20">
                      <video
                        autoPlay
                        loop
                        muted
                        playsInline
                        className="w-full h-full object-cover"
                      >
                        <source src={course.image} type="video/mp4" />
                      </video>
                    </div>
                  ) : (
                    <div className="relative rounded-lg overflow-hidden aspect-video border border-white/20">
                      <img 
                        src={course.image} 
                        alt={course.title}
                        className="w-full h-full object-cover"
                        onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                      />
                    </div>
                  )}
                </div>
                
                <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-semibold">{course.level}</span>
                      <span className="text-gray-400">{course.duration}</span>
                    </div>
                    <h3 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h3>
                    <p className="text-xl text-gray-300 mb-6">{course.description}</p>
                    
                    <ul className="space-y-3 mb-8">
                      {course.features.map((feature, fIdx) => (
                        <li key={fIdx} className="flex items-center gap-3">
                          <span className="text-white">✓</span>
                          <span className="text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>
                    
                    <div className="flex items-center justify-between mb-6">
                      <button className="px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-black rounded-lg font-semibold transition">
                        Enroll Now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-20 px-4 bg-white text-black">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">Student Work</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['/img/all1.jpg', '/img/all2.jpg', '/img/all3.jpg', '/img/all4.jpg', '/img/all5.jpg', '/img/all6.jpg', '/img/natra1.jpg', '/img/natra2.jpg'].map((img, idx) => (
              <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                <img 
                  src={img} 
                  alt={`Student work ${idx + 1}`}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                  onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                  <span className="text-white font-semibold">View Details</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="py-20 px-4 bg-black text-white">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 backdrop-blur-sm p-12 rounded-lg border border-white/10">
            <h2 className="text-4xl font-bold mb-4 text-center">Register for a Class</h2>
            <p className="text-gray-400 text-center mb-12">Fill out the form below and we'll get back to you soon</p>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-400"
                  placeholder="Your name"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-400"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Phone</label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-400"
                    placeholder="+84 xxx xxxx"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Message</label>
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  rows={4}
                  className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:outline-none focus:ring-2 focus:ring-white/50 text-white placeholder-gray-400"
                  placeholder="Tell us about your interests and which course you're interested in..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-4 border-2 border-white text-white hover:bg-white hover:text-black rounded-lg font-semibold text-lg transition transform hover:scale-105"
              >
                Submit Registration
              </button>
            </form>
          </div>
        </div>
      </section>

      <Footer id="main-footer" />
    </div>
  )
}
