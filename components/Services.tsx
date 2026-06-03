'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    number: '01',
    title: 'Full-Stack Development',
    description: 'Production-ready web applications built for scale — Next.js SaaS platforms, AI-powered tools, REST APIs, and e-commerce solutions that ship fast and perform faster.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Supabase', 'AI Integration', 'SaaS', 'E-commerce'],
    red: false,
  },
  {
    number: '02',
    title: 'Digital Marketing & SEO',
    description: 'Organic growth systems that compound — technical SEO audits, programmatic content at scale, Core Web Vitals optimisation, and conversion funnels built to turn traffic into revenue.',
    tags: ['Technical SEO', 'Programmatic SEO', 'Core Web Vitals', 'GTM', 'Conversion Funnels', 'Analytics'],
    red: false,
  },
  {
    number: '03',
    title: 'No-Code Automation',
    description: 'Connect your tools, eliminate repetitive work, and build systems that run while you sleep — Zapier, n8n, and Make.com workflows tailored for non-technical teams who want to move faster.',
    tags: ['n8n', 'Zapier', 'Make.com', 'Webhooks', 'API Integrations', 'Airtable'],
    red: true,
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="bg-[#000000] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="font-sans text-xs tracking-[0.2em] uppercase text-[#1a3a1a] mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          What I Do
        </motion.p>

        <div className="overflow-hidden mb-12 md:mb-16">
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-7xl leading-none text-[#00FF41]"
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Services
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className={`border p-6 md:p-8 transition-all duration-300 relative overflow-hidden ${
                service.red
                  ? 'border-[#FF0040]/20 hover:border-[#FF0040]/50 hover:bg-[#0d0404]'
                  : 'border-[#0d2200] hover:border-[#1a3a1a] hover:bg-[#040d04]'
              }`}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.span
                className="block font-serif leading-none select-none mb-2 text-7xl md:text-8xl lg:text-[9rem]"
                style={{ color: service.red ? 'rgba(255,0,64,0.1)' : 'rgba(0,255,65,0.06)' }}
                whileHover={{ scale: 1.04 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {service.number}
              </motion.span>

              <motion.div
                className="h-px mb-5 origin-left"
                style={{ backgroundColor: service.red ? '#FF0040' : '#00FF41' }}
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              />

              <h3 className={`font-serif text-xl md:text-2xl lg:text-3xl mb-4 ${service.red ? 'text-[#FF0040]' : 'text-[#00FF41]'}`}>
                {service.title}
              </h3>
              <p className="font-sans text-sm text-[#2a5c2a] leading-relaxed mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`font-sans text-xs px-3 py-1 rounded-full ${
                      service.red
                        ? 'border border-[#FF0040]/25 text-[#FF0040]/60'
                        : 'border border-[#0d2200] text-[#1a3a1a]'
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
