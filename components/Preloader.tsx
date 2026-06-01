'use client'
import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Boot log messages — spaced across the full ~6 second load
const BOOT_LOG = [
  { text: 'initializing portfolio.exe...', type: 'green', ms: 400 },
  { text: 'loading: [next.js] [typescript] [supabase] [ai]', type: 'green', ms: 1100 },
  { text: '! INTRUSION DETECTED — REROUTING SIGNAL...', type: 'red', ms: 1900 },
  { text: 'establishing encrypted tunnel...', type: 'green', ms: 2600 },
  { text: 'injecting access token: tommy@adeyinka~$', type: 'white', ms: 3300 },
  { text: '! WARNING: 2 threats neutralized', type: 'red', ms: 4000 },
  { text: 'compiling portfolio assets...', type: 'green', ms: 4700 },
  { text: '>> ACCESS GRANTED — WELCOME', type: 'bright', ms: 5400 },
]

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [count, setCount] = useState(0)
  const [visibleLines, setVisibleLines] = useState<typeof BOOT_LOG>([])
  const [phase, setPhase] = useState<'active' | 'exiting'>('active')
  const [cursorBlink, setCursorBlink] = useState(true)

  // ── Lock scroll ──────────────────────────────────────────────────────────
  useEffect(() => {
    document.body.style.overflow = 'hidden'
    const lenis = (window as unknown as Record<string, unknown>).__lenis as
      | { stop: () => void; start: () => void }
      | undefined
    lenis?.stop()
    return () => {
      document.body.style.overflow = ''
      lenis?.start()
    }
  }, [])

  // ── Matrix rain canvas ────────────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const CHARS = '01アイウエカキクケコスセタチツテABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*<>/\\'
    const FS = 13
    let cols = Math.floor(canvas.width / FS)
    let drops: number[] = Array.from({ length: cols }, () => Math.random() * -80)
    let animId: number

    const draw = () => {
      ctx.fillStyle = 'rgba(0,0,0,0.055)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FS}px "Courier New", monospace`

      for (let i = 0; i < cols; i++) {
        const ch = CHARS[Math.floor(Math.random() * CHARS.length)]
        const y = drops[i] * FS

        if (y >= 0) {
          // Rare red character
          if (Math.random() > 0.997) {
            ctx.fillStyle = '#FF0040'
            ctx.shadowColor = '#FF0040'
            ctx.shadowBlur = 4
            ctx.fillText(ch, i * FS, y)
          } else {
            // Head — bright white
            ctx.fillStyle = '#FFFFFF'
            ctx.shadowColor = '#00FF41'
            ctx.shadowBlur = 6
            ctx.fillText(ch, i * FS, y)
            // Tail — green gradient (dimmer further back)
            if (y - FS >= 0) {
              ctx.fillStyle = '#00FF41'
              ctx.shadowBlur = 3
              ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, y - FS)
            }
            if (y - FS * 2 >= 0) {
              ctx.fillStyle = '#009920'
              ctx.shadowBlur = 0
              ctx.fillText(CHARS[Math.floor(Math.random() * CHARS.length)], i * FS, y - FS * 2)
            }
          }
          ctx.shadowBlur = 0
        }

        if (y > canvas.height && Math.random() > 0.975) drops[i] = 0
        drops[i] += 0.38
      }

      animId = requestAnimationFrame(draw)
    }

    animId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── Blinking cursor ──────────────────────────────────────────────────────
  useEffect(() => {
    const t = setInterval(() => setCursorBlink((b) => !b), 530)
    return () => clearInterval(t)
  }, [])

  // ── Progress counter ─────────────────────────────────────────────────────
  useEffect(() => {
    const segs = [
      { to: 18, ms: 900 },
      { to: 38, ms: 1100 },
      { to: 58, ms: 1000 },
      { to: 76, ms: 900 },
      { to: 90, ms: 800 },
      { to: 97, ms: 700 },
      { to: 100, ms: 500 },
    ]
    let cur = 0, rafId: number

    const run = (i: number) => {
      if (i >= segs.length) { setTimeout(() => setPhase('exiting'), 900); return }
      const { to, ms } = segs[i]
      const from = cur, t0 = performance.now()
      const tick = (t: number) => {
        const p = Math.min((t - t0) / ms, 1)
        cur = Math.round(from + (to - from) * (1 - (1 - p) ** 2))
        setCount(cur)
        if (p < 1) { rafId = requestAnimationFrame(tick) } else { cur = to; setCount(to); run(i + 1) }
      }
      rafId = requestAnimationFrame(tick)
    }

    const timer = setTimeout(() => run(0), 280)
    return () => { clearTimeout(timer); cancelAnimationFrame(rafId) }
  }, [])

  // ── Boot log messages ────────────────────────────────────────────────────
  useEffect(() => {
    const timers = BOOT_LOG.map((msg) =>
      setTimeout(() => setVisibleLines((prev) => [...prev, msg]), msg.ms)
    )
    return () => timers.forEach(clearTimeout)
  }, [])

  const lineColor = (type: string) => {
    if (type === 'red')    return '#FF0040'
    if (type === 'white')  return '#cccccc'
    if (type === 'bright') return '#00FF41'
    return '#00AA28'
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {phase === 'active' && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[9999] overflow-hidden"
          style={{ backgroundColor: '#000000' }}
          exit={{ y: '-100%' }}
          transition={{ duration: 1.05, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Matrix rain */}
          <canvas ref={canvasRef} className="absolute inset-0" style={{ opacity: 0.65 }} />

          {/* Dark overlay so terminal panel reads clearly */}
          <div
            className="absolute inset-0"
            style={{ background: 'radial-gradient(ellipse 80% 70% at 50% 50%, rgba(0,0,0,0.3) 0%, rgba(0,0,0,0.75) 100%)' }}
          />

          {/* ── Terminal panel ────────────────────────────── */}
          <motion.div
            className="absolute left-1/2 top-1/2"
            style={{
              transform: 'translate(-50%, -50%)',
              width: 'min(640px, 90vw)',
              background: 'rgba(0,4,0,0.88)',
              border: '1px solid #003a00',
              padding: '28px 32px',
              fontFamily: '"Courier New", monospace',
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Terminal title bar */}
            <div
              className="flex items-center gap-2 pb-4 mb-4"
              style={{ borderBottom: '1px solid #002200' }}
            >
              <span style={{ color: '#FF0040', fontSize: 11 }}>●</span>
              <span style={{ color: '#FF8800', fontSize: 11 }}>●</span>
              <span style={{ color: '#00FF41', fontSize: 11 }}>●</span>
              <span
                className="ml-3"
                style={{ color: '#003300', fontSize: '10px', letterSpacing: '0.15em' }}
              >
                tommy@portfolio:~$ — bash
              </span>
            </div>

            {/* Boot log lines */}
            <div className="space-y-1.5 mb-6" style={{ minHeight: 180 }}>
              {visibleLines.map((line, i) => (
                <motion.p
                  key={i}
                  style={{ color: lineColor(line.type), fontSize: '12px', lineHeight: 1.5 }}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  {line.type === 'red' && (
                    <span style={{ color: '#FF0040' }}>{'[ERR] '}</span>
                  )}
                  {line.text}
                </motion.p>
              ))}

              {/* Blinking cursor after last line */}
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 14,
                  backgroundColor: '#00FF41',
                  opacity: cursorBlink ? 1 : 0,
                  verticalAlign: 'text-bottom',
                }}
              />
            </div>

            {/* Progress bar */}
            <div>
              <div className="flex justify-between mb-2" style={{ fontSize: '10px' }}>
                <span style={{ color: '#004400', letterSpacing: '0.1em' }}>LOADING</span>
                <span style={{ color: count === 100 ? '#00FF41' : '#007700' }}>
                  {String(count).padStart(3, '0')}%
                </span>
              </div>

              {/* Bar track */}
              <div
                className="relative overflow-hidden"
                style={{ height: 3, backgroundColor: '#001800' }}
              >
                {/* Green fill */}
                <motion.div
                  style={{ height: '100%', backgroundColor: '#00FF41', width: `${count}%`, transition: 'width 0.05s linear' }}
                />
                {/* Red leading edge flicker */}
                {count > 0 && count < 100 && (
                  <motion.div
                    style={{
                      position: 'absolute', top: 0, height: '100%',
                      width: 6, left: `${count}%`,
                      background: 'linear-gradient(to right, #FF0040, transparent)',
                      opacity: 0.9,
                    }}
                    animate={{ opacity: [0.9, 0.4, 0.9] }}
                    transition={{ duration: 0.3, repeat: Infinity }}
                  />
                )}
              </div>

              {/* Segment ticks */}
              <div className="flex justify-between mt-1">
                {[0, 25, 50, 75, 100].map((tick) => (
                  <span
                    key={tick}
                    style={{
                      fontSize: '8px',
                      color: count >= tick ? '#003300' : '#001500',
                      letterSpacing: '0.05em',
                    }}
                  >
                    {tick}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom system info */}
          <motion.div
            className="absolute bottom-6 left-0 right-0 flex justify-center gap-8"
            style={{ fontFamily: '"Courier New", monospace', fontSize: '9px', letterSpacing: '0.15em' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span style={{ color: '#002200' }}>SYS:PORTFOLIO_OS v2.0.26</span>
            <span style={{ color: '#002200' }}>NODE:ACTIVE</span>
            <span style={{ color: '#002200' }}>ENC:AES-256</span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
