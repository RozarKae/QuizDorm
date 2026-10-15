import json
import re

def clean_text(s):
    if not s:
        return ""
    return re.sub(r'\s+', ' ', s).strip()

with open('scripts/pipeline/raw-extracted-pages.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

pages = data['pages']

table_knowledge = []

for page in pages:
    p_num = page['pageNumber']
    text = page['text']
    lines = page['lines']

    # 1. State / Capital tables
    # Check for "State Capital" or "Country Capital"
    if "State Capital" in text or "Country Capital" in text or "Union Territory Capital" in text:
        # Extract pairs from lines
        for i, line in enumerate(lines):
            # Matches: e.g. "Andhra Pradesh Amaravati" or "Australia Canberra"
            m = re.match(r'^([A-Z][a-zA-Z\s&\.\(\)]+?)\s{2,}([A-Z][a-zA-Z\s,\.\*]+)$', line)
            if m:
                item = clean_text(m.group(1))
                val = clean_text(m.group(2)).replace("*", "")
                if item not in ["State", "Country", "Union Territory", "Total", "No.", "Pillar"]:
                    table_knowledge.append({
                        "category": "Capitals",
                        "entity": item,
                        "value": val,
                        "page": p_num
                    })

    # 2. Institution / Headquarters tables
    if "Institution Headquarters" in text or "Organisation Headquarters" in text or "Headquarters" in text:
        for line in lines:
            m = re.match(r'^([A-Z][a-zA-Z0-9\s&\.\(\)\-]+?)\s{2,}([A-Z][a-zA-Z\s,\.\*]+)$', line)
            if m:
                item = clean_text(m.group(1))
                val = clean_text(m.group(2))
                if item not in ["Institution", "Organisation", "Agency", "No.", "Award", "Festival"] and val in ["Mumbai", "Bengaluru", "New Delhi", "New York", "Geneva", "Washington, D.C.", "Vienna", "Brussels", "Paris", "The Hague", "Manila", "Rome"]:
                    table_knowledge.append({
                        "category": "Headquarters",
                        "entity": item,
                        "value": val,
                        "page": p_num
                    })

    # 3. Book / Author tables
    if "Book Author" in text or "Author Famous work" in text:
        for line in lines:
            m = re.match(r'^([A-Z][a-zA-Z0-9\s,\'\"\.\(\)\-]+?)\s{2,}([A-Z][a-zA-Z0-9\s,\'\"\.\(\)&]+)$', line)
            if m:
                col1 = clean_text(m.group(1))
                col2 = clean_text(m.group(2))
                if col1 not in ["Book", "Author", "Character", "Term"] and len(col1) > 2 and len(col2) > 2:
                    table_knowledge.append({
                        "category": "Books_Authors",
                        "entity": col1,
                        "value": col2,
                        "page": p_num
                    })

    # 4. Dance / State tables
    if "Dance State" in text or "Dance State/Region" in text:
        for line in lines:
            m = re.match(r'^([A-Z][a-zA-Z\s]+?)\s{2,}([A-Z][a-zA-Z\s]+)$', line)
            if m:
                col1 = clean_text(m.group(1))
                col2 = clean_text(m.group(2))
                if col1 not in ["Dance", "State", "Region"] and len(col1) > 3:
                    table_knowledge.append({
                        "category": "Dances",
                        "entity": col1,
                        "value": col2,
                        "page": p_num
                    })

    # 5. National Parks & Wildlife / State
    if "Tiger Reserve State" in text or "National Park" in text or "Wetland State" in text or "Place State" in text:
        for line in lines:
            m = re.match(r'^([A-Z][a-zA-Z0-9\s,\'\.\(\)\-]+?)\s{2,}([A-Z][a-zA-Z\s,\.\/]+)$', line)
            if m:
                col1 = clean_text(m.group(1))
                col2 = clean_text(m.group(2))
                if col1 not in ["Place", "Tiger Reserve", "Wetland", "State", "Monument"] and len(col1) > 3:
                    table_knowledge.append({
                        "category": "Geographical_Places",
                        "entity": col1,
                        "value": col2,
                        "page": p_num
                    })

print(f"Extracted {len(table_knowledge)} structured table entities!")
with open('scripts/pipeline/extracted_tables.json', 'w', encoding='utf-8') as f:
    json.dump(table_knowledge, f, indent=2, ensure_ascii=False)
