'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function BlogPage() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<any>(null)

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:3001/api/posts/published')
        if (res.ok) {
          setPosts(await res.json())
        }
      } catch (error) {
        console.error('Error fetching posts:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchPosts()
  }, [])

  useEffect(() => {
    // Footer animation observer
    const footerObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
        }
      })
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    })

    const footer = document.getElementById('main-footer')
    if (footer) {
      footerObserver.observe(footer)
    }

    return () => {
      footerObserver.disconnect()
    }
  }, [])

  // Sample posts if API returns empty
  const samplePosts = [
    {
      _id: '1',
      title: 'The Art of Black & White Tattoos',
      content: 'Black and white tattoos have a timeless appeal. They showcase the artist\'s skill in shading and line work, creating depth and dimension without color. This style has been popular for decades and continues to evolve with modern techniques.',
      createdAt: new Date().toISOString(),
      tags: ['Tattoo Styles', 'Black & White', 'Techniques'],
      image: '/img/all1.jpg',
      slug: 'art-of-black-white-tattoos'
    },
    {
      _id: '2',
      title: 'Color Tattoo Trends 2024',
      content: 'Color tattoos are making a huge comeback this year. From vibrant watercolor effects to bold neo-traditional designs, artists are pushing the boundaries of what\'s possible with color ink. Learn about the latest trends and techniques.',
      createdAt: new Date().toISOString(),
      tags: ['Color Tattoos', 'Trends', '2024'],
      image: '/img/natra1.jpg',
      slug: 'color-tattoo-trends-2024'
    },
    {
      _id: '3',
      title: 'Tattoo Aftercare: Complete Guide',
      content: 'Proper aftercare is crucial for a beautiful, long-lasting tattoo. This comprehensive guide covers everything you need to know about caring for your new tattoo, from the first day to complete healing.',
      createdAt: new Date().toISOString(),
      tags: ['Aftercare', 'Health', 'Tips'],
      image: '/img/all2.jpg',
      slug: 'tattoo-aftercare-guide'
    },
    {
      _id: '4',
      title: 'Japanese Tattoo Traditions',
      content: 'Japanese tattoo art, known as irezumi, has a rich history spanning centuries. From traditional motifs to modern interpretations, discover the cultural significance and artistic beauty of Japanese tattoo styles.',
      createdAt: new Date().toISOString(),
      tags: ['Japanese', 'Culture', 'History'],
      image: '/img/all3.jpg',
      slug: 'japanese-tattoo-traditions'
    },
    {
      _id: '5',
      title: 'Minimalist Tattoo Designs',
      content: 'Less is more when it comes to minimalist tattoos. These delicate designs prove that simplicity can be incredibly powerful. Explore the beauty of fine-line work and subtle shading in minimalist tattoo art.',
      createdAt: new Date().toISOString(),
      tags: ['Minimalist', 'Design', 'Fine Line'],
      image: '/img/all4.jpg',
      slug: 'minimalist-tattoo-designs'
    },
    {
      _id: '6',
      title: 'Realistic Tattoo Techniques',
      content: 'Realistic tattoos require exceptional skill and attention to detail. Learn about the techniques used by master artists to create photorealistic tattoos that look like they could jump off the skin.',
      createdAt: new Date().toISOString(),
      tags: ['Realistic', 'Techniques', 'Advanced'],
      image: '/img/all5.jpg',
      slug: 'realistic-tattoo-techniques'
    }
  ]

  const displayPosts = posts.length > 0 ? posts : samplePosts
  const featuredPost = displayPosts[0]
  const otherPosts = displayPosts.slice(1)

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 text-black">Tattoo Blog</h1>
          <p className="text-xl lg:text-2xl text-gray-700 max-w-3xl mx-auto">
            Insights, tips, and stories from the tattoo world. Discover techniques, trends, and the artistry behind every design.
          </p>
        </div>
      </section>

      {loading ? (
        <div className="text-center py-20">
          <p className="text-gray-600">Loading posts...</p>
        </div>
      ) : (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <section className="px-4 pb-16">
              <div className="max-w-7xl mx-auto">
                <div className="mb-8">
                  <span className="text-sm uppercase tracking-wider text-gray-600">Featured Article</span>
                </div>
                <article 
                  className="group relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-black transition cursor-pointer shadow-lg"
                  onClick={() => setSelectedPost(featuredPost)}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                      <img
                        src={(featuredPost as any).image || '/img/all1.jpg'}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </div>
                    <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex gap-2 flex-wrap mb-4">
                        {(featuredPost as any).tags?.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="px-3 py-1 bg-black text-white text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black group-hover:text-gray-700 transition">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-6">
                        {new Date(featuredPost.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'long', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-gray-700 line-clamp-3 mb-6 text-lg">
                        {(featuredPost as any).content || featuredPost.content}
                      </p>
                      <span className="text-black font-semibold group-hover:translate-x-2 transition inline-flex items-center gap-2">
                        Read More →
                      </span>
                    </div>
                  </div>
                </article>
              </div>
            </section>
          )}

          {/* Other Posts Grid */}
          <section className="px-4 pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-black">Latest Articles</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {otherPosts.map((post: any) => (
                  <article 
                    key={post._id} 
                    className="group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-black transition cursor-pointer h-full flex flex-col shadow-md"
                    onClick={() => setSelectedPost(post)}
                  >
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={post.image || '/img/all1.jpg'}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
                        onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex gap-2 flex-wrap mb-3">
                        {post.tags?.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="px-2 py-1 bg-gray-100 border border-gray-300 text-black text-xs rounded">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-xl font-bold mb-2 text-black group-hover:text-gray-700 transition line-clamp-2">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-xs mb-4">
                        {new Date(post.createdAt).toLocaleDateString('en-US', { 
                          year: 'numeric', 
                          month: 'short', 
                          day: 'numeric' 
                        })}
                      </p>
                      <p className="text-gray-700 line-clamp-3 mb-4 text-sm flex-1">
                        {post.content}
                      </p>
                      <span className="text-black text-sm font-semibold group-hover:translate-x-2 transition inline-flex items-center gap-2">
                        Read More →
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </section>

          {/* Newsletter Section */}
          <section className="px-4 py-20 bg-gray-50 border-t-2 border-gray-200">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-4xl font-bold mb-4 text-black">Stay Updated</h2>
              <p className="text-gray-700 mb-8 text-lg">
                Subscribe to our newsletter for the latest tattoo trends, tips, and artist spotlights
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your email address"
                  className="flex-1 px-6 py-3 bg-white border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black/50 focus:border-black text-black placeholder-gray-400"
                />
                <button className="px-8 py-3 border-2 border-black text-black hover:bg-black hover:text-white rounded-lg font-semibold transition">
                  Subscribe
                </button>
              </div>
            </div>
          </section>
        </>
      )}

      {/* Blog Post Modal */}
      {selectedPost && (
        <div 
          className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto"
          onClick={() => setSelectedPost(null)}
        >
          <div 
            className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-4xl font-bold text-black">{selectedPost.title}</h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="text-black hover:text-gray-600 text-3xl font-bold leading-none w-8 h-8 flex items-center justify-center"
              >
                ×
              </button>
            </div>
            
            <div className="mb-6">
              <img
                src={(selectedPost as any).image || '/img/all1.jpg'}
                alt={selectedPost.title}
                className="w-full h-[400px] object-cover rounded-lg"
                onError={(e) => {(e.target as HTMLImageElement).src = '/img/all1.jpg'}}
              />
            </div>

            <div className="flex gap-2 flex-wrap mb-6">
              {(selectedPost as any).tags?.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-black text-white text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-600 text-sm mb-8">
              {new Date(selectedPost.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <p className="text-lg mb-4">{(selectedPost as any).content || selectedPost.content}</p>
              <p className="mb-4">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <p className="mb-4">
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
            </div>

            <div className="mt-8 pt-8 border-t-2 border-gray-200">
              <Link
                href="/#booking"
                className="inline-block px-8 py-3 bg-black text-white hover:bg-gray-800 rounded-lg font-semibold transition"
              >
                Book a Consultation
              </Link>
            </div>
          </div>
        </div>
      )}

      <Footer id="main-footer" />
    </div>
  )
}
