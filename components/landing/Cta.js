import { ArrowRight } from "lucide-react";

export default function Cta() {
  return (
    <section className="relative py-24 md:py-32 bg-[#0F0F10] overflow-hidden">
      {/* Fondo con cuadrados flotantes - más intenso para el CTA */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cuadrados grandes */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-[#3B82F6]/20 rounded-sm animate-pulse"></div>
        <div
          className="absolute top-20 right-20 w-12 h-12 bg-[#3B82F6]/15 rounded-sm animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-16 w-20 h-20 bg-[#3B82F6]/10 rounded-sm animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 right-32 w-14 h-14 bg-[#3B82F6]/25 rounded-sm animate-pulse"
          style={{ animationDelay: "0.5s" }}
        ></div>

        {/* Cuadrados medianos */}
        <div
          className="absolute top-1/3 left-1/4 w-10 h-10 bg-[#1E40AF]/20 rounded-sm animate-pulse"
          style={{ animationDelay: "1.5s" }}
        ></div>
        <div
          className="absolute top-1/2 right-1/3 w-8 h-8 bg-[#1E40AF]/15 rounded-sm animate-pulse"
          style={{ animationDelay: "0.8s" }}
        ></div>
        <div
          className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-[#1E40AF]/10 rounded-sm animate-pulse"
          style={{ animationDelay: "2.2s" }}
        ></div>
        <div
          className="absolute top-2/3 right-1/4 w-9 h-9 bg-[#1E40AF]/25 rounded-sm animate-pulse"
          style={{ animationDelay: "1.8s" }}
        ></div>

        {/* Cuadrados pequeños */}
        <div
          className="absolute top-16 left-1/3 w-6 h-6 bg-[#3B82F6]/30 rounded-sm animate-pulse"
          style={{ animationDelay: "1.2s" }}
        ></div>
        <div
          className="absolute top-1/4 right-16 w-5 h-5 bg-[#3B82F6]/20 rounded-sm animate-pulse"
          style={{ animationDelay: "0.3s" }}
        ></div>
        <div
          className="absolute bottom-1/4 left-20 w-7 h-7 bg-[#3B82F6]/15 rounded-sm animate-pulse"
          style={{ animationDelay: "1.7s" }}
        ></div>
        <div
          className="absolute bottom-16 right-1/3 w-4 h-4 bg-[#3B82F6]/35 rounded-sm animate-pulse"
          style={{ animationDelay: "2.5s" }}
        ></div>
        <div
          className="absolute top-3/4 left-1/4 w-6 h-6 bg-[#1E40AF]/30 rounded-sm animate-pulse"
          style={{ animationDelay: "0.7s" }}
        ></div>
        <div
          className="absolute top-1/6 right-1/2 w-5 h-5 bg-[#1E40AF]/25 rounded-sm animate-pulse"
          style={{ animationDelay: "1.9s" }}
        ></div>

        {/* Cuadrados extra pequeños */}
        <div
          className="absolute top-24 left-2/3 w-3 h-3 bg-[#3B82F6]/40 rounded-sm animate-pulse"
          style={{ animationDelay: "1.4s" }}
        ></div>
        <div
          className="absolute top-1/2 left-12 w-4 h-4 bg-[#3B82F6]/25 rounded-sm animate-pulse"
          style={{ animationDelay: "2.1s" }}
        ></div>
        <div
          className="absolute bottom-1/2 right-12 w-3 h-3 bg-[#1E40AF]/35 rounded-sm animate-pulse"
          style={{ animationDelay: "0.9s" }}
        ></div>
        <div
          className="absolute bottom-24 left-3/4 w-4 h-4 bg-[#1E40AF]/20 rounded-sm animate-pulse"
          style={{ animationDelay: "1.6s" }}
        ></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          {/* Título principal */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space-grotesk mb-6 leading-[1.1] animate-fadeIn">
            Ready to take control of{" "}
            <span className="text-[#3B82F6]">your crypto?</span>
          </h2>

          {/* Descripción */}
          <p
            className="text-xl text-[#F8FAFC]/70 font-inter max-w-2xl mx-auto mb-12 animate-fadeIn"
            style={{ animationDelay: "0.2s" }}
          >
            Join thousands tracking their wallets with clarity, speed, and zero
            noise.
          </p>

          {/* CTA Button */}
          <button
            className="group bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-inter px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:transform hover:scale-105 flex items-center space-x-2 mx-auto animate-fadeIn"
            style={{ animationDelay: "0.4s" }}
          >
            <span>Start Tracking Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
