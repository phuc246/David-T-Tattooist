'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ModalProduct from '../components/ModalProduct'
import './gallery.css'
import '../featured-gallery.css'
import { TattooGridSkeleton } from '../components/SkeletonLoader'
import { motion } from 'framer-motion'

interface GalleryClientProps {
    initialProducts: any[]
    initialPageContent: any
}

export default function GalleryClient({ initialProducts, initialPageContent }: GalleryClientProps) {
    const [products] = useState(initialProducts)
    const [filtered, setFiltered] = useState<any[]>([])
    const [type, setType] = useState('All')
    const [selectedProduct, setSelectedProduct] = useState<any>(null)
    const [displayCount, setDisplayCount] = useState(10)
    const [scrollY, setScrollY] = useState(0)
    const [pageContent] = useState(initialPageContent)

    useEffect(() => {
        // Set initial display count based on screen width
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setDisplayCount(5)
            } else {
                setDisplayCount(10)
            }
        }

        handleResize()
        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            setScrollY(window.scrollY)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    useEffect(() => {
        let source = products && products.length > 0 ? products : []
        if (type !== 'All') {
            source = source.filter((p: any) => p.type === type)
        }
        setFiltered(source.slice(0, displayCount))
    }, [type, products, displayCount])

    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />

            {/* Hero Section */}
            <section id="vd_Heading" className="relative w-full h-screen overflow-hidden">
                {pageContent?.heroImage?.url ? (
                    <Image
                        src={pageContent.heroImage.url}
                        alt="Gallery Background"
                        fill
                        priority
                        className="object-cover"
                        sizes="100vw"
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-black flex items-center justify-center">
                        <Image
                            src="/img/Chu A tach nen.png"
                            alt="Background"
                            width={256}
                            height={256}
                            priority
                            className="w-64 h-auto opacity-50"
                        />
                    </div>
                )}
                <div className="vd-hero-overlay"></div>
                <div className="vd-hero-content">
                    <Image
                        id="gallery-hero-logo"
                        className="logo-hd w-48 transition-all duration-1000"
                        src="/img/Chu A tach nen.png"
                        alt="Brand Logo"
                        width={192}
                        height={192}
                        priority
                        style={{
                            transform: scrollY > 100
                                ? `translateY(${Math.min(scrollY - 100, (typeof window !== 'undefined' ? window.innerHeight : 800) * 0.4)}px) scale(${Math.max(0.3, 1 - (scrollY - 100) / 1000)})`
                                : 'none',
                            opacity: scrollY > 100 ? Math.max(0, 1 - (scrollY - 100) / 500) : 1,
                            willChange: "transform, opacity"
                        }}
                    />
                </div>
            </section>

            {/* Media Grid Section */}
            <section className="w-full bg-gradient-to-b from-gray-50 to-white py-16 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold mb-12 text-center text-black">Explore Our Styles</h2>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h3 className="text-3xl font-bold text-black mb-2">Black & White</h3>
                                <p className="text-gray-600">Timeless elegance in monochrome</p>
                            </div>
                            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-black group">
                                {pageContent?.bwStyleVideo?.url ? (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"
                                    >
                                        <source src={pageContent.bwStyleVideo.url} type="video/mp4" />
                                    </video>
                                ) : (
                                    <div className="w-full h-[500px] bg-black flex items-center justify-center">
                                        <Image
                                            src="/img/Chu A tach nen.png"
                                            alt="Black & White Style"
                                            width={128}
                                            height={128}
                                            className="w-32 h-auto opacity-50"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg">
                                        <h4 className="text-xl font-bold text-black">Classic Monochrome</h4>
                                        <p className="text-gray-700 text-sm mt-1">Bold lines, dramatic shading</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-black group h-[500px]">
                                {pageContent?.bwStyleImage?.url ? (
                                    <Image
                                        src={pageContent.bwStyleImage.url}
                                        alt="Black and White Tattoo"
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <Image
                                            src="/img/Chu A tach nen.png"
                                            alt="Black & White"
                                            width={128}
                                            height={128}
                                            className="w-32 h-auto opacity-30"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg">
                                        <h4 className="text-xl font-bold text-black">Traditional Ink</h4>
                                        <p className="text-gray-700 text-sm mt-1">Precision and artistry</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="text-center mb-6">
                                <h3 className="text-3xl font-bold text-black mb-2">Color Tattoos</h3>
                                <p className="text-gray-600">Vibrant expressions of art</p>
                            </div>
                            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-black group">
                                {pageContent?.colorStyleVideo?.url ? (
                                    <video
                                        autoPlay
                                        muted
                                        loop
                                        playsInline
                                        preload="auto"
                                        className="w-full h-[500px] object-cover group-hover:scale-105 transition duration-500"
                                    >
                                        <source src={pageContent.colorStyleVideo.url} type="video/mp4" />
                                    </video>
                                ) : (
                                    <div className="w-full h-[500px] bg-black flex items-center justify-center">
                                        <Image
                                            src="/img/Chu A tach nen.png"
                                            alt="Color Style"
                                            width={128}
                                            height={128}
                                            className="w-32 h-auto opacity-50"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg">
                                        <h4 className="text-xl font-bold text-black">Living Canvas</h4>
                                        <p className="text-gray-700 text-sm mt-1">Dynamic color palettes</p>
                                    </div>
                                </div>
                            </div>
                            <div className="relative rounded-lg overflow-hidden shadow-2xl border-4 border-black group h-[500px]">
                                {pageContent?.colorStyleImage?.url ? (
                                    <Image
                                        src={pageContent.colorStyleImage.url}
                                        alt="Color Tattoo"
                                        fill
                                        className="object-cover group-hover:scale-105 transition duration-500"
                                        sizes="(max-width: 1024px) 100vw, 50vw"
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                                        <Image
                                            src="/img/Chu A tach nen.png"
                                            alt="Color"
                                            width={128}
                                            height={128}
                                            className="w-32 h-auto opacity-30"
                                        />
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <div className="bg-white/90 backdrop-blur-sm px-6 py-4 rounded-lg">
                                        <h4 className="text-xl font-bold text-black">Vibrant Colors</h4>
                                        <p className="text-gray-700 text-sm mt-1">Bold and expressive designs</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Marquee */}
            <section className="w-full overflow-hidden py-14 bg-black relative shadow-[0_10px_50px_rgba(0,0,0,0.5)]">
                <div className="absolute top-0 left-0 w-full h-[1px] bg-white/10"></div>
                <div className="absolute bottom-0 left-0 w-full h-[1px] bg-white/10"></div>
                <div className="relative flex overflow-x-hidden py-2">
                    <motion.div
                        className="flex whitespace-nowrap gap-10"
                        animate={{ x: [0, -2880] }}
                        transition={{ x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" } }}
                    >
                        {(pageContent?.galleryMarqueeImages?.length > 0
                            ? [...pageContent.galleryMarqueeImages, ...pageContent.galleryMarqueeImages, ...pageContent.galleryMarqueeImages, ...pageContent.galleryMarqueeImages]
                            : [...products, ...products, ...products, ...products].slice(0, 30)
                        ).map((item: any, idx: number) => (
                            <div key={idx} className="flex-shrink-0 w-64 h-40 sm:w-80 sm:h-52 rounded-xl overflow-hidden shadow-[0_0_20px_rgba(255,255,255,0.05)] hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] transition-all duration-500 bg-zinc-900 relative group marquee-card-glow">
                                <Image
                                    src={item.url || item.image?.url || item.images?.[0]?.url || '/img/Chu A tach nen.png'}
                                    alt="Gallery Marquee"
                                    fill
                                    className="object-cover group-hover:scale-110 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                                    sizes="(max-width: 640px) 256px, 320px"
                                />
                                <div className="absolute inset-0 border-2 border-transparent group-hover:border-white/20 transition-colors pointer-events-none rounded-xl"></div>
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent group-hover:from-transparent transition-all"></div>
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* Collections Section */}
            <section className="w-full overflow-x-hidden bg-white py-0 px-0 pb-20 relative">
                <div className="w-full px-4 sm:px-6 lg:px-8">
                    <h1 className="text-5xl font-bold mb-8 text-center text-black py-2 mt-8">Collections</h1>
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        <button onClick={() => setType('BlackWhite')} className={`px-8 py-3 rounded-md font-semibold transition border-2 ${type === 'BlackWhite' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-black hover:text-white'}`}>Black & White Tattoo</button>
                        <button onClick={() => setType('Color')} className={`px-8 py-3 rounded-md font-semibold transition border-2 ${type === 'Color' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-black hover:text-white'}`}>Color Tattoo</button>
                        <button onClick={() => setType('All')} className={`px-8 py-3 rounded-md font-semibold transition border-2 ${type === 'All' ? 'border-black bg-black text-white' : 'border-black text-black hover:bg-black hover:text-white'}`}>All Designs</button>
                    </div>

                    {filtered.length === 0 ? (
                        <div className="text-center py-20"><p className="text-gray-600 text-xl">No designs found. Try adjusting your filters.</p></div>
                    ) : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                            {filtered.map((product: any, idx: number) => (
                                <div key={product.id || idx} className="group relative overflow-hidden cursor-pointer h-[400px] sm:h-[450px] md:h-[500px] rounded-lg" onClick={() => setSelectedProduct(product)}>
                                    <Image src={product.image?.url || product.images?.[0]?.url || product.images?.[0] || '/img/Chu A tach nen.png'} alt={product.name} fill className="object-cover group-hover:scale-110 transition duration-700 ease-in-out" sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500"></div>
                                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 transform scale-90 group-hover:scale-100"><span className="px-8 py-3 bg-white/10 backdrop-blur-md border border-white/30 text-white rounded-full font-bold tracking-widest hover:bg-white hover:text-black transition-colors">VIEW</span></div>
                                    <div className="absolute bottom-0 left-0 right-0 p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                        <div className="overflow-hidden">
                                            <div className="flex flex-wrap gap-2 mb-2 opacity-0 group-hover:opacity-100 transform translate-y-full group-hover:translate-y-0 transition-all duration-500 delay-75">
                                                {(Array.isArray(product.style) ? product.style : (product.style || '').split(/(?=[A-Z])/).filter((s: string) => s.trim().length > 0)).map((style: string, i: number) => (
                                                    <span key={i} className="text-[10px] font-bold text-black bg-white/90 px-2 py-1 rounded-sm uppercase tracking-widest">{style}</span>
                                                ))}
                                            </div>
                                            <h3 className="text-2xl font-bold text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 delay-100">{product.name}</h3>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {selectedProduct && <ModalProduct product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
            <Footer id="main-footer" />
        </div>
    )
}
