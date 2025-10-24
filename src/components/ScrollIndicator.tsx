interface ScrollIndicatorProps {
  isVisible: boolean
}

export function ScrollIndicator({ isVisible }: ScrollIndicatorProps) {
  if (!isVisible) return null

  return (
    <div className="fixed bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-none animate-fadeIn">
      <div className="w-7 h-12 border-2 border-white/30 rounded-[50px] relative backdrop-blur-[10px]">
        <div className="w-2 h-2 bg-white/80 rounded-full absolute top-2 left-1/2 -translate-x-1/2 animate-scrollBounce shadow-[0_0_12px_rgba(255,255,255,0.6)]"></div>
      </div>
    </div>
  )
}

