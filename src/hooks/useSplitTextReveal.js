import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'

/**
 * Splits `text` into word or char spans inside the returned ref and reveals
 * them with a stagger, either on mount or on scroll-into-view.
 */
export default function useSplitTextReveal(
  text,
  { by = 'words', trigger = 'scroll', start = 'top 85%', stagger = 0.045, delay = 0, duration = 1, blur = false, once = true } = {},
) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const pieces = by === 'chars' ? Array.from(text) : text.split(' ')
    el.innerHTML = pieces
      .map((p) => {
        const content = by === 'chars' ? (p === ' ' ? '&nbsp;' : p) : `${p}&nbsp;`
        return `<span class="split-line"><span class="${by === 'chars' ? 'split-char' : 'split-word'}">${content}</span></span>`
      })
      .join('')

    const inner = el.querySelectorAll(by === 'chars' ? '.split-char' : '.split-word')

    if (reduce) {
      gsap.set(inner, { opacity: 1, y: 0, filter: 'blur(0px)' })
      return
    }

    gsap.set(inner, blur ? { opacity: 0, filter: 'blur(14px)', y: 10 } : { yPercent: 120, rotate: 6 })

    const anim = gsap.to(inner, {
      yPercent: 0,
      rotate: 0,
      opacity: 1,
      filter: 'blur(0px)',
      duration,
      delay,
      stagger,
      ease: 'power4.out',
      scrollTrigger: trigger === 'scroll' ? { trigger: el, start, once } : undefined,
    })

    return () => {
      anim.scrollTrigger?.kill()
      anim.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, by, trigger, blur])

  return ref
}
