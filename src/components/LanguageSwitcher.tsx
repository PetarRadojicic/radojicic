import { motion } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface LanguageSwitcherProps {
  className?: string
  variant?: 'default' | 'minimal'
}

export function LanguageSwitcher({ className = '', variant = 'default' }: LanguageSwitcherProps) {
  const { i18n } = useTranslation()
  
  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sr' : 'en'
    i18n.changeLanguage(newLang)
  }

  if (variant === 'minimal') {
    return (
      <button
        onClick={toggleLanguage}
        className={`px-4 py-2 text-white font-medium transition-colors hover:text-white/70 ${className}`}
      >
        {i18n.language.toUpperCase()}
      </button>
    )
  }

  return (
    <motion.button 
      onClick={toggleLanguage}
      className={`bg-white/15 backdrop-blur-[20px] rounded-full border border-white/20 px-8 py-4 text-white font-medium text-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] ${className}`}
      whileHover={{ 
        scale: 1.05, 
        y: -4,
        backgroundColor: 'rgba(255, 255, 255, 0.25)',
        borderColor: 'rgba(255, 255, 255, 0.30)',
        boxShadow: '0 16px 48px 0 rgba(0,0,0,0.5)'
      }}
      whileTap={{ scale: 1, y: 0 }}
      transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
    >
      {i18n.language.toUpperCase()} / {i18n.language === 'en' ? 'SR' : 'EN'}
    </motion.button>
  )
}

