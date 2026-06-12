// The Studio is its own root layout (separate <html>) so it is not wrapped
// in the localized site shell. Lives outside [locale] on purpose.
export const metadata = {
  title: 'Traya Studio',
  robots: {index: false, follow: false}
};

export default function StudioLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
