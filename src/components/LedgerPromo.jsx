import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useInfection } from '@/context/InfectionContext'
import TextGlitch from './TextGlitch'
import VolatileRedaction from './VolatileRedaction'
import WhisperHint from './WhisperHint'

// Big, unmistakable entry point to /lore/ledger — the "Slow Burn" experience.
// Sits prominently on the home page so anyone can find it.
export default function LedgerPromo() {
  const { level } = useInfection()

  return (
    <motion.section
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
      className="relative mx-auto max-w-[1600px] px-5 md:px-10"
    >
      <div className="relative overflow-hidden border border-rust/40 bg-void-700">
        {/* atmospheric wash */}
        <div
          aria-hidden
          className="absolute inset-0 opacity-80 pointer-events-none"
          style={{
            background:
              'radial-gradient(ellipse 70% 90% at 20% 100%, rgba(178,34,34,0.25) 0%, transparent 60%), radial-gradient(ellipse 50% 80% at 80% 0%, rgba(58,69,80,0.18) 0%, transparent 60%)',
          }}
        />
        <div className="absolute inset-0 bg-scanlines opacity-50 pointer-events-none" />

        {/* giant watermark */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-8 -bottom-10 md:-right-16 md:-bottom-20 font-display italic font-extrabold text-[30vw] md:text-[18vw] leading-[0.78] text-rust-bright/[0.04] select-none tracking-tighter whitespace-nowrap"
        >
          LEDGER
        </div>

        <div className="relative grid lg:grid-cols-[1.35fr_1fr] gap-10 lg:gap-16 p-8 md:p-14 lg:p-20">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="mono-label text-rust-bright">◼ classified archive · L-001</span>
              <span className="h-px w-10 bg-rust-bright/60" />
              <span className="mono-label-sm">operators only</span>
            </div>

            <h2 className="mt-8 font-display font-extrabold italic text-[clamp(2.4rem,7vw,6rem)] leading-[0.9] tracking-[-0.035em] text-bone text-balance">
              <TextGlitch as="span">The Ledger</TextGlitch>
              <br />
              of <TextGlitch as="span" className="text-rust-bright">Unseen Persistence</TextGlitch>
            </h2>

            <p className="mt-8 max-w-xl text-base md:text-lg text-ash-200/85 leading-relaxed text-pretty border-l-2 border-rust-bright/60 pl-5">
              A long-form manuscript assembled from eleven operators and two decommissioned cells.
              Reading this document is monitored. The document is{' '}
              <VolatileRedaction reveal="aware of the reader" />. It has been read before. It has
              not been understood.
            </p>

            <div className="mt-10 flex flex-wrap items-start gap-0">
              <WhisperHint lockMessage="it is already reading you">
                <Link
                  to="/lore/ledger"
                  className="group relative inline-flex items-center gap-3 px-7 md:px-10 py-4 md:py-5 bg-rust-bright hover:brightness-110 active:opacity-80 text-rust-dark font-mono text-[11px] font-bold uppercase tracking-widest-2 transition-all"
                >
                  <span className="size-1.5 bg-rust-dark animate-pulse-soft" />
                  open the ledger
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </WhisperHint>
              <span className="px-6 py-4 md:py-5 bg-void-800 border border-white/[0.06] font-mono text-[10px] uppercase tracking-widest-2 text-ash-400">
                ~ 12 min · reader monitored
              </span>
            </div>
          </div>

          <aside className="relative">
            <div className="relative border border-white/[0.08] bg-void-900/60 p-6 md:p-7">
              <div className="flex items-center justify-between pb-4 mb-5 border-b border-white/[0.08]">
                <span className="mono-label text-rust-bright">◼ manuscript integrity</span>
                <span className="mono-label-sm text-rust-bright">live</span>
              </div>

              <dl className="grid grid-cols-2 gap-y-5 gap-x-4">
                <Stat label="chapters" value="III" />
                <Stat label="redactions" value="14" />
                <Stat label="cells" value="07" />
                <Stat label="rev" value="11" />
                <Stat label="witness count" value="1,127" danger />
                <Stat label="infection" value={`L${level}`} danger={level >= 2} />
              </dl>

              <div className="mt-6 pt-5 border-t border-white/[0.08] space-y-3">
                <Directive code="I" label="origin of the signal" />
                <Directive code="II" label="behavioral manifestation" />
                <Directive code="III" label="operational directives" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </motion.section>
  )
}

function Stat({ label, value, danger }) {
  return (
    <div className="flex flex-col gap-1 border-l border-white/[0.08] pl-3">
      <dt className="mono-label-sm">{label}</dt>
      <dd
        className={`font-display text-2xl md:text-3xl tabular-nums leading-none ${
          danger ? 'text-rust-bright' : 'text-bone'
        }`}
      >
        {value}
      </dd>
    </div>
  )
}

function Directive({ code, label }) {
  return (
    <div className="flex items-center justify-between gap-3 font-mono text-[10px] uppercase tracking-widest-2">
      <div className="flex items-center gap-3">
        <span className="text-rust-bright tabular-nums w-6">/ {code}</span>
        <span className="text-bone">{label}</span>
      </div>
      <span className="text-ash-500">◼</span>
    </div>
  )
}
