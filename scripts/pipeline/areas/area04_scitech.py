from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Science & Technology"
    cat = "Technology Policy"
    grade = "Grade 6-8"
    area = 4

    # Page 58 - RDI Fund
    questions.append(make_q(
        "qb-area04-0001",
        "What is the total financial outlay approved for India's Research, Development and Innovation (RDI) Scheme?",
        "₹1 lakh crore",
        ["₹50,000 crore", "₹2 lakh crore", "₹75,000 crore"],
        sub, cat, "National Schemes", grade, 58, area,
        "The RDI Scheme has an overall outlay of ₹1 lakh crore over 6 years to promote private-sector R&D in strategic technologies.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area04-0002",
        "Over how many years is the ₹1 lakh crore outlay of India's RDI Scheme scheduled to be deployed?",
        "6 years",
        ["3 years", "5 years", "10 years"],
        sub, cat, "National Schemes", grade, 58, area,
        "The RDI Scheme operates over a 6-year period targeting emerging and strategic technologies.",
        "Easy", None, "mcq_single"
    ))

    # Page 59 - National Quantum Mission
    questions.append(make_q(
        "qb-area04-0003",
        "What is the total budget outlay approved for the National Quantum Mission (NQM) in India?",
        "₹6,003.65 crore",
        ["₹3,660 crore", "₹10,000 crore", "₹4,500.25 crore"],
        sub, cat, "Quantum Technology", grade, 59, area,
        "The National Quantum Mission was approved with a budget outlay of ₹6,003.65 crore.",
        "Medium", None, "mcq_single"
    ))

    # Page 60 - NM-ICPS
    questions.append(make_q(
        "qb-area04-0004",
        "What does the acronym NM-ICPS stand for in India's technology development mission portfolio?",
        "National Mission on Interdisciplinary Cyber-Physical Systems",
        [
            "National Mission on Integrated Cloud-Physical Systems",
            "National Mission on Information and Cyber Protection Systems",
            "National Mission on Interconnected Computing Platforms"
        ],
        sub, cat, "Cyber-Physical Systems", grade, 60, area,
        "NM-ICPS stands for National Mission on Interdisciplinary Cyber-Physical Systems.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area04-0005",
        "How many Technology Innovation Hubs (TIHs) have been established under the NM-ICPS across premier academic institutions?",
        "25",
        ["15", "50", "30"],
        sub, cat, "Cyber-Physical Systems", grade, 61, area,
        "25 Technology Innovation Hubs have been established under NM-ICPS at leading institutions across India.",
        "Medium", None, "mcq_single"
    ))

    # Page 61 - SEMICON India 2026
    questions.append(make_q(
        "qb-area04-0006",
        "Which open-standard processor architecture was specifically spotlighted in the Digital India Grand Challenge under the Chips to Startup (C2S) Programme?",
        "RISC-V",
        ["ARM", "x86", "MIPS"],
        sub, cat, "Semiconductor Technology", grade, 62, area,
        "The Digital India RISC-V Grand Challenge under C2S awarded teams developing indigenous processor technologies based on open RISC-V architecture.",
        "Medium", None, "mcq_single"
    ))

    # Page 63 - AI CoEs & Responsible AI
    questions.append(make_q(
        "qb-area04-0007",
        "How many Artificial Intelligence Centres of Excellence had been approved across Indian States and UTs as of August 2026?",
        "58",
        ["22", "40", "75"],
        sub, cat, "Artificial Intelligence", grade, 63, area,
        "The government reported 58 approved AI Centres of Excellence as of August 2026, with 22 already initiated across 13 States/UTs.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area04-0008",
        "How many projects were approved under the Safe & Trusted AI pillar of the IndiaAI Mission as of July 2026?",
        "13",
        ["25", "10", "8"],
        sub, cat, "Artificial Intelligence", grade, 63, area,
        "13 Responsible AI projects focusing on bias mitigation, deepfake detection, and privacy were approved.",
        "Medium", None, "mcq_single"
    ))

    # Page 64 - Supercomputing
    questions.append(make_q(
        "qb-area04-0009",
        "How many supercomputers were deployed under India's National Supercomputing Mission (NSM) by September 2026?",
        "40",
        ["25", "50", "32"],
        sub, cat, "High-Performance Computing", grade, 64, area,
        "40 supercomputers with an aggregate compute capacity of approximately 68 petaflops were deployed under NSM by September 2026.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area04-0010",
        "What does the computing unit abbreviation 'PF' represent in high-performance computing metrics?",
        "Petaflop",
        ["Picofarad", "Parallel Flow", "Petabyte File"],
        sub, cat, "High-Performance Computing", grade, 65, area,
        "PF stands for Petaflop, which represents one quadrillion (10^15) floating-point operations per second.",
        "Easy", None, "mcq_single"
    ))

    # Page 65 - QKD Link
    questions.append(make_q(
        "qb-area04-0011",
        "What physical distance was successfully bridged in India's first free-space Quantum Key Distribution (QKD) demonstration in Gujarat?",
        "5.56 km",
        ["10.25 km", "2.45 km", "15.0 km"],
        sub, cat, "Quantum Communications", grade, 65, area,
        "India demonstrated its first free-space QKD link over 5.56 km in Gujarat involving QNu Labs, BISAG-N, and IIT Gandhinagar.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area04-0012",
        "Which Indian Institute of Technology was actively involved in demonstrating the first free-space QKD link?",
        "IIT Gandhinagar",
        ["IIT Madras", "IIT Bombay", "IIT Delhi"],
        sub, cat, "Quantum Communications", grade, 66, area,
        "IIT Gandhinagar partnered with QNu Labs and BISAG-N in the 5.56 km free-space QKD demonstration.",
        "Medium", None, "mcq_single"
    ))

    # Page 66 - CHIME
    questions.append(make_q(
        "qb-area04-0013",
        "Which premier Indian research institute collaborated in the CHIME telescope observations of early-universe hydrogen emissions?",
        "Raman Research Institute (RRI)",
        ["Tata Institute of Fundamental Research (TIFR)", "Indian Institute of Science (IISc)", "Inter-University Centre for Astronomy and Astrophysics (IUCAA)"],
        sub, cat, "Radio Astronomy", grade, 66, area,
        "Researchers from Raman Research Institute (RRI), Bengaluru, participated in standalone hydrogen detections from the early universe using CHIME.",
        "Medium", None, "mcq_single"
    ))

    # Page 71 - Quantum vs Classical
    questions.append(make_q(
        "qb-area04-0014",
        "What fundamental unit of information is used by quantum computers to represent superpositions of states?",
        "Qubit",
        ["Bit", "Byte", "Pixel"],
        sub, cat, "Quantum Computing", grade, 71, area,
        "Quantum computers utilize quantum bits or qubits, which can represent linear combinations of 0 and 1 simultaneously.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area04-0015",
        "Which chemical element is the primary foundational material used in modern semiconductor chip manufacturing?",
        "Silicon",
        ["Carbon", "Copper", "Aluminum"],
        sub, cat, "Materials & Semiconductors", grade, 72, area,
        "Silicon is the standard semiconductor element used in the vast majority of integrated circuits and computer processors.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area04-0016",
        "Machine Learning is an umbrella concept that encompasses all forms of Artificial Intelligence.",
        "False",
        [],
        sub, cat, "AI & Computing Concepts", grade, 75, area,
        "Machine Learning is a subset/approach within Artificial Intelligence, not the reverse.",
        "Easy", None, "true_false"
    ))

    return questions
