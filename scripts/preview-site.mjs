import http from 'node:http';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../site');
const port = 4174;
const types = { '.html': 'text/html; charset=utf-8', '.png': 'image/png', '.jpg': 'image/jpeg', '.webp': 'image/webp', '.svg': 'image/svg+xml', '.css': 'text/css; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.mp4':'video/mp4' };
http.createServer(async (request, response) => {
  try {
    const url = new URL(request.url, 'http://127.0.0.1');
    const relative = decodeURIComponent(url.pathname === '/' ? '/index.html' : url.pathname);
    const target = path.resolve(root, '.' + relative);
    if (!target.startsWith(root + path.sep)) {
      response.writeHead(403); response.end(); return;
    }
    const content = await readFile(target);
    const headers={'Content-Type':types[path.extname(target)]||'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Accept-Ranges':'bytes'};
    const range=request.headers.range;
    if(range){
      const match=/^bytes=(\d*)-(\d*)$/.exec(range);
      if(!match||(!match[1]&&!match[2])){response.writeHead(416,{'Content-Range':`bytes */${content.length}`});response.end();return}
      const start=match[1]?Number(match[1]):Math.max(0,content.length-Number(match[2]));
      const end=match[1]&&match[2]?Math.min(Number(match[2]),content.length-1):content.length-1;
      if(start>=content.length||end<start){response.writeHead(416,{'Content-Range':`bytes */${content.length}`});response.end();return}
      response.writeHead(206,{...headers,'Content-Range':`bytes ${start}-${end}/${content.length}`,'Content-Length':end-start+1});response.end(request.method==='HEAD'?undefined:content.subarray(start,end+1));
    }else{response.writeHead(200,{...headers,'Content-Length':content.length});response.end(request.method==='HEAD'?undefined:content)}
  } catch {
    response.writeHead(404); response.end('Arquivo não encontrado');
  }
}).listen(port, '127.0.0.1', () => process.stdout.write(`PWRDATA: http://127.0.0.1:${port}\n`));
