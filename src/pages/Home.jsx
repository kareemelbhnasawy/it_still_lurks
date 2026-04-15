import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import HeroSection from '@/components/HeroSection'
import SectionHeading from '@/components/SectionHeading'
import FeaturedCard from '@/components/FeaturedCard'
import ContentGrid from '@/components/ContentGrid'
import SignalBanner from '@/components/SignalBanner'
import LogRow from '@/components/LogRow'
import CriticalBreachCard from '@/components/CriticalBreachCard'
import LurkOS from '@/components/LurkOS'
import LedgerPromo from '@/components/LedgerPromo'
import { EPISODES, FEATURED, LOGS } from '@/data/mockData'

export default function Home() {
  const latest = EPISODES.filter((e) => e.id !== FEATURED.id).slice(0, 6)

  return (
    <>
      <HeroSection />

      {/* marquee strip */}
      <div className="relative overflow-hidden border-y border-white/[0.06] py-5 mask-fade-x">
        <div className="flex gap-16 whitespace-nowrap font-display text-3xl md:text-5xl text-bone/10 select-none">
          {Array.from({ length: 2 }).map((_, g) => (
            <div key={g} className="flex gap-16 shrink-0 animate-[marquee_60s_linear_infinite]">
              {[
                'it still lurks',
                '◼',
                'cycle ii',
                '◼',
                'archive · cell 07',
                '◼',
                'do not answer',
                '◼',
                'the quiet floor',
                '◼',
                'subject lost at 03:14',
              ].map((t, i) => (
                <span key={`${g}-${i}`}>{t}</span>
              ))}
            </div>
          ))}
        </div>
      </div>

      {/* ledger promo — slow burn entry point */}
      <div className="mt-24 md:mt-32">
        <LedgerPromo />
      </div>

      {/* featured */}
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 mt-32 md:mt-40">
        <SectionHeading
          eyebrow="featured drop · cycle ii"
          title="The record that wouldn't leave the archive."
          caption="Six nights of surveillance from the eleventh floor of a building that was supposed to have been empty. On the seventh night, the hallway started answering us."
        />
        <div className="mt-12 md:mt-16">
          <FeaturedCard item={FEATURED} />
        </div>
      </section>

      {/* system feed */}
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 mt-32 md:mt-40">
        <div className="grid lg:grid-cols-[1.3fr_1fr] gap-16 items-start">
          <SectionHeading
            eyebrow="live feed · archive cell 07"
            title="The archive never stops writing itself."
            caption="Every minute we are not watching, the system is. Records arrive unsigned, rewrite themselves, disappear. Below is the last minute we can still read."
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="relative border border-white/[0.08] bg-white/[0.012] p-6 md:p-7"
          >
            <div className="flex items-center justify-between mb-5 pb-4 border-b border-white/[0.06]">
              <span className="mono-label">◼ feed · live</span>
              <span className="mono-label-sm tabular-nums">buffer 00:42</span>
            </div>
            <div className="space-y-0">
              {LOGS.map((log, i) => (
                <LogRow key={`${log.t}-${i}`} log={log} index={i} />
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-white/[0.06] flex items-center justify-between">
              <span className="mono-label-sm">◼ 8 entries · 0 redacted</span>
              <Link to="/archive" className="mono-label-sm text-bone hover:text-rust-bright transition-colors">
                open full feed →
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* latest content */}
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 mt-32 md:mt-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="recent recoveries"
            title="Latest material to stabilise."
            caption="These are the six most recent records the archive has allowed us to publish."
          />
          <Link
            to="/watch"
            className="self-start md:self-end inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest-2 text-bone link-underline"
          >
            all episodes →
          </Link>
        </div>
        <ContentGrid items={latest} />
      </section>

      {/* critical breach alert */}
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 mt-32">
        <CriticalBreachCard />
      </section>

      {/* atmospheric quote strip */}
      <section className="relative mx-auto max-w-[1200px] px-5 md:px-10 mt-32 md:mt-40 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2 }}
        >
          <span className="mono-label-sm">◼ subliminal layer</span>
          <p className="mt-8 font-display text-3xl md:text-5xl lg:text-6xl text-bone/35 leading-[1.05] tracking-[-0.01em] text-balance">
            Don't look back. The foundation is hollow.
          </p>
          <div className="mt-10 inline-flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest-2 text-ash-500">
            <span>redacted</span>
            <span className="size-1 bg-ash-500" />
            <span>redacted</span>
            <span className="size-1 bg-ash-500" />
            <span>redacted</span>
          </div>
        </motion.div>
      </section>

      <LurkOS />

      <div className="mt-32 md:mt-40">
        <SignalBanner />
      </div>

      <style>{`
        @keyframes marquee {
          0% { transform: translate3d(0, 0, 0); }
          100% { transform: translate3d(-100%, 0, 0); }
        }
      `}</style>
    </>
  )
}
