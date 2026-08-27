import { Link } from 'react-router-dom'
import { Sparkles } from 'lucide-react'
import Magnet from '../ui/Magnet'
import SplitText from '../ui/SplitText'

export default function CTA() {
  return (
    <section id="contact" data-theme="light" className="relative overflow-hidden bg-cream pb-32 pt-28 text-center">
      <div className="relative z-10 px-5 sm:px-10">
        <span className="mb-6 block font-mono text-xs uppercase tracking-[0.18em] text-muted">Let's create impact</span>

        <SplitText
          as="h2"
          text="Great ideas start with a simple conversation."
          className="mx-auto max-w-3xl font-display text-[10vw] font-black leading-[1.02] tracking-tight text-ink sm:text-[clamp(2.4rem,5.6vw,4.6rem)]"
        />

        <div className="mt-12 flex justify-center">
          <Magnet padding={20}>
            <Link
              to="/contact"
              data-cursor="Say hi"
              className="inline-flex items-center gap-2 rounded-full bg-black px-9 py-5 font-bold italic text-ink-dark transition-transform active:scale-95"
            >
              <Sparkles size={16} className="text-orange" />
              Send a message
            </Link>
          </Magnet>
        </div>

        <p className="mt-6 font-mono text-xs text-muted">We respect your privacy — no spam, ever.</p>
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-black" aria-hidden="true" />
    </section>
  )
}
