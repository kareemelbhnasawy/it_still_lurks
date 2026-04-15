import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import FeaturedCard from '@/components/FeaturedCard'
import ContentGrid from '@/components/ContentGrid'
import SectionHeading from '@/components/SectionHeading'
import SystemBadge from '@/components/SystemBadge'
import TextGlitch from '@/components/TextGlitch'
import { EPISODES, FEATURED } from '@/data/mockData'

export default function Watch() {
  const rest = EPISODES.filter((e) => e.id !== FEATURED.id)

  return (
    <>
      <section className="relative mx-auto max-w-[1600px] px-5 md:px-10 pt-36 md:pt-44 pb-12">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1 }}
          className="flex flex-col gap-8"
        >
          <div className="flex flex-wrap gap-3">
            <SystemBadge>◼ watch cell</SystemBadge>
            <SystemBadge tone="info">cycle ii · in session</SystemBadge>
          </div>

          <h1 className="font-display font-extrabold italic text-display-lg text-bone leading-[0.9] tracking-[-0.03em] text-balance max-w-4xl">
            <TextGlitch as="span">Footage that survived</TextGlitch>
            <br />
            <TextGlitch as="span" className="text-rust-bright">the recovery.</TextGlitch>
          </h1>

          <p className="max-w-xl text-ash-200/80 text-pretty leading-relaxed">
            Watch the episodes the archive has been willing to show. Every drop is shipped with
            warnings. We recommend headphones. We do not recommend watching alone past midnight.
          </p>
        </motion.div>
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10">
        <FeaturedCard item={FEATURED} />
      </section>

      <section className="mx-auto max-w-[1600px] px-5 md:px-10 mt-32 md:mt-40">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <SectionHeading
            eyebrow="entire drop · cycle ii"
            title="All released episodes."
            caption="Each entry contains the full file. Runtime and region are recorded as received."
          />
          <Link
            to="/archive"
            className="inline-flex items-center gap-2 self-start md:self-end font-mono text-[10px] uppercase tracking-widest-2 text-bone link-underline"
          >
            open archive →
          </Link>
        </div>

        <ContentGrid items={rest} />
      </section>
    </>
  )
}
