import { UserPlus, Wallet, BarChart3, ArrowRight } from "lucide-react";

export default function HowItWorks() {
  const steps = [
    {
      number: "01",
      icon: UserPlus,
      title: "Sign up with Google or Metamask",
      description:
        "Create your account in seconds using Google or connect with your crypto wallet.",
      mockup: (
        <div className="bg-[#1A1A1B] rounded-lg p-4 border border-gray-800 w-full max-w-[280px]">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 bg-[#3B82F6] text-white px-3 py-2 rounded-md text-sm">
              <div className="w-4 h-4 bg-white/20 rounded"></div>
              <span>Continue with Google</span>
            </div>
            <div className="flex items-center space-x-2 bg-[#F59E0B] text-white px-3 py-2 rounded-md text-sm">
              <div className="w-4 h-4 bg-white/20 rounded"></div>
              <span>Connect Metamask</span>
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
        <div className="bg-[#1A1A1B] rounded-lg p-4 border border-gray-800 w-full max-w-[280px]">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-2 bg-[#0F0F10] rounded border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#627EEA] rounded-full"></div>
                <span className="text-sm text-[#F8FAFC]">Ethereum</span>
              </div>
              <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#0F0F10] rounded border border-gray-700">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#F0B90B] rounded-full"></div>
                <span className="text-sm text-[#F8FAFC]">BNB Chain</span>
              </div>
              <div className="w-2 h-2 bg-[#10B981] rounded-full"></div>
            </div>
            <div className="flex items-center justify-between p-2 bg-[#0F0F10] rounded border border-dashed border-gray-600">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-[#8247E5] rounded-full"></div>
                <span className="text-sm text-[#F8FAFC]/60">Polygon</span>
              </div>
              <div className="text-[#3B82F6] text-xs">+</div>
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
        <div className="bg-[#1A1A1B] rounded-lg p-4 border border-gray-800 w-full max-w-[280px]">
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm text-[#F8FAFC]/70">Total Balance</span>
              <span className="text-lg font-bold text-[#10B981]">
                $12,847.32
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-[#F59E0B] rounded-full"></div>
                  <span className="text-sm text-[#F8FAFC]">ETH</span>
                </div>
                <span className="text-sm text-[#F8FAFC]">$8,234.12</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center space-x-2">
                  <div className="w-4 h-4 bg-[#3B82F6] rounded-full"></div>
                  <span className="text-sm text-[#F8FAFC]">USDC</span>
                </div>
                <span className="text-sm text-[#F8FAFC]">$4,613.20</span>
              </div>
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <section id="how-it-works" className="bg-[#0F0F10] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-[#1F1F1F] px-3 py-1 text-sm mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-[#3B82F6]"></span>
            <span className="text-[#F8FAFC]/80 font-inter">How it Works</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-space-grotesk mb-6">
            Get started in less than a minute.
          </h2>

          <p className="text-lg text-[#F8FAFC]/70 font-inter max-w-2xl mx-auto">
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
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-[#3B82F6] text-white font-bold text-lg rounded-full mb-6 font-space-grotesk">
                      {step.number}
                    </div>

                    <div className="mb-6 transform group-hover:scale-105 transition-transform duration-300 flex justify-center">
                      {step.mockup}
                    </div>

                    <div className="mb-4">
                      <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center mx-auto group-hover:bg-[#3B82F6]/20 transition-colors duration-300">
                        <IconComponent className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                    </div>

                    <h3 className="text-xl font-bold font-space-grotesk mb-3 text-[#F8FAFC] max-w-[280px]">
                      {step.title}
                    </h3>

                    <p className="text-[#F8FAFC]/70 font-inter leading-relaxed max-w-[280px]">
                      {step.description}
                    </p>
                  </div>

                  {/* Connector line */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:flex items-center mx-8">
                      <div className="flex items-center">
                        <div className="w-16 h-px border-t-2 border-dashed border-[#3B82F6]/30"></div>
                        <ArrowRight className="w-5 h-5 text-[#3B82F6]/50 ml-2" />
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
