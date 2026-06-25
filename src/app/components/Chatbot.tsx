import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Bot } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'bot' | 'user';
}

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

    if (lowerInput.includes('skill') || lowerInput.includes('tech') || lowerInput.includes('stack')) {
      return "Shruti is highly skilled in Python, SQL, and React. Her AI toolkit includes Llama 3, LangChain, TensorFlow, and PyTorch, with a specialized focus on AI Security and Generative AI.";
    } else if (lowerInput.includes('experience') || lowerInput.includes('work') || lowerInput.includes('intern')) {
      return "She recently worked as an AI Security Intern at Audix Technology building 'Guardian-AI' to defend LLMs against attacks. She also has experience as a Data Analyst Intern at Cognifyz Technologies.";
    } else if (lowerInput.includes('jobsphere')) {
      return "JobSphere AI is an AI-powered career platform featuring an AI Resume Optimizer using Gemini 1.5 Flash, built with Next.js, Node.js, and Prisma.";
    } else if (lowerInput.includes('supportsphere') || lowerInput.includes('support sphere') || lowerInput.includes('customer service bot') || lowerInput.includes('support bot')) {
      return "Customer Support RAG Bot is a production-grade RAG chatbot with ChromaDB semantic search and LangChain orchestration, deployed via Docker and FastAPI.";
    } else if (lowerInput.includes('agent')) {
      return "Shruti builds AI agents! Her portfolio includes the Multi-PDF ChatApp AI Agent, which enables natural language conversations across documents using RAG.";
    } else if (lowerInput.includes('security') || lowerInput.includes('guardian') || lowerInput.includes('shield')) {
      return "AI Security is her core expertise. Projects include Guardian-AI (an LLM Security Platform), ShieldAI for catching code vulnerabilities, and a BERT-based Phishing Detection system.";
    } else if (lowerInput.includes('ml model') || lowerInput.includes('prediction') || lowerInput.includes('recommend')) {
      return "In the ML Models category, she has developed a House Price Prediction model (94% R² Score) and a Hybrid Movie Recommendation System using collaborative filtering.";
    } else if (lowerInput.includes('gen ai') || lowerInput.includes('generative')) {
      return "Her Gen AI portfolio includes JobSphere AI and the Customer Support RAG Bot.";
    } else if (lowerInput.includes('project')) {
      return "Shruti has projects across 3 main categories: Gen AI (JobSphere, Customer Support RAG Bot), AI Security (Guardian-AI, ShieldAI), and ML Models (House Price Prediction). Which category would you like to hear more about?";
    } else if (lowerInput.includes('education') || lowerInput.includes('study') || lowerInput.includes('college') || lowerInput.includes('degree')) {
      return "She completed her B.E. in Computer Engineering from TPCT's Terna Engineering College (Mumbai University) in May 2026 with an outstanding CGPA of 9.0/10.0.";
    } else if (lowerInput.includes('contact') || lowerInput.includes('email') || lowerInput.includes('hire') || lowerInput.includes('reach')) {
      return "You can reach out to her via email at shrutiparange5@gmail.com or call her at +91 8767441729. You can also connect with her on LinkedIn!";
    } else if (lowerInput.includes('hello') || lowerInput.includes('hi') || lowerInput.includes('hey')) {
      return "Hello! I'm trained on all of Shruti's projects, including JobSphere, the Customer Support RAG Bot, and Guardian-AI. How can I help you today?";
    } else if (lowerInput.includes('resume') || lowerInput.includes('cv')) {
      return "You can download her resume from the Navbar or the Hero section. It contains full details on her AI Security and Gen AI expertise!";
    } else {
      return "I'm not sure about that specific detail, but I can tell you about her Gen AI projects (like JobSphere and the Customer Support RAG Bot), her AI Security research, or her ML models. Just ask!";
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
