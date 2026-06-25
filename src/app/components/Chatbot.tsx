import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

// ─────────────────────────────────────────────
// KNOWLEDGE BASE — sourced from GitHub READMEs
// ─────────────────────────────────────────────
const KB = {
  // PROFILE
  profile: [
    "Shruti Parange is an AI Engineer & Researcher specialising in AI Security, LLM safety, and Generative AI. She graduated in May 2026 with a B.E. in Computer Engineering from Terna Engineering College (Mumbai University) — CGPA 9.11/10.0.",
    "She's a Computer Engineering graduate (May 2026, CGPA 9.11) who sits at the intersection of machine learning and cybersecurity — designing intelligent systems that are powerful *and* secure.",
  ],

  // SKILLS / TECH STACK
  skills: [
    "Her core stack: Python, SQL, JavaScript, C++. AI/ML: TensorFlow, PyTorch, Scikit-learn, Hugging Face Transformers. GenAI: LangChain, RAG pipelines, Prompt Engineering, Llama 3. Web: React.js, Next.js, Node.js, FastAPI, Flask. Data: Pandas, NumPy, Pinecone, FAISS, ChromaDB, PostgreSQL. DevOps: Docker, Git, MLflow, Vercel.",
    "She's strongest in Python-based AI/ML engineering and LLM security. Her GenAI toolkit includes LangChain, RAG, Hugging Face, and Llama 3. For backends she uses FastAPI or Node.js, and for frontends React/Next.js.",
  ],

  // ─── PROJECTS ───────────────────────────────

  // Guardian-AI
  guardian: [
    "🛡️ **Guardian-AI** (github.com/ShrutiParange-05/Guardian-AI) is a full-stack LLM Security Platform built with React.js + FastAPI + PostgreSQL.\n\nKey features:\n• LLM Firewall — blocks prompt injections, jailbreaks, adversarial inputs in real-time\n• Red Teaming Suite — automated attack scenarios (DAN, System Prompt Override, SQL Injection)\n• PII Scanner & DLP — scans and redacts sensitive data from prompts and responses\n• Agent Safety Monitor — prevents dangerous AI-agent actions (unauthorised file access, system commands)\n• RAG Poisoning Lab — experiment environment for RAG attack mitigations\n• Interactive Security Dashboard — metrics, attack stats, system health\n\nCompliant with OWASP LLM Top 10. Reduced threat detection latency by ~40%.",
    "Guardian-AI was built during her AI Security Internship at Audix Technology (Dec 2025 – Feb 2026). Stack: React.js · FastAPI · PostgreSQL · SQLAlchemy · JWT auth · Pydantic · Bcrypt · PyPDF. It's OWASP LLM Top 10 compliant and verified via LLM-Fuzzer.",
  ],

  // ShieldAI
  shield: [
    "🔍 **ShieldAI** (github.com/ShrutiParange-05/ShieldAI) is a Next-Gen Static Application Security Testing (SAST) tool powered by Llama 3 via Ollama — 100% local, zero code exfiltration.\n\nFeatures:\n• AI-powered scanning detects logic flaws (Insecure Deserialization, Broken Access Control) that regex scanners miss\n• Detects full OWASP Top 10 vulnerabilities including SQLi and XSS\n• 'Chat with Code' security tutor — explains *why* code is dangerous\n• Auto-remediation engine — instantly generates secure, refactored code (e.g. replaces os.system with subprocess)\n\nStack: Python · Streamlit · Llama 3 · Ollama",
    "ShieldAI uses a local Llama 3 model (via Ollama) so source code never leaves your machine. It's an enterprise-grade SAST tool with auto-remediation — not just vulnerability detection.",
  ],

  // ThreatLens
  threatlens: [
    "🎯 **ThreatLens** (github.com/ShrutiParange-05/-ThreatLens-AI-SOC-using-OLLMA) is a local, privacy-first AI-powered SOC (Security Operations Center) analyst platform.\n\nFeatures:\n• Local LLM integration (Ollama / Llama 3) for offline threat analysis\n• RAG pipeline over uploaded security policy PDFs\n• Privacy Guard — middleware redacts PII (IPs, emails) *before* LLM inference\n• Red Team Simulator (BAS) — launch simulated attacks (SQLi, DDoS, Ransomware) from UI\n• 3D Attack Map — visualises threat origins via geopolitical data\n• Real-time log monitoring\n\nStack: Streamlit · LangChain · Ollama · FAISS · PyDeck · Plotly · FPDF",
  ],

  // JobSphere AI
  jobsphere: [
    "💼 **JobSphere AI** (github.com/ShrutiParange-05/JobsphereAI) is a full-stack AI-powered career platform.\n\nFeatures:\n• AI Resume Optimizer — generates ATS scores, keyword gap analysis, STAR-method suggestions using Gemini 1.5 Flash\n• AI Mock Interview module\n• Node.js / Prisma backend with full user auth\n\nStack: Next.js · Node.js · Prisma · Gemini 1.5 Flash · PostgreSQL\nMetric: 95% match accuracy (via synthetic QA evaluation)",
    "JobSphere AI uses Google's Gemini 1.5 Flash to power an ATS-aware resume optimiser. It generates keyword gaps and STAR-method improvement suggestions tailored to job descriptions.",
  ],

  // Customer Support RAG Bot
  supportsphere: [
    "🤖 **Customer Support RAG Bot** (github.com/ShrutiParange-05/SupportShpere-Ai-Customer-Service-bot) is a production-grade RAG chatbot.\n\nArchitecture: User → FastAPI → LangChain RAG Chain → ChromaDB (top-3 chunk retrieval) → Mistral/OpenAI LLM → Response\n\nFeatures:\n• ChromaDB semantic vector search with MiniLM-L6-v2 embeddings\n• 512-token chunking strategy\n• RAGAS evaluation framework for answer quality scoring\n• MLflow experiment tracking\n• Dockerised deployment\n• Premium web dashboard\n\nStack: LangChain · ChromaDB · FastAPI · HuggingFace · Mistral/OpenAI · RAGAS · MLflow · Docker\nMetric: Automated 80% of routine customer queries",
    "The RAG Bot uses a LangChain RetrievalQA chain over a ChromaDB vector store. Each query retrieves the top-3 relevant chunks, then passes them as context to the LLM. Answer quality is tracked via RAGAS and MLflow.",
  ],

  // Multi-PDF ChatApp
  pdfchat: [
    "📄 **Multi-PDF ChatApp AI Agent** allows conversational Q&A over multiple uploaded documents using a RAG pipeline. Users can chat naturally with the content of several PDFs simultaneously — powered by LangChain and vector embeddings.",
  ],

  // PulseAI / Health Prediction
  health: [
    "🏥 **PulseAI — Health Prediction App** (github.com/ShrutiParange-05/Health-Prediction-App) is a clinical-grade patient health tracking and diagnostic prediction platform.\n\nPredicts risks for: Diabetes (Fasting Glucose ≥126 mg/dL), Anemia (Hb <12.0 g/dL), Cardiovascular disease (Cholesterol ≥240 mg/dL)\n\nFeatures:\n• BioMistral-7B (Hugging Face) for clinical AI remarks from biomedical literature\n• Full patient CRUD with search, sort, filter, pagination\n• Interactive biomarker gauges with colour-coded risk levels (Green/Yellow/Red)\n• Real-time dual-layer form validation (frontend + Pydantic backend)\n\nStack: FastAPI · SQLite · SQLAlchemy · React.js · Vite · Vanilla CSS",
  ],

  // House Price Prediction
  houseprice: [
    "🏠 **House Price Prediction** (github.com/ShrutiParange-05/House-Price-Prediction) is an advanced regression model for urban real estate value prediction.\n\nStack: Python · Scikit-learn · XGBoost · Pandas\nMetric: 94% R² Score — one of her strongest classical ML results.",
  ],

  // Movie Recommendation
  movie: [
    "🎬 **Movie Recommendation System** (github.com/ShrutiParange-05/Movie_Recommendation_System) is a hybrid engine combining collaborative filtering and content-based approaches for personalised movie recommendations.\n\nStack: Python · Surprise · NumPy · Streamlit\nMetric: Top-10 Precision of 0.89",
  ],

  // Phishing Detection
  phishing: [
    "📧 **Phishing Threat Detection** — Fine-tuned BERT model for email/URL phishing detection.\n\nStack: BERT · NLP · Scikit-learn · Transformers (Hugging Face)\nMetric: 92% accuracy on public email datasets",
  ],

  // Data Breach Prediction
  databreach: [
    "💰 **Data Breach Cost Prediction** (github.com/ShrutiParange-05/Data-breach-cost-prediction) is an ML model that predicts the financial cost of data breaches. Built with Python.",
  ],

  // ─── EXPERIENCE ────────────────────────────
  experience: [
    "📌 **Work Experience:**\n\n1. **AI Security Intern** @ Audix Technology · Mumbai (Dec 2025 – Feb 2026)\n   Built Guardian-AI: a full-stack LLM security platform (React + FastAPI) defending against 4 adversarial attack vectors. Reduced threat detection latency by ~40%. OWASP LLM Top 10 compliant.\n\n2. **Data Analyst Intern** @ Cognifyz Technologies · Remote (June 2025 – July 2025)\n   Ran a 9-task EDA pipeline on restaurant datasets using Python (Pandas, NumPy, Matplotlib) — including geospatial clustering, NLP sentiment analysis, and price-range correlation.",
    "She has two internships: AI Security at Audix Technology (where she built Guardian-AI) and Data Analysis at Cognifyz Technologies (EDA on restaurant datasets with geospatial clustering and NLP).",
  ],

  // ─── EDUCATION ─────────────────────────────
  education: [
    "🎓 **B.E. Computer Engineering** — TPCT's Terna Engineering College, Mumbai University\nDuration: Nov 2022 – May 2026\nCGPA: 9.11 / 10.0",
  ],

  // ─── PUBLICATIONS ──────────────────────────
  publications: [
    "📚 **Publications & Achievements:**\n\n1. **Blockchain Kaigi (BCK) 2025** — Paper accepted: 'Privacy-Preserving Decentralised Finance using Zero-Knowledge Machine Learning (ZKML)'. Research covers verifiable inference for DeFi credit scoring without revealing model weights.\n\n2. **CRC Press Contribution** — Abstract accepted for 'Mathematical Advances of AI in Healthcare' book, at the intersection of AI and medical mathematics.",
    "She's published research on ZKML for DeFi at Blockchain Kaigi 2025 and contributed to a CRC Press healthcare AI book.",
  ],

  // ─── CONTACT ───────────────────────────────
  contact: [
    "📬 **Contact Shruti:**\n• Email: shrutiparange5@gmail.com\n• LinkedIn: linkedin.com/in/shruti-parange-b9a02b341\n• GitHub: github.com/ShrutiParange-05\n\nShe's open to full-time AI/ML roles, research collaborations, and freelance projects. Typically responds within 24 hours.",
  ],

  // ─── RESUME ────────────────────────────────
  resume: [
    "Her resume is available for download at the top of the page — look for the 'Download Resume' button in the Hero section or Navbar.",
  ],

  // ─── GREETINGS ─────────────────────────────
  greetings: [
    "Hi! 👋 I'm Shruti's AI assistant, trained on her GitHub READMEs and portfolio. Ask me about any of her projects (Guardian-AI, ShieldAI, ThreatLens, JobSphere, RAG Bot, PulseAI...), her skills, experience, publications, or how to contact her!",
    "Hello! I can tell you anything about Shruti's work — her LLM security research, Gen AI projects, ML models, internships, or academic publications. What would you like to explore?",
  ],

  // ─── FALLBACK ──────────────────────────────
  fallback: [
    "I'm not sure about that specific detail! I can tell you about Shruti's projects (Guardian-AI, ShieldAI, ThreatLens, JobSphere AI, RAG Bot, PulseAI, House Price Predictor, Movie Recommender), her internships at Audix Technology & Cognifyz, her ZKML research, or how to reach her. What would you like to know?",
    "Hmm, I don't have that info — but I'm well-versed in her AI Security work (Guardian-AI, ShieldAI, ThreatLens), GenAI projects (JobSphere, RAG Bot), ML models, and publications. Try asking about any of those!",
  ],
};

// ─────────────────────────────────────────────
// INTENT MATCHER
// ─────────────────────────────────────────────
function getBotResponse(input: string): string {
  const t = input.toLowerCase();
  const rand = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

  // Project-specific — check most specific first
  if (t.match(/guardian/))                                              return rand(KB.guardian);
  if (t.match(/shield\s?ai|shieldai/))                                  return rand(KB.shield);
  if (t.match(/threatlens|threat\s?lens|soc|ollama|ollma/))             return rand(KB.threatlens);
  if (t.match(/jobsphere|job\s?sphere|jobsphereai|ats|resume\s?optim/)) return rand(KB.jobsphere);
  if (t.match(/support\s?sphere|supportshpere|rag\s?bot|customer\s?support|chroma|chromadb/)) return rand(KB.supportsphere);
  if (t.match(/pdf\s?chat|multi.?pdf|chatapp/))                         return rand(KB.pdfchat);
  if (t.match(/pulseai|pulse\s?ai|health|medical|diabetes|anemia|cholesterol|biomistral/)) return rand(KB.health);
  if (t.match(/house\s?price|real\s?estate|housing/))                   return rand(KB.houseprice);
  if (t.match(/movie|recommend|film|collaborative/))                     return rand(KB.movie);
  if (t.match(/phishing|bert|email\s?detect/))                          return rand(KB.phishing);
  if (t.match(/data\s?breach|breach\s?cost/))                           return rand(KB.databreach);

  // Broad categories
  if (t.match(/project|portfolio|built|made|creat|develop/))            return rand(KB.guardian); // lead with best project
  if (t.match(/security|llm\s?security|ai\s?security|owasp|jailbreak|prompt\s?inject/)) return rand(KB.guardian);
  if (t.match(/gen\s?ai|generative|rag|langchain|llm|llama/))           return rand(KB.supportsphere);
  if (t.match(/ml|machine\s?learn|model|predict|scikit|xgboost/))       return rand(KB.houseprice);

  // Skills / tech stack
  if (t.match(/skill|tech|stack|tool|language|framework|python|react|fastapi|pytorch|tensorflow/)) return rand(KB.skills);

  // Experience / work
  if (t.match(/intern|experience|work|job|audix|cognifyz|employ/))      return rand(KB.experience);

  // Education
  if (t.match(/educat|study|college|degree|university|terna|cgpa|gpa/)) return rand(KB.education);

  // Publications / research
  if (t.match(/paper|publish|research|publication|blockchain\s?kaigi|bck|zkml|zero.knowledge|crc\s?press|healthcare/)) return rand(KB.publications);

  // Contact / hire
  if (t.match(/contact|email|hire|reach|connect|available|open\s?to/))  return rand(KB.contact);

  // Resume / CV
  if (t.match(/resume|cv|download/))                                     return rand(KB.resume);

  // About / profile
  if (t.match(/who|shruti|about|tell me|introduc/))                      return rand(KB.profile);

  // Greetings
  if (t.match(/hello|hi\b|hey\b|good\s?(morning|afternoon|evening)/))   return rand(KB.greetings);

  return rand(KB.fallback);
}

// ─────────────────────────────────────────────
// COMPONENT
// ─────────────────────────────────────────────
export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! 👋 I'm Shruti's AI assistant, trained on her GitHub projects. Ask me about Guardian-AI, ShieldAI, ThreatLens, JobSphere AI, the RAG Bot, PulseAI, her skills, internships, or research!",
      sender: 'bot',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const sendMessage = (text: string) => {
    const userMsg: Message = { id: Date.now().toString(), text, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const botMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        sender: 'bot',
      };
      setMessages(prev => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    sendMessage(inputValue);
    setInputValue('');
  };

  const quickReplies = [
    { label: "🛡️ Guardian-AI",    query: "Tell me about Guardian-AI"         },
    { label: "💼 JobSphere AI",   query: "Tell me about JobSphere AI"         },
    { label: "🔍 ShieldAI",       query: "Tell me about ShieldAI"             },
    { label: "🎯 ThreatLens",     query: "Tell me about ThreatLens"           },
    { label: "🤖 RAG Bot",        query: "Tell me about the Customer Support RAG Bot" },
    { label: "🏥 PulseAI",        query: "Tell me about PulseAI health app"   },
    { label: "📚 Publications",   query: "Tell me about her research papers"  },
    { label: "📬 Contact",        query: "How can I contact Shruti?"          },
  ];

  return (
    <>
      {/* Floating Button */}
      <motion.button
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className={`fixed bottom-6 right-6 w-16 h-16 rounded-full bg-gray-900 border-2 border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.5)] z-50 ${isOpen ? 'hidden' : 'flex'} items-center justify-center cursor-pointer`}
      >
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          className="text-3xl"
        >
          🤖
        </motion.div>
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
          className="absolute -inset-2 border-2 border-dashed border-cyan-500/50 rounded-full"
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-6 right-6 w-80 sm:w-96 bg-gray-900 border border-gray-700 rounded-xl shadow-2xl z-50 flex flex-col overflow-hidden"
            style={{ height: '560px', maxHeight: '85vh' }}
          >
            {/* Header */}
            <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-500/20 p-2 rounded-full">
                  <Bot size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Ask Shruti's AI</h3>
                  <p className="text-cyan-400 text-xs">Trained on GitHub READMEs</p>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div
                    className={`max-w-[85%] p-3 rounded-2xl text-sm whitespace-pre-line ${
                      msg.sender === 'user'
                        ? 'bg-cyan-500 text-black rounded-tr-none'
                        : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                    }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-gray-800 border border-gray-700 rounded-2xl rounded-tl-none px-4 py-3 text-gray-400 text-sm flex gap-1 items-center">
                    <span className="animate-bounce [animation-delay:0ms]">●</span>
                    <span className="animate-bounce [animation-delay:150ms]">●</span>
                    <span className="animate-bounce [animation-delay:300ms]">●</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-3 py-2 bg-gray-900 border-t border-gray-800 flex flex-wrap gap-1.5 justify-center">
              {quickReplies.map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => sendMessage(chip.query)}
                  className="px-2.5 py-1 bg-gray-800 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 text-xs rounded-full border border-cyan-500/30 transition-all cursor-pointer select-none font-medium hover:border-cyan-500/60"
                >
                  {chip.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-gray-800 border-t border-gray-700">
              <form onSubmit={handleSendMessage} className="flex space-x-2">
                <input
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="Ask about any project..."
                  className="flex-1 bg-gray-900 text-white placeholder-gray-400 text-sm rounded-lg px-4 py-2 border border-gray-700 focus:outline-none focus:border-cyan-500 transition-colors"
                />
                <button
                  type="submit"
                  disabled={!inputValue.trim()}
                  className="bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-700 disabled:text-gray-500 text-black p-2 rounded-lg transition-colors flex items-center justify-center cursor-pointer"
                >
                  <Send size={18} />
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
