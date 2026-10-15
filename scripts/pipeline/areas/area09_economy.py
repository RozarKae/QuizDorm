from .common import make_q, pick_distractors

def get_questions():
    questions = []
    sub = "Economics"
    cat = "Indian & World Economy"
    grade = "Grade 6-8"
    area = 9

    # Page 185 - GDP
    questions.append(make_q(
        "qb-area09-0001",
        "What does the foundational economic abbreviation 'GDP' stand for?",
        "Gross Domestic Product",
        ["General Domestic Price", "Gross Development Plan", "Global Domestic Production"],
        sub, cat, "Macroeconomics", grade, 185, area,
        "GDP stands for Gross Domestic Product, representing the total monetary value of final goods and services produced within a country's borders.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area09-0002",
        "Which measure of gross domestic product adjusts output figures to account for price changes and inflation?",
        "Real GDP",
        ["Nominal GDP", "Market Price GDP", "Current Value GDP"],
        sub, cat, "Macroeconomics", grade, 186, area,
        "Real GDP measures economic output adjusted for inflation/deflation, allowing accurate year-on-year comparisons of physical production.",
        "Easy", None, "mcq_single"
    ))

    # Page 187 - Growth projections
    questions.append(make_q(
        "qb-area09-0003",
        "What real GDP growth rate did the World Bank project for India in FY2026–27 in its October 2026 update?",
        "7.1%",
        ["6.5%", "7.8%", "6.0%"],
        sub, cat, "Economic Growth", grade, 187, area,
        "The World Bank's October 2026 India Development Update projected India's FY2026–27 real GDP growth at 7.1%.",
        "Medium", None, "mcq_single"
    ))

    # Page 188 - RBI
    questions.append(make_q(
        "qb-area09-0004",
        "Who serves as the Governor of the Reserve Bank of India (RBI) leading the Monetary Policy Committee?",
        "Sanjay Malhotra",
        ["Shaktikanta Das", "Urjit Patel", "Raghuram Rajan"],
        sub, cat, "Banking & Central Banking", grade, 188, area,
        "Sanjay Malhotra serves as the Governor of the Reserve Bank of India.",
        "Easy", None, "mcq_single"
    ))

    # Page 189 - Repo rate
    questions.append(make_q(
        "qb-area09-0005",
        "To what policy rate did the RBI raise the benchmark repo rate on 7 October 2026, marking its first hike in nearly four years?",
        "5.50%",
        ["5.25%", "5.75%", "6.00%"],
        sub, cat, "Monetary Policy", grade, 189, area,
        "On 7 October 2026, the RBI raised the repo rate by 25 basis points from 5.25% to 5.50%.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area09-0006",
        "What policy stance did the RBI's Monetary Policy Committee adopt alongside the October 2026 repo rate hike?",
        "Calibrated tightening",
        ["Accommodative", "Neutral", "Withdrawal of accommodation"],
        sub, cat, "Monetary Policy", grade, 190, area,
        "The RBI shifted its monetary policy stance to 'calibrated tightening' to manage persistent inflationary pressures.",
        "Medium", None, "mcq_single"
    ))

    # Page 191 - Inflation
    questions.append(make_q(
        "qb-area09-0007",
        "Under its statutory monetary policy framework, what headline consumer price inflation (CPI) percentage does the RBI target?",
        "4%",
        ["2%", "5%", "6%"],
        sub, cat, "Inflation & Monetary Policy", grade, 191, area,
        "The RBI operates under a mandated inflation target of 4% within an allowable tolerance band of 2% to 6%.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area09-0008",
        "What is the statutory tolerance band around the RBI's 4% headline inflation target?",
        "2% to 6%",
        ["1% to 5%", "3% to 7%", "0% to 4%"],
        sub, cat, "Inflation & Monetary Policy", grade, 191, area,
        "The RBI's inflation target framework permits a +/- 2% tolerance band, spanning 2% to 6%.",
        "Easy", None, "mcq_single"
    ))

    # Page 192 - Union Budget
    questions.append(make_q(
        "qb-area09-0009",
        "What total central government expenditure was estimated in the Union Budget 2026–27 presented by Finance Minister Nirmala Sitharaman?",
        "₹53.47 lakh crore",
        ["₹48.20 lakh crore", "₹44.04 lakh crore", "₹17.15 lakh crore"],
        sub, cat, "Union Budget", grade, 193, area,
        "The Union Budget estimated total central government expenditure at approximately ₹53.47 lakh crore for 2026–27.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area09-0010",
        "What fiscal deficit target relative to GDP was established for India in the FY2026–27 Union Budget?",
        "4.3% of GDP",
        ["4.4% of GDP", "5.1% of GDP", "3.8% of GDP"],
        sub, cat, "Fiscal Policy", grade, 193, area,
        "India's fiscal deficit target for FY2026–27 was budgeted at 4.3% of GDP, continuing fiscal consolidation from 4.4% in 2025–26.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area09-0011",
        "How much effective capital expenditure (Capex) was allocated by the Union Government for FY2026–27?",
        "₹17.15 lakh crore",
        ["₹11.11 lakh crore", "₹22.50 lakh crore", "₹14.00 lakh crore"],
        sub, cat, "Capital Expenditure", grade, 194, area,
        "Effective capital expenditure for FY2026–27 was budgeted at ₹17.15 lakh crore, representing approximately 4.4% of GDP.",
        "Medium", None, "mcq_single"
    ))

    # Page 195 - Taxes & GST
    questions.append(make_q(
        "qb-area09-0012",
        "In which year was the Goods and Services Tax (GST) nationwide indirect tax regime implemented in India?",
        "2017",
        ["2014", "2016", "2019"],
        sub, cat, "Taxation", grade, 195, area,
        "GST was introduced in India on 1 July 2017 through the 101st Constitutional Amendment.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area09-0013",
        "Who serves as the official chairperson of the Goods and Services Tax (GST) Council in India?",
        "Union Finance Minister",
        ["Prime Minister of India", "RBI Governor", "NITI Aayog CEO"],
        sub, cat, "Taxation & Fiscal Bodies", grade, 195, area,
        "The GST Council is constitutionally chaired by the Union Finance Minister.",
        "Easy", None, "mcq_single"
    ))

    # Page 196 - Banking terms
    questions.append(make_q(
        "qb-area09-0014",
        "Which regulatory ratio mandates the percentage of deposits that commercial banks must maintain as cash reserves with the Reserve Bank of India?",
        "Cash Reserve Ratio (CRR)",
        ["Statutory Liquidity Ratio (SLR)", "Reverse Repo Rate", "Capital Adequacy Ratio"],
        sub, cat, "Banking Regulation", grade, 196, area,
        "CRR is the share of net demand and time liabilities that commercial banks must deposit with the RBI as cash reserves.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area09-0015",
        "Which RBI liquidity facility allows eligible banks to park overnight surplus funds with the central bank without requiring government collateral?",
        "Standing Deposit Facility (SDF)",
        ["Marginal Standing Facility (MSF)", "Bank Rate", "Cash Reserve Ratio"],
        sub, cat, "Monetary Instruments", grade, 197, area,
        "The Standing Deposit Facility (SDF) allows banks to park excess liquidity with the RBI without collateral.",
        "Medium", None, "mcq_single"
    ))

    # Page 200-201 - Stock Exchanges
    questions.append(make_q(
        "qb-area09-0016",
        "How many major constituent companies are tracked by the Bombay Stock Exchange (BSE) benchmark Sensex index?",
        "30",
        ["50", "100", "500"],
        sub, cat, "Financial Markets", grade, 200, area,
        "The BSE Sensex tracks 30 financially sound, actively traded companies.",
        "Easy", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area09-0017",
        "In which year was the Bombay Stock Exchange (BSE), recognized as Asia's oldest stock exchange, established?",
        "1875",
        ["1865", "1882", "1890"],
        sub, cat, "Financial History", grade, 201, area,
        "The BSE was founded in 1875 by Premchand Roychand as the Native Share & Stock Brokers' Association.",
        "Easy", None, "mcq_single"
    ))

    # Page 202 - Startups & Unicorns
    questions.append(make_q(
        "qb-area09-0018",
        "In venture capital and modern finance, what valuation threshold qualifies a privately held startup company as a 'Unicorn'?",
        "US$1 billion or more",
        ["US$100 million", "US$500 million", "US$10 billion"],
        sub, cat, "Startups & Venture Capital", grade, 202, area,
        "A unicorn is a privately held startup company with a market valuation reaching or exceeding US$1 billion.",
        "Easy", None, "mcq_single"
    ))

    # Page 205 - SME Fund & AI investment
    questions.append(make_q(
        "qb-area09-0019",
        "What corpus was approved by the Union Cabinet in October 2026 for the dedicated SME Growth Fund?",
        "₹10,000 crore",
        ["₹5,000 crore", "₹20,000 crore", "₹2,500 crore"],
        sub, cat, "Enterprise & Industry", grade, 205, area,
        "The Union Cabinet approved the ₹10,000 crore SME Growth Fund to foster expansion in small and medium enterprises.",
        "Medium", None, "mcq_single"
    ))
    questions.append(make_q(
        "qb-area09-0020",
        "According to the World Bank's October 2026 update, private AI investment in India expanded to how much in 2025?",
        "US$4.1 billion",
        ["US$1.2 billion", "US$2.5 billion", "US$8.0 billion"],
        sub, cat, "Digital Economy", grade, 205, area,
        "Private AI investment in India grew rapidly from US$1.2 billion in 2024 to US$4.1 billion in 2025.",
        "Medium", None, "mcq_single"
    ))

    return questions
