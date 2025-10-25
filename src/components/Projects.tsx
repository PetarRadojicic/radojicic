import { useState } from 'react'
import { FaExternalLinkAlt, FaGithub } from 'react-icons/fa'
import { useTranslation } from 'react-i18next'

const PROJECTS = [
  {
    id: '1',
    titleKey: 'projects.projectTitles.moneyQR',
    descriptionKey: 'projects.projectDescriptions.moneyQR',
    image: '/img/projects/money-qr.webp',
    tags: ['React Native', 'Expo', 'TypeScript'],
    githubUrl: 'https://github.com/PetarRadojicic/money-qr',
    playStoreUrl: 'https://play.google.com',
  },
  {
    id: '2',
    titleKey: 'projects.projectTitles.radojicic',
    descriptionKey: 'projects.projectDescriptions.radojicic',
    image: '/img/projects/radojicic.webp',
    tags: ['React', 'TypeScript', 'Vite'],
    githubUrl: 'https://github.com/PetarRadojicic/radojicic',
  },
  {
    id: '3',
    titleKey: 'projects.projectTitles.petQR',
    descriptionKey: 'projects.projectDescriptions.petQR',
    image: '/img/projects/pet-qr.webp',
    tags: ['React', 'TypeScript', 'Next.js'],
    siteUrl: 'https://petqr.rs/',
  },
]

const UNIQUE_TAGS = Array.from(
  new Set(PROJECTS.flatMap(p => p.tags))
).sort()

export function Projects() {
  const { t } = useTranslation()
  const [selectedTag, setSelectedTag] = useState<string>('all')

  const filteredProjects = selectedTag === 'all' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.tags.includes(selectedTag))

  return (
    <section id="projects" data-section="2" className="min-h-screen w-full flex items-center justify-center snap-start snap-always py-20 px-6">
      <div className="max-w-7xl w-full">
        <div className="bg-white/10 backdrop-blur-[20px] rounded-3xl border border-white/20 p-8 md:p-10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 transition-all duration-500 mb-12">
          <div className="mb-8 text-center">
            <h1 className="text-5xl font-bold mb-4 tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0, 0, 0,0.3)] text-shadow-[1px_1px_4px_rgba(0,0,0,0.6),0_0_10px_rgba(0, 0, 0,0.2)]">
              {t('projects.title')}
            </h1>
            <p className="text-xl text-white/80 drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
              {t('projects.description')}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setSelectedTag('all')}
              className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)] ${
                selectedTag === 'all'
                  ? 'bg-white/25 backdrop-blur-[20px] border border-white/30 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                  : 'bg-white/10 backdrop-blur-[20px] border border-white/20 text-white/80 hover:bg-white/15 hover:border-white/25'
              }`}
            >
              {t('projects.all')}
            </button>

            {UNIQUE_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all duration-300 text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)] ${
                  selectedTag === tag
                    ? 'bg-white/25 backdrop-blur-[20px] border border-white/30 text-white shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]'
                    : 'bg-white/10 backdrop-blur-[20px] border border-white/20 text-white/80 hover:bg-white/15 hover:border-white/25'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {filteredProjects.map((project) => (
            <div
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
            >
              <div className="relative aspect-video overflow-hidden bg-white/5">
                <img
                  src={project.image}
                  alt={t(project.titleKey)}
                  className="w-full h-full object-cover transition-transform duration-700 hover:scale-110"
                  loading="lazy"
                />
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-2xl font-bold leading-tight tracking-tight mb-3 text-white drop-shadow-[0_2px_20px_rgba(0, 0, 0,0.3)] text-shadow-[1px_1px_4px_rgba(0,0,0,0.6),0_0_10px_rgba(0, 0, 0,0.2)]">
                  {t(project.titleKey)}
                </h3>
                <p className="text-sm text-white/80 mb-6 leading-relaxed drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                  {t(project.descriptionKey)}
                </p>

                <div className="mt-auto flex flex-col gap-4">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center rounded-lg bg-white/15 backdrop-blur-[10px] border border-white/20 px-3 py-1 text-xs font-semibold text-white/90 text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-white/10 backdrop-blur-[10px] border border-white/20 hover:bg-white/20 hover:border-white/30 px-3 py-2.5 text-sm font-medium text-white transition-all duration-300 text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)]"
                      >
                        <FaGithub className="mr-2 h-4 w-4" />
                        {t('projects.github')}
                      </a>
                    )}
                    {project.playStoreUrl && (
                      <a
                        href={project.playStoreUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-[10px] border border-white/30 hover:bg-white/30 hover:border-white/40 px-3 py-2.5 text-sm font-medium text-white transition-all duration-300 shadow-[0_4px_16px_0_rgba(0,0,0,0.3)] text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)]"
                      >
                        <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                        {t('projects.playStore')}
                      </a>
                    )}
                    {project.siteUrl && (
                      <a
                        href={project.siteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 inline-flex items-center justify-center rounded-xl bg-white/20 backdrop-blur-[10px] border border-white/30 hover:bg-white/30 hover:border-white/40 px-3 py-2.5 text-sm font-medium text-white transition-all duration-300 shadow-[0_4px_16px_0_rgba(0,0,0,0.3)] text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)]"
                      >
                        <FaExternalLinkAlt className="mr-2 h-4 w-4" />
                        {t('projects.visitSite')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="py-12 text-center">
            <p className="text-lg text-white/70 drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
              {t('projects.noProjects')}
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
