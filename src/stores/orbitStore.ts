import { create } from 'zustand';

interface OrbitState {
  isInOrbit: boolean;
  setOrbit: (isInOrbit: boolean) => void;
  toggleOrbit: () => void;
}

export const useOrbitStore = create<OrbitState>((set) => ({
  isInOrbit: false,
  setOrbit: (isInOrbit: boolean) => set({ isInOrbit }),
  toggleOrbit: () => set((state) => ({ isInOrbit: !state.isInOrbit })),
}));
