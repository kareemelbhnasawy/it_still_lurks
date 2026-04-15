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
          <div className="border border-white/[0.08] bg-white/[0.012] divide-y divide-white/[0.06]">
            {TYPES.map((t, index) => (
              <button
                type="button"
                key={t.id}
                onClick={() => setType(t.id)}
                aria-pressed={type === t.id}
                className={`group relative flex w-full items-center justify-between px-4 py-4 text-left transition-colors ${
                  type === t.id
                    ? 'bg-white/[0.03] text-bone'
                    : 'text-ash-300 hover:text-bone hover:bg-white/[0.02]'
                }`}
              >
                <div className="flex items-baseline gap-4">
                  <span className="font-mono text-[10px] text-ash-500 tracking-widest-2 shrink-0">
                    / {String(index + 1).padStart(2, '0')}
                  </span>
                  <div>
                    <span className="font-mono text-[11px] uppercase tracking-widest-2 block">{t.label}</span>
                    <span className="font-mono text-[9px] uppercase tracking-widest-2 text-ash-500 block mt-1">
                      {t.id} · intake lane
                    </span>
                  </div>
                </div>
                <span className="mono-label-sm">{type === t.id ? 'active' : 'queue'}</span>
                {type === t.id && <span className="absolute inset-y-0 left-0 w-px bg-rust-bright" />}
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
          <label className="relative grid gap-5 border border-white/[0.08] bg-white/[0.012] px-5 py-6 hover:border-rust/60 hover:bg-white/[0.02] cursor-pointer transition-colors">
            <div className="flex items-center justify-between gap-4 border-b border-white/[0.06] pb-4">
              <span className="font-mono text-[11px] uppercase tracking-widest-2 text-bone">
                artifact bay
              </span>
              <span className="mono-label-sm">slot open</span>
            </div>
            <div className="grid grid-cols-[auto_1fr] gap-4 items-start">
              <span className="inline-flex h-10 w-10 items-center justify-center border border-white/[0.12] font-mono text-[11px] text-bone">
                ↑
              </span>
              <div>
                <span className="font-mono text-[11px] uppercase tracking-widest-2 text-bone block">
                  attach recovered material
                </span>
                <span className="font-mono text-[10px] uppercase tracking-widest-2 text-ash-400 block mt-2">
                  jpg · png · mp4 · wav · max 100mb
                </span>
              </div>
            </div>
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
  'w-full bg-transparent border-0 border-b border-white/[0.12] focus:border-rust/60 px-0 py-3 text-sm text-bone placeholder:text-ash-500 outline-none transition-colors'

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
