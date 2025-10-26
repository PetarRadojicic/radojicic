/**
 * LoadingScreen Component
 *
 * Displays a loading screen with pure CSS animation - instant and smooth.
 */
import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

interface LoadingScreenProps {
  started: boolean
  onStarted: () => void
}

export function LoadingScreen({ started, onStarted }: LoadingScreenProps) {
  const { progress } = useProgress()
  const [displayProgress, setDisplayProgress] = useState(0)

  // Smooth progress animation
  useEffect(() => {
    let rafId: number
    const animate = () => {
      setDisplayProgress((prev) => {
        const diff = progress - prev
        if (Math.abs(diff) < 0.1) return progress
        return prev + diff * 0.15
      })
      rafId = requestAnimationFrame(animate)
    }
    
    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [progress])

  // Auto-start when complete
  useEffect(() => {
    if (progress === 100 && displayProgress > 99) {
      const timer = setTimeout(() => onStarted(), 500)
      return () => clearTimeout(timer)
    }
  }, [progress, displayProgress, onStarted])

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#099996] transition-opacity duration-1000 ${
        started ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Spinning Rings Animation */}
      <div className="relative w-32 h-32 mb-8">
        <div className="absolute inset-0 rounded-full border-8 border-white/20"></div>
        <div className="absolute inset-0 rounded-full border-8 border-transparent border-t-white animate-spin"></div>
        <div className="absolute inset-4 rounded-full border-8 border-transparent border-t-white/60 animate-spin-slow"></div>
      </div>

      {/* Progress Text */}
      <div className="text-white text-2xl font-bold">
        {Math.round(displayProgress)}%
      </div>

      <style>{`
        @keyframes spin-slow {
          to { transform: rotate(-360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 2s linear infinite;
        }
      `}</style>
    </div>
  )
}