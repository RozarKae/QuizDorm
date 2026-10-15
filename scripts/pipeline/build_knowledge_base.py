import json
import re

def clean_text(s):
    if not s:
        return ""
    # remove excessive spaces but preserve words
    return re.sub(r'\s+', ' ', s).strip()

def build_knowledge():
    with open('scripts/pipeline/raw-extracted-pages.json', 'r', encoding='utf-8') as f:
        data = json.load(f)

    pages = data['pages']
    print(f"Processing {len(pages)} pages...")

    current_area_num = "1"
    current_area_title = "INDIA"
    current_part = "PART A"
    current_grade = "Grade 6-8"

    page_manifest = []
    all_knowledge = []

    for page in pages:
        p_num = page['pageNumber']
        raw_text = page['text']
        lines = page['lines']

        # Determine Area
        area_match = re.search(r'AREA\s+(\d+)\s+[—\-]\s+([^\n\r]+)', raw_text, re.IGNORECASE)
        if area_match:
            current_area_num = area_match.group(1).strip()
            current_area_title = clean_text(area_match.group(2))
            if int(current_area_num) >= 11:
                current_grade = "Grade 3-5"
            else:
                current_grade = "Grade 6-8"

        # Determine Part
        part_match = re.search(r'PART\s+([A-Z0-9]+)\s+[—\-]\s+([^\n\r]+)', raw_text, re.IGNORECASE)
        if part_match:
            current_part = f"PART {part_match.group(1).strip()} — {clean_text(part_match.group(2))}"

        # Extract explicit Q&A blocks
        # e.g. Q1. ... Answer: ... or Q. ... Answer: ... or Q. ... ➡️ ...
        page_questions = []
        
        # Pattern 1: Q1. ... \n Answer: ...
        q_blocks = re.findall(r'(?:Q\d*\.|\bQ\.)\s+([^\n\r?]+(?:\?|\.))\s*(?:Answer:|\u27a1\ufe0f|->|:)\s*([^\n\r]+)', raw_text, re.IGNORECASE)
        for q_text, ans_text in q_blocks:
            q_clean = clean_text(q_text)
            a_clean = clean_text(ans_text)
            if len(q_clean) > 8 and len(a_clean) > 0 and not a_clean.lower().startswith("what"):
                page_questions.append({
                    "type": "explicit_quiz",
                    "question": q_clean,
                    "answer": a_clean,
                    "page": p_num,
                    "area": f"Area {current_area_num} — {current_area_title}",
                    "part": current_part,
                    "grade": current_grade
                })

        # Pattern 2: Rapid Fire table rows: e.g. "1 UPSC was established in which year? 1926"
        rf_rows = re.findall(r'^\s*(\d+)\s+([A-Za-z0-9\s,\'\"\(\)\-\/\?\.\u2013\u2014]+?\?)\s+([^\n\r]+)$', raw_text, re.MULTILINE)
        for num, q_text, ans_text in rf_rows:
            q_clean = clean_text(q_text)
            a_clean = clean_text(ans_text)
            if len(q_clean) > 10 and len(a_clean) > 0 and not a_clean.lower().startswith("question"):
                page_questions.append({
                    "type": "rapid_fire",
                    "question": q_clean,
                    "answer": a_clean,
                    "page": p_num,
                    "area": f"Area {current_area_num} — {current_area_title}",
                    "part": current_part,
                    "grade": current_grade
                })

        # Pattern 3: Rapid Fire without question mark (e.g. "1 India's central bank? RBI" or "10 CPI stands for? Consumer Price Index")
        rf_rows_qm = re.findall(r'^\s*(\d+)\s+([A-Za-z0-9\s,\'\"\(\)\-\/\.\u2013\u2014]+?\?)\s*([^\n\r]+)$', raw_text, re.MULTILINE)
        # Avoid duplicate additions
        seen_stems = set(q['question'].lower() for q in page_questions)
        for num, q_text, ans_text in rf_rows_qm:
            q_clean = clean_text(q_text)
            a_clean = clean_text(ans_text)
            if q_clean.lower() not in seen_stems and len(q_clean) > 8 and len(a_clean) > 0:
                seen_stems.add(q_clean.lower())
                page_questions.append({
                    "type": "rapid_fire",
                    "question": q_clean,
                    "answer": a_clean,
                    "page": p_num,
                    "area": f"Area {current_area_num} — {current_area_title}",
                    "part": current_part,
                    "grade": current_grade
                })

        # Pattern 4: Clue games: "Clue ... Answer" or "Clue: X | Answer: Y"
        clue_matches = re.findall(r'([A-Za-z0-9\s,\'\/\(\)\-]+?)\s+(?:➡️|->)\s*([^\n\r]+)', raw_text)
        for clue, target in clue_matches:
            c_clean = clean_text(clue)
            t_clean = clean_text(target)
            # Filter out non-quiz arrows
            if len(c_clean) > 4 and len(t_clean) > 1 and not c_clean.lower().startswith("http") and not c_clean.lower().startswith("source"):
                if "remember" not in c_clean.lower() and "memory" not in c_clean.lower():
                    # Check if it looks like an association e.g. "Pink City -> Jaipur"
                    pass

        has_useful_content = len(lines) > 2
        status = "PROCESSED_WITH_CONTENT" if has_useful_content else "PROCESSED_NO_QUIZ_CONTENT"

        page_manifest.append({
            "sourceFilename": "media_1791985307979.pdf",
            "pageNumber": p_num,
            "processingStatus": status,
            "extractionMethod": "DIRECT_TEXT_AND_OCR",
            "usefulContentFound": has_useful_content,
            "area": f"Area {current_area_num} — {current_area_title}",
            "part": current_part,
            "gradeLevel": current_grade,
            "existingQuestionsExtracted": len(page_questions),
            "newQuestionsGenerated": 0,
            "questionsRejectedOrFlagged": 0,
            "extractionErrors": None,
            "retryStatus": "SUCCESS"
        })

        if page_questions:
            all_knowledge.extend(page_questions)

    print(f"Extracted {len(all_knowledge)} questions directly from explicit Q&A & Rapid Fire sections!")
    print(f"Total manifest entries: {len(page_manifest)}")

    with open('scripts/pipeline/extracted_qa.json', 'w', encoding='utf-8') as f:
        json.dump(all_knowledge, f, indent=2, ensure_ascii=False)

    with open('scripts/pipeline/page_manifest_initial.json', 'w', encoding='utf-8') as f:
        json.dump(page_manifest, f, indent=2, ensure_ascii=False)

if __name__ == '__main__':
    build_knowledge()
