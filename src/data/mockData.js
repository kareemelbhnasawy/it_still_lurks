// In-world mock data for IT STILL LURKS.
// Structured so it can be swapped for a Supabase/Mux-backed API later.

export const CATEGORIES = [
  { id: 'all', label: 'All Records' },
  { id: 'footage', label: 'Footage' },
  { id: 'incident', label: 'Incident Logs' },
  { id: 'transmission', label: 'Transmissions' },
  { id: 'report', label: 'Field Reports' },
  { id: 'transcript', label: 'Transcripts' },
  { id: 'corrupted', label: 'Corrupted' },
]

export const STATUS = {
  CLASSIFIED: 'classified',
  DECLASSIFIED: 'declassified',
  CORRUPTED: 'corrupted',
  QUARANTINED: 'quarantined',
  UNVERIFIED: 'unverified',
}

export const FEATURED = {
  id: 'ep-042',
  slug: 'the-quiet-floor',
  code: 'EP · 042',
  title: 'The Quiet Floor',
  tagline: 'They stopped answering on the eleventh night.',
  summary:
    'Recovered surveillance from a residential building in the northeast corridor. Over six nights, tenants on the eleventh floor stopped responding to welfare checks. On the seventh night, something on the eleventh floor began responding in their place.',
  duration: 2634,
  airDate: '2025-11-14',
  status: STATUS.DECLASSIFIED,
  region: 'NE-CORRIDOR',
  poster: '/media/ep-042.jpg',
  runtime: '43:54',
  season: 'Cycle II',
  number: 'Episode 04',
  warnings: ['flicker', 'low frequency audio', 'extended silence'],
}

export const EPISODES = [
  {
    id: 'ep-038',
    slug: 'transmission-seven',
    code: 'EP · 038',
    title: 'Transmission 7',
    tagline: 'A voice that was never assigned a frequency.',
    runtime: '38:12',
    duration: 2292,
    airDate: '2025-10-03',
    status: STATUS.DECLASSIFIED,
    region: 'PACIFIC-NW',
    category: 'transmission',
  },
  {
    id: 'ep-039',
    slug: 'hallway-recording',
    code: 'EP · 039',
    title: 'Hallway Recording',
    tagline: 'Sixty-eight minutes of empty corridor. Something is in all of it.',
    runtime: '1:08:40',
    duration: 4120,
    airDate: '2025-10-17',
    status: STATUS.DECLASSIFIED,
    region: 'MIDWEST',
    category: 'footage',
  },
  {
    id: 'ep-040',
    slug: 'subject-lost-at-0314',
    code: 'EP · 040',
    title: 'Subject Lost at 03:14',
    tagline: 'She walked into frame and the frame did not let her leave.',
    runtime: '29:02',
    duration: 1742,
    airDate: '2025-10-31',
    status: STATUS.CORRUPTED,
    region: 'UNKNOWN',
    category: 'footage',
  },
  {
    id: 'ep-041',
    slug: 'archive-file-c-19',
    code: 'EP · 041',
    title: 'Archive File C-19',
    tagline: 'A folder that kept growing even after it was sealed.',
    runtime: '52:20',
    duration: 3140,
    airDate: '2025-11-07',
    status: STATUS.DECLASSIFIED,
    region: 'SE-BASIN',
    category: 'report',
  },
  FEATURED,
  {
    id: 'ep-043',
    slug: 'low-band-interference',
    code: 'EP · 043',
    title: 'Low-Band Interference',
    tagline: 'We are no longer certain the interference is incoming.',
    runtime: '21:17',
    duration: 1277,
    airDate: '2025-11-21',
    status: STATUS.UNVERIFIED,
    region: 'N/A',
    category: 'transmission',
  },
]

export const ARCHIVE = [
  {
    id: 'af-001',
    code: 'AF-001',
    title: 'Incident 042 — Stairwell B',
    kind: 'footage',
    category: 'footage',
    status: STATUS.DECLASSIFIED,
    timestamp: '2024-08-04T03:14:00Z',
    region: 'NE-CORRIDOR',
    excerpt:
      'Motion capture from stairwell B between floors 10 and 12. Subject descends three floors and never arrives at floor 9.',
    tags: ['stairwell', 'loop', 'eleventh'],
  },
  {
    id: 'af-002',
    code: 'AF-002',
    title: 'Residential Intercom — Unit 1107',
    kind: 'transcript',
    category: 'transcript',
    status: STATUS.CORRUPTED,
    timestamp: '2024-08-07T23:48:00Z',
    region: 'NE-CORRIDOR',
    excerpt:
      'Voice on the other end uses resident\'s name before resident has spoken. Transcript becomes unreadable after 00:02:11.',
    tags: ['audio', 'eleventh', 'quiet floor'],
  },
  {
    id: 'af-003',
    code: 'AF-003',
    title: 'Field Note — Witness M.',
    kind: 'report',
    category: 'report',
    status: STATUS.DECLASSIFIED,
    timestamp: '2024-09-12T17:02:00Z',
    region: 'MIDWEST',
    excerpt:
      'Witness M. reports a hallway that "kept going past where the building ended." Witness has since stopped responding.',
    tags: ['hallway', 'witness', 'architecture'],
  },
  {
    id: 'af-004',
    code: 'AF-004',
    title: 'Transmission 7 — Raw Feed',
    kind: 'transmission',
    category: 'transmission',
    status: STATUS.DECLASSIFIED,
    timestamp: '2024-09-19T02:41:00Z',
    region: 'PACIFIC-NW',
    excerpt:
      'Unknown carrier on an unassigned frequency. The voice identifies our operators by name. The voice is ours from 1998.',
    tags: ['radio', 'voice', 'time-misaligned'],
  },
  {
    id: 'af-005',
    code: 'AF-005',
    title: 'Log Entry — 03:14:07',
    kind: 'incident',
    category: 'incident',
    status: STATUS.QUARANTINED,
    timestamp: '2024-10-02T03:14:07Z',
    region: 'UNKNOWN',
    excerpt:
      'Operator reports that the archive returned a file they had not yet uploaded. File contained footage of the operator receiving it.',
    tags: ['paradox', 'archive', 'loop'],
  },
  {
    id: 'af-006',
    code: 'AF-006',
    title: 'Archive File C-19',
    kind: 'report',
    category: 'report',
    status: STATUS.CORRUPTED,
    timestamp: '2024-10-22T11:55:00Z',
    region: 'SE-BASIN',
    excerpt:
      'File was sealed on three separate occasions. Each morning the file had grown by an average of 4.2 MB. Nobody with access has written to it.',
    tags: ['archive', 'growth', 'corruption'],
  },
  {
    id: 'af-007',
    code: 'AF-007',
    title: 'The Quiet Floor — Master',
    kind: 'footage',
    category: 'footage',
    status: STATUS.DECLASSIFIED,
    timestamp: '2024-11-14T04:02:00Z',
    region: 'NE-CORRIDOR',
    excerpt:
      'Composite cut of six surveillance nights on the eleventh floor. Final twenty minutes contain no human activity. The hallway still moves.',
    tags: ['composite', 'eleventh', 'quiet floor'],
  },
  {
    id: 'af-008',
    code: 'AF-008',
    title: 'Subject Lost at 03:14',
    kind: 'footage',
    category: 'footage',
    status: STATUS.CORRUPTED,
    timestamp: '2024-11-22T03:14:00Z',
    region: 'UNKNOWN',
    excerpt:
      'Subject walks into frame at 03:14:00. Frame continues for 29 minutes. Subject is not visible in any individual frame, but is visible in the average of all frames.',
    tags: ['averaging', 'loss', 'presence'],
  },
  {
    id: 'af-009',
    code: 'AF-009',
    title: 'Low-Band Interference — Sample 03',
    kind: 'transmission',
    category: 'transmission',
    status: STATUS.UNVERIFIED,
    timestamp: '2024-12-01T01:09:00Z',
    region: 'N/A',
    excerpt:
      'Interference pattern resembles human respiration at approximately 11 breaths per minute. Source has not been identified. Source may not be external.',
    tags: ['breath', 'signal', 'unverified'],
  },
  {
    id: 'af-010',
    code: 'AF-010',
    title: 'Witness Drawing — The Long Hallway',
    kind: 'report',
    category: 'report',
    status: STATUS.DECLASSIFIED,
    timestamp: '2024-12-14T19:22:00Z',
    region: 'MIDWEST',
    excerpt:
      'Hand-drawn map of a corridor that does not match the building it was drawn in. Map includes a door labeled "do not answer."',
    tags: ['map', 'hallway', 'door'],
  },
  {
    id: 'af-011',
    code: 'AF-011',
    title: 'Audio Memo — Operator K.',
    kind: 'transcript',
    category: 'transcript',
    status: STATUS.QUARANTINED,
    timestamp: '2025-01-02T22:45:00Z',
    region: 'HQ',
    excerpt:
      'Operator K. dictates their shift notes. Halfway through, a second voice begins dictating the same notes slightly ahead of them.',
    tags: ['operator', 'voice', 'ahead'],
  },
  {
    id: 'af-012',
    code: 'AF-012',
    title: 'Incident 058 — The Mirror Room',
    kind: 'incident',
    category: 'incident',
    status: STATUS.CORRUPTED,
    timestamp: '2025-02-11T04:41:00Z',
    region: 'NE-CORRIDOR',
    excerpt:
      'Archive entry redacted pending review. Mirror in room 1107 reflects a hallway that does not exist in the unit.',
    tags: ['mirror', 'eleventh', 'redacted'],
  },
]

export const LOGS = [
  { t: '03:14:02', code: 'SYS', msg: 'archive integrity check · PASS' },
  { t: '03:14:07', code: 'SYS', msg: 'inbound record · AF-005 · origin: unknown' },
  { t: '03:14:09', code: 'WARN', msg: 'origin reports timestamp prior to creation' },
  { t: '03:14:11', code: 'SYS', msg: 'cross-reference · subject previously flagged' },
  { t: '03:14:14', code: 'ERR', msg: 'record modified · no operator signature' },
  { t: '03:14:18', code: 'SYS', msg: 'quarantine hold applied · pending review' },
  { t: '03:14:22', code: 'WARN', msg: 'quiet floor telemetry · eleven breaths / minute' },
  { t: '03:14:29', code: 'SYS', msg: 'file closed by unidentified operator' },
]

export const REGIONS = ['NE-CORRIDOR', 'PACIFIC-NW', 'MIDWEST', 'SE-BASIN', 'UNKNOWN', 'HQ', 'N/A']

export function getEpisodeBySlug(slug) {
  return EPISODES.find((e) => e.slug === slug) || null
}

export function getRelatedEpisodes(slug, count = 3) {
  return EPISODES.filter((e) => e.slug !== slug).slice(0, count)
}

export function getArchiveById(id) {
  return ARCHIVE.find((a) => a.id === id) || null
}

export function getRelatedArchive(id, count = 3) {
  const current = getArchiveById(id)
  if (!current) return []

  const score = (candidate) => {
    let total = 0
    if (candidate.region === current.region) total += 4
    if (candidate.category === current.category) total += 3
    if (candidate.status === current.status) total += 1
    total += candidate.tags.filter((tag) => current.tags.includes(tag)).length * 2
    return total
  }

  return ARCHIVE.filter((entry) => entry.id !== id)
    .map((entry) => ({ entry, score: score(entry) }))
    .sort((a, b) => b.score - a.score || b.entry.timestamp.localeCompare(a.entry.timestamp))
    .slice(0, count)
    .map(({ entry }) => entry)
}
