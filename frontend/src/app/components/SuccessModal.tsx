'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

type SuccessModalProps = {
    isOpen: boolean
    onClose: () => void
    autoCloseDuration?: number // in milliseconds
}

export default function SuccessModal({
    isOpen,
    onClose,
    autoCloseDuration = 5000
}: SuccessModalProps) {

    useEffect(() => {
        if (isOpen && autoCloseDuration > 0) {
            const timer = setTimeout(() => {
                onClose()
            }, autoCloseDuration)

            return () => clearTimeout(timer)
        }
    }, [isOpen, autoCloseDuration, onClose])

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.8, opacity: 0, y: 20 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="relative bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl max-w-md w-full p-8 border-2 border-white"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Close Button */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors group"
                            aria-label="Close"
                        >
                            <svg
                                className="w-4 h-4 text-gray-600 group-hover:text-black transition-colors"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        {/* Success Icon */}
                        <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                            className="mx-auto w-20 h-20 mb-6 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center shadow-lg"
                        >
                            <svg
                                className="w-10 h-10 text-white"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <motion.path
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={3}
                                    d="M5 13l4 4L19 7"
                                />
                            </svg>
                        </motion.div>

                        {/* Success Message */}
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="text-center space-y-3"
                        >
                            <h3 className="text-2xl font-bold text-gray-900">
                                Booking Successful!
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                                Cảm ơn bạn đã đăng ký! Chúng tôi đã gửi email xác nhận đến hộp thư của bạn và sẽ liên hệ sớm nhất.
                            </p>
                            <p className="text-sm text-gray-500 italic">
                                This popup will close automatically in {autoCloseDuration / 1000} seconds...
                            </p>
                        </motion.div>

                        {/* Decorative Elements */}
                        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden rounded-2xl">
                            <motion.div
                                animate={{
                                    scale: [1, 1.2, 1],
                                    opacity: [0.3, 0.5, 0.3],
                                }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                                className="absolute -top-10 -right-10 w-40 h-40 bg-gradient-to-br from-green-200 to-emerald-300 rounded-full blur-3xl"
                            />
                            <motion.div
                                animate={{
                                    scale: [1, 1.3, 1],
                                    opacity: [0.2, 0.4, 0.2],
                                }}
                                transition={{
                                    duration: 3,
                                    repeat: Infinity,
                                    ease: "easeInOut",
                                    delay: 0.5
                                }}
                                className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-br from-blue-200 to-cyan-300 rounded-full blur-3xl"
                            />
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
