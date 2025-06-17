import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="relative py-24 md:py-32 bg-gradient-to-br from-[#050505] via-[#0F0F10] to-[#1F1F1F] overflow-hidden">
      {/* Textura de fondo con patrón de puntos */}
      <div className="absolute inset-0 opacity-50">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, rgba(59, 130, 246, 0.25) 1px, transparent 0)`,
            backgroundSize: "24px 24px",
          }}
        ></div>
      </div>

      {/* Efectos de luz sutiles */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#3B82F6]/12 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-[#8B5CF6]/10 rounded-full blur-[100px]"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space-grotesk mb-6 leading-[1.1]">
            Ready to take control of{" "}
            <span className="text-[#3B82F6]">your crypto?</span>
          </h2>

          <p className="text-xl text-[#F8FAFC]/70 font-inter max-w-2xl mx-auto mb-12">
            Join thousands tracking their wallets with clarity, speed, and zero
            noise.
          </p>

          <button className="group bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-inter px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:transform hover:scale-105 flex items-center space-x-2 mx-auto shadow-lg shadow-[#3B82F6]/30">
            <span>Start Tracking Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
