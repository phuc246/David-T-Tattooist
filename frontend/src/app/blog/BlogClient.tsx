'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { motion } from 'framer-motion'
import { FaFacebookF, FaInstagram, FaYoutube } from 'react-icons/fa'
import { SiZalo } from 'react-icons/si'

interface BlogClientProps {
    initialPosts: any[]
    initialPageContent: any
}

export default function BlogClient({ initialPosts, initialPageContent }: BlogClientProps) {
    const [posts] = useState(initialPosts)
    const [selectedPost, setSelectedPost] = useState<any>(null)
    const [pageContent] = useState(initialPageContent)

    const featuredPost = posts.length > 0 ? posts[0] : null
    const otherPosts = posts.length > 1 ? posts.slice(1) : []

    return (
        <div className="min-h-screen bg-white text-black">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-24 pb-12 px-4 h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 z-0">
                    {pageContent?.heroVideo ? (
                        <video autoPlay loop muted playsInline preload="auto" className="w-full h-full object-cover">
                            <source src={pageContent.heroVideo.url} type="video/mp4" />
                        </video>
                    ) : (
                        <div className="w-full h-full bg-black flex items-center justify-center">
                            <Image src="/img/Chu A tach nen.png" alt="Hero" width={256} height={256} className="opacity-20" />
                        </div>
                    )}
                    <div className="absolute inset-0 bg-black/10"></div>
                </div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight text-white">{pageContent?.heroTitle || 'Tattoo Blog'}</h1>
                    <p className="text-xl lg:text-2xl text-gray-300 mb-8">{pageContent?.heroDescription || 'Insights, tips, and stories from the tattoo world.'}</p>
                </div>
            </section>

            {/* Featured Post */}
            {featuredPost && (
                <section className="px-4 py-20">
                    <div className="max-w-7xl mx-auto">
                        <h2 className="text-4xl font-bold text-black mb-12 text-center">Latest News</h2>
                        <article className="group relative overflow-hidden rounded-lg border-2 border-gray-200 hover:border-black transition cursor-pointer shadow-lg" onClick={() => setSelectedPost(featuredPost)}>
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <div className="relative h-[400px] lg:h-[500px] overflow-hidden">
                                    <Image src={featuredPost.image?.url || '/img/chu A do.png'} alt={featuredPost.title} fill className="object-cover group-hover:scale-110 transition duration-500" sizes="(max-width: 1024px) 100vw, 50vw" />
                                </div>
                                <div className="bg-gray-50 p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex gap-2 flex-wrap mb-4">
                                        {featuredPost.tags?.slice(0, 2).map((tag: string) => <span key={tag} className="px-3 py-1 bg-black text-white text-xs rounded-full">{tag}</span>)}
                                    </div>
                                    <h2 className="text-3xl lg:text-4xl font-bold mb-4 text-black">{featuredPost.title}</h2>
                                    <p className="text-gray-600 text-sm mb-6">{new Date(featuredPost.publicationDate || featuredPost.publishedAt || featuredPost.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                    <div className="text-gray-700 line-clamp-3 mb-6 text-lg prose max-w-none" dangerouslySetInnerHTML={{ __html: featuredPost.excerpt || featuredPost.content?.html || '' }} />
                                    <span className="text-black font-semibold group-hover:translate-x-2 transition inline-flex items-center gap-2">Read More →</span>
                                </div>
                            </div>
                        </article>
                    </div>
                </section>
            )}

            {/* Other Posts Grid */}
            <section className="px-4 pb-20">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-12"><h2 className="text-4xl font-bold text-black">Latest Articles</h2></div>
                    {otherPosts.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {otherPosts.map((post: any) => (
                                <article key={post.id} className="group bg-white rounded-lg overflow-hidden border-2 border-gray-200 hover:border-black transition cursor-pointer h-full flex flex-col shadow-md" onClick={() => setSelectedPost(post)}>
                                    <div className="relative h-64 overflow-hidden">
                                        <Image src={post.image?.url || '/img/chu A do.png'} alt={post.title} fill className="object-cover group-hover:scale-110 transition duration-500" sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw" />
                                    </div>
                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex gap-2 flex-wrap mb-3">
                                            {post.tags?.slice(0, 2).map((tag: string) => <span key={tag} className="px-2 py-1 bg-gray-100 border border-gray-300 text-black text-xs rounded">{tag}</span>)}
                                        </div>
                                        <h3 className="text-xl font-bold mb-2 text-black line-clamp-2">{post.title}</h3>
                                        <p className="text-gray-600 text-xs mb-4">{new Date(post.publicationDate || post.publishedAt || post.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</p>
                                        <div className="text-gray-700 line-clamp-3 mb-4 text-sm flex-1 prose max-w-none" dangerouslySetInnerHTML={{ __html: post.excerpt || post.content?.html || '' }} />
                                        <span className="text-black text-sm font-semibold group-hover:translate-x-2 transition inline-flex items-center gap-2">Read More →</span>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-10"><p className="text-gray-500">No more articles found.</p></div>
                    )}
                </div>
            </section>

            {/* Stay Connected Section */}
            <section className="relative px-4 py-24 bg-white overflow-hidden border-t border-zinc-100">
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <h2 className="text-5xl md:text-7xl font-black mb-6 text-black uppercase tracking-tighter">STAY CONNECTED</h2>
                    <p className="text-zinc-600 mb-12 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed">Join our community of art enthusiasts.</p>
                    <div className="grid grid-cols-2 sm:flex sm:justify-center gap-4 mb-16">
                        {[
                            { label: 'Facebook', href: 'https://www.facebook.com/tran.duc.tuan.83868386/', icon: <FaFacebookF className="w-6 h-6" /> },
                            { label: 'Instagram', href: 'https://www.instagram.com/alittleink.skin/', icon: <FaInstagram className="w-6 h-6" /> },
                            { label: 'YouTube', href: 'https://www.youtube.com/@DavidTtattoos', icon: <FaYoutube className="w-7 h-7" /> },
                            { label: 'Zalo', href: 'https://zalo.me/0368098894', icon: <SiZalo className="w-8 h-8" /> }
                        ].map((social) => (
                            <a key={social.label} href={social.href} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center sm:w-16 sm:h-16 w-full h-14 rounded-full border border-zinc-200 bg-white text-zinc-400 hover:text-black hover:border-black transition-all duration-300 transform hover:scale-110 shadow-sm" aria-label={social.label}>{social.icon}</a>
                        ))}
                    </div>
                    <div className="pt-12 border-t border-zinc-100">
                        <Link href="/?scroll=booking" className="group relative inline-flex items-center justify-center px-12 py-5 bg-black text-white hover:bg-zinc-800 rounded-full font-black text-xl transition-all duration-300 transform hover:scale-105 shadow-xl"><span className="relative z-10">Contact Us</span></Link>
                    </div>
                </div>
            </section>

            {/* Modal for post details */}
            {selectedPost && (
                <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4 overflow-auto" onClick={() => setSelectedPost(null)}>
                    <div className="bg-white rounded-lg p-8 max-w-4xl w-full max-h-[90vh] overflow-auto shadow-2xl my-8" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-4xl font-bold text-black">{selectedPost.title}</h2>
                            <button onClick={() => setSelectedPost(null)} className="text-black hover:text-gray-600 text-3xl font-bold">×</button>
                        </div>
                        <div className="relative mb-6 h-[400px] rounded-lg overflow-hidden">
                            <Image src={selectedPost.image?.url || '/img/chu A do.png'} alt={selectedPost.title} fill className="object-cover" />
                        </div>
                        <div className="prose max-w-none text-gray-700 leading-relaxed"><div dangerouslySetInnerHTML={{ __html: selectedPost.content?.html || '' }} /></div>
                        <div className="mt-8 pt-8 border-t-2 border-gray-200 flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Link href="/?scroll=booking" className="px-10 py-4 bg-black text-white hover:bg-gray-800 rounded-lg font-bold text-xl transition transform hover:scale-105">Contact Us</Link>
                        </div>
                    </div>
                </div>
            )}
            <Footer id="main-footer" />
        </div>
    )
}
