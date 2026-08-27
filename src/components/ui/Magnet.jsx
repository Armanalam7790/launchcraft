import useMagnetic from '../../hooks/useMagnetic'

/** Pulls its content toward the cursor within a padded radius — reactbits' Magnet. */
export default function Magnet({ children, className = '', strength = 0.4, padding = 24 }) {
  const ref = useMagnetic({ strength })
  return (
    <div className={`inline-block ${className}`} style={{ padding, margin: -padding }}>
      <div ref={ref} className="inline-block">
        {children}
      </div>
    </div>
  )
}
