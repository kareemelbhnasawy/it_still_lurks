import { useCallback, useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

const ZALGO_ABOVE = ['̍','̎','̄','̅','̿','̑','̆','̐','͒','͗','͑','̇','̈','̊','͂','̓','̈́','͊','͋','͌','̃','̂','̌','͐']
const ZALGO_BELOW = ['̖','̗','̘','̙','̜','̝','̞','̟','̠','̤','̥','̦','̩','̪','̫','̬','̭','̮','̯','̰','̱','̲','̳','̹','̺','̻','̼','ͅ','͇','͈','͉','͍','͎','͓','͔','͕','͖','͙','͚']
const ZALGO_MIDDLE = ['̕','̛','̀','́','͘','̡','̢','̧','̨','̴','̵','̶','͜','͝','͞','͟','͠','͢','̸','̷','͡']

function zalgo(str, intensity = 3) {
  return str
    .split('')
    .map((ch) => {
      if (ch === ' ') return ch
      let out = ch
      for (let i = 0; i < intensity; i++) {
        out += ZALGO_ABOVE[Math.floor(Math.random() * ZALGO_ABOVE.length)]
        if (Math.random() > 0.4) out += ZALGO_BELOW[Math.floor(Math.random() * ZALGO_BELOW.length)]
        if (Math.random() > 0.5) out += ZALGO_MIDDLE[Math.floor(Math.random() * ZALGO_MIDDLE.length)]
      }
      return out
    })
    .join('')
}

// Inline redacted block. Looks static.
// On hover: violently cycles through zalgo, settles into the true word,
// then on mouse leave snaps back to redacted with a lingering red drop-shadow.
export default function VolatileRedaction({ reveal, width }) {
  const reduced = useReducedMotion()
  const [state, setState] = useState('idle') // idle | cycling | revealed | leaving
  const [display, setDisplay] = useState(reveal)
  const cycleRef = useRef(null)
  const leaveRef = useRef(null)

  const stopTimers = useCallback(() => {
    if (cycleRef.current) {
      clearInterval(cycleRef.current)
      cycleRef.current = null
    }
    if (leaveRef.current) {
      clearTimeout(leaveRef.current)
      leaveRef.current = null
    }
  }, [])

  useEffect(() => stopTimers, [stopTimers])

  const onEnter = () => {
    if (reduced) {
      setState('revealed')
      setDisplay(reveal)
      return
    }
    stopTimers()
    setState('cycling')
    let iters = 0
    cycleRef.current = setInterval(() => {
      iters += 1
      setDisplay(zalgo(reveal, 2 + Math.floor(Math.random() * 3)))
      if (iters >= 7) {
        clearInterval(cycleRef.current)
        cycleRef.current = null
        setDisplay(reveal)
        setState('revealed')
      }
    }, 55)
  }

  const onLeave = () => {
    // Don't interrupt cycling — let the zalgo animation complete to revealed state.
    // On touch devices, blur fires immediately after tap/focus, which would abort
    // the cycle mid-way, leaving the text "staggered and unrevealed".
    if (state === 'cycling') return

    stopTimers()
    setState('leaving')
    leaveRef.current = setTimeout(() => {
      setState('idle')
      setDisplay(reveal)
    }, 650)
  }

  // Swallow click + pointerdown so we never bubble into a parent <Link>.
  // Without this, clicking a redaction inside an ArchiveCard navigates the page
  // and ScrollRestoration jumps you back to the top of the new route.
  const swallow = (e) => {
    e.preventDefault()
    e.stopPropagation()
    // On touch devices there's no hover — a tap should still reveal.
    if (state === 'idle' || state === 'leaving') onEnter()
  }

  const ariaLabel =
    state === 'revealed' ? reveal : `redacted · hover or tap to reveal`

  return (
    <span
      className="volatile-red"
      data-state={state}
      data-no-nav="true"
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      onClickCapture={swallow}
      onPointerDownCapture={(e) => e.stopPropagation()}
      onMouseDownCapture={(e) => e.stopPropagation()}
      onTouchStartCapture={(e) => e.stopPropagation()}
      aria-label={ariaLabel}
      style={{ minWidth: width || `${Math.max(reveal.length * 0.6, 3)}ch` }}
    >
      {state === 'idle' || state === 'leaving' ? reveal : display}
    </span>
  )
}
