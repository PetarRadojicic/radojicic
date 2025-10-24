import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

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

  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as const,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, x: -30 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  }

  const headerVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  }
  
  return (
    <section className="min-h-screen w-full flex items-center justify-center snap-start snap-always py-20 px-6">
      <motion.div 
        className="max-w-5xl w-full"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="bg-white/10 backdrop-blur-[20px] rounded-3xl border border-white/20 p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 transition-all duration-500 mb-12"
          variants={headerVariants}
        >
          <div className="text-center">
            <h2 className="text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
              {t('experience.title')}
            </h2>
            <p className="text-xl text-white/80 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
              {t('experience.description')}
            </p>
          </div>
        </motion.div>

        <div className="relative">
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-white/30 backdrop-blur-sm"></div>

          <div className="space-y-8">
            {timelineData.map((item, index) => (
              <motion.div 
                key={item.id} 
                className="relative flex items-start"
                variants={itemVariants}
                custom={index}
              >
                <motion.div 
                  className={`absolute left-6 w-4 h-4 rounded-full border-4 ${
                    item.type === 'education' 
                      ? 'bg-white border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.5)]' 
                      : 'bg-white border-white/50 shadow-[0_0_20px_rgba(255,255,255,0.8)] ring-2 ring-white/30 ring-offset-2 ring-offset-transparent'
                  } z-10`}
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
                ></motion.div>

                <motion.div 
                  className="ml-16 flex-1"
                  whileHover={{ x: 4 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="bg-white/10 backdrop-blur-[20px] rounded-2xl border border-white/20 p-6 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.5)] transition-all duration-500">
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-3">
                      <div className="flex-1">
                        <h3 className="text-2xl font-bold text-white mb-2 tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
                          {item.title}
                        </h3>
                        <p className="text-lg font-semibold text-white/90 mb-1 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                          {item.organization}
                        </p>
                        <p className="text-sm text-white/70 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                          {item.location}
                        </p>
                      </div>
                      
                      <div className="flex flex-col items-start lg:items-end gap-2">
                        <motion.span 
                          className={`inline-block px-4 py-1.5 rounded-full text-xs font-semibold backdrop-blur-[10px] shadow-[0_4px_16px_0_rgba(0,0,0,0.3)] ${
                            item.type === 'education' 
                              ? 'bg-white/20 border border-white/30 text-white' 
                              : 'bg-white/25 border border-white/40 text-white'
                          }`}
                          whileHover={{ scale: 1.05 }}
                          transition={{ duration: 0.2 }}
                        >
                          {item.type === 'education' ? t('experience.education') : t('experience.workExperience')}
                        </motion.span>
                        <p className="text-sm text-white/80 font-medium drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                          {item.period}
                        </p>
                      </div>
                    </div>
                    
                    {item.description && (
                      <p className="text-white/80 leading-relaxed mt-3 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                        {item.description}
                      </p>
                    )}
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div 
          className="mt-12 flex justify-center"
          variants={headerVariants}
        >
          <div className="bg-white/10 backdrop-blur-[20px] rounded-2xl border border-white/20 px-6 py-4 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]">
            <div className="flex items-center space-x-8 text-sm">
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.5)]"></div>
                <span className="text-white/90 font-medium drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                  {t('experience.education')}
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-3 h-3 rounded-full bg-white shadow-[0_0_20px_rgba(255,255,255,0.8)] ring-2 ring-white/30 ring-offset-2 ring-offset-transparent"></div>
                <span className="text-white/90 font-medium drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                  {t('experience.workExperience')}
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}

