import { Link } from 'react-router-dom'
import NewsletterForm from './NewsletterForm'
import { useSystemClock } from '@/hooks/useSystemClock'

export default function Footer() {
  const { label } = useSystemClock()

  return (
    <footer className="relative mt-40 border-t border-white/[0.06] bg-void">
      <div className="absolute inset-0 bg-scanlines opacity-20 pointer-events-none" />

      <div className="relative mx-auto max-w-[1600px] px-5 md:px-10 pt-20 pb-10">
        <div className="grid gap-16 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <span className="mono-label">◼ signal index · receive</span>
            <h3 className="mt-6 font-display text-4xl md:text-5xl text-bone leading-[0.95] text-balance">
              Receive every transmission before it disappears.
            </h3>
            <p className="mt-5 max-w-sm text-sm text-ash-200/70 leading-relaxed">
              We release footage as we recover it. Enter your frequency to be notified when a new record
              stabilises. You may unsubscribe. Some messages will still arrive.
            </p>
            <div className="mt-8 max-w-md">
              <NewsletterForm />
            </div>
          </div>

          <FooterColumn
            title="Archive"
            items={[
              { label: 'All Records', to: '/archive' },
              { label: 'Watch', to: '/watch' },
              { label: 'Lore', to: '/lore' },
              { label: 'Report', to: '/report' },
            ]}
          />

          <FooterColumn
            title="Signal"
            items={[
              { label: 'Receive Transmissions', to: '/report' },
              { label: 'Submit Evidence', to: '/report' },
              { label: 'Join the Signal', to: '/report' },
            ]}
          />

          <div className="flex flex-col gap-4">
            <span className="mono-label">◼ system</span>
            <ul className="flex flex-col gap-2.5 text-sm text-ash-200/80">
              <li className="flex items-start gap-2">
                <span className="mt-[5px] h-1 w-1 bg-rust-bright" />
                Operators rotate every 28 days.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[5px] h-1 w-1 bg-white/30" />
                Records older than 48h may be reclassified.
              </li>
              <li className="flex items-start gap-2">
                <span className="mt-[5px] h-1 w-1 bg-signal" />
                All content is presented as recovered.
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-20 flex flex-col md:flex-row md:items-end md:justify-between gap-10">
          <div>
            <div
              aria-hidden
              className="font-display text-[20vw] md:text-[13vw] leading-[0.78] tracking-tighter text-bone/[0.06] select-none"
            >
              IT STILL LURKS
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/[0.05] flex flex-col md:flex-row gap-3 items-start md:items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            <span className="mono-label-sm">© {new Date().getFullYear()} IT STILL LURKS</span>
            <span className="mono-label-sm text-ash-500">/</span>
            <span className="mono-label-sm">cycle ii · archive cell 07</span>
          </div>
          <div className="flex flex-wrap gap-4 items-center">
            <span className="mono-label-sm tabular-nums">{label}</span>
            <span className="mono-label-sm text-ash-500">/</span>
            <Link to="/lore" className="mono-label-sm hover:text-bone transition-colors">
              manifest
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

function FooterColumn({ title, items }) {
  return (
    <div>
      <span className="mono-label">◼ {title}</span>
      <ul className="mt-6 flex flex-col gap-3">
        {items.map((it, i) => (
          <li key={`${it.to}-${i}`}>
            <Link
              to={it.to}
              className="group inline-flex items-center gap-2 text-bone/85 hover:text-bone text-sm"
            >
              <span className="h-px w-2 bg-ash-500 group-hover:w-5 group-hover:bg-rust-bright transition-all duration-500" />
              <span>{it.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
