import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { useIsMobileOrTablet } from '../hooks/useMediaQuery'
import mouseScrollIcon from '../icons/mouse-scroll.json'
import fingerScrollIcon from '../icons/finger-scroll.json'

interface ScrollIndicatorProps {
  isVisible: boolean
}

export function ScrollIndicator({ isVisible }: ScrollIndicatorProps) {
  const isMobileOrTablet = useIsMobileOrTablet()
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current || !isVisible) return

    const iconData = isMobileOrTablet ? fingerScrollIcon : mouseScrollIcon

    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: iconData,
    })

    return () => {
      animation.destroy()
    }
  }, [isMobileOrTablet, isVisible])

  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none animate-fadeIn">
      <div 
        ref={containerRef}
        className="w-16 h-16"
        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
      />
    </div>
  )
}

