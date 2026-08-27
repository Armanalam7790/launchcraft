import useSplitTextReveal from '../../hooks/useSplitTextReveal'

/** Word-level mask reveal, in the spirit of reactbits' Split Text. */
export default function SplitText({ text, as: Tag = 'div', className = '', start = 'top 85%', stagger = 0.045, delay = 0, duration = 1 }) {
  const ref = useSplitTextReveal(text, { by: 'words', trigger: 'scroll', start, stagger, delay, duration })
  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
