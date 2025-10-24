import { useEffect } from 'react'
import type { RefObject } from 'react'

interface UseScrollControlProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>
  isFreeLook: boolean
  onSectionChange: (section: number) => void
}

export function useScrollControl({ scrollContainerRef, isFreeLook, onSectionChange }: UseScrollControlProps) {
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    if (isFreeLook) {
      container.style.overflow = 'hidden'
      container.style.pointerEvents = 'none'
    } else {
      container.style.overflow = 'auto'
      container.style.pointerEvents = 'auto'
    }
  }, [isFreeLook, scrollContainerRef])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (isFreeLook) return
      
      const scrollTop = container.scrollTop
      const sectionHeight = window.innerHeight
      const section = Math.round(scrollTop / sectionHeight)
      
      onSectionChange(section)
      
      const event = new CustomEvent('sectionChange', { detail: section })
      window.dispatchEvent(event)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [isFreeLook, onSectionChange, scrollContainerRef])
}

