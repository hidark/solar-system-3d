import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame, useLoader } from '@react-three/fiber'
import { Sphere, Ring, Text, Trail } from '@react-three/drei'
import * as THREE from 'three'
import { PlanetData } from '../../data/planetsData'
import useStore from '../../store/useStore'

interface PlanetEnhancedProps {
  planetData: PlanetData
  scaledDistance: number
  scaledRadius: number
  showOrbit: boolean
  showLabel: boolean
  showTrail?: boolean
  quality?: 'low' | 'medium' | 'high'
}

const PlanetEnhanced: React.FC<PlanetEnhancedProps> = ({
  planetData,
  scaledDistance,
  scaledRadius,
  showOrbit,
  showLabel,
  showTrail = false,
  quality = 'high'
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const moonsRef = useRef<THREE.Group>(null)
  const trailRef = useRef<THREE.Vector3[]>([])
  
  const { setSelectedPlanet, selectedPlanet, timeSpeed, isPaused } = useStore()
  const isSelected = selectedPlanet?.name === planetData.name
  
  const [hovered, setHovered] = useState(false)
  const [textureLoaded, setTextureLoaded] = useState(false)

  // 计算椭圆轨道
  const calculateEllipticalPosition = (time: number) => {
    const period = planetData.orbitalPeriod
    const a = scaledDistance // 半长轴
    const e = planetData.eccentricity // 离心率
    const b = a * Math.sqrt(1 - e * e) // 半短轴
    
    // 平均角速度
    const n = (2 * Math.PI) / period
    const M = n * time // 平近点角
    
    // 用牛顿迭代法求解开普勒方程 E - e*sin(E) = M
    let E = M
    for (let i = 0; i < 5; i++) {
      E = M + e * Math.sin(E)
    }
    
    // 真近点角
    const v = 2 * Math.atan2(
      Math.sqrt(1 + e) * Math.sin(E / 2),
      Math.sqrt(1 - e) * Math.cos(E / 2)
    )
    
    // 极坐标到直角坐标
    const r = a * (1 - e * Math.cos(E))
    const x = r * Math.cos(v)
    const z = r * Math.sin(v)
    
    // 考虑轨道倾角
    const i = (planetData.inclination * Math.PI) / 180
    const y = z * Math.sin(i)
    const z2 = z * Math.cos(i)
    
    return new THREE.Vector3(x, y, z2)
  }

  // 创建椭圆轨道线
  const orbitPoints = useMemo(() => {
    const points = []
    const segments = quality === 'high' ? 128 : quality === 'medium' ? 64 : 32
    
    for (let i = 0; i <= segments; i++) {
      const time = (i / segments) * planetData.orbitalPeriod
      const pos = calculateEllipticalPosition(time)
      points.push(pos)
    }
    return points
  }, [planetData, scaledDistance, quality])

  const orbitGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(orbitPoints)
  }, [orbitPoints])

  // 获取细节级别
  const getDetailLevel = () => {
    if (quality === 'low') return [16, 16]
    if (quality === 'medium') return [32, 32]
    return [64, 64]
  }

  const [widthSegments, heightSegments] = getDetailLevel()

  // 动画更新
  useFrame((state, delta) => {
    if (!isPaused) {
      const time = state.clock.getElapsedTime() * timeSpeed * 0.1
      
      // 更新行星位置（椭圆轨道）
      if (groupRef.current) {
        const position = calculateEllipticalPosition(time)
        groupRef.current.position.copy(position)
        
        // 更新轨迹
        if (showTrail && trailRef.current.length < 100) {
          trailRef.current.push(position.clone())
        }
      }
      
      // 行星自转
      if (meshRef.current) {
        const rotationSpeed = (1 / Math.abs(planetData.rotationPeriod)) * timeSpeed * 0.1
        meshRef.current.rotation.y += delta * rotationSpeed
      }
      
      // 卫星运动
      if (moonsRef.current && planetData.moons) {
        moonsRef.current.children.forEach((moon, index) => {
          const moonData = planetData.moons![index]
          const moonAngle = time * (1 / moonData.period) * 10
          const moonDistance = moonData.distance * 500 // 缩放卫星距离
          moon.position.x = Math.cos(moonAngle) * moonDistance
          moon.position.z = Math.sin(moonAngle) * moonDistance
        })
      }
    }
  })

  const handleClick = () => {
    setSelectedPlanet({
      name: planetData.name,
      nameZh: planetData.nameZh,
      radius: planetData.radius,
      distance: planetData.distance,
      orbitSpeed: 1 / planetData.orbitalPeriod,
      color: planetData.color,
      physicalData: planetData.physicalData
    })
  }

  return (
    <>
      {/* 轨道线 */}
      {showOrbit && (
        <line>
          <bufferGeometry attach="geometry" {...orbitGeometry} />
          <lineBasicMaterial
            attach="material"
            color={isSelected ? '#4A90E2' : '#ffffff'}
            opacity={isSelected ? 0.5 : 0.2}
            transparent
          />
        </line>
      )}

      <group ref={groupRef}>
        {/* 行星本体 */}
        <Sphere
          ref={meshRef}
          args={[scaledRadius, widthSegments, heightSegments]}
          onClick={handleClick}
          onPointerOver={() => {
            setHovered(true)
            document.body.style.cursor = 'pointer'
          }}
          onPointerOut={() => {
            setHovered(false)
            document.body.style.cursor = 'default'
          }}
        >
          <meshStandardMaterial
            color={planetData.color}
            emissive={planetData.color}
            emissiveIntensity={isSelected ? 0.3 : hovered ? 0.2 : 0.05}
            roughness={0.8}
            metalness={0.2}
          />
        </Sphere>

        {/* 选中/悬停高亮环 */}
        {(isSelected || hovered) && (
          <Ring 
            args={[scaledRadius * 1.3, scaledRadius * 1.5, 32]}
            rotation={[Math.PI / 2, 0, 0]}
          >
            <meshBasicMaterial 
              color={isSelected ? '#4A90E2' : '#ffffff'} 
              side={THREE.DoubleSide} 
              opacity={isSelected ? 0.5 : 0.3} 
              transparent 
            />
          </Ring>
        )}

        {/* 行星环（土星、天王星） */}
        {planetData.hasRings && planetData.ringData && (
          <Ring
            args={[
              scaledRadius * planetData.ringData.innerRadius,
              scaledRadius * planetData.ringData.outerRadius,
              64
            ]}
            rotation={[Math.PI / 2 - (planetData.axialTilt * Math.PI) / 180, 0, 0]}
          >
            <meshStandardMaterial
              color={planetData.color}
              opacity={0.7}
              transparent
              side={THREE.DoubleSide}
              roughness={0.5}
            />
          </Ring>
        )}

        {/* 卫星 */}
        {planetData.moons && planetData.moons.length > 0 && (
          <group ref={moonsRef}>
            {planetData.moons.map((moon, index) => (
              <Sphere
                key={moon.name}
                args={[moon.radius * scaledRadius, 16, 16]}
                position={[moon.distance * 500, 0, 0]}
              >
                <meshStandardMaterial 
                  color="#C0C0C0"
                  emissive="#C0C0C0"
                  emissiveIntensity={0.05}
                />
              </Sphere>
            ))}
          </group>
        )}

        {/* 标签 */}
        {showLabel && (
          <Text
            position={[0, scaledRadius + 1, 0]}
            fontSize={0.8}
            color="white"
            anchorX="center"
            anchorY="middle"
            font="/fonts/inter-v12-latin-regular.woff"
          >
            {planetData.nameZh}
            {isSelected && `\n${planetData.name}`}
          </Text>
        )}

        {/* 轨迹 */}
        {showTrail && (
          <Trail
            width={1}
            length={20}
            color={planetData.color}
            attenuation={(width) => width}
          />
        )}
      </group>
    </>
  )
}

export default PlanetEnhanced