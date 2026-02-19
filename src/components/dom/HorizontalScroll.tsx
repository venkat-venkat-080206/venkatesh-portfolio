"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * SectionTransition v3 - Slide Over from Right
 * 
 * How it works:
 * 1. Container sits right after About Me (same dark bg = seamless)
 * 2. When container reaches top of viewport, it PINS
 * 3. The child panel (Skills) slides from RIGHT (xPercent: 100 → 0)
 * 4. Background is dark (#050505) = looks like About Me is still there
 * 5. After slide completes, UNPIN → Skills scrolls normally
 * 6. Uses min-h-screen, NOT h-screen → Skills content is NOT constrained
 */
export default function SectionTransition({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const panelRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const container = containerRef.current;
        const panel = panelRef.current;
        if (!container || !panel) return;

        const ctx = gsap.context(() => {
            // Start the Skills panel off-screen to the right
            gsap.set(panel, { xPercent: 100 });

            // Slide-in animation triggered when container reaches viewport top
            gsap.to(panel, {
                xPercent: 0,
                ease: "power2.inOut",
                scrollTrigger: {
                    trigger: container,
                    start: "top bottom", // Start animating when top of container hits bottom of viewport
                    end: "top top",      // Finish when top of container hits top of viewport
                    scrub: 1,
                    onLeave: () => {
                        // Ensure panel is fully in place after transition
                        gsap.set(panel, { xPercent: 0, clearProps: "transform" });
                    },
                    onLeaveBack: () => {
                        // Reset when scrolling back up past the transition
                        gsap.set(panel, { xPercent: 100 });
                    },
                },
            });
        }, container);

        return () => ctx.revert();
    }, []);

    return (
        <div
            ref={containerRef}
            className="relative overflow-hidden"
        >
            {/* Sliding panel - NOT constrained to h-screen */}
            <div
                ref={panelRef}
                style={{ willChange: "transform" }}
            >
                {children}
            </div>
        </div>
    );
}
