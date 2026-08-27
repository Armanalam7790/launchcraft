import { useEffect, useRef } from 'react'

/**
 * A quiet, pointer-reactive sphere of light — monochrome by design so it
 * reads as depth/atmosphere rather than a decorative glow. Canvas stand-in
 * for reactbits' WebGL Orb (kept dependency-free, consistent with Aurora).
 */
export default function Orb({ className = '', color = '245, 243, 238' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const parent = canvas.parentElement
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = null
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5)
    const pointer = { x: 0.5, y: 0.42 }

    const resize = () => {
      const rect = parent.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect()
      pointer.x = (e.clientX - rect.left) / rect.width
      pointer.y = (e.clientY - rect.top) / rect.height
    }
    parent.addEventListener('mousemove', onMove)

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      const cx = w / 2
      const cy = h / 2
      const r = Math.min(w, h) * 0.34

      const pulse = 0.9 + Math.sin(t * 0.0006) * 0.1
      const px = cx + (pointer.x - 0.5) * r * 0.7
      const py = cy + (pointer.y - 0.5) * r * 0.7

      const grad = ctx.createRadialGradient(px - r * 0.3, py - r * 0.3, r * 0.04, cx, cy, r * pulse)
      grad.addColorStop(0, `rgba(${color}, 0.22)`)
      grad.addColorStop(0.55, `rgba(${color}, 0.08)`)
      grad.addColorStop(1, `rgba(${color}, 0)`)
      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.arc(cx, cy, r, 0, Math.PI * 2)
      ctx.fill()

      ctx.strokeStyle = `rgba(${color}, 0.14)`
      ctx.lineWidth = 1
      ctx.beginPath()
      ctx.arc(cx, cy, r * 1.18, 0, Math.PI * 2)
      ctx.stroke()

      if (!reduce) raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    if (reduce) draw(0)

    return () => {
      window.removeEventListener('resize', resize)
      parent.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ filter: 'blur(26px)', willChange: 'filter' }}
      aria-hidden="true"
    />
  )
}
