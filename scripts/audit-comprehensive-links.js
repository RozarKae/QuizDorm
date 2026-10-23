// scripts/audit-comprehensive-links.js
const fs = require('fs');
const path = require('path');

// 1. Existing pages in app/
function getAllPages(dir, baseRoute = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
        routes = routes.concat(getAllPages(fullPath, baseRoute));
      } else {
        routes = routes.concat(getAllPages(fullPath, baseRoute + '/' + entry.name));
      }
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts' || entry.name === 'page.jsx' || entry.name === 'page.js') {
      routes.push(baseRoute === '' ? '/' : baseRoute);
    }
  }
  return routes;
}

const existingRoutes = getAllPages(path.join(__dirname, '../app'));

function isValidRoute(target) {
  if (!target || target === '#' || target.startsWith('http:') || target.startsWith('https:') || target.startsWith('mailto:')) {
    return true;
  }
  const clean = target.split('?')[0].split('#')[0].replace(/\/+$/, '') || '/';
  
  if (existingRoutes.includes(clean)) return true;
  
  // Test dynamic routes
  for (const r of existingRoutes) {
    if (r.includes('[')) {
      const regexStr = '^' + r.replace(/\[\.\.\.[^\]]+\]/g, '.*').replace(/\[[^\]]+\]/g, '[^/]+') + '$';
      const re = new RegExp(regexStr);
      if (re.test(clean)) return true;
    }
  }
  
  if (clean.startsWith('/api/') || clean.startsWith('/images/') || clean.startsWith('/icons/') || clean.endsWith('.svg') || clean.endsWith('.png') || clean.endsWith('.ico') || clean.endsWith('.json')) {
    return true;
  }
  return false;
}

// 2. Scan all tsx files
function scanDirectory(dir) {
  let list = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.next', '.git', 'scripts'].includes(entry.name)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      list = list.concat(scanDirectory(fullPath));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      // Pattern 1: <Link ... href="LINK" ...>TITLE/CHILDREN</Link>
      const linkRegex = /<Link\s+[^>]*href=["'](\/[^"'?#]*)["'][^>]*>([\s\S]*?)<\/Link>/g;
      let m;
      while ((m = linkRegex.exec(content)) !== null) {
        const url = m[1];
        const inner = m[2].replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
        list.push({
          file: path.relative(path.join(__dirname, '..'), fullPath).replace(/\\/g, '/'),
          url,
          title: inner || 'Unknown Link'
        });
      }

      // Pattern 2: { name: "TITLE", href: "LINK" }
      const navItemRegex = /\{\s*name:\s*["']([^"']+)["'],\s*href:\s*["'](\/[^"'?#]*)["']/g;
      while ((m = navItemRegex.exec(content)) !== null) {
        list.push({
          file: path.relative(path.join(__dirname, '..'), fullPath).replace(/\\/g, '/'),
          url: m[2],
          title: m[1]
        });
      }

      // Pattern 3: title: "TITLE", href: "LINK"
      const navItemRegex2 = /\{\s*title:\s*["']([^"']+)["'],\s*href:\s*["'](\/[^"'?#]*)["']/g;
      while ((m = navItemRegex2.exec(content)) !== null) {
        list.push({
          file: path.relative(path.join(__dirname, '..'), fullPath).replace(/\\/g, '/'),
          url: m[2],
          title: m[1]
        });
      }

      // Pattern 4: router.push("LINK") or window.location.href = "LINK"
      const routerPushRegex = /router\.push\(["'](\/[^"'?#]*)["']\)/g;
      while ((m = routerPushRegex.exec(content)) !== null) {
        list.push({
          file: path.relative(path.join(__dirname, '..'), fullPath).replace(/\\/g, '/'),
          url: m[1],
          title: 'router.push Action'
        });
      }
    }
  }
  return list;
}

const found = scanDirectory(path.join(__dirname, '..'));

const broken = [];
const seen = new Set();

found.forEach(item => {
  if (!isValidRoute(item.url)) {
    const key = `${item.url}::${item.title}`;
    if (!seen.has(key)) {
      seen.add(key);
      broken.push(item);
    }
  }
});

console.log(`Found ${broken.length} broken/404 references across the project:\n`);
broken.forEach((b, idx) => {
  console.log(`${idx + 1}. [${b.title}] -> "${b.url}" in ${b.file}`);
});
