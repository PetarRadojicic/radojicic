/**
 * Scene Configuration
 * 
 * Contains all configuration values for the 3D scene, including
 * camera constraints and predefined camera positions for each section.
 * 
 * These values control:
 * - 3D model scale
 * - Camera zoom limits in free-look mode
 * - Automated camera positions for each portfolio section
 */

/**
 * General scene configuration
 */
export const SCENE_CONFIG = {
  /** Scale factor for the 3D model (0.5 = 50% of original size) */
  modelScale: 0.5,
  
  /** Minimum camera distance in free-look mode (prevents zooming too close) */
  minZoom: 5,
  
  /** Maximum camera distance in free-look mode (prevents zooming too far) */
  maxZoom: 50,
}

/**
 * Predefined camera positions for each section
 * 
 * Each position defines where the camera should be and what it should look at
 * when the user scrolls to that section.
 * 
 * Array indices correspond to section numbers:
 * - 0: Hero section
 * - 1: About section
 * - 2: Projects section
 * - 3: Experience section
 * - 4: Footer section
 * 
 * Position format: [x, y, z]
 * Target format: [x, y, z] (point the camera looks at)
 */
export const cameraPositions = [
  { position: [75, 50, 15], target: [0, 0, 0]}, // Hero - wide angle view
  { position: [2.4, 7, -8.3], target: [-3, 7.1, -5.5] }, // About - close-up
  { position: [8.8, 4.7, -27], target: [0.4, -2.9, -0.9] }, // Projects - angled view
  { position: [22.3, 5.2, 32.3], target: [0.5, -1.8, 8.3] }, // Experience - side view
  { position: [49.5, 2.1, -6.4], target: [0, 0, 0] }, // Footer - distant view
] as const

