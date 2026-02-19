"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, User, Mail, MessageSquare, Briefcase, ArrowRight } from 'lucide-react';

export default function Contact() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        role: 'HR', // Default role
        message: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const subject = `Portfolio Inquiry from ${formData.name} (${formData.role})`;
        const body = `Name: ${formData.name}\nEmail: ${formData.email}\nRole: ${formData.role}\n\nMessage:\n${formData.message}`;
        window.location.href = `mailto:venkateshwaran.080206@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    return (
        <section className="relative min-h-[80vh] w-full flex items-center justify-center py-32 z-10">

            <div className="container mx-auto px-4 md:px-10">
                <div className="flex flex-col md:flex-row gap-16 md:gap-24 items-start max-w-7xl mx-auto">

                    {/* Left: Text Content */}
                    <div className="w-full md:w-1/2 pt-12">
                        <motion.h4
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-cyan-400 font-mono text-sm uppercase tracking-widest mb-6"
                        >
                            What's Next?
                        </motion.h4>

                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className="text-6xl md:text-8xl font-bold text-white font-syne mb-8 leading-[0.9]"
                        >
                            Let's work <br />
                            <span className="text-white/20">together.</span>
                        </motion.h2>

                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-white/60 text-lg md:text-xl font-dm-sans font-light max-w-md leading-relaxed mb-12"
                        >
                            I'm currently available for freelance projects and open to full-time opportunities. If you're an HR, Entrepreneur, or just want to say hi, my inbox is open!
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="flex items-center gap-4 text-white/40 font-mono text-sm"
                        >
                            <div className="w-12 h-[1px] bg-white/20" />
                            <span>venkateshwaran.080206@gmail.com</span>
                        </motion.div>
                    </div>

                    {/* Right: Glassmorphism Form */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="w-full md:w-1/2"
                    >
                        <form onSubmit={handleSubmit} className="relative bg-white/5 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden group">

                            {/* Decorative Gradients */}
                            <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 blur-[100px] rounded-full pointer-events-none" />
                            <div className="absolute bottom-0 left-0 w-64 h-64 bg-teal-500/10 blur-[100px] rounded-full pointer-events-none" />

                            <div className="relative z-10 space-y-8">

                                {/* Name Input */}
                                <div className="group/input">
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-3 font-dm-sans">Your Name</label>
                                    <div className="relative flex items-center">
                                        <User className="absolute left-4 text-white/20 w-5 h-5 group-focus-within/input:text-cyan-400 transition-colors" />
                                        <input
                                            type="text"
                                            required
                                            value={formData.name}
                                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 font-dm-sans"
                                            placeholder="John Doe"
                                        />
                                    </div>
                                </div>

                                {/* Email Input */}
                                <div className="group/input">
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-3 font-dm-sans">Email Address</label>
                                    <div className="relative flex items-center">
                                        <Mail className="absolute left-4 text-white/20 w-5 h-5 group-focus-within/input:text-cyan-400 transition-colors" />
                                        <input
                                            type="email"
                                            required
                                            value={formData.email}
                                            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 font-dm-sans"
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                </div>

                                {/* Role Selection */}
                                <div className="group/input">
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-3 font-dm-sans">I am a...</label>
                                    <div className="grid grid-cols-3 gap-3">
                                        {['HR', 'Entrepreneur', 'Other'].map((r) => (
                                            <button
                                                key={r}
                                                type="button"
                                                onClick={() => setFormData({ ...formData, role: r })}
                                                className={`py-3 px-4 rounded-xl border text-sm font-bold transition-all duration-300 ${formData.role === r
                                                        ? 'bg-cyan-500/20 border-cyan-400/50 text-cyan-400'
                                                        : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'
                                                    }`}
                                            >
                                                {r}
                                            </button>
                                        ))}
                                    </div>
                                </div>

                                {/* Message Input */}
                                <div className="group/input">
                                    <label className="block text-white/40 text-xs font-bold uppercase tracking-widest mb-3 font-dm-sans">Your Message</label>
                                    <div className="relative">
                                        <MessageSquare className="absolute top-4 left-4 text-white/20 w-5 h-5 group-focus-within/input:text-cyan-400 transition-colors" />
                                        <textarea
                                            required
                                            rows={4}
                                            value={formData.message}
                                            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                                            className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder:text-white/20 focus:outline-none focus:border-cyan-400/50 focus:bg-white/10 transition-all duration-300 font-dm-sans resize-none"
                                            placeholder="Hello, I'd like to talk about..."
                                        />
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button
                                    type="submit"
                                    className="w-full bg-white text-black font-bold font-syne py-5 rounded-2xl flex items-center justify-center gap-3 hover:bg-cyan-50 transition-colors group/btn"
                                >
                                    Send Message
                                    <Send size={20} className="group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform duration-300" />
                                </button>

                            </div>
                        </form>
                    </motion.div>

                </div>
            </div>
        </section>
    );
}
