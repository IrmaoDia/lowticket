import { useState } from 'react';
import { formatPrice, siteConfig } from '../config';
import { Asset, Icon, Modal, SectionHeading } from './ui';

type PlanKey = keyof typeof siteConfig.plans;
export const isCheckoutUrl = (url: string) => {
  try { return new URL(url).protocol === 'https:'; } catch { return false; }
};

export function Offers() {
  const [selected, setSelected] = useState<PlanKey | null>(null);
  const features: Record<PlanKey, string[]> = {
    essential: ['20 projetos de brinquedos em papelão.', `PDF principal com ${siteConfig.pages} páginas.`, 'Medidas e planos de corte.', 'Montagem ilustrada em 3D.', 'Acesso digital após pagamento aprovado.', `Garantia de ${siteConfig.guaranteeDays} dias.`],
    complete: ['Tudo do Plano Essencial.', 'Bônus 01 — Kit de Personalização.', 'Bônus 02 — Moldes Extras.', 'Bônus 03 — Guia de Acabamentos.', 'Bônus 04 — 50 Ideias de Brincadeiras.', 'Acesso digital após pagamento aprovado.', `Garantia de ${siteConfig.guaranteeDays} dias.`],
  };
  function checkout(plan: PlanKey) {
    const url = siteConfig.plans[plan].checkoutUrl;
    if (isCheckoutUrl(url) && (plan === 'essential' || siteConfig.bonusesReady)) window.location.assign(url);
    else setSelected(plan);
  }
  return <section id="ofertas" className="section offers-section"><div className="container">
    <SectionHeading eyebrow="UM PEQUENO COMEÇO. UM MUNDO DE POSSIBILIDADES." title="Escolha Seu Pacote e Comece a Criar" description="Os 20 projetos estão nos dois planos. Escolha se quer levar também os complementos.">
      <Asset src={siteConfig.images.hero} alt="Kit Criativo Mini Mundos de Brincar com o catálogo e os quatro bônus" className="offer-mockup" children={null} />
    </SectionHeading>
    <div className="plans-grid">{(['essential', 'complete'] as const).map(key => {
      const plan = siteConfig.plans[key];
      return <article className={`plan-card ${key === 'complete' ? 'plan-complete' : ''}`} key={key}>
        {key === 'complete' && <span className="plan-seal">Mais<br />escolhido</span>}
        <div className="plan-topline"><span className="plan-category">SEU CATÁLOGO DIGITAL</span></div>
        <h3>Plano {plan.name}</h3><p className="plan-description">{key === 'essential' ? 'Tudo para construir seus primeiros mundos.' : 'Os projetos e um toque extra de criatividade.'}</p>
        <div className="price">{formatPrice(plan.price)}</div><p className="payment-label">{siteConfig.paymentLabel}</p>
        <ul className="plan-features">{features[key].map(feature => <li key={feature}><Icon name="check" size={17} /><span>{feature}</span></li>)}</ul>
        <button className="button button-primary" onClick={() => checkout(key)}>{key === 'essential' ? 'QUERO OS 20 PROJETOS' : 'QUERO O PACOTE COMPLETO'}<Icon name="arrow" size={18} /></button>
        <span className="plan-delivery"><Icon name="file" size={14} />Produto digital. Nenhum item físico é enviado.</span>
      </article>;
    })}</div>
    <p className="offers-note"><Icon name="shield" size={17} />{siteConfig.guaranteeDays} dias de garantia<span>•</span>Compra única<span>•</span>Material para uso pessoal</p>
    {selected && <Modal title={selected === 'complete' && !siteConfig.bonusesReady ? 'Pacote Completo em preparação' : 'As vendas ainda não estão abertas'} onClose={() => setSelected(null)}>
      <div className="status-icon"><Icon name="package" size={34} /></div>
      <p>{selected === 'complete' && !siteConfig.bonusesReady ? 'Estamos preparando os quatro bônus. O Pacote Completo ficará disponível quando todos os materiais e o pagamento estiverem prontos.' : 'O pagamento deste pacote ainda não está disponível. Volte em breve para adquirir seu catálogo digital.'}</p>
      <p className="modal-plan">Plano {siteConfig.plans[selected].name} · {formatPrice(siteConfig.plans[selected].price)} · pagamento único</p>
      {siteConfig.supportEmail && <a className="text-link" href={`mailto:${siteConfig.supportEmail}`}>Falar com o suporte<Icon name="arrow" size={17} /></a>}
      <button className="button button-primary modal-dismiss" onClick={() => setSelected(null)}>ENTENDI<Icon name="check" size={18} /></button>
    </Modal>}
  </div></section>;
}

export function Guarantee() {
  return <section className="section-cream guarantee-section"><div className="container guarantee-content">
    <div className="guarantee-block"><div className="guarantee-seal"><Icon name="shield" size={43} /><strong>{siteConfig.guaranteeDays}</strong><span>DIAS</span></div><div><h2>Garantia de {siteConfig.guaranteeDays} Dias</h2><p>{siteConfig.guarantee}</p></div></div>
  </div></section>;
}
