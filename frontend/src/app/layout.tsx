import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter'
import type { Metadata } from 'next'
import { AppProvider } from './AppContext'
import Header from './app-components/Header'
import './globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'optional' // ensures a better loading behavior
})

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
      <body className={inter.className}>
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
