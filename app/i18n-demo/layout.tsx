import {Figtree, Noto_Sans_Arabic} from 'next/font/google'

const figtree = Figtree({subsets: ['latin'], variable: '--font-latin', display: 'swap'})
const notoArabic = Noto_Sans_Arabic({subsets: ['arabic'], variable: '--font-arabic', display: 'swap'})

export const metadata = {
  title: 'i18n / RTL Demo — Traya',
  robots: {index: false}
}

export default function I18nDemoLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body className={`${figtree.variable} ${notoArabic.variable}`}>{children}</body>
    </html>
  )
}
