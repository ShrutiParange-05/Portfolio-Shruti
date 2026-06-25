import React from 'react';
import { motion } from 'motion/react';
import { Code, Shield, Brain } from 'lucide-react';
import profileImage from '../../assets/image.jpeg';

export function About() {
  return (
    <section id="about" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            About Me<span className="text-cyan-400">.</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80 mx-auto">
              <div className="w-full h-full rounded-full bg-cyan-500/10 border-2 border-cyan-500/50 p-4 flex items-center justify-center overflow-hidden">
                <img
                  src={profileImage}
                  alt="Shruti Parange"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -inset-4 border-2 border-dashed border-cyan-500/30 rounded-full"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-bold text-white mb-6 leading-relaxed">
              I'm Shruti — an AI engineer obsessed with one question: <br />
              <span className="text-cyan-400">"What happens when AI goes wrong, and how do we stop it?"</span>
            </h3>

            <p className="text-gray-300 text-lg leading-relaxed">
              That obsession drives everything I build. I work at the edge of machine learning and cybersecurity — designing AI systems that are not just intelligent, but resilient, secure, and trustworthy by architecture.
            </p>

            <p className="text-gray-300 text-lg leading-relaxed">
              My expertise bridges the gap between complex algorithms and real-world vulnerabilities. Whether it's implementing Zero-Knowledge Machine Learning (ZKML), securing models against adversarial attacks, or developing robust predictive systems, my goal is to ensure the next generation of AI is safe for enterprise deployment.
            </p>



            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-cyan-500/5 p-6 rounded-lg border border-cyan-500/20 mt-8"
            >
              <p className="text-cyan-400 italic">
                "Building the safeguards for tomorrow's artificial intelligence."
              </p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}