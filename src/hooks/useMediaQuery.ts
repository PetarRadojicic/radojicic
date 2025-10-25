/**
 * Media Query Hooks
 * 
 * Collection of React hooks for responsive design and device detection.
 * Uses the native window.matchMedia API for efficient media query matching.
 * 
 * Features:
 * - SSR-safe (checks for window availability)
 * - Real-time updates when viewport size changes
 * - Automatic cleanup of event listeners
 * - Lazy initialization with useState callback
 * 
 * Available Hooks:
 * - useMediaQuery: Base hook for custom media queries
 * - useIsMobile: Detects mobile devices (≤767px)
 * - useIsTablet: Detects tablet devices (768px-1023px)
 * - useIsMobileOrTablet: Detects mobile or tablet (≤1023px)
 * - useIsDesktop: Detects desktop devices (≥1024px)
 */

import { useState, useEffect } from 'react';

/**
 * Base hook for matching media queries
 * 
 * @param query - CSS media query string (e.g., "(min-width: 768px)")
 * @returns boolean indicating if the media query matches
 * 
 * @example
 * const isWideScreen = useMediaQuery('(min-width: 1920px)');
 */
export const useMediaQuery = (query: string): boolean => {
  // Initialize state with current match status (SSR-safe)
  const [matches, setMatches] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return window.matchMedia(query).matches;
    }
    return false;
  });

  useEffect(() => {
    // Skip if running on server
    if (typeof window === 'undefined') {
      return;
    }

    // Create MediaQueryList object
    const mediaQuery = window.matchMedia(query);
    
    /**
     * Handle media query changes
     * Updates state when viewport size changes
     */
    const handleChange = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // Set initial value
    setMatches(mediaQuery.matches);

    // Listen for changes
    mediaQuery.addEventListener('change', handleChange);

    // Cleanup listener on unmount or query change
    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

/**
 * Hook to detect mobile devices (max-width: 767px)
 * Typically used for smartphones
 */
export const useIsMobile = (): boolean => {
  return useMediaQuery('(max-width: 767px)');
};

/**
 * Hook to detect tablet devices (768px - 1023px)
 * Typically used for iPads and Android tablets
 */
export const useIsTablet = (): boolean => {
  return useMediaQuery('(min-width: 768px) and (max-width: 1023px)');
};

/**
 * Hook to detect mobile or tablet devices (max-width: 1023px)
 * Useful for showing touch-optimized UI elements
 */
export const useIsMobileOrTablet = (): boolean => {
  return useMediaQuery('(max-width: 1023px)');
};

/**
 * Hook to detect desktop devices (min-width: 1024px)
 * Typically used for laptops and desktop computers
 */
export const useIsDesktop = (): boolean => {
  return useMediaQuery('(min-width: 1024px)');
};

