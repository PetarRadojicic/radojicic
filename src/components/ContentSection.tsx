import type { SectionData } from '../data/sections'

interface ContentSectionProps {
  section: SectionData
}

export function ContentSection({ section }: ContentSectionProps) {
  return (
    <section
      key={section.id}
      className="h-screen w-full flex items-center justify-center snap-start snap-always"
    >
      <div className="bg-white/5 backdrop-blur-[20px] rounded-3xl border border-white/10 px-24 py-16 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/8 hover:border-white/20 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] max-w-[600px] text-center animate-fadeInScale">
        <h2 className="text-5xl font-bold mb-4 text-white tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)] -tracking-[0.02em]">
          {section.title}
        </h2>
        <p className="text-xl text-white/80 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)] tracking-[0.02em]">
          {section.subtitle}
        </p>
      </div>
    </section>
  )
}

