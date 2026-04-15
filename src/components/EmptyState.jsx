export default function EmptyState({
  title = 'no matching records',
  message = 'The archive returned nothing. Either the records were never there, or they have moved. Try a broader query.',
  action,
}) {
  return (
    <div className="flex flex-col items-center justify-center text-center py-24 px-4 border border-white/[0.06] bg-white/[0.01]">
      <div className="relative size-12 border border-white/[0.1] mb-6">
        <span className="absolute inset-1 border border-white/[0.08]" />
        <span className="absolute top-1/2 left-0 h-px w-full bg-white/20" />
        <span className="absolute top-0 left-1/2 w-px h-full bg-white/20" />
      </div>
      <span className="mono-label">◼ empty file</span>
      <h3 className="mt-4 font-display text-2xl md:text-3xl text-bone text-balance max-w-md">{title}</h3>
      <p className="mt-3 max-w-md text-sm text-ash-200/75 leading-relaxed text-pretty">{message}</p>
      {action && <div className="mt-6">{action}</div>}
    </div>
  )
}
