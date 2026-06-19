import Link from 'next/link'

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-gradient-to-br from-slate-100 via-sky-100 to-violet-100 text-slate-900">
      <div className="relative mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-12 lg:px-16">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(147,85,146,0.18),_transparent_35%),radial-gradient(circle_at_bottom_left,_rgba(59,130,246,0.16),_transparent_30%)]" />
        <div className="relative z-10 grid gap-12 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
          <section className="space-y-8">
            <span className="inline-flex rounded-full bg-violet-600/10 px-4 py-2 text-sm font-semibold text-violet-700 shadow-sm shadow-violet-200">
              Nova Bank • Smart banking experience
            </span>
            <div className="max-w-2xl space-y-6">
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-950 sm:text-6xl">
                Smart Spend for a brighter banking journey
              </h1>
              <p className="text-lg leading-8 text-slate-700">
                Discover an elegant dashboard to manage accounts, transfer money, pay bills, and track spending—all in one colorful, modern view.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:w-[80%]">
              <Link href="/bank-accounts" className="rounded-2xl bg-violet-700 px-6 py-4 text-base font-semibold text-white shadow-xl shadow-violet-200 transition hover:-translate-y-1 hover:bg-violet-800">
                View Accounts
              </Link>
              <Link href="/smart-spend" className="rounded-2xl bg-white px-6 py-4 text-base font-semibold text-slate-900 shadow-xl shadow-slate-200 transition hover:-translate-y-1">
                Explore Smart Spend
              </Link>
            </div>
            <div className="mt-12 space-y-6">
              <h2 className="text-2xl font-bold text-slate-950">Quick Actions</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                <Link href="/bank-accounts" className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 transition hover:-translate-y-1 hover:border-violet-200 hover:shadow-violet-200/50">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Accounts</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">Manage your bank accounts</h3>
                  <p className="mt-3 text-sm text-slate-500">See details, edit account nicknames, and keep your accounts organized.</p>
                </Link>
                <Link href="/bank-transfer" className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 transition hover:-translate-y-1 hover:border-sky-200 hover:shadow-sky-200/50">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Bank Transfer</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">Send money securely</h3>
                  <p className="mt-3 text-sm text-slate-500">Move funds between accounts with clear transfer status and speed.</p>
                </Link>
                <Link href="/pay-bills" className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 transition hover:-translate-y-1 hover:border-fuchsia-200 hover:shadow-fuchsia-200/50">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Pay Bills</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">Pay all bills in one place</h3>
                  <p className="mt-3 text-sm text-slate-500">Quickly settle recurring payments and see all bills at a glance.</p>
                </Link>
                <Link href="/e-statement" className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 transition hover:-translate-y-1 hover:border-orange-200 hover:shadow-orange-200/50">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">E-Statement</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">View account statements</h3>
                  <p className="mt-3 text-sm text-slate-500">Download statements, check history, and keep your finances documented.</p>
                </Link>
                <Link href="/smart-spend" className="group rounded-3xl bg-white p-6 shadow-xl shadow-slate-200 transition hover:-translate-y-1 hover:border-emerald-200 hover:shadow-emerald-200/50">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-slate-400">Smart Spend</p>
                  <h3 className="mt-4 text-xl font-semibold text-slate-950">Track spending habits</h3>
                  <p className="mt-3 text-sm text-slate-500">See colorful spending insights, budgeting tips, and smarter money habits.</p>
                </Link>
              </div>
            </div>
          </section>

          <section className="relative rounded-[2rem] border border-white/70 bg-white/80 p-8 shadow-2xl shadow-slate-200 backdrop-blur-xl">
            <div className="absolute -right-16 top-10 h-40 w-40 rounded-full bg-violet-500/20 blur-3xl" />
            <div className="absolute -left-16 bottom-8 h-32 w-32 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="relative space-y-6">
              <div className="flex items-center justify-between rounded-3xl bg-slate-950/95 px-5 py-4 text-white shadow-lg shadow-slate-200/50">
                <div>
                  <p className="text-sm uppercase tracking-[0.2em] text-slate-300">Balance</p>
                  <p className="mt-2 text-3xl font-semibold">$12,490</p>
                </div>
                <div className="rounded-3xl bg-violet-600 px-4 py-2 text-sm font-semibold text-white">
                  Stable
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl bg-slate-950/5 p-5">
                  <p className="text-sm text-slate-500">Fast transfer</p>
                  <p className="mt-3 text-xl font-semibold text-slate-950">Instant</p>
                </div>
                <div className="rounded-3xl bg-slate-950/5 p-5">
                  <p className="text-sm text-slate-500">Safe payments</p>
                  <p className="mt-3 text-xl font-semibold text-slate-950">Encrypted</p>
                </div>
              </div>
              <div className="rounded-[2rem] bg-slate-950/10 p-5">
                <div className="flex items-center justify-between text-sm text-slate-600">
                  <span>Spend Confidence</span>
                  <span className="font-semibold text-slate-900">92%</span>
                </div>
                <div className="mt-4 h-3 overflow-hidden rounded-full bg-slate-200">
                  <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-violet-600 to-sky-500" />
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  )
}
