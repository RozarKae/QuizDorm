from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Health & Biology"
    cat = "Human Anatomy & Public Health"
    grade = "Grade 3-5"
    area = 14

    # Page 323 - Organs
    questions.append(make_q(
        "qb-area14-0001",
        "Which human organ is recognized as the largest organ of the human body overall?",
        "Skin",
        ["Liver", "Brain", "Lungs"],
        sub, cat, "Human Anatomy", grade, 323, area,
        "The skin is the largest organ of the human body, serving as a protective barrier and sensory organ.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0002",
        "Which internal organ is the largest internal organ in the human body and produces digestive bile?",
        "Liver",
        ["Stomach", "Kidneys", "Pancreas"],
        sub, cat, "Human Anatomy", grade, 323, area,
        "The liver is the largest internal organ in the human body, performing metabolism and bile production.",
        "Easy", None, "mcq_single"
    ))

    # Page 323 - Heart
    questions.append(make_q(
        "qb-area14-0003",
        "How many internal muscular chambers does the human heart contain?",
        "Four",
        ["Two", "Three", "Six"],
        sub, cat, "Cardiovascular System", grade, 323, area,
        "The human heart has four chambers: the right atrium, right ventricle, left atrium, and left ventricle.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0004",
        "All blood vessels classified as arteries in the human body carry oxygen-rich blood without exception.",
        "False",
        [],
        sub, cat, "Cardiovascular System", grade, 324, area,
        "The pulmonary artery is an exception; it carries deoxygenated blood away from the heart to the lungs for gas exchange.",
        "Medium", None, "true_false"
    ))

    # Page 324-325 - Respiratory & Nervous
    questions.append(make_q(
        "qb-area14-0005",
        "What are the microscopic balloon-like air sacs in human lungs where oxygen enters the bloodstream and carbon dioxide is removed?",
        "Alveoli",
        ["Bronchi", "Trachea", "Capillaries"],
        sub, cat, "Respiratory System", grade, 324, area,
        "Gas exchange takes place across the thin walls of the alveoli in the lungs.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0006",
        "Which part of the human brain is primarily responsible for motor balance, posture, and muscular coordination?",
        "Cerebellum",
        ["Cerebrum", "Brainstem", "Hypothalamus"],
        sub, cat, "Nervous System", grade, 325, area,
        "The cerebellum coordinates voluntary muscular movements and maintains balance.",
        "Easy", None, "mcq_single"
    ))

    # Page 325-326 - Digestive & Skeletal
    questions.append(make_q(
        "qb-area14-0007",
        "In which organ of the human digestive tract does the vast majority of nutrient absorption take place?",
        "Small intestine",
        ["Stomach", "Large intestine", "Oesophagus"],
        sub, cat, "Digestive System", grade, 326, area,
        "The majority of nutrient absorption occurs across the villi of the small intestine.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0008",
        "How many bones are normally present in the skeleton of an adult human body?",
        "206",
        ["180", "250", "300"],
        sub, cat, "Skeletal System", grade, 326, area,
        "An adult human skeleton normally has 206 bones.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0009",
        "What is the longest and strongest bone in the human skeleton?",
        "Femur (Thigh bone)",
        ["Humerus", "Tibia", "Fibula"],
        sub, cat, "Skeletal System", grade, 326, area,
        "The femur (thigh bone) is the longest and strongest bone in the human body.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0010",
        "What is the smallest bone in the human body, located within the middle ear cavity?",
        "Stapes",
        ["Malleus", "Incus", "Phalanx"],
        sub, cat, "Skeletal System", grade, 326, area,
        "The stapes (stirrup bone) in the middle ear is the smallest bone in the human body.",
        "Easy", None, "mcq_single"
    ))

    # Page 328 - Blood
    questions.append(make_q(
        "qb-area14-0011",
        "Which iron-containing protein pigment in red blood cells is responsible for binding and transporting oxygen throughout the body?",
        "Haemoglobin",
        ["Myoglobin", "Melanin", "Keratin"],
        sub, cat, "Circulatory System", grade, 328, area,
        "Haemoglobin is the protein in red blood cells that transports oxygen from the lungs to the tissues.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0012",
        "Which blood cellular components play the principal role in initiating clotting to prevent excessive bleeding from wounds?",
        "Platelets",
        ["Red blood cells", "White blood cells", "Plasma proteins"],
        sub, cat, "Circulatory System", grade, 328, area,
        "Platelets (thrombocytes) aggregate at injury sites to form clots and stop bleeding.",
        "Easy", None, "mcq_single"
    ))

    # Page 329-330 - Diseases & Pathogens
    questions.append(make_q(
        "qb-area14-0013",
        "What type of biological microorganism causes the infectious disease Malaria in humans?",
        "Plasmodium parasite",
        ["Mycobacterium tuberculosis", "Influenza virus", "Streptococcus bacterium"],
        sub, cat, "Infectious Diseases", grade, 330, area,
        "Malaria is caused by Plasmodium single-celled protozoan parasites transmitted by mosquitoes.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0014",
        "Which insect vector is responsible for transmitting the Malaria parasite to humans?",
        "Female Anopheles mosquito",
        ["Aedes aegypti mosquito", "Culex mosquito", "Tsetse fly"],
        sub, cat, "Vector-borne Diseases", grade, 330, area,
        "Malaria is transmitted through the bites of infected female Anopheles mosquitoes.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0015",
        "Which mosquito species is the primary vector for transmitting viral diseases such as Dengue and Chikungunya?",
        "Aedes mosquito",
        ["Anopheles mosquito", "Culex mosquito", "Sandfly"],
        sub, cat, "Vector-borne Diseases", grade, 330, area,
        "The Aedes mosquito transmits Dengue, Chikungunya, and Yellow fever.",
        "Easy", None, "mcq_single"
    ))

    # Page 332-333 - Vitamins & Deficiencies
    vitamins = [
        ("Vitamin A", "Night blindness", ["Scurvy", "Rickets", "Anaemia"]),
        ("Vitamin C", "Scurvy", ["Rickets", "Night blindness", "Goitre"]),
        ("Vitamin D", "Rickets", ["Scurvy", "Night blindness", "Anaemia"]),
        ("Vitamin K", "Impaired blood clotting", ["Night blindness", "Rickets", "Scurvy"])
    ]
    for idx, (vit, defic, distractors) in enumerate(vitamins):
        questions.append(make_q(
            f"qb-area14-00{16 + idx:02d}",
            f"A severe dietary deficiency of {vit} in children leads to which classic medical deficiency condition?",
            defic,
            distractors,
            sub, "Nutrition & Deficiency", "Vitamins & Health", grade, 333, area,
            f"Deficiency of {vit} results in {defic}.",
            "Easy", None, "mcq_single"
        ))

    # Page 333-334 - Minerals
    questions.append(make_q(
        "qb-area14-0020",
        "A chronic dietary deficiency of the mineral iodine in human nutrition frequently causes which endocrine condition?",
        "Goitre (enlarged thyroid gland)",
        ["Anaemia", "Osteoporosis", "Scurvy"],
        sub, cat, "Mineral Nutrition", grade, 334, area,
        "Iodine is essential for thyroid hormones; its deficiency causes swelling of the thyroid gland, known as goitre.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0021",
        "Which Scottish physician and microbiologist discovered the world's first effective natural antibiotic, Penicillin, in 1928?",
        "Alexander Fleming",
        ["Edward Jenner", "Louis Pasteur", "Robert Koch"],
        sub, cat, "Medical Pioneers", grade, 339, area,
        "Sir Alexander Fleming discovered penicillin from Penicillium notatum mould in 1928.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0022",
        "Who is revered in medical history for developing the first successful vaccine, creating immunity against smallpox in 1796?",
        "Edward Jenner",
        ["Louis Pasteur", "Alexander Fleming", "Jonas Salk"],
        sub, cat, "Medical Pioneers", grade, 339, area,
        "Edward Jenner pioneered vaccination by demonstrating that inoculation with cowpox protected against smallpox.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area14-0023",
        "What was the official global theme for World Health Day celebrated on 7 April 2026?",
        "Together for health. Stand with science.",
        ["My Health, My Right", "Health for All", "Universal Health Coverage Now"],
        sub, cat, "Global Health", grade, 343, area,
        "The WHO celebrated World Health Day 2026 under the theme 'Together for health. Stand with science.'",
        "Easy", None, "mcq_single"
    ))

    return questions
