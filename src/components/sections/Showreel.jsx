import { useEffect, useState } from 'react'
import { Play, X } from 'lucide-react'
import CircularText from '../ui/CircularText'
import Orb from '../ui/Orb'

export default function Showreel() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <section className="relative flex min-h-svh items-center justify-center overflow-hidden border-t border-line bg-bg-soft">
      <Orb className="absolute inset-0" />

      <button
        type="button"
        onClick={() => setOpen(true)}
        data-cursor=""
        aria-label="Play the LaunchCraft showreel"
        className="group relative flex h-[46vw] w-[46vw] max-w-[280px] max-h-[280px] min-h-[180px] min-w-[180px] items-center justify-center rounded-full border border-line transition-colors duration-500 hover:border-lime"
      >
        <CircularText text="PLAY THE SHOWREEL • PLAY THE SHOWREEL • " radius={110} className="absolute inset-0 m-auto text-muted transition-colors duration-500 group-hover:text-lime" />
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-lime text-bg transition-transform duration-500 ease-out group-hover:scale-110">
          <Play size={22} fill="currentColor" strokeWidth={0} className="ml-0.5" />
        </span>
      </button>

      {open && (
        <div className="fixed inset-0 z-[1500] flex items-center justify-center bg-bg/90 px-5 backdrop-blur-sm" role="dialog" aria-modal="true" aria-label="Showreel">
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close showreel"
            className="absolute right-6 top-6 flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink hover:border-lime hover:text-lime"
          >
            <X size={18} strokeWidth={1.5} />
          </button>
          <div className="flex aspect-video w-full max-w-4xl flex-col items-center justify-center gap-4 rounded-lg border border-line bg-bg-elevated">
            <Play size={40} strokeWidth={1} className="text-lime" />
            <p className="font-mono text-xs uppercase tracking-[0.16em] text-muted">Showreel — coming soon</p>
          </div>
        </div>
      )}
    </section>
  )
}
