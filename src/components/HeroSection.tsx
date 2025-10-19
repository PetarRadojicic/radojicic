import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import {
  OrbitControls,
  useGLTF,
  Environment,
  Center,
  Bounds,
  ContactShadows,
  Grid,
  Loader
} from "@react-three/drei";
import type { Group } from "three";

type ModelProps = {
  url: string;
  scale?: number;
};

const Model: React.FC<ModelProps> = ({ url, scale = 1 }) => {
  const { scene } = useGLTF(url) as { scene: Group };
  return <primitive object={scene} scale={scale} dispose={null} />;
};

const ModelViewer: React.FC = () => {
  return (
    <div style={{ width: "100%", height: "100vh" }}>
      <Canvas
        camera={{ position: [2, 1.5, 3], fov: 50, near: 0.1, far: 1000 }}
      >
        <color attach="background" args={["#111"]} />

        <Suspense fallback={null}>
          <Environment preset="studio" />

          <Bounds fit clip observe margin={1.2}>
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

        <OrbitControls makeDefault enableDamping />

        <Grid
          args={[10, 10]}
          cellSize={0.5}
          sectionSize={1}
          fadeDistance={20}
          fadeStrength={1}
        />
      </Canvas>

      <Loader />
    </div>
  );
};

export default ModelViewer;
