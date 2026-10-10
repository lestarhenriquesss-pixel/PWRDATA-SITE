import {readFile,writeFile} from 'node:fs/promises';
const mode=process.argv[2];
if(!['wave','straight'].includes(mode))throw Error('Use: node scripts/set-footer-transition.mjs wave|straight');
for(const file of ['site/index.html']){
  const source=await readFile(file,'utf8');
  if(!/data-footer-transition="(?:wave|straight)"/.test(source))throw Error('Configuração ausente: '+file);
  await writeFile(file,source.replace(/data-footer-transition="(?:wave|straight)"/g,'data-footer-transition="'+mode+'"'));
}
console.log('Divisão do footer: '+mode+'.');
