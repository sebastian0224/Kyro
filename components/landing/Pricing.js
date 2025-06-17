import { Check, Zap } from "lucide-react";

export default function Pricing() {
  const plans = [
    {
      name: "Free",
      subtitle: "Perfect for getting started",
      price: "Free",
      period: "",
      popular: false,
      features: [
        "Track 3 wallets",
        "Real-time tracking",
        "Multichain support (Ethereum, BNB, Polygon, etc.)",
        "Manual sync with cooldown",
        "No ads, no seed phrases",
      ],
      buttonText: "Get Started Free",
      buttonStyle:
        "bg-[#1F1F1F] hover:bg-[#2A2A2A] text-[#F8FAFC] border border-gray-700",
    },
    {
      name: "Pro",
      subtitle: "For serious crypto traders",
      price: "$10",
      period: "/month",
      popular: true,
      features: [
        "Everything in Free",
        "Manual sync with cooldown",
        "Higher sync limits per wallet",
        "Faster data refresh",
        "Priority API usage",
        "Email support",
      ],
      buttonText: "Start Pro Trial",
      buttonStyle: "bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC]",
    },
  ];

  return (
    <section id="pricing" className="bg-[#0F0F10] py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-[#1F1F1F] px-3 py-1 text-sm mb-6">
            <span className="mr-2 h-2 w-2 rounded-full bg-[#3B82F6]"></span>
            <span className="text-[#F8FAFC]/80 font-inter">Pricing Plan</span>
          </div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight font-space-grotesk mb-6">
            Start free. Upgrade anytime.
          </h2>

          <p className="text-lg text-[#F8FAFC]/70 font-inter max-w-2xl mx-auto mb-8">
            Track one wallet for free. Unlock more with Pro.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {plans.map((plan, index) => (
            <div
              key={index}
              className={`relative group ${
                plan.popular
                  ? "bg-gradient-to-br from-[#3B82F6]/10 to-[#1E40AF]/10 border-[#3B82F6]/50"
                  : "bg-[#141415] border-gray-800"
              } border rounded-2xl p-8 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-[1.02]`}
            >
              {/* Popular Badge */}
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-[#3B82F6] text-white px-4 py-1 rounded-full text-sm font-inter flex items-center space-x-1">
                    <Zap className="w-3 h-3" />
                    <span>Most Popular</span>
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold font-space-grotesk mb-2 text-[#F8FAFC]">
                  {plan.name}
                </h3>
                <p className="text-[#F8FAFC]/60 font-inter text-sm mb-6">
                  {plan.subtitle}
                </p>

                <div className="flex items-baseline justify-center space-x-2">
                  <span className="text-4xl md:text-5xl font-bold font-space-grotesk text-[#F8FAFC]">
                    {plan.price}
                  </span>
                  {plan.period && (
                    <span className="text-[#F8FAFC]/60 font-inter text-lg">
                      {plan.period}
                    </span>
                  )}
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan.features.map((feature, featureIndex) => (
                  <div
                    key={featureIndex}
                    className="flex items-start space-x-3"
                  >
                    <div className="flex-shrink-0 w-5 h-5 bg-[#10B981]/20 rounded-full flex items-center justify-center mt-0.5">
                      <Check className="w-3 h-3 text-[#10B981]" />
                    </div>
                    <span className="text-[#F8FAFC]/80 font-inter text-sm leading-relaxed">
                      {feature}
                    </span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <button
                className={`w-full py-3 px-6 rounded-lg font-inter font-medium transition-all duration-300 ${plan.buttonStyle}`}
              >
                {plan.buttonText}
              </button>
            </div>
          ))}
        </div>

        {/* Bottom Note */}
        <div className="text-center mt-12">
          <p className="text-[#F8FAFC]/60 font-inter text-sm">
            All plans include multichain support and real-time tracking. No
            hidden fees.
          </p>
        </div>
      </div>
    </section>
  );
}
