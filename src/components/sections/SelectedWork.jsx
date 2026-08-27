import { useEffect, useRef, useState } from 'react'
import { ArrowLeft, ArrowRight, Hand } from 'lucide-react'
import tailempireImg from '../../assets/work/tailempire.png'
import irodesignImg from '../../assets/work/irodesign.png'
import airseacargoImg from '../../assets/work/airseacargo.jpg'

const PROJECTS = [
  {
    n: '01',
    title: 'TailEmpire',
    desc: 'A verified pet marketplace connecting owners and breeders — built with filterable listings, trust badges and a warm, approachable interface.',
    img: tailempireImg,
    url: 'https://tailempire.in/',
  },
  {
    n: '02',
    title: 'IRO Design Academy',
    desc: 'A pre-launch landing experience for a design education platform, built to collect interest and build community ahead of launch.',
    img: irodesignImg,
    url: 'https://irodesignacademy.com/',
  },
  {
    n: '03',
    title: 'Air Sea Cargo Express',
    desc: 'A global logistics and freight-forwarding site built to showcase scale and reliability, with live stats, service breakdowns and a bold cargo-industry look.',
    img: airseacargoImg,
    url: 'https://airseacargoexpress.ae/',
  },
]

export default function SelectedWork() {
  const [active, setActive] = useState(0)
  const trackRef = useRef(null)
  const dragState = useRef(null)

  const go = (dir) => setActive((a) => (a + dir + PROJECTS.length) % PROJECTS.length)

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const onPointerDown = (e) => {
    dragState.current = { startX: e.clientX }
  }
  const onPointerUp = (e) => {
    if (!dragState.current) return
    const delta = e.clientX - dragState.current.startX
    dragState.current = null
    if (Math.abs(delta) < 50) return
    go(delta < 0 ? 1 : -1)
  }

  const project = PROJECTS[active]

  return (
    <section id="work" data-theme="light" className="border-t border-line bg-cream px-5 py-28 sm:px-10">
      <div
        ref={trackRef}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        className="grid cursor-grab grid-cols-1 items-center gap-10 active:cursor-grabbing sm:grid-cols-[1.1fr_1fr] sm:gap-16"
      >
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          data-cursor="Visit site ↗"
          className="group block select-none overflow-hidden rounded-2xl border-4 border-white shadow-[0_25px_60px_rgba(0,0,0,0.12)]"
          draggable={false}
        >
          <img
            key={project.img}
            src={project.img}
            alt={`${project.title} — ${project.desc}`}
            loading="lazy"
            draggable={false}
            className="aspect-[4/3] w-full origin-center animate-[fadeIn_0.5s_ease] object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.05]"
          />
        </a>

        <div key={project.n} className="animate-[fadeIn_0.5s_ease]">
          <span className="font-mono text-xs text-muted">{project.n} / {String(PROJECTS.length).padStart(2, '0')}</span>
          <h3 className="mt-3 font-display text-4xl font-black tracking-tight text-ink sm:text-5xl">{project.title}</h3>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-muted">{project.desc}</p>
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.1em] text-ink underline decoration-orange decoration-2 underline-offset-4"
          >
            See more →
          </a>
        </div>
      </div>

      <div className="mt-14 flex flex-wrap items-center justify-between gap-6">
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <Hand size={14} strokeWidth={1.5} />
          Drag the image or use your keyboard arrows
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => go(-1)}
            aria-label="Previous project"
            data-cursor=""
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-orange hover:text-orange"
          >
            <ArrowLeft size={16} strokeWidth={1.75} />
          </button>
          <button
            onClick={() => go(1)}
            aria-label="Next project"
            data-cursor=""
            className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink transition-colors hover:border-orange hover:text-orange"
          >
            <ArrowRight size={16} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn { from { opacity: 0.3; } to { opacity: 1; } }
      `}</style>
    </section>
  )
}
