import json

with open('scripts/pipeline/raw-extracted-pages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

pages = data['pages']
for p_num in [25, 247, 277, 330, 381]:
    p = pages[p_num - 1]
    print(f"=== PAGE {p_num} ===")
    for line in p['lines'][:15]:
        print(repr(line))
