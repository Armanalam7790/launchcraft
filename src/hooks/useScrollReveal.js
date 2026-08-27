import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/** Generic fromTo scroll reveal for a single element. */
export default function useScrollReveal({
  y = 40,
  opacity = 0,
  duration = 0.9,
  delay = 0,
  ease = 'power3.out',
  start = 'top 88%',
  once = true,
  deps = [],
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    const anim = gsap.fromTo(
      el,
      { y, opacity },
      { y: 0, opacity: 1, duration, delay, ease, scrollTrigger: { trigger: el, start, once } },
    )

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)

  return ref
}
