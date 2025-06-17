import { Button } from "@/components/ui/button";
import SharedBackground from "@/components/landing/ShareBackground";

export default function Hero() {
  return (
    <SharedBackground className="pt-16 md:pt-24">
      {/* Gradient effect adicional específico para Hero */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#3B82F6]/15 rounded-full blur-[150px] opacity-40"></div>
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#10B981]/10 rounded-full blur-[120px] opacity-30"></div>

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
