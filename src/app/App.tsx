import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { About } from './components/About';
import { Projects } from './components/Projects';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { TechStack } from './components/TechStack';
import { Contact } from './components/Contact';
import { NeuralBackground } from './components/NeuralBackground';
import { Chatbot } from './components/Chatbot';
import { Toaster } from 'sonner';

export default function App() {
  return (
    <div className="dark min-h-screen bg-background text-foreground relative overflow-x-hidden">
      <NeuralBackground />
      <Navbar />
      <div className="relative z-10">
        <Hero />
        <About />
        <Projects />
        <Experience />
        <Achievements />
        <TechStack />
        <Contact />
      </div>
      <Chatbot />
      <Toaster theme="dark" position="bottom-right" richColors closeButton />
    </div>
  );
}