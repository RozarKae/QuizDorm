from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Regional Studies"
    cat = "South India & Local GK"
    grade = "Grade 3-5"
    area = 18

    # Page 453 - Madurai Nicknames & Places
    questions.append(make_q(
        "qb-area18-0001",
        "Which historic southern city in Tamil Nadu is famously known as the 'Athens of the East' and the 'Temple City'?",
        "Madurai",
        ["Thanjavur", "Kanchipuram", "Tiruchirappalli"],
        sub, cat, "Local Geography", grade, 453, area,
        "Madurai is celebrated as the 'Athens of the East' because of its ancient cultural heritage, Greek trade ties, and towering temple architecture.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0002",
        "Which famous palace complex in Madurai with grand arches and giant pillars was constructed in the 17th century by King Thirumalai Nayak?",
        "Thirumalai Nayakkar Palace",
        ["Tamukkam Palace", "Thanjavur Maratha Palace", "Padmanabhapuram Palace"],
        sub, cat, "Historical Monuments", grade, 455, area,
        "Thirumalai Nayakkar Palace in Madurai is celebrated for its imposing Indo-Saracenic columns and arches.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0003",
        "Which rocky hill complex near Madurai contains ancient Jain cave shelters and valuable Tamil-Brahmi rock inscriptions?",
        "Samanar Hills",
        ["Shevaroy Hills", "Palani Hills", "Yercaud Hills"],
        sub, cat, "Archaeology & Heritage", grade, 456, area,
        "Samanar Hills (Samanar Malai) in Keelakkuilkudi near Madurai preserves ancient Jain rock shelters and Tamil-Brahmi inscriptions.",
        "Medium", None, "mcq_single"
    ))

    # Page 458 - Alanganallur
    questions.append(make_q(
        "qb-area18-0004",
        "Which village located near Madurai is world-famous as the premier venue for traditional Pongal Jallikattu competitions?",
        "Alanganallur",
        ["Avaniyapuram", "Palamedu", "Siravayal"],
        sub, cat, "Traditional Sports", grade, 458, area,
        "Alanganallur near Madurai is the most famous venue for Jallikattu bull-taming events in Tamil Nadu.",
        "Easy", None, "mcq_single"
    ))

    # Page 460 - Madurai Jasmine
    questions.append(make_q(
        "qb-area18-0005",
        "Which highly fragrant floral specialty of Madurai possesses an official Geographical Indication (GI) tag?",
        "Madurai Malli (Jasmine)",
        ["Nilgiri Orchid", "Kodaikanal Kurinji", "Thanjavur Rose"],
        sub, cat, "Geographical Indications", grade, 460, area,
        "Madurai Malli is the famous GI-tagged jasmine variety grown extensively in the Madurai region.",
        "Easy", None, "mcq_single"
    ))

    # Page 461 - Chettinad
    questions.append(make_q(
        "qb-area18-0006",
        "Which distinctive heritage cultural region in Sivaganga and Pudukottai districts is famous across the world for majestic palatial mansions and spicy cuisine?",
        "Chettinad",
        ["Kongunadu", "Cholanadu", "Cheranadu"],
        sub, cat, "Regional Heritage", grade, 461, area,
        "Chettinad is internationally famous for grand ancestral mansions, Athangudi tiles, and Chettinad culinary traditions.",
        "Easy", None, "mcq_single"
    ))

    # Page 464 - Kerala & Karnataka
    questions.append(make_q(
        "qb-area18-0007",
        "Which coastal city in Kerala is renowned as the 'Venice of the East' for its interconnected backwaters, canals, and houseboats?",
        "Alappuzha (Alleppey)",
        ["Kochi", "Kollam", "Kozhikode"],
        sub, cat, "South India Geography", grade, 464, area,
        "Alappuzha is famous for backwater houseboat tourism in Kerala.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0008",
        "What is the name of the traditional high-speed snake boat race held during the Onam festival in the backwaters of Kerala?",
        "Vallam Kali",
        ["Kambala", "Jallikattu", "Kalaripayattu"],
        sub, cat, "South India Traditions", grade, 465, area,
        "Vallam Kali is the traditional snake boat race celebrated during the harvest festival of Onam in Kerala.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0009",
        "Which UNESCO World Heritage Site in Karnataka contains the stone chariot, Virupaksha temple, and majestic ruins of the Vijayanagara Empire?",
        "Hampi",
        ["Pattadakal", "Badami", "Belur"],
        sub, cat, "South India Heritage", grade, 466, area,
        "Hampi in Karnataka comprises the historic ruins of the 14th-century Vijayanagara Empire.",
        "Easy", None, "mcq_single"
    ))

    # Page 468 - Andhra Pradesh & Telangana
    questions.append(make_q(
        "qb-area18-0010",
        "In which Indian State is the sacred pilgrimage shrine of Sri Venkateswara Temple on Tirumala hills situated?",
        "Andhra Pradesh",
        ["Tamil Nadu", "Karnataka", "Telangana"],
        sub, cat, "South India Geography", grade, 468, area,
        "Tirupati and the Sri Venkateswara Temple on Tirumala are located in Andhra Pradesh (Tirupati district), NOT in Tamil Nadu.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0011",
        "Which historic 16th-century fortress on the outskirts of Hyderabad, Telangana, was historically renowned for its Deccan sultanate and diamond trade?",
        "Golconda Fort",
        ["Warangal Fort", "Bidar Fort", "Gingee Fort"],
        sub, cat, "South India Forts", grade, 468, area,
        "Golconda Fort near Hyderabad was the capital of the Qutb Shahi dynasty and a historic center of the global diamond trade.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0012",
        "In which Indian State is ISRO's primary orbital spaceport, the Satish Dhawan Space Centre at Sriharikota, situated?",
        "Andhra Pradesh",
        ["Tamil Nadu", "Kerala", "Odisha"],
        sub, cat, "Space Infrastructure", grade, 477, area,
        "Sriharikota is located in the Tirupati district of Andhra Pradesh, whereas the second spaceport is being built at Kulasekarapattinam in Tamil Nadu.",
        "Easy", None, "mcq_single"
    ))

    # Page 472 - 2026 Local Current Affairs
    questions.append(make_q(
        "qb-area18-0013",
        "What is the name of the welfare initiative in Tamil Nadu providing free public bus travel for women and transgender persons?",
        "Vetri Payanam",
        ["Amma Unavagam", "Pudhumai Penn", "Kalaignar Magalir Urimai"],
        sub, cat, "State Welfare Schemes", grade, 472, area,
        "The 'Vetri Payanam' scheme provides free travel for women and transgender passengers across designated public buses in Tamil Nadu.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0014",
        "What is the name of the specialized digital port facilitation system launched at Chennai Port in October 2026?",
        "Port Sethu",
        ["Sagar Mala", "Harbour Net", "Coastal Connect"],
        sub, cat, "State Infrastructure", grade, 473, area,
        "'Port Sethu' is a digital logistics and maritime processing system introduced at Chennai Port in October 2026.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0015",
        "Which toll plaza on National Highway 45 was inaugurated as Tamil Nadu's first booth-less Multi-Lane Free Flow (MLFF) toll plaza?",
        "Paranur toll plaza",
        ["Sriperumbudur toll plaza", "Athur toll plaza", "Kappalur toll plaza"],
        sub, cat, "State Transport", grade, 473, area,
        "Paranur was developed as Tamil Nadu's first booth-less, barrierless Multi-Lane Free Flow toll facility.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0016",
        "During which calendar months does the Northeast (retreating) monsoon provide the primary share of rainfall for the state of Tamil Nadu?",
        "October to December",
        ["June to September", "January to March", "April to May"],
        sub, cat, "Climate & Weather", grade, 475, area,
        "Tamil Nadu receives the bulk of its annual precipitation during the Northeast Monsoon between October and December.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0017",
        "How many revenue mandals were officially declared drought-affected across 21 districts of Andhra Pradesh for the 2026 Kharif season?",
        "388 mandals",
        ["250 mandals", "450 mandals", "180 mandals"],
        sub, cat, "Regional Current Affairs", grade, 475, area,
        "Andhra Pradesh declared 388 mandals in 21 districts drought-affected due to rainfall deficits during the 2026 Kharif season.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area18-0018",
        "Which deep-water multi-purpose commercial transshipment port project is located near Thiruvananthapuram in Kerala?",
        "Vizhinjam International Seaport",
        ["Cochin Port", "Beypore Port", "Kollam Port"],
        sub, cat, "Regional Infrastructure", grade, 476, area,
        "Vizhinjam Port in Kerala is an international deep-water multipurpose container transshipment hub.",
        "Medium", None, "mcq_single"
    ))

    return questions
