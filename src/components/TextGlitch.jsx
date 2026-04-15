import { Children } from 'react'
import { useInfection } from '@/context/InfectionContext'
import { cn } from '@/utils/cn'

// Wrap text that should become hostile at infection level 2+.
// Uses CSS pseudo-elements with data-text for cheap chromatic aberration.
// Requires string children so we can mirror the text into data-text.
export default function TextGlitch({
  children,
  as: Tag = 'span',
  className,
  forceHostile = false,
}) {
  const { level } = useInfection()
  const hostile = forceHostile || level >= 2

  const text = Children.toArray(children)
    .map((c) => (typeof c === 'string' ? c : ''))
    .join('')

  return (
    <Tag
      data-text={text}
      data-hostile={hostile ? 'true' : 'false'}
      className={cn('glitch-text', className)}
    >
      {children}
    </Tag>
  )
}
