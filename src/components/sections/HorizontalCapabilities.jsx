import useHorizontalScroll from '../../hooks/useHorizontalScroll'

export default function HorizontalCapabilities() {
  const { wrapRef, trackRef } = useHorizontalScroll()

  return (
    <section className="border-t border-line">
      <div ref={wrapRef} className="relative sm:h-svh sm:overflow-hidden">
        <div ref={trackRef} className="flex flex-col sm:h-full sm:w-max sm:flex-row">
          {/* DISCOVERY — huge typography */}
          <Panel className="bg-bg">
            <span aria-hidden="true" className="pointer-events-none absolute inset-0 flex select-none items-start justify-center overflow-hidden pt-16 font-display text-[20vw] font-semibold leading-none text-line-soft sm:pt-20">
              DISCOVERY
            </span>
            <PanelBody n="01" title="Discovery" desc="Understanding your business, users and goals before a single pixel gets placed." />
          </Panel>

          {/* WIREFRAME — distorted visual */}
          <Panel className="bg-bg-soft">
            <div
              className="absolute right-[8vw] top-1/2 h-[46vh] w-[26vw] min-w-[220px] -translate-y-1/2 border border-line bg-bg-elevated"
              style={{ clipPath: 'polygon(12% 0, 100% 0, 88% 100%, 0 100%)' }}
            />
            <PanelBody n="02" title="Wireframe & UX" desc="Mapping structure and flow so the site works before it looks good." />
          </Panel>

          {/* DESIGN — animated lines */}
          <Panel className="bg-bg">
            <div className="absolute inset-x-[8vw] top-1/2 flex -translate-y-1/2 items-end gap-[6px]" aria-hidden="true">
              {Array.from({ length: 28 }).map((_, i) => (
                <span
                  key={i}
                  className="w-[3px] rounded-full bg-ink/25"
                  style={{ height: `${20 + Math.abs(Math.sin(i * 0.6)) * 90}px`, animation: `pulseBar 1.4s ease-in-out ${i * 0.05}s infinite alternate` }}
                />
              ))}
            </div>
            <PanelBody n="03" title="Visual Design" desc="Typography, color and layout crafted to match your brand, not a template." />
          </Panel>

          {/* DEVELOPMENT — oversized numeral */}
          <Panel className="bg-bg-soft">
            <span aria-hidden="true" className="pointer-events-none absolute -right-[4vw] bottom-[-8vh] select-none font-display text-[42vw] font-semibold leading-none text-line-soft">
              04
            </span>
            <PanelBody n="04" title="Development" desc="Built clean, fast and responsive with real code — not a page builder." />
          </Panel>

          {/* LAUNCH — moving shapes */}
          <Panel className="bg-bg">
            <div className="absolute right-[10vw] top-1/2 h-[50vh] w-[30vw] min-w-[240px] -translate-y-1/2" aria-hidden="true">
              <span className="absolute right-10 top-6 h-16 w-16 rounded-full bg-lime/70" style={{ animation: 'float1 5s ease-in-out infinite' }} />
              <span
                className="absolute left-6 top-1/2 h-0 w-0 border-b-[70px] border-l-[40px] border-r-[40px] border-b-ink/25 border-l-transparent border-r-transparent"
                style={{ animation: 'float2 6s ease-in-out infinite' }}
              />
              <span className="absolute bottom-4 right-16 h-20 w-20 rotate-45 border border-ink/40" style={{ animation: 'float1 7s ease-in-out infinite' }} />
            </div>
            <PanelBody n="05" title="Launch & Support" desc="Going live, then sticking around for fixes and updates after." />
          </Panel>
        </div>
      </div>

      <style>{`
        @keyframes pulseBar { from { transform: scaleY(0.55); } to { transform: scaleY(1); } }
        @keyframes float1 { 0%,100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-18px) rotate(20deg); } }
        @keyframes float2 { 0%,100% { transform: translateY(0); } 50% { transform: translateY(16px); } }
      `}</style>
    </section>
  )
}

function Panel({ children, className = '' }) {
  return (
    <div
      className={`relative flex min-h-[70vh] w-full flex-shrink-0 items-end overflow-hidden border-b border-line px-5 py-16 sm:min-h-0 sm:h-full sm:w-[75vw] sm:border-b-0 sm:border-r sm:px-10 ${className}`}
    >
      {children}
    </div>
  )
}

function PanelBody({ n, title, desc }) {
  return (
    <div className="relative z-10">
      <span className="font-mono text-sm text-lime">{n}</span>
      <h3 className="mt-3 font-display text-[13vw] font-semibold leading-[0.9] tracking-tight sm:text-[clamp(3rem,7vw,7rem)]">{title}</h3>
      <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">{desc}</p>
    </div>
  )
}
