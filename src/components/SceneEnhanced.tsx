import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useControls } from 'leva'
import Sun from './celestial/Sun'
import PlanetWithTexture from './celestial/PlanetWithTexture'
import { planetsData, scaleConfig } from '../data/planetsData'
import useStore from '../store/useStore'
import * as THREE from 'three'

const SceneEnhanced = () => {
  const { camera } = useThree()
  const timeRef = useRef(0)
  const { isPaused, timeSpeed, selectedPlanet } = useStore()
  
  // 控制面板设置
  const { showOrbits, showLabels, showTrails, planetScale } = useControls('显示选项', {
    showOrbits: { value: true, label: '显示轨道' },
    showLabels: { value: true, label: '显示标签' },
    showTrails: { value: false, label: '显示轨迹' },
    planetScale: { value: 1, min: 0.5, max: 2, step: 0.1, label: '行星大小' }
  })

  const { quality, showAllPlanets, showMoons } = useControls('性能设置', {
    quality: {
      value: 'high',
      options: {
        '低': 'low',
        '中': 'medium', 
        '高': 'high'
      },
      label: '渲染质量'
    },
    showAllPlanets: { value: true, label: '显示所有行星' },
    showMoons: { value: true, label: '显示卫星' }
  })

  const { 
    viewPreset,
    autoRotate,
    rotateSpeed 
  } = useControls('相机控制', {
    viewPreset: {
      value: 'default',
      options: {
        '默认': 'default',
        '俯视': 'top',
        '侧视': 'side',
        '内行星': 'inner',
        '外行星': 'outer',
        '全景': 'overview'
      },
      label: '预设视角'
    },
    autoRotate: { value: false, label: '自动旋转' },
    rotateSpeed: { 
      value: 0.5, 
      min: 0.1, 
      max: 2, 
      step: 0.1, 
      label: '旋转速度',
      render: (get) => get('相机控制.autoRotate')
    }
  })

  // 预设视角切换
  useEffect(() => {
    const positions: Record<string, [number, number, number]> = {
      default: [0, 30, 50],
      top: [0, 100, 0],
      side: [100, 0, 0],
      inner: [0, 20, 35],
      outer: [0, 50, 150],
      overview: [0, 80, 200]
    }
    
    if (viewPreset && positions[viewPreset]) {
      const [x, y, z] = positions[viewPreset]
      camera.position.lerp(new THREE.Vector3(x, y, z), 0.1)
      camera.lookAt(0, 0, 0)
    }
  }, [viewPreset, camera])

  // 跟随选中的行星
  useEffect(() => {
    if (selectedPlanet) {
      const planet = planetsData.find(p => p.name === selectedPlanet.name)
      if (planet) {
        const distance = scaleConfig.distanceScale[planet.id as keyof typeof scaleConfig.distanceScale]
        camera.position.lerp(new THREE.Vector3(distance + 10, 10, distance + 10), 0.1)
        camera.lookAt(0, 0, 0)
      }
    }
  }, [selectedPlanet, camera])

  // 自动旋转
  useFrame((state, delta) => {
    if (!isPaused) {
      timeRef.current += delta * timeSpeed
    }
    
    if (autoRotate) {
      const radius = camera.position.length()
      const angle = state.clock.getElapsedTime() * rotateSpeed * 0.1
      camera.position.x = Math.cos(angle) * radius
      camera.position.z = Math.sin(angle) * radius
      camera.lookAt(0, 0, 0)
    }
  })

  // 决定显示哪些行星
  const visiblePlanets = showAllPlanets 
    ? planetsData 
    : planetsData.slice(0, 4) // 只显示内行星

  return (
    <>
      {/* 环境光和太阳光 */}
      <ambientLight intensity={0.1} />
      <pointLight position={[0, 0, 0]} intensity={3} color="#FFF5E6" />
      <pointLight position={[0, 0, 0]} intensity={1} color="#FFE4B5" distance={200} decay={2} />
      
      {/* 太阳 */}
      <Sun />
      
      {/* 行星 */}
      {visiblePlanets.map(planet => {
        const scaledDistance = scaleConfig.distanceScale[planet.id as keyof typeof scaleConfig.distanceScale]
        const scaledRadius = scaleConfig.radiusScale[planet.id as keyof typeof scaleConfig.radiusScale] * planetScale
        
        // 如果不显示卫星，清空卫星数据
        const planetDataWithMoons = showMoons ? planet : { ...planet, moons: [] }
        
        return (
          <PlanetWithTexture
            key={planet.id}
            planetData={planetDataWithMoons}
            scaledDistance={scaledDistance}
            scaledRadius={scaledRadius}
            showOrbit={showOrbits}
            showLabel={showLabels}
            showTrail={showTrails}
            quality={quality as 'low' | 'medium' | 'high'}
          />
        )
      })}
      
      {/* 小行星带（装饰性） */}
      {showAllPlanets && quality !== 'low' && (
        <group>
          {Array.from({ length: 100 }).map((_, i) => {
            const angle = (i / 100) * Math.PI * 2
            const radius = 35 + Math.random() * 5
            const x = Math.cos(angle) * radius
            const z = Math.sin(angle) * radius
            const y = (Math.random() - 0.5) * 2
            
            return (
              <mesh key={`asteroid-${i}`} position={[x, y, z]}>
                <sphereGeometry args={[0.1, 8, 8]} />
                <meshStandardMaterial color="#8B7355" />
              </mesh>
            )
          })}
        </group>
      )}
    </>
  )
}

export default SceneEnhanced