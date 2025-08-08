import { Suspense, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Stars, Preload } from '@react-three/drei'
import { Leva } from 'leva'
import SceneEnhanced from './components/SceneEnhanced'
// import SceneDebug from './components/SceneDebug'
import LoadingScreen from './components/LoadingScreen'
import TimeControl from './components/TimeControl'
import InfoPanel from './components/InfoPanel'
import SearchPanel from './components/SearchPanel'
import useStore from './store/useStore'

function App() {
  const [loading, setLoading] = useState(true)
  const selectedPlanet = useStore((state) => state.selectedPlanet)

  return (
    <>
      {loading && <LoadingScreen />}
      
      <Canvas
        camera={{ position: [0, 30, 50], fov: 60 }}
        gl={{ antialias: true, alpha: false }}
        onCreated={() => setLoading(false)}
      >
        <Suspense fallback={null}>
          <SceneEnhanced />
          <Stars 
            radius={300} 
            depth={60} 
            count={5000} 
            factor={4} 
            saturation={0} 
            fade 
            speed={1}
          />
          <OrbitControls 
            enablePan={true}
            enableZoom={true}
            enableRotate={true}
            zoomSpeed={0.6}
            panSpeed={0.5}
            rotateSpeed={0.4}
            minDistance={5}
            maxDistance={300}
          />
          <Preload all />
        </Suspense>
      </Canvas>

      <SearchPanel />
      <TimeControl />
      {selectedPlanet && <InfoPanel planet={selectedPlanet} />}
      
      <Leva 
        collapsed 
        hidden={false}
        theme={{
          sizes: { rootWidth: '280px', controlWidth: '120px' },
          space: { md: '10px' },
        }}
      />
    </>
  )
}

export default App