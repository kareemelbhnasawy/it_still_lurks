import { cn } from '@/utils/cn'
import { usePerformanceMode } from '@/hooks/usePerformanceMode'

export default function NoiseOverlay({ className, opacity = 0.08 }) {
  const { low, medium } = usePerformanceMode()

  if (low) return null

  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none fixed inset-0 z-[60] mix-blend-overlay',
        className
      )}
      style={{ opacity }}
    >
      <div className={cn('absolute inset-[-25%] bg-grain', !medium && 'animate-grain')} />
    </div>
  )
}
