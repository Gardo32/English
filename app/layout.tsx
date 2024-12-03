import { Inter } from 'next/font/google'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import '@/styles/globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Student Blog',
  description: 'A blog showcasing Grade 12 IT students\' English language skills',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} min-h-screen flex flex-col antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Header /> 
          <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}

