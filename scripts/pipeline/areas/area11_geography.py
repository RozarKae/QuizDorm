from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Geography"
    cat = "Indian & World Geography"
    grade = "Grade 3-5"
    area = 11

    # Page 245 - Earth & Continents
    questions.append(make_q(
        "qb-area11-0001",
        "How long does the planet Earth take to complete one full rotation on its axis, causing day and night?",
        "24 hours",
        ["12 hours", "48 hours", "365 days"],
        sub, cat, "Earth Science", grade, 245, area,
        "Earth completes one rotation on its axis in approximately 24 hours, producing day and night.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0002",
        "What is the name of the imaginary line at 0° latitude that divides the Earth into the Northern and Southern Hemispheres?",
        "Equator",
        ["Prime Meridian", "Tropic of Cancer", "Arctic Circle"],
        sub, cat, "Earth Coordinates", grade, 245, area,
        "The Equator is the 0° latitude line dividing the Northern and Southern hemispheres.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0003",
        "Which of the following is recognized as the largest continent by both land area and population?",
        "Asia",
        ["Africa", "North America", "Europe"],
        sub, cat, "Continents", grade, 245, area,
        "Asia is the largest of Earth's seven continents.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0004",
        "Which is the world's smallest continent by land area?",
        "Australia",
        ["Europe", "Antarctica", "South America"],
        sub, cat, "Continents", grade, 245, area,
        "Australia is the smallest continent by land area.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0005",
        "Which is the largest and deepest ocean on planet Earth?",
        "Pacific Ocean",
        ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean"],
        sub, cat, "Oceans", grade, 245, area,
        "The Pacific Ocean is the largest and deepest of the world's oceans.",
        "Easy", None, "mcq_single"
    ))

    # Page 246 - Neighbours & Strait
    questions.append(make_q(
        "qb-area11-0006",
        "Which narrow maritime strait separates the southern coast of India from the island nation of Sri Lanka?",
        "Palk Strait",
        ["Strait of Malacca", "Strait of Hormuz", "Suez Canal"],
        sub, cat, "Physical Geography", grade, 246, area,
        "The Palk Strait lies between Tamil Nadu in India and the Jaffna District of Sri Lanka.",
        "Easy", None, "mcq_single"
    ))

    # Page 247-248 - States & Capitals
    state_caps = [
        ("Arunachal Pradesh", "Itanagar", ["Dispur", "Shillong", "Imphal"]),
        ("Assam", "Dispur", ["Guwahati", "Shillong", "Patna"]),
        ("Bihar", "Patna", ["Ranchi", "Lucknow", "Bhopal"]),
        ("Goa", "Panaji", ["Margao", "Vasco", "Mapusa"]),
        ("Gujarat", "Gandhinagar", ["Ahmedabad", "Surat", "Vadodara"]),
        ("Himachal Pradesh", "Shimla", ["Dharamshala", "Manali", "Dehradun"]),
        ("Karnataka", "Bengaluru", ["Mysuru", "Mangaluru", "Hubballi"]),
        ("Kerala", "Thiruvananthapuram", ["Kochi", "Kozhikode", "Thrissur"]),
        ("Madhya Pradesh", "Bhopal", ["Indore", "Gwalior", "Jabalpur"]),
        ("Maharashtra", "Mumbai", ["Pune", "Nagpur", "Nashik"]),
        ("Manipur", "Imphal", ["Aizawl", "Kohima", "Agartala"]),
        ("Meghalaya", "Shillong", ["Dispur", "Imphal", "Gangtok"]),
        ("Nagaland", "Kohima", ["Dimapur", "Imphal", "Aizawl"]),
        ("Odisha", "Bhubaneswar", ["Cuttack", "Puri", "Rourkela"]),
        ("Rajasthan", "Jaipur", ["Udaipur", "Jodhpur", "Bikaner"]),
        ("Sikkim", "Gangtok", ["Darjeeling", "Shillong", "Siliguri"]),
        ("Tamil Nadu", "Chennai", ["Madurai", "Coimbatore", "Tiruchirappalli"]),
        ("Telangana", "Hyderabad", ["Warangal", "Nizamabad", "Amaravati"]),
        ("Uttarakhand", "Dehradun", ["Haridwar", "Nainital", "Rishikesh"])
    ]
    for idx, (st, cap, distractors) in enumerate(state_caps):
        questions.append(make_q(
            f"qb-area11-00{7 + idx:02d}",
            f"What is the capital city of the Indian State of {st}?",
            cap,
            distractors,
            sub, "States and Capitals", "State Capitals", grade, 247, area,
            f"The capital city of {st} is {cap}.",
            "Easy", None, "mcq_single"
        ))

    # Page 248 - Union Territories
    questions.append(make_q(
        "qb-area11-0026",
        "Which city serves as the shared capital of both the states of Punjab and Haryana, while also being a Union Territory?",
        "Chandigarh",
        ["New Delhi", "Shimla", "Amritsar"],
        sub, cat, "Union Territories", grade, 248, area,
        "Chandigarh is a Union Territory that serves as the joint capital of Punjab and Haryana.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0027",
        "Which is India's largest Union Territory by geographic land area?",
        "Ladakh",
        ["Jammu & Kashmir", "Andaman & Nicobar Islands", "Delhi"],
        sub, cat, "Union Territories", grade, 248, area,
        "Ladakh is the largest Union Territory of India by area, with its capital at Leh.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0028",
        "Which is India's smallest Union Territory by land area, situated in the Arabian Sea?",
        "Lakshadweep",
        ["Puducherry", "Chandigarh", "Daman and Diu"],
        sub, cat, "Union Territories", grade, 248, area,
        "Lakshadweep, with its capital at Kavaratti, is India's smallest Union Territory.",
        "Easy", None, "mcq_single"
    ))

    # Page 249-250 - Mountains
    questions.append(make_q(
        "qb-area11-0029",
        "Which is the highest mountain peak located in India, situated in Sikkim on the India–Nepal border?",
        "Kangchenjunga",
        ["Nanda Devi", "Mount Everest", "K2"],
        sub, cat, "Physical Geography", grade, 250, area,
        "Kangchenjunga (8,586 m) is India's highest mountain peak and the third-highest in the world.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0030",
        "Which is recognized as the oldest geological fold mountain range in India?",
        "Aravalli Range",
        ["Himalayas", "Western Ghats", "Vindhya Range"],
        sub, cat, "Mountain Systems", grade, 250, area,
        "The Aravalli Range running through Rajasthan, Haryana, and Delhi is India's oldest mountain range.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0031",
        "By what other traditional name are the Western Ghats mountain ranges known along India's western coast?",
        "Sahyadri",
        ["Himadri", "Purvanchal", "Shiwalik"],
        sub, cat, "Mountain Systems", grade, 250, area,
        "The Western Ghats are commonly known as the Sahyadri mountains.",
        "Easy", None, "mcq_single"
    ))

    # Page 251-252 - Rivers
    questions.append(make_q(
        "qb-area11-0032",
        "Which river is celebrated as the longest river in India and officially designated as India's National River?",
        "Ganga",
        ["Yamuna", "Godavari", "Brahmaputra"],
        sub, cat, "River Systems", grade, 251, area,
        "The Ganga is India's longest river within its borders and is recognized as the National River of India.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0033",
        "Which major peninsular river in southern India is popularly called 'Dakshin Ganga' (Ganga of the South)?",
        "Godavari",
        ["Krishna", "Kaveri", "Mahanadi"],
        sub, cat, "River Systems", grade, 251, area,
        "The Godavari is known as Dakshin Ganga because of its vast basin and sacred cultural importance in peninsular India.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0034",
        "Which two major Indian peninsular rivers flow westwards across rift valleys and drain into the Arabian Sea?",
        "Narmada and Tapi",
        ["Godavari and Krishna", "Ganga and Yamuna", "Mahanadi and Kaveri"],
        sub, cat, "River Systems", grade, 252, area,
        "While most major Indian rivers flow eastward into the Bay of Bengal, Narmada and Tapi flow west into the Arabian Sea.",
        "Medium", None, "mcq_single"
    ))

    # Page 252 - Lakes
    questions.append(make_q(
        "qb-area11-0035",
        "Which is India's largest inland saline salt lake, located in the state of Rajasthan?",
        "Sambhar Lake",
        ["Chilika Lake", "Wular Lake", "Vembanad Lake"],
        sub, cat, "Lakes & Water Bodies", grade, 252, area,
        "Sambhar Salt Lake in Rajasthan is India's largest inland salt lake.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0036",
        "Chilika Lake, Asia's largest brackish-water lagoon, is situated in which coastal Indian State?",
        "Odisha",
        ["Andhra Pradesh", "Tamil Nadu", "West Bengal"],
        sub, cat, "Lakes & Water Bodies", grade, 252, area,
        "Chilika Lake is a famous coastal brackish water lagoon located in Odisha.",
        "Easy", None, "mcq_single"
    ))

    # Page 256 - Rainfall
    questions.append(make_q(
        "qb-area11-0037",
        "Which place in Meghalaya's East Khasi Hills is recognized as having the highest average annual rainfall on Earth?",
        "Mawsynram",
        ["Cherrapunji", "Shillong", "Agartala"],
        sub, cat, "Climate & Weather", grade, 256, area,
        "Mawsynram in Meghalaya holds the record for the highest average annual rainfall in the world.",
        "Easy", None, "mcq_single"
    ))

    # Page 268 - Volcano
    questions.append(make_q(
        "qb-area11-0038",
        "What is the name of South Asia's and India's only confirmed active volcano, located in the Andaman Sea?",
        "Barren Island",
        ["Narcondam Island", "Minicoy Island", "Ross Island"],
        sub, cat, "Volcanology", grade, 268, area,
        "Barren Island in the Andaman and Nicobar Islands is India's only active volcano.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0039",
        "Which is the world's largest island that is not classified as a continental landmass?",
        "Greenland",
        ["Madagascar", "Borneo", "New Guinea"],
        sub, cat, "Islands of the World", grade, 268, area,
        "Greenland (part of the Kingdom of Denmark) is the world's largest island.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area11-0040",
        "The Tropic of Cancer (23.5° N) passes through how many Indian States?",
        "8",
        ["6", "10", "12"],
        sub, cat, "Indian Geography", grade, 270, area,
        "The Tropic of Cancer passes through 8 states: Gujarat, Rajasthan, MP, Chhattisgarh, Jharkhand, West Bengal, Tripura, and Mizoram.",
        "Easy", None, "mcq_single"
    ))

    return questions
