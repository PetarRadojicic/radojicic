import React, { Suspense, useEffect, useRef, useState } from "react";
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
} from "@react-three/drei";
import * as THREE from "three";

type ModelProps = { url: string; scale?: number };

const Model: React.FC<ModelProps> = ({ url, scale = 1 }) => {
  const { scene } = useGLTF(url) as unknown as { scene: THREE.Group };
  return <primitive object={scene} scale={scale} dispose={null} />;
};

const DEFAULT_POSITION: [number, number, number] = [-114.412, 139.705, 376.602];
const DEFAULT_TARGET: [number, number, number] = [0, 0, 0];
const TARGET_SHIFT_RIGHT = -160;

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

  const heroPos = useRef(new THREE.Vector3(...DEFAULT_POSITION));
  const heroTarget = useRef(
    computeOffCenterTarget(DEFAULT_POSITION, DEFAULT_TARGET, TARGET_SHIFT_RIGHT)
  );

  useEffect(() => {
    if (orbitEnabled) {
      active.current = false;
      return;
    }
    toPos.current.copy(heroPos.current);
    toTarget.current.copy(heroTarget.current);
    active.current = true;
  }, [orbitEnabled]);

  useFrame((_, delta) => {
    const controls = controlsRef.current;
    if (!active.current || !controls) return;

    const k = 1 - Math.exp(-delta * speed);

    (camera as THREE.PerspectiveCamera).position.lerp(toPos.current, k);
    controls.target.lerp(toTarget.current, k);
    controls.update?.();
    invalidate();

    if (
      (camera as THREE.PerspectiveCamera).position.distanceTo(toPos.current) < stopEps &&
      controls.target.distanceTo(toTarget.current) < stopEps
    ) {
      (camera as THREE.PerspectiveCamera).position.copy(toPos.current);
      controls.target.copy(toTarget.current);
      controls.update?.();
      active.current = false;
    }
  });

  return null;
};


const Hero: React.FC = () => {
  const [orbitEnabled, setOrbitEnabled] = useState(false);
  const controlsRef = useRef<any>(null);

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

      <Canvas camera={{ position: DEFAULT_POSITION, fov: 50, near: 0.1, far: 1000 }}>
        <color attach="background" args={["#111"]} />

        <Suspense fallback={null}>
          <Environment preset="studio" />
          <Bounds clip margin={1.2}>
            <Center>
              <Model url="/models/model.glb" />
            </Center>
          </Bounds>
          <ContactShadows opacity={0.4} blur={2.5} far={10} resolution={1024} frames={1} />
        </Suspense>

        <Grid args={[10, 10]} cellSize={0.5} sectionSize={1} fadeDistance={20} fadeStrength={1} />

        <OrbitControls ref={controlsRef} enabled={orbitEnabled} makeDefault />

        <InitialCameraView controlsRef={controlsRef} />

        <CameraTransition controlsRef={controlsRef} orbitEnabled={orbitEnabled} />

        <ToggleOrbit onToggle={setOrbitEnabled} />
      </Canvas>

      <Loader />
    </div>
  );
};

export default Hero;
