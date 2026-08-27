import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from '../../lib/gsap'

/** Nav links with a sliding pill highlight that tracks the hovered item — reactbits' Pill Nav. */
export default function PillNav({ items, theme = 'light', className = '' }) {
  const containerRef = useRef(null)
  const itemRefs = useRef([])
  const highlightRef = useRef(null)
  const [hovered, setHovered] = useState(null)
  const dark = theme === 'dark'

  useEffect(() => {
    gsap.set(highlightRef.current, { width: 0 })
  }, [])

  useEffect(() => {
    const hl = highlightRef.current
    if (!hl) return

    if (hovered == null) {
      gsap.to(hl, { opacity: 0, duration: 0.25, ease: 'power2.out' })
      return
    }
    const el = itemRefs.current[hovered]
    const container = containerRef.current
    if (!el || !container) return
    const elRect = el.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    gsap.to(hl, {
      x: elRect.left - containerRect.left,
      width: elRect.width,
      opacity: 1,
      duration: 0.45,
      ease: 'power3.out',
    })
  }, [hovered])

  return (
    <nav ref={containerRef} onMouseLeave={() => setHovered(null)} className={`relative items-center gap-1 ${className}`}>
      <span
        ref={highlightRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 h-full rounded-full bg-orange opacity-0"
        style={{ willChange: 'transform, width' }}
      />
      {items.map((item, i) => {
        // Hash links stay plain anchors (Lenis smooth-scrolls them on the
        // current page); real paths use router Link so navigation doesn't
        // full-reload and replay the preloader.
        const isRoute = !item.href.startsWith('#')
        const Tag = isRoute ? Link : 'a'
        const linkProp = isRoute ? { to: item.href } : { href: item.href }

        return (
          <Tag
            key={item.label}
            {...linkProp}
            ref={(el) => (itemRefs.current[i] = el)}
            onMouseEnter={() => setHovered(i)}
            onFocus={() => setHovered(i)}
            onBlur={() => setHovered(null)}
            className={`relative z-10 rounded-full px-4 py-2 font-mono text-[13px] tracking-wide transition-colors duration-300 ${
              hovered === i ? 'text-cream' : dark ? 'text-muted-dark hover:text-ink-dark' : 'text-muted hover:text-ink'
            }`}
          >
            {item.label}
          </Tag>
        )
      })}
    </nav>
  )
}
