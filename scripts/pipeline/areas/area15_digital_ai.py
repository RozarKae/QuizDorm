from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Computer Science"
    cat = "Digital Technology & AI"
    grade = "Grade 3-5"
    area = 15

    # Page 354 - CPU
    questions.append(make_q(
        "qb-area15-0001",
        "What does the foundational computer hardware acronym 'CPU' stand for?",
        "Central Processing Unit",
        ["Core Program Utility", "Central Printing Unit", "Computer Processing Unit"],
        sub, cat, "Computer Hardware", grade, 354, area,
        "CPU stands for Central Processing Unit, commonly called the brain of the computer.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area15-0002",
        "A touchscreen on a modern smartphone or tablet functions simultaneously as both an input and an output device.",
        "True",
        [],
        sub, cat, "Input & Output Devices", grade, 354, area,
        "A touchscreen is both an input device (touch sensors receive commands) and an output device (display panel shows visuals).",
        "Easy", None, "true_false"
    ))

    # Page 355 - RAM vs ROM
    questions.append(make_q(
        "qb-area15-0003",
        "Which computer memory is volatile and temporary, losing its stored information immediately when power is turned off?",
        "RAM (Random Access Memory)",
        ["ROM (Read-Only Memory)", "Hard Disk Drive", "Flash Memory Drive"],
        sub, cat, "Computer Memory", grade, 355, area,
        "RAM (Random Access Memory) is temporary working memory that clears when power is lost.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area15-0004",
        "What does the storage acronym 'SSD' stand for in modern high-speed computer drives?",
        "Solid-State Drive",
        ["System Storage Disk", "Secure Serial Drive", "Synchronous Storage Device"],
        sub, cat, "Storage Technologies", grade, 356, area,
        "SSD stands for Solid-State Drive, which uses flash memory and is much faster and more shock-resistant than spinning hard disks.",
        "Easy", None, "mcq_single"
    ))

    # Page 358 - Internet vs Web
    questions.append(make_q(
        "qb-area15-0005",
        "The Internet and the World Wide Web are identical terms that describe the exact same technology.",
        "False",
        [],
        sub, cat, "Networking Concepts", grade, 358, area,
        "The Internet is the global physical infrastructure of interconnected networks. The World Wide Web (WWW) is an information-sharing service that runs on top of the Internet.",
        "Easy", None, "true_false"
    ))
    questions.append(make_q(
        "qb-area15-0006",
        "Google Chrome is classified as a web browser, whereas Google Search is an online search engine.",
        "True",
        [],
        sub, cat, "Software & Web Services", grade, 358, area,
        "Chrome is the application software used to navigate the web (browser), while Google Search is an indexing engine service.",
        "Easy", None, "true_false"
    ))

    # Page 361-363 - AI & ML
    questions.append(make_q(
        "qb-area15-0007",
        "Which subfield of Artificial Intelligence enables software systems to learn statistical patterns from large datasets rather than being explicitly rule-coded?",
        "Machine Learning",
        ["Robotics Hardware", "Quantum Cryptography", "Relational Database Management"],
        sub, cat, "Artificial Intelligence", grade, 361, area,
        "Machine Learning is the branch of AI where algorithms learn patterns and rules directly from training data.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area15-0008",
        "What distinguishing capability defines Generative Artificial Intelligence (Generative AI)?",
        "Creating entirely new text, images, code, or audio based on learned patterns",
        [
            "Executing physical mechanical assembly tasks on factory conveyor belts",
            "Encrypting banking communication packets across fiber cables",
            "Compressing video streams for satellite television broadcast"
        ],
        sub, cat, "Artificial Intelligence", grade, 363, area,
        "Generative AI creates new content rather than merely retrieving or classifying existing data.",
        "Easy", None, "mcq_single"
    ))

    # Page 366 - AI vs Robot
    questions.append(make_q(
        "qb-area15-0009",
        "Every industrial robotic machine operating in factories contains an Artificial Intelligence system.",
        "False",
        [],
        sub, cat, "Robotics & AI", grade, 366, area,
        "Not every robot uses AI. Many industrial robots follow simple pre-programmed mechanical loops without learning or autonomous perception.",
        "Easy", None, "true_false"
    ))
    questions.append(make_q(
        "qb-area15-0010",
        "Which optical sensing technology uses pulsing laser beams to measure distances and create detailed 3D spatial maps for self-driving vehicles?",
        "LiDAR",
        ["Radar", "Sonar", "GPS"],
        sub, cat, "Autonomous Vehicles", grade, 366, area,
        "LiDAR (Light Detection and Ranging) uses laser pulses to measure distance and build high-resolution 3D environmental maps.",
        "Medium", None, "mcq_single"
    ))

    # Page 367-368 - Cybersecurity
    questions.append(make_q(
        "qb-area15-0011",
        "What deceptive cyber attack tricks users into clicking malicious links or revealing passwords by impersonating trusted entities like banks or schools?",
        "Phishing",
        ["Firewalling", "Encryption", "Debugging"],
        sub, cat, "Cybersecurity", grade, 368, area,
        "Phishing is a fraudulent attempt to obtain sensitive credentials by disguising as a trustworthy entity in electronic communications.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area15-0012",
        "What security practice adds an extra layer of protection by requiring two distinct verification methods (such as a password plus an OTP code)?",
        "Two-Factor Authentication (2FA)",
        ["Single Sign-On (SSO)", "Open Access Protocol", "Data De-duplication"],
        sub, cat, "Cybersecurity", grade, 368, area,
        "2FA / Multi-Factor Authentication requires two different forms of authentication to verify identity.",
        "Easy", None, "mcq_single"
    ))

    # Page 370 - UPI & Aadhaar
    questions.append(make_q(
        "qb-area15-0013",
        "Which organization developed and operates India's Unified Payments Interface (UPI) infrastructure for real-time mobile bank transfers?",
        "National Payments Corporation of India (NPCI)",
        ["Reserve Bank of India (RBI)", "NITI Aayog", "State Bank of India (SBI)"],
        sub, cat, "Digital Payments", grade, 370, area,
        "UPI was developed and is operated by the National Payments Corporation of India (NPCI).",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area15-0014",
        "How many digits are contained in the unique Aadhaar identification number issued to Indian residents by UIDAI?",
        "12 digits",
        ["10 digits", "16 digits", "14 digits"],
        sub, cat, "Digital India", grade, 370, area,
        "Aadhaar is a 12-digit individual identification number based on biometric and demographic data.",
        "Easy", None, "mcq_single"
    ))

    # Page 373 - Abbreviations
    abbrs = [
        ("IoT", "Internet of Things", ["Interconnected Online Technology", "Integrated Optical Transmitter", "Internal Operating Terminal"]),
        ("HTML", "HyperText Markup Language", ["Hyper Transfer Media Link", "High Text Machine Learning", "Home Tool Markup Logic"]),
        ("QR code", "Quick Response code", ["Query Route code", "Quantum Record code", "Queue Register code"]),
        ("GPU", "Graphics Processing Unit", ["General Program Utility", "Global Processing Unit", "Graph Polynomial Unit"])
    ]
    for idx, (ab, full, distractors) in enumerate(abbrs):
        questions.append(make_q(
            f"qb-area15-00{15 + idx:02d}",
            f"In digital technology and computing, what does the abbreviation '{ab}' stand for?",
            full,
            distractors,
            sub, "Technology Terms", "Abbreviations", grade, 373, area,
            f"'{ab}' stands for {full}.",
            "Easy", None, "mcq_single"
        ))

    # Page 374 - AR vs VR
    questions.append(make_q(
        "qb-area15-0019",
        "Which technology overlays interactive digital images and information onto the real-world physical environment (like Pokémon GO)?",
        "Augmented Reality (AR)",
        ["Virtual Reality (VR)", "Quantum Computing", "Cloud Storage"],
        sub, cat, "Immersive Tech", grade, 374, area,
        "Augmented Reality (AR) enhances the real world by adding digital elements, unlike VR which creates an entirely artificial environment.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area15-0020",
        "What term describes an AI phenomenon where a generative model outputs plausible-sounding information that is factually false or unsupported?",
        "AI hallucination",
        ["Machine unlearning", "Data caching", "Gradient descent"],
        sub, cat, "AI Safety", grade, 377, area,
        "AI hallucination occurs when an AI generates convincing but incorrect, fictitious, or fabricated statements.",
        "Easy", None, "mcq_single"
    ))

    return questions
