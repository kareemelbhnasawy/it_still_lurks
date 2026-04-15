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

export default function RootLayout() {
  const location = useLocation()
  useCreepyTitle()

  useEffect(() => {
    // Scroll to top on route change (belt + suspenders alongside ScrollRestoration).
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [location.pathname])

  return (
    <InfectionProvider>
      <div className="relative min-h-dvh flex flex-col bg-void text-bone">
        <AmbientBackground />
        <Navbar />
        <main className="relative z-10 flex-1 pb-16 lg:pb-0">
          <Outlet />
        </main>
        <Footer />
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
