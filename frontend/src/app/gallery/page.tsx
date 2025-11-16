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
  const [displayCount, setDisplayCount] = useState(20)
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
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Move logo to nav when scrolled
      const heroLogo = document.getElementById('gallery-hero-logo')
      const logoMover = document.getElementById('logo-mover')
      
      if (heroLogo && logoMover && scrollY > 100) {
        const progress = Math.min((scrollY - 100) / 300, 1)
        
        if (progress >= 1) {
          heroLogo.style.opacity = '0'
          logoMover.style.opacity = '1'
        } else {
          heroLogo.style.opacity = String(1 - progress)
          logoMover.style.opacity = '0'
        }
      } else if (heroLogo && logoMover) {
        heroLogo.style.opacity = '1'
        logoMover.style.opacity = '0'
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
            {['all1.jpg','all2.jpg','all3.jpg','all4.jpg','all5.jpg','all6.jpg','gal.jpg','gal2.jpg'].concat(['all1.jpg','all2.jpg','all3.jpg','all4.jpg']).map((img, i) => (
              <div key={i} className="flex-shrink-0 w-56 h-36 rounded overflow-hidden">
                <img src={`/img/${img}`} alt={`banner-${i}`} className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Gallery Section - Full Width Product Collection */}
      <section className="w-full bg-white py-12 px-0 relative">
        <div className="w-full">
          <h1 className="text-5xl font-bold mb-8 text-center text-black py-8">Bộ Sưu Tập Sản Phẩm</h1>
          
          {/* Stats Section */}
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="text-3xl font-bold text-black">{filtered.length}</div>
                <div className="text-sm text-gray-600 mt-1">Designs Shown</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="text-3xl font-bold text-black">
                  {[...new Set(filtered.map((p: any) => p.style))].length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Styles</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="text-3xl font-bold text-black">
                  {filtered.filter((p: any) => p.type === 'BlackWhite').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Black &amp; White</div>
              </div>
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                <div className="text-3xl font-bold text-black">
                  {filtered.filter((p: any) => p.type === 'Color').length}
                </div>
                <div className="text-sm text-gray-600 mt-1">Color Designs</div>
              </div>
            </div>
          </div>

          {/* Search and Filter Bar */}
          <div className="max-w-7xl mx-auto px-4 mb-8">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              {/* Search Bar */}
              <div className="flex-1 w-full md:max-w-md">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search designs..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-3 pl-12 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black text-black bg-white placeholder-gray-400"
                  />
                  <svg 
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400"
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Sort and View Controls */}
              <div className="flex gap-4 items-center">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-3 border-2 border-black rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 text-black bg-white"
                >
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                  <option value="name">Name A-Z</option>
                </select>
                
                <div className="flex border-2 border-black rounded-lg overflow-hidden">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`px-4 py-3 transition ${
                      viewMode === 'grid' 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setViewMode('masonry')}
                    className={`px-4 py-3 transition ${
                      viewMode === 'masonry' 
                        ? 'bg-black text-white' 
                        : 'bg-white text-black hover:bg-gray-100'
                    }`}
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Tab bar - Filter */}
          <div className="flex justify-center gap-4 mb-12 flex-wrap px-4">
            <button
              onClick={() => setType('BlackWhite')}
              className={`px-8 py-3 rounded-md font-semibold transition border-2 ${
                type === 'BlackWhite'
                  ? 'border-black bg-black text-white'
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              Black &amp; White Tattoo
            </button>
            <button
              onClick={() => setType('Color')}
              className={`px-8 py-3 rounded-md font-semibold transition border-2 ${
                type === 'Color'
                  ? 'border-black bg-black text-white'
                  : 'border-black text-black hover:bg-black hover:text-white'
              }`}
            >
              Color Tattoo
            </button>
            <button
              onClick={() => setType('all')}
              className={`px-8 py-3 rounded-md font-semibold transition border-2 ${
                type === 'all'
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
              <div className={`w-full grid gap-0 ${
                viewMode === 'grid' 
                  ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
                  : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
              }`}>
                {filtered.map((product: any, idx: number) => (
                  <div
                    key={product._id || product.id}
                    onClick={() => setSelectedProduct(product)}
                    className={`group relative overflow-hidden cursor-pointer ${
                      viewMode === 'grid' 
                        ? 'h-[500px] sm:h-[600px] lg:h-[700px]' 
                        : idx % 7 === 0 || idx % 7 === 3 
                          ? 'h-[400px] sm:h-[500px]' 
                          : 'h-[300px] sm:h-[400px]'
                    }`}
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                      onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
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
                    onClick={() => setDisplayCount(displayCount + 20)}
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
