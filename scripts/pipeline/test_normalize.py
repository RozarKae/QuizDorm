import json
import re

with open('scripts/pipeline/raw-extracted-pages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

for p_num in [1, 2, 25, 247, 278, 385, 412]:
    p = data['pages'][p_num - 1]
    raw = p['text']
    # normalize spaces: replace 2 or more spaces with 1 space
    normalized = re.sub(r'[ \t]+', ' ', raw)
    # clean punctuation spacing like "1926 ." -> "1926."
    normalized = re.sub(r'\s+([,\.?!:])', r'\1', normalized)
    print(f"=== PAGE {p_num} NORMALIZED SNIPPET ===")
    print(normalized[:300].encode('ascii', errors='replace').decode('ascii'))
    print("-" * 50)
