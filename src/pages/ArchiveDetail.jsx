import { Link, Navigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import SystemBadge from '@/components/SystemBadge'
import TextGlitch from '@/components/TextGlitch'
import SectionHeading from '@/components/SectionHeading'
import ArchiveCard from '@/components/ArchiveCard'
import AnomalyImage from '@/components/AnomalyImage'
import RedactedTextBlock from '@/components/RedactedTextBlock'
import VolatileRedaction from '@/components/VolatileRedaction'
import { getArchiveById, getRelatedArchive, STATUS } from '@/data/mockData'
import { formatTimestamp } from '@/utils/format'

const DETAIL_MAP = {
  'af-001': {
    lead:
      'Recovered from stairwell surveillance after two residents reported hearing someone descend past the ground floor without ever reaching the lobby.',
    findings: [
      'The subject enters frame on floor 12 and descends at a normal walking pace. Camera feeds on floors 11, 10, and 9 confirm the same footsteps but do not agree on the same body.',
      'Timecode drift begins exactly seven seconds after the subject disappears below the lower landing. The archive has preserved the drift but not the missing movement.',
      'Operators flagged the stairwell rails as visibly flexing inward toward the subject, as if the architecture were bracing for impact that never arrived.',
    ],
    evidence: 'Motion path overlay indicates a descent of 34.8 vertical metres inside a structure with only 11 documented floors.',
    pullQuote: 'The stairwell kept accepting footsteps after the person was gone.',
    transcript: [
      '03:14:02 · cam_12b · subject enters frame carrying grocery bag',
      '03:14:14 · cam_11b · footsteps audible, no body visible',
      '03:14:21 · cam_10b · handrail displacement recorded without source',
      '03:14:27 · system note · floor index falls below mapped structure',
    ],
  },
  'af-002': {
    lead:
      'Audio transcript assembled from a residential intercom line that answered before the tenant placed a hand on the handset.',
    findings: [
      'The responding voice uses the resident name, apartment number, and previous sleep schedule before the resident identifies themself.',
      'Acoustic analysis shows the second speaker is being generated inside the handset cavity rather than transmitted over a phone line.',
      'Transcript corruption begins when the resident asks who gave the caller access to unit 1107.',
    ],
    evidence: 'Spectral residue at 11 breaths per minute persists underneath every spoken line.',
    pullQuote: 'It answered me with a version of my own voice that had already been afraid.',
    transcript: [
      '00:00:02 · resident lifts handset',
      '00:00:03 · unknown speaker: you took too long to answer tonight',
      '00:00:19 · resident requests identity',
      '00:02:11 · transcript integrity falls below witness-safe threshold',
    ],
  },
  'af-003': {
    lead:
      'Field note submitted by Witness M. following repeated encounters with a corridor that extended past the surveyed footprint of their building.',
    findings: [
      'The witness drawing matches no licensed plan for the property, but does match the service hall orientation of a building demolished eighteen years earlier.',
      'Handwriting pressure increases substantially around the final doorway label, suggesting panic or involuntary tremor during the last minute of note-taking.',
      'Witness stopped returning calls within twelve hours of the file entering archive custody.',
    ],
    evidence: 'Paper fibre analysis found drywall dust and saline residue inconsistent with the witness home environment.',
    pullQuote: 'I kept walking because the hallway looked like it was trying to end.',
    transcript: [
      '17:02 · note received through dead drop',
      '17:11 · scan reveals overdrawn final door frame',
      '17:26 · witness contact attempt unanswered',
      '18:04 · file marked for long-term observation',
    ],
  },
  'af-004': {
    lead:
      'Unassigned transmission recovered from a band with no approved hardware in cell inventory.',
    findings: [
      'Carrier signal appears clean until operator names are spoken. At that point, the waveform splits into two synchronized voices separated by exactly 1998 milliseconds.',
      'The archival copy contains an operator roll call that had not yet been written on the date of reception.',
      'A second pass of the recording introduces a low rustling layer not present during first review.',
    ],
    evidence: 'Clock comparison suggests the voice is responding from a point nineteen years behind local time.',
    pullQuote: 'The voice knew our old call signs and used them like it had been waiting.',
    transcript: [
      '02:41:06 · carrier lock acquired',
      '02:41:11 · unknown speaker identifies operator H by obsolete call sign',
      '02:41:38 · archive cross-reference returns year mismatch',
      '02:42:03 · signal self-terminates without fade',
    ],
  },
  'af-005': {
    lead:
      'Incident log filed after the archive returned a record to an operator before the upload action had occurred.',
    findings: [
      'The returned file contains a screen capture of the operator receiving the file itself, forming a closed loop of arrival and confirmation.',
      'Checksum values match across every loop iteration despite subtle text changes in the warning banner.',
      'The operator reported nausea and an immediate sense that the archive interface had moved one line ahead of their input.',
    ],
    evidence: 'Looped render sequence contains 17 nested captures before detail dissolves into red scanline bloom.',
    pullQuote: 'The archive replied to a question I had not asked yet.',
    transcript: [
      '03:14:07 · inbound record AF-005 accepted',
      '03:14:09 · operator confirms upload queue is empty',
      '03:14:14 · file preview shows current terminal state',
      '03:14:18 · quarantine hold applied automatically',
    ],
  },
  'af-006': {
    lead:
      'Growth anomaly associated with a sealed report bundle that expands in size without new operator input.',
    findings: [
      'Every morning the bundle increases by approximately 4.2 MB and appends one new paragraph in a voice not present in prior revisions.',
      'Files extracted from the bundle contain timestamps from future review dates and signatures from operators already rotated out.',
      'Attempts to print the bundle produce more pages than were queued in the system dialog.',
    ],
    evidence: 'Expansion rate slows when the file remains unopened for 48 hours, then accelerates after the next human review.',
    pullQuote: 'Sealing it only gave it another wall to write on.',
    transcript: [
      '11:55 · checksum locked',
      '06:04 next cycle · bundle exceeds sealed size by 4.2 MB',
      '06:05 · appended page references unopened witness statement',
      '06:07 · operator requests immediate reclassification',
    ],
  },
  'af-007': {
    lead:
      'Master composite of six surveillance nights from the eleventh floor, assembled after tenants stopped responding to welfare checks.',
    findings: [
      'Corridor geometry remains consistent for six nights, then lengthens by approximately thirteen metres on the final recording without the camera relocating.',
      'Door 1107 registers interior light fluctuation after the apartment power was physically cut by building maintenance.',
      'No human subject enters the final twenty minutes, yet occupancy sensors continue to register movement approaching the lens.',
    ],
    evidence: 'Temporal averaging reveals a standing figure fixed near the far service door in every frame of the final segment.',
    pullQuote: 'Nothing came into the hall. The hall moved toward us.',
    transcript: [
      '04:02:11 · floor feed sync stable',
      '04:16:43 · occupancy ping with no visible resident',
      '04:27:02 · hallway vanishing point migrates 13m',
      '04:41:55 · camera audio records respiration without body source',
    ],
  },
  'af-008': {
    lead:
      'Corrupted footage in which the subject cannot be isolated in any individual frame, only in the average of all frames combined.',
    findings: [
      'Frame-by-frame review shows an empty corridor after 03:14:00, but aggregate exposure resolves a body-sized negative silhouette near centre screen.',
      'Observers report seeing the silhouette in peripheral vision after closing the file.',
      'One preservation technician refused to continue after claiming the average image blinked independently.',
    ],
    evidence: 'Composite exposure resolves a figure outline only when the final twenty-nine minutes are rendered simultaneously.',
    pullQuote: 'It disappears from the recording by spreading across all of it.',
    transcript: [
      '03:14:00 · subject enters frame edge',
      '03:14:01 onwards · no discrete subject found',
      '03:28:17 · averaging pass produces humanoid silhouette',
      '03:43:00 · archive marks sequence witness-sensitive',
    ],
  },
  'af-009': {
    lead:
      'Low-band interference sample recorded during a failed scan for external carriers.',
    findings: [
      'Breath-like modulation remains constant at eleven cycles per minute regardless of receiver gain or antenna orientation.',
      'No physical source can be triangulated, but nearby operators report adjusting their own breathing to match without noticing.',
      'The sample is quiet enough to be dismissed until amplified, at which point a second frequency begins speaking underneath the respiration pattern.',
    ],
    evidence: 'Respiration cadence persists in the room for several minutes after monitors are powered down.',
    pullQuote: 'We were trying to find a signal outside us while it was teaching the room how to breathe.',
    transcript: [
      '01:09:02 · interference floor rises',
      '01:09:17 · cadence stabilises at 11/min',
      '01:10:01 · operator pulse begins matching sample',
      '01:10:38 · external source remains unresolved',
    ],
  },
  'af-010': {
    lead:
      'Witness drawing of a corridor whose proportions do not match the building where the witness claims to have seen it.',
    findings: [
      'The final doorway label, DO NOT ANSWER, appears to have been written over three earlier labels scraped from the page.',
      'Wall spacing in the drawing maps to no known floor plan in the submitted location, but aligns with unresolved corridor incidents elsewhere in the archive.',
      'Graphite density suggests the witness repeatedly darkened the far end of the hall while insisting nothing was standing there.',
    ],
    evidence: 'Corner annotations imply the corridor bends behind the viewer, completing a loop impossible in the physical site.',
    pullQuote: 'The drawing is less a map than a memory trying to stop itself.',
    transcript: [
      '19:22 · drawing logged',
      '19:31 · archive similarity engine matches prior hallway cases',
      '19:44 · door label lifted with ultraviolet pass',
      '20:03 · witness requested not to receive the scan back',
    ],
  },
  'af-011': {
    lead:
      'Audio memo left by Operator K. during routine shift turnover. A second voice begins dictating the same notes slightly ahead of the operator.',
    findings: [
      'The second voice remains 1.8 seconds ahead through the entire memo, including on lines the operator visibly hesitates over.',
      'At two points the anticipatory voice corrects details before Operator K. speaks them aloud.',
      'Post-incident interview confirms Operator K. believed someone was reading over their shoulder from inside the monitor glass.',
    ],
    evidence: 'Waveform analysis reveals the leading voice was captured before the microphone gate officially opened.',
    pullQuote: 'It was dictating me before I had decided what to say.',
    transcript: [
      '22:45:04 · memo begins',
      '22:45:21 · duplicate voice enters 1.8s ahead',
      '22:45:47 · operator abandons prepared notes',
      '22:46:12 · recording ends mid-sentence',
    ],
  },
  'af-012': {
    lead:
      'Mirror-room incident under ongoing review. The reflecting surface appears to contain a hallway not present in the unit itself.',
    findings: [
      'Photographs of room 1107 show an ordinary bathroom until the mirror is included, at which point the reflected space extends into a service corridor beyond the wall.',
      'Reflection lighting indicates movement in the hall even when the apartment remains empty.',
      'Review team requested redaction after one still appeared to replace the observer with someone standing farther back in the reflected doorway.',
    ],
    evidence: 'Mirror reflection includes architectural features belonging to the eleventh-floor corridor cluster rather than the apartment interior.',
    pullQuote: 'The mirror did not reflect the room. It reflected where the room could be taken.',
    transcript: [
      '04:41:02 · room survey begins',
      '04:41:16 · mirror plane resolves corridor geometry',
      '04:41:23 · reflected motion detected with empty room',
      '04:41:40 · review escalated to restricted handling',
    ],
  },
}

const STATUS_LABELS = {
  [STATUS.DECLASSIFIED]: 'declassified',
  [STATUS.CORRUPTED]: 'corrupted',
  [STATUS.QUARANTINED]: 'quarantined',
  [STATUS.UNVERIFIED]: 'unverified',
  [STATUS.CLASSIFIED]: 'classified',
}

const CLEARANCE_LABELS = {
  footage: 'observer tier',
  transcript: 'acoustic review',
  report: 'field intake',
  transmission: 'carrier analysis',
  incident: 'containment review',
}

export default function ArchiveDetail() {
  const { id } = useParams()
  const record = getArchiveById(id)

  if (!record) return <Navigate to="/404" replace />

  const detail = DETAIL_MAP[record.id] || {
    lead: record.excerpt,
    findings: [
      'File remains under review pending operator consensus.',
      'Secondary analysis has been deferred due to witness sensitivity.',
      'Archive notes indicate the record may not remain stable across future openings.',
    ],
    evidence: record.excerpt,
    pullQuote: 'The archive preserved enough to be concerned and not enough to be certain.',
    transcript: [
      `${formatTimestamp(record.timestamp)} · file retrieved`,
      `${formatTimestamp(record.timestamp)} · metadata cross-check initiated`,
      `${formatTimestamp(record.timestamp)} · witness-safe output prepared`,
      `${formatTimestamp(record.timestamp)} · archive hold remains active`,
    ],
  }

  const related = getRelatedArchive(record.id, 3)
  const isCorrupted = record.status === STATUS.CORRUPTED
  const isRestricted = record.status === STATUS.QUARANTINED || record.status === STATUS.CLASSIFIED
  const summaryTone = isCorrupted ? 'corrupted' : isRestricted ? 'warn' : 'info'
  const fileHeader = [
    ['file', record.code],
    ['category', record.category],
    ['region', record.region],
    ['opened', formatTimestamp(record.timestamp)],
    ['status', STATUS_LABELS[record.status]],
    ['clearance', CLEARANCE_LABELS[record.category] || 'archive review'],
  ]

  return (
    <>
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 pt-32 md:pt-40">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.05, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col gap-8"
        >
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-2 text-ash-300 hover:text-bone transition-colors w-max"
          >
            ← back to evidence locker
          </Link>

          <div className="flex flex-wrap gap-3">
            <SystemBadge tone={summaryTone}>◼ {record.code} opened</SystemBadge>
            <SystemBadge>{record.region}</SystemBadge>
            <SystemBadge tone={isCorrupted ? 'corrupted' : 'default'} dot={false}>
              {STATUS_LABELS[record.status]}
            </SystemBadge>
          </div>

          <div className="grid lg:grid-cols-[1.3fr_0.9fr] gap-10 lg:gap-16 items-end">
            <div>
              <span className="mono-label">◼ recovered dossier</span>
              <h1 className="mt-6 font-display font-extrabold italic text-display-lg text-bone leading-[0.9] tracking-[-0.035em] text-balance max-w-5xl">
                <TextGlitch as="span">{record.title}</TextGlitch>
              </h1>
              <p className="mt-6 max-w-2xl text-lg text-ash-200/80 leading-relaxed text-pretty">
                {detail.lead}
              </p>
            </div>

            <div className="border border-white/[0.08] bg-white/[0.012] p-6 md:p-7">
              <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.06]">
                <span className="mono-label">◼ access note</span>
                <span className="mono-label-sm tabular-nums">{record.code}</span>
              </div>
              <p className="text-sm text-ash-200/82 leading-relaxed">
                This file was recovered from the archive in a partially stabilised state. Portions of
                the original evidence remain suppressed because the act of replaying them has been
                correlated with repeat witness events.
              </p>
              <div className="mt-5 pt-4 border-t border-white/[0.06] flex flex-wrap gap-2">
                {record.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center px-2.5 py-1 border border-white/[0.08] font-mono text-[10px] uppercase tracking-widest-2 text-ash-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-14 md:mt-16">
        <div className="grid xl:grid-cols-[1.3fr_0.9fr] gap-10 xl:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.1 }}
            className="relative"
          >
            <AnomalyImage className="aspect-[16/9]" frame={false}>
              <ArtifactPlate record={record} />
            </AnomalyImage>
          </motion.div>

          <motion.aside
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.1, delay: 0.18 }}
            className="xl:sticky xl:top-28 space-y-6"
          >
            <div className="border border-white/[0.08] bg-white/[0.012] p-6">
              <span className="mono-label">◼ file header</span>
              <dl className="mt-5 space-y-2 font-mono text-[10px] uppercase tracking-widest-2 text-ash-300">
                {fileHeader.map(([label, value], index) => (
                  <div
                    key={label}
                    className={`flex items-baseline justify-between gap-4 ${index < fileHeader.length - 1 ? 'border-b border-white/[0.06] pb-2' : ''}`}
                  >
                    <dt>{label}</dt>
                    <dd className="text-bone tabular-nums text-right">{value}</dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="border border-rust/30 bg-rust-deep/10 p-6">
              <span className="mono-label text-rust-bright">◼ operator note</span>
              <p className="mt-4 font-display text-2xl leading-[1.08] text-bone text-balance">
                {detail.pullQuote}
              </p>
            </div>

            <div className="border border-white/[0.08] bg-white/[0.012] p-6">
              <span className="mono-label">◼ chain of custody</span>
              <ul className="mt-5 space-y-3 text-sm text-ash-200/80">
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] size-1 bg-rust-bright shrink-0" />
                  File ingested at {formatTimestamp(record.timestamp)} under silent intake.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] size-1 bg-white/30 shrink-0" />
                  Secondary review assigned to cell 07 without external client verification.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-[6px] size-1 bg-signal shrink-0" />
                  Current export is witness-safe and may differ from operator copy.
                </li>
              </ul>
            </div>
          </motion.aside>
        </div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-24">
        <div className="grid xl:grid-cols-[1.15fr_0.85fr] gap-12 xl:gap-16 items-start">
          <motion.article
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1 }}
            className="space-y-16"
          >
            <section className="border-t border-white/[0.08] pt-10">
              <SectionHeading
                eyebrow="summary extract"
                title="What this record still allows us to say."
                caption="The archive has released a partial reconstruction below. Suppressed segments remain unavailable to public witnesses."
              />
              <div className="mt-8 max-w-3xl space-y-6 text-lg text-ash-200/84 leading-relaxed text-pretty">
                <p>{record.excerpt}</p>
                {detail.findings.map((finding, index) => (
                  <p key={index}>{finding}</p>
                ))}
                {isCorrupted ? (
                  <RedactedTextBlock
                    text={`${detail.evidence} Additional witness remarks remain unstable and have been withheld until the archive can determine whether the file is repeating the event or only remembering it.`}
                    intensity={0.24}
                    className="text-ash-200/75"
                  />
                ) : (
                  <p>
                    Evidence note: <span className="text-bone">{detail.evidence}</span>
                  </p>
                )}
              </div>
            </section>

            <section className="border-t border-white/[0.08] pt-10">
              <SectionHeading
                eyebrow="telemetry excerpt"
                title="Recovered system timeline."
                caption="This timeline is assembled from operator notes, recorder stamps, and preservation logs."
              />
              <div className="mt-8 border border-white/[0.08] bg-white/[0.012]">
                {detail.transcript.map((line, index) => (
                  <div
                    key={line}
                    className={`grid grid-cols-[auto_1fr] gap-4 px-5 md:px-6 py-4 ${index < detail.transcript.length - 1 ? 'border-b border-white/[0.06]' : ''}`}
                  >
                    <span className="font-mono text-[10px] uppercase tracking-widest-2 text-rust-bright">
                      / {String(index + 1).padStart(2, '0')}
                    </span>
                    <p className="text-sm md:text-base text-bone/88 leading-relaxed">
                      {line.includes('unsafe')
                        ? <VolatileRedaction reveal={line} />
                        : line}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </motion.article>

          <motion.div
            initial={{ opacity: 0, y: 26 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 1, delay: 0.08 }}
            className="space-y-8"
          >
            <section className="border border-white/[0.08] bg-white/[0.012] p-6 md:p-8">
              <span className="mono-label">◼ containment advisory</span>
              <h2 className="mt-5 font-display text-3xl md:text-4xl text-bone leading-[1] text-balance">
                Witness-safe output is not the same thing as harmless.
              </h2>
              <ul className="mt-6 space-y-4">
                <AdvisoryRow
                  label="Exposure"
                  value={isCorrupted ? 'restricted repeat viewing' : 'single-session viewing recommended'}
                />
                <AdvisoryRow
                  label="Aftereffect"
                  value={record.region === 'NE-CORRIDOR' ? 'persistent corridor ideation' : 'auditory recall drift'}
                />
                <AdvisoryRow
                  label="Escalation"
                  value={isRestricted ? 'operator supervision required' : 'report further anomalies immediately'}
                />
              </ul>
            </section>

            <section className="border border-white/[0.08] bg-white/[0.012] p-6 md:p-8">
              <span className="mono-label">◼ release annotation</span>
              <p className="mt-5 text-base text-ash-200/80 leading-relaxed">
                Public release of this file was approved because the archive judged the record more
                dangerous when left unacknowledged than when witnessed in controlled form.
              </p>
              <p className="mt-4 text-base text-ash-200/80 leading-relaxed">
                If details here contradict a previous opening, trust the earliest version you can
                still remember.
              </p>
            </section>
          </motion.div>
        </div>
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-32">
          <SectionHeading
            eyebrow="cross-reference cluster"
            title="Nearby records the archive keeps returning to."
            caption="These files share region, symptom pattern, or chain-of-custody anomalies with the current dossier."
          />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5 md:gap-6">
            {related.map((entry, index) => (
              <ArchiveCard key={entry.id} record={entry} index={index} />
            ))}
          </div>
        </section>
      )}

      <div className="h-24 md:h-32" />
    </>
  )
}

function ArtifactPlate({ record }) {
  const hue =
    record.status === STATUS.CORRUPTED
      ? '#b22222'
      : record.category === 'transmission'
      ? '#3a4550'
      : record.category === 'report'
      ? '#78654b'
      : '#e2e2e2'

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'linear-gradient(180deg, rgba(14,14,14,1) 0%, rgba(7,7,7,1) 100%)',
        }}
      />
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 58% 44% at 50% 68%, ${hue}33 0%, transparent 65%)`,
        }}
      />

      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice">
        <rect x="0" y="0" width="800" height="450" fill="transparent" />
        <line x1="120" y1="80" x2="120" y2="370" stroke="#232323" strokeWidth="1" strokeDasharray="3 8" />
        <line x1="680" y1="80" x2="680" y2="370" stroke="#232323" strokeWidth="1" strokeDasharray="3 8" />
        <line x1="0" y1="320" x2="800" y2="320" stroke="#2a2a2a" strokeWidth="1" />
        <line x1="0" y1="112" x2="800" y2="112" stroke="#141414" strokeWidth="1" />
        <rect x="266" y="110" width="268" height="170" fill="#060606" stroke="#2e2e2e" strokeWidth="1.2" />
        <rect x="292" y="134" width="216" height="122" fill="none" stroke={hue} strokeWidth="1" strokeOpacity="0.55" />
        <circle cx="400" cy="194" r="39" fill={hue} fillOpacity="0.15" stroke={hue} strokeOpacity="0.5" />
        <ellipse cx="400" cy="194" rx="12" ry="18" fill="#e2e2e2" fillOpacity="0.85" />
        <rect x="391" y="211" width="18" height="34" fill="#e2e2e2" fillOpacity="0.68" />
        <text x="40" y="42" fill="#c8c6c6" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="3">
          {record.code} / CASE VIEW
        </text>
        <text x="760" y="42" textAnchor="end" fill={hue} fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="3">
          {record.region}
        </text>
        <text x="40" y="422" fill="#8a8a8a" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="3">
          {record.category.toUpperCase()} / WITNESS-SAFE EXPORT
        </text>
        <text x="760" y="422" textAnchor="end" fill="#8a8a8a" fontFamily="IBM Plex Mono, monospace" fontSize="10" letterSpacing="3">
          {STATUS_LABELS[record.status].toUpperCase()}
        </text>
      </svg>
    </div>
  )
}

function AdvisoryRow({ label, value }) {
  return (
    <li className="flex items-start justify-between gap-4 border-b border-white/[0.06] pb-3 last:border-0 last:pb-0">
      <span className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-400">{label}</span>
      <span className="text-right text-sm text-bone/88 max-w-[18rem]">{value}</span>
    </li>
  )
}
