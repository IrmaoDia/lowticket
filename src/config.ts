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
    hero: '/assets/Kit Criativo Mini Mundos de Brincar.png',
    product: '/assets/Mini Mundos de Brincar_ Livro Criativo.png',
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
  { title: 'Cozinha: resultado e medidas', image: '/assets/01_cozinha_resultado_medidas.png' },
  { title: 'Cozinha: plano de corte', image: '/assets/02_cozinha_plano_de_corte.png' },
  { title: 'Cozinha: passo a passo em 3D', image: '/assets/03_cozinha_passo_a_passo_3d.png' },
  { title: 'Mercadinho: resultado em 3D', image: '/assets/04_mercadinho_resultado_3d.png' },
  { title: 'Teatro: montagem em 3D', image: '/assets/05_teatro_montagem_3d.png' },
] as const;

export const projects = [
  { name: 'Mini Cozinha Infantil', theme: 'Pequenos Chefs', icon: 'chef' },
  { name: 'Mini Cafeteria', theme: 'Pequenos Chefs', icon: 'coffee' },
  { name: 'Pizzaria Infantil', theme: 'Pequenos Chefs', icon: 'pizza' },
  { name: 'Estação de Confeitaria', theme: 'Pequenos Chefs', icon: 'cake' },
  { name: 'Mercadinho Infantil', theme: 'Pequenos Comerciantes', icon: 'store' },
  { name: 'Quitanda de Frutas', theme: 'Pequenos Comerciantes', icon: 'apple' },
  { name: 'Doceria Infantil', theme: 'Pequenos Comerciantes', icon: 'cake' },
  { name: 'Sorveteria Infantil', theme: 'Pequenos Comerciantes', icon: 'icecream' },
  { name: 'Mini Padaria', theme: 'Pequenos Comerciantes', icon: 'croissant' },
  { name: 'Oficina de Ferramentas', theme: 'Pequenos Profissionais', icon: 'tools' },
  { name: 'Clínica Veterinária', theme: 'Pequenos Profissionais', icon: 'paw' },
  { name: 'Salão de Beleza Infantil', theme: 'Pequenos Profissionais', icon: 'scissors' },
  { name: 'Ateliê de Pintura', theme: 'Pequenos Profissionais', icon: 'palette' },
  { name: 'Teatro de Fantoches', theme: 'Pequenos Sonhadores', icon: 'theater' },
  { name: 'Mini Cinema', theme: 'Pequenos Sonhadores', icon: 'film' },
  { name: 'Castelo Cenográfico', theme: 'Pequenos Sonhadores', icon: 'castle' },
  { name: 'Estação Espacial', theme: 'Pequenos Sonhadores', icon: 'rocket' },
  { name: 'Lojinha Portátil', theme: 'Compactos e Versáteis', icon: 'shopping' },
  { name: 'Balcão 2 em 1', theme: 'Compactos e Versáteis', icon: 'panels' },
  { name: 'Cenário Modular de Faz de Conta', theme: 'Compactos e Versáteis', icon: 'blocks' },
].map((project, index) => ({ ...project, id: index + 1, image: `/assets/projeto-${String(index + 1).padStart(2, '0')}.png` }));

export const featuredProjectIds = [1, 5, 3, 8, 10, 14];
export const themes = [...new Set(projects.map(project => project.theme))];

export const projectScenes = [
  { image: '/assets/crianca1.png', alt: 'Criança brincando em um foguete de papelão' },
  { image: '/assets/crianca2.png', alt: 'Crianças brincando em um castelo de papelão' },
  { image: '/assets/crianca3.png', alt: 'Crianças e cenários de faz de conta em papelão' },
  { image: '/assets/crianca4.png', alt: 'Um mundo de brincadeiras com cenários de papelão' },
  { image: '/assets/crianca5.png', alt: 'Imaginação e brincadeiras com brinquedos de papelão' },
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
].map((bonus, index) => ({ ...bonus, id: index + 1, image: `/assets/bonus${String(index + 1).padStart(2, '0')}.png` }));

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
