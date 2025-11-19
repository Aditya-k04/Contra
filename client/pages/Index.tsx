import { useEffect, useState, useRef } from "react";
import { EarningsSummary } from "@/components/EarningsSummary";

export default function Index() {
  // Screen state: "screen1" or "earnings"
  const [screenState, setScreenState] = useState<"screen1" | "earnings">("screen1");
  const [scale, setScale] = useState(1);
  const [whiteOverlayOpacity, setWhiteOverlayOpacity] = useState(0);
  const scrollInputRef = useRef(0);
  const maxScale = 40;
  const scrollUnits = 3;
  const pixelsPerUnit = 120;
  const maxScrollInput = scrollUnits * pixelsPerUnit;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();

      if (screenState === "screen1") {
        // Screen 1: Scroll-scrub zoom animation
        scrollInputRef.current += e.deltaY;
        scrollInputRef.current = Math.max(0, Math.min(scrollInputRef.current, maxScrollInput));

        const progress = scrollInputRef.current / maxScrollInput;

        const easedProgress = progress < 0.5
          ? 2 * progress * progress
          : -1 + (4 - 2 * progress) * progress;

        const currentScale = 1 + easedProgress * (maxScale - 1);
        setScale(currentScale);

        const burstStartScale = 35;
        const burstRange = maxScale - burstStartScale;
        const burstProgress = Math.max(0, (currentScale - burstStartScale) / burstRange);
        const newOpacity = Math.min(1, burstProgress);
        setWhiteOverlayOpacity(newOpacity);

        // When burst completes, switch to Earnings screen
        if (newOpacity >= 1 && scrollInputRef.current >= maxScrollInput) {
          setScreenState("earnings");
        }
      } else if (screenState === "earnings") {
        // Earnings screen: Detect scroll direction to go back
        if (e.deltaY < 0) {
          // Scrolling UP: return to Screen 1
          setScreenState("screen1");
          scrollInputRef.current = maxScrollInput; // Set to max zoom state
          setScale(maxScale);
          setWhiteOverlayOpacity(1); // Keep burst visible at this state
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [screenState]);

  return (
    <>
      {/* ===== SCREEN 1: ZOOM IMAGE + WHITE BURST ===== */}
      
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
          opacity: screenState === "screen1" ? 1 : 0,
          pointerEvents: screenState === "screen1" ? "auto" : "none",
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
          opacity: screenState === "screen1" ? whiteOverlayOpacity : 0,
          zIndex: 45,
          willChange: "opacity, transform",
          transition: screenState === "screen1" ? "opacity 0.2s linear, transform 0.2s linear" : "opacity 0.3s ease-out",
          transform: screenState === "screen1" ? `scale(${1 + whiteOverlayOpacity * 0.1})` : "scale(1)",
          pointerEvents: screenState === "screen1" && whiteOverlayOpacity > 0.9 ? "auto" : "none",
        }}
      />

      {/* SCREEN 1: Main Content Container */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 30,
          backgroundColor: "#000000",
          overflow: "hidden",
          opacity: screenState === "screen1" ? 1 : 0,
          pointerEvents: screenState === "screen1" ? "auto" : "none",
          transition: "opacity 0.3s ease-out",
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

      {/* ===== SCREEN 2: EARNINGS SUMMARY ===== */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          zIndex: 2,
          overflow: "hidden",
          opacity: screenState === "earnings" ? 1 : 0,
          pointerEvents: screenState === "earnings" ? "auto" : "none",
          transition: screenState === "earnings" ? "opacity 0.4s ease-out" : "opacity 0.2s ease-out",
          backgroundColor: "#FAFAFA",
        }}
      >
        {/* Static Gradient Ellipse Background - visible immediately */}
        {screenState === "earnings" && (
          <div
            style={{
              position: "absolute",
              top: "410px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "1323px",
              height: "1323px",
              borderRadius: "50%",
              background: "linear-gradient(90deg, #F3E4FF 0%, #D2E8FA 40%, #E3FCFF 100%)",
              filter: "blur(144px)",
              zIndex: 1,
              pointerEvents: "none",
              opacity: 1,
            }}
          />
        )}

        <EarningsSummary isActive={screenState === "earnings"} />
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
