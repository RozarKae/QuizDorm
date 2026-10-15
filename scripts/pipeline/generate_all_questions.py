import json
import os
import re
import random
import hashlib

def clean(text):
    if not text:
        return ""
    text = re.sub(r'[\r\n\t]+', ' ', text)
    text = re.sub(r'\s+', ' ', text)
    return text.strip()

# Semantic Pools
POOLS = {
    "years": ["1919", "1926", "1935", "1947", "1950", "1954", "1969", "1971", "1973", "1984", "1987", "1992", "2013", "2014", "2015", "2018", "2022", "2023", "2024", "2025", "2026", "2027", "2028", "2029", "2030", "2031", "2036", "2047", "2070"],
    "indian_states": ["Tamil Nadu", "Kerala", "Karnataka", "Andhra Pradesh", "Telangana", "Maharashtra", "Gujarat", "Rajasthan", "Madhya Pradesh", "Uttar Pradesh", "Odisha", "West Bengal", "Bihar", "Assam", "Punjab", "Haryana", "Himachal Pradesh", "Uttarakhand", "Jharkhand", "Chhattisgarh", "Goa", "Sikkim", "Manipur", "Meghalaya", "Mizoram", "Nagaland", "Tripura", "Arunachal Pradesh"],
    "indian_cities": ["Chennai", "Madurai", "Coimbatore", "Tiruchirappalli", "Salem", "Tiruppur", "Erode", "Thanjavur", "Kanyakumari", "Rameswaram", "Bengaluru", "Hyderabad", "Amaravati", "Thiruvananthapuram", "Kochi", "Visakhapatnam", "Mumbai", "New Delhi", "Kolkata", "Jaipur", "Lucknow", "Patna", "Bhopal", "Gandhinagar", "Chandigarh", "Shimla", "Dehradun", "Vellore", "Kumbakonam"],
    "world_countries": ["India", "United States", "China", "Japan", "France", "Germany", "United Kingdom", "Russia", "Brazil", "Canada", "Australia", "South Africa", "Egypt", "Indonesia", "Malaysia", "Philippines", "South Korea", "Italy", "Spain", "Norway", "Sweden", "Switzerland", "Tanzania", "Türkiye", "Timor-Leste", "Sri Lanka", "Bhutan", "Nepal", "Bangladesh", "Pakistan", "New Zealand"],
    "world_capitals": ["Canberra", "Brasília", "Ottawa", "Beijing", "Cairo", "Paris", "Berlin", "Jakarta", "Rome", "Tokyo", "Nairobi", "Kuala Lumpur", "Kathmandu", "Wellington", "Abuja", "Manila", "Moscow", "Riyadh", "Singapore", "Pretoria", "Seoul", "Bangkok", "Abu Dhabi", "London", "Washington, D.C.", "Hanoi", "Oslo", "Stockholm", "Geneva", "Vienna", "Brussels", "Thimphu", "Dhaka", "Islamabad"],
    "organisations": ["ISRO", "DRDO", "CSIR", "DST", "DBT", "DAE", "BARC", "ICMR", "MeitY", "RBI", "SEBI", "NABARD", "UIDAI", "NHAI", "ECI", "UPSC", "NITI Aayog", "WHO", "WTO", "IMF", "World Bank", "UNESCO", "UNICEF", "UNEP", "CITES", "IUCN", "WMO", "FAO", "IPU", "ACM"],
    "authors": ["Rabindranath Tagore", "R. K. Narayan", "Ruskin Bond", "Dr. A. P. J. Abdul Kalam", "Munshi Premchand", "Mulk Raj Anand", "Arundhati Roy", "Vikram Seth", "Salman Rushdie", "Amitav Ghosh", "Shashi Tharoor", "Sudha Murty", "Amish Tripathi", "William Shakespeare", "Charles Dickens", "Mark Twain", "Jane Austen", "J. K. Rowling", "J. R. R. Tolkien", "C. S. Lewis", "Lewis Carroll", "Agatha Christie", "Jules Verne", "George Orwell", "Antoine de Saint-Exupéry", "Arthur Conan Doyle", "Roald Dahl", "Rudyard Kipling"],
    "sports_persons": ["D. Gukesh", "Neeraj Chopra", "P. V. Sindhu", "Saina Nehwal", "Lakshya Sen", "Satwik Rankireddy", "Chirag Shetty", "Harmanpreet Kaur", "Lionel Messi", "Mirabai Chanu", "Lovlina Borgohain", "Parveen Hooda", "Ankush Panghal", "Sujeet Kalkal", "Aman Sehrawat", "Pranavi Urs", "Ravichandran Ashwin", "Abhishek Sharma", "Tilak Varma", "Shreyas Iyer", "Major Dhyan Chand", "Viswanathan Anand", "Avinash Sable"],
    "dances": ["Bharatanatyam", "Kathak", "Kathakali", "Kuchipudi", "Odissi", "Manipuri", "Mohiniyattam", "Sattriya", "Garba", "Bhangra", "Ghoomar", "Lavani", "Bihu", "Karagattam", "Kavadi Attam", "Yakshagana"],
    "vitamins": ["Vitamin A", "Vitamin B1", "Vitamin B12", "Vitamin C", "Vitamin D", "Vitamin E", "Vitamin K"],
    "deficiencies": ["Night blindness", "Beriberi", "Anaemia", "Scurvy", "Rickets", "Goitre", "Bleeding disorders"],
    "tech_terms": ["CPU", "GPU", "RAM", "ROM", "SSD", "HTTP", "HTTPS", "URL", "HTML", "AI", "ML", "NLP", "LLM", "IoT", "5G", "QR", "UPI", "LiDAR", "2FA", "QKD"],
    "dates": ["26 January", "28 February", "8 March", "22 March", "7 April", "22 April", "3 May", "5 June", "8 June", "21 June", "1 July", "26 July", "7 August", "12 August", "15 August", "29 August", "5 September", "8 September", "14 September", "15 September", "16 September", "21 September", "27 September", "2 October", "5 October", "8 October", "16 October", "24 October", "31 October", "14 November", "20 November", "26 November", "10 December", "11 December", "22 December"],
    "rivers": ["Ganga", "Yamuna", "Brahmaputra", "Indus", "Godavari", "Krishna", "Cauvery", "Narmada", "Tapi", "Mahanadi", "Vaigai", "Thamirabarani", "Palar", "Pennaiyar"],
    "lakes": ["Wular Lake", "Dal Lake", "Chilika Lake", "Sambhar Lake", "Loktak Lake", "Vembanad Lake", "Pulicat Lake", "Kolleru Lake"],
    "national_parks": ["Jim Corbett National Park", "Kaziranga National Park", "Gir National Park", "Ranthambore National Park", "Kanha National Park", "Bandhavgarh National Park", "Bandipur National Park", "Mudumalai Tiger Reserve", "Periyar National Park", "Sundarbans National Park", "Kuno National Park", "Desert National Park"],
    "deserts": ["Sahara Desert", "Gobi Desert", "Arabian Desert", "Kalahari Desert", "Atacama Desert", "Thar Desert", "Antarctic Desert"]
}

def pick_distractors(correct_ans, pool_name, count=3):
    pool = POOLS.get(pool_name, POOLS["indian_cities"])
    norm_c = correct_ans.strip().lower()
    avail = [x for x in pool if x.strip().lower() != norm_c]
    if len(avail) < count:
        return avail
    seed = int(hashlib.md5(correct_ans.encode('utf-8')).hexdigest()[:6], 16)
    rng = random.Random(seed)
    return rng.sample(avail, count)

def build_mcq(q_id, title, correct_ans, distractors, subject, category, topic, grade, page_num, area_num, explanation, difficulty="Easy", fill_blanks=None):
    all_choices = [
        {"text": correct_ans, "isCorrect": True, "explanation": f"Correct. {explanation}"}
    ]
    for d in distractors:
        all_choices.append({
            "text": d,
            "isCorrect": False,
            "explanation": f"Incorrect. '{d}' does not match the verified source record."
        })
    
    # Shuffle deterministically
    seed = int(hashlib.md5((title + correct_ans).encode('utf-8')).hexdigest()[:6], 16)
    rng = random.Random(seed)
    rng.shuffle(all_choices)

    options = []
    for idx, c in enumerate(all_choices):
        options.append({
            "id": f"opt-{idx + 1}",
            "text": c["text"],
            "isCorrect": c["isCorrect"],
            "explanation": c["explanation"]
        })

    return {
        "id": q_id,
        "title": title,
        "description": f"Source: Quiz Preparation Material — Area {area_num} (Page {page_num})",
        "type": "mcq_single",
        "subject": subject,
        "category": category,
        "topic": topic,
        "difficulty": difficulty,
        "gradeLevel": grade,
        "grade": grade,
        "marks": 1,
        "timeLimitSeconds": 60,
        "explanation": explanation,
        "generalExplanation": explanation,
        "hints": [f"Topic: {topic}"],
        "tags": [subject.lower(), topic.lower(), f"area-{area_num}", "pdf-rebuild", "verified-source"],
        "options": options,
        "fillBlanks": fill_blanks or [correct_ans],
        "createdAt": "2026-10-15T00:00:00.000Z",
        "updatedAt": "2026-10-15T00:00:00.000Z",
        "metadata": {
            "sourcePdf": "media_1791985307979.pdf",
            "sourcePage": page_num,
            "sourceArea": f"Area {area_num}",
            "provenance": "SOURCE_KNOWLEDGE_PIPELINE",
            "validationStatus": "APPROVED"
        }
    }

def build_tf(q_id, title, is_true, subject, category, topic, grade, page_num, area_num, explanation, difficulty="Easy"):
    options = [
        {
            "id": "opt-1",
            "text": "True",
            "isCorrect": is_true,
            "explanation": f"{'Correct' if is_true else 'Incorrect'}. {explanation}"
        },
        {
            "id": "opt-2",
            "text": "False",
            "isCorrect": not is_true,
            "explanation": f"{'Correct' if not is_true else 'Incorrect'}. {explanation}"
        }
    ]
    return {
        "id": q_id,
        "title": title,
        "description": f"Source: Quiz Preparation Material — Area {area_num} (Page {page_num})",
        "type": "true_false",
        "subject": subject,
        "category": category,
        "topic": topic,
        "difficulty": difficulty,
        "gradeLevel": grade,
        "grade": grade,
        "marks": 1,
        "timeLimitSeconds": 30,
        "explanation": explanation,
        "generalExplanation": explanation,
        "hints": [f"Topic: {topic}"],
        "tags": [subject.lower(), topic.lower(), f"area-{area_num}", "true-false", "pdf-rebuild", "verified-source"],
        "options": options,
        "fillBlanks": ["true" if is_true else "false"],
        "createdAt": "2026-10-15T00:00:00.000Z",
        "updatedAt": "2026-10-15T00:00:00.000Z",
        "metadata": {
            "sourcePdf": "media_1791985307979.pdf",
            "sourcePage": page_num,
            "sourceArea": f"Area {area_num}",
            "provenance": "SOURCE_KNOWLEDGE_PIPELINE",
            "validationStatus": "APPROVED"
        }
    }

print("Base builder functions ready.")
