import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInfection } from '@/context/InfectionContext'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { usePerformanceMode } from '@/hooks/usePerformanceMode'

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
  const { low, medium } = usePerformanceMode()
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

    if (reduced || low) {
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
  }, [level, reduced, low])

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
              y: phase === 5 ? (medium ? '28%' : '36%') : '0%',
              opacity: phase === 5 ? 0.45 : 1,
            }}
            transition={{
              duration: phase === 5 ? 2.2 : 2.4,
              ease: [0.19, 1, 0.22, 1],
            }}
            className="pointer-events-none fixed inset-0 z-[90] flex items-end justify-center"
          >
            {medium ? <LeanFigure breathing={phase === 3} /> : <GiantFigure breathing={phase === 3} />}
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
              initial={medium ? { scale: 0.98, opacity: 0.2 } : { scale: 0.96, filter: 'blur(8px)' }}
              animate={{
                scale: medium ? [0.98, 1.01, 1, 1.015, 1] : [0.96, 1.02, 1, 1.04, 1],
                opacity: medium ? [0.2, 1, 1, 0.92, 1] : 1,
                filter: medium ? 'none' : ['blur(8px)', 'blur(0px)', 'blur(0px)', 'blur(1.2px)', 'blur(0px)'],
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

function LeanFigure({ breathing }) {
  return (
    <motion.svg
      width="100%"
      height="90%"
      viewBox="0 0 600 900"
      preserveAspectRatio="xMidYMax meet"
      animate={breathing ? { scale: [1, 1.01, 1], y: [0, -2, 0] } : { scale: 1, y: 0 }}
      transition={{ duration: 3.6, repeat: Infinity, ease: 'easeInOut' }}
      style={{ opacity: 0.9 }}
    >
      <defs>
        <linearGradient id="leanVeil" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,90,90,0.16)" />
          <stop offset="55%" stopColor="rgba(178,34,34,0.08)" />
          <stop offset="100%" stopColor="rgba(178,34,34,0)" />
        </linearGradient>
        <linearGradient id="leanBody" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#7a7775" />
          <stop offset="48%" stopColor="#575250" />
          <stop offset="100%" stopColor="#211d1d" />
        </linearGradient>
        <linearGradient id="leanEdge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="rgba(255,220,220,0.34)" />
          <stop offset="100%" stopColor="rgba(255,120,120,0.04)" />
        </linearGradient>
      </defs>

      <path
        d="M124 900 Q168 690 208 560 Q236 470 264 396 Q284 340 296 256 Q302 218 296 178 Q350 198 388 248 Q430 306 448 422 Q464 526 466 650 Q468 782 490 900 Z"
        fill="url(#leanVeil)"
      />

      <path
        d="M301 160 Q338 162 370 190 Q405 224 426 302 Q446 382 450 526 Q452 690 430 900 L194 900 Q176 720 176 590 Q176 492 188 408 Q204 292 238 224 Q264 172 301 160 Z"
        fill="url(#leanBody)"
      />
      <path
        d="M301 160 Q338 162 370 190 Q405 224 426 302 Q446 382 450 526 Q452 690 430 900"
        fill="none"
        stroke="url(#leanEdge)"
        strokeWidth="4"
      />
      <path
        d="M300 160 Q250 182 220 248 Q190 316 184 452"
        fill="none"
        stroke="rgba(255,240,240,0.18)"
        strokeWidth="3"
      />

      <path
        d="M286 102 Q302 74 326 80 Q346 84 354 112 Q366 150 358 184 Q350 212 328 222 Q306 232 286 220 Q266 206 262 176 Q256 132 286 102 Z"
        fill="#817b79"
      />
      <path
        d="M296 116 Q310 104 328 108 Q342 112 346 132 Q352 160 348 184 Q344 204 330 214 Q316 224 300 218 Q286 212 282 192 Q276 162 282 138 Q286 124 296 116 Z"
        fill="#161112"
      />
      <path d="M294 103 Q308 96 318 98" stroke="rgba(255,240,240,0.26)" strokeWidth="3" strokeLinecap="round" />

      <path
        d="M232 274 Q198 390 198 580 Q198 718 212 838"
        stroke="rgba(92,88,86,0.94)"
        strokeWidth="28"
        fill="none"
        strokeLinecap="round"
      />
      <path
        d="M396 264 Q430 380 428 556 Q426 704 412 832"
        stroke="rgba(92,88,86,0.88)"
        strokeWidth="24"
        fill="none"
        strokeLinecap="round"
      />

      <ellipse cx="303" cy="150" rx="7" ry="10" fill="#f4f1ee" fillOpacity="0.92" transform="rotate(-8 303 150)" />
      <ellipse cx="330" cy="152" rx="5" ry="8" fill="#f4f1ee" fillOpacity="0.76" transform="rotate(-4 330 152)" />
      <ellipse cx="303" cy="150" rx="14" ry="18" fill="rgba(255,80,80,0.16)" transform="rotate(-8 303 150)" />
      <ellipse cx="330" cy="152" rx="11" ry="14" fill="rgba(255,80,80,0.12)" transform="rotate(-4 330 152)" />

      <path d="M294 186 Q312 192 327 184" stroke="rgba(255,120,120,0.2)" strokeWidth="2" strokeLinecap="round" />
    </motion.svg>
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
      style={{ filter: 'drop-shadow(0 0 56px rgba(255, 90, 90, 0.7)) drop-shadow(0 0 28px rgba(255, 255, 255, 0.3))' }}
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
          <feDropShadow dx="0" dy="0" stdDeviation="12" floodColor="#ff4444" floodOpacity="0.85" />
        </filter>
        <filter id="bodyEdge">
          <feDropShadow dx="0" dy="0" stdDeviation="8" floodColor="#ffffff" floodOpacity="0.65" />
          <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#ff2222" floodOpacity="0.78" />
        </filter>
        <filter id="intenseGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="14" floodColor="#ffffff" floodOpacity="0.95" />
          <feDropShadow dx="0" dy="0" stdDeviation="22" floodColor="#ff0000" floodOpacity="0.82" />
        </filter>
        <filter id="megaGlow">
          <feDropShadow dx="0" dy="0" stdDeviation="18" floodColor="#ffffff" floodOpacity="0.5" />
          <feDropShadow dx="0" dy="0" stdDeviation="30" floodColor="#ff4444" floodOpacity="0.68" />
        </filter>
      </defs>

      {/* MASSIVE background glow aura - makes the whole figure pop */}
      <ellipse cx="300" cy="400" rx="280" ry="450" fill="rgba(255,100,100,0.09)" filter="url(#megaGlow)" />
      <ellipse cx="300" cy="450" rx="250" ry="400" fill="none" stroke="#ff6666" strokeWidth="4" strokeOpacity="0.42" filter="url(#intenseGlow)" />

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
      <circle cx="278" cy="158" r="18" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 12px #ffffff) drop-shadow(0 0 18px #ff4444)' }} />
      <circle cx="322" cy="158" r="18" fill="#ffffff" style={{ filter: 'drop-shadow(0 0 12px #ffffff) drop-shadow(0 0 18px #ff4444)' }} />
    </motion.svg>
  )
}
