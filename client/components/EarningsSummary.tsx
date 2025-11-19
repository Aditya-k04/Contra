import { useEffect, useRef, useState } from "react";

export const EarningsSummary = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number>();
  const startTimeRef = useRef<number>(0);

  // Define animation timeline (in milliseconds)
  const ANIMATION_DURATIONS = {
    text1: 500,      // "In 2025, you earned"
    text2: 400,      // "$50,000"
    circles: 500,    // glow circles
    text3: 400,      // "across"
    text4: 400,      // "5 projects"
    badgeDelay: 250, // stagger between badges
    badgeDuration: 300, // each badge animation
  };

  // Calculate timeline points
  const TIMELINE = {
    text1: { start: 0, duration: ANIMATION_DURATIONS.text1 },
    text2: { start: ANIMATION_DURATIONS.text1, duration: ANIMATION_DURATIONS.text2 },
    circles: { start: ANIMATION_DURATIONS.text1 + ANIMATION_DURATIONS.text2, duration: ANIMATION_DURATIONS.circles },
    text3: { start: ANIMATION_DURATIONS.text1 + ANIMATION_DURATIONS.text2 + ANIMATION_DURATIONS.circles, duration: ANIMATION_DURATIONS.text3 },
    text4: { start: ANIMATION_DURATIONS.text1 + ANIMATION_DURATIONS.text2 + ANIMATION_DURATIONS.circles + ANIMATION_DURATIONS.text3, duration: ANIMATION_DURATIONS.text4 },
  };

  TIMELINE.text1.end = TIMELINE.text1.start + TIMELINE.text1.duration;
  TIMELINE.text2.end = TIMELINE.text2.start + TIMELINE.text2.duration;
  TIMELINE.circles.end = TIMELINE.circles.start + TIMELINE.circles.duration;
  TIMELINE.text3.end = TIMELINE.text3.start + TIMELINE.text3.duration;
  TIMELINE.text4.end = TIMELINE.text4.start + TIMELINE.text4.duration;

  const badgesStartTime = TIMELINE.text4.end;

  // Helper to calculate element animation progress (0-1)
  const getAnimationProgress = (startTime: number, duration: number): number => {
    if (elapsedTime < startTime) return 0;
    if (elapsedTime >= startTime + duration) return 1;
    return (elapsedTime - startTime) / duration;
  };

  const getOpacity = (startTime: number, duration: number): number => {
    return getAnimationProgress(startTime, duration);
  };

  const getTranslateY = (startTime: number, duration: number): number => {
    const progress = getAnimationProgress(startTime, duration);
    return 20 * (1 - progress); // 20px to 0px
  };

  const getScale = (startTime: number, duration: number): number => {
    const progress = getAnimationProgress(startTime, duration);
    return 0.8 + 0.2 * progress; // 0.8 to 1
  };

  // Detect when earnings screen enters viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            startTimeRef.current = Date.now();
          }
        });
      },
      { threshold: 0.2 } // 20% of element visible
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [isVisible]);

  // Animation loop
  useEffect(() => {
    if (!isVisible) return;

    const animate = () => {
      const now = Date.now();
      const elapsed = now - startTimeRef.current;
      setElapsedTime(elapsed);
      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible]);

  // Animation values
  const text1Opacity = getOpacity(TIMELINE.text1.start, TIMELINE.text1.duration);
  const text1TranslateY = getTranslateY(TIMELINE.text1.start, TIMELINE.text1.duration);

  const text2Progress = getAnimationProgress(TIMELINE.text2.start, TIMELINE.text2.duration);
  const text2Opacity = text2Progress;
  const text2Scale = 0.8 + 0.2 * text2Progress;

  const circlesOpacity = getOpacity(TIMELINE.circles.start, TIMELINE.circles.duration);
  const circlesScale = 0.9 + 0.1 * getAnimationProgress(TIMELINE.circles.start, TIMELINE.circles.duration);

  const text3Opacity = getOpacity(TIMELINE.text3.start, TIMELINE.text3.duration);
  const text3TranslateY = getTranslateY(TIMELINE.text3.start, TIMELINE.text3.duration);

  const text4Opacity = getOpacity(TIMELINE.text4.start, TIMELINE.text4.duration);
  const text4TranslateY = getTranslateY(TIMELINE.text4.start, TIMELINE.text4.duration);

  // Badge animations
  const badgeProgresses = [0, 1, 2, 3, 4].map((index) => {
    const badgeStartTime = badgesStartTime + index * ANIMATION_DURATIONS.badgeDelay;
    return {
      opacity: getOpacity(badgeStartTime, ANIMATION_DURATIONS.badgeDuration),
      scale: getScale(badgeStartTime, ANIMATION_DURATIONS.badgeDuration),
    };
  });

  const projectIcons = [
    {
      id: 1,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10715@2x.png",
      alt: "Project icon 1",
      top: "547px",
      left: "675px",
      progress: badgeProgresses[0],
    },
    {
      id: 2,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10716@2x.png",
      alt: "Project icon 2",
      top: "394px",
      left: "849px",
      progress: badgeProgresses[1],
    },
    {
      id: 3,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10717@2x.png",
      alt: "Project icon 3",
      top: "595px",
      left: "338px",
      progress: badgeProgresses[2],
    },
    {
      id: 4,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10718@2x.png",
      alt: "Project icon 4",
      top: "715px",
      left: "1111px",
      progress: badgeProgresses[3],
    },
    {
      id: 5,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10719@2x.png",
      alt: "Project icon 5",
      top: "425px",
      left: "422px",
      progress: badgeProgresses[4],
    },
  ];

  const ellipseBackgrounds = [
    {
      id: 1,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10710.svg",
      alt: "Background ellipse layer 1",
      top: "391px",
      left: "50%",
      width: "1186px",
      height: "409px",
    },
    {
      id: 2,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10708.svg",
      alt: "Background ellipse layer 2",
      top: "476px",
      left: "50%",
      width: "996px",
      height: "324px",
    },
    {
      id: 3,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10713.svg",
      alt: "Background ellipse layer 3",
      top: "561px",
      left: "50%",
      width: "806px",
      height: "239px",
    },
  ];

  return (
    <div
      ref={containerRef}
      className="bg-neutral-50 overflow-hidden w-full h-full relative"
      role="main"
      aria-label="Earnings summary for 2025"
    >
      {/* Large blurred background ellipse */}
      <div
        className="absolute top-[410px] left-1/2 -translate-x-1/2 w-[1323px] h-[1323px] rounded-[661.5px] blur-[72px]"
        style={{
          background: "linear-gradient(115deg,rgba(243,228,255,1)_0%,rgba(210,232,250,1)_51%,rgba(227,252,255,1)_100%)",
          opacity: circlesOpacity,
          transform: `scale(${circlesScale})`,
          willChange: "opacity, transform",
          transition: "none",
        }}
        aria-hidden="true"
      />

      {/* Ellipse background layers */}
      {ellipseBackgrounds.map((ellipse) => (
        <img
          key={ellipse.id}
          className="absolute"
          style={{
            top: ellipse.top,
            left: ellipse.left,
            width: ellipse.width,
            height: ellipse.height,
            transform: "translateX(-50%)",
            opacity: circlesOpacity,
            willChange: "opacity",
            transition: "none",
          }}
          alt={ellipse.alt}
          src={ellipse.src}
          aria-hidden="true"
        />
      ))}

      {/* Project icon badges - stay in absolute positions */}
      {projectIcons.map((icon) => (
        <img
          key={icon.id}
          className="absolute w-20 h-20 aspect-square object-cover"
          style={{
            top: icon.top,
            left: icon.left,
            opacity: icon.progress.opacity,
            transform: `scale(${icon.progress.scale})`,
            willChange: "opacity, transform",
            transition: "none",
          }}
          alt={icon.alt}
          src={icon.src}
        />
      ))}

      {/* Bottom text section */}
      <section
        className="flex flex-col w-[410px] items-center absolute top-[694px] left-1/2 -translate-x-1/2"
        style={{
          willChange: "opacity, transform",
          transition: "none",
        }}
      >
        {/* "across" text */}
        <p
          style={{
            fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            color: "#9b9b9b",
            fontSize: "32px",
            textAlign: "center",
            letterSpacing: "-0.64px",
            lineHeight: "32px",
            marginTop: "-1px",
            alignSelf: "stretch",
            opacity: text3Opacity,
            transform: `translateY(${text3TranslateY}px)`,
            willChange: "opacity, transform",
            transition: "none",
          }}
        >
          across
        </p>

        {/* "5 projects" text */}
        <p
          style={{
            fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 500,
            color: "#181818",
            fontSize: "40px",
            textAlign: "center",
            letterSpacing: "-0.80px",
            lineHeight: "40px",
            alignSelf: "stretch",
            opacity: text4Opacity,
            transform: `translateY(${text4TranslateY}px)`,
            willChange: "opacity, transform",
            transition: "none",
          }}
        >
          5 projects
        </p>
      </section>

      {/* Header section */}
      <header
        className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[410px]"
        style={{
          willChange: "opacity",
          transition: "none",
        }}
      >
        {/* "In 2025, you earned" text */}
        <p
          style={{
            fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            color: "#9b9b9b",
            fontSize: "48px",
            textAlign: "center",
            letterSpacing: "-0.96px",
            lineHeight: "normal",
            opacity: text1Opacity,
            transform: `translateY(${text1TranslateY}px)`,
            willChange: "opacity, transform",
            transition: "none",
          }}
        >
          In 2025, you earned
        </p>

        {/* "$50,000" amount */}
        <p
          style={{
            fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 500,
            color: "#181818",
            fontSize: "56px",
            textAlign: "center",
            letterSpacing: "-1.12px",
            lineHeight: "56px",
            opacity: text2Opacity,
            transform: `scale(${text2Scale})`,
            willChange: "opacity, transform",
            transition: "none",
          }}
        >
          $50,000
        </p>
      </header>
    </div>
  );
};
