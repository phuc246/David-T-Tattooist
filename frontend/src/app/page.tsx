'use client'

import Link from 'next/link'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { useEffect, useState } from 'react'
import Image from 'next/image'
import BookingForm from './components/BookingForm'
import './featured-gallery.css'

// Hardcoded artist data
const ARTISTS = [
  {
    id: 1,
    name: 'DAVID T TATTOOIST',
    description: 'David T Tattooist được thành lập từ những nghệ sĩ xăm tài năng đến từ nhiều miền khác nhau. Với những trải nghiệm xăm nhiều năm kinh nghiệm và dạy nghề giải thưởng lớn khác nhau. Chúng tôi mong muốn mang đến bạn những hình xăm độc đáo và ý nghĩa. Tattoo được chăm chút tỉ mỉ bởi các nghệ sĩ của David T Tattooist.',
    image: '/img/A.Tuan.jpg',
    email: 'david@littleink.com',
    style: 'Black & White, Realistic',
  },
  {
    id: 2,
    name: 'Hasaki',
    description: 'David T Tattooist được thành lập từ những nghệ sĩ xăm tài năng đến từ nhiều miền khác nhau. Với những trải nghiệm xăm nhiều năm kinh nghiệm và dạy nghề giải thưởng lớn khác nhau. Chúng tôi mong muốn mang đến bạn những hình xăm độc đáo và ý nghĩa. Tattoo được chăm chút tỉ mỉ bởi các nghệ sĩ của David T Tattooist.',
    image: '/img/Tattoist.jpg',
    email: 'hasaki@littleink.com',
    style: 'Color, Watercolor',
  },
  {
    id: 3,
    name: 'Ricardo',
    description: 'David T Tattooist được thành lập từ những nghệ sĩ xăm tài năng đến từ nhiều miền khác nhau. Với những trải nghiệm xăm nhiều năm kinh nghiệm và dạy nghề giải thưởng lớn khác nhau. Chúng tôi mong muốn mang đến bạn những hình xăm độc đáo và ý nghĩa. Tattoo được chăm chút tỉ mỉ bởi các nghệ sĩ của David T Tattooist.',
    image: '/img/Tattoist1.jpg',
    email: 'ricardo@littleink.com',
    style: 'Minimalist, Geometric',
  },
]

// Hardcoded featured tattoo images
// Use the original six images from the legacy `phuc_pin/img` folder
const FEATURED_TATTOOS = [
  { id: 1, name: 'Design 1', image: '/img/all1.jpg', type: 'Black & White', style: 'Minimalist' },
  { id: 2, name: 'Design 2', image: '/img/all2.jpg', type: 'Black & White', style: 'Realistic' },
  { id: 3, name: 'Design 3', image: '/img/all3.jpg', type: 'Black & White', style: 'Geometric' },
  { id: 4, name: 'Design 4', image: '/img/all4.jpg', type: 'Black & White', style: 'Japanese' },
  { id: 5, name: 'Design 5', image: '/img/natra1.jpg', type: 'Color', style: 'Watercolor' },
  { id: 6, name: 'Design 6', image: '/img/natra2.jpg', type: 'Color', style: 'Floral' },
  { id: 7, name: 'Design 7', image: '/img/natra3.jpg', type: 'Color', style: 'Neo-Traditional' },
  { id: 8, name: 'Design 8', image: '/img/Soi.jpg', type: 'Color', style: 'Fine Line' },
]

export default function Home() {
  const [showBookingForm, setShowBookingForm] = useState(false)
  const [scrollY, setScrollY] = useState(0)

  const handleBookingClick = () => {
    setShowBookingForm(!showBookingForm)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
      
      // Move logo to nav when scrolled - REMOVED, logo should not appear on navbar
      const heroLogo = document.getElementById('hero-logo')
      
      if (heroLogo && scrollY > 100) {
        // Just hide the hero logo, don't move it to navbar
        heroLogo.style.opacity = String(Math.max(0, 1 - (scrollY - 100) / 500))
      } else if (heroLogo) {
        heroLogo.style.opacity = '1'
      }
    }
    
    // Intersection Observer for scroll reveal animations - repeatable
    const observerOptions = {
      threshold: 0.15,
      rootMargin: '0px 0px -100px 0px'
    }
    
    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        } else {
          // Remove revealed class when scrolling out of view to allow re-animation
          entry.target.classList.remove('revealed')
        }
      })
    }, observerOptions)
    
    // Observe all scroll reveal elements
    const scrollElements = document.querySelectorAll('.scroll-reveal, .scroll-reveal-left, .scroll-reveal-right, .scroll-reveal-scale, .scroll-section')
    scrollElements.forEach(el => {
      scrollObserver.observe(el)
    })
    
    // Observe footer
    const footer = document.getElementById('main-footer')
    if (footer) {
      scrollObserver.observe(footer)
    }
    
    window.addEventListener('scroll', handleScroll)
    handleScroll() // Initial call
    
    return () => {
      window.removeEventListener('scroll', handleScroll)
      scrollObserver.disconnect()
    }
  }, [])

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section with Video Background - matching legacy layout */}
      <section id="vd_Heading">
        {/* Video Background */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-screen object-cover"
        >
          <source src="/img/VD_heading.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/20 z-10"></div>

        {/* Content - Center Logo (matching legacy positioning) */}
        <div className="absolute inset-0 z-20 flex items-center justify-center">
          <img 
            src="/img/Chu A tach nen.png" 
            alt="A Little Ink Logo" 
            id="hero-logo"
            className="w-32 h-auto transition-all duration-1000"
            style={{
              transform: 'none',
              opacity: scrollY > 100 ? Math.max(0, 1 - (scrollY - 100) / 500) : 1
            }}
          />
        </div>
      </section>

      {/* Welcome Section with Image + Text - full screen */}
      <section className="relative h-screen w-full scroll-section">
        <div className="absolute inset-0">
          <img src="/img/studio.jpg" alt="Tattoo Studio" className="w-full h-full object-cover scroll-reveal-scale" />
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-center">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2">
            <div className="hidden lg:block" />
            <div className="p-8 lg:p-16 flex items-center">
              <div className="space-y-6 text-white">
                <h2 className="text-4xl lg:text-5xl font-bold scroll-reveal hover:scale-105 transition-transform duration-300 cursor-default">
                  Welcome to Tattoo in Saigon, Vietnam
                </h2>
                <p className="text-white-700 max-w-xl leading-relaxed scroll-reveal hover:text-white transition-colors duration-300 cursor-default">
                  David T Tattooist được thành lập từ những nghệ sĩ xăm tài năng đến từ nhiều miền khác nhau.
                  Với nhiều năm kinh nghiệm và giải thưởng trong nghề, chúng tôi mang đến những hình xăm độc đáo và ý nghĩa,
                  chăm chút tỉ mỉ bởi các nghệ sĩ của David T Tattooist.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Artists Section - Alternating Fullbleed Layout (Like Legacy) */}
      <section className="py-0 px-0 bg-white">
        <div className="w-full max-w-full">
          <h2 className="text-4xl font-bold text-center px-4 py-8 text-black">Artists</h2>
          
          {ARTISTS.map((artist, index) => (
            <div 
              key={artist.id} 
              id={`artist-${artist.id}`} 
              className="mb-0"
            >
              <div className={`flex flex-col lg:flex-row mb-16 gap-0 items-stretch overflow-hidden ${index % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}>
                {/* Image - Full bleed */}
                <div className="w-full lg:w-2/3 lg:h-[500px] h-[300px] overflow-hidden flex-shrink-0">
                  <img 
                    src={artist.image} 
                    alt={artist.name} 
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                </div>
                
                {/* Text Content */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between p-8 lg:px-16 py-0 bg-white">
                  {/* Content ở trên */}
                  <div className="max-w-lg space-y-6">
                    <h3 className="text-4xl lg:text-5xl font-bold text-black hover:scale-105 transition-transform duration-300">{artist.name}</h3>
                    <p className="text-gray-700 leading-relaxed text-justify lg:text-lg hover:text-black transition-colors duration-300">{artist.description}</p>
                    <div className="pt-6 space-y-3 border-t border-gray-300">
                      <p className="text-gray-600 hover:text-black transition-colors">
                        <span className="text-black font-semibold">Email:</span> {artist.email}
                      </p>
                      <p className="text-gray-600 hover:text-black transition-colors">
                        <span className="text-black font-semibold">Style:</span> {artist.style}
                      </p>
                    </div>
                  </div>
                  
                  {/* Button ở dưới cùng bên phải */}
                  <div className="flex justify-end mt-8">
                    <Link 
                      href={`/artists#artist-${artist.id}`} 
                      className="inline-block px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition transform hover:scale-105"
                    >
                      See more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      {/* Featured Gallery - Title + Grid Layout */}
      <section className="py-4 px-0 bg-white scroll-section overflow-hidden">
        <div className="w-full max-w-full">
          <h2 className="text-4xl font-bold text-center px-4 py-4 text-black scroll-reveal">Top Collections</h2>
          
          {/* Row 1: Black & White */}
          <div className="mb-0 scroll-section">
            {/* Title + divider row */}
            <div className="px-4 flex items-center gap-4 mb-8 scroll-reveal-left">
              <div className="h-8 w-1 bg-black flex-shrink-0"></div>
              <h3 className="text-2xl font-bold text-black uppercase tracking-wider whitespace-nowrap">Black &amp; White</h3>
            </div>
            
            {/* 4 Images Grid - Full width, no gap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full max-w-full overflow-hidden">
                {FEATURED_TATTOOS.filter(t => t.type === 'Black & White').map((tattoo, idx) => (
                  <div 
                    key={tattoo.id} 
                    className="group relative overflow-hidden cursor-pointer h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] scroll-reveal-scale"
                    style={{ transitionDelay: `${idx * 0.15}s` }}
                  >
                    <img 
                      src={tattoo.image} 
                      alt={tattoo.name} 
                      className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                      onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.src = '/img/studio.jpg'
                      }}
                    />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-lg font-bold mb-1 text-white">{tattoo.name}</h3>
                      <p className="text-gray-300 text-sm">{tattoo.style}</p>
                    </div>
                  </div>
                ))}
            </div>
          </div>

          {/* Row 2: Color */}
          <div className="my-8 scroll-section">
            {/* Title + divider row */}
            <div className="px-4 flex items-center gap-4 mb-8 scroll-reveal-right">
              <div className="h-8 w-1 bg-black flex-shrink-0"></div>
              <h3 className="text-2xl font-bold text-black uppercase tracking-wider whitespace-nowrap">Color</h3>
            </div>
            
            {/* 4 Images Grid - Full width, no gap */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-0 w-full max-w-full overflow-hidden">
              {FEATURED_TATTOOS.filter(t => t.type === 'Color').map((tattoo, idx) => (
                <div 
                  key={tattoo.id} 
                  className="group relative overflow-hidden cursor-pointer h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] scroll-reveal-scale"
                  style={{ transitionDelay: `${idx * 0.15}s` }}
                >
                  <img 
                    src={tattoo.image} 
                    alt={tattoo.name} 
                    className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                    onError={(e) => {
                      const img = e.target as HTMLImageElement
                      img.src = '/img/studio.jpg'
                    }}
                  />
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition duration-300 flex flex-col justify-end p-4">
                    <h3 className="text-lg font-bold mb-1 text-white">{tattoo.name}</h3>
                    <p className="text-gray-300 text-sm">{tattoo.style}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="text-center mt-0 px-4 scroll-reveal">
            <Link 
              href="/gallery" 
              className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition inline-block"
            >
              View All Designs
            </Link>
          </div>
        </div>
      </section>

      {/* Quy Trình Làm Việc Section */}
      <section className="py-20 px-4 bg-white scroll-section">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4 text-center text-black scroll-reveal">Quy Trình Làm Việc</h2>
          <p className="text-center text-gray-600 mb-16 max-w-3xl mx-auto scroll-reveal">
            Bạn có thể xem hình ảnh lên bất cứ bộ phận nào của cơ thể, dù đó là nơi để nhìn thấy hay ẩn đi, xong bạn nên hiểu hình xăm gì, ở dâu..., rất quan trọng. 
            Hãy để chúng tôi giúp bạn để lựa chọn hơn theo quy trình sau:
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '💡',
                title: 'Ý Tưởng',
                description: 'Bạn có ý tưởng về hình xăm bạn muốn'
              },
              {
                icon: '🎨',
                title: 'Thiết Kế',
                description: 'Chúng tôi sẽ thiết kế và tùy chỉnh theo yêu cầu'
              },
              {
                icon: '💰',
                title: 'Báo Giá',
                description: 'Chúng tôi sẽ báo giá chi tiết cho bạn'
              },
              {
                icon: '🔧',
                title: 'Xăm Hình',
                description: 'Thực hiện xăm hình với chất lượng cao'
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-50 p-8 rounded-lg border border-gray-200 text-center hover:shadow-lg transition scroll-reveal-scale" style={{ transitionDelay: `${idx * 0.1}s` }}>
                <div className="text-5xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-black">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Discover Tattoo Artistry Section - full screen with booking form filling height */}
      <section id="booking" className="relative h-screen w-full bg-black/85 scroll-section">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-30 scroll-reveal-scale"
        >
          <source src="/img/class.mp4" type="video/mp4" />
        </video>

        <div className="relative z-10 max-w-7xl mx-auto h-full flex items-stretch">
          <div className="w-full grid grid-cols-1 lg:grid-cols-2 h-full">
            {/* Left Content - vertically centered */}
            <div className="flex items-center p-8 lg:p-16">
              <div className="space-y-6 text-white">
                <h2 className="text-4xl lg:text-5xl font-bold scroll-reveal-left">Discover Tattoo Artistry With Us</h2>
                <p className="text-white-700 max-w-xl leading-relaxed scroll-reveal">
                  Welcome to our in-depth tattoo course, where you'll gain knowledge from basic to advanced levels,
                  taught by leading artists. From drawing techniques and machine usage to safety and hygiene protocols,
                  we are committed to providing a professional and inspiring learning environment.
                </p>
                <p className="text-white-700 font-semibold scroll-reveal">Start your journey to becoming a true tattoo artist today!</p>
              </div>
            </div>

            {/* Booking Form - Right Side (compact) */}
            <div className="flex items-center justify-center p-8 lg:p-12">
              <div className="w-full max-w-md scroll-reveal-right">
                <BookingForm className="w-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer id="main-footer" />
    </div>
  )
}
