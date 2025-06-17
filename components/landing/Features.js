import { Wallet, Activity, Shield, Users } from "lucide-react";
import SharedBackground from "@/components/landing/SharedBackground";

export default function Features() {
  const features = [
    {
      icon: Wallet,
      title: "Multichain Tracking",
      description:
        "Connect wallets from Ethereum, BNB, Polygon, and more — all in one place.",
      gradient: "from-[#3B82F6]/20 to-[#1E40AF]/20",
    },
    {
      icon: Activity,
      title: "Real-Time Insights",
      description:
        "See live asset values, balances, and network data instantly.",
      gradient: "from-[#10B981]/20 to-[#059669]/20",
    },
    {
      icon: Shield,
      title: "Private & Secure",
      description: "We never ask for your seed phrase. Just connect and track.",
      gradient: "from-[#F59E0B]/20 to-[#D97706]/20",
    },
    {
      icon: Users,
      title: "Multiple Wallets",
      description:
        "Track up to 3 wallets for free — perfect for casual and serious users.",
      gradient: "from-[#8B5CF6]/20 to-[#7C3AED]/20",
    },
  ];

  return (
    <SharedBackground className="py-16 md:py-24" variant="features">
      {/* Animaciones crypto específicas para Features */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Blockchain network visualization */}
        <div
          className="absolute top-1/4 left-1/8 w-6 h-6 bg-[#3B82F6]/20 rounded-full animate-ping"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/6 w-4 h-4 bg-[#10B981]/25 rounded-full animate-ping"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/12 w-5 h-5 bg-[#8B5CF6]/20 rounded-full animate-ping"
          style={{ animationDelay: "3s" }}
        ></div>

        {/* Connection lines */}
        <div
          className="absolute top-1/4 left-1/8 w-20 h-px bg-gradient-to-r from-[#3B82F6]/20 to-transparent animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/3 left-1/6 w-16 h-px bg-gradient-to-r from-[#10B981]/20 to-transparent animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>

        {/* Security symbols */}
        <div
          className="absolute bottom-1/4 right-1/8 text-[#F59E0B]/15 text-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        >
          🔒
        </div>
        <div
          className="absolute top-1/6 right-1/6 text-[#10B981]/20 text-xl animate-bounce"
          style={{ animationDelay: "2s", animationDuration: "4s" }}
        >
          ⚡
        </div>
      </div>

      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full bg-[#1F1F1F] px-3 py-1 text-sm mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-[#3B82F6]"></span>
            <span className="text-[#F8FAFC]/80 font-inter">Kyro Features</span>
          </div>

          {/* Title */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-space-grotesk mb-6">
            Track smarter. Stress less.
          </h2>

          {/* Description */}
          <p className="text-lg text-[#F8FAFC]/70 font-inter max-w-2xl mx-auto">
            See your entire portfolio in one clean dashboard — no complexity, no
            noise.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group relative bg-[#141415] border border-gray-800 rounded-lg p-6 md:p-8 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-[1.02] animate-fadeIn"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Gradient overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300`}
                ></div>

                {/* Content */}
                <div className="relative z-10">
                  {/* Icon */}
                  <div className="mb-4">
                    <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors duration-300">
                      <IconComponent className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold font-space-grotesk mb-3 text-[#F8FAFC]">
                    {feature.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[#F8FAFC]/70 font-inter leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </SharedBackground>
  );
}
