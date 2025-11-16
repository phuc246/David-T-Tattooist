'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Link from 'next/link'

export default function ProductPage() {
  const params = useParams()
  const [product, setProduct] = useState<any>(null)
  const [selectedImage, setSelectedImage] = useState(0)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`http://localhost:3001/api/products/${params.id}`)
        if (res.ok) {
          setProduct(await res.json())
        }
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchProduct()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-black text-white">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <p className="text-xl mb-4">Design not found</p>
          <Link href="/gallery" className="text-red-500 hover:text-red-400">
            Back to Gallery
          </Link>
        </div>
        <Footer />
      </div>
    )
  }

  const productImages = product.images && product.images.length > 0 ? product.images : [product.image || '/img/all1.jpg']

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      <Navbar />

      {/* Black and White Video Background */}
      <div className="fixed inset-0 z-0 opacity-20">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover grayscale"
          style={{ filter: 'grayscale(100%) brightness(0.3)' }}
        >
          <source src="/img/Video/allClip.mp4" type="video/mp4" />
        </video>
      </div>

      <section className="relative z-10 pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto">
          <Link href="/gallery" className="text-white hover:text-gray-300 mb-8 inline-block transition flex items-center gap-2 group">
            <span className="group-hover:-translate-x-1 transition">←</span>
            <span>Back to Gallery</span>
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-20">
            {/* Images Gallery */}
            <div className="space-y-6">
              <div className="relative bg-black/50 backdrop-blur-sm rounded-lg overflow-hidden border border-white/10 shadow-2xl">
                <div className="aspect-square">
                  <img
                    src={productImages[selectedImage]}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                  />
                </div>
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-4 py-2 rounded-lg border border-white/20">
                  <span className="text-white text-sm font-semibold">{selectedImage + 1} / {productImages.length}</span>
                </div>
              </div>
              
              {productImages.length > 1 && (
                <div className="grid grid-cols-4 gap-3">
                  {productImages.map((img: string, idx: number) => (
                    <button
                      key={idx}
                      onClick={() => setSelectedImage(idx)}
                      className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all transform hover:scale-105 ${
                        selectedImage === idx 
                          ? 'border-white ring-2 ring-white/50' 
                          : 'border-white/30 hover:border-white/60'
                      }`}
                    >
                      <img 
                        src={img} 
                        alt={`${product.name} ${idx}`} 
                        className="w-full h-full object-cover"
                        onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                      />
                      {selectedImage === idx && (
                        <div className="absolute inset-0 bg-white/10"></div>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Product Info */}
            <div className="flex flex-col justify-center space-y-8">
              <div>
                <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">{product.name}</h1>
                <div className="mb-8">
                  <span className="inline-block px-6 py-3 border-2 border-white rounded-lg text-base font-semibold bg-white/10 backdrop-blur-sm">
                    {product.type || 'Tattoo Design'}
                  </span>
                </div>
              </div>

              <div className="space-y-6 mb-8 bg-black/50 backdrop-blur-sm p-6 rounded-lg border border-white/10">
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <span className="text-gray-400 font-medium">Artist</span>
                  <span className="text-white font-semibold text-lg">{product.artist || 'David T Tattooist'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-white/20 pb-4">
                  <span className="text-gray-400 font-medium">Views</span>
                  <span className="text-white font-semibold text-lg">{product.viewCount || 0}</span>
                </div>
                {product.categoryId && (
                  <div className="flex items-center justify-between">
                    <span className="text-gray-400 font-medium">Category</span>
                    <span className="text-white font-semibold text-lg">{product.categoryId.name}</span>
                  </div>
                )}
              </div>

              <div className="mb-8">
                <h3 className="text-2xl font-bold mb-4">About this design</h3>
                <p className="text-gray-300 text-lg leading-relaxed">
                  {product.description || `This stunning ${product.type?.toLowerCase() || 'tattoo'} design showcases exceptional artistry and attention to detail. Each line and shade is carefully crafted to create a unique piece of body art that tells a story.`}
                </p>
              </div>

              <div className="space-y-4">
                <button className="w-full py-4 border-2 border-white text-white hover:bg-white hover:text-black rounded-lg font-semibold text-lg transition-all transform hover:scale-105 bg-white/5 backdrop-blur-sm">
                  Book this Design
                </button>
                <button className="w-full py-4 border-2 border-white/50 text-white hover:border-white hover:bg-white/10 rounded-lg font-semibold text-lg transition-all">
                  Share Design
                </button>
              </div>
            </div>
          </div>

          {/* Related Designs */}
          <div className="mt-20">
            <h2 className="text-4xl font-bold mb-12 text-center">Related Designs</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {['/img/all1.jpg', '/img/all2.jpg', '/img/all3.jpg', '/img/all4.jpg'].map((img, idx) => (
                <Link 
                  key={idx} 
                  href="/gallery"
                  className="group relative aspect-square rounded-lg overflow-hidden border border-white/20 hover:border-white transition-all transform hover:scale-105"
                >
                  <img 
                    src={img} 
                    alt={`Related design ${idx + 1}`} 
                    className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition"></div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
