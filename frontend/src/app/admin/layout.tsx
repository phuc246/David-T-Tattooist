'use client'

import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Admin Layout - Currently Disabled
 * CMS functionality is disabled for now to avoid conflicts
 * Please use hardcoded content in home page and gallery instead
 * This will be re-enabled in future updates
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()

  useEffect(() => {
    // Redirect to home page - CMS functionality is disabled for now
    console.warn('[CMS] Admin panel is currently disabled. Redirecting to home...')
    console.warn('[CMS] To manage content, edit the hardcoded data in:')
    console.warn('[CMS] - src/app/page.tsx (ARTISTS, FEATURED_TATTOOS)')
    console.warn('[CMS] - src/app/gallery/page.tsx (Product data)')
    router.push('/')
  }, [router])

  // Don't render anything while redirecting
  return null
}
