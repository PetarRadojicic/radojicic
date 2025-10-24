import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { cameraPositions, SCENE_CONFIG } from '../config/scene'
import type { CameraControllerProps, Vector3Tuple } from '../types/camera'

export function CameraController({ isFreeLook, currentSection, onCameraUpdate }: CameraControllerProps) {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  const isTransitioning = useRef(false)
  const wasFreeLook = useRef(false)

  useEffect(() => {
    const initialPos = cameraPositions[0]
    camera.position.set(...initialPos.position as Vector3Tuple)
    camera.lookAt(...initialPos.target as Vector3Tuple)
    targetLookAt.current.set(...initialPos.target as Vector3Tuple)
  }, [camera])

  useEffect(() => {
    if (wasFreeLook.current && !isFreeLook) {
      const pos = cameraPositions[currentSection]
      targetPosition.current.set(...pos.position as Vector3Tuple)
      targetLookAt.current.set(...pos.target as Vector3Tuple)
      isTransitioning.current = true
    }
    wasFreeLook.current = isFreeLook
  }, [isFreeLook, currentSection])

  useEffect(() => {
    const handleSectionChange = (e: CustomEvent) => {
      const section = e.detail
      
      if (!isFreeLook && section < cameraPositions.length) {
        const pos = cameraPositions[section]
        targetPosition.current.set(...pos.position as Vector3Tuple)
        targetLookAt.current.set(...pos.target as Vector3Tuple)
        isTransitioning.current = true
      }
    }
    
    window.addEventListener('sectionChange' as any, handleSectionChange)
    return () => window.removeEventListener('sectionChange' as any, handleSectionChange)
  }, [isFreeLook])

  useFrame(() => {
    if (isFreeLook) {
      isTransitioning.current = false
      
      if (onCameraUpdate && controlsRef.current) {
        const pos = camera.position
        const target = controlsRef.current.target
        onCameraUpdate(
          [Math.round(pos.x * 10) / 10, Math.round(pos.y * 10) / 10, Math.round(pos.z * 10) / 10],
          [Math.round(target.x * 10) / 10, Math.round(target.y * 10) / 10, Math.round(target.z * 10) / 10]
        )
      }
      return
    }

    if (isTransitioning.current) {
      camera.position.lerp(targetPosition.current, 0.05)
      
      const currentLookAt = new THREE.Vector3()
      camera.getWorldDirection(currentLookAt)
      currentLookAt.multiplyScalar(10).add(camera.position)
      currentLookAt.lerp(targetLookAt.current, 0.05)
      camera.lookAt(currentLookAt)

      if (camera.position.distanceTo(targetPosition.current) < 0.01) {
        isTransitioning.current = false
      }
    }
  })

  return isFreeLook ? (
    <OrbitControls 
      ref={controlsRef} 
      enableDamping 
      dampingFactor={0.05}
      minDistance={SCENE_CONFIG.minZoom}
      maxDistance={SCENE_CONFIG.maxZoom}
      maxPolarAngle={Math.PI / 1.5}
      minPolarAngle={Math.PI / 6}
    />
  ) : null
}

