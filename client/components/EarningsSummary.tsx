export const EarningsSummary = () => {
  const projectIcons = [
    {
      id: 1,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10715@2x.png",
      alt: "Project icon 1",
      top: "547px",
      left: "675px",
    },
    {
      id: 2,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10716@2x.png",
      alt: "Project icon 2",
      top: "394px",
      left: "849px",
    },
    {
      id: 3,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10717@2x.png",
      alt: "Project icon 3",
      top: "595px",
      left: "338px",
    },
    {
      id: 4,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10718@2x.png",
      alt: "Project icon 4",
      top: "715px",
      left: "1111px",
    },
    {
      id: 5,
      src: "https://c.animaapp.com/nFKGd7xj/img/ellipse-10719@2x.png",
      alt: "Project icon 5",
      top: "425px",
      left: "422px",
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
      className="bg-neutral-50 overflow-hidden w-full min-w-[1440px] min-h-[800px] relative"
      role="main"
      aria-label="Earnings summary for 2025"
    >
      {/* Large blurred background ellipse */}
      <div
        className="absolute top-[410px] left-1/2 -translate-x-1/2 w-[1323px] h-[1323px] rounded-[661.5px] blur-[72px]"
        style={{
          background: "linear-gradient(115deg,rgba(243,228,255,1)_0%,rgba(210,232,250,1)_51%,rgba(227,252,255,1)_100%)",
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
          }}
          alt={ellipse.alt}
          src={ellipse.src}
          aria-hidden="true"
        />
      ))}

      {/* Project icon badges */}
      {projectIcons.map((icon) => (
        <img
          key={icon.id}
          className="absolute w-20 h-20 aspect-square object-cover"
          style={{
            top: icon.top,
            left: icon.left,
          }}
          alt={icon.alt}
          src={icon.src}
        />
      ))}

      {/* Bottom text section */}
      <section className="flex flex-col w-[410px] items-center absolute top-[694px] left-1/2 -translate-x-1/2">
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
          }}
        >
          across
        </p>

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
          }}
        >
          5 projects
        </p>
      </section>

      {/* Header section */}
      <header className="absolute top-[150px] left-1/2 -translate-x-1/2 w-[410px]">
        <p
          style={{
            fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 400,
            color: "#9b9b9b",
            fontSize: "48px",
            textAlign: "center",
            letterSpacing: "-0.96px",
            lineHeight: "normal",
          }}
        >
          In 2025, you earned
        </p>

        <p
          style={{
            fontFamily: "'Helvetica Neue', -apple-system, BlinkMacSystemFont, sans-serif",
            fontWeight: 500,
            color: "#181818",
            fontSize: "56px",
            textAlign: "center",
            letterSpacing: "-1.12px",
            lineHeight: "56px",
          }}
        >
          $50,000
        </p>
      </header>
    </div>
  );
};
