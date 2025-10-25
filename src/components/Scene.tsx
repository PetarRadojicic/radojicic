/**
 * Scene Component
 * 
 * Loads and renders the 3D model in the Three.js scene.
 * Handles model animations and transformations.
 * 
 * Features:
 * - Loads GLTF 3D model from file
 * - Auto-rotation on the hero section (when not in free-look mode)
 * - Resets rotation when section changes
 * - Scales model based on configuration
 * 
 * @param isFreeLook - Whether free-look mode is active (disables auto-rotation)
 * @param currentSection - Current section index (affects rotation behavior)
 */

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
  // Load the 3D model from GLTF file
  const { scene } = useGLTF('/models/Scene.glb')
  
  // Reference to the model group for animations
  const meshRef = useRef<THREE.Group>(null)

  /**
   * Reset model rotation when section changes
   */
  useEffect(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y = 0
    }
  }, [currentSection])

  /**
   * Animation loop - rotates model on hero section
   * Only runs on section 0 (hero) and when not in free-look mode
   */
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

