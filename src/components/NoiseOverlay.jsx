import { cn } from '@/utils/cn'

export default function NoiseOverlay({ className, opacity = 0.08 }) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 z-[60] mix-blend-overlay',
        className
      )}
      style={{ opacity }}
    >
      <div className="absolute inset-[-25%] bg-grain animate-grain" />
    </div>
  )
}
