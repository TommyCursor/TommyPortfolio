'use client'
import { motion } from 'framer-motion'

const items = [
  'FULL-STACK DEVELOPMENT',
  'DIGITAL MARKETING',
  'TECHNICAL SEO',
  'AI INTEGRATION',
  'NEXT.JS · SUPABASE',
  'NO-CODE AUTOMATION',
  'SAAS PLATFORMS',
  'N8N · ZAPIER · MAKE',
]

export default function Marquee() {
  const doubled = [...items, ...items]

  return (
    <div className="bg-[#000000] py-5 overflow-hidden border-t border-b border-[#0d2200]">
      <motion.div
        className="flex items-center"
        style={{ width: 'max-content' }}
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      >
        {doubled.map((item, i) => (
          <span
            key={i}
            className="flex items-center font-sans text-[10px] tracking-[0.3em] uppercase text-[#1a3a1a] px-10 shrink-0"
          >
            {item}
            <span className="ml-10 text-[#FF0040] text-sm">✦</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
