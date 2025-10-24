import type { Vector3Tuple } from '../types/camera'
import { useFreeLookStore } from '../store/useFreeLookStore'
import { motion, AnimatePresence } from 'framer-motion'
import { useTranslation } from 'react-i18next'

interface FreeLookHUDProps {
  isVisible: boolean
  cameraPos: Vector3Tuple
  cameraTarget: Vector3Tuple
  onCopy: () => void
}

export function FreeLookHUD({ isVisible, cameraPos, cameraTarget, onCopy }: FreeLookHUDProps) {
  const { toggleFreeLook } = useFreeLookStore()
  const { t } = useTranslation()

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          <motion.div 
            className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-4"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const }}
          >
            <motion.button 
              onClick={toggleFreeLook}
              className="bg-white/20 backdrop-blur-[20px] rounded-full border border-white/30 px-10 py-5 text-white font-semibold text-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.23, 1, 0.32, 1] as const,
                delay: 0
              }}
              whileHover={{ 
                scale: 1.05, 
                y: -4,
                backgroundColor: 'rgba(255, 255, 255, 0.30)',
                borderColor: 'rgba(255, 255, 255, 0.40)',
                boxShadow: '0 16px 48px 0 rgba(0,0,0,0.6)'
              }}
              whileTap={{ scale: 1, y: 0 }}
            >
              {t('freeLookHUD.exitFreeLook')}
            </motion.button>

            <motion.div 
              className="bg-white/10 backdrop-blur-[15px] rounded-2xl border border-white/20 px-8 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)] pointer-events-none"
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 30, scale: 0.9 }}
              transition={{ 
                duration: 0.6, 
                ease: [0.23, 1, 0.32, 1] as const,
                delay: 0.15
              }}
            >
              <p className="text-white text-[0.95rem] font-medium m-0 whitespace-nowrap">
                {t('freeLookHUD.controls')}
              </p>
            </motion.div>
          </motion.div>
          
          <motion.div 
            className="fixed top-8 left-8 z-30 pointer-events-auto"
            initial={{ opacity: 0, x: -50, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -50, scale: 0.9 }}
            transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] as const, delay: 0.2 }}
          >
            <div className="bg-black/80 backdrop-blur-[10px] rounded-xl border border-white/20 px-6 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.5)] font-mono text-sm">
              <div className="text-green-400 font-bold mb-2">{t('freeLookHUD.cameraDebug')}</div>
              <motion.div 
                className="text-white/90 mb-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.3 }}
              >
                <span className="text-blue-300">{t('freeLookHUD.position')}</span> [{cameraPos.join(', ')}]
              </motion.div>
              <motion.div 
                className="text-white/90 mb-3"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <span className="text-purple-300">{t('freeLookHUD.target')}</span> [{cameraTarget.join(', ')}]
              </motion.div>
              <motion.button
                onClick={onCopy}
                className="bg-green-500/20 text-green-300 border border-green-500/50 rounded-lg px-4 py-2 text-xs font-semibold w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
                whileHover={{ 
                  backgroundColor: 'rgba(34, 197, 94, 0.40)',
                  scale: 1.02
                }}
                whileTap={{ scale: 0.98 }}
              >
                {t('freeLookHUD.copyToClipboard')}
              </motion.button>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

