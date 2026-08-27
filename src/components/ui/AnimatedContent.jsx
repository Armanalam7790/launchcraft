import useScrollReveal from '../../hooks/useScrollReveal'

/** Subtle scroll-triggered entrance for a section or block — reactbits' Animated Content. */
export default function AnimatedContent({ children, as: Tag = 'div', className = '', y = 32, delay = 0, duration = 0.9, start = 'top 88%' }) {
  const ref = useScrollReveal({ y, delay, duration, start })
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}
