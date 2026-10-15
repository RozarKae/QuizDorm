from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "General Knowledge"
    cat = "Notable Personalities"
    grade = "Grade 6-8"
    area = 8

    # Page 155 - Modi
    questions.append(make_q(
        "qb-area08-0001",
        "Which parliamentary constituency does Prime Minister Narendra Modi represent in the Lok Sabha?",
        "Varanasi",
        ["Gandhinagar", "New Delhi", "Lucknow"],
        sub, cat, "National Leaders", grade, 155, area,
        "Prime Minister Narendra Modi represents the Varanasi constituency in Uttar Pradesh.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0002",
        "In June 2026, Narendra Modi crossed 4,399 days of continuous service as an elected Prime Minister, surpassing which leader's record?",
        "Jawaharlal Nehru",
        ["Indira Gandhi", "Atal Bihari Vajpayee", "Manmohan Singh"],
        sub, cat, "National Leaders", grade, 155, area,
        "Modi reached 4,399 days of continuous service as an elected Prime Minister, surpassing Jawaharlal Nehru's 4,398 days.",
        "Medium", None, "mcq_single"
    ))

    # Page 157 - Radhakrishnan
    questions.append(make_q(
        "qb-area08-0003",
        "Before assuming office as the 15th Vice-President of India, C. P. Radhakrishnan previously served as the Governor of which State?",
        "Maharashtra",
        ["Jharkhand", "Telangana", "Kerala"],
        sub, cat, "Constitutional Leaders", grade, 157, area,
        "C. P. Radhakrishnan served as the Governor of Maharashtra before being elected Vice-President.",
        "Medium", None, "mcq_single"
    ))

    # Page 158-159 - Supreme Court Appointments
    questions.append(make_q(
        "qb-area08-0004",
        "Which high court did Justice Sunita Agarwal serve as Chief Justice of prior to her appointment to the Supreme Court of India in October 2026?",
        "Gujarat High Court",
        ["Delhi High Court", "Telangana High Court", "Madras High Court"],
        sub, cat, "Judicial Appointments", grade, 158, area,
        "Justice Sunita Agarwal was serving as Chief Justice of the Gujarat High Court before elevation to the Supreme Court.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0005",
        "Prior to elevation to the Supreme Court in October 2026, Justice Devendra Kumar Upadhyaya served as Chief Justice of which High Court?",
        "Delhi High Court",
        ["Gujarat High Court", "Telangana High Court", "Allahabad High Court"],
        sub, cat, "Judicial Appointments", grade, 159, area,
        "Justice Devendra Kumar Upadhyaya served as Chief Justice of the Delhi High Court prior to his Supreme Court appointment.",
        "Medium", None, "mcq_single"
    ))

    # Page 160-163 - Scientists
    questions.append(make_q(
        "qb-area08-0006",
        "Which American neuroscientist and psychiatrist co-shared the 2026 Nobel Prize in Medicine for foundational work in optogenetics?",
        "Karl Deisseroth",
        ["Francis Halzen", "Henri Kagan", "Kenso Soai"],
        sub, cat, "Nobel Laureates", grade, 160, area,
        "Karl Deisseroth of Stanford University shared the 2026 Nobel Prize in Physiology or Medicine with Peter Hegemann and Georg Nagel.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0007",
        "To which country does 2026 Nobel Chemistry laureate Henri Kagan belong?",
        "France",
        ["Germany", "Japan", "United States"],
        sub, cat, "Nobel Laureates", grade, 163, area,
        "Henri Kagan is a distinguished French chemist recognized for groundbreaking contributions to asymmetric synthesis.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0008",
        "To which country does 2026 Nobel Chemistry laureate Kenso Soai belong?",
        "Japan",
        ["South Korea", "China", "France"],
        sub, cat, "Nobel Laureates", grade, 163, area,
        "Kenso Soai is a renowned Japanese chemist famed for the Soai reaction and autocatalytic asymmetric synthesis.",
        "Easy", None, "mcq_single"
    ))

    # Page 167 - Harmanpreet Kaur
    questions.append(make_q(
        "qb-area08-0009",
        "Which prominent cricket player stepped down from the captaincy of India's women's national cricket team in October 2026?",
        "Harmanpreet Kaur",
        ["Smriti Mandhana", "Shafali Verma", "Deepti Sharma"],
        sub, cat, "Cricket Leaders", grade, 167, area,
        "Harmanpreet Kaur stepped down as captain of the Indian women's cricket team in October 2026 while continuing her career as an active player.",
        "Easy", None, "mcq_single"
    ))

    # Page 168 - Mahesh Kakde
    questions.append(make_q(
        "qb-area08-0010",
        "Which Indian mathematician from the Indian Institute of Science (IISc), Bengaluru, was awarded the prestigious Ramanujan Prize in 2026 for work in algebraic number theory?",
        "Mahesh Kakde",
        ["Neena Gupta", "Manjul Bhargava", "Akshay Venkatesh"],
        sub, cat, "Mathematics Honours", grade, 168, area,
        "Professor Mahesh Kakde of IISc Bengaluru was awarded the 2026 Ramanujan Prize for outstanding contributions to algebraic number theory.",
        "Medium", None, "mcq_single"
    ))

    # Page 169-171 - National Icons
    questions.append(make_q(
        "qb-area08-0011",
        "Which beloved former President of India is widely celebrated across the nation as the 'Missile Man of India'?",
        "Dr. A. P. J. Abdul Kalam",
        ["Dr. S. Radhakrishnan", "Vikram Sarabhai", "Homi J. Bhabha"],
        sub, cat, "National Icons", grade, 169, area,
        "Dr. A. P. J. Abdul Kalam, 11th President of India, was hailed as the 'Missile Man of India' for pioneering aerospace and missile programmes.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0012",
        "Who is revered as the 'Father of the Indian Space Programme'?",
        "Dr. Vikram Sarabhai",
        ["Dr. Homi J. Bhabha", "Prof. Satish Dhawan", "Dr. A. P. J. Abdul Kalam"],
        sub, cat, "National Icons", grade, 170, area,
        "Dr. Vikram Sarabhai is internationally recognized as the founding father of India's space programme.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0013",
        "Who is celebrated as the 'Father of the White Revolution' in India for spearheading Operation Flood and making India self-sufficient in milk production?",
        "Dr. Verghese Kurien",
        ["Dr. M. S. Swaminathan", "Sam Pitroda", "Dr. Norman Borlaug"],
        sub, cat, "National Icons", grade, 171, area,
        "Dr. Verghese Kurien engineered Operation Flood, transforming dairy development in India as the Father of the White Revolution.",
        "Easy", None, "mcq_single"
    ))

    # Page 172-174 - Culture & Music
    questions.append(make_q(
        "qb-area08-0014",
        "Which fictional South Indian town was immortalized in classic literature by novelist R. K. Narayan?",
        "Malgudi",
        ["Mayiladuthurai", "Manali", "Mahabalipuram"],
        sub, cat, "Literature", grade, 172, area,
        "Malgudi is the famous fictional town created by R. K. Narayan in masterpieces like Swami and Friends and Malgudi Days.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0015",
        "Which legendary playback singer was lovingly known as the 'Nightingale of India' and received the Bharat Ratna in 2001?",
        "Lata Mangeshkar",
        ["Asha Bhosle", "M. S. Subbulakshmi", "P. Susheela"],
        sub, cat, "Music & Arts", grade, 174, area,
        "Lata Mangeshkar was revered as the Nightingale of India for seven decades of legendary playback singing.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0016",
        "Which classical musical instrument is world-renowned maestro Ustad Zakir Hussain famously associated with?",
        "Tabla",
        ["Sitar", "Sarod", "Shehnai"],
        sub, cat, "Music & Arts", grade, 174, area,
        "Ustad Zakir Hussain is an internationally acclaimed virtuoso of the Indian tabla.",
        "Easy", None, "mcq_single"
    ))

    # Page 176-177 - World Leaders
    questions.append(make_q(
        "qb-area08-0017",
        "Who serves as the Prime Minister of Malaysia who advocated for Myanmar's reintegration into ASEAN discussions in 2026?",
        "Anwar Ibrahim",
        ["Mahathir Mohamad", "Najib Razak", "Muhyiddin Yassin"],
        sub, cat, "World Leaders", grade, 176, area,
        "Anwar Ibrahim is the Prime Minister of Malaysia.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0018",
        "Who serves as the President of the European Commission in 2026?",
        "Ursula von der Leyen",
        ["Roberta Metsola", "Charles Michel", "Christine Lagarde"],
        sub, cat, "World Leaders", grade, 177, area,
        "Ursula von der Leyen serves as the President of the European Commission.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area08-0019",
        "Who serves as the Secretary-General of the United Nations headquartered in New York?",
        "António Guterres",
        ["Ban Ki-moon", "Kofi Annan", "Boutros Boutros-Ghali"],
        sub, cat, "World Leaders", grade, 177, area,
        "António Guterres is the Secretary-General of the United Nations.",
        "Easy", None, "mcq_single"
    ))

    return questions
