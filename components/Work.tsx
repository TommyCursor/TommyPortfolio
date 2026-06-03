'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    number: '01',
    name: 'APK Visuals',
    description: 'AI-powered visual generation platform — GPT-4 + ElevenLabs pipeline producing creative content at scale for digital creators.',
    tags: ['AI', 'GPT-4', 'ElevenLabs'],
    href: 'https://apk-visuals-image-documentary-scrap-five.vercel.app',
    github: 'https://github.com/TommyCursor/apk-visuals',
  },
  {
    number: '02',
    name: 'Ember Kitchen',
    description: 'Restaurant booking and menu platform with real-time availability, smooth micro-interactions, and a custom CMS for the owner.',
    tags: ['Next.js', 'Supabase', 'Framer Motion'],
    href: 'https://emberkitchen.vercel.app',
    github: 'https://github.com/TommyCursor/ember-kitchen',
  },
  {
    number: '03',
    name: 'Hollywood ATL',
    description: 'SaaS financial platform for creative agencies — invoicing, contracts, and analytics dashboards built for non-technical founders.',
    tags: ['SaaS', 'Finance', 'TypeScript'],
    href: 'https://hollywood-atl-operations.vercel.app',
    github: 'https://github.com/TommyCursor/hollywood-atl',
  },
  {
    number: '04',
    name: 'PropList',
    description: 'Real estate listing platform with advanced property search, saved filters, and a full agent dashboard — zero third-party listing fees.',
    tags: ['Next.js', 'Real Estate', 'Supabase'],
    href: 'https://proplist-app.vercel.app',
    github: 'https://github.com/TommyCursor/proplist',
  },
  {
    number: '05',
    name: 'Harry Clothingz',
    description: 'E-commerce storefront with Stripe payments, product variant management, and a custom checkout — 3-second load on Lighthouse.',
    tags: ['E-commerce', 'Stripe', 'Performance'],
    href: 'https://harry-clothingz-n-apparel.vercel.app',
    github: 'https://github.com/TommyCursor/harry-clothingz',
  },
  {
    number: '06',
    name: 'HireBoard',
    description: 'Job board SaaS with employer dashboard, applicant tracking, and Zapier-powered notification workflows for real-time alerts.',
    tags: ['Job Board', 'Supabase', 'Zapier'],
    href: 'https://jobboard-pied.vercel.app',
    github: 'https://github.com/TommyCursor/hireboard',
  },
]

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-40px' })

  return (
    <motion.div
      ref={ref}
      className="group border border-[#0d2200] p-6 flex flex-col relative overflow-hidden hover:border-[#1a3a1a] transition-colors duration-300"
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6 }}
    >
      {/* Hover fill — dark green */}
      <motion.div
        className="absolute inset-0 origin-bottom pointer-events-none"
        style={{ backgroundColor: '#040d04' }}
        initial={{ scaleY: 0 }}
        whileHover={{ scaleY: 1 }}
        transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
      />

      <span className="font-serif text-4xl md:text-5xl leading-none relative z-10 text-[#0d2200] group-hover:text-[#1a3a1a] transition-colors duration-300">
        {project.number}
      </span>
      <h3 className="font-serif text-xl md:text-2xl text-[#00FF41] mt-2 mb-2 relative z-10 transition-colors duration-300">
        {project.name}
      </h3>
      <p className="font-sans text-sm text-[#2a5c2a] leading-relaxed mb-4 flex-1 relative z-10 group-hover:text-[#4d994d] transition-colors duration-300">
        {project.description}
      </p>
      <div className="flex flex-wrap gap-1.5 mb-5 relative z-10">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className="font-sans text-xs border border-[#0d2200] text-[#1a3a1a] px-2.5 py-1 rounded-full group-hover:border-[#1a3a1a] group-hover:text-[#2a5c2a] transition-colors duration-300"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex items-center gap-4 relative z-10">
        <a
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs text-[#00FF41] flex items-center gap-1.5 group/link w-fit transition-colors duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          View Live
          <span className="transition-transform duration-200 group-hover/link:translate-x-1 inline-block">→</span>
        </a>
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="font-sans text-xs text-[#1a3a1a] flex items-center gap-1.5 group/gh w-fit hover:text-[#2a5c2a] transition-colors duration-300"
          onClick={(e) => e.stopPropagation()}
        >
          GitHub
          <span className="transition-transform duration-200 group-hover/gh:translate-x-1 inline-block">↗</span>
        </a>
      </div>
    </motion.div>
  )
}

export default function Work() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="work" className="bg-[#080808] px-6 md:px-16 lg:px-24 py-20 md:py-28 border-t border-[#0d2200]">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.p
          className="font-sans text-xs tracking-[0.2em] uppercase text-[#1a3a1a] mb-4"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          Portfolio
        </motion.p>
        <div className="overflow-hidden mb-16">
          <motion.h2
            className="font-serif text-4xl md:text-5xl lg:text-7xl text-[#00FF41] leading-none"
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
