/**
 * FreeLookHUD Component
 * 
 * Heads-Up Display shown during free-look mode with controls and debug information.
 * 
 * Features:
 * - Device-specific control instructions (mouse/touch)
 * - Animated Lottie icon showing interaction method
 * - Exit button to return to normal scroll mode
 * - Developer debug panel with camera position/target
 * - Copy-to-clipboard for camera coordinates
 * - Internationalized text
 * 
 * Layout:
 * - Top-left: Debug panel with camera coordinates
 * - Bottom-center: Exit button, instructions, and animated icon
 * 
 * @param isVisible - Whether to display the HUD (true in free-look mode)
 * @param cameraPos - Current camera position [x, y, z]
 * @param cameraTarget - Current camera look-at target [x, y, z]
 * @param onCopy - Callback to copy camera data to clipboard
 */

import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import type { Vector3Tuple } from '../types/camera'
import { useFreeLookStore } from '../store/useFreeLookStore'
import { useTranslation } from 'react-i18next'
import { useIsMobileOrTablet } from '../hooks/useMediaQuery'
import mouseMoveIcon from '../icons/mouse-move.json'
import fingerMoveIcon from '../icons/finger-move.json'

interface FreeLookHUDProps {
  isVisible: boolean
  cameraPos: Vector3Tuple
  cameraTarget: Vector3Tuple
  onCopy: () => void
}

export function FreeLookHUD({ isVisible, cameraPos, cameraTarget, onCopy }: FreeLookHUDProps) {
  const { toggleFreeLook } = useFreeLookStore()
  const { t } = useTranslation()
  
  // Detect device type for appropriate controls display
  const isMobileOrTablet = useIsMobileOrTablet()
  
  // Reference for Lottie animation container
  const iconContainerRef = useRef<HTMLDivElement>(null)

  /**
   * Initialize Lottie animation for control instructions
   * Shows appropriate animation (mouse or touch) based on device
   */
  useEffect(() => {
    if (!iconContainerRef.current || !isVisible) return

    // Select icon based on device type
    const iconData = isMobileOrTablet ? fingerMoveIcon : mouseMoveIcon

    // Initialize Lottie animation
    const animation = lottie.loadAnimation({
      container: iconContainerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: iconData,
    })

    // Cleanup on unmount or visibility change
    return () => {
      animation.destroy()
    }
  }, [isMobileOrTablet, isVisible])

  return (
    <>
      {isVisible && (
        <>
          {/* Bottom center: Exit button and controls */}
          <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 flex flex-col items-center gap-4">
            {/* Animated control icon (mouse/touch) */}
            <div 
              ref={iconContainerRef}
              className="w-16 h-16 pointer-events-none"
              style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
            />
            
            {/* Exit free-look button */}
            <button 
              onClick={toggleFreeLook}
              className="bg-white/20 backdrop-blur-[20px] rounded-full border border-white/30 px-10 py-5 text-white font-semibold text-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] pointer-events-auto hover:bg-white/30 hover:border-white/40 transition-all duration-300 text-shadow-[1px_1px_3px_rgba(0,0,0,0.5)]"
            >
              {t('freeLookHUD.exitFreeLook')}
            </button>

            {/* Control instructions tooltip */}
            <div className="bg-white/10 backdrop-blur-[15px] rounded-2xl border border-white/20 px-8 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.3)] pointer-events-none">
              <p className="text-white text-[0.95rem] font-medium m-0 whitespace-nowrap text-shadow-[1px_1px_2px_rgba(0,0,0,0.4)]">
                {isMobileOrTablet ? t('freeLookHUD.controlsformobile') : t('freeLookHUD.controlsforpc')}
              </p>
            </div>
          </div>
          
          {/* Top left: Developer debug panel */}
          <div className="fixed top-8 left-8 z-30 pointer-events-auto">
            <div className="bg-black/80 backdrop-blur-[10px] rounded-xl border border-white/20 px-6 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.5)] font-mono text-sm">
              {/* Debug panel title */}
              <div className="text-green-400 font-bold mb-2 text-shadow-[1px_1px_2px_rgba(0,0,0,0.6)]">{t('freeLookHUD.cameraDebug')}</div>
              
              {/* Camera position display */}
              <div className="text-white/90 mb-1 text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
                <span className="text-blue-300 text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">{t('freeLookHUD.position')}</span> [{cameraPos.join(', ')}]
              </div>
              
              {/* Camera target display */}
              <div className="text-white/90 mb-3 text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">
                <span className="text-purple-300 text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]">{t('freeLookHUD.target')}</span> [{cameraTarget.join(', ')}]
              </div>
              
              {/* Copy coordinates button for developers */}
              <button
                onClick={onCopy}
                className="bg-green-500/20 text-green-300 border border-green-500/50 rounded-lg px-4 py-2 text-xs font-semibold w-full hover:bg-green-500/40 transition-all duration-300 text-shadow-[1px_1px_2px_rgba(0,0,0,0.5)]"
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

