# PWRDATA

Site corporativo estático em HTML, CSS e JavaScript. A pasta `site/` contém toda a publicação, incluindo SVGs, imagens e vídeos utilizados.

## Experimento PWR Design System

A branch `codex/pwr-design-system-claro` refina a identidade com Inter local, marca oficial PWR e superfícies claras, escuras e cobre. Sem preferência salva, a entrada é escura; claro, escuro e automático continuam selecionáveis. O topo apresenta o filme em material escuro nos dois temas. O modo escuro abrange todas as páginas; o claro conserva a alternância de superfícies. O filme original preenche a abertura inteira. Navegação aberta, acessibilidade em painel ancorado, Canvas/Íris, demonstração ilustrativa, treze ferramentas e consultoria compõem a experiência. A branch `codex/implementacao-v1-site-pwrdata` preserva o visual anterior, incluindo o encerramento aprovado no Vercel.

O menu também leva às páginas `/solucoes/` e `/sobre/`. Soluções detalha seis frentes de trabalho; cada chamada retorna ao formulário com o interesse pré-selecionado. Sobre apresenta propósito, trajetória e princípios. Esses conteúdos não acrescentam seções à home.

Para testar a experiência em Docker:

```bash
docker compose up -d --build
```

Abra http://127.0.0.1:4180/. O bind mount de `site/` é somente leitura no contêiner e reflete edições locais. A porta está restrita ao próprio computador. Para encerrar apenas esta prévia:

```bash
docker compose down
```

Para verificar o site servido pelo Docker no PowerShell:

```powershell
$env:PWR_PREVIEW_URL = 'http://127.0.0.1:4180'
node scripts/verify-site.mjs
```

O Nginx usa a imagem oficial `stable-alpine`, serve arquivos estáticos e suporta requisições parciais do vídeo. O Docker é uma opção local; a publicação estática na Vercel continua com a arquitetura existente.

Tokens, assinatura e tipografia consumidos estão registrados em `.pwr-design/`. As decisões e limites estão em `docs/pwr-design-refinement.md`. Não há pacote npm, instalação do kit completo nem nova dependência de runtime.

Tema e preferências de leitura usam apenas armazenamento local opcional. O painel inclui tema, escala, alto contraste, pausa explícita e leitura em voz alta pela síntese do navegador, sem API de IA. A demonstração do Canvas troca exemplos de Operações, Comercial e Financeiro: não consulta uma IA nem dados reais. Os links de produtos apontam às páginas oficiais. Os logos das ferramentas são referências de arquitetura, com fonte/licença em `.pwr-design/experience-assets.json`.

## Executar localmente

Com Node.js instalado, execute na raiz do repositório:

```bash
node scripts/preview-site.mjs
```

Abra http://127.0.0.1:4174/. O servidor local suporta requisições parciais dos vídeos.

Para verificar assets, âncoras, conteúdo e configuração de publicação, com a prévia rodando:

```bash
node scripts/verify-site.mjs
```

## Publicar no Vercel

Importe este repositório e use a branch `main` como Production Branch. Mantenha Root Directory na raiz do repositório.

`vercel.json` configura Framework Preset **Other**, comandos de instalação e build vazios e Output Directory **site**. Somente o conteúdo de `site/` será servido. A configuração segue a [documentação de builds estáticos do Vercel](https://vercel.com/docs/builds/configure-a-build#skip-build-step).

O site não exige dependências npm, servidor de aplicação ou variáveis de ambiente. Configure o domínio `www.pwrdata.com.br` no Vercel para corresponder aos metadados atuais.

## Estrutura

- `site/`: arquivos publicados.
- `scripts/`: prévia, verificação e escolha da divisão do footer.
- `docs/`: identidade visual e registro de validação.
- `.pwr-design/`: fontes canônicas, recibo dos assets do DS e plano de direção.
- `docker/`, `compose.yaml` e `Dockerfile`: prévia local independente.
- `.agents/skills/`: única cópia das oito skills web usadas na manutenção.
- `sitede10k-skill/`: orientação original de construção e design.
- `skills-lock.json`: origem e hashes das skills mantidas.

## Manutenção

O carrossel usa 15 segundos por volta. A preferência de movimento reduzido possui sua configuração própria.

Para restaurar apenas a divisão reta do footer:

```bash
node scripts/set-footer-transition.mjs straight
```

Para usar a onda novamente, substitua `straight` por `wave`.

O formulário prepara um e-mail com serviço e descrição; o visitante revisa e envia em seu aplicativo. Não há backend de envio ou armazenamento. Destinatário e URLs dos canais ficam em `site/assets/public-shell.js`. Canais ainda sem URL oferecem o formulário local como alternativa.

Os SVGs de canais mantêm a atribuição Font Awesome Free 6.7.2, CC BY 4.0. GSAP e CustomEase 3.13.0 preservam os cabeçalhos de licença do fornecedor. O logo original está em `docs/brand/`.
