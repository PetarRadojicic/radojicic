import { useFreeLookStore } from '../store/useFreeLookStore'
import { useTranslation } from 'react-i18next'

export function Hero() {
  const { isFreeLook, toggleFreeLook } = useFreeLookStore()
  const { t, i18n } = useTranslation()
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sr' : 'en'
    i18n.changeLanguage(newLang)
  }

  return (
    <section className="h-screen w-full flex items-center justify-center snap-start snap-always">
      <div className="max-w-[900px] text-center px-8">
        <h1 
          className={`text-8xl font-bold mb-6 text-white tracking-tight drop-shadow-[0_4px_30px_rgba(255,255,255,0.4)] -tracking-[0.03em] leading-[1.1] transition-opacity duration-500 ${isFreeLook ? 'opacity-0' : 'opacity-100'}`}
        >
          {t('hero.title')}
        </h1>
        
        <p 
          className={`text-3xl text-white/90 drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)] tracking-[0.01em] mb-12 font-semibold transition-opacity duration-500 ${isFreeLook ? 'opacity-0' : 'opacity-100'}`}
        >
          {t('hero.subtitle')}
        </p>
        
        <div 
          className={`flex gap-6 justify-center items-center mt-16 transition-opacity duration-500 ${isFreeLook ? 'opacity-0' : 'opacity-100'}`}
          style={{ pointerEvents: isFreeLook ? 'none' : 'auto' }}
        >
          <button 
            onClick={toggleFreeLook}
            className="bg-white/15 backdrop-blur-[20px] rounded-full border border-white/20 px-8 py-4 text-white font-medium text-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/25 hover:border-white/30 transition-all duration-300"
          >
            {t('hero.freeLook')}
          </button>
          
          <button 
            onClick={toggleLanguage}
            className="bg-white/15 backdrop-blur-[20px] rounded-full border border-white/20 px-8 py-4 text-white font-medium text-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/25 hover:border-white/30 transition-all duration-300"
          >
            {i18n.language.toUpperCase()} / {i18n.language === 'en' ? 'SR' : 'EN'}
          </button>
        </div>
      </div>
    </section>
  )
}

