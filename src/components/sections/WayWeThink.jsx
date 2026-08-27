import AnimatedContent from '../ui/AnimatedContent'

const PRINCIPLES = [
  {
    n: '01',
    title: "Design isn't decoration.",
    desc: "Every visual decision has a job. If it doesn't communicate something useful, it doesn't belong.",
    bg: 'var(--color-card-purple)',
    rotate: '-rotate-6',
  },
  {
    n: '02',
    title: 'The code should feel like the design file.',
    desc: 'The final product must match the intention of the design — in motion, in feel, in detail.',
    bg: 'var(--color-card-blue)',
    rotate: 'rotate-3 sm:translate-y-10',
  },
  {
    n: '03',
    title: 'Speed has a job too.',
    desc: "Fast sites aren't a bonus feature. If it doesn't load fast, it doesn't earn its place.",
    bg: 'var(--color-card-green)',
    rotate: '-rotate-4',
  },
  {
    n: '04',
    title: 'Small details compound.',
    desc: 'Typography, spacing, transitions and loading states — individually subtle, collectively the difference between good and forgettable.',
    bg: 'var(--color-card-yellow)',
    rotate: 'rotate-5 sm:translate-y-6',
  },
]

const TAGS = ['WEB DESIGN', 'DEVELOPMENT', 'UI / UX', 'E-COMMERCE', 'SEO', 'PERFORMANCE', 'WORDPRESS', 'REACT', 'MAINTENANCE', 'BRANDING']

export default function WayWeThink() {
  return (
    <section data-theme="dark" className="border-t border-line-dark bg-black py-28 text-ink-dark">
      <div className="px-5 sm:px-10">
        <AnimatedContent>
          <span className="mb-4 inline-block border-b-2 border-orange pb-1 font-mono text-xs uppercase tracking-[0.18em] text-orange">
            The way we work
          </span>
          <h2 className="max-w-3xl font-display text-[9vw] font-black leading-[1.05] tracking-tight sm:text-[clamp(1.9rem,3.6vw,3rem)]">
            The way we think, <span className="accent-script text-muted-dark">the way we build.</span>
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-dark">
            Four principles that govern every creative decision, interaction and detail we craft at this studio.
          </p>
        </AnimatedContent>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 px-5 sm:mt-24 sm:grid-cols-2 sm:gap-6 sm:px-10 lg:grid-cols-4">
        {PRINCIPLES.map((p, i) => (
          <AnimatedContent key={p.n} delay={i * 0.08} className={`transition-transform duration-500 hover:!rotate-0 ${p.rotate}`}>
            <div className="flex h-64 flex-col justify-between rounded-3xl p-7 shadow-[0_20px_40px_rgba(0,0,0,0.35)]" style={{ background: p.bg, color: '#141115' }}>
              <span className="font-mono text-xs opacity-60">{p.n}</span>
              <div>
                <h3 className="font-display text-xl font-black leading-tight">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-75">{p.desc}</p>
              </div>
            </div>
          </AnimatedContent>
        ))}
      </div>

      <div className="mt-20 overflow-hidden border-y border-line-dark py-6">
        <div className="marquee-track" style={{ '--speed': '26s' }}>
          {[0, 1].map((rep) => (
            <div className="flex flex-shrink-0 items-center" key={rep} aria-hidden={rep === 1}>
              {TAGS.map((t) => (
                <span key={t} className="mx-6 flex items-center gap-6 font-mono text-sm uppercase tracking-[0.12em] text-muted-dark">
                  {t}
                  <span className="text-orange">—</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
