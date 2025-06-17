import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-[#0F0F10]/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo y nombre */}
        <a href="#" className="flex items-center space-x-2">
          <Image
            src="/logo.png"
            alt="Kyro Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-[#F8FAFC] font-bold text-xl tracking-wider font-space-grotesk uppercase">
            KYRO
          </span>
        </a>

        {/* Enlaces de navegación - solo visibles en desktop */}
        <nav className="hidden md:flex items-center space-x-8">
          <a
            href="#features"
            className="text-[#F8FAFC] hover:text-[#3B82F6] transition-colors font-inter"
          >
            Features
          </a>
          <a
            href="#how-it-works"
            className="text-[#F8FAFC] hover:text-[#3B82F6] transition-colors font-inter"
          >
            How it works
          </a>
          <a
            href="#pricing"
            className="text-[#F8FAFC] hover:text-[#3B82F6] transition-colors font-inter"
          >
            Pricing
          </a>
        </nav>

        {/* Botones de autenticación */}
        <div className="flex items-center space-x-3">
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="bg-[#1F1F1F] text-[#F8FAFC] border-[#1F1F1F] hover:bg-[#2D2D2D] hover:border-[#2D2D2D] font-inter"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="bg-[#3B82F6] text-[#F8FAFC] hover:bg-[#2563EB] font-inter">
              Get Started
            </Button>
          </SignUpButton>
        </div>
      </div>
    </header>
  );
}
