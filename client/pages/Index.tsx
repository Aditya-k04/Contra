import { useEffect, useState, useRef } from "react";

export default function Index() {
  const [scale, setScale] = useState(1);
  const [whiteOverlayOpacity, setWhiteOverlayOpacity] = useState(0);
  const maxScale = 40;
  const scrollDistance = window.innerHeight * 3; // ~300% of viewport

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      
      // Calculate progress (0 to 1)
      const progress = Math.min(scrollY / scrollDistance, 1);
      
      // EaseInOut easing function for smooth growth
      const easedProgress = progress < 0.5 
        ? 2 * progress * progress 
        : -1 + (4 - 2 * progress) * progress;
      
      const currentScale = 1 + easedProgress * (maxScale - 1);
      setScale(currentScale);

      // Trigger white overlay at max scale
      if (progress >= 1) {
        setWhiteOverlayOpacity(1);
      } else {
        setWhiteOverlayOpacity(0);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* Fixed Full-Screen Image Container */}
      <div
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "100%",
          height: "100%",
          zIndex: 40,
          willChange: "transform",
        }}
      >
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/352bc2b14b51ee7b4f1dd013e06103e38711da49?width=1600"
          alt="3D Ribbon Graphic"
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: `translate(-50%, -50%) scale(${scale})`,
            width: "800px",
            height: "800px",
            objectFit: "contain",
            willChange: "transform",
            transition: "transform 0.016s linear",
          }}
        />
      </div>

      {/* White Burst Overlay */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          backgroundColor: "#FFFFFF",
          opacity: whiteOverlayOpacity,
          zIndex: 50,
          willChange: "opacity",
          transition: "opacity 0.6s ease-out",
          pointerEvents: whiteOverlayOpacity === 1 ? "auto" : "none",
        }}
      />

      {/* Scrollable Content Container */}
      <div
        style={{
          position: "relative",
          zIndex: 30,
          backgroundColor: "#000000",
          overflow: "hidden",
        }}
      >
        {/* Hero Section - Dark */}
        <div className="min-h-screen flex flex-col lg:flex-row relative">
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

          {/* Right Section - Empty for fixed image */}
          <div className="flex-1 bg-[#000000]" />
        </div>

        {/* Scroll Content */}
        <div className="min-h-[300vh] bg-gradient-to-b from-black via-gray-900 to-white flex items-center justify-center">
          <div className="text-center px-6 py-20">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Scroll Complete
            </h2>
            <p className="text-lg md:text-xl text-gray-300">
              You've reached the end of the zoom journey
            </p>
          </div>
        </div>
      </div>

      {/* Global overflow hidden style */}
      <style>{`
        html, body {
          overflow-x: hidden;
        }
      `}</style>
    </>
  );
}
