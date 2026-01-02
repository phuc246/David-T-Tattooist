'use client'

import Link from 'next/link'
import Image from 'next/image'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useState, useEffect } from 'react'
import { getCourses, getPageContent } from '../../../lib/queries'
import { FaStar, FaTrophy, FaGem, FaInstagram, FaBolt, FaChevronRight } from 'react-icons/fa'
import { CourseCardSkeleton } from '../components/SkeletonLoader'

export default function ClassesPage() {

    const [courses, setCourses] = useState<any[]>([])
    const [pageContent, setPageContent] = useState<any>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [coursesData, classesPageData] = await Promise.all([
                    getCourses(),
                    getPageContent('classes')
                ])
                setCourses(coursesData)
                setPageContent(classesPageData)
            } catch (error) {
                console.error('Error fetching classes data:', error)
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

    return (
        <div className="min-h-screen bg-black text-white">
            <Navbar />

            {/* Hero Section with Image */}
            <section className="relative pt-24 pb-12 px-4 h-screen flex items-center justify-center overflow-hidden">
                {pageContent?.heroImage?.url ? (
                    <Image
                        src={pageContent.heroImage.url}
                        alt="Background"
                        fill
                        className="object-cover"
                        priority
                    />
                ) : (
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                        <Image
                            src="/img/Chu A tach nen.png"
                            alt="Background"
                            width={256}
                            height={256}
                            className="opacity-20"
                        />
                    </div>
                )}
                <div className="absolute inset-0 bg-black/50"></div>

                <div className="relative z-10 text-center max-w-4xl px-4">
                    <h1 className="text-6xl lg:text-7xl font-bold mb-6 leading-tight">Tattoo Classes & Training</h1>
                    <p className="text-xl lg:text-2xl text-gray-300 mb-8">
                        Master the art of tattooing from professional artists with years of experience
                    </p>
                    <div className="flex flex-wrap justify-center gap-4 text-sm">
                        <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                            <span className="font-semibold">✓ Professional Instructors</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                            <span className="font-semibold">✓ Hands-on Training</span>
                        </div>
                        <div className="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-lg border border-white/20">
                            <span className="font-semibold">✓ Certification Program</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Why Choose Us Section */}
            <section className="py-20 px-4 bg-white text-black">
                <div className="max-w-6xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">Why Choose Our Classes?</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: FaStar,
                                title: 'Award-Winning Masters',
                                description: 'Train under internationally recognized artists who have won prestigious awards and shaped the industry with their innovative techniques.'
                            },
                            {
                                icon: FaTrophy,
                                title: 'Industry-Leading Studio',
                                description: 'Access state-of-the-art equipment and professional-grade materials in our world-class training facility designed for excellence.'
                            },
                            {
                                icon: FaGem,
                                title: 'Certified Excellence',
                                description: 'Earn globally recognized certification that opens doors to premium studios and establishes your credibility in the tattoo industry.'
                            }
                        ].map((item, idx) => {
                            const IconComponent = item.icon
                            return (
                                <div key={idx} className="text-center p-8 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-2xl hover:scale-105 transition-all duration-300">
                                    <div className="flex justify-center mb-6">
                                        <IconComponent className="w-16 h-16 text-black" />
                                    </div>
                                    <h3 className="text-2xl font-bold mb-4 text-black">{item.title}</h3>
                                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* Courses Section */}
            <section className="py-20 px-4 bg-black text-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-16 text-center">Our Courses</h2>
                    {loading ? (
                        <div className="grid grid-cols-1 gap-12">
                            <CourseCardSkeleton />
                            <CourseCardSkeleton />
                        </div>
                    ) : courses.length === 0 ? (
                        <div className="text-center py-20">
                            <p className="text-gray-400 text-xl">No courses available at the moment. Please check back later.</p>
                        </div>
                    ) : (
                        <div className="space-y-12">
                            {courses.map((course, idx) => (
                                <div
                                    key={course.id}
                                    className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${idx % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
                                >
                                    <div className={idx % 2 === 1 ? 'lg:col-start-2' : ''}>
                                        {course.image?.mimeType?.startsWith('video/') || course.videoUrl ? (
                                            <div className="relative rounded-lg overflow-hidden aspect-video border border-white/20">
                                                <video
                                                    autoPlay
                                                    loop
                                                    muted
                                                    playsInline
                                                    className="w-full h-full object-cover"
                                                >
                                                    <source src={course.videoUrl || course.image?.url} type="video/mp4" />
                                                </video>
                                            </div>
                                        ) : course.image?.url ? (
                                            <div className="relative rounded-lg overflow-hidden aspect-video border border-white/20">
                                                <Image
                                                    src={course.image.url}
                                                    alt={course.title}
                                                    fill
                                                    className="object-cover"
                                                    sizes="(max-width: 1024px) 100vw, 50vw"
                                                />
                                            </div>
                                        ) : (
                                            <div className="relative rounded-lg overflow-hidden aspect-video border border-white/20 bg-gray-800 flex items-center justify-center">
                                                <Image
                                                    src="/img/Chu A tach nen.png"
                                                    alt={course.title}
                                                    width={128}
                                                    height={128}
                                                    className="opacity-30"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    <div className={idx % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                                        <div className="bg-white/5 backdrop-blur-sm p-8 rounded-lg border border-white/10">
                                            <div className="flex items-center gap-4 mb-4">
                                                <span className="px-4 py-1 bg-white/20 rounded-full text-sm font-semibold">{course.level}</span>
                                                <span className="text-gray-400">{course.duration}</span>
                                            </div>
                                            <h3 className="text-3xl lg:text-4xl font-bold mb-4">{course.title}</h3>
                                            <div
                                                className="text-xl text-gray-300 mb-6"
                                                dangerouslySetInnerHTML={{ __html: course.description?.html || course.description }}
                                            />

                                            {course.features && course.features.length > 0 && (
                                                <ul className="space-y-3 mb-8">
                                                    {course.features.map((feature: string, fIdx: number) => (
                                                        <li key={fIdx} className="flex items-center gap-3">
                                                            <span className="text-white">✓</span>
                                                            <span className="text-gray-300">{feature}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Gallery Section - Student Work */}
            <section className="py-20 px-4 bg-white text-black">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-4xl lg:text-5xl font-bold mb-12 text-center">Student Work</h2>
                    {pageContent?.studentWorkImages && pageContent.studentWorkImages.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {pageContent.studentWorkImages.map((img: any, idx: number) => (
                                <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group cursor-pointer">
                                    <Image
                                        src={img.url}
                                        alt={`Student work ${idx + 1}`}
                                        fill
                                        className="object-cover group-hover:scale-110 transition duration-300"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex items-center justify-center">
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-12">
                            <div className="inline-block p-12 bg-gray-50 rounded-lg">
                                <Image
                                    src="/img/Chu A tach nen.png"
                                    alt="No student work available"
                                    width={192}
                                    height={192}
                                    className="mx-auto opacity-30"
                                />
                                <p className="text-gray-500 mt-6">Student work gallery coming soon</p>
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Registration Form */}
            <section className="py-20 px-4 bg-black text-white relative overflow-hidden">
                {/* Large Background Arrow Effect */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden opacity-20">
                    <div className="flex -space-x-12 sm:-space-x-24 scale-150 sm:scale-100 transform -rotate-12 sm:rotate-0">
                        {[...Array(5)].map((_, i) => (
                            <FaChevronRight
                                key={i}
                                className="w-48 h-48 sm:w-96 sm:h-96 text-white animate-pulse"
                                style={{
                                    opacity: 0.1 + (i * 0.15),
                                    animationDelay: `${i * 0.2}s`
                                }}
                            />
                        ))}
                    </div>
                </div>

                <div className="max-w-3xl mx-auto relative z-10">
                    <div className="bg p-12 rounded-2xl border border-white/10 text-center relative overflow-hidden group">
                        {/* Decorative background elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white/50 to-transparent opacity-50"></div>
                        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition duration-700"></div>
                        <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-white/5 rounded-full blur-3xl group-hover:bg-white/10 transition duration-700"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl lg:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-400">
                                Ready to Start Your Journey?
                            </h2>
                            <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto leading-relaxed">
                                Join our community of passionate artists. Whether you're a beginner looking to hold your first machine or an experienced artist refining your craft, we're here to guide you every step of the way.
                            </p>

                            <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                                <Link
                                    href="/?scroll=booking"
                                    className="group/btn px-8 py-4 bg-white text-black font-bold rounded-full hover:bg-gray-200 transition transform hover:scale-105 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] flex items-center gap-3 relative overflow-hidden"
                                >
                                    <span className="relative z-10">Get Your Spot Now</span>
                                    <div className="relative z-10 bg-black text-white rounded-full p-1 group-hover/btn:rotate-45 transition duration-300">
                                        <FaBolt className="w-4 h-4" />
                                    </div>
                                </Link>

                                <a
                                    href="https://www.instagram.com/alittleink.skin/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="px-8 py-4 border border-white/30 text-white font-bold rounded-full hover:bg-white/10 transition transform hover:scale-105 flex items-center gap-2 backdrop-blur-sm"
                                >
                                    <FaInstagram className="w-5 h-5" />
                                    <span>Follow Our Works</span>
                                </a>
                            </div>

                            <p className="mt-8 text-sm text-gray-500">
                                Limited spots available for each batch to ensure personalized mentorship.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <Footer id="main-footer" />
        </div>
    )
}
