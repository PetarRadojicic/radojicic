import React, { Suspense, useEffect, useRef, useState, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Center,
  Bounds,
  ContactShadows,
  Grid,
  Loader,
  OrbitControls,
  Text3D,
} from "@react-three/drei";
import * as THREE from "three";
import { useOrbitStore } from "../stores/orbitStore";
import { useTranslation } from "react-i18next";

const FONT_URL = "/fonts/helvetiker_bold.typeface.json";

const DESKTOP_NAME_PLATE_POS: [number, number, number] = [-105, 80.2, 200];
const DESKTOP_NAME_PLATE_ROT: [number, number, number] = [0, -0.3, 0];
const DESKTOP_NAME_PLATE_SCALE = 0.8;
const DESKTOP_DEFAULT_POSITION: [number, number, number] = [-114.412, 139.705, 376.602];
const DESKTOP_DEFAULT_TARGET: [number, number, number] = [0, 0, 0];
const DESKTOP_TARGET_SHIFT_RIGHT = -160;

const MOBILE_NAME_PLATE_POS: [number, number, number] = [1000, 300, 270];
const MOBILE_NAME_PLATE_ROT: [number, number, number] = [-0.01, 1.55, 0];
const MOBILE_NAME_PLATE_SCALE = 4.8;
const MOBILE_DEFAULT_POSITION: [number, number, number] = [3000, 0, 0];
const MOBILE_DEFAULT_TARGET: [number, number, number] = [0, 0, 0];
const MOBILE_TARGET_SHIFT_RIGHT = 0;

const ORBIT_POSITION: [number, number, number] = [-626.9, 1064.6, 2829.4];
const ORBIT_TARGET: [number, number, number] = [0, 0, 0];
const ORBIT_TARGET_SHIFT_RIGHT = 0;

const MOBILE_BREAKPOINT = 768;
const DESKTOP_BREAKPOINT = 1280;

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpVector(
  a: [number, number, number],
  b: [number, number, number],
  t: number
): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function getResponsiveFactor(width: number): number {
  if (width <= MOBILE_BREAKPOINT) return 0;
  if (width >= DESKTOP_BREAKPOINT) return 1;
  return (width - MOBILE_BREAKPOINT) / (DESKTOP_BREAKPOINT - MOBILE_BREAKPOINT);
}

function useResponsiveConfig() {
  const [factor, setFactor] = useState(() =>
    typeof window !== 'undefined' ? getResponsiveFactor(window.innerWidth) : 1
  );

  useEffect(() => {
    const handleResize = () => {
      setFactor(getResponsiveFactor(window.innerWidth));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return useMemo(() => {
    const namePlatePos = lerpVector(
      MOBILE_NAME_PLATE_POS,
      DESKTOP_NAME_PLATE_POS,
      factor
    );
    const namePlateRot = lerpVector(
      MOBILE_NAME_PLATE_ROT,
      DESKTOP_NAME_PLATE_ROT,
      factor
    );
    const namePlateScale = lerp(
      MOBILE_NAME_PLATE_SCALE,
      DESKTOP_NAME_PLATE_SCALE,
      factor
    );
    const defaultPosition = lerpVector(
      MOBILE_DEFAULT_POSITION,
      DESKTOP_DEFAULT_POSITION,
      factor
    );
    const defaultTarget = lerpVector(
      MOBILE_DEFAULT_TARGET,
      DESKTOP_DEFAULT_TARGET,
      factor
    );
    const targetShiftRight = lerp(
      MOBILE_TARGET_SHIFT_RIGHT,
      DESKTOP_TARGET_SHIFT_RIGHT,
      factor
    );

    return {
      namePlatePos,
      namePlateRot,
      namePlateScale,
      defaultPosition,
      defaultTarget,
      targetShiftRight,
    };
  }, [factor]);
}

function useTextMaterial() {
  return useMemo(() => {
    const mat = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#ffffff"),
      metalness: 0.35,
      roughness: 0.3,
      emissive: new THREE.Color("#ffffff"),
      emissiveIntensity: 0.0,
    });
    return mat;
  }, []);
}

type ModelProps = { url: string; scale?: number };

const Model: React.FC<ModelProps> = ({ url, scale = 1 }) => {
  const { scene } = useGLTF(url) as unknown as { scene: THREE.Group };
  return <primitive object={scene} scale={scale} dispose={null} />;
};

function computeOffCenterTarget(
  basePos: [number, number, number],
  baseTarget: [number, number, number],
  shiftRight: number,
  up: THREE.Vector3 = new THREE.Vector3(0, 1, 0)
) {
  const pos = new THREE.Vector3(...basePos);
  const tgt = new THREE.Vector3(...baseTarget);
  const fwd = tgt.clone().sub(pos).normalize();
  const right = new THREE.Vector3().crossVectors(fwd, up).normalize();
  return tgt.clone().addScaledVector(right, shiftRight);
}

function setOffCenterView(
  camera: THREE.PerspectiveCamera,
  controls: any | null,
  basePos: [number, number, number],
  baseTarget: [number, number, number],
  targetShiftRight: number
) {
  const shiftedTarget = computeOffCenterTarget(
    basePos,
    baseTarget,
    targetShiftRight
  );
  camera.position.set(...basePos);
  camera.lookAt(shiftedTarget);
  camera.updateProjectionMatrix();
  if (controls) {
    controls.target.copy(shiftedTarget);
    controls.update?.();
  }
}

const InitialCameraView: React.FC<{
  controlsRef: React.MutableRefObject<any>;
  position: [number, number, number];
  target: [number, number, number];
  shiftRight: number;
}> = ({ controlsRef, position, target, shiftRight }) => {
  const { camera, invalidate } = useThree();

  useEffect(() => {
    setOffCenterView(
      camera as THREE.PerspectiveCamera,
      controlsRef.current,
      position,
      target,
      shiftRight
    );
    invalidate();
  }, [camera, controlsRef, invalidate, position, target, shiftRight]);

  return null;
};

const ToggleOrbit: React.FC<{
  onToggle: (enabled: boolean) => void;
}> = ({ onToggle }) => {
  const enabledRef = useRef(false);
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() !== "t") return;
      enabledRef.current = !enabledRef.current;
      onToggle(enabledRef.current);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onToggle]);
  return null;
};

const CameraTransition: React.FC<{
  controlsRef: React.MutableRefObject<any>;
  orbitEnabled: boolean;
  defaultPosition: [number, number, number];
  defaultTarget: [number, number, number];
  targetShiftRight: number;
  speed?: number;
  stopEps?: number;
}> = ({
  controlsRef,
  orbitEnabled,
  defaultPosition,
  defaultTarget,
  targetShiftRight,
  speed = 4,
  stopEps = 0.1,
}) => {
  const { camera, invalidate } = useThree();

  const toPos = useRef(new THREE.Vector3());
  const toTarget = useRef(new THREE.Vector3());
  const active = useRef(false);

  const isInteracting = useRef(false);
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => {
      isInteracting.current = true;
      active.current = false;
    };
    const handleEnd = () => {
      isInteracting.current = false;
    };

    controls.addEventListener?.('start', handleStart);
    controls.addEventListener?.('end', handleEnd);

    return () => {
      controls.removeEventListener?.('start', handleStart);
      controls.removeEventListener?.('end', handleEnd);
    };
  }, [controlsRef]);

  const heroPos = useRef(new THREE.Vector3());
  const heroTarget = useRef(new THREE.Vector3());

  useEffect(() => {
    heroPos.current.set(...defaultPosition);
    heroTarget.current.copy(
      computeOffCenterTarget(defaultPosition, defaultTarget, targetShiftRight)
    );
  }, [defaultPosition, defaultTarget, targetShiftRight]);

  const orbitPos = useRef(new THREE.Vector3(...ORBIT_POSITION));
  const orbitTarget = useRef(
    computeOffCenterTarget(
      ORBIT_POSITION,
      ORBIT_TARGET,
      ORBIT_TARGET_SHIFT_RIGHT
    )
  );

  useEffect(() => {
    if (orbitEnabled) {
      toPos.current.copy(orbitPos.current);
      toTarget.current.copy(orbitTarget.current);
    } else {
      toPos.current.copy(heroPos.current);
      toTarget.current.copy(heroTarget.current);
    }
    active.current = true;
  }, [orbitEnabled]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!active.current || isInteracting.current) return;

    const k = 1 - Math.exp(-delta * speed);

    (camera as THREE.PerspectiveCamera).position.lerp(toPos.current, k);

    if (controls?.target) {
      controls.target.lerp(toTarget.current, k);
      controls.update?.();
    }

    const lookTarget = controls?.target ?? toTarget.current;
    camera.lookAt(lookTarget);
    invalidate();

    const posDone =
      (camera as THREE.PerspectiveCamera).position.distanceTo(toPos.current) <
      stopEps;
    const tgtDone = lookTarget.distanceTo(toTarget.current) < stopEps;

    if (posDone && tgtDone) {
      (camera as THREE.PerspectiveCamera).position.copy(toPos.current);
      if (controls?.target) {
        controls.target.copy(toTarget.current);
        controls.update?.();
      }
      active.current = false;
    }
  });

  return null;
};

const Nameplate3D: React.FC<{
  hidden?: boolean;
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
}> = ({ hidden, position, rotation, scale }) => {
  const material = useTextMaterial();
  const { t } = useTranslation();
  
  if (hidden) return null;

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Text3D
        font={FONT_URL}
        size={16}
        height={1}
        bevelEnabled
        bevelThickness={0.8}
        bevelSize={0}
        bevelSegments={6}
        curveSegments={24}
      >
        {t('hero.title')}
        <primitive object={material} attach="material" />
      </Text3D>
      <group position={[0, -15, 0]}>
        <Text3D
          font={FONT_URL}
          size={6}
          height={0.2}
          bevelEnabled
          bevelThickness={0.5}
          bevelSize={0}
          bevelSegments={4}
          curveSegments={20}
        >
          {t('hero.description')}
          <primitive object={material} attach="material" />
        </Text3D>
      </group>
    </group>
  );
};

const getWindowSafe = () =>
  typeof window !== 'undefined' ? window : (undefined as unknown as Window);

const LanguageToggle: React.FC<{ isMobile?: boolean }> = ({ isMobile = false }) => {
  const { i18n } = useTranslation();

  const toggleLanguage = () => {
    const newLang = i18n.language === 'en' ? 'sr' : 'en';
    i18n.changeLanguage(newLang);
  };

  const currentLang = i18n.language === 'en' ? 'EN' : 'SR';

  if (isMobile) {
    return (
      <button
        type="button"
        onClick={toggleLanguage}
        className={[
          "px-3 py-3 rounded-full backdrop-blur",
          "bg-white/10 border border-white/20",
          "shadow-xl active:scale-[0.98] transition",
          "text-white font-medium tracking-wide",
          "select-none",
        ].join(" ")}
      >
        {currentLang}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className={[
        "px-4 py-2 rounded-lg backdrop-blur",
        "bg-white/10 border border-white/20",
        "shadow-lg hover:bg-white/20 transition",
        "text-white font-medium",
        "select-none",
      ].join(" ")}
    >
      {currentLang}
    </button>
  );
};

const Hero: React.FC = () => {
  const [orbitEnabled, setOrbitEnabled] = useState(false);
  const setOrbit = useOrbitStore((state) => state.setOrbit);
  const { t, i18n } = useTranslation();
  const [isMobileOrTablet, setIsMobileOrTablet] = useState<boolean>(() => {
    const w = getWindowSafe();
    return !!w && w.innerWidth < 1280;
  });

  const controlsRef = useRef<any>(null);
  const config = useResponsiveConfig();

  useEffect(() => {
    const w = getWindowSafe();
    if (!w) return;
    const compute = () => {
      const result = w.innerWidth < 1280;
      setIsMobileOrTablet(result);
    };
    compute();
    w.addEventListener('resize', compute);
    w.addEventListener('orientationchange', compute);
    return () => {
      w.removeEventListener('resize', compute);
      w.removeEventListener('orientationchange', compute);
    };
  }, []);

  useEffect(() => {
    if (orbitEnabled) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      const preventScroll = (e: WheelEvent) => {
        e.preventDefault();
      };
      document.addEventListener('wheel', preventScroll, { passive: false });
      return () => {
        document.body.style.overflow = 'unset';
        document.documentElement.style.overflow = 'unset';
        document.removeEventListener('wheel', preventScroll);
      };
    } else {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      document.documentElement.style.overflow = 'unset';
    };
  }, [orbitEnabled]);

  useEffect(() => {
    document.body.style.overflow = 'unset';
    document.documentElement.style.overflow = 'unset';
  }, []);

  useEffect(() => {
    setOrbit(orbitEnabled);
  }, [orbitEnabled, setOrbit]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key.toLowerCase() === 's') {
        const newLang = i18n.language === 'en' ? 'sr' : 'en';
        i18n.changeLanguage(newLang);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [i18n]);

  return (
    <div
      className={`w-full box-border ${
        isMobileOrTablet ? 'h-[75vh]' : 'h-[90vh]'
      } border-[12px] border-white rounded-[24px] overflow-hidden relative`}
    >
      {!isMobileOrTablet &&
        (orbitEnabled ? (
          <div className="absolute top-5 left-5 text-white bg-black/60 py-4 px-6 rounded-[10px] font-mono z-10 text-4xl">
            {t('hero.disableOrbit')}
          </div>
        ) : (
          <>
            <div className="absolute top-5 left-5 text-white bg-black/60 py-4 px-6 rounded-[10px] font-mono z-10 text-4xl">
              {t('hero.toggleOrbit')}
            </div>
            <div className="absolute top-20 left-5 text-white bg-black/60 py-4 px-6 mt-4 rounded-[10px] font-mono z-10 text-4xl">
              {t('hero.toggleLanguage')}
            </div>
            <div className="absolute top-32 left-5">
              <LanguageToggle />
            </div>
          </>
        ))}

      {isMobileOrTablet && (
        <>
          {!orbitEnabled && (
            <div className="absolute left-1/2 -translate-x-1/2 bottom-20 z-20">
              <LanguageToggle isMobile={true} />
            </div>
          )}
          <button
            type="button"
            aria-pressed={orbitEnabled}
            onClick={() => setOrbitEnabled((v) => !v)}
            className={[
              "absolute left-1/2 -translate-x-1/2 bottom-5 z-20",
              "px-5 py-3 rounded-full backdrop-blur",
              "bg-white/10 border border-white/20",
              "shadow-xl active:scale-[0.98] transition",
              "text-white font-medium tracking-wide",
              "select-none",
            ].join(" ")}
          >
            {orbitEnabled ? t('hero.disableOrbitButton') : t('hero.enableOrbit')}
          </button>
        </>
      )}

      <Canvas
        camera={{
          position: config.defaultPosition,
          fov: 50,
          near: 0.1,
          far: 20000,
        }}
        style={{
          touchAction: orbitEnabled ? "none" : "pan-y",
          pointerEvents: orbitEnabled ? "auto" : "none",
        }}
      >
        <color attach="background" args={["#111"]} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Bounds clip margin={1.2}>
            <Center>
              <Model url="/models/model.glb" />

              <Nameplate3D
                hidden={orbitEnabled}
                position={config.namePlatePos}
                rotation={config.namePlateRot}
                scale={config.namePlateScale}
              />
            </Center>
          </Bounds>
          <ContactShadows
            opacity={0.4}
            blur={2.5}
            far={10}
            resolution={1024}
            frames={1}
          />
        </Suspense>
        <Grid
          args={[10, 10]}
          cellSize={0.5}
          sectionSize={1}
          fadeDistance={20}
          fadeStrength={1}
        />
        <OrbitControls
          ref={controlsRef}
          enabled={orbitEnabled}
          makeDefault
          enableDamping
          dampingFactor={0.1}
          maxDistance={20000}
          minDistance={0.5}
        />
        <InitialCameraView
          controlsRef={controlsRef}
          position={config.defaultPosition}
          target={config.defaultTarget}
          shiftRight={config.targetShiftRight}
        />
        <CameraTransition
          controlsRef={controlsRef}
          orbitEnabled={orbitEnabled}
          defaultPosition={config.defaultPosition}
          defaultTarget={config.defaultTarget}
          targetShiftRight={config.targetShiftRight}
        />
        <ToggleOrbit onToggle={setOrbitEnabled} />
      </Canvas>
      <Loader />
    </div>
  );
};

export default Hero;