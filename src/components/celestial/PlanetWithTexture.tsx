import { useRef, useMemo, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Ring, Text, MeshDistortMaterial } from '@react-three/drei'
import * as THREE from 'three'
import { PlanetData } from '../../data/planetsData'
import useStore from '../../store/useStore'
import { textureManager } from '../../utils/TextureManager'

interface PlanetWithTextureProps {
  planetData: PlanetData
  scaledDistance: number
  scaledRadius: number
  showOrbit: boolean
  showLabel: boolean
  showTrail?: boolean
  quality?: 'low' | 'medium' | 'high'
}

// 卫星组件
const MoonMesh: React.FC<{
  moon: any
  scaledRadius: number
  position: [number, number, number]
}> = ({ moon, scaledRadius, position }) => {
  const [moonTexture, setMoonTexture] = useState<THREE.Texture | null>(null)
  
  useEffect(() => {
    // 加载月球纹理
    if (moon.name === 'Moon') {
      textureManager.loadTexture('/textures/moon.jpg').then(setMoonTexture)
    }
  }, [moon])
  
  return (
    <mesh position={position}>
      <sphereGeometry args={[moon.radius * scaledRadius, 16, 16]} />
      <meshStandardMaterial 
        color={moonTexture ? '#ffffff' : '#C0C0C0'}
        map={moonTexture || undefined}
        emissive="#C0C0C0"
        emissiveIntensity={0.02}
        roughness={0.9}
        metalness={0.1}
      />
    </mesh>
  )
}

const PlanetWithTexture: React.FC<PlanetWithTextureProps> = ({
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
  const trailPositions = useRef<THREE.Vector3[]>([])
  
  const { setSelectedPlanet, selectedPlanet, timeSpeed, isPaused } = useStore()
  const isSelected = selectedPlanet?.name === planetData.name
  
  const [hovered, setHovered] = useState(false)
  const [texture, setTexture] = useState<THREE.Texture | null>(null)
  const [normalMap, setNormalMap] = useState<THREE.Texture | null>(null)
  const [specularMap, setSpecularMap] = useState<THREE.Texture | null>(null)

  // 加载纹理
  useEffect(() => {
    // 如果有真实纹理路径，加载真实纹理
    if (planetData.texture) {
      console.log(`Loading texture for ${planetData.name}: ${planetData.texture}`)
      textureManager.loadTexture(planetData.texture).then((loadedTexture) => {
        console.log(`Texture loaded for ${planetData.name}`, loadedTexture)
        setTexture(loadedTexture)
      }).catch((error) => {
        console.error(`Failed to load texture for ${planetData.name}:`, error)
        // 如果加载失败，使用程序化纹理作为后备
        createProceduralTexture()
      })
    } else {
      // 没有纹理路径，使用程序化纹理
      console.log(`No texture path for ${planetData.name}, using procedural texture`)
      createProceduralTexture()
    }
    
    // 加载法线贴图和高光贴图（地球）
    if (planetData.normalMap) {
      console.log(`Loading normal map for ${planetData.name}: ${planetData.normalMap}`)
      textureManager.loadTexture(planetData.normalMap).then(setNormalMap)
    }
    if (planetData.specularMap) {
      console.log(`Loading specular map for ${planetData.name}: ${planetData.specularMap}`)
      textureManager.loadTexture(planetData.specularMap).then(setSpecularMap)
    }
    
    function createProceduralTexture() {
      let color1 = planetData.color
      let color2 = planetData.color
      let detail = 5
      
      switch (planetData.id) {
        case 'mercury':
          color1 = '#8C8C8C'
          color2 = '#696969'
          detail = 3
          break
        case 'venus':
          color1 = '#FFC649'
          color2 = '#FFB000'
          detail = 4
          break
        case 'earth':
          color1 = '#4A90E2'
          color2 = '#2E7BC4'
          detail = 8
          break
        case 'mars':
          color1 = '#CD5C5C'
          color2 = '#8B4513'
          detail = 4
          break
        case 'jupiter':
          color1 = '#DAA520'
          color2 = '#8B7355'
          detail = 10
          break
        case 'saturn':
          color1 = '#F4E7D7'
          color2 = '#DEB887'
          detail = 8
          break
        case 'uranus':
          color1 = '#4FD0E0'
          color2 = '#40B0C0'
          detail = 3
          break
        case 'neptune':
          color1 = '#4B70DD'
          color2 = '#3A5FCD'
          detail = 4
          break
        case 'pluto':
          color1 = '#9CA4AB'
          color2 = '#7D8489'
          detail = 2
          break
      }
      
      const proceduralTexture = textureManager.createProceduralPlanetTexture(
        color1,
        color2,
        detail
      )
      setTexture(proceduralTexture)
    }
  }, [planetData])

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

  // 创建轨迹线
  const trailGeometry = useMemo(() => {
    if (!showTrail) return null
    return new THREE.BufferGeometry()
  }, [showTrail])

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
        if (showTrail) {
          trailPositions.current.push(position.clone())
          if (trailPositions.current.length > 100) {
            trailPositions.current.shift()
          }
          
          if (trailGeometry) {
            trailGeometry.setFromPoints(trailPositions.current)
          }
        }
      }
      
      // 行星自转
      if (meshRef.current) {
        const rotationSpeed = (1 / Math.abs(planetData.rotationPeriod)) * timeSpeed * 0.1
        meshRef.current.rotation.y += delta * rotationSpeed
        
        // 轴倾角
        meshRef.current.rotation.z = (planetData.axialTilt * Math.PI) / 180
      }
      
      // 卫星运动
      if (moonsRef.current && planetData.moons) {
        moonsRef.current.children.forEach((moon, index) => {
          const moonData = planetData.moons![index]
          const moonAngle = time * (1 / moonData.period) * 10
          const moonDistance = moonData.distance * 500 // 缩放卫星距离
          moon.position.x = Math.cos(moonAngle) * moonDistance
          moon.position.z = Math.sin(moonAngle) * moonDistance
          
          // 月球自转
          moon.rotation.y += delta * 0.5
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

  // 特殊效果 - 地球大气层
  const renderAtmosphere = () => {
    if (planetData.id !== 'earth' && planetData.id !== 'venus') return null
    
    return (
      <Sphere args={[scaledRadius * 1.02, 32, 32]}>
        <meshPhongMaterial
          color={planetData.id === 'earth' ? '#4A90E2' : '#FFC649'}
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
    )
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

      {/* 轨迹线 */}
      {showTrail && trailGeometry && trailPositions.current.length > 1 && (
        <line>
          <bufferGeometry attach="geometry" {...trailGeometry} />
          <lineBasicMaterial
            attach="material"
            color={planetData.color}
            opacity={0.5}
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
            map={texture || undefined}
            normalMap={normalMap || undefined}
            metalnessMap={specularMap || undefined}
            emissive={planetData.color}
            emissiveIntensity={
              planetData.id === 'sun' ? 1 :
              isSelected ? 0.08 : 
              hovered ? 0.05 : 0.02
            }
            roughness={
              planetData.id === 'earth' ? 0.7 :
              planetData.id === 'mars' ? 0.9 :
              planetData.id === 'jupiter' ? 0.6 :
              0.8
            }
            metalness={
              planetData.id === 'earth' ? 0.1 :
              planetData.id === 'jupiter' ? 0.2 :
              0.05
            }
          />
        </Sphere>

        {/* 大气层效果 */}
        {renderAtmosphere()}

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
              64,
              32
            ]}
            rotation={[Math.PI / 2 - (planetData.axialTilt * Math.PI) / 180, 0, 0]}
          >
            <meshStandardMaterial
              color={planetData.id === 'saturn' ? '#F4E7D7' : '#4FD0E0'}
              opacity={0.8}
              transparent
              side={THREE.DoubleSide}
              roughness={0.5}
              metalness={0.1}
            />
          </Ring>
        )}

        {/* 卫星 */}
        {planetData.moons && planetData.moons.length > 0 && (
          <group ref={moonsRef}>
            {planetData.moons.map((moon, index) => (
              <MoonMesh
                key={moon.name}
                moon={moon}
                scaledRadius={scaledRadius}
                position={[moon.distance * 500, 0, 0]}
              />
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
          >
            {planetData.nameZh}
            {isSelected && `\n${planetData.name}`}
          </Text>
        )}
      </group>
    </>
  )
}

export default PlanetWithTexture