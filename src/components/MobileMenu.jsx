import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useSystemClock } from '@/hooks/useSystemClock'
import { useInfection } from '@/context/InfectionContext'
import { cn } from '@/utils/cn'

export default function MobileMenu({ onClose, items }) {
  const { label } = useSystemClock()
  const { level } = useInfection()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[55] lg:hidden"
    >
      <div className="absolute inset-0 bg-void/[0.985]" />
      <div className="absolute inset-0 bg-scanlines opacity-30" />

      <div
        className="relative flex flex-col h-dvh px-6 pt-6 pb-10"
        style={{ paddingTop: 'max(1.5rem, env(safe-area-inset-top))', paddingBottom: 'max(2.5rem, env(safe-area-inset-bottom))' }}
      >
        <div className="flex items-center justify-between">
          <span className="mono-label-sm text-ash-400 tabular-nums">{label}</span>
          <span className="font-mono text-[9px] uppercase tracking-widest-2 text-rust-bright">
            {level >= 3 ? 'witness mode' : level >= 2 ? 'unstable routing' : 'cell routing'}
          </span>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="h-10 w-10 flex items-center justify-center text-bone"
          >
            <span className="relative h-5 w-5">
              <span className="absolute top-1/2 left-0 h-px w-full bg-bone rotate-45" />
              <span className="absolute top-1/2 left-0 h-px w-full bg-bone -rotate-45" />
            </span>
          </button>
        </div>

        <nav className="mt-16 flex flex-col gap-5">
          {items.map((item, i) => (
            <motion.div
              key={item.to}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.08, ease: [0.19, 1, 0.22, 1] }}
            >
              <NavLink
                to={item.to}
                end={item.to === '/'}
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'group flex items-center justify-between gap-4 px-4 py-4 border border-white/[0.08] bg-white/[0.012]',
                    isActive ? 'text-bone border-rust/45' : 'text-bone/85'
                  )
                }
              >
                <div className="min-w-0">
                  <span className="font-mono text-[10px] text-ash-500 tracking-widest-2 block">
                    / {item.code}
                  </span>
                  <span className="font-display text-3xl leading-none block mt-2">{item.display}</span>
                </div>
                <div className="shrink-0 text-right">
                  <span className="font-mono text-[9px] uppercase tracking-widest-2 text-ash-500 block">
                    {item.to}
                  </span>
                  <span className="font-mono text-[10px] text-ash-400 tracking-widest-2 group-hover:text-rust-bright transition-colors block mt-2">
                    enter →
                  </span>
                </div>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="mt-auto pt-10 flex flex-col gap-2">
          <p className="font-display text-2xl text-bone leading-tight max-w-[20ch]">
            {level >= 3
              ? 'If the labels change while you are looking at them, leave.'
              : 'Nothing on this site is entirely safe to read.'}
          </p>
          <span className="mono-label">◼ archive · cycle ii</span>
        </div>
      </div>
    </motion.div>
  )
}
