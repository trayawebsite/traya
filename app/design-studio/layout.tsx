import {Lora, Fraunces, Newsreader, Figtree, Plus_Jakarta_Sans, Outfit, Manrope, Geist, DM_Mono} from 'next/font/google'

// All candidate fonts exposed as CSS variables so the client configurator can
// switch between them at runtime without re-loading.
const lora = Lora({subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-lora', display: 'swap'})
const fraunces = Fraunces({subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-fraunces', display: 'swap'})
const newsreader = Newsreader({subsets: ['latin'], style: ['normal', 'italic'], variable: '--font-newsreader', display: 'swap'})
const figtree = Figtree({subsets: ['latin'], variable: '--font-figtree', display: 'swap'})
const jakarta = Plus_Jakarta_Sans({subsets: ['latin'], variable: '--font-jakarta', display: 'swap'})
const outfit = Outfit({subsets: ['latin'], variable: '--font-outfit', display: 'swap'})
const manrope = Manrope({subsets: ['latin'], variable: '--font-manrope', display: 'swap'})
const geist = Geist({subsets: ['latin'], variable: '--font-geist', display: 'swap'})
const dmMono = DM_Mono({subsets: ['latin'], weight: ['400', '500'], variable: '--font-dm-mono', display: 'swap'})

export const metadata = {
  title: 'Design Studio — Traya (Direction 01)',
  robots: {index: false}
}

export default function DesignStudioLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body
        className={`${lora.variable} ${fraunces.variable} ${newsreader.variable} ${figtree.variable} ${jakarta.variable} ${outfit.variable} ${manrope.variable} ${geist.variable} ${dmMono.variable}`}
      >
        {children}
      </body>
    </html>
  )
}
