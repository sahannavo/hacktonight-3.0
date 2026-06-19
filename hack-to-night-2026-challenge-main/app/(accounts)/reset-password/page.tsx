'use client'

import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import AuthButton from '@/components/authButton'

export default function ResetPasswordPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const email = formData.get('email') as string
    const otp = formData.get('otp') as string
    const newPassword = formData.get('new_password') as string

    try {
      const res = await fetch('/api/accounts', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, new_password: newPassword })
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setError(
          data.message ??
            'Password reset failed. Please check your OTP and try again.'
        )
        setLoading(false)
        return
      }

      setSuccess(true)
      setTimeout(() => router.push('/login'), 2000)
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex min-h-[500px] w-full max-w-[1100px] items-center justify-center rounded-[58px] bg-white px-8 py-10 shadow-[0_1px_3px_0_rgba(0,0,0,0.30),0_4px_8px_3px_rgba(0,0,0,0.15)] lg:min-h-[684px] hover:shadow-[0_20px_50px_0_rgba(0,0,0,0.2)] transition-all duration-300 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-purple-50/20 pointer-events-none"></div>
      <div className="w-full max-w-[670px] relative z-10">
        <h1 className="mb-16 text-center text-[2.6rem] font-bold text-black text-balance bg-gradient-to-r from-black to-purple-900 bg-clip-text text-transparent">
          RESET PASSWORD
        </h1>

        {success ? (
          <p
            role="status"
            className="text-center text-lg font-semibold text-green-600 bg-gradient-to-r from-green-50 to-emerald-50 rounded-[20px] p-4 border-l-4 border-green-600 shadow-[0_4px_12px_rgba(34,197,94,0.15)]"
          >
            ✓ Password reset successful! Redirecting to login…
          </p>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-8">
              <div className="grid items-center gap-4 md:grid-cols-[120px_1fr] group">
                <label className="text-xl text-black font-medium group-hover:text-purple-700 transition-colors duration-300" htmlFor="reset-email">
                  Email:
                </label>
                <input
                  id="reset-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="h-[64px] rounded-[40px] border-2 border-transparent bg-gradient-to-br from-[#e8e8e8] to-[#d9d9d9] px-7 text-lg text-black outline-none transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:shadow-[0_8px_20px_rgba(184,134,182,0.2)] focus:border-purple-400 focus:from-white focus:to-purple-50 focus:scale-105"
                />
              </div>

              <div className="grid items-center gap-4 md:grid-cols-[120px_250px] group">
                <label className="text-xl text-black font-medium group-hover:text-purple-700 transition-colors duration-300" htmlFor="reset-otp">
                  OTP:
                </label>
                <input
                  id="reset-otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                  className="h-[64px] rounded-[40px] border-2 border-transparent bg-gradient-to-br from-[#e8e8e8] to-[#d9d9d9] px-7 text-lg text-black outline-none transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:shadow-[0_8px_20px_rgba(184,134,182,0.2)] focus:border-purple-400 focus:from-white focus:to-purple-50 focus:scale-105"
                />
              </div>

              <div className="grid items-center gap-4 md:grid-cols-[120px_250px] group">
                <label className="text-xl text-black font-medium group-hover:text-purple-700 transition-colors duration-300" htmlFor="reset-password">
                  New Password:
                </label>
                <input
                  id="reset-password"
                  name="new_password"
                  type="password"
                  autoComplete="new-password"
                  required
                  className="h-[64px] rounded-[40px] border-2 border-transparent bg-gradient-to-br from-[#e8e8e8] to-[#d9d9d9] px-7 text-lg text-black outline-none transition-all duration-300 shadow-[0_2px_8px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_12px_rgba(0,0,0,0.15)] focus:shadow-[0_8px_20px_rgba(184,134,182,0.2)] focus:border-purple-400 focus:from-white focus:to-purple-50 focus:scale-105"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-6 text-center text-sm font-semibold text-red-600"
              >
                {error}
              </p>
            )}

            <div className="mt-12 flex justify-center">
              <AuthButton type="submit" disabled={loading}>
                {loading ? 'RESETTING…' : 'RESET PASSWORD'}
              </AuthButton>
            </div>
          </form>
        )}
      </div>
    </section>
  )
}
