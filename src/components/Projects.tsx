import { motion } from 'framer-motion'
import { useMemo, useState, useEffect } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

interface Project {
  id: string
  title: string
  description: string
  image: string
  tags: string[]
  githubUrl?: string
  playStoreUrl?: string
  siteUrl?: string
}

export function Projects() {
  const { t } = useTranslation()
  const [selectedTag, setSelectedTag] = useState<string>(t('projects.all'))

  useEffect(() => {
    setSelectedTag(t('projects.all'))
  }, [t])

  const projects: Project[] = [
    {
      id: '1',
      title: t('projects.projectTitles.moneyQR'),
      description: t('projects.projectDescriptions.moneyQR'),
      image: '/money-qr.png',
      tags: ['React Native', 'Expo', 'TypeScript'],
      githubUrl: 'https://github.com/PetarRadojicic/money-qr',
      playStoreUrl: 'https://play.google.com',
    },
    {
      id: '2',
      title: t('projects.projectTitles.radojicic'),
      description: t('projects.projectDescriptions.radojicic'),
      image: '/radojicic.png',
      tags: ['React', 'TypeScript', 'Vite'],
      githubUrl: 'https://github.com/PetarRadojicic/radojicic',
    },
    {
      id: '3',
      title: t('projects.projectTitles.petQR'),
      description: t('projects.projectDescriptions.petQR'),
      image: '/pet-qr.png',
      tags: ['React', 'TypeScript', 'Next.js'],
      siteUrl: 'https://petqr.rs/',
    },
  ]

  const allTags = useMemo(() => {
    const tags = new Set<string>()
    projects.forEach((p) => p.tags.forEach((t) => tags.add(t)))
    return [t('projects.all'), ...Array.from(tags).sort()]
  }, [t])

  const filteredProjects = useMemo(() => {
    if (selectedTag === t('projects.all')) return projects
    return projects.filter((p) => p.tags.includes(selectedTag))
  }, [selectedTag, t])

  const containerVariants = {
    initial: { opacity: 0, y: 50 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as const,
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
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
        className="max-w-7xl w-full"
        variants={containerVariants}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div 
          className="bg-white/10 backdrop-blur-[20px] rounded-3xl border border-white/20 p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 transition-all duration-500 mb-12"
          variants={itemVariants}
        >
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
              {t('projects.title')}
            </h1>
            <p className="text-xl text-white/80 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
              {t('projects.description')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            {allTags.map((tag) => (
              <motion.button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 ${
                  selectedTag === tag
                    ? 'bg-white/25 backdrop-blur-[20px] border border-white/30 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                    : 'bg-white/10 backdrop-blur-[20px] border border-white/20 text-white/80 hover:bg-white/15 hover:border-white/25'
                }`}
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.3 }}
              >
                {tag}
              </motion.button>
            ))}
          </div>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6">
          {filteredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="
                bg-white/10 backdrop-blur-[20px] rounded-3xl border border-white/20 
                shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] 
                hover:bg-white/15 hover:border-white/30 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.5)]
                transition-all duration-500
                flex flex-col overflow-hidden
                basis-full
                sm:basis-[calc(50%-0.75rem)]
                lg:basis-[calc(33.333%-1rem)]
                min-w-[280px] max-w-[420px]
              "
              variants={itemVariants}
              whileHover={{ y: -8 }}
            >
              <div className="relative aspect-video overflow-hidden bg-white/5">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold leading-tight tracking-tight mb-3 text-white drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)]">
                  {project.title}
                </h3>
                <p className="text-sm text-white/80 mb-6 leading-relaxed drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                  {project.description}
                </p>

                <div className="mt-auto flex flex-col gap-4">

                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-lg bg-white/15 backdrop-blur-[10px] border border-white/20 px-3 py-1 text-xs font-semibold text-white/90"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <motion.a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-[10px] border border-white/20 hover:bg-white/20 hover:border-white/30 px-3 py-2.5 text-sm font-medium text-white transition-all duration-300"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaGithub className="mr-2 h-4 w-4" />
                        {t('projects.github')}
                      </motion.a>
                    )}
                    {project.playStoreUrl && (
                      <motion.a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-[10px] border border-white/30 hover:bg-white/30 hover:border-white/40 px-3 py-2.5 text-sm font-medium text-white transition-all duration-300 shadow-[0_4px_16px_0_rgba(0,0,0,0.3)]"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                        {t('projects.playStore')}
                      </motion.a>
                    )}
                    {project.siteUrl && (
                      <motion.a
                        href={project.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-[10px] border border-white/30 hover:bg-white/30 hover:border-white/40 px-3 py-2.5 text-sm font-medium text-white transition-all duration-300 shadow-[0_4px_16px_0_rgba(0,0,0,0.3)]"
                        whileHover={{ scale: 1.02, y: -2 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                        {t('projects.visitSite')}
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <motion.div 
            className="py-12 text-center"
            variants={itemVariants}
          >
            <p className="text-lg text-white/70 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
              {t('projects.noProjects')}
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  )
}

