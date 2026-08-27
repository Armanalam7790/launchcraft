import { useEffect, useRef, useState } from 'react'

const CHARS = '!<>-_\\/[]{}—=+*^?#01LCXV$%&'

/** Scrambles into its final text — reactbits' Decrypted Text, for small experimental labels. */
export default function DecryptedText({ text, as: Tag = 'span', className = '', trigger = 'view', speed = 32 }) {
  const [display, setDisplay] = useState(trigger === 'hover' ? text : text.replace(/\S/g, ' '))
  const ref = useRef(null)
  const doneRef = useRef(false)

  const run = () => {
    if (doneRef.current) return
    doneRef.current = true
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text)
      return
    }

    let frame = 0
    const totalFrames = Math.round(text.length * 1.6)
    const interval = setInterval(() => {
      frame++
      const revealCount = Math.floor((frame / totalFrames) * text.length)
      setDisplay(
        text
          .split('')
          .map((ch, i) => {
            if (ch === ' ') return ' '
            if (i < revealCount) return ch
            return CHARS[Math.floor(Math.random() * CHARS.length)]
          })
          .join(''),
      )
      if (frame >= totalFrames) {
        clearInterval(interval)
        setDisplay(text)
      }
    }, speed)
  }

  useEffect(() => {
    if (trigger === 'mount') {
      // Defer to the next frame so the state update in `run` doesn't fire
      // synchronously inside this effect.
      const id = requestAnimationFrame(run)
      return () => cancelAnimationFrame(id)
    }
    if (trigger !== 'view') return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) run()
      },
      { threshold: 0.4 },
    )
    io.observe(el)
    return () => io.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [trigger])

  const handlers =
    trigger === 'hover'
      ? {
          onMouseEnter: () => {
            doneRef.current = false
            run()
          },
        }
      : {}

  return (
    <Tag ref={ref} className={className} {...handlers}>
      {display}
    </Tag>
  )
}
