'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const testimonials = [
  {
    quote:
      "Tommy built our entire platform from scratch in 6 weeks. What impressed me most wasn't just the speed — it was that he spotted two product flaws during the build and flagged them before we even noticed. The app has been live 8 months with zero downtime.",
    name: 'Marcus O.',
    role: 'Founder',
    company: 'B2B SaaS Startup',
  },
  {
    quote:
      "We went from page 4 to position 2 for our main keyword in under 3 months. Tommy's technical SEO is genuinely different — he finds things most agencies miss because he actually understands the code behind the site.",
    name: 'Priya K.',
    role: 'Head of Growth',
    company: 'E-commerce Brand',
  },
  {
    quote:
      "Tommy automated our entire client onboarding in n8n and saved us about 12 hours a week in manual admin. Sounds simple, but nobody else could figure it out. Now the whole thing just runs by itself.",
    name: 'James T.',
    role: 'Operations Manager',
    company: 'Creative Agency',
  },
  {
    quote:
      "We hired Tommy for the website. He rebuilt it, tripled our page speed score, and then put together a content strategy that brought in 40% more organic leads in 4 months. You genuinely get three people for the price of one.",
    name: 'Adaeze N.',
    role: 'Co-Founder',
    company: 'PropTech Startup',
  },
  {
    quote:
      "The checkout conversion on our new store is almost double what it was. Tommy understood exactly what our customers needed and built it right the first time. The site also just looks properly premium.",
    name: 'Harry S.',
    role: 'Founder',
    company: 'Harry Clothingz',
  },
  {
    quote:
      "Fast, communicative, and delivers exactly what he says he will. I've worked with three agencies before Tommy and none of them moved like this. Already planning the next project.",
    name: 'Chidi E.',
    role: 'CEO',
    company: 'Media Production Co.',
  },
]

function TestimonialCard({ t, index }: { t: (typeof testimonials)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="border border-[#E5E4E0] p-6 md:p-8 flex flex-col"
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Gold quote mark */}
      <span
        className="font-serif text-5xl leading-none mb-4 select-none"
        style={{ color: '#C5A55A', opacity: 0.5 }}
        aria-hidden
      >
        &ldquo;
      </span>

      <p className="font-sans text-sm text-[#555555] leading-relaxed flex-1 mb-8">
        {t.quote}
      </p>

      <div className="border-t border-[#E5E4E0] pt-4">
        <p className="font-sans text-sm font-medium text-[#111111]">{t.name}</p>
        <p className="font-sans text-xs text-[#888888] mt-0.5">
          {t.role} · {t.company}
        </p>
      </div>
    </motion.div>
  )
}

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="bg-[#F8F7F4] px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#E5E4E0]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="font-sans text-xs tracking-[0.2em] uppercase text-[#888888] mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Client Stories
        </motion.p>

        <div className="overflow-hidden mb-12 md:mb-16">
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#111111] leading-none"
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            What Clients Say
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {testimonials.map((t, i) => (
            <TestimonialCard key={t.name} t={t} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
