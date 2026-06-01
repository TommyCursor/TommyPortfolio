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

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="contact" className="bg-[#F8F7F4] px-8 md:px-16 lg:px-24 py-28 border-t border-[#E5E4E0]">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-start" ref={ref}>
        {/* Left */}
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
            className="font-serif text-5xl md:text-6xl leading-tight text-[#111111] mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Ready to Build Something Great?
          </motion.h2>
          <motion.p
            className="font-sans text-sm text-[#888888] leading-relaxed mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Whether you need a high-performance web app, a marketing strategy that compounds, or both — let&apos;s
            build it together.
          </motion.p>
          <motion.a
            href="#"
            className="inline-flex items-center gap-2 font-sans text-sm bg-[#111111] text-white px-8 py-4 hover:bg-[#333333] transition-colors duration-200 group"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Book a Free Discovery Call
            <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block">→</span>
          </motion.a>
        </div>

        {/* Right */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.25 }}
        >
          {contacts.map((item, i) => (
            <a
              key={item.label}
              href={item.href}
              className={`flex items-center justify-between py-5 group ${
                i < contacts.length - 1 ? 'border-b border-[#E5E4E0]' : ''
              }`}
            >
              <span className="font-sans text-xs tracking-[0.15em] uppercase text-[#888888]">{item.label}</span>
              <span className="font-sans text-sm text-[#111111] flex items-center gap-2">
                {item.value}
                <span className="transition-transform duration-200 group-hover:translate-x-1 inline-block text-[#888888]">
                  →
                </span>
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
