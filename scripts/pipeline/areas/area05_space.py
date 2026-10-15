from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Science & Astronomy"
    cat = "Space Exploration"
    grade = "Grade 6-8"
    area = 5

    # Page 81 - ISRO & Launch Vehicles
    questions.append(make_q(
        "qb-area05-0001",
        "In which year was the Indian Space Research Organisation (ISRO) formally established?",
        "1969",
        ["1962", "1972", "1975"],
        sub, cat, "Space Agencies", grade, 81, area,
        "ISRO was founded in 1969 under the Department of Space, with headquarters in Bengaluru.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0002",
        "Which Indian launch vehicle is designated as ISRO's dedicated heavy-lift launch vehicle?",
        "LVM3",
        ["PSLV", "SSLV", "Sounding Rocket"],
        sub, cat, "Launch Vehicles", grade, 81, area,
        "LVM3 (Launch Vehicle Mark-3) is India's operational heavy-lift launch vehicle.",
        "Easy", None, "mcq_single"
    ))

    # Page 82 - Chandrayaan-3
    questions.append(make_q(
        "qb-area05-0003",
        "On which date did Chandrayaan-3 successfully achieve a soft landing on the lunar south polar region?",
        "23 August 2023",
        ["14 July 2023", "2 September 2023", "24 September 2023"],
        sub, cat, "Lunar Missions", grade, 82, area,
        "Chandrayaan-3 soft-landed near the lunar south pole on 23 August 2023.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0004",
        "What was the name of the lunar lander module of India's Chandrayaan-3 mission?",
        "Vikram",
        ["Pragyan", "Pushpak", "Vyom"],
        sub, cat, "Lunar Missions", grade, 82, area,
        "The lander was named Vikram (after Dr. Vikram Sarabhai) and the rover was named Pragyan.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0005",
        "What was the name of the six-wheeled robotic rover deployed by Chandrayaan-3 onto the Moon's surface?",
        "Pragyan",
        ["Vikram", "Vyommitra", "Dhruv"],
        sub, cat, "Lunar Missions", grade, 83, area,
        "The rover module was named Pragyan, which conducted in-situ chemical analyses on the lunar surface.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0006",
        "Which annual date is designated as National Space Day in India to commemorate the Chandrayaan-3 landing?",
        "23 August",
        ["14 July", "2 September", "28 February"],
        sub, cat, "National Observances", grade, 83, area,
        "National Space Day is celebrated annually in India on 23 August to commemorate the historic landing of Chandrayaan-3.",
        "Easy", None, "mcq_single"
    ))

    # Page 83 - Aditya-L1
    questions.append(make_q(
        "qb-area05-0007",
        "What is the orbital destination of India's first dedicated solar observatory mission, Aditya-L1?",
        "Sun-Earth L1 Lagrange point",
        ["Sun-Earth L2 point", "Low Earth Orbit", "Lunar Polar Orbit"],
        sub, cat, "Solar Exploration", grade, 83, area,
        "Aditya-L1 operates in a halo orbit around the first Sun-Earth Lagrange point (L1), approximately 1.5 million km from Earth.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0008",
        "Aditya-L1 is an interplanetary landing probe designed to land directly onto the solar surface.",
        "False",
        [],
        sub, cat, "Solar Exploration", grade, 84, area,
        "Aditya-L1 does not land on the Sun; it observes solar phenomena from a stable position around the Sun-Earth L1 point.",
        "Easy", None, "true_false"
    ))

    # Page 85 - XPoSat & Gaganyaan
    questions.append(make_q(
        "qb-area05-0009",
        "What primary physical property of cosmic radiation does India's XPoSat satellite observe from celestial sources?",
        "X-ray polarisation",
        ["Gamma-ray burst velocity", "Infrared thermal emission", "Gravitational wave frequency"],
        sub, cat, "Space Astronomy", grade, 85, area,
        "XPoSat (X-ray Polarimeter Satellite) is dedicated to studying the polarisation of cosmic X-rays from black holes, neutron stars, and pulsars.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0010",
        "What specific term is officially used in India for astronauts selected for the Gaganyaan human spaceflight programme?",
        "Vyomnauts",
        ["Cosmonauts", "Taikonauts", "Spacenauts"],
        sub, cat, "Human Spaceflight", grade, 86, area,
        "Indian astronauts designated for the Gaganyaan human spaceflight programme are called Vyomnauts (from Sanskrit 'Vyoma' meaning sky/space).",
        "Easy", None, "mcq_single"
    ))

    # Page 87 - Shubhanshu Shukla & Rakesh Sharma
    questions.append(make_q(
        "qb-area05-0011",
        "Who became the first Indian to visit the International Space Station (ISS) as part of the Axiom-4 mission in 2025?",
        "Group Captain Shubhanshu Shukla",
        ["Wing Commander Rakesh Sharma", "Captain Prashanth Balakrishnan Nair", "Group Captain Angad Pratap"],
        sub, cat, "Space Personalities", grade, 87, area,
        "Group Captain Shubhanshu Shukla became the first Indian to visit the ISS and the second Indian citizen in space after Rakesh Sharma.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0012",
        "Who was India's first citizen to travel into outer space aboard the Soviet Soyuz T-11 spacecraft in 1984?",
        "Wing Commander Rakesh Sharma",
        ["Group Captain Shubhanshu Shukla", "Vikram Sarabhai", "Satish Dhawan"],
        sub, cat, "Space Personalities", grade, 87, area,
        "Rakesh Sharma was India's first citizen to travel into space in April 1984.",
        "Easy", None, "mcq_single"
    ))

    # Page 89 - NISAR & LUPEX
    questions.append(make_q(
        "qb-area05-0013",
        "Which space agency is collaborating jointly with ISRO on the Chandrayaan-5 / LUPEX lunar polar mission?",
        "JAXA (Japan)",
        ["NASA (USA)", "ESA (Europe)", "Roscosmos (Russia)"],
        sub, cat, "International Space Missions", grade, 89, area,
        "The Lunar Polar Exploration (LUPEX) mission is a joint collaboration between ISRO and Japan's JAXA.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0014",
        "The NISAR satellite is an Earth-observing dual-frequency radar collaboration developed between ISRO and which international agency?",
        "NASA",
        ["ESA", "JAXA", "Roscosmos"],
        sub, cat, "Earth Observation", grade, 89, area,
        "NISAR is the NASA-ISRO Synthetic Aperture Radar satellite mission.",
        "Easy", None, "mcq_single"
    ))

    # Page 93 - Mars / MOM
    questions.append(make_q(
        "qb-area05-0015",
        "What popular name was given to India's Mars Orbiter Mission (MOM) launched in November 2013?",
        "Mangalyaan",
        ["Chandrayaan", "Suryaan", "Vyomyaan"],
        sub, cat, "Interplanetary Missions", grade, 93, area,
        "India's Mars Orbiter Mission was popularly designated Mangalyaan, entering Mars orbit in September 2014.",
        "Easy", None, "mcq_single"
    ))

    # Page 94 - Planets
    questions.append(make_q(
        "qb-area05-0016",
        "Which planet in the Solar System is recognized as the hottest due to its runaway greenhouse atmosphere?",
        "Venus",
        ["Mercury", "Mars", "Jupiter"],
        sub, cat, "Planetary Astronomy", grade, 95, area,
        "Despite Mercury being closest to the Sun, Venus is the hottest planet because of its dense carbon dioxide atmosphere.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0017",
        "Which planet in the Solar System is uniquely known for rotating on its side with an axial tilt of nearly 98 degrees?",
        "Uranus",
        ["Saturn", "Neptune", "Jupiter"],
        sub, cat, "Planetary Astronomy", grade, 95, area,
        "Uranus has an unusual sideways rotation, with an axial tilt of approximately 98 degrees.",
        "Medium", None, "mcq_single"
    ))

    # Page 99 - Asteroid / Comet / Meteor
    questions.append(make_q(
        "qb-area05-0018",
        "What term describes a space rock fragment that survives atmospheric entry and actually strikes the ground on Earth?",
        "Meteorite",
        ["Meteor", "Meteoroid", "Asteroid"],
        sub, cat, "Celestial Bodies", grade, 99, area,
        "A meteoroid is in space; a meteor is the streak of light in the atmosphere; a meteorite is the fragment that hits the ground.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area05-0019",
        "The Moon's rotational period on its axis is approximately equal to its orbital period around the Earth (about 27.3 days).",
        "True",
        [],
        sub, cat, "Lunar Dynamics", grade, 99, area,
        "Because of synchronous rotation (tidal locking), both the orbital and rotational periods are approximately 27.3 days, keeping the same face towards Earth.",
        "Medium", None, "true_false"
    ))

    return questions
