import { useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

/** Cards recede into 3D depth around the active one — reactbits' Depth Carousel. */
export default function DepthCarousel({ items, renderItem, autoAdvance = 6000, className = '', stageClassName = 'min-h-[420px]' }) {
  const [active, setActive] = useState(0)
  const hoverRef = useRef(false)
  const reduce = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

  useEffect(() => {
    if (!autoAdvance || reduce || items.length < 2) return
    const id = setInterval(() => {
      if (!hoverRef.current) setActive((a) => (a + 1) % items.length)
    }, autoAdvance)
    return () => clearInterval(id)
  }, [items.length, autoAdvance, reduce])

  const go = (dir) => setActive((a) => (a + dir + items.length) % items.length)

  return (
    <div
      className={className}
      onMouseEnter={() => (hoverRef.current = true)}
      onMouseLeave={() => (hoverRef.current = false)}
    >
      <div
        className={`relative flex items-center justify-center overflow-hidden ${stageClassName}`}
        style={{ perspective: '1200px', clipPath: 'inset(0)' }}
      >
        {items.map((item, i) => {
          let offset = i - active
          if (offset > items.length / 2) offset -= items.length
          if (offset < -items.length / 2) offset += items.length
          const abs = Math.abs(offset)
          const isActive = offset === 0

          return (
            <div
              key={i}
              className="absolute w-full transition-all duration-700 ease-out"
              style={{
                transform: `translateX(${offset * 108}%) translateZ(${isActive ? 0 : -200}px) rotateY(${offset * -16}deg) scale(${isActive ? 1 : 0.82})`,
                opacity: isActive ? 1 : 0,
                zIndex: 10 - abs,
                pointerEvents: isActive ? 'auto' : 'none',
              }}
              aria-hidden={!isActive}
            >
              {renderItem(item, isActive)}
            </div>
          )
        })}
      </div>

      {items.length > 1 && (
        <div className="relative z-10 mt-8 flex items-center justify-center gap-4">
          <button
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            data-cursor=""
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-orange hover:text-orange"
          >
            <ChevronLeft size={16} strokeWidth={1.5} />
          </button>
          <div className="flex gap-2">
            {items.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                aria-label={`Go to slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${i === active ? "w-6 bg-orange" : "w-1.5 bg-line"}`}
              />
            ))}
          </div>
          <button
            onClick={() => go(1)}
            aria-label="Next testimonial"
            data-cursor=""
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-orange hover:text-orange"
          >
            <ChevronRight size={16} strokeWidth={1.5} />
          </button>
        </div>
      )}
    </div>
  )
}
