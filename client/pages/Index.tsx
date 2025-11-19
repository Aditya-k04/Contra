import { useEffect, useState, useRef } from "react";

export default function Index() {
  const [scale, setScale] = useState(1);
  const [showBurst, setShowBurst] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const maxScale = 40;
  const scrollTriggerDistance = 3000; // pixels needed to reach max scale

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Calculate scale with exponential curve
      // Reaches maxScale (40x) at scrollTriggerDistance
      const progress = Math.min(scrollY / scrollTriggerDistance, 1);
      // Exponential easing: cubic for natural feel
      const easedProgress = progress * progress * progress;
      const currentScale = 1 + easedProgress * (maxScale - 1);
      
      setScale(currentScale);

      // Trigger burst effect when max scale is reached
      if (progress >= 1 && !showBurst) {
        setShowBurst(true);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showBurst]);

  return (
    <div ref={containerRef} className="relative">
      <div className="min-h-screen flex flex-col lg:flex-row overflow-hidden">
        {/* Left Section */}
        <div className="flex-1 bg-[#FAFAFA] flex items-center justify-center px-6 py-12 lg:py-0">
          <div className="flex flex-col items-start gap-6 max-w-[492px] w-full">
            <h1 className="text-[#181818] font-normal text-[clamp(32px,5vw,48px)] leading-[100%] tracking-[-0.02em]">
              2025:<br />
              The year you built with
            </h1>
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/8bd043fe036bcf23549b5e73e042f4ec03497b35?width=462"
              alt="Contra"
              className="w-[231px] h-auto"
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 bg-[#000000] flex items-center justify-center relative overflow-hidden">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: "center center",
              willChange: "transform",
              transition: "transform 0.016s linear",
            }}
          >
            <img
              src="https://api.builder.io/api/v1/image/assets/TEMP/352bc2b14b51ee7b4f1dd013e06103e38711da49?width=1600"
              alt="3D Ribbon Graphic"
              className="w-full h-full object-cover lg:object-contain max-w-[800px]"
              style={{ color: "#151720", backgroundColor: "#151720" }}
            />
          </div>
        </div>
      </div>

      {/* White Burst Effect */}
      {showBurst && (
        <div
          className="fixed inset-0 bg-white pointer-events-none"
          style={{
            animation: "whiteBurst 0.8s ease-out forwards",
            zIndex: 50,
          }}
        />
      )}

      {/* Add animation styles */}
      <style>{`
        @keyframes whiteBurst {
          0% {
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            opacity: 1;
          }
        }
      `}</style>

      {/* Create scrollable content */}
      <div className="min-h-[300vh] bg-gradient-to-b from-white via-gray-50 to-white flex items-center justify-center">
        <div className="text-center px-6">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Scroll Complete
          </h2>
          <p className="text-lg md:text-xl text-gray-600">
            You've reached the end of the zoom journey
          </p>
        </div>
      </div>
    </div>
  );
}
