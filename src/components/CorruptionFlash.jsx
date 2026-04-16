import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePerformanceMode } from '@/hooks/usePerformanceMode'

// Rare, intentional "signal unstable" flash. Triggers roughly every 45-90s.
export default function CorruptionFlash() {
  const reduced = useReducedMotion()
  const { low, medium } = usePerformanceMode()
  const [active, setActive] = useState(false)

  useEffect(() => {
    if (reduced || low) return
    let cancelled = false

    const schedule = () => {
      const delay = (medium ? 70000 : 45000) + Math.random() * (medium ? 70000 : 45000)
      setTimeout(() => {
        if (cancelled) return
        setActive(true)
        setTimeout(() => {
          if (cancelled) return
          setActive(false)
          schedule()
        }, 620)
      }, delay)
    }
    schedule()
    return () => {
      cancelled = true
    }
  }, [reduced, low, medium])

  return (
    <AnimatePresence>
      {active && (
        <motion.div
          key="flash"
          aria-hidden
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 1, 0.2, 1, 0] }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.62, times: [0, 0.1, 0.3, 0.5, 1] }}
          className="pointer-events-none fixed inset-0 z-[70]"
        >
          <div
            className="absolute inset-0 bg-scanlines"
            style={{ opacity: medium ? 0.45 : 0.8 }}
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                'linear-gradient(180deg, rgba(160,29,29,0.06) 0%, transparent 50%, rgba(58,69,80,0.06) 100%)',
            }}
          />
          <div className="absolute top-6 left-6 font-mono text-[10px] uppercase tracking-widest-2 text-rust-bright">
            ◼ signal unstable · realignment in progress
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
