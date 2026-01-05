'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import ImageZoomModal from '../components/ImageZoomModal'

interface ArtistsClientProps {
    initialArtists: any[]
    initialPageContent: any
}

export default function ArtistsClient({ initialArtists, initialPageContent }: ArtistsClientProps) {
    const [artists] = useState(initialArtists)
    const [portfolioModal, setPortfolioModal] = useState<number | null>(null)
    const [selectedPortfolioImage, setSelectedPortfolioImage] = useState(0)
    const [fullscreenZoom, setFullscreenZoom] = useState(false)
    const [pageContent] = useState(initialPageContent)

    // Handle initial hash scroll
    useEffect(() => {
        if (typeof window !== 'undefined' && window.location.hash) {
            const id = window.location.hash.replace('#', '')
            setTimeout(() => {
                const element = document.getElementById(id)
                if (element) {
                    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }
            }, 500) // Delay to ensure image layout stability
        }
    }, [])

    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 px-4 h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {pageContent?.heroVideo ? (
                        <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
                            <source src={pageContent.heroVideo.url} type="video/mp4" />
                        </video>
                    ) : (
                        <Image src={pageContent?.heroImage?.url || '/img/Chu A tach nen.png'} alt="Artists Hero" fill className="object-cover" priority />
                    )}
                    <div className="absolute inset-0 bg-black/30"></div>
                </div>
                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">{pageContent?.heroTitle || 'Our Artists'}</h1>
                    <p className="text-xl lg:text-2xl text-gray-300 mb-8">{pageContent?.heroDescription || 'Meet the talented artists behind A Little Ink.'}</p>
                </div>
            </section>

            {/* Artists Grid */}
            <section className="px-4 py-20">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl font-bold text-black mb-16 text-center">Meet Our Team</h2>
                    <div className="flex flex-col gap-24">
                        {artists.map((artist: any, idx: number) => (
                            <div key={artist.id || idx}>
                                <div id={`artist-${artist.id}`} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
                                    <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                                        <div className="relative group">
                                            <div className="relative overflow-hidden rounded-lg border-2 border-gray-200 h-[600px] lg:h-[80vh] max-h-[850px] shadow-lg">
                                                <Image
                                                    src={artist.image?.url || '/img/A.Tuan.jpg'}
                                                    alt={artist.name}
                                                    fill
                                                    className="object-cover group-hover:scale-110 transition duration-500"
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                    priority={idx === 0}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                                            </div>
                                            <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 bg-white shadow-lg px-6 py-3 rounded-lg border-2 border-gray-200"><span className="text-black font-semibold">{artist.experience}</span></div>
                                        </div>
                                    </div>
                                    <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                                        <div className="bg-gray-50 p-8 lg:p-12 rounded-lg border-2 border-gray-200 shadow-lg">
                                            <div className="mb-6"><span className="px-4 py-2 bg-black text-white rounded-full text-sm font-semibold mb-4 inline-block">{artist.role}</span></div>
                                            <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-black">{artist.name}</h2>
                                            <div className="text-xl text-gray-700 mb-6 leading-relaxed" dangerouslySetInnerHTML={{ __html: artist.description?.html || artist.description }} />
                                            <div className="mb-6"><h3 className="text-lg font-semibold mb-3 text-black">Specialty</h3><p className="text-gray-700">{artist.specialty}</p></div>
                                            <div className="flex flex-wrap gap-4">
                                                {artist.instagram && <a href={artist.instagram} target="_blank" rel="noopener noreferrer" className="px-6 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition flex items-center gap-2">Instagram</a>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className={`lg:col-span-2 ${idx % 2 === 1 ? 'lg:col-start-1' : ''}`}>
                                        <h3 className="text-2xl font-bold mb-6 text-black">Portfolio</h3>
                                        <div className="flex flex-nowrap overflow-x-auto gap-4 py-2 scroll-smooth">
                                            {artist.portfolio?.map((img: any, imgIdx: number) => (
                                                <div key={imgIdx} className="relative w-48 h-48 flex-shrink-0 rounded-lg overflow-hidden group cursor-pointer border-2 border-gray-200 hover:border-black transition" onClick={() => { setPortfolioModal(idx); setSelectedPortfolioImage(imgIdx); }}>
                                                    <Image src={img.url || img} alt={`${artist.name} portfolio ${imgIdx + 1}`} fill className="object-cover group-hover:scale-110 transition duration-300" sizes="192px" />
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                {idx < artists.length - 1 && <div className="flex items-center justify-center mt-24 opacity-30"><div className="h-px bg-black w-full max-w-xs"></div><span className="mx-4 text-xl tracking-widest">✦</span><div className="h-px bg-black w-full max-w-xs"></div></div>}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="px-4 py-20 bg-gray-50 border-t-2 border-gray-200">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-4xl font-bold mb-4 text-black">Ready to Get Inked?</h2>
                    <p className="text-gray-700 mb-8 text-lg">Book a consultation with one of our talented artists.</p>
                    <Link href="/?scroll=booking" className="inline-block px-8 py-4 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold text-lg transition transform hover:scale-105">Book a Session</Link>
                </div>
            </section>

            {/* Portfolio Modal */}
            {portfolioModal !== null && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4" onClick={() => setPortfolioModal(null)}>
                    <div className="w-full max-w-7xl h-[90vh] flex flex-col" onClick={(e) => e.stopPropagation()}>
                        <div className="bg-white rounded-lg p-4 sm:p-6 flex flex-col h-full">
                            <div className="flex items-center justify-between mb-4 flex-shrink-0">
                                <h2 className="text-lg sm:text-xl lg:text-2xl font-bold text-black truncate">{artists[portfolioModal].name} - Portfolio</h2>
                                <button onClick={() => setPortfolioModal(null)} className="text-black hover:text-gray-600 text-3xl font-bold">×</button>
                            </div>
                            <div className="flex-1 flex flex-col md:flex-row gap-4 overflow-hidden">
                                <div className="flex-1 flex items-center justify-center bg-gray-50 rounded-lg overflow-hidden relative">
                                    <Image
                                        src={artists[portfolioModal].portfolio?.[selectedPortfolioImage]?.url || artists[portfolioModal].portfolio?.[selectedPortfolioImage] || '/img/chu A do.png'}
                                        alt="Portfolio"
                                        fill
                                        className="object-contain cursor-zoom-in"
                                        onClick={() => setFullscreenZoom(true)}
                                        sizes="(max-width: 1280px) 100vw, 1280px"
                                    />
                                </div>
                                <div className="hidden md:block w-32 lg:w-40 flex-shrink-0 overflow-y-auto">
                                    <div className="grid grid-cols-1 gap-3">
                                        {artists[portfolioModal].portfolio?.map((img: any, imgIdx: number) => (
                                            <button key={imgIdx} onClick={() => setSelectedPortfolioImage(imgIdx)} className={`aspect-square rounded-lg overflow-hidden border-2 transition relative ${selectedPortfolioImage === imgIdx ? 'border-black ring-2 ring-black/50' : 'border-gray-300'}`}>
                                                <Image src={img.url || img} alt="Thumbnail" fill className="object-cover" sizes="160px" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {portfolioModal !== null && (
                <ImageZoomModal imageUrl={artists[portfolioModal].portfolio?.[selectedPortfolioImage]?.url || artists[portfolioModal].portfolio?.[selectedPortfolioImage] || '/img/chu A do.png'} altText="Portfolio Zoom" isOpen={fullscreenZoom} onClose={() => setFullscreenZoom(false)} />
            )}

            <Footer id="main-footer" />
        </div>
    )
}
