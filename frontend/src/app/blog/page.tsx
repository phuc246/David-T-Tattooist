'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { getBlogPosts, getPageContent } from '../../../lib/queries'
import { BlogCardSkeleton } from '../components/SkeletonLoader'
import { motion } from 'framer-motion'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'

export default function BlogPage() {
  const [posts, setPosts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedPost, setSelectedPost] = useState<any>(null)
  const [pageContent, setPageContent] = useState<any>(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postsData, pageData] = await Promise.all([
          getBlogPosts(),
          getPageContent('blog')
        ])
        setPosts(postsData)
        setPageContent(pageData)
      } catch (error) {
        console.error('Error fetching data:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
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

  const featuredPost = posts.length > 0 ? posts[0] : null
  const otherPosts = posts.length > 1 ? posts.slice(1) : []

  return (
    <div className="min-h-screen bg-white text-black">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-24 pb-12 px-4 h-screen flex items-center justify-center overflow-hidden">
        {/* Background Video */}
        <div className="absolute inset-0 z-0">
          {pageContent?.heroVideo ? (
            <video
              key={pageContent?.heroVideo?.url}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src={pageContent.heroVideo.url} type="video/mp4" />
            </video>
          ) : (
            <video
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            >
              <source src="/img/Chu A tach nen.png" type="image/png" />
            </video>
          )}
          <div className="absolute inset-0 bg-black/10"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center max-w-4xl px-4">
          <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">
            {pageContent?.heroTitle || 'Tattoo Blog'}
          </h1>
          <p className="text-xl lg:text-2xl text-gray-300 mb-8">
            {pageContent?.heroDescription || 'Insights, tips, and stories from the tattoo world. Discover techniques, trends, and the artistry behind every design.'}
          </p>
        </div>
      </section>

      {loading ? (
        <>
          {/* Featured Post Skeleton */}
          <section className="px-4 py-20">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-4xl font-bold text-black mb-12 text-center">Latest News</h2>
              <BlogCardSkeleton featured={true} />
            </div>
          </section>

          {/* Other Posts Skeleton */}
          <section className="px-4 pb-20">
            <div className="max-w-7xl mx-auto">
              <div className="mb-12">
                <h2 className="text-4xl font-bold text-black">Latest Articles</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
              </div>
            </div>
          </section>
        </>
      ) : (
        <>
          {/* Featured Post */}
          {featuredPost && (
            <section className="px-4 py-20">
              <div className="max-w-7xl mx-auto">
                <h2 className="text-4xl font-bold text-black mb-12 text-center">Latest News</h2>
                {/* <div className="mb-8">
                  <span className="text-sm uppercase tracking-wider text-gray-600">Featured Article</span>
                </div> */}
                <article
                  className="group relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-black transition cursor-pointer shadow-lg"
                  onClick={() => setSelectedPost(featuredPost)}
                >
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                      <Image
                        src={featuredPost.image?.url || '/img/Chu A tach nen.png'}
                        alt={featuredPost.title}
                        fill
                        className="object-cover group-hover:scale-110 transition duration-500"
                        sizes="(max-width: 1024px) 100vw, 50vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
                    </div>
                    <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-center">
                      <div className="flex gap-2 flex-wrap mb-4">
                        {featuredPost.tags?.slice(0, 2).map((tag: string) => (
                          <span key={tag} className="px-3 py-1 bg-black text-white text-xs rounded-full">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black group-hover:text-gray-700 transition">
                        {featuredPost.title}
                      </h2>
                      <p className="text-gray-600 text-sm mb-6">
                        {new Date(featuredPost.publicationDate || featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric'
                        })}
                      </p>
                      <div className="text-gray-700 line-clamp-3 mb-6 text-lg prose max-w-none" dangerouslySetInnerHTML={{ __html: featuredPost.excerpt || featuredPost.content?.html || '' }} />
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

              {otherPosts.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {otherPosts.map((post: any) => (
                    <article
                      key={post.id}
                      className="group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-black transition cursor-pointer h-full flex flex-col shadow-md"
                      onClick={() => setSelectedPost(post)}
                    >
                      <div className="relative h-64 overflow-hidden">
                        <Image
                          src={post.image?.url || '/img/Chu A tach nen.png'}
                          alt={post.title}
                          fill
                          className="object-cover group-hover:scale-110 transition duration-500"
                          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                          {new Date(post.publicationDate || post.publishedAt || post.createdAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric'
                          })}
                        </p>
                        <div className="text-gray-700 line-clamp-3 mb-4 text-sm flex-1 prose max-w-none" dangerouslySetInnerHTML={{ __html: post.excerpt || post.content?.html || '' }} />
                        <span className="text-black text-sm font-semibold group-hover:translate-x-2 transition inline-flex items-center gap-2">
                          Read More →
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              ) : (
                <div className="text-center py-10">
                  <p className="text-gray-500">No more articles found.</p>
                </div>
              )}
            </div>
          </section>

          {/* Stay Connected Section */}
          <section className="relative px-4 py-24 bg-white overflow-hidden border-t border-zinc-100">
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 z-0 pointer-events-none">
              <div className="absolute top-[-10%] left-[-5%] w-[40%] h-[40%] bg-zinc-100 rounded-full blur-[100px] opacity-60"></div>
              <div className="absolute bottom-[-10%] right-[-5%] w-[40%] h-[40%] bg-zinc-50 rounded-full blur-[100px] opacity-60"></div>
            </div>

            <div className="relative z-10 max-w-4xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
              >
                <h2 className="text-5xl md:text-7xl font-black mb-6 text-black uppercase tracking-tighter cursor-default group">
                  <span className="inline-block transition-transform duration-300 group-hover:-translate-y-2 group-hover:text-zinc-600">STAY</span>{" "}
                  <span className="inline-block transition-transform duration-300 delay-75 group-hover:-translate-y-2 group-hover:text-zinc-400">CONNECTED</span>
                </h2>
                <div className="w-24 h-1 bg-black mx-auto mb-10 transform origin-left transition-all duration-500 group-hover:w-48 group-hover:bg-zinc-300"></div>

                <p className="text-zinc-600 mb-12 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">
                  Join our community of art enthusiasts. Follow us for the latest tattoo trends, expert techniques, and professional advice.
                </p>
              </motion.div>

              {/* Social Media Icons */}
              <motion.div
                className="grid grid-cols-2 sm:flex sm:justify-center gap-4 mb-16"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
              >
                {[
                  { label: 'Facebook', href: 'https://www.facebook.com/tran.duc.tuan.83868386/', icon: <FaFacebookF className="w-6 h-6" /> },
                  { label: 'Instagram', href: 'https://www.instagram.com/alittleink.skin/', icon: <FaInstagram className="w-6 h-6" /> },
                  { label: 'YouTube', href: 'https://www.youtube.com/@DavidTtattoos', icon: <FaYoutube className="w-7 h-7" /> },
                  { label: 'Zalo', href: 'https://zalo.me/0368098894', icon: <SiZalo className="w-8 h-8" /> }
                ].map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center sm:w-16 sm:h-16 w-full h-14 rounded-full border border-zinc-200 bg-white text-zinc-400 hover:text-black hover:border-black transition-all duration-300 transform hover:scale-110 shadow-sm hover:shadow-md group"
                    aria-label={social.label}
                  >
                    <span className="sm:hidden mr-2 text-sm font-bold uppercase tracking-widest">{social.label}</span>
                    <motion.div whileHover={{ rotate: 10 }}>{social.icon}</motion.div>
                  </a>
                ))}
              </motion.div>

              {/* Contact CTA */}
              <motion.div
                className="pt-12 border-t border-zinc-100"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.5 }}
              >
                <p className="text-zinc-500 mb-6 uppercase tracking-[0.2em] text-xs font-bold">Have a specific vision?</p>
                <Link
                  href="/#booking"
                  className="group relative inline-flex items-center justify-center px-12 py-5 bg-black text-white hover:bg-zinc-800 rounded-full font-black text-xl transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-2xl overflow-hidden"
                >
                  <span className="relative z-10">Contact Us</span>
                  <div className="absolute inset-0 bg-zinc-700 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"></div>
                </Link>
              </motion.div>
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

            <div className="relative mb-6 h-[400px] rounded-lg overflow-hidden">
              <Image
                src={selectedPost.image?.url || '/img/Chu A tach nen.png'}
                alt={selectedPost.title}
                fill
                className="object-cover"
                sizes="(max-width: 896px) 100vw, 896px"
              />
            </div>

            <div className="flex gap-2 flex-wrap mb-6">
              {selectedPost.tags?.map((tag: string) => (
                <span key={tag} className="px-3 py-1 bg-black text-white text-xs rounded-full">
                  {tag}
                </span>
              ))}
            </div>

            <p className="text-gray-600 text-sm mb-8">
              {new Date(selectedPost.publicationDate || selectedPost.publishedAt || selectedPost.createdAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>

            <div className="prose max-w-none text-gray-700 leading-relaxed">
              <div dangerouslySetInnerHTML={{ __html: selectedPost.content?.html || '' }} />
            </div>

            <div className="mt-8 pt-8 border-t-2 border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link
                href="/#booking"
                className="px-10 py-4 bg-black text-white hover:bg-gray-800 rounded-lg font-bold text-xl transition transform hover:scale-105 shadow-lg"
              >
                Contact Us
              </Link>

              <a
                href={selectedPost.artist?.instagram || 'https://instagram.com'}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 bg-white border-2 border-gray-200 text-black hover:border-black hover:bg-gray-50 rounded-lg transition transform hover:scale-105 shadow-md flex items-center justify-center"
                title="Visit Instagram"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
              </a>
            </div>
          </div>
        </div>
      )}

      <Footer id="main-footer" />
    </div>
  )
}
