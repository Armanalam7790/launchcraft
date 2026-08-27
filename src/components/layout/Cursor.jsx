import { useEffect, useRef } from 'react'
import { gsap } from '../../lib/gsap'

export default function Cursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current

    const dotX = gsap.quickTo(dot, 'x', { duration: 0.1, ease: 'power3.out' })
    const dotY = gsap.quickTo(dot, 'y', { duration: 0.1, ease: 'power3.out' })
    const ringX = gsap.quickTo(ring, 'x', { duration: 0.45, ease: 'power3.out' })
    const ringY = gsap.quickTo(ring, 'y', { duration: 0.45, ease: 'power3.out' })

    let primed = false
    const onMove = (e) => {
      dotX(e.clientX)
      dotY(e.clientY)
      ringX(e.clientX)
      ringY(e.clientY)
      if (!primed) {
        primed = true
        gsap.to([dot, ring], { opacity: 1, duration: 0.3 })
      }
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (!target) return
      const label = target.getAttribute('data-cursor')
      ring.textContent = label || ''
      ring.style.mixBlendMode = label ? 'normal' : 'difference'
      gsap.to(ring, {
        width: label ? 96 : 60,
        height: label ? 96 : 60,
        marginLeft: label ? -48 : -30,
        marginTop: label ? -48 : -30,
        background: label ? 'rgba(255, 90, 31, 0.96)' : 'rgba(0,0,0,0)',
        color: label ? '#fff' : '#fff',
        borderColor: label ? 'transparent' : '#fff',
        duration: 0.35,
        ease: 'power3.out',
      })
      gsap.to(dot, { opacity: label ? 0 : 1, duration: 0.2 })
    }

    const onOut = (e) => {
      const target = e.target.closest('[data-cursor]')
      if (!target) return
      ring.textContent = ''
      ring.style.mixBlendMode = 'difference'
      gsap.to(ring, {
        width: 46,
        height: 46,
        marginLeft: -23,
        marginTop: -23,
        background: 'rgba(0,0,0,0)',
        color: '#fff',
        borderColor: '#fff',
        duration: 0.35,
        ease: 'power3.out',
      })
      gsap.to(dot, { opacity: 1, duration: 0.2 })
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" style={{ opacity: 0 }} />
      <div ref={ringRef} className="cursor-ring" style={{ opacity: 0 }} />
    </>
  )
}
