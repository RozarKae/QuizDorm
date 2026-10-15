from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "General Knowledge"
    cat = "National & International Days"
    grade = "Grade 3-5"
    area = 16

    # Page 384 - Republic Day
    questions.append(make_q(
        "qb-area16-0001",
        "On which date did the Constitution of India formally come into effect in 1950, commemorated annually as Republic Day?",
        "26 January",
        ["15 August", "26 November", "2 October"],
        sub, cat, "National Days", grade, 384, area,
        "India became a Republic on 26 January 1950 when the Constitution officially came into effect.",
        "Easy", None, "mcq_single"
    ))

    # Page 385 - National Science Day
    questions.append(make_q(
        "qb-area16-0002",
        "Which landmark scientific discovery is commemorated every year on 28 February as India's National Science Day?",
        "Raman Effect (discovered by Sir C. V. Raman in 1928)",
        ["Discovery of Cosmic Radiations by Homi Bhabha", "Discovery of the Zero by Aryabhata", "Successful launch of Aryabhata satellite"],
        sub, cat, "National Days", grade, 385, area,
        "National Science Day on 28 February commemorates the discovery of the Raman Effect by Sir C. V. Raman.",
        "Easy", None, "mcq_single"
    ))

    # Page 386 - World Water & Earth Day
    questions.append(make_q(
        "qb-area16-0003",
        "World Water Day is celebrated globally on 22 March, while international Earth Day is observed on which date?",
        "22 April",
        ["22 May", "5 June", "21 March"],
        sub, cat, "Environmental Days", grade, 386, area,
        "World Water Day is on 22 March, whereas Earth Day is celebrated on 22 April.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0004",
        "On which annual date is World Environment Day observed globally under the leadership of the UNEP?",
        "5 June",
        ["22 April", "16 September", "8 June"],
        sub, cat, "Environmental Days", grade, 386, area,
        "World Environment Day is celebrated internationally on 5 June.",
        "Easy", None, "mcq_single"
    ))

    # Page 387 - Yoga & Doctors
    questions.append(make_q(
        "qb-area16-0005",
        "Which global wellness observance proposed by India was officially declared by the United Nations to be celebrated every year on 21 June?",
        "International Day of Yoga",
        ["World Health Day", "Earth Day", "World Happiness Day"],
        sub, cat, "International Observances", grade, 387, area,
        "The United Nations General Assembly declared 21 June as the International Day of Yoga.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0006",
        "In whose honour is National Doctors' Day celebrated in India on 1 July, marking both his birth and death anniversaries?",
        "Dr. Bidhan Chandra Roy",
        ["Dr. A. P. J. Abdul Kalam", "Dr. B. R. Ambedkar", "Dr. Homi Bhabha"],
        sub, cat, "National Observances", grade, 387, area,
        "National Doctors' Day honours renowned physician and former West Bengal Chief Minister Dr. Bidhan Chandra Roy.",
        "Easy", None, "mcq_single"
    ))

    # Page 388 - Kargil & Handloom
    questions.append(make_q(
        "qb-area16-0007",
        "On which date is Kargil Vijay Diwas observed across India to honour the Armed Forces' victory in the 1999 Kargil conflict?",
        "26 July",
        ["15 August", "8 October", "16 December"],
        sub, cat, "Military Memorials", grade, 388, area,
        "Kargil Vijay Diwas is observed on 26 July every year.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0008",
        "Which date commemorates the birth anniversary of hockey legend Major Dhyan Chand as India's National Sports Day?",
        "29 August",
        ["15 August", "5 September", "29 July"],
        sub, cat, "Sports Observances", grade, 389, area,
        "National Sports Day is celebrated on 29 August on the birth anniversary of Major Dhyan Chand.",
        "Easy", None, "mcq_single"
    ))

    # Page 389 - Teachers' Day
    questions.append(make_q(
        "qb-area16-0009",
        "Whose birthday is celebrated as Teachers' Day in India on 5 September?",
        "Dr. Sarvepalli Radhakrishnan",
        ["Dr. A. P. J. Abdul Kalam", "Swami Vivekananda", "Rabindranath Tagore"],
        sub, cat, "Educational Days", grade, 389, area,
        "Teachers' Day in India is celebrated on 5 September on the birth anniversary of India's second President Dr. S. Radhakrishnan.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0010",
        "Teachers' Day is celebrated internationally across the world on 5 September.",
        "False",
        [],
        sub, cat, "Observance Distinctions", grade, 397, area,
        "5 September is Teachers' Day in India; World Teachers' Day is celebrated globally on 5 October by UNESCO.",
        "Easy", None, "true_false"
    ))

    # Page 390 - Engineers & Ozone
    questions.append(make_q(
        "qb-area16-0011",
        "In honour of which visionary engineer and statesman is Engineers' Day celebrated in India on 15 September?",
        "Sir M. Visvesvaraya",
        ["E. Sreedharan", "Vikram Sarabhai", "Homi Bhabha"],
        sub, cat, "National Days", grade, 390, area,
        "Engineers' Day marks the birth anniversary of Bharat Ratna Sir M. Visvesvaraya on 15 September.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0012",
        "Which environmental date commemorates the signing of the Montreal Protocol on substances that deplete the ozone layer?",
        "World Ozone Day (16 September)",
        ["Earth Day (22 April)", "World Environment Day (5 June)", "World Water Day (22 March)"],
        sub, cat, "Environmental Days", grade, 390, area,
        "World Ozone Day is celebrated annually on 16 September.",
        "Easy", None, "mcq_single"
    ))

    # Page 391-392 - Gandhi Jayanti & National Unity Day
    questions.append(make_q(
        "qb-area16-0013",
        "The United Nations observes 2 October, the birth anniversary of Mahatma Gandhi, as which international day?",
        "International Day of Non-Violence",
        ["International Day of Peace", "World Human Rights Day", "International Day of Education"],
        sub, cat, "International Observances", grade, 391, area,
        "2 October is recognized globally by the UN as the International Day of Non-Violence.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0014",
        "Which day is celebrated across India on 31 October to mark the birth anniversary of Sardar Vallabhbhai Patel?",
        "National Unity Day (Rashtriya Ekta Diwas)",
        ["National Good Governance Day", "National Youth Day", "National Integration Day"],
        sub, cat, "National Days", grade, 392, area,
        "31 October is observed as National Unity Day in honour of Sardar Vallabhbhai Patel.",
        "Easy", None, "mcq_single"
    ))

    # Page 392 - Children's Day & Constitution Day
    questions.append(make_q(
        "qb-area16-0015",
        "In India, Children's Day is celebrated on 14 November to mark the birth anniversary of which beloved national leader?",
        "Jawaharlal Nehru",
        ["Mahatma Gandhi", "Dr. A. P. J. Abdul Kalam", "Lal Bahadur Shastri"],
        sub, cat, "National Days", grade, 392, area,
        "Children's Day is observed on 14 November in memory of India's first Prime Minister Jawaharlal Nehru ('Chacha Nehru').",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0016",
        "On which date did the Constituent Assembly adopt the Constitution of India in 1949, now celebrated as Constitution Day (Samvidhan Divas)?",
        "26 November",
        ["26 January", "15 August", "9 December"],
        sub, cat, "Constitutional History", grade, 392, area,
        "The Constitution was adopted on 26 November 1949 and came into force on 26 January 1950.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0017",
        "National Mathematics Day is celebrated across India on 22 December to honour the birth anniversary of which mathematical genius?",
        "Srinivasa Ramanujan",
        ["Aryabhata", "C. R. Rao", "P. C. Mahalanobis"],
        sub, cat, "National Days", grade, 393, area,
        "National Mathematics Day commemorates the birth anniversary of legendary mathematician Srinivasa Ramanujan on 22 December.",
        "Easy", None, "mcq_single"
    ))

    # Page 397-398 - UN Day & Human Rights Day
    questions.append(make_q(
        "qb-area16-0018",
        "On which date is United Nations Day celebrated globally to commemorate the coming into force of the UN Charter in 1945?",
        "24 October",
        ["10 December", "21 September", "5 June"],
        sub, cat, "UN Observances", grade, 397, area,
        "United Nations Day is celebrated annually on 24 October.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0019",
        "On which date is Human Rights Day observed globally to commemorate the Universal Declaration of Human Rights adopted in 1948?",
        "10 December",
        ["24 October", "20 November", "11 December"],
        sub, cat, "Human Rights", grade, 398, area,
        "Human Rights Day is celebrated on 10 December every year.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area16-0020",
        "Which day celebrated on 20 May raises global awareness about the ecological importance of pollinators such as honeybees?",
        "World Bee Day",
        ["World Wildlife Day", "Earth Day", "World Animal Day"],
        sub, cat, "Environmental Days", grade, 395, area,
        "World Bee Day is observed on 20 May to recognize the critical role of bees and other pollinators in ecosystems.",
        "Easy", None, "mcq_single"
    ))

    return questions
