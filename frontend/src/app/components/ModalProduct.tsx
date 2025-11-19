"use client"

import { useState } from 'react'
import Link from 'next/link'

type Product = {
  _id?: string
  id?: number
  name: string
  images?: string[]
  type?: string
  style?: string
  description?: string
  image?: string
}

export default function ModalProduct({ product, onClose }: { product: Product | null; onClose: () => void }) {
  const [selected, setSelected] = useState(0)

  if (!product) return null

  const imgs = product.images && product.images.length > 0 ? product.images : [product.image || '/img/all1.jpg']

  return (
    <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white rounded-lg p-6 max-w-6xl w-full max-h-[90vh] overflow-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold text-black">{product.name}</h2>
          <button
            onClick={onClose}
            className="text-black hover:text-gray-600 text-3xl font-bold leading-none w-8 h-8 flex items-center justify-center"
          >
            ×
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Image Gallery */}
          <div className="flex flex-col gap-4">
            <div className="relative aspect-square overflow-hidden rounded-lg   ">
              <img 
                src={imgs[selected]} 
                alt={product.name} 
                className="w-full h-full object-contain"
                onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
              />
              {/* {imgs.length > 1 && (
                <div className="absolute top-4 right-4 bg-black/70 backdrop-blur-sm px-3 py-1 rounded-lg">
                  <span className="text-white text-sm font-semibold">
                    {selected + 1} / {imgs.length}
                  </span>
                </div>
              )} */}
            </div>
            
            {imgs.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {imgs.map((img, idx) => (
                  <button 
                    key={idx} 
                    onClick={() => setSelected(idx)} 
                    className={`aspect-square overflow-hidden rounded-lg border-2 transition cursor-pointer ${
                      selected === idx 
                        ? 'border-black ring-2 ring-black/50' 
                        : 'border-gray-300 hover:border-black'
                    }`}
                  >
                    <img 
                      src={img} 
                      alt={`thumb-${idx}`} 
                      className="w-full h-full object-cover"
                      onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                    />
                  </button>
                ))}
              </div>
            )}

            {/* Navigation buttons
            {imgs.length > 1 && (
              <div className="flex gap-3">
                <button
                  onClick={() => setSelected(selected > 0 ? selected - 1 : imgs.length - 1)}
                  className="flex-1 px-4 py-2 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition"
                >
                  ← Previous
                </button>
                <button
                  onClick={() => setSelected(selected < imgs.length - 1 ? selected + 1 : 0)}
                  className="flex-1 px-4 py-2 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition"
                >
                  Next →
                </button>
              </div>
            )} */}
          </div>

          {/* Product Info */}
          <div className="flex flex-col justify-center gap-6">
            <div>
              <div className="flex items-center gap-3 mb-4">
                {product.type && (
                  <span className="px-4 py-2 bg-black text-white rounded-lg text-sm font-semibold">
                    {product.type}
                  </span>
                )}
                {product.style && (
                  <span className="px-4 py-2 bg-gray-100 border-2 border-gray-300 text-black rounded-lg text-sm font-semibold">
                    {product.style}
                  </span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-xl font-bold text-black mb-3">About this design</h3>
              <p className="text-gray-700 leading-relaxed">
                {product.description || 'Beautiful tattoo design showcasing unique artistry and craftsmanship. Each line and detail is carefully crafted to create a stunning piece of body art.'}
              </p>
            </div>

            <div className="space-y-4 pt-4 border-t-2 border-gray-200">
              {/* <Link
                href={`/product/${product._id || product.id}`}
                className="block w-full px-6 py-4 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold text-center transition"
              >
                View Full Details
              </Link> */}
              <Link
                href="/#booking"
                className="block w-full px-6 py-4 bg-black text-white hover:bg-gray-800 rounded-lg font-semibold text-center transition"
              >
                Book This Design
              </Link>
            </div>

            <div className="pt-4 border-t-2 border-gray-200">
              <p className="text-sm text-gray-600">
                Interested in this design? Contact us to discuss your tattoo ideas and schedule a consultation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
