'use client'

import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect, useState, useRef } from 'react'
import BookingForm from './components/BookingForm'
import './featured-gallery.css'
import ImageZoomModal from './components/ImageZoomModal'
import { getArtists, getFeaturedTattoos, getHomepageData } from '../../lib/queries'
import { motion } from 'framer-motion'
import { ArtistCardSkeleton, TattooGridSkeleton } from './components/SkeletonLoader'

export default function Home() {
  const [scrollY, setScrollY] = useState(0)
  const [artists, setArtists] = useState<any[]>([])
  const [featuredTattoos, setFeaturedTattoos] = useState<any[]>([])
  const [homepageData, setHomepageData] = useState<any>(null)
  const [loading, setLoading] = useState(true)
  const [selectedTattoo, setSelectedTattoo] = useState<any>(null)
  const [shouldLoadBookingVideo, setShouldLoadBookingVideo] = useState(false)
  const bookingRef = useRef<HTMLElement>(null)

  // Fetch data from Hygraph on mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [artistsData, tattoosData, homeData] = await Promise.all([
          getArtists(),
          getFeaturedTattoos(),
          getHomepageData()
        ])
        setArtists(artistsData)
        setFeaturedTattoos(tattoosData)
        setHomepageData(homeData)
      } catch (error) {
        console.error('Error fetching homepage data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  // Handle scroll to booking parameter for Safari/iOS reliability
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search)
      if (urlParams.get('scroll') === 'booking' && bookingRef.current) {
        // Wait a bit for other elements (images, videos) to settle
        const timer = setTimeout(() => {
          bookingRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
          // Clean up URL without reloading
          const newUrl = window.location.pathname
          window.history.replaceState({}, '', newUrl)
        }, 1000)
        return () => clearTimeout(timer)
      }
    }
  }, [loading])
  // Handle scroll for hero logo animation and booking video lazy loading
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener('scroll', handleScroll)

    // Intersection Observer for lazy loading booking video
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !shouldLoadBookingVideo) {
            setShouldLoadBookingVideo(true)
          }
        })
      },
      { rootMargin: '200px' } // Start loading 200px before section is visible
    )

    if (bookingRef.current) {
      observer.observe(bookingRef.current)
    }

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (bookingRef.current) {
        observer.unobserve(bookingRef.current)
      }
    }
  }, [shouldLoadBookingVideo])

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeOut" } }
  }

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  }

  const popIn = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { type: "spring", stiffness: 100 } }
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />

      {/* Hero Section with Video Background - matching legacy layout */}
      <section id="vd_Heading" className="relative">
        {/* Video Background or Image Fallback */}
        {homepageData?.heroVideo?.url ? (
          <video
            key={homepageData.heroVideo.url}
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-screen object-cover"
          >
            <source src={homepageData.heroVideo.url} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        ) : (
          <div className="w-full h-screen bg-black flex items-center justify-center">
            <img
              src="/img/Chu A tach nen.png"
              alt="Background"
              className="w-64 h-auto opacity-50"
            />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        {/* Content - Center Logo (matching legacy positioning) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <Image
            src="/img/Chu A tach nen.png"
            alt="A Little Ink Logo"
            id="hero-logo"
            width={128}
            height={128}
            priority
            className="w-32 h-auto transition-all duration-1000"
            style={{
              transform: scrollY > 100
                ? `translateY(${Math.min(scrollY - 100, window.innerHeight * 0.4)}px) scale(${Math.max(0.3, 1 - (scrollY - 100) / 1000)})`
                : 'none',
              opacity: scrollY > 100 ? Math.max(0, 1 - (scrollY - 100) / 500) : 1
            }}
          />
        </div>
      </section>

      {/* Welcome Section with Image + Text - full screen */}
      <section className="relative min-h-screen w-full overflow-x-hidden scroll-section flex items-center">
        <div className="absolute inset-0">
          {homepageData?.welcomeImage?.url ? (
            <Image
              src={homepageData.welcomeImage.url}
              alt="Tattoo Studio"
              fill
              className="object-cover"
              sizes="100vw"
            />
          ) : (
            <Image
              src="/img/Chu A tach nen.png"
              alt="Tattoo Studio"
              fill
              className="object-cover"
              sizes="100vw"
            />
          )}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 w-full py-12 lg:py-0 px-4 sm:px-6 lg:px-0">
          <div className="w-full max-w-7xl mx-auto">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2">
              <div className="hidden lg:block" />
              <div className="flex items-center">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, margin: "-100px" }}
                  variants={fadeInUp}
                  className="space-y-4 sm:space-y-6 text-white"
                >
                  <h2 className="text-4xl lg:text-5xl font-bold hover:scale-105 transition-transform duration-300 cursor-default">
                    Welcome to Tattoo in Saigon, Vietnam
                  </h2>
                  <p className="text-white-700 max-w-xl leading-relaxed hover:text-white transition-colors duration-300 cursor-default">
                    David T Tattooist được thành lập từ những nghệ sĩ xăm tài năng đến từ nhiều miền khác nhau.
                    Với nhiều năm kinh nghiệm và giải thưởng trong nghề, chúng tôi mang đến những hình xăm độc đáo và ý nghĩa,
                    chăm chút tỉ mỉ bởi các nghệ sĩ của David T Tattooist.
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section - Alternating Fullbleed Layout (Like Legacy) */}
      <section className="py-0 px-0 bg-white">
        <div className="w-full max-w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-4xl font-bold text-center px-4 py-8 text-black"
          >
            Artists
          </motion.h2>

          {loading ? (
            // Skeleton loaders for artists
            <div>
              <ArtistCardSkeleton isReversed={false} />
              <ArtistCardSkeleton isReversed={true} />
              <ArtistCardSkeleton isReversed={false} />
            </div>
          ) : artists.length > 0 ? (
            artists.map((artist: any, index: number) => (
              <div
                key={artist.id}
                id={`artist-${artist.id}`}
                className="mb-0"
              >
                <div className={`flex flex-col lg:flex-row mb-16 gap-0 items-stretch overflow-hidden ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                  {/* Image - Full bleed */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    variants={index % 2 === 0 ? slideInLeft : slideInRight}
                    className="w-full lg:w-2/3 lg:h-[600px] h-[500px] overflow-hidden flex-shrink-0 relative"
                  >
                    <Image
                      src={artist.image?.url || '/img/A.Tuan.jpg'}
                      alt={artist.name}
                      fill
                      className="object-cover hover:scale-105 transition duration-300"
                      sizes="(max-width: 1024px) 100vw, 66vw"
                    />
                  </motion.div>

                  {/* Text Content */}
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: false, margin: "-100px" }}
                    variants={index % 2 === 0 ? slideInRight : slideInLeft}
                    className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:px-8 py-0 bg-white"
                  >
                    {/* Content ở trên */}
                    <div className="max-w-lg space-y-12">
                      <h3 className="text-4xl lg:text-5xl font-bold text-black hover:scale-105 transition-transform duration-300">{artist.name}</h3>
                      <div className="text-gray-700 leading-relaxed text-justify lg:text-lg hover:text-black transition-colors duration-300" dangerouslySetInnerHTML={{ __html: artist.description?.html || artist.description }}></div>
                      <div className="pt-6 space-y-3 border-t border-gray-300">
                        {artist.email && (
                          <p className="text-gray-600 hover:text-black transition-colors">
                            <span className="text-black font-semibold">Email:</span> {artist.email}
                          </p>
                        )}
                        <p className="text-gray-600 hover:text-black transition-colors">
                          <span className="text-black font-semibold">Specialty:</span> {artist.specialty}
                        </p>
                      </div>
                    </div>

                    {/* Button ở dưới cùng bên phải */}
                    <div className="flex justify-end mt-8">
                      <Link
                        href={`/artists#artist-${artist.id}`}
                        className="inline-block px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition transform hover:scale-105"
                      >
                        See more
                      </Link>
                    </div>
                  </motion.div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 py-8">No artists found.</p>
          )}
        </div>
      </section>

      {/* Horizontal Scrolling Marquee */}
      <section className="w-full overflow-hidden bg-black py-4">
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {Array(20).fill(null).map((_, idx) => (
              <span key={idx} className="marquee-item text-white text-2xl font-bold mx-8">
                ✦ EXPLORE OUR GALLERY ✦
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery - Title + Grid Layout */}
      <section className="py-4 px-0 bg-white scroll-section overflow-hidden">
        <div className="w-full max-w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6 }}
            className="text-5xl md:text-6xl font-black text-center px-4 py-12 text-black uppercase tracking-tighter"
          >
            Top Collections
          </motion.h2>

          {/* Row 1: Black & White */}
          <div className="mb-0 scroll-section">
            {/* Title + divider row */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="px-4 flex items-center gap-4 mb-8"
            >
              <div className="h-8 w-1 bg-black flex-shrink-0"></div>
              <h3 className="text-2xl font-bold text-black uppercase tracking-wider whitespace-nowrap">Black &amp; White</h3>
            </motion.div>

            {/* 4 Images Grid - Full width, no gap */}
            {loading ? (
              <TattooGridSkeleton count={4} />
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full max-w-full overflow-hidden"
              >
                {featuredTattoos.filter((t: any) => t.type === 'BlackWhite').map((tattoo: any, idx: number) => (
                  <motion.div
                    key={tattoo.id}
                    variants={popIn}
                    className="group relative overflow-hidden cursor-pointer h-[400px] sm:h-[450px] md:h-[500px]"
                    onClick={() => setSelectedTattoo(tattoo)}
                  >
                    <Image
                      src={tattoo.image?.url || '/img/Chu A tach nen.png'}
                      alt={tattoo.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                    {/* View Button (Centered) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                      <span className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                        VIEW
                      </span>
                    </div>

                    {/* Content (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap gap-2 mb-2 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 delay-75">
                          {(Array.isArray(tattoo.style)
                            ? tattoo.style
                            : (tattoo.style || '').split(/(?=[A-Z])/).filter((s: string) => s.trim().length > 0)
                          ).map((style: string, i: number) => (
                            <span key={i} className="text-[10px] font-bold text-black bg-white/90 px-2 py-1 rounded-sm uppercase tracking-widest">
                              {style}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                          {tattoo.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          {/* Row 2: Color */}
          <div className="my-8 scroll-section">
            {/* Title + divider row */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.6 }}
              className="px-4 flex items-center gap-4 mb-8"
            >
              <div className="h-8 w-1 bg-black flex-shrink-0"></div>
              <h3 className="text-2xl font-bold text-black uppercase tracking-wider whitespace-nowrap">Color</h3>
            </motion.div>

            {/* 4 Images Grid - Full width, no gap */}
            {loading ? (
              <TattooGridSkeleton count={4} />
            ) : (
              <motion.div
                variants={staggerContainer}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, margin: "-50px" }}
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full max-w-full overflow-hidden"
              >
                {featuredTattoos.filter((t: any) => t.type === 'Color').map((tattoo: any, idx: number) => (
                  <motion.div
                    key={tattoo.id}
                    variants={popIn}
                    className="group relative overflow-hidden cursor-pointer h-[400px] sm:h-[450px] md:h-[500px]"
                    onClick={() => setSelectedTattoo(tattoo)}
                  >
                    <Image
                      src={tattoo.image?.url || '/img/Chu A tach nen.png'}
                      alt={tattoo.name}
                      fill
                      className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                      sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                    />

                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>

                    {/* View Button (Centered) */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                      <span className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                        VIEW
                      </span>
                    </div>

                    {/* Content (Bottom) */}
                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                      <div className="overflow-hidden">
                        <div className="flex flex-wrap gap-2 mb-2 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 delay-75">
                          {(Array.isArray(tattoo.style)
                            ? tattoo.style
                            : (tattoo.style || '').split(/(?=[A-Z])/).filter((s: string) => s.trim().length > 0)
                          ).map((style: string, i: number) => (
                            <span key={i} className="text-[10px] font-bold text-black bg-white/90 px-2 py-1 rounded-sm uppercase tracking-widest">
                              {style}
                            </span>
                          ))}
                        </div>
                        <h3 className="text-2xl font-bold text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">
                          {tattoo.name}
                        </h3>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>

          <div className="text-center mt-0 px-4">
            <Link
              href="/gallery"
              className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition inline-block"
            >
              View All Designs
            </Link>
          </div>
        </div>
      </section >


      {/* Discover Tattoo Artistry Section - full screen with booking form filling height */}
      <section ref={bookingRef} id="booking" className="relative min-h-screen w-full overflow-x-hidden bg-black/85 scroll-section flex items-center py-12 lg:py-0">
        {/* Video Background or Image Fallback - Lazy Loaded */}
        {
          shouldLoadBookingVideo && homepageData?.bookingVideo?.url ? (
            <video
              key={homepageData.bookingVideo.url}
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            >
              <source src={homepageData.bookingVideo.url} type="video/mp4" />
            </video>
          ) : (
            <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
              <Image
                src="/img/Chu A tach nen.png"
                alt="Background"
                width={256}
                height={256}
                className="w-64 h-auto opacity-20"
              />
            </div>
          )
        }

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-0">
          <div className="w-full max-w-7xl mx-auto">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
              {/* Left Content - vertically centered */}
              <div className="flex items-center lg:p-16">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={slideInLeft}
                  className="space-y-4 sm:space-y-6 text-white"
                >
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold">Discover Tattoo Artistry With Us</h2>
                  <p className="text-gray-200 max-w-xl leading-relaxed text-sm sm:text-base">
                    Welcome to our in-depth tattoo course, where you'll gain knowledge from basic to advanced levels,
                    taught by leading artists. From drawing techniques and machine usage to safety and hygiene protocols,
                    we are committed to providing a professional and inspiring learning environment.
                  </p>
                  <p className="text-gray-200 font-semibold text-sm sm:text-base">Start your journey to becoming a true tattoo artist today!</p>
                </motion.div>
              </div>

              {/* Booking Form - Right Side (compact) */}
              <div className="flex items-center justify-center lg:p-12">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false }}
                  variants={slideInRight}
                  className="w-full max-w-md"
                >
                  <BookingForm className="w-full" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section >

      {/* Tattoo Zoom Modal */}
      {
        selectedTattoo && (
          <ImageZoomModal
            imageUrl={selectedTattoo.image?.url || '/img/Chu A tach nen.png'}
            altText={selectedTattoo.name}
            isOpen={!!selectedTattoo}
            onClose={() => setSelectedTattoo(null)}
          />
        )
      }

      <Footer id="main-footer" />
    </div >
  )
}
