/** Diagonal light sweep on hover — reactbits' Glare Hover. */
export default function GlareHover({ children, className = '' }) {
  return (
    <div className={`group relative overflow-hidden ${className}`}>
      {children}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -translate-x-[130%] -skew-x-12 bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[130%]"
      />
    </div>
  )
}
