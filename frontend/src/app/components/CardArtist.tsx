"use client"

type Artist = {
  id?: number
  name: string
  image: string
  description?: string
  email?: string
  style?: string
}

export default function CardArtist({ artist }: { artist: Artist }) {
  return (
    <div className="bg-white rounded-lg overflow-hidden border border-gray-200 hover:shadow-lg transition">
      <div className="h-[320px] bg-gray-100 flex items-center justify-center overflow-hidden">
        <img src={artist.image} alt={artist.name} className="w-full h-full object-cover" onError={(e) => {(e.target as HTMLImageElement).style.display = 'none'}} />
      </div>
      <div className="p-6 text-center">
        <h3 className="text-2xl font-bold mb-1 text-black">{artist.name}</h3>
        {artist.email && (
          <p className="text-sm mb-3">
            <a href={artist.email} target="_blank" rel="noopener noreferrer" className="text-black underline">{artist.email.replace('https://www.instagram.com/', '@')}</a>
          </p>
        )}
        <p className="text-gray-700 text-sm mb-4">{artist.description}</p>
        <div className="pt-4 space-y-2">
          {artist.style && <p className="text-gray-600 text-xs"><span className="text-black font-semibold">Style:</span> {artist.style}</p>}
        </div>
        <div className="mt-4 flex justify-center gap-3">
          <a href={`/artists#${artist.name.replace(/\s+/g, '-').toLowerCase()}`} className="px-4 py-2 border-2 border-black text-black rounded-md font-semibold">My Collection</a>
          <a href="/gallery" className="px-4 py-2 border-2 border-black text-black rounded-md font-semibold">View Gallery</a>
        </div>
      </div>
    </div>
  )
}
