"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles, Stars } from "@react-three/drei";
import { Bloom, EffectComposer } from "@react-three/postprocessing";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

/**
 * Real-time layered cosmic scene that lives BEHIND the (crisp art) hero
 * diamond + logo. Layers: animated starfield, drifting blue nebula glow,
 * independently floating 3D crystal shards (varied depth/speed/rotation),
 * particle sparkles, bloom, and pointer/touch parallax. Code-split and
 * lazy-mounted by BrandHero; quality is reduced on phones; parked off-screen.
 *
 * The hero diamond is intentionally NOT a real-time model — it stays as the
 * high-res art so it never looks like a low-fi "prism". This scene supplies
 * the living depth around it.
 */

// deterministic pseudo-random so the layout is stable across renders/SSR
function rnd(i: number) {
  const x = Math.sin(i * 127.1 + 311.7) * 43758.5453;
  return x - Math.floor(x);
}

/** Soft radial sprite texture for the nebula glow clouds. */
function useGlowTexture() {
  return useMemo(() => {
    const s = 256;
    const c = document.createElement("canvas");
    c.width = c.height = s;
    const ctx = c.getContext("2d")!;
    const g = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
    g.addColorStop(0, "rgba(70,150,255,0.9)");
    g.addColorStop(0.4, "rgba(40,90,210,0.35)");
    g.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, s, s);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
}

function Nebula({ glow }: { glow: THREE.Texture }) {
  const clouds = useMemo(
    () =>
      Array.from({ length: 4 }, (_, i) => ({
        pos: [(rnd(i) * 2 - 1) * 7, (rnd(i + 5) * 2 - 1) * 4, -3 - rnd(i + 9) * 4] as [number, number, number],
        scale: 5 + rnd(i + 12) * 6,
        speed: 0.04 + rnd(i + 15) * 0.06,
        phase: rnd(i + 18) * Math.PI * 2,
      })),
    []
  );
  const refs = useRef<(THREE.Sprite | null)[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    clouds.forEach((c, i) => {
      const s = refs.current[i];
      if (s) s.position.x = c.pos[0] + Math.sin(t * c.speed + c.phase) * 1.2;
    });
  });
  return (
    <group>
      {clouds.map((c, i) => (
        <sprite key={i} ref={(el) => (refs.current[i] = el)} position={c.pos} scale={[c.scale, c.scale, 1]}>
          <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} opacity={0.5} />
        </sprite>
      ))}
    </group>
  );
}

function Shards({ count }: { count: number }) {
  const geo = useMemo(() => new THREE.OctahedronGeometry(1, 0), []);
  const mat = useMemo(
    () =>
      new THREE.MeshStandardMaterial({
        color: "#9fd0ff",
        metalness: 0.7,
        roughness: 0.12,
        flatShading: true,
        envMapIntensity: 1.8,
        emissive: new THREE.Color("#0b2f7a"),
        emissiveIntensity: 0.5,
      }),
    []
  );
  const shards = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        pos: [(rnd(i) * 2 - 1) * 8, (rnd(i + 10) * 2 - 1) * 5, (rnd(i + 20) * 2 - 1) * 3 - 1] as [number, number, number],
        scale: 0.1 + rnd(i + 30) * 0.3,
        speed: 0.25 + rnd(i + 40) * 0.6,
        phase: rnd(i + 50) * Math.PI * 2,
      })),
    [count]
  );
  const refs = useRef<(THREE.Mesh | null)[]>([]);
  useFrame((state, dt) => {
    const t = state.clock.elapsedTime;
    shards.forEach((s, i) => {
      const m = refs.current[i];
      if (!m) return;
      m.rotation.x += dt * s.speed * 0.3;
      m.rotation.y += dt * s.speed * 0.45;
      m.position.y = s.pos[1] + Math.sin(t * s.speed + s.phase) * 0.3;
    });
  });
  return (
    <group>
      {shards.map((s, i) => (
        <mesh key={i} ref={(el) => (refs.current[i] = el)} geometry={geo} material={mat} position={s.pos} scale={s.scale} />
      ))}
    </group>
  );
}

/** Pointer/touch parallax — layers offset by different amounts for depth. */
function Parallax({ children, factor }: { children: ReactNode; factor: number }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const g = ref.current;
    if (!g) return;
    const px = state.pointer.x * factor;
    const py = state.pointer.y * factor;
    g.position.x += (px - g.position.x) * 0.04;
    g.position.y += (py - g.position.y) * 0.04;
  });
  return <group ref={ref}>{children}</group>;
}

export default function BrandHeroScene({
  active = true,
  quality = "high",
  onReady,
}: {
  active?: boolean;
  quality?: "high" | "low";
  onReady?: () => void;
}) {
  const glow = useGlowTexture();
  const low = quality === "low";
  return (
    <Canvas
      dpr={low ? [1, 1.3] : [1, 1.75]}
      frameloop={active ? "always" : "never"}
      camera={{ position: [0, 0, 9], fov: 40 }}
      gl={{ antialias: !low, alpha: false, powerPreference: "high-performance" }}
      onCreated={() => onReady?.()}
    >
      <color attach="background" args={["#02030a"]} />
      <ambientLight intensity={0.5} />
      <pointLight position={[6, 4, 6]} intensity={30} color="#bcd9ff" />
      <pointLight position={[-6, -2, 4]} intensity={18} color="#2f80ff" />

      <Stars radius={60} depth={45} count={low ? 1400 : 3800} factor={4} saturation={0} fade speed={0.6} />
      <Nebula glow={glow} />

      <Parallax factor={0.6}>
        <Shards count={low ? 9 : 20} />
      </Parallax>

      <Sparkles count={low ? 40 : 110} scale={[16, 11, 8]} size={low ? 2.5 : 3.5} speed={0.3} color="#bcd9ff" opacity={0.7} noise={1.4} />

      <Environment resolution={128} frames={1}>
        <Lightformer intensity={3} position={[0, 4, 3]} scale={[10, 6, 1]} color="#ffffff" />
        <Lightformer intensity={2.5} position={[-6, 1, 3]} scale={[6, 8, 1]} color="#2f80ff" />
        <Lightformer intensity={2.5} position={[6, 1, 3]} scale={[6, 8, 1]} color="#cfe3ff" />
      </Environment>

      {!low && (
        <EffectComposer>
          <Bloom intensity={1.1} luminanceThreshold={0.25} luminanceSmoothing={0.9} mipmapBlur radius={0.8} />
        </EffectComposer>
      )}
    </Canvas>
  );
}
