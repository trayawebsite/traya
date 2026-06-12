export const metadata = {
  title: 'Lead Pipeline Demo — Traya',
  robots: {index: false}
}

export default function LeadDemoLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
