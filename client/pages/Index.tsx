export default function Index() {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
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
      <div className="flex-1 bg-[#000000] flex items-center justify-center">
        <img
          src="https://api.builder.io/api/v1/image/assets/TEMP/352bc2b14b51ee7b4f1dd013e06103e38711da49?width=1600"
          alt="3D Ribbon Graphic"
          className="w-full h-full object-cover lg:object-contain max-w-[800px]"
          style={{ color: "#151720", backgroundColor: "#151720" }}
        />
      </div>
    </div>
  );
}
