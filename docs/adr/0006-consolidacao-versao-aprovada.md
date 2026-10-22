# ADR 0006 — Consolidar a versão estática aprovada no PR #3

Status: aceita por instrução do proprietário em 22/10/2026.

## Contexto

O PR #3 contém o site aprovado nesta conversa, no commit `5c32564`. A base `main`, em `f0543c8`, contém outra aplicação em Next.js, além da versão estática histórica. Os conflitos de Docker, Compose e documentação combinariam arquiteturas diferentes.

O proprietário pediu manter apenas a versão criada e aprovada aqui e remover o que não corresponde a ela na resolução dos conflitos.

## Decisão

Manter integralmente a árvore da versão aprovada e registrar a incorporação de `main` com um merge que conserva essa árvore. O único acréscimo é este registro da decisão.

- `site/` continua sendo a aplicação publicada, sem alteração de HTML, CSS, JavaScript, imagens ou vídeos nesta resolução.
- Docker continua servindo o site estático com Nginx; Vercel continua publicando `site/` sem instalação ou build.
- A aplicação Next.js, suas dependências, testes, documentação específica e esteira de publicação da Hostinger não entram nesta versão.
- O contato continua preparando uma mensagem para envio no aplicativo do visitante, conforme o comportamento aprovado. O backend de contato da outra aplicação não é incorporado.
- A resolução é enviada somente à branch do PR. Não mescla o PR nem altera diretamente `main` ou os sites publicados.

## Recuperação

As duas implementações permanecem no histórico Git. A versão anterior da base pode ser consultada no commit `f0543c8`; a versão visual aprovada, em `5c32564`.
