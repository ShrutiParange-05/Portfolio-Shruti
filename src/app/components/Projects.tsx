import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, Github, Shield, Briefcase, Mail, Code, MessageSquare, Sparkles, Home, Film, Search, Bot } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';

export function Projects() {
  const categories = ["All", "Gen AI projects", "AI security", "ML Models"];
  const [activeCategory, setActiveCategory] = useState("All");

  const projects = [
    {
      title: "JobSphere AI",
      category: "Gen AI projects",
      description: "Developed a career platform featuring an AI Resume Optimizer to generate ATS scores, keyword gaps, and STAR-method suggestions via Gemini 1.5 Flash. Built mock interviews and a Node.js/Prisma backend.",
      metric: "95% match accuracy (via synthetic QA evaluation)",
      icon: Briefcase,
      tech: ["Next.js", "Node.js", "Prisma", "Gemini AI"],
      gradient: "from-cyan-400 to-cyan-600",
      github: "https://github.com/ShrutiParange-05/JobsphereAI"
    },
    {
      title: "Guardian-AI",
      category: "AI security",
      description: "A production LLM security platform that stops AI attacks before they happen.",
      metric: "OWASP LLM Top 10 compliant (verified via LLM-Fuzzer)",
      icon: Shield,
      tech: ["React", "FastAPI", "LLM Security", "RAG", "PII Detection"],
      gradient: "from-cyan-400 to-cyan-600",
      github: "https://github.com/ShrutiParange-05/Guardian-AI"
    },
    {
      title: "House Price Prediction",
      category: "ML Models",
      description: "Advanced regression model for predicting urban real estate values with high precision.",
      metric: "94% R² Score",
      icon: Home,
      tech: ["Python", "Scikit-learn", "XGBoost", "Pandas"],
      gradient: "from-cyan-300 to-cyan-500",
      github: "https://github.com/ShrutiParange-05/House-Price-Prediction"
    },
    {
      title: "Phishing Threat Detection",
      category: "AI security",
      description: "92% accurate threat detection using fine-tuned BERT — because one missed phishing email costs millions.",
      metric: "92% accuracy (evaluated on public email datasets)",
      icon: Mail,
      tech: ["BERT", "NLP", "Scikit-learn", "Transformers"],
      gradient: "from-cyan-300 to-cyan-500",
      github: "#"
    },
    {
      title: "Movie Recommendation System",
      category: "ML Models",
      description: "Hybrid recommendation engine combining collaborative filtering and content-based approaches.",
      metric: "Top-10 Precision: 0.89",
      icon: Film,
      tech: ["Python", "Surprise", "NumPy", "Streamlit"],
      gradient: "from-cyan-400 to-cyan-600",
      github: "https://github.com/ShrutiParange-05/Movie_Recommendation_System"
    },
    {
      title: "ShieldAI",
      category: "AI security",
      description: "Privacy-first SAST tool using local Llama 3 via Ollama to detect OWASP Top 10 vulnerabilities in code with zero code exfiltration. Features an auto-remediation engine.",
      metric: "Detects SQLi, XSS vulnerabilities",
      icon: Code,
      tech: ["Llama 3", "Ollama", "Python", "Streamlit"],
      gradient: "from-cyan-400 to-cyan-600",
      github: "https://github.com/ShrutiParange-05/ShieldAI"
    },

    {
      title: "Customer Support RAG Bot",
      category: "Gen AI projects",
      description: "Production-grade RAG chatbot with ChromaDB semantic search and LangChain orchestration. Deployed via Docker/FastAPI with integrated RAGAS and MLflow observability.",
      metric: "Automated 80% of routine queries",
      icon: MessageSquare,
      tech: ["LangChain", "ChromaDB", "FastAPI", "HuggingFace", "Docker", "MLflow"],
      gradient: "from-cyan-400 to-cyan-600",
      github: "https://github.com/ShrutiParange-05/SupportShpere-Ai-Customer-Service-bot"
    }
  ];

  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Featured Projects<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Interactive gallery showcasing AI/ML projects categorized by domain expertise.
          </p>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-16">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 relative ${
                  activeCategory === category 
                    ? 'text-black' 
                    : 'text-gray-400 hover:text-cyan-400 border border-gray-700 hover:border-cyan-500/50'
                }`}
              >
                {activeCategory === category && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-cyan-400 rounded-full"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <span className="relative z-10">{category}</span>
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div 
          layout
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <AnimatePresence mode='popLayout'>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group h-full"
              >
                <Card className="bg-gray-900/50 border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden relative h-full flex flex-col">
                  <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                  
                  <CardHeader className="relative">
                    <div className="flex items-center justify-between mb-4">
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                        className={`p-3 rounded-full bg-gradient-to-r ${project.gradient} bg-opacity-20`}
                      >
                        <project.icon className="w-6 h-6 text-white" />
                      </motion.div>
                      <div className="flex space-x-2">
                        {project.github !== "#" ? (
                          <a href={project.github} target="_blank" rel="noopener noreferrer" title="View Source Code">
                            <Button size="sm" variant="ghost" className="text-gray-400 hover:text-cyan-400 p-2">
                              <Github size={18} />
                            </Button>
                          </a>
                        ) : (
                          <span className="text-xs text-gray-500 border border-gray-800 bg-gray-950/40 rounded px-2.5 py-1 flex items-center gap-1.5 cursor-default select-none font-medium" title="Private Codebase / Enterprise IP">
                            🔒 Private Code
                          </span>
                        )}
                      </div>
                    </div>
                    <CardTitle className="text-white group-hover:text-cyan-400 transition-colors duration-300">
                      {project.title}
                    </CardTitle>
                    <div className="text-xs font-bold text-cyan-500/80 uppercase tracking-widest mb-2">
                      {project.category}
                    </div>
                    <CardDescription className="text-gray-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent className="relative flex-grow flex flex-col justify-between">
                    <div className="mb-4 text-cyan-400 font-medium text-sm flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400"></span>
                      {project.metric}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}