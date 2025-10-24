import { create } from 'zustand'

interface FreeLookStore {
  isFreeLook: boolean
  toggleFreeLook: () => void
  setFreeLook: (value: boolean) => void
}

export const useFreeLookStore = create<FreeLookStore>((set) => ({
  isFreeLook: false,
  toggleFreeLook: () => set((state) => ({ isFreeLook: !state.isFreeLook })),
  setFreeLook: (value) => set({ isFreeLook: value }),
}))

