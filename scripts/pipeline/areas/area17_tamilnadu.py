from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Regional Studies"
    cat = "Tamil Nadu Heritage & Culture"
    grade = "Grade 3-5"
    area = 17

    # Page 412-413 - State Symbols & Basic Facts
    questions.append(make_q(
        "qb-area17-0001",
        "What is the official state animal of Tamil Nadu, native to the rocky crags of the Western Ghats?",
        "Nilgiri tahr",
        ["Bengal tiger", "Indian elephant", "Lion-tailed macaque"],
        sub, cat, "State Symbols", grade, 412, area,
        "The state animal of Tamil Nadu is the Nilgiri tahr (an endangered mountain ungulate), NOT the tiger.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area17-0002",
        "Which vibrant wild flower is officially designated as the state flower of Tamil Nadu?",
        "Gloriosa lily (Sengkaanthal)",
        ["Lotus", "Jasmine", "Marigold"],
        sub, cat, "State Symbols", grade, 412, area,
        "The state flower of Tamil Nadu is the Gloriosa lily (Gloriosa superba / Sengkaanthal).",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area17-0003",
        "Which stately tree is recognized as the official state tree of Tamil Nadu?",
        "Palmyra palm",
        ["Banyan tree", "Neem tree", "Teak tree"],
        sub, cat, "State Symbols", grade, 412, area,
        "The Palmyra palm (Borassus flabellifer) is the official state tree of Tamil Nadu.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area17-0004",
        "Which distinctive butterfly species is recognized as the state butterfly of Tamil Nadu?",
        "Tamil yeoman",
        ["Common Mormon", "Blue Mormon", "Southern Birdwing"],
        sub, cat, "State Symbols", grade, 412, area,
        "The Tamil yeoman (Cirrochroa thais) is the state butterfly of Tamil Nadu.",
        "Medium", None, "mcq_single"
    ))

    # Page 414 - Cities & Specialties
    cities = [
        ("Dindigul", "Lock manufacturing and iron craft", ["Silk sarees", "Fireworks and match industry", "Knitwear textiles"]),
        ("Sivakasi", "Fireworks, safety matches, and commercial printing", ["Leather tanning", "Lock manufacturing", "Tea processing"]),
        ("Tiruppur", "Cotton knitwear and garment export hub", ["Bronze casting", "Turmeric trade", "Automobile assembly"]),
        ("Erode", "Turmeric cultivation and textile trade", ["Silk weaving", "Fireworks manufacturing", "Lock manufacturing"]),
        ("Kanchipuram", "Traditional handloom mulberry silk sarees", ["Knitwear manufacturing", "Tea processing", "Port shipping"])
    ]
    for idx, (city, specialty, distractors) in enumerate(cities):
        questions.append(make_q(
            f"qb-area17-00{5 + idx:02d}",
            f"Which famous industry or craft is the Tamil Nadu city of {city} traditionally renowned for across India?",
            specialty,
            distractors,
            sub, "Cities & Industries", "Industrial Specialties", grade, 414, area,
            f"{city} is nationally famous for {specialty}.",
            "Easy", None, "mcq_single"
        ))

    # Page 414 - Nicknames
    questions.append(make_q(
        "qb-area17-0010",
        "Which major industrial city in Tamil Nadu is famously called the 'Manchester of South India' due to its extensive textile mills and engineering manufacturing?",
        "Coimbatore",
        ["Madurai", "Tiruchirappalli", "Salem"],
        sub, cat, "City Monikers", grade, 414, area,
        "Coimbatore is widely called the 'Manchester of South India' because of its thriving cotton textile and motor pump industries.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area17-0011",
        "Which capital city of Tamil Nadu is internationally nicknamed the 'Detroit of India' due to its massive automobile manufacturing base?",
        "Chennai",
        ["Bengaluru", "Hyderabad", "Coimbatore"],
        sub, cat, "City Monikers", grade, 435, area,
        "Chennai produces a major fraction of India's automobiles, earning the title 'Detroit of India'.",
        "Easy", None, "mcq_single"
    ))

    # Page 416-417 - Rivers
    questions.append(make_q(
        "qb-area17-0012",
        "Which historic river flows directly through the temple city of Madurai in southern Tamil Nadu?",
        "Vaigai River",
        ["Cauvery River", "Palar River", "Thamirabarani River"],
        sub, cat, "River Systems", grade, 416, area,
        "The Vaigai River flows through the heart of Madurai and is central to the Chithirai festival.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area17-0013",
        "Which river is the lifeline agricultural river system of central Tamil Nadu, forming the fertile delta at Thanjavur?",
        "Cauvery River",
        ["Vaigai River", "Thamirabarani River", "Pennaiyar River"],
        sub, cat, "River Systems", grade, 416, area,
        "The Cauvery is the principal river of Tamil Nadu, nurturing the fertile rice bowl of the Thanjavur delta.",
        "Easy", None, "mcq_single"
    ))

    # Page 421-423 - Temples & Dynasties
    questions.append(make_q(
        "qb-area17-0014",
        "Which great Chola emperor commissioned the magnificent Brihadisvara Temple (Big Temple) in Thanjavur in the 11th century?",
        "Rajaraja Chola I",
        ["Rajendra Chola I", "Karikala Chola", "Kulothunga Chola I"],
        sub, cat, "Temple Architecture", grade, 421, area,
        "The Brihadisvara Temple in Thanjavur was built during the reign of Rajaraja Chola I.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area17-0015",
        "Which ancient Tamil dynasty was responsible for carving the UNESCO World Heritage rock-cut rathas and Shore Temple at Mahabalipuram?",
        "Pallavas",
        ["Cholas", "Pandyas", "Cheras"],
        sub, cat, "Temple Architecture", grade, 422, area,
        "The monuments at Mahabalipuram were built under the Pallava rulers, particularly Narasimhavarman I (Mamalla).",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area17-0016",
        "Which dynasty held its historic royal capital and cultural center in the ancient city of Madurai?",
        "Pandyas",
        ["Cholas", "Pallavas", "Hoysalas"],
        sub, cat, "Tamil Dynasties", grade, 424, area,
        "Madurai was the historic capital of the Pandyan dynasty.",
        "Easy", None, "mcq_single"
    ))

    # Page 425 - Thirukkural
    questions.append(make_q(
        "qb-area17-0017",
        "How many rhyming couplets (kurals) are contained in the classical Tamil ethical treatise 'Thirukkural' composed by saint-poet Thiruvalluvar?",
        "1,330 couplets",
        ["1,000 couplets", "1,500 couplets", "1,080 couplets"],
        sub, cat, "Tamil Literature", grade, 425, area,
        "The Thirukkural consists of 1,330 couplets arranged into 133 chapters across three divisions: Aram, Porul, and Inbam.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area17-0018",
        "Which ancient Tamil woman poet and philosopher is celebrated for composing 'Aathichudi' containing moral guidance for children?",
        "Avvaiyar",
        ["Karaikkal Ammaiyar", "Andal", "Kavimani Desigavinayagam"],
        sub, cat, "Tamil Literature", grade, 426, area,
        "Avvaiyar authored the Aathichudi, an alphabetical collection of single-line moral verses for young minds.",
        "Easy", None, "mcq_single"
    ))

    # Page 430 - Jallikattu
    questions.append(make_q(
        "qb-area17-0019",
        "Jallikattu is a traditional classical dance form performed during the Chithirai festival in Madurai.",
        "False",
        [],
        sub, cat, "Traditional Sports", grade, 430, area,
        "Jallikattu is NOT a dance; it is a traditional bull-taming sporting event conducted during the Pongal harvest festival, particularly on Mattu Pongal.",
        "Easy", None, "true_false"
    ))

    # Page 434 - Kulasekarapattinam Spaceport
    questions.append(make_q(
        "qb-area17-0020",
        "In which coastal district of Tamil Nadu is India's second spaceport being developed for launching Small Satellite Launch Vehicles (SSLV)?",
        "Thoothukudi district (Kulasekarapattinam)",
        ["Ramanathapuram district", "Nagapattinam district", "Tirunelveli district"],
        sub, cat, "Space Infrastructure", grade, 434, area,
        "India's second spaceport is under construction at Kulasekarapattinam in Thoothukudi district of Tamil Nadu.",
        "Medium", None, "mcq_single"
    ))

    return questions
