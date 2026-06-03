const socials = [
  { label: 'GitHub',   href: 'https://github.com/TommyCursor' },
  { label: 'LinkedIn', href: '#' },
  { label: 'Twitter',  href: '#' },
]

export default function Footer() {
  return (
    <footer className="bg-[#F8F7F4] px-6 md:px-16 lg:px-24 py-10 border-t border-[#E5E4E0]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div>
          <span className="font-serif text-lg sm:text-xl text-[#111111] block mb-1">Tommy Adeyinka</span>
          <span className="font-sans text-xs text-[#888888]">Developer · Marketer · Automator</span>
        </div>

        <div className="flex items-center gap-6">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              className="font-sans text-xs text-[#888888] hover:text-[#111111] transition-colors duration-200 tracking-[0.1em] uppercase"
            >
              {s.label}
            </a>
          ))}
        </div>

        <span className="font-sans text-xs text-[#BBBBBB]">&copy; 2026</span>
      </div>
    </footer>
  )
}
