import { brandIcons } from "@/data/brandIcons";

/**
 * Rend un logo de marque en SVG inline.
 *
 * Dimensionne en `1em` pour suivre la taille de police du parent, comme le
 * faisait FontAwesome.
 */
export default function BrandIcon({ name, className = "", style, title }) {
  const icon = brandIcons[name];
  if (!icon) return null;

  return (
    <svg
      viewBox={icon.viewBox}
      width="1em"
      height="1em"
      fill="currentColor"
      className={className}
      style={style}
      role={title ? "img" : undefined}
      aria-label={title || undefined}
      aria-hidden={title ? undefined : "true"}
      focusable="false"
    >
      <path d={icon.path} />
    </svg>
  );
}
