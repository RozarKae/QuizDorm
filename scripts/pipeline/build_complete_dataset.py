import sys
import os
import json

# Add areas directory to path
sys.path.append(os.path.dirname(os.path.abspath(__file__)))

from areas import area01_india
from areas import area02_world
from areas import area03_polity
from areas import area04_scitech
from areas import area05_space
from areas import area06_sports
from areas import area07_awards
from areas import area08_personalities
from areas import area09_economy
from areas import area10_environment
from areas import area11_geography
from areas import area12_books
from areas import area13_arts
from areas import area14_health
from areas import area15_digital_ai
from areas import area16_days
from areas import area17_tamilnadu
from areas import area18_regional

from areas.common import make_q, pick_distractors, POOLS

def build_all_questions():
    all_qs = []
    
    # Base questions from initial area modules
    all_qs.extend(area01_india.get_questions())
    all_qs.extend(area02_world.get_questions())
    all_qs.extend(area03_polity.get_questions())
    all_qs.extend(area04_scitech.get_questions())
    all_qs.extend(area05_space.get_questions())
    all_qs.extend(area06_sports.get_questions())
    all_qs.extend(area07_awards.get_questions())
    all_qs.extend(area08_personalities.get_questions())
    all_qs.extend(area09_economy.get_questions())
    all_qs.extend(area10_environment.get_questions())
    all_qs.extend(area11_geography.get_questions())
    all_qs.extend(area12_books.get_questions())
    all_qs.extend(area13_arts.get_questions())
    all_qs.extend(area14_health.get_questions())
    all_qs.extend(area15_digital_ai.get_questions())
    all_qs.extend(area16_days.get_questions())
    all_qs.extend(area17_tamilnadu.get_questions())
    all_qs.extend(area18_regional.get_questions())

    print(f"Loaded {len(all_qs)} base questions from 18 area modules.")

    # Now add systematic extensions covering all remaining table items and rapid-fire entries:
    extra_qs = []

    # 1. Complete Remaining Indian State Capitals
    remaining_states = [
        ("Andhra Pradesh", "Amaravati", ["Hyderabad", "Visakhapatnam", "Vijayawada"], 247),
        ("Haryana", "Chandigarh", ["Shimla", "Dehradun", "Jaipur"], 247),
        ("Jharkhand", "Ranchi", ["Patna", "Raipur", "Bhubaneswar"], 247),
        ("Mizoram", "Aizawl", ["Imphal", "Kohima", "Shillong"], 247),
        ("Punjab", "Chandigarh", ["Amritsar", "Ludhiana", "Jalandhar"], 247),
        ("Tripura", "Agartala", ["Aizawl", "Imphal", "Shillong"], 248),
        ("Uttar Pradesh", "Lucknow", ["Kanpur", "Varanasi", "Prayagraj"], 248),
        ("West Bengal", "Kolkata", ["Howrah", "Siliguri", "Asansol"], 248),
        ("Chhattisgarh", "Raipur", ["Bilaspur", "Bhilai", "Durg"], 247)
    ]
    for idx, (st, cap, dist, pg) in enumerate(remaining_states):
        extra_qs.append(make_q(
            f"qb-area11-ext-{idx + 1:03d}",
            f"What is the official state capital of {st}?",
            cap, dist,
            "Geography", "States and Capitals", "State Capitals", "Grade 3-5", pg, 11,
            f"The official capital of {st} is {cap}."
        ))

    # 2. Complete Remaining Union Territories & Capitals
    remaining_uts = [
        ("Andaman & Nicobar Islands", "Port Blair", ["Kavaratti", "Puducherry", "Daman"], 248),
        ("Dadra & Nagar Haveli and Daman & Diu", "Daman", ["Silvassa", "Diu", "Panaji"], 248),
        ("National Capital Territory of Delhi", "New Delhi", ["Chandigarh", "Jaipur", "Lucknow"], 248),
        ("Puducherry", "Puducherry", ["Karaikal", "Mahe", "Yanam"], 248)
    ]
    for idx, (ut, cap, dist, pg) in enumerate(remaining_uts):
        extra_qs.append(make_q(
            f"qb-area11-ut-{idx + 1:03d}",
            f"What is the administrative capital of the Union Territory of {ut}?",
            cap, dist,
            "Geography", "Union Territories", "UT Capitals", "Grade 3-5", pg, 11,
            f"The administrative capital of {ut} is {cap}."
        ))

    # 3. Complete World Countries & Capitals (from Page 25-27, 263-264)
    world_caps = [
        ("France", "Paris", ["Marseille", "Lyon", "Nice"], 25),
        ("Germany", "Berlin", ["Munich", "Frankfurt", "Hamburg"], 25),
        ("Indonesia", "Jakarta", ["Surabaya", "Bandung", "Medan"], 25),
        ("Italy", "Rome", ["Milan", "Venice", "Florence"], 25),
        ("Malaysia", "Kuala Lumpur", ["George Town", "Johor Bahru", "Putrajaya"], 25),
        ("Nepal", "Kathmandu", ["Pokhara", "Lalitpur", "Biratnagar"], 26),
        ("Nigeria", "Abuja", ["Lagos", "Kano", "Ibadan"], 26),
        ("Philippines", "Manila", ["Cebu", "Davao", "Quezon City"], 26),
        ("Russia", "Moscow", ["Saint Petersburg", "Novosibirsk", "Kazan"], 26),
        ("Saudi Arabia", "Riyadh", ["Jeddah", "Mecca", "Medina"], 26),
        ("Singapore", "Singapore", ["Kuala Lumpur", "Jakarta", "Bangkok"], 26),
        ("Thailand", "Bangkok", ["Chiang Mai", "Phuket", "Pattaya"], 26),
        ("United Arab Emirates (UAE)", "Abu Dhabi", ["Dubai", "Sharjah", "Ajman"], 27),
        ("United Kingdom (UK)", "London", ["Manchester", "Edinburgh", "Birmingham"], 27),
        ("United States (USA)", "Washington, D.C.", ["New York City", "Los Angeles", "Chicago"], 27),
        ("Vietnam", "Hanoi", ["Ho Chi Minh City", "Da Nang", "Haiphong"], 27),
        ("Bhutan", "Thimphu", ["Paro", "Punakha", "Phuntsholing"], 263),
        ("Bangladesh", "Dhaka", ["Chittagong", "Sylhet", "Rajshahi"], 263),
        ("Pakistan", "Islamabad", ["Karachi", "Lahore", "Rawalpindi"], 263)
    ]
    for idx, (country, cap, dist, pg) in enumerate(world_caps):
        extra_qs.append(make_q(
            f"qb-area02-cap-{idx + 1:03d}",
            f"What is the capital city of {country}?",
            cap, dist,
            "World Affairs", "World Geography", "World Capitals", "Grade 6-8", pg, 2,
            f"The capital city of {country} is {cap}."
        ))

    # 4. Books & Authors Master Table (from Page 288-290)
    extra_books = [
        ("The Guide", "R. K. Narayan", ["Mulk Raj Anand", "Ruskin Bond", "Raja Rao"], 288),
        ("A Suitable Boy", "Vikram Seth", ["Arundhati Roy", "Salman Rushdie", "Amitav Ghosh"], 277),
        ("The God of Small Things", "Arundhati Roy", ["Anita Desai", "Kiran Desai", "Jhumpa Lahiri"], 277),
        ("Midnight's Children", "Salman Rushdie", ["V. S. Naipaul", "Vikram Seth", "Amitav Ghosh"], 277),
        ("Train to Pakistan", "Khushwant Singh", ["Mulk Raj Anand", "R. K. Narayan", "Premchand"], 277),
        ("The Shadow Lines", "Amitav Ghosh", ["Arundhati Roy", "Vikram Seth", "Salman Rushdie"], 277),
        ("Five Point Someone", "Chetan Bhagat", ["Durjoy Datta", "Ravinder Singh", "Amish Tripathi"], 277),
        ("The Immortals of Meluha", "Amish Tripathi", ["Devdutt Pattanaik", "Ashwin Sanghi", "Chetan Bhagat"], 278),
        ("A Christmas Carol", "Charles Dickens", ["William Shakespeare", "Thomas Hardy", "George Eliot"], 287),
        ("Nineteen Eighty-Four (1984)", "George Orwell", ["Aldous Huxley", "Ray Bradbury", "Arthur C. Clarke"], 287),
        ("The Adventures of Tom Sawyer", "Mark Twain", ["Herman Melville", "Jack London", "Ernest Hemingway"], 286),
        ("Emma", "Jane Austen", ["Charlotte Brontë", "Emily Brontë", "George Eliot"], 286),
        ("Macbeth", "William Shakespeare", ["Christopher Marlowe", "Ben Jonson", "John Webster"], 282),
        ("Romeo and Juliet", "William Shakespeare", ["Christopher Marlowe", "Geoffrey Chaucer", "John Milton"], 282),
        ("The Lord of the Rings", "J. R. R. Tolkien", ["C. S. Lewis", "J. K. Rowling", "Philip Pullman"], 283),
        ("The Lion, the Witch and the Wardrobe", "C. S. Lewis", ["J. R. R. Tolkien", "Roald Dahl", "Enid Blyton"], 284),
        ("Charlie and the Chocolate Factory", "Roald Dahl", ["Enid Blyton", "A. A. Milne", "Dr. Seuss"], 290),
        ("Matilda", "Roald Dahl", ["Enid Blyton", "Beatrix Potter", "C. S. Lewis"], 290),
        ("Treasure Island", "Robert Louis Stevenson", ["Daniel Defoe", "Jules Verne", "H. G. Wells"], 289),
        ("Robinson Crusoe", "Daniel Defoe", ["Robert Louis Stevenson", "Jonathan Swift", "Walter Scott"], 289),
        ("Twenty Thousand Leagues Under the Sea", "Jules Verne", ["H. G. Wells", "Arthur Conan Doyle", "Mary Shelley"], 285),
        ("Winnie-the-Pooh", "A. A. Milne", ["Beatrix Potter", "Kenneth Grahame", "Enid Blyton"], 291),
        ("Peter Rabbit", "Beatrix Potter", ["Enid Blyton", "A. A. Milne", "E. B. White"], 291),
        ("Charlotte's Web", "E. B. White", ["Roald Dahl", "Beverly Cleary", "Dr. Seuss"], 291)
    ]
    for idx, (bk, auth, dist, pg) in enumerate(extra_books):
        extra_qs.append(make_q(
            f"qb-area12-bk-{idx + 1:03d}",
            f"Who wrote the acclaimed literary work '{bk}'?",
            auth, dist,
            "Literature & Books", "Literature", "Books and Authors", "Grade 3-5", pg, 12,
            f"'{bk}' was written by {auth}."
        ))

    # 5. Health Anatomy, Deficiencies & Dentistry (from Page 326-335)
    health_items = [
        ("What primary function is performed by human incisor teeth during mastication?", "Cutting food", ["Tearing food", "Grinding food", "Crushing food"], 335),
        ("What primary function is performed by canine teeth in the human mouth?", "Tearing food", ["Cutting food", "Grinding food", "Filtering food"], 335),
        ("What primary function is performed by molar teeth during the chewing process?", "Grinding food", ["Cutting food", "Tearing food", "Piercing food"], 335),
        ("How many teeth are present in a full set of primary (milk) teeth in young children?", "20 teeth", ["28 teeth", "32 teeth", "24 teeth"], 335),
        ("How many teeth are contained in a complete adult permanent dentition set?", "32 teeth", ["28 teeth", "30 teeth", "36 teeth"], 335),
        ("Which essential mineral is required for strong bones and teeth as well as muscle contractions?", "Calcium", ["Iron", "Potassium", "Sodium"], 333),
        ("Which mineral is a crucial component of haemoglobin needed to transport oxygen in blood?", "Iron", ["Calcium", "Magnesium", "Zinc"], 333),
        ("Which infectious bacterial disease is caused by Mycobacterium tuberculosis?", "Tuberculosis (TB)", ["Cholera", "Typhoid", "Tetanus"], 330),
        ("Which bacterial disease causing severe dehydration and watery diarrhea is caused by Vibrio cholerae?", "Cholera", ["Tuberculosis", "Dengue", "Malaria"], 330),
        ("Which scientist developed the injectable inactivated polio vaccine (IPV)?", "Jonas Salk", ["Albert Sabin", "Edward Jenner", "Alexander Fleming"], 346),
        ("Which medical scientist developed the oral polio vaccine (OPV)?", "Albert Sabin", ["Jonas Salk", "Louis Pasteur", "Robert Koch"], 346),
        ("Which medical imaging technology uses magnetic fields and radio waves instead of ionizing radiation?", "MRI (Magnetic Resonance Imaging)", ["X-ray", "CT scan", "Fluoroscopy"], 338),
        ("Which diagnostic medical device records the electrical activity of the human heart?", "ECG (Electrocardiogram)", ["EEG", "Endoscope", "Defibrillator"], 338),
        ("Which medical pioneer systematically described the systemic circulation of blood pumped by the heart in 1628?", "William Harvey", ["Edward Jenner", "Alexander Fleming", "Louis Pasteur"], 339),
        ("Who discovered X-rays in 1895, earning the inaugural Nobel Prize in Physics?", "Wilhelm Conrad Röntgen", ["Marie Curie", "Ernest Rutherford", "Max Planck"], 339)
    ]
    for idx, (title, ans, dist, pg) in enumerate(health_items):
        extra_qs.append(make_q(
            f"qb-area14-ext-{idx + 1:03d}",
            title, ans, dist,
            "Health & Biology", "Human Physiology", "Health Science", "Grade 3-5", pg, 14,
            f"Verified fact from health syllabus: {ans}."
        ))

    # 6. Digital & AI Master Tables (from Page 360-381)
    tech_items = [
        ("In digital communications, what does the abbreviation 'URL' stand for?", "Uniform Resource Locator", ["Universal Resource Link", "Unified Routing Logic", "Uniform Retrieval Line"], 373),
        ("In networking, what does 'HTTP' stand for?", "Hypertext Transfer Protocol", ["High Text Transfer Path", "Hyperlink Text Transmission Protocol", "Home Tool Transfer Packet"], 373),
        ("What does the secure protocol acronym 'HTTPS' indicate when browsing websites?", "Hypertext Transfer Protocol Secure", ["High Transmission Protocol System", "Hyperlink Text Private System", "Home Transport Protocol Secure"], 373),
        ("In satellite navigation, what does 'GPS' stand for?", "Global Positioning System", ["General Planetary Satellite", "Geographic Position Sensor", "Global Pointing System"], 373),
        ("In digital security, what does 'OTP' stand for?", "One-Time Password", ["Online Transaction Protocol", "Open Terminal Password", "Official Token Provider"], 373),
        ("What does the display technology abbreviation 'VR' stand for?", "Virtual Reality", ["Visual Resolution", "Video Rendering", "Variable Radius"], 373),
        ("What does the networking standard '5G' represent in mobile communications?", "Fifth generation mobile network technology", ["5 Gigabyte transfer speed", "Five GHz band network", "Fifth gateway protocol"], 373),
        ("Which global technology company developed the Windows operating system and Azure cloud platform?", "Microsoft", ["Apple", "Google", "IBM"], 372),
        ("Which company manufactures the iPhone, iPad, and macOS operating system?", "Apple", ["Microsoft", "Samsung", "Sony"], 372),
        ("Which technology giant is known for Android, Chrome, YouTube, and Google Search?", "Google", ["Microsoft", "Amazon", "Meta"], 372),
        ("Which multinational technology company is the dominant designer of Graphics Processing Units (GPUs) used in modern AI computing?", "NVIDIA", ["Intel", "Qualcomm", "AMD"], 372),
        ("What is the primary computer architecture function of the Graphics Processing Unit (GPU)?", "Accelerating mathematical parallel processing for graphics and AI workloads", ["Executing operating system boot sequences", "Storing long-term read-only BIOS code", "Regulating power supply voltages"], 376)
    ]
    for idx, (title, ans, dist, pg) in enumerate(tech_items):
        extra_qs.append(make_q(
            f"qb-area15-ext-{idx + 1:03d}",
            title, ans, dist,
            "Computer Science", "Digital Technology & AI", "Computing & AI", "Grade 3-5", pg, 15,
            f"Verified fact: {ans}."
        ))

    # 7. Important Days & Dates Master Tables (from Page 400-410)
    extra_days = [
        ("On which date is World Wetlands Day celebrated globally to mark the 1971 Ramsar Convention?", "2 February", ["22 March", "22 April", "5 June"], 400),
        ("On which date is International Women's Day celebrated annually across the world?", "8 March", ["21 June", "8 September", "11 February"], 401),
        ("On which date is World Tuberculosis (TB) Day observed globally by the WHO?", "24 March", ["7 April", "4 February", "1 December"], 401),
        ("On which date is World Malaria Day observed to promote global malaria prevention?", "25 April", ["7 April", "24 March", "31 May"], 401),
        ("On which date is World No Tobacco Day observed globally to highlight the health hazards of tobacco?", "31 May", ["5 June", "7 April", "14 June"], 401),
        ("On which date is World Oceans Day celebrated globally for marine conservation?", "8 June", ["5 June", "22 April", "22 March"], 401),
        ("On which date is World Blood Donor Day celebrated annually on 14 June?", "14 June", ["1 July", "7 April", "12 August"], 401),
        ("On which date is World Hepatitis Day observed to increase global awareness of viral hepatitis?", "28 July", ["14 June", "1 July", "26 July"], 402),
        ("On which date is International Youth Day observed by the United Nations?", "12 August", ["15 August", "5 September", "14 November"], 402),
        ("On which date is International Literacy Day observed worldwide by UNESCO?", "8 September", ["5 September", "14 September", "2 October"], 402),
        ("On which date is Hindi Diwas celebrated across India?", "14 September", ["15 September", "5 September", "26 January"], 402),
        ("On which date is World Tourism Day observed by the UN Tourism organization?", "27 September", ["21 September", "16 October", "24 October"], 403),
        ("On which date is World Food Day celebrated under the Food and Agriculture Organization (FAO)?", "16 October", ["24 October", "16 September", "10 December"], 403),
        ("On which date is World Diabetes Day celebrated globally on 14 November?", "14 November", ["1 December", "7 April", "24 March"], 403),
        ("On which date is World AIDS Day observed globally to raise awareness about HIV?", "1 December", ["10 December", "14 November", "24 October"], 403),
        ("On which date is International Mountain Day observed by the UN on 11 December?", "11 December", ["10 December", "22 December", "5 June"], 403)
    ]
    for idx, (title, ans, dist, pg) in enumerate(extra_days):
        extra_qs.append(make_q(
            f"qb-area16-ext-{idx + 1:03d}",
            title, ans, dist,
            "General Knowledge", "Important Days & Dates", "Days & Events", "Grade 3-5", pg, 16,
            f"Verified observance date: {ans}."
        ))

    # 8. Tamil Nadu & South India Regional Awareness (from Page 415-480)
    extra_tn = [
        ("Which hill station in the Western Ghats of Tamil Nadu is famously known as the 'Princess of Hill Stations'?", "Kodaikanal (Palani Hills)", ["Ooty (Nilgiris)", "Yercaud (Shevaroy Hills)", "Valparai (Anamalai Hills)"], 416),
        ("Which hill station in the Salem district of Tamil Nadu is located in the Shevaroy Hills?", "Yercaud", ["Ooty", "Kodaikanal", "Valparai"], 416),
        ("Which river flows through Tirunelveli and Thoothukudi in southern Tamil Nadu?", "Thamirabarani River", ["Cauvery River", "Vaigai River", "Palar River"], 417),
        ("Which tiger reserve in Tamil Nadu is located in the Nilgiris district?", "Mudumalai Tiger Reserve", ["Sathyamangalam Tiger Reserve", "Anamalai Tiger Reserve", "Kalakkad Mundanthurai"], 418),
        ("Which tiger reserve in Tamil Nadu forms an important wildlife corridor in Erode district?", "Sathyamangalam Tiger Reserve", ["Mudumalai Tiger Reserve", "Anamalai Tiger Reserve", "Periyar Tiger Reserve"], 419),
        ("Which sacred temple in Kanchipuram is one of the Pancha Bhoota Sthalams representing the Earth element?", "Ekambareswarar Temple", ["Kamakshi Amman Temple", "Varadharaja Perumal Temple", "Kailasanathar Temple"], 422),
        ("Which sacred temple town in Tamil Nadu is famous for the Arunachaleswarar temple and Karthigai Deepam festival on the holy hill?", "Tiruvannamalai", ["Chidambaram", "Madurai", "Thanjavur"], 422),
        ("Which ancient Tamil classic epic was authored by Ilango Adigal during the Sangam era?", "Silappatikaram", ["Manimekalai", "Civaka Cintamani", "Kundalakesi"], 426),
        ("Which classical Tamil work was composed by poet Sattanar as a sequel to Silappatikaram?", "Manimekalai", ["Silappatikaram", "Thirukkural", "Aathichudi"], 426),
        ("Which great 20th-century Tamil poet and freedom fighter was venerated as 'Mahakavi'?", "Subramania Bharati", ["Bharathidasan", "Kavimani Desigavinayagam", "Namakkal Kavignar"], 427),
        ("Which social reformer from Tamil Nadu founded the Self-Respect Movement against caste oppression in 1925?", "Periyar E. V. Ramasamy", ["C. N. Annadurai", "K. Kamaraj", "V. O. Chidambaram Pillai"], 441),
        ("Which revered Chief Minister of Tamil Nadu was known as the 'Kingmaker' and introduced the Midday Meal Scheme in schools?", "K. Kamaraj", ["C. N. Annadurai", "M. G. Ramachandran", "C. Rajagopalachari"], 441),
        ("Who served as the first Chief Minister of Tamil Nadu from the Dravida Munnetra Kazhagam (DMK) party in 1967?", "C. N. Annadurai (Anna)", ["K. Kamaraj", "M. Karunanidhi", "M. G. Ramachandran"], 442),
        ("What UNESCO World Heritage hill railway connects Mettupalayam to Udhagamandalam (Ooty)?", "Nilgiri Mountain Railway", ["Darjeeling Himalayan Railway", "Kalka-Shimla Railway", "Kangra Valley Railway"], 445),
        ("Which major seaport in Tamil Nadu is officially named V. O. Chidambaranar Port?", "Thoothukudi Port", ["Chennai Port", "Kamarajar Port (Ennore)", "Nagapattinam Port"], 436),
        ("Which Grandmaster from Chennai became India's first undisputed World Chess Champion in the modern era in 2000?", "Viswanathan Anand", ["D. Gukesh", "R. Praggnanandhaa", "Pentala Harikrishna"], 437),
        ("Which prominent off-spin bowling champion in international Test cricket was born in Chennai, Tamil Nadu?", "Ravichandran Ashwin", ["R. Sai Kishore", "Dinesh Karthik", "Murali Vijay"], 438),
        ("What sweet culinary specialty prepared with wheat, ghee, and Thamirabarani water is the GI-tagged pride of Tirunelveli?", "Tirunelveli Halwa", ["Madurai Jigarthanda", "Srivilliputhur Palkova", "Manapparai Murukku"], 461),
        ("Which coastal landmark in Kanyakumari marks the sacred place where Swami Vivekananda meditated in 1892?", "Vivekananda Rock Memorial", ["Gandhi Mandapam", "Thiruvalluvar Memorial", "Kamaraj Memorial"], 463),
        ("What is the height of the monumental stone statue of saint-poet Thiruvalluvar erected on an island off Kanyakumari?", "133 feet (representing 133 chapters of Thirukkural)", ["100 feet", "150 feet", "108 feet"], 463)
    ]
    for idx, (title, ans, dist, pg) in enumerate(extra_tn):
        extra_qs.append(make_q(
            f"qb-area17-ext-{idx + 1:03d}",
            title, ans, dist,
            "Regional Studies", "Tamil Nadu Heritage & Culture", "Tamil Nadu GK", "Grade 3-5", pg, 17,
            f"Verified Tamil Nadu heritage fact: {ans}."
        ))

    # 9. Space, Science & Environment Extensions (from Page 81-240)
    extra_space_env = [
        ("What does the rocket launch vehicle acronym 'PSLV' stand for in ISRO's space fleet?", "Polar Satellite Launch Vehicle", ["Precision Satellite Launch Vehicle", "Planetary Space Launch Vehicle", "Polar Spacecraft Lunar Vehicle"], 81),
        ("What does the satellite launch acronym 'GSLV' stand for in ISRO's operational rocket family?", "Geosynchronous Satellite Launch Vehicle", ["Global Satellite Launch Vehicle", "Geostationary Spacecraft Launcher Vehicle", "Gravitational Satellite Launch Vehicle"], 81),
        ("What does the launch vehicle acronym 'SSLV' stand for in ISRO's commercial small-payload fleet?", "Small Satellite Launch Vehicle", ["Standard Space Launch Vehicle", "Solar Satellite Launch Vehicle", "Suborbital Space Launch Vehicle"], 81),
        ("What is the planned mission objective of India's upcoming Chandrayaan-4 lunar mission?", "Lunar sample return to Earth", ["Manned lunar landing", "Permanent lunar south pole base", "Lunar orbit communication relay"], 88),
        ("Which planet in our Solar System is widely nicknamed the 'Red Planet' due to oxidized iron minerals on its surface?", "Mars", ["Venus", "Mercury", "Jupiter"], 92),
        ("Which gas giant planet in our Solar System possesses the famous atmospheric storm known as the Great Red Spot?", "Jupiter", ["Saturn", "Neptune", "Uranus"], 95),
        ("What morphological shape characterizes the Milky Way Galaxy in which our Solar System resides?", "Barred spiral galaxy", ["Elliptical galaxy", "Irregular galaxy", "Lenticular galaxy"], 96),
        ("Which prominent northern constellation contains the iconic seven-star pattern known as the Big Dipper (Saptarishi)?", "Ursa Major", ["Ursa Minor", "Orion", "Cassiopeia"], 97),
        ("Which winter constellation is easily recognized by its distinctive three-star belt in the night sky?", "Orion (The Hunter)", ["Ursa Major", "Scorpius", "Taurus"], 97),
        ("Which navigational star in the northern celestial hemisphere appears nearly stationary above Earth's north rotational axis?", "Polaris (North Star)", ["Sirius", "Betelgeuse", "Vega"], 98),
        ("What is the name of the international space laboratory operating continuously in Low Earth Orbit since 1998?", "International Space Station (ISS)", ["Tiangong", "Mir", "Skylab"], 101),
        ("Which two space agencies jointly developed the dual-frequency Synthetic Aperture Radar aboard the NISAR satellite?", "NASA and ISRO", ["ESA and ISRO", "JAXA and ISRO", "Roscosmos and ISRO"], 90),
        ("In air pollution monitoring, what does the particulate metric 'PM2.5' signify?", "Airborne particulate matter with an aerodynamic diameter of 2.5 micrometres or smaller", ["Particulate minerals with 2.5% toxic concentration", "Pollution mass index measured at 2.5 metres altitude", "Particle density exceeding 2.5 grams per cubic metre"], 234),
        ("What does the air monitoring index abbreviation 'AQI' stand for?", "Air Quality Index", ["Atmospheric Quality Indicator", "Airborne Quantity Index", "Aerosol Quotient Index"], 234),
        ("What international environmental treaty was adopted in 1987 to phase out chlorofluorocarbons (CFCs) and protect the ozone layer?", "Montreal Protocol", ["Kyoto Protocol", "Paris Agreement", "Basel Convention"], 238),
        ("Which international convention regulates global trade in specimens of endangered wild animals and plants?", "CITES", ["Ramsar Convention", "CBD", "UNFCCC"], 240)
    ]
    for idx, (title, ans, dist, pg) in enumerate(extra_space_env):
        extra_qs.append(make_q(
            f"qb-area05-ext-{idx + 1:03d}",
            title, ans, dist,
            "Science & Technology", "Space & Environment", "Space & Ecology", "Grade 6-8", pg, 5 if "Space" in title or "lunar" in title else 10,
            f"Verified science/space fact: {ans}."
        ))

    all_qs.extend(extra_qs)
    print(f"\n========================================================")
    print(f"Generated a grand total of {len(all_qs)} questions across all 18 areas!")
    print(f"========================================================")

    output_path = 'scripts/pipeline/all_generated_questions.json'
    with open(output_path, 'w', encoding='utf-8') as f:
        json.dump(all_qs, f, indent=2, ensure_ascii=False)
    print(f"Successfully saved all questions to {output_path}")

if __name__ == '__main__':
    build_all_questions()
