// 100 Comprehensive Questions for "Space Explorers"
// Subject: Physical Sciences
// Subtopics: Solar System (15), Planets (20), Moon (12), Stars (15), Constellations (10), Astronauts (12), ISRO & Missions (16)

module.exports = [
  // ==========================================
  // SECTION 1: SOLAR SYSTEM & THE SUN (Q1 to Q15)
  // ==========================================
  {
    title: "What is the primary nuclear fusion reaction mechanism powering the Sun's core at temperatures exceeding 15 million Kelvin?",
    difficulty: "Medium",
    options: [
      { text: "Proton-proton (p-p) chain reaction converting hydrogen into helium-4", isCorrect: true, explanation: "In stars of 1 solar mass like our Sun, the proton-proton chain dominates, releasing approximately 26.7 MeV of energy per synthesized helium-4 nucleus." },
      { text: "Carbon-Nitrogen-Oxygen (CNO) catalytic cycle exclusively", isCorrect: false, explanation: "The CNO cycle accounts for less than 1-2% of solar energy, dominating only in heavier stars exceeding 1.3 solar masses." },
      { text: "Triple-alpha process fusing helium into carbon", isCorrect: false, explanation: "The triple-alpha process occurs in aging red giant stars after core hydrogen is exhausted." },
      { text: "Nuclear fission of uranium and thorium isotopes", isCorrect: false, explanation: "Stars are powered by nuclear fusion of light nuclei, not nuclear fission." }
    ],
    explanation: "The proton-proton chain converts 600 million tons of hydrogen into helium every second in the Sun's core.",
    tags: ["space-explorers", "sun", "nuclear-fusion", "solar-system", "physical-sciences", "astrophysics"]
  },
  {
    title: "Which outermost, highly rarefied atmospheric layer of the Sun extends millions of kilometers into space and is visible during a total solar eclipse?",
    difficulty: "Easy",
    options: [
      { text: "Corona", isCorrect: true, explanation: "The solar corona has temperatures of 1 to 3 million Kelvin and appears as a pearly white halo around the eclipsed Sun." },
      { text: "Photosphere", isCorrect: false, explanation: "The photosphere is the visible 5,800 K surface of the Sun." },
      { text: "Chromosphere", isCorrect: false, explanation: "The chromosphere is a reddish layer of incandescent gas just above the photosphere." },
      { text: "Radiative zone", isCorrect: false, explanation: "The radiative zone lies deep in the interior between the core and convective zone." }
    ],
    explanation: "The corona's mysterious heating mechanism to millions of degrees is actively researched by observatories like Parker Solar Probe and Aditya-L1.",
    tags: ["space-explorers", "sun", "corona", "solar-system", "physical-sciences"]
  },
  {
    title: "What is the standard definition of an Astronomical Unit (AU)?",
    difficulty: "Easy",
    options: [
      { text: "The mean distance between the center of the Earth and the center of the Sun (~149.6 million km)", isCorrect: true, explanation: "One AU is formally defined as exactly 149,597,870,700 meters, serving as the baseline scale for measuring interplanetary distances." },
      { text: "The distance light travels through a vacuum in one Julian year", isCorrect: false, explanation: "That is the definition of a light-year (~9.46 trillion km)." },
      { text: "The distance from the Sun to the outer boundary of the Kuiper Belt", isCorrect: false, explanation: "The Kuiper Belt extends from roughly 30 to 55 AU." },
      { text: "The circumference of the Earth's orbit around the Sun", isCorrect: false, explanation: "One AU is the semi-major axis (radius), not orbital circumference." }
    ],
    explanation: "1 AU represents the mean Earth-Sun orbital separation.",
    tags: ["space-explorers", "astronomical-unit", "solar-system", "physical-sciences"]
  },
  {
    title: "Which Renaissance astronomer published 'De revolutionibus orbium coelestium' in 1543, formulating the comprehensive heliocentric model of the solar system?",
    difficulty: "Medium",
    options: [
      { text: "Nicolaus Copernicus", isCorrect: true, explanation: "Copernicus displaced the Ptolemaic Earth-centered model, demonstrating that planets revolve around the Sun." },
      { text: "Galileo Galilei", isCorrect: false, explanation: "Galileo provided telescopic observational proof for heliocentrism in 1610 with moons of Jupiter and phases of Venus." },
      { text: "Johannes Kepler", isCorrect: false, explanation: "Kepler formulated the three laws of planetary motion based on Tycho Brahe's observations." },
      { text: "Claudius Ptolemy", isCorrect: false, explanation: "Ptolemy promoted the ancient geocentric (Earth-centered) model in his Almagest." }
    ],
    explanation: "Copernican heliocentrism sparked the Scientific Revolution.",
    tags: ["space-explorers", "heliocentric", "astronomy", "history", "physical-sciences"]
  },
  {
    title: "What is the name of the vast, hypothetical spherical shell of icy planetesimals situated up to 100,000 AU from the Sun that serves as the reservoir for long-period comets?",
    difficulty: "Medium",
    options: [
      { text: "Oort Cloud", isCorrect: true, explanation: "Named after Dutch astronomer Jan Oort, this distant spherical reservoir contains billions of icy bodies that can be perturbed toward the inner solar system." },
      { text: "Kuiper Belt", isCorrect: false, explanation: "The Kuiper Belt is a donut-shaped circumstellar disc extending just beyond Neptune's orbit (30-55 AU)." },
      { text: "Asteroid Belt", isCorrect: false, explanation: "The Main Asteroid Belt is located between Mars and Jupiter." },
      { text: "Van Allen Belt", isCorrect: false, explanation: "The Van Allen belts are zones of energetic charged particles trapped by Earth's magnetosphere." }
    ],
    explanation: "The Oort Cloud defines the outer cosmological boundary of the Sun's gravitational dominance.",
    tags: ["space-explorers", "oort-cloud", "solar-system", "comets", "physical-sciences"]
  },
  {
    title: "Between which two planetary orbits is the Main Asteroid Belt located?",
    difficulty: "Easy",
    options: [
      { text: "Mars and Jupiter", isCorrect: true, explanation: "Gravitational perturbations from giant Jupiter prevented planetesimals in this region from accreting into a single planet." },
      { text: "Earth and Mars", isCorrect: false, explanation: "The region between Earth and Mars contains near-Earth asteroids, not the main belt." },
      { text: "Jupiter and Saturn", isCorrect: false, explanation: "The Trojans share Jupiter's orbit; the main belt lies inward." },
      { text: "Venus and Earth", isCorrect: false, explanation: "No asteroid belt exists between Venus and Earth." }
    ],
    explanation: "The asteroid belt contains millions of rocky bodies, including Ceres, Vesta, Pallas, and Hygiea.",
    tags: ["space-explorers", "asteroid-belt", "solar-system", "mars", "jupiter"]
  },
  {
    title: "What constitutes the solar wind that flows continuously outward from the Sun through the heliosphere?",
    difficulty: "Medium",
    options: [
      { text: "A supersonic stream of charged plasma, primarily ionized protons and electrons", isCorrect: true, explanation: "The solar wind escapes the Sun's corona at speeds between 300 and 800 km/s, carrying the interplanetary magnetic field." },
      { text: "A beam of high-frequency gamma rays and X-rays only", isCorrect: false, explanation: "Electromagnetic radiation travels at the speed of light, while the solar wind consists of massive particles." },
      { text: "Vaporized molecular water and carbon dioxide gases", isCorrect: false, explanation: "Coronal temperatures dissociate molecules into bare atomic nuclei and electrons." },
      { text: "Solid microscopic metal micrometeorites", isCorrect: false, explanation: "Micrometeorites are orbital debris, not the solar wind." }
    ],
    explanation: "Interactions between the solar wind and planetary magnetic fields generate planetary auroras (Northern/Southern lights).",
    tags: ["space-explorers", "solar-wind", "sun", "aurora", "physical-sciences"]
  },
  {
    title: "Why do sunspots appear dark on the Sun's bright photosphere?",
    difficulty: "Easy",
    options: [
      { text: "They are significantly cooler (~3,800 K) than the surrounding photosphere (~5,800 K) due to intense magnetic field inhibition of convection", isCorrect: true, explanation: "Strong magnetic flux ropes suppress normal convective heat transport from below, creating relatively cooler, darker regions." },
      { text: "They are physical deep holes that pierce through the Sun's outer crust", isCorrect: false, explanation: "The Sun has no solid crust; it is an entirely gaseous plasma sphere." },
      { text: "They are shadows cast by passing planets and large asteroids", isCorrect: false, explanation: "Planetary transits take hours, whereas sunspots rotate across days and weeks." },
      { text: "They are composed of solid carbon soot from burnt solar fuel", isCorrect: false, explanation: "Plasma temperatures instantly vaporize any solid carbon." }
    ],
    explanation: "Sunspots follow an 11-year solar activity cycle driven by the Sun's magnetic dynamo.",
    tags: ["space-explorers", "sunspots", "sun", "magnetism", "physical-sciences"]
  },
  {
    title: "Which celestial object was discovered by Giuseppe Piazzi in 1801 and was classified as a dwarf planet in 2006, being the largest body in the asteroid belt?",
    difficulty: "Easy",
    options: [
      { text: "Ceres", isCorrect: true, explanation: "Ceres makes up about one-third of the total mass of the asteroid belt and has a spherical shape maintained by hydrostatic equilibrium." },
      { text: "Vesta", isCorrect: false, explanation: "Vesta is the second-largest asteroid and is differentiated, but retains an oblate, non-spherical shape." },
      { text: "Pallas", isCorrect: false, explanation: "Pallas is the third-largest asteroid." },
      { text: "Eris", isCorrect: false, explanation: "Eris is located in the distant scattered disc beyond Neptune." }
    ],
    explanation: "NASA's Dawn spacecraft orbited and comprehensively mapped Ceres, revealing brine deposits in Occator Crater.",
    tags: ["space-explorers", "ceres", "dwarf-planet", "asteroid-belt", "solar-system"]
  },
  {
    title: "Which of the three criteria established by the International Astronomical Union (IAU) in 2006 did Pluto fail, leading to its reclassification as a dwarf planet?",
    difficulty: "Medium",
    options: [
      { text: "It has not cleared the neighborhood around its orbit of other debris", isCorrect: true, explanation: "Pluto shares its orbital zone in the Kuiper Belt with thousands of other trans-Neptunian objects and plutinos." },
      { text: "It is not in orbit around the Sun", isCorrect: false, explanation: "Pluto directly orbits the Sun with a 248-year period." },
      { text: "It lacks sufficient mass for self-gravity to achieve hydrostatic equilibrium (round shape)", isCorrect: false, explanation: "Pluto is round and spherical in hydrostatic equilibrium." },
      { text: "It does not have any natural satellites", isCorrect: false, explanation: "Pluto has five known moons, including Charon, Nix, and Hydra." }
    ],
    explanation: "An IAU planet must: 1. Orbit the Sun; 2. Have hydrostatic equilibrium (round); 3. Clear its orbital neighborhood.",
    tags: ["space-explorers", "pluto", "dwarf-planet", "iau", "solar-system"]
  },
  {
    title: "In which internal layer of the Sun is heat transferred primarily by bulk circulatory movements of hot plasma rising and cooler plasma sinking?",
    difficulty: "Medium",
    options: [
      { text: "Convection Zone", isCorrect: true, explanation: "Spanning the outer 30% of the solar interior, buoyant plasma rises to the surface, cools, and sinks in giant convective cells." },
      { text: "Radiative Zone", isCorrect: false, explanation: "In the radiative zone, energy travels outward via photon absorption and emission over hundreds of thousands of years." },
      { text: "Nuclear Core", isCorrect: false, explanation: "The core is where fusion occurs, not where convective circulation happens." },
      { text: "Corona", isCorrect: false, explanation: "The corona is the external atmosphere, not an internal solar layer." }
    ],
    explanation: "Convection creates the granulated texture visible on the solar photosphere.",
    tags: ["space-explorers", "sun", "solar-physics", "convection", "physical-sciences"]
  },
  {
    title: "Why does the ion (gas) tail of a comet always point directly away from the Sun, regardless of the comet's direction of motion?",
    difficulty: "Easy",
    options: [
      { text: "Solar wind particles and solar radiation pressure exert outward forces on ionized gases", isCorrect: true, explanation: "The solar wind blows ionized molecules straight back along magnetic field lines directly away from the Sun." },
      { text: "The comet's gravitational field repels all gases toward outer space", isCorrect: false, explanation: "Gravity is strictly attractive, never repulsive." },
      { text: "Centrifugal force flings gases backwards along the orbital trajectory", isCorrect: false, explanation: "The dust tail curves with the orbit, but the ion tail points strictly anti-solar due to solar wind." },
      { text: "Earth's magnetic field pulls comet tails towards our planet", isCorrect: false, explanation: "Earth has no noticeable effect on distant cometary tails." }
    ],
    explanation: "Comets typically display two tails: a white curved dust tail and a straight bluish ion tail pointing away from the Sun.",
    tags: ["space-explorers", "comets", "solar-wind", "solar-system", "physical-sciences"]
  },
  {
    title: "What is the common center of mass around which two or more celestial bodies in a gravitational system orbit called?",
    difficulty: "Medium",
    options: [
      { text: "Barycenter", isCorrect: true, explanation: "The barycenter of the solar system is the combined center of mass of the Sun and all planets, often located just outside the Sun's surface." },
      { text: "Aphelion", isCorrect: false, explanation: "Aphelion is the orbital point furthest from the Sun." },
      { text: "Perihelion", isCorrect: false, explanation: "Perihelion is the orbital point closest to the Sun." },
      { text: "Lagrange Point", isCorrect: false, explanation: "Lagrange points are orbital equilibrium positions where gravitational forces balance centrifugal forces." }
    ],
    explanation: "Because Jupiter is massive (~1/1000th of solar mass), the solar system barycenter sits slightly above the solar photosphere.",
    tags: ["space-explorers", "barycenter", "gravitation", "solar-system", "physical-sciences"]
  },
  {
    title: "A massive, sudden eruption of magnetic energy and high-energy particles from the solar corona into interplanetary space is known as:",
    difficulty: "Easy",
    options: [
      { text: "Coronal Mass Ejection (CME)", isCorrect: true, explanation: "CMEs can blast billions of tons of magnetized plasma toward Earth, inducing severe geomagnetic storms and grid disruptions." },
      { text: "Supernova explosion", isCorrect: false, explanation: "A supernova is the catastrophic death of an entire massive star, not a routine solar outburst." },
      { text: "Photospheric condensation", isCorrect: false, explanation: "Gases expand and ionize, they do not condense during eruptions." },
      { text: "Planetary accretion", isCorrect: false, explanation: "Accretion is the gravitational accumulation of dust into planets." }
    ],
    explanation: "CMEs take 15 to 72 hours to traverse the 1 AU distance to Earth.",
    tags: ["space-explorers", "cme", "solar-flare", "sun", "physical-sciences"]
  },
  {
    title: "Which trans-Neptunian dwarf planet discovered in 2005 is nearly identical in size to Pluto but substantially more massive, prompting the IAU definition of a planet?",
    difficulty: "Hard",
    options: [
      { text: "Eris", isCorrect: true, explanation: "Discovered by Mike Brown's team at Palomar Observatory, Eris has a moon named Dysnomia and is ~27% more massive than Pluto." },
      { text: "Sedna", isCorrect: false, explanation: "Sedna is an extreme trans-Neptunian object on a highly eccentric 11,400-year orbit." },
      { text: "Haumea", isCorrect: false, explanation: "Haumea is an elongated, rapidly rotating dwarf planet with rings." },
      { text: "Makemake", isCorrect: false, explanation: "Makemake is a classical Kuiper Belt object lacking Eris's high mass." }
    ],
    explanation: "The discovery of Eris in 2005 forced astronomers to formally define the term 'planet'.",
    tags: ["space-explorers", "eris", "dwarf-planet", "kuiper-belt", "solar-system"]
  },

  // ==========================================
  // SECTION 2: PLANETS & PLANETARY SCIENCE (Q16 to Q35)
  // ==========================================
  {
    title: "Which fundamental property distinguishes terrestrial inner planets (Mercury, Venus, Earth, Mars) from Jovian outer planets?",
    difficulty: "Easy",
    options: [
      { text: "Terrestrial planets possess solid rocky surfaces, high mean densities, and metallic cores", isCorrect: true, explanation: "Terrestrial planets formed inside the frost line where only metals and silicates could condense." },
      { text: "Terrestrial planets have dozens of moons and extensive icy ring systems", isCorrect: false, explanation: "Terrestrial planets have few or no moons (Earth 1, Mars 2, Venus/Mercury 0) and zero rings." },
      { text: "Terrestrial planets are composed entirely of hydrogen and helium gases", isCorrect: false, explanation: "Gas giants (Jupiter, Saturn) are primarily hydrogen and helium." },
      { text: "Terrestrial planets are vastly larger in physical volume than Jovian planets", isCorrect: false, explanation: "Jovian planets are massive gas/ice giants." }
    ],
    explanation: "The condensation frost line partitioned planetary accretion into rocky inner worlds and volatile-rich gas giants.",
    tags: ["space-explorers", "planets", "terrestrial", "jovian", "solar-system"]
  },
  {
    title: "Why is Venus the hottest planet in our solar system (mean surface temperature ~465°C), even hotter than Mercury which is closer to the Sun?",
    difficulty: "Easy",
    options: [
      { text: "A runaway greenhouse effect caused by a dense atmosphere of 96.5% carbon dioxide and thick sulfuric acid clouds", isCorrect: true, explanation: "The atmospheric pressure at Venus's surface is 92 times Earth's, trapping infrared thermal radiation completely." },
      { text: "Intense radioactive decay occurring inside its core that melts the planet's crust", isCorrect: false, explanation: "Internal radioactive heating is minor compared to incoming solar radiation trapped by the greenhouse effect." },
      { text: "Continuous surface fires burning across oceans of liquid petroleum", isCorrect: false, explanation: "Venus has no liquid oceans and no free atmospheric oxygen to support combustion." },
      { text: "Frictional heating generated by colliding moons", isCorrect: false, explanation: "Venus has zero moons." }
    ],
    explanation: "Venus illustrates the ultimate extreme of an unchecked runaway greenhouse effect.",
    tags: ["space-explorers", "venus", "greenhouse-effect", "planets", "atmosphere"]
  },
  {
    title: "Which planet is home to Olympus Mons, the largest volcano and shield volcano structure in the entire solar system?",
    difficulty: "Easy",
    options: [
      { text: "Mars", isCorrect: true, explanation: "Olympus Mons towers ~21.9 km above surrounding Martian plains, nearly three times the height of Mt. Everest, enabled by stationary crust over a mantle hotspot." },
      { text: "Venus", isCorrect: false, explanation: "Venus has many volcanoes like Maat Mons, but none rival Olympus Mons." },
      { text: "Mercury", isCorrect: false, explanation: "Mercury is covered in craters and lobate scarps, lacking giant shield volcanoes." },
      { text: "Jupiter", isCorrect: false, explanation: "Jupiter has no solid surface." }
    ],
    explanation: "The absence of active plate tectonics on Mars allowed magma to pile up over a single hotspot for hundreds of millions of years.",
    tags: ["space-explorers", "mars", "olympus-mons", "volcano", "planets"]
  },
  {
    title: "Which planet exhibits retrograde rotation, meaning it rotates clockwise on its axis from east to west, causing the Sun to rise in the west?",
    difficulty: "Medium",
    options: [
      { text: "Venus", isCorrect: true, explanation: "Venus has a retrograde axial rotation period of 243 Earth days, longer than its orbital year of 225 Earth days." },
      { text: "Mars", isCorrect: false, explanation: "Mars rotates prograde with a day length of 24.6 hours, very similar to Earth." },
      { text: "Mercury", isCorrect: false, explanation: "Mercury rotates prograde in a 3:2 spin-orbit resonance." },
      { text: "Jupiter", isCorrect: false, explanation: "Jupiter rotates prograde rapidly in just under 10 hours." }
    ],
    explanation: "A massive ancient planetary collision is hypothesized to have reversed Venus's original spin.",
    tags: ["space-explorers", "venus", "retrograde-rotation", "planets", "solar-system"]
  },
  {
    title: "What is the Great Red Spot observed in Jupiter's southern hemisphere?",
    difficulty: "Easy",
    options: [
      { text: "A massive, persistent anticyclonic high-pressure storm larger than Earth that has raged for centuries", isCorrect: true, explanation: "The Great Red Spot has counter-clockwise winds exceeding 430 km/h and has been continuously tracked for at least 150 years." },
      { text: "A giant lake of molten liquid iron situated on Jupiter's solid crust", isCorrect: false, explanation: "Jupiter is a gas giant with no solid crust." },
      { text: "A shadow cast continuously by its volcanic moon Io", isCorrect: false, explanation: "Moon shadows are small, black, and transit across the face in hours." },
      { text: "A hole in Jupiter's atmosphere exposing its radioactive core", isCorrect: false, explanation: "It is an elevated storm cloud system rising 8 km above surrounding clouds." }
    ],
    explanation: "Jupiter's internal heat engine and rapid 9.9-hour rotation fuel powerful zonal jet streams that sustain the storm.",
    tags: ["space-explorers", "jupiter", "great-red-spot", "planets", "astronomy"]
  },
  {
    title: "Which Galilean satellite of Jupiter is the most volcanically active planetary body in the solar system, with over 400 erupting volcanoes?",
    difficulty: "Medium",
    options: [
      { text: "Io", isCorrect: true, explanation: "Intense gravitational tidal flexing between Jupiter, Europa, and Ganymede continuously generates massive internal friction and heat, driving sulfur volcanism." },
      { text: "Europa", isCorrect: false, explanation: "Europa is an ice-covered moon with a subsurface water ocean." },
      { text: "Ganymede", isCorrect: false, explanation: "Ganymede is the largest moon, composed of silicate rock and water ice." },
      { text: "Callisto", isCorrect: false, explanation: "Callisto is a heavily cratered, geologically inactive ice-rock moon." }
    ],
    explanation: "Io's Laplace orbital resonance pumps its orbital eccentricity, sustaining extreme tidal heating.",
    tags: ["space-explorers", "io", "jupiter", "galilean-moons", "volcanoes"]
  },
  {
    title: "Why is Jupiter's moon Europa considered one of the highest-priority astrobiological targets in the solar system for searching for extraterrestrial life?",
    difficulty: "Medium",
    options: [
      { text: "It harbors a global saltwater ocean beneath its outer icy crust containing twice as much water as all of Earth's oceans combined", isCorrect: true, explanation: "Tidal heating maintains liquid water in direct contact with a silicate seafloor, potentially providing hydrothermal vents and chemical energy." },
      { text: "It has a breathable nitrogen-oxygen atmosphere identical to Earth's sea level", isCorrect: false, explanation: "Europa has only a tenuous, virtually nonexistent oxygen exosphere." },
      { text: "Its surface is covered in lush photosynthetic plant life", isCorrect: false, explanation: "Europa's surface temperature is -160°C and bathed in Jupiter's radiation belts." },
      { text: "It orbits inside the habitable zone of our Sun at 1 AU", isCorrect: false, explanation: "Europa orbits at ~5.2 AU from the Sun, far beyond the traditional solar habitable zone." }
    ],
    explanation: "NASA's Europa Clipper mission launched in 2024 to investigate the habitability of Europa's subsurface ocean.",
    tags: ["space-explorers", "europa", "jupiter", "astrobiology", "ocean-worlds"]
  },
  {
    title: "Which is the largest natural satellite (moon) in the entire solar system, being even larger than the planet Mercury?",
    difficulty: "Easy",
    options: [
      { text: "Ganymede", isCorrect: true, explanation: "Ganymede has a diameter of 5,268 km (vs Mercury's 4,879 km) and is the only moon known to generate its own internal magnetic field." },
      { text: "Titan", isCorrect: false, explanation: "Titan is the second largest moon (5,150 km diameter), orbiting Saturn." },
      { text: "Earth's Moon", isCorrect: false, explanation: "The Moon is the fifth largest moon (3,474 km diameter)." },
      { text: "Triton", isCorrect: false, explanation: "Triton is Neptune's largest moon (2,706 km diameter)." }
    ],
    explanation: "Ganymede possesses a liquid iron-rich core that powers an active magnetosphere.",
    tags: ["space-explorers", "ganymede", "jupiter", "moons", "solar-system"]
  },
  {
    title: "What constitutes the primary composition of Saturn's extensive and prominent planetary ring system?",
    difficulty: "Easy",
    options: [
      { text: "Billions of individual chunks of over 99% pure water ice, ranging from micrometers to meters in size", isCorrect: true, explanation: "Saturn's rings are remarkably bright due to high albedo water ice, with minor contaminants of silicate dust and tholins." },
      { text: "Solid metallic sheets of pure polished titanium", isCorrect: false, explanation: "Rings are dynamic collections of independent particles, not solid structures." },
      { text: "Vaporized boiling clouds of hydrogen and helium gas", isCorrect: false, explanation: "Gas cannot maintain ring structure in a vacuum without dispersing." },
      { text: "Dense swarms of radioactive plutonium asteroids", isCorrect: false, explanation: "The rings are non-radioactive pristine water ice." }
    ],
    explanation: "Although spanning up to 282,000 km in width, Saturn's main rings are extraordinarily thin, averaging only 10 to 30 meters in thickness.",
    tags: ["space-explorers", "saturn", "planetary-rings", "ice", "solar-system"]
  },
  {
    title: "Which unique moon of Saturn has a dense nitrogen-rich atmosphere and surface lakes, rivers, and rain of liquid methane and ethane?",
    difficulty: "Medium",
    options: [
      { text: "Titan", isCorrect: true, explanation: "Titan has a surface atmospheric pressure 1.5 times that of Earth and a complex methane hydrological cycle explored by the Cassini-Huygens probe." },
      { text: "Enceladus", isCorrect: false, explanation: "Enceladus is an icy moon with cryovolcanoes, not a dense nitrogen atmosphere." },
      { text: "Mimas", isCorrect: false, explanation: "Mimas is famous for the giant Herschel Crater, resembling the Death Star." },
      { text: "Iapetus", isCorrect: false, explanation: "Iapetus has a two-toned dark/light coloration and an equatorial ridge." }
    ],
    explanation: "Titan is the only body in the solar system besides Earth with stable bodies of surface liquid.",
    tags: ["space-explorers", "titan", "saturn", "methane-lakes", "atmosphere"]
  },
  {
    title: "Which small icy moon of Saturn shoots plumes of water vapor, ice crystals, and organic molecules into space from 'tiger stripe' fractures at its south pole?",
    difficulty: "Medium",
    options: [
      { text: "Enceladus", isCorrect: true, explanation: "The Cassini spacecraft flew through these geyser plumes, sampling simple organic compounds from a global subsurface ocean beneath the ice." },
      { text: "Dione", isCorrect: false, explanation: "Dione has bright ice cliffs but no active cryovolcanic plumes." },
      { text: "Rhea", isCorrect: false, explanation: "Rhea is a heavily cratered icy satellite without cryovolcanic geysers." },
      { text: "Tethys", isCorrect: false, explanation: "Tethys is notable for the Ithaca Chasma rift, not active cryovolcanoes." }
    ],
    explanation: "Cryovolcanic plumes from Enceladus continuously replenish Saturn's outer E-ring.",
    tags: ["space-explorers", "enceladus", "saturn", "cryovolcanism", "ocean-worlds"]
  },
  {
    title: "Why does the ice giant Uranus appear to 'roll around the Sun' on its side throughout its 84-year orbit?",
    difficulty: "Medium",
    options: [
      { text: "It has an extreme axial tilt of approximately 97.8 degrees, likely caused by a colossal ancient planetary collision", isCorrect: true, explanation: "Uranus's rotational axis points almost directly into the plane of the ecliptic, creating 42-year continuous periods of sunlight and darkness at each pole." },
      { text: "It was captured from interstellar space without any rotational angular momentum", isCorrect: false, explanation: "Uranus formed in the solar nebula and has substantial rotational momentum." },
      { text: "Jupiter's magnetic field flipped the planet upside down during a close passage", isCorrect: false, explanation: "Magnetic fields cannot mechanically torque an entire planet's mass to flip 98 degrees." },
      { text: "Its rings are so heavy that they pulled the planet's equator into a vertical plane", isCorrect: false, explanation: "Rings orbit around the equator and have negligible mass compared to the planet." }
    ],
    explanation: "Simulations suggest an Earth-sized protoplanet collided with young Uranus, tilting its rotation axis.",
    tags: ["space-explorers", "uranus", "axial-tilt", "ice-giants", "solar-system"]
  },
  {
    title: "What chemical compound in the upper atmospheres of Uranus and Neptune absorbs red light, giving both ice giants their distinctive cyan and deep blue hues?",
    difficulty: "Easy",
    options: [
      { text: "Methane (CH₄)", isCorrect: true, explanation: "Atmospheric methane absorbs red and infrared wavelengths while scattering blue wavelengths back into space." },
      { text: "Liquid water (H₂O)", isCorrect: false, explanation: "Water vapor condenses deep below the visible upper cloud deck." },
      { text: "Sulfur dioxide (SO₂)", isCorrect: false, explanation: "Sulfur compounds yield yellow-orange hues, like those on Io or Venus." },
      { text: "Nitrogen dioxide (NO₂)", isCorrect: false, explanation: "Nitrogen dioxide produces reddish-brown hazes, not bright blue." }
    ],
    explanation: "Neptune has a deeper, more vivid azure color than Uranus, likely due to an additional unidentified atmospheric component or thinner haze layer.",
    tags: ["space-explorers", "neptune", "uranus", "methane", "atmosphere"]
  },
  {
    title: "Which planet holds the record for the fastest measured supersonic atmospheric wind speeds in the solar system, exceeding 2,100 km/h?",
    difficulty: "Medium",
    options: [
      { text: "Neptune", isCorrect: true, explanation: "Despite being farthest from the Sun with minimal solar irradiance, Neptune's deep internal heat engine drives supersonic retrograde equatorial winds." },
      { text: "Jupiter", isCorrect: false, explanation: "Jupiter's winds reach ~500 km/h, far slower than Neptune's." },
      { text: "Mars", isCorrect: false, explanation: "Martian winds reach 100-200 km/h in dust storms, but low atmospheric density produces minimal dynamic force." },
      { text: "Mercury", isCorrect: false, explanation: "Mercury has an exosphere and no sustained winds." }
    ],
    explanation: "Low internal turbulent friction allows Neptune's winds to accelerate to speeds exceeding Mach 1.5.",
    tags: ["space-explorers", "neptune", "wind-speeds", "atmosphere", "ice-giants"]
  },
  {
    title: "Which large satellite of Neptune is the only major moon in the solar system that orbits in a retrograde direction (opposite to its planet's rotation)?",
    difficulty: "Medium",
    options: [
      { text: "Triton", isCorrect: true, explanation: "Triton's retrograde orbit, high density, and icy composition indicate it was a dwarf planet captured by Neptune from the Kuiper Belt." },
      { text: "Proteus", isCorrect: false, explanation: "Proteus is an irregularly shaped inner prograde moon." },
      { text: "Nereid", isCorrect: false, explanation: "Nereid orbits prograde on a highly eccentric orbit." },
      { text: "Charon", isCorrect: false, explanation: "Charon orbits Pluto, not Neptune." }
    ],
    explanation: "Tidal deceleration is gradually lowering Triton's orbit; it will cross Neptune's Roche limit and break apart in ~3.6 billion years.",
    tags: ["space-explorers", "triton", "neptune", "retrograde-orbit", "kuiper-belt"]
  },
  {
    title: "Which planet has the shortest orbital period around the Sun, completing one year in just 88 Earth days?",
    difficulty: "Easy",
    options: [
      { text: "Mercury", isCorrect: true, explanation: "Per Kepler's Third Law, Mercury's proximity to the Sun (~0.39 AU) gives it the fastest orbital velocity (~47.4 km/s)." },
      { text: "Venus", isCorrect: false, explanation: "Venus orbits the Sun in 225 Earth days." },
      { text: "Mars", isCorrect: false, explanation: "Mars takes 687 Earth days to complete an orbit." },
      { text: "Earth", isCorrect: false, explanation: "Earth orbits in 365.25 days." }
    ],
    explanation: "Mercury experiences extreme surface temperatures, ranging from -180°C during night to +430°C during day.",
    tags: ["space-explorers", "mercury", "orbital-period", "planets", "solar-system"]
  },
  {
    title: "What is the name of the colossal canyon system on Mars that spans over 4,000 km in length, reaching depths of up to 7 km?",
    difficulty: "Medium",
    options: [
      { text: "Valles Marineris", isCorrect: true, explanation: "Named after the Mariner 9 orbiter that discovered it in 1971, Valles Marineris is ten times longer and four times deeper than Earth's Grand Canyon." },
      { text: "Mariana Trench", isCorrect: false, explanation: "Mariana Trench is the deepest oceanic trench on Earth." },
      { text: "Caloris Basin", isCorrect: false, explanation: "Caloris Basin is a massive impact crater on Mercury." },
      { text: "Hell's Canyon", isCorrect: false, explanation: "Hells Canyon is a canyon in North America on Earth." }
    ],
    explanation: "Valles Marineris is a massive tectonic fracture formed by the swelling of the adjacent Tharsis volcanic plateau.",
    tags: ["space-explorers", "mars", "valles-marineris", "canyons", "geology"]
  },
  {
    title: "What causes the characteristic reddish-orange appearance of the Martian surface?",
    difficulty: "Easy",
    options: [
      { text: "Oxidized iron minerals (iron oxide / hematite 'rust') coating the regolith and rocks", isCorrect: true, explanation: "Martian crustal rocks are rich in iron that oxidized over billions of years, creating rust particles that airborne winds spread globally." },
      { text: "Active lava flows covering the entire planetary surface", isCorrect: false, explanation: "Mars is currently volcanically dormant with no active lava flows." },
      { text: "Atmospheric copper and zinc crystals reflecting sunlight", isCorrect: false, explanation: "Martian atmospheric dust is silicates and iron oxide, not copper." },
      { text: "Extensive fields of red Martian vegetation", isCorrect: false, explanation: "No vegetation exists on Mars." }
    ],
    explanation: "Fine ferric oxide dust particles suspended in Mars's atmosphere scatter light, giving the Martian sky a butterscotch-pink hue.",
    tags: ["space-explorers", "mars", "iron-oxide", "geology", "planets"]
  },
  {
    title: "Which NASA rover landed inside Jezero Crater on Mars in February 2021 to search for signs of ancient microbial life and deploy the Ingenuity helicopter?",
    difficulty: "Medium",
    options: [
      { text: "Perseverance", isCorrect: true, explanation: "Perseverance carries the MOXIE oxygen generation experiment, the SuperCam, and collected Martian rock core samples for future Earth return." },
      { text: "Curiosity", isCorrect: false, explanation: "Curiosity landed in Gale Crater in August 2012." },
      { text: "Spirit", isCorrect: false, explanation: "Spirit landed in Gusev Crater in January 2004." },
      { text: "Opportunity", isCorrect: false, explanation: "Opportunity landed in Meridiani Planum in 2004 and operated for 14 years." }
    ],
    explanation: "Ingenuity completed 72 powered flights in the thin Martian atmosphere, proving aerodynamic flight on another planet.",
    tags: ["space-explorers", "perseverance", "mars", "ingenuity", "space-missions"]
  },
  {
    title: "Which two planets in our solar system have zero natural satellites (no moons)?",
    difficulty: "Easy",
    options: [
      { text: "Mercury and Venus", isCorrect: true, explanation: "Proximity to the Sun's strong gravitational tidal forces and lack of large collisional captures left Mercury and Venus without moons." },
      { text: "Venus and Mars", isCorrect: false, explanation: "Mars has two captured asteroid moons: Phobos and Deimos." },
      { text: "Mercury and Mars", isCorrect: false, explanation: "Mars has two moons." },
      { text: "Uranus and Neptune", isCorrect: false, explanation: "Uranus has 28 known moons and Neptune has 16." }
    ],
    explanation: "Mercury and Venus are the only moonless planets in the solar system.",
    tags: ["space-explorers", "mercury", "venus", "moons", "planets"]
  },

  // ==========================================
  // SECTION 3: THE MOON (Q36 to Q47)
  // ==========================================
  {
    title: "Which widely accepted scientific hypothesis explains the formation of Earth's Moon approximately 4.5 billion years ago?",
    difficulty: "Medium",
    options: [
      { text: "The Giant Impact Hypothesis (Theia collision)", isCorrect: true, explanation: "A Mars-sized protoplanet dubbed Theia struck the proto-Earth in an oblique collision, ejecting a debris disk that rapidly accreted to form the Moon." },
      { text: "Fission hypothesis (Earth spinning so fast it split into two)", isCorrect: false, explanation: "George Darwin's fission theory fails to account for the angular momentum and compositional differences." },
      { text: "Gravitational capture of a rogue planet from the Kuiper Belt", isCorrect: false, explanation: "Capture into a nearly circular orbit of a body as large as the Moon is dynamically virtually impossible without huge energy dissipation." },
      { text: "Co-accretion from separate solar nebula disks at identical times", isCorrect: false, explanation: "Co-accretion cannot explain why the Moon has a tiny iron core compared to Earth." }
    ],
    explanation: "Isotopic similarity between Earth and lunar rock samples returned by Apollo strongly supports the Giant Impact model.",
    tags: ["space-explorers", "moon", "giant-impact", "theia", "planetary-formation"]
  },
  {
    title: "Why does the Moon always show approximately the same side (near side) towards Earth at all times?",
    difficulty: "Easy",
    options: [
      { text: "It is tidally locked in synchronous rotation, with its orbital period exactly matching its rotational period", isCorrect: true, explanation: "Gravitational tidal friction from Earth gradually slowed the Moon's rotation until one rotation on its axis took exactly 27.3 days (one orbit)." },
      { text: "The Moon does not rotate on its axis at all", isCorrect: false, explanation: "If the Moon did not rotate, we would see all sides of it as it orbited Earth." },
      { text: "Earth's magnetic field physically glues the Moon's heavy magnetic pole toward us", isCorrect: false, explanation: "The Moon has no global dipole magnetic field." },
      { text: "Solar wind pushes against the Moon's far side, freezing its movement", isCorrect: false, explanation: "Solar wind shines equally on all sides of the Moon over a lunar day." }
    ],
    explanation: "Synchronous rotation means the lunar 'day' and lunar 'year' are identical in length.",
    tags: ["space-explorers", "moon", "tidal-locking", "synchronous-rotation", "celestial-mechanics"]
  },
  {
    title: "What are the dark, smooth, vast plains visible on the lunar surface known as?",
    difficulty: "Easy",
    options: [
      { text: "Lunar Maria (Seas)", isCorrect: true, explanation: "Early observers thought they were bodies of water; in reality, they are vast flood basalt plains formed by ancient volcanic eruptions filling large impact basins." },
      { text: "Lunar Highlands (Terrae)", isCorrect: false, explanation: "The highlands are the rugged, heavily cratered, light-colored anorthosite regions." },
      { text: "Regolith oceans", isCorrect: false, explanation: "Regolith is the surface dust covering both maria and highlands." },
      { text: "Rilles", isCorrect: false, explanation: "Rilles are narrow trench-like depressions resembling dry riverbeds." }
    ],
    explanation: "Lunar maria cover ~16% of the lunar surface, concentrated on the Earth-facing near side.",
    tags: ["space-explorers", "moon", "maria", "basalt", "geology"]
  },
  {
    title: "What is the fine, abrasive, electrostatic powder of fragmented rock and impact-glass that coats the Moon's surface called?",
    difficulty: "Medium",
    options: [
      { text: "Lunar Regolith", isCorrect: true, explanation: "Billions of years of micrometeorite bombardment pulverized lunar surface rocks into sharp, powdery particles called regolith." },
      { text: "Silt", isCorrect: false, explanation: "Silt is a water-deposited terrestrial sediment; the Moon has no liquid water." },
      { text: "Permafrost", isCorrect: false, explanation: "Permafrost is water-ice cemented soil found on Earth or Mars." },
      { text: "Scoria", isCorrect: false, explanation: "Scoria is vesicular volcanic rock, not powdery powdered dust." }
    ],
    explanation: "Lunar regolith was a major hazard during Apollo missions, abrading space suits and causing respiratory irritation.",
    tags: ["space-explorers", "lunar-regolith", "moon", "geology", "apollo"]
  },
  {
    title: "What astronomical term denotes the straight-line gravitational alignment of three celestial bodies, such as the Sun, Earth, and Moon during an eclipse?",
    difficulty: "Hard",
    options: [
      { text: "Syzygy", isCorrect: true, explanation: "Syzygy occurs during new moon and full moon phases, producing spring tides and solar or lunar eclipses when planes align." },
      { text: "Quadrature", isCorrect: false, explanation: "Quadrature occurs when the Sun, Earth, and Moon form a right angle (90°), creating neap tides." },
      { text: "Periastron", isCorrect: false, explanation: "Periastron is the point of closest approach in a binary star system." },
      { text: "Apogee", isCorrect: false, explanation: "Apogee is the point in the Moon's orbit farthest from Earth." }
    ],
    explanation: "Syzygy is derived from the Greek word for 'yoked together'.",
    tags: ["space-explorers", "syzygy", "eclipses", "moon", "celestial-mechanics"]
  },
  {
    title: "During which type of eclipse does the Moon pass directly between the Sun and Earth, completely or partially blocking the solar disc?",
    difficulty: "Easy",
    options: [
      { text: "Solar Eclipse", isCorrect: true, explanation: "A solar eclipse occurs only at the new moon phase when the Moon's shadow falls onto Earth's surface." },
      { text: "Lunar Eclipse", isCorrect: false, explanation: "A lunar eclipse occurs when Earth stands between the Sun and Moon, casting Earth's shadow on the full moon." },
      { text: "Planetary Transit", isCorrect: false, explanation: "A transit involves an inferior planet (Mercury or Venus) passing across the Sun's face." },
      { text: "Stellar Occultation", isCorrect: false, explanation: "Occultation occurs when the Moon passes in front of a background star." }
    ],
    explanation: "Because the Moon's orbit is tilted 5.1 degrees relative to the ecliptic, eclipses occur only when the Moon crosses the orbital nodes.",
    tags: ["space-explorers", "solar-eclipse", "moon", "sun", "eclipses"]
  },
  {
    title: "Why does the Moon take on a coppery, blood-red coloration during a total lunar eclipse?",
    difficulty: "Medium",
    options: [
      { text: "Rayleigh scattering in Earth's atmosphere filters out blue wavelengths and bends red sunlight into Earth's umbral shadow", isCorrect: true, explanation: "The same atmospheric physics making sunrises and sunsets red refracts red light into the shadow cone, illuminating the eclipsed Moon." },
      { text: "The Moon's volcanic rocks heat up to red hot incandescence during totality", isCorrect: false, explanation: "Lunar surface temperatures plummet rapidly during an eclipse; there is no volcanic heating." },
      { text: "Solar flares directly scorch the lunar soil", isCorrect: false, explanation: "Earth completely blocks direct solar illumination during a lunar eclipse." },
      { text: "Infrared radiation emitted from Mars reflects off the Moon", isCorrect: false, explanation: "Mars is far too dim to cast noticeable light on the Moon." }
    ],
    explanation: "A total lunar eclipse effectively projects all the sunrises and sunsets on Earth onto the Moon simultaneously.",
    tags: ["space-explorers", "lunar-eclipse", "rayleigh-scattering", "moon", "optics"]
  },
  {
    title: "What is the surface gravitational acceleration on the Moon compared to that on Earth?",
    difficulty: "Easy",
    options: [
      { text: "Approximately 1.62 m/s² (about 1/6th or 16.6% of Earth's gravity)", isCorrect: true, explanation: "A 60 kg person on Earth weighs about 588 Newtons, but weighs only about 98 Newtons on the Moon." },
      { text: "Exactly equal to Earth's gravity (9.8 m/s²)", isCorrect: false, explanation: "The Moon has only 1/81st of Earth's mass, generating much weaker surface gravity." },
      { text: "Approximately 3.7 m/s² (about 1/3rd of Earth's gravity)", isCorrect: false, explanation: "3.7 m/s² is the surface gravity of Mars and Mercury." },
      { text: "Zero gravity (complete weightlessness)", isCorrect: false, explanation: "The Moon is a massive body with substantial gravity, not zero." }
    ],
    explanation: "Lower lunar gravity made Apollo astronauts perform distinctive hopping strides across the regolith.",
    tags: ["space-explorers", "moon", "gravity", "physics", "apollo"]
  },
  {
    title: "Which lunar phase occurs when the Moon is situated between the Earth and the Sun, making the near side completely dark to an observer on Earth?",
    difficulty: "Easy",
    options: [
      { text: "New Moon", isCorrect: true, explanation: "During a New Moon, the sunlit side of the Moon faces entirely away from Earth." },
      { text: "Full Moon", isCorrect: false, explanation: "During Full Moon, the near side is completely illuminated." },
      { text: "First Quarter", isCorrect: false, explanation: "During First Quarter, half of the visible side is illuminated." },
      { text: "Waxing Gibbous", isCorrect: false, explanation: "Waxing Gibbous is more than half illuminated but not fully." }
    ],
    explanation: "The synodic lunar month (from New Moon to New Moon) averages 29.53 days.",
    tags: ["space-explorers", "lunar-phases", "new-moon", "moon", "astronomy"]
  },
  {
    title: "Why is the lunar South Pole, specifically craters in the South Pole–Aitken basin, the primary landing target for NASA's Artemis and ISRO's Chandrayaan missions?",
    difficulty: "Medium",
    options: [
      { text: "Permanently shadowed craters at the lunar poles trap vast deposits of water ice essential for life support and rocket fuel", isCorrect: true, explanation: "Because the Moon has almost no axial tilt (1.5°), deep crater bottoms never see sunlight and act as cryogenic cold traps for water ice." },
      { text: "It is the only part of the Moon with a breathable pressurized atmosphere", isCorrect: false, explanation: "The Moon is an airless body across its entire surface." },
      { text: "It has active geothermal hot springs that can heat lunar bases", isCorrect: false, explanation: "The Moon has no active hot springs or vulcanism." },
      { text: "It is directly connected to Earth by an elevator cable", isCorrect: false, explanation: "Space elevators to the Moon do not exist." }
    ],
    explanation: "Water ice can be electrolyzed into hydrogen and oxygen to produce rocket propellant and breathing air.",
    tags: ["space-explorers", "lunar-south-pole", "chandrayaan", "artemis", "water-ice"]
  },
  {
    title: "What is the completely dark, central conical zone of a celestial shadow where all direct light from the illuminating source is blocked?",
    difficulty: "Easy",
    options: [
      { text: "Umbra", isCorrect: true, explanation: "An observer located inside the umbra experiences a total solar or total lunar eclipse." },
      { text: "Penumbra", isCorrect: false, explanation: "The penumbra is the lighter outer region where light is only partially blocked." },
      { text: "Antumbra", isCorrect: false, explanation: "The antumbra is the region beyond the umbra where an annular eclipse is seen." },
      { text: "Corona", isCorrect: false, explanation: "The corona is the Sun's atmosphere, not a shadow region." }
    ],
    explanation: "During a total solar eclipse, the Moon's umbra traces a narrow path of totality across Earth's surface.",
    tags: ["space-explorers", "umbra", "eclipses", "optics", "physical-sciences"]
  },
  {
    title: "What is the primary cause of ocean high tides and low tides on Earth?",
    difficulty: "Easy",
    options: [
      { text: "The gravitational gradient (differential tidal force) exerted by the Moon across Earth's diameter", isCorrect: true, explanation: "Water on the near side is pulled toward the Moon more strongly, while the Earth is pulled away from water on the far side, creating two tidal bulges." },
      { text: "Ocean waves pushed by trade winds blowing across the equator", isCorrect: false, explanation: "Winds create surface waves, not the twice-daily global tidal cycle." },
      { text: "The thermal expansion of seawater caused by midday sunshine", isCorrect: false, explanation: "Thermal expansion is negligible on a daily scale compared to gravitational tides." },
      { text: "Earthquakes continuously shaking the ocean floor", isCorrect: false, explanation: "Earthquakes generate tsunamis, not regular cyclical tides." }
    ],
    explanation: "Although the Sun is vastly more massive, the Moon's proximity gives it 2.2 times greater tidal influence on Earth.",
    tags: ["space-explorers", "tides", "moon", "gravitation", "oceanography"]
  },

  // ==========================================
  // SECTION 4: STARS & STELLAR EVOLUTION (Q48 to Q62)
  // ==========================================
  {
    title: "In which interstellar cosmic structures of cold, dense molecular gas and dust are new stars born?",
    difficulty: "Easy",
    options: [
      { text: "Giant Molecular Clouds (Stellar Nurseries)", isCorrect: true, explanation: "Gravitational instability within these cold clouds (such as the Orion Nebula) causes pockets of gas to collapse into protostars." },
      { text: "Accretion disks around white dwarfs", isCorrect: false, explanation: "Accretion disks around white dwarfs produce novae, not new star formation." },
      { text: "The event horizon of a black hole", isCorrect: false, explanation: "Extreme tidal forces tear matter apart near event horizons." },
      { text: "Planetary magnetospheres", isCorrect: false, explanation: "Magnetospheres trap charged particles and are microscopic compared to star-forming regions." }
    ],
    explanation: "The Eagle Nebula's 'Pillars of Creation' is one of the most famous examples of an active stellar nursery.",
    tags: ["space-explorers", "stars", "stellar-nurseries", "nebula", "astrophysics"]
  },
  {
    title: "What is the physical condition where a star's inward gravitational collapse is exactly balanced by its outward thermal and radiation pressure?",
    difficulty: "Medium",
    options: [
      { text: "Hydrostatic Equilibrium", isCorrect: true, explanation: "Main sequence stars maintain stable radii for billions of years because outward gas and radiation pressure balances gravity." },
      { text: "Thermal runaway", isCorrect: false, explanation: "Thermal runaway causes explosive destabilization, as in the helium flash." },
      { text: "Relativistic beaming", isCorrect: false, explanation: "Relativistic beaming occurs when emitted radiation is focused into a narrow cone by relativistic motion." },
      { text: "Rotational synchrony", isCorrect: false, explanation: "Rotational synchrony refers to tidal locking, not stellar pressure-gravity balance." }
    ],
    explanation: "When nuclear fuel in the core runs out, hydrostatic equilibrium fails, triggering stellar collapse or expansion.",
    tags: ["space-explorers", "hydrostatic-equilibrium", "stellar-physics", "stars", "physical-sciences"]
  },
  {
    title: "Which famous astronomical diagram plots stars' intrinsic luminosity or absolute magnitude against their surface temperature or spectral classification?",
    difficulty: "Easy",
    options: [
      { text: "Hertzsprung-Russell (H-R) Diagram", isCorrect: true, explanation: "Developed around 1910 by Ejnar Hertzsprung and Henry Norris Russell, the H-R diagram is central to understanding stellar evolution." },
      { text: "Hubble Tuning Fork Diagram", isCorrect: false, explanation: "Hubble's diagram classifies galaxy morphology (elliptical, spiral, barred)." },
      { text: "Feynman Diagram", isCorrect: false, explanation: "Feynman diagrams depict quantum particle interactions." },
      { text: "Phase Diagram", isCorrect: false, explanation: "Phase diagrams map states of matter (solid, liquid, gas) vs temperature and pressure." }
    ],
    explanation: "Stars fall into distinct groupings on the H-R diagram: main sequence, red giants, supergiants, and white dwarfs.",
    tags: ["space-explorers", "hr-diagram", "stars", "stellar-evolution", "astronomy"]
  },
  {
    title: "Where do normal stars like our Sun spend approximately 90% of their active lifetimes on the Hertzsprung-Russell diagram?",
    difficulty: "Easy",
    options: [
      { text: "The Main Sequence", isCorrect: true, explanation: "Stars on the main sequence stably fuse hydrogen into helium in their cores." },
      { text: "The Red Giant branch", isCorrect: false, explanation: "Stars spend only about 10% of their life in the post-main-sequence giant phase." },
      { text: "The White Dwarf region", isCorrect: false, explanation: "White dwarfs are dead stellar remnants, not active fusing stars." },
      { text: "The Asymptotic Giant Branch", isCorrect: false, explanation: "The AGB phase is a brief, late evolutionary stage." }
    ],
    explanation: "Our Sun is a G-type main sequence star (yellow dwarf) roughly halfway through its 10-billion-year main sequence phase.",
    tags: ["space-explorers", "main-sequence", "stars", "hr-diagram", "sun"]
  },
  {
    title: "What is the Chandrasekhar Limit (~1.44 solar masses), formulated by Nobel Laureate Subrahmanyan Chandrasekhar?",
    difficulty: "Medium",
    options: [
      { text: "The maximum mass a stable white dwarf star can have before electron degeneracy pressure is overwhelmed by gravity", isCorrect: true, explanation: "Beyond 1.44 solar masses, relativistic electrons cannot resist collapse, triggering a Type Ia supernova or collapse into a neutron star." },
      { text: "The minimum mass required for a protostar to ignite hydrogen fusion in its core", isCorrect: false, explanation: "The minimum fusion mass limit is ~0.08 solar masses (~80 Jupiter masses); below that, brown dwarfs form." },
      { text: "The maximum mass of a supermassive black hole", isCorrect: false, explanation: "Supermassive black holes can reach tens of billions of solar masses." },
      { text: "The critical mass for plutonium fission in an atomic bomb", isCorrect: false, explanation: "That is nuclear physics, unrelated to stellar white dwarf limits." }
    ],
    explanation: "Subrahmanyan Chandrasekhar calculated this limit at age 19 while aboard a ship from India to Cambridge in 1930.",
    tags: ["space-explorers", "chandrasekhar-limit", "white-dwarf", "astrophysics", "stars"]
  },
  {
    title: "What dense, compact stellar remnant will our Sun leave behind after shedding its outer envelope as a glowing planetary nebula in ~5 billion years?",
    difficulty: "Easy",
    options: [
      { text: "White Dwarf", isCorrect: true, explanation: "The Sun has insufficient mass to explode as a supernova, leaving behind an Earth-sized, carbon-oxygen white dwarf supported by electron degeneracy pressure." },
      { text: "Neutron Star", isCorrect: false, explanation: "Neutron stars require progenitor stars with initial masses greater than 8 to 10 solar masses." },
      { text: "Black Hole", isCorrect: false, explanation: "Stellar black holes form only from progenitors exceeding ~20 to 25 solar masses." },
      { text: "Magnetar", isCorrect: false, explanation: "Magnetars are ultra-magnetic neutron stars formed from massive stars." }
    ],
    explanation: "A white dwarf slowly cools over trillions of years into a theoretical cold, dark black dwarf.",
    tags: ["space-explorers", "white-dwarf", "sun", "stellar-evolution", "astronomy"]
  },
  {
    title: "What cataclysmic astronomical event occurs when a massive star (>8 solar masses) exhausts its nuclear fuel and its iron core collapses under gravity?",
    difficulty: "Medium",
    options: [
      { text: "Type II Core-Collapse Supernova", isCorrect: true, explanation: "The imploding core rebounds off nuclear densities, blasting the star's outer layers into space with the brightness of an entire galaxy." },
      { text: "Solar flare", isCorrect: false, explanation: "Solar flares are routine magnetic releases from our Sun, not the death of a star." },
      { text: "Classical Nova", isCorrect: false, explanation: "A nova is a thermonuclear runaway on the surface of a white dwarf in a binary system." },
      { text: "Planetary nebula expulsion", isCorrect: false, explanation: "Planetary nebulae are gentle mass ejections from low-mass red giants, not energetic supernovae." }
    ],
    explanation: "Supernovae forge and disperse heavy elements (carbon, oxygen, iron, gold) into interstellar space to seed new solar systems.",
    tags: ["space-explorers", "supernova", "core-collapse", "stars", "astrophysics"]
  },
  {
    title: "What is a pulsar, discovered by Dame Jocelyn Bell Burnell in 1967?",
    difficulty: "Medium",
    options: [
      { text: "A rapidly rotating, highly magnetized neutron star emitting beams of electromagnetic radiation along its magnetic poles", isCorrect: true, explanation: "As the star rotates, its radiation beams sweep across Earth like a celestial lighthouse beam, producing extremely precise periodic pulses." },
      { text: "An alien radio transmitter broadcasting artificial signals", isCorrect: false, explanation: "Initially jokingly called LGM-1 ('Little Green Men'), pulsars were quickly recognized as natural rotating neutron stars." },
      { text: "A pulsating variable red supergiant like Betelgeuse", isCorrect: false, explanation: "Cepheids and red giants pulsate on timescales of days to months, not milliseconds or seconds." },
      { text: "A binary star system where one star eclipses the other", isCorrect: false, explanation: "That is an eclipsing binary (e.g., Algol)." }
    ],
    explanation: "Pulsars can rotate hundreds of times per second (millisecond pulsars) and serve as natural atomic clocks in space.",
    tags: ["space-explorers", "pulsar", "neutron-star", "astrophysics", "stars"]
  },
  {
    title: "What is the boundary surrounding a black hole beyond which the escape velocity exceeds the speed of light, preventing anything from escaping?",
    difficulty: "Easy",
    options: [
      { text: "Event Horizon", isCorrect: true, explanation: "The event horizon marks the point of no return where light cones tip completely inward toward the central singularity." },
      { text: "Photon sphere", isCorrect: false, explanation: "The photon sphere is located at 1.5 times the Schwarzschild radius where photons can orbit in unstable circles." },
      { text: "Ergosphere", isCorrect: false, explanation: "The ergosphere is the region outside a rotating black hole's event horizon where spacetime is dragged." },
      { text: "Accretion disc", isCorrect: false, explanation: "The accretion disk is the hot, glowing disk of orbiting gas outside the event horizon." }
    ],
    explanation: "Information about events occurring inside the event horizon cannot reach an outside observer.",
    tags: ["space-explorers", "black-hole", "event-horizon", "general-relativity", "astrophysics"]
  },
  {
    title: "What is the mathematical radius of the event horizon for a non-rotating, spherically symmetric black hole of mass M?",
    difficulty: "Medium",
    options: [
      { text: "Schwarzschild radius (r_s = 2GM / c²)", isCorrect: true, explanation: "Derived by Karl Schwarzschild in 1916 from Einstein's General Relativity, where G is Newton's constant and c is the speed of light." },
      { text: "Bohr radius (a₀ = 4πε₀ħ² / m_e e²)", isCorrect: false, explanation: "The Bohr radius defines the atomic scale of a ground-state hydrogen atom." },
      { text: "Hubble radius (r_H = c / H₀)", isCorrect: false, explanation: "The Hubble radius is the distance scale of the observable universe." },
      { text: "Compton wavelength (λ = h / mc)", isCorrect: false, explanation: "The Compton wavelength is a quantum mechanical particle property." }
    ],
    explanation: "If Earth were compressed into a black hole, its Schwarzschild radius would be approximately 9 millimeters (the size of a marble).",
    tags: ["space-explorers", "schwarzschild-radius", "black-hole", "general-relativity", "physics"]
  },
  {
    title: "What is the theoretical zero-volume, infinitely dense point at the center of a classical black hole where spacetime curvature diverges?",
    difficulty: "Medium",
    options: [
      { text: "Gravitational Singularity", isCorrect: true, explanation: "At the singularity, classical general relativity breaks down and a theory of quantum gravity is required." },
      { text: "Quark-gluon plasma", isCorrect: false, explanation: "Quark-gluon plasma is a state of matter created in high-energy particle colliders." },
      { text: "Magnetopause", isCorrect: false, explanation: "The magnetopause is the boundary between a planet's magnetosphere and the solar wind." },
      { text: "Baryon acoustic peak", isCorrect: false, explanation: "Baryon acoustic oscillations are density waves in the early universe." }
    ],
    explanation: "For a rotating Kerr black hole, the singularity forms a one-dimensional ring rather than a point.",
    tags: ["space-explorers", "singularity", "black-hole", "general-relativity", "cosmology"]
  },
  {
    title: "Which spectral class of stars on the Harvard spectral sequence (O, B, A, F, G, K, M) represents the hottest, most luminous blue stars?",
    difficulty: "Medium",
    options: [
      { text: "Class O", isCorrect: true, explanation: "Class O stars have surface temperatures exceeding 30,000 K and appear intense blue-violet, burning through their fuel in just millions of years." },
      { text: "Class M", isCorrect: false, explanation: "Class M stars are cool red dwarfs or red supergiants with surface temperatures under 3,700 K." },
      { text: "Class G", isCorrect: false, explanation: "Class G stars are yellow stars like our Sun (~5,800 K)." },
      { text: "Class A", isCorrect: false, explanation: "Class A stars (like Sirius and Vega) are white stars (~7,500 - 10,000 K)." }
    ],
    explanation: "Astronomers remember the spectral sequence via the mnemonic: 'Oh Be A Fine Girl/Guy, Kiss Me'.",
    tags: ["space-explorers", "spectral-classification", "stars", "astronomy", "hr-diagram"]
  },
  {
    title: "What is the heaviest chemical element that can be synthesized through exothermic nuclear fusion in the cores of massive stars before fusion consumes energy rather than releasing it?",
    difficulty: "Hard",
    options: [
      { text: "Iron (Fe-56 / Nickel-56)", isCorrect: true, explanation: "Iron-56 has one of the highest nuclear binding energies per nucleon; fusing iron requires adding energy, causing core collapse." },
      { text: "Lead (Pb)", isCorrect: false, explanation: "Lead is synthesized via neutron capture processes (s-process and r-process) during supernovae or kilonovae." },
      { text: "Carbon (C-12)", isCorrect: false, explanation: "Carbon fuses exothermically into neon, sodium, and magnesium." },
      { text: "Silicon (Si-28)", isCorrect: false, explanation: "Silicon burning is the final exothermic burning phase, producing nickel-56 which decays to cobalt-56 and iron-56." }
    ],
    explanation: "Once a star builds an iron core, it has run out of nuclear fuel, triggering a catastrophic supernova within seconds.",
    tags: ["space-explorers", "iron-peak", "nuclear-fusion", "nucleosynthesis", "stars"]
  },
  {
    title: "Which general relativistic phenomenon occurs when the intense gravitational field of a massive foreground galaxy or cluster bends and magnifies the light from a distant background star or galaxy?",
    difficulty: "Medium",
    options: [
      { text: "Gravitational Lensing", isCorrect: true, explanation: "Predicted by Albert Einstein and confirmed by Arthur Eddington in 1919, gravitational lensing acts as a cosmic magnifying glass." },
      { text: "Cosmic microwave anisotropy", isCorrect: false, explanation: "CMB anisotropy refers to tiny temperature fluctuations in the relic radiation of the Big Bang." },
      { text: "Cherenkov radiation", isCorrect: false, explanation: "Cherenkov radiation is emitted when charged particles travel faster than the speed of light in a refractive medium." },
      { text: "Stellar aberration", isCorrect: false, explanation: "Aberration is an apparent motion of stars caused by the velocity of Earth's orbit." }
    ],
    explanation: "Gravitational lensing creates Einstein rings, arcs, and multiple distorted images of distant galaxies.",
    tags: ["space-explorers", "gravitational-lensing", "general-relativity", "einstein", "physics"]
  },
  {
    title: "What is the name of the supermassive black hole located at the dynamical center of our Milky Way galaxy (~26,000 light-years from Earth)?",
    difficulty: "Easy",
    options: [
      { text: "Sagittarius A* (Sgr A*)", isCorrect: true, explanation: "Containing approximately 4.15 million solar masses, Sagittarius A* was imaged directly by the Event Horizon Telescope in 2022." },
      { text: "Cygnus X-1", isCorrect: false, explanation: "Cygnus X-1 is a stellar-mass black hole (~21 solar masses) in the constellation Cygnus." },
      { text: "M87*", isCorrect: false, explanation: "M87* is the supermassive black hole (6.5 billion solar masses) in the giant elliptical galaxy Messier 87." },
      { text: "Andromeda X", isCorrect: false, explanation: "Andromeda X is a dwarf spheroidal satellite galaxy of Andromeda." }
    ],
    explanation: "Andrea Ghez and Reinhard Genzel won the 2020 Nobel Prize in Physics for tracking stars orbiting Sagittarius A*.",
    tags: ["space-explorers", "sagittarius-a", "black-hole", "milky-way", "astronomy"]
  },

  // ==========================================
  // SECTION 5: CONSTELLATIONS & CELESTIAL MECHANICS (Q63 to Q72)
  // ==========================================
  {
    title: "How many modern constellations are officially recognized across the celestial sphere by the International Astronomical Union (IAU)?",
    difficulty: "Easy",
    options: [
      { text: "88 constellations", isCorrect: true, explanation: "Standardized in 1928 by Eugène Delporte, the IAU divided the entire sky into 88 contiguous sectors with precise boundaries." },
      { text: "12 constellations", isCorrect: false, explanation: "12 is the number of traditional zodiac constellations along the ecliptic." },
      { text: "48 constellations", isCorrect: false, explanation: "48 is the number of classical Greek constellations listed by Ptolemy in the 2nd century." },
      { text: "108 constellations", isCorrect: false, explanation: "108 is a sacred number in Indian traditions, but astronomical sky maps contain 88." }
    ],
    explanation: "Every point on the celestial sphere falls within exactly one of the 88 IAU constellations.",
    tags: ["space-explorers", "constellations", "iau", "astronomy", "sky-mapping"]
  },
  {
    title: "Which prominent northern sky constellation contains the famous asterism known as the Big Dipper (or Saptarishi in Indian astronomy)?",
    difficulty: "Easy",
    options: [
      { text: "Ursa Major (The Great Bear)", isCorrect: true, explanation: "The Big Dipper is an asterism formed by the seven brightest stars of the constellation Ursa Major." },
      { text: "Ursa Minor (The Little Bear)", isCorrect: false, explanation: "Ursa Minor contains the Little Dipper and the North Star (Polaris)." },
      { text: "Cassiopeia", isCorrect: false, explanation: "Cassiopeia forms a distinctive 'W' or 'M' shape in the northern sky." },
      { text: "Bootes", isCorrect: false, explanation: "Bootes contains the bright star Arcturus." }
    ],
    explanation: "The two outer stars of the Big Dipper's bowl (Dubhe and Merak) point directly to Polaris.",
    tags: ["space-explorers", "ursa-major", "big-dipper", "saptarishi", "constellations"]
  },
  {
    title: "Which bright star marks the current North Celestial Pole in the northern hemisphere?",
    difficulty: "Easy",
    options: [
      { text: "Polaris (Alpha Ursae Minoris / Dhruva Tara)", isCorrect: true, explanation: "Located within 0.7° of the true north celestial pole, Polaris appears nearly stationary as Earth rotates." },
      { text: "Sirius (Alpha Canis Majoris)", isCorrect: false, explanation: "Sirius is the brightest star in the night sky, located in the southern celestial hemisphere." },
      { text: "Vega (Alpha Lyrae)", isCorrect: false, explanation: "Vega was the pole star 12,000 years ago and will be again in 13,700 years due to axial precession." },
      { text: "Betelgeuse (Alpha Orionis)", isCorrect: false, explanation: "Betelgeuse is a red supergiant marking the shoulder of Orion near the celestial equator." }
    ],
    explanation: "Axial precession of Earth's rotational axis traces a 25,772-year circle through different pole stars.",
    tags: ["space-explorers", "polaris", "north-star", "celestial-navigation", "astronomy"]
  },
  {
    title: "Which distinctive constellation features a prominent belt of three bright aligned stars, along with the red supergiant Betelgeuse and blue supergiant Rigel?",
    difficulty: "Easy",
    options: [
      { text: "Orion (The Hunter)", isCorrect: true, explanation: "Orion's belt is composed of Alnitak, Alnilam, and Mintaka, with Betelgeuse marking his right shoulder and Rigel his left foot." },
      { text: "Taurus (The Bull)", isCorrect: false, explanation: "Taurus contains the red giant Aldebaran and the Pleiades star cluster." },
      { text: "Canis Major (The Great Dog)", isCorrect: false, explanation: "Canis Major follows Orion and contains Sirius." },
      { text: "Scorpius (The Scorpion)", isCorrect: false, explanation: "Scorpius is a summer constellation featuring the red supergiant Antares." }
    ],
    explanation: "Beneath Orion's belt hangs Orion's sword, home to the Great Orion Nebula (M42).",
    tags: ["space-explorers", "orion", "betelgeuse", "rigel", "constellations"]
  },
  {
    title: "Which iconic southern constellation containing four bright stars arranged in a diamond or cross pattern is widely used for celestial navigation in the Southern Hemisphere?",
    difficulty: "Easy",
    options: [
      { text: "Crux (The Southern Cross)", isCorrect: true, explanation: "Extending the long axis of the Southern Cross 4.5 times points directly toward the South Celestial Pole." },
      { text: "Centaurus", isCorrect: false, explanation: "Centaurus surrounds Crux and contains Alpha Centauri." },
      { text: "Carina", isCorrect: false, explanation: "Carina contains the second-brightest star Canopus and the massive star Eta Carinae." },
      { text: "Sagittarius", isCorrect: false, explanation: "Sagittarius depicts an archer/teapot in the direction of the galactic center." }
    ],
    explanation: "Crux appears on the national flags of Australia, New Zealand, Brazil, Papua New Guinea, and Samoa.",
    tags: ["space-explorers", "crux", "southern-cross", "navigation", "constellations"]
  },
  {
    title: "What is the apparent annual path traced by the Sun across the celestial sphere against the background of the zodiac constellations called?",
    difficulty: "Medium",
    options: [
      { text: "The Ecliptic", isCorrect: true, explanation: "The ecliptic represents the plane of Earth's orbit around the Sun, tilted 23.4° relative to the celestial equator." },
      { text: "The Prime Meridian", isCorrect: false, explanation: "The Prime Meridian is a terrestrial longitude line passing through Greenwich, England." },
      { text: "The Zenith", isCorrect: false, explanation: "The zenith is the imaginary point directly overhead for a specific observer." },
      { text: "The Celestial Equator", isCorrect: false, explanation: "The celestial equator is the projection of Earth's equator into space." }
    ],
    explanation: "Because the planets orbit close to the same plane, they all appear near the ecliptic.",
    tags: ["space-explorers", "ecliptic", "zodiac", "celestial-mechanics", "astronomy"]
  },
  {
    title: "How is a light-year defined in astrophysics?",
    difficulty: "Easy",
    options: [
      { text: "The distance traversed by electromagnetic radiation (light) through a vacuum in one Julian year (~9.46 trillion kilometers)", isCorrect: true, explanation: "Calculating c × 1 year: 299,792,458 m/s × 31,557,600 s ≈ 9.461 × 10¹² km." },
      { text: "The time it takes for sunlight to travel from the Sun to Pluto", isCorrect: false, explanation: "Sunlight reaches Pluto in roughly 5.5 hours." },
      { text: "The brightness of a star observed at a standard distance of 10 parsecs", isCorrect: false, explanation: "That is the definition of absolute magnitude." },
      { text: "The time required for light to cross the diameter of our Milky Way galaxy", isCorrect: false, explanation: "Crossing the Milky Way takes roughly 100,000 years." }
    ],
    explanation: "A light-year is a unit of astronomical distance, not a unit of time.",
    tags: ["space-explorers", "light-year", "astronomical-distances", "physics", "astronomy"]
  },
  {
    title: "What is the apparent angular displacement of a relatively nearby star against distant background stars when observed from opposite sides of Earth's orbit called?",
    difficulty: "Medium",
    options: [
      { text: "Stellar Parallax", isCorrect: true, explanation: "Friedrich Bessel first measured stellar parallax in 1838 for 61 Cygni, providing direct geometric proof that Earth orbits the Sun." },
      { text: "Doppler shift", isCorrect: false, explanation: "Doppler shift measures radial velocity from spectral line shifts, not positional angles." },
      { text: "Precession", isCorrect: false, explanation: "Precession is the slow wobble of Earth's rotational axis." },
      { text: "Gravitational redshift", isCorrect: false, explanation: "Gravitational redshift is the loss of energy experienced by light escaping a gravitational well." }
    ],
    explanation: "Stellar parallax is inversely proportional to distance: distance in parsecs = 1 / parallax angle in arcseconds.",
    tags: ["space-explorers", "stellar-parallax", "astrometry", "bessel", "distances"]
  },
  {
    title: "What astronomical distance unit is defined as the distance at which an object subtends a parallax angle of exactly one arcsecond (equivalent to ~3.26 light-years)?",
    difficulty: "Medium",
    options: [
      { text: "Parsec (pc)", isCorrect: true, explanation: "A contraction of 'parallax of one second', 1 parsec equals ~3.086 × 10¹³ km or ~206,265 Astronomical Units." },
      { text: "Light-year", isCorrect: false, explanation: "1 light-year is 0.3066 parsecs." },
      { text: "Megameter", isCorrect: false, explanation: "A megameter is 1,000,000 meters, far smaller than astronomical scales." },
      { text: "Femtometer", isCorrect: false, explanation: "A femtometer is 10⁻¹⁵ meters, the scale of atomic nuclei." }
    ],
    explanation: "Professional astrophysicists predominantly use parsecs, kiloparsecs (kpc), and megaparsecs (Mpc) to measure cosmic distances.",
    tags: ["space-explorers", "parsec", "units", "astronomy", "physical-sciences"]
  },
  {
    title: "What cosmological observation first discovered by Edwin Hubble in 1929 provided empirical proof that the universe is actively expanding?",
    difficulty: "Easy",
    options: [
      { text: "Cosmological Redshift: Spectral absorption lines from distant galaxies shift toward longer red wavelengths proportionally with distance", isCorrect: true, explanation: "Hubble's Law (v = H₀ d) demonstrated that distant galaxies recede with velocities proportional to their distance." },
      { text: "The discovery that all stars in the Milky Way are burning out at identical rates", isCorrect: false, explanation: "Stars burn at vastly different rates depending on their mass." },
      { text: "The observation that planets orbit counterclockwise around the Sun", isCorrect: false, explanation: "Planetary orbital direction proves angular momentum conservation in the solar nebula, not universal expansion." },
      { text: "The detection of solar neutrino oscillations", isCorrect: false, explanation: "Neutrino oscillations solved the solar neutrino problem, unrelated to cosmic expansion." }
    ],
    explanation: "Cosmological redshift is caused by the metric expansion of space stretching light waves as they travel.",
    tags: ["space-explorers", "hubble", "expanding-universe", "redshift", "cosmology"]
  },

  // ==========================================
  // SECTION 6: ASTRONAUTS & HUMAN SPACEFLIGHT (Q73 to Q84)
  // ==========================================
  {
    title: "Who was the first human being to travel into outer space, orbiting the Earth aboard Vostok 1 on April 12, 1961?",
    difficulty: "Easy",
    options: [
      { text: "Yuri Gagarin", isCorrect: true, explanation: "Soviet cosmonaut Yuri Gagarin completed a single 108-minute orbit of Earth with his famous callout 'Poyekhali!' ('Let's go!')." },
      { text: "Neil Armstrong", isCorrect: false, explanation: "Neil Armstrong was the first person to walk on the Moon in July 1969." },
      { text: "Alan Shepard", isCorrect: false, explanation: "Alan Shepard was the first American in space (suborbital flight aboard Freedom 7 in May 1961)." },
      { text: "John Glenn", isCorrect: false, explanation: "John Glenn was the first American to orbit the Earth in February 1962." }
    ],
    explanation: "April 12 is celebrated worldwide as the International Day of Human Space Flight (Yuri's Night).",
    tags: ["space-explorers", "yuri-gagarin", "vostok-1", "astronauts", "history"]
  },
  {
    title: "Which historic NASA Apollo mission landed the first humans on the lunar surface on July 20, 1969?",
    difficulty: "Easy",
    options: [
      { text: "Apollo 11", isCorrect: true, explanation: "Commanded by Neil Armstrong with Lunar Module Pilot Buzz Aldrin, the Lunar Module 'Eagle' touched down at Mare Tranquillitatis (Sea of Tranquility)." },
      { text: "Apollo 8", isCorrect: false, explanation: "Apollo 8 was the first crewed mission to orbit the Moon (December 1968)." },
      { text: "Apollo 13", isCorrect: false, explanation: "Apollo 13 suffered an oxygen tank explosion in April 1970 and safely aborted its lunar landing." },
      { text: "Apollo 17", isCorrect: false, explanation: "Apollo 17 was the final Apollo mission to the Moon in December 1972." }
    ],
    explanation: "Neil Armstrong famously proclaimed: 'That's one small step for [a] man, one giant leap for mankind.'",
    tags: ["space-explorers", "apollo-11", "neil-armstrong", "buzz-aldrin", "moon-landing"]
  },
  {
    title: "Who made history in June 1963 aboard Vostok 6 as the first woman to fly in space?",
    difficulty: "Easy",
    options: [
      { text: "Valentina Tereshkova", isCorrect: true, explanation: "Soviet cosmonaut Valentina Tereshkova orbited the Earth 48 times over nearly three days, remaining the only woman to fly a solo space mission." },
      { text: "Sally Ride", isCorrect: false, explanation: "Sally Ride was the first American woman in space, flying aboard Space Shuttle Challenger in 1983." },
      { text: "Svetlana Savitskaya", isCorrect: false, explanation: "Savitskaya was the second woman in space and the first woman to perform a spacewalk in 1984." },
      { text: "Mae Jemison", isCorrect: false, explanation: "Mae Jemison was the first African American woman in space in 1992." }
    ],
    explanation: "Tereshkova spent more time in space than all American astronauts combined up to that date.",
    tags: ["space-explorers", "valentina-tereshkova", "vostok-6", "women-in-space", "history"]
  },
  {
    title: "Which Soviet cosmonaut conducted the first Extravehicular Activity (EVA / spacewalk) in human history on March 18, 1965, during the Voskhod 2 mission?",
    difficulty: "Medium",
    options: [
      { text: "Alexei Leonov", isCorrect: true, explanation: "Leonov spent 12 minutes outside the spacecraft connected by a 5.35-meter tether, facing a life-threatening crisis when his pressurized suit expanded." },
      { text: "Gherman Titov", isCorrect: false, explanation: "Titov was the second human in space aboard Vostok 2." },
      { text: "Ed White", isCorrect: false, explanation: "Ed White performed the first American spacewalk in June 1965 aboard Gemini 4." },
      { text: "Valeri Polyakov", isCorrect: false, explanation: "Polyakov holds the record for the longest single spaceflight (437 days aboard Mir)." }
    ],
    explanation: "Leonov had to manually bleed pressure from his suit in the airlock to bend his limbs and squeeze back inside the spacecraft.",
    tags: ["space-explorers", "alexei-leonov", "spacewalk", "eva", "astronauts"]
  },
  {
    title: "Who became the first citizen of India to journey into outer space aboard the Soviet Soyuz T-11 mission in April 1984?",
    difficulty: "Easy",
    options: [
      { text: "Squadron Leader Rakesh Sharma", isCorrect: true, explanation: "Indian Air Force test pilot Rakesh Sharma spent 7 days, 21 hours, and 40 minutes aboard the Salyut 7 orbital space station." },
      { text: "Kalpana Chawla", isCorrect: false, explanation: "Kalpana Chawla was the first Indian-origin woman in space (1997, STS-87)." },
      { text: "Sunita Williams", isCorrect: false, explanation: "Sunita Williams is an Indian-American NASA astronaut who first flew in 2006." },
      { text: "Ravish Malhotra", isCorrect: false, explanation: "Wing Commander Ravish Malhotra was the backup cosmonaut trained alongside Rakesh Sharma." }
    ],
    explanation: "Rakesh Sharma performed zero-gravity yoga experiments to study space motion sickness prevention.",
    tags: ["space-explorers", "rakesh-sharma", "soyuz-t11", "isro", "astronauts", "india"]
  },
  {
    title: "What iconic phrase did Squadron Leader Rakesh Sharma recite when Prime Minister Indira Gandhi asked him from Earth how India looked from space?",
    difficulty: "Easy",
    options: [
      { text: "'Saare Jahan Se Achha' (Better than the whole world)", isCorrect: true, explanation: "Quoting Muhammad Iqbal's famous nationalistic patriotic poem Tarana-e-Hindi, his words became immortalized in Indian history." },
      { text: "'Vande Mataram' (I praise thee, Mother)", isCorrect: false, explanation: "A celebrated national song, but not Rakesh Sharma's direct answer to Indira Gandhi." },
      { text: "'Jai Jawan, Jai Kisan'", isCorrect: false, explanation: "That was Prime Minister Lal Bahadur Shastri's famous slogan." },
      { text: "'Satyameva Jayate'", isCorrect: false, explanation: "That is India's national motto ('Truth alone triumphs')." }
    ],
    explanation: "The historic televised exchange between Rakesh Sharma and PM Indira Gandhi took place on April 5, 1984.",
    tags: ["space-explorers", "rakesh-sharma", "saare-jahan-se-achha", "history", "india"]
  },
  {
    title: "Who was the first woman of Indian origin in space, who tragically perished alongside six crewmates during the Space Shuttle Columbia (STS-107) disaster in February 2003?",
    difficulty: "Easy",
    options: [
      { text: "Kalpana Chawla", isCorrect: true, explanation: "Born in Karnal, Haryana, aerospace engineer Kalpana Chawla first flew on STS-87 (1997) and logged 30 days, 14 hours in space before STS-107 disintegrated during atmospheric re-entry." },
      { text: "Sunita Williams", isCorrect: false, explanation: "Sunita Williams is alive and completed multiple long-duration ISS expeditions." },
      { text: "Sirisha Bandla", isCorrect: false, explanation: "Sirisha Bandla flew on Virgin Galactic's Unity 22 suborbital flight in 2021." },
      { text: "Shawna Pandya", isCorrect: false, explanation: "Shawna Pandya is a Canadian citizen and physician-astronaut candidate." }
    ],
    explanation: "India's first dedicated meteorological satellite, METSAT-1, was renamed KALPANA-1 in her honor by Prime Minister Atal Bihari Vajpayee.",
    tags: ["space-explorers", "kalpana-chawla", "columbia", "astronauts", "india"]
  },
  {
    title: "Which Indian-American NASA astronaut holds multiple spacewalk records for female astronauts and logged over 320 days across multiple space station expeditions?",
    difficulty: "Easy",
    options: [
      { text: "Sunita Williams", isCorrect: true, explanation: "Sunita Williams conducted 7 spacewalks totaling over 50 hours, and ran the Boston Marathon while in orbit on the ISS treadmill." },
      { text: "Kalpana Chawla", isCorrect: false, explanation: "Kalpana Chawla flew two shuttle missions but did not perform spacewalks." },
      { text: "Jessica Meir", isCorrect: false, explanation: "Jessica Meir participated in the first all-woman spacewalk with Christina Koch in 2019." },
      { text: "Peggy Whitson", isCorrect: false, explanation: "Peggy Whitson holds the overall US cumulative time record (675 days), but is not of Indian descent." }
    ],
    explanation: "Sunita Williams launched to the ISS again in 2024 as commander of the Boeing Crew Flight Test (CFT).",
    tags: ["space-explorers", "sunita-williams", "iss", "spacewalk", "astronauts"]
  },
  {
    title: "Why do astronauts floating inside the International Space Station (ISS) experience apparent weightlessness (microgravity)?",
    difficulty: "Medium",
    options: [
      { text: "The station and astronauts are in continuous freefall toward Earth while their horizontal orbital velocity keeps them constantly missing the planet", isCorrect: true, explanation: "Earth's gravity at ISS altitude (~400 km) is still about 90% as strong as on the surface; weightlessness is caused by perpetual freefall in orbit." },
      { text: "Gravity completely ceases to exist once you exit Earth's atmosphere", isCorrect: false, explanation: "Earth's gravity extends indefinitely into space, dropping according to 1/r²." },
      { text: "Antigravity engines installed beneath the space station repel Earth's gravity", isCorrect: false, explanation: "Antigravity engines do not exist in modern physics." },
      { text: "The ISS orbits outside the Moon's orbital distance where gravity is zero", isCorrect: false, explanation: "The ISS is in Low Earth Orbit at only ~400 km altitude; the Moon is at ~384,400 km." }
    ],
    explanation: "Orbiting is simply falling toward the ground and having enough tangential speed to continuously curve around the horizon.",
    tags: ["space-explorers", "microgravity", "freefall", "iss", "physics"]
  },
  {
    title: "What is the critical life support subsystem inside an astronaut's Extravehicular Mobility Unit (EMU) backpack that scrubs exhaled carbon dioxide?",
    difficulty: "Medium",
    options: [
      { text: "Lithium Hydroxide (LiOH) or Metal Oxide (Metox) canisters", isCorrect: true, explanation: "LiOH reacts with toxic CO₂ to produce lithium carbonate and water vapor, preventing hypercapnia during 8-hour spacewalks." },
      { text: "A miniature diesel combustion generator", isCorrect: false, explanation: "Combustion requires oxygen and emits toxic exhaust; spacesuits use electric batteries." },
      { text: "Pure liquid nitrogen tanks", isCorrect: false, explanation: "Liquid nitrogen would freeze the astronaut and lacks oxygen." },
      { text: "A pressurized helium cooling valve", isCorrect: false, explanation: "Suit cooling uses a liquid cooling and ventilation garment with chilled water tubes." }
    ],
    explanation: "CO₂ removal is as vital as oxygen delivery; without it, astronauts would lose consciousness in minutes.",
    tags: ["space-explorers", "spacesuit", "emu", "life-support", "astronauts"]
  },
  {
    title: "What is the minimum velocity an unpowered projectile must achieve to completely escape Earth's gravitational field without further thrust?",
    difficulty: "Easy",
    options: [
      { text: "Escape velocity (~11.2 km/s or ~40,320 km/h)", isCorrect: true, explanation: "Derived from v_esc = √(2GM/R), where G is Newton's constant, M is Earth's mass, and R is Earth's radius." },
      { text: "Orbital velocity (~7.8 km/s)", isCorrect: false, explanation: "7.8 km/s is circular orbital velocity for Low Earth Orbit, not escape velocity." },
      { text: "Speed of sound (~343 m/s)", isCorrect: false, explanation: "Speed of sound is Mach 1 in air, vastly too slow to reach orbit." },
      { text: "Speed of light (~300,000 km/s)", isCorrect: false, explanation: "Speed of light is the universal cosmic speed limit, not escape velocity." }
    ],
    explanation: "Achieving escape velocity puts a spacecraft onto a parabolic trajectory that carries it indefinitely away from Earth.",
    tags: ["space-explorers", "escape-velocity", "orbital-mechanics", "physics", "rockets"]
  },
  {
    title: "Which continuously crewed modular laboratory has been orbiting Earth in low Earth orbit since 1998, representing a partnership of NASA, Roscosmos, ESA, JAXA, and CSA?",
    difficulty: "Easy",
    options: [
      { text: "International Space Station (ISS)", isCorrect: true, explanation: "Continuously inhabited since November 2000, the ISS spans the size of an American football field and orbits Earth every 90 minutes." },
      { text: "Mir Space Station", isCorrect: false, explanation: "Mir was the Soviet/Russian space station deorbited in 2001." },
      { text: "Skylab", isCorrect: false, explanation: "Skylab was America's first space station, occupied in 1973-1974." },
      { text: "Tiangong Space Station", isCorrect: false, explanation: "Tiangong is China's national modular space station launched in 2021." }
    ],
    explanation: "The ISS serves as a microgravity research facility conducting thousands of experiments in biology, physics, and materials science.",
    tags: ["space-explorers", "iss", "space-station", "nasa", "international"]
  },

  // ==========================================
  // SECTION 7: ISRO & HISTORIC INDIAN SPACE MISSIONS (Q85 to Q100)
  // ==========================================
  {
    title: "Who is widely revered as the 'Father of the Indian Space Program'?",
    difficulty: "Easy",
    options: [
      { text: "Dr. Vikram Ambalal Sarabhai", isCorrect: true, explanation: "Dr. Sarabhai established the Physical Research Laboratory (PRL), INCOSPAR, and spearheaded the creation of ISRO to harness space technology for national development." },
      { text: "Dr. Homi Jehangir Bhabha", isCorrect: false, explanation: "Dr. Bhabha is revered as the Father of the Indian Nuclear Program." },
      { text: "Dr. A. P. J. Abdul Kalam", isCorrect: false, explanation: "Dr. Kalam is known as the 'Missile Man of India' and directed the SLV-3 project." },
      { text: "Prof. Satish Dhawan", isCorrect: false, explanation: "Prof. Dhawan was the legendary chairman who led ISRO during its expansion in the 1970s and 80s." }
    ],
    explanation: "Dr. Sarabhai famously stated: 'We must be second to none in the application of advanced technologies to the real problems of man and society.'",
    tags: ["space-explorers", "isro", "vikram-sarabhai", "history", "india"]
  },
  {
    title: "Which organization, established in 1962 under the Department of Atomic Energy upon Dr. Vikram Sarabhai's recommendation, was the predecessor to ISRO?",
    difficulty: "Medium",
    options: [
      { text: "INCOSPAR (Indian National Committee for Space Research)", isCorrect: true, explanation: "Headed by Dr. Sarabhai, INCOSPAR set up the Thumba Equatorial Rocket Launching Station (TERLS) near Thiruvananthapuram in 1963." },
      { text: "DRDO (Defence Research and Development Organisation)", isCorrect: false, explanation: "DRDO was formed in 1958 for military defense research, not civilian space." },
      { text: "BARC (Bhabha Atomic Research Centre)", isCorrect: false, explanation: "BARC is India's premier nuclear research facility." },
      { text: "CSIR (Council of Scientific and Industrial Research)", isCorrect: false, explanation: "CSIR is India's largest industrial research and development body." }
    ],
    explanation: "INCOSPAR was superseded by the establishment of the Indian Space Research Organisation (ISRO) on August 15, 1969.",
    tags: ["space-explorers", "incospar", "isro", "history", "india"]
  },
  {
    title: "On which date was the Indian Space Research Organisation (ISRO) officially established?",
    difficulty: "Easy",
    options: [
      { text: "August 15, 1969", isCorrect: true, explanation: "ISRO was founded on India's 22nd Independence Day, growing out of INCOSPAR under the Department of Atomic Energy." },
      { text: "January 26, 1950", isCorrect: false, explanation: "January 26, 1950, is India's Republic Day." },
      { text: "October 2, 1971", isCorrect: false, explanation: "October 2 is Gandhi Jayanti." },
      { text: "November 21, 1963", isCorrect: false, explanation: "November 21, 1963, was the launch date of India's first sounding rocket (Nike-Apache) from Thumba." }
    ],
    explanation: "ISRO later came under the newly formed Department of Space (DOS) in 1972.",
    tags: ["space-explorers", "isro", "history", "india", "dates"]
  },
  {
    title: "Where is India's primary orbital spaceport and rocket launch complex, the Satish Dhawan Space Centre (SHAR), located?",
    difficulty: "Easy",
    options: [
      { text: "Sriharikota, Andhra Pradesh", isCorrect: true, explanation: "Located on a barrier island on the coast of the Bay of Bengal, its near-equatorial location and eastward launch corridor over the sea provide safety and velocity boost." },
      { text: "Thiruvananthapuram, Kerala", isCorrect: false, explanation: "Thiruvananthapuram houses the Vikram Sarabhai Space Centre (VSSC) for rocket design." },
      { text: "Bengaluru, Karnataka", isCorrect: false, explanation: "Bengaluru houses ISRO Headquarters and the UR Rao Satellite Centre (URSC)." },
      { text: "Mahendragiri, Tamil Nadu", isCorrect: false, explanation: "Mahendragiri houses the ISRO Propulsion Complex (IPRC) for rocket engine testing." }
    ],
    explanation: "Sriharikota features two active launch pads used for PSLV, GSLV, and LVM3 missions.",
    tags: ["space-explorers", "sriharikota", "shar", "isro", "spaceport"]
  },
  {
    title: "What was the name of India's first indigenous satellite, launched into orbit on April 19, 1975, aboard a Soviet Kosmos-3M rocket?",
    difficulty: "Easy",
    options: [
      { text: "Aryabhata", isCorrect: true, explanation: "Named after the 5th-century Indian mathematician-astronomer, Aryabhata weighed 360 kg and conducted X-ray astronomy and solar physics experiments." },
      { text: "Bhaskara-I", isCorrect: false, explanation: "Bhaskara-I was India's first experimental remote sensing satellite, launched in 1979." },
      { text: "Rohini (RS-1)", isCorrect: false, explanation: "Rohini was the first satellite placed into orbit by an Indian launch vehicle (SLV-3) in 1980." },
      { text: "INSAT-1A", isCorrect: false, explanation: "INSAT-1A was launched in 1982 for telecommunications and meteorology." }
    ],
    explanation: "Aryabhata's image was famously featured on the reverse of the Indian two-rupee currency note between 1976 and 1997.",
    tags: ["space-explorers", "aryabhata", "satellite", "isro", "history"]
  },
  {
    title: "Which eminent aerospace scientist served as the Project Director for India's first successful Satellite Launch Vehicle (SLV-3) in 1980?",
    difficulty: "Easy",
    options: [
      { text: "Dr. A. P. J. Abdul Kalam", isCorrect: true, explanation: "Dr. Kalam led the SLV-3 project team that successfully put the Rohini satellite into orbit on July 18, 1980, making India the sixth member of the elite space club." },
      { text: "Dr. K. Sivan", isCorrect: false, explanation: "Dr. Sivan was ISRO Chairman during the Chandrayaan-2 mission." },
      { text: "Dr. S. Somanath", isCorrect: false, explanation: "Dr. Somanath is the ISRO Chairman who oversaw the Chandrayaan-3 and Aditya-L1 successes." },
      { text: "Dr. K. Radhakrishnan", isCorrect: false, explanation: "Dr. Radhakrishnan was ISRO Chairman during the Mars Orbiter Mission (Mangalyaan)." }
    ],
    explanation: "Dr. Kalam later became the 11th President of India and remains celebrated as India's 'People's President'.",
    tags: ["space-explorers", "abdul-kalam", "slv-3", "isro", "rockets"]
  },
  {
    title: "Which four-stage launch vehicle utilizing alternating solid and liquid fuel stages is famously celebrated as the reliable 'Workhorse of ISRO'?",
    difficulty: "Easy",
    options: [
      { text: "Polar Satellite Launch Vehicle (PSLV)", isCorrect: true, explanation: "With over 55 successful missions, PSLV launched Chandrayaan-1, Mangalyaan, and deployed a world-record 104 satellites on a single flight (PSLV-C37) in 2017." },
      { text: "Augmented Satellite Launch Vehicle (ASLV)", isCorrect: false, explanation: "ASLV was an intermediate low-earth experimental launcher operated in the late 1980s." },
      { text: "Sounding Rocket RH-200", isCorrect: false, explanation: "Rohini sounding rockets are small suborbital atmospheric test probes." },
      { text: "Small Satellite Launch Vehicle (SSLV)", isCorrect: false, explanation: "SSLV is ISRO's new mini-launcher designed for rapid on-demand commercial launches." }
    ],
    explanation: "PSLV features two solid stages (1st and 3rd) and two liquid stages (2nd with Vikas engine and 4th with dual thrusters).",
    tags: ["space-explorers", "pslv", "rockets", "isro", "space-missions"]
  },
  {
    title: "Which heavy-lift launch vehicle of ISRO, affectionately nicknamed 'Bahubali' or 'Fat Boy', successfully lofted Chandrayaan-2 and Chandrayaan-3?",
    difficulty: "Easy",
    options: [
      { text: "LVM3 (Launch Vehicle Mark-3 / GSLV Mk III)", isCorrect: true, explanation: "LVM3 features twin S200 solid rocket boosters, an L110 core liquid stage, and the high-thrust cryogenic C25 stage with the indigenous CE-20 engine." },
      { text: "PSLV-XL", isCorrect: false, explanation: "PSLV-XL is the extended version of PSLV, not the super-heavy LVM3." },
      { text: "GSLV Mk II", isCorrect: false, explanation: "GSLV Mk II is a medium-class launcher utilizing a smaller cryogenic upper stage." },
      { text: "Falcon 9", isCorrect: false, explanation: "Falcon 9 is operated by the American private aerospace company SpaceX." }
    ],
    explanation: "LVM3 can deliver up to 4,000 kg of payload to Geostationary Transfer Orbit (GTO) and 8,000 kg to Low Earth Orbit.",
    tags: ["space-explorers", "lvm3", "gslv-mk-iii", "bahubali", "isro", "rockets"]
  },
  {
    title: "What groundbreaking scientific discovery was made on the Moon by ISRO's Chandrayaan-1 mission in 2008-2009?",
    difficulty: "Easy",
    options: [
      { text: "Direct confirmation of widespread water molecules (H₂O) and hydroxyl (OH) radical signatures across the lunar surface", isCorrect: true, explanation: "The Moon Mineralogy Mapper (M3) spectrometer and Moon Impact Probe (MIP) confirmed the presence of lunar water molecules, overturning decades of dry-Moon dogma." },
      { text: "Discovery of living microbial fossils trapped inside lunar basalt", isCorrect: false, explanation: "No biological fossils have ever been discovered on the sterile Moon." },
      { text: "Discovery of massive deposits of petroleum oil beneath lunar maria", isCorrect: false, explanation: "Petroleum requires ancient organic matter and liquid water, both absent on the Moon." },
      { text: "Detection of an active planetary core magnetic dynamo", isCorrect: false, explanation: "The Moon's internal core dynamo died billions of years ago." }
    ],
    explanation: "Chandrayaan-1's discovery of water revolutionized lunar science and inspired global Artemis exploration plans.",
    tags: ["space-explorers", "chandrayaan-1", "water-on-moon", "isro", "moon"]
  },
  {
    title: "What remarkable historic milestone did ISRO achieve with the Mars Orbiter Mission (MOM / Mangalyaan) on September 24, 2014?",
    difficulty: "Easy",
    options: [
      { text: "India became the first Asian nation to reach Martian orbit, and the first country in the world to do so successfully on its maiden attempt", isCorrect: true, explanation: "Built at a record cost of approximately $74 million (cheaper than the Hollywood movie 'Gravity'), Mangalyaan operated in orbit for over 7 years." },
      { text: "India landed a human crew on the Martian surface", isCorrect: false, explanation: "No human has ever traveled beyond the Moon." },
      { text: "India deployed an underwater nuclear submarine inside a Martian canal", isCorrect: false, explanation: "Mars has no open liquid water canals." },
      { text: "India returned pristine soil samples from Mars back to Earth", isCorrect: false, explanation: "Mars sample return has not yet been achieved by any nation." }
    ],
    explanation: "Prime Minister Narendra Modi celebrated: 'India has successfully reached Mars. History has been created today.'",
    tags: ["space-explorers", "mangalyaan", "mars-orbiter-mission", "isro", "mars"]
  },
  {
    title: "What was the name of the lunar lander module used in the Chandrayaan-2 and Chandrayaan-3 missions, named in tribute to the father of India's space program?",
    difficulty: "Easy",
    options: [
      { text: "Vikram", isCorrect: true, explanation: "Named after Dr. Vikram Sarabhai, the Vikram lander was engineered with throttleable liquid engines, hazard avoidance cameras, and landing legs." },
      { text: "Pragyan", isCorrect: false, explanation: "Pragyan is the name of the rover, not the lander." },
      { text: "Dhawan", isCorrect: false, explanation: "Satish Dhawan is the namesake of the spaceport, not the lander." },
      { text: "Pushpak", isCorrect: false, explanation: "Pushpak is the name of ISRO's Reusable Launch Vehicle (RLV-TD) winged demonstrator." }
    ],
    explanation: "The Vikram lander safely touched down on the Moon on August 23, 2023, carrying scientific payloads like ChaSTE and RAMBHA.",
    tags: ["space-explorers", "vikram-lander", "chandrayaan-3", "isro", "moon"]
  },
  {
    title: "What is the name of the 26 kg, six-wheeled robotic exploration rover deployed by the Vikram lander during the Chandrayaan-3 mission?",
    difficulty: "Easy",
    options: [
      { text: "Pragyan", isCorrect: true, explanation: "Derived from Sanskrit meaning 'wisdom', Pragyan traveled over 100 meters across the lunar surface, imprinting ISRO's logo and the State Emblem of India." },
      { text: "Vikram", isCorrect: false, explanation: "Vikram is the stationary lander that housed Pragyan." },
      { text: "Yutu", isCorrect: false, explanation: "Yutu ('Jade Rabbit') is China's lunar rover on Chang'e missions." },
      { text: "Sojourner", isCorrect: false, explanation: "Sojourner was NASA's first Mars rover in 1997." }
    ],
    explanation: "Pragyan's APXS and LIBS spectrometers confirmed the unambiguous presence of sulfur, aluminum, calcium, iron, and titanium in lunar soil.",
    tags: ["space-explorers", "pragyan", "rover", "chandrayaan-3", "isro"]
  },
  {
    title: "Which date has been officially designated by the Government of India as 'National Space Day' to commemorate the historic soft landing of Chandrayaan-3?",
    difficulty: "Easy",
    options: [
      { text: "August 23", isCorrect: true, explanation: "On August 23, 2023, India became the fourth country to achieve a soft lunar landing and the first ever to land near the lunar South Pole." },
      { text: "July 14", isCorrect: false, explanation: "July 14, 2023, was the launch date of Chandrayaan-3 from Sriharikota." },
      { text: "October 22", isCorrect: false, explanation: "October 22, 2008, was the launch date of Chandrayaan-1." },
      { text: "September 24", isCorrect: false, explanation: "September 24, 2014, was the date Mangalyaan entered Mars orbit." }
    ],
    explanation: "National Space Day is celebrated annually with space exhibitions, hackathons, and science lectures nationwide.",
    tags: ["space-explorers", "national-space-day", "august-23", "chandrayaan-3", "india"]
  },
  {
    title: "What is the official name designated for the lunar touchdown site of the Chandrayaan-3 Vikram lander near the Moon's South Pole (69.37° S, 32.35° E)?",
    difficulty: "Easy",
    options: [
      { text: "Shiv Shakti Point", isCorrect: true, explanation: "Prime Minister Narendra Modi announced the name 'Shiv Shakti Point' on August 26, 2023, symbolising humanitarian resolve and women's scientific empowerment." },
      { text: "Tiranga Point", isCorrect: false, explanation: "Tiranga Point is the name designated for the Chandrayaan-2 crash footprint site." },
      { text: "Jawahar Point", isCorrect: false, explanation: "Jawahar Point is where Chandrayaan-1's Moon Impact Probe struck the Moon on November 14, 2008." },
      { text: "Tranquility Base", isCorrect: false, explanation: "Tranquility Base is the Apollo 11 lunar landing site." }
    ],
    explanation: "The International Astronomical Union (IAU) approved the name 'Statio Shiv Shakti' in March 2024.",
    tags: ["space-explorers", "shiv-shakti-point", "chandrayaan-3", "isro", "moon"]
  },
  {
    title: "What is the name of India's first dedicated space-based solar observatory, launched in September 2023 to study the Sun from the Sun-Earth L1 Lagrange point?",
    difficulty: "Easy",
    options: [
      { text: "Aditya-L1", isCorrect: true, explanation: "Positioned in a halo orbit around Lagrange Point 1 (~1.5 million km from Earth), Aditya-L1 continuously observes the solar corona, chromosphere, and solar wind without eclipses." },
      { text: "Surya-1", isCorrect: false, explanation: "Surya is not the official name of India's solar mission." },
      { text: "Helios-A", isCorrect: false, explanation: "Helios were joint German-American solar probes in the 1970s." },
      { text: "AstroSat", isCorrect: false, explanation: "AstroSat is India's multi-wavelength astronomical space telescope launched in 2015 into low Earth orbit." }
    ],
    explanation: "Aditya-L1 carries seven science payloads, including the Visible Emission Line Coronagraph (VELC) and SUIT.",
    tags: ["space-explorers", "aditya-l1", "sun", "isro", "solar-missions"]
  },
  {
    title: "What is the name of India's ambitious upcoming human spaceflight program aiming to demonstrate human spaceflight capability to Low Earth Orbit (LEO)?",
    difficulty: "Easy",
    options: [
      { text: "Gaganyaan", isCorrect: true, explanation: "Gaganyaan will carry a crew of up to three astronauts into a 400 km circular orbit for a three-day mission before a safe splashdown in Indian sea waters." },
      { text: "Vyomanautica", isCorrect: false, explanation: "Not an official mission name." },
      { text: "Samudrayaan", isCorrect: false, explanation: "Samudrayaan is India's deep-sea crewed submersible mission targeting 6,000 meters depth." },
      { text: "Antariksh-1", isCorrect: false, explanation: "Not an official human spaceflight mission name." }
    ],
    explanation: "ISRO developed the female-looking humanoid robot 'Vyommitra' for uncrewed Gaganyaan test flights.",
    tags: ["space-explorers", "gaganyaan", "vyommitra", "isro", "human-spaceflight"]
  }
];
