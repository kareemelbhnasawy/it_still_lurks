import { motion } from 'framer-motion'

export default function AmbientBackground({ variant = 'default' }) {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      <div className="absolute inset-0 bg-void" />

      {/* slow drifting radial hotspots */}
      <motion.div
        className="absolute -top-1/4 -left-1/4 h-[80vmax] w-[80vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(122,26,26,0.08) 0%, rgba(10,10,10,0) 55%)',
          filter: 'blur(30px)',
        }}
        animate={{ x: [0, 40, -20, 0], y: [0, -30, 20, 0] }}
        transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute top-1/3 -right-1/4 h-[70vmax] w-[70vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(58,69,80,0.09) 0%, rgba(10,10,10,0) 55%)',
          filter: 'blur(40px)',
        }}
        animate={{ x: [0, -60, 30, 0], y: [0, 40, -30, 0] }}
        transition={{ duration: 44, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute -bottom-1/3 left-1/4 h-[60vmax] w-[60vmax] rounded-full"
        style={{
          background:
            'radial-gradient(circle at center, rgba(30,30,30,0.6) 0%, rgba(10,10,10,0) 60%)',
          filter: 'blur(50px)',
        }}
        animate={{ x: [0, 20, -40, 0], y: [0, -20, 10, 0] }}
        transition={{ duration: 50, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* scanlines */}
      <div className="absolute inset-0 bg-scanlines opacity-40" />

      {/* vignette */}
      <div className="absolute inset-0 vignette" />

      {/* hairline grid */}
      {variant === 'grid' && (
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage:
              'linear-gradient(to right, #fff 1px, transparent 1px), linear-gradient(to bottom, #fff 1px, transparent 1px)',
            backgroundSize: '96px 96px',
          }}
        />
      )}
    </div>
  )
}
