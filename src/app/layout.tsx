import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KAISHU - AI Life Management System',
  description:
    'やりたいことを全て拾って絶妙なスケジュールを作ってくれるライフオーケストレーションツール',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ja" suppressHydrationWarning>
      <body className={inter.className}>{children}</body>
    </html>
  )
}
