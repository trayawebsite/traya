export const metadata = {
  title: 'Design Directions — Traya',
  robots: {index: false}
}

export default function DesignDirectionsLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
