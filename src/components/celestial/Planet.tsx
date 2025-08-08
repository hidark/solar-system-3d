import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere, Ring, Text } from '@react-three/drei'
import * as THREE from 'three'
import useStore from '../../store/useStore'

interface PlanetProps {
  name: string
  nameZh: string
  radius: number
  distance: number
  orbitSpeed: number
  rotationSpeed: number
  color: string
  time: React.MutableRefObject<number>
  showOrbit: boolean
  showLabel: boolean
  hasMoon?: boolean
}

const Planet: React.FC<PlanetProps> = ({
  name,
  nameZh,
  radius,
  distance,
  orbitSpeed,
  rotationSpeed,
  color,
  time,
  showOrbit,
  showLabel,
  hasMoon = false
}) => {
  const meshRef = useRef<THREE.Mesh>(null)
  const groupRef = useRef<THREE.Group>(null)
  const moonRef = useRef<THREE.Mesh>(null)
  
  const { setSelectedPlanet, selectedPlanet } = useStore()
  const isSelected = selectedPlanet?.name === name

  // 创建轨道线
  const orbitPoints = useMemo(() => {
    const points = []
    for (let i = 0; i <= 64; i++) {
      const angle = (i / 64) * Math.PI * 2
      points.push(new THREE.Vector3(
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance
      ))
    }
    return points
  }, [distance])

  const orbitGeometry = useMemo(() => {
    return new THREE.BufferGeometry().setFromPoints(orbitPoints)
  }, [orbitPoints])

  useFrame((state) => {
    if (groupRef.current) {
      // 行星公转
      const angle = time.current * orbitSpeed * 0.1
      groupRef.current.position.x = Math.cos(angle) * distance
      groupRef.current.position.z = Math.sin(angle) * distance
    }

    if (meshRef.current) {
      // 行星自转
      meshRef.current.rotation.y += rotationSpeed * 0.01
    }

    if (moonRef.current && hasMoon) {
      // 月球公转
      const moonAngle = time.current * 2
      moonRef.current.position.x = Math.cos(moonAngle) * 2
      moonRef.current.position.z = Math.sin(moonAngle) * 2
    }
  })

  const handleClick = () => {
    setSelectedPlanet({
      name,
      nameZh,
      radius,
      distance,
      orbitSpeed,
      color
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
            color="#ffffff"
            opacity={0.2}
            transparent
          />
        </line>
      )}

      <group ref={groupRef}>
        {/* 行星 */}
        <Sphere
          ref={meshRef}
          args={[radius, 32, 32]}
          onClick={handleClick}
          onPointerOver={() => document.body.style.cursor = 'pointer'}
          onPointerOut={() => document.body.style.cursor = 'default'}
        >
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={isSelected ? 0.3 : 0.1}
          />
        </Sphere>

        {/* 选中高亮环 */}
        {isSelected && (
          <Ring args={[radius * 1.5, radius * 1.8, 32]}>
            <meshBasicMaterial color="#4A90E2" side={THREE.DoubleSide} opacity={0.5} transparent />
          </Ring>
        )}

        {/* 月球 */}
        {hasMoon && (
          <Sphere ref={moonRef} args={[0.2, 16, 16]}>
            <meshStandardMaterial color="#C0C0C0" />
          </Sphere>
        )}

        {/* 标签 */}
        {showLabel && (
          <Text
            position={[0, radius + 1, 0]}
            fontSize={0.5}
            color="white"
            anchorX="center"
            anchorY="middle"
          >
            {nameZh}
          </Text>
        )}
      </group>
    </>
  )
}

export default Planet