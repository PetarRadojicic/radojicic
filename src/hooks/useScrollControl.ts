/**
 * useScrollControl Hook
 * 
 * Manages scroll-based section detection and scroll behavior control.
 * Determines which section is currently visible based on scroll position
 * and dispatches events for camera transitions.
 * 
 * Features:
 * - Calculates section boundaries dynamically
 * - Detects current section based on scroll position
 * - Disables scrolling in free-look mode
 * - Dispatches custom events for section changes
 * - Automatically recalculates on window resize
 * 
 * Section Detection Logic:
 * - Uses viewport center point for section determination
 * - Triggers camera transitions when section changes
 * 
 * @param scrollContainerRef - Reference to the scrollable container
 * @param isFreeLook - Whether free-look mode is active
 * @param onSectionChange - Callback fired when section changes
 */

import { useEffect, useRef, useCallback } from 'react'
import type { RefObject } from 'react'

interface UseScrollControlProps {
  scrollContainerRef: RefObject<HTMLDivElement | null>
  isFreeLook: boolean
  onSectionChange: (section: number) => void
}

export function useScrollControl({ scrollContainerRef, isFreeLook, onSectionChange }: UseScrollControlProps) {
  // Store section boundary positions for efficient section detection
  const sectionBoundariesRef = useRef<number[]>([])
  
  // Track current section to avoid redundant updates
  const currentSectionRef = useRef(0)

  /**
   * Calculate the scroll position boundaries for each section
   * Used to determine which section is currently visible
   */
  const calculateSectionBoundaries = useCallback(() => {
    const container = scrollContainerRef.current
    if (!container) return

    // Find all sections with data-section attribute
    const sections = container.querySelectorAll('[data-section]')
    const boundaries: number[] = []
    
    // Calculate the top position of each section relative to container
    sections.forEach((section) => {
      const rect = section.getBoundingClientRect()
      const containerRect = container.getBoundingClientRect()
      const relativeTop = rect.top - containerRect.top + container.scrollTop
      boundaries.push(relativeTop)
    })
    
    sectionBoundariesRef.current = boundaries
  }, [scrollContainerRef])

  /**
   * Initialize section boundaries and recalculate on window resize
   * Uses a small delay to ensure DOM is fully loaded
   */
  useEffect(() => {
    calculateSectionBoundaries()
    
    // Recalculate when window is resized
    const handleResize = () => {
      calculateSectionBoundaries()
    }
    
    window.addEventListener('resize', handleResize)
    
    // Initial calculation with delay to ensure DOM is ready
    const timer = setTimeout(calculateSectionBoundaries, 100)
    
    return () => {
      window.removeEventListener('resize', handleResize)
      clearTimeout(timer)
    }
  }, [calculateSectionBoundaries])

  /**
   * Control scroll container behavior based on free-look mode
   * Disables scrolling and pointer events when in free-look mode
   */
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    if (isFreeLook) {
      // Disable scrolling in free-look mode
      container.style.overflow = 'hidden'
      container.style.pointerEvents = 'none'
    } else {
      // Enable scrolling in normal mode
      container.style.overflow = 'auto'
      container.style.pointerEvents = 'auto'
    }
  }, [isFreeLook, scrollContainerRef])

  /**
   * Handle scroll events and detect section changes
   * Determines current section based on viewport center position
   * Dispatches events to trigger camera transitions
   */
  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      // Don't detect sections in free-look mode
      if (isFreeLook) return
      
      // Calculate center of viewport in scroll coordinates
      const scrollTop = container.scrollTop
      const viewportCenter = scrollTop + (window.innerHeight / 2)
      
      // Find which section the viewport center is in
      let section = 0
      const boundaries = sectionBoundariesRef.current
      
      // Start from last section and work backwards
      for (let i = boundaries.length - 1; i >= 0; i--) {
        if (viewportCenter >= boundaries[i]) {
          section = i
          break
        }
      }
      
      // Only trigger updates if section actually changed
      if (section !== currentSectionRef.current) {
        currentSectionRef.current = section
        onSectionChange(section)
        
        // Dispatch custom event for camera controller
        const event = new CustomEvent('sectionChange', { detail: section })
        window.dispatchEvent(event)
      }
    }

    // Attach scroll listener
    container.addEventListener('scroll', handleScroll)
    
    // Run once on mount to set initial section
    handleScroll()
    
    return () => container.removeEventListener('scroll', handleScroll)
  }, [isFreeLook, onSectionChange, scrollContainerRef])
}

