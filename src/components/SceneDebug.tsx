import { useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'

const SceneDebug = () => {
  const earthRef = useRef<THREE.Group>(null)
  
  useFrame((state) => {
    if (earthRef.current) {
      const time = state.clock.getElapsedTime()
      earthRef.current.position.x = Math.cos(time * 0.5) * 10
      earthRef.current.position.z = Math.sin(time * 0.5) * 10
    }
  })

  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[0, 0, 0]} intensity={2} />
      
      {/* 太阳 */}
      <Sphere args={[2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial color="#FFD700" />
      </Sphere>
      
      {/* 地球 */}
      <group ref={earthRef}>
        <Sphere args={[0.8, 32, 32]}>
          <meshStandardMaterial color="#4A90E2" />
        </Sphere>
      </group>
      
      {/* 火星 */}
      <Sphere args={[0.5, 32, 32]} position={[15, 0, 0]}>
        <meshStandardMaterial color="#CD5C5C" />
      </Sphere>
    </>
  )
}

export default SceneDebug