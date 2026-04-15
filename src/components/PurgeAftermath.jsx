import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInfection } from '@/context/InfectionContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'

// PURGE AFTERMATH — triggered the moment infection level crosses into 3.
// One-shot 7-second sequence followed by a persistent hostile state:
//
//   Phase 0: IDLE — nothing (infection < 3)
//   Phase 1: FLASH — 180ms red full-screen strobe
//   Phase 2: RISING — a giant humanoid silhouette rises from the bottom
//                     of the viewport over ~2.4s, eyes pin-bright
//   Phase 3: LINGER — it holds, stares, breathes. ~1.8s
//   Phase 4: VERDICT — massive "IT HAS SEEN YOU" full-screen banner. 1.6s
//   Phase 5: PERSISTENT — figure retreats but never fully leaves. A small
//                         permanent warning stays in the top-left corner
//                         until the page is refreshed.
//
// All transform+opacity only. Respects reduced motion (skips direct to persistent).
export default function PurgeAftermath() {
  const { level } = useInfection()
  const reduced = useReducedMotion()
  const [phase, setPhase] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (level < 3) {
      setPhase(0)
      hasStarted.current = false
      return
    }
    // Use ref to prevent re-triggering when phase changes
    if (hasStarted.current) return
    hasStarted.current = true

    if (reduced) {
      setPhase(5)
      return
    }

    setPhase(1)
    const t1 = setTimeout(() => setPhase(2), 180)
    const t2 = setTimeout(() => setPhase(3), 180 + 2400)
    const t3 = setTimeout(() => setPhase(4), 180 + 2400 + 1800)
    const t4 = setTimeout(() => setPhase(5), 180 + 2400 + 1800 + 1600)

    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
      clearTimeout(t4)
    }
  }, [level, reduced])

  if (level < 3) return null

  return (
    <>
      {/* Phase 1: red strobe */}
      <AnimatePresence>
        {phase === 1 && (
          <motion.div
            key="strobe"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 1, 0.2, 1] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: 'linear' }}
            className="pointer-events-none fixed inset-0 z-[95]"
            style={{ background: '#b22222' }}
          />
        )}
      </AnimatePresence>

      {/* Phase 2 + 3: rising figure */}
      <AnimatePresence>
        {(phase === 2 || phase === 3 || phase === 5) && (
          <motion.div
            key="figure"
            initial={{ y: '100%', opacity: 0 }}
            animate={{
              y: phase === 5 ? '70%' : '0%',
              opacity: phase === 5 ? 0.45 : 1,
            }}
            transition={{
              duration: phase === 5 ? 2.2 : 2.4,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="pointer-events-none fixed inset-0 z-[90] flex items-end justify-center"
          >
            <GiantFigure breathing={phase === 3} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 4: verdict banner */}
      <AnimatePresence>
        {phase === 4 && (
          <motion.div
            key="verdict"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="pointer-events-none fixed inset-0 z-[96] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-void-900/90" />
            <div className="absolute inset-0 bg-scanlines opacity-80" />

            <motion.h2
              initial={{ scale: 0.96, filter: 'blur(8px)' }}
              animate={{
                scale: [0.96, 1.02, 1, 1.04, 1],
                filter: ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(1.2px)', 'blur(0px)'],
              }}
              transition={{ duration: 1.5, ease: [0.19, 1, 0.22, 1] }}
              className="relative font-display font-extrabold italic text-[clamp(3rem,14vw,12rem)] leading-[0.85] tracking-[-0.04em] text-center text-bone"
            >
              IT HAS
              <br />
              <span className="text-rust-bright">SEEN YOU</span>
            </motion.h2>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Phase 5: persistent corner warning */}
      {phase === 5 && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="pointer-events-none fixed top-20 md:top-24 left-5 md:left-10 z-[91] max-w-[240px]"
        >
          <div className="border border-rust bg-rust-deep/30 p-3">
            <div className="flex items-center gap-2 mb-2">
              <span className="size-1.5 bg-rust-bright animate-pulse-soft" />
              <span className="font-mono text-[9px] uppercase tracking-widest-2 text-rust-bright">
                ◼ witness record · you
              </span>
            </div>
            <p className="font-display italic text-lg leading-tight text-bone">
              It has added you to the ledger.
            </p>
            <p className="mt-2 font-mono text-[9px] uppercase tracking-widest-2 text-ash-300">
              refresh will not remove the record
            </p>
          </div>
        </motion.div>
      )}
    </>
  )
}

function GiantFigure({ breathing }) {
  return (
    <motion.svg
      width="100%"
      height="92%"
      viewBox="0 0 600 900"
      preserveAspectRatio="xMidYMax meet"
      animate={
        breathing
          ? { scale: [1, 1.012, 1], y: [0, -2, 0] }
          : { scale: 1, y: 0 }
      }
      transition={{ duration: 3.4, repeat: Infinity, ease: 'easeInOut' }}
      style={{ filter: 'drop-shadow(0 0 120px rgba(255, 100, 100, 1)) drop-shadow(0 0 60px rgba(255, 255, 255, 0.5))' }}
    >
      <defs>
        <radialGradient id="eyeGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="20%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="40%" stopColor="#ffaaaa" stopOpacity="1" />
          <stop offset="60%" stopColor="#ff6666" stopOpacity="0.9" />
          <stop offset="80%" stopColor="#ff3333" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#ff0000" stopOpacity="0" />
        </radialGradient>
        {/* BRIGHT body gradient - visible against dark/red backgrounds */}
        <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#c8c8c8" />
          <stop offset="0.3" stopColor="#a0a0a0" />
          <stop offset="0.6" stopColor="#808080" />
          <stop offset="1" stopColor="#606060" />
        </linearGradient>
        <linearGradient id="bodyHighlight" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#ff6666" stopOpacity="0.5" />
          <stop offset="0.5" stopColor="#ffffff" stopOpacity="0.15" />
          <stop offset="1" stopColor="#ff6666" stopOpacity="0.5" />
        </linearGradient>
        <filter id="figureGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="25" floodColor="#ff4444" floodOpacity="1" />
        </filter>
        <filter id="bodyEdge">
          <feDropShadow dx="0" dy="0" stdDeviation="15" floodColor="#ffffff" floodOpacity="0.8" />
          <feDropShadow dx="0" dy="0" stdDeviation="30" floodColor="#ff2222" floodOpacity="1" />
        </filter>
        <filter id="intenseGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="40" floodColor="#ffffff" floodOpacity="1" />
          <feDropShadow dx="0" dy="0" stdDeviation="60" floodColor="#ff0000" floodOpacity="1" />
        </filter>
        <filter id="megaGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="50" floodColor="#ffffff" floodOpacity="0.9" />
          <feDropShadow dx="0" dy="0" stdDeviation="80" floodColor="#ff4444" floodOpacity="1" />
        </filter>
      </defs>

      {/* MASSIVE background glow aura - makes the whole figure pop */}
      <ellipse cx="300" cy="400" rx="280" ry="450" fill="rgba(255,100,100,0.15)" filter="url(#megaGlow)" />
      <ellipse cx="300" cy="450" rx="250" ry="400" fill="none" stroke="#ff6666" strokeWidth="4" strokeOpacity="0.6" filter="url(#intenseGlow)" />

      {/* outer bright outline for visibility */}
      <path
        d="M300 200 Q230 210 200 300 Q180 420 190 600 Q195 760 210 900 L390 900 Q405 760 410 600 Q420 420 400 300 Q370 210 300 200 Z"
        fill="none"
        stroke="#ffffff"
        strokeWidth="8"
        strokeOpacity="0.9"
        filter="url(#bodyEdge)"
      />

      {/* shoulders + body mass - NOW BRIGHT GRAY */}
      <path
        d="M300 200 Q230 210 200 300 Q180 420 190 600 Q195 760 210 900 L390 900 Q405 760 410 600 Q420 420 400 300 Q370 210 300 200 Z"
        fill="url(#body)"
        filter="url(#bodyEdge)"
      />
      {/* body highlight overlay */}
      <path
        d="M300 200 Q230 210 200 300 Q180 420 190 600 Q195 760 210 900 L390 900 Q405 760 410 600 Q420 420 400 300 Q370 210 300 200 Z"
        fill="url(#bodyHighlight)"
      />

      {/* head outline */}
      <ellipse cx="300" cy="170" rx="88" ry="103" fill="none" stroke="#ffffff" strokeWidth="6" strokeOpacity="0.8" filter="url(#bodyEdge)" />
      {/* head */}
      <ellipse cx="300" cy="170" rx="80" ry="95" fill="url(#body)" filter="url(#figureGlow)" />
      {/* jaw */}
      <path d="M240 220 Q300 285 360 220 L360 250 Q300 310 240 250 Z" fill="#707070" />

      {/* arms hanging long - NOW VISIBLE */}
      <path
        d="M200 310 Q170 420 170 600 Q170 720 190 820"
        stroke="#909090"
        strokeWidth="55"
        fill="none"
        strokeLinecap="round"
        filter="url(#figureGlow)"
      />
      <path
        d="M400 310 Q430 420 430 600 Q430 720 410 820"
        stroke="#909090"
        strokeWidth="55"
        fill="none"
        strokeLinecap="round"
        filter="url(#figureGlow)"
      />

      {/* eyes — HUGE, BLINDINGLY BRIGHT */}
      <circle cx="278" cy="158" r="45" fill="url(#eyeGlow)" filter="url(#intenseGlow)" />
      <circle cx="322" cy="158" r="45" fill="url(#eyeGlow)" filter="url(#intenseGlow)" />
      {/* bright inner pupils - MAXIMUM GLOW */}
      <circle cx="278" cy="158" r="18" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 30px #ffffff) drop-shadow(0 0 50px #ffffff) drop-shadow(0 0 70px #ff4444)' }} />
      <circle cx="322" cy="158" r="18" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 30px #ffffff) drop-shadow(0 0 50px #ffffff) drop-shadow(0 0 70px #ff4444)' }} />
    </motion.svg>
  )
}
