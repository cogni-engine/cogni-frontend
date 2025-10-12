'use client'

import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export default function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { handleSignIn, loading, error } = useAuth()
  const router = useRouter()

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleSignIn(email, password)
    router.push('/home')
  }

  return (
    <div className="w-full bg-zinc-900/80 rounded-3xl p-8 shadow-2xl backdrop-blur-sm">
      <h1 className="text-2xl font-semibold mb-6 text-center">Sign in to Cogni Engine</h1>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="bg-zinc-800 text-white px-4 py-3 rounded-lg border border-zinc-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="w-full inline-flex items-center justify-center rounded-full border border-zinc-600 px-6 py-3 font-semibold text-white transition hover:bg-zinc-800 active:scale-95 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.06)] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? (
            <span className="inline-flex items-center gap-2">
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
              <span>Signing in...</span>
            </span>
          ) : (
            'Sign in'
          )}
        </button>
        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>

      <div className="mt-8 text-center">
        <p className="text-gray-300 mb-3">Don’t have an account?</p>
        <Link
          href="/register"
          className="text-blue-400 hover:text-blue-300 font-semibold transition-colors"
        >
          Create account
        </Link>
      </div>
    </div>
  )
}