import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { ScrollTrigger } from '../lib/gsap'

import Hero from '../components/sections/Hero'
import WayWeThink from '../components/sections/WayWeThink'
import Services from '../components/sections/Services'
import Process from '../components/sections/Process'
import SelectedWork from '../components/sections/SelectedWork'
import Pricing from '../components/sections/Pricing'
import Testimonial from '../components/sections/Testimonial'
import CTA from '../components/sections/CTA'

export default function HomePage({ ready }) {
  const { hash } = useLocation()

  // Arriving from another route with a hash (e.g. the nav's "Work" link while
  // on /contact) — scroll to that section once the page has laid out.
  useEffect(() => {
    if (!hash) return
    const id = hash.slice(1)
    const raf = requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView()
      ScrollTrigger.refresh()
    })
    return () => cancelAnimationFrame(raf)
  }, [hash])

  return (
    <>
      <Hero ready={ready} />
      <WayWeThink />
      <Services />
      <Process />
      <SelectedWork />
      <Pricing />
      <Testimonial />
      <CTA />
    </>
  )
}
