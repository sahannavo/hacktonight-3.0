'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import AuthButton from '@/components/authButton'

export default function LoginPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const username = formData.get('username') as string
    const password = formData.get('password') as string

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setError(data.message ?? 'Invalid username or password.')
        setLoading(false)
        return
      }

      router.push('/dashboard')
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto flex min-h-[480px] w-full max-w-[1060px] overflow-hidden rounded-[56px] bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.30),0_4px_8px_3px_rgba(0,0,0,0.15)] lg:min-h-[660px] hover:shadow-[0_20px_50px_0_rgba(0,0,0,0.2)] transition-all duration-300">
      <aside
        aria-label="Nova Bank shell artwork"
        className="relative hidden w-[46.2%] shrink-0 overflow-hidden bg-gradient-to-br from-[#1d0730] to-[#3d1650] md:block shadow-[inset_-10px_0_30px_rgba(0,0,0,0.3)]"
      >
        <Image
          src="/loginshellbg.png"
          alt=""
          fill
          className="object-cover"
          aria-hidden="true"
          priority
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <Image
            src="/loginlogo.png"
            alt="Nova Bank"
            width={276}
            height={276}
            className="w-[38%] max-w-[276px]"
            priority
          />
        </div>
      </aside>

      <div className="flex flex-1 items-center justify-center bg-white px-8 py-10 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-purple-50/30 pointer-events-none"></div>
        <div className="w-full max-w-[450px] text-center relative z-10">
          <h1 className="mb-11 text-[2.45rem] font-bold text-black text-balance bg-gradient-to-r from-black to-purple-900 bg-clip-text text-transparent">
            LOGIN
          </h1>

          <form onSubmit={handleSubmit} noValidate>
            <div className="space-y-5">
              <div className="relative">
                <label className="sr-only" htmlFor="login-account">
                  Account name
                </label>
                <Image
                  src="/person.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="-translate-y-1/2 absolute left-8 top-1/2"
                />
                <input
                  id="login-account"
                  name="username"
                  placeholder="Account name"
                  autoComplete="username"
                  required
                  className="h-[64px] w-full rounded-[40px] border-2 border-transparent bg-gradient-to-br from-[#e8e8e8] to-[#d9d9d9] px-8 pl-20 text-lg text-black shadow-[0_1px_3px_0_rgba(0,0,0,0.30),0_4px_8px_3px_rgba(0,0,0,0.15)] outline-none transition-all duration-300 placeholder:text-black/45 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] focus:shadow-[0_4px_4px_0_rgba(0,0,0,0.30),0_8px_12px_6px_rgba(0,0,0,0.15)] focus:border-purple-400 focus:from-white focus:to-purple-50"
                />
              </div>

              <div className="relative">
                <label className="sr-only" htmlFor="login-password">
                  Password
                </label>
                <Image
                  src="/password.png"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                  className="-translate-y-1/2 absolute left-8 top-1/2"
                />
                <input
                  id="login-password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  className="h-[64px] w-full rounded-[40px] border-2 border-transparent bg-gradient-to-br from-[#e8e8e8] to-[#d9d9d9] px-8 pl-20 text-lg text-black shadow-[0_1px_3px_0_rgba(0,0,0,0.30),0_4px_8px_3px_rgba(0,0,0,0.15)] outline-none transition-all duration-300 placeholder:text-black/45 hover:shadow-[0_4px_12px_rgba(0,0,0,0.25)] focus:shadow-[0_4px_4px_0_rgba(0,0,0,0.30),0_8px_12px_6px_rgba(0,0,0,0.15)] focus:border-purple-400 focus:from-white focus:to-purple-50"
                />
              </div>
            </div>

            {error && (
              <p
                role="alert"
                className="mt-3 text-sm font-semibold text-red-600"
              >
                {error}
              </p>
            )}

            <div className="mt-3 text-right">
              <Link
                href="/reset-password"
                className="text-sm font-bold text-black"
              >
                Forgot password?
              </Link>
            </div>

            <AuthButton type="submit" className="mt-8" disabled={loading}>
              {loading ? 'SIGNING IN…' : 'SIGN IN'}
            </AuthButton>
          </form>

          <p className="mt-6 text-sm font-bold text-black">
            Don't have an account?
          </p>
          <Link href="/sign-up" className="text-2xl font-bold text-black">
            SIGN UP
          </Link>
        </div>
      </div>
    </section>
  )
}
