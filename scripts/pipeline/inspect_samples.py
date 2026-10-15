import json
import sys

# Ensure UTF-8 output
sys.stdout.reconfigure(encoding='utf-8')

with open('scripts/pipeline/raw-extracted-pages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

pages = data['pages']

for p in pages[:5]:
    print(f"=== PAGE {p['pageNumber']} ===")
    safe_text = p['text'].encode('ascii', errors='replace').decode('ascii')
    print(safe_text)
    print("-" * 50)
