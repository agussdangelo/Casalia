import type { CSSProperties, ReactNode } from "react";
import type { ImageRegion } from "../../data/home";

export type IconName = "cart" | "close" | "check" | "menu" | "chevron" | "heart" | "whatsapp" | "instagram" | "minus" | "plus";

const paths: Record<IconName, ReactNode> = {
  cart: <><path d="M3 3h2l2.2 11.2a2 2 0 0 0 2 1.6h8.4a2 2 0 0 0 2-1.6L21 7H6" /><circle cx="10" cy="20" r="1" /><circle cx="18" cy="20" r="1" /></>,
  close: <><path d="m6 6 12 12M18 6 6 18" /></>,
  check: <path d="m5 12 4 4L19 6" />,
  menu: <path d="M4 6h16M4 12h16M4 18h16" />,
  chevron: <path d="m9 5 7 7-7 7" />,
  heart: <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z" />,
  whatsapp: <><path d="M21 11.5a9 9 0 0 1-13.4 7.8L3 21l1.6-4.5A9 9 0 1 1 21 11.5Z" /><path d="M8 7c0 4 3 7 7 7l1-2-3-1-1 1-2-2 1-1-1-3-2 1Z" /></>,
  instagram: <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5h.01" /></>,
  minus: <path d="M5 12h14" />,
  plus: <path d="M5 12h14M12 5v14" />,
};

export function Icon({ name, className = "", filled = false }: { name: IconName; className?: string; filled?: boolean }) {
  return <svg className={`icon ${className}`} width="16" height="16" viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name]}</svg>;
}

export function Brand({ light = false }: { light?: boolean }) {
  return  <span className={`brand ${light ? "brand-light" : ""}`}>
            <svg className="brand-mark" viewBox="0 0 32 32" aria-hidden="true">
              <path fill="#ac4d29" d="M0 0h8v32H0z" />
              <path fill="currentColor" d="M8 0h24v8H8zm0 24h24v8H8z" />
              <path fill="#ac4d29" d="M13 12h12v8H13z" />
            </svg>
            <span>casalia</span>
          </span>;
}

// SVG view boxes reuse the supplied photography and keep its proportions.
// All controls, text, cards, and page layout are real HTML elements.
export function ReferenceImage({ region, alt, className = "" }: { region: ImageRegion; alt: string; className?: string }) {
  const sources = {
    home: { width: 1076, height: 862, file: "home-reference.png" },
    products: { width: 1086, height: 770, file: "products-reference.png" },
    designs: { width: 1082, height: 791, file: "designs-reference.png" },
  };
  const source = sources[region.source];
  const style: CSSProperties = {
    aspectRatio: `${region.width} / ${region.height}`,
  };
  return <svg className={`reference-image ${className}`} role="img" aria-label={alt} style={style} viewBox={`${region.x} ${region.y} ${region.width} ${region.height}`} preserveAspectRatio="xMidYMid slice"><image href={`/images/${source.file}`} width={source.width} height={source.height} /></svg>;
}
