import { useMemo, useState } from 'react'
import { motion } from 'framer-motion'
import ArchiveFilterBar from '@/components/ArchiveFilterBar'
import ArchiveCard from '@/components/ArchiveCard'
import EmptyState from '@/components/EmptyState'
import SystemBadge from '@/components/SystemBadge'
import TextGlitch from '@/components/TextGlitch'
import { ARCHIVE } from '@/data/mockData'

export default function Archive() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('all')

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return ARCHIVE.filter((r) => {
      const matchCat =
        category === 'all'
          ? true
          : category === 'corrupted'
          ? r.status === 'corrupted'
          : r.category === category
      const matchQ =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.excerpt.toLowerCase().includes(q) ||
        r.code.toLowerCase().includes(q) ||
        r.region.toLowerCase().includes(q) ||
        r.tags.some((t) => t.toLowerCase().includes(q))
      return matchCat && matchQ
    })
  }, [query, category])

  return (
    <>
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 pt-36 md:pt-44 pb-14">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-wrap gap-3">
            <SystemBadge>◼ directory · /root/external_assets/unresolved</SystemBadge>
            <SystemBadge tone="info">{ARCHIVE.length} records · live</SystemBadge>
            <SystemBadge tone="warn">access_level · omega</SystemBadge>
          </div>

          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-16 items-end">
            <h1 className="font-display font-extrabold italic text-display-lg text-bone leading-[0.9] tracking-[-0.03em] text-balance">
              <TextGlitch as="span">THE ARCHIVE</TextGlitch>
            </h1>
            <p className="max-w-md text-ash-200/80 leading-relaxed text-pretty">
              Every record below was recovered from surveillance, transmission, or operator testimony.
              Some have been declassified for you to read. Some have not. If a record appears to be
              ▓ corrupted ▓, the archive suggests you do not stare at it for long.
            </p>
          </div>
        </motion.div>
      </section>

      <ArchiveFilterBar
        query={query}
        setQuery={setQuery}
        category={category}
        setCategory={setCategory}
        count={filtered.length}
      />

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 py-16">
        {filtered.length === 0 ? (
          <EmptyState
            action={
              <button
                type="button"
                onClick={() => {
                  setQuery('')
                  setCategory('all')
                }}
                className="inline-flex items-center gap-3 px-5 py-3 border border-white/[0.12] hover:border-rust/60 font-mono text-[10px] uppercase tracking-widest-2 text-bone transition-colors"
              >
                <span className="size-1 bg-rust-bright" />
                reset query
              </button>
            }
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
            {filtered.map((r, i) => (
              <ArchiveCard key={r.id} record={r} index={i} />
            ))}
          </div>
        )}
      </section>
    </>
  )
}
