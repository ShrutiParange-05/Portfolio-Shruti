import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, ArrowRight, Linkedin, Github } from 'lucide-react';
import resumePdf from '../../assets/ShrutiParange_resume.pdf';

export function Hero() {
  const words = ["AI/ML Engineer", "ML Engineer"];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentText, setCurrentText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const word = words[currentWordIndex];
    let timeoutId: NodeJS.Timeout;

    if (isDeleting) {
      if (currentText.length > 0) {
        timeoutId = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length - 1));
        }, 30);
      } else {
        setIsDeleting(false);
        setCurrentWordIndex((prev) => (prev + 1) % words.length);
      }
    } else {
      if (currentText.length < word.length) {
        timeoutId = setTimeout(() => {
          setCurrentText(word.substring(0, currentText.length + 1));
        }, 60);
      } else {
        timeoutId = setTimeout(() => {
          setIsDeleting(true);
        }, 1200);
      }
    }
    return () => clearTimeout(timeoutId);
  }, [currentText, isDeleting, currentWordIndex, words]);


  return (
    <section className="min-h-screen flex items-center justify-center px-6 relative pt-20">
      <div className="text-center max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="mb-8"
        >


          <h1 className="text-5xl md:text-8xl font-bold mb-6 text-white tracking-tight">
            {"SHRUTI PARANGE".split("").map((letter, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{
                  scale: 1.2,
                  color: "#22d3ee",
                  y: -8,
                  textShadow: "0px 0px 8px rgb(34 211 238 / 0.8)",
                  transition: { duration: 0.2, delay: 0 }
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.05,
                  ease: "easeOut"
                }}
                className="inline-block cursor-default relative hover:z-10"
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </h1>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl md:text-5xl font-bold text-gray-300 mb-8 min-h-[4rem]"
          >
            <span className="text-cyan-400">{currentText}</span>
            <span className="animate-pulse border-r-2 border-cyan-400 ml-1">&nbsp;</span>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="text-xl md:text-3xl font-medium text-gray-400 mb-8"
          >
            Building AI That's Powerful — and Secure.
          </motion.div>
        </motion.div>


        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex flex-col sm:flex-row justify-center items-stretch sm:items-center gap-4 sm:gap-6 mb-16 w-full max-w-md sm:max-w-none mx-auto"
        >
          <a
            href="#projects"
            className="px-8 py-4 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-all duration-300 flex justify-center items-center gap-2 hover:scale-105 w-full sm:w-auto"
          >
            View Projects <ArrowRight size={20} />
          </a>
          <a
            href={resumePdf}
            download="ShrutiParange_resume.pdf"
            className="px-8 py-4 bg-black/50 backdrop-blur-sm border-2 border-cyan-500/50 text-cyan-400 hover:bg-cyan-500/10 font-bold rounded-lg transition-all duration-300 flex justify-center items-center gap-2 hover:scale-105 w-full sm:w-auto"
          >
            Download Resume <Download size={20} />
          </a>
        </motion.div>
        {/* Social Links */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex justify-center items-center gap-6"
        >
          <a
            href="https://www.linkedin.com/in/shruti-parange-b9a02b341/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
          >
            <Linkedin size={24} />
          </a>
          <a
            href="https://github.com/ShrutiParange-05"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 border border-white/10 rounded-full text-gray-300 hover:text-cyan-400 hover:border-cyan-500/50 hover:bg-cyan-500/10 transition-all duration-300 hover:scale-110"
          >
            <Github size={24} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}