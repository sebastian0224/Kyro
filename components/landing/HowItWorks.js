import { UserPlus, Wallet, BarChart3, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Sign up with Google",
      description: "Create your account in seconds using Google.",
      mockup: (
        <div className="bg-neutral-900 rounded-lg p-4 border border-gray-800 w-full max-w-[280px]">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 bg-blue-500 text-white px-3 py-2 rounded-md text-sm">
              <div className="w-4 h-4 bg-white/20 rounded"></div>
              <span>Continue with Google</span>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "02",
      icon: Wallet,
      title: "Connect your wallets",
      description:
        "Connect up to 3 wallets for free across Ethereum, BNB, Polygon, and more.",
      mockup: (
        <div className="bg-neutral-900 rounded-lg p-4 border border-gray-800 w-full max-w-[280px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-neutral-950 rounded border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#627EEA] rounded-full"></div>
                <span className="text-sm text-white">Ethereum</span>
              </div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-neutral-950 rounded border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#F0B90B] rounded-full"></div>
                <span className="text-sm text-white">BNB Chain</span>
              </div>
              <div className="w-2 h-2 bg-emerald-500 rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-neutral-950 rounded border border-dashed border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#8247E5] rounded-full"></div>
                <span className="text-sm text-white/60">Polygon</span>
              </div>
              <div className="text-blue-500 text-xs">+</div>
            </div>
          </div>
        </div>
      ),
    },
    {
      number: "03",
      icon: BarChart3,
      title: "Track your portfolio in real time",
      description:
        "View balances, assets, and network data — all from one clean dashboard.",
      mockup: (
        <div className="bg-neutral-900 rounded-lg p-4 border border-gray-800 w-full max-w-[280px]">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/70">Total Balance</span>
              <span className="text-lg font-bold text-emerald-500">
                $12,847.32
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-amber-500 rounded-full"></div>
                  <span className="text-sm text-white">ETH</span>
                </div>
                <span className="text-sm text-white">$8,234.12</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                  <span className="text-sm text-white">USDC</span>
                </div>
                <span className="text-sm text-white">$4,613.20</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="bg-neutral-950 py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-neutral-900 px-3 py-1 text-sm mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-blue-500"></span>
            <span className="text-white/80 font-inter">How it Works</span>
          </div>

          <h2 className=" text-white/70 text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-space-grotesk mb-6">
            Get started in less than a minute.
          </h2>

          <p className="text-lg text-white/70 font-inter max-w-2xl mx-auto">
            From sign-up to multichain tracking — no seed phrases, no setup
            pain.
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-4">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <div
                  key={index}
                  className="flex flex-col lg:flex-row items-center"
                >
                  <div className="text-center group">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-500 text-white font-bold text-lg rounded-full mb-6 font-space-grotesk">
                      {step.number}
                    </div>

                    <div className="mb-6 transform group-hover:scale-105 transition-transform duration-300 flex justify-center">
                      {step.mockup}
                    </div>

                    <div className="mb-4">
                      <div className="w-12 h-12 bg-blue-500/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-blue-500/20 transition-colors duration-300">
                        <IconComponent className="w-6 h-6 text-blue-500" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-space-grotesk mb-3 text-white max-w-[280px]">
                      {step.title}
                    </h3>

                    <p className="text-white/70 font-inter leading-relaxed max-w-[280px]">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex items-center mx-8">
                      <div className="flex items-center">
                        <div className="w-16 h-px border-t-2 border-dashed border-blue-500/30"></div>
                        <ArrowRight className="w-5 h-5 text-blue-500/50 ml-2" />
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
