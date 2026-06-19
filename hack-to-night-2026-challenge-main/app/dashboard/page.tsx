'use client'

import Sidebar from '../../components/sidebar'
import { Bell, ChevronRight, Search } from '../../components/Icons'

const transactions = [
  {
    date: 'Oct, 16 2025',
    account: '......3423',
    amount: '-Rs. 4500.00'
  },
  {
    date: 'Oct, 16 2025',
    account: '......4876',
    amount: '-Rs. 10,000.00'
  },
  {
    date: 'Oct, 16 2025',
    account: '......6754',
    amount: '-Rs. 9870.00'
  }
]

export default function Dashboard() {
  return (
    <main className="dashboard">
      <Sidebar />

      <section className="content">
        {/* Header */}
        <header className="content-header">
          <h1 className="page-title">Dashboard</h1>
          <div className="header-actions">
            <Search size={24} />
            <Bell size={24} />
            <img src="/person-logo.png" alt="profile" className="avatar" />
          </div>
        </header>

        {/* Top Section */}
        <div className="top-section">
          <div className="welcome-card">
            <h2 className="welcome-title">Welcome back, Dilara!</h2>
            <div className="balance-card">
              <p className="balance-label">Current Balance</p>
              <p className="balance-amount">Rs. 100, 000</p>
              <ChevronRight className="balance-chevron" size={30} />
            </div>
            <div className="carousel-dots">
              <span className="dot active" />
              <span className="dot" />
              <span className="dot" />
            </div>
            <img
              src="/dashboard-logo.png"
              alt="woman"
              className="welcome-image"
            />
          </div>

          <div className="payees-card">
            <h3 className="payees-title">Saved Payees</h3>
            <div className="payees-list">
              {[1, 2].map((item) => (
                <div key={item} className="payee-item">
                  <img src="/person-logo.png" alt="user" className="avatar" />
                  <div className="payee-info">
                    <p>HKDS</p>
                    <p>Wickramanayake</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="view-all">
              View all
              <ChevronRight size={15} />
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="transactions-section">
          <h2 className="transactions-title">Recent Transactions</h2>
          <div className="transactions-card">
            {transactions.map((t, index) => (
              <div key={index} className="transaction-item">
                <img src="/person-logo.png" alt="user" className="avatar" />
                <span className="transaction-date">{t.date}</span>
                <span className="transaction-account">{t.account}</span>
                <span className="transaction-amount">{t.amount}</span>
                <span className="transaction-status">Success</span>
              </div>
            ))}
            <div className="view-all">
              View all
              <ChevronRight size={15} />
            </div>
          </div>
        </div>
      </section>

      <style jsx>{`
        .dashboard {
          width: 100vw;
          min-height: 100vh;
          background: linear-gradient(135deg, #f6ebf8 0%, #efd8f3 45%, #dac0e9 100%);
          display: flex;
          gap: 1.5rem;
          overflow: hidden;
          font-family: var(--font-bai, 'Bai Jamjuree'), system-ui, -apple-system, sans-serif;
        }

        .content {
          flex: 1;
          padding: 40px;
          overflow-y: auto;
          min-width: 0;
          background: linear-gradient(180deg, rgba(255,255,255,0.98) 0%, rgba(242, 227, 245, 0.88) 100%);
          border: 1px solid rgba(147,85,146,0.18);
          box-shadow: 0 30px 80px rgba(147,85,146,0.12);
          border-radius: 34px;
        }

        .content-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 2rem;
          animation: slideDown 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
          margin-bottom: 12px;
        }

        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .page-title {
          font-size: 3rem;
          font-weight: 800;
          background: linear-gradient(135deg, #1d0730 0%, #935592 50%, #6d3a5c 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -1px;
          margin: 0;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 18px;
        }

        .header-actions svg {
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          color: #666;
          width: 24px;
          height: 24px;
        }

        .header-actions svg:hover {
          color: #935592;
          transform: scale(1.2);
        }

        .avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          object-fit: cover;
          border: 2.5px solid rgba(184, 134, 182, 0.4);
          transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 4px 12px rgba(147, 85, 146, 0.15);
          cursor: pointer;
        }

        .avatar:hover {
          border-color: #935592;
          transform: scale(1.1);
          box-shadow: 0 8px 24px rgba(147, 85, 146, 0.3);
        }

        .top-section {
          margin-top: 32px;
          display: flex;
          flex-wrap: wrap;
          gap: 24px;
          animation: fadeInUp 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .welcome-card {
          width: 640px;
          max-width: 100%;
          height: 280px;
          background: linear-gradient(135deg, #935592 0%, #b886b6 50%, #8f4f8a 100%);
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(147, 85, 146, 0.25), 0 0 0 1px rgba(255, 255, 255, 0.3) inset;
          position: relative;
          overflow: hidden;
          flex-shrink: 0;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .welcome-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(255, 255, 255, 0.15) 0%, transparent 70%);
          border-radius: 50%;
          animation: float 8s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-30px, 30px); }
        }

        .welcome-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 30px 80px rgba(147, 85, 146, 0.35), 0 0 0 1px rgba(255, 255, 255, 0.3) inset;
        }

        .welcome-title {
          font-size: 1.4rem;
          padding: 1.5rem 1.5rem 0;
          color: white;
          font-weight: 700;
          letter-spacing: 0.5px;
          position: relative;
          z-index: 2;
          margin: 0;
        }

        .balance-card {
          position: absolute;
          left: 5rem;
          top: 80px;
          width: 340px;
          max-width: calc(100% - 2rem);
          height: 140px;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(245, 235, 247, 0.98) 100%);
          border-radius: 22px;
          color: #1d0730;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 0 1.5rem;
          box-shadow: 0 10px 30px rgba(147, 85, 146, 0.14);
          border: 1px solid rgba(147, 85, 146, 0.18);
          transition: all 0.3s ease;
          z-index: 10;
        }

        .balance-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 18px 45px rgba(147, 85, 146, 0.18);
        }

        .balance-label {
          font-size: 0.95rem;
          color: #999;
          font-weight: 600;
          letter-spacing: 0.5px;
          text-transform: uppercase;
          margin: 0 0 8px 0;
        }

        .balance-amount {
          background: linear-gradient(135deg, #935592 0%, #b886b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-size: 2rem;
          font-weight: 800;
          margin: 0;
          letter-spacing: -0.5px;
        }

        .balance-chevron {
          position: absolute;
          right: 1.5rem;
          top: 50%;
          transform: translateY(-50%);
          color: #935592;
          opacity: 0.6;
          transition: all 0.3s ease;
        }

        .balance-card:hover .balance-chevron {
          opacity: 1;
          transform: translateY(-50%) scale(1.2);
        }

        .carousel-dots {
          position: absolute;
          bottom: 1.5rem;
          left: 160px;
          display: flex;
          gap: 8px;
          z-index: 2;
        }

        .dot {
          width: 8px;
          height: 4px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 2px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .dot:hover {
          background: rgba(255, 255, 255, 0.8);
        }

        .dot.active {
          width: 28px;
          background: linear-gradient(135deg, rgba(255,255,255,0.9) 0%, rgba(230, 214, 243, 1) 100%);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        }

        .welcome-image {
          position: absolute;
          right: -20px;
          bottom: -30px;
          height: 320px;
          object-fit: cover;
          opacity: 0.8;
          z-index: 1;
        }

        .payees-card {
          width: 280px;
          height: auto;
          min-height: 280px;
          background: linear-gradient(135deg, rgba(255,255,255,0.97) 0%, rgba(246, 234, 246, 0.96) 100%);
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(147,85,146,0.14);
          padding: 28px 20px;
          color: #1d0730;
          flex: 1;
          min-width: 200px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          border: 1px solid rgba(147, 85, 146, 0.18);
          position: relative;
          overflow: hidden;
        }

        .payees-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 400px;
          height: 400px;
          background: radial-gradient(circle, rgba(184, 134, 182, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
        }

        .payees-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 60px rgba(147, 85, 146, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.6) inset;
          border-color: rgba(184, 134, 182, 0.3);
        }

        .payees-title {
          font-weight: 700;
          text-align: center;
          font-size: 1.2rem;
          background: linear-gradient(135deg, #1d0730 0%, #935592 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin: 0 0 20px 0;
          position: relative;
          z-index: 1;
        }

        .payees-list {
          margin-top: 1.5rem;
          display: flex;
          flex-direction: column;
          gap: 14px;
          position: relative;
          z-index: 1;
        }

        .payee-item {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px;
          background: rgba(255, 255, 255, 0.6);
          border-radius: 14px;
          transition: all 0.3s ease;
          cursor: pointer;
          border: 1px solid rgba(184, 134, 182, 0.1);
        }

        .payee-item:hover {
          background: rgba(255, 255, 255, 1);
          transform: translateX(4px);
          box-shadow: 0 6px 16px rgba(147, 85, 146, 0.1);
        }

        .payee-item .avatar {
          width: 40px;
          height: 40px;
          flex-shrink: 0;
        }

        .payee-info {
          font-size: 0.9rem;
          line-height: 1.3;
          flex: 1;
        }

        .payee-info p:first-child {
          font-weight: 700;
          color: #1d0730;
          margin: 0;
        }

        .payee-info p:last-child {
          color: #999;
          font-weight: 500;
          margin: 4px 0 0 0;
        }

        .view-all {
          text-align: right;
          margin-top: 16px;
          font-size: 0.9rem;
          display: flex;
          justify-content: flex-end;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          color: #935592;
          font-weight: 600;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .view-all:hover {
          gap: 10px;
          color: #b886b6;
        }

        .transactions-section {
          margin-top: 32px;
          color: black;
          animation: fadeInUp 1s cubic-bezier(0.34, 1.56, 0.64, 1);
          animation-delay: 0.2s;
        }

        .transactions-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 20px;
          background: linear-gradient(135deg, #1d0730 0%, #935592 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.5px;
        }

        .transactions-card {
          background: linear-gradient(135deg, rgba(255,255,255,0.96) 0%, rgba(243, 231, 244, 0.95) 100%);
          border-radius: 28px;
          box-shadow: 0 20px 60px rgba(147,85,146,0.14);
          padding: 28px;
          max-width: 100%;
          overflow-x: auto;
          border: 1px solid rgba(147, 85, 146, 0.18);
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
          overflow: hidden;
        }

        .transactions-card::before {
          content: '';
          position: absolute;
          top: -50%;
          right: -50%;
          width: 500px;
          height: 500px;
          background: radial-gradient(circle, rgba(184, 134, 182, 0.06) 0%, transparent 70%);
          border-radius: 50%;
          z-index: 0;
        }

        .transactions-card:hover {
          box-shadow: 0 20px 60px rgba(147, 85, 146, 0.15), 0 0 0 1px rgba(255, 255, 255, 0.6) inset;
          border-color: rgba(184, 134, 182, 0.3);
        }

        .transaction-item {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 16px;
          margin-bottom: 12px;
          gap: 16px;
          flex-wrap: wrap;
          background: rgba(255, 255, 255, 0.72);
          border-radius: 14px;
          border: 1px solid rgba(184, 134, 182, 0.14);
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .transaction-item:hover {
          background: rgba(255, 255, 255, 0.9);
          transform: translateY(-2px);
          box-shadow: 0 6px 16px rgba(147, 85, 146, 0.08);
        }

        .transaction-item .avatar {
          width: 40px;
          height: 40px;
        }

        .transaction-date,
        .transaction-account,
        .transaction-amount {
          font-size: 0.95rem;
          font-weight: 600;
          color: #2d3748;
        }

        .transaction-date {
          color: #999;
          font-weight: 500;
        }

        .transaction-account {
          color: #666;
        }

        .transaction-amount {
          background: linear-gradient(135deg, #935592 0%, #b886b6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          font-weight: 700;
        }

        .transaction-status {
          background: linear-gradient(135deg, rgba(147, 85, 146, 0.1) 0%, rgba(184, 134, 182, 0.05) 100%);
          padding: 8px 16px;
          border-radius: 10px;
          color: #935592;
          font-size: 0.85rem;
          font-weight: 700;
          white-space: nowrap;
          border: 1px solid rgba(147, 85, 146, 0.2);
          letter-spacing: 0.3px;
          text-transform: uppercase;
        }

        @media (max-width: 1024px) {
          .welcome-card {
            width: 100%;
          }

          .content {
            padding: 24px;
          }
        }

        @media (max-width: 768px) {
          .dashboard {
            flex-direction: column;
            gap: 0;
          }

          .content {
            padding: 16px;
          }

          .page-title {
            font-size: 2.2rem;
          }

          .content-header {
            gap: 1rem;
            margin-bottom: 0;
          }

          .top-section {
            flex-direction: column;
            align-items: stretch;
            gap: 16px;
            margin-top: 20px;
          }

          .welcome-card {
            height: 240px;
          }

          .balance-card {
            width: calc(100% - 2rem);
            left: 1rem;
            top: 60px;
            height: 120px;
          }

          .balance-label {
            font-size: 0.85rem;
          }

          .balance-amount {
            font-size: 1.6rem;
          }

          .welcome-image {
            height: 200px;
          }

          .carousel-dots {
            left: 1.5rem;
            bottom: 1rem;
          }

          .payees-card {
            width: 100%;
            height: auto;
            min-height: 200px;
          }

          .transaction-item {
            padding: 12px;
            flex-wrap: wrap;
            gap: 8px;
            margin-bottom: 8px;
          }

          .transaction-status {
            padding: 6px 12px;
            font-size: 0.75rem;
          }
        }

        @media (max-width: 480px) {
          .header-actions {
            gap: 0.75rem;
          }

          .avatar {
            width: 40px;
            height: 40px;
          }

          .page-title {
            font-size: 1.8rem;
          }

          .balance-label {
            font-size: 0.8rem;
          }

          .balance-amount {
            font-size: 1.4rem;
          }

          .welcome-card {
            height: 200px;
          }

          .welcome-image {
            height: 150px;
          }

          .transaction-date,
          .transaction-account,
          .transaction-amount {
            font-size: 0.8rem;
          }

          .balance-card {
            top: 50px;
          }

          .carousel-dots {
            display: none;
          }

          .content {
            padding: 12px;
          }

          .top-section {
            gap: 12px;
            margin-top: 16px;
          }

          .transactions-section {
            margin-top: 16px;
          }

          .transactions-card {
            padding: 16px;
          }
        }
      `}</style>
    </main>
  )
}
