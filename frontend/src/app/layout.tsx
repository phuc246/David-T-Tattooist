import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://david-t-tattooist.vercel.app/'), // Replace with your actual domain when live
  title: 'David T Tattooist - Professional Tattoo Studio',
  description: 'Experience world-class tattoo artistry in Saigon, Vietnam. Custom designs, professional training, and expert artists.',
  icons: {
    icon: '/img/chu A do.png',
    shortcut: '/img/chu A do.png',
    apple: '/img/chu A do.png',
  },
  openGraph: {
    title: 'David T Tattooist - Professional Tattoo Studio',
    description: 'Experience world-class tattoo artistry in Saigon, Vietnam. Custom designs, professional training, and expert artists.',
    url: '/',
    siteName: 'David T Tattooist',
    images: [
      {
        url: '/img/firstlook.png',
        width: 1200,
        height: 630,
        alt: 'David T Tattooist - Tattoo Studio Preview',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'David T Tattooist - Professional Tattoo Studio',
    description: 'Experience world-class tattoo artistry in Saigon, Vietnam. Custom designs, professional training, and expert artists.',
    images: ['/img/firstlook.png'],
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
