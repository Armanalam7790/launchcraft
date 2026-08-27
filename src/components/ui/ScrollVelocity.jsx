import { useEffect, useRef } from 'react'

/**
 * Marquee whose speed and skew respond to scroll velocity — reactbits'
 * Scroll Velocity, used to move the client wordmark row.
 */
export default function ScrollVelocity({ items, baseSpeed = 0.6, className = '', itemClassName = '' }) {
  const trackRef = useRef(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let x = 0
    let lastY = window.scrollY
    let velocity = 0
    let raf = null
    const half = () => track.scrollWidth / 2

    const tick = () => {
      const y = window.scrollY
      const rawVel = y - lastY
      lastY = y
      velocity += (rawVel - velocity) * 0.15

      if (!reduce) {
        x -= baseSpeed + velocity * 0.6
        const w = half()
        if (w > 0) {
          if (x <= -w) x += w
          if (x > 0) x -= w
        }
        const skew = Math.max(-14, Math.min(14, velocity * -1.4))
        track.style.transform = `translateX(${x}px) skewX(${skew}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => raf && cancelAnimationFrame(raf)
  }, [baseSpeed])

  return (
    <div className={`overflow-hidden ${className}`}>
      <div ref={trackRef} className="flex w-max will-change-transform">
        {[0, 1].map((rep) => (
          <div className="flex flex-shrink-0 items-center" key={rep} aria-hidden={rep === 1}>
            {items.map((item, i) => (
              <span className={`flex-shrink-0 whitespace-nowrap ${itemClassName}`} key={`${rep}-${i}`}>
                {item}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  )
}
