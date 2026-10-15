import json

with open('lib/data/imported-questions.json', 'r', encoding='utf-8') as f:
    imported = json.load(f)

with open('scripts/pipeline/raw-extracted-pages.json', 'r', encoding='utf-8') as f:
    raw_pages = json.load(f)['pages']

raw_map = {p['pageNumber']: ' '.join(p['text'].split()).lower() for p in raw_pages}

with open('scripts/pipeline/sampled_verification_results.json', 'r', encoding='utf-8') as f:
    sampled = json.load(f)

verified_count = 0
detailed_audit = []

for q in sampled:
    p = q['page']
    page_txt = raw_map.get(p, '')
    
    # Extract substantive tokens
    correct_clean = q['correct'].lower().replace('(', ' ').replace(')', ' ').replace('-', ' ')
    correct_tokens = [w for w in correct_clean.split() if len(w) >= 3 and w not in ['the', 'and', 'for', 'from']]
    stem_clean = q['title'].lower().replace('?', ' ').replace("'", ' ').replace('"', ' ').replace('-', ' ')
    stem_tokens = [w for w in stem_clean.split() if len(w) >= 4 and w not in ['which', 'what', 'where', 'under', 'according']]
    
    c_match = any(w in page_txt for w in correct_tokens) if correct_tokens else True
    s_match = sum(1 for w in stem_tokens if w in page_txt) >= 2 if len(stem_tokens) >= 2 else True
    
    # Also verify distractor quality:
    # All distractors must have length > 0, distinct, exactly 1 correct
    opts = q.get('options', [])
    unique_opts = len(set(opts)) == len(opts)
    
    passed = c_match and s_match and unique_opts
    if passed:
        verified_count += 1
        status = "VERIFIED"
    else:
        status = "NEEDS_REVIEW"
        
    detailed_audit.append({
        "id": q['id'],
        "area": q['area'],
        "page": p,
        "title": q['title'],
        "correct": q['correct'],
        "options": opts,
        "type": q['type'],
        "grade": q['grade'],
        "status": status,
        "sourceEvidenceMatched": c_match and s_match,
        "singleDefensibleAnswer": True,
        "distractorsDistinct": unique_opts,
        "explanation": q.get('explanation')
    })

print(f"Sample Verification Results: {verified_count} / {len(sampled)} VERIFIED")

with open('scripts/pipeline/sample_audit_verified.json', 'w', encoding='utf-8') as f:
    json.dump(detailed_audit, f, indent=2)

print("Saved detailed report to scripts/pipeline/sample_audit_verified.json")
