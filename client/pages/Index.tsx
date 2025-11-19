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
          overflow: "hidden",
        }}
      >
        <div
          className="w-full h-full flex items-center justify-center relative"
          style={{
            background: "linear-gradient(135deg, #FEFEFE 0%, #F3F7FF 25%, #FEF5FA 50%, #F8FAFF 75%, #FEFEFE 100%)",
          }}
        >
          {/* Radial Rings Background - from bottom center */}
          <div
            className="absolute pointer-events-none"
            style={{
              bottom: "-10%",
              left: "50%",
              transform: "translateX(-50%)",
              width: "150vw",
              height: "150vh",
            }}
          >
            {/* Ring 1 - Outermost */}
            <div
              className="absolute rounded-full"
              style={{
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "120%",
                height: "120%",
                border: "1px solid",
                borderColor: "rgba(147, 197, 253, 0.15)",
                boxShadow: "0 0 40px rgba(147, 197, 253, 0.1), inset 0 0 40px rgba(147, 197, 253, 0.05)",
                filter: "blur(1px)",
              }}
            />
            {/* Ring 2 */}
            <div
              className="absolute rounded-full"
              style={{
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "75%",
                height: "75%",
                border: "1px solid",
                borderColor: "rgba(251, 207, 232, 0.12)",
                boxShadow: "0 0 30px rgba(251, 207, 232, 0.08)",
                filter: "blur(1px)",
              }}
            />
            {/* Ring 3 */}
            <div
              className="absolute rounded-full"
              style={{
                bottom: 0,
                left: "50%",
                transform: "translateX(-50%)",
                width: "45%",
                height: "45%",
                border: "1px solid",
                borderColor: "rgba(165, 180, 252, 0.15)",
                boxShadow: "0 0 20px rgba(165, 180, 252, 0.1)",
                filter: "blur(0.5px)",
              }}
            />
          </div>

          {/* Content Container */}
          <div className="relative z-20 text-center px-8">
            {/* Headline */}
            <p
              style={{
                color: "#A3A3A3",
                fontSize: "18px",
                fontWeight: 400,
                marginBottom: "8px",
                letterSpacing: "0.5px",
                fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
              }}
            >
              In 2025, you earned
            </p>

            {/* Big Number */}
            <h1
              style={{
                color: "#000000",
                fontSize: "clamp(56px, 12vw, 104px)",
                fontWeight: 700,
                marginBottom: "32px",
                marginTop: "8px",
                letterSpacing: "-1px",
                fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                lineHeight: 1.1,
              }}
            >
              $50,000
            </h1>

            {/* Subtext */}
            <div style={{ marginTop: "24px" }}>
              <p
                style={{
                  color: "#A3A3A3",
                  fontSize: "16px",
                  fontWeight: 400,
                  marginBottom: "4px",
                  fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                }}
              >
                across
              </p>
              <p
                style={{
                  color: "#000000",
                  fontSize: "clamp(18px, 2vw, 28px)",
                  fontWeight: 700,
                  fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, 'Inter', sans-serif",
                  letterSpacing: "-0.5px",
                }}
              >
                5 projects
              </p>
            </div>
          </div>

          {/* Floating Icon Badges */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {/* Sparkle/Cross - Top Left */}
            <div
              className="absolute"
              style={{
                left: "18%",
                top: "32%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#1A1A1A">
                  <path d="M12 2l1.5 4.5h4.5l-3.5 2.5 1.5 4.5L12 11l-3.5 2.5 1.5-4.5-3.5-2.5h4.5M12 14l-1.5 4.5h-4.5l3.5 2.5-1.5 4.5L12 22l3.5 2.5-1.5-4.5 3.5-2.5h-4.5z" />
                </svg>
              </div>
            </div>

            {/* ByteDance-style Logo - Top Right */}
            <div
              className="absolute"
              style={{
                right: "18%",
                top: "28%",
                transform: "translate(50%, -50%)",
              }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                <svg viewBox="0 0 24 24" className="w-7 h-7">
                  <defs>
                    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" style={{ stopColor: "#3B82F6", stopOpacity: 1 }} />
                      <stop offset="50%" style={{ stopColor: "#EC4899", stopOpacity: 1 }} />
                      <stop offset="100%" style={{ stopColor: "#F97316", stopOpacity: 1 }} />
                    </linearGradient>
                  </defs>
                  <rect x="4" y="4" width="16" height="16" rx="3" fill="url(#grad1)" />
                </svg>
              </div>
            </div>

            {/* Starburst/Asterisk Orange - Center */}
            <div
              className="absolute"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#FF6B35">
                  <path d="M12 2C12 2 13 6 13 6H18L14.5 8.5L15.5 13L12 10.5L8.5 13L9.5 8.5L6 6H11C11 6 12 2 12 2Z" />
                  <path d="M12 22C12 22 11 18 11 18H6L9.5 15.5L8.5 11L12 13.5L15.5 11L14.5 15.5L18 18H13C13 18 12 22 12 22Z" />
                </svg>
              </div>
            </div>

            {/* Figma Logo - Left */}
            <div
              className="absolute"
              style={{
                left: "15%",
                top: "58%",
                transform: "translate(-50%, -50%)",
              }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6">
                  <circle cx="6" cy="6" r="3" fill="#A259FF"/>
                  <circle cx="18" cy="6" r="3" fill="#F24E1E"/>
                  <circle cx="18" cy="18" r="3" fill="#00D084"/>
                  <circle cx="6" cy="18" r="3" fill="#0ACF83"/>
                  <circle cx="12" cy="12" r="3" fill="#1ABCFE"/>
                </svg>
              </div>
            </div>

            {/* Heart - Bottom Right */}
            <div
              className="absolute"
              style={{
                right: "18%",
                bottom: "25%",
                transform: "translate(50%, 50%)",
              }}
            >
              <div
                className="rounded-full flex items-center justify-center"
                style={{
                  width: "56px",
                  height: "56px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)",
                }}
              >
                <svg viewBox="0 0 24 24" className="w-6 h-6" fill="#DC2626">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
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
