# Mini Mundos de Brincar

Landing page em React + Vite + TypeScript. Projeto independente na pasta `mini-mundos`, preservando a página de Natal e todas as alterações existentes no repositório pai.

## Desenvolvimento

Requer Node.js 20.19+ ou 22.12+.

```sh
npm install
npm run dev
```

No PowerShell com execução de scripts bloqueada, use `npm.cmd` em vez de `npm`.

```sh
npm.cmd run dev
npm.cmd run build
npm.cmd run preview
```

`npm run build` verifica os tipos e gera a pasta `dist`. Publique `dist` em uma hospedagem estática. As páginas não dependem de servidor ou banco de dados.

## Configuração da oferta

Edite `src/config.ts` para alterar nome, preços, condições, textos, imagens, links HTTPS de checkout, e-mail de suporte e links dos documentos legais. Os preços iniciais são R$ 19,90 e R$ 37,90, pagamento único, sem parcelamento ou desconto inventado.

Os checkouts estão vazios, porque nenhum link foi fornecido. Os botões abrem uma mensagem acessível de indisponibilidade; não simulam pagamento, entrega ou compra concluída. Ao fornecer uma URL HTTPS real, o botão do Essencial passa a abrir o checkout. O Completo também exige `bonusesReady: true`: ative somente depois de produzir e revisar os quatro bônus. O e-mail de suporte, quando configurado, aparece no diálogo de indisponibilidade. O cabeçalho de navegação, o rodapé completo e as instruções de recebimento foram removidos a pedido. Os botões de compra têm efeito 3D e pulsação suave, desativada quando o dispositivo solicita movimento reduzido.

Atualize também os metadados em `index.html` se mudar o nome ou as características do produto.

## Imagens e conteúdo pendentes

O mockup fornecido `Kit Criativo Mini Mundos de Brincar.webp` está em `public/assets` e aparece logo abaixo do título principal e do título da oferta. A seção do catálogo usa `Mini Mundos de Brincar_ Livro Criativo.webp`. As cinco prévias fornecidas, as quatro capas `bonus01.webp` a `bonus04.webp` e as cinco cenas `crianca1.webp` a `crianca5.webp` também estão integradas. As cenas substituem o antigo grid de projetos, os filtros e o botão de expansão. A seção mantém o título e mostra somente um carrossel de imagens em loop da esquerda para a direita, sem legendas nem controles. As imagens originais são preservadas integralmente. O PDF continua pendente. Toda a tipografia da página usa Montserrat; os textos das imagens originais são preservados.

Consulte a lista completa em `public/assets/README.md` e `public/assets/pendencias.json`. Coloque os arquivos reais nessa pasta com os nomes previstos e reconstrua o projeto. A detecção ocorre durante o build com `import.meta.glob`, evitando requisições 404 dos arquivos ausentes. Imagens podem ter seus caminhos alterados no arquivo de configuração.

As imagens da página usam WebP, com as dimensões originais e transparência preservadas. As cinco páginas com textos e medidas e o selo da garantia usam compressão sem perdas; as demais usam qualidade 90. Os PNGs anteriores e as imagens sem uso na Mini Mundos foram removidos da pasta `img` do workspace. No celular, o selo fica acima do título da garantia, e o título e o texto ficam centralizados.

As cinco prévias usam `object-fit: contain`, preservando textos e medidas sem cortes, sem legendas ou numeração adicionadas pela página. O carrossel percorre as imagens em loop contínuo, sem controles visuais, enquanto está visível. Uma segunda sequência das mesmas imagens permite a passagem da última à primeira sem retorno visível; essas cópias são ocultadas de leitores de tela e da navegação por Tab. O movimento pausa ao passar o mouse, receber foco, abrir a ampliação ou interagir por toque. `prefers-reduced-motion` desativa a rolagem automática e as cópias, mantendo a navegação manual. A ampliação mostra a imagem no tamanho disponível, permite rolagem vertical e navegação entre as prévias, e pode ser fechada com Escape, botão Fechar ou clique no fundo. A presença das capas dos bônus não comprova que seus PDFs estão prontos: `bonusesReady` continua desativado.

## Antes de abrir as vendas

1. Adicionar e revisar o PDF original. Os mockups, as prévias e as imagens das seções atuais já foram fornecidos.
2. Produzir e revisar os quatro bônus antes de ativar `bonusesReady`.
3. Configurar os dois links de checkout, o contato de suporte e os documentos legais.
4. Conferir preço, garantia, acesso por e-mail e a entrega real na plataforma de pagamento.
5. Fazer uma compra de teste na plataforma escolhida. Esta landing page apenas direciona ao checkout; o pagamento, envio por e-mail e reembolso pertencem à plataforma.

## Verificação no navegador

Com `npm run dev -- --port 4173 --strictPort` em execução:

```sh
node scripts/verify.mjs
node scripts/verify-gallery.mjs
```

Os scripts usam Playwright com Chrome/Edge instalado, ou `BROWSER_EXECUTABLE` para informar outro caminho. Verificam os carrosséis, a direção e o loop das cenas, accordion, âncora do CTA, mensagens dos checkouts, fechamento por Escape, ausência de overflow em seis larguras de 320 a 1440 px e erros de JavaScript. Capturas locais ficam em `.qa/` (ignorado).
