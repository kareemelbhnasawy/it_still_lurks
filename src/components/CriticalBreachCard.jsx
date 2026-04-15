import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

export default function CriticalBreachCard() {
  return (
    <motion.aside
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className="relative overflow-hidden border border-rust/40 bg-rust-deep/20"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-80 pointer-events-none"
        style={{
          background:
            'repeating-linear-gradient(135deg, rgba(160,29,29,0.12) 0 12px, transparent 12px 24px)',
        }}
      />
      <div className="absolute inset-0 bg-scanlines opacity-40 pointer-events-none" />

      <div className="relative p-8 md:p-10 grid md:grid-cols-[auto_1fr_auto] gap-8 items-center">
        <div className="flex items-center gap-4">
          <span className="relative inline-flex items-center justify-center size-12 border border-rust/60">
            <span className="absolute inset-1 border border-rust/40" />
            <span className="relative size-2 bg-rust-bright animate-pulse-soft" />
          </span>
          <div className="flex flex-col gap-0.5">
            <span className="mono-label text-rust-bright">◼ system alert</span>
            <span className="mono-label-sm tabular-nums">alert · 23:59 alpha</span>
          </div>
        </div>

        <div>
          <h3 className="font-display text-3xl md:text-4xl text-bone leading-[0.98]">
            Critical breach · cell 07
          </h3>
          <p className="mt-2 text-sm md:text-base text-bone/85 max-w-xl leading-relaxed">
            Unscheduled inbound record. Operator signature missing. Quarantine auto-engaged. Review
            required within the next eleven hours.
          </p>
        </div>

        <Link
          to="/archive"
          className="group inline-flex items-center gap-3 px-5 py-3 bg-rust-bright hover:bg-rust text-bone font-mono text-[11px] uppercase tracking-widest-2 transition-colors whitespace-nowrap"
        >
          review file
          <span className="transition-transform group-hover:translate-x-1">→</span>
        </Link>
      </div>
    </motion.aside>
  )
}
