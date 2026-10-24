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

Os checkouts estão vazios, porque nenhum link foi fornecido. Os botões abrem uma mensagem acessível de indisponibilidade; não simulam pagamento, entrega ou compra concluída. Ao fornecer uma URL HTTPS real, o botão do Essencial passa a abrir o checkout. O Completo também exige `bonusesReady: true`: ative somente depois de produzir e revisar os quatro bônus. Os documentos legais e o suporte ainda não foram fornecidos; seus botões informam essa pendência até receberem os destinos reais.

Atualize também os metadados em `index.html` se mudar o nome ou as características do produto.

## Imagens e conteúdo pendentes

O repositório original contém somente imagens e PDFs de produtos natalinos. Nenhuma imagem nem PDF do Mini Mundos foi disponibilizado. Não foram reutilizadas imagens de outros produtos, baixadas fotos genéricas ou geradas páginas fictícias. As capas em CSS são representações provisórias, identificadas como ilustrativas.

Consulte a lista completa em `public/assets/README.md` e `public/assets/pendencias.json`. Coloque os arquivos reais nessa pasta com os nomes previstos e reconstrua o projeto. A detecção ocorre durante o build com `import.meta.glob`, evitando requisições 404 dos arquivos ausentes. Imagens podem ter seus caminhos alterados no arquivo de configuração.

As quatro prévias do PDF usam `object-fit: contain`, preservando textos e medidas sem cortes. A ampliação é habilitada automaticamente quando o arquivo existe. O diálogo mostra a imagem no tamanho disponível, permite rolagem vertical e navegação entre as prévias, e pode ser fechado com Escape, botão Fechar ou clique no fundo.

## Antes de abrir as vendas

1. Adicionar o PDF original e as imagens reais do catálogo, dos 20 projetos e dos quatro bônus.
2. Produzir e revisar os quatro bônus antes de ativar `bonusesReady`.
3. Configurar os dois links de checkout, o contato de suporte e os documentos legais.
4. Conferir preço, garantia, acesso por e-mail e a entrega real na plataforma de pagamento.
5. Fazer uma compra de teste na plataforma escolhida. Esta landing page apenas direciona ao checkout; o pagamento, envio por e-mail e reembolso pertencem à plataforma.

## Verificação no navegador

Com `npm run dev -- --port 4173 --strictPort` em execução:

```sh
node scripts/verify.mjs
```

O script usa Playwright com Chrome/Edge instalado, ou `BROWSER_EXECUTABLE` para informar outro caminho. Verifica os 20 projetos, filtros, accordion, menus e âncoras, mensagens dos checkouts, fechamento por Escape, ausência de overflow em 320/375/768/1440 px e erros de JavaScript. Capturas locais ficam em `.qa/` (ignorado).
