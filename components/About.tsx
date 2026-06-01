'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const devSkills = [
  'Next.js', 'TypeScript', 'React', 'Node.js', 'Supabase',
  'AI Integration', 'PostgreSQL', 'REST APIs', 'Framer Motion', 'Stripe',
]

const marketingSkills = [
  'Technical SEO', 'Programmatic SEO', 'Core Web Vitals',
  'GTM', 'Twilio', 'Google Analytics', 'Conversion Funnels', 'Automation',
]

function Tag({ label, delay }: { label: string; delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  return (
    <motion.span
      ref={ref}
      className="inline-block font-sans text-xs border border-[#E5E4E0] text-[#888888] px-3 py-1.5 rounded-full hover:border-[#111111] hover:text-[#111111] transition-colors duration-200"
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
    <section id="about" className="relative bg-[#F8F7F4] px-8 md:px-16 lg:px-24 py-28 border-t border-[#E5E4E0] overflow-hidden">

      {/* Large outlined background word */}
      <div
        className="absolute -bottom-8 -left-8 pointer-events-none select-none hidden lg:block"
        aria-hidden
      >
        <motion.span
          className="font-serif leading-none block"
          style={{
            fontSize: '28vw',
            color: 'transparent',
            WebkitTextStroke: '1px rgba(17,17,17,0.04)',
          }}
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
          <motion.p
            className="font-sans text-xs tracking-[0.2em] uppercase text-[#888888] mb-4"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            About
          </motion.p>

          {/* Clip-path heading reveal */}
          <div className="overflow-hidden mb-8">
            <motion.h2
              className="font-serif text-4xl md:text-5xl leading-tight text-[#111111]"
              initial={{ y: 80, opacity: 0 }}
              animate={inView ? { y: 0, opacity: 1 } : { y: 80, opacity: 0 }}
              transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              Where Engineering<br />Meets Strategy
            </motion.h2>
          </div>

          <motion.p
            className="font-sans text-[#888888] leading-relaxed mb-5 text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            I&apos;m Tommy Adeyinka — a full-stack developer and digital marketer who bridges both worlds. I build fast,
            production-grade web applications and then make sure they get found, converting traffic into real business results.
          </motion.p>
          <motion.p
            className="font-sans text-[#888888] leading-relaxed text-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            Most developers stop at shipping. Most marketers can&apos;t read code. I live in the gap between them —
            where technical execution meets growth strategy.
          </motion.p>
        </div>

        {/* Right */}
        <div>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#888888] mb-4">Development</p>
          <div className="flex flex-wrap gap-2 mb-8">
            {devSkills.map((skill, i) => (
              <Tag key={skill} label={skill} delay={i * 0.05} />
            ))}
          </div>
          <p className="font-sans text-xs tracking-[0.2em] uppercase text-[#888888] mb-4">Marketing &amp; SEO</p>
          <div className="flex flex-wrap gap-2">
            {marketingSkills.map((skill, i) => (
              <Tag key={skill} label={skill} delay={i * 0.05} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
