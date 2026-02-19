"use client";

import { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ScrollRevealText from "../ui/ScrollRevealText";
import { AnimatePresence, motion } from "framer-motion";
import { X, ExternalLink, MessageSquare, Lightbulb, Palette, Users, Clock, RefreshCw, Brain, Crown, Monitor, Server, Database, Code, Cpu, Globe, Layers, Terminal } from "lucide-react";

// Make sure to register plugins
if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

// Ensure clean type definitions
interface Skill {
    id: string; // Unique ID for keys
    name: string;
    level: 1 | 2 | 3 | 4 | 5;
    description: string;
    iconType: "cdn" | "lucide";
    iconValue: string | any; // URL string or Lucide Component
    category: "Soft" | "Hard" | "Meta";
    source: string; // "YouTube", "Udemy", "Documentation", "Experience", etc.
}

// --- DATA POPULATION ---

const softSkills: Skill[] = [
    { id: "s1", name: "Communication", level: 5, description: "Clear effective communication", iconType: "lucide", iconValue: MessageSquare, category: "Soft", source: "Experience" },
    { id: "s2", name: "Problem Solv.", level: 5, description: "Analytical thinking", iconType: "lucide", iconValue: Lightbulb, category: "Soft", source: "Experience" },
    { id: "s3", name: "Creativity", level: 5, description: "Innovative approaches", iconType: "lucide", iconValue: Palette, category: "Soft", source: "Life" },
    { id: "s4", name: "Team Work", level: 4, description: "Collaborative synergy", iconType: "lucide", iconValue: Users, category: "Soft", source: "Experience" },
    { id: "s5", name: "Leadership", level: 4, description: "Guiding teams", iconType: "lucide", iconValue: Crown, category: "Soft", source: "Management" },
    { id: "s6", name: "Adaptability", level: 5, description: "Thriving in change", iconType: "lucide", iconValue: RefreshCw, category: "Soft", source: "Life" },
    { id: "s7", name: "Time Mgmt", level: 4, description: "Efficient workflow", iconType: "lucide", iconValue: Clock, category: "Soft", source: "Experience" },
    { id: "s8", name: "Empathy", level: 5, description: "Understanding others", iconType: "lucide", iconValue: HeartIcon, category: "Soft", source: "Life" },
    { id: "s9", name: "Negotiation", level: 4, description: "Win-win outcomes", iconType: "lucide", iconValue: HandshakeIcon, category: "Soft", source: "Sales" }, // Placeholder Icon
];

const hardSkills: Skill[] = [
    { id: "h1", name: "React", level: 5, description: "Component-based UI", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/react/61DAFB", category: "Hard", source: "Official Docs" },
    { id: "h2", name: "Next.js", level: 5, description: "App Router & SSR", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/nextdotjs/white", category: "Hard", source: "Vercel Docs" },
    { id: "h3", name: "TypeScript", level: 5, description: "Type Safety", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/typescript/3178C6", category: "Hard", source: "Total TypeScript" },
    { id: "h4", name: "Three.js", level: 4, description: "3D Web Experiences", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/threedotjs/white", category: "Hard", source: "Bruno Simon Journey" },
    { id: "h5", name: "GSAP", level: 4, description: "High-perf Animations", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/greensock/88CE02", category: "Hard", source: "CreativeCoding Club" },
    { id: "h6", name: "Node.js", level: 4, description: "Backend Runtime", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/nodedotjs/339933", category: "Hard", source: "Udemy" },
    { id: "h7", name: "Python", level: 4, description: "Scripting & AI", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/python/3776AB", category: "Hard", source: "CS50" },
    { id: "h8", name: "Tailwind", level: 5, description: "Utility CSS", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/tailwindcss/06B6D4", category: "Hard", source: "Official Docs" },
    { id: "h9", name: "PostgreSQL", level: 4, description: "Relational DB", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/postgresql/4169E1", category: "Hard", source: "Udemy" },
    { id: "h10", name: "Docker", level: 3, description: "Containerization", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/docker/2496ED", category: "Hard", source: "YouTube" },
    { id: "h11", name: "Git", level: 5, description: "Version Control", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/git/F05032", category: "Hard", source: "Experience" },
    { id: "h12", name: "Figma", level: 4, description: "UI/UX Design", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/figma/F24E1E", category: "Hard", source: "Self Taught" },
    { id: "h13", name: "Blender", level: 3, description: "3D Modeling", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/blender/E87D0D", category: "Hard", source: "Donut Tutorial" },
    { id: "h14", name: "Redux", level: 4, description: "State Management", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/redux/764ABC", category: "Hard", source: "Docs" },
    { id: "h15", name: "Vite", level: 4, description: "Fast Build Tool", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/vite/646CFF", category: "Hard", source: "Docs" },
    { id: "h16", name: "Firebase", level: 4, description: "Backend as a Service", iconType: "cdn", iconValue: "https://cdn.simpleicons.org/firebase/FFCA28", category: "Hard", source: "Projects" },
];

const metaSkills: Skill[] = [
    { id: "m1", name: "Architecture", level: 4, description: "System Design", iconType: "lucide", iconValue: Layers, category: "Meta", source: "High Scale Blogs" },
    { id: "m2", name: "Performance", level: 5, description: "Optimization", iconType: "lucide", iconValue: Cpu, category: "Meta", source: "Web.dev" },
    { id: "m3", name: "UX Design", level: 5, description: "User Centricity", iconType: "lucide", iconValue: HeartIcon, category: "Meta", source: "NNGroup" },
    { id: "m4", name: "SEO", level: 4, description: "Search Visibility", iconType: "lucide", iconValue: Globe, category: "Meta", source: "Google Docs" },
    { id: "m5", name: "Agile", level: 4, description: "Iterative Dev", iconType: "lucide", iconValue: RefreshCw, category: "Meta", source: "Jira Docs" },
    { id: "m6", name: "Research", level: 5, description: "Deep Dives", iconType: "lucide", iconValue: Lightbulb, category: "Meta", source: "University" }, // Reusing Lightbulb
    { id: "m7", name: "Testing", level: 4, description: "App Stability", iconType: "lucide", iconValue: Terminal, category: "Meta", source: "Jest Docs" },
];

// Helper for loose Lucide types in array
function HeartIcon(props: any) { return <Brain {...props} /> } // Just reusing Brain for now or generic
function HandshakeIcon(props: any) { return <Users {...props} /> }

const ALL_SKILLS = [...hardSkills, ...softSkills, ...metaSkills];


export default function MySkills() {
    const sectionRef = useRef<HTMLElement>(null);
    const rowRefs = useRef<(HTMLDivElement | null)[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
    const [activeFilter, setActiveFilter] = useState<"All" | "Hard" | "Soft" | "Meta">("All");

    // Filter Logic
    const filteredSkills = ALL_SKILLS.filter(skill => {
        if (activeFilter === "All") return true;
        return skill.category === activeFilter;
    });

    useEffect(() => {
        const ctx = gsap.context(() => {
            // ... (Keeping existing Film Roll Animation Logic which is good) ...
            rowRefs.current.forEach((row, index) => {
                if (!row) return;
                const direction = index % 2 === 0 ? -1 : 1;
                if (direction === 1) gsap.set(row, { xPercent: -33.33 });
                const loop = gsap.fromTo(row,
                    { xPercent: direction === -1 ? 0 : -33.333 },
                    { xPercent: direction === -1 ? -33.333 : 0, ease: "none", duration: 15, repeat: -1 }
                );
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    onUpdate: (self) => {
                        const velocity = self.getVelocity();
                        const speedMultiplier = 1 + Math.abs(velocity) / 600;
                        gsap.to(loop, { timeScale: speedMultiplier, duration: 0.3, ease: "power1.out" });
                    }
                });
            });
        }, sectionRef);
        return () => ctx.revert();
    }, []);

    // Gravity Physics Handlers (keeping optimized version)
    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
        const row = rowRefs.current[index];
        if (!row) return;
        const rect = row.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const relY = (e.clientY - rect.top) / rect.height;
        const centerX = rect.width / 2;
        const distFromCenter = (mouseX - centerX) / centerX;
        gsap.to(row, { skewX: distFromCenter * 5, y: (relY - 0.5) * 30, scaleY: 1.05, duration: 0.6, ease: "power2.out" });
    };

    const handleMouseLeave = (index: number) => {
        const row = rowRefs.current[index];
        if (!row) return;
        gsap.to(row, { skewX: 0, y: 0, scaleY: 1, duration: 1.5, ease: "elastic.out(1.2, 0.4)" });
    };

    // Render Logic for Film Strips (Simplified for brevity in main file, but keeping visual richness)
    const renderFilmRoll = (skills: Skill[], direction: "left" | "right", tilt: string, rowIndex: number) => {
        const doubledSkills = [...skills, ...skills, ...skills];
        return (
            <div className="relative overflow-visible py-10" style={{ perspective: "1500px" }} onMouseMove={(e) => handleMouseMove(e, rowIndex)} onMouseLeave={() => handleMouseLeave(rowIndex)}>
                <div style={{ transform: tilt, transformStyle: "preserve-3d", willChange: "transform" }}>
                    <div ref={el => { if (el) rowRefs.current[rowIndex] = el }} className="w-full will-change-transform">
                        <div className="flex w-max">
                            {doubledSkills.map((skill, index) => (
                                <div key={`${skill.id}-${index}`} className="relative flex-shrink-0 group px-1">
                                    <div className="relative w-48 h-28 bg-white/10 backdrop-blur-xl border border-white/20 transition-all duration-300 overflow-visible opacity-90 hover:opacity-100 hover:scale-105 hover:bg-white/20 hover:border-white/40 shadow-lg">
                                        {/* Sprockets */}
                                        <div className="absolute top-0 left-0 right-0 h-5 bg-white/10 flex justify-between px-2 z-20 border-b border-white/10"><div className="w-2 h-3 bg-white/20 rounded-[1px]" /><div className="w-2 h-3 bg-white/20 rounded-[1px]" /><div className="w-2 h-3 bg-white/20 rounded-[1px]" /><div className="w-2 h-3 bg-white/20 rounded-[1px]" /></div>
                                        <div className="absolute bottom-0 left-0 right-0 h-5 bg-white/10 flex justify-between px-2 z-20 border-t border-white/10"><div className="w-2 h-3 bg-white/20 rounded-[1px]" /><div className="w-2 h-3 bg-white/20 rounded-[1px]" /><div className="w-2 h-3 bg-white/20 rounded-[1px]" /><div className="w-2 h-3 bg-white/20 rounded-[1px]" /></div>
                                        <div className="absolute top-5 bottom-5 left-0 right-0 flex flex-col items-center justify-center border-r border-white/10 bg-white/5 gap-2">
                                            {/* Small Icon in Film Strip */}
                                            {skill.iconType === "cdn" ? (<img src={skill.iconValue} alt={skill.name} className="w-6 h-6 opacity-80" />) : (<skill.iconValue className="w-6 h-6 text-white/80" />)}
                                            <p className="text-[10px] font-bold text-white tracking-widest uppercase text-center font-dm-sans">{skill.name}</p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <section ref={sectionRef} className="min-h-screen py-32 relative overflow-visible">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: `radial-gradient(circle at 50% 50%, #1a1a1a 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

            {/* Section title */}
            <div className="max-w-7xl mx-auto mb-24 px-8 relative z-10">
                <h2 className="block text-6xl md:text-8xl font-bold text-center tracking-tighter font-syne">
                    MY <span className="text-white/40">SKILLS</span>
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-cyan-400 to-teal-400 mx-auto mt-6 rounded-full opacity-50" />
            </div>

            {/* Film rolls */}
            <div className="space-y-8 md:space-y-16 perspective-[2000px] overflow-hidden">
                <div className="relative z-30">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-black/80 backdrop-blur-sm px-4 py-2 border-r border-white/10 rounded-r-xl shadow-lg"><span className="text-white/80 font-bold text-xs tracking-[0.2em] uppercase writing-vertical-lr">Soft</span></div>
                    {renderFilmRoll(softSkills, "left", "rotateX(2deg) rotateZ(-1deg)", 0)}
                </div>
                <div className="relative z-20">
                    <div className="absolute right-0 top-1/2 -translate-y-1/2 z-40 bg-black/80 backdrop-blur-sm px-4 py-2 border-l border-white/10 rounded-l-xl shadow-lg"><span className="text-white/80 font-bold text-xs tracking-[0.2em] uppercase writing-vertical-lr">Hard</span></div>
                    {renderFilmRoll(hardSkills, "right", "rotateX(-2deg) rotateZ(1deg)", 1)}
                </div>
                <div className="relative z-10">
                    <div className="absolute left-0 top-1/2 -translate-y-1/2 z-40 bg-black/80 backdrop-blur-sm px-4 py-2 border-r border-white/10 rounded-r-xl shadow-lg"><span className="text-white/80 font-bold text-xs tracking-[0.2em] uppercase writing-vertical-lr">Meta</span></div>
                    {renderFilmRoll(metaSkills, "left", "rotateX(2deg) rotateZ(-1deg)", 2)}
                </div>
            </div>

            {/* CTA Button */}
            <div className="mt-24 flex justify-center px-8 relative z-50">
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="group relative px-12 py-5 rounded-full overflow-hidden transition-all duration-500 hover:scale-110 active:scale-95 shadow-[0_10px_40px_-10px_rgba(187,250,251,0.3)] hover:shadow-[0_20px_50px_-10px_rgba(187,250,251,0.5)]"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#bbfafb] via-[#fbcaff] to-[#fecaff] transition-transform duration-500 group-hover:scale-105" />
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <span className="relative z-10 text-[#1a1a1a] font-bold tracking-widest text-sm md:text-base uppercase flex items-center gap-2">
                        View Full Skill Set
                        <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                    </span>
                    <div className="absolute inset-0 border border-white/30 rounded-full" />
                </button>
            </div>

            {/* --- FULL SCREEN MODAL --- */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-3xl p-4 md:p-10"
                    >
                        {/* Modal Container */}
                        <motion.div
                            initial={{ scale: 0.9, y: 50 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.9, y: 50 }}
                            className="relative w-full max-w-7xl h-full max-h-[90vh] bg-white/5 border border-white/10 rounded-[3rem] shadow-2xl flex flex-col overflow-hidden"
                        >
                            {/* Header & Filters */}
                            <div className="flex flex-col md:flex-row items-center justify-between p-8 md:p-12 border-b border-white/5 bg-white/5 backdrop-blur-xl z-20 gap-8">
                                <div>
                                    <h3 className="text-4xl md:text-5xl font-bold text-white font-syne">Skill Vault</h3>
                                    <p className="text-white/40 font-mono text-sm mt-2">SYSTEM // COMPLETE_INDEX</p>
                                </div>

                                {/* Filter Tabs */}
                                <div className="flex p-1 bg-black/20 backdrop-blur-md rounded-full border border-white/10">
                                    {["All", "Hard", "Soft", "Meta"].map((filter) => (
                                        <button
                                            key={filter}
                                            onClick={() => setActiveFilter(filter as any)}
                                            className={`px-6 py-2 rounded-full text-sm font-bold font-dm-sans transition-all duration-300 ${activeFilter === filter
                                                    ? "bg-cyan-500/20 text-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.2)] border border-cyan-500/30"
                                                    : "text-white/40 hover:text-white hover:bg-white/5"
                                                }`}
                                        >
                                            {filter}
                                        </button>
                                    ))}
                                </div>

                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-4 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-colors group"
                                >
                                    <X className="text-white/60 group-hover:text-cyan-400 transition-colors" size={32} />
                                </button>
                            </div>

                            {/* Scrollable Grid Area */}
                            <div className="flex-1 overflow-y-auto p-8 md:p-12 custom-scrollbar">
                                <div className="grid grid-cols-3 md:grid-cols-6 lg:grid-cols-8 gap-1 auto-rows-[80px]">
                                    {filteredSkills.map((skill) => {
                                        // Bento Logic: Level 5 = Span 2x2 or 2x1, Level 4 = 1x1 etc.
                                        // Simplified random-ish sizing based on ID hash or logic
                                        const isBig = skill.level === 5 && (skill.category === 'Hard' || skill.name === 'Creativity');
                                        const isWide = skill.level === 4;
                                        // CSS Grid classes
                                        const gridClass = isBig ? "col-span-2 row-span-2" : isWide ? "col-span-2 row-span-1" : "col-span-1 row-span-1";

                                        return (
                                            <motion.button
                                                key={skill.id}
                                                layoutId={`skill-${skill.id}`}
                                                onClick={() => setSelectedSkill(skill)}
                                                className={`group relative rounded-2xl bg-white/5 border border-white/5 hover:border-cyan-400/50 hover:bg-cyan-900/10 transition-all duration-300 flex flex-col items-center justify-center p-2 overflow-hidden ${gridClass}`}
                                            >
                                                {/* Background Icon Fade */}
                                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-10 transition-opacity duration-500 scale-150 grayscale blur-sm">
                                                    {skill.iconType === "cdn" ? (<img src={skill.iconValue} />) : (<skill.iconValue size={30} />)}
                                                </div>

                                                {/* Main Icon */}
                                                <div className="relative z-10 mb-1 transition-transform duration-300 group-hover:scale-110 group-hover:-translate-y-1">
                                                    {skill.iconType === "cdn" ? (
                                                        <img src={skill.iconValue} alt={skill.name} className={`object-contain drop-shadow-[0_0_15px_rgba(255,255,255,0.1)] ${isBig ? 'w-16 h-16' : 'w-8 h-8'}`} />
                                                    ) : (
                                                        <skill.iconValue className={`text-white ${isBig ? 'w-16 h-16' : 'w-8 h-8'}`} />
                                                    )}
                                                </div>

                                                {/* Name Label (Visible for ALL now) */}
                                                <span className="text-white/60 group-hover:text-white font-bold font-dm-sans text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md transition-colors duration-300 text-center leading-tight">
                                                    {skill.name}
                                                </span>
                                            </motion.button>
                                        );
                                    })}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* --- DETAIL POPUP (Black Blur Center) --- */}
            <AnimatePresence>
                {selectedSkill && (
                    <motion.div
                        className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md p-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setSelectedSkill(null)}
                    >
                        <motion.div
                            layoutId={`skill-${selectedSkill.id}`}
                            className="bg-black/90 border border-white/20 p-10 md:p-14 rounded-[3rem] max-w-md w-full relative flex flex-col items-center shadow-[0_0_100px_rgba(6,182,212,0.15)]"
                            onClick={(e) => e.stopPropagation()} // Prevent close on modal click
                        >
                            {/* Close Button Trigger */}
                            <button
                                onClick={() => setSelectedSkill(null)}
                                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
                            >
                                <X size={18} />
                            </button>

                            {/* Icon Header */}
                            <div className="mb-8 p-6 rounded-full bg-white/5 border border-white/10 shadow-2xl ring-1 ring-white/10">
                                {selectedSkill.iconType === "cdn" ? (
                                    <img src={selectedSkill.iconValue} alt={selectedSkill.name} className="w-24 h-24 object-contain" />
                                ) : (
                                    <selectedSkill.iconValue className="w-24 h-24 text-cyan-400" />
                                )}
                            </div>

                            {/* Info */}
                            <h2 className="text-4xl font-bold text-white font-syne mb-2 text-center">{selectedSkill.name}</h2>
                            <div className="flex gap-2 mb-6">
                                {[...Array(5)].map((_, i) => (
                                    <div key={i} className={`h-2 w-8 rounded-full ${i < selectedSkill.level ? 'bg-cyan-400' : 'bg-white/10'}`} />
                                ))}
                            </div>

                            <p className="text-white/60 text-center font-dm-sans leading-relaxed mb-8">
                                {selectedSkill.description}
                            </p>

                            {/* Metadata Pill */}
                            <div className="w-full bg-white/5 rounded-2xl p-6 border border-white/10 flex flex-col gap-4">
                                <div className="flex justify-between items-center border-b border-white/5 pb-4">
                                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Source</span>
                                    <span className="text-cyan-300 font-mono text-sm">{selectedSkill.source}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Category</span>
                                    <span className="text-white font-mono text-sm">{selectedSkill.category}</span>
                                </div>
                            </div>

                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <style jsx global>{`
                .writing-vertical-lr { writing-mode: vertical-lr; text-orientation: mixed; }
                .custom-scrollbar::-webkit-scrollbar { width: 8px; }
                .custom-scrollbar::-webkit-scrollbar-track { bg: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 10px; }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
            `}</style>
        </section>
    );
}
