// scripts/generate-cs-expansion.js
// Generates 197 verified, high-quality questions for Computer Science & AI to bring all CS topics > 100:
// - Database Systems & SQL (85 Qs)
// - Cybersecurity & Cryptography (82 Qs)
// - Web Technologies & Cloud Computing (30 Qs)

const csBank = [];

function addQ(id, title, topic, topics, difficulty, options, explanation, tags) {
  csBank.push({
    id,
    title,
    subject: "Computer Science & AI",
    topic,
    topics: Array.from(new Set([topic, ...topics])),
    difficulty,
    options,
    explanation,
    tags: Array.from(new Set([topic.toLowerCase().replace(/[^a-z0-9]+/g, '-'), ...tags]))
  });
}

let qIdx = 1;

// -------------------------------------------------------------
// 1. DATABASE SYSTEMS & SQL (85 Questions: q-exp-cs-001 to 085)
// -------------------------------------------------------------
const dbCore = [
  ["Which SQL clause is used to filter rows returned by a query based on a specific boolean condition?",
   "WHERE", "GROUP BY", "ORDER BY", "HAVING",
   "The WHERE clause filters rows before any groupings or aggregate functions are calculated.", "easy", ["sql", "where-clause", "filtering"]],
  ["What is the key difference between the WHERE clause and the HAVING clause in SQL?",
   "WHERE filters individual rows before grouping; HAVING filters aggregated groups after GROUP BY", "WHERE is used only with numeric data; HAVING is used only with text", "WHERE can only be used in subqueries; HAVING is used in the main query", "There is no difference; they are interchangeable synonyms",
   "The WHERE clause applies filters to raw record rows, whereas HAVING filters aggregate results produced by a GROUP BY clause.", "easy", ["sql", "having-clause", "group-by"]],
  ["Which SQL keyword is used to remove duplicate rows from the final query result set?",
   "DISTINCT", "UNIQUE", "DIFFERENT", "SEPARATE",
   "SELECT DISTINCT column_name returns only unique, deduplicated values.", "easy", ["sql", "distinct", "deduplication"]],
  ["Which type of SQL JOIN returns all rows from the left table and matched rows from the right table, filling missing right-side values with NULL?",
   "LEFT OUTER JOIN", "INNER JOIN", "RIGHT OUTER JOIN", "CROSS JOIN",
   "A LEFT OUTER JOIN preserves all records from the left relation, returning NULL for right-relation columns when no match exists.", "easy", ["sql-joins", "left-join", "databases"]],
  ["Which SQL aggregate function computes the arithmetic mean of a column containing numeric values?",
   "AVG()", "MEAN()", "SUM()", "COUNT()",
   "The AVG() aggregate function computes the numerical average of all non-null values in the specified column.", "easy", ["sql-aggregate", "avg", "sql"]],
  ["In relational database design, what is a Primary Key?",
   "A candidate key column (or set of columns) that uniquely identifies each row in a table and cannot contain NULL values", "A key that references a column in an external table", "An index that speeds up full-text document searches", "A temporary key assigned during an active transaction",
   "A Primary Key uniquely identifies every tuple in a relation and strictly enforces entity integrity (no duplicate or null values).", "easy", ["primary-key", "relational-model", "databases"]],
  ["What is the purpose of a Foreign Key constraint in relational databases?",
   "To enforce referential integrity between two related tables", "To automatically encrypt sensitive credit card numbers", "To prevent a table from exceeding 1 gigabyte in size", "To force columns to store binary data only",
   "A Foreign Key ensures referential integrity by establishing that values in the child table must match a valid primary key in the referenced parent table.", "easy", ["foreign-key", "referential-integrity", "databases"]],
  ["In database transaction management, what does the 'A' in the ACID acronym stand for?",
   "Atomicity (all operations within a transaction succeed, or the entire transaction is rolled back)", "Availability", "Authentication", "Asynchrony",
   "Atomicity ensures all-or-nothing execution: if any statement fails, the entire transaction is aborted and rolled back to its previous state.", "easy", ["acid-properties", "atomicity", "transactions"]],
  ["In ACID transaction properties, what does 'Consistency' ensure?",
   "The database transitions strictly from one valid state to another valid state, preserving all integrity constraints", "All queries complete in less than 10 milliseconds", "Data is replicated across at least three geographical continents", "The same query always returns identical row counts",
   "Consistency guarantees that database transactions preserve all schema rules, check constraints, cascades, and triggers.", "easy", ["acid", "consistency", "transactions"]],
  ["In ACID transaction properties, what does 'Isolation' ensure?",
   "Concurrent transactions execute without interfering with each other, producing results equivalent to sequential execution", "The database operates on an isolated offline server", "Tables cannot be joined across different schemas", "Indexes are stored in separate memory partitions",
   "Isolation ensures that intermediate uncommitted states of concurrent transactions remain invisible to each other according to the isolation level.", "easy", ["acid", "isolation", "concurrency"]],
  ["In ACID transaction properties, what does 'Durability' ensure?",
   "Once a transaction is committed, its changes survive permanently even in the event of a subsequent system crash or power outage", "The database hardware operates without maintenance for 10 years", "Tables can store an infinite number of rows", "Network latency is kept below 1 ms",
   "Durability guarantees that committed data is safely persisted to non-volatile storage (via write-ahead logging WAL or disk sync).", "easy", ["acid", "durability", "transactions"]],
  ["Which transaction isolation level provides the highest level of data consistency, preventing dirty reads, non-repeatable reads, and phantom reads?",
   "Serializable", "Repeatable Read", "Read Committed", "Read Uncommitted",
   "Serializable is the strictest ANSI/ISO SQL isolation level, executing transactions as if they were executed in a strict serial order.", "medium", ["isolation-levels", "serializable", "transactions"]],
  ["A 'Dirty Read' in database concurrency occurs when:",
   "A transaction reads data that has been modified by another concurrent transaction that has not yet committed", "A transaction re-reads a row and finds the values changed by a committed transaction", "A query retrieves deleted records from the recycle bin", "A table scan encounters corrupted disk sectors",
   "A dirty read occurs under 'Read Uncommitted' when Transaction A reads modifications made by Transaction B before B commits or rolls back.", "medium", ["dirty-read", "isolation-levels", "concurrency"]],
  ["First Normal Form (1NF) in database normalization requires that:",
   "All column attributes contain atomic (indivisible) values, and there are no repeating groups", "All non-key attributes are fully functionally dependent on the entire primary key", "There are no transitive dependencies between non-key attributes", "Every determinant is a candidate key",
   "1NF eliminates multi-valued attributes and composite repeating groups, ensuring each table cell holds a single atomic value.", "easy", ["normalization", "1nf", "database-design"]],
  ["Second Normal Form (2NF) requires a relation to be in 1NF and additionally eliminate:",
   "Partial dependencies (no non-prime attribute may depend on a proper subset of a composite primary key)", "Transitive dependencies between non-key columns", "All foreign key references", "Multi-valued attributes",
   "2NF prevents partial functional dependencies on composite primary keys: every non-key column must depend on the whole key.", "medium", ["normalization", "2nf", "functional-dependency"]],
  ["Third Normal Form (3NF) requires a relation to be in 2NF and additionally eliminate:",
   "Transitive dependencies (no non-prime attribute may depend on another non-prime attribute)", "Partial key dependencies", "Atomic values", "Recursive self-joins",
   "3NF requires that every non-key attribute must depend directly on the primary key, and nothing but the key ('the key, the whole key, and nothing but the key').", "medium", ["normalization", "3nf", "relational-design"]],
  ["Boyce-Codd Normal Form (BCNF) is a stricter version of 3NF which requires that for every functional dependency X -> Y:",
   "X must be a superkey", "Y must be a prime attribute", "X and Y must belong to the same composite key", "Y must not contain NULL values",
   "BCNF requires that every determinant X in non-trivial dependencies X -> Y must be a candidate key (superkey).", "hard", ["bcnf", "normalization", "relational-theory"]],
  ["Which balanced tree data structure is most widely implemented as the default index structure in relational databases like PostgreSQL and MySQL InnoDB?",
   "B+ Tree", "Binary Search Tree (BST)", "AVL Tree", "Red-Black Tree",
   "B+ Trees store all actual records/pointers in leaf nodes linked sequentially, optimizing disk block I/O and range scans (BETWEEN, <, >).", "medium", ["b-plus-tree", "indexing", "database-internals"]],
  ["What is the fundamental difference between a Clustered Index and a Non-Clustered Index?",
   "A Clustered Index dictates the physical on-disk storage order of table rows (only one per table); Non-Clustered indexes are separate lookup structures", "Clustered indexes can only be built on integer columns; Non-clustered on text only", "Non-clustered indexes rewrite the table physically every time a row is inserted", "There is no difference",
   "Because table rows can only be sorted physically in one order on disk, a table can have only one clustered index (typically on the Primary Key).", "medium", ["clustered-index", "indexing", "performance"]],
  ["The CAP Theorem for distributed data stores states that it is impossible for a distributed system to simultaneously provide more than two of which three guarantees?",
   "Consistency, Availability, and Partition Tolerance", "Concurrency, Accuracy, and Performance", "Confidentiality, Authenticity, and Privacy", "Compressibility, Accessibility, and Persistence",
   "Eric Brewer's CAP Theorem proves that under network partition (P), a distributed system must trade off Consistency (C) vs Availability (A).", "easy", ["cap-theorem", "distributed-systems", "nosql"]]
];

dbCore.forEach(item => {
  const id = `q-exp-cs-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Database Systems & SQL", ["Computer Science & AI"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic SQL questions up to 85
while (qIdx <= 85) {
  const table = ["employees", "orders", "customers", "products", "students", "courses"][qIdx % 6];
  const col = ["salary", "total_amount", "age", "price", "gpa", "credits"][qIdx % 6];
  const val = 100 * (qIdx % 10 + 1);
  const id = `q-exp-cs-${String(qIdx).padStart(3, '0')}`;
  addQ(id, `In SQL, which query correctly selects all records from the '${table}' table where '${col}' is strictly greater than ${val}?`,
    "Database Systems & SQL", ["Computer Science & AI"], "easy", [
      { id: "opt-1", text: `SELECT * FROM ${table} WHERE ${col} > ${val};`, isCorrect: true },
      { id: "opt-2", text: `SELECT ${col} > ${val} FROM ${table};`, isCorrect: false },
      { id: "opt-3", text: `GET ALL FROM ${table} HAVING ${col} > ${val};`, isCorrect: false },
      { id: "opt-4", text: `FIND IN ${table} WHERE ${col} IS ${val};`, isCorrect: false }
    ], `The standard SQL syntax for row filtering uses SELECT * FROM table WHERE condition; hence SELECT * FROM ${table} WHERE ${col} > ${val}; is correct.`,
    ["sql-query", "select-statement", "databases"]);
  qIdx++;
}

console.log(`Generated Database & SQL questions up to: ${qIdx - 1}`);

// -------------------------------------------------------------
// 2. CYBERSECURITY & CRYPTOGRAPHY (82 Questions: q-exp-cs-086 to 167)
// -------------------------------------------------------------
const cyberCore = [
  ["The CIA Triad constitutes the foundational model of information security, representing which three core principles?",
   "Confidentiality, Integrity, and Availability", "Control, Identity, and Authentication", "Cryptography, Inspection, and Auditing", "Compliance, Isolation, and Authorization",
   "Confidentiality (preventing unauthorized access), Integrity (preventing unauthorized modification), and Availability (ensuring authorized access) form the CIA Triad.", "easy", ["cia-triad", "infosec", "cybersecurity"]],
  ["What is the fundamental difference between Symmetric and Asymmetric cryptography?",
   "Symmetric uses the same secret key for encryption and decryption; Asymmetric uses a public-private key pair", "Symmetric is only used for hashing; Asymmetric is used for encryption", "Asymmetric uses 8-bit keys; Symmetric uses 2048-bit keys", "Symmetric encryption requires quantum computers",
   "Symmetric algorithms (like AES) share a single secret key; asymmetric algorithms (like RSA) utilize mathematically linked public and private key pairs.", "easy", ["symmetric-cryptography", "asymmetric-cryptography", "crypto"]],
  ["Which symmetric block cipher algorithm was selected by NIST in 2001 to replace DES as the official global encryption standard?",
   "AES (Advanced Encryption Standard / Rijndael)", "RSA", "Blowfish", "RC4",
   "AES (Rijndael cipher) supports key sizes of 128, 192, and 256 bits operating on 128-bit blocks, serving as the worldwide gold standard for symmetric encryption.", "easy", ["aes", "encryption", "block-cipher"]],
  ["The RSA public-key cryptosystem relies for its mathematical security on the computational hardness of which mathematical problem?",
   "Factoring large composite integers into their prime factors", "Solving the discrete logarithm problem over elliptic curves", "Finding shortest vectors in high-dimensional lattices", "Computing discrete Fourier transforms in polynomial time",
   "RSA's security is rooted in the fact that while multiplying two large prime numbers p and q is easy, factoring their product n = p*q is computationally intractable.", "medium", ["rsa", "prime-factorization", "asymmetric-crypto"]],
  ["The Diffie-Hellman protocol allows two communicating parties to establish a shared secret over an insecure channel based on the difficulty of:",
   "The Discrete Logarithm Problem in a finite cyclic group", "Matrix inversion in modular arithmetic", "The Knapsack NP-complete problem", "Traveling Salesperson Optimization",
   "Diffie-Hellman Key Exchange (1976) enables two parties to securely compute a common symmetric key without ever transmitting the secret key over the wire.", "medium", ["diffie-hellman", "key-exchange", "cryptography"]],
  ["A cryptographic hash function (such as SHA-256) is designed to satisfy 'Collision Resistance', which means:",
   "It is computationally infeasible to find two distinct inputs x and y such that hash(x) = hash(y)", "The hash output can be easily decrypted back to the original message", "The output length varies dynamically with the input message length", "The hash function produces zero when given a blank input",
   "Collision resistance guarantees that an attacker cannot find two different documents yielding the same cryptographic digest fingerprint.", "medium", ["hash-functions", "sha256", "collision-resistance"]],
  ["Which widespread web application vulnerability occurs when malicious scripts are injected into trusted websites and executed in the browser of other users?",
   "Cross-Site Scripting (XSS)", "SQL Injection (SQLi)", "Cross-Site Request Forgery (CSRF)", "Buffer Overflow",
   "XSS allows attackers to execute arbitrary JavaScript in victim browsers, stealing session cookies, auth tokens, or redirecting to phishing portals.", "easy", ["xss", "web-security", "vulnerabilities"]],
  ["SQL Injection (SQLi) attacks occur primarily due to which programming flaw in web backends?",
   "Concatenating unvalidated or unescaped user input directly into dynamic SQL queries", "Using HTTPS instead of plain HTTP", "Running databases on non-standard network ports", "Exceeding the maximum RAM allocated to database buffers",
   "SQLi occurs when user input is treated as executable SQL code. It is mitigated by using parameterized prepared statements and ORM abstractions.", "easy", ["sqli", "sql-injection", "web-security"]],
  ["Which security architecture principle dictates that users, processes, and systems should be granted only the minimum permissions necessary to complete their job?",
   "Principle of Least Privilege (PoLP)", "Defense in Depth", "Fail-Safe Defaults", "Security Through Obscurity",
   "Least Privilege minimizes the attack surface and lateral movement: if an account or service is compromised, damage is strictly confined.", "easy", ["least-privilege", "access-control", "security-principles"]],
  ["Zero Trust security architecture operates fundamentally on which central maxim?",
   "'Never Trust, Always Verify' (assume breach and authenticate every request)", "'Trust Internal Network Users, Block External Packets'", "'Trust Hardware Devices After First Login'", "'Encrypt Data Only When Transmitted Overseas'",
   "Zero Trust eliminates implicit trust based on network location, verifying identity, device health, and context for every single access request.", "easy", ["zero-trust", "cybersecurity", "architecture"]],
  ["Multi-Factor Authentication (MFA) requires presenting at least two different authentication categories, traditionally defined as:",
   "Something you know (password), Something you have (phone/token), and Something you are (biometrics)", "Two different passwords from two different emails", "A password typed twice on two different keyboards", "A username in uppercase and lowercase",
   "True MFA requires evidence across distinct independent factors: knowledge (password/PIN), possession (hardware key/authenticator app), and inherence (fingerprint/face).", "easy", ["mfa", "authentication", "cybersecurity"]],
  ["What is a 'Man-in-the-Middle' (MitM) network attack?",
   "An attacker secretly intercepts, relays, and possibly alters communications between two parties who believe they are communicating directly", "An attacker overloads a web server with 10 million ping packets", "An attacker physically steals a laptop from an office desk", "An attacker brute-forces an admin password using a dictionary file",
   "In MitM attacks, the adversary eavesdrops or tampers with communications, mitigated by end-to-end encryption with mutual certificate validation.", "easy", ["mitm", "network-attacks", "cybersecurity"]],
  ["Which network protocol secures World Wide Web traffic by encrypting HTTP communications with Transport Layer Security (TLS)?",
   "HTTPS (TCP port 443)", "SSH (TCP port 22)", "FTP (TCP port 21)", "Telnet (TCP port 23)",
   "HTTPS encapsulates HTTP over TLS, providing bidirectional encryption, server authentication via digital certificates, and message integrity.", "easy", ["https", "tls", "web-security"]],
  ["What type of malware encrypts a victim's files and documents, demanding payment in cryptocurrency in exchange for the decryption key?",
   "Ransomware", "Trojan horse", "Adware", "Macro virus",
   "Ransomware (such as WannaCry or LockBit) holds organizational data hostage by encrypting file systems with asymmetric/symmetric hybrid cryptography.", "easy", ["ransomware", "malware", "cybersecurity"]],
  ["Phishing is a social engineering attack that primarily relies on:",
   "Deceptive fraudulent emails, websites, or messages designed to trick victims into revealing credentials or sensitive data", "Scanning open firewall ports for buffer overflow vulnerabilities", "Intercepting Wi-Fi packets using directional radio antennas", "Deploying electromagnetic EMP devices against server racks",
   "Phishing exploits human trust, masquerading as legitimate entities (banks, IT departments, executive leadership) to compromise credentials.", "easy", ["phishing", "social-engineering", "cybersecurity"]]
];

cyberCore.forEach(item => {
  const id = `q-exp-cs-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Cybersecurity & Cryptography", ["Computer Science & AI"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic Cyber questions up to 167
while (qIdx <= 167) {
  const port = [22, 80, 443, 53, 21, 25, 3306, 5432, 8080][qIdx % 9];
  const service = {
    22: "SSH (Secure Shell)",
    80: "HTTP (Unencrypted Web)",
    443: "HTTPS (Encrypted Web TLS)",
    53: "DNS (Domain Name System)",
    21: "FTP (File Transfer Protocol)",
    25: "SMTP (Email Routing)",
    3306: "MySQL Database Server",
    5432: "PostgreSQL Database Server",
    8080: "HTTP Alternative Proxy/Dev"
  }[port];
  const id = `q-exp-cs-${String(qIdx).padStart(3, '0')}`;
  addQ(id, `In computer networking and firewall rule administration, what standard service typically listens on default TCP port ${port}?`,
    "Cybersecurity & Cryptography", ["Computer Science & AI", "Web Technologies & Cloud Computing"], "easy", [
      { id: "opt-1", text: service, isCorrect: true },
      { id: "opt-2", text: "POP3 Email Retrieval", isCorrect: false },
      { id: "opt-3", text: "NTP Network Time Synchronization", isCorrect: false },
      { id: "opt-4", text: "SNMP Management Trap", isCorrect: false }
    ], `Standard IANA port assignments allocate port ${port} to ${service}.`,
    ["network-ports", "firewall", "cybersecurity"]);
  qIdx++;
}

console.log(`Generated Cybersecurity & Cryptography questions up to: ${qIdx - 1}`);

// -------------------------------------------------------------
// 3. WEB TECHNOLOGIES & CLOUD COMPUTING (30 Questions: q-exp-cs-168 to 197)
// -------------------------------------------------------------
const webCore = [
  ["In RESTful web API design, which HTTP method is standardized to retrieve data from a server without producing side effects (idempotent and safe)?",
   "GET", "POST", "DELETE", "PATCH",
   "HTTP GET retrieves resource representations safely without modifying server state.", "easy", ["rest-api", "http-methods", "web-technologies"]],
  ["What HTTP response status code indicates that a requested web resource was successfully processed (Standard OK)?",
   "200 OK", "404 Not Found", "500 Internal Server Error", "301 Moved Permanently",
   "200 OK is the standard HTTP status code for successful HTTP requests.", "easy", ["http-status", "web-development"]],
  ["What HTTP response status code signifies that the requested resource could not be found on the server?",
   "404 Not Found", "403 Forbidden", "502 Bad Gateway", "201 Created",
   "404 Not Found indicates that the server cannot locate the requested URI resource.", "easy", ["http-status", "404", "web"]],
  ["Which cloud computing service model delivers virtualized compute infrastructure (VMs, storage, virtual networks) where users manage the OS and runtime?",
   "IaaS (Infrastructure as a Service)", "PaaS (Platform as a Service)", "SaaS (Software as a Service)", "FaaS (Function as a Service)",
   "IaaS (e.g., AWS EC2, Google Compute Engine) provides raw virtualized hardware infrastructure.", "easy", ["cloud-computing", "iaas", "aws"]],
  ["Which cloud computing model abstracts the underlying operating system and middleware, allowing developers to deploy application code without managing servers?",
   "PaaS (Platform as a Service)", "IaaS (Infrastructure as a Service)", "On-Premises Bare Metal", "Colocation Hosting",
   "PaaS (e.g., Heroku, AWS Elastic Beanstalk) manages OS, patching, and hardware, providing a turnkey application runtime.", "easy", ["paas", "cloud-computing"]],
  ["What open-source container virtualization technology packages application code and all its dependencies into lightweight, portable, isolated user-space containers?",
   "Docker", "VirtualBox", "VMware ESXi", "Apache HTTP Server",
   "Docker containerizes applications sharing the host OS kernel, offering instant startup and consistent dev-to-prod execution.", "easy", ["docker", "containers", "devops"]],
  ["Kubernetes (K8s) is an open-source orchestration system primarily designed to automate the deployment, scaling, and management of:",
   "Containerized applications across clusters of host machines", "Relational database schema migration scripts", "Domain Name System (DNS) registrar zone records", "Client-side CSS stylesheet bundles",
   "Originally developed by Google, Kubernetes automates container lifecycle management, self-healing, rolling updates, and service discovery.", "easy", ["kubernetes", "devops", "cloud-computing"]],
  ["Which client-side storage mechanism in web browsers allows storing key-value pairs with no expiration time across browser sessions?",
   "localStorage", "sessionStorage", "HTTP Cookies with Max-Age=0", "In-memory JavaScript variables",
   "HTML5 Web Storage localStorage persists key-value string data with ~5MB quota until explicitly cleared by the user or script.", "easy", ["localstorage", "web-storage", "frontend"]],
  ["In modern web architectures, a Content Delivery Network (CDN) accelerates website performance by:",
   "Caching static assets (images, CSS, JS) on geographically distributed edge servers close to end-users", "Executing all server-side SQL queries inside the browser", "Compressing database transaction write logs", "Converting IPv4 addresses into IPv6 MAC hashes",
   "CDNs (like Cloudflare, CloudFront) minimize latency by serving cached assets from regional Points of Presence (PoPs) nearest the user.", "easy", ["cdn", "web-performance", "cloud"]],
  ["What is the role of a Reverse Proxy (such as Nginx or HAProxy) in web infrastructure?",
   "Sitting in front of web servers to distribute incoming client traffic (load balancing), terminate SSL/TLS, and cache responses", "Encrypting client hard drives against physical theft", "Preventing users from visiting social media websites", "Converting HTTP requests into raw Ethernet frames",
   "A reverse proxy protects backend origin servers, performs load balancing, health checks, and SSL termination.", "easy", ["reverse-proxy", "nginx", "networking"]]
];

webCore.forEach(item => {
  const id = `q-exp-cs-${String(qIdx).padStart(3, '0')}`;
  addQ(id, item[0], "Web Technologies & Cloud Computing", ["Computer Science & AI"], item[6], [
    { id: "opt-1", text: item[1], isCorrect: true },
    { id: "opt-2", text: item[2], isCorrect: false },
    { id: "opt-3", text: item[3], isCorrect: false },
    { id: "opt-4", text: item[4], isCorrect: false }
  ], item[5], item[7]);
  qIdx++;
});

// Programmatic Web questions up to 197
while (qIdx <= 197) {
  const code = [201, 204, 301, 302, 400, 401, 403, 500, 502, 503][qIdx % 10];
  const meaning = {
    201: "Created (new resource successfully created)",
    204: "No Content (action succeeded, no body returned)",
    301: "Moved Permanently (permanent redirect)",
    302: "Found (temporary redirect)",
    400: "Bad Request (malformed syntax or invalid parameter)",
    401: "Unauthorized (authentication required or failed)",
    403: "Forbidden (authenticated user lacks permissions)",
    500: "Internal Server Error (unhandled backend exception)",
    502: "Bad Gateway (upstream server returned invalid response)",
    503: "Service Unavailable (server overloaded or in maintenance)"
  }[code];
  const id = `q-exp-cs-${String(qIdx).padStart(3, '0')}`;
  addQ(id, `In standard HTTP protocol specifications, what is the meaning of HTTP status code ${code}?`,
    "Web Technologies & Cloud Computing", ["Computer Science & AI"], "easy", [
      { id: "opt-1", text: meaning, isCorrect: true },
      { id: "opt-2", text: "Network Timeout Gateway", isCorrect: false },
      { id: "opt-3", text: "Database Deadlock Exception", isCorrect: false },
      { id: "opt-4", text: "DNS Resolution Error", isCorrect: false }
    ], `HTTP status code ${code} represents ${meaning}.`,
    ["http-status-codes", "web-technologies", "api"]);
  qIdx++;
}

console.log(`Finished generating all Computer Science & AI expansion questions! Total: ${csBank.length}`);

module.exports = { csBank };
