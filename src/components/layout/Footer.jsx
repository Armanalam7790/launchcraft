import { Mail, MapPin } from 'lucide-react'
import AnimatedContent from '../ui/AnimatedContent'

const COLUMNS = [
  {
    label: 'Explore',
    links: [
      { label: 'Work', href: '#work' },
      { label: 'Services', href: '#services' },
      { label: 'Process', href: '#process' },
      { label: 'Pricing', href: '#pricing' },
    ],
  },
  {
    label: 'Services',
    links: [
      { label: 'Website Design', href: '#services' },
      { label: 'Web Development', href: '#services' },
      { label: 'E-Commerce', href: '#services' },
      { label: 'Maintenance & Support', href: '#services' },
    ],
  },
]

const SOCIALS = [
  { label: 'Instagram', short: 'IG', href: 'https://instagram.com' },
  { label: 'LinkedIn', short: 'IN', href: 'https://linkedin.com' },
]

export default function Footer() {
  return (
    <footer data-theme="dark" className="bg-black px-5 pb-8 pt-16 text-ink-dark sm:px-10 sm:pt-20">
      <div className="grid grid-cols-1 gap-12 border-b border-line-dark pb-12 sm:grid-cols-[1.3fr_1fr_1fr_1fr]">
        <div>
          <span className="font-display text-2xl font-black">
            LAUNCHCRAFT<span className="align-super text-xs">®</span>
          </span>
          <span className="mt-1 block font-mono text-[10px] uppercase tracking-[0.2em] text-muted-dark">Digital Studio</span>
          <p className="mt-5 max-w-xs text-sm leading-relaxed text-muted-dark">
            We design and build websites that blend strategy, craft and code to create real impact.
          </p>
          <span className="mt-5 block h-0.5 w-10 bg-orange" />
        </div>

        {COLUMNS.map((col) => (
          <div key={col.label}>
            <span className="mb-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-orange">
              <span>/</span>
              {col.label}
            </span>
            <ul className="flex flex-col gap-3">
              {col.links.map((l) => (
                <li key={l.label}>
                  <a href={l.href} className="text-sm text-muted-dark transition-colors hover:text-ink-dark">
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <span className="mb-4 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-orange">
            <span>/</span>
            Contact
          </span>
          <ul className="flex flex-col gap-3 text-sm text-muted-dark">
            <li className="flex items-center gap-2">
              <Mail size={14} className="text-orange" />
              <a href="mailto:launchcraft53@gmail.com" className="hover:text-ink-dark">launchcraft53@gmail.com</a>
            </li>
            <li className="flex items-center gap-2">
              <MapPin size={14} className="text-orange" />
              Delhi, India
            </li>
          </ul>
        </div>
      </div>

      <AnimatedContent className="flex flex-col items-start justify-between gap-6 py-8 sm:flex-row sm:items-center">
        <div>
          <span className="mb-3 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.18em] text-orange">
            <span>/</span>
            Follow us
          </span>
          <div className="flex gap-3">
            {SOCIALS.map(({ label, short, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-line-dark font-mono text-[11px] font-bold text-ink-dark transition-colors hover:border-orange hover:text-orange"
              >
                {short}
              </a>
            ))}
          </div>
        </div>
      </AnimatedContent>

      <div className="flex flex-col gap-2 border-t border-line-dark pt-6 text-xs text-muted-dark sm:flex-row sm:items-center sm:justify-between">
        <span>© {new Date().getFullYear()} LaunchCraft Studio. All rights reserved.</span>
        <span>Built to move.</span>
      </div>
    </footer>
  )
}
