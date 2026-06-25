import React from 'react';
import { motion } from 'motion/react';
import { Briefcase, GraduationCap, TrendingUp } from 'lucide-react';

export function Experience() {
  const experiences = [
    {
      title: "AI Security Intern",
      company: "Audix Technology · Mumbai, India",
      period: "Dec 2025 – Feb 2026 · 3 months",
      description: "Developed GuardianAI, a full-stack AI security platform using React.js and FastAPI to protect LLMs against 4 adversarial attack vectors (prompt injection, jailbreaking, PII leakage, RAG poisoning) — reducing threat detection latency by ~40%. Built monitoring and validation logic for secure LLM workflows.",
      icon: Briefcase,
      skills: ["React.js", "FastAPI", "Python", "LLM Security", "OWASP"]
    },
    {
      title: "Data Analyst Intern",
      company: "Cognifyz Technologies · India (Remote)",
      period: "June 2025 – July 2025 · 2 months",
      description: "Performed EDA and data preprocessing across a 9-task pipeline on restaurant datasets using Python (Pandas, NumPy, Matplotlib), including geospatial clustering, NLP-based sentiment analysis, and price-range correlation. Prepared charts and structured insights to support data-driven decision-making.",
      icon: TrendingUp,
      skills: ["Python", "Pandas", "Matplotlib", "NLP", "Data Visualization"]
    },
    {
      title: "B.E. Computer Engineering",
      company: "TPCT's Terna Engineering College",
      period: "Nov 2022 – May 2026",
      description: "University of Mumbai. CGPA: 9.11 / 10.0",
      icon: GraduationCap,
      skills: []
    }
  ];

  return (
    <section id="experience" className="py-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Experience Timeline<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-gray-400 text-lg">
            My journey in data science and AI engineering
          </p>
        </motion.div>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-1 h-full bg-cyan-500/30 rounded-full" />

          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.3 }}
              viewport={{ once: true }}
              className={`relative flex items-center mb-16 ${index % 2 === 0 ? 'justify-end md:justify-start' : 'justify-end'
                }`}
            >
              {/* Timeline node */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: index * 0.3 + 0.5, duration: 0.5 }}
                viewport={{ once: true }}
                className="absolute left-4 md:left-1/2 transform -translate-x-1/2 w-4 h-4 bg-cyan-400 rounded-full border-4 border-gray-900 z-10"
              />

              {/* Content card */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`w-[85%] sm:w-[80%] md:w-5/12 ${index % 2 === 0 ? 'md:mr-auto' : 'md:ml-auto'}`}
              >
                <div className="bg-gray-900/80 backdrop-blur-sm border border-gray-700/50 rounded-lg p-6 hover:border-cyan-500/50 transition-all duration-300">
                  <div className="flex items-center mb-4">
                    <div className="p-2 bg-cyan-500/10 rounded-full mr-4">
                      <exp.icon className="w-6 h-6 text-cyan-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white">{exp.title}</h3>
                      <p className="text-cyan-400">{exp.company}</p>
                    </div>
                  </div>

                  <p className="text-cyan-300 text-sm mb-3">{exp.period}</p>
                  <p className="text-gray-300 mb-4">{exp.description}</p>

                  <div className="flex flex-wrap gap-2">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 bg-cyan-500/10 text-cyan-300 rounded-full text-sm border border-cyan-500/30"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}