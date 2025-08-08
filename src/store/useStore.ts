import { create } from 'zustand'

interface PlanetInfo {
  name: string
  nameZh: string
  radius: number
  distance: number
  orbitSpeed: number
  color: string
  physicalData?: {
    mass: string
    diameter: string
    density: string
    gravity: string
    escapeVelocity: string
    temperature: string
    atmosphere?: string
  }
}

interface StoreState {
  isPaused: boolean
  timeSpeed: number
  currentDate: Date
  selectedPlanet: PlanetInfo | null
  showOrbits: boolean
  showLabels: boolean
  
  setPaused: (paused: boolean) => void
  setTimeSpeed: (speed: number) => void
  setCurrentDate: (date: Date) => void
  setSelectedPlanet: (planet: PlanetInfo | null) => void
  toggleOrbits: () => void
  toggleLabels: () => void
}

const useStore = create<StoreState>((set) => ({
  isPaused: false,
  timeSpeed: 1,
  currentDate: new Date(),
  selectedPlanet: null,
  showOrbits: true,
  showLabels: true,
  
  setPaused: (paused) => set({ isPaused: paused }),
  setTimeSpeed: (speed) => set({ timeSpeed: speed }),
  setCurrentDate: (date) => set({ currentDate: date }),
  setSelectedPlanet: (planet) => set({ selectedPlanet: planet }),
  toggleOrbits: () => set((state) => ({ showOrbits: !state.showOrbits })),
  toggleLabels: () => set((state) => ({ showLabels: !state.showLabels }))
}))

export default useStore