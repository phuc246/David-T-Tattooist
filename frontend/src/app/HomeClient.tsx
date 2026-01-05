'use client'

import Link from 'next/link'
import Image from 'next/image'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useSearchParams, usePathname, useRouter } from 'next/navigation'
import { useEffect, useState, useRef, Suspense } from 'react'
import dynamic from 'next/dynamic'
import './featured-gallery.css'
const BookingForm = dynamic(() => import('./components/BookingForm'), {
  ssr: false,
  loading: () => <div className="h-[600px] bg-gray-50 animate-pulse rounded-lg" />
})
const ImageZoomModal = dynamic(() => import('./components/ImageZoomModal'), { ssr: false })
import { motion } from 'framer-motion'
import { ArtistCardSkeleton, TattooGridSkeleton } from './components/SkeletonLoader'
import IntroLoader from './components/IntroLoader'

interface HomeClientProps {
  initialArtists: any[]
  initialFeaturedTattoos: any[]
  initialHomepageData: any
}

function HomeContent({
  initialArtists,
  initialFeaturedTattoos,
  initialHomepageData
}: HomeClientProps) {
  const [scrollY, setScrollY] = useState(0)
  const [artists] = useState(initialArtists)
  const [featuredTattoos] = useState(initialFeaturedTattoos)
  const [homepageData] = useState(initialHomepageData)
  const [selectedTattoo, setSelectedTattoo] = useState<any>(null)
  const [isHeroVideoReady, setIsHeroVideoReady] = useState(false)

  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const bookingRef = useRef<HTMLElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Handle scroll to booking parameter for Safari/iOS reliability
  useEffect(() => {
    const scrollParam = searchParams.get('scroll')
    if (scrollParam === 'booking' && bookingRef.current) {
      const timer = setTimeout(() => {
        bookingRef.current?.scrollIntoView({ behavior: 'auto', block: 'start' })

        // Clean up URL without triggering re-render if possible, or use router
        const params = new URLSearchParams(searchParams.toString())
        params.delete('scroll')
        const newUrl = params.toString() ? `${pathname}?${params.toString()}` : pathname
        window.history.replaceState({}, '', newUrl)
      }, 100)
      return () => clearTimeout(timer)
    }
  }, [searchParams, pathname])

  // Handle scroll for hero logo animation
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }
    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  // Force play for Safari/mobile and handle loader timeout
  // Optimize IntroLoader: Show content quickly (max 2.5s) instead of waiting for heavy video
  useEffect(() => {
    // If video is present, try to play it
    if (homepageData?.heroVideo?.url && homepageData.heroVideo.mimeType?.includes('video') && videoRef.current) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          console.log("Autoplay prevented:", error)
        });
      }
    }

    // Always reveal content after a short delay (2.5s max), regardless of video state
    // This ensures the site feels "instant" even on slow 3G connections
    const timer = setTimeout(() => {
      setIsHeroVideoReady(true)
    }, 2500)

    return () => clearTimeout(timer)
  }, [homepageData?.heroVideo?.url])

  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const slideInLeft = {
    hidden: { opacity: 0, x: -60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
  }

  const slideInRight = {
    hidden: { opacity: 0, x: 60 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6, ease: "easeOut" } }
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
      <IntroLoader isLoading={!isHeroVideoReady} />
      <Navbar />

      {/* Hero Section with Video Background */}
      <section id="vd_Heading" className="relative h-screen">
        {homepageData?.heroVideo?.url ? (
          homepageData.heroVideo.mimeType?.includes('video') ? (
            <video
              ref={videoRef}
              key={homepageData.heroVideo.url}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              poster={homepageData.heroImage?.url || '/img/Chu A tach nen.png'} // Instant visual fallback
              onPlaying={() => setIsHeroVideoReady(true)}
              disableRemotePlayback
              className="w-full h-full object-cover transition-opacity duration-1000"
              style={{ willChange: 'transform', opacity: isHeroVideoReady ? 1 : 0 }} // Fade in when ready
            >
              <source src={homepageData.heroVideo.url} type={homepageData.heroVideo.mimeType} />
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full relative">
              <Image
                src={homepageData.heroVideo.url}
                alt="Hero Background"
                fill
                className="object-cover"
                priority
              />
            </div>
          )
        ) : (
          <div className="w-full h-full bg-black flex items-center justify-center">
            <Image
              src="/img/Chu A tach nen.png"
              alt="Background"
              className="opacity-50"
              width={256}
              height={256}
              priority
              style={{ width: '16rem', height: 'auto' }}
            />
          </div>
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        {/* Content - Center Logo */}
        <div className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none">
          <Image
            src="/img/Chu A tach nen.png"
            alt="A Little Ink Logo"
            id="hero-logo"
            width={128}
            height={128}
            priority
            className="w-32 h-auto transition-all duration-1000"
            style={{
              width: '8rem',
              height: 'auto',
              transform: scrollY > 100
                ? `translateY(${Math.min(scrollY - 100, (typeof window !== 'undefined' ? window.innerHeight : 800) * 0.4)}px) scale(${Math.max(0.3, 1 - (scrollY - 100) / 1000)})`
                : 'none',
              opacity: scrollY > 100 ? Math.max(0, 1 - (scrollY - 100) / 500) : 1,
              willChange: "transform, opacity"
            }}
          />
        </div>
      </section>

      {/* Welcome Section */}
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
                  viewport={{ once: false, amount: 0.1, margin: "-100px" }}
                  variants={fadeInUp}
                  style={{ willChange: "transform, opacity" }}
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

      {/* Artists Section */}
      <section className="py-0 px-0 bg-white">
        <div className="w-full max-w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, amount: 0.1 }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform, opacity" }}
            className="text-4xl font-bold text-center px-4 py-8 text-black"
          >
            Artists
          </motion.h2>

          <div className="w-full max-w-full">
            {artists.length > 0 ? (
              artists.map((artist: any, index: number) => (
                <div
                  key={artist.id}
                  id={`artist-${artist.id}`}
                  className="mb-0"
                >
                  <div className={`flex flex-col lg:flex-row mb-16 gap-0 items-stretch overflow-hidden ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.1, margin: "-100px" }}
                      variants={index % 2 === 0 ? slideInLeft : slideInRight}
                      style={{ willChange: "transform, opacity" }}
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

                    <motion.div
                      initial="hidden"
                      whileInView="visible"
                      viewport={{ once: false, amount: 0.1, margin: "-100px" }}
                      variants={index % 2 === 0 ? slideInRight : slideInLeft}
                      style={{ willChange: "transform, opacity" }}
                      className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:px-8 py-0 bg-white"
                    >
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
        </div>
      </section>

      {/* Marquee */}
      <section className="w-full overflow-hidden bg-black py-4">
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {Array(20).fill(null).map((_, idx) => (
              <span key={idx} className="marquee-item text-white text-lg sm:text-xl md:text-2xl font-bold mx-4 sm:mx-8">
                ✦ EXPLORE OUR GALLERY ✦
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery */}
      <section className="py-4 px-0 bg-white scroll-section overflow-hidden">
        <div className="w-full max-w-full">
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ willChange: "transform, opacity" }}
            className="text-3xl sm:text-5xl md:text-6xl font-black text-center px-4 py-8 sm:py-12 text-black uppercase tracking-tighter"
          >
            Top Collections
          </motion.h2>

          {/* Row 1: Black & White */}
          <div className="mb-0 scroll-section">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ willChange: "transform, opacity" }}
              className="px-4 flex items-center gap-4 mb-8"
            >
              <div className="h-8 w-1 bg-black flex-shrink-0"></div>
              <h3 className="text-2xl font-bold text-black uppercase tracking-wider whitespace-nowrap">Black &amp; White</h3>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              style={{ willChange: "transform, opacity" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full max-w-full overflow-hidden"
            >
              {featuredTattoos.filter((t: any) => t.type === 'BlackWhite').map((tattoo: any) => (
                <motion.div
                  key={tattoo.id}
                  variants={popIn}
                  className="group relative overflow-hidden cursor-pointer h-[400px] sm:h-[450px] md:h-[500px]"
                  onClick={() => setSelectedTattoo(tattoo)}
                >
                  <Image
                    src={tattoo.image?.url || '/img/chu A do.png'}
                    alt={tattoo.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                    <span className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                      VIEW
                    </span>
                  </div>
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
          </div>

          {/* Row 2: Color */}
          <div className="my-8 scroll-section">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              style={{ willChange: "transform, opacity" }}
              className="px-4 flex items-center gap-4 mb-8"
            >
              <div className="h-8 w-1 bg-black flex-shrink-0"></div>
              <h3 className="text-2xl font-bold text-black uppercase tracking-wider whitespace-nowrap">Color</h3>
            </motion.div>

            <motion.div
              variants={staggerContainer}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              style={{ willChange: "transform, opacity" }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full max-w-full overflow-hidden"
            >
              {featuredTattoos.filter((t: any) => t.type === 'Color').map((tattoo: any) => (
                <motion.div
                  key={tattoo.id}
                  variants={popIn}
                  className="group relative overflow-hidden cursor-pointer h-[400px] sm:h-[450px] md:h-[500px]"
                  onClick={() => setSelectedTattoo(tattoo)}
                >
                  <Image
                    src={tattoo.image?.url || '/img/chu A do.png'}
                    alt={tattoo.name}
                    fill
                    className="object-cover group-hover:scale-110 transition duration-700 ease-in-out"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100">
                    <span className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold tracking-widest hover:bg-white hover:text-black transition-colors">
                      VIEW
                    </span>
                  </div>
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
          </div>

          <div className="text-center mt-0 px-4">
            <Link
              href="/gallery#collections"
              className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition inline-block"
            >
              View All Designs
            </Link>
          </div>
        </div>
      </section>

      {/* Booking Section */}
      <section ref={bookingRef} id="booking" className="relative min-h-screen w-full overflow-x-hidden bg-black/85 scroll-section flex items-center py-12 lg:py-0">
        {homepageData?.bookingVideo?.url ? (
          homepageData.bookingVideo.mimeType?.includes('video') ? (
            <video
              key={homepageData.bookingVideo.url}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
              poster={homepageData.welcomeImage?.url || '/img/Chu A tach nen.png'}
              disableRemotePlayback
              className="absolute inset-0 w-full h-full object-cover opacity-30"
            >
              <source src={homepageData.bookingVideo.url} type={homepageData.bookingVideo.mimeType} />
            </video>
          ) : (
            <div className="absolute inset-0 w-full h-full">
              <Image
                src={homepageData.bookingVideo.url}
                alt="Booking Background"
                fill
                className="object-cover opacity-30"
              />
            </div>
          )
        ) : (
          <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
            <Image
              src="/img/chu A do.png"
              alt="Background"
              width={256}
              height={256}
              className="w-64 h-auto opacity-20"
              style={{ width: '16rem', height: 'auto' }}
            />
          </div>
        )}

        <div className="relative z-10 w-full px-4 sm:px-6 lg:px-0">
          <div className="w-full max-w-7xl mx-auto">
            <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0">
              <div className="flex items-center lg:p-16">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  variants={slideInLeft}
                  style={{ willChange: "transform, opacity" }}
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

              <div className="flex items-center justify-center lg:p-12">
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: false, amount: 0.1 }}
                  variants={slideInRight}
                  style={{ willChange: "transform, opacity" }}
                  className="w-full max-w-md"
                >
                  <BookingForm className="w-full" />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tattoo Zoom Modal */}
      {selectedTattoo && (
        <ImageZoomModal
          imageUrl={selectedTattoo.image?.url || '/img/chu A do.png'}
          altText={selectedTattoo.name}
          isOpen={!!selectedTattoo}
          onClose={() => setSelectedTattoo(null)}
        />
      )}

      <Footer id="main-footer" />
    </div>
  )
}

export default function HomeClient(props: HomeClientProps) {
  return (
    <Suspense fallback={null}>
      <HomeContent {...props} />
    </Suspense>
  )
}
