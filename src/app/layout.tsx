import '@/app/globals.css'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'API Examples',
  description: 'Examples of different useful APIs with Next.js App Router',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className="container mx-auto p-4">
          <h1 className="text-3xl font-bold mb-6">API Examples</h1>
          {children}
        </main>
      </body>
    </html>
  )
}

