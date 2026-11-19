"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type CSSProperties, type PointerEvent } from "react";
import styles from "./AutomotiveMotion.module.css";

const finishes = [
  { name: "Electric Blue", color: "#2861ff", hue: 0 },
  { name: "Candy Red", color: "#fb3153", hue: 115 },
  { name: "Acid Green", color: "#a4df34", hue: 215 },
];

function Coupe({ hue = 0, eager = false, onLoad }: { hue?: number; eager?: boolean; onLoad?: () => void }) {
  return (
    <Image
      src="/brand/tuner-coupe.webp"
      style={{ filter: `hue-rotate(${hue}deg)` }}
      fill
      alt=""
      sizes="(max-width: 800px) 96vw, 65vw"
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : undefined}
      onLoad={onLoad}
    />
  );
}

export function DriftScene() {
  const [take, setTake] = useState(0);
  const [ready, setReady] = useState(false);

  return (
    <div className={styles.driftScene}>
      <div className={styles.driftVisual} aria-hidden="true" data-playing={ready} key={take}>
        <div className={styles.track} />
        <div className={styles.lightTrails} />
        <div className={styles.smoke} />
        <div className={styles.driftCar}><Coupe eager onLoad={() => setReady(true)} /></div>
      </div>
      <button type="button" disabled={!ready} onClick={() => setTake((value) => value + 1)} className={styles.replay}>
        Replay drift
      </button>
    </div>
  );
}

export function WrapStudio() {
  const studio = useRef<HTMLDivElement>(null);
  const [wrap, setWrap] = useState({ from: 0, to: 0, pass: 0 });
  const finish = finishes[wrap.to];

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const element = studio.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      setWrap((current) => current.pass === 0 ? { from: 0, to: 1, pass: 1 } : current);
      observer.disconnect();
    }, { threshold: 0.55 });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  function setLighting(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    event.currentTarget.style.setProperty("--light-x", `${(event.clientX - box.left) / box.width * 100}%`);
  }

  return (
    <div className={styles.studio} ref={studio} style={{ "--finish": finish.color } as CSSProperties}>
      <div className={styles.booth} onPointerMove={setLighting} aria-hidden="true">
        <div className={styles.boothFloor} />
        <div className={styles.wrapCar}>
          <Coupe hue={finishes[wrap.from].hue} />
          <div key={wrap.pass} className={styles.wrapPass} data-sweep={wrap.pass > 0}>
            <Coupe hue={finish.hue} />
            <span className={styles.filmEdge} />
          </div>
        </div>
      </div>
      <div className={styles.controls}>
        <p className={styles.finishName} aria-live="polite">{finish.name}</p>
        <div className={styles.swatches} role="group" aria-label="Preview a wrap color">
          {finishes.map((item, index) => (
            <button
              key={item.name}
              type="button"
              aria-label={item.name}
              aria-pressed={wrap.to === index}
              title={item.name}
              className={styles.swatch}
              style={{ "--swatch": item.color } as CSSProperties}
              onClick={() => setWrap((current) => current.to === index ? current : { from: current.to, to: index, pass: current.pass + 1 })}
            ><span /></button>
          ))}
        </div>
        <button
          type="button"
          className={styles.wrapReplay}
          onClick={() => setWrap((current) => ({
            from: current.to === 0 ? 1 : 0,
            to: current.to,
            pass: current.pass + 1,
          }))}
        >
          Replay wrap
        </button>
      </div>
    </div>
  );
}
