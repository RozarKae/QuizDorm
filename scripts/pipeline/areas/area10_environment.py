from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Environmental Science"
    cat = "Ecology & Conservation"
    grade = "Grade 6-8"
    area = 10

    # Page 214 - Paris Agreement
    questions.append(make_q(
        "qb-area10-0001",
        "In which year was the Paris Agreement on climate change adopted under the UNFCCC?",
        "2015",
        ["2010", "2018", "2021"],
        sub, cat, "Climate Pacts", grade, 214, area,
        "The Paris Agreement was adopted by 196 parties at COP21 in Paris on 12 December 2015.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area10-0002",
        "What ambitious global temperature increase limit does the Paris Agreement aim to pursue to prevent catastrophic climate risks?",
        "1.5°C above pre-industrial levels",
        ["2.5°C above pre-industrial levels", "3.0°C above pre-industrial levels", "0.5°C above pre-industrial levels"],
        sub, cat, "Climate Pacts", grade, 214, area,
        "The Paris Agreement sets a goal to keep global warming well below 2°C and pursue efforts to limit it to 1.5°C.",
        "Easy", None, "mcq_single"
    ))

    # Page 215 - Net Zero
    questions.append(make_q(
        "qb-area10-0003",
        "By which target year has the Government of India officially pledged to achieve net-zero greenhouse gas emissions?",
        "2070",
        ["2050", "2047", "2060"],
        sub, cat, "Climate Commitments", grade, 215, area,
        "India announced its long-term low-emission development strategy to reach net zero emissions by 2070.",
        "Easy", None, "mcq_single"
    ))

    # Page 216 - COP31
    questions.append(make_q(
        "qb-area10-0004",
        "Which city and country were designated to host the 31st UN Climate Change Conference (COP31) in November 2026?",
        "Antalya, Türkiye",
        ["Baku, Azerbaijan", "Dubai, UAE", "Belém, Brazil"],
        sub, cat, "Climate Summits", grade, 216, area,
        "COP31 will take place in Antalya, Türkiye, from 9–20 November 2026.",
        "Easy", None, "mcq_single"
    ))

    # Page 218 - Project Tiger
    questions.append(make_q(
        "qb-area10-0005",
        "In which year was India's flagship wildlife conservation programme 'Project Tiger' launched?",
        "1973",
        ["1969", "1980", "1992"],
        sub, cat, "Wildlife Conservation", grade, 218, area,
        "Project Tiger was launched on 1 April 1973 under Prime Minister Indira Gandhi to conserve the Royal Bengal tiger.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area10-0006",
        "What is the binomial scientific name of the Bengal tiger, India's national animal?",
        "Panthera tigris",
        ["Panthera leo", "Panthera pardus", "Panthera uncia"],
        sub, cat, "Wildlife Taxonomy", grade, 219, area,
        "The scientific name of the tiger is Panthera tigris.",
        "Easy", None, "mcq_single"
    ))

    # Page 219 - Project Elephant & Dolphin
    questions.append(make_q(
        "qb-area10-0007",
        "Which animal is officially designated as the National Heritage Animal of India?",
        "Indian Elephant",
        ["Bengal Tiger", "One-horned Rhinoceros", "Snow Leopard"],
        sub, cat, "National Symbols", grade, 219, area,
        "The Indian Elephant (Elephas maximus) was declared India's National Heritage Animal in 2010.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area10-0008",
        "Which aquatic mammal is designated as the National Aquatic Animal of India?",
        "Ganges River Dolphin",
        ["Dugong", "Olive Ridley Sea Turtle", "Gharial"],
        sub, cat, "National Symbols", grade, 224, area,
        "The Ganges River Dolphin (Platanista gangetica) is India's National Aquatic Animal.",
        "Easy", None, "mcq_single"
    ))

    # Page 220 - Project Cheetah
    questions.append(make_q(
        "qb-area10-0009",
        "Which national park in Madhya Pradesh is the centerpiece location for India's Project Cheetah reintroduction programme?",
        "Kuno National Park",
        ["Bandhavgarh National Park", "Kanha National Park", "Ranthambore National Park"],
        sub, cat, "Wildlife Reintroduction", grade, 220, area,
        "Kuno National Park in Madhya Pradesh received the first batches of wild cheetahs from Namibia and South Africa in 2022.",
        "Easy", None, "mcq_single"
    ))

    # Page 221-222 - Great Indian Bustard
    questions.append(make_q(
        "qb-area10-0010",
        "What is the IUCN Red List conservation status of the Great Indian Bustard (Ardeotis nigriceps)?",
        "Critically Endangered",
        ["Vulnerable", "Near Threatened", "Least Concern"],
        sub, cat, "Endangered Species", grade, 221, area,
        "The Great Indian Bustard, state bird of Rajasthan, is classified as Critically Endangered on the IUCN Red List.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area10-0011",
        "Where were two captive-bred Great Indian Bustards released into the wild in an October 2026 conservation milestone?",
        "Desert National Park, Jaisalmer, Rajasthan",
        ["Keoladeo National Park, Bharatpur", "Ranthambore National Park", "Sariska Tiger Reserve"],
        sub, cat, "Endangered Species", grade, 222, area,
        "Two captive-bred bustards were released into the wild at Desert National Park in Jaisalmer, Rajasthan, in October 2026.",
        "Medium", None, "mcq_single"
    ))

    # Page 223 - One-horned rhino
    questions.append(make_q(
        "qb-area10-0012",
        "Which national park in Assam hosts the world's largest population of the Greater one-horned rhinoceros?",
        "Kaziranga National Park",
        ["Manas National Park", "Jim Corbett National Park", "Sundarbans National Park"],
        sub, cat, "Protected Areas", grade, 223, area,
        "Kaziranga National Park in Assam is home to more than two-thirds of the world's Great one-horned rhinoceroses.",
        "Easy", None, "mcq_single"
    ))

    # Page 227 - Biodiversity Hotspots
    questions.append(make_q(
        "qb-area10-0013",
        "How many global biodiversity hotspots are located across or intersecting the territory of India?",
        "4",
        ["2", "6", "8"],
        sub, cat, "Biodiversity", grade, 227, area,
        "India encompasses four global biodiversity hotspots: the Himalayas, Indo-Burma, Western Ghats–Sri Lanka, and Sundaland.",
        "Easy", None, "mcq_single"
    ))

    # Page 228 - Ramsar Convention
    questions.append(make_q(
        "qb-area10-0014",
        "In which Iranian city was the international convention on wetlands of international importance signed in 1971?",
        "Ramsar",
        ["Tehran", "Isfahan", "Shiraz"],
        sub, cat, "Wetlands Conservation", grade, 228, area,
        "The Ramsar Convention on Wetlands was signed in the Iranian city of Ramsar on the shores of the Caspian Sea in 1971.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area10-0015",
        "Which iconic freshwater lake in Manipur is internationally renowned for its floating biomass rings known as 'phumdis'?",
        "Loktak Lake",
        ["Chilika Lake", "Wular Lake", "Sambhar Lake"],
        sub, cat, "Ramsar Wetlands", grade, 228, area,
        "Loktak Lake in Manipur is famous for its floating phumdis and houses the Keibul Lamjao National Park.",
        "Easy", None, "mcq_single"
    ))

    # Page 231 - Olive Ridley
    questions.append(make_q(
        "qb-area10-0016",
        "Which sea turtle species is celebrated for arriving in hundreds of thousands for mass nesting (arribada) on the coast of Odisha?",
        "Olive Ridley turtle",
        ["Green sea turtle", "Hawksbill turtle", "Leatherback turtle"],
        sub, cat, "Marine Wildlife", grade, 231, area,
        "Olive Ridley sea turtles (Lepidochelys olivacea) congregate annually at Gahirmatha and Rushikulya in Odisha for synchronized mass nesting.",
        "Easy", None, "mcq_single"
    ))

    # Page 235 - Living Planet Report
    questions.append(make_q(
        "qb-area10-0017",
        "According to WWF's Living Planet Report 2026, by what average percentage did monitored global wildlife populations decline between 1970 and 2022?",
        "73%",
        ["50%", "60%", "85%"],
        sub, cat, "Conservation Reports", grade, 235, area,
        "The Living Planet Report 2026 documented an average 73% catastrophic decline in monitored vertebrate wildlife populations between 1970 and 2022.",
        "Medium", None, "mcq_single"
    ))

    # Page 237 - GLOF
    questions.append(make_q(
        "qb-area10-0018",
        "What catastrophic mountain hazard does the meteorological abbreviation 'GLOF' stand for?",
        "Glacial Lake Outburst Flood",
        ["Geothermal Landslide Outflow Formation", "Gravitational Lithosphere Oceanic Fault", "Glacial Low-Oxygen Freezing"],
        sub, cat, "Disaster Management", grade, 237, area,
        "GLOF stands for Glacial Lake Outburst Flood, a sudden catastrophic breach and drainage of glacial meltwater lakes in high mountain ranges.",
        "Easy", None, "mcq_single"
    ))

    # Page 238 - Ozone Layer
    questions.append(make_q(
        "qb-area10-0019",
        "In which atmospheric layer is the protective ozone layer predominantly concentrated?",
        "Stratosphere",
        ["Troposphere", "Mesosphere", "Thermosphere"],
        sub, cat, "Atmospheric Science", grade, 238, area,
        "The stratospheric ozone layer absorbs harmful ultraviolet-B radiation emitted by the Sun.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area10-0020",
        "Melting of floating sea ice directly and significantly increases global ocean sea levels.",
        "False",
        [],
        sub, cat, "Climate Science", grade, 231, area,
        "Floating sea ice already displaces its own volume of water in accordance with Archimedes' principle; sea level rise is primarily driven by thermal expansion and the melting of grounded land ice.",
        "Medium", None, "true_false"
    ))

    return questions
