import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
  })

  return (
    <group>
      <Sphere ref={meshRef} args={[3, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FFD700" />
      </Sphere>
      
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFF5E6" />
      
      {/* 太阳光晕效果 */}
      <Sphere args={[3.5, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.3}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}

export default Sun