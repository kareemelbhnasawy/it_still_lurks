import { cn } from '@/utils/cn'

export default function ContentMeta({ items, className }) {
  return (
    <dl className={cn('grid grid-cols-2 md:grid-cols-4 gap-y-6 gap-x-6', className)}>
      {items.map((m) => (
        <div key={m.label} className="flex flex-col gap-1.5 border-l border-white/[0.08] pl-4">
          <dt className="mono-label-sm">{m.label}</dt>
          <dd className="text-bone text-sm tabular-nums">{m.value}</dd>
        </div>
      ))}
    </dl>
  )
}
