import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { useSystemClock } from '@/hooks/useSystemClock'
import { useInfection } from '@/context/InfectionContext'
import MobileMenu from './MobileMenu'
import { cn } from '@/utils/cn'
import { resolveSignalAction, resolveSignalNav } from '@/utils/navSignals'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { label, now } = useSystemClock()
  const { level } = useInfection()
  const location = useLocation()
  const navItems = resolveSignalNav(level, now.getUTCSeconds())
  const actionLabel = resolveSignalAction(level, now.getUTCSeconds())

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.2, ease: [0.19, 1, 0.22, 1] }}
        className={cn(
          'fixed top-0 inset-x-0 z-50 transition-colors duration-500',
          scrolled
            ? 'bg-void/75 backdrop-blur-xl backdrop-saturate-150 border-b border-white/[0.05]'
            : 'bg-transparent'
        )}
      >
        <div className="mx-auto max-w-[1600px] px-5 md:px-10 h-16 md:h-20 flex items-center justify-between gap-6">
          <Link to="/" className="group flex items-center gap-3" aria-label="IT STILL LURKS — home">
            <BrandMark />
            <span className="flex flex-col leading-none">
              <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-2 text-rust-bright">
                <span className="size-1.5 bg-rust-bright animate-pulse-soft" />
                {level >= 3 ? 'witness identified' : level >= 2 ? 'signal unstable' : 'signal active'}
              </span>
              <span className="mono-label-sm mt-1 text-ash-400 hidden md:block">
                archive · cell 07 · cycle ii
              </span>
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 xl:gap-10">
            {navItems.map((item) => (
              <NavLink
                key={item.label}
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  cn(
                    'group relative flex items-center gap-2 font-mono text-[11px] font-bold uppercase tracking-widest-2 transition-colors',
                    item.accent
                      ? 'text-rust-bright hover:text-bone'
                      : isActive
                      ? 'text-bone'
                      : 'text-ash-300 hover:text-bone'
                  )
                }
              >
                {({ isActive }) => (
                  <>
                    <span className="text-ash-500 text-[9px]">{item.code}</span>
                    <span className="link-underline">{item.display}</span>
                    {isActive && (
                      <motion.span
                        layoutId="nav-dot"
                        className="absolute -right-3 top-1/2 -translate-y-1/2 size-1 bg-rust-bright"
                      />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <span className="mono-label-sm text-ash-400 tabular-nums">{label}</span>
            <Link
              to="/report"
              className="group relative inline-flex items-center gap-2 px-4 py-2 border border-white/[0.08] hover:border-rust/60 transition-colors font-mono text-[10px] uppercase tracking-widest-2 text-bone"
            >
              <span className="h-1 w-1 bg-rust-bright animate-pulse-soft" />
              {actionLabel}
            </Link>
          </div>

          <button
            onClick={() => setMenuOpen(true)}
            className="lg:hidden relative h-10 w-10 -mr-2 flex items-center justify-center group"
            aria-label="Open menu"
          >
            <span className="sr-only">Menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="block h-px w-6 bg-bone" />
              <span className="block h-px w-4 bg-bone group-hover:w-6 transition-all duration-500" />
            </span>
          </button>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen && <MobileMenu onClose={() => setMenuOpen(false)} items={navItems} />}
      </AnimatePresence>
    </>
  )
}

function BrandMark() {
  return (
    <span
      aria-hidden
      className="relative inline-flex items-center justify-center h-9 w-9 border border-white/[0.12]"
    >
      <span className="absolute inset-1 border border-white/[0.08]" />
      <span className="relative font-display text-[13px] leading-none tracking-tighter text-bone">ıl</span>
      <span className="absolute -right-[3px] -bottom-[3px] h-1 w-1 bg-rust-bright" />
    </span>
  )
}
