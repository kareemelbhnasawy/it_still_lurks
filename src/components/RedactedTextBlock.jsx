import { useMemo, useState } from 'react'
import { cn } from '@/utils/cn'

// Splits text into words and randomly marks some as "redacted" bars.
// Unredacts on hover for that "the archive shouldn't have shown you that" feel.
export default function RedactedTextBlock({ text, intensity = 0.4, className }) {
  const [revealed, setRevealed] = useState(false)
  const words = useMemo(() => text.split(/\s+/), [text])
  const mask = useMemo(
    () => words.map((w) => (w.length > 3 && Math.random() < intensity ? true : false)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [text, intensity]
  )

  return (
    <p
      className={cn('leading-relaxed text-pretty inline', className)}
      onMouseEnter={() => setRevealed(true)}
      onFocus={() => setRevealed(true)}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`}>
          {mask[i] && !revealed ? (
            <span
              aria-hidden
              className="inline-block align-middle bg-ash-900/90 text-transparent select-none px-[2px] mx-[1px]"
              style={{ width: `${Math.max(w.length * 0.55, 1.2)}ch`, height: '0.9em' }}
            >
              {w}
            </span>
          ) : (
            <span>{w}</span>
          )}
          {i < words.length - 1 ? ' ' : ''}
        </span>
      ))}
    </p>
  )
}
