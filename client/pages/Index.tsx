import { useEffect, useState, useRef } from "react";
import { EarningsSummary } from "@/components/EarningsSummary";

export default function Index() {
  const [scale, setScale] = useState(1);
  const [whiteOverlayOpacity, setWhiteOverlayOpacity] = useState(0);
  const scrollInputRef = useRef(0);
  const maxScale = 40;
  const scrollUnits = 3;
  const pixelsPerUnit = 120;
  const maxScrollInput = scrollUnits * pixelsPerUnit;
  const isScreenOneActive = whiteOverlayOpacity < 1;

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Only prevent default scroll during Screen 1 (zoom animation)
      if (isScreenOneActive) {
        e.preventDefault();

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
        setWhiteOverlayOpacity(Math.min(1, burstProgress));
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    return () => window.removeEventListener("wheel", handleWheel);
  }, [isScreenOneActive]);

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
          zIndex: 45,
          willChange: "opacity, transform",
          transition: "opacity 0.2s linear, transform 0.2s linear",
          transform: `scale(${1 + whiteOverlayOpacity * 0.1})`,
          pointerEvents: whiteOverlayOpacity > 0.9 ? "auto" : "none",
        }}
      />

      {/* SCREEN 1: Main Content Container */}
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

      {/* ===== SCREEN 2: EARNINGS SUMMARY ===== */}
      {/* This appears as the next screen in natural flow */}
      <div
        style={{
          position: "relative",
          zIndex: 50,
          width: "100vw",
          height: "900px",
          overflow: "hidden",
        }}
      >
        <EarningsSummary />
      </div>

      {/* Global styles */}
      <style>{`
        html, body {
          height: auto;
          overflow: ${isScreenOneActive ? "hidden" : "auto"};
          width: 100%;
          margin: 0;
          padding: 0;
        }
      `}</style>
    </>
  );
}
