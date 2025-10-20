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

const FONT_URL = "/fonts/helvetiker_bold.typeface.json";

const TEXT_NAME = "Petar Radojicic";
const TEXT_ROLE = "front-end developer";

const NAME_PLATE_POS: [number, number, number] = [-135, 80.2, 200];
const NAME_PLATE_ROT: [number, number, number] = [0, -0.3, 0];
const NAME_PLATE_SCALE = 0.8;

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

const DEFAULT_POSITION: [number, number, number] = [-114.412, 139.705, 376.602];
const DEFAULT_TARGET: [number, number, number] = [0, 0, 0];
const TARGET_SHIFT_RIGHT = -160;

const ORBIT_POSITION: [number, number, number] = [-626.9, 1064.6, 2829.4];
const ORBIT_TARGET: [number, number, number] = [0, 0, 0];
const ORBIT_TARGET_SHIFT_RIGHT = 0;

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
  const shiftedTarget = computeOffCenterTarget(basePos, baseTarget, targetShiftRight);
  camera.position.set(...basePos);
  camera.lookAt(shiftedTarget);
  camera.updateProjectionMatrix();
  if (controls) {
    controls.target.copy(shiftedTarget);
    controls.update?.();
  }
}

const InitialCameraView: React.FC<{ controlsRef: React.MutableRefObject<any> }> = ({
  controlsRef,
}) => {
  const { camera, invalidate } = useThree();
  useEffect(() => {
    setOffCenterView(
      camera as THREE.PerspectiveCamera,
      controlsRef.current,
      DEFAULT_POSITION,
      DEFAULT_TARGET,
      TARGET_SHIFT_RIGHT
    );
    invalidate();
  }, [camera, controlsRef, invalidate]);
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
  speed?: number;
  stopEps?: number;
}> = ({ controlsRef, orbitEnabled, speed = 4, stopEps = 0.1 }) => {
  const { camera, invalidate } = useThree();

  const toPos = useRef(new THREE.Vector3());
  const toTarget = useRef(new THREE.Vector3());
  const active = useRef(false);

  const isInteracting = useRef(false);
  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    const handleStart = () => { isInteracting.current = true; active.current = false; };
    const handleEnd = () => { isInteracting.current = false; };

    controls.addEventListener?.('start', handleStart);
    controls.addEventListener?.('end', handleEnd);

    return () => {
      controls.removeEventListener?.('start', handleStart);
      controls.removeEventListener?.('end', handleEnd);
    };
  }, [controlsRef]);

  const heroPos = useRef(new THREE.Vector3(...DEFAULT_POSITION));
  const heroTarget = useRef(
    computeOffCenterTarget(DEFAULT_POSITION, DEFAULT_TARGET, TARGET_SHIFT_RIGHT)
  );

  const orbitPos = useRef(new THREE.Vector3(...ORBIT_POSITION));
  const orbitTarget = useRef(
    computeOffCenterTarget(ORBIT_POSITION, ORBIT_TARGET, ORBIT_TARGET_SHIFT_RIGHT)
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
      (camera as THREE.PerspectiveCamera).position.distanceTo(toPos.current) < stopEps;
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

const Nameplate3D: React.FC<{ hidden?: boolean }> = ({ hidden }) => {
  const material = useTextMaterial();
  if (hidden) return null;

  return (
    <group position={NAME_PLATE_POS} rotation={NAME_PLATE_ROT} scale={NAME_PLATE_SCALE}>
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
        {TEXT_NAME}
        <primitive object={material} attach="material" />
      </Text3D>

      <group position={[0, -10, 0]}>
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
          {TEXT_ROLE}
          <primitive object={material} attach="material" />
        </Text3D>
      </group>
    </group>
  );
};

const Hero: React.FC = () => {
  const [orbitEnabled, setOrbitEnabled] = useState(false);
  const controlsRef = useRef<any>(null);

  useEffect(() => {
    if (orbitEnabled) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
      const preventScroll = (e: WheelEvent) => { e.preventDefault(); };
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

  return (
    <div
      style={{
        width: "99%",
        height: "90vh",
        border: "12px solid white",
        borderRadius: 24,
        overflow: "hidden",
        position: "relative",
      }}
    >
      {orbitEnabled ? (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "white",
            background: "rgba(0,0,0,0.6)",
            padding: "10px 14px",
            borderRadius: 10,
            fontFamily: "monospace",
            zIndex: 10,
          }}
        >
          Press <b>T</b> to disable orbit
        </div>
      ) : (
        <div
          style={{
            position: "absolute",
            top: 20,
            left: 20,
            color: "white",
            background: "rgba(0,0,0,0.6)",
            padding: "10px 14px",
            borderRadius: 10,
            fontFamily: "monospace",
            zIndex: 10,
          }}
        >
          Press <b>T</b> to enable orbit
        </div>
      )}

      <Canvas camera={{ position: DEFAULT_POSITION, fov: 50, near: 0.1, far: 20000 }}>
        <color attach="background" args={["#111"]} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Bounds clip margin={1.2}>
            <Center>
              <Model url="/models/model.glb" />

              <Nameplate3D hidden={orbitEnabled} />
            </Center>
          </Bounds>
          <ContactShadows opacity={0.4} blur={2.5} far={10} resolution={1024} frames={1} />
        </Suspense>

        <Grid args={[10, 10]} cellSize={0.5} sectionSize={1} fadeDistance={20} fadeStrength={1} />

        <OrbitControls
          ref={controlsRef}
          enabled={orbitEnabled}
          makeDefault
          enableDamping
          dampingFactor={0.1}
          maxDistance={20000}
          minDistance={0.5}
        />

        <InitialCameraView controlsRef={controlsRef} />
        <CameraTransition controlsRef={controlsRef} orbitEnabled={orbitEnabled} />
        <ToggleOrbit onToggle={setOrbitEnabled} />
      </Canvas>

      <Loader />
    </div>
  );
};

export default Hero;
