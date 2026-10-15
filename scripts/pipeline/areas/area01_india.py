from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "National Affairs"
    cat = "Current Affairs"
    grade = "Grade 6-8"
    area = 1

    # Page 1
    questions.append(make_q(
        "qb-area01-0001",
        "In which year was the Union Public Service Commission (UPSC) established in India?",
        "1926",
        ["1919", "1935", "1947"],
        sub, cat, "Constitutional Bodies", grade, 1, area,
        "The Union Public Service Commission (UPSC) was established in 1926 following the Lee Commission recommendations.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0002",
        "In which year did the Union Public Service Commission (UPSC) celebrate its centenary?",
        "2026",
        ["2024", "2025", "2027"],
        sub, cat, "National Milestones", grade, 1, area,
        "UPSC marked its Centenary in 2026, with celebrations culminating on 1 October 2026.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0003",
        "Which book was released during the UPSC centenary celebrations in October 2026?",
        "100 Landmark Judgements – Shaping the Policies of UPSC and Public Service Commissions in India",
        [
            "Constitutional Governance in India: A Centenary Retrospective",
            "The Evolution of Public Service Commissions: 1926 to 2026",
            "Indian Administrative Architecture and Judicial Landmarks"
        ],
        sub, cat, "National Publications", grade, 1, area,
        "The commemorative book '100 Landmark Judgements – Shaping the Policies of UPSC and Public Service Commissions in India' was released during the centenary.",
        "Medium", None, "mcq_single"
    ))

    # Page 2
    questions.append(make_q(
        "qb-area01-0004",
        "Where was the main UPSC centenary celebration held on 1 October 2026?",
        "Bharat Mandapam, New Delhi",
        ["Yashobhoomi, New Delhi", "Vigyan Bhawan, New Delhi", "Rashtrapati Bhavan, New Delhi"],
        sub, cat, "National Events", grade, 2, area,
        "The main UPSC centenary celebration was held at Bharat Mandapam, New Delhi, attended by Prime Minister Narendra Modi.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0005",
        "How many permissible works were notified under the VB–G RAM G rural employment framework in October 2026?",
        "375",
        ["266", "315", "410"],
        sub, cat, "Government Schemes", grade, 2, area,
        "In October 2026, the Ministry of Rural Development notified 375 permissible works under VB-G RAM G, representing a 41% expansion over the previous 266 works.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0006",
        "Under the VB–G RAM G framework, how many works are categorized under the Water Security pillar?",
        "128",
        ["111", "98", "38"],
        sub, cat, "Rural Development", grade, 2, area,
        "Water Security is the largest thematic pillar under VB-G RAM G with 128 permissible works.",
        "Medium", None, "mcq_single"
    ))

    # Page 3
    questions.append(make_q(
        "qb-area01-0007",
        "What does the acronym VB–G RAM G stand for in government rural employment initiatives?",
        "Viksit Bharat – Guarantee for Rozgar and Ajeevika Mission (Gramin)",
        [
            "Vikas Bharat – Gramin Rozgar and Ajeevika Mission (Gramin)",
            "Viksit Bharat – Gramin Rozgar and Krishi Mission (Gramin)",
            "Vishwakarma Bharat – Guarantee for Rozgar and Ajeevika Mission"
        ],
        sub, cat, "Government Schemes", grade, 3, area,
        "VB-G RAM G stands for Viksit Bharat – Guarantee for Rozgar and Ajeevika Mission (Gramin).",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0008",
        "Into how many thematic pillars are the 375 permissible works under VB–G RAM G organized?",
        "Four",
        ["Three", "Five", "Six"],
        sub, cat, "Rural Development", grade, 3, area,
        "The 375 works are organized into four pillars: Water Security (128), Core Rural Infrastructure (111), Livelihood-related (98), and Extreme Weather & Disaster Preparedness (38).",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0009",
        "Who was announced on 6 October 2026 as the 29th Chief of the Air Staff (CAS) of the Indian Air Force?",
        "Air Marshal Ashutosh Dixit",
        ["Air Chief Marshal Amar Preet Singh", "Air Marshal V. Narayanan", "Air Marshal Harivansh"],
        sub, cat, "Appointments", grade, 3, area,
        "Air Marshal Ashutosh Dixit was appointed as the 29th Chief of the Air Staff, taking charge on 31 October 2026.",
        "Easy", None, "mcq_single"
    ))

    # Page 4
    questions.append(make_q(
        "qb-area01-0010",
        "Whom did Air Marshal Ashutosh Dixit succeed as Chief of the Air Staff?",
        "Air Chief Marshal Amar Preet Singh",
        ["Air Chief Marshal V. R. Chaudhari", "Air Chief Marshal R. K. S. Bhadauria", "Air Chief Marshal B. S. Dhanoa"],
        sub, cat, "Appointments", grade, 4, area,
        "Air Marshal Ashutosh Dixit succeeded outgoing Chief of the Air Staff Air Chief Marshal Amar Preet Singh.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0011",
        "How many permanent houses were handed over in Andhra Pradesh in the major housing development valued at ₹3,600 crore?",
        "3 lakh",
        ["1.5 lakh", "5 lakh", "2 lakh"],
        sub, cat, "State Initiatives", grade, 4, area,
        "3 lakh permanent houses valued at approximately ₹3,600 crore were handed over in Andhra Pradesh.",
        "Easy", None, "mcq_single"
    ))

    # Page 5
    questions.append(make_q(
        "qb-area01-0012",
        "Which innovative construction milestone was launched alongside the 3 lakh housing handover in Andhra Pradesh?",
        "India's first 3D concrete-printed housing project",
        [
            "India's first net-zero prefabricated housing cluster",
            "India's largest bamboo-reinforced rural housing initiative",
            "India's first self-sustaining solar micro-grid colony"
        ],
        sub, cat, "Infrastructure Innovation", grade, 5, area,
        "The event included laying the foundation stone for India's first 3D concrete-printed housing project.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0013",
        "Which organisation rolled out Tamil Nadu's first barrierless Multi-Lane Free Flow (MLFF) tolling system in October 2026?",
        "National Highways Authority of India (NHAI)",
        ["Border Roads Organisation (BRO)", "Tamil Nadu State Transport Corporation", "Ministry of Urban Development"],
        sub, cat, "Transport & Infrastructure", grade, 5, area,
        "The National Highways Authority of India (NHAI) introduced Tamil Nadu's first barrierless Multi-Lane Free Flow tolling system in October 2026.",
        "Easy", None, "mcq_single"
    ))

    # Page 6
    questions.append(make_q(
        "qb-area01-0014",
        "What is the name of India's first indigenous Fleet Support Ship launched in October 2026?",
        "INS Surya",
        ["INS Sahyadri", "INS Kulish", "INS Vikrant"],
        sub, cat, "Defence & Security", grade, 6, area,
        "INS Surya is the first indigenous Fleet Support Ship, built and launched at Hindustan Shipyard Limited, Visakhapatnam.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0015",
        "Where was the indigenous Fleet Support Ship INS Surya launched?",
        "Hindustan Shipyard Limited, Visakhapatnam",
        ["Cochin Shipyard Limited, Kochi", "Mazagon Dock Shipbuilders, Mumbai", "Garden Reach Shipbuilders, Kolkata"],
        sub, cat, "Defence & Security", grade, 6, area,
        "INS Surya was launched at Hindustan Shipyard Limited, Visakhapatnam in October 2026.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0016",
        "Which manufacturing division delivered its 2,000th aero-engine in October 2026, marking six decades of aero-engine production?",
        "HAL Koraput, Odisha",
        ["HAL Bengaluru, Karnataka", "HAL Nashik, Maharashtra", "HAL Kanpur, Uttar Pradesh"],
        sub, cat, "Defence & Aerospace", grade, 6, area,
        "Hindustan Aeronautics Limited (HAL) Koraput division in Odisha achieved the milestone of delivering its 2,000th aero-engine.",
        "Medium", None, "mcq_single"
    ))

    # Page 7
    questions.append(make_q(
        "qb-area01-0017",
        "What was the value of the Ministry of Defence contract signed for BrahMos Fire Control Systems and Launchers for Navy ships?",
        "₹661 crore",
        ["₹1,200 crore", "₹3,600 crore", "₹450 crore"],
        sub, cat, "Defence Procurement", grade, 7, area,
        "The Ministry of Defence signed a ₹661 crore contract for procurement of BrahMos Fire Control Systems and Launchers for Indian Navy ships.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0018",
        "Where was the 10th India Mobile Congress (IMC 2026) held from 7–10 October 2026?",
        "Yashobhoomi, New Delhi",
        ["Bharat Mandapam, New Delhi", "HITEX, Hyderabad", "Jio World Convention Centre, Mumbai"],
        sub, cat, "Digital Infrastructure", grade, 7, area,
        "The 10th India Mobile Congress was hosted at Yashobhoomi, New Delhi.",
        "Easy", None, "mcq_single"
    ))

    # Page 8
    questions.append(make_q(
        "qb-area01-0019",
        "What was the official theme of India Mobile Congress (IMC) 2026 inaugurated by Prime Minister Narendra Modi?",
        "Scale Without Boundaries",
        ["Connecting the Unconnected", "Global Digital Leadership", "Next-Gen AI and Wireless"],
        sub, cat, "Digital & Technology", grade, 8, area,
        "Prime Minister Narendra Modi inaugurated IMC 2026 under the theme 'Scale Without Boundaries'.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0020",
        "Who is the constitutional Head of the Union under the Constitution of India?",
        "President of India",
        ["Prime Minister of India", "Chief Justice of India", "Lok Sabha Speaker"],
        sub, cat, "Constitutional Leadership", grade, 8, area,
        "The President is the Constitutional Head of the Union, while the Prime Minister is the Head of Government.",
        "Easy", None, "mcq_single"
    ))

    # Page 9 - Institutions & HQs
    institutions = [
        ("Reserve Bank of India (RBI)", "Mumbai", ["New Delhi", "Bengaluru", "Kolkata"]),
        ("Indian Space Research Organisation (ISRO)", "Bengaluru", ["New Delhi", "Mumbai", "Hyderabad"]),
        ("Defence Research and Development Organisation (DRDO)", "New Delhi", ["Bengaluru", "Mumbai", "Hyderabad"]),
        ("Securities and Exchange Board of India (SEBI)", "Mumbai", ["New Delhi", "Kolkata", "Ahmedabad"]),
        ("National Bank for Agriculture and Rural Development (NABARD)", "Mumbai", ["New Delhi", "Chennai", "Bengaluru"]),
        ("Unique Identification Authority of India (UIDAI)", "New Delhi", ["Bengaluru", "Mumbai", "Hyderabad"]),
        ("National Highways Authority of India (NHAI)", "New Delhi", ["Mumbai", "Chennai", "Kolkata"])
    ]
    for idx, (inst, hq, distractors) in enumerate(institutions):
        questions.append(make_q(
            f"qb-area01-00{21 + idx}",
            f"Where is the national headquarters of the {inst} located?",
            hq,
            distractors,
            sub, "National Institutions", "Institutional Headquarters", grade, 9, area,
            f"The headquarters of {inst} is situated in {hq}.",
            "Easy", None, "mcq_single"
        ))

    # Page 10-13 Rapid fire questions
    questions.append(make_q(
        "qb-area01-0028",
        "Is the President of India directly elected by the citizens in general elections?",
        "False",
        [],
        sub, cat, "Electoral System", grade, 10, area,
        "The President is elected indirectly by an electoral college consisting of elected members of Parliament and State Legislative Assemblies.",
        "Easy", None, "true_false"
    ))
    questions.append(make_q(
        "qb-area01-0029",
        "Which organization conducted trials of a High-Altitude Platform and parachute jump in October 2026?",
        "DRDO",
        ["ISRO", "HAL", "CSIR"],
        sub, cat, "Defence Technology", grade, 12, area,
        "DRDO conducted the flight trial of a High-Altitude Platform and maiden live parachute jump in October 2026.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area01-0030",
        "A free-flow tolling system requires vehicles to stop at barriers to scan physical toll receipts.",
        "False",
        [],
        sub, cat, "Transport Technology", grade, 13, area,
        "A Multi-Lane Free Flow tolling system is barrierless, allowing vehicles to pass without stopping at conventional physical toll gates.",
        "Easy", None, "true_false"
    ))

    return questions
