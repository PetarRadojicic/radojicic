import { Canvas } from '@react-three/fiber'
import { OrbitControls, useGLTF } from '@react-three/drei'
import { useRef, useState, useEffect } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import './App.css'

const SCENE_CONFIG = {
  modelScale: 0.5,
  fogNear: 50,
  fogFar: 150,
  minZoom: 5,
  maxZoom: 50,
}

const cameraPositions = [
  { position: [0, 5, 15], target: [0, 0, 0] },
  { position: [8, 4, 6], target: [0, 0, 0] },
  { position: [-8, 5, 4], target: [0, 0, 0] },
  { position: [0, 10, 8], target: [0, 0, 0] },
  { position: [6, 3, -6], target: [0, 0, 0] },
]

function Scene({ isFreeLook, currentSection }: { isFreeLook: boolean; currentSection: number }) {
  const { scene } = useGLTF('/models/Scene.glb')
  const meshRef = useRef<THREE.Group>(null)

  useFrame((_, delta) => {
    if (meshRef.current && currentSection === 0 && !isFreeLook) {
      meshRef.current.rotation.y += delta * 0.3
    }
  })

  return (
    <group ref={meshRef} scale={SCENE_CONFIG.modelScale}>
      <primitive object={scene} />
    </group>
  )
}

function CameraController({ isFreeLook, currentSection }: { isFreeLook: boolean; currentSection: number }) {
  const { camera } = useThree()
  const controlsRef = useRef<any>(null)
  const targetPosition = useRef(new THREE.Vector3())
  const targetLookAt = useRef(new THREE.Vector3())
  const isTransitioning = useRef(false)
  const wasFreeLook = useRef(false)

  useEffect(() => {
    const initialPos = cameraPositions[0]
    camera.position.set(...initialPos.position as [number, number, number])
    camera.lookAt(...initialPos.target as [number, number, number])
    targetLookAt.current.set(...initialPos.target as [number, number, number])
  }, [camera])

  useEffect(() => {
    if (wasFreeLook.current && !isFreeLook) {
      const pos = cameraPositions[currentSection]
      targetPosition.current.set(...pos.position as [number, number, number])
      targetLookAt.current.set(...pos.target as [number, number, number])
      isTransitioning.current = true
    }
    wasFreeLook.current = isFreeLook
  }, [isFreeLook, currentSection])

  useEffect(() => {
    const handleSectionChange = (e: CustomEvent) => {
      const section = e.detail
      
      if (!isFreeLook && section < cameraPositions.length) {
        const pos = cameraPositions[section]
        targetPosition.current.set(...pos.position as [number, number, number])
        targetLookAt.current.set(...pos.target as [number, number, number])
        isTransitioning.current = true
      }
    }
    
    window.addEventListener('sectionChange' as any, handleSectionChange)
    return () => window.removeEventListener('sectionChange' as any, handleSectionChange)
  }, [isFreeLook])

  useFrame(() => {
    if (isFreeLook) {
      isTransitioning.current = false
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

function Lighting() {
  return (
    <>
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.2} castShadow />
      <directionalLight position={[-10, 5, -5]} intensity={0.5} />
      <pointLight position={[0, 5, 0]} intensity={0.8} />
      <spotLight
        position={[0, 10, 0]}
        angle={0.3}
        penumbra={1}
        intensity={0.5}
        castShadow
      />
    </>
  )
}

function App() {
  const [isFreeLook, setIsFreeLook] = useState(false)
  const [currentSection, setCurrentSection] = useState(0)
  const scrollContainerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    if (isFreeLook) {
      container.style.overflow = 'hidden'
      container.style.pointerEvents = 'none'
    } else {
      container.style.overflow = 'auto'
      container.style.pointerEvents = 'auto'
    }
  }, [isFreeLook])

  useEffect(() => {
    const container = scrollContainerRef.current
    if (!container) return

    const handleScroll = () => {
      if (isFreeLook) return
      
      const scrollTop = container.scrollTop
      const sectionHeight = window.innerHeight
      const section = Math.round(scrollTop / sectionHeight)
      
      setCurrentSection(section)
      
      const event = new CustomEvent('sectionChange', { detail: section })
      window.dispatchEvent(event)
    }

    container.addEventListener('scroll', handleScroll)
    return () => container.removeEventListener('scroll', handleScroll)
  }, [isFreeLook])

  const sections = [
    { id: 'hero', title: 'Welcome', subtitle: 'Immersive 3D Experience' },
    { id: 'section1', title: 'Section One', subtitle: 'Placeholder Component' },
    { id: 'section2', title: 'Section Two', subtitle: 'Placeholder Component' },
    { id: 'section3', title: 'Section Three', subtitle: 'Placeholder Component' },
    { id: 'section4', title: 'Section Four', subtitle: 'Placeholder Component' },
  ]

  return (
    <div className="relative w-full h-screen overflow-hidden">
      <div className="fixed inset-0 z-0" style={{ pointerEvents: isFreeLook ? 'auto' : 'none' }}>
        <Canvas
          camera={{ position: cameraPositions[0].position as [number, number, number], fov: 50 }}
          shadows
          gl={{ alpha: true, antialias: true }}
        >
          <color attach="background" args={['#87CEEB']} />
          <fog attach="fog" args={['#87CEEB', SCENE_CONFIG.fogNear, SCENE_CONFIG.fogFar]} />
          <Lighting />
          <Scene isFreeLook={isFreeLook} currentSection={currentSection} />
          <CameraController isFreeLook={isFreeLook} currentSection={currentSection} />
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
        {sections.map((section) => (
          <section
            key={section.id}
            className="h-screen w-full flex items-center justify-center snap-start snap-always"
          >
            <div className="bg-white/5 backdrop-blur-[20px] rounded-3xl border border-white/10 px-24 py-16 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] hover:bg-white/8 hover:border-white/20 hover:shadow-[0_16px_48px_0_rgba(0,0,0,0.5)] hover:-translate-y-2 transition-all duration-[600ms] ease-[cubic-bezier(0.23,1,0.32,1)] max-w-[600px] text-center animate-fadeInScale">
              <h2 className="text-5xl font-bold mb-4 text-white tracking-tight drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)] -tracking-[0.02em]">
                {section.title}
              </h2>
              <p className="text-xl text-white/80 drop-shadow-[0_1px_10px_rgba(255,255,255,0.2)] tracking-[0.02em]">
                {section.subtitle}
              </p>
            </div>
          </section>
        ))}
      </div>

      <div className="fixed top-8 right-8 z-30">
        <button
          onClick={() => setIsFreeLook(!isFreeLook)}
          className="bg-white/10 backdrop-blur-[10px] text-white border border-white/20 rounded-[50px] px-10 py-4 text-[1.1rem] font-semibold cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_4px_16px_rgba(0,0,0,0.2)] tracking-[0.5px] hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] active:translate-y-0 active:scale-100 pointer-events-auto"
        >
          {isFreeLook ? '🔒 Exit Free Look' : '🎥 Free Look'}
        </button>
      </div>

      {!isFreeLook && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none animate-fadeIn">
          <div className="w-7 h-12 border-2 border-white/30 rounded-[50px] relative backdrop-blur-[10px]">
            <div className="w-2 h-2 bg-white/80 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-scrollBounce shadow-[0_0_12px_rgba(255,255,255,0.6)]"></div>
          </div>
        </div>
      )}

      {isFreeLook && (
        <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
          <div className="bg-white/10 backdrop-blur-[15px] rounded-2xl border border-white/20 px-8 py-4 animate-fadeInUp shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
            <p className="text-white text-[0.95rem] font-medium m-0 whitespace-nowrap">🖱️ Drag to rotate • Scroll to zoom • Right-click to pan</p>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
