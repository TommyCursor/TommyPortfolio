'use client'
import { useState } from 'react'
import dynamic from 'next/dynamic'

const Preloader    = dynamic(() => import('./Preloader'),    { ssr: false })
const LampReveal   = dynamic(() => import('./LampReveal'),   { ssr: false })
const WaterOverlay = dynamic(() => import('./WaterOverlay'), { ssr: false })

type Phase = 'loading' | 'lamp' | 'water' | 'done'

export default function PageWrapper({ children }: { children: React.ReactNode }) {
  const [phase, setPhase] = useState<Phase>('loading')

  return (
    <>
      {/* Act 1 — hacker terminal preloader */}
      {phase === 'loading' && (
        <Preloader onComplete={() => setPhase('lamp')} />
      )}

      {/* Act 2 — dark room, pull the lamp */}
      {phase === 'lamp' && (
        <LampReveal onComplete={() => setPhase('water')} />
      )}

      {/* Act 3 — flooded screen, click to drain */}
      {phase === 'water' && (
        <WaterOverlay onDrained={() => setPhase('done')} />
      )}

      {/* Portfolio — rendered throughout (fonts/images preload silently).
          visible only once the lamp is pulled (water + done phases). */}
      <div style={{ visibility: (phase === 'water' || phase === 'done') ? 'visible' : 'hidden' }}>
        {children}
      </div>
    </>
  )
}
