import { useRef } from 'react'
import { gsap } from '../../lib/gsap'

/** Perspective tilt that follows the cursor — reactbits' Tilted Card. */
export default function TiltedCard({ children, className = '', max = 10, scale = 1.02 }) {
  const ref = useRef(null)

  const onMove = (e) => {
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(el, {
      rotateX: -py * max,
      rotateY: px * max,
      scale,
      duration: 0.5,
      ease: 'power3.out',
      transformPerspective: 800,
    })
  }
  const onLeave = () => {
    gsap.to(ref.current, { rotateX: 0, rotateY: 0, scale: 1, duration: 0.6, ease: 'power3.out' })
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={`[transform-style:preserve-3d] will-change-transform ${className}`}
    >
      {children}
    </div>
  )
}
