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
  const lit = glowOpacity > 0
  return (
    <svg width="200" height="600" viewBox="-100 0 200 600" style={{ overflow: 'visible' }}>
      <defs>
        {/* Ceiling mount metal */}
        <linearGradient id="ceilGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#3a3a3a" />
          <stop offset="100%" stopColor="#111111" />
        </linearGradient>
        {/* Shade outer — dark charcoal with subtle side shading */}
        <linearGradient id="shadeOuter" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#0c0c0c" />
          <stop offset="22%"  stopColor="#1e1e1e" />
          <stop offset="50%"  stopColor="#191919" />
          <stop offset="78%"  stopColor="#1e1e1e" />
          <stop offset="100%" stopColor="#0c0c0c" />
        </linearGradient>
        {/* Metallic highlight on left face */}
        <linearGradient id="shadeSheen" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#3c3c3c" stopOpacity="1" />
          <stop offset="18%"  stopColor="#2a2a2a" stopOpacity="0.5" />
          <stop offset="40%"  stopColor="#1a1a1a" stopOpacity="0" />
        </linearGradient>
        {/* Rim metallic */}
        <linearGradient id="rimGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%"   stopColor="#383838" />
          <stop offset="50%"  stopColor="#202020" />
          <stop offset="100%" stopColor="#141414" />
        </linearGradient>
        {/* Edison glass — dark amber unlit */}
        <radialGradient id="bulbGlass" cx="38%" cy="32%" r="62%">
          <stop offset="0%"   stopColor="#2e1c08" stopOpacity="0.85" />
          <stop offset="55%"  stopColor="#1a1005" stopOpacity="0.65" />
          <stop offset="100%" stopColor="#0d0802" stopOpacity="0.5"  />
        </radialGradient>
        {/* Edison glass lit */}
        <radialGradient id="bulbGlassLit" cx="38%" cy="32%" r="62%">
          <stop offset="0%"   stopColor="#FFFDE0" stopOpacity="1"   />
          <stop offset="30%"  stopColor="#FFD060" stopOpacity="0.9" />
          <stop offset="70%"  stopColor="#FF9010" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#FF6000" stopOpacity="0"   />
        </radialGradient>
        {/* Halo */}
        <radialGradient id="haloGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#FFD050" stopOpacity="0.22" />
          <stop offset="100%" stopColor="#FF8000" stopOpacity="0"    />
        </radialGradient>
        {/* Light cone */}
        <radialGradient id="shadeGlow" cx="50%" cy="0%" r="100%">
          <stop offset="0%"   stopColor="#FFF4A0" stopOpacity="0.28" />
          <stop offset="60%"  stopColor="#FFD060" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#FFA000" stopOpacity="0"    />
        </radialGradient>
        {/* Rope */}
        <linearGradient id="ropeGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#4a3018" />
          <stop offset="40%"  stopColor="#9a7848" />
          <stop offset="100%" stopColor="#4a3018" />
        </linearGradient>
        {/* Bead wood */}
        <linearGradient id="beadGrad" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#3e2008" />
          <stop offset="28%"  stopColor="#a07040" />
          <stop offset="55%"  stopColor="#8b5c28" />
          <stop offset="100%" stopColor="#3e2008" />
        </linearGradient>
      </defs>

      {/* ── Ceiling plate ─────────────────────────────── */}
      <rect x="-44" y="0" width="88" height="9" rx="4.5" fill="url(#ceilGrad)" />
      {/* Screw details */}
      <circle cx="-22" cy="4.5" r="2.2" fill="#0d0d0d" />
      <circle cx="22"  cy="4.5" r="2.2" fill="#0d0d0d" />
      <line x1="-23.5" y1="4.5" x2="-20.5" y2="4.5" stroke="#1a1a1a" strokeWidth="0.7" />
      <line x1="-22" y1="3" x2="-22" y2="6" stroke="#1a1a1a" strokeWidth="0.7" />
      <line x1="20.5" y1="4.5" x2="23.5" y2="4.5" stroke="#1a1a1a" strokeWidth="0.7" />
      <line x1="22" y1="3" x2="22" y2="6" stroke="#1a1a1a" strokeWidth="0.7" />
      {/* Canopy */}
      <ellipse cx="0" cy="14"  rx="26" ry="10" fill="#1e1e1e" />
      <ellipse cx="0" cy="14"  rx="19" ry="7"  fill="#2a2a2a" />
      <ellipse cx="0" cy="11"  rx="14" ry="4"  fill="#303030" />

      {/* ── Twisted cord ──────────────────────────────── */}
      {/* Main cord body */}
      <path d="M 0,22 L 0,144" stroke="#1c1c1c" strokeWidth="4" strokeLinecap="round" />
      {/* Twist highlight — left strand */}
      <path
        d="M -1.5,22 C -1.5,35 1.5,40 1.5,50 C 1.5,60 -1.5,65 -1.5,75 C -1.5,85 1.5,90 1.5,100 C 1.5,110 -1.5,115 -1.5,125 C -1.5,135 1.5,140 1.5,144"
        stroke="#2e2e2e" strokeWidth="1.4" fill="none" strokeLinecap="round"
      />
      {/* Twist highlight — right strand */}
      <path
        d="M 1.5,22 C 1.5,35 -1.5,40 -1.5,50 C -1.5,60 1.5,65 1.5,75 C 1.5,85 -1.5,90 -1.5,100 C -1.5,110 1.5,115 1.5,125 C 1.5,135 -1.5,140 -1.5,144"
        stroke="#2e2e2e" strokeWidth="1.4" fill="none" strokeLinecap="round"
      />

      {/* ── Lamp shade ────────────────────────────────── */}
      {/* Shadow/depth behind shade */}
      <path
        d="M -22,144 C -28,176 -58,238 -72,286 C -78,310 -80,322 -80,328 L 80,328 C 80,322 78,310 72,286 C 58,238 28,176 22,144 Z"
        fill="#0a0a0a" opacity="0.8"
      />
      {/* Shade body */}
      <path
        d="M -20,144 C -26,174 -55,234 -69,280 C -75,303 -77,315 -77,320 L 77,320 C 77,315 75,303 69,280 C 55,234 26,174 20,144 Z"
        fill="url(#shadeOuter)"
      />
      {/* Left-face metallic sheen */}
      <path
        d="M -20,144 C -26,174 -55,234 -69,280 C -75,303 -77,315 -77,320 L -10,320 C -10,315 -9,303 -5,280 C 5,234 10,174 8,144 Z"
        fill="url(#shadeSheen)"
      />
      {/* Subtle vertical seams */}
      <line x1="-32" y1="172" x2="-52" y2="302" stroke="#111" strokeWidth="0.6" opacity="0.6" />
      <line x1="32"  y1="172" x2="52"  y2="302" stroke="#111" strokeWidth="0.6" opacity="0.6" />
      {/* Decorative raised bands */}
      <path d="M -40,202 L -50,228 L 50,228 L 40,202 Z" fill="none" stroke="#282828" strokeWidth="1.2" />
      <path d="M -54,252 L -61,274 L 61,274 L 54,252 Z" fill="none" stroke="#252525" strokeWidth="1"   />

      {/* Top collar */}
      <ellipse cx="0" cy="144" rx="21" ry="7"  fill="url(#rimGrad)" />
      <ellipse cx="0" cy="142" rx="16" ry="4.5" fill="#303030" />
      {/* Collar highlight */}
      <path d="M -14,140 A 16 4.5 0 0 1 14,140" stroke="#454545" strokeWidth="1" fill="none" />

      {/* Bottom rim */}
      <ellipse cx="0" cy="320" rx="78"  ry="13" fill="url(#rimGrad)" />
      <ellipse cx="0" cy="319" rx="74"  ry="9"  fill="#222222" />
      {/* Rim highlight arc */}
      <path d="M -62,316 A 74 9 0 0 1 62,316" stroke="#3a3a3a" strokeWidth="1.2" fill="none" />

      {/* ── Edison bulb ───────────────────────────────── */}
      {/* Glass envelope — teardrop */}
      <path
        d="M -13,158 C -13,158 -18,178 -18,200 C -18,222 -10,240 0,244 C 10,240 18,222 18,200 C 18,178 13,158 13,158 Z"
        fill="url(#bulbGlass)"
      />
      {/* Base collar of bulb */}
      <rect x="-9" y="155" width="18" height="8" rx="2" fill="#181818" />
      {/* Filament coil — dark when off */}
      <path
        d="M -4,196 C -2,202 4,204 2,210 C 0,216 -4,218 -2,224 C 0,230 4,232 2,238"
        stroke={lit ? '#FFE080' : '#1e1e1e'}
        strokeWidth={lit ? 1.6 : 1.2}
        fill="none"
        strokeLinecap="round"
        style={{ filter: lit ? 'drop-shadow(0 0 3px #FFD050)' : 'none' }}
      />
      {/* Filament support wires */}
      <line x1="-4" y1="196" x2="-4" y2="242" stroke={lit ? '#555' : '#1a1a1a'} strokeWidth="0.8" />
      <line x1="4"  y1="196" x2="4"  y2="242" stroke={lit ? '#555' : '#1a1a1a'} strokeWidth="0.8" />

      {/* ── GLOW layers ───────────────────────────────── */}
      <g opacity={glowOpacity}>
        {/* Bulb lit glass */}
        <path
          d="M -13,158 C -13,158 -18,178 -18,200 C -18,222 -10,240 0,244 C 10,240 18,222 18,200 C 18,178 13,158 13,158 Z"
          fill="url(#bulbGlassLit)"
        />
        {/* Outer halo */}
        <ellipse cx="0" cy="210" rx="90" ry="110" fill="url(#haloGlow)" />
        {/* Close amber bloom */}
        <ellipse cx="0" cy="200" rx="32" ry="42"  fill="#FFD050" opacity="0.12" />
        {/* Glow through bottom opening */}
        <ellipse cx="0" cy="320" rx="72" ry="10"  fill="#FFD060" opacity="0.35" />
        <ellipse cx="0" cy="322" rx="55" ry="7"   fill="#FFFDE0" opacity="0.25" />
        {/* Inner shade warm tint */}
        <path
          d="M -16,148 C -22,176 -50,236 -62,280 C -67,302 -69,314 -69,319 L 69,319 C 69,314 67,302 62,280 C 50,236 22,176 16,148 Z"
          fill="#FFF4A0" opacity="0.07"
        />
        {/* Wide light cone below */}
        <path d="M -77,328 L -380,600 L 380,600 L 77,328 Z" fill="url(#shadeGlow)" />
        {/* Rim glow ring */}
        <ellipse cx="0" cy="320" rx="78" ry="13" fill="#FFB030" opacity="0.08" />
      </g>

      {/* ── Pull rope ─────────────────────────────────── */}
      <motion.g
        animate={ropeState === 'pulling' ? { y: [0, 62, -20, 14, -7, 3, -1, 0] } : { y: 0 }}
        transition={ropeState === 'pulling'
          ? { duration: 1.4, ease: [0.34, 1.56, 0.64, 1] }
          : { type: 'spring', stiffness: 300, damping: 20 }}
      >
        {/* Rope shadow */}
        <path
          d="M 2,328 C 8,350 -4,372 2,394 C 8,416 -4,438 2,460 C 8,482 -4,502 2,518 C 5,530 -2,540 2,550"
          stroke="#1a1208" strokeWidth="7" fill="none" strokeLinecap="round" opacity="0.5"
        />
        {/* Rope main body */}
        <path
          d="M 0,328 C 6,350 -6,372 0,394 C 6,416 -6,438 0,460 C 6,482 -6,502 0,518 C 4,530 -3,540 0,550"
          stroke="url(#ropeGrad)" strokeWidth="6" fill="none" strokeLinecap="round"
          style={{ cursor: 'pointer' }} onClick={onPull}
        />
        {/* Twist marks */}
        {[338,352,366,380,394,408,422,436,450,464,478,492,506,520,534].map((y, i) => (
          <line
            key={y}
            x1={i % 2 === 0 ? -4 : 4} y1={y}
            x2={i % 2 === 0 ? 4  : -4} y2={y + 9}
            stroke="#6a4820" strokeWidth="1.8" opacity="0.6"
            style={{ pointerEvents: 'none' }}
          />
        ))}
        {/* Rope highlight strand */}
        <path
          d="M 1,328 C 4,350 -2,372 1,394 C 4,416 -2,438 1,460 C 4,482 -2,502 1,518"
          stroke="#c49858" strokeWidth="1" fill="none" strokeLinecap="round" opacity="0.4"
          style={{ pointerEvents: 'none' }}
        />

        {/* Wooden pull bead */}
        <motion.g
          onClick={onPull}
          style={{ cursor: 'pointer' }}
          whileHover={{ scale: 1.12 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18 }}
        >
          {/* Knot */}
          <ellipse cx="0" cy="555" rx="8"  ry="5.5" fill="#3a2208" />
          <ellipse cx="0" cy="553" rx="6"  ry="3.5" fill="#4e2e10" />
          {/* Bead body */}
          <ellipse cx="0" cy="570" rx="14" ry="17"  fill="url(#beadGrad)" />
          {/* Grain lines */}
          <path d="M -9,562 C -6,568 -9,574 -7,580" stroke="#5a3018" strokeWidth="1"   fill="none" opacity="0.5" />
          <path d="M -4,560 C -2,566 -5,572 -3,580" stroke="#a07840" strokeWidth="0.8" fill="none" opacity="0.4" />
          <path d="M  5,561 C  3,568  6,573  4,580" stroke="#5a3018" strokeWidth="1"   fill="none" opacity="0.5" />
          {/* Highlight */}
          <ellipse cx="-4" cy="563" rx="4.5" ry="6" fill="#c49060" opacity="0.35" />
          {/* Top and bottom grooves */}
          <ellipse cx="0" cy="555" rx="11" ry="3.5" fill="#2a1608" opacity="0.85" />
          <ellipse cx="0" cy="586" rx="11" ry="3.5" fill="#2a1608" opacity="0.85" />
        </motion.g>

        {/* Invisible wide hit zone */}
        <rect x="-28" y="324" width="56" height="280" fill="transparent" style={{ cursor: 'pointer' }} onClick={onPull} />
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
      <div className="absolute left-1/2 top-0 -translate-x-1/2">
      <motion.div
        style={{ transformOrigin: '50% 0%' }}
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
              left: '50%', top: 210,
              width: 520, height: 520,
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
      </div>

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
            top: 320,
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
