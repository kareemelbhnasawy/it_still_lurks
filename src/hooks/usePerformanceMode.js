import { useEffect, useState } from 'react'
import { useReducedMotion } from '@/hooks/useReducedMotion'

function detectMode() {
  if (typeof window === 'undefined') return 'high'

  const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection
  const saveData = Boolean(connection?.saveData)
  const deviceMemory = navigator.deviceMemory || 8
  const cores = navigator.hardwareConcurrency || 8
  const coarse = window.matchMedia?.('(pointer: coarse)').matches ?? false
  const narrow = window.innerWidth < 900
  const mediumViewport = window.innerWidth < 1280

  if (saveData || deviceMemory <= 4 || cores <= 4 || (coarse && narrow)) return 'low'
  if (deviceMemory <= 8 || cores <= 8 || coarse || mediumViewport) return 'medium'
  return 'high'
}

export function usePerformanceMode() {
  const reduced = useReducedMotion()
  const [mode, setMode] = useState(() => (reduced ? 'low' : detectMode()))

  useEffect(() => {
    if (reduced) {
      setMode('low')
      return
    }

    const update = () => setMode(detectMode())
    update()

    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [reduced])

  return {
    mode,
    low: mode === 'low',
    medium: mode === 'medium',
    high: mode === 'high',
  }
}
