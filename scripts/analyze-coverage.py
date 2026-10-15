import json

with open('scripts/pipeline/page-manifest.json', 'r', encoding='utf-8') as f:
    manifest = json.load(f)

with open('lib/data/imported-questions.json', 'r', encoding='utf-8') as f:
    imported = json.load(f)

# Count questions per page
q_page_counts = {}
for q in imported:
    p = q.get('sourcePage')
    q_page_counts[p] = q_page_counts.get(p, 0) + 1

# Analyze manifest
area_coverage = {}
zero_q_pages = []

for m in manifest:
    p = m['pageNumber']
    area = m.get('area', 'Unknown')
    q_count = q_page_counts.get(p, 0)
    
    if area not in area_coverage:
        area_coverage[area] = {'pages': [], 'questions': 0}
    area_coverage[area]['pages'].append(p)
    area_coverage[area]['questions'] += q_count
    
    if q_count == 0:
        zero_q_pages.append((p, area, m.get('part', '')))

print('Total pages in manifest:', len(manifest))
print('Pages with at least 1 approved question:', len(q_page_counts))
print('Pages with zero approved questions:', len(zero_q_pages))

print('\nArea Coverage:')
for area, data in area_coverage.items():
    p_min = min(data['pages'])
    p_max = max(data['pages'])
    count = data['questions']
    pages_count = len(data['pages'])
    print(f"  {area}: {pages_count} pages (p.{p_min}-{p_max}), {count} questions")

# Let's inspect the zero-q pages to understand their nature
print('\nSample of zero-q pages:')
for p, area, part in zero_q_pages[:15]:
    print(f"  Page {p} in {area}: {part}")
