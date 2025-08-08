import { useRef, useState, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import { Sphere } from '@react-three/drei'
import * as THREE from 'three'
import { textureManager } from '../../utils/TextureManager'

const Sun = () => {
  const meshRef = useRef<THREE.Mesh>(null)
  const glowRef = useRef<THREE.Mesh>(null)
  const [sunTexture, setSunTexture] = useState<THREE.Texture | null>(null)
  
  useEffect(() => {
    textureManager.loadTexture('/textures/sun.jpg').then(setSunTexture)
  }, [])
  
  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05
    }
    if (glowRef.current) {
      // Pulsing glow effect
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05
      glowRef.current.scale.setScalar(scale)
    }
  })

  return (
    <group>
      <Sphere ref={meshRef} args={[3, 64, 64]} position={[0, 0, 0]}>
        <meshBasicMaterial 
          color="#FFA500"
          map={sunTexture || undefined}
        />
      </Sphere>
      
      {/* Multiple light sources for better illumination */}
      <pointLight position={[0, 0, 0]} intensity={2} color="#FFF5E6" />
      
      {/* Inner glow */}
      <Sphere args={[3.2, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FFD700"
          transparent
          opacity={0.6}
          side={THREE.BackSide}
        />
      </Sphere>
      
      {/* Outer glow with pulsing effect */}
      <Sphere ref={glowRef} args={[4, 32, 32]} position={[0, 0, 0]}>
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  )
}

export default Sun