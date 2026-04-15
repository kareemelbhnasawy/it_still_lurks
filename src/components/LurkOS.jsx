import { motion } from 'framer-motion'
import { useSystemClock } from '@/hooks/useSystemClock'

const PROCESSES = [
  '/root/perimeter',
  '/root/decoder_reports',
  '/root/relocations',
  '/root/void_leak',
]

export default function LurkOS() {
  const { time, iso } = useSystemClock()

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
      className="relative mx-auto max-w-[1600px] px-5 md:px-10 mt-32 md:mt-40"
    >
      <div className="relative border border-white/[0.08] bg-void/60 overflow-hidden">
        <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none" />

        <div className="relative grid lg:grid-cols-[1.15fr_1fr] gap-0">
          {/* left: description */}
          <div className="p-8 md:p-12 border-b lg:border-b-0 lg:border-r border-white/[0.06]">
            <div className="flex items-center justify-between">
              <span className="mono-label">◼ lurk_os</span>
              <span className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-400">
                v4.1 · stable
              </span>
            </div>

            <h2 className="mt-6 font-display text-3xl md:text-4xl leading-[1.02] text-bone text-balance max-w-md">
              An autonomous forensic engine designed to track, catalog and eventually <em className="not-italic text-rust-bright/80">neutralise</em> ontological threats.
            </h2>

            <p className="mt-5 max-w-md text-sm text-ash-200/75 leading-relaxed text-pretty">
              Use at your own psychological risk. Operators who run this on their own machines report
              side effects ranging from missing time to recovered footage they never filmed.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                type="button"
                className="group inline-flex items-center gap-3 px-5 py-3 bg-rust-bright hover:bg-rust text-bone font-mono text-[11px] uppercase tracking-widest-2 transition-colors"
              >
                <span className="size-1 bg-bone animate-pulse-soft" />
                execute recovery
                <span className="transition-transform group-hover:translate-x-1">→</span>
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-3 px-5 py-3 border border-white/[0.12] hover:border-white/[0.3] font-mono text-[11px] uppercase tracking-widest-2 text-bone transition-colors"
              >
                read manifest
              </button>
            </div>
          </div>

          {/* right: terminal */}
          <div className="p-6 md:p-8 font-mono text-[11px] text-bone/90 flex flex-col gap-3 min-h-[320px]">
            <div className="flex items-center justify-between border-b border-white/[0.06] pb-3">
              <span className="text-ash-400 uppercase tracking-widest-2 text-[9px]">lurk_os · tty0</span>
              <span className="text-ash-500 tabular-nums">{iso} · {time}</span>
            </div>

            <TerminalLine prompt="$" text="mount /archive/cell07" status="ok" />
            <TerminalLine prompt="$" text="scan --regions all --depth 7" status="ok" />
            <TerminalLine prompt="$" text="tail -f /root/void_leak" />
            {PROCESSES.map((p, i) => (
              <TerminalLine key={p} prompt=">" text={`/proc · ${p}`} status={i === 3 ? 'warn' : 'ok'} />
            ))}
            <TerminalLine prompt=">" text="ambient_respiration 11/min · source: ∅" status="warn" />

            <div className="mt-auto pt-4 flex items-center gap-3 border-t border-white/[0.06]">
              <span className="text-rust-bright animate-pulse-soft">●</span>
              <span className="text-ash-300 uppercase tracking-widest-2 text-[9px]">
                awaiting operator input
              </span>
              <span className="ml-auto inline-block h-3 w-[2px] bg-bone animate-pulse-soft" />
            </div>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

function TerminalLine({ prompt, text, status }) {
  const color = status === 'warn' ? 'text-rust-bright' : status === 'ok' ? 'text-ash-200/80' : 'text-bone'
  return (
    <div className="flex items-start gap-3 leading-relaxed">
      <span className="text-ash-500 select-none">{prompt}</span>
      <span className={color}>{text}</span>
      {status === 'ok' && <span className="ml-auto text-signal tabular-nums text-[9px] uppercase tracking-widest-2">ok</span>}
      {status === 'warn' && <span className="ml-auto text-rust-bright text-[9px] uppercase tracking-widest-2">warn</span>}
    </div>
  )
}
