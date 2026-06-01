'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    number: '01',
    name: 'APK Visuals',
    description: 'AI-powered visual generation platform leveraging GPT-4 and ElevenLabs for creative content production.',
    tags: ['AI', 'GPT-4', 'ElevenLabs'],
    link: '#',
  },
  {
    number: '02',
    name: 'Ember Kitchen',
    description: 'Full-featured restaurant booking and menu platform with smooth micro-interactions and real-time availability.',
    tags: ['Next.js', 'Supabase', 'Framer Motion'],
    link: '#',
  },
  {
    number: '03',
    name: 'Hollywood ATL',
    description: 'SaaS financial management platform for creative agencies — invoicing, contracts, and analytics.',
    tags: ['SaaS', 'Finance', 'TypeScript'],
    link: '#',
  },
  {
    number: '04',
    name: 'PropList',
    description: 'Real estate listing platform with property search, filters, and agent dashboard built on Next.js.',
    tags: ['Next.js', 'Real Estate'],
    link: '#',
  },
  {
    number: '05',
    name: 'Harry Clothingz',
    description: 'E-commerce storefront with Stripe payments, product management, and custom checkout flow.',
    tags: ['E-commerce', 'Stripe'],
    link: '#',
  },
  {
    number: '06',
    name: 'HireBoard',
    description: 'Job board platform with employer dashboard, applicant tracking, and real-time notifications.',
    tags: ['Job Board', 'Supabase'],
    link: '#',
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="group border border-[#E5E4E0] p-6 flex flex-col relative overflow-hidden"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      {/* Hover fill — sweeps up from bottom */}
      <motion.div
        className="absolute inset-0 bg-[#111111] origin-bottom pointer-events-none"
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* Content — switches color on hover via group */}
      <span className="font-serif text-4xl md:text-5xl text-[#E5E4E0] leading-none relative z-10 group-hover:text-[#2a2a2a] transition-colors duration-300">
        {project.number}
      </span>
      <h3 className="font-serif text-xl md:text-2xl text-[#111111] mt-2 mb-2 relative z-10 group-hover:text-white transition-colors duration-300">
        {project.name}
      </h3>
      <p className="font-sans text-sm text-[#888888] leading-relaxed mb-4 flex-1 relative z-10 group-hover:text-[#999999] transition-colors duration-300">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-sans text-xs border border-[#E5E4E0] text-[#888888] px-2.5 py-1 rounded-full group-hover:border-[#2a2a2a] group-hover:text-[#666666] transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>
      <a
        href={project.link}
        className="font-sans text-xs text-[#111111] flex items-center gap-1.5 group/link w-fit relative z-10 group-hover:text-white transition-colors duration-300"
      >
        View on GitHub
        <span className="transition-transform duration-200 group-hover/link:translate-x-1 inline-block">→</span>
      </a>
    </motion.div>
  )
}

export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" className="bg-[#F8F7F4] px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#E5E4E0]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="font-sans text-xs tracking-[0.2em] uppercase text-[#888888] mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.p>

        {/* Heading sweep */}
        <div className="overflow-hidden mb-16">
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#111111] leading-none"
            initial={{ y: 100, opacity: 0 }}
            animate={inView ? { y: 0, opacity: 1 } : { y: 100, opacity: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            Selected Work
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.number} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
