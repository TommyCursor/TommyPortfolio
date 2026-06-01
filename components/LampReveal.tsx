'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ─── Dust motes floating in the dark room ────────────────────────────────────
const MOTES = [
  { left: '28%', top: '35%', dur: 5.2, delay: 0 },
  { left: '45%', top: '55%', dur: 4.1, delay: 1.2 },
  { left: '62%', top: '28%', dur: 6.3, delay: 0.5 },
  { left: '72%', top: '65%', dur: 4.8, delay: 2.1 },
  { left: '18%', top: '50%', dur: 5.6, delay: 0.9 },
  { left: '55%', top: '42%', dur: 3.9, delay: 1.7 },
  { left: '38%', top: '70%', dur: 5.0, delay: 3.0 },
  { left: '80%', top: '38%', dur: 4.4, delay: 0.3 },
]

// ─── Lamp + rope SVG ─────────────────────────────────────────────────────────
function LampSVG({
  glowOpacity,
  ropeState,
  onPull,
}: {
  glowOpacity: number
  ropeState: 'idle' | 'pulling'
  onPull: () => void
}) {
  return (
    <svg width="180" height="580" viewBox="-90 0 180 580" style={{ overflow: 'visible' }}>
      <defs>
        <radialGradient id="bulbCore" cx="50%" cy="70%" r="60%">
          <stop offset="0%"   stopColor="#FFFDE0" stopOpacity="1" />
          <stop offset="40%"  stopColor="#FFD060" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#FF8800" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="shadeGlow" cx="50%" cy="0%" r="100%">
          <stop offset="0%"   stopColor="#FFF4A0" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FFF4A0" stopOpacity="0" />
        </radialGradient>
        <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFE060" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#FFE060" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* ── Ceiling fixture ──────────────────────────── */}
      <rect x="-35" y="0" width="70" height="6" rx="3" fill="#1a1a1a" />
      <ellipse cx="0" cy="10" rx="22" ry="8" fill="#222" />
      <ellipse cx="0" cy="10" rx="16" ry="5" fill="#2c2c2c" />

      {/* ── Electrical cord ──────────────────────────── */}
      <line x1="0" y1="18" x2="0" y2="138" stroke="#1e1e1e" strokeWidth="3" />
      <line x1="0" y1="18" x2="0" y2="138" stroke="#2a2a2a" strokeWidth="1.5" strokeDasharray="4 6" />

      {/* ── Lamp shade ───────────────────────────────── */}
      {/* Outer shade — bell */}
      <path
        d="M -20,138 C -26,168 -55,228 -68,272 C -74,294 -76,305 -76,310 L 76,310 C 76,305 74,294 68,272 C 55,228 26,168 20,138 Z"
        fill="#161616"
      />
      {/* Inner shade slightly lighter */}
      <path
        d="M -16,142 C -21,170 -48,230 -60,272 C -65,292 -67,304 -67,309 L 67,309 C 67,304 65,292 60,272 C 48,230 21,170 16,142 Z"
        fill="#1c1c1c"
      />
      {/* Decorative band */}
      <path
        d="M -38,196 L -46,218 L 46,218 L 38,196 Z"
        fill="none" stroke="#232323" strokeWidth="1"
      />
      <path
        d="M -50,242 L -56,262 L 56,262 L 50,242 Z"
        fill="none" stroke="#212121" strokeWidth="0.8"
      />

      {/* Top rim */}
      <ellipse cx="0" cy="138" rx="20" ry="6"  fill="#222" />
      <ellipse cx="0" cy="138" rx="15" ry="4"  fill="#2e2e2e" />

      {/* Bottom rim */}
      <ellipse cx="0" cy="310" rx="76"  ry="11" fill="#1e1e1e" />
      <ellipse cx="0" cy="310" rx="72"  ry="8"  fill="#242424" />

      {/* ── Edison bulb ───────────────────────────────── */}
      <ellipse cx="0" cy="210" rx="15" ry="24" fill="#141414" />
      <ellipse cx="0" cy="226" rx="12" ry="9"  fill="#181818" />
      {/* Filament detail */}
      <path d="M -5,204 C -2,210 2,215 0,221 C -2,226 2,231 0,236"
        stroke="#1e1e1e" strokeWidth="1.2" fill="none" strokeLinecap="round" />

      {/* ── GLOW layers — controlled by glowOpacity ───── */}
      <g opacity={glowOpacity}>
        {/* Halo around lamp */}
        <ellipse cx="0" cy="224" rx="80"  ry="100" fill="url(#haloGlow)" />
        {/* Bulb filament glow */}
        <ellipse cx="0" cy="210" rx="17"  ry="27" fill="#FFFDE0" opacity="0.65" />
        <ellipse cx="0" cy="228" rx="13"  ry="10" fill="#FFEE80" opacity="0.5" />
        {/* Glow through bottom opening */}
        <ellipse cx="0" cy="310" rx="70"  ry="9"  fill="url(#bulbCore)" />
        {/* Inner shade warm tint */}
        <path
          d="M -14,145 C -19,172 -45,232 -58,272 C -62,291 -64,303 -64,308 L 64,308 C 64,303 62,291 58,272 C 45,232 19,172 14,145 Z"
          fill="#FFF4A0" opacity="0.06"
        />
        {/* Cone of light below shade */}
        <path d="M -76,318 L -340,580 L 340,580 L 76,318 Z" fill="url(#shadeGlow)" />
      </g>

      {/* ── Pull rope ────────────────────────────────── */}
      <motion.g
        animate={ropeState === 'pulling' ? { y: [0, 58, -18, 12, -6, 3, -1, 0] } : { y: 0 }}
        transition={ropeState === 'pulling'
          ? { duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }
          : { type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Rope body — S-curve braid */}
        <motion.path
          d="M 0,318 C 6,338 -6,358 0,378 C 6,398 -6,418 0,438 C 6,458 -6,478 0,498 C 4,512 -3,525 0,535"
          stroke="#9B8060"
          strokeWidth="5.5"
          fill="none"
          strokeLinecap="round"
          whileHover={{ stroke: '#C4A878' }}
          style={{ cursor: 'pointer' }}
          onClick={onPull}
        />
        {/* Braid texture marks */}
        {[330, 348, 366, 384, 402, 420, 438, 456, 474, 492, 508, 522].map((y, i) => (
          <line
            key={y}
            x1={i % 2 === 0 ? -5 : 5}
            y1={y}
            x2={i % 2 === 0 ? 5 : -5}
            y2={y + 10}
            stroke="#7A6040"
            strokeWidth="2"
            opacity="0.55"
            style={{ pointerEvents: 'none' }}
          />
        ))}

        {/* Wooden pull bead */}
        <motion.g
          onClick={onPull}
          style={{ cursor: 'pointer' }}
          whileHover={{ scale: 1.15 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        >
          {/* Knot above bead */}
          <ellipse cx="0" cy="540" rx="7"  ry="5"  fill="#5A3E18" />
          {/* Bead body */}
          <ellipse cx="0" cy="553" rx="12" ry="15" fill="#8B6030" />
          {/* Grain highlight */}
          <ellipse cx="-3" cy="549" rx="4"  ry="7"  fill="#A87848" opacity="0.5" />
          <ellipse cx="3"  cy="558" rx="3"  ry="5"  fill="#6A4820" opacity="0.4" />
          {/* Rim grooves */}
          <ellipse cx="0" cy="544" rx="10" ry="3"  fill="#4A3010" opacity="0.8" />
          <ellipse cx="0" cy="567" rx="10" ry="3"  fill="#4A3010" opacity="0.8" />
        </motion.g>

        {/* Wide invisible hit area */}
        <rect
          x="-26" y="314" width="52" height="270"
          fill="transparent"
          style={{ cursor: 'pointer' }}
          onClick={onPull}
        />
      </motion.g>
    </svg>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
type Stage = 'idle' | 'pulling' | 'flickering' | 'warming' | 'blazing' | 'flashing' | 'flooding'

export default function LampReveal({ onComplete }: { onComplete: () => void }) {
  const [stage, setStage] = useState<Stage>('idle')
  const [showHint, setShowHint] = useState(false)
  // Controlled glow opacity (0 = off, 1 = full)
  const [glowOpacity, setGlowOpacity] = useState(0)

  // Show hint after 4 s of inaction
  useEffect(() => {
    const t = setTimeout(() => { if (stage === 'idle') setShowHint(true) }, 4000)
    return () => clearTimeout(t)
  }, [stage])

  const handlePull = () => {
    if (stage !== 'idle') return
    setShowHint(false)
    setStage('pulling')

    // ── Act 1: Rope pull + dramatic lamp swing (0–1200ms) ──
    // nothing visible yet

    // ── Act 2: Flicker strobe — bulb trying to start (800–1900ms) ──
    setTimeout(() => {
      setStage('flickering')
      // Strobe the glow opacity manually for cinematic effect
      const flickers = [
        [0.6, 80],   [0, 120],  [0.4, 80],  [0, 160],
        [0.8, 60],   [0, 100],  [0.3, 140], [0, 80],
        [0.7, 70],   [0, 110],  [0.5, 90],  [0, 130],
      ] as [number, number][]
      let elapsed = 0
      flickers.forEach(([opacity, delay]) => {
        elapsed += delay
        setTimeout(() => setGlowOpacity(opacity), elapsed)
      })
    }, 800)

    // ── Act 3: Dim glow — struggling but staying on (1900–3400ms) ──
    setTimeout(() => {
      setStage('warming')
      setGlowOpacity(0.28)
    }, 1900)
    // Slowly build glow opacity via increments
    const buildSteps = [
      [0.32, 2100], [0.38, 2350], [0.44, 2600],
      [0.50, 2850], [0.58, 3100], [0.68, 3400],
    ] as [number, number][]
    buildSteps.forEach(([op, t]) => setTimeout(() => setGlowOpacity(op), t))

    // ── Act 4: BLAZE — glow surges to full (3400–4000ms) ──
    setTimeout(() => {
      setStage('blazing')
      setGlowOpacity(0.78)
      setTimeout(() => setGlowOpacity(1.0), 200)
    }, 3400)

    // ── Act 5: FLASH — instant white, then warm flood (4000ms+) ──
    setTimeout(() => setStage('flashing'), 4000)
    setTimeout(() => setStage('flooding'), 4200)

    // ── Done — reveal portfolio (5600ms) ──
    setTimeout(() => onComplete(), 5600)
  }

  const isLit     = glowOpacity > 0
  const ropeState = stage === 'pulling' || stage === 'flickering' ? 'pulling' : 'idle'

  return (
    <div className="fixed inset-0 z-[9998] overflow-hidden" style={{ backgroundColor: '#080808' }}>

      {/* Radial vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 28%, transparent 0%, rgba(0,0,0,0.82) 100%)' }}
      />

      {/* Dust motes */}
      {MOTES.map((m, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{ left: m.left, top: m.top, width: 2, height: 2, backgroundColor: '#1a1a1a' }}
          animate={{ y: [-12, 12], opacity: [0, 0.25, 0] }}
          transition={{ duration: m.dur, repeat: Infinity, delay: m.delay, ease: 'easeInOut', repeatType: 'reverse' }}
        />
      ))}

      {/* Very faint floor line */}
      <div
        className="absolute bottom-0 left-0 right-0 pointer-events-none"
        style={{ height: 1, background: 'linear-gradient(to right, transparent, #181818 25%, #181818 75%, transparent)' }}
      />

      {/* ── Lamp ───────────────────────────────────────── */}
      <motion.div
        className="absolute"
        style={{ left: '50%', top: 0, transform: 'translateX(-50%)', transformOrigin: '50% 0%' }}
        animate={
          stage === 'pulling' || stage === 'flickering'
            ? { rotate: [-16, 14, -10, 7, -4, 2, -1, 0] }
            : { rotate: [-1.4, 1.4] }
        }
        transition={
          stage === 'pulling' || stage === 'flickering'
            ? { duration: 2.8, ease: 'easeInOut' }
            : { duration: 5, repeat: Infinity, ease: 'easeInOut', repeatType: 'reverse' }
        }
      >
        {/* Outer warm halo that grows as glow builds */}
        {isLit && (
          <motion.div
            className="absolute pointer-events-none"
            style={{
              left: '50%', top: 200,
              width: 500, height: 500,
              transform: 'translate(-50%, -50%)',
              borderRadius: '50%',
              background: 'radial-gradient(circle, rgba(255,220,80,0.12) 0%, transparent 65%)',
            }}
            animate={{ opacity: glowOpacity, scale: 0.6 + glowOpacity * 0.8 }}
            transition={{ duration: 0.3 }}
          />
        )}

        <LampSVG glowOpacity={glowOpacity} ropeState={ropeState} onPull={handlePull} />
      </motion.div>

      {/* ── Floor glow — casts light on the ground ──────── */}
      <AnimatePresence>
        {isLit && (
          <motion.div
            className="absolute bottom-0 left-1/2 pointer-events-none"
            style={{ transform: 'translateX(-50%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: glowOpacity }}
            transition={{ duration: 0.4 }}
          >
            <div
              style={{
                width: 700, height: 280,
                background: 'radial-gradient(ellipse at 50% 100%, rgba(255,210,80,0.1) 0%, transparent 65%)',
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── FLASH — instant bright white at the peak ──────── */}
      <AnimatePresence>
        {(stage === 'flashing' || stage === 'flooding') && (
          <motion.div
            className="absolute inset-0 pointer-events-none"
            style={{ backgroundColor: '#FFFFF8', zIndex: 10 }}
            initial={{ opacity: 0 }}
            animate={
              stage === 'flashing'
                ? { opacity: [0, 1, 0.9] }
                : { opacity: 0 }
            }
            transition={
              stage === 'flashing'
                ? { duration: 0.22, ease: 'easeOut' }
                : { duration: 0.6, ease: 'easeIn' }
            }
          />
        )}
      </AnimatePresence>

      {/* ── FLOOD — warm radial expansion ─────────────────── */}
      {stage === 'flooding' && (
        <motion.div
          className="absolute pointer-events-none rounded-full"
          style={{
            left: '50%',
            top: 310,
            background: 'radial-gradient(circle, #FFFEF5 0%, #FDF9EC 25%, #FAF6E6 55%, #F8F7F4 80%)',
            zIndex: 9,
          }}
          initial={{ width: 60, height: 60, x: '-50%', y: '-50%', opacity: 1 }}
          animate={{ width: '320vmax', height: '320vmax', x: '-50%', y: '-50%' }}
          transition={{ duration: 1.35, ease: [0.16, 1, 0.3, 1] }}
        />
      )}

      {/* ── Hint ─────────────────────────────────────────── */}
      <AnimatePresence>
        {showHint && stage === 'idle' && (
          <motion.div
            className="absolute left-1/2 bottom-[9%] flex flex-col items-center gap-2.5"
            style={{ transform: 'translateX(-50%)' }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.span
              style={{ color: '#2e2e2e', fontSize: 16, display: 'block' }}
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            >
              ↓
            </motion.span>
            <p
              className="font-sans uppercase tracking-widest"
              style={{ color: '#282828', fontSize: '9px', letterSpacing: '0.35em' }}
            >
              Pull to enter
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
