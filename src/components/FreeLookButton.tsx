interface FreeLookButtonProps {
  isFreeLook: boolean
  onClick: () => void
}

export function FreeLookButton({ isFreeLook, onClick }: FreeLookButtonProps) {
  return (
    <div className="fixed top-8 right-8 z-30">
      <button
        onClick={onClick}
        className="bg-white/10 backdrop-blur-[10px] text-white border border-white/20 rounded-[50px] px-10 py-4 text-[1.1rem] font-semibold cursor-pointer transition-all duration-[400ms] ease-[cubic-bezier(0.23,1,0.32,1)] shadow-[0_4px_16px_rgba(0,0,0,0.2)] tracking-[0.5px] hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 hover:scale-105 hover:shadow-[0_8px_24px_rgba(255,255,255,0.15)] active:translate-y-0 active:scale-100 pointer-events-auto"
      >
        {isFreeLook ? '🔒 Exit Free Look' : '🎥 Free Look'}
      </button>
    </div>
  )
}

