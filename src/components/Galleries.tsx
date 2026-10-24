import { useRef, useState } from 'react';
import { featuredProjectIds, previews, projects, themes } from '../config';
import { Asset, assetExists, Icon, Modal, SectionHeading } from './ui';

export function PageGallery() {
  const [selected, setSelected] = useState<number | null>(null);
  const carousel = useRef<HTMLDivElement>(null);
  const [activePage, setActivePage] = useState(0);
  const available = previews.map((preview, index) => assetExists(preview.image) ? index : -1).filter(index => index >= 0);
  function changePreview(direction: number) {
    if (selected === null || available.length < 2) return;
    setSelected(available[(available.indexOf(selected) + direction + available.length) % available.length]);
  }
  function navigate(index: number) {
    const target = carousel.current?.children[index] as HTMLElement | undefined;
    if (target && carousel.current) carousel.current.scrollTo({ left: target.offsetLeft - carousel.current.offsetLeft, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
  }
  return <section id="por-dentro" className="section section-cream">
    <div className="container">
      <SectionHeading eyebrow="UM GUIA PARA CADA ETAPA" title="Do Papelão ao Brinquedo Pronto, Passo a Passo." description="Veja como cada projeto é organizado para você acompanhar a construção do início ao acabamento." />
      <div className="preview-grid" ref={carousel} onScroll={() => {
        const el = carousel.current;
        if (el?.firstElementChild) setActivePage(Math.min(3, Math.max(0, Math.round(el.scrollLeft / (el.firstElementChild.clientWidth + 20)))));
      }}>
        {previews.map((preview, index) => <article className="preview-card" key={preview.title}>
          <button className="preview-image-button" disabled={!assetExists(preview.image)} aria-label={`Ampliar: ${preview.title}`} onClick={() => setSelected(index)}>
            <Asset src={preview.image} alt={`Página real do PDF: ${preview.title}`} className="preview-image">
              <div className="page-placeholder"><Icon name={preview.icon} size={46} /><span>Prévia da página<br />em breve</span></div>
            </Asset>
            {assetExists(preview.image) && <span className="zoom-hint"><Icon name="zoom" size={17} /></span>}
          </button>
          <div className="preview-copy"><span className="step-number">0{index + 1}</span><h3>{preview.title}</h3><p>{preview.description}</p></div>
        </article>)}
      </div>
      <div className="carousel-dots" aria-label="Navegar pelas prévias">{previews.map((item, index) => <button key={item.title} className={activePage === index ? 'active' : ''} aria-label={`Ver prévia ${index + 1}`} aria-current={activePage === index ? 'true' : undefined} onClick={() => navigate(index)} />)}</div>
      {available.length < previews.length && <p className="section-note"><Icon name="file" size={15} />As imagens reais das páginas serão disponibilizadas em breve.</p>}
    </div>
    {selected !== null && <Modal title={previews[selected].title} onClose={() => setSelected(null)} wide><img className="enlarged-page" src={previews[selected].image} alt={previews[selected].title} /><p className="modal-image-caption">{previews[selected].description}</p>{available.length > 1 && <div className="modal-gallery-nav"><button className="button button-outline" onClick={() => changePreview(-1)}>Anterior</button><span>{available.indexOf(selected) + 1} de {available.length}</span><button className="button button-outline" onClick={() => changePreview(1)}>Próxima</button></div>}</Modal>}
  </section>;
}

function ProjectCard({ project }: { project: typeof projects[number] }) {
  return <article className={`project-card theme-${themes.indexOf(project.theme)}`}>
    <Asset src={project.image} alt={`${project.name}: cenário de faz de conta construído em papelão`} className="project-image">
      <div className="project-placeholder"><Icon name={project.icon} size={58} /><span>IMAGEM DO PROJETO EM BREVE</span></div>
    </Asset>
    <div className="project-copy"><span className="project-theme">{project.theme}</span><h3>{project.name}</h3><span className="project-index">{String(project.id).padStart(2, '0')}</span></div>
  </article>;
}

export function ProjectGallery() {
  const [expanded, setExpanded] = useState(false);
  const [theme, setTheme] = useState('Todos os temas');
  const shown = expanded ? projects.filter(project => theme === 'Todos os temas' || project.theme === theme) : featuredProjectIds.map(id => projects.find(project => project.id === id)!);
  return <section id="projetos" className="section">
    <div className="container">
      <SectionHeading eyebrow="OS MUNDOS QUE VOCÊ PODE CRIAR" title="20 Projetos. Muitas Histórias Para Imaginar." description="Escolha o brinquedo que deseja construir e siga o projeto ilustrado." />
      {expanded && <div className="theme-filters" role="group" aria-label="Filtrar projetos por tema">{['Todos os temas', ...themes].map(item => <button key={item} aria-pressed={item === theme} className={item === theme ? 'active' : ''} onClick={() => setTheme(item)}>{item}</button>)}</div>}
      <div id="project-grid" className="project-grid">{shown.map(project => <ProjectCard key={project.id} project={project} />)}</div>
      <div className="center-action"><button className="button button-outline" aria-expanded={expanded} aria-controls="project-grid" onClick={() => { if (expanded) document.getElementById('projetos')?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' }); setExpanded(!expanded); setTheme('Todos os temas'); }}>{expanded ? 'MOSTRAR MENOS PROJETOS' : 'VER TODOS OS 20 PROJETOS'}<Icon name="chevron" size={18} className={expanded ? 'rotated' : ''} /></button><span className="action-note">Cinco temas. Infinitas possibilidades de faz de conta.</span></div>
    </div>
  </section>;
}
