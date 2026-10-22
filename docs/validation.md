# Validação — refinamento PWR

Revisão local de 22/10/2026 em `codex/pwr-design-system-claro`. Site estático, sem compilação ou instalação. Prévia Docker/Nginx em http://127.0.0.1:4180/. A Vercel continua publicando apenas `site/`.

## Verificações atuais

- Verificação estática: três rotas (`/`, `/solucoes/`, `/sobre/`), 131 IDs únicos na home, 49 assets referenciados, dez scripts, âncoras e JSON-LD. Vídeo com HTTP 206 e 1024 bytes para requisição parcial.
- Chrome 155 por CDP: navegação, painel ancorado, Tab/Escape, canais, formulário, seleção de interesse e descrição integral. Rodada de fechamento: 34 verificações dessas jornadas aprovadas em 390/1440px e nos dois temas.
- Escala para 125%, alto contraste preto/branco, pausa do vídeo e restaurar conferidos em 320/390/1440px. Painel dentro do viewport, sem bloquear a página.
- Leitura em voz alta: texto enviado à síntese, trecho destacado e parar/limpar conferidos com stub em navegador separado. Não é validação de voz audível do sistema.
- Arco final restaurado: oito cenários de tema/largura em 320/390/1024/1440px. Cards visíveis permanecem inteiros acima da legenda. Primeiro card aguarda a chegada e 100px de rolagem; avanço posterior observado em modo normal. Em movimento reduzido, lista horizontal sem avanço automático.
- Home no modo claro e escuro: apresentação escura do filme confirmada em 390/1440px, com o mesmo fundo computado. As regiões seguintes mantêm claro misto ou escuro integral.
- Cascata de treze ferramentas: cinco larguras, normal/reduzido, sem sobreposição de ícones entre si ou com a mensagem, nem overflow horizontal.
- Páginas institucionais: conteúdo e navegação próprios, seleção do serviço ao retornar ao contato, temas e imagens conferidos. Âncoras posicionadas abaixo da navegação.
- Contraste do encerramento escuro: 32 pares de cores computadas, todos >=4,5:1. Foram corrigidos textos que ainda herdavam marrom. CTAs gerais: 4,72:1 no claro e 6,51:1 no escuro. Amostra, sem auditoria integral WCAG.
- Inter local, títulos e textos medidos em 390/1440px nos dois temas. Footer: títulos 20px e links 16px. Encerramento claro preserva cobre/`#fffaf2`; o escuro usa grafite e texto correspondente.
- SHA-256: vídeos desktop/mobile, poster e átomo idênticos à branch original. Recibos dos assets integrados conferidos, incluindo três ícones oficiais novos para o painel.
- Contrato PWR válido. Revisão estrutural de direção: `ready`, sem questões ou erros. Isso verifica inventário e integridade, não certifica estética, conversão, acessibilidade ou segurança.

Relatórios e capturas reais ficam em `review/`, ignorados pelo Git. O plano em `.pwr-design/direction-plan.json` registra métodos, medidas e caminhos locais.

## Limites

Celular foi emulado, sem aparelho físico. Não foram executados envio real de mensagem, auditoria Lighthouse ou publicação. Perfis sociais sem URL conservam a alternativa de contato. O arquivo `C:/Users/Play/Downloads/video 1.mp4` não foi encontrado: a alteração dos cards foi orientada pelo print e pela descrição; a alternativa em pilha foi descartada após feedback, e o arco anterior foi restaurado.

A branch `codex/implementacao-v1-site-pwrdata`, em `ec12f80`, preserva o estado anterior. Os sites publicados não foram alterados nesta rodada.

## Cascata, nomes dos produtos e átomo

- 30 verificações: sete larguras de 320 a 1920px, nos dois temas; treze ferramentas presentes, sem erros JS, imagens quebradas, overflow ou sobreposição na composição estática. Quatorze capturas reais; revisão visual das regiões decisivas em desktop/mobile.
- Entrada, leitura e saída observadas por scroll em 390/1440px; preferência reduzida mantém todos os ícones visíveis. Oito cenários adicionais de texto em 125%/150% sem sobreposição ou overflow.
- Nome inicial BI EMBEDDED e troca para E-COMMERCE observados durante a rotação real. Gate estático impede reintroduzir SaaS no conteúdo público.
- Átomo: quatorze medições em sete larguras/dois temas; centro com deslocamento horizontal zero em relação ao eixo da borda. Capturas desktop/mobile conferidas. SVG e animação originais preservados.

## Navegação e indicadores de expansão

O índice de Soluções acompanha o tema local e destaca a área atual, sem a faixa branca sobre regiões escuras. Ao terminar as soluções, o índice deixa de cobrir o contato/footer. Foram aprovados 34 cenários de navegação e layout em 390/1440px, nos dois temas; âncoras mantêm o destino abaixo da navegação. O CTA do cabeçalho foi removido das três páginas, preservando contato na home e no footer. As três perguntas usam +/−, com clique e Enter conferidos em quatro cenários de tema/viewport; o grupo continua exclusivo.

Os indicadores das perguntas foram refinados para SVGs oficiais Lucide circle-plus/circle-minus de 24px. Fontes e hashes registrados; quatro cenários de tema/viewport confirmam ícone aberto/fechado, grupo exclusivo e teclado. Capturas reais conferidas.

Após novo feedback, o FAQ voltou à largura máxima de 440px. Os círculos foram retirados; o SVG existente gira entre + e × em superfície suave, com cores locais. Seis cenários em 320/390/1440px e claro/escuro confirmaram largura, ausência de overflow, abertura exclusiva e Enter. Os dois símbolos circulares aposentados foram removidos do sprite e dos recibos.
