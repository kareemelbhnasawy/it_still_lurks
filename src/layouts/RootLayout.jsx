import { useEffect } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router-dom'
import { useCreepyTitle } from '@/hooks/useCreepyTitle'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import AmbientBackground from '@/components/AmbientBackground'
import NoiseOverlay from '@/components/NoiseOverlay'
import CorruptionFlash from '@/components/CorruptionFlash'
import MobileTabBar from '@/components/MobileTabBar'
import InfectionOverlay from '@/components/InfectionOverlay'
import TacticalScanBar from '@/components/TacticalScanBar'
import CreepyFigurines from '@/components/CreepyFigurines'
import PurgeAftermath from '@/components/PurgeAftermath'
import { InfectionProvider } from '@/context/InfectionContext'
import { usePerformanceMode } from '@/hooks/usePerformanceMode'

export default function RootLayout() {
  const location = useLocation()
  const { mode } = usePerformanceMode()
  useCreepyTitle()

  useEffect(() => {
    // Scroll to top on route change (belt + suspenders alongside ScrollRestoration).
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  useEffect(() => {
    document.documentElement.dataset.performance = mode
    return () => {
      if (document.documentElement.dataset.performance === mode) {
        delete document.documentElement.dataset.performance
      }
    }
  }, [mode])

  return (
    <InfectionProvider>
      <div className="relative min-h-dvh bg-void text-bone" data-performance={mode}>
        <AmbientBackground />
        <Navbar />
        <div className="relative z-10 flex min-h-dvh flex-col infection-frame">
          <main className="relative flex-1 pb-16 lg:pb-0">
            <Outlet />
          </main>
          <Footer />
        </div>
        <NoiseOverlay opacity={0.09} />
        <InfectionOverlay />
        <CreepyFigurines />
        <CorruptionFlash />
        <PurgeAftermath />
        <TacticalScanBar />
        <MobileTabBar />
        <ScrollRestoration />
      </div>
    </InfectionProvider>
  )
}
