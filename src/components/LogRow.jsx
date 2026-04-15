import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

const CODE_CLASS = {
  SYS: 'text-ash-300',
  WARN: 'text-rust-bright',
  ERR: 'text-rust-bright',
  INFO: 'text-signal',
}

export default function LogRow({ log, index = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -12 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
      className="group grid grid-cols-[auto_auto_1fr] gap-4 items-center py-2.5 border-b border-white/[0.04] font-mono text-[11px]"
    >
      <span className="tabular-nums text-ash-500">{log.t}</span>
      <span className={cn('uppercase tracking-widest-2', CODE_CLASS[log.code] || 'text-ash-300')}>
        [{log.code}]
      </span>
      <span className="text-ash-200/80 truncate group-hover:text-bone transition-colors">{log.msg}</span>
    </motion.div>
  )
}
