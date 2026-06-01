'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    number: '01',
    title: 'Full-Stack Development',
    description:
      'I build production-ready web applications — Next.js apps, REST APIs, AI chatbots, SaaS platforms, and e-commerce solutions built for scale and performance.',
    tags: ['Next.js', 'TypeScript', 'Node.js', 'Supabase', 'AI Integration', 'SaaS', 'E-commerce'],
  },
  {
    number: '02',
    title: 'Digital Marketing & SEO',
    description:
      'I grow organic traffic and build conversion funnels — technical SEO audits, programmatic content at scale, GTM setup, and marketing automation that compounds over time.',
    tags: ['Technical SEO', 'Programmatic SEO', 'Core Web Vitals', 'GTM', 'Funnels', 'Automation'],
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="services" className="bg-[#111111] px-6 md:px-16 lg:px-24 py-20 md:py-28">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="font-sans text-xs tracking-[0.2em] uppercase text-[#555555] mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          What I Do
        </motion.p>

        {/* Clip-path sweep reveal for heading */}
        <div className="overflow-hidden mb-16">
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-white leading-none"
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Services
          </motion.h2>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.number}
              className="border border-[#1e1e1e] p-6 md:p-8 hover:border-[#2e2e2e] hover:bg-[#161616] transition-all duration-400 group relative overflow-hidden"
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
            >
              {/* Dramatic large number */}
              <motion.span
                className="block font-serif leading-none text-[#1a1a1a] select-none mb-2 text-7xl md:text-8xl lg:text-[9rem]"
                style={{}}
                whileHover={{ scale: 1.04, color: '#222222' }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
              >
                {service.number}
              </motion.span>

              {/* Gold accent line that grows on hover */}
              <motion.div
                className="h-px bg-[#C5A55A] mb-5 origin-left"
                initial={{ scaleX: 0 }}
                animate={inView ? { scaleX: 1 } : { scaleX: 0 }}
                transition={{ duration: 0.6, delay: 0.4 + i * 0.18, ease: [0.22, 1, 0.36, 1] }}
              />

              <h3 className="font-serif text-xl md:text-2xl lg:text-3xl text-white mb-4">{service.title}</h3>
              <p className="font-sans text-sm text-[#666666] leading-relaxed mb-6">{service.description}</p>
              <div className="flex flex-wrap gap-2">
                {service.tags.map((tag) => (
                  <span
                    key={tag}
                    className="font-sans text-xs border border-[#2a2a2a] text-[#555555] px-3 py-1 rounded-full"
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
