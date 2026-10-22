# Refinamento PWR — 22/10/2026

A versão anterior permanece na branch `codex/implementacao-v1-site-pwrdata`, em `ec12f80`. O experimento está em `codex/pwr-design-system-claro`, com prévia Docker local em http://127.0.0.1:4180/. Os sites publicados permanecem preservados.

## Direção e composição

A última orientação autoriza uma entrada escura para destacar a animação. Sem preferência salva, esse é o tema inicial; claro, escuro e automático continuam disponíveis. No modo claro, as regiões alternam materiais claros, escuros e cobre; no modo escuro, todas as páginas, o contato e o footer recebem material escuro. A home conserva a apresentação escura do filme nos dois temas. Segurança e ecossistema compartilham o fundo escuro. No modo claro, contato, onda e footer mantêm a composição aprovada em cobre e `#fffaf2`.

Filme, poster e átomo permanecem idênticos à branch anterior. O vídeo cobre a abertura; a oferta rotativa está vazada, com uma linha discreta e proteção de leitura no texto. Inter 4.1 local, tokens e marcas oficiais vêm do plugin PWR 2.1.1. Arquivos consumidos e licenças estão registrados em `.pwr-design/`.

Os cards aprovados de “Você imagina. Nós criamos.” foram preservados. Canvas e Íris usam cards com proposta, benefícios e destino oficial, sem miniaturas inferiores cortadas. A demonstração do Canvas foi mantida: pergunta, contexto, KPIs e gráfico compartilham um estado de exemplo, sem acessar IA ou dados reais.

O processo usa cenas HTML planas: brief, wireframe, versão em validação e linha de evolução, sem o material metálico anterior. Etapas, teclado e detalhes permanecem. O arco de diferenciais mantém o primeiro card centralizado até a chegada à leitura e uma margem inicial de 120px de scroll; depois avança com a rolagem nativa. Em telas curtas, celulares, fonte ampliada ou movimento reduzido, usa navegação horizontal direta.

O ecossistema reúne treze ferramentas, distribuídas em cascata nos dois lados, com alturas diferentes, centro livre e flutuação discreta. No celular, o escalonamento mantém espaço entre os ícones abaixo da mensagem. RD Station aparece uma vez. Protheus usa o logo da TOTVS com descrição do fabricante. Entra ID aparece por escrito: o pacote oficial consultado restringe o uso dos ícones em marketing.

## Navegação e páginas próprias

O menu combina Produtos e Criações na home com `/solucoes/` e `/sobre/`. Soluções explica seis frentes de serviço, público, entregas e início do trabalho; suas chamadas retornam ao contato com interesse permitido pré-selecionado. Sobre reúne propósito, missão, visão, trajetória e princípios. Esses conteúdos não aumentam a quantidade de seções da home.

Cabeçalho, tema, canais, acessibilidade, retorno ao topo e revelação da marca compartilham comportamento nas três páginas. A acessibilidade abre em popover ancorado não modal, sem backdrop ou bloqueio da página. Tab entra no painel; fechamento explícito e Escape interno devolvem o foco. Tema em botões, tamanho, alto contraste preto/branco, leitura em voz alta e restaurar seguem a referência. A pausa explícita pedida no último painel congela filme, partículas e animações. As preferências persistem localmente.

## Referências e fontes

- Vercel e domínio principal observados em Chrome 155: encerramento aprovado preservado; produtos e conteúdos institucionais adaptados das páginas do Diego.
- Iris em http://127.0.0.1:5181/#inicio: alternância de superfícies claras, escuras e quentes.
- Ghost: logos distribuídos ao redor da mensagem central. Nenhum código ou asset do Ghost foi copiado.
- 21st: buscas MCP por navegação, demonstração, logos, carrossel e painel ancorado retornaram `catalog search failed`. A pesquisa continuou por fontes oficiais e API nativa, sem incorporar React ao site estático.
- Popover API: documentação MDN e painel do Diego observados. O popover é associado ao disparador para manter a sequência de foco.
- Ícones Lucide, logos do Simple Icons 11.15.0 e arquivos oficiais RD Station/Omie; fontes e recibos em `.pwr-design/experience-assets.json`.

## Limites

O formulário prepara serviço e descrição integral em `mailto:` para revisão e envio no aplicativo do visitante. Não há backend de envio ou novo serviço de IA. Destinatário e canais estão em `site/assets/public-shell.js`; `core.js` mantém o formulário.

Perfis sem URL conservam a alternativa de contato existente. Nenhuma mensagem real foi enviada. A preferência reduzida conserva uma alternativa sem deslocamento. A nova pausa explícita substitui a orientação anterior de não oferecer pausa; sem essa seleção, o filme continua preservado. A síntese de fala e o destaque foram conferidos com stub; áudio real do sistema não foi validado.

Evidências em `.pwr-design/direction-plan.json` e `docs/validation.md`. Capturas em `review/`, ignoradas pelo Git. Emulação móvel não equivale a teste em aparelho físico.

## Ajustes de cascata e comunicação

O ecossistema passou a formar uma curva ampla acima do texto e uma cascata nas duas laterais. Cada ferramenta tem entrada e saída ligadas à posição no viewport; a flutuação continua em um elemento interno separado. Em movimento reduzido ou pausa explícita, todos os ícones ficam visíveis em posições estáticas. As três referências 21st fornecidas foram lidas, sem incorporar código ou dependências React/Motion.

SaaS foi retirado dos textos públicos e metadados. O centro do átomo agora coincide com a linha vertical da oferta, sem mudar o SVG ou sua animação.
