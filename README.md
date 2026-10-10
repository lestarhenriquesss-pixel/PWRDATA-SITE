# PWRDATA

Site corporativo estático em HTML, CSS e JavaScript. A pasta `site/` contém toda a publicação, incluindo SVGs, imagens e vídeos utilizados.

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

O formulário prepara um e-mail com serviço e descrição; o visitante revisa e envia em seu aplicativo. Não há backend de envio ou armazenamento. Destinatário e URLs dos canais ficam em `site/assets/core.js`. Canais ainda sem URL encaminham ao formulário local.

Os SVGs de canais mantêm a atribuição Font Awesome Free 6.7.2, CC BY 4.0. GSAP e CustomEase 3.13.0 preservam os cabeçalhos de licença do fornecedor. O logo original está em `docs/brand/`.