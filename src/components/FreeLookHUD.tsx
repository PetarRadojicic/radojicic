import type { Vector3Tuple } from '../types/camera'

interface FreeLookHUDProps {
  isVisible: boolean
  cameraPos: Vector3Tuple
  cameraTarget: Vector3Tuple
  onCopy: () => void
}

export function FreeLookHUD({ isVisible, cameraPos, cameraTarget, onCopy }: FreeLookHUDProps) {
  if (!isVisible) return null

  return (
    <>
      <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-30 pointer-events-none">
        <div className="bg-white/10 backdrop-blur-[15px] rounded-2xl border border-white/20 px-8 py-4 animate-fadeInUp shadow-[0_4px_16px_rgba(0,0,0,0.3)]">
          <p className="text-white text-[0.95rem] font-medium m-0 whitespace-nowrap">
            🖱️ Drag to rotate • Scroll to zoom • Right-click to pan
          </p>
        </div>
      </div>
      
      <div className="fixed top-8 left-8 z-30 pointer-events-auto">
        <div className="bg-black/80 backdrop-blur-[10px] rounded-xl border border-white/20 px-6 py-4 shadow-[0_4px_16px_rgba(0,0,0,0.5)] font-mono text-sm">
          <div className="text-green-400 font-bold mb-2">📷 Camera Debug</div>
          <div className="text-white/90 mb-1">
            <span className="text-blue-300">Position:</span> [{cameraPos.join(', ')}]
          </div>
          <div className="text-white/90 mb-3">
            <span className="text-purple-300">Target:</span> [{cameraTarget.join(', ')}]
          </div>
          <button
            onClick={onCopy}
            className="bg-green-500/20 hover:bg-green-500/40 text-green-300 border border-green-500/50 rounded-lg px-4 py-2 text-xs font-semibold transition-all duration-200 w-full"
          >
            📋 Copy to Clipboard
          </button>
        </div>
      </div>
    </>
  )
}

