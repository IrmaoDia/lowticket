import { siteConfig } from '../config';
import { Asset, Icon, OfferLink } from './ui';

export function Header() {
  return <>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="announcement">{siteConfig.hero.intro}</div>
  </>;
}

export function ProductMockup({ hero = false }: { hero?: boolean }) {
  return <Asset src={hero ? siteConfig.images.hero : siteConfig.images.product} alt={hero ? 'Mockup do catálogo Mini Mundos de Brincar com páginas internas e projetos em papelão' : 'Catálogo digital Mini Mundos de Brincar, 242 páginas e 20 projetos em papelão'} className={`product-mockup ${hero ? 'hero-mockup' : 'catalog-mockup'}`} eager={hero}>
    <div className="mockup-stage" role="img" aria-label="Representação provisória da capa. Mockup original ainda não disponibilizado.">
      <div className="mockup-arch" />
      <div className="back-sheet sheet-one"><Icon name="ruler" size={42} /><span>MEDIDAS & PLANOS DE CORTE</span><small>Prévia em breve</small></div>
      <div className="back-sheet sheet-two"><Icon name="layers" size={42} /><span>MONTAGEM ILUSTRADA EM 3D</span><small>Prévia em breve</small></div>
      <div className="book-wrap"><div className="book-spine" /><div className="book-cover">
        <span className="book-kicker">UM CONVITE À IMAGINAÇÃO</span>
        <span className="book-title">mini<br />mundos<span>de brincar.</span></span>
        <div className="cover-emblem"><Icon name="box" size={94} /><span className="cover-spark spark-one">+</span><span className="cover-spark spark-two">✧</span></div>
        <span className="book-description">20 projetos em papelão<br />para criar com as próprias mãos.</span>
        <span className="book-footer">GUIA DIGITAL ILUSTRADO EM 3D<span>242 PÁGINAS</span></span>
      </div><div className="book-pages" /></div>
      <div className="mockup-seal"><strong>20</strong><span>PROJETOS EM<br />PAPELÃO</span></div>
      <span className="mockup-caption"><span />Capa ilustrativa · imagens do material em breve</span>
    </div>
  </Asset>;
}

export function Hero() {
  return <section className="hero" id="inicio" aria-labelledby="hero-title">
    <div className="container hero-grid" id="conteudo">
      <div className="hero-copy">
        <h1 id="hero-title">{siteConfig.hero.before} <em>{siteConfig.hero.highlight}</em> {siteConfig.hero.after}</h1>
        <Asset src={siteConfig.images.hero} alt="Kit Criativo Mini Mundos de Brincar: catálogo de 20 projetos em papelão e os quatro bônus" className="hero-art" eager>
          <div className="page-placeholder"><Icon name="file" size={46} /><span>Imagem do Kit Criativo Mini Mundos de Brincar</span></div>
        </Asset>
        <p>{siteConfig.hero.description}</p>
        <OfferLink>{siteConfig.hero.cta}</OfferLink>
        <span className="hero-fineprint"><Icon name="file" size={15} />{siteConfig.accessLabel}</span>
      </div>
    </div>
    <div className="container hero-benefits">
      {['20 projetos ilustrados em 3D', 'Medidas e planos de corte', 'Feitos com papelão', 'Consulte pelo celular ou computador'].map(text => <span key={text}><Icon name="check" size={18} />{text}</span>)}
    </div>
  </section>;
}
