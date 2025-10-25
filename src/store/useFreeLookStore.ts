/**
 * Free-Look Mode Store
 * 
 * Global state management for free-look camera mode using Zustand.
 * Manages whether the user is in manual camera control mode or
 * automated scroll-based camera mode.
 * 
 * State:
 * - isFreeLook: Boolean indicating if free-look mode is active
 * 
 * Actions:
 * - toggleFreeLook: Toggle between free-look and normal mode
 * - setFreeLook: Directly set free-look mode state
 * 
 * Usage:
 * ```tsx
 * const { isFreeLook, toggleFreeLook } = useFreeLookStore();
 * ```
 */

import { create } from 'zustand'

interface FreeLookStore {
  /** Whether free-look mode is currently active */
  isFreeLook: boolean
  
  /** Toggle between free-look and normal scroll mode */
  toggleFreeLook: () => void
  
  /** Directly set free-look mode state */
  setFreeLook: (value: boolean) => void
}

/**
 * Zustand store for managing free-look camera mode
 * Provides global state accessible from any component
 */
export const useFreeLookStore = create<FreeLookStore>((set) => ({
  isFreeLook: false, // Default: normal scroll mode
  toggleFreeLook: () => set((state) => ({ isFreeLook: !state.isFreeLook })),
  setFreeLook: (value) => set({ isFreeLook: value }),
}))

