"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

/** Routes that render full-bleed (no global header / footer / sticky bar). */
const FULL_BLEED = ["/experience"];

export default function ChromeGate({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const hidden = !!pathname && FULL_BLEED.some((p) => pathname === p || pathname.startsWith(`${p}/`));
  if (hidden) return null;
  return <>{children}</>;
}
