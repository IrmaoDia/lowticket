import { useState } from 'react';
import { faqs, siteConfig } from '../config';
import { Icon, Logo, Modal, SectionHeading } from './ui';
import { isCheckoutUrl } from './Offers';

export function FAQ() {
  return <section id="duvidas" className="section faq-section"><div className="container faq-layout">
    <SectionHeading eyebrow="ANTES DE COMEÇAR" title="Uma ajudinha para suas dúvidas." description="Tudo o que você precisa saber sobre o material e os seus próximos projetos." />
    <div className="faq-list">{faqs.map(item => <details name="faq" key={item.question}><summary>{item.question}<Icon name="chevron" size={19} /></summary><p>{item.answer}</p></details>)}</div>
  </div></section>;
}

type FooterInfo = 'privacy' | 'terms' | 'support';
const infoTitles = { privacy: 'Política de Privacidade', terms: 'Termos de Uso', support: 'Contato de suporte' };

export function Footer() {
  const [info, setInfo] = useState<FooterInfo | null>(null);
  return <footer className="footer"><div className="container">
    <div className="footer-main"><div><Logo light /><p>Um pouco de papelão.<br />Um mundo inteiro de possibilidades.</p></div><div className="footer-product"><span>FEITO PARA IMAGINAR</span><p>Produto digital em PDF.<br />Material para uso pessoal.</p></div><nav className="footer-links" aria-label="Informações e suporte">
      {siteConfig.supportEmail ? <a href={`mailto:${siteConfig.supportEmail}`}>Contato de suporte</a> : <button onClick={() => setInfo('support')}>Contato de suporte</button>}
      {isCheckoutUrl(siteConfig.privacyUrl) ? <a href={siteConfig.privacyUrl}>Política de Privacidade</a> : <button onClick={() => setInfo('privacy')}>Política de Privacidade</button>}
      {isCheckoutUrl(siteConfig.termsUrl) ? <a href={siteConfig.termsUrl}>Termos de Uso</a> : <button onClick={() => setInfo('terms')}>Termos de Uso</button>}
    </nav></div>
    <div className="footer-bottom"><span>© {new Date().getFullYear()} {siteConfig.name}. Todos os direitos reservados.</span><a href="#inicio">Voltar ao início<Icon name="arrow" size={15} /></a></div>
  </div>
    {info && <Modal title={infoTitles[info]} onClose={() => setInfo(null)}><p>{info === 'support' ? 'O canal de atendimento será disponibilizado antes da abertura das vendas.' : 'Este documento será disponibilizado antes da abertura das vendas.'}</p><button className="button button-outline modal-dismiss" onClick={() => setInfo(null)}>FECHAR</button></Modal>}
  </footer>;
}
