import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, ArrowUpRight, Twitter, Linkedin, Mail, Github, Layers, Zap, Heart, FileText, Code, Terminal, ExternalLink, Cpu, Award, Briefcase, Globe, X, Menu } from 'lucide-react';

/**
 * CUSTOM WEBGL SHADER FOR THE ORBS CARD
 */
const OrbShader = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const vertexShaderSource = `
      attribute vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `;

        const fragmentShaderSource = `
      precision mediump float;
      uniform float time;
      uniform vec2 resolution;

      void main() {
        vec2 uv = gl_FragCoord.xy / resolution.xy;
        uv = uv * 2.0 - 1.0;
        uv.x *= resolution.x / resolution.y;

        // Orb 1 (Pink/Red)
        vec2 p1 = vec2(sin(time * 0.5) * 0.3, cos(time * 0.4) * 0.2);
        float d1 = length(uv - p1);
        vec3 c1 = vec3(1.0, 0.2, 0.5) * (0.4 / d1);

        // Orb 2 (Yellow/Orange)
        vec2 p2 = vec2(cos(time * 0.3) * 0.4, sin(time * 0.6) * 0.3);
        float d2 = length(uv - p2);
        vec3 c2 = vec3(1.0, 0.8, 0.2) * (0.35 / d2);

        // Orb 3 (Purple/Blue)
        vec2 p3 = vec2(sin(time * 0.7) * 0.3, cos(time * 0.8) * 0.4);
        float d3 = length(uv - p3);
        vec3 c3 = vec3(0.4, 0.2, 1.0) * (0.3 / d3);

        vec3 color = c1 + c2 + c3;
        color = smoothstep(0.1, 1.5, color);

        gl_FragColor = vec4(color, 1.0);
      }
    `;

        const createShader = (gl: WebGLRenderingContext, type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = createShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);

        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

        const positionAttributeLocation = gl.getAttribLocation(program, 'position');
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const timeUniformLocation = gl.getUniformLocation(program, 'time');
        const resolutionUniformLocation = gl.getUniformLocation(program, 'resolution');

        let animationFrameId: number;
        const render = (time: number) => {
            if (!gl.canvas) return;
            resizeCanvasToDisplaySize(gl.canvas as HTMLCanvasElement);
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.useProgram(program);
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
            gl.uniform1f(timeUniformLocation, time * 0.001);
            gl.uniform2f(resolutionUniformLocation, gl.canvas.width, gl.canvas.height);
            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };
        render(0);
        return () => cancelAnimationFrame(animationFrameId);
    }, []);

    return <canvas ref={canvasRef} className="w-full h-full opacity-80" />;
};

const resizeCanvasToDisplaySize = (canvas: HTMLCanvasElement) => {
    const displayWidth = canvas.clientWidth;
    const displayHeight = canvas.clientHeight;
    if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
    }
};

/**
 * COMPONENTS
 */
interface CardProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    hoverEffect?: boolean;
    noPadding?: boolean;
}

const Card = ({ children, className = '', delay = 0, hoverEffect = true, noPadding = false }: CardProps) => {
    return (
        <motion.div
            whileHover={hoverEffect ? { scale: 1.02, transition: { duration: 0.2 } } : {}}
            whileTap={hoverEffect ? { scale: 0.98 } : {}}
            className={`bg-white/5 backdrop-blur-md rounded-[32px] overflow-hidden relative border border-white/10 shadow-2xl flex flex-col ${className} ${!noPadding ? 'p-6' : ''}`}
        >
            {children}
        </motion.div>
    );
};

// Removed BackgroundGradient as it's handled by other components in page.tsx

const TimeDisplay = () => {
    const [time, setTime] = useState<Date | null>(null);

    useEffect(() => {
        setTime(new Date());
        const timer = setInterval(() => setTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    if (!time) return null; // Hydration fix

    return (
        <span className="text-xs font-mono text-zinc-400">
            {time.toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
        </span>
    );
};

const ContributionGraph = () => (
    <div className="flex gap-1 mt-auto opacity-50">
        {[...Array(7)].map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
                {[...Array(5)].map((_, j) => (
                    <div
                        key={j}
                        className={`w-2 h-2 rounded-sm ${Math.random() > 0.6 ? 'bg-green-500/80' : 'bg-zinc-800'}`}
                    />
                ))}
            </div>
        ))}
    </div>
);

export default function BentoMenu() {
    const [isOpen, setIsOpen] = useState(false);

    // This ref callback ensures that whenever the menu mounts (opens),
    // the scroll position is instantly reset to the top (0).
    const scrollContainerRef = useCallback((node: HTMLDivElement | null) => {
        if (node) {
            node.scrollTop = 0;
        }
    }, []);

    // Animation variants for the circular wrap effect
    const menuVariants = {
        closed: {
            clipPath: "circle(0px at 50% calc(100% - 4rem))", // Starts from the button position
            transition: {
                type: "spring" as const,
                stiffness: 400,
                damping: 40
            }
        },
        open: {
            clipPath: "circle(150% at 50% calc(100% - 4rem))", // Expands to cover full screen
            transition: {
                type: "spring" as const,
                stiffness: 20,
                damping: 10
            }
        }
    };

    return (
        <>
            {/* Floating Toggle Button */}
            <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-[60]">
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-16 h-16 bg-white text-black rounded-full flex items-center justify-center shadow-[0_0_30px_rgba(255,255,255,0.3)] hover:scale-110 transition-transform duration-300 cursor-pointer"
                >
                    <motion.div
                        initial={false}
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        {isOpen ? <X size={32} /> : <Menu size={32} />}
                    </motion.div>
                </button>
            </div>

            {/* Pop-up Navigation Overlay */}
            <AnimatePresence>
                <motion.div
                    key="menu-overlay"
                    initial="closed"
                    animate={isOpen ? "open" : "closed"}
                    variants={menuVariants}
                    ref={scrollContainerRef} // Attached the scroll reset ref here
                    className="fixed inset-0 z-[50] bg-black/40 backdrop-blur-3xl overflow-y-auto"
                    data-lenis-prevent
                >
                    <div className="w-full h-full flex flex-col items-center justify-start p-4 md:p-8 pt-12 pb-32">

                        {/* BENTO GRID */}
                        <div className="w-full max-w-[1200px] grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 auto-rows-[200px] md:auto-rows-[240px] grid-flow-dense text-white font-sans selection:bg-purple-500/30 selection:text-purple-200">

                            {/* 1. Map Card (Vertical) */}
                            <Card className="md:col-span-1 md:row-span-2 group cursor-pointer hover:ring-2 ring-white/20 transition-all" noPadding delay={0.1}>
                                <div className="absolute inset-0 z-0">
                                    <div className="w-full h-full bg-[#242426] relative overflow-hidden">
                                        <div className="absolute inset-0 opacity-30 grayscale contrast-125 bg-[url('https://api.mapbox.com/styles/v1/mapbox/dark-v10/static/11.0168,76.9558,12,0/400x800?access_token=pk.eyJ1IjoiZXhhbXBsZSIsImEiOiJjbGZ5...')] bg-cover bg-center">
                                            <div className="grid grid-cols-6 grid-rows-12 h-full w-full">
                                                {[...Array(72)].map((_, i) => <div key={i} className="border-[0.5px] border-white/5"></div>)}
                                            </div>
                                        </div>
                                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                                            <div className="w-16 h-16 bg-blue-500/20 rounded-full flex items-center justify-center animate-pulse">
                                                <div className="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-[0_0_20px_rgba(59,130,246,0.6)]"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="absolute bottom-6 left-6 z-10">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Location</span>
                                    </div>
                                    <h3 className="text-2xl font-bold">Coimbatore</h3>
                                    <p className="text-zinc-400 text-sm">Tamil Nadu, India</p>
                                    <div className="mt-2 text-xs font-mono bg-black/40 backdrop-blur-md px-2 py-1 rounded inline-block">
                                        <TimeDisplay />
                                    </div>
                                </div>
                            </Card>

                            {/* 2. About Me (Wide) */}
                            <Card className="md:col-span-2 md:row-span-1 cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.15}>
                                <div className="flex justify-between items-start mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-orange-400 to-red-600 flex items-center justify-center text-lg">🦊</div>
                                    <button className="p-2 hover:bg-white/10 rounded-full transition-colors"><ArrowUpRight className="w-5 h-5 text-zinc-400" /></button>
                                </div>
                                <h2 className="text-xl font-bold mb-2">About me</h2>
                                <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                                    I craft digital products & experiences. Building my ideas & things I like. Curiosity led me to web development.
                                </p>
                            </Card>

                            {/* 3. My Skills (Compact) */}
                            <Card className="md:col-span-1 md:row-span-1 bg-white/5 cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.2}>
                                <div className="flex items-center gap-2 mb-4">
                                    <Cpu className="w-5 h-5 text-indigo-400" />
                                    <h3 className="font-bold text-lg">My Stack</h3>
                                </div>
                                <div className="flex flex-wrap gap-2 content-start">
                                    {['Java', 'C++', 'Python', 'React', 'AWS', 'IoT'].map((skill, i) => (
                                        <span key={i} className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-zinc-300">
                                            {skill}
                                        </span>
                                    ))}
                                    <span className="px-2 py-1 bg-white/5 border border-white/5 rounded text-[10px] text-zinc-500">+4 more</span>
                                </div>
                            </Card>

                            {/* 4. Functionality/WebGL (Wide) */}
                            <Card className="md:col-span-2 md:row-span-1 cursor-pointer hover:ring-2 ring-white/20 transition-all" noPadding delay={0.25}>
                                <div className="absolute inset-0 z-0"><OrbShader /></div>
                                <div className="absolute inset-0 z-10 p-8 flex flex-row items-end justify-between bg-gradient-to-t from-black/80 via-transparent to-transparent">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2"><Zap className="w-4 h-4 text-purple-400" /><h3 className="font-bold text-lg">Functionality</h3></div>
                                    </div>
                                    <div className="h-12 w-px bg-white/20 mx-4 hidden sm:block"></div>
                                    <div className="text-right sm:text-left">
                                        <div className="flex items-center gap-2 mb-2 justify-end sm:justify-start"><Heart className="w-4 h-4 text-pink-400" /><h3 className="font-bold text-lg">Emotion</h3></div>
                                    </div>
                                </div>
                            </Card>

                            {/* 5. Notion / Notes */}
                            <Card className="md:col-span-1 md:row-span-1 bg-white/90 text-black cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.3}>
                                <div className="flex justify-between items-start">
                                    <div className="w-8 h-8 rounded-lg border border-black/10 flex items-center justify-center bg-transparent">
                                        <FileText className="w-5 h-5 text-black" />
                                    </div>
                                    <div className="bg-black/5 px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider text-black/60">Notes</div>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="text-lg font-bold leading-tight">My Notion</h3>
                                    <p className="text-black/50 text-xs mt-1">Second Brain & Docs</p>
                                </div>
                            </Card>

                            {/* 6. My Works / Projects (Large 2x2) */}
                            <Card className="row-span-2 md:col-span-2 md:row-span-2 relative group bg-black/40 cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.35} noPadding>
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(50,50,50,0.5),_rgba(0,0,0,0.9))] z-0"></div>

                                <div className="relative z-10 p-8 h-full flex flex-col justify-between">
                                    <div className="flex justify-between items-start">
                                        <div className="flex items-center gap-2">
                                            <Briefcase className="w-5 h-5 text-green-400" />
                                            <h3 className="font-bold text-lg">Selected Works</h3>
                                        </div>
                                        <button className="bg-white/10 p-2 rounded-full hover:bg-white/20 transition">
                                            <ArrowUpRight className="w-5 h-5 text-white" />
                                        </button>
                                    </div>

                                    <div className="mt-4 space-y-4">
                                        <div className="p-4 bg-white/5 border border-white/5 rounded-2xl hover:bg-white/10 transition cursor-pointer">
                                            <div className="flex justify-between items-center mb-2">
                                                <h4 className="font-bold text-xl text-white">Pocket Lawyer</h4>
                                                <span className="text-[10px] px-2 py-0.5 bg-green-500/20 text-green-400 rounded-full uppercase tracking-wide">Live</span>
                                            </div>
                                            <p className="text-zinc-400 text-xs mb-3">AI-powered legal assistant using custom LLMs.</p>
                                            <div className="flex gap-2">
                                                <span className="text-[10px] text-zinc-500 bg-black/30 px-2 py-1 rounded">Python</span>
                                                <span className="text-[10px] text-zinc-500 bg-black/30 px-2 py-1 rounded">AI</span>
                                            </div>
                                        </div>

                                        <div className="space-y-3 pt-2">
                                            <div className="flex justify-between items-center group/item cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-purple-500/20 rounded flex items-center justify-center text-purple-400"><Terminal className="w-4 h-4" /></div>
                                                    <div>
                                                        <div className="text-sm font-bold">Custom LLM</div>
                                                        <div className="text-[10px] text-zinc-500">Fine-tuned model</div>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover/item:text-white transition" />
                                            </div>

                                            <div className="flex justify-between items-center group/item cursor-pointer">
                                                <div className="flex items-center gap-3">
                                                    <div className="w-8 h-8 bg-orange-500/20 rounded flex items-center justify-center text-orange-400"><Cpu className="w-4 h-4" /></div>
                                                    <div>
                                                        <div className="text-sm font-bold">Robot Control</div>
                                                        <div className="text-[10px] text-zinc-500">Embedded Systems</div>
                                                    </div>
                                                </div>
                                                <ArrowUpRight className="w-3 h-3 text-zinc-600 group-hover/item:text-white transition" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Card>

                            {/* 7. Credentials (Vertical 1x2) */}
                            <Card className="row-span-2 md:col-span-1 md:row-span-2 bg-gradient-to-b from-white/5 to-white/10 cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.4}>
                                <div className="flex items-center gap-2 mb-6">
                                    <Award className="w-5 h-5 text-yellow-500" />
                                    <h3 className="font-bold text-lg">Credentials</h3>
                                </div>

                                <div className="space-y-6 relative">
                                    <div className="absolute left-[5px] top-2 bottom-2 w-[1px] bg-zinc-800 z-0"></div>

                                    <div className="relative z-10 pl-5">
                                        <div className="w-2.5 h-2.5 bg-yellow-500 rounded-full absolute left-0 top-1.5 border-2 border-[#1c1c1e]"></div>
                                        <div className="text-xs text-zinc-500 font-mono mb-1">2025</div>
                                        <h4 className="font-bold text-sm text-white leading-tight">GSoC</h4>
                                        <p className="text-xs text-zinc-400 mt-1">Google Summer of Code</p>
                                    </div>

                                    <div className="relative z-10 pl-5">
                                        <div className="w-2.5 h-2.5 bg-blue-500 rounded-full absolute left-0 top-1.5 border-2 border-[#1c1c1e]"></div>
                                        <div className="text-xs text-zinc-500 font-mono mb-1">2025</div>
                                        <h4 className="font-bold text-sm text-white leading-tight">Gen AI Course</h4>
                                        <p className="text-xs text-zinc-400 mt-1">NXT Wave</p>
                                    </div>

                                    <div className="relative z-10 pl-5">
                                        <div className="w-2.5 h-2.5 bg-red-500 rounded-full absolute left-0 top-1.5 border-2 border-[#1c1c1e]"></div>
                                        <div className="text-xs text-zinc-500 font-mono mb-1">2024</div>
                                        <h4 className="font-bold text-sm text-white leading-tight">Ethical Hacking</h4>
                                        <p className="text-xs text-zinc-400 mt-1">Seminar</p>
                                    </div>
                                </div>

                                <div className="mt-auto pt-4 border-t border-white/5">
                                    <div className="flex items-center gap-2 text-xs text-zinc-500 cursor-pointer hover:text-white transition">
                                        <span>View all certificates</span>
                                        <ArrowUpRight className="w-3 h-3" />
                                    </div>
                                </div>
                            </Card>

                            {/* 8. GitHub (1x1) */}
                            <Card className="md:col-span-1 md:row-span-1 bg-[#0d1117] border-white/10 cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.45}>
                                <div className="flex justify-between items-start">
                                    <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center">
                                        <Github className="w-6 h-6 text-white" />
                                    </div>
                                    <ArrowUpRight className="w-4 h-4 text-zinc-500" />
                                </div>
                                <div className="mt-4">
                                    <h3 className="font-bold text-lg">GitHub</h3>
                                    <p className="text-xs text-zinc-500 mb-3">Check my code</p>
                                    <ContributionGraph />
                                </div>
                            </Card>

                            {/* 9. LeetCode (1x1) */}
                            <Card className="md:col-span-1 md:row-span-1 bg-gradient-to-br from-white/5 to-white/10 border-l-4 border-l-[#ffa116] cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.5}>
                                <div className="flex justify-between items-start mb-6">
                                    <div className="flex items-center gap-2">
                                        <Code className="w-5 h-5 text-[#ffa116]" />
                                        <span className="font-bold text-sm text-[#ffa116]">LeetCode</span>
                                    </div>
                                    <div className="text-xs font-mono text-zinc-500">Rank: 12k</div>
                                </div>
                                <div className="mt-auto">
                                    <div className="text-3xl font-bold text-white">350+</div>
                                    <p className="text-xs text-zinc-400">Problems Solved</p>
                                </div>
                            </Card>

                            {/* 10. LinkedIn (Small) */}
                            <Card className="md:col-span-1 md:row-span-1 bg-[#0077b5] text-white border-none cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.55}>
                                <div className="flex justify-between items-start mb-6">
                                    <Linkedin className="w-8 h-8" />
                                    <button className="bg-white/20 p-1.5 rounded-full hover:bg-white/30 transition-colors">
                                        <ExternalLink className="w-4 h-4 text-white" />
                                    </button>
                                </div>
                                <div className="mt-auto">
                                    <h3 className="font-bold text-lg">Connect</h3>
                                    <p className="text-blue-100 text-xs opacity-80">Let's work together</p>
                                </div>
                            </Card>

                            {/* 11. Twitter / X (Small) */}
                            <Card className="md:col-span-1 md:row-span-1 bg-white/5 border border-white/10 cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.6}>
                                <div className="h-full flex flex-col justify-center items-center text-center">
                                    <Twitter className="w-8 h-8 text-white mb-3" />
                                    <h3 className="font-bold">Twitter</h3>
                                    <p className="text-xs text-zinc-500 mt-1">@venkatesh_dev</p>
                                </div>
                            </Card>

                            {/* 12. Contact (Wide) */}
                            <Card className="md:col-span-2 md:row-span-1 bg-white text-black text-center cursor-pointer hover:ring-2 ring-white/20 transition-all" delay={0.65}>
                                <div className="h-full flex flex-col justify-center items-center gap-3">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-full bg-black text-white flex items-center justify-center">
                                            <Mail className="w-5 h-5" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-bold text-xl leading-none">Say Hello</h3>
                                            <p className="text-xs text-zinc-500">Open for new opportunities</p>
                                        </div>
                                    </div>
                                    <button className="mt-2 bg-black text-white text-xs font-bold py-2 px-8 rounded-full hover:bg-zinc-800 transition-colors">
                                        Contact Me
                                    </button>
                                </div>
                            </Card>

                        </div>
                    </div>
                </motion.div>
            </AnimatePresence>
        </>
    );
}
