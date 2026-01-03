'use client'

import { useState, useEffect } from 'react'

interface ImageZoomModalProps {
    imageUrl: string
    altText: string
    isOpen: boolean
    onClose: () => void
}

export default function ImageZoomModal({ imageUrl, altText, isOpen, onClose }: ImageZoomModalProps) {
    const [zoomLevel, setZoomLevel] = useState(1)
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [isDragging, setIsDragging] = useState(false)
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 })

    // Reset zoom and position when modal opens, and lock body scroll
    useEffect(() => {
        if (isOpen) {
            setZoomLevel(1)
            setPosition({ x: 0, y: 0 })
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isOpen])

    // Handle ESC key to close
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleEsc)
            return () => window.removeEventListener('keydown', handleEsc)
        }
    }, [isOpen, onClose])

    // Handle scroll to zoom
    const handleWheel = (e: React.WheelEvent) => {
        e.stopPropagation()
        const delta = e.deltaY * -0.001
        setZoomLevel(prev => {
            const newZoom = Math.min(Math.max(1, prev + delta), 4)
            if (newZoom === 1) setPosition({ x: 0, y: 0 }) // Reset position if zoomed out
            return newZoom
        })
    }

    // Handle drag to pan
    const handleMouseDown = (e: React.MouseEvent) => {
        if (zoomLevel > 1) {
            e.preventDefault()
            setIsDragging(true)
            setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y })
        }
    }

    const handleMouseMove = (e: React.MouseEvent) => {
        if (isDragging && zoomLevel > 1) {
            e.preventDefault()
            setPosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            })
        }
    }

    const handleMouseUp = () => {
        setIsDragging(false)
    }

    const handleMouseLeave = () => {
        setIsDragging(false)
    }

    if (!isOpen) return null

    return (
        <div
            className="fixed inset-0 bg-black/95 z-[9999] flex items-center justify-center p-4"
            onClick={onClose}
        >
            <button
                onClick={onClose}
                className="absolute top-4 right-4 text-white hover:text-gray-300 text-4xl font-bold leading-none w-12 h-12 flex items-center justify-center z-10 bg-black/50 rounded-full hover:bg-black/70 transition"
                title="Close (ESC)"
            >
                ×
            </button>

            <div
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
                onClick={(e) => {
                    e.stopPropagation()
                    if (e.target === e.currentTarget) onClose()
                }}
                onWheel={handleWheel}
            >
                <img
                    src={imageUrl}
                    alt={altText}
                    className={`max-w-full max-h-full object-contain transition-transform duration-75 select-none ${zoomLevel > 1 ? 'cursor-grab active:cursor-grabbing' : ''
                        }`}
                    style={{
                        transform: `translate(${position.x}px, ${position.y}px) scale(${zoomLevel})`,
                        cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
                    }}
                    onMouseDown={handleMouseDown}
                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                    onMouseLeave={handleMouseLeave}
                    draggable={false}
                    onError={(e) => {
                        const img = e.target as HTMLImageElement
                        img.src = '/img/chu A do.png'
                    }}
                />
            </div>

            {/* Zoom Controls */}
            <div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-3 bg-black/90 rounded-full px-6 py-3 shadow-2xl z-20"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setZoomLevel(prev => Math.max(1, prev - 0.25))
                    }}
                    disabled={zoomLevel <= 1}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Zoom Out"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setZoomLevel(1)
                        setPosition({ x: 0, y: 0 })
                    }}
                    className="px-4 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition text-sm font-bold min-w-[80px]"
                    title="Reset Zoom"
                >
                    {Math.round(zoomLevel * 100)}%
                </button>

                <button
                    onClick={(e) => {
                        e.stopPropagation()
                        setZoomLevel(prev => Math.min(4, prev + 0.25))
                    }}
                    disabled={zoomLevel >= 4}
                    className="w-10 h-10 flex items-center justify-center text-white hover:bg-white/20 rounded-full transition disabled:opacity-30 disabled:cursor-not-allowed"
                    title="Zoom In"
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                </button>
            </div>

            {/* Instructions */}
            <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/80 text-white text-sm px-4 py-2 rounded-full pointer-events-none">
                Scroll to zoom • Drag to pan
            </div>
        </div>
    )
}
