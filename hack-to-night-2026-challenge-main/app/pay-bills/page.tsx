'use client'

import { useState } from 'react'
import Image from 'next/image'
import Sidebar from '../../components/sidebar'
import {
  Search,
  Settings,
  CheckCircle2,
  AlertTriangle,
  ChevronLeft
} from '../../components/Icons'

type Biller = {
  id: string
  name: string
  logo: string
}

const billers: Biller[] = [
  { id: 'water', name: 'Water Board', logo: '/billers/water-board.png' },
  { id: 'cable', name: 'Cable TV', logo: '/billers/cable-tv.png' },
  { id: 'ceb', name: 'CEB', logo: '/billers/ceb.png' },
  { id: 'airtel', name: 'Airtel', logo: '/billers/airtel.png' },
  { id: 'dialog', name: 'Dialog', logo: '/billers/dialog.png' },
  { id: 'slt', name: 'Sri Lanka Telecom', logo: '/billers/electricity.png' },
  { id: 'peotv', name: 'PEO TV', logo: '/billers/mpesa.png' },
  { id: 'hutch', name: 'Hutch', logo: '/billers/hutch.png' },
  { id: 'aia', name: 'AIA', logo: '/billers/aia.png' },
  { id: 'lolc', name: 'LOLC', logo: '/billers/lolc.png' },
  { id: 'insurance2', name: 'Insurance', logo: '/billers/insurance2.png' },
  { id: 'hsbc', name: 'HSBC', logo: '/billers/hsbc.png' }
]

type Screen = 'select' | 'form' | 'success' | 'failed'

const MOCK_BALANCE = 5000

type FormErrors = {
  accountNumber?: string
  billId?: string
  dueAmount?: string
}

export default function PayBillsPage() {
  const [screen, setScreen] = useState<Screen>('select')
  const [selectedBiller, setSelectedBiller] = useState<Biller | null>(null)
  const [accountNumber, setAccountNumber] = useState('')
  const [billId, setBillId] = useState('')
  const [dueAmount, setDueAmount] = useState('')
  const [remarks, setRemarks] = useState('')
  const [confirmationNumber, setConfirmationNumber] = useState('')
  const [failReason, setFailReason] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  function handleSelectBiller(biller: Biller) {
    setSelectedBiller(biller)
    setErrors({})
    setScreen('form')
  }

  function validateForm(): boolean {
    const newErrors: FormErrors = {}

    if (!accountNumber.trim()) {
      newErrors.accountNumber = 'Account number is required'
    } else if (!/^[0-9]{6,16}$/.test(accountNumber.trim())) {
      newErrors.accountNumber = 'Enter a valid account number (6–16 digits)'
    }

    if (!billId.trim()) {
      newErrors.billId = 'Bill ID is required'
    } else if (billId.trim().length < 3) {
      newErrors.billId = 'Bill ID looks too short'
    }

    if (!dueAmount.trim()) {
      newErrors.dueAmount = 'Due amount is required'
    } else {
      const amount = Number(dueAmount)
      if (Number.isNaN(amount) || amount <= 0) {
        newErrors.dueAmount = 'Enter a valid amount greater than 0'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handlePayNow() {
    if (!validateForm()) {
      return
    }

    const amount = Number(dueAmount)

    if (amount > MOCK_BALANCE) {
      setFailReason(
        `Insufficient Balance\nCurrent Balance is: Rs.${MOCK_BALANCE}`
      )
      setScreen('failed')
      return
    }

    const confNum = Math.floor(10000000 + Math.random() * 90000000).toString()
    setConfirmationNumber(confNum)
    setScreen('success')
  }

  function resetToHome() {
    setScreen('select')
    setSelectedBiller(null)
    setAccountNumber('')
    setBillId('')
    setDueAmount('')
    setRemarks('')
    setErrors({})
  }

  return (
    <div className="page">
      <Sidebar />

      <div className="content">
        <header className="topbar">
          <h1>Pay Bills</h1>
          <div className="topbar-icons">
            <Search size={20} />
            <Settings size={20} />
            <div className="avatar">
              <Image
                src="/avatar.png"
                alt="Profile"
                width={36}
                height={36}
                style={{ objectFit: 'cover', borderRadius: '50%' }}
              />
            </div>
          </div>
        </header>

        <main className="main">
          <div className="card-wrapper">
            {screen === 'select' && (
              <div className="card">
                <div className="biller-grid">
                  {billers.map((biller) => (
                    <button
                      key={biller.id}
                      onClick={() => handleSelectBiller(biller)}
                      className="biller-btn"
                    >
                      <div className="biller-icon logo-circle">
                        <Image
                          src={biller.logo}
                          alt={biller.name}
                          width={44}
                          height={44}
                          style={{ objectFit: 'contain' }}
                        />
                      </div>
                      <span className="biller-name">{biller.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {screen === 'form' && selectedBiller && (
              <div className="card">
                <button
                  className="back-btn"
                  onClick={() => setScreen('select')}
                >
                  <ChevronLeft size={16} />
                  Back to billers
                </button>

                <div className="biller-header">
                  <div className="biller-icon small logo-circle">
                    <Image
                      src={selectedBiller.logo}
                      alt={selectedBiller.name}
                      width={28}
                      height={28}
                      style={{ objectFit: 'contain' }}
                    />
                  </div>
                  <span className="biller-header-name">
                    {selectedBiller.name}
                  </span>
                </div>

                <div className="field">
                  <label>Account number</label>
                  <input
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter account number"
                    className={errors.accountNumber ? 'input-error' : ''}
                  />
                  {errors.accountNumber && (
                    <span className="error-text">{errors.accountNumber}</span>
                  )}
                </div>

                <div className="field">
                  <label>Bill ID</label>
                  <input
                    value={billId}
                    onChange={(e) => setBillId(e.target.value)}
                    placeholder="Enter bill ID"
                    className={errors.billId ? 'input-error' : ''}
                  />
                  {errors.billId && (
                    <span className="error-text">{errors.billId}</span>
                  )}
                </div>

                <div className="field">
                  <label>Due Amount</label>
                  <input
                    type="number"
                    value={dueAmount}
                    onChange={(e) => setDueAmount(e.target.value)}
                    placeholder="0.00"
                    className={errors.dueAmount ? 'input-error' : ''}
                  />
                  {errors.dueAmount && (
                    <span className="error-text">{errors.dueAmount}</span>
                  )}
                </div>

                <div className="field">
                  <label>Remarks</label>
                  <input
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="Optional"
                  />
                </div>

                <button className="pay-now-btn" onClick={handlePayNow}>
                  PAY NOW
                </button>
              </div>
            )}

            {screen === 'success' && (
              <div className="card status-card">
                <div className="status-circle success">
                  <CheckCircle2 size={64} />
                </div>
                <h2>Payment Successful!</h2>
                <p className="status-sub">
                  Confirmation number : {confirmationNumber}
                </p>
                <button className="back-home-btn" onClick={resetToHome}>
                  <ChevronLeft size={16} />
                  BACK TO HOME
                </button>
              </div>
            )}

            {screen === 'failed' && (
              <div className="card status-card">
                <div className="status-circle failed">
                  <AlertTriangle size={64} />
                </div>
                <h2>Payment Failed!</h2>
                <p className="status-sub">{failReason}</p>
                <button className="back-home-btn" onClick={resetToHome}>
                  <ChevronLeft size={16} />
                  BACK TO HOME
                </button>
              </div>
            )}
          </div>
        </main>
      </div>

      <style jsx>{`
        .page {
          display: flex;
          min-height: 100vh;
          background: linear-gradient(135deg, #eef3fb 0%, #f7edfb 100%);
        }
        .content {
          flex: 1;
          display: flex;
          flex-direction: column;
        }
        .topbar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(244, 234, 247, 0.95) 100%);
          padding: 1.1rem 2.5rem;
          border-bottom: 1px solid rgba(147,85,146,0.18);
          backdrop-filter: blur(14px);
        }
        .topbar h1 {
          font-size: 1.25rem;
          font-weight: 700;
          color: #1d0730;
        }
        .topbar-icons {
          display: flex;
          align-items: center;
          gap: 1.5rem;
          color: #735277;
        }
        .avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid rgba(147,85,146,0.16);
        }
        .main {
          flex: 1;
          display: flex;
          justify-content: center;
          padding: 3rem;
        }
        .card-wrapper {
          width: 100%;
          max-width: 760px;
        }
        .card {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(244, 235, 247, 0.95) 100%);
          border-radius: 30px;
          box-shadow: 0 18px 50px rgba(147,85,146,0.12);
          padding: 3rem;
          border: 1px solid rgba(147,85,146,0.18);
        }
        .biller-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 2.5rem 2rem;
        }
        .biller-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.65rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.92) 0%, rgba(244, 237, 249, 0.92) 100%);
          border: 1px solid rgba(147,85,146,0.14);
          border-radius: 24px;
          padding: 1.25rem;
          cursor: pointer;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .biller-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 28px rgba(147,85,146,0.12);
        }
        .biller-icon {
          width: 76px;
          height: 76px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: transform 0.15s, box-shadow 0.15s;
          background: linear-gradient(135deg, #935592 0%, #b886b6 100%);
          box-shadow: 0 12px 24px rgba(147,85,146,0.18);
        }
        .biller-icon.small {
          width: 48px;
          height: 48px;
          background: rgba(147,85,146,0.12);
        }
        .logo-circle {
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(244, 237, 249, 0.95) 100%);
          border: 1px solid rgba(147,85,146,0.14);
        }
        .biller-btn:hover .biller-icon {
          transform: scale(1.08);
        }
        .biller-name {
          font-size: 0.82rem;
          color: #1d0730;
          text-align: center;
          line-height: 1.25;
          font-weight: 600;
        }
        .back-btn {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          background: none;
          border: none;
          color: #735277;
          font-size: 0.95rem;
          cursor: pointer;
          margin-bottom: 1.75rem;
          padding: 0;
        }
        .back-btn:hover {
          color: #935592;
        }
        .biller-header {
          display: flex;
          align-items: center;
          gap: 0.85rem;
          margin-bottom: 2.25rem;
        }
        .biller-header-name {
          font-weight: 700;
          font-size: 1.05rem;
          color: #1d0730;
        }
        .field {
          display: flex;
          flex-direction: column;
          gap: 0.55rem;
          margin-bottom: 1.4rem;
        }
        .field label {
          font-size: 0.95rem;
          color: #735277;
          font-weight: 600;
        }
        .field input {
          background: rgba(147,85,146,0.06);
          border: 1.5px solid rgba(147,85,146,0.18);
          border-radius: 16px;
          padding: 0.95rem 1.1rem;
          font-size: 0.95rem;
          color: #1d0730;
          outline: none;
          transition: box-shadow 0.2s, border-color 0.2s;
        }
        .field input:focus {
          box-shadow: 0 0 0 3px rgba(147,85,146,0.12);
          border-color: #935592;
        }
        .field input.input-error {
          border-color: #ef4444;
          background: #fff1f2;
        }
        .error-text {
          font-size: 0.78rem;
          color: #ef4444;
          margin-top: 0.15rem;
        }
        .pay-now-btn {
          margin-top: 1.75rem;
          width: 100%;
          background: linear-gradient(135deg, #935592 0%, #b886b6 100%);
          color: white;
          font-weight: 700;
          font-size: 1rem;
          padding: 1rem;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .pay-now-btn:hover {
          background: linear-gradient(135deg, #7b3e7a 0%, #935592 100%);
          transform: translateY(-1px);
        }
        .status-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 4rem 3rem;
          background: linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(244, 235, 247, 0.95) 100%);
          border: 1px solid rgba(147,85,146,0.18);
          border-radius: 28px;
          box-shadow: 0 16px 46px rgba(147,85,146,0.12);
        }
        .status-circle {
          width: 112px;
          height: 112px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.75rem;
        }
        .status-circle.success {
          background: rgba(147,85,146,0.12);
          color: #935592;
        }
        .status-circle.failed {
          background: #fee2e2;
          color: #c53030;
        }
        .status-card h2 {
          font-size: 1.4rem;
          font-weight: 700;
          color: #1d0730;
          margin-bottom: 0.6rem;
        }
        .status-sub {
          font-size: 0.95rem;
          color: #6b7280;
          margin-bottom: 2.25rem;
          white-space: pre-line;
          line-height: 1.7;
        }
        .back-home-btn {
          display: flex;
          align-items: center;
          gap: 0.4rem;
          background: #935592;
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          padding: 0.95rem 2.25rem;
          border: none;
          border-radius: 999px;
          cursor: pointer;
          transition: background 0.2s, transform 0.2s;
        }
        .back-home-btn:hover {
          background: #7b3e7a;
          transform: translateY(-1px);
        }
      `}</style>
    </div>
  )
}
