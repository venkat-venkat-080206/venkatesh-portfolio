"use client";

import React, { useRef, useState } from 'react';
import { motion, useTransform, useSpring, useMotionValue } from 'framer-motion';

// --- CONFIGURATION ---
// Using a high-quality portrait that fits the "Digital Excellence" theme
const USER_IMAGE_URL = "/assets/user/hero-profile.jpg";
const SCROLL_TEXT = "VENKAT";
const TEXT_REPEATS = 8;

export default function HeroTitle() {
    return (
        <div className="relative w-full h-full flex items-center justify-center font-sans pointer-events-none md:pointer-events-auto">

            <style>
                {`@import url('https://fonts.googleapis.com/css2?family=Syncopate:wght@700&display=swap');`}
            </style>

            {/* 1. Background Scrolling Text (Behind the Model) */}
            <BackgroundMarquee text={SCROLL_TEXT} />

            {/* 2. The Central X Mask with Image */}
            <XMaskContainer imageUrl={USER_IMAGE_URL} />

        </div>
    );
}

// --- COMPONENTS ---

const BackgroundMarquee = ({ text }: { text: string }) => {
    return (
        <div className="absolute inset-0 flex flex-col justify-center items-center select-none opacity-[0.15] pointer-events-none z-0 overflow-hidden mix-blend-overlay">
            {[...Array(5)].map((_, i) => (
                <MarqueeRow key={i} text={text} direction={i % 2 === 0 ? 'left' : 'right'} speed={i % 2 === 0 ? 35 : 40} />
            ))}
        </div>
    );
};

const MarqueeRow = ({ text, direction, speed }: { text: string, direction: 'left' | 'right', speed: number }) => {
    const content = Array(TEXT_REPEATS).fill(text).join(" — ");

    return (
        <div className="flex overflow-hidden w-full py-2">
            <motion.div
                className="flex whitespace-nowrap text-white text-[12vw] font-black uppercase leading-none tracking-tighter"
                initial={{ x: direction === 'left' ? 0 : "-50%" }}
                animate={{ x: direction === 'left' ? "-50%" : 0 }}
                transition={{
                    repeat: Infinity,
                    ease: "linear",
                    duration: speed,
                }}
                style={{
                    fontFamily: "'Syncopate', sans-serif",
                    textShadow: '0 0 20px rgba(0,255,255,0.1)', // Slight Cyan Glow
                }}
            >
                <span className="mr-8">{content}</span>
                <span className="mr-8">{content}</span>
            </motion.div>
        </div>
    );
};

const XMaskContainer = ({ imageUrl }: { imageUrl: string }) => {
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), { stiffness: 150, damping: 15 });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), { stiffness: 150, damping: 15 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const mouseX = (e.clientX - rect.left) / rect.width - 0.5;
        const mouseY = (e.clientY - rect.top) / rect.height - 0.5;
        x.set(mouseX);
        y.set(mouseY);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <div
            className="relative z-10 w-full h-full flex items-center justify-center perspective-1000"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <motion.div
                style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
                className="w-[85vw] h-[85vw] md:w-[600px] md:h-[600px] relative transition-transform duration-200 ease-out"
            >
                {/* HEAVY DROP SHADOW (No Blur/Glow) - Gives "Weight" */}
                <div className="w-full h-full relative" style={{ filter: 'drop-shadow(0px 30px 40px rgba(0,0,0,0.8))' }}>

                    <svg width="100%" height="100%" viewBox="0 0 400 400" style={{ overflow: 'visible' }}>
                        <defs>
                            {/* THE MAGIC "GOOEY" FILTER 
                  This creates the liquid-like smooth curve at the intersection.
              */}
                            <filter id="goo">
                                {/* 1. Blur the shapes so they merge */}
                                <feGaussianBlur in="SourceGraphic" stdDeviation="12" result="blur" />
                                {/* 2. Sharpen the alpha channel to create hard edges again */}
                                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9" result="goo" />
                                {/* 3. Composite with original to ensure opacity */}
                                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
                            </filter>

                            <mask id="smoothX">
                                <rect width="100%" height="100%" fill="black" />

                                {/* Apply the Gooey Filter to this Group */}
                                <g transform="translate(200, 200)" style={{ filter: "url(#goo)" }}>
                                    <motion.g
                                        animate={{ rotate: 360 }}
                                        transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                    >
                                        {/* Note: rx/ry is smaller here because the Goo filter does the heavy lifting
                       for smoothness. The intersection will now be perfectly curved.
                     */}
                                        <rect x="-60" y="-160" width="120" height="320" rx="20" ry="20" fill="white" />
                                        <rect x="-160" y="-60" width="320" height="120" rx="20" ry="20" fill="white" />
                                    </motion.g>
                                </g>
                            </mask>
                        </defs>

                        {/* 1. The Image Layer */}
                        <image
                            href={imageUrl}
                            x="0"
                            y="0"
                            width="100%"
                            height="100%"
                            preserveAspectRatio="xMidYMid slice"
                            mask="url(#smoothX)"
                        />

                        {/* 2. Glass Weight/Edge Highlight 
               To match the new gooey shape, we use a slightly smaller blurred white shape
               clipped inside, or a simple inset shadow overlay. 
            */}
                        <g transform="translate(200, 200)" pointerEvents="none" style={{ filter: "url(#goo)" }}>
                            <motion.g
                                animate={{ rotate: 360 }}
                                transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                                opacity="0.5"
                            >
                                {/* This creates a subtle highlight on the edges */}
                                <rect x="-60" y="-160" width="120" height="320" rx="20" ry="20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                                <rect x="-160" y="-60" width="320" height="120" rx="20" ry="20" fill="none" stroke="rgba(255,255,255,0.5)" strokeWidth="2" />
                            </motion.g>
                        </g>

                    </svg>

                </div>
            </motion.div>
        </div>
    );
};
