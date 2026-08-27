import { useEffect, useRef } from 'react'
import { gsap, ScrollTrigger } from '../../lib/gsap'
import SplitText from '../ui/SplitText'
import AnimatedContent from '../ui/AnimatedContent'

export default function About() {
  const sectionRef = useRef(null)
  const imgARef = useRef(null)
  const imgBRef = useRef(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top bottom',
      end: 'bottom top',
      scrub: 1,
      onUpdate: (self) => {
        gsap.set(imgARef.current, { y: (self.progress - 0.5) * -70 })
        gsap.set(imgBRef.current, { y: (self.progress - 0.5) * 100 })
      },
    })
    return () => st.kill()
  }, [])

  return (
    <section id="about" ref={sectionRef} className="border-t border-line px-5 py-28 sm:px-10">
      <div className="grid grid-cols-1 gap-16 sm:grid-cols-2 sm:gap-8">
        <div>
          <span className="mb-8 block font-mono text-xs uppercase tracking-[0.18em] text-muted">Who we are</span>
          <SplitText
            as="h2"
            text="Small team. Big energy. Zero boring."
            className="font-display text-[11vw] font-semibold leading-[0.95] tracking-tight sm:text-[clamp(2.6rem,5.6vw,5.4rem)]"
          />

          <AnimatedContent delay={0.1} className="mt-10 flex flex-col gap-5 text-sm leading-relaxed text-muted sm:max-w-md">
            <p>
              LaunchCraft Studio is an independent creative studio for brands that want to move faster, look sharper and
              make more noise.
            </p>
            <p>
              We work across strategy, identity, content and digital — bringing the big-picture thinking and hands-on
              execution under one roof.
            </p>
          </AnimatedContent>
        </div>

        <div className="relative h-[70vh] min-h-[420px] sm:h-auto">
          <div ref={imgARef} className="absolute left-0 top-6 w-[62%] overflow-hidden rounded-sm">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=900&q=75"
              alt="LaunchCraft Studio team working together"
              loading="lazy"
              className="aspect-[3/4] w-full object-cover"
            />
          </div>
          <div ref={imgBRef} className="absolute bottom-0 right-0 w-[54%] overflow-hidden rounded-sm border-4 border-bg sm:border-8">
            <img
              src="https://images.unsplash.com/photo-1531973576160-7125cd663d86?auto=format&fit=crop&w=800&q=75"
              alt="Studio desk and workspace detail"
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
          </div>
          <span className="absolute -left-2 bottom-8 -rotate-90 font-mono text-[10px] uppercase tracking-[0.2em] text-muted sm:bottom-16">
            Est. studio
          </span>
        </div>
      </div>
    </section>
  )
}
