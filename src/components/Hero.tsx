import React, { Suspense, useEffect } from "react";
import { Canvas, useThree } from "@react-three/fiber";
import {
  useGLTF,
  Environment,
  Center,
  Bounds,
  ContactShadows,
  Grid,
  Loader
} from "@react-three/drei";
import type { Group } from "three";
import { Vector3 } from "three";

type ModelProps = {
  url: string;
  scale?: number;
};

const Model: React.FC<ModelProps> = ({ url, scale = 1 }) => {
  const { scene } = useGLTF(url) as { scene: Group };
  return <primitive object={scene} scale={scale} dispose={null} />;
};

const CameraSetter: React.FC<{
  position: [number, number, number];
  target?: [number, number, number];
  panRight?: number;
}> = ({ position, target = [0, 0, 0], panRight = 0 }) => {
  const { camera } = useThree();

  useEffect(() => {
    camera.position.set(...position);

    const tgt = new Vector3(...target);

    if (panRight !== 0) {
      const forward = new Vector3();
      camera.getWorldDirection(forward);
      const right = new Vector3()
        .crossVectors(forward, camera.up)
        .normalize()
        .multiplyScalar(panRight);

      camera.position.add(right);
      tgt.add(right);
    }

    camera.lookAt(tgt);
    camera.updateProjectionMatrix();
  }, [camera, position, target, panRight]);

  return null;
};

const Hero: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas
        camera={{
          position: [-114.412, 139.705, 376.602],
          fov: 50,
          near: 0.1,
          far: 1000
        }}
      >
        <color attach="background" args={["#111"]} />

        <Suspense fallback={null}>
          <Environment preset="studio" />

          <Bounds clip margin={1.2}>
            <Center>
              <Model url="/models/model.glb" />
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

        <CameraSetter
          position={[-114.412, 139.705, 376.602]}
          target={[0, 0, 0]}
          panRight={-200}
        />
      </Canvas>

      <Loader />
    </div>
  );
};

export default Hero;
