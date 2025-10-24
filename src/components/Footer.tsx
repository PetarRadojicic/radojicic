import { useTranslation } from 'react-i18next'

export function Footer() {
  const { t } = useTranslation()
  
  const currentYear = new Date().getFullYear()
  
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }

  return (
    <footer className="w-full py-20 px-6 snap-start snap-always flex items-center justify-center min-h-screen">
      <div className="max-w-6xl w-full">
        <div className="bg-white/10 backdrop-blur-[20px] rounded-3xl border border-white/20 p-8 md:p-12 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/15 hover:border-white/30 transition-all duration-500">
          <div className="grid md:grid-cols-3 gap-12">
            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold mb-6 text-white tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)] border-b-2 border-white/30 pb-2 inline-block">
                {t('footer.getInTouch')}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                  </svg>
                  <a 
                    href="mailto:petar@radojicic.co" 
                    className="text-white/80 hover:text-white transition-colors drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]"
                  >
                    petar@radojicic.co
                  </a>
                </div>
                <div className="flex items-center justify-center space-x-3">
                  <svg className="w-5 h-5 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span className="text-white/80 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                    {t('footer.location')}
                  </span>
                </div>
              </div>
            </div>

            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold mb-6 text-white tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)] border-b-2 border-white/30 pb-2 inline-block">
                {t('footer.followMe')}
              </h3>
              <div className="flex flex-col items-center space-y-4">
                <a 
                  href="https://github.com/PetarRadojicic" 
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span className="font-medium">GitHub</span>
                </a>
                <a 
                  href="#" 
                  className="flex items-center space-x-3 text-white/80 hover:text-white transition-colors drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                  </svg>
                  <span className="font-medium">LinkedIn</span>
                </a>
              </div>
            </div>

            <div className="space-y-6 text-center">
              <h3 className="text-2xl font-bold mb-6 text-white tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)] border-b-2 border-white/30 pb-2 inline-block">
                {t('footer.quickLinks')}
              </h3>
              <div className="flex flex-col items-center space-y-3">
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)] font-medium"
                >
                  {t('footer.aboutMe')}
                </button>
                <button 
                  onClick={() => scrollToSection('projects')}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)] font-medium"
                >
                  {t('footer.projects')}
                </button>
                <button 
                  onClick={() => scrollToSection('experience')}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)] font-medium"
                >
                  {t('footer.experience')}
                </button>
                <button 
                  onClick={() => scrollToSection('about')}
                  className="text-white/80 hover:text-white transition-colors cursor-pointer drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)] font-medium"
                >
                  {t('footer.contact')}
                </button>
              </div>
            </div>
          </div>

          <div className="border-t-2 border-white/20 mt-12 pt-8">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              <div className="text-center md:text-left">
                <p className="text-white/70 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                  {t('footer.copyright', { year: currentYear })}
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-white/70 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)]">
                  {t('footer.builtWith')}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

