'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const AVATAR = 'https://avatars.githubusercontent.com/u/256695225?v=4'
const links = ['About', 'Services', 'Work', 'Contact']

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [ready, setReady] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    setReady(true)
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 md:px-16 lg:px-24 py-4 flex items-center justify-between transition-all duration-300 ${
        scrolled || menuOpen
          ? 'bg-[#080808]/90 backdrop-blur-md border-b border-[#0d2200]'
          : ''
      }`}
      initial={{ y: -80, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -80, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 120, damping: 20, delay: 0.4 }}
    >
      {/* Logo — circular avatar */}
      <a href="#" className="shrink-0">
        <div className="relative w-9 h-9">
          <div
            className="absolute -bottom-1 -right-1 w-full h-full rounded-full pointer-events-none"
            style={{ border: '1px solid #00FF41', opacity: 0.45 }}
          />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={AVATAR}
            alt="Tommy Adeyinka"
            className="w-full h-full rounded-full object-cover relative z-10 grayscale hover:grayscale-0 transition-all duration-300"
          />
        </div>
      </a>

      {/* Desktop nav links */}
      <ul className="hidden md:flex gap-8">
        {links.map((link) => (
          <li key={link}>
            <a
              href={`#${link.toLowerCase()}`}
              className="font-sans text-sm text-[#2a5c2a] hover:text-[#00FF41] transition-colors duration-200 tracking-wide"
            >
              {link}
            </a>
          </li>
        ))}
      </ul>

      {/* Desktop CTA */}
      <a
        href="#contact"
        className="hidden md:inline-block font-sans text-sm bg-[#FF0040] text-white px-5 py-3 hover:bg-[#CC0030] transition-colors duration-200 tracking-wide"
      >
        Book a Call
      </a>

      {/* Mobile hamburger */}
      <button
        className="md:hidden flex flex-col gap-1.5 p-2 -mr-2"
        onClick={() => setMenuOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span className={`block w-6 h-px bg-[#00FF41] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
        <span className={`block w-6 h-px bg-[#00FF41] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
        <span className={`block w-6 h-px bg-[#00FF41] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
      </button>

      {/* Mobile dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 right-0 bg-[#080808]/95 backdrop-blur-md border-b border-[#0d2200] flex flex-col px-6 py-6 gap-5 md:hidden">
          {links.map((link) => (
            <a
              key={link}
              href={`#${link.toLowerCase()}`}
              className="font-sans text-sm text-[#2a5c2a] hover:text-[#00FF41] transition-colors duration-200"
              onClick={() => setMenuOpen(false)}
            >
              {link}
            </a>
          ))}
          <a
            href="#contact"
            className="font-sans text-sm bg-[#FF0040] text-white px-5 py-3 text-center hover:bg-[#CC0030] transition-colors duration-200 mt-2"
            onClick={() => setMenuOpen(false)}
          >
            Book a Call
          </a>
        </div>
      )}
    </motion.nav>
  )
}
