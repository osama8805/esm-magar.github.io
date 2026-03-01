import type { Metadata } from 'next'
import { Cairo } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const cairo = Cairo({ subsets: ["arabic", "latin"] });

export const metadata: Metadata = {
  title: 'متجر أنيق - حقائب، أحذية ومستحضرات تجميل',
  description: 'تسوقي أفضل الحقائب والأحذية ومستحضرات التجميل بأسعار مميزة وجودة عالية',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${cairo.className} antialiased`}>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
