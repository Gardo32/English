'use client'

import { useState } from 'react'
import { signIn, signOut } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function AdminLoginWizard({ session }) {
  const [showLoginForm, setShowLoginForm] = useState(false)
  const [password, setPassword] = useState('')
  const router = useRouter()

  const handleLogin = async (e) => {
    e.preventDefault()
    const result = await signIn('credentials', {
      password,
      redirect: false,
    })

    if (result?.ok) {
      setShowLoginForm(false)
      router.push('/admin')
    } else {
      alert('Invalid password')
    }
  }

  const handleLogout = async () => {
    await signOut({ redirect: false })
    router.push('/')
  }

  if (session) {
    return (
      <div>
        <span className="mr-2">Welcome, Admin</span>
        <button
          onClick={handleLogout}
          className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
        >
          Logout
        </button>
      </div>
    )
  }

  return (
    <div>
      {showLoginForm ? (
        <form onSubmit={handleLogin} className="flex items-center">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            className="p-1 mr-2 rounded text-black"
            required
          />
          <button
            type="submit"
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      ) : (
        <button
          onClick={() => setShowLoginForm(true)}
          className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Admin Login
        </button>
      )}
    </div>
  )
}

