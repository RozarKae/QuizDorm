import json
import re

transcript_path = r"C:\Users\krato\.gemini\antigravity-ide\brain\7e911ab5-e202-423c-b6e9-3ad0338b2850\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for line in f:
        step = json.loads(line)
        if step.get("type") == "USER_INPUT":
            content = step.get("content", "")
            print(f"Found USER_INPUT with length {len(content)}")
            # Search for pages
            ocr_pages = re.findall(r'==Start of OCR for page (\d+)==\s*([\s\S]*?)\s*==End of OCR for page \1==', content)
            print(f"Found {len(ocr_pages)} OCR page blocks in transcript!")
            if ocr_pages:
                print(f"Page 1 OCR snippet:\n{ocr_pages[0][1][:200]}")
                print(f"Page 484 OCR snippet:\n{ocr_pages[-1][1][:200]}")
                
                # Save each OCR page clean
                pages_dict = {}
                for page_num_str, ocr_text in ocr_pages:
                    pages_dict[int(page_num_str)] = ocr_text.strip()
                
                with open('scripts/pipeline/ocr-extracted-pages.json', 'w', encoding='utf-8') as out_f:
                    json.dump(pages_dict, out_f, indent=2, ensure_ascii=False)
                print(f"Saved {len(pages_dict)} clean OCR pages to scripts/pipeline/ocr-extracted-pages.json")
            break
