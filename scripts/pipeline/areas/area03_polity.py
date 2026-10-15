from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Civics & Governance"
    cat = "Indian Polity"
    grade = "Grade 6-8"
    area = 3

    # Page 37 - Murmu
    questions.append(make_q(
        "qb-area03-0001",
        "Which numbered President of India is Droupadi Murmu?",
        "15th",
        ["14th", "13th", "16th"],
        sub, cat, "Constitutional Leadership", grade, 37, area,
        "Droupadi Murmu took office in July 2022 as the 15th President of India.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area03-0002",
        "To which tribal community does President Droupadi Murmu belong?",
        "Santhal",
        ["Gond", "Bhil", "Munda"],
        sub, cat, "Constitutional Leadership", grade, 37, area,
        "President Droupadi Murmu belongs to the Santhal tribal community of Odisha.",
        "Easy", None, "mcq_single"
    ))

    # Page 38 - Radhakrishnan
    questions.append(make_q(
        "qb-area03-0003",
        "Who assumed office as the 15th Vice-President of India on 12 September 2025?",
        "C. P. Radhakrishnan",
        ["Jagdeep Dhankhar", "M. Venkaiah Naidu", "Gyanesh Kumar"],
        sub, cat, "Constitutional Leadership", grade, 38, area,
        "C. P. Radhakrishnan took oath as the 15th Vice-President of India on 12 September 2025.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area03-0004",
        "Under the Indian Constitution, who serves as the ex-officio Chairman of the Rajya Sabha?",
        "Vice-President of India",
        ["Lok Sabha Speaker", "Chief Justice of India", "Prime Minister of India"],
        sub, cat, "Parliamentary Architecture", grade, 38, area,
        "The Vice-President of India is the ex-officio Chairman of the Rajya Sabha (Council of States).",
        "Easy", None, "mcq_single"
    ))

    # Page 39 - CJI Surya Kant
    questions.append(make_q(
        "qb-area03-0005",
        "Who became the Chief Justice of India (CJI) on 24 November 2025?",
        "Justice Surya Kant",
        ["Justice D. Y. Chandrachud", "Justice Sanjiv Khanna", "Justice B. R. Gavai"],
        sub, cat, "Judiciary", grade, 39, area,
        "Justice Surya Kant assumed office as the Chief Justice of India on 24 November 2025.",
        "Easy", None, "mcq_single"
    ))

    # Page 40 - CEC Gyanesh Kumar
    questions.append(make_q(
        "qb-area03-0006",
        "Who serves as India's Chief Election Commissioner (CEC) leading the Election Commission of India?",
        "Gyanesh Kumar",
        ["Rajiv Kumar", "Sushil Chandra", "Sunil Arora"],
        sub, cat, "Electoral Governance", grade, 40, area,
        "Gyanesh Kumar serves as India's Chief Election Commissioner.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area03-0007",
        "Which constitutional article provides authority for the superintendence, direction, and control of elections by the Election Commission of India?",
        "Article 324",
        ["Article 124", "Article 356", "Article 280"],
        sub, cat, "Constitutional Law", grade, 40, area,
        "Article 324 of the Constitution vests superintendence, direction, and control of elections in the Election Commission.",
        "Medium", None, "mcq_single"
    ))

    # Page 41 - Manipur CM
    questions.append(make_q(
        "qb-area03-0008",
        "Who took office as the Chief Minister of Manipur on 4 February 2026?",
        "Yumnam Khemchand Singh",
        ["N. Biren Singh", "Nemcha Kipgen", "Losii Dikho"],
        sub, cat, "State Governance", grade, 41, area,
        "Yumnam Khemchand Singh was sworn in as the Chief Minister of Manipur on 4 February 2026.",
        "Medium", None, "mcq_single"
    ))

    # Page 43 - One Nation One Election
    questions.append(make_q(
        "qb-area03-0009",
        "What does the governance reform proposal 'One Nation, One Election' primarily advocate?",
        "Holding Lok Sabha and State Legislative Assembly elections simultaneously",
        [
            "Conducting nationwide municipal and panchayat elections on a single day",
            "Merging state judicial services under a single centralized authority",
            "Standardizing civil service qualifications across all union territories"
        ],
        sub, cat, "Electoral Reforms", grade, 43, area,
        "One Nation, One Election proposes synchronizing elections to the Lok Sabha and State Legislative Assemblies.",
        "Easy", None, "mcq_single"
    ))

    # Page 44 - Delimitation
    questions.append(make_q(
        "qb-area03-0010",
        "What is the primary function of an electoral delimitation exercise in India?",
        "Redrawing the boundaries of electoral constituencies to reflect population shifts",
        [
            "Auditing voter turnout records after general parliamentary elections",
            "Registering unrecognized regional political party symbols",
            "Supervising ballot printing and electronic voting machine distribution"
        ],
        sub, cat, "Electoral Systems", grade, 44, area,
        "Delimitation is the act of redrawing constituency boundaries to reflect changes in population and ensure fair representation.",
        "Easy", None, "mcq_single"
    ))

    # Page 45 - Women's Reservation
    questions.append(make_q(
        "qb-area03-0011",
        "What percentage of seats is reserved for women in the Lok Sabha and State Assemblies under the 106th Constitutional Amendment?",
        "33%",
        ["25%", "50%", "30%"],
        sub, cat, "Constitutional Amendments", grade, 45, area,
        "The Constitution (106th Amendment) Act, 2023 provides 33% reservation for women in the Lok Sabha and State Legislative Assemblies.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area03-0012",
        "What is the popular title of the legislation providing 33% reservation for women in Indian legislatures?",
        "Nari Shakti Vandan Adhiniyam",
        ["Beti Bachao Beti Padhao", "Mahila Samman Yojana", "Pradhan Mantri Matru Vandana Yojana"],
        sub, cat, "Constitutional Amendments", grade, 45, area,
        "The legislation is popularly titled the 'Nari Shakti Vandan Adhiniyam'.",
        "Easy", None, "mcq_single"
    ))

    # Page 46 - Census 2027
    questions.append(make_q(
        "qb-area03-0013",
        "What budget was approved by the Union Cabinet for conducting the Census of India 2027?",
        "₹11,718.24 crore",
        ["₹10,000 crore", "₹15,500 crore", "₹8,450.50 crore"],
        sub, cat, "Public Policy", grade, 46, area,
        "The Union Cabinet approved ₹11,718.24 crore for the Census of India 2027.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area03-0014",
        "The upcoming Census 2027 will represent which numbered Census of independent India?",
        "8th",
        ["7th", "10th", "16th"],
        sub, cat, "National Demographics", grade, 46, area,
        "Census 2027 will be the 16th Census of India overall and the 8th Census since Independence.",
        "Medium", None, "mcq_single"
    ))

    # Page 47 - PM Modi record
    questions.append(make_q(
        "qb-area03-0015",
        "On 10 June 2026, Narendra Modi surpassed whose previous record of 4,398 days to become the longest-serving elected Prime Minister of India?",
        "Jawaharlal Nehru",
        ["Indira Gandhi", "Atal Bihari Vajpayee", "Manmohan Singh"],
        sub, cat, "Political Milestones", grade, 47, area,
        "On 10 June 2026, Narendra Modi completed 4,399 days of continuous service as an elected Prime Minister, surpassing Jawaharlal Nehru's 4,398 days.",
        "Medium", None, "mcq_single"
    ))

    # Page 50 - Article 124
    questions.append(make_q(
        "qb-area03-0016",
        "Which article of the Indian Constitution governs the establishment and constitution of the Supreme Court of India?",
        "Article 124",
        ["Article 324", "Article 214", "Article 131"],
        sub, cat, "Judiciary & Law", grade, 50, area,
        "Article 124 outlines the establishment and constitution of the Supreme Court of India.",
        "Medium", None, "mcq_single"
    ))

    # Page 51 - Amendments Table
    amendments = [
        ("101st", "Goods and Services Tax (GST)", ["National Judicial Appointments Commission", "EWS reservation", "Women's reservation"]),
        ("103rd", "10% reservation for Economically Weaker Sections (EWS)", ["GST implementation", "OBC commission status", "SC/ST reservation extension"]),
        ("106th", "33% reservation for women in Lok Sabha and Legislative Assemblies", ["GST implementation", "EWS reservation", "Land boundary agreement"])
    ]
    for idx, (num, subject_desc, distractors) in enumerate(amendments):
        questions.append(make_q(
            f"qb-area03-00{17 + idx}",
            f"Which key constitutional reform was enacted by the {num} Amendment of the Constitution of India?",
            subject_desc,
            distractors,
            sub, "Constitutional Amendments", "Key Amendments", grade, 51, area,
            f"The {num} Amendment enacted {subject_desc}.",
            "Easy", None, "mcq_single"
        ))

    # Page 52 - Governance terms
    questions.append(make_q(
        "qb-area03-0020",
        "What term describes a political system with a constitutional division of powers between the Union government and individual States?",
        "Federalism",
        ["Secularism", "Monarchy", "Unitary rule"],
        sub, cat, "Political Concepts", grade, 52, area,
        "Federalism is the division of legislative and administrative powers between Union and State governments.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area03-0021",
        "A Republic is a state where the head of state is a hereditary monarch rather than an elected official.",
        "False",
        [],
        sub, cat, "Political Concepts", grade, 53, area,
        "In a Republic, the head of state is elected by the people or their representatives, not a hereditary monarch.",
        "Easy", None, "true_false"
    ))

    return questions
