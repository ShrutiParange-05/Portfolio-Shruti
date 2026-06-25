import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Github, Linkedin, Send, MessageSquare } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { toast } from 'sonner';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("https://formsubmit.co/ajax/shrutiparange5@gmail.com", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          message: formData.message
        })
      });
      const data = await response.json();
      if (response.ok && data.success === "true") {
        toast.success("Message sent successfully!", {
          description: "Thank you for reaching out. I'll get back to you within 24 hours!",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(data.message || "Failed to send message. Please try again later.");
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while sending the message. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <section id="contact" className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white tracking-tight">
            Let's Connect<span className="text-cyan-400">.</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Open to full-time AI/ML roles, research collaborations, and freelance projects. I typically respond within 24 hours.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-gray-900/80 backdrop-blur-sm border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-white flex items-center space-x-2">
                  <MessageSquare className="text-cyan-400" />
                  <span>Send a Message</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={formData.name}
                      onChange={handleChange}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400"
                      required
                    />
                  </div>
                  <div>
                    <Input
                      type="email"
                      name="email"
                      placeholder="Your Email"
                      value={formData.email}
                      onChange={handleChange}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400"
                      required
                    />
                  </div>
                  <div>
                    <Textarea
                      name="message"
                      placeholder="Your Message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      className="bg-gray-800/50 border-gray-600 text-white placeholder:text-gray-400 focus:border-cyan-400 resize-none"
                      required
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-cyan-500 hover:bg-cyan-400 text-black font-bold disabled:bg-gray-800 disabled:text-gray-500 cursor-pointer disabled:cursor-not-allowed transition-all"
                  >
                    <Send className={`mr-2 ${isSubmitting ? 'animate-pulse' : ''}`} size={16} />
                    {isSubmitting ? "Sending..." : "Send Message"}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>

          {/* AI Avatar & Social Links */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-8"
          >


            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="text-xl font-bold text-white text-center mb-6">Connect With Me</h3>
              <div className="space-y-3">
                {[
                  { icon: Mail, label: "shrutiparange5@gmail.com", href: "mailto:shrutiparange5@gmail.com", color: "from-cyan-400 to-cyan-600" },
                  { icon: Github, label: "GitHub Profile", href: "https://github.com/ShrutiParange-05", color: "from-cyan-400 to-cyan-600" },
                  { icon: Linkedin, label: "LinkedIn Profile", href: "https://www.linkedin.com/in/shruti-parange-b9a02b341/", color: "from-cyan-400 to-cyan-600" }
                ].map((social, index) => (
                  <motion.a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.05, x: 10 }}
                    viewport={{ once: true }}
                    className="flex items-center space-x-4 p-4 bg-gray-900/50 rounded-lg border border-gray-700/50 hover:border-cyan-500/50 transition-all duration-300 group"
                  >
                    <div className={`p-2 rounded-full bg-gradient-to-r ${social.color} bg-opacity-20`}>
                      <social.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-300 group-hover:text-white transition-colors duration-300">
                      {social.label}
                    </span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16 pt-8 border-t border-gray-700/50"
        >
          <p className="text-gray-500">
            © 2026 Shruti Parange. Engineering the future with AI.
          </p>
        </motion.div>
      </div>
    </section>
  );
}