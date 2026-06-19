'use client'

import Sidebar from '@/components/sidebar'
import styles from './smart-spend.module.css'

export default function SmartSpendPage() {
  return (
    <div className={styles.container}>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className={styles.main}>
          <div className={styles.mainHeader}>
            <div>
              <p className={styles.sectionLabel}>Smart Banking</p>
              <h1 className={styles.pageTitle}>Smart Spend</h1>
              <p className={styles.pageSubtitle}>
                Colorful insights for smarter, faster money decisions.
              </p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.iconBtn} aria-label="search">
                <img src="/search.png" alt="search" />
              </button>
              <button className={styles.iconBtn} aria-label="notifications">
                <img src="/notification.png" alt="notifications" />
              </button>
              <div className={styles.avatarBox}>
                <img src="/avatar.png" alt="avatar" className={styles.avatar} />
              </div>
            </div>
          </div>

          <div className={styles.heroGrid}>
            <section className={`${styles.card} ${styles.heroCard}`}>
              <div className={styles.heroContent}>
                <span className={styles.heroBadge}>Smart Spend</span>
                <h2 className={styles.heroTitle}>Track your spending with elegance</h2>
                <p className={styles.heroText}>
                  Get crisp monthly insights, category breakdowns, and spending tips wrapped in bright banking style.
                </p>
                <div className={styles.heroActions}>
                  <button className={styles.primaryBtn}>View report</button>
                  <button className={styles.secondaryBtn}>Explore tips</button>
                </div>
              </div>
              <div className={styles.heroVisual}>
                <div className={styles.pillRow}>
                  <div className={styles.pillPrimary}>Accounts</div>
                  <div className={styles.pillAccent}>Savings</div>
                </div>
                <div className={styles.visualStats}>
                  <div className={styles.visualStat}>
                    <span>Total</span>
                    <strong>$18.2K</strong>
                  </div>
                  <div className={styles.visualStat}>
                    <span>Freed</span>
                    <strong>$1.8K</strong>
                  </div>
                </div>
              </div>
            </section>

            <aside className={styles.summaryPanel}>
              <div className={styles.panelCard}>
                <p className={styles.panelLabel}>Balance</p>
                <h3>$12,490</h3>
                <p className={styles.panelNote}>Available across your linked accounts</p>
              </div>
              <div className={styles.panelCardAlt}>
                <p className={styles.panelLabel}>Spend Score</p>
                <h3>92%</h3>
                <p className={styles.panelNote}>Excellent cashflow health</p>
              </div>
            </aside>
          </div>

          <div className={styles.contentGrid}>
            <section className={`${styles.card} ${styles.statsCard}`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Monthly Summary</h3>
                <span className={styles.badge}>Live</span>
              </div>
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statIcon}>💳</div>
                  <div>
                    <p className={styles.statLabel}>Total Spent</p>
                    <p className={styles.statValue}>$2,450</p>
                  </div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statIcon}>🏦</div>
                  <div>
                    <p className={styles.statLabel}>Saved</p>
                    <p className={styles.statValue}>$720</p>
                  </div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statIcon}>📈</div>
                  <div>
                    <p className={styles.statLabel}>Goal Progress</p>
                    <p className={styles.statValue}>76%</p>
                  </div>
                </div>
              </div>
              <div className={styles.usageChart}>
                <div className={styles.usageHeader}>
                  <span>Spending trend</span>
                  <strong>+12% this month</strong>
                </div>
                <div className={styles.usageBarContainer}>
                  <div className={styles.usageBar} style={{ width: '65%' }}></div>
                </div>
              </div>
            </section>

            <section className={`${styles.card} ${styles.categoriesCard}`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Top Categories</h3>
                <span className={styles.badgeAlt}>Insights</span>
              </div>
              <div className={styles.categoryGrid}>
                <div className={styles.categoryCard}>
                  <span className={styles.categoryIcon}>🍽️</span>
                  <p className={styles.categoryName}>Food & Dining</p>
                  <strong>$520</strong>
                </div>
                <div className={styles.categoryCard}>
                  <span className={styles.categoryIcon}>🚗</span>
                  <p className={styles.categoryName}>Transport</p>
                  <strong>$380</strong>
                </div>
                <div className={styles.categoryCard}>
                  <span className={styles.categoryIcon}>🛍️</span>
                  <p className={styles.categoryName}>Shopping</p>
                  <strong>$620</strong>
                </div>
                <div className={styles.categoryCard}>
                  <span className={styles.categoryIcon}>🎬</span>
                  <p className={styles.categoryName}>Entertainment</p>
                  <strong>$330</strong>
                </div>
              </div>
            </section>

            <section className={`${styles.card} ${styles.insightCard}`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Spending Recommendations</h3>
              </div>
              <ul className={styles.insightList}>
                <li>Move recurring subscriptions to a dedicated savings bucket.</li>
                <li>Use cash for small daily expenses to avoid higher fees.</li>
                <li>Set alerts for entertainment spending above $200.</li>
              </ul>
            </section>

            <section className={`${styles.card} ${styles.featureCard}`}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>Next Up</h3>
              </div>
              <div className={styles.featureGrid}>
                <div className={styles.featureBlock}>
                  <span className={styles.featureEmoji}>⚡</span>
                  <div>
                    <strong>Faster budgets</strong>
                    <p>Auto-budget updates in real time.</p>
                  </div>
                </div>
                <div className={styles.featureBlock}>
                  <span className={styles.featureEmoji}>🛡️</span>
                  <div>
                    <strong>Secure alerts</strong>
                    <p>Instant notifications for unusual spend.</p>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  )
}
