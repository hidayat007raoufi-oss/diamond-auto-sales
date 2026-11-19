"use client";

import Image from "next/image";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { DriftScene } from "./AutomotiveMotion";
import styles from "./ShopEntrance.module.css";

export default function ShopEntrance({ children }: { children: ReactNode }) {
  const scene = useRef<HTMLDivElement>(null);

  function lookAround(event: PointerEvent<HTMLElement>) {
    if (event.pointerType !== "mouse" || !scene.current) return;
    const { left, top, width, height } = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    scene.current.style.setProperty("--look-x", `${x * 3.5}deg`);
    scene.current.style.setProperty("--look-y", `${y * -2.5}deg`);
  }

  function resetView() {
    scene.current?.style.removeProperty("--look-x");
    scene.current?.style.removeProperty("--look-y");
  }

  return (
    <section className={styles.entrance} aria-labelledby="repair-title" onPointerMove={lookAround} onPointerLeave={resetView}>
      <div className={styles.viewport} ref={scene} aria-hidden="true">
        <div className={styles.camera}>
          <div className={styles.shop}>
            <Image
              src="/brand/shop-entrance.webp"
              alt=""
              fill
              sizes="100vw"
              preload
            />
          </div>
          <div className={styles.bayFrame} />
          <div className={styles.nearFrame} />
        </div>
      </div>
      <DriftScene />
      <div className={styles.shade} aria-hidden="true" />
      <div className={styles.content}>{children}</div>
    </section>
  );
}
