"use client";

import { useEffect, useRef, useState, type CSSProperties, type ElementType, type ReactNode, type Ref } from "react";

/** Concrete prop shape so the polymorphic tag type-checks cleanly even under
 *  global JSX augmentation (e.g. from @react-three/fiber). */
type RevealTag = React.ComponentType<{
  ref?: Ref<HTMLElement>;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
}>;

type RevealProps = {
  children: ReactNode;
  /** ms delay before the reveal animates in. */
  delay?: number;
  /** Add a blur-in for extra depth. */
  blur?: boolean;
  className?: string;
  as?: ElementType;
};

/**
 * Scroll-triggered reveal. Adds `.is-visible` when the element enters the
 * viewport so the CSS in globals.css can animate opacity/transform/blur.
 */
export default function Reveal({
  children,
  delay = 0,
  blur = false,
  className = "",
  as,
}: RevealProps) {
  const Tag = (as ?? "div") as unknown as RevealTag;
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.16, rootMargin: "0px 0px -8% 0px" }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${blur ? "reveal-blur" : ""} ${visible ? "is-visible" : ""} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  );
}
