import { cn } from '@/utils/cn'
import { CATEGORIES } from '@/data/mockData'

export default function ArchiveFilterBar({ query, setQuery, category, setCategory, count }) {
  return (
    <div className="sticky top-16 md:top-20 z-30 bg-void/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="mx-auto max-w-[1600px] px-5 md:px-10 py-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative flex-1 max-w-xl">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 font-mono text-[10px] uppercase tracking-widest-2 text-ash-500">
              ◼ query
            </span>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search archive · witness · location · code"
              className="w-full bg-white/[0.015] border border-white/[0.08] focus:border-rust/50 pl-20 pr-12 py-3 text-sm text-bone placeholder:text-ash-500 outline-none transition-colors"
              aria-label="Search archive"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 mono-label-sm tabular-nums">
              {count ?? '—'}
            </span>
          </div>

          <div className="flex items-center gap-1 overflow-x-auto mask-fade-x -mx-2 px-2">
            {CATEGORIES.map((c) => (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                className={cn(
                  'flex-shrink-0 px-3 py-2 font-mono text-[10px] uppercase tracking-widest-2 border transition-colors whitespace-nowrap',
                  category === c.id
                    ? 'border-bone/70 text-bone bg-white/[0.03]'
                    : 'border-white/[0.06] text-ash-300 hover:text-bone hover:border-white/[0.15]'
                )}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
