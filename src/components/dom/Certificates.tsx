"use client";

import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion';
import { X, Download, ShieldCheck, ArrowUpRight, Trophy } from 'lucide-react';

// --- Data ---
const certificates = [
  {
    id: 1,
    title: "AWS Project Completion",
    issuer: "NxtWave",
    date: "Jun 2024",
    credentialId: "AWS-PROJ-2024",
    description: "Successfully built and deployed an application on Amazon Web Services using AWS S3. Demonstrated practical skills in cloud deployment and object storage configuration.",
    skills: ["AWS S3", "Cloud Deployment", "Infrastructure"],
    image: "/assets/certificates/AWS Project Completion Certificate.png"
  },
  {
    id: 2,
    title: "AWS Participation",
    issuer: "AWS",
    date: "Jun 2024",
    credentialId: "AWS-PART-2024",
    description: "Participated in AWS Cloud Practitioner Essentials. Gained foundational knowledge of AWS Cloud concepts, security, and services.",
    skills: ["Cloud Computing", "AWS", "Fundamentals"],
    image: "/assets/certificates/AWS Participation Certificate.png"
  },
  {
    id: 3,
    title: "Generative AI Workshop",
    issuer: "Microsoft & NxtWave",
    date: "Sep 2024",
    credentialId: "GEN-AI-2024",
    description: "Attended the Generative AI Mega Workshop 2.0 hosted by Microsoft SDE II. Gained insights into LLMs, prompt engineering, and the future of AI technology.",
    skills: ["Generative AI", "LLMs", "Prompt Engineering"],
    image: "/assets/certificates/Gen AI Participation Certificate.png"
  },
  {
    id: 4,
    title: "Data Scientist Masterclass",
    issuer: "Microsoft & NxtWave",
    date: "Jun 2024",
    credentialId: "DS-MS-2024",
    description: "Attended 'How to Become a Data Scientist at Microsoft' masterclass. Learned about the career path, essential skills, and industry expectations for data science roles.",
    skills: ["Data Science", "Analytics", "Career Strategy"],
    image: "/assets/certificates/Data scientist Certificate.png"
  },
  {
    id: 5,
    title: "UI/UX Design Workshop",
    issuer: "NxtWave",
    date: "Dec 2024",
    credentialId: "UIUX-WORK-2024",
    description: "Participated in a comprehensive UI/UX workshop. Learned principles of user-centered design, wireframing, and prototyping.",
    skills: ["Figma", "User Research", "Prototyping"],
    image: "/assets/certificates/UI UX Design Participation Certificate.png"
  },
  {
    id: 6,
    title: "DSA Completion Reward",
    issuer: "CCBP 4.0 Academy",
    date: "2024",
    credentialId: "DSA-CV-11",
    description: "Awarded for completing Data Structures and Algorithms module. Demonstrated strong problem-solving skills and proficiency in algorithms.",
    skills: ["Algorithms", "Data Structures", "Problem Solving"],
    image: "/assets/certificates/DSA Completion Reward.png"
  },
  {
    id: 7,
    title: "NxtCode Challenge",
    issuer: "NxtWave",
    date: "Oct 2024",
    credentialId: "NXT-7-CODE",
    description: "Participated in the NxtCode 7 Days 7 Codes Challenge. Completed coding challenges demonstrating consistency and speed in programming.",
    skills: ["Coding", "Logic Building", "Consistency"],
    image: "/assets/certificates/NxtCode 7 days 7 codes Participation Certificate.png"
  },
  {
    id: 8,
    title: "Sid's Farm Project",
    issuer: "Sid's Farm",
    date: "2024",
    credentialId: "SID-FARM-2024",
    description: "Completed a project with Sid's Farm. Involved in developing digital solutions or analyzing data for the organization.",
    skills: ["Project Management", "Development", "Collaboration"],
    image: "/assets/certificates/Sid's Farm Certificate.png"
  },
  {
    id: 9,
    title: "BrainTap Fitness Broadcast",
    issuer: "BrainTap",
    date: "2024",
    credentialId: "bt-FITness",
    description: "Certificate of participation in BrainTap Fitness Broadcast event.",
    skills: ["Wellness", "Technology", "Health"],
    image: "/assets/certificates/BrainTap Fitness Boardcast Certificate.png"
  }
];

export default function Certificates() {
  const [selectedCert, setSelectedCert] = useState<typeof certificates[0] | null>(null);

  // Lock body scroll when modal is open
  React.useEffect(() => {
    if (selectedCert) {
        document.body.style.overflow = 'hidden';
         document.documentElement.classList.add('lenis-stopped');
    } else {
        document.body.style.overflow = '';
         document.documentElement.classList.remove('lenis-stopped');
    }
    return () => {
        document.body.style.overflow = '';
         document.documentElement.classList.remove('lenis-stopped');
    };
  }, [selectedCert]);

  return (
    <div className="relative w-full z-10">
      <CertificatesSection onOpenCert={setSelectedCert} />
      
      <AnimatePresence>
        {selectedCert && (
          <CertificateModal cert={selectedCert} onClose={() => setSelectedCert(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}

// --- NEW RESPONSIVE WRAP LAYOUT ---
const CertificatesSection = ({ onOpenCert }: { onOpenCert: (cert: any) => void }) => {
  return (
    <section 
      className="min-h-screen py-32 bg-transparent z-10 flex flex-col justify-center relative border-t border-white/5"
    >
       <div className="w-full px-4 md:px-10">
          {/* Header */}
          <div className="flex items-end justify-between mb-16 px-4">
             <div>
                <motion.h2 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-5xl md:text-8xl font-bold tracking-tighter text-white mb-6 font-syne"
                >
                   My <span className="text-white/40">Credentials</span>
                </motion.h2>
                <motion.p 
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.2, duration: 0.8 }}
                    className="text-white/60 max-w-lg text-xl font-dm-sans font-light"
                >
                   A collection of certifications and achievements. Hover to verify.
                </motion.p>
             </div>
             <div className="hidden md:flex gap-2 text-cyan-400 font-mono text-xs uppercase tracking-widest border border-cyan-400/20 px-3 py-1 rounded-full bg-cyan-900/10">
                System: Verified
             </div>
          </div>

          <LayoutGroup>
              <div className="flex flex-wrap justify-center gap-4 w-full max-w-[1600px] mx-auto">
                 {certificates.map((cert) => (
                    <ElasticCard 
                       key={cert.id} 
                       cert={cert} 
                       onClick={() => onOpenCert(cert)}
                    />
                 ))}
              </div>
          </LayoutGroup>

       </div>
    </section>
  );
};

const ElasticCard = ({ cert, onClick }: { cert: any, onClick: () => void }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      layout
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
      initial={{ width: 90 }}
      animate={{ width: isHovered ? 450 : 90 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className={`relative h-[400px] rounded-[2rem] overflow-hidden cursor-pointer border border-white/10 hover:border-cyan-400/50 transition-colors shadow-2xl flex flex-col shrink-0 bg-white/5 backdrop-blur-xl group ${isHovered ? 'z-10' : 'z-0'}`}
    >
        {/* Glass Reflection effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none z-20" />

      {/* Vertical Spine (Visible when shrunk) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
         <motion.div 
            animate={{ opacity: isHovered ? 0 : 1 }}
            className="flex flex-col items-center gap-6 h-full py-12"
         >
            <span className="text-cyan-400 font-mono text-sm font-bold">
               {cert.id < 10 ? `0${cert.id}` : cert.id}
            </span>
            <div className="h-full w-[1px] bg-white/10" />
            <span className="text-white/40 text-xs font-mono uppercase whitespace-nowrap tracking-widest" style={{ writingMode: 'vertical-rl' }}>
               {cert.issuer}
            </span>
         </motion.div>
      </div>

      {/* Expanded Content (Visible when hovered) */}
      <motion.div 
         animate={{ opacity: isHovered ? 1 : 0 }}
         className="absolute inset-0 p-8 flex flex-col justify-between min-w-[400px] z-10" 
      >
         {/* Top Info */}
         <div className="flex justify-between items-start">
            <div className="w-10 h-10 rounded-full bg-cyan-500/10 flex items-center justify-center text-cyan-400 border border-cyan-500/20">
               <Trophy size={18} />
            </div>
            <ArrowUpRight className="text-white/30 w-6 h-6" />
         </div>

         {/* Title & Desc */}
         <div>
            <h3 className="text-3xl font-bold text-white mb-3 leading-tight font-syne">
               {cert.title}
            </h3>
            <p className="text-white/60 text-sm line-clamp-3 mb-6 font-dm-sans font-light">
               {cert.description}
            </p>
            <div className="flex items-center gap-3 flex-wrap">
               <span className="px-3 py-1 bg-cyan-900/30 text-cyan-300 text-[10px] font-bold uppercase tracking-wider rounded-lg border border-cyan-500/20 font-dm-sans">
                  {cert.issuer}
               </span>
               <span className="text-white/40 text-[10px] font-mono">{cert.date}</span>
            </div>
         </div>
      </motion.div>

      {/* Hover Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/40 via-transparent to-transparent pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  );
};

// --- CERTIFICATE DETAIL MODAL (Glass Vault) ---
const CertificateModal = ({ cert, onClose }: { cert: any, onClose: () => void }) => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* Backdrop */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
      />

      {/* Card Content */}
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 50 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 50 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className="relative w-full max-w-6xl bg-black/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col md:flex-row h-[85vh] md:h-[80vh]"
      >
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-6 right-6 z-20 p-3 bg-black/40 hover:bg-white hover:text-black rounded-full transition-colors border border-white/10 backdrop-blur-md group"
        >
          <X size={20} className="group-hover:rotate-90 transition-transform duration-300"/>
        </button>

        {/* Left: Visual */}
        <div className="w-full md:w-1/2 h-[40%] md:h-full relative bg-[#050505] flex items-center justify-center overflow-hidden p-8 md:p-16 group">
           {/* Abstract BG pattern */}
           <div className="absolute inset-0 opacity-10" 
                style={{ backgroundImage: 'radial-gradient(circle at center, #22d3ee 0%, transparent 70%)' }} 
           />
           
           <img 
              src={cert.image} 
              alt={cert.title} 
              className="relative z-10 w-full h-auto max-h-full object-contain rounded-lg shadow-2xl border border-white/10 group-hover:scale-105 transition-transform duration-700"
           />
        </div>

        {/* Right: Details */}
        <div className="w-full md:w-1/2 h-full p-8 md:p-12 flex flex-col bg-transparent overflow-y-auto" data-lenis-prevent>
           <div className="mb-auto">
              <div className="flex items-center gap-3 mb-8">
                 <span className="px-4 py-1.5 bg-cyan-950/50 text-cyan-400 border border-cyan-500/20 rounded-full text-xs font-bold uppercase tracking-wider font-dm-sans">
                    {cert.issuer}
                 </span>
                 <span className="text-white/30 text-sm font-mono">{cert.date}</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-none font-syne">
                 {cert.title}
              </h2>
              
              <p className="text-white/70 text-lg leading-relaxed mb-10 font-dm-sans font-light">
                 {cert.description}
              </p>

              <div className="mb-8">
                 <h4 className="text-xs font-bold uppercase tracking-widest text-white/30 mb-5 font-dm-sans border-b border-white/5 pb-2">Skills & Technologies</h4>
                 <div className="flex flex-wrap gap-2">
                    {cert.skills?.map((skill: string, i: number) => (
                       <span key={i} className="px-4 py-2 bg-white/5 text-white/80 rounded-xl text-sm border border-white/5 hover:border-white/20 transition-colors font-dm-sans hover:bg-white/10 cursor-default">
                          {skill}
                       </span>
                    ))}
                 </div>
              </div>
           </div>

           {/* Actions */}
           <div className="flex gap-4 pt-8 border-t border-white/10 mt-8">
              <button className="flex-1 py-4 bg-white text-black font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors font-syne">
                 <Download size={20} /> Download
              </button>
              <button className="flex-1 py-4 bg-white/5 text-white font-bold rounded-2xl flex items-center justify-center gap-2 hover:bg-white/10 transition-colors border border-white/10 font-syne">
                 <ShieldCheck size={20} /> Verify ID
              </button>
           </div>
        </div>
      </motion.div>
    </div>
  );
};
