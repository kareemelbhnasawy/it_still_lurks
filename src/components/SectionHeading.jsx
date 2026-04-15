import { motion } from 'framer-motion'
import { cn } from '@/utils/cn'

export default function SectionHeading({ eyebrow, title, caption, align = 'left', className }) {
  const alignCls =
    align === 'center' ? 'items-center text-center' : align === 'right' ? 'items-end text-right' : 'items-start text-left'

  return (
    <motion.header
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 1, ease: [0.19, 1, 0.22, 1] }}
      className={cn('flex flex-col gap-5', alignCls, className)}
    >
      {eyebrow && (
        <div className="flex items-center gap-3 font-mono text-[10px] uppercase tracking-widest-2 text-ash-300">
          <span className="h-px w-8 bg-white/20" />
          <span>{eyebrow}</span>
        </div>
      )}
      <h2 className="font-display text-display-md text-bone text-balance max-w-3xl">{title}</h2>
      {caption && (
        <p className="max-w-xl text-ash-200/80 text-sm md:text-base leading-relaxed text-pretty">
          {caption}
        </p>
      )}
    </motion.header>
  )
}
