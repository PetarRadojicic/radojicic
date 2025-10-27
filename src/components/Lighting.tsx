/**
 * Lighting Component
 * 
 * Sets up the lighting configuration for the Three.js scene.
 * Uses multiple light types to create depth and realistic rendering.
 * 
 * Light Setup:
 * - Ambient Light: Provides overall base lighting (non-directional)
 * - Directional Lights: Simulate sunlight with shadows and specific directions
 * - Point Light: Emits light from a central point (like a light bulb)
 * - Spot Light: Focused cone of light from above with shadows
 * 
 * This combination creates a well-lit scene with proper shadows and depth.
 */

export function Lighting() {
  return (
    <>
      {/* Base ambient lighting - illuminates all objects equally */}
      <ambientLight intensity={0.6} />
      
      {/* Main directional light from top-right - casts shadows */}
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      
      {/* Fill light from top-left - softens shadows */}
      <directionalLight position={[-10, 5, -5]} intensity={0.5} />
      
      {/* Point light from center-top - adds extra illumination */}
      <pointLight position={[0, 5, 0]} intensity={0.8} />
    </>
  )
}

