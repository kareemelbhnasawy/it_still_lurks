import { NavLink } from 'react-router-dom'
import { useSystemClock } from '@/hooks/useSystemClock'
import { useInfection } from '@/context/InfectionContext'
import { cn } from '@/utils/cn'
import { resolveSignalNav } from '@/utils/navSignals'

export default function MobileTabBar() {
  const { now } = useSystemClock()
  const { level } = useInfection()
  const tabs = resolveSignalNav(level, now.getUTCSeconds()).filter(
    (item) => item.to === '/' || item.to === '/archive' || item.to === '/lore/ledger' || item.to === '/report'
  )

  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-void/96 border-t border-white/[0.08]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="absolute inset-0 bg-scanlines opacity-35 pointer-events-none" />
      <div className="relative px-3 pt-2 border-b border-white/[0.05]">
        <div className="flex items-center justify-between font-mono text-[8px] uppercase tracking-widest-2 text-ash-500">
          <span>cmd strip</span>
          <span>{level >= 3 ? 'routing corrupted' : level >= 2 ? 'routing drift' : 'routing nominal'}</span>
        </div>
      </div>
      <ul className="relative grid grid-cols-4 gap-px bg-white/[0.04]">
        {tabs.map((tab) => (
          <li key={tab.label}>
            <NavLink
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                cn(
                  'relative flex min-h-[60px] flex-col justify-center gap-1 bg-void px-3 py-3 font-mono text-[9px] uppercase tracking-widest-2 transition-colors',
                  isActive ? 'text-bone' : 'text-ash-400 hover:text-bone',
                  tab.accent && 'text-rust-bright'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span className="text-[8px] text-ash-500">{tab.code}</span>
                  <span className="leading-tight">{tab.display}</span>
                  <span className="text-[8px] text-ash-500">{tab.to === '/' ? '/root' : tab.to}</span>
                  {isActive && <span className="absolute inset-y-0 left-0 w-px bg-rust-bright" />}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}
