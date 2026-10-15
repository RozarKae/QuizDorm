import json

transcript_path = r"C:\Users\krato\.gemini\antigravity-ide\brain\7e911ab5-e202-423c-b6e9-3ad0338b2850\.system_generated\logs\transcript_full.jsonl"

with open(transcript_path, 'r', encoding='utf-8') as f:
    for i, line in enumerate(f):
        if "==Start of PDF==" in line:
            print(f"Found '==Start of PDF==' in line {i}")
            data = json.loads(line)
            print("Keys:", data.keys())
            for k in data.keys():
                val = str(data[k])
                if "==Start of PDF==" in val:
                    print(f"Key '{k}' contains the PDF text, length: {len(val)}")
                    import re
                    ocr_pages = re.findall(r'==Start of OCR for page (\d+)==\s*([\s\S]*?)\s*==End of OCR for page \1==', val)
                    print(f"Extracted {len(ocr_pages)} OCR pages!")
                    pages_dict = {int(p): t.strip() for p, t in ocr_pages}
                    with open('scripts/pipeline/ocr-extracted-pages.json', 'w', encoding='utf-8') as out_f:
                        json.dump(pages_dict, out_f, indent=2, ensure_ascii=False)
                    print(f"Saved {len(pages_dict)} clean OCR pages to scripts/pipeline/ocr-extracted-pages.json!")
                    exit(0)
print("Not found in transcript lines.")
