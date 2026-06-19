import type { ButtonHTMLAttributes } from 'react'

type AuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement>

export default function AuthButton({
  className = '',
  type = 'button',
  ...props
}: AuthButtonProps) {
  return (
    <button
      type={type}
      className={`h-[82px] w-[228px] rounded-[38px] bg-gradient-to-br from-[#b886b6] to-[#935592] text-[1.85rem] font-bold text-white shadow-[0_4px_4px_0_rgba(0,0,0,0.30),0_8px_12px_6px_rgba(0,0,0,0.15)] transition-all duration-300 hover:shadow-[0_12px_24px_rgba(147,85,146,0.35)] hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed relative overflow-hidden group ${className}`}
      {...props}
    >
      <span className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-500"></span>
      <span className="relative">{props.children}</span>
    </button>
  )
}
