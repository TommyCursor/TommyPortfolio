'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const contacts = [
  { label: 'Email', value: 'work.with.tommy.cursor@gmail.com', href: 'mailto:work.with.tommy.cursor@gmail.com' },
  { label: 'LinkedIn', value: '/in/tommy-adeyinka', href: '#' },
  { label: 'Twitter / X', value: '@tommyadeyinka', href: '#' },
  { label: 'WhatsApp', value: 'Send a message', href: '#' },
  { label: 'Calendly', value: 'Book a free call', href: '#' },
]

const steps = [
  { n: '01', label: 'We Talk', detail: '30-min discovery call — free' },
  { n: '02', label: 'I Plan', detail: 'Strategy + scope in 48 hrs' },
  { n: '03', label: 'We Build', detail: 'Weekly updates, zero surprises' },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="bg-[#F8F7F4] px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#E5E4E0]">
      <div className="max-w-6xl mx-auto" ref={ref}>

        {/* Top: heading + body */}
        <div className="grid md:grid-cols-2 gap-16 items-start mb-14 md:mb-16">
          <div>
            <motion.p
              className="font-sans text-xs tracking-[0.2em] uppercase text-[#888888] mb-4"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.5 }}
            >
              Let&apos;s Talk
            </motion.p>
            <motion.h2
              className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-tight text-[#111111] mb-6"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              Let&apos;s Build Your<br />Unfair Advantage
            </motion.h2>
            <motion.p
              className="font-sans text-sm text-[#666666] leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              You don&apos;t need three agencies. You need one person who can build the product, grow the
              audience, and automate the gaps. That&apos;s exactly what I do — and I&apos;m currently taking on new projects.
            </motion.p>
          </div>

          {/* Process steps */}
          <motion.div
            className="flex flex-col gap-5"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.25 }}
          >
            {steps.map((step, i) => (
              <div key={step.n} className="flex items-start gap-5">
                <span className="font-serif text-2xl text-[#E5E4E0] leading-none mt-0.5 shrink-0">{step.n}</span>
                <div className="border-t border-[#E5E4E0] pt-3 flex-1">
                  <p className="font-sans text-sm font-medium text-[#111111]">{step.label}</p>
                  <p className="font-sans text-xs text-[#888888] mt-0.5">{step.detail}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div
          className="h-px bg-[#E5E4E0] mb-14 md:mb-16 origin-left"
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
            <p className="font-sans text-sm text-[#888888] leading-relaxed mb-8">
              The first call is free. We&apos;ll figure out together whether there&apos;s a fit — no pitch, no pressure.
            </p>
            <a
              href="mailto:work.with.tommy.cursor@gmail.com"
              className="inline-flex items-center gap-2 font-sans text-sm bg-[#111111] text-white px-8 py-4 hover:bg-[#333333] transition-colors duration-200 group"
            >
              Start a Conversation
              <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block">→</span>
            </a>
          </motion.div>

          {/* Contact links */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {contacts.map((item, i) => (
              <a
                key={item.label}
                href={item.href}
                className={`flex items-start sm:items-center justify-between py-4 gap-4 group ${
                  i < contacts.length - 1 ? 'border-b border-[#E5E4E0]' : ''
                }`}
              >
                <span className="font-sans text-xs tracking-[0.15em] uppercase text-[#888888]">{item.label}</span>
                <span className="font-sans text-sm text-[#111111] flex items-center gap-2 text-right break-all sm:break-normal">
                  {item.value}
                  <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block text-[#888888] shrink-0">→</span>
                </span>
              </a>
            ))}
          </motion.div>
        </div>

      </div>
    </section>
  )
}
