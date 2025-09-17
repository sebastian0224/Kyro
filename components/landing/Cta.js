import { SignUpButton } from "@clerk/nextjs";
import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-black via-neutral-950 to-neutral-900 overflow-hidden">
      {/* Background texture */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.25) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      {/* Light effects */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-violet-500/10 rounded-full blur-[100px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-white/70 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space-grotesk mb-6 leading-[1.1]">
            Ready to take control of{" "}
            <span className="text-blue-500">your crypto?</span>
          </h2>

          <p className="text-xl text-white/70 font-inter max-w-2xl mx-auto mb-12">
            Join thousands tracking their wallets with clarity, speed, and zero
            noise.
          </p>

          <SignUpButton mode="modal">
            <button className="group bg-blue-500 hover:bg-blue-600 text-white font-inter px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:scale-105 flex items-center space-x-2 mx-auto shadow-lg shadow-blue-500/30">
              <span>Start Tracking Free</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
            </button>
          </SignUpButton>
        </div>
      </div>
    </section>
  );
}
