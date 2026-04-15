import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SystemBadge from '@/components/SystemBadge'
import SectionHeading from '@/components/SectionHeading'
import RedactedTextBlock from '@/components/RedactedTextBlock'
import TextGlitch from '@/components/TextGlitch'

const CHAPTERS = [
  {
    code: '01',
    title: 'Before the archive existed, the archive was writing itself.',
    body: 'IT STILL LURKS began as an independent cell tasked with reviewing surveillance footage from buildings nobody could agree were still standing. The cell was not commissioned. The cell did not report to anyone. The footage kept arriving anyway.',
  },
  {
    code: '02',
    title: 'We operate without a verified client.',
    body: 'Operators rotate every twenty-eight days. None of them remain in the same building they started in. None of them can agree on who first assigned them to the project. The signal continues.',
    redacted: true,
  },
  {
    code: '03',
    title: 'We do not manufacture fear. We recover it.',
    body: 'We do not stage any of the footage we publish. We do not use actors, props, or generative tools to create the content of our episodes. What you see has been on a hard drive, a tape, a dispatch file, or a witness drawing — until we found it.',
  },
  {
    code: '04',
    title: 'We are not sure what we are documenting.',
    body: 'Every operator eventually reaches the same conclusion: the records are pointing at something, and the something is aware. The archive does not frighten us because it contains dangerous material. The archive frightens us because the material keeps getting closer.',
    redacted: true,
  },
  {
    code: '05',
    title: 'The archive is still taking submissions.',
    body: 'If you have recorded something you cannot explain — if your room sounds wrong, if a hallway leads to a door you do not remember installing, if the footage on your phone contains a minute you did not shoot — we will open a file for it.',
  },
]

export default function Lore() {
  return (
    <>
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 pt-36 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-wrap gap-3">
            <SystemBadge>◼ manifest · cell 07</SystemBadge>
            <SystemBadge tone="info">revision 11</SystemBadge>
            <SystemBadge tone="warn">classified until witnessed</SystemBadge>
          </div>

          <h1 className="font-display font-extrabold italic text-display-xl leading-[0.86] tracking-[-0.04em] text-bone text-balance max-w-5xl">
            <TextGlitch as="span">We did not create the archive.</TextGlitch>
            <br />
            <TextGlitch as="span" className="text-rust-bright">We inherited it.</TextGlitch>
          </h1>

          <p className="max-w-2xl text-lg text-ash-200/80 leading-relaxed text-pretty">
            This is not a statement of purpose. It is a statement of what is still happening. If you
            are reading this page, you are a witness to the project. Some of you will be contacted.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-10 mt-32 md:mt-40">
        <div className="flex flex-col gap-24">
          {CHAPTERS.map((c, i) => (
            <motion.article
              key={c.code}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 1, delay: 0.05, ease: [0.19, 1, 0.22, 1] }}
              className="relative grid md:grid-cols-[auto_1fr] gap-10 md:gap-16 items-start border-t border-white/[0.06] pt-12"
            >
              <div className="flex md:flex-col md:gap-4 items-center md:items-start gap-4">
                <span className="font-display text-7xl md:text-8xl text-bone/20 leading-none tabular-nums">
                  {c.code}
                </span>
                <span className="mono-label">{i === CHAPTERS.length - 1 ? 'the invitation' : 'chapter'}</span>
              </div>
              <div>
                <h2 className="font-display text-3xl md:text-5xl leading-[0.98] text-bone text-balance max-w-2xl">
                  {c.title}
                </h2>
                <div className="mt-6 max-w-2xl text-base md:text-lg text-ash-200/80 leading-relaxed text-pretty">
                  {c.redacted ? <RedactedTextBlock text={c.body} intensity={0.22} /> : <p>{c.body}</p>}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-10 mt-40">
        <div className="relative border border-white/[0.08] p-10 md:p-16 bg-white/[0.012]">
          <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none" />
          <div className="relative">
            <SectionHeading
              eyebrow="operating principle"
              title="We publish until the archive refuses us."
              caption="When the archive begins returning records we did not upload, we retire the cell and begin a new cycle. Cycle II began on 14.11.2025. It is ongoing."
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1200px] px-5 md:px-10 mt-24">
        <Link
          to="/lore/ledger"
          className="group relative block border border-rust/40 bg-rust-deep/10 hover:bg-rust-deep/20 p-8 md:p-10 transition-colors overflow-hidden"
        >
          <div className="absolute inset-0 bg-scanlines opacity-40 pointer-events-none" />
          <div className="relative grid md:grid-cols-[1fr_auto] gap-8 items-center">
            <div>
              <span className="mono-label text-rust-bright">◼ classified archive file · L-001</span>
              <h3 className="mt-5 font-display text-3xl md:text-4xl text-bone leading-[1] text-balance max-w-xl">
                The Ledger of Unseen Persistence
              </h3>
              <p className="mt-4 max-w-xl text-ash-200/80 text-sm md:text-base leading-relaxed">
                Long-form manuscript. Operators only. Reading this document is monitored by the
                cell. Proceed with caution — the document is aware of who is reading it.
              </p>
            </div>
            <span className="inline-flex items-center gap-3 px-5 py-3 border border-rust hover:bg-rust-bright hover:text-bone font-mono text-[11px] uppercase tracking-widest-2 text-rust-bright transition-colors">
              open manuscript
              <span className="transition-transform group-hover:translate-x-1">→</span>
            </span>
          </div>
        </Link>
      </section>
    </>
  )
}
