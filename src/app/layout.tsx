import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { useSession } from 'next-auth/react'
import { SessionProvider } from '@/components/SessionProvider'
import { getServerSession } from 'next-auth'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'extension management system',
  description: 'extension management system for admin side',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {

  const session = await getServerSession()
  

  return (
    <html lang="en">
      <SessionProvider session={session}>
        
        <body className={inter.className}>
        
          {children}
        </body>
      </SessionProvider>
    </html>
  )
}
