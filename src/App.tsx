import { Canvas } from '@react-three/fiber'
import { useRef, useState } from 'react'
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
import { useScrollControl } from './hooks/useScrollControl'
import { useFreeLookStore } from './store/useFreeLookStore'
import './App.css'

function App() {
  const isFreeLook = useFreeLookStore((state) => state.isFreeLook)
  const [currentSection, setCurrentSection] = useState(0)
  const [debugCameraPos, setDebugCameraPos] = useState<Vector3Tuple>([0, 0, 0])
  const [debugCameraTarget, setDebugCameraTarget] = useState<Vector3Tuple>([0, 0, 0])
  const scrollContainerRef = useRef<HTMLDivElement | null>(null)

  const handleCameraUpdate = (pos: Vector3Tuple, target: Vector3Tuple) => {
    setDebugCameraPos(pos)
    setDebugCameraTarget(target)
  }

  const copyToClipboard = () => {
    const text = `{ position: [${debugCameraPos.join(', ')}], target: [${debugCameraTarget.join(', ')}] }`
    navigator.clipboard.writeText(text)
  }

  useScrollControl({
    scrollContainerRef,
    isFreeLook,
    onSectionChange: setCurrentSection,
  })

  return (
    <>
      <SEO />
      <div className="relative w-full h-screen overflow-hidden">
        <div className="fixed inset-0 z-0" style={{ pointerEvents: isFreeLook ? 'auto' : 'none' }}>
          <Canvas
          camera={{ position: cameraPositions[0].position as Vector3Tuple, fov: 50 }}
          shadows
          gl={{ alpha: true, antialias: true }}
        >
          <color attach="background" args={['#099996']} />
          <Lighting />
          <Scene isFreeLook={isFreeLook} currentSection={currentSection} />
          <CameraController 
            isFreeLook={isFreeLook} 
            currentSection={currentSection} 
            onCameraUpdate={handleCameraUpdate} 
          />
        </Canvas>
      </div>

      <div
        ref={scrollContainerRef}
        className="relative z-10 h-screen overflow-y-scroll snap-y snap-mandatory"
        style={{ 
          scrollBehavior: 'smooth',
          opacity: isFreeLook ? 0 : 1,
          transition: 'opacity 0.5s ease-in-out'
        }}
      >
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

      <ScrollIndicator isVisible={!isFreeLook} />
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
