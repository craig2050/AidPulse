import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { AppProvider } from './AppContext'
import Header from './components/Header'
import './globals.css'
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';


export const metadata: Metadata = {
  title: 'AidPulse',
  description: 'Generated Team Chuck'
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='en'>
      <body
      >
        <AppRouterCacheProvider>
          <AppProvider>
            <Header />
            {children}
          </AppProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  )
}
