export default function LoadingState({ label = 'decoding archive feed' }) {
  return (
    <div className="flex flex-col items-center gap-4 py-24" role="status" aria-live="polite">
      <div className="relative size-10 border border-white/[0.08]">
        <span className="absolute inset-1 border border-white/[0.12]" />
        <span className="absolute inset-3 bg-rust-bright/80 animate-pulse-soft" />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-300">◼ {label}</span>
      <span className="h-px w-24 bg-gradient-to-r from-transparent via-white/30 to-transparent" />
    </div>
  )
}
