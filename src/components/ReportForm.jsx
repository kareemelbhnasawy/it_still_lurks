import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WhisperHint from './WhisperHint'

const TYPES = [
  { id: 'sighting', label: 'Report a sighting' },
  { id: 'evidence', label: 'Submit evidence' },
  { id: 'signal', label: 'Join the signal' },
  { id: 'transmission', label: 'Receive transmissions' },
]

export default function ReportForm() {
  const [type, setType] = useState('sighting')
  const [form, setForm] = useState({ name: '', email: '', location: '', witnessed: '' })
  const [state, setState] = useState('idle')

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }))

  const onSubmit = (e) => {
    e.preventDefault()
    setState('sending')
    setTimeout(() => setState('received'), 1100)
  }

  return (
    <form onSubmit={onSubmit} className="relative">
      <fieldset className="flex flex-col gap-10">
        <div>
          <legend className="mono-label mb-4 block">◼ type of transmission</legend>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TYPES.map((t) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setType(t.id)}
                aria-pressed={type === t.id}
                className={`group relative flex items-center justify-between p-4 border transition-colors ${
                  type === t.id
                    ? 'border-bone/50 bg-white/[0.03] text-bone'
                    : 'border-white/[0.08] text-ash-300 hover:text-bone hover:border-white/[0.18]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`size-2 ${type === t.id ? 'bg-rust-bright' : 'bg-ash-500 group-hover:bg-white'}`}
                  />
                  <span className="font-mono text-[11px] uppercase tracking-widest-2">{t.label}</span>
                </div>
                <span className="mono-label-sm">{type === t.id ? 'selected' : 'choose'}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          <Field label="Operator alias" required>
            <input
              required
              value={form.name}
              onChange={set('name')}
              placeholder="— unnamed witness"
              className={INPUT}
            />
          </Field>
          <Field label="Return frequency (email)" required>
            <input
              type="email"
              required
              value={form.email}
              onChange={set('email')}
              placeholder="your.frequency@signal"
              className={INPUT}
            />
          </Field>
          <Field label="Location of record">
            <input
              value={form.location}
              onChange={set('location')}
              placeholder="region · corridor · unit"
              className={INPUT}
            />
          </Field>
          <Field label="Date witnessed">
            <input
              type="date"
              value={form.witnessed}
              onChange={set('witnessed')}
              className={INPUT + ' [color-scheme:dark]'}
            />
          </Field>
        </div>

        <Field label="Describe what you recorded" required>
          <textarea
            required
            rows={6}
            placeholder="Begin with the first thing you noticed. Do not edit. Do not go back. Leave in what didn't make sense."
            className={INPUT + ' resize-y min-h-[160px]'}
          />
        </Field>

        <Field label="Upload artifact (optional)">
          <label className="relative flex flex-col items-center justify-center gap-3 p-8 text-center border border-dashed border-white/[0.18] hover:border-rust/60 bg-white/[0.01] hover:bg-white/[0.025] cursor-pointer transition-colors">
            <span className="relative inline-flex size-10 items-center justify-center border border-white/[0.15]">
              <span className="absolute inset-1 border border-white/[0.08]" />
              <span className="font-mono text-[11px] text-bone">↑</span>
            </span>
            <span className="font-mono text-[11px] uppercase tracking-widest-2 text-bone">
              select file · drop here
            </span>
            <span className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-400">
              jpg · png · mp4 · wav · max 100mb
            </span>
            <input type="file" className="sr-only" aria-label="Upload artifact" />
          </label>
        </Field>

        <div className="flex flex-col sm:flex-row sm:items-center gap-5 pt-4 border-t border-white/[0.06]">
          <label className="flex items-start gap-3 text-ash-200/80 text-sm max-w-md">
            <input
              type="checkbox"
              required
              className="mt-1 accent-rust-bright size-4 bg-transparent border border-white/[0.15]"
            />
            <span>
              I understand the archive may quarantine this record, may never publish it, and may
              reclassify it without notice. I submit it anyway.
            </span>
          </label>
          <WhisperHint lockMessage="you will not be able to take this back">
            <button
              type="submit"
              disabled={state !== 'idle'}
              className="group relative inline-flex items-center gap-3 px-6 py-4 bg-rust-bright hover:bg-rust text-bone font-mono text-[11px] uppercase tracking-widest-2 transition-colors disabled:opacity-60"
            >
              <span className="size-1 bg-bone animate-pulse-soft" />
              {state === 'sending'
                ? 'routing through cell 07…'
                : state === 'received'
                ? '◼ transmission received'
                : 'execute transmission →'}
            </button>
          </WhisperHint>
        </div>

        <AnimatePresence>
          {state === 'received' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="border border-rust/40 bg-rust-deep/10 p-5"
            >
              <span className="mono-label text-rust-bright">◼ transmission archived</span>
              <p className="mt-3 text-bone text-sm max-w-xl leading-relaxed">
                Your record has entered the holding cell. If the material stabilises, an operator will
                be in touch within seven days. If it does not, you may still receive a reply.
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </fieldset>
    </form>
  )
}

const INPUT =
  'w-full bg-white/[0.015] border border-white/[0.08] focus:border-rust/50 px-4 py-3 text-sm text-bone placeholder:text-ash-500 outline-none transition-colors'

function Field({ label, required, children }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-300 flex items-center gap-2">
        {label}
        {required && <span className="text-rust-bright">*</span>}
      </span>
      {children}
    </label>
  )
}
