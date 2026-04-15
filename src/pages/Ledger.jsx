import { useCallback, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SystemBadge from '@/components/SystemBadge'
import TextGlitch from '@/components/TextGlitch'
import AnomalyImage from '@/components/AnomalyImage'
import VolatileRedaction from '@/components/VolatileRedaction'
import LiveSensorMetrics from '@/components/LiveSensorMetrics'
import FalseHopeButton from '@/components/FalseHopeButton'
import { useInfection } from '@/context/InfectionContext'

export default function Ledger() {
  const { bump, level } = useInfection()
  const escalationArmed = useRef(false)

  // Bump to level 2 either on deep scroll OR after ~45s dwell (whichever first).
  useEffect(() => {
    if (level >= 2) return
    escalationArmed.current = true
    const timer = setTimeout(() => {
      if (escalationArmed.current) bump(2)
    }, 45000)
    return () => {
      escalationArmed.current = false
      clearTimeout(timer)
    }
  }, [bump, level])

  const onProxBreach = useCallback(() => {
    bump(2)
    escalationArmed.current = false
  }, [bump])

  return (
    <>
      {/* header */}
      <section className="relative mx-auto max-w-[1400px] px-5 md:px-10 pt-36 md:pt-44">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col gap-10"
        >
          <Link
            to="/lore"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-2 text-ash-300 hover:text-bone transition-colors w-max"
          >
            ← personnel briefing
          </Link>

          <div className="flex flex-wrap gap-3">
            <SystemBadge tone="corrupted">◼ classified · operators only</SystemBadge>
            <SystemBadge tone="info">manuscript · rev 11</SystemBadge>
            <SystemBadge tone="warn">dwell is monitored</SystemBadge>
          </div>

          <div>
            <span className="mono-label">◼ archive file · L-001</span>
            <h1 className="mt-6 font-display text-display-xl leading-[0.88] tracking-[-0.035em] text-bone text-balance max-w-5xl">
              <TextGlitch as="span">The Ledger of Unseen Persistence</TextGlitch>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-ash-200/80 leading-relaxed text-pretty">
              The following document was assembled from fragments recovered across eleven operators
              and two discontinued signal cells. It has been read before. It has not been
              understood.
            </p>
          </div>
        </motion.div>
      </section>

      {/* main two-column layout */}
      <section className="mx-auto max-w-[1400px] px-5 md:px-10 mt-16 md:mt-20">
        <div className="grid lg:grid-cols-[1fr_320px] gap-12 lg:gap-16 items-start">
          <article className="prose-ledger flex flex-col gap-20">
            {/* Chapter I */}
            <Chapter
              number="I."
              title="The Origin of the Signal"
              lead="Nineteen years ago the archive received a transmission it had not recorded. It arrived on a frequency the transmitter did not possess. Operator notes from the first night describe it as &ldquo;a voice that is trying to agree with us.&rdquo;"
            >
              <p>
                We have never succeeded in sourcing the signal. It does not originate from an
                antenna, nor from a building, nor from a body. Our best instruments locate it{' '}
                <VolatileRedaction reveal="inside the listener" /> — which is to say, nowhere the
                listener can walk away from.
              </p>
              <p>
                Every cell tasked with mapping the signal has concluded that the signal is not
                broadcasting information. The signal is{' '}
                <VolatileRedaction reveal="measuring us" />.
              </p>

              <AnomalyImage
                className="my-10 aspect-[16/9]"
                frame
              >
                <LedgerPlate variant="hallway" label="PL-001 · corridor reconstruction" />
              </AnomalyImage>

              <p>
                It is the position of this cell that the signal began long before the archive
                existed. The archive was built to catch it. The archive was built{' '}
                <VolatileRedaction reveal="by it" />.
              </p>
            </Chapter>

            {/* Chapter II */}
            <Chapter
              number="II."
              title={<TextGlitch>Behavioral Manifestation</TextGlitch>}
              lead="The signal produces a physical effect wherever it settles. This effect is consistent across geographically unrelated sites, across cultures, across operator cells that never met. We will describe it once."
            >
              <p>
                Witnesses describe a corridor that is longer on the inside than on the outside.
                They describe a voice that answers the phone before the phone rings. They describe
                a relative whose name they{' '}
                <VolatileRedaction reveal="no longer remember forgetting" />.
              </p>
              <p>
                Each witness believes themselves to be the first and only person affected. They are
                rarely the first. They are never the only.
              </p>

              <blockquote className="not-italic border-l-2 border-rust/50 pl-6 my-10 max-w-2xl">
                <p className="font-display text-2xl md:text-3xl text-bone leading-[1.1] text-balance">
                  &ldquo;The walls began to breathe. That was not the frightening part. The frightening
                  part was that the walls seemed to be breathing{' '}
                  <VolatileRedaction reveal="in time with me" />.&rdquo;
                </p>
                <span className="mt-4 block mono-label">◼ witness K. · recovered audio · 2024.11.07</span>
              </blockquote>

              <p>
                Behavioral manifestation intensifies when the subject is documenting it. The
                archive has long held that observation alone is sufficient to feed the signal. For
                this reason, reading this document will place you under a form of{' '}
                <VolatileRedaction reveal="passive observation" />.
              </p>
            </Chapter>

            {/* Chapter III */}
            <Chapter
              number="III."
              title="Operational Directives"
              lead="If you are reading this, you have been given clearance by an operator who believes you can handle the material. That operator may no longer be reachable. Do not ask after them."
            >
              <p>
                You are required to log every instance in which you feel watched while reading
                this document. Do not trust your ability to tell the difference between{' '}
                <VolatileRedaction reveal="watched and accompanied" />.
              </p>

              <ol className="space-y-4 list-none pl-0 my-10">
                <Directive n="01" text="Do not read this document alone after 11pm local." />
                <Directive n="02" text="Do not read it out loud under any circumstance." />
                <Directive n="03" text="If the document appears to contain words it did not contain the last time you read it, stop reading and notify the cell." />
                <Directive n="04" text="If the cell does not respond, the cell has been replaced." />
              </ol>

              <p>
                Below this paragraph is a button. The button exists for operators who have
                concluded that they can no longer serve the archive, and who wish to{' '}
                <VolatileRedaction reveal="sever the signal" />. No operator has successfully used
                this button. Many have tried. The archive remembers them.
              </p>
            </Chapter>

            {/* false hope */}
            <div className="pt-16 border-t border-white/[0.08]">
              <FalseHopeButton />
            </div>
          </article>

          {/* sidebar */}
          <aside className="lg:sticky lg:top-28 flex flex-col gap-6">
            <LiveSensorMetrics onProxBreach={onProxBreach} />

            <div className="border border-white/[0.08] bg-white/[0.012] p-5">
              <span className="mono-label">◼ integrity</span>
              <ul className="mt-5 space-y-3 text-sm text-ash-200/85">
                <li className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <span>stream</span>
                  <span className="mono-label-sm text-bone">tty0</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <span>cell</span>
                  <span className="mono-label-sm text-bone">07 · nominal</span>
                </li>
                <li className="flex items-center justify-between border-b border-white/[0.05] pb-2">
                  <span>witness count</span>
                  <span className="mono-label-sm text-rust-bright tabular-nums">
                    {Math.floor(1100 + Math.random() * 40)}
                  </span>
                </li>
                <li className="flex items-center justify-between">
                  <span>infection</span>
                  <span className="mono-label-sm text-rust-bright uppercase tabular-nums">
                    level {level}
                  </span>
                </li>
              </ul>
            </div>

            <div className="border border-rust/30 bg-rust-deep/10 p-5">
              <span className="mono-label text-rust-bright">◼ advisory</span>
              <p className="mt-4 text-sm text-bone/90 leading-relaxed">
                Prolonged reading of this document has been correlated with an increase in the
                reader&rsquo;s sense of being observed. This effect is{' '}
                <VolatileRedaction reveal="not imagined" />.
              </p>
            </div>
          </aside>
        </div>
      </section>

      <div className="h-32" />
    </>
  )
}

function Chapter({ number, title, lead, children }) {
  return (
    <section className="border-t border-white/[0.08] pt-12">
      <header className="grid md:grid-cols-[auto_1fr] gap-6 md:gap-10 items-baseline mb-10">
        <span className="font-display text-6xl md:text-7xl text-bone/25 leading-none tabular-nums">
          {number}
        </span>
        <div>
          <h2 className="font-display text-4xl md:text-5xl text-bone leading-[0.98] text-balance max-w-2xl">
            {title}
          </h2>
          {lead && (
            <p
              className="mt-5 max-w-2xl text-lg text-ash-200/85 leading-relaxed text-pretty"
              dangerouslySetInnerHTML={{ __html: lead }}
            />
          )}
        </div>
      </header>
      <div className="prose-body max-w-2xl text-base md:text-[17px] text-ash-200/85 leading-[1.75] space-y-6">
        {children}
      </div>
    </section>
  )
}

function Directive({ n, text }) {
  return (
    <li className="flex items-start gap-4 border-l border-rust/40 pl-5 py-1">
      <span className="font-mono text-[10px] uppercase tracking-widest-2 text-rust-bright tabular-nums shrink-0 mt-1">
        / {n}
      </span>
      <span className="text-bone/90 leading-relaxed">{text}</span>
    </li>
  )
}

// In-page "plate" / diagram illustration, renders inside AnomalyImage base.
function LedgerPlate({ label }) {
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, #141414 0%, #070707 100%)',
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 800 450"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <defs>
          <linearGradient id="haze" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#a01d1d" stopOpacity="0.25" />
            <stop offset="1" stopColor="#070707" stopOpacity="0" />
          </linearGradient>
        </defs>
        <rect width="800" height="450" fill="#0a0a0a" />
        <polygon points="400,450 120,160 280,160 400,210" fill="#111" />
        <polygon points="400,450 680,160 520,160 400,210" fill="#111" />
        <polygon points="400,210 520,160 280,160" fill="#0a0a0a" stroke="#2a2a2a" strokeWidth="0.6" />
        <line x1="280" y1="160" x2="120" y2="160" stroke="#2a2a2a" strokeWidth="0.6" />
        <line x1="520" y1="160" x2="680" y2="160" stroke="#2a2a2a" strokeWidth="0.6" />
        <rect x="380" y="190" width="40" height="130" fill="#050505" stroke="#3a3a3a" strokeWidth="0.6" />
        <rect width="800" height="450" fill="url(#haze)" />
        <g opacity="0.55">
          <ellipse cx="400" cy="250" rx="10" ry="14" fill="#e8e6e1" />
          <rect x="392" y="262" width="16" height="30" fill="#e8e6e1" />
        </g>
      </svg>
      <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
        <span className="mono-label-sm text-ash-300">{label}</span>
        <span className="mono-label-sm text-ash-500">plate · recovered</span>
      </div>
    </div>
  )
}
