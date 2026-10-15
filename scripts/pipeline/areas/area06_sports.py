from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Sports & Athletics"
    cat = "Major Tournaments"
    grade = "Grade 6-8"
    area = 6

    # Page 107 - Asian Games
    questions.append(make_q(
        "qb-area06-0001",
        "Which city and prefecture hosted the 20th Asian Games from September to October 2026?",
        "Aichi-Nagoya, Japan",
        ["Tokyo, Japan", "Hangzhou, China", "Doha, Qatar"],
        sub, cat, "Asian Games", grade, 107, area,
        "The 20th Asian Games were held in the Aichi-Nagoya region of Japan from 19 September to 4 October 2026.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0002",
        "What was India's final standing on the overall medal tally at the 2026 Asian Games in Aichi-Nagoya?",
        "4th",
        ["1st", "2nd", "3rd"],
        sub, cat, "Asian Games", grade, 107, area,
        "India placed 4th overall behind China, Japan, and South Korea, finishing with 85 total medals.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0003",
        "How many gold medals did India win at the 2026 Asian Games as part of its 85-medal tally?",
        "21",
        ["28", "16", "25"],
        sub, cat, "Asian Games", grade, 107, area,
        "India secured 85 total medals, consisting of 21 Gold, 27 Silver, and 37 Bronze.",
        "Easy", None, "mcq_single"
    ))

    # Page 108-109 - Archery & Athletics
    questions.append(make_q(
        "qb-area06-0004",
        "Which sport produced India's largest number of gold medals (5 golds) at the 2026 Asian Games?",
        "Archery",
        ["Shooting", "Boxing", "Athletics"],
        sub, cat, "Asian Games Disciplines", grade, 108, area,
        "Archery was India's most successful sport for gold medals, yielding 5 Gold, 2 Silver, and 2 Bronze.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0005",
        "Which discipline contributed the largest overall medal haul (24 medals) to India's 2026 Asian Games tally?",
        "Athletics",
        ["Shooting", "Archery", "Wrestling"],
        sub, cat, "Asian Games Disciplines", grade, 109, area,
        "Athletics produced India's largest total medal count (24 medals: 1 Gold, 9 Silver, 14 Bronze).",
        "Medium", None, "mcq_single"
    ))

    # Page 110 - Hockey
    questions.append(make_q(
        "qb-area06-0006",
        "Which country did India's men's hockey team defeat 5–1 in the final to retain their Asian Games title?",
        "Malaysia",
        ["Pakistan", "South Korea", "Japan"],
        sub, cat, "Field Hockey", grade, 110, area,
        "India defeated Malaysia 5–1 in the men's hockey final at the 2026 Asian Games.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0007",
        "India's women's hockey team won the Asian Games gold medal by defeating which opponent 1–0, ending a 44-year title wait?",
        "China",
        ["Japan", "South Korea", "Malaysia"],
        sub, cat, "Field Hockey", grade, 110, area,
        "India's women defeated China 1–0 to claim gold, ending a 44-year wait since 1982.",
        "Medium", None, "mcq_single"
    ))

    # Page 111-112 - Cricket
    questions.append(make_q(
        "qb-area06-0008",
        "By what margin did India's men's cricket team defeat Pakistan in the 2026 Asian Games gold medal final?",
        "19 runs",
        ["25 runs", "12 runs", "35 runs"],
        sub, cat, "Cricket", grade, 111, area,
        "India posted 211/6 and defended it by restricting Pakistan to 192/6, winning by 19 runs under captain Shreyas Iyer.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0009",
        "Which country did the Indian women's cricket team defeat by 147 runs to win the 2026 Asian Games gold medal?",
        "Sri Lanka",
        ["Pakistan", "Bangladesh", "South Africa"],
        sub, cat, "Cricket", grade, 112, area,
        "India's women's cricket team defeated Sri Lanka by 147 runs to secure the gold medal.",
        "Easy", None, "mcq_single"
    ))

    # Page 113 - Kabaddi & Boxing
    questions.append(make_q(
        "qb-area06-0010",
        "Which country did India defeat in both the men's and women's kabaddi finals at the 2026 Asian Games?",
        "Iran",
        ["South Korea", "Pakistan", "Bangladesh"],
        sub, cat, "Kabaddi", grade, 113, area,
        "India achieved double gold in Kabaddi, with both men's and women's teams defeating Iran.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0011",
        "Which Indian boxer won the gold medal in the women's 75 kg category at the 2026 Asian Games?",
        "Lovlina Borgohain",
        ["Parveen Hooda", "Nikhat Zareen", "Mary Kom"],
        sub, cat, "Boxing", grade, 113, area,
        "Lovlina Borgohain secured gold in the women's 75 kg boxing event.",
        "Easy", None, "mcq_single"
    ))

    # Page 114 - Golf & Wrestling
    questions.append(make_q(
        "qb-area06-0012",
        "Who created sporting history by becoming the first Indian woman to win an Asian Games gold medal in golf?",
        "Pranavi Urs",
        ["Aditi Ashok", "Avani Prashanth", "Diksha Dagar"],
        sub, cat, "Golf", grade, 114, area,
        "Pranavi Urs made history by winning India's first ever women's golf gold medal at the Asian Games.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0013",
        "Which Indian weightlifter completed a career medal grand slam (Olympics, Worlds, CWG, and Asian Games) by winning silver in the 49 kg category?",
        "Mirabai Chanu",
        ["Karnam Malleswari", "Bindyarani Devi", "Renu Bala Chanu"],
        sub, cat, "Weightlifting", grade, 115, area,
        "Mirabai Chanu won silver in women's 49 kg, completing her medal collection across all four major multisport games.",
        "Easy", None, "mcq_single"
    ))

    # Page 118-120 - Olympics & Bids
    questions.append(make_q(
        "qb-area06-0014",
        "Which city will host the 2028 Summer Olympic Games?",
        "Los Angeles, USA",
        ["Paris, France", "Brisbane, Australia", "London, UK"],
        sub, cat, "Olympic Games", grade, 118, area,
        "The 2028 Summer Olympic Games will take place in Los Angeles, California, USA.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0015",
        "Which Indian city has been proposed as the primary host city in India's official bid for the 2036 Summer Olympics?",
        "Ahmedabad",
        ["New Delhi", "Mumbai", "Bengaluru"],
        sub, cat, "Olympic Games", grade, 119, area,
        "Ahmedabad has been identified as the centerpiece city for India's 2036 Olympic bid, with the IOC expected to select the host in 2029.",
        "Easy", None, "mcq_single"
    ))

    # Page 122 - Chess Gukesh
    questions.append(make_q(
        "qb-area06-0016",
        "Whom did India's D. Gukesh defeat in 2024 to become the youngest undisputed World Chess Champion in history?",
        "Ding Liren",
        ["Magnus Carlsen", "Ian Nepomniachtchi", "Hikaru Nakamura"],
        sub, cat, "Chess", grade, 122, area,
        "D. Gukesh defeated Ding Liren in 2024 at age 18 to become the youngest undisputed World Chess Champion.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0017",
        "In chess, what situation occurs when a player whose turn it is to move has no legal move available and their king is NOT in check?",
        "Stalemate",
        ["Checkmate", "Castling", "Resignation"],
        sub, cat, "Chess Terminology", grade, 123, area,
        "A stalemate occurs when the active player has no legal moves and is not in check, resulting in a draw.",
        "Medium", None, "mcq_single"
    ))

    # Page 124 - Football
    questions.append(make_q(
        "qb-area06-0018",
        "How many national teams participated in the expanded tournament format of the 2026 FIFA World Cup?",
        "48",
        ["32", "64", "40"],
        sub, cat, "Football", grade, 124, area,
        "The 2026 FIFA World Cup hosted by USA, Canada, and Mexico was the first edition featuring 48 national teams (expanded from 32).",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0019",
        "In which track and field event did Neeraj Chopra win Olympic, World, Asian, and Commonwealth Games gold medals for India?",
        "Javelin throw",
        ["Shot put", "Long jump", "Discus throw"],
        sub, cat, "Athletics", grade, 125, area,
        "Neeraj Chopra is India's historic champion in men's javelin throw.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area06-0020",
        "FIDE is the international governing body for competitive professional football.",
        "False",
        [],
        sub, cat, "Sports Governance", grade, 127, area,
        "FIDE (Fédération Internationale des Échecs) is the governing body for chess. Football is governed by FIFA.",
        "Easy", None, "true_false"
    ))

    return questions
