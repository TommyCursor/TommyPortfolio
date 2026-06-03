'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contacts = [
  { label: 'Email',       value: 'work.with.tommy.cursor@gmail.com', href: 'mailto:work.with.tommy.cursor@gmail.com' },
  { label: 'LinkedIn',    value: '/in/work-with-tommy-cursor',        href: 'https://www.linkedin.com/in/work-with-tommy-cursor' },
  { label: 'WhatsApp',    value: '+234 813 589 0704',                 href: 'https://wa.me/2348135890704' },
  { label: 'Calendly',    value: 'Book a free call',                  href: 'https://calendly.com/work-with-tommy-cursor' },
  { label: 'Instagram',   value: '@work.with.tommy',                  href: 'https://www.instagram.com/work.with.tommy' },
]

const steps = [
  { n: '01', label: 'We Talk',  detail: '30-min discovery call — free' },
  { n: '02', label: 'I Plan',   detail: 'Strategy + scope in 48 hrs' },
  { n: '03', label: 'We Build', detail: 'Weekly updates, zero surprises' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="bg-[#080808] px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#0d2200]">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Top: heading + process */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-14 md:mb-16">
          <div>
            <motion.p
              className="font-sans text-xs tracking-[0.2em] uppercase text-[#1a3a1a] mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Let&apos;s Talk
            </motion.p>
            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#00FF41] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let&apos;s Build Your<br />Unfair Advantage
            </motion.h2>
            <motion.p
              className="font-sans text-sm text-[#4d994d] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              You don&apos;t need three agencies. You need one person who can build the product, grow the
              audience, and automate the gaps — and I&apos;m currently taking on new projects.
            </motion.p>
          </div>

          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {steps.map((step) => (
              <div key={step.n} className="flex items-start gap-5">
                <span className="font-serif text-2xl text-[#FF0040]/40 leading-none mt-0.5 shrink-0">{step.n}</span>
                <div className="border-t border-[#0d2200] pt-3 flex-1">
                  <p className="font-sans text-sm font-medium text-[#00FF41]">{step.label}</p>
                  <p className="font-sans text-xs text-[#1a3a1a] mt-0.5">{step.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-[#0d2200] mb-14 md:mb-16 origin-left"
          initial={{ scaleX: 0 }}
          animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Bottom: CTA + contact links */}
        <div className="grid md:grid-cols-2 gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.35 }}
          >
            <p className="font-sans text-sm text-[#2a5c2a] leading-relaxed mb-8">
              The first call is free. We&apos;ll figure out together whether there&apos;s a fit — no pitch, no pressure.
            </p>
            <a
              href="https://calendly.com/work-with-tommy-cursor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-sans text-sm bg-[#FF0040] text-white px-8 py-4 hover:bg-[#CC0030] transition-colors duration-200 group tracking-wide"
            >
              Book a Free Strategy Call
              <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block">→</span>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {contacts.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith('mailto') ? undefined : '_blank'}
                rel={item.href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                className={`flex items-start sm:items-center justify-between py-4 gap-4 group ${
                  i < contacts.length - 1 ? 'border-b border-[#0d2200]' : ''
                }`}
              >
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-[#1a3a1a]">{item.label}</span>
                <span className="font-sans text-sm text-[#00FF41] flex items-center gap-2 text-right break-all sm:break-normal">
                  {item.value}
                  <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block text-[#FF0040] shrink-0">→</span>
                </span>
              </a>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
