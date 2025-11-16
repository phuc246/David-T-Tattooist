'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function ArtistsPage() {
  const [artists, setArtists] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArtist, setSelectedArtist] = useState<number | null>(null)
  const [portfolioModal, setPortfolioModal] = useState<number | null>(null)
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState(0)

  useEffect(() => {
    const fetchArtists = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products')
        if (res.ok) {
          const products = await res.json()
          const uniqueArtists = [...new Set(products.map((p: any) => p.artist))].filter(Boolean)
          setArtists(uniqueArtists as string[])
        }
      } catch (error) {
        console.error('Error fetching artists:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchArtists()
  }, [])

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

  const artistProfiles = [
    {
      name: 'David T Tattooist',
      role: 'Master Tattoo Artist & Founder',
      specialty: 'Black & White, Realistic, Traditional',
      experience: '15+ years',
      image: '/img/A.Tuan.jpg',
      instagram: 'https://www.instagram.com/ata.tattooer/',
      description: 'David T Tattooist được thành lập từ những nghệ sĩ xăm tài năng đến từ nhiều miền khác nhau. Với những trải nghiệm xăm nhiều năm kinh nghiệm và dạy nghề giải thưởng lớn khác nhau. Chúng tôi mong muốn mang đến bạn những hình xăm độc đáo và ý nghĩa.',
      portfolio: ['/img/all1.jpg', '/img/all2.jpg', '/img/all3.jpg', '/img/all4.jpg', '/img/all5.jpg', '/img/all6.jpg'],
      achievements: ['Award Winner 2023', 'Featured in Tattoo Magazine', '15+ Years Experience']
    },
    {
      name: 'Hasaki',
      role: 'Senior Tattoo Artist',
      specialty: 'Color Tattoos, Watercolor, Modern',
      experience: '10+ years',
      image: '/img/Tattoist.jpg',
      instagram: 'https://www.instagram.com/ata.tattooer/',
      description: 'Specializing in vibrant color work and modern tattoo styles. Hasaki brings a unique artistic vision to every piece, combining traditional techniques with contemporary design.',
      portfolio: ['/img/natra1.jpg', '/img/natra2.jpg', '/img/natra3.jpg', '/img/all1.jpg', '/img/all2.jpg', '/img/all3.jpg'],
      achievements: ['Color Specialist', 'Watercolor Expert', '10+ Years Experience']
    },
    {
      name: 'Ricardo',
      role: 'Specialized Tattoo Artist',
      specialty: 'Japanese, Dragons, Geometric',
      experience: '8+ years',
      image: '/img/Tattoist1.jpg',
      instagram: 'https://www.instagram.com/ata.tattooer/',
      description: 'Master of Japanese tattoo traditions and geometric designs. Ricardo combines ancient artistry with modern precision to create stunning, meaningful tattoos.',
      portfolio: ['/img/all4.jpg', '/img/all5.jpg', '/img/all6.jpg', '/img/all1.jpg', '/img/all2.jpg', '/img/all3.jpg'],
      achievements: ['Japanese Style Master', 'Geometric Specialist', '8+ Years Experience']
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 text-black">Our Artists</h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto">
            Meet the talented artists behind A Little Ink. Each brings unique expertise, passion, and years of experience to every design.
          </p>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="px-4 pb-20">
        <div className="max-w-7xl mx-auto">
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-400">Loading artists...</p>
            </div>
          ) : (
            <div className="space-y-24">
              {artistProfiles.map((artist, idx) => (
                <div 
                  key={idx} 
                  id={`artist-${idx}`}
                  className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                >
                  {/* Image Section */}
                  <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="relative group">
                      <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 aspect-[4/5] shadow-lg">
                        <img 
                          src={artist.image} 
                          alt={artist.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                          onError={(e) => {(e.target as HTMLImageElement).src = '/img/A.Tuan.jpg'}}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                      </div>
                      {/* Floating badge */}
                      <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg px-6 py-3 rounded-lg border-2 border-gray-200">
                        <span className="text-black font-semibold">{artist.experience}</span>
                      </div>
                    </div>
                  </div>

                  {/* Info Section */}
                  <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                    <div className="bg-gray-50 p-8 lg:p-12 rounded-lg border-2 border-gray-200 shadow-lg">
                      <div className="mb-6">
                        <span className="px-4 py-2 bg-black text-white rounded-full text-sm font-semibold mb-4 inline-block">
                          {artist.role}
                        </span>
                      </div>
                      
                      <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-black">{artist.name}</h2>
                      
                      <p className="text-xl text-gray-700 mb-6 leading-relaxed">
                        {artist.description}
                      </p>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-black">Specialty</h3>
                        <p className="text-gray-700">{artist.specialty}</p>
                      </div>

                      <div className="mb-6">
                        <h3 className="text-lg font-semibold mb-3 text-black">Achievements</h3>
                        <div className="flex flex-wrap gap-2">
                          {artist.achievements.map((achievement, aIdx) => (
                            <span 
                              key={aIdx}
                              className="px-3 py-1 bg-white border-2 border-gray-300 rounded-full text-sm text-black"
                            >
                              {achievement}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4">
                        {artist.instagram && (
                          <a 
                            href={artist.instagram}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition flex items-center gap-2"
                          >
                            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                            </svg>
                            Instagram
                          </a>
                        )}
                        <button 
                          onClick={() => {
                            setPortfolioModal(idx)
                            setSelectedPortfolioImage(0)
                          }}
                          className="px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition"
                        >
                          View Portfolio
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Portfolio Gallery */}
                  <div className={`lg:col-span-2 ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                    <h3 className="text-2xl font-bold mb-6 text-black">Portfolio</h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                      {artist.portfolio.map((img, imgIdx) => (
                        <div 
                          key={imgIdx}
                          className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer border-2 border-gray-200 hover:border-black transition shadow-md"
                          onClick={() => {
                            setPortfolioModal(idx)
                            setSelectedPortfolioImage(imgIdx)
                          }}
                        >
                          <img 
                            src={img} 
                            alt={`${artist.name} portfolio ${imgIdx + 1}`}
                            className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                            onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                          />
                          <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                            <span className="text-white font-semibold text-sm">View</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 bg-gray-50 border-t-2 border-gray-200">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4 text-black">Ready to Get Inked?</h2>
          <p className="text-gray-700 mb-8 text-lg">
            Book a consultation with one of our talented artists and bring your vision to life
          </p>
          <Link 
            href="/#booking"
            className="inline-block px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold text-lg transition transform hover:scale-105"
          >
            Book a Session
          </Link>
        </div>
      </section>

      {/* Portfolio Modal */}
      {portfolioModal !== null && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
          onClick={() => setPortfolioModal(null)}
        >
          <div 
            className="max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-3xl font-bold text-black">
                  {artistProfiles[portfolioModal].name} - Portfolio
                </h2>
                <button
                  onClick={() => setPortfolioModal(null)}
                  className="text-black hover:text-gray-600 text-2xl font-bold"
                >
                  ×
                </button>
              </div>
              
              <div className="mb-6">
                <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={artistProfiles[portfolioModal].portfolio[selectedPortfolioImage]}
                    alt={`Portfolio ${selectedPortfolioImage + 1}`}
                    className="w-full h-full object-contain"
                    onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {artistProfiles[portfolioModal].portfolio.map((img, imgIdx) => (
                  <button
                    key={imgIdx}
                    onClick={() => setSelectedPortfolioImage(imgIdx)}
                    className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                      selectedPortfolioImage === imgIdx
                        ? 'border-black ring-2 ring-black/50'
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`Thumbnail ${imgIdx + 1}`}
                      className="w-full h-full object-cover"
                      onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                    />
                  </button>
                ))}
              </div>

              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setSelectedPortfolioImage(
                    selectedPortfolioImage > 0 
                      ? selectedPortfolioImage - 1 
                      : artistProfiles[portfolioModal].portfolio.length - 1
                  )}
                  className="px-6 py-2 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition"
                >
                  ← Previous
                </button>
                <span className="text-gray-600">
                  {selectedPortfolioImage + 1} / {artistProfiles[portfolioModal].portfolio.length}
                </span>
                <button
                  onClick={() => setSelectedPortfolioImage(
                    selectedPortfolioImage < artistProfiles[portfolioModal].portfolio.length - 1
                      ? selectedPortfolioImage + 1
                      : 0
                  )}
                  className="px-6 py-2 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition"
                >
                  Next →
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer id="main-footer" />
    </div>
  )
}
