import { useState } from 'react'

/** Text set along a circular path, rotating — reactbits' Circular Text. */
export default function CircularText({ text, radius = 90, className = '', fontSize = 13, fast = false }) {
  const chars = text.split('')
  const [hover, setHover] = useState(false)

  return (
    <div
      className={`circular-text relative ${fast || hover ? 'is-fast' : ''} ${className}`}
      style={{ width: radius * 2, height: radius * 2 }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-hidden="true"
    >
      {chars.map((ch, i) => {
        const angle = (360 / chars.length) * i
        return (
          <span
            key={i}
            className="absolute left-1/2 top-1/2 font-mono uppercase tracking-[0.1em] text-ink"
            style={{
              fontSize,
              transformOrigin: '0 0',
              transform: `rotate(${angle}deg) translate(0, -${radius}px)`,
            }}
          >
            {ch}
          </span>
        )
      })}
    </div>
  )
}
