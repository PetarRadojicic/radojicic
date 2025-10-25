/**
 * Experience Component
 * 
 * Displays professional work experience and educational background in a timeline format.
 * 
 * Features:
 * - Vertical timeline with visual indicators
 * - Categorized items (education vs. work experience)
 * - Color-coded badges for item types
 * - Glassmorphism card design
 * - Hover animations
 * - Internationalized content
 */

import { useTranslation } from 'react-i18next'

// Interface for timeline item data structure
interface TimelineItem {
  id: string
  title: string
  organization: string
  location: string
  period: string
  description?: string
  type: 'education' | 'work'
}

export function Experience() {
  const { t } = useTranslation()
  
  // Timeline data combining education and work experience
  const timelineData: TimelineItem[] = [
    {
      id: '1',
      title: t('experience.timeline.education1.title'),
      organization: t('experience.timeline.education1.organization'),
      location: t('experience.timeline.education1.location'),
      period: '2018 — 2022',
      type: 'education'
    },
    {
      id: '2',
      title: t('experience.timeline.education2.title'),
      organization: t('experience.timeline.education2.organization'),
      location: t('experience.timeline.education2.location'),
      period: '2022',
      type: 'education'
    },
    {
      id: '3',
      title: t('experience.timeline.work1.title'),
      organization: t('experience.timeline.work1.organization'),
      location: t('experience.timeline.work1.location'),
      period: '2023-2024',
      type: 'work'
    },
    {
      id: '4',
      title: t('experience.timeline.work2.title'),
      organization: t('experience.timeline.work2.organization'),
      location: t('experience.timeline.work2.location'),
      period: '2024',
      type: 'work'
    }
  ]

  return (
    <section id="experience" data-section="3" className="min-h-screen w-full flex items-center justify-center snap-start snap-always py-20 px-6">
      <div className="max-w-5xl w-full">
        {/* Section header */}
        <div className="bg-white/10 backdrop-blur-[20px] rounded-3xl border border-white/20 p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 transition-all duration-500 mb-12">
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0, 0, 0,0.3)] text-shadow-[1px_1px_4px_rgba(0,0,0,0.6),0_0_10px_rgba(0, 0, 0,0.2)]">
              {t('experience.title')}
            </h2>
            <p className="text-xl text-white/80 drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
              {t('experience.description')}
            </p>
          </div>
        </div>

        {/* Timeline container */}
        <div className="relative">
          {/* Vertical timeline line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/30 backdrop-blur-sm"></div>

          {/* Timeline items */}
          <div className="space-y-8">
            {timelineData.map((item) => (
              <div 
                key={item.id} 
                className="relative flex items-start"
              >
                {/* Timeline dot indicator */}
                <div 
                  className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                    item.type === 'education' 
                      ? 'bg-white border-white/50 shadow-[0_0_20px_rgba(0, 0, 0,0.5)]' 
                      : 'bg-white border-white/50 shadow-[0_0_20px_rgba(0, 0, 0,0.8)] ring-2 ring-white/30 ring-offset-2 ring-offset-transparent'
                  } z-10`}
                ></div>

                {/* Timeline item content card */}
                <div className="ml-16 flex-1">
                  <div className="bg-white/10 backdrop-blur-[20px] rounded-2xl border border-white/20 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.5)] transition-all duration-500">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-3">
                      {/* Item details (title, organization, location) */}
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_2px_20px_rgba(0, 0, 0,0.3)] text-shadow-[1px_1px_4px_rgba(0,0,0,0.6),0_0_10px_rgba(0, 0, 0,0.2)]">
                          {item.title}
                        </h3>
                        <p className="text-lg font-semibold text-white/90 mb-1 drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                          {item.organization}
                        </p>
                        <p className="text-sm text-white/70 drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)]">
                          {item.location}
                        </p>
                      </div>
                      
                      {/* Type badge and period */}
                      <div className="flex flex-col items-start lg:items-end gap-2">
                        {/* Category badge (education or work) */}
                        <span 
                          className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-[10px] shadow-[0_4px_16px_0_rgba(0,0,0,0.3)] text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)] ${
                            item.type === 'education' 
                              ? 'bg-white/20 border border-white/30 text-white' 
                              : 'bg-white/25 border border-white/40 text-white'
                          }`}
                        >
                          {item.type === 'education' ? t('experience.education') : t('experience.workExperience')}
                        </span>
                        {/* Time period */}
                        <p className="text-sm text-white/80 font-medium drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)]">
                          {item.period}
                        </p>
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="text-white/80 leading-relaxed mt-3 drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                        {item.description}
                      </p>
                      )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

