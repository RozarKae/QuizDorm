import json

with open('scripts/pipeline/extracted_qa.json', 'r', encoding='utf-8') as f:
    qas = json.load(f)

print(f"Total extracted Q&A pairs: {len(qas)}")
for i in [0, 5, 10, 20, 50, 100, 150, 200, 250, 300, 350, 400, 450]:
    if i < len(qas):
        q = qas[i]
        print(f"[{i+1}] P.{q['page']} ({q['area']}) | Type: {q['type']}")
        print(f"    Q: {q['question']}")
        print(f"    A: {q['answer']}")
