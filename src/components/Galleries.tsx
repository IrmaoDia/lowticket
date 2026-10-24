import { useEffect, useRef, useState } from 'react';
import { previews, projectScenes } from '../config';
import { assetExists, Modal, SectionHeading } from './ui';

export function PageGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const carousel = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [dragging, setDragging] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const available = previews.map((preview, index) => assetExists(preview.image) ? index : -1).filter(index => index >= 0);
  useEffect(() => {
    const element = carousel.current;
    if (!element) return;
    const intersectionObserver = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: 0.2 });
    intersectionObserver.observe(element);
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const updatePreference = () => setReducedMotion(preference.matches);
    preference.addEventListener('change', updatePreference);
    return () => { intersectionObserver.disconnect(); preference.removeEventListener('change', updatePreference); };
  }, []);
  useEffect(() => {
    const element = carousel.current;
    if (!element || hovered || focused || dragging || !visible || reducedMotion || selected !== null) return;
    let frame = 0;
    let previousTime = 0;
    let position = element.scrollLeft;
    function advance(time: number) {
      if (!element) return;
      const cycleWidth = ((element.firstElementChild?.getBoundingClientRect().width || 0) + 20) * previews.length;
      if (previousTime && cycleWidth > 0) {
        position = (position + Math.min(time - previousTime, 64) * 0.04) % cycleWidth;
        element.scrollLeft = position;
      }
      previousTime = time;
      frame = window.requestAnimationFrame(advance);
    }
    frame = window.requestAnimationFrame(advance);
    return () => window.cancelAnimationFrame(frame);
  }, [hovered, focused, dragging, visible, reducedMotion, selected]);
  function changePreview(direction: number) {
    if (selected === null || available.length < 2) return;
    setSelected(available[(available.indexOf(selected) + direction + available.length) % available.length]);
  }
  return <section id="por-dentro" className="section section-cream">
    <div className="container">
      <SectionHeading eyebrow="UM GUIA PARA CADA ETAPA" title="Do Papelão ao Brinquedo Pronto, Passo a Passo." description="Veja como cada projeto é organizado para você acompanhar a construção do início ao acabamento." />
      <div className="page-carousel" ref={carousel} role="region" aria-roledescription="carrossel" aria-label="Páginas do guia" onMouseEnter={() => setHovered(true)} onMouseLeave={() => { setHovered(false); setDragging(false); }} onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false); }} onPointerDown={() => setDragging(true)} onPointerUp={() => setDragging(false)} onPointerCancel={() => setDragging(false)}>
        {[...previews, ...previews].map((preview, index) => <button className={`page-slide${index >= previews.length ? ' page-slide-copy' : ''}`} key={`${preview.image}-${index}`} disabled={!assetExists(preview.image)} aria-hidden={index >= previews.length ? true : undefined} tabIndex={index >= previews.length ? -1 : 0} aria-label={`Ampliar: ${preview.title}`} onClick={() => setSelected(index % previews.length)}>
          <img src={preview.image} alt={index >= previews.length ? '' : preview.title} width={1489} height={2105} loading="lazy" decoding="async" />
        </button>)}
      </div>
    </div>
    {selected !== null && <Modal title={previews[selected].title} onClose={() => setSelected(null)} wide><img className="enlarged-page" src={previews[selected].image} alt={previews[selected].title} />{available.length > 1 && <div className="modal-gallery-nav"><button className="button button-outline" onClick={() => changePreview(-1)}>Anterior</button><span>{available.indexOf(selected) + 1} de {available.length}</span><button className="button button-outline" onClick={() => changePreview(1)}>Próxima</button></div>}</Modal>}
  </section>;
}

export function ProjectGallery() {
  return <section id="projetos" className="section">
    <div className="container">
      <SectionHeading eyebrow="OS MUNDOS QUE VOCÊ PODE CRIAR" title="20 Projetos. Muitas Histórias Para Imaginar." />
      <div className="story-carousel" role="region" aria-roledescription="carrossel" aria-label="Crianças e mundos de brincar em papelão" tabIndex={0}>
        <div className="story-track">
          {[false, true].map(copy => <div className={`story-group${copy ? ' story-copy' : ''}`} key={String(copy)} aria-hidden={copy || undefined}>
            {projectScenes.map(scene => <img key={scene.image} src={scene.image} alt={copy ? '' : scene.alt} width={1254} height={1254} loading="lazy" decoding="async" draggable={false} />)}
          </div>)}
        </div>
      </div>
    </div>
  </section>;
}
