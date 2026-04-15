import { useEffect } from 'react'

const AWAY_MESSAGES = [
  "don't come back",
  'we saw you leave',
  "it's still here",
  'we are still watching',
  'come back to the archive',
  'the hallway is still empty',
  'the archive is waiting',
  '◼ signal unstable',
  "it's closer now",
  'your frequency is open',
]

// When the browser tab is hidden, cycle the document title through creepy
// messages. Restore the original title the moment the tab is visible again.
export function useCreepyTitle(original = 'IT STILL LURKS — Archive') {
  useEffect(() => {
    let idx = 0
    let intervalId = null

    const onVis = () => {
      if (document.hidden) {
        // first change fires immediately so the tab icon label updates
        document.title = AWAY_MESSAGES[idx % AWAY_MESSAGES.length]
        idx += 1
        intervalId = setInterval(() => {
          document.title = AWAY_MESSAGES[idx % AWAY_MESSAGES.length]
          idx += 1
        }, 1400)
      } else {
        if (intervalId) {
          clearInterval(intervalId)
          intervalId = null
        }
        document.title = original
      }
    }

    document.addEventListener('visibilitychange', onVis)
    return () => {
      document.removeEventListener('visibilitychange', onVis)
      if (intervalId) clearInterval(intervalId)
      document.title = original
    }
  }, [original])
}
