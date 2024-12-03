'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="text-xl font-semibold">
            NCST Blog
          </Link>
          <button
            className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground md:hidden"
            aria-label="Toggle menu"
            onClick={() => setIsMenuOpen(true)}
          >
            ☰
          </button>
          <nav className="hidden md:flex items-center space-x-6">
            <Link href="/" className="text-sm font-medium hover:text-primary/80">Home</Link>
            <Link href="/students" className="text-sm font-medium hover:text-primary/80">Students</Link>
            <Link href="/news" className="text-sm font-medium hover:text-primary/80">News</Link>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </nav>
        </div>
      </header>

      {isMenuOpen && (
        <div className="fixed inset-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-transform duration-300 ease-in-out transform translate-x-0">
          <nav className="flex flex-col items-start space-y-6 p-6 h-full w-full">
            <button
              onClick={() => setIsMenuOpen(false)}
              className="mb-4 p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
              aria-label="Close menu"
            >
              ✕
            </button>
            <Link href="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-primary/80">
              Home
            </Link>
            <Link href="/students" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-primary/80">
              Students
            </Link>
            <Link href="/news" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-primary/80">
              News
            </Link>
            <Link href="/game" onClick={() => setIsMenuOpen(false)} className="text-lg font-medium hover:text-primary/80">
              Entertainment
            </Link>
            <button
              onClick={() => {
                setTheme(theme === 'dark' ? 'light' : 'dark')
                setIsMenuOpen(false)
              }}
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={24} /> : <Moon size={24} />}
            </button>
          </nav>
        </div>
      )}
    </>
  )
}
