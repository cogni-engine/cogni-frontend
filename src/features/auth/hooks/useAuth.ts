'use client'

import { useState } from 'react'
import { signIn, signUp } from '../api/supabaseAuth'

export function useAuth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignUp = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      await signUp(email, password)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  const handleSignIn = async (email: string, password: string) => {
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return { handleSignUp, handleSignIn, loading, error }
}