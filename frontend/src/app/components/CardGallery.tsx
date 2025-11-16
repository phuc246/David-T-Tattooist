"use client"

type Product = {
  _id?: string
  id?: number
  name: string
  image: string
  type: string
  style?: string
  images?: string[]
}

export default function CardGallery({ product, onClick }: { product: Product; onClick?: () => void }) {
  return (
    <div
      onClick={onClick}
      className="relative group cursor-pointer overflow-hidden rounded-lg bg-gray-900 aspect-square"
    >
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
        onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
      />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-end">
        <div className="w-full p-3">
          <h3 className="font-bold text-sm line-clamp-1">{product.name}</h3>
          <p className="text-gray-300 text-xs">{product.type}</p>
        </div>
      </div>
    </div>
  )
}
