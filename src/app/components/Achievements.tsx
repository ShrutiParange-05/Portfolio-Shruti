import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, Award } from 'lucide-react';
import { Card } from './ui/card';

export function Achievements() {
  const achievements = [
    {
      title: "Blockchain Kaigi (BCK) 2025",
      description: "Paper accepted on 'Privacy-Preserving Decentralized Finance using Zero-Knowledge Machine Learning'. The research focuses on verifiable inference for DeFi credit scoring models without revealing model weights.",
      icon: BookOpen,
      gradient: "from-cyan-400 to-cyan-600"
    },
    {
      title: "CRC Press Contribution",
      description: "Abstract accepted for the CRC Press book 'Mathematical Advances of AI in Healthcare', contributing research at the intersection of artificial intelligence and medical mathematics.",
      icon: Award,
      gradient: "from-cyan-500 to-cyan-700"
    }
  ];

  return (
    <section id="achievements" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Achievements & Publications<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Academic contributions and recognized publications in leading international venues.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {achievements.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="group h-full"
            >
              <Card className="bg-gray-900/50 border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 overflow-hidden relative h-full flex flex-col p-8">
                <div className={`absolute inset-0 bg-gradient-to-br ${item.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-300`} />
                
                <div className="flex items-center space-x-5 mb-6 relative">
                  <div className={`p-4 rounded-full bg-gradient-to-r ${item.gradient} bg-opacity-20`}>
                    <item.icon className="w-8 h-8 text-cyan-400" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {item.title}
                    </h3>
                  </div>
                </div>
                
                <p className="text-gray-300 text-lg leading-relaxed relative flex-grow">
                  {item.description}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
