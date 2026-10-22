const fs = require('fs');
const content = fs.readFileSync('lib/data/taxonomy.ts', 'utf8');
const mapMatch = content.match(/TAG_TO_TOPICS_MAP:\s*Record<string,\s*string\[\]>\s*=\s*\{([\s\S]*?)\n\};/);
if (!mapMatch) {
  console.log('Could not find map');
  process.exit(1);
}
const lines = mapMatch[1].split('\n');
const keys = {};
let dups = 0;
lines.forEach((l, idx) => {
  const m = l.match(/^\s*["']?([a-zA-Z0-9_-]+)["']?\s*:/);
  if (m) {
    const k = m[1];
    if (keys[k]) {
      console.log(`Duplicate key found: "${k}" at line offset ${keys[k]} and ${idx + 1}`);
      dups++;
    } else {
      keys[k] = idx + 1;
    }
  }
});
console.log(`Check complete. Total duplicates: ${dups}`);
