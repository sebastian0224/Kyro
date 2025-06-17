import { Button } from "@/components/ui/button";
import SharedBackground from "@/components/landing/SharedBackground";

export default function Hero() {
  return (
    <SharedBackground className="pt-16 md:pt-24" variant="hero">
      {/* Gradient effect adicional específico para Hero - MÁS INTENSO */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/25 rounded-full blur-[150px] opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981]/20 rounded-full blur-[120px] opacity-50"></div>

      {/* Animaciones crypto específicas para Hero */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Crypto symbols floating */}
        <div
          className="absolute top-1/4 left-1/6 text-[#F59E0B]/15 text-6xl animate-bounce"
          style={{ animationDelay: "0s", animationDuration: "6s" }}
        >
          ₿
        </div>
        <div
          className="absolute top-1/3 right-1/8 text-[#627EEA]/20 text-5xl animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "5s" }}
        >
          Ξ
        </div>
        <div
          className="absolute bottom-1/4 left-1/4 text-[#10B981]/18 text-4xl animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          $
        </div>
        <div
          className="absolute bottom-1/3 right-1/4 text-[#8B5CF6]/15 text-3xl animate-pulse"
          style={{ animationDelay: "3s" }}
        >
          ⟐
        </div>

        {/* Network nodes */}
        <div
          className="absolute top-1/6 left-1/3 w-4 h-4 bg-[#3B82F6]/25 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-1/6 right-1/3 w-3 h-3 bg-[#10B981]/30 rounded-full animate-ping"
          style={{ animationDelay: "4s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left column - Content */}
          <div className="flex-1 space-y-8 pb-10 md:pb-16">
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space-grotesk leading-[1.1] animate-fadeIn">
              Track your crypto.
              <br />
              Simply.
            </h1>

            {/* Description */}
            <p
              className="text-lg text-[#F8FAFC]/70 font-inter max-w-xl animate-fadeIn"
              style={{ animationDelay: "0.2s" }}
            >
              Kyro lets you monitor your entire crypto portfolio across
              Ethereum, Polygon, BNB Chain, Arbitrum, and Optimism — no setup,
              no clutter, just insight.
            </p>

            {/* CTA Button */}
            <div className="animate-fadeIn" style={{ animationDelay: "0.4s" }}>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-inter px-8 py-6 h-auto text-base rounded-md">
                Start Tracking Now
              </Button>
            </div>

            {/* Companies count */}
            <p
              className="text-[#F8FAFC]/60 font-inter text-sm animate-fadeIn"
              style={{ animationDelay: "0.6s" }}
            >
              All your wallets. One clean dashboard.
            </p>
          </div>

          {/* Right column - Dashboard preview */}
          <div className="flex-1 lg:flex lg:justify-end relative overflow-visible">
            <div
              className="relative animate-fadeIn"
              style={{ animationDelay: "0.8s" }}
            >
              <img
                src="/dashboard.png"
                alt="Kyro dashboard preview"
                className="rounded-2xl border border-gray-800 shadow-2xl bg-[#141415] object-cover md:object-contain w-full md:w-auto max-w-none h-auto max-h-[700px] lg:-mr-32 xl:-mr-48 2xl:-mr-64"
                style={{ minHeight: "350px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </SharedBackground>
  );
}
