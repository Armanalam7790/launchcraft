import { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import SplitText from '../components/ui/SplitText'
import Magnet from '../components/ui/Magnet'

const PROJECT_TYPES = ['Brand & identity', 'Digital experience', 'Launch campaign', 'Not sure yet']

const SOCIALS = [
  { label: 'Instagram', href: 'https://instagram.com' },
  { label: 'LinkedIn', href: 'https://linkedin.com' },
  { label: 'Behance', href: 'https://behance.net' },
]

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

const WEB3FORMS_ACCESS_KEY = 'dc35129a-7a68-49f8-8d5c-dc4c4047e1b8'

export default function ContactPage() {
  const [values, setValues] = useState({ name: '', email: '', projectType: PROJECT_TYPES[0], message: '' })
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const setField = (field) => (e) => setValues((v) => ({ ...v, [field]: e.target.value }))

  const validate = () => {
    const next = {}
    if (!values.name.trim()) next.name = 'Enter your name.'
    if (!EMAIL_RE.test(values.email.trim())) next.email = 'Enter a valid email.'
    if (!values.message.trim()) next.message = 'Tell us a little about the project.'
    else if (values.message.trim().length < 10) next.message = 'A few more details would help — at least 10 characters.'
    setErrors(next)
    return Object.keys(next).length === 0
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    if (!validate()) return

    setStatus('sending')
    try {
      const formData = new FormData()
      formData.append('access_key', WEB3FORMS_ACCESS_KEY)
      formData.append('subject', `New project inquiry — ${values.projectType}`)
      formData.append('name', values.name)
      formData.append('email', values.email)
      formData.append('project_type', values.projectType)
      formData.append('message', values.message)

      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData,
      })
      const data = await res.json()
      if (!data.success) throw new Error(data.message || 'Submission failed')

      setStatus('sent')
      setValues({ name: '', email: '', projectType: PROJECT_TYPES[0], message: '' })
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="relative min-h-svh px-5 pb-28 pt-32 sm:px-10">
      <div className="mb-16 max-w-3xl">
        <span className="mb-6 block font-mono text-xs tracking-[0.16em] text-muted">Let's talk</span>
        <SplitText
          as="h1"
          text="Tell us what you're building."
          trigger="mount"
          className="font-display text-[11vw] font-semibold leading-[0.95] tracking-tight sm:text-[clamp(2.6rem,6vw,5.5rem)]"
        />
        <p className="mt-6 max-w-md text-sm leading-relaxed text-muted">
          Fill in the form and it'll open a message to us, ready to send — or just email directly.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-16 lg:grid-cols-[1.3fr_1fr]">
        <form onSubmit={onSubmit} noValidate className="flex max-w-xl flex-col gap-6">
          <Field label="Name" error={errors.name}>
            <input
              type="text"
              value={values.name}
              onChange={setField('name')}
              aria-invalid={!!errors.name}
              className="w-full border-b border-line bg-transparent py-3 text-ink outline-none transition-colors focus:border-orange"
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <input
              type="email"
              value={values.email}
              onChange={setField('email')}
              aria-invalid={!!errors.email}
              className="w-full border-b border-line bg-transparent py-3 text-ink outline-none transition-colors focus:border-orange"
            />
          </Field>

          <Field label="Project type">
            <select
              value={values.projectType}
              onChange={setField('projectType')}
              className="w-full border-b border-line bg-transparent py-3 text-ink outline-none transition-colors focus:border-orange"
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t} className="bg-cream-soft">
                  {t}
                </option>
              ))}
            </select>
          </Field>

          <Field label="Message" error={errors.message}>
            <textarea
              value={values.message}
              onChange={setField('message')}
              aria-invalid={!!errors.message}
              rows={5}
              className="w-full resize-none border-b border-line bg-transparent py-3 text-ink outline-none transition-colors focus:border-orange"
            />
          </Field>

          <div className="mt-2 flex flex-wrap items-center gap-5">
            <Magnet padding={14}>
              <button
                type="submit"
                disabled={status === 'sending'}
                data-cursor="Send"
                className="inline-flex items-center gap-2 rounded-full bg-black px-8 py-4 text-sm font-semibold text-ink-dark transition-transform active:scale-95 disabled:opacity-60"
              >
                {status === 'sending' ? 'Sending…' : 'Send message'}
              </button>
            </Magnet>
            <span className="text-xs text-muted">Sends straight to our inbox.</span>
          </div>

          {status === 'sent' && (
            <p role="status" className="text-xs text-orange">
              Message sent — we'll get back to you soon.
            </p>
          )}
          {status === 'error' && (
            <p role="status" className="text-xs text-orange">
              Something went wrong — email us directly at{' '}
              <a href="mailto:launchcraft53@gmail.com" className="underline">
                launchcraft53@gmail.com
              </a>
              .
            </p>
          )}
        </form>

        <div className="flex flex-col gap-10 border-t border-line pt-10 lg:border-t-0 lg:border-l lg:pl-12 lg:pt-0">
          <div>
            <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-muted">Direct</span>
            <a href="mailto:launchcraft53@gmail.com" className="text-lg text-ink transition-colors hover:text-orange">
              hello@launchcraft.studio
            </a>
          </div>

          <div>
            <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-muted">Studio</span>
            <p className="text-sm text-muted">Delhi / Working Everywhere</p>
          </div>

          <div>
            <span className="mb-3 block font-mono text-xs uppercase tracking-[0.18em] text-muted">Elsewhere</span>
            <div className="flex flex-col gap-2">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex w-fit items-center gap-1.5 text-sm text-muted transition-colors hover:text-ink"
                >
                  {s.label}
                  <ArrowUpRight size={13} strokeWidth={1.5} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Field({ label, error, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-xs uppercase tracking-[0.14em] text-muted">{label}</span>
      {children}
      {error && <span className="text-xs text-orange">{error}</span>}
    </label>
  )
}
