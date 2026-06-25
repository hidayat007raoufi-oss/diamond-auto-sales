/**
 * Social profile links.
 *
 * TODO: replace the placeholder `href` values below with Diamond Auto's real
 * profile URLs. Nothing else needs to change — the header (and anywhere else
 * that imports SOCIAL_LINKS) updates automatically.
 *
 * `icon` selects which inline SVG to render (see Header.tsx ICONS map).
 */
export type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "facebook";
};

export const SOCIAL_LINKS: SocialLink[] = [
  { label: "Instagram", href: "https://instagram.com", icon: "instagram" },
  { label: "Facebook", href: "https://facebook.com", icon: "facebook" },
];
