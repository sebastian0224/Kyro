"use client";
import { ArrowRight } from "lucide-react";
import { useEffect, useRef } from "react";

export default function Cta() {
  const ctaRef = useRef(null);

  useEffect(() => {
    if (ctaRef.current) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("animate-fadeIn");
            }
          });
        },
        { threshold: 0.1 }
      );

      observer.observe(ctaRef.current);

      return () => {
        if (ctaRef.current) {
          observer.unobserve(ctaRef.current);
        }
      };
    }
  }, []);

  useEffect(() => {
    // Agregar estilos CSS personalizados para los cuadrados flotantes
    const style = document.createElement("style");
    style.textContent = `
    @keyframes float-1 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      25% { transform: translateY(-20px) translateX(10px); }
      50% { transform: translateY(-10px) translateX(-15px); }
      75% { transform: translateY(-25px) translateX(5px); }
    }
    @keyframes float-2 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      33% { transform: translateY(-15px) translateX(-10px); }
      66% { transform: translateY(-30px) translateX(20px); }
    }
    @keyframes float-3 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      20% { transform: translateY(-25px) translateX(-5px); }
      40% { transform: translateY(-5px) translateX(15px); }
      60% { transform: translateY(-20px) translateX(-20px); }
      80% { transform: translateY(-35px) translateX(10px); }
    }
    @keyframes float-4 {
      0%, 100% { transform: translateY(0px) translateX(0px); }
      50% { transform: translateY(-40px) translateX(-25px); }
    }
    .float-1 { animation: float-1 15s ease-in-out infinite; }
    .float-2 { animation: float-2 12s ease-in-out infinite; }
    .float-3 { animation: float-3 18s ease-in-out infinite; }
    .float-4 { animation: float-4 20s ease-in-out infinite; }
  `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return (
    <section className="relative py-24 md:py-32 bg-[#0F0F10] overflow-hidden">
      {/* Fondo con cuadrados flotantes */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Cuadrados grandes */}
        <div className="absolute top-10 left-10 w-16 h-16 bg-[#3B82F6]/20 rounded-sm float-1"></div>
        <div className="absolute top-20 right-20 w-12 h-12 bg-[#3B82F6]/15 rounded-sm float-2"></div>
        <div className="absolute bottom-32 left-16 w-20 h-20 bg-[#3B82F6]/10 rounded-sm float-3"></div>
        <div className="absolute bottom-20 right-32 w-14 h-14 bg-[#3B82F6]/25 rounded-sm float-4"></div>

        {/* Cuadrados medianos */}
        <div className="absolute top-1/3 left-1/4 w-10 h-10 bg-[#1E40AF]/20 rounded-sm float-2"></div>
        <div className="absolute top-1/2 right-1/3 w-8 h-8 bg-[#1E40AF]/15 rounded-sm float-1"></div>
        <div className="absolute bottom-1/3 left-1/2 w-12 h-12 bg-[#1E40AF]/10 rounded-sm float-4"></div>
        <div className="absolute top-2/3 right-1/4 w-9 h-9 bg-[#1E40AF]/25 rounded-sm float-3"></div>

        {/* Cuadrados pequeños */}
        <div className="absolute top-16 left-1/3 w-6 h-6 bg-[#3B82F6]/30 rounded-sm float-3"></div>
        <div className="absolute top-1/4 right-16 w-5 h-5 bg-[#3B82F6]/20 rounded-sm float-1"></div>
        <div className="absolute bottom-1/4 left-20 w-7 h-7 bg-[#3B82F6]/15 rounded-sm float-2"></div>
        <div className="absolute bottom-16 right-1/3 w-4 h-4 bg-[#3B82F6]/35 rounded-sm float-4"></div>
        <div className="absolute top-3/4 left-1/4 w-6 h-6 bg-[#1E40AF]/30 rounded-sm float-1"></div>
        <div className="absolute top-1/6 right-1/2 w-5 h-5 bg-[#1E40AF]/25 rounded-sm float-3"></div>

        {/* Cuadrados extra pequeños */}
        <div className="absolute top-24 left-2/3 w-3 h-3 bg-[#3B82F6]/40 rounded-sm float-2"></div>
        <div className="absolute top-1/2 left-12 w-4 h-4 bg-[#3B82F6]/25 rounded-sm float-4"></div>
        <div className="absolute bottom-1/2 right-12 w-3 h-3 bg-[#1E40AF]/35 rounded-sm float-1"></div>
        <div className="absolute bottom-24 left-3/4 w-4 h-4 bg-[#1E40AF]/20 rounded-sm float-3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div ref={ctaRef} className="opacity-0 text-center max-w-3xl mx-auto">
          {/* Título principal */}
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space-grotesk mb-6 leading-[1.1]">
            Ready to take control of{" "}
            <span className="text-[#3B82F6]">your crypto?</span>
          </h2>

          {/* Descripción */}
          <p className="text-xl text-[#F8FAFC]/70 font-inter max-w-2xl mx-auto mb-12">
            Join thousands tracking their wallets with clarity, speed, and zero
            noise.
          </p>

          {/* CTA Button */}
          <button className="group bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-inter px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 hover:transform hover:scale-105 flex items-center space-x-2 mx-auto">
            <span>Start Tracking Free</span>
            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </button>
        </div>
      </div>
    </section>
  );
}
