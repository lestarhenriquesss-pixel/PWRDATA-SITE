import assert from 'node:assert/strict';
import { readFile,stat } from 'node:fs/promises';
import path from 'node:path';
const deployment=JSON.parse(await readFile('vercel.json','utf8'));
assert.equal(deployment.framework,null,'Vercel deve usar o preset estático Other');
assert.equal(deployment.buildCommand,'','Site estático deve pular o build');
assert.equal(deployment.installCommand,'','Site estático não exige instalação de dependências');
assert.equal(deployment.outputDirectory,'site','Vercel deve publicar apenas site/');
const root=path.resolve(deployment.outputDirectory);
const preview=(process.env.PWR_PREVIEW_URL||'http://127.0.0.1:4174').replace(/\/$/,'');
const html=await readFile(path.join(root,'index.html'),'utf8');
const ids=[...html.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
assert.equal(new Set(ids).size,ids.length,'IDs duplicados');
for(const match of html.matchAll(/href="#([^"]+)"/g))assert(ids.includes(match[1]),`Âncora ausente: ${match[1]}`);
const assets=[...new Set([...html.matchAll(/(?:src|href|poster)="(assets\/[^"]+)"/g)].map(match=>match[1].split(/[?#]/)[0]))];
for(const asset of assets){await stat(path.join(root,asset));const response=await fetch(preview+'/'+asset,{method:'HEAD'});assert.equal(response.status,200,asset)}
const scriptPaths=[...html.matchAll(/<script[^>]+src="(assets\/[^"]+)"/g)].map(match=>match[1]);
const scripts=await Promise.all(scriptPaths.filter(file=>!file.includes('/vendor/')).map(file=>readFile(path.join(root,file),'utf8')));
const text=html+'\n'+scripts.join('\n');
assert(!/\bsaas\b/i.test(text),'Termo SaaS retirado da comunicação pública continua publicado');
assert(!/—|alavancar|robusto|empoderar|destravar|acionável|orientado a dados|sinergia|escalável/i.test(text),'Texto fora do gate editorial');
assert(!/github|assets\/projects\/|motionToggle|motion=on/i.test(text),'Referência antiga publicada');
assert(!/0[1-7] \/ |offer-index|step-number|stepLabel[12]|simulateOrder|simulateDeploy|downloadDemo/.test(text),'Enumeração ou interação retirada continua publicada');
assert(!/diego\.henriques@pwrdata\.com\.br/.test(html),'Endereço de contato exposto no HTML');
assert(!/icon-(dados|commerce|produto|cloud)\.webp|construcao\.jpg|hero-ending\.jpg/.test(text),'Visual antigo publicado');
assert.equal([...html.matchAll(/data-ambient-video/g)].length,0,'Filme retirado da arquitetura ainda publicado');
assert(html.includes('class="connection-atmosphere"'),'Luz ambiente da arquitetura ausente');
assert(!/ecossistema-(?:loop|mobile|poster)/.test(html),'Material antigo da arquitetura ainda referenciado');
assert(html.includes('social-icons.svg#linkedin'),'Canal LinkedIn ausente');
assert(!/data-channel="[^"]+"[^>]*(?:disabled|aria-disabled="true")/.test(html),'Canal visualmente desativado');
assert(html.includes('name="pwr-questions"'),'FAQ sem grupo exclusivo');
assert(/id="makingPanel"[^>]*tabindex="0"/.test(html),'Painel do processo sem entrada de foco');
assert(html.includes('id="architectureToggle"'),'Projeção sem controle de retorno');
assert(html.includes('id="backTop"'),'Retorno ao topo ausente');
assert(!/architectureCue|Toque em uma camada para abrir/.test(text),'Orientação retirada da arquitetura ainda publicada');
assert(/data-footer-transition="(?:wave|straight)"/.test(html),'Modo reversível do footer ausente');
assert(!/class="(?:technical|studio-section|impact motion-region|faq-section)/.test(html),'Capítulo retirado permanece publicado');
assert.equal((html.match(/<section\b/g)||[]).length,10,'Quantidade de capítulos não corresponde à composição de produtos e serviços');
for(const id of ['produtos','canvas-demo','consultoria','ecossistema','por-que-pwr','themeToggle','openReading','architectureExplorer'])assert(ids.includes(id),`Camada da experiência ausente: ${id}`);
const schema=JSON.parse(html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/)[1]);assert.equal(schema.name,'PWRDATA');
const range=await fetch(preview+'/assets/hero-loop.mp4',{headers:{Range:'bytes=0-1023'}});assert.equal(range.status,206);assert.equal((await range.arrayBuffer()).byteLength,1024);assert.equal(range.headers.get('content-type'),'video/mp4');
const pages=new Map([['/',html],['/solucoes/',await readFile(path.join(root,'solucoes/index.html'),'utf8')],['/sobre/',await readFile(path.join(root,'sobre/index.html'),'utf8')]]);
for(const [route,source] of pages){
  assert.equal((await fetch(preview+route)).status,200,route);
  const pageIds=[...source.matchAll(/\bid="([^"]+)"/g)].map(match=>match[1]);
  assert.equal(new Set(pageIds).size,pageIds.length,route+' IDs duplicados');
  for(const match of source.matchAll(/(?:src|href|poster)="([^"]+)"/g)){
    const url=new URL(match[1],preview+route);if(url.origin!==preview)continue;
    if(url.pathname.startsWith('/assets/')){await stat(path.join(root,url.pathname));assert.equal((await fetch(url,{method:'HEAD'})).status,200,url.pathname)}
    else if(pages.has(url.pathname)&&url.hash){const target=pages.get(url.pathname);assert(target.includes('id="'+url.hash.slice(1)+'"'),route+' → '+url.pathname+url.hash)}
  }
  assert(source.includes('href="/solucoes/"')&&source.includes('href="/sobre/"'),route+' sem navegação para as páginas institucionais');
  assert(source.includes('popover="auto"')&&!source.includes('<dialog id="readingDialog"'),route+' sem painel de acessibilidade não modal');
}
console.log(JSON.stringify({deployment:'Vercel / static / site',pages:[...pages.keys()],ids:ids.length,assets:assets.length,scripts:scriptPaths.length,anchors:'ok',schema:'ok',editorial:'ok',retiredReferences:'absent',socialChannels:'5',architectureBackground:'native light',accessibility:'nonmodal popover',videoRange:'206 / 1024 bytes'},null,2));
