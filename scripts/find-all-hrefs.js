// scripts/find-all-hrefs.js
const fs = require('fs');
const path = require('path');

function getExistingRoutes(dir, baseRoute = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
        routes = routes.concat(getExistingRoutes(fullPath, baseRoute));
      } else {
        routes = routes.concat(getExistingRoutes(fullPath, baseRoute + '/' + entry.name));
      }
    } else if (entry.name.startsWith('page.')) {
      routes.push(baseRoute === '' ? '/' : baseRoute);
    }
  }
  return routes;
}

const existing = getExistingRoutes(path.join(__dirname, '../app'));
console.log('Existing app routes:', existing.length);

function scanAllHrefs(dir) {
  const hrefs = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.next', '.git', 'scripts'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      hrefs.push(...scanAllHrefs(fullPath));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, lineNo) => {
        // Look for href= or href:
        const match = line.match(/href\s*[:=]\s*[`"']([^`"']+)`?["']/);
        if (match) {
          const val = match[1];
          if (val.startsWith('/')) {
            hrefs.push({
              file: path.relative(path.join(__dirname, '..'), fullPath).replace(/\\/g, '/'),
              line: lineNo + 1,
              href: val,
              rawLine: line.trim()
            });
          }
        }
      });
    }
  }
  return hrefs;
}

const all = scanAllHrefs(path.join(__dirname, '..'));
console.log('Total /... hrefs found in codebase:', all.length);

const uniqueMissing = new Map();

all.forEach(item => {
  const clean = item.href.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  
  let valid = clean === '/' || existing.includes(clean);
  if (!valid) {
    for (const r of existing) {
      if (r.includes('[')) {
        const regexStr = '^' + r.replace(/\[\.\.\.[^\]]+\]/g, '.*').replace(/\[[^\]]+\]/g, '[^/]+') + '$';
        if (new RegExp(regexStr).test(clean)) {
          valid = true;
          break;
        }
      }
    }
  }
  if (!valid && !clean.startsWith('/api') && !clean.endsWith('.svg') && !clean.endsWith('.png') && !clean.endsWith('.ico')) {
    if (!uniqueMissing.has(clean)) {
      uniqueMissing.set(clean, []);
    }
    uniqueMissing.get(clean).push(item);
  }
});

console.log('Unique missing links count:', uniqueMissing.size);
for (const [route, occurrences] of uniqueMissing.entries()) {
  console.log(`\nRoute: "${route}" (${occurrences.length} occurrences)`);
  occurrences.forEach(o => console.log(`  at ${o.file}:${o.line} -> ${o.rawLine}`));
}
