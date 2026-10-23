// scripts/audit-404-routes.js
const fs = require('fs');
const path = require('path');

// 1. Gather all existing routes from app directory
function getRoutes(dir, baseRoute = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (entry.name.startsWith('_') || entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      if (entry.name.startsWith('(') && entry.name.endsWith(')')) {
        routes = routes.concat(getRoutes(fullPath, baseRoute));
      } else {
        routes = routes.concat(getRoutes(fullPath, baseRoute + '/' + entry.name));
      }
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts' || entry.name === 'page.jsx' || entry.name === 'page.js') {
      routes.push(baseRoute === '' ? '/' : baseRoute);
    }
  }
  return routes;
}

const appRoutes = getRoutes(path.join(__dirname, '../app'));
console.log('Total valid routes in app/:', appRoutes.length);

// 2. Scan all tsx/ts files for internal links
function scanLinks(dir) {
  let links = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    if (['node_modules', '.next', '.git', 'scripts'].includes(entry.name) || entry.name.startsWith('.')) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      links = links.concat(scanLinks(fullPath));
    } else if (entry.name.endsWith('.tsx') || entry.name.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      
      const regexes = [
        /href=["'](\/[^"'#?]+)/g,
        /href:\s*["'](\/[^"'#?]+)/g,
        /router\.push\(["'](\/[^"'#?]+)/g,
        /redirect\(["'](\/[^"'#?]+)/g,
      ];
      
      regexes.forEach(re => {
        let match;
        while ((match = re.exec(content)) !== null) {
          links.push({
            file: path.relative(path.join(__dirname, '..'), fullPath).replace(/\\/g, '/'),
            link: match[1]
          });
        }
      });
    }
  }
  return links;
}

const allLinks = scanLinks(path.join(__dirname, '..'));
console.log('Total link occurrences found:', allLinks.length);

// Check if a link matches any appRoute
function routeMatches(link, routes) {
  if (link === '/' || routes.includes(link)) return true;
  for (const r of routes) {
    if (r.includes('[')) {
      const regexStr = '^' + r.replace(/\[\.\.\.[^\]]+\]/g, '.*').replace(/\[[^\]]+\]/g, '[^/]+') + '$';
      const re = new RegExp(regexStr);
      if (re.test(link)) return true;
    }
  }
  // Allow API routes or static files
  if (link.startsWith('/api/') || link.startsWith('/images/') || link.startsWith('/icons/') || link.endsWith('.svg') || link.endsWith('.png') || link.endsWith('.ico') || link.endsWith('.json')) {
    return true;
  }
  return false;
}

const missing = new Map();
allLinks.forEach(({ file, link }) => {
  // normalize link (strip trailing slash)
  const normLink = link.length > 1 && link.endsWith('/') ? link.slice(0, -1) : link;
  if (!routeMatches(normLink, appRoutes)) {
    if (!missing.has(normLink)) {
      missing.set(normLink, new Set());
    }
    missing.get(normLink).add(file);
  }
});

console.log('Distinct missing routes (leading to 404):', missing.size);

const results = [];
for (const [link, files] of missing.entries()) {
  results.push({
    link,
    files: Array.from(files)
  });
}

results.sort((a,b) => a.link.localeCompare(b.link));

console.log('\n--- DETAILED MISSING ROUTES REPORT ---');
results.forEach(r => {
  console.log(`\n🔴 Route: ${r.link}`);
  console.log(`   Referenced in (${r.files.length} files):`);
  r.files.slice(0, 5).forEach(f => console.log(`     - ${f}`));
});

// Also output as JSON for processing
fs.writeFileSync(path.join(__dirname, '404-routes-report.json'), JSON.stringify(results, null, 2), 'utf8');
