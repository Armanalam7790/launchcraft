import SplitText from '../ui/SplitText'
import DepthCarousel from '../ui/DepthCarousel'

const TESTIMONIALS = [
  {
    quote:
      'LaunchCraft didn’t just redesign our brand. They gave us a completely different level of confidence in how we show up.',
    name: 'Founder, North Studio',
    img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=400&q=75',
  },
  {
    quote:
      'They treated our launch like it was their own company. Reborn wouldn’t look, or move, the way it does without them.',
    name: 'Co-founder, Reborn',
    img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=400&q=75',
  },
  {
    quote:
      'Vanta’s campaign landed because LaunchCraft understood the story before we’d fully articulated it ourselves.',
    name: 'Marketing Lead, Vanta',
    img: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=75',
  },
]

export default function Testimonial() {
  return (
    <section data-theme="light" className="border-t border-line bg-cream-soft px-5 py-28 sm:px-10">
      <div className="mb-16 sm:mb-20">
        <h2 className="text-ink">
          <span className="block font-display text-[11vw] font-black leading-[0.95] tracking-tight sm:text-[clamp(2.4rem,5vw,4.2rem)]">
            Real words.
          </span>
          <span className="accent-script mt-1 block text-[11vw] leading-[1.15] text-muted sm:text-[clamp(2.4rem,5vw,4.2rem)]">
            Real impact<span className="not-italic text-orange">.</span>
          </span>
        </h2>
        <p className="mt-6 max-w-sm text-sm leading-relaxed text-muted">
          We build partnerships that go beyond projects. Here's what clients have to say about working with us.
        </p>
      </div>

      <DepthCarousel
        items={TESTIMONIALS}
        className="mx-auto max-w-4xl"
        stageClassName="min-h-[680px] sm:min-h-[400px]"
        renderItem={(t, isActive) => (
          <div className="grid grid-cols-1 items-center gap-12 sm:grid-cols-[1fr_auto]">
            <div>
              <span className="mb-6 block font-display text-[14vw] leading-none text-orange sm:text-7xl">“</span>

              {isActive ? (
                <SplitText
                  as="p"
                  text={t.quote}
                  className="max-w-2xl font-display text-[7vw] font-medium leading-[1.15] tracking-tight text-ink sm:text-[clamp(1.6rem,2.8vw,2.6rem)]"
                />
              ) : (
                <p className="max-w-2xl font-display text-[7vw] font-medium leading-[1.15] tracking-tight text-muted sm:text-[clamp(1.6rem,2.8vw,2.6rem)]">
                  {t.quote}
                </p>
              )}

              <p className="mt-8 font-mono text-xs uppercase tracking-[0.16em] text-muted">— {t.name}</p>
            </div>

            <div className="relative h-32 w-32 flex-shrink-0 overflow-hidden rounded-full border-4 border-white shadow-[0_15px_30px_rgba(0,0,0,0.1)] sm:h-40 sm:w-40">
              <img src={t.img} alt={`Portrait of the ${t.name}`} loading="lazy" className="h-full w-full object-cover grayscale contrast-125" />
            </div>
          </div>
        )}
      />
    </section>
  )
}
