'use client'
import { motion } from 'framer-motion'

const items = [
  'FULL-STACK DEVELOPMENT',
  'DIGITAL MARKETING',
  'TECHNICAL SEO',
  'AI INTEGRATION',
  'NEXT.JS · SUPABASE',
  'PROGRAMMATIC SEO',
  'SAAS PLATFORMS',
  'CORE WEB VITALS',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-[#111111] py-5 overflow-hidden">
      <motion.div
        className="flex items-center"
        style={{ width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-sans text-[10px] tracking-[0.3em] uppercase text-[#3a3a3a] px-10 shrink-0"
          >
            {item}
            <span className="ml-10 text-[#C5A55A] text-sm">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
