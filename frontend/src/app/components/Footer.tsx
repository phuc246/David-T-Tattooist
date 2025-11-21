'use client'

import Link from 'next/link'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'

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
            <div className="grid grid-cols-2 gap-4">
              <a href="https://www.facebook.com/tran.duc.tuan.83868386/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition duration-300" aria-label="Facebook">
                <FaFacebookF className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/alittleink.skin/" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition duration-300" aria-label="Instagram">
                <FaInstagram className="w-5 h-5" />
              </a>
              <a href="https://www.youtube.com/@DavidTtattoos" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition duration-300" aria-label="YouTube">
                <FaYoutube className="w-5 h-5" />
              </a>
              <a href="https://zalo.me/0368098894" target="_blank" rel="noopener noreferrer" className="w-12 h-12 rounded-full border border-gray-600 flex items-center justify-center text-gray-400 hover:bg-white hover:text-black hover:border-white transition duration-300" aria-label="Zalo">
                <SiZalo className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>

        <hr className="border-gray-700 my-8" />

        {/* Info Row: Email - Phone - Address - Hours (all in one horizontal line) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
          <div className="text-center">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Email</h4>
            <p className="text-xs">alittleink.skin@gmail.com</p>
          </div>
          <div className="text-center">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Phone</h4>
            <p className="text-xs">+84 36 809 8894</p>
          </div>
          <div className="text-center">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider mb-1">Address</h4>
            <p className="text-xs">New City Thu Thiem 17 Đ Mai Chí Thọ, P An Khánh., Ho Chi Minh City, Vietnam</p>
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
