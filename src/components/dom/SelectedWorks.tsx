"use client";

import React, { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github, ArrowRight, MoveUpRight, FolderOpen } from 'lucide-react';

// --- Mock Data ---
const projects = [
    {
        id: 1,
        title: "Tabbs Extension",
        category: "Productivity",
        year: "2024",
        image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2426&auto=format&fit=crop",
        description: "A productivity tool that manages your browser tabs efficiently. Built with React and Chrome API, focusing on memory reduction and user focus.",
        tech: ["React", "Chrome API", "Tailwind"]
    },
    {
        id: 2,
        title: "Droppable",
        category: "Utilities",
        year: "2023",
        image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop",
        description: "Drag and drop file sharing utility for local networks. Zero configuration needed, works instantly across MacOS and Windows using WebRTC.",
        tech: ["Electron", "WebRTC", "Node.js"]
    },
    {
        id: 3,
        title: "SummerRain",
        category: "E-Commerce",
        year: "2022",
        image: "https://images.unsplash.com/photo-1542838132-92c53300491e?q=80&w=2574&auto=format&fit=crop",
        description: "E-commerce platform with a focus on sustainable water brands. Features 3D product visualization and custom checkout experience.",
        tech: ["Shopify", "Three.js", "Liquid"]
    },
    {
        id: 4,
        title: "Wunderflats",
        category: "Real Estate",
        year: "2022",
        image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=2670&auto=format&fit=crop",
        description: "Housing rental platform for mid-term stays. Full native experience with map integration, chat features, and secure document verification.",
        tech: ["React Native", "Firebase", "Maps API"]
    }
];

export default function SelectedWorks() {
    const [selectedId, setSelectedId] = useState<number | null>(null);

    useEffect(() => {
        // Only lock body scroll when modal is open
        if (selectedId) {
            document.body.style.overflow = 'hidden';
            // Also add class to body for Lenis if needed
            document.documentElement.classList.add('lenis-stopped');
        } else {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        }

        return () => {
            document.body.style.overflow = '';
            document.documentElement.classList.remove('lenis-stopped');
        };
    }, [selectedId]);

    return (
        <div className="relative w-full z-10">
            <HorizontalGallery setSelectedId={setSelectedId} />

            <AnimatePresence>
                {selectedId && <Modal selectedId={selectedId} setSelectedId={setSelectedId} />}
            </AnimatePresence>
        </div>
    );
}

// --- Horizontal Scroll Section (TRANSPARENT + BUTTER SMOOTH) ---
const HorizontalGallery = ({ setSelectedId }: { setSelectedId: (id: number) => void }) => {
    const targetRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: targetRef,
    });

    // Calculate horizontal movement
    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-75%"]);

    // MAXIMIZED SMOOTHNESS
    const smoothX = useSpring(x, {
        mass: 1,
        stiffness: 50,
        damping: 20
    });

    return (
        <section ref={targetRef} className="relative h-[400vh] z-20">

            {/* Sticky Container */}
            <div className="sticky top-0 h-screen flex items-center overflow-hidden">

                <motion.div
                    style={{ x: smoothX }}
                    className="flex gap-8 md:gap-16 pl-6 md:pl-20 pr-[20vw] will-change-transform items-center"
                >

                    {/* Header Card */}
                    <div className="w-[80vw] md:w-[30vw] h-[60vh] md:h-[70vh] flex flex-col justify-center p-8 shrink-0 border-l border-white/10 ml-12">
                        <motion.h2
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="text-6xl md:text-[8rem] font-bold text-white leading-[0.9] font-syne"
                        >
                            Selected<br />
                            <span className="text-white/40">Works</span><br />
                            <span className="text-2xl md:text-4xl block mt-4 font-dm-sans bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-teal-400">(04)</span>
                        </motion.h2>
                        <ArrowRight className="text-cyan-400/50 mt-12 w-16 h-16 animate-pulse" />
                    </div>

                    {projects.map((project, i) => (
                        <GalleryCard key={project.id} project={project} i={i} onClick={() => setSelectedId(project.id)} />
                    ))}

                </motion.div>
            </div>
        </section>
    );
};

const GalleryCard = ({ project, i, onClick }: { project: any, i: number, onClick: () => void }) => {
    return (
        <motion.div
            className="group relative w-[85vw] md:w-[60vw] h-[60vh] md:h-[70vh] shrink-0 rounded-[2.5rem] overflow-hidden cursor-pointer 
                 bg-white/5 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 shadow-2xl transition-all duration-500"
            whileHover={{ scale: 0.98 }}
            onClick={onClick}
        >
            {/* Glass Reflection effect */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

            {/* Image Layer - REMOVED as per user request (Glassmorphism only) */}
            {/* <div className="absolute inset-0 z-0">
                <motion.img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover opacity-60 group-hover:opacity-80 group-hover:scale-105 transition-all duration-1000 ease-[0.22, 1, 0.36, 1] grayscale group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent opacity-90" />
            </div> */}

            {/* Content Layer */}
            <div className="absolute inset-0 z-10 p-8 md:p-12 flex flex-col justify-between">
                <div className="flex justify-between items-start">
                    <span className="text-4xl md:text-6xl font-bold text-white/20 group-hover:text-cyan-400/20 transition-colors font-syne">0{i + 1}</span>
                    <div className="w-12 h-12 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                        <MoveUpRight size={20} />
                    </div>
                </div>

                <div>
                    <div className="flex items-center gap-4 mb-6 overflow-hidden flex-wrap">
                        {project.tech.map((t: string, idx: number) => (
                            <span key={idx} className="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-cyan-500/20 font-dm-sans">
                                {t}
                            </span>
                        ))}
                    </div>
                    <h3 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight font-syne">
                        {project.title}
                    </h3>
                    <p className="text-white/60 text-lg md:text-xl max-w-xl line-clamp-2 font-dm-sans font-light">
                        {project.description}
                    </p>
                </div>
            </div>

            {/* Hover Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
        </motion.div>
    );
};

// --- Detail Modal ---
const Modal = ({ selectedId, setSelectedId }: { selectedId: number, setSelectedId: (id: number | null) => void }) => {
    const project = projects.find(p => p.id === selectedId);
    if (!project) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedId(null)}
                className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />
            <motion.div
                initial={{ y: 100, opacity: 0, scale: 0.95 }}
                animate={{ y: 0, opacity: 1, scale: 1 }}
                exit={{ y: 100, opacity: 0, scale: 0.95 }}
                transition={{ type: "spring", stiffness: 200, damping: 25 }}
                className="relative w-full max-w-6xl h-[85vh] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row pointer-events-auto"
            >
                {/* Close Button */}
                <button
                    onClick={() => setSelectedId(null)}
                    className="absolute top-6 right-6 z-20 p-3 bg-black/40 hover:bg-white hover:text-black rounded-full transition-colors border border-white/10 backdrop-blur-md group"
                >
                    <X size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>

                {/* Left: Image Side */}
                <div className="w-full md:w-1/2 h-[40vh] md:h-full relative overflow-hidden group">
                    <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                </div>

                {/* Right: Content Side */}
                <div className="w-full md:w-1/2 h-full p-8 md:p-12 flex flex-col justify-between bg-transparent overflow-y-auto" data-lenis-prevent>
                    <div>
                        <div className="flex justify-between items-start mb-8">
                            <div>
                                <span className="px-4 py-1.5 bg-cyan-950/50 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-bold uppercase tracking-wider font-dm-sans mb-4 inline-block">
                                    {project.category} — {project.year}
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-white font-syne leading-none">{project.title}</h2>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4 font-dm-sans border-b border-white/5 pb-2">Overview</h4>
                                <p className="text-white/70 text-lg leading-relaxed font-dm-sans font-light">{project.description}</p>
                            </div>

                            <div>
                                <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-4 font-dm-sans border-b border-white/5 pb-2">Tech Stack</h4>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t: string, i: number) => (
                                        <span key={i} className="px-4 py-2 bg-white/5 text-white/80 rounded-xl text-sm border border-white/5 hover:border-white/20 transition-colors font-dm-sans hover:bg-white/10 cursor-default">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex gap-4 mt-12 pt-8 border-t border-white/10">
                        <a href="#" className="flex-1 py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors font-syne">
                            Live Site <ExternalLink size={18} />
                        </a>
                        <a href="#" className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors border border-white/10 font-syne">
                            Code <Github size={18} />
                        </a>
                    </div>
                </div>
            </motion.div>
        </div>
    );
}
