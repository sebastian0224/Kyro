import Header from "@/components/landing/Header";
import Hero from "@/components/landing/Hero";
import Features from "@/components/landing/Features";
import HowItWorks from "@/components/landing/HowItWorks";

import Cta from "@/components/landing/Cta";
import Footer from "@/components/landing/Footer";

import AutoSignInModal from "@/components/auth/AutoSignInModal";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Cta />
      </main>
      <Footer />
      <Suspense>
        <AutoSignInModal />
      </Suspense>
    </>
  );
}
