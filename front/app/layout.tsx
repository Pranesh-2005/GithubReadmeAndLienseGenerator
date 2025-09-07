import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Readme and License Generator',
  description: 'Readme and License Generator for GitHub projects using Azure OpenAI',
  keywords: ['readme', 'license', 'generator', 'github', 'github readme', 'github license', 'project-readme','project-license','github project readme','github project license','readme generator','license generator','readme ai','license ai','repo readme','repo license','repository readme','repository license','readme creator','license creator','readme maker','license maker','readme writer','license writer','readme assistant','license assistant','readme tool','license tool','project documentation','project docs','github docs','github documentation','repo docs','repo documentation','repository docs','repository documentation','readme template','license template','readme example','license example','readme sample','license sample','project readme generator','project license generator','github readme generator','github license generator','repo readme generator','repo license generator','repository readme generator','repository license generator','readme ai generator','license ai generator'],
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' }
    ],
    apple: [
      { url: '/apple-icon-57x57.png', sizes: '57x57' },
      { url: '/apple-icon-60x60.png', sizes: '60x60' },
      { url: '/apple-icon-72x72.png', sizes: '72x72' },
      { url: '/apple-icon-76x76.png', sizes: '76x76' },
      { url: '/apple-icon-114x114.png', sizes: '114x114' },
      { url: '/apple-icon-120x120.png', sizes: '120x120' },
      { url: '/apple-icon-144x144.png', sizes: '144x144' },
      { url: '/apple-icon-152x152.png', sizes: '152x152' },
      { url: '/apple-icon-180x180.png', sizes: '180x180' }
    ],
    other: [
      { url: '/android-icon-36x36.png', sizes: '36x36', type: 'image/png' },
      { url: '/android-icon-48x48.png', sizes: '48x48', type: 'image/png' },
      { url: '/android-icon-72x72.png', sizes: '72x72', type: 'image/png' },
      { url: '/android-icon-96x96.png', sizes: '96x96', type: 'image/png' },
      { url: '/android-icon-144x144.png', sizes: '144x144', type: 'image/png' },
      { url: '/android-icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/android-icon-256x256.png', sizes: '256x256', type: 'image/png' },
      { url: '/android-icon-384x384.png', sizes: '384x384', type: 'image/png' },
      { url: '/android-icon-512x512.png', sizes: '512x512', type: 'image/png' }
    ]
  },
  manifest: '/site.webmanifest',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Readme Generator'
  },
  formatDetection: {
    telephone: false
  },
  other: {
    'msapplication-TileColor': '#2d89ef',
    'msapplication-TileImage': '/mstile-144x144.png',
    'msapplication-config': '/browserconfig.xml'
  }
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
