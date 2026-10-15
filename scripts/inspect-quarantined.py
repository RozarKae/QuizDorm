import json
import sys

sys.stdout.reconfigure(encoding='utf-8')

with open('lib/data/pending-review-questions.json', 'r', encoding='utf-8') as f:
    pending = json.load(f)

print(f"Total quarantined questions: {len(pending)}")
for i, item in enumerate(pending[:12]):
    q = item['question']
    issues = item.get('issues', [])
    score = item.get('score', 0)
    issue_codes = [iss.get('code') for iss in issues]
    issue_msgs = [iss.get('message') for iss in issues]
    options = [o.get('text') for o in q.get('options', [])]
    correct_opts = [o.get('text') for o in q.get('options', []) if o.get('isCorrect')]
    correct_ans = correct_opts[0] if correct_opts else "None"
    
    print(f"[{i+1}] ID: {q['id']} | Page: {q.get('sourcePage')} | Score: {score}")
    print(f"    Title: {q['title']}")
    print(f"    Correct: {correct_ans}")
    print(f"    Options: {options}")
    print(f"    Issue Codes: {issue_codes}")
    print(f"    Issue Messages: {issue_msgs}")
    print("---")
