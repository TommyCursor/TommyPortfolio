'use client'
import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// ── Pre-generated stable data ─────────────────────────────────────────────────
const BUBBLES = [
  { left: 7,  w: 5, h: 7,  dur: 4.2, delay: 0.4,  wob: 9  },
  { left: 18, w: 3, h: 4,  dur: 5.6, delay: 1.4,  wob: 6  },
  { left: 31, w: 7, h: 9,  dur: 3.8, delay: 0.2,  wob: 11 },
  { left: 43, w: 4, h: 5,  dur: 5.1, delay: 2.2,  wob: 7  },
  { left: 54, w: 6, h: 8,  dur: 4.0, delay: 0.8,  wob: 10 },
  { left: 65, w: 3, h: 4,  dur: 5.8, delay: 1.7,  wob: 5  },
  { left: 76, w: 5, h: 6,  dur: 4.5, delay: 0.6,  wob: 8  },
  { left: 87, w: 4, h: 5,  dur: 3.9, delay: 2.5,  wob: 7  },
  { left: 12, w: 3, h: 3,  dur: 6.2, delay: 3.4,  wob: 5  },
  { left: 59, w: 4, h: 5,  dur: 4.7, delay: 1.9,  wob: 8  },
  { left: 92, w: 6, h: 7,  dur: 3.6, delay: 0.1,  wob: 9  },
]

// Final droplets near the drain corner
const DROPLETS = [
  { nx: 0.88, ny: 0.84, r: 3.5 },
  { nx: 0.92, ny: 0.88, r: 4.2 },
  { nx: 0.95, ny: 0.80, r: 2.8 },
  { nx: 0.97, ny: 0.92, r: 3.0 },
  { nx: 0.84, ny: 0.91, r: 2.2 },
  { nx: 0.93, ny: 0.95, r: 5.0 },
  { nx: 0.90, ny: 0.97, r: 3.8 },
]

// Rivulet seeding (x position as fraction of screen width)
const RIVULET_NX = [0.04, 0.11, 0.19, 0.28, 0.37, 0.47, 0.58]

// ── Piecewise drain curves (left side drains much faster) ─────────────────────
const L_CURVE = [[0,1.0],[0.15,0.78],[0.30,0.45],[0.45,0.14],[0.58,0.0],[1.0,0.0]]
const R_CURVE = [[0,1.0],[0.15,0.97],[0.30,0.88],[0.45,0.68],[0.60,0.40],[0.78,0.14],[0.92,0.03],[1.0,0.0]]

function plerp(curve: number[][], t: number): number {
  for (let i = 0; i < curve.length - 1; i++) {
    if (t >= curve[i][0] && t <= curve[i + 1][0]) {
      const f = (t - curve[i][0]) / (curve[i + 1][0] - curve[i][0])
      return curve[i][1] + (curve[i + 1][1] - curve[i][1]) * f
    }
  }
  return 0
}

// ── Build SVG path string for current water shape ─────────────────────────────
function buildPath(W: number, H: number, time: number, dp: number, draining: boolean): string {
  const STEPS     = Math.max(60, Math.floor(W / 4))
  const leftFrac  = draining ? plerp(L_CURVE, dp) : 1
  const rightFrac = draining ? plerp(R_CURVE, dp) : 1
  const leftY     = H * (1 - leftFrac)
  const rightY    = H * (1 - rightFrac)

  // Wave amplitude fades as water drains
  const wAmp = Math.max(2, 22 * (draining ? 1 - dp * 0.65 : 1))

  let path = `M 0,${leftY.toFixed(1)} `

  for (let i = 0; i <= STEPS; i++) {
    const nx = i / STEPS
    const x  = nx * W

    // Surface: linear blend + cubic drain-pull toward bottom-right
    const base      = leftY + (rightY - leftY) * nx
    const drainPull = draining ? dp * H * 0.26 * Math.pow(nx, 2.4) : 0

    // Multi-harmonic waves for organic feel
    const wave =
      Math.sin(x * 0.013 + time * 1.6) * wAmp +
      Math.sin(x * 0.027 + time * 0.95 + 1.1) * wAmp * 0.38 +
      Math.cos(x * 0.006 + time * 0.55 + 2.2) * wAmp * 0.22

    // Turbulence near the drain (right 40%) when draining
    const turb =
      draining && dp > 0.32 && nx > 0.60
        ? Math.sin(x * 0.11 + time * 6) * dp * 22 * ((nx - 0.6) / 0.4)
        : 0

    const y = Math.min(H, Math.max(0, base + wave - drainPull + turb))
    path += `L ${x.toFixed(1)},${y.toFixed(1)} `
  }

  path += `L ${W},${H} L 0,${H} Z`
  return path
}

// ── Canvas drawing helpers ────────────────────────────────────────────────────
function drawCaustics(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  time: number, draining: boolean
) {
  const spd = draining ? 2.8 : 1.0
  for (let i = 0; i < 28; i++) {
    const s  = i * 137.508
    const cx = (Math.sin(time * 0.28 * spd + s) * 0.5 + 0.5) * W
    const cy = (Math.cos(time * 0.22 * spd + s * 0.85) * 0.5 + 0.5) * H * 0.82
    const r  = 12 + 34 * Math.abs(Math.sin(time * 0.38 * spd + s * 0.28))
    const op = (0.016 + 0.044 * Math.abs(Math.sin(time * 0.52 * spd + s))) * (draining ? 1.7 : 1)
    const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
    cg.addColorStop(0,   `rgba(115, 205, 255, ${op * 2.2})`)
    cg.addColorStop(0.55,`rgba(55,  148, 235, ${op})`)
    cg.addColorStop(1,   'rgba(15,  70,  200, 0)')
    ctx.beginPath()
    ctx.arc(cx, cy, r, 0, Math.PI * 2)
    ctx.fillStyle = cg
    ctx.fill()
  }
}

function drawRefractionLines(
  ctx: CanvasRenderingContext2D,
  W: number, H: number, time: number
) {
  ctx.globalAlpha = 0.013
  for (let y = 0; y < H; y += 8) {
    const off = Math.sin(time * 1.1 + y * 0.032) * 5
    ctx.fillStyle = 'rgba(75, 165, 255, 1)'
    ctx.fillRect(0, y + off, W, 1.4)
  }
  ctx.globalAlpha = 1
}

function drawRivulets(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  time: number, dp: number
) {
  for (const nx of RIVULET_NX) {
    const leftFrac  = plerp(L_CURVE, dp)
    const rightFrac = plerp(R_CURVE, dp)
    const surfaceY  = H * (1 - (leftFrac + (rightFrac - leftFrac) * nx))

    if (surfaceY >= H - 4) continue  // below screen

    const lengthBase = 35 + 45 * Math.abs(Math.sin(time * 0.6 + nx * 9))
    const op = (0.18 + 0.22 * Math.abs(Math.sin(time * 0.9 + nx * 6))) * Math.min(1, dp * 4)

    // Draw 2 rivulet threads side by side
    for (let strand = 0; strand < 2; strand++) {
      const xBase = nx * W + strand * 3
      const grad  = ctx.createLinearGradient(xBase, surfaceY, xBase, surfaceY + lengthBase)
      grad.addColorStop(0,   `rgba(90, 165, 255, ${op})`)
      grad.addColorStop(0.5, `rgba(60, 130, 225, ${op * 0.55})`)
      grad.addColorStop(1,   'rgba(30,  90, 210, 0)')

      ctx.beginPath()
      ctx.moveTo(xBase, surfaceY)
      let py = surfaceY
      while (py < surfaceY + lengthBase) {
        const nextPy = py + 3
        ctx.lineTo(
          xBase + Math.sin(py * 0.35 + time * 4 + strand) * 2.5,
          nextPy
        )
        py = nextPy
      }
      ctx.strokeStyle = grad
      ctx.lineWidth = 1.2 + Math.abs(Math.sin(time * 1.5 + nx * 4)) * 0.8
      ctx.stroke()
    }
  }
}

function drawVortex(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  time: number, dp: number
) {
  const strength = Math.min(1, (dp - 0.44) / 0.44)
  const cx = W - 28
  const cy = H - 28

  // Concentric spiral arcs
  for (let ring = 0; ring < 6; ring++) {
    const r   = (18 + ring * 28) * strength
    const op  = Math.max(0, (0.22 - ring * 0.032) * strength)
    const spd = (4 + ring * 0.6) * strength
    const arc = Math.PI * (1.4 + ring * 0.08)

    ctx.beginPath()
    ctx.arc(cx, cy, r, time * spd, time * spd + arc)
    ctx.strokeStyle = `rgba(70, 155, 255, ${op})`
    ctx.lineWidth = Math.max(0.5, 2.2 - ring * 0.3)
    ctx.stroke()
  }

  // Central glow
  const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, 40 * strength)
  cg.addColorStop(0,   `rgba(140, 210, 255, ${0.28 * strength})`)
  cg.addColorStop(1,   'rgba(30, 90, 210, 0)')
  ctx.beginPath()
  ctx.arc(cx, cy, 40 * strength, 0, Math.PI * 2)
  ctx.fillStyle = cg
  ctx.fill()
}

function drawDroplets(
  ctx: CanvasRenderingContext2D,
  W: number, H: number,
  time: number, dp: number
) {
  const fade = Math.min(1, (dp - 0.82) / 0.18)
  for (const d of DROPLETS) {
    const x = d.nx * W
    const y = d.ny * H
    const r = d.r * (0.8 + 0.4 * Math.abs(Math.sin(time * 2.5 + d.nx * 8))) * fade

    // Bead fill
    const dg = ctx.createRadialGradient(x - r * 0.3, y - r * 0.3, 0, x, y, r)
    dg.addColorStop(0,   `rgba(210, 240, 255, ${0.82 * fade})`)
    dg.addColorStop(0.55,`rgba(90,  165, 255, ${0.50 * fade})`)
    dg.addColorStop(1,   `rgba(30,  90,  210, 0)`)
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fillStyle = dg
    ctx.fill()

    // Specular highlight
    ctx.beginPath()
    ctx.arc(x - r * 0.28, y - r * 0.28, r * 0.26, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255, 255, 255, ${0.65 * fade})`
    ctx.fill()
  }
}

// ── Main component ────────────────────────────────────────────────────────────
let _rid = 0

export default function WaterOverlay({ onDrained }: { onDrained: () => void }) {
  const canvasRef   = useRef<HTMLCanvasElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)

  // All animation state in a ref so the RAF loop never needs to restart
  const anim = useRef({ t: 0, dp: 0, draining: false })

  const [burst,   setBurst]   = useState(false)
  const [ripples, setRipples] = useState<Array<{ id: number; x: number; y: number }>>([])

  // ── Main canvas + backdrop-clip loop ─────────────────────────────────────
  useEffect(() => {
    const canvas   = canvasRef.current
    const backdrop = backdropRef.current
    if (!canvas || !backdrop) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    let rafId: number

    const draw = () => {
      const { t, dp, draining } = anim.current
      const W = canvas.width
      const H = canvas.height

      ctx.clearRect(0, 0, W, H)

      const pathStr = buildPath(W, H, t, dp, draining)

      // Sync the backdrop-filter div to the same shape
      backdrop.style.clipPath         = `path('${pathStr}')`
      backdrop.style.webkitClipPath   = `path('${pathStr}')`

      // ── Draw inside water shape ──────────────────────────
      const p2d = new Path2D(pathStr)
      ctx.save()
      ctx.clip(p2d)

      // Deep water gradient
      const bg = ctx.createLinearGradient(0, 0, 0, H)
      bg.addColorStop(0,   'rgba(0, 55, 125, 0.50)')
      bg.addColorStop(0.5, 'rgba(0, 32,  90, 0.62)')
      bg.addColorStop(1,   'rgba(0, 14,  55, 0.72)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, W, H)

      drawCaustics(ctx, W, H, t, draining)
      drawRefractionLines(ctx, W, H, t)

      ctx.restore()

      // ── Draw outside clip (surface FX) ──────────────────
      if (draining && dp > 0.06) drawRivulets(ctx, W, H, t, dp)
      if (draining && dp > 0.44) drawVortex(ctx, W, H, t, dp)
      if (draining && dp > 0.82) drawDroplets(ctx, W, H, t, dp)

      anim.current.t += 0.016
      if (anim.current.draining && anim.current.dp < 1) {
        anim.current.dp = Math.min(1, anim.current.dp + 0.0036) // ~4.6s total drain
      }

      rafId = requestAnimationFrame(draw)
    }

    rafId = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(rafId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  // ── Click → burst → drain ─────────────────────────────────────────────────
  const handleClick = (e: React.MouseEvent) => {
    if (anim.current.draining || burst) return

    setBurst(true)
    const { clientX: x, clientY: y } = e

    setRipples([
      { id: _rid++, x, y },
      { id: _rid++, x, y },
      { id: _rid++, x, y },
      { id: _rid++, x, y },
      { id: _rid++, x, y },
    ])

    setTimeout(() => { anim.current.draining = true }, 380)
    setTimeout(onDrained, 5400)  // ~380ms + 4600ms drain
  }

  return (
    <div
      className="fixed inset-0 z-[9997]"
      style={{ cursor: 'pointer' }}
      onClick={handleClick}
    >
      {/* ── Backdrop blur layer — clipped to water shape by JS ── */}
      <div
        ref={backdropRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backdropFilter:       'blur(14px) saturate(1.9) brightness(0.44) hue-rotate(18deg)',
          WebkitBackdropFilter: 'blur(14px) saturate(1.9) brightness(0.44) hue-rotate(18deg)',
          background:           'transparent',
        }}
      />

      {/* ── Canvas: water body + caustics + vortex ── */}
      <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />

      {/* ── Bubbles ── */}
      {BUBBLES.map((b, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full pointer-events-none"
          style={{
            left:       `${b.left}%`,
            bottom:     -20,
            width:      b.w,
            height:     b.h,
            background: 'radial-gradient(circle at 30% 28%, rgba(255,255,255,0.95), rgba(160,220,255,0.20))',
            border:     '0.8px solid rgba(255,255,255,0.40)',
            boxShadow:  '0 0 4px rgba(130,200,255,0.45)',
          }}
          animate={{
            y: -1200,
            x: [0, b.wob, -b.wob * 0.8, b.wob * 0.4, 0],
          }}
          transition={{
            y: { duration: b.dur, repeat: Infinity, delay: b.delay, ease: 'linear' },
            x: { duration: b.dur * 0.32, repeat: Infinity, delay: b.delay, ease: 'easeInOut' },
          }}
        />
      ))}

      {/* ── Burst ripple rings ── */}
      {ripples.map((r, i) => (
        <motion.div
          key={r.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left:        r.x,
            top:         r.y,
            borderWidth: Math.max(1, 2.8 - i * 0.4),
            borderStyle: 'solid',
            borderColor: `rgba(180,230,255,${0.95 - i * 0.14})`,
            boxShadow:   `0 0 ${10 + i * 5}px rgba(110,195,255,0.35)`,
          }}
          initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 1 }}
          animate={{
            width:   650 + i * 240,
            height:  650 + i * 240,
            x:       -(325 + i * 120),
            y:       -(325 + i * 120),
            opacity: 0,
          }}
          transition={{ duration: 1.6 + i * 0.28, delay: i * 0.11, ease: 'easeOut' }}
        />
      ))}

      {/* ── Prominent BREAK THROUGH prompt ── */}
      <AnimatePresence>
        {!burst && (
          <motion.div
            className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            {/* Ripple pulse behind text */}
            <motion.div
              className="absolute rounded-full"
              style={{ width: 240, height: 240, border: '1px solid rgba(130,200,255,0.25)' }}
              animate={{ scale: [1, 1.6], opacity: [0.5, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut' }}
            />
            <motion.div
              className="absolute rounded-full"
              style={{ width: 240, height: 240, border: '1px solid rgba(130,200,255,0.20)' }}
              animate={{ scale: [1, 1.8], opacity: [0.4, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeOut', delay: 0.5 }}
            />

            {/* Click icon */}
            <motion.div
              animate={{ scale: [1, 1.12, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              style={{ marginBottom: 16 }}
            >
              <svg width="44" height="44" viewBox="0 0 44 44" fill="none">
                <circle cx="22" cy="22" r="20" stroke="rgba(170,225,255,0.6)" strokeWidth="1.5"/>
                <path d="M22 12 L22 32 M14 24 L22 32 L30 24" stroke="rgba(170,225,255,0.8)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>

            {/* Main prompt */}
            <motion.p
              className="font-sans uppercase text-center"
              style={{ color: 'rgba(180,228,255,0.88)', fontSize: '13px', letterSpacing: '0.45em', lineHeight: 1 }}
              animate={{ opacity: [0.65, 1, 0.65] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
            >
              Click to break through
            </motion.p>

            {/* Sub label */}
            <motion.p
              className="font-sans uppercase text-center mt-2"
              style={{ color: 'rgba(120,185,255,0.45)', fontSize: '9px', letterSpacing: '0.3em' }}
            >
              the water is flooding your screen
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
