from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Awards & Culture"
    cat = "National & Global Honours"
    grade = "Grade 6-8"
    area = 7

    # Page 132-133 - Bharat Ratna
    questions.append(make_q(
        "qb-area07-0001",
        "In which year was the Bharat Ratna, India's highest civilian honour, instituted?",
        "1954",
        ["1950", "1947", "1969"],
        sub, cat, "Civilian Awards", grade, 132, area,
        "The Bharat Ratna was instituted on 2 January 1954 by the President of India.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area07-0002",
        "The Bharat Ratna is India's highest military decoration for wartime gallantry.",
        "False",
        [],
        sub, cat, "Civilian Awards", grade, 133, area,
        "The Bharat Ratna is India's highest civilian award, not a military award. The highest military gallantry award is the Param Vir Chakra.",
        "Easy", None, "true_false"
    ))
    questions.append(make_q(
        "qb-area07-0003",
        "Which renowned agricultural scientist known as the father of India's Green Revolution was conferred the Bharat Ratna in 2024?",
        "M. S. Swaminathan",
        ["Verghese Kurien", "C. V. Raman", "Dr. A. P. J. Abdul Kalam"],
        sub, cat, "Civilian Awards", grade, 133, area,
        "Dr. M. S. Swaminathan was posthumously conferred the Bharat Ratna in 2024 for his transformative contributions to agriculture and food security.",
        "Easy", None, "mcq_single"
    ))

    # Page 134-135 - Padma Awards Hierarchy
    questions.append(make_q(
        "qb-area07-0004",
        "Which award ranks directly below the Bharat Ratna as India's second-highest civilian honour?",
        "Padma Vibhushan",
        ["Padma Bhushan", "Padma Shri", "Param Vir Chakra"],
        sub, cat, "Civilian Honours", grade, 134, area,
        "The hierarchy of civilian honours is: Bharat Ratna (1st), Padma Vibhushan (2nd), Padma Bhushan (3rd), and Padma Shri (4th).",
        "Easy", None, "mcq_single"
    ))

    # Page 136-137 - Nobel Laureates
    questions.append(make_q(
        "qb-area07-0005",
        "Who was the first Asian to be awarded a Nobel Prize, winning in Literature in 1913 for 'Gitanjali'?",
        "Rabindranath Tagore",
        ["C. V. Raman", "Mother Teresa", "Amartya Sen"],
        sub, cat, "Nobel Laureates", grade, 136, area,
        "Rabindranath Tagore received the 1913 Nobel Prize in Literature for his poetic collection 'Gitanjali', becoming Asia's first Nobel laureate.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area07-0006",
        "For which landmark discovery in physics was Sir C. V. Raman awarded the Nobel Prize in 1930?",
        "Raman Effect (inelastic scattering of light)",
        ["Nuclear fission in heavy elements", "Photoelectric effect in semiconductors", "Cosmic ray cascade theory"],
        sub, cat, "Nobel Laureates", grade, 136, area,
        "Sir C. V. Raman won the 1930 Nobel Prize in Physics for his discovery of the Raman Effect.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area07-0007",
        "With whom did India's Kailash Satyarthi share the 2014 Nobel Peace Prize for advocacy of children's rights?",
        "Malala Yousafzai",
        ["Mother Teresa", "Wangari Maathai", "Kofi Annan"],
        sub, cat, "Nobel Laureates", grade, 137, area,
        "Kailash Satyarthi and Malala Yousafzai were jointly awarded the 2014 Nobel Peace Prize for their struggle against the suppression of children and young people.",
        "Easy", None, "mcq_single"
    ))

    # Page 141 - Oscars
    questions.append(make_q(
        "qb-area07-0008",
        "Who became the first Indian ever to win an Academy Award (Oscar), winning for Best Costume Design for the film 'Gandhi' (1982)?",
        "Bhanu Athaiya",
        ["A. R. Rahman", "Satyajit Ray", "Resul Pookutty"],
        sub, cat, "Cinema Awards", grade, 141, area,
        "Bhanu Athaiya won the Academy Award for Best Costume Design in 1983 for 'Gandhi', becoming India's first Oscar winner.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area07-0009",
        "Which high-energy track from the film 'RRR' won the Academy Award for Best Original Song in 2023?",
        "Naatu Naatu",
        ["Jai Ho", "Vande Mataram", "Chaiyya Chaiyya"],
        sub, cat, "Cinema Awards", grade, 141, area,
        "'Naatu Naatu' composed by M. M. Keeravani with lyrics by Chandrabose won the Oscar for Best Original Song in 2023.",
        "Easy", None, "mcq_single"
    ))

    # Page 143 - Tonys & Emmys
    questions.append(make_q(
        "qb-area07-0010",
        "Which major American entertainment award recognizes excellence in Broadway theatre productions?",
        "Tony Awards",
        ["Emmy Awards", "Grammy Awards", "Oscar Awards"],
        sub, cat, "Entertainment Awards", grade, 143, area,
        "The Antoinette Perry Awards for Excellence in Broadway Theatre, commonly known as the Tony Awards, honour live Broadway productions.",
        "Easy", None, "mcq_single"
    ))

    # Page 144-145 - Sports Awards
    questions.append(make_q(
        "qb-area07-0011",
        "Which award is conferred by the Government of India specifically to honour outstanding sports coaches?",
        "Dronacharya Award",
        ["Arjuna Award", "Major Dhyan Chand Khel Ratna", "Rashtriya Khel Protsahan Puruskar"],
        sub, cat, "Sports Honours", grade, 144, area,
        "The Dronacharya Award is given specifically to sports coaches for producing medal-winning athletes in international competitions.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area07-0012",
        "What is the highest sporting honour awarded in the Republic of India?",
        "Major Dhyan Chand Khel Ratna Award",
        ["Arjuna Award", "Dronacharya Award", "Padma Shri"],
        sub, cat, "Sports Honours", grade, 144, area,
        "The Major Dhyan Chand Khel Ratna Award is India's pinnacle sporting award.",
        "Easy", None, "mcq_single"
    ))

    # Page 145-146 - Literary Awards
    questions.append(make_q(
        "qb-area07-0013",
        "What is recognized as India's oldest and most prestigious literary award for lifetime contributions to Indian literature?",
        "Jnanpith Award",
        ["Sahitya Akademi Award", "Saraswati Samman", "Bhartiya Bhasha Parishad Award"],
        sub, cat, "Literary Honours", grade, 145, area,
        "The Jnanpith Award is India's highest and oldest literary award.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area07-0014",
        "Which internationally renowned award is particularly associated with excellence in newspaper journalism and literary achievement?",
        "Pulitzer Prize",
        ["Booker Prize", "Pritzker Prize", "Turing Award"],
        sub, cat, "Journalism & Media", grade, 146, area,
        "Established through the bequest of publisher Joseph Pulitzer, the Pulitzer Prize honours excellence in journalism and the arts.",
        "Easy", None, "mcq_single"
    ))

    # Page 147 - Cinema
    questions.append(make_q(
        "qb-area07-0015",
        "Who is venerated as the 'Father of Indian Cinema', in whose memory India's highest cinematic honour is named?",
        "Dadasaheb Phalke",
        ["Satyajit Ray", "Ardeshir Irani", "Raj Kapoor"],
        sub, cat, "Cinema Heritage", grade, 147, area,
        "Dadasaheb Phalke (Dhundiraj Govind Phalke), director of Raja Harishchandra (1913), is revered as the Father of Indian Cinema.",
        "Easy", None, "mcq_single"
    ))

    # Page 149 - Science & Math
    questions.append(make_q(
        "qb-area07-0016",
        "Under what specific age eligibility rule must recipients generally qualify to be awarded the Fields Medal in mathematics?",
        "Under 40 years old at the start of the year",
        ["Under 30 years old", "Under 50 years old", "Under 35 years old"],
        sub, cat, "Mathematical Honours", grade, 149, area,
        "The Fields Medal is awarded every four years to mathematicians under 40 years of age at the start of the congress year.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area07-0017",
        "Which prestigious annual award presented by the Association for Computing Machinery (ACM) is known as the 'Nobel Prize of Computing'?",
        "Turing Award",
        ["Fields Medal", "Pritzker Prize", "Abel Prize"],
        sub, cat, "Computing Honours", grade, 150, area,
        "The A. M. Turing Award is recognized as the highest distinction in computer science.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area07-0018",
        "The Pritzker Prize is regarded as the highest international honour in which creative professional field?",
        "Architecture",
        ["Cinematography", "Musical composition", "Sculpture"],
        sub, cat, "Architecture Honours", grade, 150, area,
        "The Pritzker Architecture Prize is widely recognized as the Nobel Prize of architecture.",
        "Easy", None, "mcq_single"
    ))

    return questions
