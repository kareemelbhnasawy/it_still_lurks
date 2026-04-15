import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import AnomalyImage from './AnomalyImage'
import VolatileRedaction from './VolatileRedaction'
import { STATUS } from '@/data/mockData'
import { formatTimestamp } from '@/utils/format'
import { cn } from '@/utils/cn'

const THREAT_MAP = {
  [STATUS.DECLASSIFIED]: { label: 'elevated', tone: 'text-ash-200' },
  [STATUS.CLASSIFIED]: { label: 'unknown', tone: 'text-ash-300' },
  [STATUS.CORRUPTED]: { label: 'terminal', tone: 'text-rust-bright' },
  [STATUS.QUARANTINED]: { label: 'critical', tone: 'text-rust-bright' },
  [STATUS.UNVERIFIED]: { label: 'ambient', tone: 'text-signal' },
}

// Evidence locker card. Matches the Stitch pattern:
//   • border-left only (no full border)
//   • redacted case file name with .redaction-block span
//   • top-right "FILE: NNN-X" corner tag
//   • DATE / COORDS / THREAT mono meta rows
//   • EXTRACT_DATA bone button at the bottom
export default function ArchiveCard({ record, index = 0 }) {
  const threat = THREAT_MAP[record.status] || THREAT_MAP[STATUS.DECLASSIFIED]
  const isCorrupted = record.status === STATUS.CORRUPTED
  const redactedName = record.title.split('—').pop().trim().replace(/\s+/g, '_').toUpperCase()
  const fileTag = record.code.replace(/[^a-z0-9]/gi, '-').toUpperCase()

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.8, delay: Math.min(index, 8) * 0.05, ease: [0.19, 1, 0.22, 1] }}
      className="group relative bg-void-800 border-l-2 border-white/[0.14] hover:border-rust-bright transition-colors duration-500"
    >
      <Link to={`/archive/${record.id}`} className="block">
        {/* thumbnail */}
        <div className="relative">
          <AnomalyImage frame={false} className="aspect-video border-b border-white/[0.06]">
            <CardArt variant={index % 4} corrupted={isCorrupted} />
          </AnomalyImage>

          {/* top-right corner file tag (Stitch motif) */}
          <span className="absolute top-0 right-0 bg-bone text-void-900 font-mono text-[10px] font-bold px-2 py-1 tracking-widest-2">
            FILE: {fileTag}
          </span>

          {isCorrupted && (
            <span className="absolute top-0 left-0 bg-rust-bright text-rust-dark font-mono text-[10px] font-bold px-2 py-1 tracking-widest-2">
              ▓ corrupted
            </span>
          )}

          <div className="absolute inset-0 bg-gradient-to-t from-void to-transparent opacity-60 pointer-events-none" />
        </div>

        {/* body */}
        <div className="p-5 md:p-6">
          <h3 className="font-display font-bold text-xl md:text-2xl text-bone leading-[1.05] tracking-tight">
            CASE FILE:{' '}
            {isCorrupted ? (
              <VolatileRedaction reveal={redactedName} />
            ) : (
              <span className="redaction-block">{redactedName}</span>
            )}
          </h3>

          <dl className="mt-5 space-y-2 font-mono text-[10px] uppercase tracking-widest-2 text-ash-300">
            <MetaRow label="date" value={formatTimestamp(record.timestamp).split(' ·')[0]} />
            <MetaRow label="coords" value={record.region} />
            <MetaRow
              label="threat"
              value={<span className={cn('font-bold', threat.tone)}>{threat.label}</span>}
              noBorder
            />
          </dl>

          <div className="mt-6 w-full py-3 bg-bone text-void-900 font-mono text-[11px] font-bold uppercase tracking-widest-2 text-center group-hover:bg-rust-bright group-hover:text-rust-dark transition-colors">
            extract_data
          </div>
        </div>
      </Link>
    </motion.article>
  )
}

function MetaRow({ label, value, noBorder = false }) {
  return (
    <div
      className={cn(
        'flex justify-between items-baseline',
        !noBorder && 'border-b border-white/[0.06] pb-1.5'
      )}
    >
      <dt>{label}</dt>
      <dd className="text-bone tabular-nums">{value}</dd>
    </div>
  )
}

function CardArt({ variant = 0, corrupted = false }) {
  const palettes = [
    ['#131313', '#b22222'],
    ['#0e0e0e', '#3a4550'],
    ['#1b1b1b', '#690007'],
    ['#0e0e0e', '#2a2a2a'],
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
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
      >
        <line x1="0" y1="190" x2="400" y2="190" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="60" y1="0" x2="60" y2="260" stroke="#1e1e1e" strokeWidth="1" strokeDasharray="2 6" />
        <line x1="340" y1="0" x2="340" y2="260" stroke="#1e1e1e" strokeWidth="1" strokeDasharray="2 6" />
        <circle cx="200" cy="130" r="1.5" fill="#e2e2e2" opacity="0.6" />
      </svg>

      {corrupted && (
        <div
          className="absolute inset-0 mix-blend-overlay pointer-events-none"
          style={{
            background:
              'repeating-linear-gradient(0deg, rgba(178,34,34,0.15) 0 2px, transparent 2px 5px)',
          }}
        />
      )}
    </div>
  )
}
