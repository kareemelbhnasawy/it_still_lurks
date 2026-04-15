import { useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInfection } from '@/context/InfectionContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// CREEPY FIGURINES — silhouettes that appear as the infection escalates.
//
//   Level 0 → nothing
//   Level 1 → 1 slow crawler pacing the bottom edge
//   Level 2 → crawlers multiply, a corner watcher starts fading in/out,
//             a mouse stalker begins trailing the cursor
//   Level 3 → double crawlers, watcher stays on screen, stalker gets closer
//
// Everything is pointer-events-none so nothing is blocked from being clicked.
// All motion is transform/opacity only and pauses when reduced-motion is set.
export default function CreepyFigurines() {
  const { level } = useInfection()
  const reduced = useReducedMotion()

  if (reduced || level < 1) return null

  const crawlerCount = level >= 3 ? 4 : level >= 2 ? 3 : 1
  const crawlers = Array.from({ length: crawlerCount })

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[58] overflow-hidden">
      {crawlers.map((_, i) => (
        <Crawler key={`crawler-${i}`} index={i} count={crawlerCount} />
      ))}

      {level >= 2 && <CornerWatcher />}
      {level >= 2 && <MouseStalker distance={level >= 3 ? 80 : 180} />}
    </div>
  )
}

/* ---------- Crawler ------------------------------------------------------- */

function Crawler({ index, count }) {
  // Random traversal config frozen on mount so it doesn't reshuffle every render.
  const config = useMemo(() => {
    const reverse = Math.random() > 0.5
    return {
      reverse,
      duration: 55 + Math.random() * 45, // 55–100s full traversal
      delay: -Math.random() * 60, // start mid-path so they don't all appear at once
      bottom: 18 + Math.random() * 110, // px from the bottom
      scale: 0.75 + Math.random() * 0.55, // 0.75–1.3×
      driftDelay: index * 8,
    }
  }, [index])

  return (
    <div
      className="absolute left-0 right-0"
      style={{ bottom: `${config.bottom}px` }}
    >
      <div
        className="crawler-track"
        style={{
          animationDuration: `${config.duration}s`,
          animationDirection: config.reverse ? 'reverse' : 'normal',
          animationDelay: `${config.delay}s`,
          transform: `scale(${config.scale})`,
          transformOrigin: 'left bottom',
        }}
      >
        <CrawlerGlyph />
      </div>
    </div>
  )
}

function CrawlerGlyph() {
  return (
    <svg
      width="46"
      height="22"
      viewBox="0 0 46 22"
      className="crawler-glyph block"
      fill="#050505"
    >
      {/* hunched silhouette on all fours */}
      <path d="M1 21 L4 17 L6 14 L9 12 L13 11 L16 9 L19 7 L22 6 L25 7 L28 9 L31 11 L34 12 L38 14 L41 17 L44 21 Z" />
      {/* two trailing limbs */}
      <path d="M10 21 L12 18 L13 21 Z" />
      <path d="M34 21 L36 18 L37 21 Z" />
      {/* single red eye */}
      <circle cx="21" cy="9" r="0.9" fill="#b22222" />
    </svg>
  )
}

/* ---------- Corner Watcher ------------------------------------------------- */

function CornerWatcher() {
  const [corner, setCorner] = useState(0) // 0=tl 1=tr 2=br 3=bl
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    let alive = true
    const cycle = () => {
      if (!alive) return
      setVisible(true)
      setTimeout(() => {
        if (!alive) return
        setVisible(false)
        setTimeout(() => {
          if (!alive) return
          setCorner((c) => (c + 1 + Math.floor(Math.random() * 3)) % 4)
          cycle()
        }, 2500 + Math.random() * 3000)
      }, 2800 + Math.random() * 1800)
    }
    // Start faster - reduced from 6000ms to 1800ms
    const first = setTimeout(cycle, 1800)
    return () => {
      alive = false
      clearTimeout(first)
    }
  }, [])

  const pos = [
    { top: 84, left: 20 },
    { top: 84, right: 20 },
    { bottom: 96, right: 20 },
    { bottom: 96, left: 20 },
  ][corner]

  return (
    <motion.div
      className="absolute"
      style={pos}
      animate={{ opacity: visible ? 0.85 : 0 }}
      transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1] }}
    >
      <WatcherGlyph />
    </motion.div>
  )
}

function WatcherGlyph() {
  return (
    <svg width="28" height="44" viewBox="0 0 28 44">
      <defs>
        <filter id="watcherGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#b22222" floodOpacity="0.8" />
        </filter>
      </defs>
      {/* head - brighter fill for visibility */}
      <ellipse cx="14" cy="9" rx="6.5" ry="7.5" fill="#1a1a1a" filter="url(#watcherGlow)" />
      {/* torso */}
      <path d="M6 16 L22 16 L23 42 L5 42 Z" fill="#1a1a1a" />
      {/* two pin eyes - brighter */}
      <circle cx="11" cy="8" r="1.2" fill="#ff4444" style={{ filter: 'drop-shadow(0 0 4px #ff4444)' }} />
      <circle cx="17" cy="8" r="1.2" fill="#ff4444" style={{ filter: 'drop-shadow(0 0 4px #ff4444)' }} />
    </svg>
  )
}

/* ---------- Mouse Stalker -------------------------------------------------- */

// A silhouette that trails the cursor at a distance, via spring damping.
// The offset puts it off-screen until the user moves their mouse.
function MouseStalker({ distance = 180 }) {
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const x = useSpring(mx, { damping: 22, stiffness: 120, mass: 0.8 })
  const y = useSpring(my, { damping: 22, stiffness: 120, mass: 0.8 })

  useEffect(() => {
    const onMove = (e) => {
      // Place the stalker `distance` px away from the cursor,
      // in the direction of the closest viewport edge (so it comes from "outside").
      mx.set(e.clientX - 18)
      my.set(e.clientY - distance)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [mx, my, distance])

  return (
    <motion.div
      className="absolute top-0 left-0 will-change-transform"
      style={{ x, y }}
    >
      <StalkerGlyph />
    </motion.div>
  )
}

function StalkerGlyph() {
  return (
    <svg width="36" height="56" viewBox="0 0 36 56" style={{ opacity: 0.8 }}>
      <defs>
        <filter id="stalkerBlur">
          <feGaussianBlur stdDeviation="0.6" />
        </filter>
      </defs>
      <g filter="url(#stalkerBlur)" fill="#050505">
        <ellipse cx="18" cy="11" rx="8" ry="9" />
        <path d="M6 20 L30 20 L32 54 L4 54 Z" />
      </g>
      <circle cx="14" cy="10" r="0.9" fill="#b22222" />
      <circle cx="22" cy="10" r="0.9" fill="#b22222" />
    </svg>
  )
}
