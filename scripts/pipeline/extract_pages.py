import json
import os
import pypdf

pdf_path = r"C:\Users\krato\.gemini\antigravity-ide\brain\7e911ab5-e202-423c-b6e9-3ad0338b2850\.user_uploaded\media_1791985307979.pdf"
output_path = r"F:\quizdorm\scripts\pipeline\raw-extracted-pages.json"

reader = pypdf.PdfReader(pdf_path)
total_pages = len(reader.pages)
print(f"Reading {total_pages} pages from {pdf_path}...")

pages_data = []

for idx, page in enumerate(reader.pages):
    page_num = idx + 1
    raw_text = page.extract_text() or ""
    # Normalize unicode spaces and clean up carriage returns
    clean_lines = [line.strip() for line in raw_text.splitlines() if line.strip()]
    
    pages_data.append({
        "pageNumber": page_num,
        "text": raw_text,
        "lines": clean_lines,
        "charCount": len(raw_text),
        "lineCount": len(clean_lines)
    })

with open(output_path, "w", encoding="utf-8") as f:
    json.dump({
        "sourcePdf": "media_1791985307979.pdf",
        "sourcePdfPath": pdf_path,
        "totalPages": total_pages,
        "pages": pages_data
    }, f, indent=2, ensure_ascii=False)

print(f"Successfully extracted {len(pages_data)} pages to {output_path}")
