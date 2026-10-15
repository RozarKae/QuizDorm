from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Literature & Books"
    cat = "Indian & World Authors"
    grade = "Grade 3-5"
    area = 12

    # Page 277 - Literary definitions
    questions.append(make_q(
        "qb-area12-0001",
        "What term describes a published written account of a person's life composed by that person themselves?",
        "Autobiography",
        ["Biography", "Anthology", "Monograph"],
        sub, cat, "Literary Forms", grade, 277, area,
        "An autobiography is the life story of a person written by that person themselves.",
        "Easy", None, "mcq_single"
    ))

    # Page 278 - Tagore
    questions.append(make_q(
        "qb-area12-0002",
        "Who penned the verses of both India's national anthem ('Jana Gana Mana') and Bangladesh's national anthem ('Amar Sonar Bangla')?",
        "Rabindranath Tagore",
        ["Bankim Chandra Chattopadhyay", "Subramania Bharati", "Kazi Nazrul Islam"],
        sub, cat, "Indian Literature", grade, 278, area,
        "Rabindranath Tagore composed the national anthems of both India and Bangladesh.",
        "Easy", None, "mcq_single"
    ))

    # Page 279 - R. K. Narayan
    questions.append(make_q(
        "qb-area12-0003",
        "Which renowned Indian author created the stories of 'Swami and Friends' and 'Malgudi Days' set in the fictional town of Malgudi?",
        "R. K. Narayan",
        ["Ruskin Bond", "Mulk Raj Anand", "R. K. Laxman"],
        sub, cat, "Indian Literature", grade, 279, area,
        "R. K. Narayan created the fictional South Indian town of Malgudi as the backdrop for Swami and Friends and Malgudi Days.",
        "Easy", None, "mcq_single"
    ))

    # Page 279 - Ruskin Bond
    questions.append(make_q(
        "qb-area12-0004",
        "Who is the beloved author of children's classics such as 'The Blue Umbrella' and 'The Room on the Roof'?",
        "Ruskin Bond",
        ["R. K. Narayan", "Roald Dahl", "Rudyard Kipling"],
        sub, cat, "Indian Literature", grade, 279, area,
        "Ruskin Bond wrote The Blue Umbrella, The Room on the Roof, and numerous stories celebrating life in the Himalayan foothills.",
        "Easy", None, "mcq_single"
    ))

    # Page 280 - Kalam & Premchand
    questions.append(make_q(
        "qb-area12-0005",
        "What is the title of the inspirational autobiography written by Dr. A. P. J. Abdul Kalam with Arun Tiwari?",
        "Wings of Fire",
        ["Ignited Minds", "India 2020", "My Journey"],
        sub, cat, "Autobiography", grade, 280, area,
        "Wings of Fire is the autobiography of former President Dr. A. P. J. Abdul Kalam.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area12-0006",
        "Who is the celebrated Hindi and Urdu literary pioneer who authored the masterpiece novel 'Godaan'?",
        "Munshi Premchand",
        ["Harivansh Rai Bachchan", "Ramdhari Singh Dinkar", "Phanishwar Nath Renu"],
        sub, cat, "Hindi Literature", grade, 280, area,
        "Munshi Premchand is one of the greatest modern writers in Hindi literature, famous for Godaan, Gaban, and Nirmala.",
        "Easy", None, "mcq_single"
    ))

    # Page 281 - World Authors
    books_authors = [
        ("Pride and Prejudice", "Jane Austen", ["Emily Brontë", "Mary Shelley", "Virginia Woolf"]),
        ("Oliver Twist", "Charles Dickens", ["William Shakespeare", "Thomas Hardy", "Mark Twain"]),
        ("The Hobbit", "J. R. R. Tolkien", ["C. S. Lewis", "J. K. Rowling", "George R. R. Martin"]),
        ("The Chronicles of Narnia", "C. S. Lewis", ["J. R. R. Tolkien", "Lewis Carroll", "Roald Dahl"]),
        ("Alice's Adventures in Wonderland", "Lewis Carroll", ["J. M. Barrie", "Beatrix Potter", "A. A. Milne"]),
        ("Around the World in Eighty Days", "Jules Verne", ["H. G. Wells", "Arthur Conan Doyle", "Robert Louis Stevenson"]),
        ("The Little Prince", "Antoine de Saint-Exupéry", ["Victor Hugo", "Albert Camus", "Marcel Proust"]),
        ("The Jungle Book", "Rudyard Kipling", ["Daniel Defoe", "Jonathan Swift", "Jack London"])
    ]
    for idx, (book, author, distractors) in enumerate(books_authors):
        questions.append(make_q(
            f"qb-area12-00{7 + idx:02d}",
            f"Who is the author of the internationally celebrated classic literary work '{book}'?",
            author,
            distractors,
            sub, "World Literature", "Classic Literature", grade, 281, area,
            f"'{book}' was written by {author}.",
            "Easy", None, "mcq_single"
        ))

    # Page 282 - Shakespeare
    questions.append(make_q(
        "qb-area12-0015",
        "Which legendary English playwright and poet from Stratford-upon-Avon wrote 'Hamlet', 'Macbeth', and 'Romeo and Juliet'?",
        "William Shakespeare",
        ["Christopher Marlowe", "John Milton", "Ben Jonson"],
        sub, cat, "English Drama", grade, 282, area,
        "William Shakespeare wrote classic tragedies and comedies including Hamlet, Macbeth, and A Midsummer Night's Dream.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area12-0016",
        "In Shakespeare's comedy 'The Merchant of Venice', who is the ruthless moneylender demanding a pound of flesh?",
        "Shylock",
        ["Antonio", "Bassanio", "Iago"],
        sub, cat, "Shakespeare Characters", grade, 282, area,
        "Shylock is the central moneylender character in Shakespeare's The Merchant of Venice.",
        "Medium", None, "mcq_single"
    ))

    # Page 283 - J. K. Rowling
    questions.append(make_q(
        "qb-area12-0017",
        "How many main books comprise J. K. Rowling's original 'Harry Potter' fantasy novel series?",
        "Seven",
        ["Five", "Six", "Eight"],
        sub, cat, "Children's Fantasy", grade, 283, area,
        "The main Harry Potter book series consists of seven novels, from Philosopher's Stone to Deathly Hallows.",
        "Easy", None, "mcq_single"
    ))

    # Page 287 - George Orwell
    questions.append(make_q(
        "qb-area12-0018",
        "Which British author used a community of farm animals to construct a famous political allegory in the satirical novella 'Animal Farm'?",
        "George Orwell",
        ["Aldous Huxley", "H. G. Wells", "Ray Bradbury"],
        sub, cat, "Political Allegory", grade, 287, area,
        "George Orwell (pen name of Eric Arthur Blair) wrote Animal Farm and Nineteen Eighty-Four.",
        "Easy", None, "mcq_single"
    ))

    # Page 292 - Detectives & Pen names
    questions.append(make_q(
        "qb-area12-0019",
        "Which fictional Belgian private detective was created by mystery novelist Agatha Christie in classic whodunits like 'Murder on the Orient Express'?",
        "Hercule Poirot",
        ["Sherlock Holmes", "Miss Marple", "Inspector Clouseau"],
        sub, cat, "Mystery Fiction", grade, 292, area,
        "Agatha Christie created Hercule Poirot, who famously solves cases using his 'little grey cells'.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area12-0020",
        "What was the authentic real birth name of the classic American author widely celebrated under the pen name 'Mark Twain'?",
        "Samuel Langhorne Clemens",
        ["Eric Arthur Blair", "Charles Lutwidge Dodgson", "William Sydney Porter"],
        sub, cat, "Pen Names", grade, 292, area,
        "Mark Twain was the literary pseudonym adopted by Samuel Langhorne Clemens.",
        "Medium", None, "mcq_single"
    ))

    return questions
