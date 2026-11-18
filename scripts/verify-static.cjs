#!/usr/bin/env node
/* Revisión estática de ArteEnLink: sin dependencias y sin acceso a la red. */
'use strict';
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const failures = [];
const posix = path.posix;
const files = [];
function walk(base) {
  for (const dirent of fs.readdirSync(base, { withFileTypes: true })) {
    if (dirent.name === '.git' || dirent.name === 'node_modules') continue;
    const full = path.join(base, dirent.name);
    if (dirent.isDirectory()) walk(full);
    else if (dirent.isFile()) files.push(posix.normalize(path.relative(root, full).replace(/\\/g, '/')));
  }
}
walk(root);
const allFiles = new Set(files);
const htmlPages = files.filter(p => p === 'index.html' ||
  (p.startsWith('categorias/') && p.endsWith('.html')) ||
  (p.startsWith('demos/') && /\.html?$/.test(p) && !p.endsWith('/index.html')));
const categories = htmlPages.filter(p => p.startsWith('categorias/'));
const demos = htmlPages.filter(p => p.startsWith('demos/'));
if (categories.length !== 12) failures.push('Se esperaban 12 categorías; encontradas ' + categories.length);
if (demos.length !== 36) failures.push('Se esperaban 36 demos; encontradas ' + demos.length);
let checkedRefs = 0;
for (const p of htmlPages) {
  const html = fs.readFileSync(path.join(root, p), 'utf8');
  if (p.startsWith('demos/') && /520000000000/.test(html)) failures.push('Teléfono ficticio en ' + p);
  const attrs = html.matchAll(/\b(?:src|href|poster)\s*=\s*["']([^"']+)["']/gi);
  for (const m of attrs) {
    const ref = m[1];
    if (ref === '/' || !ref || ref.startsWith('#') ||
      /^(https?:|\/\/|data:|mailto:|tel:|javascript:)/i.test(ref)) continue;
    let plain;
    try { plain = decodeURIComponent(ref.split(/[?#]/)[0]); }
    catch { failures.push('Ruta mal codificada en ' + p + ': ' + ref); continue; }
    const expected = plain.startsWith('/')
      ? posix.normalize(plain.slice(1))
      : posix.normalize(posix.join(posix.dirname(p), plain));
    checkedRefs++;
    if (expected.startsWith('../') || !allFiles.has(expected)) {
      failures.push('Archivo ausente: ' + p + ' -> ' + ref);
    }
  }
}
let checkedCssRefs = 0;
for (const p of files.filter(p => p.endsWith('.css'))) {
  const css = fs.readFileSync(path.join(root, p), 'utf8');
  const urls = css.matchAll(/url\(\s*(?:"([^"]*)"|'([^']*)'|([^)]*))\s*\)/g);
  for (const match of urls) {
    const ref = (match[1] || match[2] || match[3] || '').trim();
    if (!ref || /^(?:data:|https?:|\/\/|about:|#)/i.test(ref)) continue;
    let clean;
    try { clean = decodeURIComponent(ref.replace(/\\([ ()])/g, '$1').split(/[?#]/)[0]); }
    catch { failures.push('URL CSS mal codificada en ' + p + ': ' + ref); continue; }
    const expected = clean.startsWith('/')
      ? posix.normalize(clean.slice(1))
      : posix.normalize(posix.join(posix.dirname(p), clean));
    checkedCssRefs++;
    if (!allFiles.has(expected)) failures.push('Recurso CSS ausente: ' + p + ' -> ' + ref);
  }
}
for (const p of demos) {
  const html = fs.readFileSync(path.join(root, p), 'utf8');
  if (!html.includes('src="/demo-base.js"')) failures.push('Demo sin controlador de enlaces de ejemplo: ' + p);
}

for (const p of categories) {
  const content = fs.readFileSync(path.join(root, p), 'utf8');
  for (const price of ['349', '549', '799']) {
    if (!content.includes('$' + price)) failures.push('Paquete de precio ausente en ' + p + ': $' + price);
  }
  if (/24\s*(?:horas|hrs)|cambios ilimitados|anticipo del 50%/i.test(content)) {
    failures.push('Condición comercial no verificada en ' + p);
  }
}

let checkedJs = 0;
for (const p of files.filter(p => p.endsWith('.js'))) {
  const content = fs.readFileSync(path.join(root, p), 'utf8');
  checkedJs++;
  try { new vm.Script(content, { filename: p }); }
  catch (error) { failures.push('JS inválido: ' + p + ': ' + error.message); }
  if (p.startsWith('demos/') && /520000000000/.test(content)) failures.push('Teléfono ficticio JS: ' + p);
}
const sitemap = fs.readFileSync(path.join(root, 'sitemap.xml'), 'utf8');
if ((sitemap.match(/<loc>/g) || []).length !== 13) failures.push('El sitemap no contiene 13 páginas comerciales');
console.log('ArteEnLink static gate:', htmlPages.length + ' páginas, ' + checkedRefs +
  ' referencias HTML, ' + checkedCssRefs + ' recursos CSS y ' + checkedJs + ' archivos JS');
if (failures.length) {
  failures.forEach(x => console.error('FAIL:', x));
  process.exitCode = 1;
} else {
  console.log('PASS: rutas locales, 36 demos, 12 colecciones, sintaxis JS y teléfonos ficticios');
}
