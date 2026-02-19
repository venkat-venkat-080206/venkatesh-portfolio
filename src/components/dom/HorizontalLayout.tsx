"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

/**
 * HorizontalLayout - The "Train Ride" Transition
 * 
 * Takes children (AboutMe, MySkills) and places them side-by-side in a 200vw container.
 * Pins the container when it hits the top of the viewport.
 * Translates X from 0 to -100vw * (N-1) based on scroll.
 */
export default function HorizontalLayout({ children }: { children: React.ReactNode }) {
    const containerRef = useRef<HTMLDivElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const track = trackRef.current;
        const container = containerRef.current;

        if (!track || !container) return;

        // Count direct children to determine width multiplier
        // Although we force 200vw for now assuming 2 sections
        const childCount = React.Children.count(children);

        const ctx = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: container,
                    start: "top top",
                    end: "+=" + (window.innerHeight * (childCount + 0.5)), // Add 0.5 viewport buffer
                    pin: true,
                    scrub: 1,
                    // removed snap to avoid conflict
                },
            });

            // Step 1: HOLD (0.5 viewport scroll) - Vertical scroll allowed inside child
            tl.to({}, { duration: 0.5, ease: "none" });

            // Step 2: MOVE (N-1 viewports scroll)
            tl.to(track, {
                xPercent: -100 * (childCount - 1),
                ease: "none",
                duration: childCount - 1
            });

        }, container);

        return () => ctx.revert();
    }, [children]);

    return (
        <div ref={containerRef} className="relative overflow-hidden w-full h-screen">
            {/* Horizontal Track */}
            <div
                ref={trackRef}
                className="flex h-full w-[200vw] will-change-transform" // 200vw strictly for 2 sections
            >
                {/* 
                   We need to ensure children are wrapped or styled to be w-screen h-screen flex-shrink-0.
                   Since we pass components directly, we rely on a wrapper here.
                */}
                {React.Children.map(children, (child) => (
                    <div
                        className="w-screen h-screen flex-shrink-0 overflow-y-auto"
                        style={{
                            scrollbarWidth: "none",        // Firefox
                            msOverflowStyle: "none",       // IE 10+
                            overscrollBehaviorY: "contain" // Prevents scroll chaining until bottom reached
                        }}
                    >
                        <style jsx>{`
                            div::-webkit-scrollbar {
                                display: none; /* Chrome/Safari/Webkit */
                            }
                        `}</style>
                        {child}
                    </div>
                ))}
            </div>
        </div>
    );
}
