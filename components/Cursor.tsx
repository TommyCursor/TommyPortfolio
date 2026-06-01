'use client'
import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function Cursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [hovered, setHovered] = useState(false)

  const springX = useSpring(mouseX, { stiffness: 150, damping: 18, mass: 0.8 })
  const springY = useSpring(mouseY, { stiffness: 150, damping: 18, mass: 0.8 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) setHovered(true)
    }

    const onOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor-hover]')) setHovered(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Trailing ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-white pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: springX, y: springY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovered ? 56 : 40, height: hovered ? 56 : 40 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      />
      {/* Fast dot */}
      <motion.div
        className="fixed top-0 left-0 rounded-full bg-white pointer-events-none z-[9999] mix-blend-difference"
        style={{ x: mouseX, y: mouseY, translateX: '-50%', translateY: '-50%' }}
        animate={{ width: hovered ? 10 : 6, height: hovered ? 10 : 6 }}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
    </>
  )
}
