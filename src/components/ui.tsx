import { useEffect, useRef, type ReactNode } from 'react';
import { Apple, ArrowRight, Blocks, Box, Castle, ChefHat, Check, ChevronDown, ClipboardList, Coffee, Croissant, FileText, Film, Gift, IceCreamBowl, Layers3, Menu, PackageOpen, PanelsTopLeft, Palette, Pause, PawPrint, Pizza, Play, Puzzle, Rocket, Ruler, Scissors, ShieldCheck, ShoppingBag, Sparkles, Store, Tags, Theater, Wrench, X, ZoomIn, type LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  apple: Apple, arrow: ArrowRight, blocks: Blocks, box: Box, castle: Castle,
  chef: ChefHat, check: Check, chevron: ChevronDown, clipboard: ClipboardList,
  coffee: Coffee, croissant: Croissant, file: FileText, film: Film, gift: Gift,
  icecream: IceCreamBowl, layers: Layers3, menu: Menu, package: PackageOpen,
  panels: PanelsTopLeft, palette: Palette, pause: Pause, paw: PawPrint, pizza: Pizza, play: Play,
  puzzle: Puzzle, rocket: Rocket, ruler: Ruler, scissors: Scissors,
  shield: ShieldCheck, shopping: ShoppingBag, sparkles: Sparkles,
  store: Store, tags: Tags, theater: Theater, tools: Wrench, x: X, zoom: ZoomIn,
};

export function Icon({ name, size = 24, className = '' }: { name: string; size?: number; className?: string }) {
  const Component = icons[name] || Box;
  return <Component size={size} strokeWidth={1.6} aria-hidden="true" className={className} />;
}

const assetPaths = new Set(Object.keys(import.meta.glob('/public/assets/*.{png,jpg,jpeg,webp,avif,svg}')).map(path => path.replace('/public', '')));
export const assetExists = (path: string) => assetPaths.has(path) || /^https:\/\//.test(path);

export function Asset({ src, alt, className = '', eager = false, children }: { src: string; alt: string; className?: string; eager?: boolean; children: ReactNode }) {
  return <div className={`asset ${className}`}>
    {assetExists(src) ? <img src={src} alt={alt} loading={eager ? 'eager' : 'lazy'} decoding="async" /> : children}
  </div>;
}

export function Logo({ light = false }: { light?: boolean }) {
  return <a className={`logo ${light ? 'logo-light' : ''}`} href="#inicio" aria-label="Mini Mundos de Brincar — início">
    <span className="logo-mark"><Icon name="box" size={29} /></span>
    <span>mini mundos<span className="logo-sub">DE BRINCAR</span></span>
  </a>;
}

export function OfferLink({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <a className={`button button-primary ${className}`} href="#ofertas">{children}<Icon name="arrow" size={19} /></a>;
}

export function SectionHeading({ eyebrow, title, description, light = false, children }: { eyebrow: string; title: string; description?: string; light?: boolean; children?: ReactNode }) {
  return <div className={`section-heading ${light ? 'heading-light' : ''}`}>
    <span className="eyebrow">{eyebrow}</span>
    <h2>{title}</h2>
    {children}
    {description && <p>{description}</p>}
  </div>;
}

export function Modal({ title, children, onClose, wide = false, className = '' }: { title: string; children: ReactNode; onClose: () => void; wide?: boolean; className?: string }) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    const previousOverflow = document.body.style.overflow;
    dialog?.showModal();
    document.body.style.overflow = 'hidden';
    return () => { dialog?.close(); document.body.style.overflow = previousOverflow; };
  }, []);
  return <dialog ref={ref} className={`modal ${wide ? 'modal-wide' : ''} ${className}`} onClose={event => { if (!event.currentTarget.open) onClose(); }} onClick={event => { if (event.target === event.currentTarget) onClose(); }} aria-labelledby="modal-title">
    <div className="modal-content">
      <div className="modal-header"><h2 id="modal-title">{title}</h2><button className="icon-button" onClick={onClose} aria-label="Fechar"><Icon name="x" /></button></div>
      {children}
    </div>
  </dialog>;
}
