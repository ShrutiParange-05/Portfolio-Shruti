import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, Download } from 'lucide-react';
import resumePdf from '../../assets/ShrutiParange_resume.pdf';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Achievements', href: '#achievements' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-black/80 backdrop-blur-md border-b border-white/10 py-4' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <a href="#" className="text-2xl font-bold text-white tracking-tighter">
          Shruti Parange<span className="text-cyan-400">.</span>
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} className="text-sm font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              {link.name}
            </a>
          ))}
          <a href={resumePdf} download="ShrutiParange_resume.pdf" className="px-5 py-2 bg-cyan-500/10 text-cyan-400 border border-cyan-500/50 hover:bg-cyan-500 hover:text-black rounded text-sm font-bold transition-all flex items-center gap-2">
            Resume <Download size={16} />
          </a>
        </div>

        {/* Mobile Nav Toggle */}
        <button className="md:hidden text-gray-300" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="md:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-b border-white/10 p-6 flex flex-col space-y-4 shadow-xl"
        >
          {navLinks.map((link) => (
            <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="text-lg font-medium text-gray-300 hover:text-cyan-400 transition-colors">
              {link.name}
            </a>
          ))}
          <a href={resumePdf} download="ShrutiParange_resume.pdf" className="px-5 py-3 mt-4 bg-cyan-500 text-black text-center rounded font-bold transition-all flex justify-center items-center gap-2">
            Download Resume <Download size={18} />
          </a>
        </motion.div>
      )}
    </nav>
  );
}
