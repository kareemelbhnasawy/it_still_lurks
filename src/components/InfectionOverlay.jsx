import { useInfection } from '@/context/InfectionContext'
import { usePerformanceMode } from '@/hooks/usePerformanceMode'

// Fixed atmospheric layer — vignette + scanlines that intensify with infection level.
// All effects are compositor-cheap (opacity + static filter); no JS per-frame.
export default function InfectionOverlay() {
  const { level } = useInfection()
  const { low, medium } = usePerformanceMode()

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[65]">
      {/* progressive vignette */}
      <div
        className="absolute inset-0 infection-vignette transition-opacity duration-[1400ms] ease-out"
        data-level={level}
      />

      {/* scanline layer — base opacity subtle, data-level drives intensity + desync */}
      <div
        className="absolute inset-0 infection-scanlines transition-opacity duration-[1000ms]"
        data-level={level}
      />

      {/* chromatic aberration bar — level 2+ rolls a horizontal tear slowly */}
      {level >= 2 && !medium && !low && (
        <div className="absolute inset-0 infection-tear" />
      )}

      {/* level-3 red wash — full breach */}
      {level >= 3 && !low && (
        <div className="absolute inset-0 infection-breach" />
      )}
    </div>
  )
}
