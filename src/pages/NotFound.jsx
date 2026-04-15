import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import SystemBadge from '@/components/SystemBadge'
import { useEffect, useState } from 'react'
import { corruptString } from '@/utils/format'

const BASE = 'the record you requested is not in the archive'

export default function NotFound() {
  const [text, setText] = useState(BASE)

  useEffect(() => {
    let i = 0
    const id = setInterval(() => {
      i += 1
      setText(corruptString(BASE, 0.08 + (i % 5) * 0.02))
      if (i > 24) {
        clearInterval(id)
        setText(BASE)
      }
    }, 110)
    return () => clearInterval(id)
  }, [])

  return (
    <section className="relative min-h-[100svh] flex items-center">
      <div className="relative mx-auto max-w-[1400px] w-full px-5 md:px-10 pt-32 pb-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.1, ease: [0.19, 1, 0.22, 1] }}
          className="grid lg:grid-cols-[1.2fr_1fr] gap-16 items-end"
        >
          <div>
            <SystemBadge tone="corrupted">◼ file not found · cell 07</SystemBadge>
            <h1 className="mt-10 font-display text-[clamp(6rem,18vw,14rem)] leading-[0.82] text-bone tracking-[-0.04em]">
              4<span className="text-rust-bright">◼</span>4
            </h1>
            <p className="mt-6 font-mono text-xs uppercase tracking-widest-2 text-ash-300 max-w-md h-5">
              {text}
            </p>
          </div>

          <div className="flex flex-col gap-5">
            <div className="border border-white/[0.08] p-6 bg-white/[0.012]">
              <span className="mono-label">◼ possible reasons</span>
              <ul className="mt-5 space-y-3 text-sm text-ash-200/80">
                <li className="flex items-start gap-3">
                  <span className="mt-2 size-1 bg-rust-bright" />
                  The record was removed by an operator.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 size-1 bg-rust-bright" />
                  The record has not yet been recovered.
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 size-1 bg-rust-bright" />
                  The record exists, but you are not supposed to read it yet.
                </li>
              </ul>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/"
                className="inline-flex items-center gap-3 px-5 py-3 bg-bone text-void hover:bg-rust-bright hover:text-bone font-mono text-[11px] uppercase tracking-widest-2 transition-colors"
              >
                <span className="size-1 bg-rust-bright" />
                return home
              </Link>
              <Link
                to="/archive"
                className="inline-flex items-center gap-3 px-5 py-3 border border-white/[0.12] hover:border-rust/60 font-mono text-[11px] uppercase tracking-widest-2 text-bone transition-colors"
              >
                open archive
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
