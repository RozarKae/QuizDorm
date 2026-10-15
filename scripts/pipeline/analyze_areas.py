import json
import re

with open('scripts/pipeline/raw-extracted-pages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

pages = data['pages']
print(f'Total pages loaded: {len(pages)}')

areas = []
for p in pages:
    txt = p['text']
    area_match = re.search(r'AREA\s+(\d+)\s+[—\-]\s+([^\n\r]+)', txt, re.IGNORECASE)
    if area_match:
        areas.append({
            'page': p['pageNumber'],
            'areaNum': area_match.group(1),
            'areaTitle': area_match.group(2).strip()
        })

print(f'Found {len(areas)} Area headings:')
for a in areas:
    print(f"  Page {a['page']}: Area {a['areaNum']} - {a['areaTitle']}")
