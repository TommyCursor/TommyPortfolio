'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

function SplitText({
  text,
  baseDelay,
  ready,
}: {
  text: string
  baseDelay: number
  ready: boolean
}) {
  return (
    <>
      {text.split('').map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: '105%' }}
          animate={ready ? { y: '0%' } : { y: '105%' }}
          transition={{
            type: 'spring',
            stiffness: 80,
            damping: 16,
            delay: baseDelay + i * 0.045,
          }}
        >
          {char}
        </motion.span>
      ))}
    </>
  )
}

function MagneticButton({
  href,
  children,
  className,
}: {
  href: string
  children: React.ReactNode
  className: string
}) {
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 400, damping: 25 })
  const sy = useSpring(y, { stiffness: 400, damping: 25 })

  return (
    <motion.a
      href={href}
      className={className}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - r.left - r.width / 2) * 0.4)
        y.set((e.clientY - r.top - r.height / 2) * 0.4)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      {children}
    </motion.a>
  )
}

export default function Hero() {
  const [ready, setReady] = useState(false)

  const rawX = useMotionValue(0.5)
  const rawY = useMotionValue(0.5)
  const mx = useSpring(rawX, { stiffness: 50, damping: 20 })
  const my = useSpring(rawY, { stiffness: 50, damping: 20 })

  const decorX   = useTransform(mx, [0, 1], [-50, 50])
  const bgLetterX = useTransform(mx, [0, 1], [20, -20])
  const bgLetterY = useTransform(my, [0, 1], [10, -10])
  const gradBg = useTransform(
    [mx, my],
    ([x, y]) =>
      `radial-gradient(800px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(197,165,90,0.13) 0%, transparent 60%)`
  )

  useEffect(() => {
    setReady(true)
    const onMove = (e: MouseEvent) => {
      rawX.set(e.clientX / window.innerWidth)
      rawY.set(e.clientY / window.innerHeight)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [rawX, rawY])

  return (
    <section className="relative min-h-screen flex flex-col justify-center overflow-hidden bg-[#F8F7F4] px-6 md:px-16 lg:px-24 pt-20 md:pt-24">

      <motion.div className="absolute inset-0 pointer-events-none" style={{ background: gradBg }} />

      {/* Background outlined "TA" */}
      <motion.div
        className="absolute right-0 top-1/2 -translate-y-1/2 pointer-events-none select-none hidden lg:block"
        style={{ x: bgLetterX, y: bgLetterY }}
        aria-hidden
      >
        <span
          className="font-serif leading-none"
          style={{ fontSize: '38vw', color: 'transparent', WebkitTextStroke: '1.5px rgba(17,17,17,0.05)' }}
        >
          TA
        </span>
      </motion.div>

      {/* Decorative vertical line */}
      <motion.div
        className="absolute right-12 top-0 w-px bg-[#E5E4E0] hidden lg:block origin-top"
        style={{ x: decorX }}
        initial={{ scaleY: 0 }}
        animate={ready ? { scaleY: 1 } : { scaleY: 0 }}
        transition={{ duration: 1.4, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Availability signal */}
      <motion.div
        className="mb-5 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
            style={{ backgroundColor: '#22c55e' }}
          />
          <span className="relative inline-flex rounded-full h-2 w-2" style={{ backgroundColor: '#16a34a' }} />
        </span>
        <span className="font-sans text-xs tracking-[0.18em] uppercase text-[#666666]">
          Available for new projects
        </span>
      </motion.div>

      {/* Discipline label */}
      <motion.div
        className="mb-8 flex items-center gap-3"
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.6, delay: 0.45 }}
      >
        <motion.span
          className="h-px"
          style={{ backgroundColor: '#C5A55A' }}
          initial={{ width: 0 }}
          animate={ready ? { width: 32 } : { width: 0 }}
          transition={{ duration: 0.7, delay: 0.55 }}
        />
        <span className="font-sans text-xs tracking-[0.22em] uppercase" style={{ color: '#C5A55A' }}>
          Developer · Marketer · Automator
        </span>
      </motion.div>

      {/* Name reveal */}
      <div className="overflow-hidden leading-none">
        <h1 className="font-serif text-[20vw] md:text-[15vw] lg:text-[13vw] leading-none tracking-tight text-[#111111]">
          <SplitText text="Tommy" baseDelay={0.55} ready={ready} />
        </h1>
      </div>
      <div className="overflow-hidden leading-none">
        <h1 className="font-serif text-[20vw] md:text-[15vw] lg:text-[13vw] leading-none tracking-tight text-[#111111]">
          <SplitText text="Adeyinka" baseDelay={0.65} ready={ready} />
        </h1>
      </div>

      {/* Tagline */}
      <motion.p
        className="mt-7 font-serif italic text-xl md:text-2xl text-[#888888]"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.9, delay: 1.2 }}
      >
        &ldquo;Code that performs. Marketing that compounds. Systems that scale.&rdquo;
      </motion.p>

      {/* CTAs */}
      <motion.div
        className="mt-10 flex flex-wrap gap-4"
        initial={{ opacity: 0, y: 16 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.9, delay: 1.35 }}
      >
        <MagneticButton
          href="#work"
          className="font-sans text-sm bg-[#111111] text-white px-9 py-3.5 hover:bg-[#2a2a2a] transition-colors duration-200 inline-block"
        >
          See My Work
        </MagneticButton>
        <MagneticButton
          href="#contact"
          className="font-sans text-sm border border-[#C5A55A] text-[#C5A55A] px-9 py-3.5 hover:bg-[#C5A55A] hover:text-white transition-all duration-200 inline-block"
        >
          Start a Project
        </MagneticButton>
      </motion.div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-6 md:left-16 lg:left-24 flex items-center gap-3">
        <motion.div
          className="w-px bg-[#111111] origin-top"
          style={{ height: 32 }}
          animate={{ scaleY: [1, 0.25, 1] }}
          transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
        />
        <span className="font-sans text-[10px] text-[#888888] tracking-[0.22em] uppercase">Scroll</span>
      </div>

      {/* Stats — desktop */}
      <motion.div
        className="absolute bottom-10 right-16 md:right-24 text-right hidden md:block"
        style={{ x: decorX }}
        initial={{ opacity: 0 }}
        animate={ready ? { opacity: 1 } : { opacity: 0 }}
        transition={{ duration: 0.9, delay: 1.5 }}
      >
        <span className="font-serif text-5xl text-[#111111]">11+</span>
        <p className="font-sans text-[10px] text-[#888888] tracking-[0.22em] uppercase mt-1">Products Shipped</p>
      </motion.div>
    </section>
  )
}
