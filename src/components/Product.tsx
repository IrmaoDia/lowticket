import { benefits, bonuses, siteConfig } from '../config';
import { ProductMockup } from './Hero';
import { Asset, Icon, OfferLink, SectionHeading } from './ui';

export function Benefits() {
  return <section className="section section-blue"><div className="container">
    <SectionHeading light eyebrow="MENOS DÚVIDAS. MAIS CRIAÇÃO." title="Tudo Organizado Para Você Começar Seu Projeto" />
    <div className="benefit-grid">{benefits.map(benefit => <article className="benefit-card" key={benefit.title}><span className="benefit-icon"><Icon name={benefit.icon} size={28} /></span><h3>{benefit.title}</h3><p>{benefit.description}</p></article>)}</div>
    <div className="center-action"><OfferLink>QUERO COMEÇAR MEU PRIMEIRO PROJETO</OfferLink></div>
  </div></section>;
}

export function Product() {
  return <section className="section section-cream"><div className="container product-grid">
    <ProductMockup />
    <div className="product-text"><span className="eyebrow">FEITO PARA CONSULTAR. FEITO PARA CRIAR.</span><h2>Seu Catálogo de Projetos Está Aqui.</h2><p>20 projetos de brinquedos e cenários de faz de conta feitos com papelão, reunidos em um manual digital para consultar sempre que precisar.</p>
      <ul className="product-list">{[`${siteConfig.pages} páginas em PDF.`, `${siteConfig.projectCount} projetos organizados em cinco temas.`, 'Planos de corte e dimensões.', 'Etapas de montagem ilustradas em 3D.', 'Acesso pelo celular, tablet ou computador.'].map(item => <li key={item}><Icon name="check" size={18} />{item}</li>)}</ul>
      <a className="text-link" href="#ofertas">Encontrar meu pacote<Icon name="arrow" size={18} /></a>
    </div>
  </div></section>;
}

export function Bonuses() {
  return <section className="section section-blue bonuses-section"><div className="container">
    <SectionHeading light eyebrow="UM POUCO MAIS DE IMAGINAÇÃO" title="4 Bônus Para Deixar as Brincadeiras Ainda Mais Criativas" description="Inclusos no Pacote Completo." />
    <div className="bonus-grid">{bonuses.map(bonus => <article className={`bonus-card bonus-${bonus.id}`} key={bonus.id}>
      <Asset src={bonus.image} alt={`Capa do bônus ${bonus.id}: ${bonus.title}`} className="bonus-image"><div className="bonus-cover"><span className="bonus-cover-brand">mini mundos<span>DE BRINCAR</span></span><Icon name={bonus.icon} size={47} /><span className="bonus-cover-title">{bonus.cover}</span><span className="bonus-cover-subtitle">{bonus.subtitle}</span><span className="bonus-cover-note">CAPA ILUSTRATIVA</span></div></Asset>
      <div className="bonus-copy"><span className="bonus-number">BÔNUS 0{bonus.id}</span><h3>{bonus.title}</h3><p>{bonus.description}</p><span className="bonus-included"><Icon name="check" size={13} />INCLUSO NO PACOTE COMPLETO</span></div>
    </article>)}</div>
    {!siteConfig.bonusesReady && <p className="section-note light-note">Complementos em preparação. O Pacote Completo será liberado após a conclusão dos quatro bônus.</p>}
  </div></section>;
}
