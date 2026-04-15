import { createContext, useCallback, useContext, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const InfectionCtx = createContext(null)

// Levels:
//  0 — pristine (default)
//  1 — first interaction: micro-delay on link clicks, subtle noise up
//  2 — hostile: scanline desync, aggressive text glitch on hover, sensor drift
//  3 — full breach: invoked by FalseHopeButton, contrast shift, severe vignette
export function InfectionProvider({ children }) {
  const [level, setLevelState] = useState(0)
  const reduced = useReducedMotion()
  const dispatchingRef = useRef(false)

  const bump = useCallback((to) => {
    setLevelState((current) => (to > current ? to : current))
  }, [])

  const setLevel = useCallback((to) => {
    setLevelState(Math.max(0, Math.min(3, to)))
  }, [])

  // Mirror level to <html data-infection="N"> so CSS can react anywhere.
  useEffect(() => {
    document.documentElement.dataset.infection = String(level)
    return () => {
      if (document.documentElement.dataset.infection === String(level)) {
        delete document.documentElement.dataset.infection
      }
    }
  }, [level])

  // Level 1 on first interaction — anywhere on the page.
  useEffect(() => {
    if (level > 0) return
    const onFirst = () => bump(1)
    window.addEventListener('pointerdown', onFirst, { once: true })
    window.addEventListener('keydown', onFirst, { once: true })
    return () => {
      window.removeEventListener('pointerdown', onFirst)
      window.removeEventListener('keydown', onFirst)
    }
  }, [level, bump])

  // Click delay at level 1+: intercept link navigations, delay 50–400ms, re-dispatch.
  // Only hits anchor clicks — form submits, inputs, and regular buttons stay responsive.
  //
  // IMPORTANT: any element that carries data-no-nav="true" is skipped entirely —
  // VolatileRedaction uses this so tapping a redacted word inside an ArchiveCard
  // never re-dispatches a click on the parent anchor (which would navigate the
  // route and scroll the page to top).
  useEffect(() => {
    if (level < 1 || reduced) return

    const handler = (e) => {
      if (dispatchingRef.current) return
      if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return

      const target = e.target
      if (!target || !target.closest) return

      // The click originated inside something that handles its own interaction.
      // Let it run unmodified — the component's own handler will preventDefault.
      if (target.closest('[data-no-nav="true"]')) return

      const link = target.closest('a[href]')
      if (!link) return

      e.preventDefault()
      e.stopImmediatePropagation()

      const delay = 50 + Math.random() * 350
      setTimeout(() => {
        dispatchingRef.current = true
        const clone = new MouseEvent('click', {
          bubbles: true,
          cancelable: true,
          view: window,
          button: 0,
        })
        link.dispatchEvent(clone)
        dispatchingRef.current = false
      }, delay)
    }

    document.addEventListener('click', handler, true)
    return () => document.removeEventListener('click', handler, true)
  }, [level, reduced])

  return (
    <InfectionCtx.Provider value={{ level, bump, setLevel }}>{children}</InfectionCtx.Provider>
  )
}

export function useInfection() {
  const ctx = useContext(InfectionCtx)
  if (!ctx) throw new Error('useInfection must be used inside <InfectionProvider>')
  return ctx
}
