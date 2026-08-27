import useSplitTextReveal from '../../hooks/useSplitTextReveal'

/** Words unblur + settle into place as they enter view — reactbits' Blur Text. */
export default function BlurText({ text, as: Tag = 'div', className = '', start = 'top 85%', stagger = 0.06, delay = 0, duration = 0.9 }) {
  const ref = useSplitTextReveal(text, { by: 'words', trigger: 'scroll', start, stagger, delay, duration, blur: true })
  return (
    <Tag ref={ref} className={className}>
      {text}
    </Tag>
  )
}
