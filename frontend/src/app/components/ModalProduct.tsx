"use client"

import { useState } from 'react'
import Link from 'next/link'
import { FaInstagram } from 'react-icons/fa'
import ImageZoomModal from './ImageZoomModal'

type Product = {
  _id?: string
  id?: number | string
  name: string
  images?: (string | { url: string })[]
  type?: string
  style?: string | string[]
  description?: string
  image?: string | { url: string }
}

export default function ModalProduct({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [selected, setSelected] = useState(0)
  const [isZoomOpen, setIsZoomOpen] = useState(false)

  if (!product) return null

  const imgs = product.images && product.images.length > 0
    ? product.images.map((img: any) => typeof img === 'string' ? img : img?.url || '/img/Chu A tach nen.png')
    : product.image
      ? [typeof product.image === 'string' ? product.image : product.image?.url || '/img/Chu A tach nen.png']
      : ['/img/Chu A tach nen.png']
  const hasThumbnails = imgs.length > 1

  const handleGetArtClick = () => {
    // For mobile reliability, we use window.location.href to force a scroll trigger
    // if simple navigation fails. 
    onClose() // Close modal first
    setTimeout(() => {
      window.location.href = '/?scroll=booking'
    }, 100)
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-2 sm:p-4" onClick={onClose}>
        <div
          className="bg-white rounded-lg w-full max-w-6xl max-h-[95vh] overflow-hidden shadow-2xl relative flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Close Button - Absolute Top Right */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-black hover:text-gray-600 bg-white/50 hover:bg-white rounded-full w-10 h-10 flex items-center justify-center transition-colors"
          >
            <span className="text-3xl font-bold leading-none">&times;</span>
          </button>

          <div className="flex flex-col lg:flex-row h-full overflow-auto">
            {/* Left Column: Image Gallery */}
            <div className="lg:w-3/5 bg-gray-50 p-4 sm:p-6 flex flex-col gap-4 overflow-y-auto">
              {/* Main Image */}
              <div
                className="relative rounded-lg overflow-hidden cursor-zoom-in"
                onClick={() => setIsZoomOpen(true)}
              >
                <img
                  src={imgs[selected]}
                  alt={product.name}
                  className="w-full h-auto object-contain max-h-[70vh] mx-auto"
                  onError={(e) => { (e.target as HTMLImageElement).src = '/img/Chu A tach nen.png' }}
                />
              </div>

              {/* Thumbnails */}
              {hasThumbnails && (
                <div className="grid grid-cols-5 gap-2 sm:gap-3">
                  {imgs.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setSelected(idx)}
                      className={`aspect-square overflow-hidden rounded-lg border-2 transition cursor-pointer ${selected === idx
                        ? 'border-black ring-2 ring-black/50'
                        : 'border-gray-300 hover:border-black'
                        }`}
                    >
                      <img
                        src={img}
                        alt={`thumb-${idx}`}
                        className="w-full h-full object-cover"
                        onError={(e) => { (e.target as HTMLImageElement).src = '/img/Chu A tach nen.png' }}
                      />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Product Info */}
            <div className="lg:w-2/5 p-6 sm:p-8 flex flex-col justify-between bg-white overflow-y-auto">
              {/* Top Section: Title and Tags */}
              <div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-black mb-4">{product.name}</h2>

                <div className="flex items-center gap-2 flex-wrap mb-4">
                  {product.type && (
                    <span className="px-4 py-1.5 bg-black text-white rounded-full text-sm font-bold uppercase tracking-wider">
                      {product.type}
                    </span>
                  )}
                  {product.style && (() => {
                    let styles: string[] = []
                    if (Array.isArray(product.style)) {
                      styles = product.style
                    } else if (typeof product.style === 'string') {
                      styles = product.style.split(/(?=[A-Z])/).filter(s => s.length > 0)
                    }

                    return styles.map((word, index) => (
                      <span key={index} className="px-4 py-1.5 bg-gray-100 text-gray-800 rounded-full text-sm font-medium border border-gray-200">
                        {word}
                      </span>
                    ))
                  })()}
                </div>
              </div>

              {/* Middle Section: Description */}
              <div className="flex-1 py-4">
                <div className="prose prose-base max-w-none text-gray-700 text-justify leading-relaxed">
                  <p className="text-base sm:text-lg">
                    {product.description || 'Beautiful tattoo design showcasing unique artistry and craftsmanship. Mỗi nét vẽ và chi tiết đều được chăm chút kỹ lưỡng để tạo nên một tác phẩm nghệ thuật cơ thể tuyệt đẹp.'}
                  </p>
                </div>
              </div>

              {/* Bottom Section: Buttons - Always at bottom */}
              <div className="space-y-3 pt-4 border-t border-gray-100">
                <div className="flex gap-3">
                  <button
                    onClick={handleGetArtClick}
                    className="flex-1 px-6 py-4 bg-black text-white hover:bg-gray-800 rounded-xl font-bold text-base sm:text-lg text-center transition transform hover:scale-[1.02] flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                  >
                    <span>Get This Art</span>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </button>

                  <a
                    href="https://www.instagram.com/alittleink.skin/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-4 border-2 border-gray-200 text-gray-700 hover:border-black hover:text-black rounded-xl transition flex items-center justify-center"
                    title="View on Instagram"
                  >
                    <FaInstagram className="w-6 h-6" />
                  </a>
                </div>

                <p className="text-xs text-gray-400 text-center">
                  Interested in this design? Contact us to discuss your tattoo ideas.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Zoom Modal */}
      <ImageZoomModal
        imageUrl={imgs[selected]}
        altText={product.name}
        isOpen={isZoomOpen}
        onClose={() => setIsZoomOpen(false)}
      />
    </>
  )
}
