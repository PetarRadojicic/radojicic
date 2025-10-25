import { useTranslation } from 'react-i18next'

export function About() {
  const { t } = useTranslation()
  
  const about = {
    email: "petar@radojicic.co",
    github: "https://github.com/PetarRadojicic",
    linkedin: "#",
    photoSrc: "/img/me.webp",
  } as const

  return (
    <section id="about" data-section="1" className="min-h-screen w-full flex items-center justify-center snap-start snap-always py-20 px-6">
      <div className="max-w-6xl w-full">
        <div className="grid md:grid-cols-[300px_1fr] gap-12 items-start">
          <div className="bg-white/10 backdrop-blur-[20px] rounded-3xl border border-white/20 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 transition-all duration-500 flex flex-col items-center space-y-6">
            <div className="w-56 h-56 rounded-full overflow-hidden shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] border-4 border-white/20">
              <img
                src={about.photoSrc}
                alt={`${t('about.name')} profile photo`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>

            <div className="text-center">
              <h1 className="text-3xl font-bold mb-2 tracking-tight text-white drop-shadow-[0_2px_20px_rgba(0, 0, 0,0.3)] text-shadow-[1px_1px_4px_rgba(0,0,0,0.6),0_0_10px_rgba(0, 0, 0,0.2)]">
                {t('about.name')}
              </h1>
              <p className="text-white/80 text-lg drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                {t('about.role')}
              </p>
            </div>

            <div className="flex gap-4">
              <a
                href={about.github}
                className="text-white hover:text-white/70 transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg className="w-7 h-7 drop-shadow-[0_2px_10px_rgba(0, 0, 0,0.3)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href={about.linkedin}
                className="text-white hover:text-white/70 transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noreferrer noopener"
              >
                <svg className="w-7 h-7 drop-shadow-[0_2px_10px_rgba(0, 0, 0,0.3)]" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <div className="bg-white/10 backdrop-blur-[20px] rounded-3xl border border-white/20 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 transition-all duration-500">
                <h2 className="text-3xl font-bold mb-6 text-white tracking-tight drop-shadow-[0_2px_20px_rgba(0, 0, 0,0.3)] text-shadow-[1px_1px_4px_rgba(0,0,0,0.6),0_0_10px_rgba(0, 0, 0,0.2)] border-b-2 border-white/30 pb-3 inline-block">
                  {t('about.title')}
                </h2>
                <div className="space-y-4 mt-6">
                  <p className="text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                    {t('about.description1')}
                  </p>
                  <p className="text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                    {t('about.description2')}
                  </p>
                  <p className="text-lg leading-relaxed text-white/90 drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                    {t('about.description3')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-[20px] rounded-3xl border border-white/20 p-8 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 transition-all duration-500">
              <h2 className="text-3xl font-bold mb-6 text-white tracking-tight drop-shadow-[0_2px_20px_rgba(0, 0, 0,0.3)] text-shadow-[1px_1px_4px_rgba(0,0,0,0.6),0_0_10px_rgba(0, 0, 0,0.2)]">
                {t('about.getInTouch')}
              </h2>
              <p className="text-white/90 mb-6 leading-relaxed text-lg drop-shadow-[0_1px_10px_rgba(0, 0, 0,0.2)] text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">
                {t('about.contactDescription')}
              </p>
              <div className="flex justify-center md:justify-start">
                <a
                  href={`mailto:${about.email}`}
                  className="inline-block bg-white/20 backdrop-blur-[20px] border border-white/30 text-white px-6 py-4 font-semibold rounded-2xl text-center shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/30 hover:border-white/40 transition-all duration-300 text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]"
                >
                  <span className="block text-sm mb-1 opacity-90 text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)]">{t('about.contactMe')}</span>
                  <span className="block text-lg font-bold text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]">{about.email}</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

