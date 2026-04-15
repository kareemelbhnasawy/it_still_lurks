import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { useSystemClock } from '@/hooks/useSystemClock'
import SystemBadge from './SystemBadge'
import TextGlitch from './TextGlitch'
import WhisperHint from './WhisperHint'

const reveal = {
  hidden: { opacity: 0, y: 28, filter: 'blur(12px)' },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 1.4, delay: 0.25 + i * 0.1, ease: [0.19, 1, 0.22, 1] },
  }),
}

export default function HeroSection() {
  const { label } = useSystemClock()

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-end">
      {/* corner markers */}
      <CornerMarker position="tl" />
      <CornerMarker position="tr" />
      <CornerMarker position="bl" />
      <CornerMarker position="br" />

      {/* vessel integrity corner readout */}
      <div className="absolute bottom-24 lg:bottom-28 right-5 md:right-10 hidden lg:block text-right">
        <div className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-300 leading-[1.4]">
          coordinate sync: 40.7128° N, 74.0060° W
          <br />
          encryption level: classified_09
          <br />
          vessel integrity: <span className="text-rust-bright">14.4%</span>
          <br />
          witness count: <span className="text-rust-bright tabular-nums">1,127</span>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1600px] w-full px-5 md:px-10 pb-16 md:pb-24 pt-36">
        <motion.div
          initial="hidden"
          animate="show"
          className="flex flex-col gap-10 md:gap-14"
        >
          <motion.div variants={reveal} custom={0} className="flex flex-wrap gap-3">
            <SystemBadge tone="warn">◼ status · lurking</SystemBadge>
            <SystemBadge>archive cell 07</SystemBadge>
            <SystemBadge tone="info">uplink stable</SystemBadge>
          </motion.div>

          <motion.h1
            variants={reveal}
            custom={1}
            className="font-display font-extrabold italic text-display-xl leading-[0.86] tracking-[-0.04em] text-balance text-bone"
          >
            <TextGlitch as="span">IT STILL</TextGlitch>
            <br />
            <span className="inline-flex items-baseline gap-4 md:gap-8">
              <TextGlitch as="span" className="text-rust-bright">LURKS</TextGlitch>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.6, delay: 1.2, ease: [0.19, 1, 0.22, 1] }}
                className="hidden md:inline-block origin-left h-[3px] w-[14vw] bg-rust-bright/70 mb-6"
              />
            </span>
          </motion.h1>

          <div className="flex flex-col lg:flex-row lg:items-end gap-10 lg:gap-16">
            <motion.p
              variants={reveal}
              custom={2}
              className="max-w-md text-base md:text-lg text-ash-200/80 leading-relaxed text-pretty border-l-2 border-rust-bright pl-6 py-2"
            >
              Recovered data suggests the architectural anomalies are not static. The descent is
              permanent. The archive is waiting for your authorization.
            </motion.p>

            <motion.div variants={reveal} custom={3} className="flex flex-wrap items-start gap-0">
              <WhisperHint lockMessage="do not press this">
                <Link
                  to="/lore/ledger"
                  className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-rust-bright hover:brightness-110 active:opacity-80 text-rust-dark font-mono text-[11px] font-bold uppercase tracking-widest-2 transition-all"
                >
                  <span className="size-1 bg-rust-dark" />
                  Initialize descent
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </WhisperHint>
              <WhisperHint tone="neutral">
                <Link
                  to="/archive"
                  className="group relative inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 bg-bone hover:bg-ash-600 hover:text-bone text-void-900 font-mono text-[11px] font-bold uppercase tracking-widest-2 transition-colors"
                >
                  Enter archive
                  <span className="transition-transform group-hover:translate-x-1">→</span>
                </Link>
              </WhisperHint>
            </motion.div>
          </div>

          <motion.div
            variants={reveal}
            custom={4}
            className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-12 border-t border-white/[0.06]"
          >
            <div className="flex flex-wrap gap-x-8 gap-y-2">
              <StatLine label="records" value="412" />
              <StatLine label="declassified" value="268" />
              <StatLine label="corrupted" value="41" />
              <StatLine label="unverified" value="103" />
            </div>
            <span className="mono-label-sm tabular-nums text-ash-400">◼ uplink · {label}</span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function StatLine({ label, value }) {
  return (
    <div className="flex items-baseline gap-2">
      <span className="font-mono text-2xl md:text-3xl tabular-nums text-bone leading-none">{value}</span>
      <span className="mono-label-sm">{label}</span>
    </div>
  )
}

function CornerMarker({ position }) {
  const pos = {
    tl: 'top-20 md:top-24 left-5 md:left-10',
    tr: 'top-20 md:top-24 right-5 md:right-10',
    bl: 'bottom-8 left-5 md:left-10',
    br: 'bottom-8 right-5 md:right-10',
  }[position]
  return (
    <div aria-hidden className={`absolute ${pos} pointer-events-none text-ash-500`}>
      <span className="block h-4 w-4 border-white/[0.2] relative">
        <span className="absolute top-0 left-0 h-[1px] w-3 bg-white/20" />
        <span className="absolute top-0 left-0 h-3 w-[1px] bg-white/20" />
      </span>
    </div>
  )
}
