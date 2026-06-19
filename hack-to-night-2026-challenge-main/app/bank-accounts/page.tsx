'use client'

import React, { useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import Sidebar from '@/components/sidebar'
import { Search, Bell } from '@/components/Icons'
import styles from './accounts.module.css'

type Screen = 'list' | 'add' | 'edit'

export default function AccountsPage() {
  return (
    <Suspense
      fallback={
        <main className={styles.accountsPage}>
          <Sidebar />
        </main>
      }
    >
      <AccountsContent />
    </Suspense>
  )
}

function AccountsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [screen, setScreen] = useState<Screen>('list')

  const isEditMode = searchParams.get('mode') === 'edit'
  const accountNumberParam = searchParams.get('accountNumber') || ''
  const nicknameParam = searchParams.get('nickname') || ''
  const accountNameParam = searchParams.get('accountName') || ''
  const emailParam = searchParams.get('email') || ''

  const [formData, setFormData] = useState({
    accountNumber: '',
    accountName: '',
    email: '',
    nickname: ''
  })

  const [nickname, setNickname] = useState('')

  const [errors, setErrors] = useState({
    accountNumber: '',
    accountName: '',
    email: '',
    nickname: ''
  })

  useEffect(() => {
    if (isEditMode) {
      setFormData({
        accountNumber: accountNumberParam,
        accountName: accountNameParam,
        email: emailParam,
        nickname: nicknameParam
      })
      setNickname(nicknameParam || accountNameParam)
      setScreen('edit')
    }
  }, [isEditMode, accountNumberParam, accountNameParam, emailParam, nicknameParam])

  const validateField = (name: string, value: string) => {
    let error = ''
    switch (name) {
      case 'accountNumber':
        if (!value.trim()) error = 'Account number is required'
        else if (!/^\d+$/.test(value)) error = 'Account number must contain only numbers'
        else if (value.length < 8 || value.length > 20) error = 'Account number must be between 8 and 20 digits'
        break
      case 'accountName':
        if (!value.trim()) error = 'Account name is required'
        else if (value.trim().length < 2) error = 'Account name must be at least 2 characters'
        else if (!/^[a-zA-Z\s]+$/.test(value)) error = 'Account name must contain only letters and spaces'
        break
      case 'email':
        if (!value.trim()) error = 'Email is required'
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) error = 'Please enter a valid email address'
        break
      case 'nickname':
        if (!value.trim()) error = 'Nickname is required'
        else if (value.trim().length < 2) error = 'Nickname must be at least 2 characters'
        break
      default:
        break
    }
    return error
  }

  const validateForm = () => {
    const newErrors = {
      accountNumber: validateField('accountNumber', formData.accountNumber),
      accountName: validateField('accountName', formData.accountName),
      email: validateField('email', formData.email),
      nickname: validateField('nickname', formData.nickname)
    }
    setErrors(newErrors)
    return !Object.values(newErrors).some((error) => error !== '')
  }

  const resetForm = () => {
    setFormData({ accountNumber: '', accountName: '', email: '', nickname: '' })
    setNickname('')
    setErrors({ accountNumber: '', accountName: '', email: '', nickname: '' })
  }

  const goToList = () => {
    resetForm()
    setScreen('list')
    router.push('/bank-accounts')
  }

  const goToAdd = () => {
    resetForm()
    setScreen('add')
    router.push('/bank-accounts?mode=add')
  }

  const goToEdit = () => {
    setScreen('edit')
    router.push('/bank-accounts?mode=edit')
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const error = validateField(name, value)
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const handleAddAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) {
      const firstErrorField = document.querySelector(`.${styles.fieldError}`)
      if (firstErrorField) firstErrorField.scrollIntoView({ behavior: 'smooth', block: 'center' })
      return
    }
    console.log('Adding new account:', formData)
    alert('Account added successfully!')
    resetForm()
    goToList()
  }

  const handleUpdateAccount = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.accountNumber.trim()) {
      alert('Please enter an account number first')
      return
    }
    router.push(
      `/bank-accounts?mode=edit&accountNumber=${formData.accountNumber}&accountName=${formData.accountName || ''}&email=${formData.email || ''}&nickname=${formData.nickname || ''}`
    )
  }

  const handleEditNickname = (e: React.FormEvent) => {
    e.preventDefault()
    if (!nickname.trim()) { alert('Please enter a nickname'); return }
    if (nickname.trim().length < 2) { alert('Nickname must be at least 2 characters'); return }
    console.log('Updating nickname to:', nickname)
    alert(`Nickname updated to: ${nickname}`)
    resetForm()
    goToList()
  }

  const handleCancel = () => {
    resetForm()
    goToList()
  }

  const HeaderSection = () => (
    <header className={styles.contentHeader}>
      <h1 className={styles.pageTitle}>My Accounts</h1>
      <div className={styles.headerActions}>
        <Search size={22} />
        <Bell size={22} />
        <div className={styles.avatarPlaceholder}>
          <Image
            src="/person-logo.png"
            alt="Profile"
            width={40}
            height={40}
            style={{ objectFit: 'cover', borderRadius: '14px' }}
          />
        </div>
      </div>
    </header>
  )

  return (
    <main className={styles.accountsPage}>
      <Sidebar />
      <section className={styles.content}>
        {/* ===== LIST SCREEN ===== */}
        {screen === 'list' && (
          <>
            <HeaderSection />

            <div className={styles.topSummary}>
              <div className={styles.summaryCard}>
                <div className={styles.summaryHeader}>
                  <div>
                    <p className={styles.summaryLabel}>Total Linked Accounts</p>
                    <h2 className={styles.summaryValue}>3 Active</h2>
                  </div>
                  <span className={styles.summaryBadge}>âœ¦ Premium</span>
                </div>
                <p className={styles.summaryDescription}>
                  All your accounts in one place. Track balances, manage cards, and get smart spending insights at a glance.
                </p>
                <div className={styles.summaryStats}>
                  <div className={styles.statCard}>
                    <span>Combined Balance</span>
                    <strong>$21,480</strong>
                  </div>
                  <div className={styles.statCard}>
                    <span>Active Cards</span>
                    <strong>5</strong>
                  </div>
                  <div className={styles.statCard}>
                    <span>Monthly Spent</span>
                    <strong>$3,240</strong>
                  </div>
                </div>
              </div>

              <div className={styles.quickActionsCard}>
                <h3 className={styles.actionTitle}>Quick Actions</h3>
                <p className={styles.actionDescription}>
                  Manage your accounts instantly with one-tap actions.
                </p>
                <div className={styles.actionButtons}>
                  <button className={styles.quickBtn} onClick={goToAdd}>
                    + Add Account
                  </button>
                  <button className={styles.quickBtnAlt}>
                    â†— Link Card
                  </button>
                  <button className={styles.quickBtnAlt}>
                    â‡„ Transfer
                  </button>
                </div>
              </div>
            </div>

            <h3 className={styles.sectionTitle}>Your Cards</h3>

            <div className={styles.cardsContainer}>
              {/* Card 1 */}
              <div className={`${styles.accountCard} ${styles.cardGradient1}`}>
                <div className={styles.accountTopRow}>
                  <div className={styles.accountAvatar}>
                    <Image
                      src="/account-logo.png"
                      alt="Nova Bank"
                      width={48}
                      height={48}
                      style={{ objectFit: 'cover', borderRadius: '12px' }}
                    />
                  </div>
                  <div className={styles.accountTag}>Primary</div>
                </div>
                <div className={styles.accountCardContent}>
                  <h2 className={styles.accountName}>Anura Kumara</h2>
                  <p className={styles.accountDetails}>Nova Bank Â· Savings</p>
                  <p className={styles.cardNumber}>â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ 4821</p>
                </div>
                <div className={styles.balanceRow}>
                  <div>
                    <span className={styles.balanceLabel}>Available Balance</span>
                    <p className={styles.transactionHint}>Last txn 2 days ago</p>
                  </div>
                  <strong className={styles.balanceAmount}>$9,580</strong>
                </div>
                <div className={styles.cardFooter}>
                  <button className={styles.cardButton} onClick={goToEdit}>Manage</button>
                  <button className={styles.cardButton}>Details</button>
                </div>
              </div>

              {/* Card 2 */}
              <div className={`${styles.accountCard} ${styles.cardGradient2}`}>
                <div className={styles.accountTopRow}>
                  <div className={styles.accountAvatar}>
                    <Image
                      src="/account-logo.png"
                      alt="Ceylon Bank"
                      width={48}
                      height={48}
                      style={{ objectFit: 'cover', borderRadius: '12px' }}
                    />
                  </div>
                  <div className={styles.accountTag}>Secondary</div>
                </div>
                <div className={styles.accountCardContent}>
                  <h2 className={styles.accountName}>Anura Kumara</h2>
                  <p className={styles.accountDetails}>Ceylon Bank Â· Current</p>
                  <p className={styles.cardNumber}>â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ 7293</p>
                </div>
                <div className={styles.balanceRow}>
                  <div>
                    <span className={styles.balanceLabel}>Available Balance</span>
                    <p className={styles.transactionHint}>Last txn 5 days ago</p>
                  </div>
                  <strong className={styles.balanceAmount}>$8,400</strong>
                </div>
                <div className={styles.cardFooter}>
                  <button className={styles.cardButton} onClick={goToEdit}>Manage</button>
                  <button className={styles.cardButton}>Details</button>
                </div>
              </div>

              {/* Card 3 */}
              <div className={`${styles.accountCard} ${styles.cardGradient3}`}>
                <div className={styles.accountTopRow}>
                  <div className={styles.accountAvatar}>
                    <Image
                      src="/account-logo.png"
                      alt="HSBC"
                      width={48}
                      height={48}
                      style={{ objectFit: 'cover', borderRadius: '12px' }}
                    />
                  </div>
                  <div className={styles.accountTag}>Credit</div>
                </div>
                <div className={styles.accountCardContent}>
                  <h2 className={styles.accountName}>Anura Kumara</h2>
                  <p className={styles.accountDetails}>HSBC Â· Credit Card</p>
                  <p className={styles.cardNumber}>â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ â€¢â€¢â€¢â€¢ 1056</p>
                </div>
                <div className={styles.balanceRow}>
                  <div>
                    <span className={styles.balanceLabel}>Available Credit</span>
                    <p className={styles.transactionHint}>Due in 12 days</p>
                  </div>
                  <strong className={styles.balanceAmount}>$3,500</strong>
                </div>
                <div className={styles.cardFooter}>
                  <button className={styles.cardButton} onClick={goToEdit}>Manage</button>
                  <button className={styles.cardButton}>Details</button>
                </div>
              </div>

              {/* Add Account Card */}
              <button className={styles.addAccountCard} onClick={goToAdd}>
                <div className={styles.addAccountContent}>
                  <span className={styles.addAccountIcon}>+</span>
                  <h2 className={styles.addAccountTitle}>Add New Account</h2>
                  <p className={styles.addAccountSubtitle}>
                    Link a bank account or card to get a complete view of your finances.
                  </p>
                </div>
              </button>
            </div>
          </>
        )}

        {/* ===== ADD SCREEN ===== */}
        {screen === 'add' && (
          <>
            <HeaderSection />

            <div className={styles.formContainer}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Link a New Account</h2>
                </div>

                <form className={styles.formFields}>
                  <div className={styles.formGroup}>
                    <label htmlFor="accountNumber">Bank Account Number</label>
                    <input
                      type="text"
                      id="accountNumber"
                      name="accountNumber"
                      value={formData.accountNumber}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter account number"
                      className={errors.accountNumber ? styles.inputError : ''}
                      required
                    />
                    {errors.accountNumber && (
                      <span className={styles.fieldError}>{errors.accountNumber}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="accountName">Account Holder Name</label>
                    <input
                      type="text"
                      id="accountName"
                      name="accountName"
                      value={formData.accountName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter account holder name"
                      className={errors.accountName ? styles.inputError : ''}
                      required
                    />
                    {errors.accountName && (
                      <span className={styles.fieldError}>{errors.accountName}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Enter email address"
                      className={errors.email ? styles.inputError : ''}
                      required
                    />
                    {errors.email && (
                      <span className={styles.fieldError}>{errors.email}</span>
                    )}
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="nickname">Nickname</label>
                    <input
                      type="text"
                      id="nickname"
                      name="nickname"
                      value={formData.nickname}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="e.g. My Savings"
                      className={errors.nickname ? styles.inputError : ''}
                      required
                    />
                    {errors.nickname && (
                      <span className={styles.fieldError}>{errors.nickname}</span>
                    )}
                  </div>

                  <div className={styles.formActionsBottom}>
                    <button type="button" className={styles.btnCancel} onClick={handleCancel}>
                      Cancel
                    </button>
                    <button type="button" className={styles.btnAdd} onClick={handleAddAccount}>
                      Add Account
                    </button>
                    <button type="button" className={styles.btnUpdate} onClick={handleUpdateAccount}>
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}

        {/* ===== EDIT SCREEN ===== */}
        {screen === 'edit' && (
          <>
            <HeaderSection />

            <div className={styles.formContainer}>
              <div className={styles.formCard}>
                <div className={styles.formHeader}>
                  <h2 className={styles.formTitle}>Edit Nickname</h2>
                </div>

                <form onSubmit={handleEditNickname} className={styles.formFields}>
                  <div className={styles.formGroup}>
                    <label htmlFor="accountNumber">Bank Account Number</label>
                    <input
                      type="text"
                      id="accountNumber"
                      value={formData.accountNumber || '1234567890'}
                      disabled
                      className={styles.inputDisabled}
                    />
                  </div>

                  <div className={styles.formGroup}>
                    <label htmlFor="nickname">Nickname</label>
                    <input
                      type="text"
                      id="nickname"
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      placeholder="Enter new nickname"
                      required
                    />
                  </div>

                  <div className={styles.formActionsBottom}>
                    <button type="button" className={styles.btnCancel} onClick={handleCancel}>
                      Cancel
                    </button>
                    <button type="submit" className={styles.btnUpdate}>
                      Update
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </>
        )}
      </section>
    </main>
  )
}
