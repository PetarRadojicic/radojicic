import type { SectionData } from '../data/sections'
import { useFreeLookStore } from '../store/useFreeLookStore'
import { motion } from 'framer-motion'

interface HeroProps {
  section: SectionData
}

export function Hero({ section }: HeroProps) {
  const { isFreeLook, toggleFreeLook } = useFreeLookStore()

  const containerVariants = {
    initial: { opacity: 0, scale: 0.8 },
    animate: { 
      opacity: 1, 
      scale: 1,
      transition: {
        duration: 1,
        ease: [0.23, 1, 0.32, 1] as const,
        staggerChildren: 0.15
      }
    }
  }

  const itemVariants = {
    initial: { opacity: 0, y: 40 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.23, 1, 0.32, 1] as const
      }
    },
    exit: { 
      opacity: 0, 
      y: 20,
      transition: {
        duration: 0.5,
        ease: [0.23, 1, 0.32, 1] as const
      }
    }
  }

  return (
    <section className="h-screen w-full flex items-center justify-center snap-start snap-always">
      <motion.div 
        className="max-w-[900px] text-center px-8"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <motion.h1 
          className="text-8xl font-bold mb-6 text-white tracking-tight drop-shadow-[0_4px_30px_rgba(255,255,255,0.4)] -tracking-[0.03em] leading-[1.1]"
          variants={itemVariants}
          animate={isFreeLook ? "exit" : "animate"}
        >
          {section.title}
        </motion.h1>
        
        <motion.p 
          className="text-3xl text-white/90 drop-shadow-[0_2px_20px_rgba(255,255,255,0.3)] tracking-[0.01em] mb-12 font-semibold"
          variants={itemVariants}
          animate={isFreeLook ? "exit" : "animate"}
        >
          {section.subtitle}
        </motion.p>
        
        <motion.div 
          className="flex gap-6 justify-center items-center mt-16"
          variants={itemVariants}
          animate={isFreeLook ? "exit" : "animate"}
          style={{ pointerEvents: isFreeLook ? 'none' : 'auto' }}
        >
          <motion.button 
            onClick={toggleFreeLook}
            className="bg-white/15 backdrop-blur-[20px] rounded-full border border-white/20 px-8 py-4 text-white font-medium text-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.37)]"
            whileHover={{ 
              scale: 1.05, 
              y: -4,
              backgroundColor: 'rgba(255, 255, 255, 0.25)',
              borderColor: 'rgba(255, 255, 255, 0.30)',
              boxShadow: '0 16px 48px 0 rgba(0,0,0,0.5)'
            }}
            whileTap={{ scale: 1, y: 0 }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
          >
            Free Look Mode
          </motion.button>
          
          <motion.button 
            className="bg-white/5 backdrop-blur-[20px] rounded-full border border-white/15 px-8 py-4 text-white/90 font-medium text-lg shadow-[0_8px_32px_0_rgba(0,0,0,0.2)] cursor-not-allowed opacity-70"
            whileHover={{ 
              scale: 1.05, 
              y: -4,
              backgroundColor: 'rgba(255, 255, 255, 0.10)',
              borderColor: 'rgba(255, 255, 255, 0.25)',
              color: 'rgba(255, 255, 255, 1)'
            }}
            transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] as const }}
            disabled
          >
            SR / EN
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  )
}

