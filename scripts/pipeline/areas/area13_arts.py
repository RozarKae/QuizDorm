from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Arts & Culture"
    cat = "Cinema, Music & Dance"
    grade = "Grade 3-5"
    area = 13

    # Page 299-300 - Cinema Firsts
    questions.append(make_q(
        "qb-area13-0001",
        "Which landmark film released in 1913 directed by Dadasaheb Phalke is recognized as India's first full-length feature film?",
        "Raja Harishchandra",
        ["Alam Ara", "Kisan Kanya", "Ayodhyecha Raja"],
        sub, cat, "Indian Cinema History", grade, 299, area,
        "Raja Harishchandra (1913) directed by Dadasaheb Phalke was India's first full-length silent feature film.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area13-0002",
        "Which historic production released in 1931 directed by Ardeshir Irani was India's first sound/talkie film?",
        "Alam Ara",
        ["Raja Harishchandra", "Shree 420", "Mother India"],
        sub, cat, "Indian Cinema History", grade, 300, area,
        "Alam Ara, directed by Ardeshir Irani and released in 1931, was India's first sound/talkie motion picture.",
        "Easy", None, "mcq_single"
    ))

    # Page 301-302 - National Film Awards 2026
    questions.append(make_q(
        "qb-area13-0003",
        "Which film was awarded Best Feature Film at the 72nd National Film Awards ceremony held in September 2026?",
        "12th Fail",
        ["Amaran", "Kalki 2898 AD", "Maharaja"],
        sub, cat, "National Film Awards", grade, 301, area,
        "'12th Fail' won Best Feature Film at the 72nd National Film Awards ceremony.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area13-0004",
        "Which veteran actor was conferred the 2024 Dadasaheb Phalke Award during the 72nd National Film Awards in September 2026?",
        "Anant Nag",
        ["Mithun Chakraborty", "Waheeda Rehman", "Asha Parekh"],
        sub, cat, "Dadasaheb Phalke Award", grade, 301, area,
        "Veteran actor Anant Nag was honoured with the prestigious Dadasaheb Phalke Award.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area13-0005",
        "Which director won the Best Director award at the 72nd National Film Awards for the Tamil biographical action drama 'Amaran'?",
        "Rajkumar Periasamy",
        ["Mani Ratnam", "S. S. Rajamouli", "Lokesh Kanagaraj"],
        sub, cat, "National Film Awards", grade, 302, area,
        "Rajkumar Periasamy won Best Director at the 72nd National Film Awards for the film 'Amaran'.",
        "Medium", None, "mcq_single"
    ))

    # Page 302-304 - Classical Dances
    dances = [
        ("Bharatanatyam", "Tamil Nadu", ["Kerala", "Odisha", "Andhra Pradesh"]),
        ("Kathakali", "Kerala", ["Tamil Nadu", "Karnataka", "Assam"]),
        ("Kuchipudi", "Andhra Pradesh", ["Tamil Nadu", "Kerala", "Odisha"]),
        ("Odissi", "Odisha", ["West Bengal", "Bihar", "Assam"]),
        ("Sattriya", "Assam", ["Manipur", "Odisha", "Tripura"]),
        ("Mohiniyattam", "Kerala", ["Tamil Nadu", "Karnataka", "Andhra Pradesh"])
    ]
    for idx, (dance, state, distractors) in enumerate(dances):
        questions.append(make_q(
            f"qb-area13-00{6 + idx:02d}",
            f"Which Indian classical dance form originated in the state of {state}?",
            dance,
            [d for d in ["Bharatanatyam", "Kathak", "Kathakali", "Kuchipudi", "Odissi", "Sattriya", "Mohiniyattam"] if d != dance][:3],
            sub, "Classical Dances", "Indian Classical Dance", grade, 302, area,
            f"{dance} is the classical dance tradition of {state}.",
            "Easy", None, "mcq_single"
        ))

    # Page 305 - Folk Dances
    folk_dances = [
        ("Garba", "Gujarat", ["Rajasthan", "Punjab", "Maharashtra"]),
        ("Bhangra", "Punjab", ["Haryana", "Rajasthan", "Gujarat"]),
        ("Ghoomar", "Rajasthan", ["Gujarat", "Punjab", "Madhya Pradesh"]),
        ("Lavani", "Maharashtra", ["Gujarat", "Goa", "Karnataka"]),
        ("Bihu", "Assam", ["West Bengal", "Odisha", "Meghalaya"])
    ]
    for idx, (dance, state, distractors) in enumerate(folk_dances):
        questions.append(make_q(
            f"qb-area13-00{12 + idx:02d}",
            f"'{dance}' is a celebrated traditional folk dance originating from which Indian State?",
            state,
            distractors,
            sub, "Folk Arts", "Indian Folk Dances", grade, 305, area,
            f"{dance} is a vibrant folk dance belonging to {state}.",
            "Easy", None, "mcq_single"
        ))

    # Page 306-307 - Musical Instruments
    instruments = [
        ("Sitar", "Pandit Ravi Shankar", ["Ustad Bismillah Khan", "Ustad Zakir Hussain", "Pandit Hariprasad Chaurasia"]),
        ("Shehnai", "Ustad Bismillah Khan", ["Pandit Ravi Shankar", "Pandit Shivkumar Sharma", "Ustad Amjad Ali Khan"]),
        ("Bansuri (Flute)", "Pandit Hariprasad Chaurasia", ["Pandit Ravi Shankar", "Ustad Zakir Hussain", "Lalgudi Jayaraman"])
    ]
    for idx, (inst, maestro, distractors) in enumerate(instruments):
        questions.append(make_q(
            f"qb-area13-00{17 + idx:02d}",
            f"Which legendary maestro is celebrated across the world for masterly virtuosity on the {inst}?",
            maestro,
            distractors,
            sub, "Indian Classical Music", "Musical Maestros", grade, 306, area,
            f"{maestro} is a world-renowned exponent of the {inst}.",
            "Easy", None, "mcq_single"
        ))

    # Page 314 - Traditional Painting
    paintings = [
        ("Madhubani painting", "Bihar", ["Odisha", "Rajasthan", "Maharashtra"]),
        ("Warli painting", "Maharashtra", ["Gujarat", "Madhya Pradesh", "Karnataka"]),
        ("Pattachitra", "Odisha", ["Bihar", "West Bengal", "Assam"]),
        ("Tanjore painting", "Tamil Nadu", ["Kerala", "Karnataka", "Andhra Pradesh"])
    ]
    for idx, (art, st, distractors) in enumerate(paintings):
        questions.append(make_q(
            f"qb-area13-00{20 + idx:02d}",
            f"The famous traditional art form '{art}' is indigenous to which Indian State?",
            st,
            distractors,
            sub, "Traditional Visual Arts", "Folk Painting", grade, 314, area,
            f"{art} is a celebrated traditional visual art heritage of {st}.",
            "Easy", None, "mcq_single"
        ))

    return questions
