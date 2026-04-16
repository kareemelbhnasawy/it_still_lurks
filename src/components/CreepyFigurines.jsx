import { useEffect, useMemo, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useInfection } from '@/context/InfectionContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePerformanceMode } from '@/hooks/usePerformanceMode'

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
  const { low, medium, high } = usePerformanceMode()
  const presence = useUserPresence(high)

  if (reduced || level < 1 || low) return null

  const crawlerCount = medium ? (level >= 3 ? 2 : 1) : level >= 3 ? 5 : level >= 2 ? 3 : 1
  const crawlers = Array.from({ length: crawlerCount })

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[58] overflow-hidden figurine-field">
      {crawlers.map((_, i) => (
        <Crawler key={`crawler-${i}`} index={i} count={crawlerCount} />
      ))}

      {level >= 2 && <CornerWatcher presence={presence} level={level} />}
      {!medium && level >= 2 && <DoorframePeeker presence={presence} />}
      {!medium && level >= 2 && <MouseStalker presence={presence} distance={level >= 3 ? 82 : 128} />}
      {!medium && level >= 3 && <CeilingHanger presence={presence} />}
      {!medium && level >= 3 && <HallPasser />}
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
      duration: 46 + Math.random() * 38,
      delay: -Math.random() * 60, // start mid-path so they don't all appear at once
      bottom: 18 + Math.random() * 110, // px from the bottom
      scale: 0.72 + Math.random() * 0.75,
      species: (index + Math.floor(Math.random() * 3)) % 3,
    }
  }, [index])

  return (
    <div
      className="absolute left-0 right-0"
      style={{ bottom: `${config.bottom}px` }}
    >
      <div
        className="crawler-shell"
        style={{
          transform: `scale(${config.scale})`,
          transformOrigin: 'left bottom',
          opacity: 0.75 - index / (count * 6),
        }}
      >
        <div
        className="crawler-track"
        style={{
          animationDuration: `${config.duration}s`,
          animationDirection: config.reverse ? 'reverse' : 'normal',
          animationDelay: `${config.delay}s`,
        }}
      >
          <CrawlerGlyph species={config.species} />
        </div>
      </div>
    </div>
  )
}

function CrawlerGlyph({ species = 0 }) {
  const eye = species === 1 ? '#3a4550' : '#b22222'
  return (
    <svg
      width="60"
      height="28"
      viewBox="0 0 60 28"
      className="crawler-glyph block"
      fill="#050505"
    >
      {species === 0 && (
        <>
          <path d="M2 27 L7 22 L10 18 L13 15 L19 13 L24 9 L28 7 L33 6 L38 8 L42 10 L47 14 L52 18 L56 22 L58 27 Z" />
          <path d="M14 27 L17 21 L18 27 Z" />
          <path d="M42 27 L45 20 L47 27 Z" />
          <circle cx="30" cy="9" r="1.1" fill={eye} />
        </>
      )}
      {species === 1 && (
        <>
          <path d="M2 27 L9 20 L14 14 L20 10 L27 8 L35 8 L42 11 L47 15 L52 19 L58 27 Z" />
          <path d="M18 27 L22 21 L23 27 Z" />
          <path d="M36 27 L39 22 L41 27 Z" />
          <circle cx="24" cy="10" r="1.1" fill={eye} />
          <circle cx="30" cy="10" r="0.8" fill={eye} />
        </>
      )}
      {species === 2 && (
        <>
          <path d="M4 27 L10 18 L16 11 L24 8 L31 9 L38 12 L45 17 L52 21 L56 27 Z" />
          <path d="M22 27 L25 20 L27 27 Z" />
          <path d="M31 27 L34 20 L36 27 Z" />
          <path d="M39 27 L42 22 L44 27 Z" />
          <circle cx="20" cy="10" r="0.95" fill={eye} />
        </>
      )}
    </svg>
  )
}

/* ---------- Corner Watcher ------------------------------------------------- */

function CornerWatcher({ presence, level }) {
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

  useEffect(() => {
    setCorner(presence.oppositeCorner)
  }, [presence.oppositeCorner])

  const pos = [
    { top: 84, left: 20 },
    { top: 84, right: 20 },
    { bottom: 96, right: 20 },
    { bottom: 96, left: 20 },
  ][corner]

  return (
    <motion.div
      className="absolute watcher-presence"
      style={pos}
      animate={{
        opacity: visible ? (presence.idle ? 0.78 : level >= 3 ? 0.42 : 0.24) : 0,
        x:
          corner === 0 || corner === 3
            ? [0, 2, 0]
            : [0, -2, 0],
        y: [0, 1, 0],
      }}
      transition={{ duration: 1.6, ease: [0.19, 1, 0.22, 1], repeat: Infinity, repeatType: 'mirror' }}
    >
      <WatcherGlyph />
    </motion.div>
  )
}

function WatcherGlyph() {
  return (
    <svg width="34" height="54" viewBox="0 0 34 54">
      <defs>
        <filter id="watcherGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="3" floodColor="#b22222" floodOpacity="0.8" />
        </filter>
      </defs>
      <ellipse cx="17" cy="10" rx="7.5" ry="8.5" fill="#141414" filter="url(#watcherGlow)" />
      <path d="M8 18 L26 18 L28 51 L6 51 Z" fill="#111" />
      <path d="M11 51 L17 42 L23 51 Z" fill="#111" />
      <circle cx="14" cy="10" r="1.2" fill="#ff4444" style={{ filter: 'drop-shadow(0 0 4px #ff4444)' }} />
      <circle cx="20" cy="10" r="1.2" fill="#ff4444" style={{ filter: 'drop-shadow(0 0 4px #ff4444)' }} />
    </svg>
  )
}

function DoorframePeeker({ presence }) {
  const config = useMemo(
    () => ({
      delay: Math.random() * 2.6,
      nudge: 32 + Math.random() * 20,
    }),
    []
  )

  const side = presence.oppositeHorizontal
  const top = clamp(presence.y - 86, 92, presence.height - 220)

  return (
    <motion.div
      className="absolute figurine-peeker"
      style={{
        top,
        left: side === 'left' ? -8 : 'auto',
        right: side === 'right' ? -8 : 'auto',
        transformOrigin: side === 'left' ? 'left center' : 'right center',
      }}
      animate={{
        x: side === 'left' ? [0, config.nudge, config.nudge * 0.6, 0] : [0, -config.nudge, -config.nudge * 0.6, 0],
        opacity: presence.idle ? [0.08, 0.52, 0.3, 0.08] : [0.04, 0.28, 0.16, 0.04],
      }}
      transition={{
        duration: presence.idle ? 6.8 : 8.4,
        repeat: Infinity,
        delay: config.delay,
        ease: [0.6, 0, 0.4, 1],
        repeatDelay: presence.idle ? 3.8 : 5.8,
      }}
    >
      <PeekerGlyph side={side} />
    </motion.div>
  )
}

function PeekerGlyph({ side = 'left' }) {
  return (
    <svg width="74" height="140" viewBox="0 0 74 140">
      <defs>
        <filter id="peekerGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="10" floodColor="#050505" floodOpacity="1" />
        </filter>
      </defs>
      <path
        d={side === 'left'
          ? 'M0 140 L0 14 L22 8 L43 16 L58 32 L67 58 L74 84 L74 140 Z'
          : 'M74 140 L74 14 L52 8 L31 16 L16 32 L7 58 L0 84 L0 140 Z'}
        fill="#090909"
        filter="url(#peekerGlow)"
      />
      <circle cx={side === 'left' ? 44 : 30} cy="42" r="2" fill="#b22222" />
      <circle cx={side === 'left' ? 50 : 24} cy="42" r="1.5" fill="#b22222" />
    </svg>
  )
}

/* ---------- Mouse Stalker -------------------------------------------------- */

// A silhouette that trails the cursor at a distance, via spring damping.
// The offset puts it off-screen until the user moves their mouse.
function MouseStalker({ presence, distance = 180 }) {
  const mx = useMotionValue(-300)
  const my = useMotionValue(-300)
  const mo = useMotionValue(0.12)
  const x = useSpring(mx, { damping: 22, stiffness: 120, mass: 0.8 })
  const y = useSpring(my, { damping: 22, stiffness: 120, mass: 0.8 })
  const opacity = useSpring(mo, { damping: 24, stiffness: 90, mass: 0.7 })

  useEffect(() => {
    const band = Math.min(distance * 0.55, 108)
    const targetX =
      presence.horizontal === 'left'
        ? clamp(presence.x - band, 10, presence.width * 0.36)
        : clamp(presence.x + band, presence.width * 0.64, presence.width - 56)
    const targetY =
      presence.vertical === 'top'
        ? clamp(presence.y + Math.min(distance * 0.18, 28), 18, presence.height - 92)
        : clamp(presence.y - Math.min(distance * 0.28, 46), 18, presence.height - 92)

    mx.set(targetX)
    my.set(targetY)
    mo.set(presence.idle ? 0.46 : 0.28)
  }, [presence, distance, mx, my, mo])

  return (
    <motion.div
      className="absolute top-0 left-0 will-change-transform figurine-follower"
      style={{ x, y, opacity }}
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

function CeilingHanger({ presence }) {
  const config = useMemo(
    () => ({
      delay: Math.random() * 1.8,
      offset: 30 + Math.random() * 32,
    }),
    []
  )

  const left = clamp(
    presence.x + (presence.horizontal === 'left' ? config.offset : -config.offset),
    28,
    presence.width - 84
  )

  return (
    <motion.div
      className="absolute top-0 figurine-hanger"
      style={{ left }}
      animate={{
        y: [0, 10, 2, 0],
        rotate: [0, 0.8, -0.8, 0],
        opacity: presence.idle ? [0.18, 0.48, 0.34, 0.18] : [0.08, 0.22, 0.14, 0.08],
      }}
      transition={{ duration: 8.4, repeat: Infinity, ease: 'easeInOut', delay: config.delay }}
    >
      <HangerGlyph />
    </motion.div>
  )
}

function HangerGlyph() {
  return (
    <svg width="56" height="150" viewBox="0 0 56 150">
      <line x1="28" y1="0" x2="28" y2="34" stroke="#1e1e1e" strokeWidth="1" />
      <ellipse cx="28" cy="48" rx="9" ry="11" fill="#101010" />
      <path d="M20 60 L36 60 L40 112 L16 112 Z" fill="#0d0d0d" />
      <path d="M22 112 L18 150 M34 112 L38 150" stroke="#111" strokeWidth="5" strokeLinecap="round" />
      <circle cx="24" cy="48" r="1.1" fill="#b22222" />
      <circle cx="32" cy="48" r="1.1" fill="#b22222" />
    </svg>
  )
}

function HallPasser() {
  return (
    <motion.div
      className="absolute inset-y-0 left-0 flex items-end figurine-passer"
      initial={{ x: '-24%', opacity: 0 }}
      animate={{ x: ['-24%', '18%', '62%', '104%'], opacity: [0, 0.2, 0.34, 0] }}
      transition={{ duration: 34, repeat: Infinity, ease: 'linear', repeatDelay: 6 }}
    >
      <PasserGlyph />
    </motion.div>
  )
}

function PasserGlyph() {
  return (
    <svg width="220" height="420" viewBox="0 0 220 420">
      <defs>
        <filter id="passerBlur">
          <feGaussianBlur stdDeviation="2.1" />
        </filter>
      </defs>
      <g filter="url(#passerBlur)" fill="#050505">
        <ellipse cx="110" cy="74" rx="36" ry="42" />
        <path d="M76 112 L144 112 L164 366 L56 366 Z" />
      </g>
      <circle cx="96" cy="74" r="2.4" fill="#b22222" />
      <circle cx="124" cy="74" r="2.4" fill="#b22222" />
    </svg>
  )
}

function useUserPresence(enabled = true) {
  const [presence, setPresence] = useState(() => {
    const width = typeof window === 'undefined' ? 1440 : window.innerWidth
    const height = typeof window === 'undefined' ? 900 : window.innerHeight
    const x = width * 0.5
    const y = height * 0.56
    return buildPresence({ x, y, width, height, idle: true })
  })

  useEffect(() => {
    if (typeof window === 'undefined' || !enabled) return undefined

    let raf = 0
    let idleTimer = 0
    const state = {
      x: window.innerWidth * 0.5,
      y: window.innerHeight * 0.56,
      width: window.innerWidth,
      height: window.innerHeight,
      idle: true,
    }

    const flush = () => {
      raf = 0
      setPresence(buildPresence(state))
    }

    const queue = () => {
      if (!raf) raf = window.requestAnimationFrame(flush)
    }

    const armIdle = () => {
      window.clearTimeout(idleTimer)
      idleTimer = window.setTimeout(() => {
        state.idle = true
        queue()
      }, 820)
    }

    const onMove = (event) => {
      state.x = event.clientX
      state.y = event.clientY
      state.idle = false
      queue()
      armIdle()
    }

    const onScroll = () => {
      state.idle = false
      queue()
      armIdle()
    }

    const onResize = () => {
      state.width = window.innerWidth
      state.height = window.innerHeight
      state.x = clamp(state.x, 0, state.width)
      state.y = clamp(state.y, 0, state.height)
      queue()
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
      window.clearTimeout(idleTimer)
      if (raf) window.cancelAnimationFrame(raf)
    }
  }, [enabled])

  return presence
}

function buildPresence({ x, y, width, height, idle }) {
  const horizontal = x < width * 0.5 ? 'left' : 'right'
  const vertical = y < height * 0.5 ? 'top' : 'bottom'
  const oppositeHorizontal = horizontal === 'left' ? 'right' : 'left'
  const oppositeVertical = vertical === 'top' ? 'bottom' : 'top'
  const oppositeCornerMap = {
    'top-left': 2,
    'top-right': 3,
    'bottom-left': 1,
    'bottom-right': 0,
  }

  return {
    x,
    y,
    width,
    height,
    idle,
    horizontal,
    vertical,
    oppositeHorizontal,
    oppositeVertical,
    oppositeCorner: oppositeCornerMap[`${vertical}-${horizontal}`],
  }
}

function clamp(value, min, max) {
  return Math.max(min, Math.min(max, value))
}
