import type { Vector3Tuple } from '../types/camera'
import { useFreeLookStore } from '../store/useFreeLookStore'
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
    <>
      {isVisible && (
        <>
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-4">
            <button 
              onClick={toggleFreeLook}
              className="bg-white/20 backdrop-blur-[20px] rounded-full border border-white/30 px-10 py-5 text-white font-semibold text-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto hover:bg-white/30 hover:border-white/40 transition-all duration-300"
            >
              {t('freeLookHUD.exitFreeLook')}
            </button>

            <div className="bg-white/10 backdrop-blur-[15px] rounded-2xl border border-white/20 px-8 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)] pointer-events-none">
              <p className="text-white text-[0.95rem] font-medium m-0 whitespace-nowrap">
                {t('freeLookHUD.controls')}
              </p>
            </div>
          </div>
          
          <div className="fixed top-8 left-8 z-30 pointer-events-auto">
            <div className="bg-black/80 backdrop-blur-[10px] rounded-xl border border-white/20 px-6 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.5)] font-mono text-sm">
              <div className="text-green-400 font-bold mb-2">{t('freeLookHUD.cameraDebug')}</div>
              <div className="text-white/90 mb-1">
                <span className="text-blue-300">{t('freeLookHUD.position')}</span> [{cameraPos.join(', ')}]
              </div>
              <div className="text-white/90 mb-3">
                <span className="text-purple-300">{t('freeLookHUD.target')}</span> [{cameraTarget.join(', ')}]
              </div>
              <button
                onClick={onCopy}
                className="bg-green-500/20 text-green-300 border border-green-500/50 rounded-lg px-4 py-2 text-xs font-semibold w-full hover:bg-green-500/40 transition-all duration-300"
              >
                {t('freeLookHUD.copyToClipboard')}
              </button>
            </div>
          </div>
        </>
      )}
    </>
  )
}

