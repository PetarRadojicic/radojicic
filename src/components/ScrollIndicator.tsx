/**
 * ScrollIndicator Component
 * 
 * Displays an animated scroll indicator at the bottom of the screen
 * to guide users to scroll down. The icon adapts based on device type.
 * 
 * Features:
 * - Device-aware icons (mouse for desktop, finger for mobile/tablet)
 * - Lottie animations for smooth, vector-based animations
 * - Automatically hidden in free-look mode
 * - Positioned at bottom center of viewport
 * - Glow effect with drop shadow
 * 
 * @param isVisible - Controls visibility (hidden during free-look mode)
 */

import { useEffect, useRef } from 'react'
import lottie from 'lottie-web'
import { useIsMobileOrTablet } from '../hooks/useMediaQuery'
import mouseScrollIcon from '../icons/mouse-scroll.json'
import fingerScrollIcon from '../icons/finger-scroll.json'

interface ScrollIndicatorProps {
  isVisible: boolean
}

export function ScrollIndicator({ isVisible }: ScrollIndicatorProps) {
  // Detect if user is on mobile/tablet to show appropriate icon
  const isMobileOrTablet = useIsMobileOrTablet()
  
  // Reference to the container element for Lottie animation
  const containerRef = useRef<HTMLDivElement>(null)

  /**
   * Initialize and manage Lottie animation
   * Cleans up animation when component unmounts or visibility changes
   */
  useEffect(() => {
    if (!containerRef.current || !isVisible) return

    // Select appropriate icon based on device type
    const iconData = isMobileOrTablet ? fingerScrollIcon : mouseScrollIcon

    // Initialize Lottie animation
    const animation = lottie.loadAnimation({
      container: containerRef.current,
      renderer: 'svg',
      loop: true,
      autoplay: true,
      animationData: iconData,
    })

    // Cleanup: destroy animation when component unmounts or rerenders
    return () => {
      animation.destroy()
    }
  }, [isMobileOrTablet, isVisible])

  // Don't render if not visible
  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none animate-fadeIn">
      {/* Lottie animation container with glow effect */}
      <div 
        ref={containerRef}
        className="w-16 h-16"
        style={{ filter: 'drop-shadow(0 0 8px rgba(255, 255, 255, 0.5))' }}
      />
    </div>
  )
}

