import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'A Little Ink - Tattoo Studio',
  description: 'Professional tattoo studio with world-class artists',
  icons: {
  icon: '/img/Chu A tach nen.png',
  shortcut: '/img/Chu A tach nen.png',
  apple: '/img/Chu A tach nen.png',
},
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="font-nexa">
        {children}
        <Toaster />
      </body>
    </html>
  )
}
