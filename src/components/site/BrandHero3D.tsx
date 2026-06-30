"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, Lightformer, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";

/**
 * Real-time 3D brand diamond for the homepage hero background. A faceted,
 * light-refracting gem (drei MeshTransmissionMaterial) that slowly turns inside
 * a field of sparkles. Decorative + non-interactive — it renders on a
 * transparent canvas behind the wordmark. Code-split and lazy-mounted by
 * BrandHero, performance-gated and parked off-screen.
 *
 * Glow is faked with lighting + the CSS halo in BrandHero (no postprocessing
 * dependency). Visual values (light intensity, gem tint) are easy to tune.
 */
function Diamond() {
  const spin = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.4;
  });
  return (
    // raised slightly so the gem floats above the wordmark, like the reference
    <group position={[0, 0.9, 0]}>
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.9}>
        {/* point-down cone with 8 facets reads as a brilliant-cut gem (flat table on top) */}
        <mesh ref={spin} rotation={[Math.PI, 0, 0]} scale={1.8}>
          <coneGeometry args={[1.15, 1.5, 8, 1]} />
          <MeshTransmissionMaterial
            samples={4}
            resolution={512}
            transmission={1}
            thickness={2.1}
            roughness={0}
            ior={2.42}
            chromaticAberration={0.65}
            anisotropicBlur={0.1}
            distortion={0.2}
            distortionScale={0.25}
            temporalDistortion={0.06}
            color="#e2efff"
            attenuationColor="#8fbcff"
            attenuationDistance={1.6}
            background={new THREE.Color("#04070e")}
          />
        </mesh>
      </Float>
    </group>
  );
}

export default function BrandHero3D({
  active = true,
  onReady,
}: {
  active?: boolean;
  onReady?: () => void;
}) {
  return (
    <Canvas
      dpr={[1, 1.5]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 6], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[4, 4, 5]} intensity={18} color="#bcd4ff" />
      <pointLight position={[-5, -2, 3]} intensity={12} color="#2f80ff" />
      <Diamond />
      <Sparkles count={80} scale={[12, 9, 5]} size={4} speed={0.3} color="#bcd4ff" opacity={0.6} noise={1.2} />
      {/* static studio env for the gem's reflections/refraction (rendered once) */}
      <Environment resolution={256} frames={1}>
        <Lightformer intensity={3} position={[0, 4, -3]} scale={[10, 5, 1]} color="#cfe3ff" />
        <Lightformer intensity={2} position={[-5, 1, 2]} scale={[6, 6, 1]} color="#2f80ff" />
        <Lightformer intensity={2} position={[5, 1, 2]} scale={[6, 6, 1]} color="#ffffff" />
        <Lightformer intensity={1.5} position={[0, -4, 1]} scale={[8, 4, 1]} color="#1a3a7a" />
      </Environment>
    </Canvas>
  );
}
