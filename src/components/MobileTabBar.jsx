import { NavLink } from 'react-router-dom'
import { cn } from '@/utils/cn'

const TABS = [
  { to: '/', label: 'Source', icon: 'source' },
  { to: '/archive', label: 'Archive', icon: 'archive' },
  { to: '/lore/ledger', label: 'Ledger', icon: 'signal', accent: true },
  { to: '/report', label: 'Report', icon: 'report' },
]

export default function MobileTabBar() {
  return (
    <nav
      aria-label="Primary"
      className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-void/95 border-t border-white/[0.08]"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="absolute inset-0 bg-scanlines opacity-30 pointer-events-none" />
      <ul className="relative grid grid-cols-4">
        {TABS.map((tab) => (
          <li key={tab.label}>
            <NavLink
              to={tab.to}
              end={tab.to === '/'}
              className={({ isActive }) =>
                cn(
                  'flex flex-col items-center justify-center gap-1.5 py-3 font-mono text-[9px] uppercase tracking-widest-2 transition-colors',
                  isActive ? 'text-bone' : 'text-ash-400 hover:text-bone',
                  tab.accent && 'text-rust-bright'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <TabIcon icon={tab.icon} active={isActive} accent={tab.accent} />
                  <span>{tab.label}</span>
                  {isActive && <span className="absolute top-0 h-px w-8 bg-rust-bright" />}
                </>
              )}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

function TabIcon({ icon, active, accent }) {
  const color = accent ? '#a01d1d' : active ? '#e8e6e1' : '#6a6a6a'
  const stroke = { stroke: color, strokeWidth: 1.2, fill: 'none' }
  return (
    <svg className="size-5" viewBox="0 0 24 24" aria-hidden>
      {icon === 'source' && (
        <g {...stroke}>
          <rect x="3" y="4" width="18" height="14" />
          <circle cx="12" cy="11" r="3" />
          <line x1="7" y1="20" x2="17" y2="20" />
        </g>
      )}
      {icon === 'archive' && (
        <g {...stroke}>
          <rect x="3" y="4" width="18" height="4" />
          <rect x="4" y="8" width="16" height="12" />
          <line x1="10" y1="12" x2="14" y2="12" />
        </g>
      )}
      {icon === 'signal' && (
        <g {...stroke}>
          <circle cx="12" cy="12" r="2" fill={color} />
          <path d="M7 7 A 7 7 0 0 1 17 7" />
          <path d="M4 4 A 11 11 0 0 1 20 4" />
        </g>
      )}
      {icon === 'report' && (
        <g {...stroke}>
          <path d="M5 4 h10 l4 4 v12 h-14 z" />
          <line x1="8" y1="11" x2="16" y2="11" />
          <line x1="8" y1="15" x2="14" y2="15" />
        </g>
      )}
    </svg>
  )
}
