import Zap from "lucide-react/dist/esm/icons/zap";
import Film from "lucide-react/dist/esm/icons/film";
import BrandIcon from "@/components/ui/BrandIcon";

/**
 * Rend les icones de tech stack sans la pile FontAwesome.
 *
 * Avant : `@fortawesome/fontawesome-free/css/all.css` (~80 kB de CSS + 243 kB de
 * webfonts) plus le SVG core (~80 kB de JS), pour cinq icones. Ici tout est
 * inline ou tree-shake.
 *
 * Les cles correspondent aux classes deja presentes dans `data/galleryData.js`,
 * pour ne pas avoir a migrer les donnees.
 */
const BRAND_ICONS = {
  "fab fa-react": "react",
  "fab fa-css3-alt": "css3Alt",
  "fab fa-js-square": "jsSquare",
};

const LUCIDE_ICONS = {
  // FontAwesome n'a pas de logo Vite ni Framer Motion : l'auteur utilisait deja
  // des icones generiques (zap / film), on garde la meme intention.
  "fas fa-zap": Zap,
  "fas fa-film": Film,
};

export default function TechIcon({ icon, color, className = "" }) {
  const style = color ? { color } : undefined;

  const brandName = BRAND_ICONS[icon];
  if (brandName) {
    return <BrandIcon name={brandName} className={className} style={style} />;
  }

  const LucideIcon = LUCIDE_ICONS[icon];
  if (LucideIcon) {
    return (
      <LucideIcon
        size="1em"
        className={className}
        style={style}
        aria-hidden="true"
      />
    );
  }

  return null;
}
