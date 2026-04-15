import { motion } from 'framer-motion'
import { NavLink } from 'react-router-dom'
import { useSystemClock } from '@/hooks/useSystemClock'
import { cn } from '@/utils/cn'

export default function MobileMenu({ onClose, items }) {
  const { label } = useSystemClock()

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

        <nav className="mt-16 flex flex-col gap-7">
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
                    'group flex items-baseline justify-between pb-4 border-b border-white/[0.06]',
                    isActive ? 'text-bone' : 'text-bone/85'
                  )
                }
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-ash-500 tracking-widest-2">
                    / {item.code}
                  </span>
                  <span className="font-display text-4xl leading-none">{item.label}</span>
                </div>
                <span className="font-mono text-[10px] text-ash-400 tracking-widest-2 group-hover:text-rust-bright transition-colors">
                  enter →
                </span>
              </NavLink>
            </motion.div>
          ))}
        </nav>

        <div className="mt-auto pt-10 flex flex-col gap-2">
          <p className="font-display text-2xl text-bone leading-tight max-w-[20ch]">
            Nothing on this site is entirely safe to read.
          </p>
          <span className="mono-label">◼ archive · cycle ii</span>
        </div>
      </div>
    </motion.div>
  )
}
