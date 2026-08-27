import AnimatedContent from '../ui/AnimatedContent'
import ScrollVelocity from '../ui/ScrollVelocity'

const CLIENTS = ['Nordly', 'Fernweh', 'Vanta', 'North Studio', 'Reborn', 'After Hours', 'Kindred', 'Pact']

export default function SocialProof() {
  return (
    <section className="border-t border-line py-24">
      <div className="px-5 sm:px-10">
        <AnimatedContent>
          <h2 className="font-display text-[11vw] font-semibold leading-[0.95] tracking-tight sm:text-[clamp(2.4rem,5.2vw,5rem)]">
            Good work
            <br />
            makes good company.
          </h2>
        </AnimatedContent>
      </div>

      <div className="my-14 border-y border-line py-6">
        <ScrollVelocity
          items={CLIENTS.map((c) => (
            <span key={c} className="mx-8 font-display text-2xl text-muted transition-colors sm:text-3xl">
              {c}
            </span>
          ))}
        />
      </div>

      <AnimatedContent className="px-5 sm:px-10">
        <p className="max-w-md text-sm tracking-wide text-muted">
          We partner with ambitious people building things worth caring about.
        </p>
      </AnimatedContent>
    </section>
  )
}
