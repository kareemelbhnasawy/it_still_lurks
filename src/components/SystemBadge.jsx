import { cn } from '@/utils/cn'

const TONES = {
  default: 'text-ash-300 border-white/[0.08]',
  warn: 'text-rust-bright border-rust/40',
  info: 'text-signal border-signal/40',
  ok: 'text-bone border-white/[0.14]',
  corrupted: 'text-rust-bright border-rust/50 bg-rust-deep/10',
}

export default function SystemBadge({ tone = 'default', children, dot = true, className }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-2 px-2.5 py-1 border bg-white/[0.015]',
        TONES[tone],
        className
      )}
    >
      {dot && (
        <span
          className={cn(
            'h-1 w-1 rounded-full',
            tone === 'warn' || tone === 'corrupted' ? 'bg-rust-bright animate-pulse-soft' : 'bg-current'
          )}
        />
      )}
      {children}
    </span>
  )
}
