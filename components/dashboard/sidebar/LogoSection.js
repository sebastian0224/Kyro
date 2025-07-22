import Image from "next/image";

export default function LogoSection({ isMobile }) {
  return (
    <div
      className={`p-6 border-b border-kyro-border ${isMobile ? "pt-2" : ""}`}
    >
      <div className="flex items-center space-x-2">
        <div className="w-10 h-10 flex items-center justify-center">
          <Image
            src="/logo.png"
            alt="Kyro Logo"
            width={40}
            height={40}
            className="w-10 h-10 rounded-lg shadow-md bg-white object-contain"
            priority
          />
        </div>
        <h1 className="text-xl font-space-grotesk font-bold text-kyro-text">
          KYRO
        </h1>
      </div>
    </div>
  );
}
