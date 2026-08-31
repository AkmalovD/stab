import { AuthProvider } from '@/auth/AuthContext'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import localFont from 'next/font/local'
import { Toaster } from 'sonner'
import './globals.css'

const inter = Inter({
  subsets: ['latin', 'cyrillic'],
  weight: ['300', '400', '500', '600', '700', '800'],
  variable: '--font-inter',
  display: 'swap',
})

const sfPro = localFont({
  src: [
    {
      path: '../../public/fonts/SF-Pro-Display-Light.ttf',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Regular.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Medium.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Semibold.ttf',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/SF-Pro-Display-Bold.ttf',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-sf-pro',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'STAB - Study Abroad Budget & Planning Platform',
  description: 'A comprehensive study abroad planning application with city comparison and interactive features',
  icons: {
    icon: '/logo.svg',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${sfPro.variable}`}>
      <body 
        className={`relative flex min-h-screen w-full flex-col bg-white overflow-x-hidden font-sans antialiased ${sfPro.className}`}
      >
        <AuthProvider>
          <div className="flex flex-col min-h-screen">
            {children}
          </div>
        </AuthProvider>
        <Toaster 
          richColors 
          position="top-right" 
          toastOptions={{
            style: {
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              color: '#0f172a',
            },
          }}
        />
      </body>
    </html>
  )
}
