'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import CardGallery from '../components/CardGallery'
import ModalProduct from '../components/ModalProduct'
import './gallery.css'
import '../featured-gallery.css'

export default function GalleryPage() {
  const [products, setProducts] = useState<any[]>([])
  const [filtered, setFiltered] = useState<any[]>([])
  const [type, setType] = useState('BlackWhite')
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState<'grid' | 'masonry'>('grid')
  const [displayCount, setDisplayCount] = useState(10) // Default to 10, will update in useEffect
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/products')
        if (res.ok) {
          setProducts(await res.json())
        }
      } catch (error) {
        console.error('Error fetching products:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()

    // Set initial display count based on screen width
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setDisplayCount(5)
      } else {
        setDisplayCount(10)
      }
    }

    // Initial check
    handleResize()

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)

      // Logo animation - lướt xuống như home, không hiển thị trên navbar
      const heroLogo = document.getElementById('gallery-hero-logo')

      if (heroLogo && scrollY > 100) {
        // Apply same animation as home page
        const transform = `translateY(${Math.min(scrollY - 100, window.innerHeight * 0.4)}px) scale(${Math.max(0.3, 1 - (scrollY - 100) / 1000)})`
        heroLogo.style.transform = transform
        heroLogo.style.opacity = String(Math.max(0, 1 - (scrollY - 100) / 500))
      } else if (heroLogo) {
        heroLogo.style.transform = 'none'
        heroLogo.style.opacity = '1'
      }
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call

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
      window.removeEventListener('scroll', handleScroll)
      footerObserver.disconnect()
    }
  }, [scrollY])

  // sample images fallback (30 BW, 20 Color) using available images
  const SAMPLE_PRODUCTS = Array.from({ length: 30 }).map((_, i) => ({
    id: `bw-${i}`,
    name: `BW Design ${i + 1}`,
    image: `/img/all${(i % 6) + 1}.jpg`,
    images: Array.from({ length: 4 }).map((__, j) => `/img/all${((i + j) % 6) + 1}.jpg`),
    type: 'BlackWhite',
    style: 'Minimalist',
    description: 'Sample black & white tattoo from collection'
  })).concat(
    Array.from({ length: 20 }).map((_, i) => ({
      id: `color-${i}`,
      name: `Color Design ${i + 1}`,
      image: `/img/all${((i + 3) % 6) + 1}.jpg`,
      images: Array.from({ length: 4 }).map((__, j) => `/img/all${((i + j + 2) % 6) + 1}.jpg`),
      type: 'Color',
      style: 'Watercolor',
      description: 'Sample color tattoo from collection'
    }))
  )

  useEffect(() => {
    let source = products && products.length > 0 ? products : SAMPLE_PRODUCTS

    // Filter by type
    if (type !== 'all') {
      source = source.filter((p: any) => p.type === type)
    }

    // Filter by search query
    if (searchQuery) {
      source = source.filter((p: any) =>
        p.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.style?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase())
      )
    }

    // Sort
    const sorted = [...source].sort((a: any, b: any) => {
      switch (sortBy) {
        case 'newest':
          return (b.id || 0) - (a.id || 0)
        case 'oldest':
          return (a.id || 0) - (b.id || 0)
        case 'name':
          return (a.name || '').localeCompare(b.name || '')
        default:
          return 0
      }
    })

    setFiltered(sorted.slice(0, displayCount))
  }, [type, products, searchQuery, sortBy, displayCount])

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section - Full screen with video background */}
      <section id="vd_Heading" className="relative w-full h-screen overflow-hidden">
        {/* Fullscreen Background Image */}
        <img
          src="/img/gal3.jpg"
          alt="Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Overlay giữ nguyên */}
        <div className="vd-hero-overlay"></div>

        {/* Logo giữa màn hình – giữ hiệu ứng scroll */}
        <div className="vd-hero-content">
          <img
            id="gallery-hero-logo"
            className="logo-hd w-48 transition-all duration-1000"
            src="/img/Chu A tach nen.png"
            alt="Brand Logo"
            style={{
              transform: scrollY > 100
                ? `translateY(${Math.min(scrollY - 100, window.innerHeight * 0.4)}px) scale(${Math.max(0.3, 1 - (scrollY - 100) / 1000)})`
                : 'none',
              opacity: scrollY > 100 ? Math.max(0, 1 - (scrollY - 100) / 500) : 1
            }}
          />
        </div>
      </section>

      {/* Media Grid Section: Black & White (Left) + Color (Right) */}
      <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-4 relative">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-bold mb-12 text-center text-black">Explore Our Styles</h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Left Side: Black & White */}
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-black mb-2">Black & White</h3>
                <p className="text-gray-600">Timeless elegance in monochrome</p>
              </div>

              {/* Black & White Video */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-black group">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition duration-500"
                >
                  <source src="/img/Video/allClip.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg">
                    <h4 className="text-xl font-bold text-black">Classic Monochrome</h4>
                    <p className="text-gray-700 text-sm mt-1">Bold lines, dramatic shading</p>
                  </div>
                </div>
              </div>

              {/* Black & White Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-black group cursor-pointer">
                <img
                  src="/img/all1.jpg"
                  alt="Black and White Tattoo"
                  className="w-full h-[500px] object-cover grayscale group-hover:grayscale-0 transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg">
                    <h4 className="text-xl font-bold text-black">Fine Line Art</h4>
                    <p className="text-gray-700 text-sm mt-1">Precision and detail</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side: Color */}
            <div className="space-y-6">
              <div className="text-center mb-6">
                <h3 className="text-3xl font-bold text-black mb-2">Color Tattoos</h3>
                <p className="text-gray-600">Vibrant expressions of art</p>
              </div>

              {/* Color Video */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-black group">
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"
                >
                  <source src="/img/Video/allClip.mp4" type="video/mp4" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg">
                    <h4 className="text-xl font-bold text-black">Vibrant Colors</h4>
                    <p className="text-gray-700 text-sm mt-1">Bold and expressive designs</p>
                  </div>
                </div>
              </div>

              {/* Color Image */}
              <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-black group cursor-pointer">
                <img
                  src="/img/natra1.jpg"
                  alt="Color Tattoo"
                  className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg">
                    <h4 className="text-xl font-bold text-black">Watercolor Style</h4>
                    <p className="text-gray-700 text-sm mt-1">Artistic fluidity</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Image Marquee Banner - Fixed scrolling within container */}
        <div className="mb-10 overflow-hidden mt-6">
          <div className="image-marquee py-4">
            {['all1.jpg', 'all2.jpg', 'all3.jpg', 'all4.jpg', 'all5.jpg', 'all6.jpg', 'gal.jpg', 'gal2.jpg'].concat(['all1.jpg', 'all2.jpg', 'all3.jpg', 'all4.jpg']).map((img, i) => (
              <div key={i} className="flex-shrink-0 w-56 h-36 rounded overflow-hidden">
                <img src={`/img/${img}`} alt={`banner-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery Section - Full Width Product Collection */}
      <section className="w-full overflow-x-hidden bg-white py-12 px-0 relative">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <h1 className="text-5xl font-bold mb-12 text-center text-black py-8">Collections</h1>

          {/* Tab bar - Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap">
            <button
              onClick={() => setType('BlackWhite')}
              className={`px-8 py-3 rounded-md font-semibold transition border-2 ${type === 'BlackWhite'
                ? 'border-black bg-black text-white'
                : 'border-black text-black hover:bg-black hover:text-white'
                }`}
            >
              Black &amp; White Tattoo
            </button>
            <button
              onClick={() => setType('Color')}
              className={`px-8 py-3 rounded-md font-semibold transition border-2 ${type === 'Color'
                ? 'border-black bg-black text-white'
                : 'border-black text-black hover:bg-black hover:text-white'
                }`}
            >
              Color Tattoo
            </button>
            <button
              onClick={() => setType('all')}
              className={`px-8 py-3 rounded-md font-semibold transition border-2 ${type === 'all'
                ? 'border-black bg-black text-white'
                : 'border-black text-black hover:bg-black hover:text-white'
                }`}
            >
              All Designs
            </button>

          </div>
          {loading ? (
            <div className="text-center py-20">
              <p className="text-gray-600">Loading gallery...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-600 text-xl">No designs found. Try adjusting your filters.</p>
            </div>
          ) : (
            <>
              <div className={`w-full grid ${viewMode === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4'
                : 'grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4'
                }`}>
                {filtered.map((product: any, idx: number) => (
                  <div
                    key={product._id || product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`group relative overflow-hidden cursor-pointer rounded-lg border border-gray-200 hover:border-black transition ${viewMode === 'grid'
                      ? 'aspect-[3/4] h-auto'
                      : idx % 7 === 0 || idx % 7 === 3
                        ? 'aspect-[3/4]'
                        : 'aspect-[3/4]'
                      }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      onError={(e) => { (e.target as HTMLImageElement).src = '/img/all1.jpg' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-6">
                      <div className="flex items-center justify-between mb-2">
                        <h3 className="text-2xl font-bold text-white">{product.name}</h3>
                        {product.style && (
                          <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-xs text-white">
                            {product.style}
                          </span>
                        )}
                      </div>
                      <p className="text-gray-300 text-lg">{product.type}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Load More Button */}
              {displayCount < (products.length || SAMPLE_PRODUCTS.length) && (
                <div className="text-center mt-12 px-4">
                  <button
                    onClick={() => setDisplayCount(displayCount + 10)}
                    className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition"
                  >
                    Load More Designs
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Detail Modal */}
      <ModalProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />

      <Footer id="main-footer" />
    </div>
  )
}
