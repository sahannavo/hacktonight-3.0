export default function AccountsLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-auto px-4 py-8 font-geist sm:px-8">
      {/* Enhanced Background with Gradients */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-135 from-[#f5f7fa] via-[#e8e8f0] to-[#c3cfe2]" />
      
      {/* Animated Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-purple-200/30 to-transparent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-gradient-to-tr from-purple-100/20 to-transparent rounded-full blur-3xl" style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute top-1/2 left-1/3 w-72 h-72 bg-gradient-to-br from-blue-100/15 to-transparent rounded-full blur-3xl" style={{ animation: 'float 12s ease-in-out infinite reverse' }} />
      </div>

      {/* Overlay for depth */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-white/40 via-white/20 to-white/10" />

      {/* Content Container */}
      <div className="w-full max-w-[1176px] relative z-10">
        <style jsx>{`
          @keyframes float {
            0%, 100% {
              transform: translate(0, 0);
            }
            50% {
              transform: translate(-30px, 30px);
            }
          }

          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          @media (max-width: 640px) {
            :global(main) {
              padding: 1rem 1rem;
            }
          }
        `}</style>
        {children}
      </div>
    </main>
  )
}
