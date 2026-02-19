"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingElements from "./FloatingElements";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

import ScrollRevealText from "../ui/ScrollRevealText";

export default function AboutMe() {
    const sectionRef = useRef<HTMLElement>(null);
    const elementsRef = useRef<HTMLDivElement[]>([]);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Set up GSAP context for potential future animations or cleanup
        const ctx = gsap.context(() => {
            // Initial state: visible
            const contentElements = elementsRef.current.slice(0, -1);
            contentElements.forEach((el) => {
                gsap.set(el, { opacity: 1, x: 0 });
            });

            // GSAP Pin Image Logic (Restored from docs)
            if (imageRef.current && sectionRef.current) {
                ScrollTrigger.create({
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "bottom bottom",
                    pin: imageRef.current,
                    pinSpacing: false, // CRITICAL: prevent layout shifts
                    scrub: true, // Smooth pinning
                });
            }

        }, sectionRef);

        return () => ctx.revert();
    }, []);

    const addToRefs = (el: HTMLDivElement | null) => {
        if (el && !elementsRef.current.includes(el)) {
            elementsRef.current.push(el);
        }
    };

    return (
        <section ref={sectionRef} className="min-h-screen py-32 relative overflow-hidden">
            {/* Background Texture - Keeping texture but removing color */}
            <div className="absolute inset-0 opacity-20 pointer-events-none -z-10"
                style={{ backgroundImage: `radial-gradient(circle at 50% 50%, #1a1a1a 1px, transparent 1px)`, backgroundSize: '40px 40px' }}
            />
            {/* Floating SVG Background */}
            <FloatingElements />

            {/* Content Grid */}
            <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start relative z-10">

                {/* LEFT COLUMN: Content */}
                <div className="space-y-16">

                    {/* About Me */}
                    <div ref={addToRefs} className="space-y-6">
                        <h2
                            className="text-6xl md:text-8xl font-bold font-syne"
                        >
                            About{" "}
                            <span className="text-white/40">
                                Me
                            </span>
                        </h2>
                        <div className="text-lg md:text-xl leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
                            <ScrollRevealText>
                                I'm a passionate full-stack developer and creative coder who brings digital experiences to life. With a deep love for both design and development, I craft interfaces that are not just functional, but truly memorable.
                            </ScrollRevealText>
                        </div>
                    </div>

                    {/* What I Do */}
                    <div ref={addToRefs} className="space-y-6">
                        <h3
                            className="text-5xl md:text-7xl font-bold font-syne"
                        >
                            What I{" "}
                            <span className="text-white/40">
                                Do
                            </span>
                        </h3>
                        <div className="text-lg md:text-xl leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
                            <ScrollRevealText>
                                I specialize in building interactive web applications using modern technologies like React, Next.js, and Three.js. My expertise spans from pixel-perfect UI implementation to complex 3D graphics programming, always pushing the boundaries of what's possible on the web.
                            </ScrollRevealText>
                        </div>
                    </div>

                    {/* My Philosophy */}
                    <div ref={addToRefs} className="space-y-6">
                        <h3
                            className="text-5xl md:text-7xl font-bold font-syne"
                        >
                            My{" "}
                            <span className="text-white/40">
                                Philosophy
                            </span>
                        </h3>
                        <div className="text-lg md:text-xl leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
                            <ScrollRevealText>
                                I believe great digital experiences are born at the intersection of art and technology. Every project is an opportunity to create something that not only solves problems but also delights users with smooth animations, intuitive interactions, and thoughtful design.
                            </ScrollRevealText>
                        </div>
                    </div>

                    {/* Beyond Code */}
                    <div ref={addToRefs} className="space-y-6">
                        <h3
                            className="text-5xl md:text-7xl font-bold font-syne"
                        >
                            Beyond{" "}
                            <span className="text-white/40">
                                Code
                            </span>
                        </h3>
                        <div className="text-lg md:text-xl leading-relaxed font-light" style={{ fontFamily: "var(--font-dm-sans)" }}>
                            <ScrollRevealText>
                                When I'm not coding, you'll find me exploring new design trends, experimenting with creative shaders, or diving deep into the latest web technologies. I'm constantly learning and evolving, driven by curiosity and the desire to create exceptional digital experiences.
                            </ScrollRevealText>
                        </div>
                    </div>
                </div>

                {/* RIGHT COLUMN: Info Grid - GSAP Pinned */}
                <div ref={imageRef} className="flex items-center justify-center h-fit w-full">
                    <div className="grid grid-cols-2 gap-4 w-full max-w-lg">

                        <MetricCard
                            number="3+"
                            label="Years Experience"
                            delay={0}
                        />
                        <MetricCard
                            number="15+"
                            label="Projects Completed"
                            delay={0.1}
                        />
                        <MetricCard
                            number="20+"
                            label="Tech Skills"
                            delay={0.2}
                        />
                        <MetricCard
                            number="4+"
                            label="Human Languages"
                            delay={0.3}
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}

const MetricCard = ({ number, label, delay }: { number: string, label: string, delay: number }) => {
    return (
        <div
            className="group relative aspect-square rounded-[2rem] bg-white/5 backdrop-blur-xl border border-white/10 flex flex-col items-center justify-center p-6 transition-all duration-500 hover:scale-105 hover:bg-white/10 hover:border-cyan-400/30 shadow-2xl overflow-hidden"
        >
            {/* Hover Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 via-transparent to-teal-500/0 group-hover:from-cyan-500/10 group-hover:to-teal-500/10 transition-all duration-500" />

            <h3 className="text-5xl md:text-7xl font-bold text-white mb-2 font-syne relative z-10 group-hover:text-cyan-400 transition-colors duration-300">
                {number}
            </h3>
            <p className="text-white/40 text-sm md:text-base font-dm-sans uppercase tracking-widest text-center font-bold relative z-10 group-hover:text-white/70 transition-colors duration-300">
                {label}
            </p>
        </div>
    );
};
