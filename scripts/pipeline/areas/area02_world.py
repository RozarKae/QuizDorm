from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "World Affairs"
    cat = "International Relations"
    grade = "Grade 6-8"
    area = 2

    # Page 14 - G20
    questions.append(make_q(
        "qb-area02-0001",
        "Which country holds the G20 Presidency in 2026?",
        "United States",
        ["Brazil", "South Africa", "India"],
        sub, cat, "Global Summits", grade, 14, area,
        "The United States holds the G20 Presidency in 2026.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area02-0002",
        "In which US city was the G20 Trade Ministers' Meeting held in October 2026?",
        "Milwaukee, Wisconsin",
        ["Chicago, Illinois", "New York City, New York", "Washington, D.C."],
        sub, cat, "Global Summits", grade, 14, area,
        "The G20 Trade Ministers' Meeting was convened in Milwaukee, Wisconsin, USA in October 2026.",
        "Medium", None, "mcq_single"
    ))

    # Page 15 - ASEAN
    questions.append(make_q(
        "qb-area02-0003",
        "Which country is hosting the 2026 ASEAN Summits?",
        "Philippines",
        ["Indonesia", "Malaysia", "Thailand"],
        sub, cat, "Regional Blocs", grade, 15, area,
        "The Philippines is hosting the ASEAN Summits in 2026.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area02-0004",
        "How many member states comprise the Association of Southeast Asian Nations (ASEAN) following Timor-Leste's induction?",
        "11",
        ["10", "8", "12"],
        sub, cat, "Regional Blocs", grade, 15, area,
        "ASEAN expanded to 11 member states after Timor-Leste officially joined.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area02-0005",
        "Which country became the newest and 11th member of ASEAN in October 2025?",
        "Timor-Leste",
        ["Papua New Guinea", "Fiji", "Maldives"],
        sub, cat, "Regional Blocs", grade, 15, area,
        "Timor-Leste became the 11th member state of ASEAN.",
        "Easy", None, "mcq_single"
    ))

    # Page 16 - IPU
    questions.append(make_q(
        "qb-area02-0006",
        "Where was the 153rd Assembly of the Inter-Parliamentary Union (IPU) held in October 2026?",
        "Arusha, Tanzania",
        ["Nairobi, Kenya", "Geneva, Switzerland", "Addis Ababa, Ethiopia"],
        sub, cat, "Global Assemblies", grade, 16, area,
        "The 153rd Assembly of the IPU was held in Arusha, Tanzania, from 5–9 October 2026.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area02-0007",
        "Where is the global headquarters of the Inter-Parliamentary Union (IPU) located?",
        "Geneva, Switzerland",
        ["New York, USA", "Vienna, Austria", "Brussels, Belgium"],
        sub, cat, "International Organisations", grade, 16, area,
        "Founded in 1889, the Inter-Parliamentary Union is headquartered in Geneva, Switzerland.",
        "Easy", None, "mcq_single"
    ))

    # Page 17 - Nobel Medicine
    questions.append(make_q(
        "qb-area02-0008",
        "What scientific breakthrough was honored with the 2026 Nobel Prize in Physiology or Medicine?",
        "Discoveries concerning light-gated ion channels and optogenetics",
        [
            "Development of targeted mRNA vaccines for infectious diseases",
            "Discovery of molecular pathways regulating hypoxia and cell survival",
            "Pioneering structural biology of G-protein-coupled receptors"
        ],
        sub, cat, "Nobel Prizes", grade, 17, area,
        "The 2026 Nobel Prize in Physiology or Medicine was awarded to Karl Deisseroth, Peter Hegemann, and Georg Nagel for discoveries concerning light-gated ion channels and optogenetics.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area02-0009",
        "Optogenetics is a biological technique that uses sound waves to stimulate muscle tissue.",
        "False",
        [],
        sub, cat, "Scientific Innovations", grade, 17, area,
        "Optogenetics is a technique that uses light (not sound) to control specific genetically sensitized nerve cells.",
        "Easy", None, "true_false"
    ))

    # Page 18 - Nobel Physics
    questions.append(make_q(
        "qb-area02-0010",
        "Who was awarded the 2026 Nobel Prize in Physics for decisive contributions to the IceCube Neutrino Observatory?",
        "Francis Halzen",
        ["Karl Deisseroth", "Henri Kagan", "Kenso Soai"],
        sub, cat, "Nobel Prizes", grade, 18, area,
        "Francis Halzen received the 2026 Nobel Prize in Physics for contributions to the IceCube Neutrino Observatory and detecting astrophysical neutrinos.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area02-0011",
        "Where is the IceCube Neutrino Observatory located?",
        "South Pole, Antarctica",
        ["Atacama Desert, Chile", "Mauna Kea, Hawaii", "Geneva, Switzerland"],
        sub, cat, "Scientific Observatories", grade, 18, area,
        "The IceCube Neutrino Observatory is embedded within the Antarctic ice sheet at the South Pole.",
        "Easy", None, "mcq_single"
    ))

    # Page 19 - Nobel Chemistry
    questions.append(make_q(
        "qb-area02-0012",
        "Which two scientists were awarded the 2026 Nobel Prize in Chemistry for their work on asymmetric synthesis and molecular chirality?",
        "Henri Kagan and Kenso Soai",
        ["Peter Hegemann and Georg Nagel", "Francis Halzen and Karl Deisseroth", "Abhijit Banerjee and Esther Duflo"],
        sub, cat, "Nobel Prizes", grade, 19, area,
        "Henri Kagan (France) and Kenso Soai (Japan) were awarded the 2026 Nobel Prize in Chemistry for work on asymmetric chemistry and molecular chirality.",
        "Medium", None, "mcq_single"
    ))

    # Page 20 - Nobel Literature & Peace
    questions.append(make_q(
        "qb-area02-0013",
        "Which prestigious institution is responsible for awarding the Nobel Prize in Literature?",
        "Swedish Academy, Stockholm",
        ["Norwegian Nobel Committee, Oslo", "Royal Swedish Academy of Sciences", "Karolinska Institutet"],
        sub, cat, "Nobel Prizes", grade, 20, area,
        "The Nobel Prize in Literature is awarded by the Swedish Academy in Stockholm, Sweden.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area02-0014",
        "In which city is the Nobel Peace Prize presented annually?",
        "Oslo, Norway",
        ["Stockholm, Sweden", "Geneva, Switzerland", "Copenhagen, Denmark"],
        sub, cat, "Nobel Prizes", grade, 20, area,
        "While most Nobel Prizes are presented in Stockholm, Sweden, the Nobel Peace Prize is uniquely awarded in Oslo, Norway.",
        "Easy", None, "mcq_single"
    ))

    # Page 21-22 - Maritime Exercise & Organisations
    questions.append(make_q(
        "qb-area02-0015",
        "Where was the second ASEAN–India Maritime Exercise (AIME-2026) conducted?",
        "Subic Bay, Philippines",
        ["Singapore Strait", "Malacca Strait", "Gulf of Thailand"],
        sub, cat, "Maritime Security", grade, 21, area,
        "AIME-2026 was conducted in Subic Bay, Philippines, featuring Indian Navy ships INS Sahyadri and INS Kulish under the theme 'Anchored in Trust, United at Sea'.",
        "Medium", None, "mcq_single"
    ))

    # Organisations & Capitals tables
    orgs = [
        ("World Health Organization (WHO)", "Geneva", ["New York", "Washington, D.C.", "Rome"]),
        ("World Trade Organization (WTO)", "Geneva", ["Brussels", "Paris", "Vienna"]),
        ("International Monetary Fund (IMF)", "Washington, D.C.", ["Geneva", "New York", "London"]),
        ("World Bank Group", "Washington, D.C.", ["Geneva", "Paris", "Zurich"]),
        ("UNESCO", "Paris", ["Geneva", "New York", "Vienna"]),
        ("International Court of Justice (ICJ)", "The Hague", ["Geneva", "Brussels", "Strasbourg"]),
        ("Food and Agriculture Organization (FAO)", "Rome", ["Geneva", "Paris", "Nairobi"])
    ]
    for idx, (org_name, hq, distractors) in enumerate(orgs):
        questions.append(make_q(
            f"qb-area02-00{16 + idx}",
            f"In which city is the headquarters of the {org_name} located?",
            hq,
            distractors,
            sub, "International Organisations", "Headquarters", grade, 22, area,
            f"The headquarters of {org_name} is in {hq}.",
            "Easy", None, "mcq_single"
        ))

    # Page 24 - Confusions
    questions.append(make_q(
        "qb-area02-0023",
        "While the International Court of Justice (ICJ) resolves legal disputes between sovereign countries, what does the International Criminal Court (ICC) primarily prosecute?",
        "Individual persons accused of serious international crimes",
        [
            "Cross-border corporate commercial trade violations",
            "Territorial boundary disputes between national states",
            "Maritime shipping regulation infractions"
        ],
        sub, cat, "International Law", grade, 24, area,
        "The ICJ deals with disputes between states, whereas the ICC prosecutes individuals accused of genocide, war crimes, and crimes against humanity.",
        "Medium", None, "mcq_single"
    ))

    # Page 25-27 - World Capitals
    capitals = [
        ("Australia", "Canberra", ["Sydney", "Melbourne", "Brisbane"]),
        ("Brazil", "Brasília", ["Rio de Janeiro", "São Paulo", "Salvador"]),
        ("Canada", "Ottawa", ["Toronto", "Vancouver", "Montreal"]),
        ("Egypt", "Cairo", ["Alexandria", "Giza", "Luxor"]),
        ("Japan", "Tokyo", ["Kyoto", "Osaka", "Hiroshima"]),
        ("Kenya", "Nairobi", ["Mombasa", "Kisumu", "Nakuru"]),
        ("New Zealand", "Wellington", ["Auckland", "Christchurch", "Hamilton"]),
        ("South Korea", "Seoul", ["Busan", "Incheon", "Daegu"]),
        ("Sri Lanka", "Sri Jayawardenepura Kotte", ["Colombo", "Kandy", "Galle"])
    ]
    for idx, (country, cap, distractors) in enumerate(capitals):
        questions.append(make_q(
            f"qb-area02-00{24 + idx}",
            f"What is the official capital city of {country}?",
            cap,
            distractors,
            sub, "World Geography", "Capitals", grade, 25, area,
            f"The capital of {country} is {cap}.",
            "Easy", None, "mcq_single"
        ))

    # Page 27 - South Africa trick
    questions.append(make_q(
        "qb-area02-0033",
        "Which city serves as the administrative capital of South Africa?",
        "Pretoria",
        ["Cape Town", "Bloemfontein", "Johannesburg"],
        sub, cat, "World Geography", grade, 27, area,
        "South Africa has three capitals: Pretoria (Administrative), Cape Town (Legislative), and Bloemfontein (Judicial).",
        "Medium", None, "mcq_single"
    ))

    # Page 28 - Geographical records
    questions.append(make_q(
        "qb-area02-0034",
        "Which desert is recognized as the largest desert on Earth overall?",
        "Antarctic Desert",
        ["Sahara Desert", "Gobi Desert", "Arabian Desert"],
        sub, cat, "Physical Geography", grade, 28, area,
        "The Antarctic Desert is the largest desert overall on Earth. The Sahara is the largest hot desert.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area02-0035",
        "Which country is known by the traditional moniker 'Land of the Rising Sun'?",
        "Japan",
        ["China", "South Korea", "Thailand"],
        sub, cat, "Geographical Identities", grade, 28, area,
        "Japan is traditionally referred to as the Land of the Rising Sun.",
        "Easy", None, "mcq_single"
    ))

    return questions
