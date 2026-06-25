"use client";

import { Canvas } from "@react-three/fiber";
import { ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox } from "@react-three/drei";
import { Suspense, useState } from "react";

/* ------------------------------------------------------------------ *
 * Real-time paint finishes. Selecting one swaps the body material
 * color live (no reload). Swap the procedural CarMesh below for a real
 * GLB (useGLTF) when a licensed BMW M3 model is available — the paint
 * picker just needs to target the body material(s).
 * ------------------------------------------------------------------ */
const PAINTS = [
  { name: "Alpine White", hex: "#e9eaee" },
  { name: "Frozen Black", hex: "#16171b" },
  { name: "Diamond Blue", hex: "#0071e3" },
  { name: "Carbon Grey", hex: "#6c7177" },
  { name: "Imola Red", hex: "#b42233" },
] as const;

/** Stylized low-poly coupe — placeholder geometry with a paintable body. */
function CarMesh({ color }: { color: string }) {
  return (
    <group position={[0, 0, 0]} rotation={[0, -0.5, 0]}>
      {/* lower body — the painted surface */}
      <RoundedBox args={[3.7, 0.7, 1.65]} radius={0.22} smoothness={6} position={[0, 0.6, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.32} clearcoat={1} clearcoatRoughness={0.12} />
      </RoundedBox>

      {/* nose / hood taper */}
      <RoundedBox args={[1.3, 0.5, 1.5]} radius={0.18} smoothness={5} position={[1.45, 0.62, 0]} castShadow>
        <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.32} clearcoat={1} clearcoatRoughness={0.12} />
      </RoundedBox>

      {/* greenhouse / cabin (glass) */}
      <RoundedBox args={[1.95, 0.62, 1.42]} radius={0.16} smoothness={5} position={[-0.15, 1.12, 0]} castShadow>
        <meshPhysicalMaterial color="#0a0b0e" metalness={0.3} roughness={0.08} transmission={0.15} />
      </RoundedBox>

      {/* headlights */}
      {[-0.62, 0.62].map((z) => (
        <mesh key={z} position={[2.04, 0.66, z]}>
          <boxGeometry args={[0.08, 0.18, 0.34]} />
          <meshStandardMaterial color="#dfeaff" emissive="#bcd4ff" emissiveIntensity={0.5} />
        </mesh>
      ))}

      {/* wheels */}
      {([
        [1.25, 0.85],
        [1.25, -0.85],
        [-1.25, 0.85],
        [-1.25, -0.85],
      ] as const).map(([x, z]) => (
        <group key={`${x}-${z}`} position={[x, 0.42, z]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh castShadow>
            <cylinderGeometry args={[0.42, 0.42, 0.34, 32]} />
            <meshStandardMaterial color="#0c0d10" roughness={0.85} />
          </mesh>
          <mesh position={[0, 0.18, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 0.02, 24]} />
            <meshStandardMaterial color="#9aa0aa" metalness={0.9} roughness={0.25} />
          </mesh>
        </group>
      ))}
    </group>
  );
}

export default function Hero3D({ className = "" }: { className?: string }) {
  const [color, setColor] = useState<string>(PAINTS[0].hex);
  const [interacted, setInteracted] = useState(false);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [5, 1.9, 5.5], fov: 34 }}
        gl={{ antialias: true, alpha: true }}
        className="!h-full !w-full"
      >
        <Suspense fallback={null}>
          <CarMesh color={color} />

          {/* ground + contact shadow */}
          <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={16} blur={2.6} far={5} color="#000000" />

          {/* in-scene studio env (no external HDR) for metallic reflections */}
          <Environment resolution={256} frames={1}>
            <Lightformer intensity={2.2} position={[0, 5, -4]} scale={[12, 5, 1]} />
            <Lightformer intensity={1.3} position={[-5, 2, 3]} scale={[7, 7, 1]} />
            <Lightformer intensity={1.1} position={[5, 2, 3]} scale={[7, 7, 1]} />
            <Lightformer intensity={0.8} position={[0, -3, 2]} scale={[10, 4, 1]} />
          </Environment>

          <ambientLight intensity={0.35} />
          <directionalLight position={[6, 9, 4]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />
        </Suspense>

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom
          minDistance={4}
          maxDistance={10}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2 - 0.02}
          autoRotate={!interacted}
          autoRotateSpeed={0.5}
          target={[0, 0.6, 0]}
          onStart={() => setInteracted(true)}
        />
      </Canvas>

      {/* ---------- minimal Color Picker overlay ---------- */}
      <div className="pointer-events-none absolute inset-x-0 bottom-8 z-10 flex flex-col items-center gap-3 sm:bottom-10">
        <p className="text-[11px] font-medium uppercase tracking-[0.28em] text-white/55">
          {PAINTS.find((p) => p.hex === color)?.name}
        </p>
        <div className="pointer-events-auto flex items-center gap-3.5">
          {PAINTS.map((p) => {
            const active = p.hex === color;
            return (
              <button
                key={p.hex}
                onClick={() => setColor(p.hex)}
                aria-label={p.name}
                aria-pressed={active}
                className="grid place-items-center rounded-full p-0.5 transition-transform active:scale-90"
                style={{ boxShadow: active ? "0 0 0 1.5px #fff, 0 0 0 4px rgba(0,0,0,0.6)" : "0 0 0 1px rgba(255,255,255,0.25)" }}
              >
                <span className="block h-6 w-6 rounded-full" style={{ background: p.hex, boxShadow: "inset 0 0 0 1px rgba(255,255,255,0.14)" }} />
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
