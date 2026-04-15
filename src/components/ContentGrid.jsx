import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import SystemBadge from './SystemBadge'
import { STATUS } from '@/data/mockData'

export default function ContentGrid({ items, title }) {
  return (
    <div>
      {title && <span className="mono-label">◼ {title}</span>}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
        {items.map((item, i) => (
          <ContentCard key={item.id} item={item} index={i} />
        ))}
      </div>
    </div>
  )
}

function ContentCard({ item, index }) {
  const isCorrupted = item.status === STATUS.CORRUPTED
  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.9, delay: Math.min(index, 8) * 0.06, ease: [0.19, 1, 0.22, 1] }}
    >
      <Link
        to={`/watch/${item.slug}`}
        className="group relative block"
      >
        <div className="relative aspect-[4/5] overflow-hidden bg-void-600 border border-white/[0.06] group-hover:border-white/[0.16] transition-colors duration-500">
          <CardArt variant={index % 4} corrupted={isCorrupted} />

          <div className="absolute inset-0 bg-gradient-to-t from-void via-void/40 to-transparent" />
          <div className="absolute inset-0 bg-scanlines opacity-40" />

          <div className="absolute top-4 left-4 right-4 flex items-start justify-between gap-3">
            <SystemBadge dot={false}>{item.code}</SystemBadge>
            {isCorrupted && <SystemBadge tone="corrupted" dot={false}>▓ corrupted</SystemBadge>}
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3">
            <span className="font-mono text-[10px] uppercase tracking-widest-2 text-bone tabular-nums">
              {item.runtime}
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-300">
              {item.region}
            </span>
          </div>

          {/* play pill */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <span className="flex items-center gap-2 px-4 py-2 border border-white/[0.2] bg-void/60 backdrop-blur-sm font-mono text-[10px] uppercase tracking-widest-2 text-bone">
              <span className="h-1 w-1 bg-rust-bright" />
              open file
            </span>
          </div>
        </div>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="font-display text-xl md:text-2xl text-bone leading-[1.1] group-hover:text-rust-bright transition-colors duration-500">
              {item.title}
            </h3>
            <p className="mt-2 text-sm text-ash-200/70 line-clamp-2 max-w-[32ch]">{item.tagline}</p>
          </div>
          <span className="mt-1 font-mono text-[10px] uppercase tracking-widest-2 text-ash-500 group-hover:text-bone transition-colors whitespace-nowrap">
            {item.airDate.slice(0, 7).replace('-', '.')}
          </span>
        </div>
      </Link>
    </motion.article>
  )
}

function CardArt({ variant = 0, corrupted = false }) {
  const palettes = [
    ['#1a1a1a', '#7a1a1a'],
    ['#141414', '#3a4550'],
    ['#101010', '#4a0f0f'],
    ['#0b0b0b', '#2a2a2a'],
  ]
  const [bg, accent] = palettes[variant] || palettes[0]

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(180deg, ${bg} 0%, #070707 100%)`,
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 60% 50% at 50% 70%, ${accent}55 0%, transparent 60%)`,
        }}
      />
      {/* skeletal architecture */}
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 400 500" preserveAspectRatio="xMidYMid slice">
        <line x1="0" y1="380" x2="400" y2="380" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="60" y1="0" x2="60" y2="500" stroke="#1e1e1e" strokeWidth="1" strokeDasharray="2 6" />
        <line x1="340" y1="0" x2="340" y2="500" stroke="#1e1e1e" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="200" cy="260" r="1.5" fill="#e8e6e1" opacity="0.6" />
        <text x="16" y="22" fill="#6a6a6a" fontFamily="monospace" fontSize="9">
          ◼ REC
        </text>
        <text x="340" y="22" fill="#6a6a6a" fontFamily="monospace" fontSize="9" textAnchor="end">
          {String(Math.floor(Math.random() * 999)).padStart(3, '0')}
        </text>
      </svg>

      {corrupted && (
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(160,29,29,0.12) 0 2px, transparent 2px 5px)',
          }}
        />
      )}
    </div>
  )
}
