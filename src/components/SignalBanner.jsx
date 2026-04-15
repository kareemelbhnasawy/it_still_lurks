import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function SignalBanner() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="relative overflow-hidden border-y border-white/[0.06] bg-white/[0.012]"
    >
      <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none" />
      <div
        aria-hidden
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse 60% 100% at 50% 50%, rgba(122,26,26,0.1) 0%, transparent 60%)',
        }}
      />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 py-16 md:py-24">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-12 lg:gap-20 items-end">
          <div>
            <span className="mono-label">◼ directive · operators only</span>
            <h2 className="mt-6 font-display text-display-md text-bone leading-[0.95] text-balance">
              If you have seen something that refuses to leave, <em className="not-italic text-rust-bright/80">we need the footage.</em>
            </h2>
            <p className="mt-6 max-w-xl text-ash-200/75 leading-relaxed text-pretty">
              We do not publish names. We do not confirm findings. We receive, we catalog, and — if the
              record stabilises — we let the archive decide what to do with it.
            </p>
          </div>

          <div className="flex flex-col gap-4 items-start lg:items-end">
            <Link
              to="/report"
              className="group inline-flex items-center gap-3 px-6 py-4 border border-white/[0.15] hover:border-rust/60 hover:bg-rust-deep/15 transition-colors font-mono text-[11px] uppercase tracking-widest-2 text-bone"
            >
              <span className="h-1 w-1 bg-rust-bright animate-pulse-soft" />
              Submit Evidence
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </Link>
            <span className="mono-label-sm">◼ encrypted · routes through cell 07</span>
          </div>
        </div>
      </div>
    </motion.section>
  )
}
