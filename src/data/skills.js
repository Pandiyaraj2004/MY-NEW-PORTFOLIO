export const skillCategories = [
  {
    id: "programming",
    name: "Core Programming",
    icon: "Code2",
    description: "Foundational languages used daily for systems logic, data manipulation, and web engineering.",
    skills: [
      { name: "Python", useCase: "Primary language for AI/ML pipelines, deep learning models, data preprocessing, and Flask backend microservices." },
      { name: "JavaScript (ES6+)", useCase: "Modern asynchronous frontend logic, React component state, DOM APIs, and Node.js backend services." },
      { name: "SQL", useCase: "Complex relational queries, indexing, CTEs, aggregation pipelines, and schema modeling." },
      { name: "HTML5 / Semantic Web", useCase: "Accessible, semantic document structures with clean SEO and ARIA compliance." },
      { name: "CSS3 / Modern Styling", useCase: "Glassmorphic interfaces, flexbox/grid layouts, keyframe animations, and design token integration." }
    ]
  },
  {
    id: "frontend",
    name: "Frontend Development",
    icon: "Layout",
    description: "Building responsive, high-performance, interactive user interfaces with rich aesthetics.",
    skills: [
      { name: "React.js", useCase: "Component-driven single page applications, custom hooks, context state management, and lifecycle optimization." },
      { name: "Responsive UI Design", useCase: "Mobile-first layouts adapting fluidly from 360px mobile viewports to 4K ultra-wide monitors." },
      { name: "Component Architecture", useCase: "Modular, decoupled UI design systems with reusable atomic design patterns." },
      { name: "Tailwind CSS", useCase: "Rapid, utility-first styling with custom design tokens, dark mode schemes, and micro-interactions." },
      { name: "Three.js / WebGL", useCase: "Interactive 3D particle systems, geometric canvas animations, and GPU-accelerated visuals." }
    ]
  },
  {
    id: "backend",
    name: "Backend & Systems",
    icon: "Server",
    description: "Designing reliable RESTful APIs, asynchronous services, and secure webhook pipelines.",
    skills: [
      { name: "Node.js", useCase: "High-concurrency asynchronous runtime powering backend microservices, file processing, and API gateways." },
      { name: "Express.js", useCase: "REST API route orchestration, middleware authentication, request validation, and error handling." },
      { name: "Flask", useCase: "Lightweight Python microframework for serving machine learning inference endpoints and CNN model APIs." },
      { name: "RESTful API Design", useCase: "Standardized HTTP endpoints with status codes, pagination, rate limiting, and structured JSON payloads." },
      { name: "Webhook Pipelines", useCase: "Idempotent event consumers with signature verification for payment status updates." }
    ]
  },
  {
    id: "databases",
    name: "Databases & Cloud Stores",
    icon: "Database",
    description: "Data persistence across relational databases and real-time cloud document stores.",
    skills: [
      { name: "Firebase / Firestore", useCase: "Real-time NoSQL document store, real-time client sync, and serverless authentication." },
      { name: "PostgreSQL & MySQL", useCase: "ACID-compliant relational storage, foreign key constraints, and transactional consistency." },
      { name: "Oracle SQL", useCase: "Enterprise relational database design, query optimization, and structured analytical reporting." },
      { name: "Supabase", useCase: "Modern backend-as-a-service with instant PostgreSQL APIs, row-level security, and auth." }
    ]
  },
  {
    id: "aiml",
    name: "AI, Machine Learning & NLP",
    icon: "Brain",
    description: "End-to-end intelligent systems, transfer learning, language models, and predictive analytics.",
    skills: [
      { name: "Generative AI & Gemini API", useCase: "Integrating LLM capabilities for automated document validation, contextual chat, and summarization." },
      { name: "RAG (Retrieval-Augmented)", useCase: "Context-grounded dialogue generation pairing vector retrieval with language models for zero hallucination." },
      { name: "NLP (spaCy / NLTK)", useCase: "Tokenization, lemmatization, named entity recognition (NER), and multi-class intent classification." },
      { name: "CNN & Transfer Learning", useCase: "MobileNetV2 image classification models fine-tuned with custom dropout and pooling layers in TensorFlow/Keras." },
      { name: "Pandas & NumPy", useCase: "Large-scale data manipulation, exploratory data analysis, matrix operations, and feature transformation." },
      { name: "Power BI & Visualization", useCase: "Interactive analytical dashboards visualizing KPIs, trend forecasts, and business metrics." }
    ]
  },
  {
    id: "tools",
    name: "Engineering Tools & Workflow",
    icon: "Wrench",
    description: "Modern developer toolchain ensuring code quality, version control, and rapid delivery.",
    skills: [
      { name: "Git & GitHub", useCase: "Branching strategies, pull requests, semantic versioning, and collaborative team reviews." },
      { name: "VS Code & PyCharm", useCase: "Primary IDEs configured with linters, debuggers, and rapid snippet workflows." },
      { name: "Jupyter Notebooks", useCase: "Interactive exploratory data analysis, model experimentation, and visual metric graphing." },
      { name: "Postman", useCase: "API endpoint testing, header configuration, authorization tokens, and automated test collections." },
      { name: "Figma", useCase: "Translating UX wireframes and product mockups into pixel-perfect frontend components." }
    ]
  }
];
