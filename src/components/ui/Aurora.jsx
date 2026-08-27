import { useEffect, useRef } from 'react'

/**
 * A single, quiet drifting glow — monochrome and low-opacity by design, so it
 * reads as ambient depth behind the type rather than a decorative effect.
 * Canvas-based stand-in for reactbits' WebGL Aurora (kept dependency-free).
 */
export default function Aurora({ className = '', color = '245, 243, 238' }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let raf = null
    let w = 0
    let h = 0
    // Render at a fraction of display size — the CSS blur on the canvas
    // element hides the softness loss and keeps this cheap on the main thread.
    const scale = 0.35
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5) * scale

    const blobs = [
      { color, rx: 0.26, ry: 0.22, sx: 0.00014, sy: 0.00011, phase: 0 },
      { color, rx: 0.18, ry: 0.3, sx: 0.0001, sy: 0.00016, phase: 3 },
    ]

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'screen'

      blobs.forEach((b) => {
        const cx = w * 0.5 + Math.sin(t * b.sx + b.phase) * w * b.rx
        const cy = h * 0.5 + Math.cos(t * b.sy + b.phase) * h * b.ry
        const r = Math.max(w, h) * 0.28
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grad.addColorStop(0, `rgba(${b.color}, 0.1)`)
        grad.addColorStop(1, `rgba(${b.color}, 0)`)
        ctx.fillStyle = grad
        ctx.fillRect(0, 0, w, h)
      })

      if (!reduce) raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    if (reduce) draw(0)

    return () => {
      window.removeEventListener('resize', resize)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [color])

  return (
    <canvas
      ref={canvasRef}
      className={`pointer-events-none ${className}`}
      style={{ filter: 'blur(50px)', willChange: 'filter' }}
      aria-hidden="true"
    />
  )
}
