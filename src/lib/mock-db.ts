export interface Party {
  id: string;
  name: string;
  fullName: string;
  color: string;
  hex: string;
}

export interface Candidate {
  id: string;
  name: string;
  party: string;
  partyColor: string;
  state: string;
  constituency: string;
  age: number;
  education: string;
  experience: string;
  electionType: string;
  manifesto: string[];
  avatarUrl: string;
}

export const mockParties: Party[] = [
  { id: "p1", name: "TVK", fullName: "Tamilaga Vettri Kazhagam", color: "bg-yellow-500", hex: "#eab308" },
  { id: "p2", name: "DMK", fullName: "Dravida Munnetra Kazhagam", color: "bg-red-600", hex: "#dc2626" },
  { id: "p3", name: "AIADMK", fullName: "All India Anna Dravida Munnetra Kazhagam", color: "bg-green-600", hex: "#16a34a" },
  { id: "p4", name: "BJP", fullName: "Bharatiya Janata Party", color: "bg-orange-500", hex: "#f97316" },
  { id: "p5", name: "INC", fullName: "Indian National Congress", color: "bg-blue-600", hex: "#2563eb" },
  { id: "p6", name: "AAP", fullName: "Aam Aadmi Party", color: "bg-blue-400", hex: "#60a5fa" },
  { id: "p7", name: "TMC", fullName: "Trinamool Congress", color: "bg-emerald-500", hex: "#10b981" },
  { id: "p8", name: "Shiv Sena", fullName: "Shiv Sena", color: "bg-orange-600", hex: "#ea580c" },
  { id: "p9", name: "NCP", fullName: "Nationalist Congress Party", color: "bg-cyan-600", hex: "#0891b2" },
  { id: "p10", name: "BRS", fullName: "Bharat Rashtra Samithi", color: "bg-pink-500", hex: "#ec4899" },
  { id: "p11", name: "YSRCP", fullName: "Yuvajana Sramika Rythu Congress Party", color: "bg-indigo-500", hex: "#6366f1" },
  { id: "p12", name: "TDP", fullName: "Telugu Desam Party", color: "bg-yellow-400", hex: "#facc15" },
  { id: "p13", name: "SP", fullName: "Samajwadi Party", color: "bg-red-500", hex: "#ef4444" },
  { id: "p14", name: "RJD", fullName: "Rashtriya Janata Dal", color: "bg-green-500", hex: "#22c55e" },
  { id: "p15", name: "JDU", fullName: "Janata Dal (United)", color: "bg-green-700", hex: "#15803d" },
  { id: "p16", name: "SAD", fullName: "Shiromani Akali Dal", color: "bg-blue-800", hex: "#1e40af" },
  { id: "p17", name: "BJD", fullName: "Biju Janata Dal", color: "bg-green-600", hex: "#16a34a" },
  { id: "p18", name: "JMM", fullName: "Jharkhand Mukti Morcha", color: "bg-green-800", hex: "#166534" },
  { id: "p19", name: "NPP", fullName: "National People's Party", color: "bg-yellow-600", hex: "#ca8a04" },
  { id: "p20", name: "NDPP", fullName: "Nationalist Democratic Progressive Party", color: "bg-red-400", hex: "#f87171" },
];

export const mockCandidates: Candidate[] = [
  // Tamil Nadu
  { id: "c1", name: "Thalapathy Vijay", party: "TVK", partyColor: "bg-yellow-500", state: "Tamil Nadu", constituency: "Chennai South", age: 50, education: "B.Sc. Visual Communications (Hon.)", experience: "Party President, Actor, Philanthropist", electionType: "State Assembly", manifesto: ["Eradicate corruption in state governance", "Equal opportunities in education and employment", "Focus on youth empowerment and anti-drug campaigns"], avatarUrl: "/candidates/c1.jpg" },
  { id: "c2", name: "K. Kanimozhi", party: "DMK", partyColor: "bg-red-600", state: "Tamil Nadu", constituency: "Thoothukudi", age: 56, education: "M.A. Economics", experience: "Member of Parliament, Poet, Journalist", electionType: "Lok Sabha", manifesto: ["State autonomy and federalism", "Abolition of NEET for Tamil Nadu students", "Implementation of the Sethusamudram project"], avatarUrl: "/candidates/c2.jpg" },
  { id: "c3", name: "Edappadi K. Palaniswami", party: "AIADMK", partyColor: "bg-green-600", state: "Tamil Nadu", constituency: "Edappadi", age: 69, education: "B.Sc. (Discontinued)", experience: "Former Chief Minister of Tamil Nadu", electionType: "State Assembly", manifesto: ["Continuation of Amma's welfare schemes", "Protection of river water rights for farmers", "Infrastructure development in rural sectors"], avatarUrl: "/candidates/c3.jpg" },
  { id: "c4", name: "K. Annamalai", party: "BJP", partyColor: "bg-orange-500", state: "Tamil Nadu", constituency: "Coimbatore", age: 39, education: "MBA (IIM Lucknow), Former IPS Officer", experience: "State President, BJP Tamil Nadu", electionType: "Lok Sabha", manifesto: ["Zero tolerance towards corruption and rowdyism", "Bringing central government schemes directly to beneficiaries", "Industrial growth and startup ecosystem in Coimbatore"], avatarUrl: "/candidates/c4_fixed.jpg" },

  // Kerala
  { id: "c5", name: "Shashi Tharoor", party: "INC", partyColor: "bg-blue-600", state: "Kerala", constituency: "Thiruvananthapuram", age: 68, education: "Ph.D. from Fletcher School", experience: "Member of Parliament, Former UN Diplomat", electionType: "Lok Sabha", manifesto: ["Global integration of local tech hubs", "Preservation of constitutional values", "Enhanced education and healthcare access"], avatarUrl: "/candidates/c5.jpg" },
  { id: "c6", name: "Pinarayi Vijayan", party: "CPI(M)", partyColor: "bg-red-600", state: "Kerala", constituency: "Dharmadam", age: 78, education: "B.A. Economics", experience: "Chief Minister of Kerala", electionType: "State Assembly", manifesto: ["Socialist economic policies", "Secularism and pluralism", "Robust public healthcare and education systems"], avatarUrl: "/candidates/c6.jpg" },

  // Karnataka
  { id: "c7", name: "D. K. Shivakumar", party: "INC", partyColor: "bg-blue-600", state: "Karnataka", constituency: "Kanakapura", age: 61, education: "M.A. Political Science", experience: "Deputy Chief Minister of Karnataka", electionType: "State Assembly", manifesto: ["Irrigation and water management projects", "Urban infrastructure development in Bengaluru", "Farmers' welfare and debt relief"], avatarUrl: "/candidates/c7.jpg" },
  { id: "c8", name: "Tejasvi Surya", party: "BJP", partyColor: "bg-orange-500", state: "Karnataka", constituency: "Bengaluru South", age: 33, education: "B.A. LL.B.", experience: "Member of Parliament, BJP Youth Wing President", electionType: "Lok Sabha", manifesto: ["Bengaluru tech infrastructure revamp", "National security and cultural heritage", "Youth entrepreneurship programs"], avatarUrl: "/candidates/c8.jpg" },

  // Telangana
  { id: "c9", name: "A. Revanth Reddy", party: "INC", partyColor: "bg-blue-600", state: "Telangana", constituency: "Kodangal", age: 54, education: "B.A.", experience: "Chief Minister of Telangana", electionType: "State Assembly", manifesto: ["Implementation of Six Guarantees", "Job creation and filling government vacancies", "Agrarian relief and support"], avatarUrl: "/candidates/c9.jpg" },
  { id: "c10", name: "K. T. Rama Rao", party: "BRS", partyColor: "bg-pink-500", state: "Telangana", constituency: "Sircilla", age: 47, education: "M.Sc., MBA", experience: "Former IT Minister", electionType: "State Assembly", manifesto: ["IT and industrial growth", "Telangana self-respect and regional development", "Urban infrastructure expansion"], avatarUrl: "/candidates/c10.jpg" },

  // Andhra Pradesh
  { id: "c11", name: "N. Chandrababu Naidu", party: "TDP", partyColor: "bg-yellow-400", state: "Andhra Pradesh", constituency: "Kuppam", age: 73, education: "M.A. Economics", experience: "Chief Minister of Andhra Pradesh", electionType: "State Assembly", manifesto: ["Development of Amaravati as state capital", "Wealth creation and tech investments", "Super Six welfare schemes"], avatarUrl: "/candidates/c11.jpg" },
  { id: "c12", name: "Y. S. Jagan Mohan Reddy", party: "YSRCP", partyColor: "bg-indigo-500", state: "Andhra Pradesh", constituency: "Pulivendula", age: 51, education: "B.Com", experience: "Former Chief Minister of Andhra Pradesh", electionType: "State Assembly", manifesto: ["Navaratnalu welfare schemes", "Decentralized administration", "Direct benefit transfers to marginalized groups"], avatarUrl: "/candidates/c12.jpg" },

  // Maharashtra
  { id: "c13", name: "Uddhav Thackeray", party: "Shiv Sena", partyColor: "bg-orange-600", state: "Maharashtra", constituency: "Mumbai", age: 63, education: "B.A.", experience: "Former Chief Minister of Maharashtra", electionType: "State Assembly", manifesto: ["Marathi pride and regional identity", "Farmers' rights and loan waivers", "Urban development in MMR region"], avatarUrl: "/candidates/c13.jpg" },
  { id: "c14", name: "Devendra Fadnavis", party: "BJP", partyColor: "bg-orange-500", state: "Maharashtra", constituency: "Nagpur South West", age: 53, education: "LL.B.", experience: "Deputy Chief Minister of Maharashtra", electionType: "State Assembly", manifesto: ["Water grid project for drought-prone areas", "Rapid infrastructure and metro development", "Industrial investment attraction"], avatarUrl: "/candidates/c14.jpg" },

  // Delhi
  { id: "c15", name: "Arvind Kejriwal", party: "AAP", partyColor: "bg-blue-400", state: "Delhi", constituency: "New Delhi", age: 55, education: "B.Tech. Mechanical Engineering (IIT Kharagpur)", experience: "Chief Minister of Delhi", electionType: "State Assembly", manifesto: ["Free electricity and water", "World-class public schools and Mohalla Clinics", "Women's safety and free bus rides"], avatarUrl: "/candidates/c15.jpg" },
  { id: "c16", name: "Manoj Tiwari", party: "BJP", partyColor: "bg-orange-500", state: "Delhi", constituency: "North East Delhi", age: 53, education: "M.P.Ed.", experience: "Member of Parliament, Singer/Actor", electionType: "Lok Sabha", manifesto: ["Cleaning the Yamuna river", "Infrastructure development in unauthorized colonies", "Aligning Delhi with central welfare schemes"], avatarUrl: "/candidates/c16_fixed.jpg" },

  // Uttar Pradesh
  { id: "c17", name: "Yogi Adityanath", party: "BJP", partyColor: "bg-orange-500", state: "Uttar Pradesh", constituency: "Gorakhpur Urban", age: 51, education: "B.Sc. Mathematics", experience: "Chief Minister of Uttar Pradesh", electionType: "State Assembly", manifesto: ["Strict law and order implementation", "Expressways and infrastructure development", "Cultural tourism and religious corridor development"], avatarUrl: "/candidates/c17.jpg" },
  { id: "c18", name: "Akhilesh Yadav", party: "SP", partyColor: "bg-red-500", state: "Uttar Pradesh", constituency: "Karhal", age: 50, education: "M.E. Environmental Engineering", experience: "Former Chief Minister of UP", electionType: "State Assembly", manifesto: ["Social justice and caste census", "Employment for youth and laptops distribution", "Support for farmers and small businesses"], avatarUrl: "/candidates/c18.jpg" },
  { id: "c19", name: "Rahul Gandhi", party: "INC", partyColor: "bg-blue-600", state: "Uttar Pradesh", constituency: "Raebareli", age: 53, education: "M.Phil. Development Studies (Cambridge)", experience: "Former Congress President, Member of Parliament", electionType: "Lok Sabha", manifesto: ["Nationwide caste census and social justice", "Legal guarantee for Minimum Support Price (MSP)", "Right to Apprenticeship for youth"], avatarUrl: "/candidates/c19.jpg" },

  // West Bengal
  { id: "c20", name: "Mamata Banerjee", party: "TMC", partyColor: "bg-emerald-500", state: "West Bengal", constituency: "Bhabanipur", age: 69, education: "M.A. Islamic History, LL.B.", experience: "Chief Minister of West Bengal", electionType: "State Assembly", manifesto: ["Kanyashree and Lakshmir Bhandar schemes", "Protection of secularism and state rights", "Industrial revival and employment"], avatarUrl: "/candidates/c20.jpg" },
  { id: "c21", name: "Suvendu Adhikari", party: "BJP", partyColor: "bg-orange-500", state: "West Bengal", constituency: "Nandigram", age: 53, education: "M.A.", experience: "Leader of Opposition in WB Assembly", electionType: "State Assembly", manifesto: ["Anti-corruption drive and transparency", "Industrialization and job creation", "Implementation of central schemes like Ayushman Bharat"], avatarUrl: "/candidates/c21.jpg" },

  // Bihar
  { id: "c22", name: "Nitish Kumar", party: "JDU", partyColor: "bg-green-700", state: "Bihar", constituency: "Nalanda", age: 73, education: "B.Sc. Engineering", experience: "Chief Minister of Bihar", electionType: "State Assembly", manifesto: ["Special category status for Bihar", "Women empowerment and prohibition", "Infrastructure and rural electrification"], avatarUrl: "/candidates/c22.jpg" },
  { id: "c23", name: "Tejashwi Yadav", party: "RJD", partyColor: "bg-green-500", state: "Bihar", constituency: "Raghopur", age: 34, education: "9th Pass", experience: "Former Deputy Chief Minister of Bihar", electionType: "State Assembly", manifesto: ["10 lakh government jobs for youth", "Caste census and social justice", "Improved healthcare and education infrastructure"], avatarUrl: "/candidates/c23.jpg" },

  // Gujarat
  { id: "c24", name: "Bhupendra Patel", party: "BJP", partyColor: "bg-orange-500", state: "Gujarat", constituency: "Ghatlodia", age: 61, education: "Diploma in Civil Engineering", experience: "Chief Minister of Gujarat", electionType: "State Assembly", manifesto: ["Vibrant Gujarat global investments", "Narmada water management", "Renewable energy and smart cities"], avatarUrl: "/candidates/c24.jpg" },
  { id: "c25", name: "Shaktisinh Gohil", party: "INC", partyColor: "bg-blue-600", state: "Gujarat", constituency: "Ahmedabad", age: 63, education: "LL.M.", experience: "Member of Parliament (Rajya Sabha), GPCC President", electionType: "State Assembly", manifesto: ["Relief for farmers and MSP guarantee", "Quality public education and healthcare", "Tackling inflation and unemployment"], avatarUrl: "/candidates/c25.jpg" },

  // New Additions - Tamil Nadu
  { id: "c26", name: "M.K. Stalin", party: "DMK", partyColor: "bg-red-600", state: "Tamil Nadu", constituency: "Kolathur", age: 71, education: "B.A. History", experience: "Chief Minister of Tamil Nadu", electionType: "State Assembly", manifesto: ["Dravidian Model Governance", "Welfare schemes for women and students", "Industrial development in Tamil Nadu"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/2/20/M._K._Stalin.jpg" },
  
  // New Additions - Punjab
  { id: "c27", name: "Bhagwant Mann", party: "AAP", partyColor: "bg-blue-400", state: "Punjab", constituency: "Dhuri", age: 50, education: "B.Com (Dropout)", experience: "Chief Minister of Punjab", electionType: "State Assembly", manifesto: ["Free electricity upto 300 units", "Eradication of drug menace", "Mohalla clinics for Punjab"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/a/ab/Bhagwant_Mann_2022.jpg" },
  { id: "c28", name: "Charanjit Singh Channi", party: "INC", partyColor: "bg-blue-600", state: "Punjab", constituency: "Chamkaur Sahib", age: 61, education: "Ph.D.", experience: "Former Chief Minister of Punjab", electionType: "State Assembly", manifesto: ["Dalit empowerment", "Job creation for Punjabi youth", "Sand mafia eradication"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/a/a2/Charanjit_Singh_Channi.jpg" },
  { id: "c29", name: "Sukhbir Singh Badal", party: "SAD", partyColor: "bg-blue-800", state: "Punjab", constituency: "Jalalabad", age: 61, education: "MBA", experience: "Former Deputy CM of Punjab", electionType: "State Assembly", manifesto: ["Panthic agenda", "Agricultural development", "Water rights for Punjab"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/4/4e/Sukhbir_Singh_Badal_%28cropped%29.jpg" },
  
  // New Additions - Rest of India
  { id: "c30", name: "Ashok Gehlot", party: "INC", partyColor: "bg-blue-600", state: "Rajasthan", constituency: "Sardarpura", age: 72, education: "M.A. Economics", experience: "Former Chief Minister of Rajasthan", electionType: "State Assembly", manifesto: ["Chiranjeevi Health Insurance scheme", "Old Pension Scheme (OPS) implementation", "Social security pensions"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e3/Ashok_Gehlot.jpg" },
  { id: "c31", name: "Vasundhara Raje", party: "BJP", partyColor: "bg-orange-500", state: "Rajasthan", constituency: "Jhalrapatan", age: 71, education: "B.A. Hons", experience: "Former Chief Minister of Rajasthan", electionType: "State Assembly", manifesto: ["Women empowerment schemes", "Industrial and infrastructural growth", "Zero tolerance on corruption"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/9/96/Rajasthan_CM_-_Vasundhara_Raje.jpg" },
  { id: "c32", name: "K. Chandrashekar Rao", party: "BRS", partyColor: "bg-pink-500", state: "Telangana", constituency: "Gajwel", age: 70, education: "M.A.", experience: "Former Chief Minister of Telangana", electionType: "State Assembly", manifesto: ["Rythu Bandhu and Rythu Bima", "Dalit Bandhu implementation", "Irrigation projects expansion"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/e/ef/KCR_Official_Portrait.jpg" },
  { id: "c33", name: "Siddaramaiah", party: "INC", partyColor: "bg-blue-600", state: "Karnataka", constituency: "Varuna", age: 76, education: "B.Sc., LL.B.", experience: "Chief Minister of Karnataka", electionType: "State Assembly", manifesto: ["Anna Bhagya and Gruha Jyothi schemes", "AHINDA empowerment", "Bengaluru infrastructure revamp"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/Siddaramaiah_2023.png" },
  { id: "c34", name: "Himanta Biswa Sarma", party: "BJP", partyColor: "bg-orange-500", state: "Assam", constituency: "Jalukbari", age: 55, education: "Ph.D.", experience: "Chief Minister of Assam", electionType: "State Assembly", manifesto: ["Orunodoi scheme expansion", "Action against illegal immigration", "Microfinance loan waivers"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/d/da/Himanta_Biswa_Sarma_in_2025.jpg" },
  { id: "c35", name: "Naveen Patnaik", party: "BJD", partyColor: "bg-green-600", state: "Odisha", constituency: "Hinjili", age: 77, education: "B.A. Arts", experience: "Chief Minister of Odisha", electionType: "State Assembly", manifesto: ["KALIA scheme for farmers", "Biju Swasthya Kalyan Yojana", "Women empowerment via Mission Shakti"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Naveen_Patnaik_2024.jpg" },
  { id: "c36", name: "Hemant Soren", party: "JMM", partyColor: "bg-green-800", state: "Jharkhand", constituency: "Barhait", age: 48, education: "B.Tech (Dropout)", experience: "Chief Minister of Jharkhand", electionType: "State Assembly", manifesto: ["Tribal rights and Sarna code", "Abua Awas Yojana for housing", "Reservation policies expansion"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/c/c5/Hemant_Soren_2020.jpg" },
  { id: "c37", name: "Pema Khandu", party: "BJP", partyColor: "bg-orange-500", state: "Arunachal Pradesh", constituency: "Mukto", age: 44, education: "B.A. History", experience: "Chief Minister of Arunachal Pradesh", electionType: "State Assembly", manifesto: ["Border infrastructure development", "Tourism promotion", "Hydropower projects"], avatarUrl: "/candidates/c37.jpg" },
  { id: "c38", name: "Conrad Sangma", party: "NPP", partyColor: "bg-yellow-600", state: "Meghalaya", constituency: "South Tura", age: 46, education: "MBA", experience: "Chief Minister of Meghalaya", electionType: "State Assembly", manifesto: ["FOCUS scheme for farmers", "Youth employment initiatives", "IT and tourism sector growth"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Conrad_Sangma.jpg" },
  { id: "c39", name: "Pramod Sawant", party: "BJP", partyColor: "bg-orange-500", state: "Goa", constituency: "Sanquelim", age: 50, education: "BAMS", experience: "Chief Minister of Goa", electionType: "State Assembly", manifesto: ["Swayampurna Goa initiative", "Sustainable mining resumption", "Infrastructure and tourism boost"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/1/15/Pramod_Sawant_2023.jpg" },
  { id: "c40", name: "Pushkar Singh Dhami", party: "BJP", partyColor: "bg-orange-500", state: "Uttarakhand", constituency: "Champawat", age: 48, education: "LL.B.", experience: "Chief Minister of Uttarakhand", electionType: "State Assembly", manifesto: ["Uniform Civil Code implementation", "Strict anti-conversion laws", "Pilgrimage and temple corridor developments"], avatarUrl: "/candidates/c40.jpg" },
  { id: "c41", name: "Bhupesh Baghel", party: "INC", partyColor: "bg-blue-600", state: "Chhattisgarh", constituency: "Patan", age: 62, education: "M.A.", experience: "Former Chief Minister of Chhattisgarh", electionType: "State Assembly", manifesto: ["Nyay schemes for farmers", "Procurement of minor forest produce", "Preservation of Chhattisgarhi culture"], avatarUrl: "https://upload.wikimedia.org/wikipedia/commons/e/e0/Bhupesh_Baghel.jpg" },
  { id: "c42", name: "Manik Saha", party: "BJP", partyColor: "bg-orange-500", state: "Tripura", constituency: "Town Bordowali", age: 71, education: "MDS", experience: "Chief Minister of Tripura", electionType: "State Assembly", manifesto: ["Tripura Sundari temple corridor", "Employment for youth", "Peace and development in tribal areas"], avatarUrl: "/candidates/c42.jpg" }
];

export const mockTimelines = [
  { id: "t1", date: "2026-03-15", event: "Election Commission Notification", type: "event", description: "Official notification for State Assembly Elections in Tamil Nadu." },
  { id: "t2", date: "2026-03-25", event: "Last Date for Filing Nominations", type: "deadline", description: "Candidates must submit their Form 26 and affidavits." },
  { id: "t3", date: "2026-04-10", event: "Campaigning Ends", type: "deadline", description: "Silence period begins 48 hours before polling." },
  { id: "t4", date: "2026-04-12", event: "Voting Day (Phase 1)", type: "critical", description: "Polling across 234 constituencies in Tamil Nadu from 7 AM to 6 PM." },
  { id: "t5", date: "2026-05-02", event: "Counting of Votes", type: "critical", description: "Results declaration by the Election Commission of India (ECI)." },
];

export const mockLiveResults = [
  { party: "DMK Alliance", votes: 14500000, percentage: 41.5, color: "#dc2626" },
  { party: "AIADMK Alliance", votes: 12200000, percentage: 35.0, color: "#16a34a" },
  { party: "TVK", votes: 5200000, percentage: 14.8, color: "#eab308" },
  { party: "BJP Alliance", votes: 2100000, percentage: 6.0, color: "#f97316" },
  { party: "Others / NTK", votes: 940000, percentage: 2.7, color: "#94a3b8" },
];

export const mockFaqs = [
  { q: "How do I register to vote online in India?", a: "You can register online using the Voter Helpline App or the Election Commission of India's NVSP portal by filling out Form 6. You will need proof of age and address." },
  { q: "What is Form 26?", a: "Form 26 is an affidavit filed by the candidate during nomination, detailing their assets, liabilities, educational qualifications, and criminal records (if any)." },
  { q: "Can I vote if I don't have my Voter ID (EPIC) card?", a: "Yes, if your name is on the electoral roll, you can vote using alternate approved documents like an Aadhaar Card, PAN Card, Passport, or Driving License." },
  { q: "What is a VVPAT machine?", a: "Voter Verifiable Paper Audit Trail (VVPAT) is an independent verification system attached to EVMs that allows voters to verify that their vote was cast correctly." },
  { q: "What are the different types of elections in India?", a: "The main elections are Lok Sabha (General Elections), Rajya Sabha (Upper House), State Assembly (Vidhan Sabha), and Local Body Elections (Municipalities and Panchayats)." },
];
