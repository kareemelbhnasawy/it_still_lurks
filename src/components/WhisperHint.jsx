import { useMemo, useState } from 'react'
import { cn } from '@/utils/cn'
import { useInfection } from '@/context/InfectionContext'

// Creepy whisper labels that appear beneath (or above) a wrapped element on hover.
// Tone = 'warn'   -> pick from DO-NOT-PRESS pool
// Tone = 'neutral' -> pick from "authorized" pool (mostly benign, occasionally wrong)
// Tone = 'mixed'   -> randomly pick from either, with a weighted bias towards creepy
//
// At infection level 2+ the whispers bias harder toward creepy and stay visible longer.
// At level 3 they become visible even without hover.
const DO_NOT_POOL = [
  "don't press this",
  'it is watching',
  'come closer',
  "don't",
  'stop looking',
  "you've been noticed",
  'they can see you now',
  'go back',
  'the archive remembers',
  'do not answer',
  'it knows your name',
  'it knows you clicked',
  'you should not be here',
  'please look away',
  "it's still here",
  'you are being recorded',
  "we didn't make this button",
  'this is the wrong one',
  "it's reaching for you",
]

const OK_POOL = [
  'authorized',
  'operator · cleared',
  'proceed · cell 07',
  'witnessed',
  'cross-referenced',
  '◼ verified',
  'signal stable',
]

function pickMessage(tone) {
  const r = Math.random()
  if (tone === 'warn') return DO_NOT_POOL[Math.floor(Math.random() * DO_NOT_POOL.length)]
  if (tone === 'neutral') {
    // Rarely, the "authorized" whisper is replaced with something wrong.
    return r < 0.15
      ? DO_NOT_POOL[Math.floor(Math.random() * DO_NOT_POOL.length)]
      : OK_POOL[Math.floor(Math.random() * OK_POOL.length)]
  }
  // mixed
  return r < 0.72
    ? DO_NOT_POOL[Math.floor(Math.random() * DO_NOT_POOL.length)]
    : OK_POOL[Math.floor(Math.random() * OK_POOL.length)]
}

export default function WhisperHint({
  children,
  tone = 'mixed',
  position = 'bottom',
  className,
  lockMessage,
  block = false,
}) {
  const { level } = useInfection()

  // Freeze the message on mount so it doesn't re-roll every hover.
  // Pass `lockMessage` to hard-code a specific phrase (e.g. "do not press").
  const message = useMemo(
    () => lockMessage ?? pickMessage(level >= 2 ? 'warn' : tone),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [tone, lockMessage, level >= 2]
  )

  const [hovered, setHovered] = useState(false)

  const alwaysShow = level >= 3
  const visible = alwaysShow || hovered

  return (
    <span
      className={cn(
        'relative group/whisper',
        block ? 'block w-full' : 'inline-block',
        className
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={() => setHovered(false)}
    >
      {children}
      <span
        aria-hidden
        className={cn(
          'absolute left-0 right-0 text-center whitespace-nowrap pointer-events-none',
          'font-mono text-[9px] uppercase tracking-widest-2',
          'transition-all duration-500 ease-out',
          position === 'bottom' ? 'top-full mt-3' : 'bottom-full mb-3',
          visible
            ? 'opacity-100 translate-y-0 text-rust-bright'
            : 'opacity-0 translate-y-[-2px] text-rust-bright/0',
          alwaysShow && 'animate-pulse-soft'
        )}
      >
        ◼ {message}
      </span>
    </span>
  )
}
