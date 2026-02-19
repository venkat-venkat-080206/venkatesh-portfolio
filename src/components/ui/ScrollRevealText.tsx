import { useRef, useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface ScrollRevealTextProps {
    children: string;
    className?: string;
    stagger?: number;
}

export default function ScrollRevealText({ children, className = "", stagger = 0.02 }: ScrollRevealTextProps) {
    const containerRef = useRef<HTMLSpanElement>(null);
    const words = children.split(" "); // Split by words to preserve some structure

    useEffect(() => {
        if (!containerRef.current) return;

        const wordElements = containerRef.current.querySelectorAll(".reveal-word");

        const ctx = gsap.context(() => {
            gsap.fromTo(wordElements,
                {
                    opacity: 0.2,
                    filter: "blur(2px)",
                    color: "#ffffff" // Ensure start color is consistent (though dimmed by opacity)
                },
                {
                    opacity: 1,
                    filter: "blur(0px)",
                    color: "#ffffff",
                    stagger: stagger,
                    scrollTrigger: {
                        trigger: containerRef.current,
                        start: "top 80%", // Start animating when text enters bottom-ish
                        end: "bottom 50%", // Finish when text is in middle
                        scrub: 1,
                        toggleActions: "play none none reverse"
                    }
                }
            );
        }, containerRef);

        return () => ctx.revert();
    }, [children, stagger]);

    return (
        <span ref={containerRef} className={className}>
            {words.map((word, i) => (
                <span key={i} className="reveal-word inline-block mr-[0.25em] will-change-[opacity,filter]">
                    {word}
                </span>
            ))}
        </span>
    );
}
