import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { folder, useControls } from 'leva'
import Sun from './celestial/Sun'
import Planet from './celestial/Planet'
import useStore from '../store/useStore'

const Scene = () => {
  const timeRef = useRef(0)
  const { isPaused, timeSpeed } = useStore()
  
  const { showOrbits, showLabels } = useControls('显示选项', {
    showOrbits: { value: true, label: '显示轨道' },
    showLabels: { value: true, label: '显示标签' }
  })

  const { quality } = useControls('画质设置', {
    quality: {
      value: 'high',
      options: {
        '低': 'low',
        '中': 'medium', 
        '高': 'high'
      },
      label: '渲染质量'
    }
  })

  useFrame((state, delta) => {
    if (!isPaused) {
      timeRef.current += delta * timeSpeed
    }
  })

  return (
    <>
      <ambientLight intensity={0.03} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      
      <Sun />
      
      <Planet
        name="Mercury"
        nameZh="水星"
        radius={0.3}
        distance={8}
        orbitSpeed={4.15}
        rotationSpeed={0.01}
        color="#8C8C8C"
        time={timeRef}
        showOrbit={showOrbits}
        showLabel={showLabels}
      />
      
      <Planet
        name="Venus"
        nameZh="金星"
        radius={0.7}
        distance={12}
        orbitSpeed={1.62}
        rotationSpeed={0.005}
        color="#FFC649"
        time={timeRef}
        showOrbit={showOrbits}
        showLabel={showLabels}
      />
      
      <Planet
        name="Earth"
        nameZh="地球"
        radius={0.8}
        distance={16}
        orbitSpeed={1}
        rotationSpeed={1}
        color="#4A90E2"
        time={timeRef}
        showOrbit={showOrbits}
        showLabel={showLabels}
        hasMoon
      />
      
      <Planet
        name="Mars"
        nameZh="火星"
        radius={0.4}
        distance={20}
        orbitSpeed={0.53}
        rotationSpeed={0.97}
        color="#CD5C5C"
        time={timeRef}
        showOrbit={showOrbits}
        showLabel={showLabels}
      />
    </>
  )
}

export default Scene