import { useEffect, useRef, useCallback } from 'react'
import type { RefObject } from 'react'

interface UseScrollControlProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>
  isFreeLook: boolean
  onSectionChange: (section: number) => void
}

export function useScrollControl({ scrollContainerRef, isFreeLook, onSectionChange }: UseScrollControlProps) {
  const sectionBoundariesRef = useRef<number[]>([])
  const currentSectionRef = useRef(0)

  const calculateSectionBoundaries = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const sections = container.querySelectorAll('[data-section]')
    const boundaries: number[] = []
    
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const relativeTop = rect.top - containerRect.top + container.scrollTop
      boundaries.push(relativeTop)
    })
    
    sectionBoundariesRef.current = boundaries
  }, [scrollContainerRef])

  useEffect(() => {
    calculateSectionBoundaries()
    
    const handleResize = () => {
      calculateSectionBoundaries()
    }
    
    window.addEventListener('resize', handleResize)
    const timer = setTimeout(calculateSectionBoundaries, 100)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [calculateSectionBoundaries])

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
      const viewportCenter = scrollTop + (window.innerHeight / 2)
      
      let section = 0
      const boundaries = sectionBoundariesRef.current
      
      for (let i = boundaries.length - 1; i >= 0; i--) {
        if (viewportCenter >= boundaries[i]) {
          section = i
          break
        }
      }
      
      if (section !== currentSectionRef.current) {
        currentSectionRef.current = section
        onSectionChange(section)
        
        const event = new CustomEvent('sectionChange', { detail: section })
        window.dispatchEvent(event)
      }
    }

    container.addEventListener('scroll', handleScroll)
    handleScroll()
    
    return () => container.removeEventListener('scroll', handleScroll)
  }, [isFreeLook, onSectionChange, scrollContainerRef])
}

