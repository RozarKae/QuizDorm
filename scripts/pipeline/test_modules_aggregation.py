import sys
import os

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

modules = [
    (1, area01_india),
    (2, area02_world),
    (3, area03_polity),
    (4, area04_scitech),
    (5, area05_space),
    (6, area06_sports),
    (7, area07_awards),
    (8, area08_personalities),
    (9, area09_economy),
    (10, area10_environment),
    (11, area11_geography),
    (12, area12_books),
    (13, area13_arts),
    (14, area14_health),
    (15, area15_digital_ai),
    (16, area16_days),
    (17, area17_tamilnadu),
    (18, area18_regional)
]

total_q = 0
for area_num, mod in modules:
    qs = mod.get_questions()
    print(f"Area {area_num:02d}: {len(qs)} questions")
    total_q += len(qs)

print(f"\nTotal curated master questions so far: {total_q}")
