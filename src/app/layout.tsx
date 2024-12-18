import type { Metadata } from 'next'
import { Space_Grotesk, Syne } from 'next/font/google'
import './globals.css'
import Footer from '@/components/Footer'
import Script from 'next/script'
import ClientRootWrapper from '@/components/ClientRootWrapper'

// Body font
const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
})

// Main display font for headlines
const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
})

export const metadata: Metadata = {
  title: 'WL Creationx | Design Agency',
  description: 'Transforming brands through creative excellence. Your trusted design partner in Pretoria, delivering innovative graphic design, web development, and branding solutions.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${syne.variable}`}>
      <body suppressHydrationWarning>
        <ClientRootWrapper>
          <div className="flex min-h-screen flex-col bg-[#0A0A0A] text-white font-space-grotesk overflow-x-hidden">
            {children}
            <Footer />
          </div>
        </ClientRootWrapper>
        
        <Script id="schema-org" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "WL CreationX",
            "description": "Design Agency in Pretoria, South Africa",
            "url": "https://wlcreationx.co.za",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Pretoria",
              "addressCountry": "ZA"
            }
          })}
        </Script>
      </body>
    </html>
  )
}
