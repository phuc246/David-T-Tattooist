'use client'

import Link from 'next/link'

export default function Footer({ id }: { id?: string }) {
  return (
    <footer id={id} className="bg-black text-gray-400 py-8 border-t border-gray-800">
      <div className="max-w-7xl mx-auto px-4">
        {/* Top section: Studio links (left) + Logo (center) + Follow Us (right centered) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8 items-start">
          {/* Studio (left) - centered inside its grid cell */}
          <div className="flex flex-col items-center justify-center text-center">
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Studio</h4>
            <ul className="space-y-2 text-sm text-center">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="/gallery" className="hover:text-white transition">Gallery</Link></li>
              <li><Link href="/artists" className="hover:text-white transition">Artists</Link></li>
              <li><Link href="/classes" className="hover:text-white transition">Classes</Link></li>
              <li><Link href="/blog" className="hover:text-white transition">Blog</Link></li>
            </ul>
          </div>

          {/* Logo (center) */}
          <div className="flex items-center justify-center">
            <div className="text-center">
              <img src="/img/Logo tách nền full-A-chữ-22.png" alt="A Little Ink Logo" className="h-28 w-auto mx-auto mb-2" />
              <p className="text-sm text-gray-500">Professional tattoo studio with world-class artists.</p>
            </div>
          </div>

          {/* Follow Us (right) - icons arranged 2x2 and centered */}
          <div className="flex flex-col items-center md:items-center">
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-wider">Follow Us</h4>
            <div className="grid grid-cols-2 gap-3">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition" aria-label="Facebook">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M18.77 7.846H12V4.32c0-.897.182-1.432 1.469-1.432h1.752V.909C13.686.689 12.265.601 10.738.601 7.216.601 5.163 2.633 5.163 6.228v3.618H2.162v4.307h3.001v10.832h3.712v-10.832h2.917l.467-4.307H8.875V6.574c0-1.233.312-1.728 1.957-1.728h2.938V7.846z"/></svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition" aria-label="Instagram">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M10 1.802c2.67 0 2.987.01 4.042.059 2.71.123 3.975 1.409 4.099 4.099.048 1.054.057 1.37.057 4.04 0 2.668-.01 2.986-.057 4.04-.124 2.687-1.387 3.975-4.1 4.099-1.054.048-1.37.058-4.041.058-2.67 0-2.987-.01-4.04-.058-2.717-.124-3.977-1.416-4.1-4.1-.048-1.054-.058-1.37-.058-4.04 0-2.668.01-2.986.058-4.04.124-2.69 1.387-3.977 4.1-4.1 1.054-.048 1.37-.058 4.04-.058zM10 0C7.284 0 6.944.012 5.877.06 2.246.227.227 2.242.061 5.877.01 6.944 0 7.284 0 10s.012 3.057.06 4.123c.167 3.632 2.182 5.65 5.817 5.817 1.067.048 1.407.06 4.123.06s3.057-.012 4.123-.06c3.629-.167 5.652-2.182 5.816-5.817.05-1.066.061-1.407.061-4.123s-.012-3.056-.06-4.122C19.777 2.249 17.76.228 14.124.06 13.057.01 12.716 0 10 0z"/><path d="M10 4.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.468a3.333 3.333 0 110 -6.666 3.333 3.333 0 010 6.666z"/><circle cx="15.406" cy="4.595" r="1.24"/></svg>
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition" aria-label="Twitter">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M19.633 5.409c.013.168.013.337.013.506 0 5.185-3.944 11.173-11.173 11.173-2.22 0-4.297-.646-6.041-1.762.308.037.621.05.937.05 1.846 0 3.543-.63 4.898-1.688-1.725-.032-3.179-1.174-3.674-2.742.242.036.487.055.737.055.36 0 .709-.047 1.05-.135-1.805-.363-3.1-1.953-3.1-3.86v-.049c.531.294 1.14.471 1.794.492-.1.064-.199.132-.294.203-1.081.897-1.707 2.397-1.707 4.11 0 .904.244 1.754.67 2.482 1.974-2.422 4.928-4.02 8.252-4.189-.065-.279-.099-.566-.099-.86 0-2.086 1.694-3.78 3.78-3.78 1.086 0 2.068.459 2.756 1.193.859-.169 1.67-.483 2.401-.916-.282.882-.882 1.623-1.66 2.092.764-.092 1.499-.294 2.18-.595-.506.756-1.144 1.42-1.88 1.953z"/></svg>
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center hover:bg-white hover:text-black transition" aria-label="YouTube">
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M18.93 4.28c-.21-.98-1.65-1.75-3.34-1.75h-10c-1.69 0-3.13.77-3.34 1.75-.23 1.06-.23 2.69-.23 2.69s0 1.63.23 2.69c.21.98 1.65 1.75 3.34 1.75h10c1.69 0 3.13-.77 3.34-1.75.23-1.06.23-2.69.23-2.69s0-1.63-.23-2.69zM7.86 10.25v-4.5l4.84 2.25-4.84 2.25z"/></svg>
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

          {/* Info Row: Email - Phone - Address - Hours (all in one horizontal line) */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            <div className="text-center">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Email</h4>
              <p className="text-xs">info@littleink.com</p>
            </div>
            <div className="text-center">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Phone</h4>
              <p className="text-xs">+84 36 809 8894</p>
            </div>
            <div className="text-center">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Address</h4>
              <p className="text-xs">Ho Chi Minh, Vietnam</p>
            </div>
            <div className="text-center">
              <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Hours</h4>
              <p className="text-xs">Monday - Friday: 9am - 6pm</p>
              <p className="text-xs">Saturday: 10am - 4pm</p>
            </div>
          </div>

        <hr className="border-gray-700 my-8" />

        {/* Bottom Copyright */}
        <div className="text-center text-xs text-gray-500">
          <p>&copy; 2025 A Little Ink Tattoo Studio. All rights reserved.</p>
          <p className="mt-2">Designed with passion by <span className="text-white">David T</span> and team.</p>
        </div>
      </div>
    </footer>
  )
}
