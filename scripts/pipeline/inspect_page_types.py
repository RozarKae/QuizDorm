import json
import re

with open('scripts/pipeline/raw-extracted-pages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

pages = data['pages']

# Count how many pages have question indicators vs tables vs lists
q_pages = 0
table_pages = 0
rapid_fire_pages = 0
empty_pages = 0

for p in pages:
    txt = p['text']
    if not txt.strip():
        empty_pages += 1
    if re.search(r'Q\d*\.|\bQuiz\b', txt, re.IGNORECASE):
        q_pages += 1
    if re.search(r'RAPID[\s\-]*FIRE', txt, re.IGNORECASE):
        rapid_fire_pages += 1
    if re.search(r'Headquarters|Capital|Winner|President|Director|Author|Pillar|Mission', txt):
        table_pages += 1

print(f"Empty pages: {empty_pages}")
print(f"Pages with Q. / Quiz markers: {q_pages}")
print(f"Pages with Rapid Fire markers: {rapid_fire_pages}")
print(f"Pages with tabular/entity content: {table_pages}")
