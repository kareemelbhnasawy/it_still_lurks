import { useInfection } from '@/context/InfectionContext'
import { cn } from '@/utils/cn'

// 2px tactical scan bar pinned to the bottom of the viewport.
// A single horizontal indicator sweeps left-to-right; at higher infection levels
// the bar doubles up, desynchronizes, and flashes rust-bright. Matches the Stitch brief.
export default function TacticalScanBar() {
  const { level } = useInfection()

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-0 right-0 bottom-0 z-[66] h-[2px] overflow-hidden"
      style={{ bottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="absolute inset-0 bg-rust-bright/15" />
      <div
        className={cn(
          'absolute inset-y-0 w-1/3 bg-rust-bright animate-[tacticalScan_4s_linear_infinite]',
          level >= 2 && 'animate-[tacticalScan_2.4s_linear_infinite]'
        )}
      />
      {level >= 2 && (
        <div className="absolute inset-y-0 w-1/5 bg-bone/70 animate-[tacticalScan_3.1s_linear_infinite] mix-blend-screen" />
      )}
    </div>
  )
}
