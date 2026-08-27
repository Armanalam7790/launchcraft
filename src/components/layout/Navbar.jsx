import { useEffect, useRef, useState } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { Menu, X, Sparkles } from 'lucide-react'
import { gsap } from '../../lib/gsap'
import useSectionTheme from '../../hooks/useSectionTheme'
import Magnet from '../ui/Magnet'
import PillNav from '../ui/PillNav'

const SECTION_LINKS = [
  { n: '01', label: 'WORK', hash: '#work' },
  { n: '02', label: 'SERVICES', hash: '#services' },
  { n: '03', label: 'PROCESS', hash: '#process' },
  { n: '04', label: 'PRICING', hash: '#pricing' },
]

export default function Navbar() {
  const { pathname } = useLocation()
  const onHome = pathname === '/'
  const theme = useSectionTheme()
  const dark = onHome && theme === 'dark'

  const links = [
    ...SECTION_LINKS.map((l) => ({ label: l.label, href: onHome ? l.hash : `/${l.hash}`, n: l.n })),
    { n: '05', label: 'CONTACT', href: '/contact' },
  ]

  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(null)
  const menuRef = useRef(null)
  const bgRef = useRef(null)

  useEffect(() => {
    const el = menuRef.current
    if (!el) return
    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.set(el, { display: 'flex' })
      gsap.fromTo(el, { clipPath: 'inset(0% 0% 100% 0%)' }, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.65, ease: 'power4.inOut' })
      gsap.fromTo('.menu-item', { yPercent: 130 }, { yPercent: 0, duration: 0.75, stagger: 0.07, ease: 'power4.out', delay: 0.2 })
    } else {
      document.body.style.overflow = ''
      gsap.to(el, {
        clipPath: 'inset(0% 0% 100% 0%)',
        duration: 0.5,
        ease: 'power3.inOut',
        onComplete: () => gsap.set(el, { display: 'none' }),
      })
    }
  }, [open])

  useEffect(() => {
    if (!bgRef.current) return
    gsap.to(bgRef.current, { opacity: hovered ? 1 : 0, duration: 0.5, ease: 'power2.out' })
  }, [hovered])

  return (
    <>
      <header
        className="fixed inset-x-0 top-0 z-[500] backdrop-blur-md transition-colors duration-300"
        style={{ background: dark ? 'rgba(11,11,12,0.65)' : 'rgba(245,244,240,0.65)' }}
      >
      <div className="mx-auto flex h-20 max-w-[1440px] items-center justify-between px-5 sm:px-10">
        {onHome ? (
          <a href="#top" className="leading-none transition-colors duration-300" style={{ color: dark ? '#f5f4f0' : '#12110f' }}>
            <span className="font-display text-lg font-black tracking-tight">
              LAUNCHCRAFT<span className="align-super text-xs">®</span>
            </span>
            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.2em] opacity-70">Digital Studio</span>
          </a>
        ) : (
          <Link to="/" className="leading-none text-ink">
            <span className="font-display text-lg font-black tracking-tight">
              LAUNCHCRAFT<span className="align-super text-xs">®</span>
            </span>
            <span className="mt-0.5 block font-mono text-[9px] uppercase tracking-[0.2em] opacity-70">Digital Studio</span>
          </Link>
        )}

        <PillNav items={links} theme={dark ? 'dark' : 'light'} className="hidden md:flex" />

        <div className="flex items-center gap-3">
          <Magnet padding={10}>
            <Link
              to="/contact"
              data-cursor="Say hi"
              className="hidden items-center gap-1.5 rounded-full border border-black/10 bg-cream px-4 py-2 text-[13px] font-bold italic text-ink shadow-[0_1px_0_rgba(0,0,0,0.05)] transition-transform active:scale-95 sm:inline-flex"
            >
              <Sparkles size={13} className="text-orange" />
              Let's talk
            </Link>
          </Magnet>

          <Magnet padding={14}>
            <button
              onClick={() => setOpen(true)}
              data-cursor="Menu"
              aria-label="Open menu"
              className="flex h-11 w-11 items-center justify-center rounded-full border transition-colors"
              style={{ borderColor: dark ? 'rgba(245,244,240,0.3)' : 'rgba(18,17,15,0.2)', color: dark ? '#f5f4f0' : '#12110f' }}
            >
              <Menu size={17} strokeWidth={1.5} />
            </button>
          </Magnet>
        </div>
      </div>
      </header>

      <div ref={menuRef} className="fixed inset-0 z-[500] hidden flex-col justify-between overflow-hidden bg-black px-5 py-8 text-ink-dark sm:px-10" style={{ clipPath: 'inset(0% 0% 100% 0%)' }}>
        <div
          ref={bgRef}
          className="pointer-events-none absolute inset-0 opacity-0"
          style={{ background: 'radial-gradient(60% 60% at 15% 50%, rgba(255,90,31,0.12), transparent 70%)' }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <span className="font-display text-lg font-black">
            LAUNCHCRAFT<span className="align-super text-xs">®</span>
          </span>
          <button onClick={() => setOpen(false)} aria-label="Close menu" className="flex h-11 w-11 items-center justify-center rounded-full border border-line-dark text-ink-dark hover:border-orange hover:text-orange">
            <X size={18} strokeWidth={1.5} />
          </button>
        </div>

        <nav className="relative z-10 flex flex-col gap-1">
          {links.map((item) => {
            const isRoute = !item.href.startsWith('#')
            const Tag = isRoute ? Link : 'a'
            const linkProp = isRoute ? { to: item.href } : { href: item.href }
            return (
              <Tag
                key={item.label}
                {...linkProp}
                onClick={() => setOpen(false)}
                onMouseEnter={() => setHovered(item)}
                onMouseLeave={() => setHovered(null)}
                className="menu-item group flex items-baseline gap-5 overflow-hidden border-b border-line-dark py-4"
              >
                <span className="font-mono text-sm text-muted-dark">{item.n}</span>
                <span className="font-display text-[13vw] font-black leading-[0.95] tracking-tight transition-colors duration-300 group-hover:text-orange sm:text-[6vw]">
                  {item.label}
                </span>
              </Tag>
            )
          })}
        </nav>

        <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 font-mono text-xs uppercase tracking-widest text-muted-dark">
          <span>Delhi / Working Everywhere</span>
          <div className="flex gap-6">
            <a href="https://instagram.com" className="hover:text-ink-dark">Instagram</a>
            <a href="https://linkedin.com" className="hover:text-ink-dark">LinkedIn</a>
            <a href="mailto:launchcraft53@gmail.com" className="hover:text-ink-dark">Email</a>
          </div>
        </div>
      </div>
    </>
  )
}
