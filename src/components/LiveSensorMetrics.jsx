import { useEffect, useState } from 'react'
import { motion, useMotionValueEvent, useScroll, useTransform } from 'framer-motion'
import { useInfection } from '@/context/InfectionContext'
import { clamp } from '@/utils/format'
import { cn } from '@/utils/cn'

// Live sensor panel:
//  TEMP_DECAY — drifts slowly downward with small oscillation
//  FREQ_MOD — jitters randomly every ~220ms
//  LURK_PROX — tied to window scroll progress; reaches 99% at the bottom
//
// At infection level 2, TEMP_DECAY crashes faster and FREQ_MOD flares red.
// Passing `onProxBreach` lets the parent escalate infection when LURK_PROX crosses a threshold.
export default function LiveSensorMetrics({ className, onProxBreach }) {
  const { level } = useInfection()
  const { scrollYProgress } = useScroll()

  const proxMotion = useTransform(scrollYProgress, [0, 1], [3, 99])

  const [tempDecay, setTempDecay] = useState(72)
  const [freqMod, setFreqMod] = useState(42)
  const [lurkProx, setLurkProx] = useState(3)
  const [breached, setBreached] = useState(false)

  useMotionValueEvent(proxMotion, 'change', (v) => {
    const n = Math.round(v)
    setLurkProx(n)
    if (!breached && n >= 66) {
      setBreached(true)
      onProxBreach?.()
    }
  })

  // jitter interval — slightly faster at higher infection
  useEffect(() => {
    const tick = () => {
      setTempDecay((t) =>
        clamp(t + (Math.random() - 0.5 - level * 0.1) * 2.2, 38, 92)
      )
      setFreqMod(Math.floor(18 + Math.random() * (60 + level * 15)))
    }
    const id = setInterval(tick, level >= 2 ? 160 : 240)
    return () => clearInterval(id)
  }, [level])

  return (
    <aside
      className={cn(
        'border border-white/[0.08] bg-void/60 backdrop-blur-[2px] p-5',
        className
      )}
    >
      <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.06]">
        <span className="mono-label">◼ live sensors</span>
        <span className="flex items-center gap-2 mono-label-sm text-rust-bright">
          <span className="size-1.5 bg-rust-bright animate-pulse-soft" />
          rec
        </span>
      </div>

      <div className="flex flex-col gap-5">
        <Metric
          label="TEMP_DECAY"
          value={tempDecay.toFixed(1)}
          unit="°C"
          pct={((tempDecay - 38) / 54) * 100}
          tone="info"
        />
        <Metric
          label="FREQ_MOD"
          value={freqMod}
          unit="Hz"
          pct={(freqMod / 120) * 100}
          tone={level >= 2 ? 'danger' : 'warn'}
          jitter
        />
        <Metric
          label="LURK_PROX"
          value={lurkProx}
          unit="%"
          pct={lurkProx}
          tone="danger"
          alert={lurkProx >= 66}
        />
      </div>

      <div className="mt-6 pt-5 border-t border-white/[0.06] flex items-center justify-between">
        <span className="mono-label-sm">◼ cell 07 · uplink</span>
        <span className="mono-label-sm tabular-nums">
          {breached ? '◼ near' : '◼ nominal'}
        </span>
      </div>
    </aside>
  )
}

function Metric({ label, value, unit, pct, tone = 'info', jitter = false, alert = false }) {
  const clampedPct = clamp(pct, 0, 100)
  const colors = {
    info: 'bg-signal',
    warn: 'bg-bone',
    danger: 'bg-rust-bright',
  }

  return (
    <div className={jitter ? 'glitch-hover' : ''}>
      <div className="flex items-center justify-between mb-2">
        <span className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-300">
          {label}
        </span>
        <span
          className={cn(
            'font-mono text-sm tabular-nums',
            tone === 'danger' ? 'text-rust-bright' : 'text-bone',
            alert && 'animate-pulse-soft'
          )}
        >
          {value}
          <span className="text-ash-400 ml-1">{unit}</span>
        </span>
      </div>

      <div className="relative h-1.5 bg-white/[0.06] overflow-hidden">
        <motion.div
          className={cn('absolute inset-y-0 left-0', colors[tone])}
          animate={{ width: `${clampedPct}%` }}
          transition={{ type: 'spring', stiffness: 80, damping: 18, mass: 0.5 }}
        />
        {alert && (
          <span className="absolute inset-0 bg-scanlines opacity-60 mix-blend-overlay" />
        )}
      </div>
    </div>
  )
}
