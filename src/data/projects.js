export const projects = [
  {
    id: "serviconnect",
    number: "01",
    title: "ServiConnect — AI-Powered Service Marketplace",
    category: "Full-Stack & Generative AI",
    badge: "Full-Stack · AI Platform",
    tagline: "Connecting customers with verified local service providers across 13 service categories in Tier 2/3 Indian cities.",
    tech: ["React.js", "Node.js", "Express.js", "Firebase", "Gemini AI", "OpenStreetMap", "Vercel"],
    stats: [
      { label: "Service Categories", value: "13+" },
      { label: "Target Regions", value: "Tier 2/3 Cities" },
      { label: "Product Blueprint", value: "16 Pages" },
      { label: "Verification Speed", value: "Real-Time AI" }
    ],
    overview: "ServiConnect is a comprehensive full-stack ecosystem designed to bridge the digital divide for local service technicians, artisans, and contractors. Built with a responsive React frontend and resilient Express/Node backend with Firebase real-time state synchronization.",
    problem: "In semi-urban and Tier 2/3 markets, service discovery relies on informal word-of-mouth with zero standardized vetting, opaque pricing, and language barriers.",
    solution: "A localized platform with automated AI-assisted skill verification, multilingual chat translation, precise geo-mapping via OpenStreetMap, and structured request dispatching.",
    architecture: [
      "Frontend: React.js with modular component tree, geolocation hooks, and responsive mobile-first UI.",
      "Backend: RESTful API server on Express.js handling auth, quote generation, and provider ranking.",
      "AI Engine: Gemini AI integration for analyzing provider certificates, experience documents, and natural language request matching.",
      "Database & Sync: Firebase Firestore for real-time order lifecycle events, notifications, and location tracking."
    ],
    keyContributions: [
      "Engineered the complete 16-page technical product blueprint and architectural wireframes.",
      "Implemented Gemini AI verification pipeline to inspect tradesperson qualifications automatically.",
      "Integrated OpenStreetMap API for hyper-local radius matching and interactive provider discovery.",
      "Built resilient Firebase state management for live booking status, pricing estimates, and customer ratings."
    ],
    outcome: "Created a scalable blueprint for empowering unorganized labor markets with automated validation, zero platform friction, and transparent consumer matching.",
    github: "https://github.com/Pandiyaraj2004",
    demo: "https://serviconnect-seven.vercel.app/",
    color: "from-blue-600 to-cyan-500",
    accent: "#3b82f6"
  },
  {
    id: "liquiflow",
    number: "02",
    title: "LiquiFlow — Post-Authorization Treasury Middleware",
    category: "Fintech & Payment Systems",
    badge: "Fintech · Middleware",
    tagline: "Post-authorization treasury middleware platform modeling high-volume settlement and refund workflows.",
    tech: ["React.js", "Vite", "Tailwind CSS", "Node.js", "Express.js", "Firestore", "Gemini AI"],
    stats: [
      { label: "Lifecycle Steps", value: "6 Stages" },
      { label: "Settlement Mode", value: "Automated Batch" },
      { label: "Audit Precision", value: "100% Immutable" },
      { label: "AI Insights", value: "Anomaly Detection" }
    ],
    overview: "LiquiFlow simulates and orchestrates what happens after a payment card is authorized: ledger entry creation, webhook reconciliation, scheduled merchant settlement batching, and automated dispute/refund dispatching.",
    problem: "Real-world payment failures, mismatched settlement windows, and manual refund interventions lead to reconciliation overhead and liquidity bottlenecks for merchant acquiring platforms.",
    solution: "An automated treasury middleware simulation platform featuring asynchronous webhook ingestion, dynamic fee calculation, state machine reconciliation, and AI-driven liquidity forecasting.",
    architecture: [
      "State Machine: Deterministic multi-phase transaction lifecycles (AUTHORIZED -> CAPTURED -> SETTLED / REFUNDED).",
      "Webhook Ingestion: Idempotent event consumer handling duplicate transaction callbacks safely.",
      "AI Co-pilot: Gemini AI anomaly inspection flagging irregular refund velocity and settlement delays.",
      "Data Store: Cloud Firestore with indexed collections for instant audit trails and merchant ledger views."
    ],
    keyContributions: [
      "Architected deterministic 6-phase state transitions preventing double-settlement anomalies.",
      "Designed real-time event log viewer for monitoring webhook delivery latencies and payload verification.",
      "Built interactive simulation dashboard enabling engineers to trigger simulated chargebacks and test refund flows.",
      "Integrated Firebase Authentication with role-based access control for merchant vs. treasury operator roles."
    ],
    outcome: "Demonstrated deep domain expertise in payment gateways, post-authorization reconciliation, webhook reliability, and automated treasury workflows.",
    github: "https://github.com/Pandiyaraj2004",
    demo: "https://liquiflow-new.vercel.app/",
    color: "from-indigo-600 to-purple-500",
    accent: "#6366f1"
  },
  {
    id: "paylink",
    number: "03",
    title: "Paylink — Digital Payment Link & Checkout System",
    category: "Fintech & Web Applications",
    badge: "Fintech · Live App",
    tagline: "Instant digital payment link generator and checkout interface with real-time transaction confirmation and ledger tracking.",
    tech: ["React.js", "Firebase", "Firestore", "REST APIs", "Tailwind CSS", "Webhooks"],
    stats: [
      { label: "Deployment", value: "Firebase Hosting" },
      { label: "Generation", value: "Instant Links" },
      { label: "Database", value: "Cloud Firestore" },
      { label: "Interface", value: "Mobile Optimized" }
    ],
    overview: "Paylink enables merchants and individuals to generate secure, customizable digital payment links on-demand, shareable across messaging channels with real-time transaction confirmation and ledger tracking.",
    problem: "Small businesses and sellers struggle with clunky checkout setups and delayed invoice reconciliation when collecting payments remotely.",
    solution: "A streamlined web platform creating instant payment links with dedicated checkout portals, real-time database updates, and receipt dispatching.",
    architecture: [
      "Frontend: React.js single-page application with responsive mobile-first payment UI.",
      "Cloud Backend: Firebase Hosting & Firestore real-time database managing dynamic link states.",
      "Transaction Logic: Dynamic parameter parsing, payment tokenization, and status polling.",
      "Security: Input validation, secure token routing, and transaction audit trails."
    ],
    keyContributions: [
      "Engineered responsive checkout portal optimized for seamless mobile and desktop payment experiences.",
      "Implemented real-time Firestore synchronization for instantaneous payment state transitions.",
      "Designed modular link generation workflow with customizable billing amounts and customer metadata.",
      "Deployed live production application on Firebase hosting infrastructure."
    ],
    outcome: "Delivered a fast, frictionless payment link solution providing instant checkout experiences and transparent tracking.",
    github: "https://github.com/Pandiyaraj2004",
    demo: "https://paylink-b3f30.web.app/",
    color: "from-emerald-600 to-teal-500",
    accent: "#10b981"
  },
  {
    id: "selfcook",
    number: "04",
    title: "SelfCook — Image-Based Recipe Extraction & Automation",
    category: "Computer Vision & Automation",
    badge: "AI Vision · Automation",
    tagline: "Computer vision and web automation system that extracts ingredients from food photographs and fetches recipes.",
    tech: ["Node.js", "Puppeteer", "Imagga API", "Edamam API", "Google Lens", "SQL"],
    stats: [
      { label: "Extraction Speed", value: "Sub-second" },
      { label: "Vision Confidence", value: ">90% Accuracy" },
      { label: "Scraping Throughput", value: "100+ recipes/session" },
      { label: "Nutrition Parsing", value: "Automated Cal/Macro" }
    ],
    overview: "SelfCook combines visual AI and intelligent web scraping. Users upload an image of any dish, which is classified by visual AI models to extract key ingredients and dynamically trigger headless browser workflows to retrieve ranked cooking recipes, preparation steps, and macronutrient breakdowns.",
    problem: "Identifying recipes from food photos typically requires manual ingredient guesswork, disjointed Google searches, and visiting ad-heavy recipe blogs with poor usability.",
    solution: "An automated end-to-end pipeline taking a food photograph, classifying ingredients via Imagga Vision API, executing Puppeteer headless browser extraction, and structuring recipes through the Edamam Nutrition API.",
    architecture: [
      "Vision Pipeline: Imagga AI REST endpoint detecting dish composition and ingredient tags.",
      "Headless Crawler: Puppeteer script with stealth headers extracting steps and cook time from top recipe sources.",
      "Nutrition Engine: Edamam API parsing total calories, macronutrients, and allergen warnings.",
      "Caching Layer: Local JSON/SQL storage of common queries to prevent redundant external API calls."
    ],
    keyContributions: [
      "Engineered robust Node.js backend managing asynchronous API calls to Imagga and Edamam simultaneously.",
      "Implemented headless Puppeteer automation with custom retry mechanisms and DOM selectors handling dynamic web layouts.",
      "Built clean React-based user interface with drag-and-drop image upload and instant ingredient tag editing.",
      "Optimized payload responses by filtering extraneous CSS and advertisements from scraped recipe data."
    ],
    outcome: "Successfully automated recipe retrieval with high visual classification accuracy, eliminating manual search overhead for food enthusiasts.",
    github: "https://github.com/Pandiyaraj2004",
    demo: null,
    color: "from-amber-600 to-orange-500",
    accent: "#f97316"
  },
  {
    id: "crop-disease",
    number: "05",
    title: "Smart Crop Disease Prediction & Health Monitoring",
    category: "Deep Learning & Computer Vision",
    badge: "Computer Vision · CNN",
    tagline: "Deep learning crop pathology classification system with an integrated natural language advisory chatbot for agricultural treatments.",
    tech: ["Python", "TensorFlow", "Keras", "MobileNetV2", "OpenCV", "Flask", "NLP"],
    stats: [
      { label: "Model Accuracy", value: "~85% Test Acc" },
      { label: "Disease Classes", value: "38 Categories" },
      { label: "Inference Latency", value: "<100ms" },
      { label: "Advisory Mode", value: "Real-time NLP" }
    ],
    overview: "An AI-powered diagnostic and advisory platform for agriculture. Farmers upload leaf photographs to detect bacterial, fungal, or viral infections across 38 crop types and query the integrated NLP bot for actionable treatment protocols.",
    problem: "Delayed plant disease identification causes significant crop yield losses, while rural farmers lack direct access to agronomists and plant pathology labs.",
    solution: "Lightweight transfer learning CNN architecture (MobileNetV2) trained on plant pathology datasets, fine-tuned with custom pooling and dropout layers, paired with a natural language treatment advisor.",
    architecture: [
      "Image Pipeline: OpenCV preprocessing, resizing (224x224), normalization, and spatial augmentation (rotations, zooms, flips).",
      "Model Architecture: MobileNetV2 feature extractor -> GlobalAveragePooling2D -> Dropout(0.25) -> Dense Softmax (38 classes).",
      "Advisory Engine: Rule-based & contextual NLP chatbot translating technical pathology results into natural language remedy instructions.",
      "Serving Layer: Flask microservice serving real-time inference with sub-100ms response times."
    ],
    keyContributions: [
      "Trained and evaluated deep learning models in TensorFlow/Keras, achieving ~85% classification accuracy across 38 distinct classes.",
      "Implemented aggressive image augmentation pipelines improving test set generalization by 15%.",
      "Exported optimized .h5 weights and built lightweight Flask inference endpoints with real-time confidence scores.",
      "Integrated natural language dialogue system allowing farmers to ask follow-up questions regarding pesticide dosage and prevention."
    ],
    outcome: "Delivered a lightweight, highly accurate diagnostic tool accessible on mobile devices for real-time agricultural disease prevention.",
    github: "https://github.com/Pandiyaraj2004",
    demo: null,
    color: "from-amber-500 to-emerald-500",
    accent: "#f59e0b"
  },
  {
    id: "nlp-chatbot",
    number: "06",
    title: "Real-Time NLP Conversational Intelligence System",
    category: "Natural Language Processing",
    badge: "NLP · Conversational AI",
    tagline: "Context-aware conversational system combining intent recognition, named entity extraction, and RAG retrieval architecture.",
    tech: ["Python", "NLTK", "spaCy", "RAG", "LLMs", "Flask", "REST APIs"],
    stats: [
      { label: "Intent Matching", value: "Multi-class Classification" },
      { label: "Entity Extraction", value: "spaCy NER" },
      { label: "Context Window", value: "Session-aware" },
      { label: "Latency", value: "<80ms Response" }
    ],
    overview: "A modular, scalable NLP dialogue engine designed for intelligent domain-specific customer assistance. Combines tokenization, POS tagging, semantic matching, and vector retrieval to generate context-grounded responses.",
    problem: "Standard rule-based chatbots fail when user phrasing deviates, while ungrounded LLMs hallucinate inaccurate domain answers.",
    solution: "A hybrid NLP pipeline pairing spaCy intent/entity extraction with Retrieval-Augmented Generation (RAG) knowledge search and REST API delivery.",
    architecture: [
      "Preprocessing: NLTK tokenization, lemmatization, stop-word removal, and n-gram vectorization.",
      "NER Engine: spaCy named entity recognition for dates, locations, service categories, and ticket IDs.",
      "RAG Architecture: Document chunking and semantic similarity lookup for deterministic knowledge retrieval.",
      "API Layer: Flask RESTful service with session caching and websocket integration for instant typing feedback."
    ],
    keyContributions: [
      "Built multi-layer text classification pipeline handling diverse semantic phrasing without intent degradation.",
      "Constructed custom NER extractors to parse technical parameters and transactional identifiers.",
      "Implemented RAG retrieval pipeline ensuring zero hallucinations for factual organizational queries.",
      "Designed clean, responsive web interface featuring typing indicators, chat history preservation, and quick-reply chips."
    ],
    outcome: "Engineered a production-ready conversational architecture capable of delivering accurate, context-aware dialogues with high throughput.",
    github: "https://github.com/Pandiyaraj2004/Real-time-chatbot-using-NLP",
    demo: null,
    color: "from-violet-600 to-pink-500",
    accent: "#8b5cf6"
  }
];
