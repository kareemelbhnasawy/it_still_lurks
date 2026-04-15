import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SystemBadge from './SystemBadge'
import { formatTimestamp } from '@/utils/format'

export default function FeaturedCard({ item }) {
  if (!item) return null

  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-120px' }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="group relative grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 hairline p-6 md:p-10 bg-white/[0.012] hover:bg-white/[0.02] transition-colors duration-700"
    >
      <Link
        to={`/watch/${item.slug}`}
        className="relative aspect-[16/10] overflow-hidden bg-void-600"
      >
        <PosterArt />
        <div className="absolute inset-0 vignette pointer-events-none" />
        <div className="absolute inset-0 bg-scanlines opacity-50 pointer-events-none" />

        <div className="absolute top-4 left-4 flex gap-2">
          <SystemBadge tone="warn">● rec</SystemBadge>
          <SystemBadge>{item.code}</SystemBadge>
        </div>

        <div className="absolute bottom-4 right-4 flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-2 text-bone">
          <span className="h-1 w-1 bg-rust-bright animate-pulse-soft" />
          {item.runtime} · featured drop
        </div>

        <div className="absolute inset-0 flex items-center justify-center">
          <span className="relative inline-flex min-w-[156px] items-center justify-center border border-white/[0.15] backdrop-blur-sm bg-void/35 px-6 py-4 group-hover:border-rust/60 transition-colors duration-500">
            <span className="absolute left-2 top-2 h-3 w-3 border-l border-t border-white/25" />
            <span className="absolute right-2 top-2 h-3 w-3 border-r border-t border-white/25" />
            <span className="absolute left-2 bottom-2 h-3 w-3 border-l border-b border-white/25" />
            <span className="absolute right-2 bottom-2 h-3 w-3 border-r border-b border-white/25" />
            <span className="font-mono text-[10px] uppercase tracking-widest-2 text-bone">access file</span>
            <span className="absolute inset-x-4 top-1/2 h-px bg-rust-bright/65 animate-pulse-soft" />
          </span>
        </div>
      </Link>

      <div className="flex flex-col justify-between gap-10">
        <div>
          <span className="mono-label">◼ featured · {item.season} · {item.number}</span>
          <h3 className="mt-5 font-display text-4xl md:text-5xl lg:text-6xl text-bone leading-[0.95] text-balance">
            {item.title}
          </h3>
          <p className="mt-6 max-w-md text-base text-ash-200/80 leading-relaxed text-pretty">
            {item.tagline}
          </p>

          <div className="mt-8 grid grid-cols-2 gap-y-4 gap-x-6 text-sm">
            <Meta label="aired" value={formatTimestamp(item.airDate).split(' ·')[0]} />
            <Meta label="region" value={item.region} />
            <Meta label="runtime" value={item.runtime} />
            <Meta label="status" value={item.status} className="uppercase" />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <Link
            to={`/watch/${item.slug}`}
            className="group/btn inline-flex items-center gap-3 px-5 py-3 border border-white/[0.12] hover:border-rust/60 hover:bg-rust-deep/20 font-mono text-[10px] uppercase tracking-widest-2 text-bone transition-colors"
          >
            watch file
            <span className="transition-transform group-hover/btn:translate-x-1">→</span>
          </Link>
          <span className="mono-label-sm">
            ◼ contains flicker · low-band audio
          </span>
        </div>
      </div>
    </motion.article>
  )
}

function Meta({ label, value, className = '' }) {
  return (
    <div className="flex flex-col gap-1">
      <span className="mono-label-sm">{label}</span>
      <span className={`text-bone tabular-nums ${className}`}>{value}</span>
    </div>
  )
}

// Abstract poster "art" drawn entirely with layered gradients + radial — cinematic, not photographic.
function PosterArt() {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 80% 60% at 50% 85%, rgba(160,29,29,0.35) 0%, rgba(10,10,10,0.95) 60%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(10,10,10,0) 0%, rgba(10,10,10,0.8) 100%), repeating-linear-gradient(90deg, rgba(255,255,255,0.02) 0 2px, transparent 2px 6px)',
        }}
      />
      {/* architectural "hallway" */}
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 800 500"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <radialGradient id="halo" cx="50%" cy="80%" r="60%">
            <stop offset="0%" stopColor="#a01d1d" stopOpacity="0.35" />
            <stop offset="60%" stopColor="#050505" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#1a1a1a" />
            <stop offset="1" stopColor="#080808" />
          </linearGradient>
        </defs>
        <rect width="800" height="500" fill="url(#wall)" />
        <polygon points="400,500 0,500 180,180 400,230" fill="#050505" opacity="0.9" />
        <polygon points="400,500 800,500 620,180 400,230" fill="#050505" opacity="0.9" />
        <line x1="180" y1="180" x2="0" y2="500" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="620" y1="180" x2="800" y2="500" stroke="#2a2a2a" strokeWidth="1" />
        <rect x="380" y="210" width="40" height="110" fill="#0a0a0a" stroke="#3a3a3a" strokeWidth="0.6" />
        <rect x="0" y="0" width="800" height="500" fill="url(#halo)" />
        {/* ghost silhouette */}
        <g opacity="0.5">
          <ellipse cx="400" cy="290" rx="14" ry="18" fill="#e8e6e1" />
          <rect x="388" y="306" width="24" height="44" fill="#e8e6e1" />
        </g>
      </svg>
    </div>
  )
}
