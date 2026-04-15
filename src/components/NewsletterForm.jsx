import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WhisperHint from './WhisperHint'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | confirmed

  const onSubmit = (e) => {
    e.preventDefault()
    if (!email || !email.includes('@')) return
    setState('sending')
    setTimeout(() => setState('confirmed'), 900)
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <div className="flex items-stretch border border-white/[0.1] hover:border-white/[0.22] focus-within:border-rust/60 bg-white/[0.01] transition-colors">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="your.frequency@signal"
          disabled={state !== 'idle'}
          className="flex-1 bg-transparent px-4 py-3 text-sm text-bone placeholder:text-ash-500 focus:outline-none disabled:opacity-40"
          aria-label="Email frequency"
        />
        <WhisperHint lockMessage="something else will answer">
          <button
            type="submit"
            disabled={state !== 'idle'}
            className="px-4 h-full border-l border-white/[0.1] font-mono text-[10px] uppercase tracking-widest-2 text-bone hover:text-rust-bright disabled:opacity-40 transition-colors"
          >
            {state === 'sending' ? 'linking…' : state === 'confirmed' ? '◼ linked' : 'transmit →'}
          </button>
        </WhisperHint>
      </div>

      <div className="mt-3 h-5">
        <AnimatePresence mode="wait">
          {state === 'confirmed' ? (
            <motion.p
              key="ok"
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[10px] uppercase tracking-widest-2 text-rust-bright"
            >
              ◼ your frequency has been noted. expect the first transmission within 48h.
            </motion.p>
          ) : (
            <motion.p
              key="hint"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-500"
            >
              ◼ we do not read the replies. something else does.
            </motion.p>
          )}
        </AnimatePresence>
      </div>
    </form>
  )
}
