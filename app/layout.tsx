import type { Metadata } from 'next'
import { Cormorant_Garamond, Plus_Jakarta_Sans } from 'next/font/google'
import dynamic from 'next/dynamic'
import './globals.css'

const Cursor = dynamic(() => import('@/components/Cursor'), { ssr: false })
const SmoothScroll = dynamic(() => import('@/components/SmoothScroll'), { ssr: false })
const PageWrapper = dynamic(() => import('@/components/PageWrapper'), { ssr: false })

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-jakarta',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Tommy Adeyinka — Developer · Marketer · Automator',
  description: 'I build production-grade web apps, grow them with technical SEO, and automate the workflows in between. One person. Three disciplines.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${jakarta.variable}`}>
      <body className="font-sans">
        <Cursor />
        <PageWrapper>
          <SmoothScroll>{children}</SmoothScroll>
        </PageWrapper>
      </body>
    </html>
  )
}
