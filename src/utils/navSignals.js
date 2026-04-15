export const NAV_SIGNAL_ITEMS = [
  {
    to: '/',
    label: 'Source',
    code: '01',
    variants: ['Source', 'Origin', 'Ingress', 'It Began Here'],
  },
  {
    to: '/archive',
    label: 'Archive',
    code: '02',
    variants: ['Archive', 'Locker', 'Evidence', 'Keep Out'],
  },
  {
    to: '/watch',
    label: 'Watch',
    code: '03',
    variants: ['Watch', 'Observe', 'Playback', 'It Watches'],
  },
  {
    to: '/lore/ledger',
    label: 'Ledger',
    code: '04',
    accent: true,
    mobile: true,
    variants: ['Ledger', 'Manuscript', 'Directive', 'Do Not Read'],
  },
  {
    to: '/lore',
    label: 'Lore',
    code: '05',
    variants: ['Lore', 'Briefing', 'Manifest', 'Inherited'],
  },
  {
    to: '/report',
    label: 'Report',
    code: '06',
    variants: ['Report', 'Transmit', 'Confess', 'It Heard You'],
  },
]

export function resolveSignalNav(level, seconds = 0) {
  if (level < 2) {
    return NAV_SIGNAL_ITEMS.map((item) => ({ ...item, display: item.label }))
  }

  const cadence = level >= 3 ? 6 : 10
  const phase = Math.floor(seconds / cadence)

  return NAV_SIGNAL_ITEMS.map((item, index) => ({
    ...item,
    display: item.variants[(phase + index) % item.variants.length],
  }))
}

export function resolveSignalAction(level, seconds = 0) {
  const pool =
    level >= 3
      ? ['Transmit', 'Respond', 'Report?', 'Too Late']
      : level >= 2
      ? ['Transmit', 'Signal', 'Witness', 'Respond']
      : ['Signal', 'Transmit', 'Contact', 'Report']

  return pool[Math.floor(seconds / 10) % pool.length]
}
