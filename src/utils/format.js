export function formatIncidentCode(id) {
  return String(id).padStart(4, '0')
}

export function formatTimestamp(iso) {
  const d = new Date(iso)
  if (Number.isNaN(d.getTime())) return iso
  const pad = (n) => String(n).padStart(2, '0')
  return `${d.getUTCFullYear()}.${pad(d.getUTCMonth() + 1)}.${pad(d.getUTCDate())} · ${pad(
    d.getUTCHours()
  )}:${pad(d.getUTCMinutes())}`
}

export function corruptString(str, intensity = 0.15) {
  const chars = '▓▒░█▞▚▗▝▘▖◼◻'
  return str
    .split('')
    .map((c) => (Math.random() < intensity && c !== ' ' ? chars[Math.floor(Math.random() * chars.length)] : c))
    .join('')
}

export function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

export function runtime(sec) {
  const m = Math.floor(sec / 60)
  const s = sec % 60
  return `${m}:${String(s).padStart(2, '0')}`
}
