"use client";
import { Button } from "@/components/ui/button";
import { useEffect, useRef } from "react";

export default function Hero() {
  const dashboardRef = useRef(null);

  useEffect(() => {
    if (dashboardRef.current) {
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

      observer.observe(dashboardRef.current);

      return () => {
        if (dashboardRef.current) {
          observer.unobserve(dashboardRef.current);
        }
      };
    }
  }, []);

  return (
    <section className="relative overflow-hidden bg-[#0F0F10] pt-16 md:pt-24">
      {/* Gradient effect */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#3B82F6]/20 rounded-full blur-[120px] opacity-30"></div>

      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row lg:items-center lg:gap-12">
          {/* Left column - Content */}
          <div className="flex-1 space-y-8 pb-10 md:pb-16">
            {/* Main heading */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-space-grotesk leading-[1.1]">
              Track your crypto.
              <br />
              Simply.
            </h1>

            {/* Description */}
            <p className="text-lg text-[#F8FAFC]/70 font-inter max-w-xl">
              Kyro lets you monitor your entire crypto portfolio across
              Ethereum, Polygon, BNB Chain, Arbitrum, and Optimism — no setup,
              no clutter, just insight.
            </p>

            {/* CTA Button */}
            <div>
              <Button className="bg-[#3B82F6] hover:bg-[#2563EB] text-[#F8FAFC] font-inter px-8 py-6 h-auto text-base rounded-md">
                Start Tracking Now
              </Button>
            </div>

            {/* Companies count */}
            <p className="text-[#F8FAFC]/60 font-inter text-sm">
              All your wallets. One clean dashboard.
            </p>
          </div>

          {/* Right column - Dashboard preview */}
          <div className="flex-1 lg:flex lg:justify-end relative overflow-visible">
            <div
              ref={dashboardRef}
              className="relative opacity-0 transition-opacity duration-1000 ease-in-out"
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
    </section>
  );
}
