// Build an offline gallery using production UI code without changing the demo.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { scenarios } from './ui-audit/scenarios.mjs';
if (new Set(scenarios.map(s => s.id)).size !== scenarios.length) throw new Error('Scenario IDs must be unique');
const root = new URL('../', import.meta.url), out = new URL('docs/audit/ui-ux/', root);
const read = p => readFileSync(new URL(p, root), 'utf8');
const literal = v => JSON.stringify(v).replace(/</g, '\\u003c');
const inputs = ['src/SVNAssist.UI.Web/index.html', 'tools/ui-audit/scenarios.mjs', 'tools/ui-audit/gallery.html'];
let ui = read('src/SVNAssist.UI.Web/index.html').replace(/<meta http-equiv="Content-Security-Policy"[^>]*>/, '');
ui = ui.replace(/<link rel="stylesheet" href="([^"]+)">/g, (_, p) => { inputs.push('src/SVNAssist.UI.Web/' + p); return `<style>${read('src/SVNAssist.UI.Web/' + p)}</style>`; });
ui = ui.replace(/<script src="([^"]+)"><\/script>/g, (_, p) => { inputs.push('src/SVNAssist.UI.Web/' + p); return `<script>${read('src/SVNAssist.UI.Web/' + p)}</script>`; });
const boot = `<script>
window.__auditErrors=[];window.__auditCommands=[];
addEventListener('error',e=>window.__auditErrors.push(e.message));
addEventListener('unhandledrejection',e=>window.__auditErrors.push(String(e.reason)));
window.__mockBridge={attach(w,fn){this.fn=fn},postMessage(m){
 if(m.type==='cmd'){window.__auditCommands.push(m);if(m.name==='uiError')window.__auditErrors.push(m.args.error);return;}
 if(m.type==='ready'){const c=window.__auditConfig;this.fn({type:'theme',kind:c.theme});this.fn({type:'state',view:c.scenario.view,lang:c.lang,state:c.scenario.state});
 const a=c.scenario.action;
 if(a==='shelve'){document.querySelector('[data-menu="more"]').focus();SVNUI.ops.shelveShow([]);document.querySelector('#sh-name').value='Work before switching branches';}
 else if(a==='cleanup-danger'){const input=document.querySelector('[data-ock="revert"]');input.focus();input.click();}
 else if(a==='row')document.querySelector('#list .tr[data-key$=".cs"]')?.dispatchEvent(new MouseEvent('contextmenu',{bubbles:true,clientX:180,clientY:350}));
 else if(a==='shelved-menu'||a==='log-menu'){if(a==='shelved-menu')document.querySelector('[data-shl-toggle][aria-expanded="false"]')?.click();document.querySelector(a==='shelved-menu'?'.shl-r':'.lr[data-rev]')?.dispatchEvent(new MouseEvent('contextmenu',{bubbles:true,clientX:180,clientY:350}));}
 else if(a==='switch-extended')document.querySelector('[data-sw-ext]')?.click();
 else if(a)document.querySelector(a==='recent'?'[data-recent]':'[data-menu="'+a+'"]')?.click();
 if(['more','ai','row','shelved-menu','log-menu'].includes(a)&&!document.querySelector('[role="menu"]'))throw new Error('Audit menu did not open: '+a);
 if(a==='switch-extended'&&!document.querySelector('.sw-wide'))throw new Error('Extended Switch view did not open');
 window.__auditReady=true; }
}};
</script>`;
ui = ui.replace('<script>', boot + '<script>');
mkdirSync(out, { recursive: true });
writeFileSync(new URL('scenarios.json', out), JSON.stringify(scenarios, null, 2) + '\n');
for (const name of ['changes', 'log', 'diff']) inputs.push(`tools/ui-audit/fixtures/${name}.json`);
writeFileSync(new URL('manifest.json', out), JSON.stringify({ commit: execFileSync('git', ['rev-parse', 'HEAD'], { cwd: root, encoding: 'utf8' }).trim(), note: 'Hashes describe working tree files, including uncommitted changes.', sources: Object.fromEntries(inputs.map(p => [p, createHash('sha256').update(read(p)).digest('hex')])) }, null, 2) + '\n');
writeFileSync(new URL('SCENARIOS.md', out), '# Web scenario matrix\n\nGenerated with `node tools/build-ui-audit.mjs`. Synthetic English fixtures. Capture and assess each row; gallery coverage does not certify backend workflows.\n\n| ID | Scenario | View |\n|---|---|---|\n' + scenarios.map(s => `| [${s.id}](index.html#${s.id}) | ${s.title} | ${s.view} |`).join('\n') + '\n');
const template = read('tools/ui-audit/gallery.html');
writeFileSync(new URL('index.html', out), template.replace('/*DATA*/', `const SCENARIOS=${literal(scenarios)},UI=${literal(ui)};`));
const nativeEvidence = new URL('native/evidence.json', out);
// Native screenshots can expose personal paths. Build their ignored local gallery only on explicit request.
if (process.argv.includes('--include-local-native') && existsSync(nativeEvidence)) {
  const evidence = JSON.parse(readFileSync(nativeEvidence, 'utf8'));
  const escapeHTML = value => String(value).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
  const cards = evidence.map(e => `<figure id="${escapeHTML(e.id)}"><a href="${escapeHTML(e.screenshot)}"><img loading="lazy" src="${escapeHTML(e.screenshot)}" alt="${escapeHTML(e.note)}"></a><figcaption><b>${escapeHTML(e.id)}</b><p>${escapeHTML(e.note)}</p><small>${escapeHTML(e.capturedAt)}</small></figcaption></figure>`).join('\n');
  writeFileSync(new URL('native/index.html', out), `<!doctype html><html lang="en"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>SVNAssist · Native UI audit</title><style>body{margin:0;background:#eef1f5;color:#202b3b;font:15px system-ui}header{padding:24px;background:#182435;color:white}header a{color:#b9dcff}h1{margin:0 0 8px;font-size:24px}main{display:grid;grid-template-columns:repeat(auto-fit,minmax(480px,1fr));gap:20px;padding:24px}figure{margin:0;background:white;border:1px solid #c8d1df;border-radius:8px;overflow:hidden}img{width:100%;display:block}figcaption{padding:16px}p{line-height:1.5}small{color:#526078}@media(max-width:540px){main{grid-template-columns:1fr;padding:12px}}</style><header><h1>Native Visual Studio captures</h1><p>Actual screenshots from the dedicated experimental instance. Repository messages and observed localization defects are preserved as evidence.</p><a href="../index.html">Web scenario gallery</a> · <a href="../NATIVE-REPORT.md">Native audit report</a></header><main>${cards}</main></html>`);
}
console.log(`UI audit: ${scenarios.length} scenarios → docs/audit/ui-ux/index.html`);
