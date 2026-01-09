"use client";
import { Canvas, extend } from "@react-three/fiber";
import {
  useGLTF,
  useTexture,
  Environment,
  Lightformer,
} from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import Band from "@/components/canvas/Band";
import Overlay from "@/components/dom/Overlay";
import { ThemeProvider, useTheme } from "@/context/ThemeContext";

extend({ MeshLineGeometry, MeshLineMaterial });
useGLTF.preload("/assets/3d/card.glb");
useTexture.preload("/assets/images/tag_texture.png");

export default function Home() {
  return (
    <ThemeProvider>
      <MainContent />
    </ThemeProvider>
  );
}

function MainContent() {
  const { theme } = useTheme();

  return (
    <div
      className="relative h-screen w-full transition-colors duration-300"
      style={{ backgroundColor: theme === 'dark' ? '#000000' : '#ffffff' }}
    >
      <Overlay />
      {/* Canvas container - positioned on right side */}
      <div className="absolute right-0 top-0 h-screen w-full md:w-[50%]">
        <Canvas
          camera={{ position: [0, 0, 13], fov: 25 }}
          style={{ backgroundColor: 'transparent' }}
        >
          <ambientLight intensity={Math.PI} />
          <Physics
            debug={false}
            interpolate
            gravity={[0, -40, 0]}
            timeStep={1 / 60}
          >
            <Band />
          </Physics>
          <Environment blur={0.75}>
            <Lightformer
              intensity={2}
              color="white"
              position={[0, -1, 5]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[-1, -1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={3}
              color="white"
              position={[1, 1, 1]}
              rotation={[0, 0, Math.PI / 3]}
              scale={[100, 0.1, 1]}
            />
            <Lightformer
              intensity={10}
              color="white"
              position={[-10, 0, 14]}
              rotation={[0, Math.PI / 2, Math.PI / 3]}
              scale={[100, 10, 1]}
            />
          </Environment>
        </Canvas>
      </div>
    </div>
  );
}
