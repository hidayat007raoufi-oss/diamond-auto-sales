"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, Environment, Lightformer, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Lightweight, NON-interactive homepage preview of the /experience M3 — a slow,
 * premium turntable on a transparent canvas (so the CSS studio stage shows
 * through as the backdrop). It is code-split (loaded via next/dynamic) and only
 * mounted once the feature band nears the viewport, so it never touches initial
 * homepage load. The full interactive configurator lives on /experience.
 */
const MODEL_URL = "/models/bmw-m3.glb";

function Car({ onReady }: { onReady?: () => void }) {
  const { scene } = useGLTF(MODEL_URL, true, true);
  const ref = useRef<THREE.Group>(null);

  const object = useMemo(() => {
    const root = scene.clone(true);
    root.traverse((o) => {
      const m = o as THREE.Mesh;
      if (m.isMesh) {
        m.castShadow = true;
        m.receiveShadow = true;
      }
    });
    return root;
  }, [scene]);

  // Signal the parent (after Suspense resolves) so it can crossfade the car in.
  useEffect(() => {
    onReady?.();
  }, [onReady]);

  // Gentle, deliberate turntable — premium, not a spinning gimmick.
  useFrame((_, dt) => {
    if (ref.current) ref.current.rotation.y += dt * 0.22;
  });

  return (
    <group ref={ref} rotation={[0, -0.6, 0]}>
      <Center bottom>
        <primitive object={object} />
      </Center>
    </group>
  );
}

export default function ExperiencePreview3D({
  active = true,
  onReady,
}: {
  /** When false the render loop is parked (frameloop: never) to spare the GPU off-screen. */
  active?: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      shadows
      dpr={[1, 1.5]} /* cap DPR — keeps the preview cheap on hi-dpi phones */
      frameloop={active ? "always" : "never"}
      camera={{ position: [4.6, 1.7, 6], fov: 30 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      className="!h-full !w-full"
    >
      <Suspense fallback={null}>
        <Bounds fit clip margin={1.3}>
          <Car onReady={onReady} />
        </Bounds>
        {/* baked once — static stage, the model rotates */}
        <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={14} blur={2.6} far={5} frames={1} color="#000000" />
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.2} position={[0, 5, -4]} scale={[12, 5, 1]} />
          <Lightformer intensity={1.3} position={[-5, 2, 3]} scale={[7, 7, 1]} />
          <Lightformer intensity={1.1} position={[5, 2, 3]} scale={[7, 7, 1]} />
        </Environment>
      </Suspense>
      <ambientLight intensity={0.35} />
      <directionalLight position={[6, 9, 4]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />
    </Canvas>
  );
}
