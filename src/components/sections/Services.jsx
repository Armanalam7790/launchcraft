import { Link } from 'react-router-dom'
import AnimatedContent from '../ui/AnimatedContent'
import TiltedCard from '../ui/TiltedCard'

const SERVICES = [
  {
    n: '01',
    title: 'Website Design',
    desc: 'Custom interface design built around your brand — not a template with your logo swapped in.',
    img: 'https://images.unsplash.com/photo-1559028006-448665bd7c7f?auto=format&fit=crop&w=1000&q=75',
  },
  {
    n: '02',
    title: 'Web Development',
    desc: 'Fast, responsive, real code. React, WordPress or whatever actually fits the project.',
    img: 'https://images.unsplash.com/photo-1517180102446-f3ece451e9d8?auto=format&fit=crop&w=1000&q=75',
  },
  {
    n: '03',
    title: 'E-Commerce',
    desc: 'Online stores that are easy for you to manage and built to actually convert.',
    img: 'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=1000&q=75',
  },
  {
    n: '04',
    title: 'Website Redesign',
    desc: 'Rebuilding an outdated site without throwing away what already works.',
    img: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?auto=format&fit=crop&w=1000&q=75',
  },
  {
    n: '05',
    title: 'Maintenance & Support',
    desc: 'Ongoing updates, fixes and improvements after your site goes live.',
    img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1000&q=75',
  },
]

export default function Services() {
  return (
    <section id="services" data-theme="light" className="border-t border-line bg-cream px-5 py-28 sm:px-10">
      <AnimatedContent className="relative mb-20 sm:mb-28">
        <span className="block font-mono text-xs uppercase tracking-[0.18em] text-muted">What we do</span>
        <h2 className="mt-2 font-display text-[15vw] font-black leading-[0.85] tracking-tight text-ink sm:text-[clamp(3rem,8vw,7.5rem)]">
          Our
          <br />
          Services
        </h2>
      </AnimatedContent>

      <div className="flex flex-col gap-24 sm:gap-32">
        {SERVICES.map((s, i) => (
          <ServiceRow key={s.n} service={s} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  )
}

function ServiceRow({ service, reverse }) {
  return (
    <Link to="/contact" data-cursor="Let's talk" className="group grid grid-cols-1 items-center gap-10 sm:grid-cols-2 sm:gap-16">
      <div className={reverse ? 'sm:order-2' : ''}>
        <h3 className="inline-block border-b-2 border-orange pb-2 font-display text-3xl font-black tracking-tight text-ink sm:text-4xl">
          {service.title}
        </h3>
        <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">{service.desc}</p>
      </div>

      <div className={`relative ${reverse ? 'sm:order-1' : ''}`}>
        <span aria-hidden="true" className="pointer-events-none absolute -right-3 -top-6 select-none font-mono text-6xl font-black text-ink/10 sm:text-7xl">
          {service.n}
        </span>
        <TiltedCard max={6} scale={1.02} className={`relative z-10 ${reverse ? '-rotate-2' : 'rotate-2'} transition-transform duration-500 group-hover:rotate-0`}>
          <div className="aspect-[4/3] overflow-hidden rounded-2xl border-4 border-white shadow-[0_25px_50px_rgba(0,0,0,0.15)]">
            <img src={service.img} alt="" loading="lazy" className="h-full w-full object-cover" />
          </div>
        </TiltedCard>
      </div>
    </Link>
  )
}
