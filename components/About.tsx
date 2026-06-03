'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const AVATAR = 'https://avatars.githubusercontent.com/u/256695225?v=4'

const devSkills = [
  'Next.js', 'TypeScript', 'React', 'Node.js', 'Supabase',
  'AI Integration', 'PostgreSQL', 'REST APIs', 'Framer Motion', 'Stripe',
]
const marketingSkills = [
  'Technical SEO', 'Programmatic SEO', 'Core Web Vitals',
  'GTM', 'Google Analytics', 'Conversion Funnels', 'Twilio',
]
const automationSkills = [
  'n8n', 'Zapier', 'Make.com', 'Webhooks', 'API Integrations',
  'Airtable', 'Notion API', 'Workflow Design',
]

function Tag({ label, delay, red }: { label: string; delay: number; red?: boolean }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.span
      ref={ref}
      className={`inline-block font-sans text-xs px-3 py-1.5 rounded-full transition-colors duration-200 ${
        red
          ? 'border border-[#FF0040]/30 text-[#FF0040]/70 hover:border-[#FF0040] hover:text-[#FF0040]'
          : 'border border-[#0d2200] text-[#1a3a1a] hover:border-[#00FF41] hover:text-[#00FF41]'
      }`}
      initial={{ opacity: 0, y: 10 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      transition={{ duration: 0.4, delay }}
    >
      {label}
    </motion.span>
  )
}

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="about" className="relative bg-[#080808] px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#0d2200] overflow-hidden">

      <div className="absolute -bottom-8 -left-8 pointer-events-none select-none hidden lg:block" aria-hidden>
        <motion.span
          className="font-serif leading-none block"
          style={{ fontSize: '28vw', color: 'transparent', WebkitTextStroke: '1px rgba(0,255,65,0.03)' }}
          initial={{ opacity: 0, x: -60 }}
          animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -60 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          TOMMY
        </motion.span>
      </div>

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">
        {/* Left */}
        <div ref={ref}>
          {/* Photo */}
          <motion.div
            className="relative mb-10 w-36 h-36 md:w-48 md:h-48"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <div
              className="absolute -bottom-3 -right-3 w-full h-full pointer-events-none"
              style={{ border: '1.5px solid #00FF41', opacity: 0.4 }}
            />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={AVATAR}
              alt="Tommy Adeyinka"
              className="w-full h-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-500"
            />
          </motion.div>

          <motion.p
            className="font-sans text-xs tracking-[0.2em] uppercase text-[#1a3a1a] mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
          >
            About
          </motion.p>

          <div className="overflow-hidden mb-8">
            <motion.h2
              className="font-serif text-3xl md:text-4xl lg:text-5xl leading-tight text-[#00FF41]"
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
            >
              One Person.<br />Three Disciplines.
            </motion.h2>
          </div>

          <motion.p
            className="font-sans text-[#4d994d] leading-relaxed mb-5 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Most developers stop at shipping. Most marketers can&apos;t read code. Most automation consultants
            can&apos;t build the product they&apos;re automating. I do all three — and that gap is where real
            business value lives.
          </motion.p>
          <motion.p
            className="font-sans text-[#2a5c2a] leading-relaxed text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            I build production-grade applications, engineer the growth systems that bring users in, and wire up
            the automations that keep everything running — all without the overhead of three separate agencies.
          </motion.p>
        </div>

        {/* Right — skills */}
        <div>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#1a3a1a] mb-4">Development</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {devSkills.map((skill, i) => <Tag key={skill} label={skill} delay={i * 0.04} />)}
          </div>

          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#1a3a1a] mb-4">Marketing &amp; SEO</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {marketingSkills.map((skill, i) => <Tag key={skill} label={skill} delay={i * 0.04} />)}
          </div>

          <p className="font-sans text-xs tracking-[0.2em] uppercase mb-4 text-[#FF0040]/60">Automation &amp; No-Code</p>
          <div className="flex flex-wrap gap-2">
            {automationSkills.map((skill, i) => <Tag key={skill} label={skill} delay={i * 0.04} red />)}
          </div>
        </div>
      </div>
    </section>
  )
}
