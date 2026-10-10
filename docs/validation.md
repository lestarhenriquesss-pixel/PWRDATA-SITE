# Validação de publicação

O site usa arquivos estáticos; não há etapa de compilação. Execute `node scripts/verify-site.mjs` com a prévia local rodando.

Antes da limpeza, os 13 testes de DOM do formulário e da divisão do footer passaram. Cobrem validação de campos, descrição de 4.000 caracteres, texto literal, expansão acessível, redimensionamento, movimento reduzido e alternância onda/reta. Esse teste e suas dependências temporárias foram preservados no histórico externo.

Os 21 arquivos da publicação tiveram SHA-256 comparado antes e depois da limpeza, sem alteração. A conferência local cobre scripts, IDs, âncoras, assets, JSON-LD, texto editorial e resposta parcial dos vídeos.

`vercel.json` define publicação estática de `site/`, sem instalação ou build. O deploy na conta do Vercel e a configuração do domínio serão feitos após importar o repositório.

A inspeção visual final da rodada anterior ficou pendente por indisponibilidade da ferramenta de navegador. Testes de DOM não representam renderização, Lighthouse ou homologação em aparelhos físicos.
