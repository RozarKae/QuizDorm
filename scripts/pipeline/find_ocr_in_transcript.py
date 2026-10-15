import json
import re

transcript_path = r"C:\Users\krato\.gemini\antigravity-ide\brain\7e911ab5-e202-423c-b6e9-3ad0338b2850\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if "==Start of OCR" in line:
            print(f"Line {i} has '==Start of OCR', length: {len(line)}")
            data = json.loads(line)
            print("Keys:", data.keys())
            print("Type:", data.get("type"))
            # search for pages in this line
            m = re.findall(r'==Start of OCR for page (\d+)==', line)
            print(f"Found {len(m)} OCR pages in line {i}!")
            
            ocr_pages = re.findall(r'==Start of OCR for page (\d+)==\s*([\s\S]*?)\s*==End of OCR for page \1==', line)
            print(f"Successfully extracted {len(ocr_pages)} OCR pages!")
            pages_dict = {}
            for p_num, p_txt in ocr_pages:
                pages_dict[int(p_num)] = p_txt.strip()
            with open('scripts/pipeline/ocr-extracted-pages.json', 'w', encoding='utf-8') as out_f:
                json.dump(pages_dict, out_f, indent=2, ensure_ascii=False)
            print("Saved to scripts/pipeline/ocr-extracted-pages.json!")
            break
