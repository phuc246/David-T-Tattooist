'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])


  const router = useRouter()
  const handleBookingClick = () => {
    try {
      // navigate to home booking anchor
      router.push('/#booking')
    } catch (e) {
      // fallback
      window.location.href = '/#booking'
    }
  }


  return (
    <>
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled ? 'bg-black/80 backdrop-blur-md shadow-lg' : 'bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto px-4 py-4 relative">
          <div className="flex items-center justify-between">
            {/* Left: Menu button (mobile) + Left nav links */}
            <div className="flex items-center gap-4">
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label="Open menu" 
                className="text-white p-2 lg:hidden hover:text-gray-300 transition"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Left nav links for desktop (kept left side) */}
              <div className="hidden lg:flex items-center gap-6 text-white nav-links">
                <Link href="/gallery" className="nav-link hover:text-gray-300 transition text-sm uppercase tracking-wide">Gallery</Link>
                <Link href="/artists" className="nav-link hover:text-gray-300 transition text-sm uppercase tracking-wide">Artists</Link>
                <Link href="/classes" className="nav-link hover:text-gray-300 transition text-sm uppercase tracking-wide">Classes</Link>
                <Link href="/blog" className="nav-link hover:text-gray-300 transition text-sm uppercase tracking-wide">Blog</Link>
              </div>

              {/* spacer - brand is centered absolutely below */}
              <div className="ml-4 lg:ml-0" />
            </div>

            {/* Brand centered absolute */}
            <div className="brand-center pointer-events-none" id="nav-brand">
              <Link href="/" className="brand-text pointer-events-auto text-white font-bold text-2xl lg:text-3xl relative nav-brand-text">
                <span className="relative z-10">A LITTLE INK</span>
                <span 
                  id="logo-mover"
                  className="absolute inset-0 flex items-center justify-center opacity-0 pointer-events-none transition-opacity duration-500"
                  style={{ 
                    transform: 'translateY(0)',
                    transition: 'opacity 0.5s ease'
                  }}
                >
                  <img 
                    src="/img/Chu A tach nen.png" 
                    alt="Logo" 
                    className="h-6 w-auto"
                  />
                </span>
              </Link>
            </div>

            {/* Center brand is handled above; left nav included. nothing here for center */}

            {/* Right: Booking Button */}
            <div className="flex items-center gap-4">
              {/* Booking Button */}
              <button 
                onClick={handleBookingClick}
                className="hidden sm:flex items-center gap-2 px-6 py-2 text-white rounded-lg hover:bg-white hover:text-black transition font-semibold nav-booking-btn"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hidden group-hover:block">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z" fill="currentColor"/>
                </svg>
                Booking
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed top-16 left-0 right-0 bg-black/95 z-40 lg:hidden">
          <div className="flex flex-col gap-4 p-6 text-white">
            <Link href="/gallery" className="hover:text-gray-300 transition text-sm uppercase tracking-wide" onClick={() => setMobileMenuOpen(false)}>Gallery</Link>
            <Link href="/artists" className="hover:text-gray-300 transition text-sm uppercase tracking-wide" onClick={() => setMobileMenuOpen(false)}>Artists</Link>
            <Link href="/classes" className="hover:text-gray-300 transition text-sm uppercase tracking-wide" onClick={() => setMobileMenuOpen(false)}>Classes</Link>
            <Link href="/blog" className="hover:text-gray-300 transition text-sm uppercase tracking-wide" onClick={() => setMobileMenuOpen(false)}>Blog</Link>
          </div>
        </div>
      )}
    </>
  )
}
