import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SignInButton, SignUpButton } from "@clerk/nextjs";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-neutral-950/95 backdrop-blur-sm border-b border-gray-800">
      <div className="container mx-auto px-4 h-auto py-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        {/* Logo */}
        <a
          href="#"
          className="flex items-center space-x-2 justify-center md:justify-start"
        >
          <Image
            src="/logo.png"
            alt="Kyro Logo"
            width={32}
            height={32}
            className="w-8 h-8"
          />
          <span className="text-white font-bold text-xl tracking-wider font-space-grotesk uppercase">
            KYRO
          </span>
        </a>

        {/* Auth buttons */}
        <div className="flex items-center justify-center md:justify-end space-x-3">
          <SignInButton mode="modal">
            <Button
              variant="outline"
              className="bg-neutral-900 text-white border-neutral-900 hover:bg-neutral-800 hover:border-neutral-800 font-inter"
            >
              Sign In
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button className="bg-blue-500 text-white hover:bg-blue-600 font-inter">
              Get Started
            </Button>
          </SignUpButton>
        </div>
      </div>
    </header>
  );
}
