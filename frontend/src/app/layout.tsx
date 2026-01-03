import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL('https://david-t-tattooist.vercel.app/'), // Replace with your actual domain when live
  title: 'A Little Ink | David T Tattooist - Tiệm Xăm Quận 1 & Tattoo Studio Saigon',
  description: 'A Little Ink by David T Tattooist - Tiệm xăm Quận 1 chuyên nghiệp. Top-rated tattoo studio in Saigon, HCM. Chuyên xăm nghệ thuật, mini tattoo, xăm chân dung & đào tạo nghề.',
  keywords: [
    'A Little Ink', 'David T Tattooist', 'Tiệm xăm Quận 1', 'Tattoo Studio Saigon',
    'Xăm nghệ thuật Quận 1', 'Best tattoo artist HCM', 'Xăm chân dung Sài Gòn',
    'Mini tattoo Saigon', 'Đào tạo xăm chuyên nghiệp', 'Tattoo District 1',
    'Xăm hình nghệ thuật', 'Tattoo shop Ho Chi Minh City'
  ],
  icons: {
    icon: '/img/chu A do.png',
    shortcut: '/img/chu A do.png',
    apple: '/img/chu A do.png',
  },
  openGraph: {
    title: 'A Little Ink | David T Tattooist - Tiệm Xăm Quận 1 & Tattoo Studio Saigon',
    description: 'A Little Ink by David T Tattooist - Tiệm xăm Quận 1 chuyên nghiệp. Top-rated tattoo studio in Saigon, HCM. Chuyên xăm nghệ thuật, mini tattoo, xăm chân dung & đào tạo nghề.',
    url: '/',
    siteName: 'A Little Ink | David T Tattooist',
    images: [
      {
        url: 'https://david-t-tattooist.vercel.app/img/firstlook.png',
        width: 1200,
        height: 630,
        alt: 'A Little Ink - Tattoo Studio Preview',
      },
    ],
    locale: 'vi_VN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'A Little Ink | David T Tattooist - Tiệm Xăm Quận 1 & Tattoo Studio Saigon',
    description: 'A Little Ink by David T Tattooist - Tiệm xăm Quận 1 chuyên nghiệp. Top-rated tattoo studio in Saigon, HCM. Chuyên xăm nghệ thuật, mini tattoo, xăm chân dung & đào tạo nghề.',
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
