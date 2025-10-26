/**
 * Main Application Component
 * 
 * This is the root component that orchestrates the entire 3D portfolio experience.
 * It combines a Three.js 3D scene with scrollable HTML content sections.
 * 
 * Key Features:
 * - 3D scene that responds to scroll position with camera transitions
 * - Free-look mode allowing users to explore the 3D scene manually
 * - Section-based layout (Hero, About, Projects, Experience, Footer)
 * - Smooth camera animations between sections
 * - Debug tools for camera positioning (visible in free-look mode)
 */

import { Canvas } from '@react-three/fiber'
import { Suspense, useRef, useState } from 'react'
import { cameraPositions } from './config/scene'
import type { Vector3Tuple } from './types/camera'
import { sections } from './data/sections'
import { Scene } from './components/Scene'
import { CameraController } from './components/CameraController'
import { Lighting } from './components/Lighting'
import { ScrollIndicator } from './components/ScrollIndicator'
import { FreeLookHUD } from './components/FreeLookHUD'
import { ContentSection } from './components/ContentSection'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { SEO } from './components/SEO'
import { LoadingScreen } from './components/LoadingScreen'
import { useScrollControl } from './hooks/useScrollControl'
import { useFreeLookStore } from './store/useFreeLookStore'
import './App.css'

function App() {
  // Get free-look mode state from Zustand store
  const isFreeLook = useFreeLookStore((state) => state.isFreeLook)
  
  // Track if the experience has started (after loading completes)
  const [started, setStarted] = useState(false)
  
  // Track current section for camera positioning
  const [currentSection, setCurrentSection] = useState(0)
  
  // Debug state for displaying camera position and target in free-look mode
  const [debugCameraPos, setDebugCameraPos] = useState<Vector3Tuple>([0, 0, 0])
  const [debugCameraTarget, setDebugCameraTarget] = useState<Vector3Tuple>([0, 0, 0])
  
  // Reference to the scrollable content container
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  /**
   * Callback for camera position updates (used for debug display)
   */
  const handleCameraUpdate = (pos: Vector3Tuple, target: Vector3Tuple) => {
    setDebugCameraPos(pos)
    setDebugCameraTarget(target)
  }

  /**
   * Copy current camera position and target to clipboard
   * Useful for developers to capture camera positions for configuration
   */
  const copyToClipboard = () => {
    const text = `{ position: [${debugCameraPos.join(', ')}], target: [${debugCameraTarget.join(', ')}] }`
    navigator.clipboard.writeText(text)
  }

  // Set up scroll control to sync camera with section changes
  useScrollControl({
    scrollContainerRef,
    isFreeLook,
    onSectionChange: setCurrentSection,
  })

  return (
    <>
      {/* SEO meta tags and structured data */}
      <SEO />
      
      {/* Loading Screen */}
      <LoadingScreen started={started} onStarted={() => setStarted(true)} />
      
      <div className="relative w-full h-screen overflow-hidden">
        {/* 
          Three.js Canvas Layer (background)
          - Fixed position behind content
          - Pointer events enabled only in free-look mode
        */}
        <div className="fixed inset-0 z-0" style={{ pointerEvents: isFreeLook ? 'auto' : 'none' }}>
          <Canvas
          camera={{ position: cameraPositions[0].position as Vector3Tuple, fov: 50 }}
          shadows
          gl={{ alpha: true, antialias: true }}
        >
          {/* Background color for the 3D scene */}
          <color attach="background" args={['#099996']} />
          
          <Suspense fallback={null}>
            {/* Scene lighting setup */}
            <Lighting />
            
            {/* 3D model/scene */}
            <Scene isFreeLook={isFreeLook} currentSection={currentSection} />
            
            {/* Camera animation controller */}
            <CameraController 
              isFreeLook={isFreeLook} 
              currentSection={currentSection} 
              onCameraUpdate={handleCameraUpdate} 
            />
          </Suspense>
        </Canvas>
      </div>

      {/* 
        Scrollable Content Layer (foreground)
        - Contains all HTML content sections
        - Fades out when entering free-look mode
        - Scroll is disabled in free-look mode
      */}
      <div
        ref={scrollContainerRef}
        className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory"
        style={{ 
          scrollBehavior: 'smooth',
          opacity: isFreeLook ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
        {/* Render appropriate component for each section */}
        {sections.map((section, index) => {
          if (index === 0) {
            return <Hero key={section.id} />
          } else if (section.id === 'about') {
            return <About key={section.id} />
          } else if (section.id === 'projects') {
            return <Projects key={section.id} />
          } else if (section.id === 'experience') {
            return <Experience key={section.id} />
          } else if (section.id === 'footer') {
            return <Footer key={section.id} />
          } else {
            return <ContentSection key={section.id} section={section} />
          }
        })}
      </div>

      {/* Scroll indicator (visible in normal mode) */}
      <ScrollIndicator isVisible={!isFreeLook} />
      
      {/* Free-look mode HUD with controls and debug info */}
      <FreeLookHUD 
        isVisible={isFreeLook}
        cameraPos={debugCameraPos}
        cameraTarget={debugCameraTarget}
        onCopy={copyToClipboard}
      />
      </div>
    </>
  )
}

export default App
