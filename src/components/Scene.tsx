import { useGLTF } from '@react-three/drei'
import { useRef, useEffect } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import { SCENE_CONFIG } from '../config/scene'

interface SceneProps {
  isFreeLook: boolean
  currentSection: number
}

export function Scene({ isFreeLook, currentSection }: SceneProps) {
  const { scene } = useGLTF('/models/Scene.glb')
  const meshRef = useRef<THREE.Group>(null)

  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = 0
    }
  }, [currentSection])

  useFrame((_, delta) => {
    if (meshRef.current && currentSection === 0 && !isFreeLook) {
      meshRef.current.rotation.y += delta * 0.1
    }
  })

  return (
    <group ref={meshRef} scale={SCENE_CONFIG.modelScale}>
      <primitive object={scene} />
    </group>
  )
}

