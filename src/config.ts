/** Edite a oferta aqui. Não preencha URLs ou contatos fictícios. */
export const siteConfig = {
  name: 'Mini Mundos de Brincar',
  productName: 'Mini Mundos de Brincar — 20 Projetos em Papelão',
  pages: 242,
  projectCount: 20,
  guaranteeDays: 7,
  paymentLabel: 'Pagamento único. Sem mensalidade.',
  accessLabel: 'Material digital em PDF • Acesso após confirmação do pagamento',
  delivery: 'Receba as instruções de acesso no e-mail da compra e consulte o material digital.',
  guarantee: 'Você tem 7 dias após a compra para conhecer o material. Caso ele não atenda às suas expectativas, poderá solicitar o reembolso conforme as condições da garantia.',
  supportEmail: '',
  privacyUrl: '',
  termsUrl: '',
  // Só ative depois de produzir e revisar os quatro arquivos dos bônus.
  bonusesReady: false,
  plans: {
    essential: { name: 'Essencial', price: 19.9, checkoutUrl: '' },
    complete: { name: 'Completo', price: 37.9, checkoutUrl: '' },
  },
  images: {
    hero: '/assets/Kit Criativo Mini Mundos de Brincar.webp',
    product: '/assets/Mini Mundos de Brincar_ Livro Criativo.webp',
  },
  hero: {
    intro: '20 PROJETOS EM PAPELÃO • GUIA DIGITAL ILUSTRADO EM 3D',
    before: 'Transforme Papelão em um',
    highlight: 'Mundo de Brincadeiras',
    after: 'Que Seus Filhos Vão Lembrar!',
    description: 'Aprenda a criar cozinhas, mercadinhos, oficinas, teatros e muito mais com 20 projetos completos, medidas prontas e montagem passo a passo em 3D.',
    cta: 'QUERO ACESSAR OS 20 PROJETOS',
  },
};

export const previews = [
  { title: 'Cozinha: resultado e medidas', image: '/assets/01_cozinha_resultado_medidas.webp' },
  { title: 'Cozinha: plano de corte', image: '/assets/02_cozinha_plano_de_corte.webp' },
  { title: 'Cozinha: passo a passo em 3D', image: '/assets/03_cozinha_passo_a_passo_3d.webp' },
  { title: 'Mercadinho: resultado em 3D', image: '/assets/04_mercadinho_resultado_3d.webp' },
  { title: 'Teatro: montagem em 3D', image: '/assets/05_teatro_montagem_3d.webp' },
] as const;

export const projectScenes = [
  { image: '/assets/crianca1.webp', alt: 'Criança brincando em um foguete de papelão' },
  { image: '/assets/crianca2.webp', alt: 'Crianças brincando em um castelo de papelão' },
  { image: '/assets/crianca3.webp', alt: 'Crianças e cenários de faz de conta em papelão' },
  { image: '/assets/crianca4.webp', alt: 'Um mundo de brincadeiras com cenários de papelão' },
  { image: '/assets/crianca5.webp', alt: 'Imaginação e brincadeiras com brinquedos de papelão' },
] as const;

export const benefits = [
  { title: 'Medidas prontas', description: 'Altura, largura, profundidade e dimensões das peças para acompanhar os cortes.', icon: 'ruler' },
  { title: 'Lista de materiais', description: 'Veja os materiais e ferramentas indicados para cada projeto.', icon: 'clipboard' },
  { title: 'Montagem em 3D', description: 'Acompanhe a construção com imagens progressivas, do início ao resultado final.', icon: 'layers' },
  { title: 'Detalhes explicados', description: 'Instruções para montar portas, prateleiras, balcões, placas e outros acessórios de cada brinquedo.', icon: 'puzzle' },
] as const;

export const bonuses = [
  { title: 'Kit de personalização', cover: 'Para dar o seu toque.', subtitle: 'PARA IMPRIMIR', description: 'Placas de lojas, cardápios, etiquetas e elementos decorativos para personalizar os cenários.', icon: 'tags' },
  { title: 'Moldes extras de acessórios', cover: 'Pequenos detalhes. Grandes histórias.', subtitle: 'MOLDES EXTRAS', description: 'Moldes complementares de alimentos cenográficos, embalagens e objetos de faz de conta para ampliar as brincadeiras.', icon: 'scissors' },
  { title: 'Guia de acabamentos criativos', cover: 'Mais cor para imaginar.', subtitle: 'ACABAMENTOS CRIATIVOS', description: 'Ideias de cores, pinturas, revestimentos e detalhes para transformar o papelão em brinquedos mais bonitos.', icon: 'palette' },
  { title: '50 ideias de brincadeiras', cover: 'O próximo capítulo é brincar.', subtitle: '50 IDEIAS DE BRINCADEIRAS', description: 'Atividades e pequenas histórias para aproveitar os cenários depois de prontos.', icon: 'sparkles' },
].map((bonus, index) => ({ ...bonus, id: index + 1, image: `/assets/bonus${String(index + 1).padStart(2, '0')}.webp` }));

export const faqs = [
  { question: 'Os projetos são feitos com madeira ou papelão?', answer: 'Todos os projetos foram desenvolvidos para montagem com papelão ondulado reforçado e materiais complementares indicados no manual.' },
  { question: 'Nunca construí um brinquedo. Vou conseguir acompanhar?', answer: 'Os projetos possuem listas de peças, medidas e etapas ilustradas em 3D para orientar a montagem. A dificuldade varia conforme o modelo.' },
  { question: 'Preciso ter ferramentas profissionais?', answer: 'Não. Os materiais utilizam ferramentas manuais comuns, como régua, tesoura e estilete, além dos adesivos especificados. Cortes e cola quente devem ser manuseados exclusivamente por adultos.' },
  { question: 'Preciso imprimir o PDF?', answer: 'Não. Você pode consultar as páginas pelo celular, tablet ou computador. A impressão é opcional.' },
  { question: 'Os 20 projetos estão incluídos no plano básico?', answer: 'Sim. O plano básico contém os 20 projetos. O plano completo adiciona os quatro bônus.' },
  { question: 'Como recebo o material?', answer: 'O acesso digital é disponibilizado conforme as instruções enviadas após a confirmação do pagamento.' },
  { question: 'Os brinquedos podem suportar o peso das crianças?', answer: 'Não. São cenários de faz de conta, não estruturas para subir, sentar ou escalar. Adultos devem conferir a estabilidade, as medidas e o acabamento antes do uso, mantendo supervisão durante as brincadeiras.' },
];

export const formatPrice = (value: number) => new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
