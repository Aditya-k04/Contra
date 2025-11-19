interface EarningsSummaryProps {
  animationProgress: number;
}

export const EarningsSummary = ({ animationProgress = 0 }: EarningsSummaryProps) => {
  // Calculate animation progress for each element in sequence
  const getElementOpacity = (startPoint: number, duration: number = 0.15) => {
    const localProgress = Math.max(0, (animationProgress - startPoint) / duration);
    return Math.min(1, localProgress);
  };

  const getElementTransform = (startPoint: number, duration: number = 0.15) => {
    const opacity = getElementOpacity(startPoint, duration);
    return `translateY(${20 * (1 - opacity)}px)`;
  };

  // Animation sequence
  const text1Progress = getElementOpacity(0, 0.15); // "In 2025, you earned" - first
  const text2Progress = getElementOpacity(0.15, 0.15); // "$50,000" - after text1
  const circlesProgress = getElementOpacity(0.30, 0.15); // glow circles - after text2
  const text3Progress = getElementOpacity(0.45, 0.15); // "across" - after circles
  const text4Progress = getElementOpacity(0.60, 0.15); // "5 projects" - after text3
  
  // Badges animate one by one
  const badge1Progress = getElementOpacity(0.75, 0.10);
  const badge2Progress = getElementOpacity(0.82, 0.10);
  const badge3Progress = getElementOpacity(0.89, 0.10);
  const badge4Progress = getElementOpacity(0.96, 0.10);
  const badge5Progress = getElementOpacity(1.03, 0.10);

  const projectIcons = [
    {
      id: 1,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10715@2x.png",
      alt: "Project icon 1",
      top: "547px",
      left: "675px",
      progress: badge1Progress,
    },
    {
      id: 2,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10716@2x.png",
      alt: "Project icon 2",
      top: "394px",
      left: "849px",
      progress: badge2Progress,
    },
    {
      id: 3,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10717@2x.png",
      alt: "Project icon 3",
      top: "595px",
      left: "338px",
      progress: badge3Progress,
    },
    {
      id: 4,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10718@2x.png",
      alt: "Project icon 4",
      top: "715px",
      left: "1111px",
      progress: badge4Progress,
    },
    {
      id: 5,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10719@2x.png",
      alt: "Project icon 5",
      top: "425px",
      left: "422px",
      progress: badge5Progress,
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
      className="bg-neutral-50 overflow-hidden w-full h-full relative"
      role="main"
      aria-label="Earnings summary for 2025"
    >
      {/* Large blurred background ellipse */}
      <div
        className="absolute top-[410px] left-1/2 -translate-x-1/2 w-[1323px] h-[1323px] rounded-[661.5px] blur-[72px]"
        style={{
          background: "linear-gradient(115deg,rgba(243,228,255,1)_0%,rgba(210,232,250,1)_51%,rgba(227,252,255,1)_100%)",
          opacity: circlesProgress,
          transform: `translateY(${20 * (1 - circlesProgress)}px) scale(${0.95 + 0.05 * circlesProgress})`,
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
            opacity: circlesProgress,
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
            opacity: icon.progress,
            transform: `scale(${0.8 + 0.2 * icon.progress})`,
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
          opacity: Math.max(text3Progress, text4Progress),
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
            opacity: text3Progress,
            transform: getElementTransform(0.45, 0.15),
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
            opacity: text4Progress,
            transform: getElementTransform(0.60, 0.15),
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
          opacity: Math.max(text1Progress, text2Progress),
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
            opacity: text1Progress,
            transform: getElementTransform(0, 0.15),
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
            opacity: text2Progress,
            transform: getElementTransform(0.15, 0.15),
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
