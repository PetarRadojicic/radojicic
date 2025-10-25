/**
 * Camera Type Definitions
 * 
 * TypeScript types and interfaces for camera-related functionality.
 * Used throughout the 3D scene components for type safety.
 */

/**
 * Three.js Vector3 as a tuple
 * Represents 3D coordinates [x, y, z]
 */
export type Vector3Tuple = [number, number, number]

/**
 * Camera position configuration
 * Defines both where the camera is and what it's looking at
 */
export interface CameraPosition {
  /** Camera position in 3D space [x, y, z] */
  position: number[]
  
  /** Point the camera is looking at [x, y, z] */
  target: number[]
}

/**
 * Props for CameraController component
 */
export interface CameraControllerProps {
  /** Whether free-look mode is active */
  isFreeLook: boolean
  
  /** Current section index (0-based) */
  currentSection: number
  
  /** Optional callback for camera position updates (used for debug HUD) */
  onCameraUpdate?: (pos: Vector3Tuple, target: Vector3Tuple) => void
}

