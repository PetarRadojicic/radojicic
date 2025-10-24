export type Vector3Tuple = [number, number, number]

export interface CameraPosition {
  position: number[]
  target: number[]
}

export interface CameraControllerProps {
  isFreeLook: boolean
  currentSection: number
  onCameraUpdate?: (pos: Vector3Tuple, target: Vector3Tuple) => void
}

