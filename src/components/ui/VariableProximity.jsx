import { useEffect, useRef } from 'react'

/**
 * Characters gain weight as the cursor nears them, using the variable font's
 * wght axis — reactbits' Variable Proximity, for selected interactive type.
 */
export default function VariableProximity({ text, as: Tag = 'span', className = '', radius = 140, minWeight = 300, maxWeight = 800 }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (window.matchMedia('(pointer: coarse), (prefers-reduced-motion: reduce)').matches) return

    el.innerHTML = text
      .split(' ')
      .map(
        (word) =>
          `<span class="inline-block whitespace-nowrap">${word
            .split('')
            .map((ch) => `<span class="inline-block" style="font-variation-settings:'wght' ${minWeight}">${ch}</span>`)
            .join('')}</span>`,
      )
      .join(' ')
    const chars = el.querySelectorAll('span span')

    let raf = null
    let mouseX = -9999
    let mouseY = -9999

    const onMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
    }

    const tick = () => {
      chars.forEach((c) => {
        const r = c.getBoundingClientRect()
        const cx = r.left + r.width / 2
        const cy = r.top + r.height / 2
        const dist = Math.hypot(mouseX - cx, mouseY - cy)
        const t = Math.max(0, 1 - dist / radius)
        const weight = Math.round(minWeight + (maxWeight - minWeight) * t)
        c.style.fontVariationSettings = `'wght' ${weight}`
      })
      raf = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', onMove)
    raf = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [text, radius, minWeight, maxWeight])

  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
