import json
import re

with open('lib/data/pending-review-questions.json', 'r', encoding='utf-8') as f:
    pending = json.load(f)

MONTHS = {"january", "february", "march", "april", "may", "june", "july", "august", "september", "october", "november", "december"}
ORDINALS = {"st", "nd", "rd", "th"}

results = []

for item in pending:
    q = item['question']
    issues = item.get('issues', [])
    correct_opts = [o['text'] for o in q.get('options', []) if o.get('isCorrect')]
    correct_ans = correct_opts[0] if correct_opts else ""
    options = [o['text'] for o in q.get('options', [])]
    
    # Check if all options are calendar dates (e.g. \d+ Month)
    is_date_q = all(
        re.match(r'^\d{1,2}\s+[A-Za-z]+$', opt.strip()) and opt.strip().split()[-1].lower() in MONTHS
        for opt in options
    )
    
    # Check if all options are ordinals (e.g. \d+(st|nd|rd|th))
    is_ordinal_q = all(
        re.match(r'^\d+(st|nd|rd|th)$', opt.strip().lower())
        for opt in options
    )
    
    # Check if other issues exist
    non_unit_issues = [iss for iss in issues if iss['code'] != 'UNIT_INCONSISTENCY_DISTRACTOR']
    
    classification = "UNKNOWN"
    if is_date_q and len(non_unit_issues) == 0:
        classification = "FALSE_POSITIVE_DATE_MONTH"
    elif is_ordinal_q and len(non_unit_issues) == 0:
        classification = "FALSE_POSITIVE_ORDINAL_SUFFIX"
    else:
        classification = "GENUINE_OR_MIXED_DEFECT"
        
    results.append({
        "id": q['id'],
        "page": q.get('sourcePage'),
        "title": q['title'],
        "correct": correct_ans,
        "options": options,
        "is_date": is_date_q,
        "is_ordinal": is_ordinal_q,
        "non_unit_issues": [iss['code'] for iss in non_unit_issues],
        "classification": classification
    })

print(f"Total reviewed: {len(results)}")
classes = {}
for r in results:
    classes[r['classification']] = classes.get(r['classification'], 0) + 1
print("Classifications:", classes)

print("\n--- Detailed breakdown ---")
for r in results:
    print(f"[{r['id']}] (Page {r['page']}) -> {r['classification']}")
    print(f"    Title: {r['title']}")
    print(f"    Options: {r['options']}")
    if r['non_unit_issues']:
        print(f"    Non-unit issues: {r['non_unit_issues']}")
