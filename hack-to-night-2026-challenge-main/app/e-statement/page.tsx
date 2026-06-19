"use client"

import Sidebar from '@/components/sidebar'

export default function EStatementPage() {
  return (
    <div className="eStatementPage min-h-screen bg-bg-light font-geist p-0">
      <div className="flex min-h-screen">
        <Sidebar />

        <main className="flex-1 p-12">
          <div className="mb-10 flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-semibold text-[#1d0730]">E-Statement</h2>
              <p className="text-sm text-[#6b7280] mt-2">Instantly preview your account statement with elegant banking visuals.</p>
            </div>
            <div className="flex items-center gap-3">
              <button className="topbar-icon" aria-label="search">
                <img src="/search.png" alt="search" />
              </button>
              <button className="topbar-icon" aria-label="notifications">
                <img src="/notification.png" alt="notifications" />
              </button>
              <div className="size-12 overflow-hidden rounded-full border-2 border-[rgba(147,85,146,0.18)]">
                <img
                  src="/avatar.png"
                  alt="avatar"
                  className="size-full bg-white object-cover"
                />
              </div>
            </div>
          </div>

          <form className="statement-form rounded-[32px] px-10 py-8">
            <label
              htmlFor="statement-account-number"
              className="grid items-end gap-6 text-xl md:grid-cols-[auto_1fr]"
            >
              <span className="text-[#1d0730] font-semibold">Enter account number:</span>
              <input
                id="statement-account-number"
                inputMode="numeric"
                className="statement-input min-w-0"
              />
            </label>
          </form>

          <section
            aria-label="Bank statement preview"
            className="statement-section mt-6 min-h-[560px] px-7 py-9"
          >
            <div className="max-w-full">
              <img
                src="/loginlogo.png"
                alt="Nova Bank"
                className="size-[86px] rounded-full object-cover"
              />

              <div className="mt-5 text-sm leading-tight">
                <h2 className="font-bold text-[#1d0730]">Bank Statement</h2>
                <dl>
                  <div>
                    <dt className="inline">Account Holder:</dt>
                    <dd className="inline" />
                  </div>
                  <div>
                    <dt className="inline">Account Number:</dt>
                    <dd className="inline" />
                  </div>
                  <div>
                    <dt className="inline">Statement Period:</dt>
                    <dd className="inline"> &ndash;</dd>
                  </div>
                  <div>
                    <dt className="inline">Branch:</dt>
                    <dd className="inline" />
                  </div>
                </dl>
              </div>

              <div className="mt-9 text-sm">
                <h3 className="font-bold text-[#1d0730]">Account Summary</h3>
                <table className="mt-9 w-full table-fixed border-collapse text-left">
                  <thead>
                    <tr>
                      <th className="pr-4 font-normal text-[#4b5563]">Opening Balance</th>
                      <th className="pr-4 font-normal text-[#4b5563]">Total Credits</th>
                      <th className="pr-4 font-normal text-[#4b5563]">Total Debits</th>
                      <th className="font-normal text-[#4b5563]">Closing Balance</th>
                    </tr>
                  </thead>
                </table>
              </div>

              <div className="mt-10 border-t border-[rgba(147,85,146,0.18)] pt-9">
                <h3 className="text-sm font-bold text-[#1d0730]">Transaction Details</h3>

                <div className="mt-5 overflow-x-auto">
                  <table className="w-full min-w-[760px] table-fixed border-collapse text-left text-sm">
                    <thead>
                      <tr className="border-b border-[rgba(147,85,146,0.18)]">
                        <th className="w-[13%] pb-3 font-normal text-[#4b5563]">Date</th>
                        <th className="w-[22%] pb-3 font-normal text-[#4b5563]">
                          Description
                        </th>
                        <th className="w-[18%] pb-3 font-normal text-[#4b5563]">
                          Reference ID
                        </th>
                        <th className="w-[15%] pb-3 font-normal text-[#4b5563]">Debit(+)</th>
                        <th className="w-[16%] pb-3 font-normal text-[#4b5563]">Credit(-)</th>
                        <th className="w-[16%] pb-3 font-normal text-[#4b5563]">Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td className="h-10 pt-3" colSpan={6} />
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>

      <style jsx>{`
        .eStatementPage {
          background: linear-gradient(135deg, #eef3fb 0%, #f7edfb 100%);
        }
        .statement-form {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(244, 233, 247, 0.95) 100%);
          border: 1px solid rgba(147,85,146,0.18);
          box-shadow: 0 22px 60px rgba(147,85,146,0.1);
          border-radius: 32px;
        }
        .statement-input {
          width: 100%;
          border: none;
          border-bottom: 2px solid rgba(147,85,146,0.25);
          padding: 0.95rem 0.85rem;
          background: rgba(147,85,146,0.06);
          color: #1d0730;
          font-size: 1rem;
          outline: none;
          transition: border-color 0.25s ease, box-shadow 0.25s ease;
        }
        .statement-input:focus {
          border-bottom-color: #935592;
          box-shadow: 0 0 0 3px rgba(147,85,146,0.12);
        }
        .statement-section {
          background: linear-gradient(180deg, rgba(255,255,255,0.96) 0%, rgba(239,233,249,0.95) 100%);
          border-radius: 32px;
          border: 1px solid rgba(147,85,146,0.18);
          box-shadow: 0 22px 60px rgba(147,85,146,0.1);
        }
        .statement-section h2,
        .statement-section h3 {
          color: #1d0730;
        }
        .statement-section dt {
          font-weight: 700;
          color: #1d0730;
        }
        .statement-section dd {
          display: inline;
          color: #555;
        }
        .statement-section table th {
          padding-bottom: 1rem;
          color: #4b5563;
          font-weight: 600;
        }
        .statement-section table tr {
          border-bottom: 1px solid rgba(147,85,146,0.12);
        }
        .statement-section img {
          border-radius: 28px;
          box-shadow: 0 16px 40px rgba(147,85,146,0.12);
        }
      `}</style>
    </div>
  )
}
