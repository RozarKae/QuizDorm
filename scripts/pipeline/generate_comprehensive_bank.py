import json
import re
import hashlib

def clean(text):
    if not text:
        return ""
    text = re.sub(r'[\r\n\t]+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

def make_id(area_num, index):
    return f"qb-area{int(area_num):02d}-{index:04d}"

# Load raw pages
with open('scripts/pipeline/raw-extracted-pages.json', 'r', encoding='utf-8') as f:
    doc_data = json.load(f)

pages = doc_data['pages']
print(f"Loaded {len(pages)} pages from raw extraction.")

# Load pipeline distractor pools
from collections import defaultdict

AREA_METADATA = {
    1: {"name": "India Current Affairs", "subject": "National Affairs", "category": "Current Affairs", "grade": "Grade 6-8"},
    2: {"name": "World Current Affairs", "subject": "World Affairs", "category": "International Relations", "grade": "Grade 6-8"},
    3: {"name": "Politics & Governance", "subject": "Civics & Governance", "category": "Indian Polity", "grade": "Grade 6-8"},
    4: {"name": "Science & Technology", "subject": "Science & Technology", "category": "Technology Policy", "grade": "Grade 6-8"},
    5: {"name": "Space & Astronomy", "subject": "Science & Astronomy", "category": "Space Exploration", "grade": "Grade 6-8"},
    6: {"name": "Sports & Games", "subject": "Sports & Athletics", "category": "Major Tournaments", "grade": "Grade 6-8"},
    7: {"name": "Awards & Honours", "subject": "Awards & Culture", "category": "National & Global Honours", "grade": "Grade 6-8"},
    8: {"name": "Important Personalities", "subject": "General Knowledge", "category": "Notable Personalities", "grade": "Grade 6-8"},
    9: {"name": "Economy & Business", "subject": "Economics", "category": "Indian & World Economy", "grade": "Grade 6-8"},
    10: {"name": "Environment & Ecology", "subject": "Environmental Science", "category": "Ecology & Conservation", "grade": "Grade 6-8"},
    11: {"name": "Geography & Places", "subject": "Geography", "category": "Indian & World Geography", "grade": "Grade 3-5"},
    12: {"name": "Books & Authors", "subject": "Literature & Books", "category": "Indian & World Authors", "grade": "Grade 3-5"},
    13: {"name": "Arts & Entertainment", "subject": "Arts & Culture", "category": "Cinema, Music & Dance", "grade": "Grade 3-5"},
    14: {"name": "Health & Human Body", "subject": "Health & Biology", "category": "Human Anatomy & Public Health", "grade": "Grade 3-5"},
    15: {"name": "Digital & AI", "subject": "Computer Science", "category": "Digital Technology & AI", "grade": "Grade 3-5"},
    16: {"name": "Important Days & Events", "subject": "General Knowledge", "category": "National & International Days", "grade": "Grade 3-5"},
    17: {"name": "Tamil Nadu Heritage & GK", "subject": "Regional Studies", "category": "Tamil Nadu Heritage & Culture", "grade": "Grade 3-5"},
    18: {"name": "Local & Regional Awareness", "subject": "Regional Studies", "category": "South India & Local GK", "grade": "Grade 3-5"},
}

def determine_area(page_num):
    if page_num <= 13: return 1
    if page_num <= 35: return 2
    if page_num <= 57: return 3
    if page_num <= 79: return 4
    if page_num <= 105: return 5
    if page_num <= 131: return 6
    if page_num <= 154: return 7
    if page_num <= 184: return 8
    if page_num <= 211: return 9
    if page_num <= 243: return 10
    if page_num <= 275: return 11
    if page_num <= 296: return 12
    if page_num <= 321: return 13
    if page_num <= 352: return 14
    if page_num <= 383: return 15
    if page_num <= 411: return 16
    if page_num <= 450: return 17
    return 18

print("Script template ready.")
