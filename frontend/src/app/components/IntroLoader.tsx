'use client'

import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useEffect, useState } from 'react'

interface IntroLoaderProps {
    isLoading: boolean
}

export default function IntroLoader({ isLoading }: IntroLoaderProps) {
    const [show, setShow] = useState(true)
    const [isMounted, setIsMounted] = useState(false)
    const [particles, setParticles] = useState<any[]>([])

    useEffect(() => {
        setIsMounted(true)
        // Generate random particle data once on mount to avoid hydration mismatch
        const newParticles = [...Array(30)].map(() => ({
            x: Math.random() * 100 + "%",
            opacity: Math.random() * 0.5 + 0.2,
            duration: Math.random() * 1 + 0.5,
            delay: Math.random() * 2
        }))
        setParticles(newParticles)
    }, [])

    useEffect(() => {
        // Block scroll while loading
        if (show) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }

        if (!isLoading) {
            // Small delay before fading out the loader (sync with rocket launch)
            const timer = setTimeout(() => setShow(false), 500)
            return () => {
                clearTimeout(timer)
            }
        }

        return () => {
            document.body.style.overflow = ''
        }
    }, [isLoading, show])

    if (!show || !isMounted) return null

    return (
        <AnimatePresence>
            {show && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
                    className="fixed inset-0 z-[9999] bg-black flex flex-col items-center justify-center overflow-hidden"
                >
                    {/* Background Stars/Particles */}
                    <div className="absolute inset-0 pointer-events-none">
                        {particles.map((p, i) => (
                            <motion.div
                                key={i}
                                initial={{
                                    y: -20,
                                    x: p.x,
                                    opacity: p.opacity
                                }}
                                animate={{
                                    y: "120vh",
                                }}
                                transition={{
                                    duration: p.duration,
                                    repeat: Infinity,
                                    ease: "linear",
                                    delay: p.delay
                                }}
                                className="absolute w-[2px] h-[15px] bg-white rounded-full opacity-20"
                            />
                        ))}
                    </div>

                    {/* Rocket/Logo Container */}
                    <div className="relative flex flex-col items-center">
                        {/* Logo 'A' - The Rocket */}
                        <motion.div
                            animate={isLoading ? {
                                y: [0, -2, 0, 2, 0],
                                x: [0, 1, -1, 0.5, -0.5, 0],
                            } : {
                                y: [0, 20, -1200],
                                scale: [1, 1.1, 0.5],
                                transition: {
                                    y: { duration: 0.8, ease: "easeIn" },
                                    scale: { duration: 0.8, ease: "easeIn" }
                                }
                            }}
                            transition={isLoading ? {
                                duration: 0.1,
                                repeat: Infinity,
                                ease: "linear"
                            } : {}}
                            className="relative z-10"
                        >
                            <Image
                                src="/img/Chu A tach nen.png"
                                alt="Logo"
                                width={120}
                                height={120}
                                priority
                                className="drop-shadow-[0_0_20px_rgba(255,255,255,0.9)]"
                                style={{ width: '6rem', height: 'auto' }}
                            />

                            {/* Thrust/Fire Effect */}
                            <motion.div
                                animate={{
                                    height: isLoading ? [40, 60, 40] : [80, 200],
                                    opacity: [0.8, 1, 0.8]
                                }}
                                transition={{ duration: 0.05, repeat: Infinity }}
                                className="absolute -bottom-16 left-1/2 -translate-x-1/2 w-8 bg-gradient-to-t from-transparent via-orange-600 to-white rounded-full blur-md opacity-90"
                            />
                            <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4 h-12 bg-white rounded-full blur-sm opacity-100" />

                            {/* Sparks Effect (Simple dots) */}
                            {!isLoading && (
                                <div className="absolute -bottom-20 left-1/2 -translate-x-1/2">
                                    {[...Array(5)].map((_, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 1, scale: 1 }}
                                            animate={{ opacity: 0, scale: 0, y: 50, x: (i - 2) * 20 }}
                                            transition={{ duration: 0.5 }}
                                            className="absolute w-1 h-1 bg-yellow-400 rounded-full"
                                        />
                                    ))}
                                </div>
                            )}
                        </motion.div>

                        {/* Launch Pad / Smoke Effect at bottom */}
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1.2, opacity: 0.3 }}
                            transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
                            className="absolute -bottom-20 w-40 h-10 bg-white/20 blur-2xl rounded-[100%]"
                        />
                    </div>

                    {/* Loading Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="mt-24 text-white/40 font-bold tracking-[0.5em] text-xs uppercase"
                    >
                        {isLoading ? "Preparing for Launch" : "Ignition"}
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
