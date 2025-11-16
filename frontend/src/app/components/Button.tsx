"use client"

type Props = {
  children: React.ReactNode
  className?: string
  onClick?: (e: React.MouseEvent) => void
  type?: "button" | "submit" | "reset"
}

export default function Button({ children, className = '', onClick, type = 'button' }: Props) {
  const base = 'inline-flex items-center justify-center gap-2 px-6 py-2 rounded-md font-semibold transition'
  const style = 'border-2 border-white text-white hover:bg-white hover:text-black'
  return (
    <button type={type} onClick={onClick} className={`${base} ${style} ${className}`}>
      {children}
    </button>
  )
}
