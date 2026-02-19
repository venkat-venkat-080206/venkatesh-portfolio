"use client";

export default function FloatingElements() {
  // Random scattered positions with MORE gaps + continuous loop
  // Replaced all types with 'heart' for uniform theme
  const svgDesigns = [
    { type: "heart", left: "5%", startY: "85%", delay: 0, duration: 12, size: 40 },
    { type: "heart", left: "22%", startY: "45%", delay: 4, duration: 14, size: 30 },
    { type: "heart", left: "38%", startY: "75%", delay: 2, duration: 10, size: 50 },
    { type: "heart", left: "55%", startY: "55%", delay: 6, duration: 13, size: 35 },
    { type: "heart", left: "15%", startY: "35%", delay: 8, duration: 11, size: 45 },
    { type: "heart", left: "70%", startY: "90%", delay: 3, duration: 15, size: 25 },
    { type: "heart", left: "48%", startY: "25%", delay: 10, duration: 16, size: 55 },
    { type: "heart", left: "82%", startY: "65%", delay: 1, duration: 12, size: 30 },
    { type: "heart", left: "28%", startY: "95%", delay: 5, duration: 14, size: 40 },
    { type: "heart", left: "92%", startY: "50%", delay: 7, duration: 13, size: 35 },
    { type: "heart", left: "62%", startY: "15%", delay: 9, duration: 11, size: 50 },
    { type: "heart", left: "8%", startY: "70%", delay: 2, duration: 15, size: 28 },
    { type: "heart", left: "75%", startY: "30%", delay: 11, duration: 8, size: 42 },
    { type: "heart", left: "42%", startY: "88%", delay: 4, duration: 14, size: 38 },
  ];

  const renderSVG = (type: string, size: number = 40) => {
    // Single Heart Shape
    return (
      <svg width={size} height={size} viewBox="0 0 24 24" fill="none">
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="url(#gradHeart)"
          opacity="0.6"
        />
        <defs>
          <linearGradient id="gradHeart" x1="0%" y1="0%" x2="100%" y2="100%">
            {/* Cyan to Blue to Teal - Matching Living Particle Background */}
            <stop offset="0%" stopColor="#22d3ee" stopOpacity="0.8" /> {/* Cyan */}
            <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.8" /> {/* Blue */}
            <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.8" /> {/* Teal */}
          </linearGradient>
        </defs>
      </svg>
    );
  };

  return (
    <>
      {svgDesigns.map((item, index) => (
        <div
          key={index}
          className="svg-float-wrap"
          style={{
            position: "absolute",
            top: item.startY,
            left: item.left,
            // Updated shadow to be Cyan/Blue glow
            filter: "drop-shadow(0 0 8px rgba(34, 211, 238, 0.4))",
            animation: `wrapFloat ${item.duration}s linear ${item.delay}s infinite`,
          }}
        >
          {renderSVG(item.type, item.size)}
        </div>
      ))}

      <style jsx global>{`
        .svg-float-wrap {
          pointer-events: none;
          z-index: 1;
        }

        @keyframes wrapFloat {
          0% {
            transform: translateY(0) rotate(0deg) scale(0.8);
            opacity: 0;
          }
          10% {
            opacity: 0.6;
            transform: translateY(-10vh) rotate(10deg) scale(1);
          }
          90% {
            opacity: 0.6;
            transform: translateY(-90vh) rotate(350deg) scale(1);
          }
          100% {
            transform: translateY(-100vh) rotate(360deg) scale(0.8);
            opacity: 0;
          }
        }
      `}</style>
    </>
  );
}
