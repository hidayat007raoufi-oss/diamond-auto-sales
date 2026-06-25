import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "primary" | "ghost" | "ghost-dark";

const variants: Record<Variant, string> = {
  primary: "pill pill-blue",
  ghost: "pill pill-light",
  "ghost-dark": "pill pill-dark",
};

export default function Button({
  href,
  children,
  variant = "primary",
  className = "",
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  className?: string;
}) {
  return (
    <Link href={href} className={`${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
