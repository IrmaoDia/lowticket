# Imagens do produto

Arquivos fornecidos e integrados:

- `Kit Criativo Mini Mundos de Brincar.png`: primeira dobra, abaixo do título.
- `Mini Mundos de Brincar_ Livro Criativo.png`: mockup da seção do catálogo.
- `01_cozinha_resultado_medidas.png`
- `02_cozinha_plano_de_corte.png`
- `03_cozinha_passo_a_passo_3d.png`
- `04_mercadinho_resultado_3d.png`
- `05_teatro_montagem_3d.png`
- `bonus01.png`, `bonus02.png`, `bonus03.png`, `bonus04.png`: capas dos quatro bônus.
- `crianca1.png`, `crianca2.png`, `crianca3.png`, `crianca4.png`, `crianca5.png`: carrossel de cenas de brincar, em loop da esquerda para a direita.

As cinco prévias e as cinco cenas são exibidas integralmente em seus carrosséis, sem texto extra nas imagens. Todas as imagens exigidas pelo layout atual foram fornecidas. O antigo grid com vinte cards foi removido e não exige mais arquivos `projeto-01.png` a `projeto-20.png`.

Na origem, os arquivos 2 a 5 das cenas têm a extensão duplicada `.png.png`. As cópias em `public/assets` usam os nomes normalizados `crianca2.png` a `crianca5.png`, sem modificar os originais.

Use PNG ou WebP de boa qualidade. Para mudar extensões ou caminhos, edite `src/config.ts`. Prévia sugerida: pelo menos 1200 px de largura, sem cortar páginas ou medidas. Prefira PNG para páginas com texto; use transparência para mockups se disponível. Somente o mockup da primeira dobra usa carregamento imediato; as outras imagens usam lazy loading.
