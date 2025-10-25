/**
 * i18n Configuration
 * 
 * Sets up internationalization for the application using i18next.
 * Supports English (en) and Serbian (sr) languages.
 * 
 * Features:
 * - Automatic language detection from localStorage and browser settings
 * - Falls back to English if detected language is not supported
 * - Translations are cached in localStorage for persistence
 */

import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

// Import translation files for supported languages
import enTranslation from '../public/locales/en/translation.json'
import srTranslation from '../public/locales/sr/translation.json'

// Initialize i18n with configuration
i18n
  .use(LanguageDetector) // Enable automatic language detection
  .use(initReactI18next) // Enable React integration
  .init({
    // Language resources
    resources: {
      en: {
        translation: enTranslation
      },
      sr: {
        translation: srTranslation
      }
    },
    fallbackLng: 'en', // Default language if detection fails
    supportedLngs: ['en', 'sr'], // List of supported languages
    interpolation: {
      escapeValue: false // React already escapes values, no need to escape twice
    },
    detection: {
      order: ['localStorage', 'navigator'], // Check localStorage first, then browser language
      caches: ['localStorage'] // Cache the selected language in localStorage
    }
  })

export default i18n

