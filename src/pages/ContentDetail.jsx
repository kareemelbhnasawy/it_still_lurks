import { useParams, Link, Navigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import SystemBadge from '@/components/SystemBadge'
import ContentMeta from '@/components/ContentMeta'
import ContentGrid from '@/components/ContentGrid'
import RedactedTextBlock from '@/components/RedactedTextBlock'
import LogRow from '@/components/LogRow'
import TextGlitch from '@/components/TextGlitch'
import { getEpisodeBySlug, getRelatedEpisodes, LOGS, FEATURED } from '@/data/mockData'
import { formatTimestamp } from '@/utils/format'

export default function ContentDetail() {
  const { slug } = useParams()
  const episode = getEpisodeBySlug(slug)

  if (!episode) return <Navigate to="/404" replace />

  // Fallback full copy for non-featured episodes
  const item = {
    ...FEATURED,
    ...episode,
  }

  const meta = [
    { label: 'code', value: item.code },
    { label: 'runtime', value: item.runtime },
    { label: 'aired', value: formatTimestamp(item.airDate).split(' ·')[0] },
    { label: 'region', value: item.region },
  ]

  const related = getRelatedEpisodes(slug, 3)

  return (
    <>
      {/* hero media */}
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 pt-32 md:pt-36">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col gap-8"
        >
          <Link
            to="/watch"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-2 text-ash-300 hover:text-bone transition-colors"
          >
            ← all episodes
          </Link>

          <div className="flex flex-wrap gap-3">
            <SystemBadge tone="warn">● rec</SystemBadge>
            <SystemBadge>{item.code}</SystemBadge>
            <SystemBadge tone="info">{item.region}</SystemBadge>
            <SystemBadge dot={false}>{item.runtime}</SystemBadge>
          </div>

          <h1 className="font-display font-extrabold italic text-display-xl text-bone leading-[0.86] tracking-[-0.04em] text-balance max-w-5xl">
            <TextGlitch as="span">{item.title}</TextGlitch>
          </h1>

          <p className="max-w-2xl text-lg text-ash-200/80 leading-relaxed text-pretty">
            {item.tagline || item.summary}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.3, delay: 0.2 }}
          className="mt-14 relative aspect-[16/9] overflow-hidden border border-white/[0.08]"
        >
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(ellipse at 50% 70%, rgba(160,29,29,0.35) 0%, rgba(10,10,10,0.95) 60%)',
            }}
          />
          <div className="absolute inset-0 bg-scanlines opacity-60" />
          <div className="absolute top-4 left-4 font-mono text-[10px] uppercase tracking-widest-2 text-bone">
            ◼ {item.code} · {item.region}
          </div>
          <div className="absolute top-4 right-4 font-mono text-[10px] uppercase tracking-widest-2 text-rust-bright">
            ● live · rec
          </div>
          <div className="absolute bottom-4 left-4 font-mono text-[10px] uppercase tracking-widest-2 text-ash-300 tabular-nums">
            00:00 / {item.runtime}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              type="button"
              className="group relative size-24 inline-flex items-center justify-center rounded-full border border-white/[0.2] backdrop-blur-sm bg-void/30 hover:border-rust/60 transition-colors"
              aria-label={`Play ${item.title}`}
            >
              <span className="font-mono text-[11px] uppercase tracking-widest-2 text-bone">play</span>
              <span className="absolute inset-0 rounded-full border border-white/[0.08] animate-pulse-soft" />
            </button>
          </div>
          <div className="absolute inset-0 vignette" />
        </motion.div>
      </section>

      {/* forensic stats row */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1 }}
          className="grid sm:grid-cols-2 lg:grid-cols-4 border border-white/[0.08]"
        >
          <ForensicStat label="integrity" value="94.2%" tone="warn" sub="thermographic anomaly detected" />
          <ForensicStat label="threat class" value="CRIT" tone="danger" sub="class-b manifestation" />
          <ForensicStat label="containment" value="OPEN" tone="info" sub="quarantine cell · 07" />
          <ForensicStat label="operators lost" value="[REDACTED]" tone="default" sub="cycle ii · total" />
        </motion.div>
      </section>

      {/* summary + meta + warnings */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-24">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-16 items-start">
          <div>
            <span className="mono-label">◼ case summary</span>
            <div className="mt-6 space-y-6 max-w-2xl text-lg text-ash-200/85 leading-relaxed text-pretty">
              <p>
                {item.summary ||
                  'Recovered surveillance and testimony. Compiled into a single transmission. The archive has not yet decided whether it is finished with this record.'}
              </p>
              <p>
                Cross-referenced against eleven prior recordings from the same region. The subject
                does not appear consistently in any single frame, but their silhouette is visible in
                the temporal average of the footage.
              </p>
              <RedactedTextBlock
                text="Operator notes from the final night describe an ambient audio signal at eleven breaths per minute that does not correlate with any living subject on-site. Review is ongoing and the recording cell has requested the file be held for an additional quarantine window."
                intensity={0.25}
                className="text-ash-200/70"
              />
            </div>
          </div>

          <div className="lg:sticky lg:top-28 flex flex-col gap-10">
            <div className="border border-white/[0.08] p-6 bg-white/[0.012]">
              <span className="mono-label">◼ file header</span>
              <div className="mt-6">
                <ContentMeta items={meta} />
              </div>
            </div>

            <div>
              <span className="mono-label">◼ viewer advisory</span>
              <ul className="mt-5 flex flex-col gap-3">
                {(item.warnings || ['flicker', 'low frequency audio', 'prolonged silence']).map((w) => (
                  <li
                    key={w}
                    className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-widest-2 text-bone"
                  >
                    <span className="size-1 bg-rust-bright" />
                    {w}
                  </li>
                ))}
              </ul>
            </div>

            <div className="border border-white/[0.08] p-6 bg-white/[0.012]">
              <span className="mono-label">◼ linked archive entries</span>
              <ul className="mt-5 space-y-3">
                <LinkedRow code="AF-001" label="Incident 042 — Stairwell B" />
                <LinkedRow code="AF-002" label="Intercom — Unit 1107" />
                <LinkedRow code="AF-007" label="The Quiet Floor — Master" />
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* transcript feed */}
      <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-32">
        <div className="grid lg:grid-cols-[1fr_1.5fr] gap-16">
          <div>
            <span className="mono-label">◼ transcript · excerpt</span>
            <h2 className="mt-6 font-display text-3xl md:text-4xl text-bone leading-tight text-balance max-w-md">
              What the microphones caught.
            </h2>
            <p className="mt-5 max-w-md text-ash-200/75 leading-relaxed text-pretty">
              The feed below is the last minute the archive has been willing to publish. Portions are
              redacted because publishing them makes the recording unsafe to watch.
            </p>
          </div>
          <div className="border border-white/[0.08] bg-white/[0.012] p-6 md:p-7">
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.06]">
              <span className="mono-label">◼ transcript · 03:14 — 03:15</span>
              <span className="mono-label-sm tabular-nums">len 00:27</span>
            </div>
            {LOGS.map((log, i) => (
              <LogRow key={`${log.t}-${i}`} log={log} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* related */}
      {related.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-32">
          <ContentGrid items={related} title="related entries" />
        </section>
      )}
    </>
  )
}

function ForensicStat({ label, value, tone, sub }) {
  const toneCls =
    tone === 'danger'
      ? 'text-rust-bright'
      : tone === 'warn'
      ? 'text-bone'
      : tone === 'info'
      ? 'text-signal'
      : 'text-bone'
  return (
    <div className="relative p-6 md:p-8 border-b sm:border-b-0 sm:border-r last:border-r-0 border-white/[0.06] bg-white/[0.012]">
      <div className="flex items-start justify-between mb-4">
        <span className="mono-label-sm">◼ {label}</span>
        {tone === 'danger' && <span className="size-1.5 bg-rust-bright animate-pulse-soft" />}
      </div>
      <div className={`font-display text-4xl md:text-5xl tabular-nums leading-none ${toneCls}`}>
        {value}
      </div>
      <div className="mt-3 font-mono text-[10px] uppercase tracking-widest-2 text-ash-400">
        {sub}
      </div>
    </div>
  )
}

function LinkedRow({ code, label }) {
  return (
    <li className="flex items-center justify-between gap-4 py-2 border-b border-white/[0.05] last:border-0">
      <div className="flex items-center gap-3 min-w-0">
        <span className="size-1 bg-rust-bright shrink-0" />
        <span className="font-mono text-[11px] uppercase tracking-widest-2 text-ash-300">{code}</span>
        <span className="text-bone text-sm truncate">{label}</span>
      </div>
      <Link
        to="/archive"
        className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-400 hover:text-rust-bright transition-colors shrink-0"
      >
        open
      </Link>
    </li>
  )
}
