import { faqs } from '../config';
import { Icon, SectionHeading } from './ui';

export function FAQ() {
  return <section id="duvidas" className="section faq-section"><div className="container faq-layout">
    <SectionHeading eyebrow="ANTES DE COMEÇAR" title="Uma ajudinha para suas dúvidas." description="Tudo o que você precisa saber sobre o material e os seus próximos projetos." />
    <div className="faq-list">{faqs.map(item => <details name="faq" key={item.question}><summary>{item.question}<Icon name="chevron" size={19} /></summary><p>{item.answer}</p></details>)}</div>
  </div></section>;
}

