'use client'

import Link from 'next/link'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Moon, Sun } from 'lucide-react'

export default function Header() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [password, setPassword] = useState('')
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    if (password === 'admin123') {
      localStorage.setItem('isAdmin', 'true')
      setShowLoginForm(false)
      router.push('/admin')
    } else {
      alert('Invalid password')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    router.push('/')
  }

  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('isAdmin') === 'true'

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 h-14 flex items-center justify-between">
        <Link href="/" className="text-xl font-semibold">
          Student Blog
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/" className="text-sm font-medium hover:text-primary/80">Home</Link>
          <Link href="/students" className="text-sm font-medium hover:text-primary/80">Students</Link>
          {mounted && (
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              className="p-2 rounded-md hover:bg-accent hover:text-accent-foreground"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          )}
          {isAdmin ? (
            <button onClick={handleLogout} className="text-sm font-medium hover:text-primary/80">
              Logout
            </button>
          ) : showLoginForm ? (
            <form onSubmit={handleLogin} className="flex items-center space-x-2">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Admin password"
                className="px-2 py-1 text-sm rounded border bg-background"
                required
              />
              <button type="submit" className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded hover:bg-primary/90">
                Login
              </button>
            </form>
          ) : (
            <button onClick={() => setShowLoginForm(true)} className="text-sm font-medium hover:text-primary/80">
              Admin Login
            </button>
          )}
        </nav>
      </div>
    </header>
  )
}

