import { motion } from 'framer-motion'
import SystemBadge from '@/components/SystemBadge'
import ReportForm from '@/components/ReportForm'
import TextGlitch from '@/components/TextGlitch'

export default function Report() {
  return (
    <>
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 pt-36 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-20 items-end"
        >
          <div className="flex flex-col gap-8">
            <div className="flex flex-wrap gap-3">
              <SystemBadge tone="warn">◼ encrypted intake</SystemBadge>
              <SystemBadge tone="info">cell 07 · open</SystemBadge>
            </div>
            <h1 className="font-display font-extrabold italic text-display-lg text-bone leading-[0.9] tracking-[-0.03em] text-balance max-w-4xl">
              <TextGlitch as="span">Submit</TextGlitch>{' '}
              <TextGlitch as="span" className="text-rust-bright">evidence.</TextGlitch>
              <br />
              <TextGlitch as="span">Join the signal.</TextGlitch>
            </h1>
            <p className="max-w-2xl text-ash-200/80 text-lg leading-relaxed text-pretty">
              You are about to enter an evidence intake. Everything you type is held in a queue and
              reviewed by an operator who is not employed by any known agency. This is not a
              customer support form. This is a record you are creating for the archive.
            </p>
          </div>

          <ul className="space-y-4">
            <Principle code="01" text="Do not embellish. Submit exactly what you witnessed." />
            <Principle code="02" text="Do not retract. The record is saved the moment you transmit it." />
            <Principle code="03" text="Do not expect a reply. Some operators are no longer reachable." />
          </ul>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-10 mt-20 md:mt-28">
        <div className="border border-white/[0.08] p-6 md:p-12 bg-white/[0.012]">
          <ReportForm />
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-10 mt-24">
        <div className="grid md:grid-cols-3 gap-6">
          <Channel
            code="01"
            label="Direct signal"
            value="signal@it-still-lurks.archive"
            note="encrypted · checked every 14 days"
          />
          <Channel
            code="02"
            label="Dead drop"
            value="P.O. Box 1107 · unknown"
            note="operator will retrieve within the cycle"
          />
          <Channel
            code="03"
            label="Frequency"
            value="11.07 MHz · odd hours UTC"
            note="broadcast if you hear a voice that is not yours"
          />
        </div>
      </section>
    </>
  )
}

function Principle({ code, text }) {
  return (
    <li className="flex items-start gap-4 border-l border-white/[0.08] pl-5">
      <span className="font-mono text-[10px] uppercase tracking-widest-2 text-rust-bright tabular-nums">
        / {code}
      </span>
      <p className="text-bone/90 text-sm md:text-base leading-relaxed max-w-sm">{text}</p>
    </li>
  )
}

function Channel({ code, label, value, note }) {
  return (
    <div className="p-6 border border-white/[0.08] bg-white/[0.012]">
      <div className="flex items-center justify-between">
        <span className="mono-label">◼ {label}</span>
        <span className="font-display text-2xl text-bone/30 tabular-nums">{code}</span>
      </div>
      <p className="mt-4 font-mono text-sm text-bone break-all">{value}</p>
      <p className="mt-3 text-xs text-ash-300 leading-relaxed">{note}</p>
    </div>
  )
}
