'use client'

import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { type FormEvent, useState } from 'react'
import AuthButton from '@/components/authButton'

const FIELDS = [
  { label: 'Account Number', name: 'account_number', type: 'text' },
  { label: 'Account Name',   name: 'account_name',   type: 'text' },
  { label: 'Branch',         name: 'branch',          type: 'text' },
  { label: 'Email',          name: 'email',           type: 'email' },
  { label: 'Password',       name: 'password',        type: 'password' },
  { label: 'Confirm Password', name: 'confirm_password', type: 'password' }
]

export default function SignUpPage() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const formData = new FormData(e.currentTarget)
    const password = formData.get('password') as string
    const confirmPassword = formData.get('confirm_password') as string

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      setLoading(false)
      return
    }

    const body = Object.fromEntries(
      FIELDS.filter((f) => f.name !== 'confirm_password').map((f) => [
        f.name,
        formData.get(f.name) as string
      ])
    )

    try {
      const res = await fetch('/api/accounts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      })

      const data = await res.json()

      if (!res.ok || !data.ok) {
        setError(data.message ?? 'Registration failed. Please try again.')
        setLoading(false)
        return
      }

      router.push('/login')
    } catch {
      setError('Network error. Please try again.')
      setLoading(false)
    }
  }

  return (
    <section className="mx-auto min-h-[700px] w-full max-w-[1100px] rounded-[58px] bg-white px-8 py-9 shadow-[0_1px_3px_0_rgba(0,0,0,0.30),0_4px_8px_3px_rgba(0,0,0,0.15)] lg:min-h-[820px] lg:px-14">
      <div className="relative mx-auto w-full max-w-[860px]">
        <Image
          src="/loginlogo.png"
          alt="Nova Bank"
          width={128}
          height={128}
          className="absolute left-0 top-0 hidden w-[128px] md:block"
          priority
        />

        <h1 className="mb-12 text-center text-[2.6rem] font-bold text-black text-balance">
          SIGN UP
        </h1>

        <form onSubmit={handleSubmit} noValidate>
          <div className="space-y-4">
            {FIELDS.map(({ label, name, type }) => {
              const fieldId = `sign-up-${name}`
              return (
                <div
                  className="grid items-center gap-4 md:grid-cols-[180px_1fr]"
                  key={name}
                >
                  <label className="text-xl text-black" htmlFor={fieldId}>
                    {label} :
                  </label>
                  <input
                    id={fieldId}
                    name={name}
                    type={type}
                    required
                    autoComplete={
                      type === 'password'
                        ? name === 'password'
                          ? 'new-password'
                          : 'new-password'
                        : name === 'email'
                        ? 'email'
                        : 'off'
                    }
                    className="h-[64px] rounded-[40px] border-0 bg-[#d9d9d9] px-7 text-lg text-black outline-none"
                  />
                </div>
              )
            })}
          </div>

          {error && (
            <p role="alert" className="mt-4 text-center text-sm font-semibold text-red-600">
              {error}
            </p>
          )}

          <div className="mt-8 flex justify-center">
            <AuthButton type="submit" disabled={loading}>
              {loading ? 'SIGNING UP…' : 'SIGN UP'}
            </AuthButton>
          </div>
        </form>
      </div>
    </section>
  )
}
import AuthButton from '@/components/authButton'

export default function SignUpPage() {
  const fields = [
    'Account Number',
    'Account Name',
    'Branch',
    'Email',
    'Password',
    'Confirm Password'
  ]

  return (
    <section className="mx-auto min-h-[700px] w-full max-w-[1100px] rounded-[58px] bg-white px-8 py-9 shadow-[0_1px_3px_0_rgba(0,0,0,0.30),0_4px_8px_3px_rgba(0,0,0,0.15)] lg:min-h-[820px] lg:px-14">
      <div className="relative mx-auto w-full max-w-[860px]">
        <img
          src="/loginlogo.png"
          alt="Nova Bank"
          className="absolute left-0 top-0 hidden w-[128px] md:block"
        />

        <h1 className="mb-12 text-center text-[2.6rem] font-bold text-black text-balance">
          SIGN UP
        </h1>

        <div className="space-y-4">
          {fields.map((field) => {
            const fieldId = `sign-up-${field.toLowerCase().replaceAll(' ', '-')}`
            const isPassword = field.toLowerCase().includes('password')

            return (
              <div
                className="grid items-center gap-4 md:grid-cols-[180px_1fr]"
                key={field}
              >
                <label className="text-xl text-black" htmlFor={fieldId}>
                  {field} :
                </label>
                <input
                  id={fieldId}
                  type={isPassword ? 'password' : 'text'}
                  className="h-[64px] rounded-[40px] border-0 bg-[#d9d9d9] px-7 text-lg text-black outline-none"
                />
              </div>
            )
          })}
        </div>

        <div className="mt-8 flex justify-center">
          <AuthButton>SIGN UP</AuthButton>
        </div>
      </div>
    </section>
  )
}
