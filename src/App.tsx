import { useState, useEffect } from 'react'
import Hero from './components/Hero'
import ScrollAnimationMouse from './components/ScrollAnimationMouse'
import ScrollAnimationFinger from './components/ScrollAnimationFinger'
import Slider from './components/Slider'
import Projects from './components/Projects'
import './App.css'

const getWindowSafe = () => (typeof window !== 'undefined' ? window : (undefined as unknown as Window));

function App() {
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(() => {
    const w = getWindowSafe();
    return !!w && w.innerWidth < 1280;
  });

  useEffect(() => {
    const w = getWindowSafe();
    if (!w) return;
    const compute = () => {
      const result = w.innerWidth < 1280;
      setIsMobileOrTablet(result);
    };
    compute();
    w.addEventListener('resize', compute);
    return () => w.removeEventListener('resize', compute);
  }, []);

  return (
    <>
      <Hero />
      {isMobileOrTablet ? <ScrollAnimationFinger /> : <ScrollAnimationMouse />}
      <Projects />
      <Slider />
    </>
  )
}

export default App
