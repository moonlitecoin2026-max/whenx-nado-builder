import http from 'node:http';
import fs from 'node:fs/promises';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'..');
const mime={'.html':'text/html; charset=utf-8','.css':'text/css; charset=utf-8','.js':'text/javascript; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg'};
const server=http.createServer(async(req,res)=>{
  try{
    if(!['127.0.0.1:5274','localhost:5274'].includes(req.headers.host??'')){res.writeHead(403).end();return;}
    if(!['GET','HEAD'].includes(req.method??'')){res.writeHead(405).end();return;}
    const pathname=decodeURIComponent(new URL(req.url??'/', 'http://127.0.0.1').pathname);
    const rel=pathname==='/'?'demo/index.html':pathname.endsWith('/')?pathname.slice(1)+'index.html':pathname.slice(1);
    if(!/^(demo|assets)\//.test(rel)){res.writeHead(404).end();return;}
    const target=path.resolve(root,rel);if(!['demo','assets'].some(dir=>target.startsWith(path.join(root,dir)+path.sep))){res.writeHead(403).end();return;}
    const data=await fs.readFile(target);
    res.writeHead(200,{'Content-Type':mime[path.extname(target)]??'application/octet-stream','Cache-Control':'no-store','X-Content-Type-Options':'nosniff','Content-Security-Policy':"default-src 'none'; img-src 'self'; style-src 'self'; script-src 'self'; connect-src 'none'; base-uri 'none'; form-action 'none'; frame-ancestors 'none'"});
    res.end(req.method==='HEAD'?undefined:data);
  }catch{res.writeHead(404).end();}
});
server.listen(5274,'127.0.0.1',()=>console.log('Read-only fixture demo: http://127.0.0.1:5274/demo/'));
