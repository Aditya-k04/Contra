import { useEffect, useState } from "react";

export default function Index() {
  const [scale, setScale] = useState(1);
  const [whiteOverlayOpacity, setWhiteOverlayOpacity] = useState(0);
  const [summaryScreenVisible, setSummaryScreenVisible] = useState(false);
  const maxScale = 40;
  const scrollUnits = 3;
  const pixelsPerUnit = 120;
  const maxScrollInput = scrollUnits * pixelsPerUnit;

  let scrollInput = 0;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      scrollInput += e.deltaY;
      scrollInput = Math.max(0, Math.min(scrollInput, maxScrollInput));

      const progress = scrollInput / maxScrollInput;

      const easedProgress = progress < 0.5
        ? 2 * progress * progress
        : -1 + (4 - 2 * progress) * progress;

      const currentScale = 1 + easedProgress * (maxScale - 1);
      setScale(currentScale);

      const burstStartScale = 35;
      const burstRange = maxScale - burstStartScale;
      const burstProgress = Math.max(0, (currentScale - burstStartScale) / burstRange);
      setWhiteOverlayOpacity(Math.min(1, burstProgress));

      // Trigger summary screen when white burst is complete
      if (burstProgress >= 1) {
        setSummaryScreenVisible(true);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, []);

  return (
    <>
      {/* Fixed Image - Positioned on right side */}
      <img
        src="https://api.builder.io/api/v1/image/assets/TEMP/352bc2b14b51ee7b4f1dd013e06103e38711da49?width=1600"
        alt="3D Ribbon Graphic"
        style={{
          position: "fixed",
          top: "50%",
          right: 0,
          transform: `translateY(-50%) scale(${scale})`,
          height: "70vh",
          width: "auto",
          objectFit: "contain",
          zIndex: 40,
          willChange: "transform",
          transition: "transform 0.016s linear",
        }}
      />

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
          willChange: "opacity, transform",
          transition: "opacity 0.2s linear, transform 0.2s linear",
          transform: `scale(${1 + whiteOverlayOpacity * 0.1})`,
          pointerEvents: whiteOverlayOpacity === 1 ? "auto" : "none",
        }}
      />

      {/* Yearly Earnings Summary Screen */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 60,
          opacity: summaryScreenVisible ? 1 : 0,
          transform: summaryScreenVisible ? "translateY(0)" : "translateY(20px)",
          transition: "opacity 0.5s ease-out, transform 0.5s ease-out",
          willChange: "opacity, transform",
          pointerEvents: summaryScreenVisible ? "auto" : "none",
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center relative overflow-hidden"
          style={{
            background: "linear-gradient(135deg, #FEFEFE 0%, #F0F4FF 30%, #FFF0F8 60%, #FEFEFE 100%)",
          }}
        >
          {/* Radial Rings Background */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200vw] h-[200vw] pointer-events-none">
            {[1, 2, 3, 4].map((ring) => (
              <div
                key={ring}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-full"
                style={{
                  width: `${ring * 25}%`,
                  height: `${ring * 25}%`,
                  background: `radial-gradient(circle, transparent 60%, ${
                    ring % 2 === 0 
                      ? "rgba(147, 197, 253, 0.08)" 
                      : "rgba(251, 207, 232, 0.08)"
                  } 70%, transparent 80%)`,
                  filter: "blur(2px)",
                }}
              />
            ))}
          </div>

          {/* Content Container */}
          <div className="relative z-10 text-center px-6 py-12">
            {/* Headline */}
            <p className="text-gray-400 text-[clamp(16px,2vw,20px)] font-light mb-2 tracking-wide">
              In 2025, you earned
            </p>

            {/* Big Number */}
            <h1 className="text-[clamp(48px,10vw,96px)] font-bold text-black mb-8 tracking-tight">
              $50,000
            </h1>

            {/* Subtext */}
            <div className="space-y-1">
              <p className="text-gray-400 text-[clamp(14px,1.5vw,18px)] font-light">
                across
              </p>
              <p className="text-black text-[clamp(18px,2vw,24px)] font-bold">
                5 projects
              </p>
            </div>
          </div>

          {/* Floating Icon Badges */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Figma Logo - Top Left */}
            <div
              className="absolute"
              style={{
                left: "20%",
                top: "30%",
              }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 38 57" className="w-6 h-6 md:w-8 md:h-8">
                  <path fill="#1abcfe" d="M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z"/>
                  <path fill="#0acf83" d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 1 1-19 0z"/>
                  <path fill="#ff7262" d="M19 0v19h9.5a9.5 9.5 0 1 0 0-19H19z"/>
                  <path fill="#f24e1e" d="M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z"/>
                  <path fill="#a259ff" d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z"/>
                </svg>
              </div>
            </div>

            {/* Linear Logo - Left */}
            <div
              className="absolute"
              style={{
                left: "15%",
                top: "55%",
              }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="#5E6AD2">
                  <path d="M3.005 12l7.07 7.07 7.778-7.778L21 14.44 10.075 25.365 0 15.29z"/>
                </svg>
              </div>
            </div>

            {/* ByteDance-style Colorful Logo - Top Right */}
            <div
              className="absolute"
              style={{
                right: "22%",
                top: "25%",
              }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                <div className="relative w-6 h-6 md:w-8 md:h-8">
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-500 to-yellow-500 rounded-lg transform rotate-12"></div>
                </div>
              </div>
            </div>

            {/* Asterisk/Starburst Orange Logo - Center Right */}
            <div
              className="absolute"
              style={{
                right: "15%",
                top: "48%",
              }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="#FF6B35">
                  <path d="M12 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L12 11l-3.5 2.5 1.5-4.5-3.5-2.5h4.5z"/>
                  <path d="M12 22l-1.5-4.5H6l3.5-2.5-1.5-4.5L12 13l3.5-2.5-1.5 4.5 3.5 2.5h-4.5z"/>
                </svg>
              </div>
            </div>

            {/* Heart Logo - Bottom Right */}
            <div
              className="absolute"
              style={{
                right: "25%",
                bottom: "28%",
              }}
            >
              <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-white flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 24 24" className="w-6 h-6 md:w-8 md:h-8" fill="#EF4444">
                  <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div
        style={{
          position: "relative",
          zIndex: 30,
          backgroundColor: "#000000",
          width: "100vw",
          height: "100vh",
          overflow: "hidden",
        }}
      >
        {/* Hero Section */}
        <div className="w-full h-full flex flex-col lg:flex-row relative">
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
          <div className="flex-1 bg-[#151720]" />
        </div>
      </div>

      {/* Global styles */}
      <style>{`
        html, body {
          height: 100vh;
          overflow: hidden;
          width: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}
