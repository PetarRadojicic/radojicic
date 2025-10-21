import { useEffect, useRef } from 'react';
import { Player } from '@lordicon/react';
import ICON from '../icons/mouse-scroll.json';

export default function PlayOnce() {
  const playerRef = useRef<Player>(null);

  useEffect(() => {
    const playAnimation = () => {
      playerRef.current?.playFromBeginning();
    };

    playAnimation();

    const interval = setInterval(() => {
      playAnimation();
    }, 3000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="flex items-center justify-center h-[10vh]">
      <Player
        ref={playerRef}
        icon={ICON}
        size={window.innerHeight * 0.1}
        colorize="#000000"
      />
    </div>
  );
}
