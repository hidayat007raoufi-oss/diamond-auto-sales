"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Float, MeshTransmissionMaterial, Sparkles } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef } from "react";
import * as THREE from "three";

/**
 * Real-time 3D brand diamond — tuned to mirror the cinematic reference: a
 * brilliant-cut, light-refracting crystal with bright silver facet highlights,
 * an electric-blue bloom halo, and a dense starfield on pitch black.
 *
 * Key ideas:
 *  - Brilliant-cut geometry via a lathe profile (table → crown → girdle → culet),
 *    flat-shaded so every facet reads.
 *  - The gem refracts a bright blue glow sprite placed BEHIND it (instead of the
 *    black page), so it lights up instead of going dark.
 *  - Real Bloom makes facet highlights, the halo, and the stars actually glow.
 * The scene is opaque (it paints its own black + glow), and it's code-split,
 * lazy-mounted, performance-gated, and parked off-screen by BrandHero.
 */

/** Brilliant-cut diamond: table + crown facets + girdle + pavilion to a culet. */
function useDiamondGeometry() {
  return useMemo(() => {
    const profile = [
      new THREE.Vector2(0.001, 0.42), // table center (top)
      new THREE.Vector2(0.58, 0.42), // table edge (flat top)
      new THREE.Vector2(1.0, 0.12), // girdle (widest point)
      new THREE.Vector2(0.0, -0.95), // culet (bottom point)
    ];
    const geo = new THREE.LatheGeometry(profile, 14); // 14 facets around
    geo.computeVertexNormals();
    return geo;
  }, []);
}

/** Soft radial-gradient sprite used as the blue glow halo behind the gem. */
function useGlowTexture() {
  return useMemo(() => {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = size;
    const ctx = canvas.getContext("2d")!;
    const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
    g.addColorStop(0, "rgba(120,190,255,1)");
    g.addColorStop(0.25, "rgba(47,128,255,0.85)");
    g.addColorStop(0.55, "rgba(30,80,200,0.35)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, size, size);
    const tex = new THREE.CanvasTexture(canvas);
    tex.colorSpace = THREE.SRGBColorSpace;
    return tex;
  }, []);
}

function Diamond() {
  const geo = useDiamondGeometry();
  const spin = useRef<THREE.Mesh>(null);
  useFrame((_, dt) => {
    if (spin.current) spin.current.rotation.y += dt * 0.45;
  });
  return (
    <Float speed={1.1} rotationIntensity={0.2} floatIntensity={0.7}>
      {/* tilt forward slightly so we look into the table + crown, like a gem */}
      <group rotation={[0.2, 0, 0]} scale={2.15}>
        <mesh ref={spin} geometry={geo}>
          <MeshTransmissionMaterial
            flatShading
            samples={6}
            resolution={1024}
            transmission={1}
            thickness={0.9}
            roughness={0}
            ior={2.42}
            chromaticAberration={1.0}
            anisotropicBlur={0.04}
            distortion={0.15}
            distortionScale={0.2}
            temporalDistortion={0.05}
            clearcoat={1}
            attenuationColor="#bcdcff"
            attenuationDistance={2.5}
            color="#ffffff"
          />
        </mesh>
      </group>
    </Float>
  );
}

export default function BrandHero3D({
  active = true,
  onReady,
}: {
  active?: boolean;
  onReady?: () => void;
}) {
  const glow = useGlowTexture();
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0.3, 5.4], fov: 35 }}
      gl={{ antialias: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMappingExposure = 1.1;
        onReady?.();
      }}
    >
      {/* pitch-black stage that paints its own background */}
      <color attach="background" args={["#03040a"]} />

      <ambientLight intensity={0.5} />
      {/* sharp silver facet glints + a blue rim */}
      <directionalLight position={[4, 6, 5]} intensity={3.2} color="#ffffff" />
      <pointLight position={[5, 3, 4]} intensity={45} color="#ffffff" />
      <pointLight position={[-5, 2, 3]} intensity={32} color="#3aa0ff" />
      <pointLight position={[0, -3, 4]} intensity={18} color="#7fb2ff" />

      {/* electric-blue glow halo behind the gem — the gem refracts this, and Bloom amplifies it */}
      <sprite position={[0, 0.7, -1.4]} scale={[7.5, 7.5, 1]}>
        <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.9} />
      </sprite>

      <group position={[0, 0.7, 0]}>
        <Diamond />
      </group>

      {/* dense starfield: tiny white stars + larger blue glints */}
      <Sparkles count={260} scale={[16, 11, 7]} size={1.6} speed={0.2} color="#ffffff" opacity={0.9} noise={1.4} />
      <Sparkles count={90} scale={[14, 10, 6]} size={5} speed={0.35} color="#4aa6ff" opacity={0.8} noise={1.6} />

      {/* Reflections sourced from the brand reference image, so the gem's facets
          reflect its galaxy/sparkle palette (reflections only — the visible
          background stays black + glow). The lights above add the sharp silver
          facet highlights on top. */}
      <Environment files="/hero/brand-env.jpg" environmentIntensity={1.2} />

      <EffectComposer>
        <Bloom intensity={1.5} luminanceThreshold={0.15} luminanceSmoothing={0.9} mipmapBlur radius={0.85} />
      </EffectComposer>
    </Canvas>
  );
}
