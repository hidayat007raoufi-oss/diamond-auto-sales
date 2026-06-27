"use client";

import { Canvas } from "@react-three/fiber";
import { Bounds, Center, ContactShadows, Environment, Lightformer, OrbitControls, RoundedBox, useBounds, useGLTF } from "@react-three/drei";
import { Component, Suspense, useEffect, useMemo, useState, type ReactNode } from "react";
import * as THREE from "three";

/* ------------------------------------------------------------------ *
 * MODEL
 * Drop your BMW M3 GLB at: public/models/bmw-m3.glb  (and COMMIT it so
 * the deploy serves it). Update MODEL_URL if your filename differs.
 *
 * The color picker recolors the body/paint material. For this model that
 * material is "BMW_E30_M3_PAINT" (matched via "bmw_e30_m3_paint"); generic
 * "carpaint"/"bodypaint" tokens keep it working for other models too.
 * Tokens are kept precise so trim like "BMW_E30_M3_BLACKOUT" is NOT caught.
 * If none match, a dev-console warning lists the model's material names.
 *
 * If the GLB is missing or fails to load, the viewer falls back to the
 * stylized placeholder so the experience never breaks.
 * ------------------------------------------------------------------ */
const MODEL_URL = "/models/bmw-m3.glb";
const BODY_MATCHES = ["bmw_e30_m3_paint", "carpaint", "car_paint", "bodypaint", "body_paint"];

const PAINTS = [
  { name: "Alpine White", hex: "#e9eaee" },
  { name: "Frozen Black", hex: "#16171b" },
  { name: "Diamond Blue", hex: "#0071e3" },
  { name: "Carbon Grey", hex: "#6c7177" },
  { name: "Imola Red", hex: "#b42233" },
] as const;

const isBodyMaterial = (name?: string) => {
  const n = (name ?? "").toLowerCase();
  return BODY_MATCHES.some((m) => n.includes(m));
};

/** Real model: loads the GLB, recolors the body material(s) live, auto-fits. */
function GltfCar({ color }: { color: string }) {
  const { scene } = useGLTF(MODEL_URL, true, true);
  const bounds = useBounds();

  const { object, bodyMats, scale } = useMemo(() => {
    const root = scene.clone(true);
    const bodyMats: THREE.MeshStandardMaterial[] = [];
    const allNames = new Set<string>();

    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      const next = mats.map((m) => {
        if (!m) return m;
        allNames.add(m.name);
        if (isBodyMaterial(m.name)) {
          const cloned = m.clone() as THREE.MeshStandardMaterial; // clone so we don't mutate the cache
          bodyMats.push(cloned);
          return cloned;
        }
        return m;
      });
      mesh.material = Array.isArray(mesh.material) ? next : next[0]!;
    });

    if (bodyMats.length === 0 && process.env.NODE_ENV !== "production") {
      console.warn(
        `[Hero3D] No body material matched (${BODY_MATCHES.join(", ")}). ` +
          `Materials found: ${[...allNames].join(", ") || "none"}`
      );
    }

    // Auto-fit any model size into a consistent on-screen scale.
    const box = new THREE.Box3().setFromObject(root);
    const size = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    return { object: root, bodyMats, scale: 3.6 / maxDim };
  }, [scene]);

  useEffect(() => {
    const c = new THREE.Color(color);
    bodyMats.forEach((m) => m.color.copy(c));
  }, [bodyMats, color]);

  // Re-frame the camera to the real model once it's mounted.
  useEffect(() => {
    bounds.refresh().clip().fit();
  }, [bounds, object]);

  return (
    <Center bottom>
      <primitive object={object} scale={scale} />
    </Center>
  );
}

/** Stylized fallback coupe — used until a real GLB is present. */
function ProceduralCar({ color }: { color: string }) {
  return (
    <group position={[0, 0, 0]} rotation={[0, -0.5, 0]}>
      <RoundedBox args={[3.7, 0.7, 1.65]} radius={0.22} smoothness={6} position={[0, 0.6, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.32} clearcoat={1} clearcoatRoughness={0.12} />
      </RoundedBox>
      <RoundedBox args={[1.3, 0.5, 1.5]} radius={0.18} smoothness={5} position={[1.45, 0.62, 0]} castShadow>
        <meshPhysicalMaterial color={color} metalness={0.6} roughness={0.32} clearcoat={1} clearcoatRoughness={0.12} />
      </RoundedBox>
      <RoundedBox args={[1.95, 0.62, 1.42]} radius={0.16} smoothness={5} position={[-0.15, 1.12, 0]} castShadow>
        <meshPhysicalMaterial color="#0a0b0e" metalness={0.3} roughness={0.08} transmission={0.15} />
      </RoundedBox>
      {[-0.62, 0.62].map((z) => (
        <mesh key={z} position={[2.04, 0.66, z]}>
          <boxGeometry args={[0.08, 0.18, 0.34]} />
          <meshStandardMaterial color="#dfeaff" emissive="#bcd4ff" emissiveIntensity={0.5} />
        </mesh>
      ))}
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

/** Falls back to the placeholder if the GLB is missing or errors. */
class ModelBoundary extends Component<{ fallback: ReactNode; children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    if (process.env.NODE_ENV !== "production") {
      console.warn(`[Hero3D] GLB at ${MODEL_URL} failed to load — using placeholder.`);
    }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children;
  }
}

export default function Hero3D({ className = "" }: { className?: string }) {
  const [color, setColor] = useState<string>(PAINTS[0].hex);
  const [interacted, setInteracted] = useState(false);

  return (
    <div className={`relative h-full w-full ${className}`}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [5, 2, 6], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        className="!h-full !w-full"
        // vertical swipe scrolls the page; horizontal swipe rotates the car
        style={{ touchAction: "pan-y" }}
      >
        {/* Bounds auto-frames the model (full car + wheels), refits on resize */}
        <Bounds fit clip observe margin={1.45}>
          <ModelBoundary fallback={<ProceduralCar color={color} />}>
            <Suspense fallback={<ProceduralCar color={color} />}>
              <GltfCar color={color} />
            </Suspense>
          </ModelBoundary>
        </Bounds>

        <ContactShadows position={[0, 0, 0]} opacity={0.55} scale={16} blur={2.6} far={5} color="#000000" />
        <Environment resolution={256} frames={1}>
          <Lightformer intensity={2.2} position={[0, 5, -4]} scale={[12, 5, 1]} />
          <Lightformer intensity={1.3} position={[-5, 2, 3]} scale={[7, 7, 1]} />
          <Lightformer intensity={1.1} position={[5, 2, 3]} scale={[7, 7, 1]} />
          <Lightformer intensity={0.8} position={[0, -3, 2]} scale={[10, 4, 1]} />
        </Environment>
        <ambientLight intensity={0.35} />
        <directionalLight position={[6, 9, 4]} intensity={1.3} castShadow shadow-mapSize={[1024, 1024]} />

        <OrbitControls
          makeDefault
          enablePan={false}
          enableZoom={false} /* let the mouse wheel / vertical swipe scroll the page */
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2 - 0.02}
          autoRotate={!interacted}
          autoRotateSpeed={0.5}
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

// Preload the model so it's ready the moment it exists at MODEL_URL.
useGLTF.preload(MODEL_URL);
