import json
from collections import Counter

with open('lib/data/imported-questions.json', 'r', encoding='utf-8') as f:
    questions = json.load(f)

print(f"Total questions in imported-questions.json: {len(questions)}")
topics = Counter(q.get('topic') for q in questions)
print("\nTop 15 topics in existing dataset:")
for t, c in topics.most_common(15):
    print(f"  {t}: {c}")

subjects = Counter(q.get('subject') for q in questions)
print("\nSubjects in existing dataset:")
for s, c in subjects.items():
    print(f"  {s}: {c}")

print("\nSample question 1:")
print("Title:", questions[0]['title'])
print("Options:")
for o in questions[0]['options']:
    print(f"  - {o['text']} (isCorrect: {o['isCorrect']})")

print("\nSample question 15:")
print("Title:", questions[14]['title'])
print("Options:")
for o in questions[14]['options']:
    print(f"  - {o['text']} (isCorrect: {o['isCorrect']})")
