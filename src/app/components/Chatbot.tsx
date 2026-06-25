import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

const botResponses = {
  skills: [
    "Shruti is highly proficient in Python, SQL, and React. On the AI side, she works extensively with Llama 3, LangChain, TensorFlow, and PyTorch—with a solid focus on AI Security and GenAI.",
    "She has strong expertise in Python and SQL for data/ML engineering, combined with LangChain, Llama 3, and RAG pipelines. She also builds frontends using React and Next.js!",
    "Her technical toolkit includes Python, SQL, React.js/Next.js, and GenAI frameworks like PyTorch, Hugging Face, and ChromaDB. She's particularly passionate about AI Security and LLM defense."
  ],
  experience: [
    "Recently, Shruti was an AI Security Intern at Audix Technology, where she built 'Guardian-AI' to secure LLMs against security vulnerabilities. She also has experience as a Data Analyst Intern at Cognifyz Technologies.",
    "She recently completed a stint as an AI Security Intern at Audix Technology (developing Guardian-AI) and worked as a Data Analyst Intern at Cognifyz Technologies earlier.",
    "Her professional experience includes working as an AI Security Intern at Audix Technology, focusing on LLM vulnerability testing and defenses, and a Data Analyst internship at Cognifyz Technologies."
  ],
  jobsphere: [
    "JobSphere AI is an AI-powered career platform she built. It features an AI Resume Optimizer powered by Gemini 1.5 Flash, developed with Next.js, Node.js, and Prisma.",
    "She created JobSphere AI, a smart career assistant with an AI Resume Optimizer utilizing Gemini 1.5 Flash, Next.js, and Node.js.",
    "JobSphere AI is one of her flagship Gen AI projects—a next-gen career platform featuring resume optimization using Gemini 1.5 Flash."
  ],
  supportsphere: [
    "The Customer Support RAG Bot is a production-ready chatbot using ChromaDB for semantic search and LangChain, deployed via Docker and FastAPI.",
    "She built a Customer Support RAG Bot utilizing ChromaDB and LangChain to provide context-aware answers, served via FastAPI and Docker.",
    "Her Customer Support RAG Bot is an optimized retrieval-augmented chatbot using ChromaDB, LangChain, and FastAPI for seamless customer service automation."
  ],
  agent: [
    "Shruti has built several AI agents, including a Multi-PDF ChatApp AI Agent that allows users to have conversational Q&A over multiple documents using RAG.",
    "She specializes in AI Agents. A great example is her Multi-PDF ChatApp AI Agent, which orchestrates document retrieval and natural language interaction.",
    "She loves building agents! The Multi-PDF ChatApp AI Agent is one of her builds, allowing document analysis and interactive chat via RAG."
  ],
  security: [
    "AI Security is Shruti's main focus. She developed Guardian-AI (an LLM Security Platform), ShieldAI for codebase vulnerability detection, and a BERT-based Phishing Detection system.",
    "She is passionate about LLM safety and security. Her work includes Guardian-AI, ShieldAI (code scanner), and BERT phishing detection.",
    "Her security portfolio includes Guardian-AI (designed to protect LLMs from jailbreaks/attacks), ShieldAI, and neural phishing detection."
  ],
  ml: [
    "In machine learning, she has built a House Price Prediction model (94% R² Score) and a Hybrid Movie Recommendation System using collaborative filtering.",
    "She's developed ML models like a House Price Predictor achieving a 94% R² score, and a collaborative filtering movie recommendation engine.",
    "Her ML portfolio features highly accurate predictive models, including a 94% R² house price predictor and a hybrid recommendation system."
  ],
  genai: [
    "Her Generative AI projects feature JobSphere AI, the Multi-PDF ChatApp Agent, and a Customer Support RAG Bot.",
    "She focuses on GenAI applications, building systems like JobSphere AI (resume optimizer) and LangChain-based RAG bots.",
    "In the GenAI space, she has designed and deployed RAG chatbots, career optimization platforms, and multi-document QA agents."
  ],
  projects: [
    "Shruti has projects across Gen AI (JobSphere, RAG Bot), AI Security (Guardian-AI, ShieldAI), and ML Models. Which of these areas would you like to explore?",
    "She has developed projects in Generative AI, LLM Security, and classical Machine Learning. Let me know if you want details on any specific project!",
    "Her portfolio showcases projects in GenAI, AI Security, and ML/DL. Which category can I tell you more about?"
  ],
  education: [
    "She graduated with a B.E. in Computer Engineering from TPCT's Terna Engineering College (Mumbai University) in May 2026, graduating with an outstanding CGPA of 9.0/10.0.",
    "Shruti completed her Computer Engineering degree at Terna Engineering College under Mumbai University in May 2026, achieving a 9.0/10.0 CGPA.",
    "She holds a Bachelor of Engineering in Computer Engineering from Terna Engineering College, graduating in May 2026 with a CGPA of 9.0/10.0."
  ],
  contact: [
    "You can reach out to her via email at shrutiparange5@gmail.com. You can also connect with her on LinkedIn!",
    "Feel free to email her at shrutiparange5@gmail.com or send a message right here on the contact form. She's also very active on LinkedIn!",
    "The best way to reach her is at shrutiparange5@gmail.com, or by connecting with her on LinkedIn. You can also drop a message using the form below!"
  ],
  greetings: [
    "Hello! I'm trained on all of Shruti's projects, including JobSphere, the Customer Support RAG Bot, and Guardian-AI. How can I help you today?",
    "Hi there! I can help you learn more about Shruti's projects, skills, experience, or education. What are you curious about?",
    "Hey! I'm Shruti's virtual assistant. Ask me anything about her work, projects, or how to get in touch!"
  ],
  resume: [
    "You can download her resume using the link in the Navbar or in the Hero section at the top of the page!",
    "Her complete resume is available for download at the top of the portfolio (in the navigation bar or hero banner).",
    "Sure! You can find the download link for her resume in the Navbar or the header section of this website."
  ],
  fallback: [
    "I'm not sure about that specific detail, but I'd love to tell you about her Gen AI projects (like JobSphere), her AI Security research, or her ML models. Just let me know what interests you!",
    "I might need more details on that! I can, however, share details about her internships, technical skills, or her RAG chatbots. What would you like to hear about?",
    "Interesting question! While I don't have details on that, I can talk about her B.E. in Computer Engineering, her Guardian-AI platform, or how to email her."
  ]
};

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hi! I'm Shruti's AI assistant. Ask me anything about her skills, experience, projects, or how to contact her!",
      sender: 'bot',
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getBotResponse = (input: string) => {
    const lowerInput = input.toLowerCase();
    const getRandomResponse = (arr: string[]) => arr[Math.floor(Math.random() * arr.length)];

    if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
      return getRandomResponse(botResponses.skills);
    } else if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('intern')) {
      return getRandomResponse(botResponses.experience);
    } else if (lowerInput.includes('jobsphere')) {
      return getRandomResponse(botResponses.jobsphere);
    } else if (lowerInput.includes('supportsphere') || lowerInput.includes('support sphere') || lowerInput.includes('customer service bot') || lowerInput.includes('support bot')) {
      return getRandomResponse(botResponses.supportsphere);
    } else if (lowerInput.includes('agent')) {
      return getRandomResponse(botResponses.agent);
    } else if (lowerInput.includes('security') || lowerInput.includes('guardian') || lowerInput.includes('shield')) {
      return getRandomResponse(botResponses.security);
    } else if (lowerInput.includes('ml model') || lowerInput.includes('prediction') || lowerInput.includes('recommend')) {
      return getRandomResponse(botResponses.ml);
    } else if (lowerInput.includes('gen ai') || lowerInput.includes('generative')) {
      return getRandomResponse(botResponses.genai);
    } else if (lowerInput.includes('project')) {
      return getRandomResponse(botResponses.projects);
    } else if (lowerInput.includes('education') || lowerInput.includes('study') || lowerInput.includes('college') || lowerInput.includes('degree')) {
      return getRandomResponse(botResponses.education);
    } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('hire') || lowerInput.includes('reach')) {
      return getRandomResponse(botResponses.contact);
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return getRandomResponse(botResponses.greetings);
    } else if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
      return getRandomResponse(botResponses.resume);
    } else {
      return getRandomResponse(botResponses.fallback);
    }
  };

  const handleSendQuickReply = (query: string, label: string) => {
    const userMsg: Message = { id: Date.now().toString(), text: `Tell me about your ${label.toLowerCase()}`, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);

    // Simulate typing delay
    setTimeout(() => {
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: getBotResponse(query), sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = { id: Date.now().toString(), text: inputValue, sender: 'user' };
    setMessages(prev => [...prev, userMsg]);
    setInputValue('');

    // Simulate typing delay
    setTimeout(() => {
      const botMsg: Message = { id: (Date.now() + 1).toString(), text: getBotResponse(userMsg.text), sender: 'bot' };
      setMessages(prev => [...prev, botMsg]);
    }, 600);
  };

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
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
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
            style={{ height: '500px', maxHeight: '80vh' }}
          >
            {/* Header */}
            <div className="bg-gray-800 p-4 border-b border-gray-700 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="bg-cyan-500/20 p-2 rounded-full">
                  <Bot size={20} className="text-cyan-400" />
                </div>
                <div>
                  <h3 className="text-white font-bold text-sm">Ask Shruti's AI</h3>
                  <p className="text-cyan-400 text-xs">Online</p>
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
                  <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${msg.sender === 'user'
                      ? 'bg-cyan-500 text-black rounded-tr-none'
                      : 'bg-gray-800 text-gray-200 rounded-tl-none border border-gray-700'
                    }`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Replies */}
            <div className="px-4 py-2.5 bg-gray-900 border-t border-gray-800 flex flex-wrap gap-2 justify-center">
              {[
                { label: "Skills 🛠️", query: "skills" },
                { label: "Experience 💼", query: "experience" },
                { label: "Education 🎓", query: "education" },
                { label: "Contact ✉️", query: "contact" }
              ].map((chip) => (
                <button
                  key={chip.label}
                  type="button"
                  onClick={() => handleSendQuickReply(chip.query, chip.label)}
                  className="px-3 py-1 bg-gray-800 hover:bg-cyan-500/10 text-cyan-400 hover:text-cyan-300 text-xs rounded-full border border-cyan-500/30 transition-all cursor-pointer select-none font-semibold hover:border-cyan-500/60"
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
                  placeholder="Ask something..."
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
