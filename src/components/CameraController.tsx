/**
 * CameraController Component
 * 
 * Manages camera behavior for both automated and free-look modes.
 * Handles smooth transitions between section-based camera positions
 * and user-controlled orbit camera.
 * 
 * Features:
 * - Smooth camera transitions between sections using lerp interpolation
 * - Orbit controls for free-look mode (pan, zoom, rotate)
 * - Configurable camera constraints (min/max zoom, polar angles)
 * - Custom event handling for section changes
 * 
 * Camera Modes:
 * 1. Automated Mode: Camera transitions smoothly between predefined positions
 * 2. Free-Look Mode: User controls camera with mouse/touch (OrbitControls)
 */

import { useRef, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import * as THREE from 'three'
import { cameraPositions, SCENE_CONFIG } from '../config/scene'
import type { CameraControllerProps, Vector3Tuple } from '../types/camera'

export function CameraController({ isFreeLook, currentSection }: CameraControllerProps) {
  const { camera } = useThree()
  
  // Reference to OrbitControls component (used in free-look mode)
  const controlsRef = useRef<any>(null)
  
  // Target positions for smooth camera transitions
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  
  // Transition state management
  const isTransitioning = useRef(false)
  const wasFreeLook = useRef(false)

  /**
   * Initialize camera position on mount
   * Sets camera to first section's position
   */
  useEffect(() => {
    const initialPos = cameraPositions[0]
    camera.position.set(...initialPos.position as Vector3Tuple)
    camera.lookAt(...initialPos.target as Vector3Tuple)
    targetLookAt.current.set(...initialPos.target as Vector3Tuple)
  }, [camera])

  /**
   * Handle transitions when exiting free-look mode
   * Smoothly returns camera to current section's position
   */
  useEffect(() => {
    if (wasFreeLook.current && !isFreeLook) {
      const pos = cameraPositions[currentSection]
      targetPosition.current.set(...pos.position as Vector3Tuple)
      targetLookAt.current.set(...pos.target as Vector3Tuple)
      isTransitioning.current = true
    }
    wasFreeLook.current = isFreeLook
  }, [isFreeLook, currentSection])

  /**
   * Listen for section change events and trigger camera transitions
   * Only processes events when not in free-look mode
   */
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

  /**
   * Animation loop - runs every frame
   * Handles camera transitions
   */
  useFrame(() => {
    // In free-look mode: skip transitions
    if (isFreeLook) {
      isTransitioning.current = false
      return
    }

    // Smooth camera transition to target position and look-at point
    if (isTransitioning.current) {
      // Lerp (linear interpolate) camera position for smooth movement
      camera.position.lerp(targetPosition.current, 0.05)
      
      // Calculate and lerp the look-at direction
      const currentLookAt = new THREE.Vector3()
      camera.getWorldDirection(currentLookAt)
      currentLookAt.multiplyScalar(10).add(camera.position)
      currentLookAt.lerp(targetLookAt.current, 0.05)
      camera.lookAt(currentLookAt)

      // Stop transition when close enough to target
      if (camera.position.distanceTo(targetPosition.current) < 0.01) {
        isTransitioning.current = false
      }
    }
  })

  // Render OrbitControls only in free-look mode
  return isFreeLook ? (
    <OrbitControls 
      ref={controlsRef} 
      enableDamping // Smooth camera movement
      dampingFactor={0.05} // How much to smooth the movement
      minDistance={SCENE_CONFIG.minZoom} // Closest zoom level
      maxDistance={SCENE_CONFIG.maxZoom} // Farthest zoom level
      maxPolarAngle={Math.PI / 1.5} // Prevent camera from going below scene
      minPolarAngle={Math.PI / 6} // Prevent camera from going too high
    />
  ) : null
}

