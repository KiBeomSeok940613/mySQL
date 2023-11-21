import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import AuthSession from './session'
import Nav from './components/nav'


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
  icons: {
    icon: '/favicon.ico'
  }
}
 

export default  async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  // 로그인 한 정보가 여기에 담긴다.
  return (
    <html lang="en">
      <body className={inter.className}>
        <>
        {/* {session && session.user?.email ? "로그아웃" : "로그인"} */}
        <AuthSession>
        <Nav />
        {children}
        </AuthSession>
        
        </>
        </body>
    </html>
  )
}
