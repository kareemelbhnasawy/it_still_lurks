import { useState } from 'react'
import { useInfection } from '@/context/InfectionContext'
import WhisperHint from './WhisperHint'
import { cn } from '@/utils/cn'

export default function FalseHopeButton() {
  const { bump } = useInfection()
  const [broken, setBroken] = useState(false)

  const onClick = (e) => {
    e.preventDefault()
    if (broken) return
    setBroken(true)
    bump(3)
  }

  return (
    <div className="relative">
      <WhisperHint lockMessage="we begged the last one not to" position="top" block>
      <button
        type="button"
        onClick={onClick}
        aria-pressed={broken}
        data-broken={broken ? 'true' : 'false'}
        className={cn(
          'false-hope group relative block w-full text-center px-8 py-12 md:py-16',
          'border bg-white/[0.02] transition-colors duration-300 overflow-hidden',
          broken
            ? 'border-rust cursor-not-allowed'
            : 'border-white/[0.12] hover:border-rust/60 hover:bg-rust-deep/15'
        )}
      >
        <div className="absolute inset-0 bg-scanlines opacity-40 pointer-events-none" />
        <div
          aria-hidden
          className="absolute inset-0 opacity-60 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(160,29,29,0.12) 0%, transparent 55%)',
          }}
        />

        <div className="relative">
          <span
            className={cn(
              'inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest-2',
              broken ? 'text-rust-bright' : 'text-rust-bright/80'
            )}
          >
            <span className="size-1.5 bg-rust-bright animate-pulse-soft" />
            ◼ containment override · final step
          </span>

          <span
            className={cn(
              'mt-5 block font-display text-[clamp(2.2rem,6vw,5rem)] leading-[0.92] tracking-[-0.025em] text-balance',
              broken ? 'text-rust-bright' : 'text-bone group-hover:text-rust-bright transition-colors'
            )}
          >
            {broken ? 'access denied. it sees you.' : 'initiate purge sequence'}
          </span>

          <span className="mt-6 block font-mono text-[10px] uppercase tracking-widest-2 text-ash-400">
            {broken
              ? '◼ infection level 3 · the cell has been compromised · do not refresh'
              : 'click to sever the signal · this cannot be undone'}
          </span>
        </div>
      </button>
      </WhisperHint>

      {broken && (
        <div
          aria-live="assertive"
          className="mt-8 border border-rust/50 bg-rust-deep/15 p-6 text-center"
        >
          <span className="mono-label text-rust-bright">◼ system response</span>
          <p className="mt-4 font-display text-2xl md:text-3xl text-bone leading-tight text-balance max-w-2xl mx-auto">
            The archive does not permit operators to sever the signal.
            <br />
            The signal severs operators.
          </p>
        </div>
      )}
    </div>
  )
}
