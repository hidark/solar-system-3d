import { create } from 'zustand'

interface PlanetInfo {
  name: string
  nameZh: string
  radius: number
  distance: number
  orbitSpeed: number
  color: string
}

interface StoreState {
  isPaused: boolean
  timeSpeed: number
  selectedPlanet: PlanetInfo | null
  showOrbits: boolean
  showLabels: boolean
  
  setPaused: (paused: boolean) => void
  setTimeSpeed: (speed: number) => void
  setSelectedPlanet: (planet: PlanetInfo | null) => void
  toggleOrbits: () => void
  toggleLabels: () => void
}

const useStore = create<StoreState>((set) => ({
  isPaused: false,
  timeSpeed: 1,
  selectedPlanet: null,
  showOrbits: true,
  showLabels: true,
  
  setPaused: (paused) => set({ isPaused: paused }),
  setTimeSpeed: (speed) => set({ timeSpeed: speed }),
  setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
  toggleOrbits: () => set((state) => ({ showOrbits: !state.showOrbits })),
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels }))
}))

export default useStore