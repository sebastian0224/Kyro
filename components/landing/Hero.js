import { Button } from "@/components/ui/button";

export default function Hero() {
  return (
    <section className="bg-neutral-950 pt-16 md:pt-24 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Content */}
          <div className="flex-1 space-y-8 pb-10 md:pb-16">
            <h1 className="  text-white/70 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space-grotesk leading-[1.1] ">
              Track your crypto.
              <br />
              Simply.
            </h1>

            <p className="text-lg text-white/70 font-inter max-w-xl">
              Kyro lets you monitor your entire crypto portfolio across
              Ethereum, Polygon, BNB Chain, Arbitrum, and Optimism — no setup,
              no clutter, just insight.
            </p>

            <div>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white font-inter px-8 py-6 h-auto text-base rounded-md">
                Start Tracking Now
              </Button>
            </div>

            <p className="text-white/60 font-inter text-sm">
              All your wallets. One clean dashboard.
            </p>
          </div>

          {/* Dashboard preview */}
          <div className="flex-1 lg:flex lg:justify-end relative overflow-visible">
            <div className="relative">
              <img
                src="/dashboard.png"
                alt="Kyro dashboard preview"
                className="rounded-2xl border border-gray-800 shadow-2xl bg-neutral-900 object-cover md:object-contain w-full md:w-auto max-w-none h-auto max-h-[700px] lg:-mr-32 xl:-mr-48 2xl:-mr-64"
                style={{ minHeight: "350px" }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
