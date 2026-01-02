'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageZoomModal from '../components/ImageZoomModal'
import { getArtists, getPageContent } from '../../../lib/queries'
import { ArtistCardSkeleton } from '../components/SkeletonLoader'

export default function ArtistsPage() {
  const [artists, setArtists] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedArtist, setSelectedArtist] = useState<number | null>(null)
  const [portfolioModal, setPortfolioModal] = useState<number | null>(null)
  const [selectedPortfolioImage, setSelectedPortfolioImage] = useState(0)
  const [fullscreenZoom, setFullscreenZoom] = useState(false)
  const [pageContent, setPageContent] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsData, pageData] = await Promise.all([
          getArtists(),
          getPageContent('artists')
        ])
        setArtists(artistsData)
        setPageContent(pageData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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



  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          {pageContent?.heroVideo ? (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={pageContent.heroVideo.url} type="video/mp4" />
            </video>
          ) : (
            <Image
              src={pageContent?.heroImage?.url || '/img/Chu A tach nen.png'}
              alt="Artists Hero"
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/30"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            {pageContent?.heroTitle || 'Our Artists'}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8">
            {pageContent?.heroDescription || 'Meet the talented artists behind A Little Ink. Each brings unique expertise, passion, and years of experience to every design.'}
          </p>
        </div>
      </section>

      {/* Artists Grid */}
      <section className="px-4 py-20">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold text-black mb-16 text-center">Meet Our Team</h2>
          {loading ? (
            <div className="flex flex-col gap-24">
              <ArtistCardSkeleton />
              <ArtistCardSkeleton isReversed={true} />
              <ArtistCardSkeleton />
            </div>
          ) : (
            <div className="flex flex-col gap-24">
              {artists.map((artist: any, idx: number) => (
                <div key={idx}>
                  <div
                    id={`artist-${idx}`}
                    className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                  >
                    {/* Image Section */}
                    <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                      <div className="relative group">
                        <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 aspect-[4/5] shadow-lg">
                          <Image
                            src={artist.image?.url || '/img/A.Tuan.jpg'}
                            alt={artist.name}
                            fill
                            className="object-cover group-hover:scale-110 transition duration-500"
                            sizes="(max-width: 1024px) 100vw, 50vw"
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

                        <div className="text-xl text-gray-700 mb-6 leading-relaxed">
                          <div dangerouslySetInnerHTML={{ __html: artist.description?.html || artist.description }} />
                        </div>

                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-3 text-black">Specialty</h3>
                          <p className="text-gray-700">{artist.specialty}</p>
                        </div>

                        <div className="mb-6">
                          <h3 className="text-lg font-semibold mb-3 text-black">Achievements</h3>
                          <div className="flex flex-wrap gap-2">
                            {artist.achievements?.map((achievement: any, aIdx: number) => (
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
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                              </svg>
                              Instagram
                            </a>
                          )}

                        </div>
                      </div>
                    </div>

                    {/* Portfolio Gallery - Horizontal Scroll */}
                    <div className={`lg:col-span-2 ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                      <h3 className="text-2xl font-bold mb-6 text-black">Portfolio</h3>
                      <div className="flex flex-nowrap overflow-x-auto gap-4 py-2 scroll-smooth scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200">
                        {artist.portfolio?.map((img: any, imgIdx: number) => (
                          <div
                            key={imgIdx}
                            className="relative w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer border-2 border-gray-200 hover:border-black transition shadow-md"
                            onClick={() => {
                              setPortfolioModal(idx)
                              setSelectedPortfolioImage(imgIdx)
                            }}
                          >
                            <Image
                              src={img.url || img}
                              alt={`${artist.name} portfolio ${imgIdx + 1}`}
                              fill
                              className="object-cover group-hover:scale-110 transition duration-300"
                              sizes="192px"
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300 flex items-center justify-center">
                              <span className="text-white text-sm font-semibold">View</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  {idx < artists.length - 1 && (
                    <div className="flex items-center justify-center mt-24 opacity-30">
                      <div className="h-px bg-black w-full max-w-xs"></div>
                      <span className="mx-4 text-xl tracking-widest">✦</span>
                      <div className="h-px bg-black w-full max-w-xs"></div>
                    </div>
                  )}
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
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4"
          onClick={() => setPortfolioModal(null)}
        >
          <div
            className="w-full max-w-7xl h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-lg p-4 sm:p-6 flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between mb-4 flex-shrink-0">
                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black truncate">
                  {artists[portfolioModal].name} - Portfolio
                </h2>
                <button
                  onClick={() => setPortfolioModal(null)}
                  className="text-black hover:text-gray-600 text-3xl font-bold w-10 h-10 flex items-center justify-center flex-shrink-0"
                >
                  ×
                </button>
              </div>

              {/* Main Content - Responsive layout */}
              <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
                {/* Main Image */}
                <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative">
                  <img
                    src={artists[portfolioModal].portfolio?.[selectedPortfolioImage]?.url || artists[portfolioModal].portfolio?.[selectedPortfolioImage] || '/img/Chu A tach nen.png'}
                    alt={`Portfolio ${selectedPortfolioImage + 1}`}
                    className="max-w-full max-h-full object-contain cursor-zoom-in"
                    onClick={() => setFullscreenZoom(true)}
                    onError={(e) => { (e.target as HTMLImageElement).src = '/img/Chu A tach nen.png' }}
                  />
                </div>

                {/* Thumbnail Grid - Horizontal on mobile, Vertical on desktop */}
                {/* Mobile: horizontal scroll below */}
                <div className="md:hidden w-full h-24 flex-shrink-0 overflow-x-auto">
                  <div className="flex gap-2 h-full">
                    {artists[portfolioModal].portfolio?.map((img: any, imgIdx: number) => (
                      <button
                        key={imgIdx}
                        onClick={() => setSelectedPortfolioImage(imgIdx)}
                        className={`h-full aspect-square flex-shrink-0 rounded-lg overflow-hidden border-2 transition ${selectedPortfolioImage === imgIdx
                          ? 'border-black ring-2 ring-black/50'
                          : 'border-gray-300 hover:border-black'
                          }`}
                      >
                        <img
                          src={img.url || img}
                          alt={`Thumbnail ${imgIdx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/img/Chu A tach nen.png' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                {/* Desktop: vertical sidebar on right */}
                <div className="hidden md:block w-32 lg:w-40 flex-shrink-0 overflow-y-auto">
                  <div className="grid grid-cols-1 gap-3">
                    {artists[portfolioModal].portfolio?.map((img: any, imgIdx: number) => (
                      <button
                        key={imgIdx}
                        onClick={() => setSelectedPortfolioImage(imgIdx)}
                        className={`aspect-square rounded-lg overflow-hidden border-2 transition ${selectedPortfolioImage === imgIdx
                          ? 'border-black ring-2 ring-black/50'
                          : 'border-gray-300 hover:border-black'
                          }`}
                      >
                        <img
                          src={img.url || img}
                          alt={`Thumbnail ${imgIdx + 1}`}
                          className="w-full h-full object-cover"
                          onError={(e) => { (e.target as HTMLImageElement).src = '/img/Chu A tach nen.png' }}
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Image Zoom Modal */}
      {portfolioModal !== null && (
        <ImageZoomModal
          imageUrl={artists[portfolioModal].portfolio?.[selectedPortfolioImage]?.url || artists[portfolioModal].portfolio?.[selectedPortfolioImage] || '/img/Chu A tach nen.png'}
          altText={`${artists[portfolioModal].name} - Portfolio ${selectedPortfolioImage + 1}`}
          isOpen={fullscreenZoom}
          onClose={() => setFullscreenZoom(false)}
        />
      )}

      <Footer id="main-footer" />
    </div>
  )
}
