'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * AdminHiddenLayout - Wraps admin layout to hide it from public access
 * Redirects to home and logs a message instead of showing admin panel
 * This prevents accidental exposure while keeping code structure intact
 */
export default function AdminHiddenLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page - CMS functionality is disabled for now
    console.warn('Admin panel is currently disabled. Please use hardcoded content instead.')
    router.push('/')
  }, [router])

  // Don't render anything while redirecting
  return null
}
