import { cn } from '@/utils/cn'

// Image with hostile hover — contrast blowout, invert flash, and a hidden layer peek.
// Pass `hidden` as the layer that should "flash through" on hover (usually a creepier variant).
// If no image is passed, renders the children block as the base layer (for SVG art).
export default function AnomalyImage({
  src,
  alt = '',
  children,
  hidden,
  className,
  frame = true,
}) {
  return (
    <div
      className={cn(
        'anomaly-img relative bg-void-600',
        // only apply default aspect if caller didn't pass one
        !className?.includes('aspect-') && 'aspect-[16/10]',
        frame && 'border border-white/[0.08]',
        className
      )}
    >
      <div className="anomaly-base absolute inset-0">
        {src ? (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        ) : (
          children
        )}
      </div>

      <div className="anomaly-hidden absolute inset-0">
        {hidden ?? <DefaultHiddenLayer />}
      </div>

      {/* persistent overlay chrome */}
      <div className="pointer-events-none absolute inset-0 bg-scanlines opacity-40" />
      <div className="pointer-events-none absolute inset-0 vignette" />

      {/* corner markers */}
      <span aria-hidden className="pointer-events-none absolute top-2 left-2 size-3 border-t border-l border-white/30" />
      <span aria-hidden className="pointer-events-none absolute top-2 right-2 size-3 border-t border-r border-white/30" />
      <span aria-hidden className="pointer-events-none absolute bottom-2 left-2 size-3 border-b border-l border-white/30" />
      <span aria-hidden className="pointer-events-none absolute bottom-2 right-2 size-3 border-b border-r border-white/30" />
    </div>
  )
}

function DefaultHiddenLayer() {
  // Abstract "figure" that peeks through on hover.
  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 30% 60% at 50% 70%, rgba(160,29,29,0.9) 0%, rgba(10,0,0,0) 60%), linear-gradient(180deg, #0a0000 0%, #1a0000 100%)',
        }}
      />
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 400 260"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden
      >
        <ellipse cx="200" cy="150" rx="26" ry="34" fill="#e8e6e1" opacity="0.85" />
        <rect x="185" y="180" width="30" height="60" fill="#e8e6e1" opacity="0.65" />
        <circle cx="192" cy="145" r="3" fill="#0a0a0a" />
        <circle cx="208" cy="145" r="3" fill="#0a0a0a" />
        <path d="M192 160 Q200 168 208 160" stroke="#0a0a0a" strokeWidth="1" fill="none" />
      </svg>
    </div>
  )
}
