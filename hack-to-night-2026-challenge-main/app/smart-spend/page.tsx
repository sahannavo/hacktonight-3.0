'use client'

import Sidebar from '@/components/sidebar'
import styles from './smart-spend.module.css'

export default function SmartSpendPage() {
  return (
    <div className={styles.container}>
      <div className="flex min-h-screen">
        <Sidebar />

        <main className={styles.main}>
          {/* Header */}
          <div className={styles.header}>
            <div>
              <h2 className={styles.pageTitle}>Smart Spend</h2>
              <p className={styles.pageSubtitle}>Track and optimize your spending</p>
            </div>
            <div className={styles.headerActions}>
              <button className={styles.iconBtn} aria-label="search">
                <img src="/search.png" alt="search" />
              </button>
              <button className={styles.iconBtn} aria-label="notifications">
                <img src="/notification.png" alt="notifications" />
              </button>
              <div className={styles.avatarBox}>
                <img
                  src="/avatar.png"
                  alt="avatar"
                  className={styles.avatar}
                />
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className={styles.contentGrid}>
            {/* Welcome Card */}
            <div className={`${styles.card} ${styles.welcomeCard}`}>
              <div className={styles.cardContent}>
                <h3 className={styles.cardTitle}>Welcome to Smart Spend</h3>
                <p className={styles.cardText}>
                  Your intelligent spending assistant is ready to help you make smarter financial decisions
                </p>
                <button className={styles.ctaButton}>Get Started</button>
              </div>
              <div className={styles.cardIllustration}>
                <div className={styles.illustrationCircle1}></div>
                <div className={styles.illustrationCircle2}></div>
              </div>
            </div>

            {/* Spending Summary */}
            <div className={`${styles.card} ${styles.summaryCard}`}>
              <h3 className={styles.cardTitle}>This Month Summary</h3>
              <div className={styles.statsGrid}>
                <div className={styles.statBox}>
                  <div className={styles.statIcon}>💰</div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>Total Spent</p>
                    <p className={styles.statValue}>$2,450</p>
                  </div>
                </div>
                <div className={styles.statBox}>
                  <div className={styles.statIcon}>📊</div>
                  <div className={styles.statContent}>
                    <p className={styles.statLabel}>Budget Used</p>
                    <p className={styles.statValue}>68%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Categories */}
            <div className={`${styles.card} ${styles.categoriesCard}`}>
              <h3 className={styles.cardTitle}>Spending Categories</h3>
              <div className={styles.categoryList}>
                <div className={styles.categoryItem}>
                  <div className={`${styles.categoryIcon} ${styles.foodIcon}`}>🍔</div>
                  <div className={styles.categoryInfo}>
                    <p className={styles.categoryName}>Food & Dining</p>
                    <p className={styles.categoryAmount}>$520</p>
                  </div>
                  <div className={styles.categoryBar}>
                    <div className={styles.categoryProgress} style={{ width: '42%' }}></div>
                  </div>
                </div>

                <div className={styles.categoryItem}>
                  <div className={`${styles.categoryIcon} ${styles.transportIcon}`}>🚗</div>
                  <div className={styles.categoryInfo}>
                    <p className={styles.categoryName}>Transportation</p>
                    <p className={styles.categoryAmount}>$380</p>
                  </div>
                  <div className={styles.categoryBar}>
                    <div className={styles.categoryProgress} style={{ width: '31%' }}></div>
                  </div>
                </div>

                <div className={styles.categoryItem}>
                  <div className={`${styles.categoryIcon} ${styles.shoppingIcon}`}>🛍️</div>
                  <div className={styles.categoryInfo}>
                    <p className={styles.categoryName}>Shopping</p>
                    <p className={styles.categoryAmount}>$620</p>
                  </div>
                  <div className={styles.categoryBar}>
                    <div className={styles.categoryProgress} style={{ width: '50%' }}></div>
                  </div>
                </div>

                <div className={styles.categoryItem}>
                  <div className={`${styles.categoryIcon} ${styles.entertainmentIcon}`}>🎬</div>
                  <div className={styles.categoryInfo}>
                    <p className={styles.categoryName}>Entertainment</p>
                    <p className={styles.categoryAmount}>$330</p>
                  </div>
                  <div className={styles.categoryBar}>
                    <div className={styles.categoryProgress} style={{ width: '27%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Tips & Insights */}
            <div className={`${styles.card} ${styles.tipsCard}`}>
              <h3 className={styles.cardTitle}>💡 Smart Tips</h3>
              <div className={styles.tipsList}>
                <div className={styles.tipItem}>
                  <span className={styles.tipNumber}>1</span>
                  <p>Set monthly budgets for each category to stay in control</p>
                </div>
                <div className={styles.tipItem}>
                  <span className={styles.tipNumber}>2</span>
                  <p>Review your spending weekly to catch unusual patterns</p>
                </div>
                <div className={styles.tipItem}>
                  <span className={styles.tipNumber}>3</span>
                  <p>Use cashback and rewards programs to maximize savings</p>
                </div>
              </div>
            </div>

            {/* Features Coming Soon */}
            <div className={`${styles.card} ${styles.featureCard}`}>
              <h3 className={styles.cardTitle}>🚀 Coming Soon</h3>
              <div className={styles.featureList}>
                <div className={styles.featureItem}>
                  <div className={styles.featureBadge}>✓</div>
                  <p>AI-powered spending insights</p>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureBadge}>✓</div>
                  <p>Personalized savings recommendations</p>
                </div>
                <div className={styles.featureItem}>
                  <div className={styles.featureBadge}>✓</div>
                  <p>Budget alerts & notifications</p>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
