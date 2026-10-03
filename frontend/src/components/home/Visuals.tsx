import type { CSSProperties } from "react";
import type { ImageRegion } from "../../data/home";

export { Icon, type IconName } from "../../shared/ui/Icon";

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
// Los productos del marketplace traen la URL de su miniatura en lugar de una región.
export function ReferenceImage({ region, alt, className = "" }: { region: ImageRegion | string; alt: string; className?: string }) {
  if (typeof region === "string") return <img className={`reference-image ${className}`} src={region} alt={alt} loading="lazy" style={{ objectFit: "cover" }} />;
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
