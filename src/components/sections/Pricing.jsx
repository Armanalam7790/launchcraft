import { Link } from 'react-router-dom'
import { Check } from 'lucide-react'
import AnimatedContent from '../ui/AnimatedContent'
import SplitText from '../ui/SplitText'

const PLANS = [
  {
    name: 'Starter',
    desc: 'Perfect for startups and small businesses.',
    price: '₹5,999',
    features: ['Up to 5 pages website', 'Responsive design', 'Basic SEO & speed optimization', 'Contact form integration'],
    featured: false,
  },
  {
    name: 'Growth',
    desc: 'Ideal for growing businesses that want more.',
    price: '₹9,999',
    features: [
      'Up to 10 pages website',
      'Custom design',
      'Advanced SEO & speed',
      'CMS (WordPress)',
      'Basic animations',
      'Contact form + WhatsApp',
    ],
    featured: true,
  },
  {
    name: 'Premium',
    desc: 'For established brands that demand the best.',
    price: '₹15,000',
    features: [
      'Unlimited pages',
      'Premium custom design',
      'Advanced SEO & analytics',
      'CMS (WordPress)',
      'Advanced animations',
      'Priority support',
      '3 months support',
    ],
    featured: false,
  },
]

export default function Pricing() {
  return (
    <section id="pricing" data-theme="dark" className="border-t border-line-dark bg-black px-5 py-28 text-ink-dark sm:px-10">
      <div className="mb-16 max-w-xl">
        <span className="mb-6 block font-mono text-xs uppercase tracking-[0.18em] text-muted-dark">Pricing</span>
        <SplitText
          as="h2"
          text="Straightforward pricing, no surprises."
          className="font-display text-[9vw] font-black leading-[1.02] tracking-tight sm:text-[clamp(2rem,4.4vw,3.6rem)]"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {PLANS.map((plan, i) => (
          <AnimatedContent key={plan.name} delay={i * 0.08}>
            <div
              className={`relative flex h-full flex-col rounded-2xl border p-8 ${
                plan.featured ? 'border-orange bg-black-soft' : 'border-line-dark bg-black'
              }`}
            >
              {plan.featured && (
                <span className="absolute -top-3 right-8 rounded-full bg-orange px-3 py-1 text-[11px] font-semibold uppercase tracking-wide text-ink-dark">
                  Most popular
                </span>
              )}

              <h3 className="font-display text-2xl font-black">{plan.name}</h3>
              <p className="mt-2 text-sm text-muted-dark">{plan.desc}</p>

              <p className="mt-8 font-display text-4xl font-black tracking-tight">
                {plan.price}
                <span className="ml-1 text-sm font-normal text-muted-dark">/project</span>
              </p>

              <ul className="mt-8 flex flex-1 flex-col gap-3">
                {plan.features.map((f) => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-ink-dark">
                    <Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-orange" />
                    {f}
                  </li>
                ))}
              </ul>

              <Link
                to="/contact"
                data-cursor="Say hi"
                className={`mt-10 inline-flex items-center justify-center rounded-full px-6 py-3.5 text-sm font-semibold transition-transform active:scale-95 ${
                  plan.featured ? 'bg-orange text-ink-dark' : 'border border-line-dark text-ink-dark hover:border-orange hover:text-orange'
                }`}
              >
                Get started
              </Link>
            </div>
          </AnimatedContent>
        ))}
      </div>
    </section>
  )
}
